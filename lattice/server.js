// Lattice server: static files + a small JSON API over one data file.
// No framework, only Node built-ins. Binds to localhost only.

import { exec } from 'node:child_process';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises';
import http from 'node:http';
import { networkInterfaces } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { normalizeCalc } from './public/js/calc.js';
import { normalizeVideos } from './public/js/media.js';
import { AREA_COLORS, LINK_KINDS, slugify, STATUSES, TYPES, uniqueId } from './public/js/schema.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// Another library (like ../finance) can run on this same engine with its own name, starter
// content, look and data: LATTICE_NAME, LATTICE_SEED, LATTICE_THEME, LATTICE_DATA and PORT.
const APP_NAME = (process.env.LATTICE_NAME || 'Lattice').trim();
const SEED_FILE = process.env.LATTICE_SEED ? path.resolve(process.env.LATTICE_SEED) : path.join(ROOT, 'seed.js');
const THEME_FILE = process.env.LATTICE_THEME ? path.resolve(process.env.LATTICE_THEME) : null;
const { SEED } = await import(pathToFileURL(SEED_FILE).href);
const DATA_DIR = process.env.LATTICE_DATA ? path.resolve(process.env.LATTICE_DATA) : path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'lattice.json');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const IMAGE_DIR = path.join(DATA_DIR, 'images');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');
const STUDY_FILE = path.join(DATA_DIR, 'study.json');
const KEEP_EVENTS = 5000;
const KEEP_VERSIONS = 12;
const MAX_IMAGE = 10 * 1024 * 1024;
// --lan (npm run lan) opens Lattice to other devices on your network, behind an access code.
const LAN = process.argv.includes('--lan') || process.env.LATTICE_LAN === '1';
const HOST = LAN ? '0.0.0.0' : '127.0.0.1';
const PORT = Number(process.env.PORT) || 4321;
const KEEP_DAILY_BACKUPS = 30;
const MAX_BODY = 20 * 1024 * 1024;

const STATIC_MOUNTS = [
  ['/images/', IMAGE_DIR],
  ...(THEME_FILE ? [['/theme.css', THEME_FILE]] : []),
  ['/vendor/katex/', path.join(ROOT, 'node_modules/katex/dist')],
  ['/vendor/marked.js', path.join(ROOT, 'node_modules/marked/lib/marked.esm.js')],
  ['/vendor/purify.js', path.join(ROOT, 'node_modules/dompurify/dist/purify.es.mjs')],
  ['/', path.join(ROOT, 'public')],
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

// ---------------------------------------------------------------- state + disk

let state;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const bad = (msg) => new HttpError(400, msg);
const notFound = (what) => new HttpError(404, `${what} not found.`);

const now = () => new Date().toISOString();
const localDate = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

async function loadState() {
  await mkdir(BACKUP_DIR, { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });
  if (!existsSync(DATA_FILE)) {
    await loadHistory();
    await loadStudy();
    state = buildSeed();
    await persist();
    console.log(`  Created ${path.relative(ROOT, DATA_FILE)} with starter content.`);
    return;
  }
  await loadHistory();
  await loadStudy();
  const raw = await readFile(DATA_FILE, 'utf8');
  try {
    state = normalizeState(JSON.parse(raw));
  } catch (err) {
    throw new Error(
      `Could not read ${DATA_FILE}: ${err.message}\n` +
        `  Nothing was overwritten. Restore a copy from ${BACKUP_DIR} or fix the file by hand.`,
    );
  }
}

function buildSeed() {
  const stamp = now();
  return normalizeState({
    version: 1,
    areas: SEED.areas,
    entries: SEED.entries.map((e) => ({ ...e, created: stamp, updated: stamp })),
    links: SEED.links.map(([from, kind, to, note]) => ({ from, kind, to, note })),
  });
}

// { visits: { id: { count, first, last } }, events: [{ at, entry, kind, ... }] }.
// Not part of your notes: if it's lost, nothing you wrote is lost.
let study = { visits: {}, events: [] };

async function loadStudy() {
  try {
    const raw = JSON.parse(await readFile(STUDY_FILE, 'utf8'));
    study = {
      visits: raw && typeof raw.visits === 'object' && raw.visits ? raw.visits : {},
      events: list(raw?.events).slice(-KEEP_EVENTS),
    };
  } catch {
    study = { visits: {}, events: [] };
  }
}

let studyChain = Promise.resolve();
function saveStudy() {
  const snapshot = `${JSON.stringify(study)}\n`;
  studyChain = studyChain
    .then(async () => {
      const tmp = `${STUDY_FILE}.tmp`;
      await writeFile(tmp, snapshot, 'utf8');
      await renameWithRetry(tmp, STUDY_FILE);
    })
    .catch((err) => console.error(err));
  return studyChain;
}

const STUDY_KINDS = new Set(['guess', 'recall', 'why', 'gap', 'step', 'compare', 'solid', 'session']);

// id -> [{ at, entry }], newest last. Kept beside the notes so the data file stays readable.
let history = new Map();

async function loadHistory() {
  try {
    const raw = JSON.parse(await readFile(HISTORY_FILE, 'utf8'));
    history = new Map(Object.entries(raw).map(([id, versions]) => [id, list(versions).slice(-KEEP_VERSIONS)]));
  } catch {
    history = new Map();
  }
}

let historyChain = Promise.resolve();
function saveHistory() {
  const snapshot = `${JSON.stringify(Object.fromEntries(history))}\n`;
  historyChain = historyChain
    .then(async () => {
      const tmp = `${HISTORY_FILE}.tmp`;
      await writeFile(tmp, snapshot, 'utf8');
      await renameWithRetry(tmp, HISTORY_FILE);
    })
    .catch((err) => console.error(err));
  return historyChain;
}

// Called before an entry changes, with the version being replaced.
function remember(entry) {
  const versions = history.get(entry.id) || [];
  const last = versions.at(-1)?.entry;
  if (last && JSON.stringify(last) === JSON.stringify(entry)) return;
  versions.push({ at: entry.updated || now(), entry });
  history.set(entry.id, versions.slice(-KEEP_VERSIONS));
  saveHistory();
}

let writeChain = Promise.resolve();

function persist() {
  const snapshot = `${JSON.stringify(state, null, 2)}\n`;
  const job = writeChain.then(async () => {
    await dailyBackup();
    const tmp = `${DATA_FILE}.tmp`;
    await writeFile(tmp, snapshot, 'utf8');
    await renameWithRetry(tmp, DATA_FILE);
  });
  writeChain = job.catch(() => {});
  return job;
}

// Windows can briefly lock a file (antivirus, indexer, an open editor).
async function renameWithRetry(from, to, attempts = 5) {
  for (let i = 1; ; i++) {
    try {
      return await rename(from, to);
    } catch (err) {
      if (i >= attempts || !['EPERM', 'EBUSY', 'EACCES'].includes(err.code)) throw err;
      await new Promise((r) => setTimeout(r, 40 * i));
    }
  }
}

async function dailyBackup() {
  if (!existsSync(DATA_FILE)) return;
  const target = path.join(BACKUP_DIR, `lattice-${localDate()}.json`);
  if (existsSync(target)) return;
  await copyFile(DATA_FILE, target);
  const daily = (await readdir(BACKUP_DIR)).filter((f) => /^lattice-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
  for (const old of daily.slice(0, Math.max(0, daily.length - KEEP_DAILY_BACKUPS))) {
    await unlink(path.join(BACKUP_DIR, old));
  }
}

// ---------------------------------------------------------------- validation

const text = (v, max) => (typeof v === 'string' ? v.slice(0, max) : v == null ? '' : String(v).slice(0, max));
const list = (v) => (Array.isArray(v) ? v : []);
const yearOf = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= -3000 && n <= 2999 ? Math.trunc(n) : null;
};

function normalizeArea(raw) {
  const name = text(raw.name, 120).trim();
  if (!name) throw bad('Area name is required.');
  const color = /^#[0-9a-f]{6}$/i.test(raw.color) ? raw.color : AREA_COLORS[0];
  return { id: raw.id, name, color, description: text(raw.description, 2000).trim() };
}

function normalizeEntry(raw, areaIds, { lenient = false } = {}) {
  const title = text(raw.title, 300).trim();
  if (!title) throw bad('Title is required.');
  if (!TYPES[raw.type]) throw bad(`Unknown entry type "${raw.type}".`);
  const area = raw.area ? String(raw.area) : null;
  if (area && !areaIds.has(area)) throw bad(`Unknown area "${area}".`);
  const uniqueStrings = (values, max) => {
    const seen = new Set();
    return list(values)
      .map((t) => text(t, max).trim())
      .filter((t) => t && !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase()));
  };
  const tags = uniqueStrings(list(raw.tags).map((t) => text(t, 60).replace(/^\s*#/, '')), 60);
  // Other names the entry goes by; used to spot it in other entries' text.
  const aliases = uniqueStrings(raw.aliases, 80).slice(0, 30);
  // Optional "Try it" calculator. Broken definitions are refused over the API, dropped on load.
  let calc = null;
  try {
    calc = normalizeCalc(raw.calc);
  } catch (err) {
    if (!lenient) throw bad(`Calculator: ${err.message}`);
    console.warn(`  Dropped a broken calculator on "${title}": ${err.message}`);
  }
  return {
    id: raw.id,
    title,
    type: raw.type,
    area,
    status: STATUSES[raw.status] ? raw.status : 'curious',
    tags,
    aliases,
    summary: text(raw.summary, 1000).trim(),
    latex: text(raw.latex, 20000).trim(),
    variables: list(raw.variables)
      .map((v) => ({ symbol: text(v?.symbol, 300).trim(), meaning: text(v?.meaning, 600).trim() }))
      .filter((v) => v.symbol || v.meaning),
    body: text(raw.body, 500000),
    // Optional year for the timeline; blank or out of range means "no year".
    year: yearOf(raw.year),
    sources: list(raw.sources).map((s) => text(s, 1000).trim()).filter(Boolean),
    videos: normalizeVideos(raw.videos),
    calc,
    created: raw.created || now(),
    updated: raw.updated || now(),
  };
}

function checkLink(raw, entryIds, existing, selfId) {
  const { from, to, kind } = raw;
  if (!LINK_KINDS[kind]) throw bad(`Unknown link kind "${kind}".`);
  if (!entryIds.has(from)) throw bad(`Link source "${from}" does not exist.`);
  if (!entryIds.has(to)) throw bad(`Link target "${to}" does not exist.`);
  if (from === to) throw bad('An entry cannot link to itself.');
  const dup = existing.find(
    (l) =>
      l.id !== selfId &&
      l.kind === kind &&
      ((l.from === from && l.to === to) || (LINK_KINDS[kind].symmetric && l.from === to && l.to === from)),
  );
  if (dup) throw bad('That link already exists.');
  return { id: raw.id, from, to, kind, note: text(raw.note, 1000).trim(), created: raw.created || now() };
}

// A question asked while studying: about one entry (or none), open until marked as asked.
function normalizeQuestion(raw, entryIds) {
  const questionText = text(raw.text, 2000).trim();
  if (!questionText) throw bad('Write the question first.');
  const entry = raw.entry && entryIds.has(String(raw.entry)) ? String(raw.entry) : null;
  const answer = text(raw.answer, 8000).trim();
  return {
    id: raw.id,
    entry,
    text: questionText,
    answer,
    asked: raw.asked === true || !!answer,
    created: raw.created || now(),
    askedAt: raw.asked === true || answer ? raw.askedAt || now() : null,
  };
}
const newQuestionId = () => `q_${randomBytes(5).toString('hex')}`;

// An explanation of a topic in your own words, dated, so you can see how it changes.
function normalizeExplanation(raw, entryIds) {
  const explanation = text(raw.text, 8000).trim();
  if (!explanation) throw bad('Write the explanation first.');
  const entry = raw.entry && entryIds.has(String(raw.entry)) ? String(raw.entry) : null;
  if (!entry) throw bad('An explanation belongs to a topic.');
  return { id: raw.id, entry, text: explanation, created: raw.created || now() };
}
const newExplanationId = () => `x_${randomBytes(5).toString('hex')}`;

// Used for first load, seeding and import: drops what can't be repaired, rejects what's badly broken.
function normalizeState(input) {
  if (!input || typeof input !== 'object') throw new Error('Data is not an object.');
  const areas = [];
  const areaIds = new Set();
  for (const a of list(input.areas)) {
    const area = normalizeArea(a);
    area.id = uniqueId(text(a.id, 80) || slugify(area.name), areaIds);
    areaIds.add(area.id);
    areas.push(area);
  }
  const entries = [];
  const entryIds = new Set();
  for (const e of list(input.entries)) {
    const entry = normalizeEntry({ ...e, area: areaIds.has(e.area) ? e.area : null }, areaIds, { lenient: true });
    entry.id = uniqueId(text(e.id, 80) || slugify(entry.title), entryIds);
    entryIds.add(entry.id);
    entries.push(entry);
  }
  const links = [];
  const dropped = [];
  for (const l of list(input.links)) {
    try {
      const link = checkLink(l, entryIds, links);
      link.id = l.id && !links.some((x) => x.id === l.id) ? String(l.id) : newLinkId();
      links.push(link);
    } catch (err) {
      dropped.push(`${l.from} -${l.kind}-> ${l.to}: ${err.message}`);
    }
  }
  if (dropped.length) console.warn(`  Dropped ${dropped.length} invalid link(s):\n    ${dropped.join('\n    ')}`);
  const questions = [];
  for (const q of list(input.questions)) {
    try {
      const question = normalizeQuestion(q, entryIds);
      question.id = q.id && !questions.some((x) => x.id === q.id) ? String(q.id) : newQuestionId();
      questions.push(question);
    } catch {}
  }
  const explanations = [];
  for (const x of list(input.explanations)) {
    try {
      const explanation = normalizeExplanation(x, entryIds);
      explanation.id = x.id && !explanations.some((y) => y.id === x.id) ? String(x.id) : newExplanationId();
      explanations.push(explanation);
    } catch {}
  }
  return { version: 1, areas, entries, links, questions, explanations };
}

const newLinkId = () => `l_${randomBytes(5).toString('hex')}`;
const areaIdSet = () => new Set(state.areas.map((a) => a.id));
const entryIdSet = () => new Set(state.entries.map((e) => e.id));

// ---------------------------------------------------------------- API handlers

const api = {
  // A library's seed may define a main path (an ordered route through its entries). It lives in the
  // seed, not in your data, so improving the path never touches your notes.
  getState: () => (SEED.route ? { ...state, route: SEED.route } : state),

  async createEntry(body) {
    const entry = normalizeEntry({ ...body, created: undefined, updated: undefined }, areaIdSet());
    // An id may be suggested (content packs); otherwise it comes from the title.
    entry.id = uniqueId(slugify(text(body.id, 80)) || slugify(entry.title) || 'entry', entryIdSet());
    // Optional links to create alongside: [{ kind, other, dir: 'out' | 'in', note }]
    const ids = entryIdSet().add(entry.id);
    const pending = [];
    for (const l of list(body.links)) {
      const [from, to] = l.dir === 'in' ? [l.other, entry.id] : [entry.id, l.other];
      const link = checkLink({ from, to, kind: l.kind, note: l.note }, ids, [...state.links, ...pending]);
      link.id = newLinkId();
      pending.push(link);
    }
    state.entries.push(entry);
    state.links.push(...pending);
    await persist();
    return { status: 201, body: { entry, links: pending } };
  },

  async updateEntry(body, id) {
    const i = state.entries.findIndex((e) => e.id === id);
    if (i < 0) throw notFound('Entry');
    const current = state.entries[i];
    const entry = normalizeEntry({ ...current, ...body, id, created: current.created, updated: now() }, areaIdSet());
    remember(current);
    state.entries[i] = entry;
    await persist();
    return { body: entry };
  },

  async deleteEntry(_body, id) {
    const i = state.entries.findIndex((e) => e.id === id);
    if (i < 0) throw notFound('Entry');
    remember(state.entries[i]);
    state.entries.splice(i, 1);
    const before = state.links.length;
    state.links = state.links.filter((l) => l.from !== id && l.to !== id);
    for (const q of state.questions) if (q.entry === id) q.entry = null;
    state.explanations = state.explanations.filter((x) => x.entry !== id);
    await persist();
    return { body: { removedLinks: before - state.links.length } };
  },

  async createLink(body) {
    const link = checkLink(body, entryIdSet(), state.links);
    link.id = newLinkId();
    state.links.push(link);
    await persist();
    return { status: 201, body: link };
  },

  async updateLink(body, id) {
    const i = state.links.findIndex((l) => l.id === id);
    if (i < 0) throw notFound('Link');
    const current = state.links[i];
    const link = checkLink({ ...current, ...body, id, created: current.created }, entryIdSet(), state.links, id);
    state.links[i] = link;
    await persist();
    return { body: link };
  },

  async deleteLink(_body, id) {
    const i = state.links.findIndex((l) => l.id === id);
    if (i < 0) throw notFound('Link');
    state.links.splice(i, 1);
    await persist();
    return { body: { ok: true } };
  },

  async createArea(body) {
    const area = normalizeArea(body);
    area.id = uniqueId(slugify(text(body.id, 80)) || slugify(area.name) || 'area', areaIdSet());
    state.areas.push(area);
    await persist();
    return { status: 201, body: area };
  },

  async updateArea(body, id) {
    const i = state.areas.findIndex((a) => a.id === id);
    if (i < 0) throw notFound('Area');
    const area = normalizeArea({ ...state.areas[i], ...body });
    area.id = id;
    state.areas[i] = area;
    await persist();
    return { body: area };
  },

  async deleteArea(_body, id) {
    const i = state.areas.findIndex((a) => a.id === id);
    if (i < 0) throw notFound('Area');
    state.areas.splice(i, 1);
    let moved = 0;
    for (const e of state.entries) {
      if (e.area === id) {
        e.area = null;
        moved++;
      }
    }
    await persist();
    return { body: { unassigned: moved } };
  },

  async createExplanation(body) {
    const explanation = normalizeExplanation({ ...body, created: undefined }, entryIdSet());
    explanation.id = newExplanationId();
    state.explanations.push(explanation);
    await persist();
    return { status: 201, body: explanation };
  },

  async deleteExplanation(_body, id) {
    const i = state.explanations.findIndex((x) => x.id === id);
    if (i < 0) throw notFound('Explanation');
    state.explanations.splice(i, 1);
    await persist();
    return { body: { ok: true } };
  },

  getStudy() {
    return { body: study };
  },

  // Opening a topic. Returns when you last opened it before now, for "it's been a while" nudges.
  async recordVisit(body) {
    const id = String(body?.entry || '');
    if (!state.entries.some((e) => e.id === id)) throw notFound('Entry');
    const at = now();
    const current = study.visits[id] || { count: 0, first: at, last: null };
    const previous = current.last;
    // several page views within half an hour count as one visit
    const fresh = !previous || Date.parse(at) - Date.parse(previous) > 30 * 60 * 1000;
    study.visits[id] = { count: current.count + (fresh ? 1 : 0), first: current.first, last: at };
    saveStudy();
    return { body: { previous, visit: study.visits[id] } };
  },

  // A guess, a recall attempt, a comparison… Only small numbers and short text are kept.
  async recordEvent(body) {
    const kind = String(body?.kind || '');
    if (!STUDY_KINDS.has(kind)) throw bad(`Unknown kind "${kind}".`);
    const entry = body.entry && state.entries.some((e) => e.id === body.entry) ? String(body.entry) : null;
    const event = { at: now(), entry, kind };
    for (const key of ['result', 'what', 'label']) if (body[key] != null) event[key] = text(body[key], 200);
    for (const key of ['guess', 'actual']) if (Number.isFinite(Number(body[key]))) event[key] = Number(body[key]);
    if (body.other && state.entries.some((e) => e.id === body.other)) event.other = String(body.other);
    if (body.note != null) event.note = text(body.note, 2000);
    study.events.push(event);
    if (study.events.length > KEEP_EVENTS) study.events = study.events.slice(-KEEP_EVENTS);
    saveStudy();
    return { status: 201, body: event };
  },

  async createQuestion(body) {
    const question = normalizeQuestion({ ...body, asked: false, created: undefined }, entryIdSet());
    question.id = newQuestionId();
    state.questions.push(question);
    await persist();
    return { status: 201, body: question };
  },

  async updateQuestion(body, id) {
    const i = state.questions.findIndex((q) => q.id === id);
    if (i < 0) throw notFound('Question');
    const current = state.questions[i];
    const askedAt = body.asked === true && !current.asked ? now() : current.askedAt;
    const question = normalizeQuestion({ ...current, ...body, id, created: current.created, askedAt }, entryIdSet());
    state.questions[i] = question;
    await persist();
    return { body: question };
  },

  async deleteQuestion(_body, id) {
    const i = state.questions.findIndex((q) => q.id === id);
    if (i < 0) throw notFound('Question');
    state.questions.splice(i, 1);
    await persist();
    return { body: { ok: true } };
  },

  // Earlier versions of one entry, newest first, with just enough to show what changed.
  entryHistory(_body, id) {
    const versions = history.get(id) || [];
    return {
      body: {
        versions: versions
          .map((v, i) => ({
            at: v.at,
            index: i,
            title: v.entry.title,
            summary: v.entry.summary,
            bodyLength: (v.entry.body || '').length,
            status: v.entry.status,
          }))
          .reverse(),
      },
    };
  },

  // Put one of those versions back. The version being replaced is kept, so this is undoable too.
  async restoreEntry(body, id) {
    const versions = history.get(id) || [];
    const version = versions[Number(body?.index)];
    if (!version) throw notFound('Version');
    const i = state.entries.findIndex((e) => e.id === id);
    if (i < 0) throw notFound('Entry');
    const current = state.entries[i];
    const entry = normalizeEntry({ ...version.entry, id, created: current.created, updated: now() }, areaIdSet(), { lenient: true });
    remember(current);
    state.entries[i] = entry;
    await persist();
    return { body: entry };
  },

  // Pictures for notes (sketches, photos of handwritten work). Stored by content hash, so the same
  // picture is kept once. Only real PNG, JPEG, GIF or WebP files are accepted (checked by their bytes).
  async uploadImage(buffer) {
    if (!buffer.length) throw bad('No image received.');
    if (buffer.length > MAX_IMAGE) throw new HttpError(413, 'Images can be at most 10 MB.');
    const b = buffer;
    const ext =
      b[0] === 0x89 && b.toString('latin1', 1, 4) === 'PNG' ? '.png'
      : b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff ? '.jpg'
      : b.toString('latin1', 0, 6) === 'GIF87a' || b.toString('latin1', 0, 6) === 'GIF89a' ? '.gif'
      : b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP' ? '.webp'
      : null;
    if (!ext) throw bad('Only PNG, JPEG, GIF or WebP images can be added.');
    const name = createHash('sha256').update(buffer).digest('hex').slice(0, 24) + ext;
    const file = path.join(IMAGE_DIR, name);
    if (!existsSync(file)) {
      await mkdir(IMAGE_DIR, { recursive: true });
      await writeFile(`${file}.tmp`, buffer);
      await renameWithRetry(`${file}.tmp`, file);
    }
    return { status: 201, body: { url: `/images/${name}` } };
  },

  exportData() {
    return {
      body: state,
      headers: { 'Content-Disposition': `attachment; filename="lattice-${localDate()}.json"` },
    };
  },

  async importData(body) {
    if (!Array.isArray(body?.entries) || !Array.isArray(body?.areas)) {
      throw bad('That file doesn’t look like a Lattice export (it needs "areas" and "entries" lists).');
    }
    let next;
    try {
      next = normalizeState(body); // validate fully before anything is touched
    } catch (err) {
      throw bad(`Import failed: ${err.message}`);
    }
    await writeChain;
    if (existsSync(DATA_FILE)) {
      const stamp = now().replace(/[:.]/g, '-');
      await copyFile(DATA_FILE, path.join(BACKUP_DIR, `pre-import-${stamp}.json`));
    }
    state = next;
    await persist();
    return {
      body: { areas: state.areas.length, entries: state.entries.length, links: state.links.length, questions: state.questions.length },
    };
  },
};

const ROUTES = [
  ['GET', /^\/api\/state$/, api.getState],
  ['POST', /^\/api\/entries$/, api.createEntry],
  ['PUT', /^\/api\/entries\/([^/]+)$/, api.updateEntry],
  ['DELETE', /^\/api\/entries\/([^/]+)$/, api.deleteEntry],
  ['POST', /^\/api\/links$/, api.createLink],
  ['PUT', /^\/api\/links\/([^/]+)$/, api.updateLink],
  ['DELETE', /^\/api\/links\/([^/]+)$/, api.deleteLink],
  ['POST', /^\/api\/areas$/, api.createArea],
  ['PUT', /^\/api\/areas\/([^/]+)$/, api.updateArea],
  ['DELETE', /^\/api\/areas\/([^/]+)$/, api.deleteArea],
  ['GET', /^\/api\/entries\/([^/]+)\/history$/, api.entryHistory],
  ['POST', /^\/api\/entries\/([^/]+)\/restore$/, api.restoreEntry],
  ['POST', /^\/api\/explanations$/, api.createExplanation],
  ['DELETE', /^\/api\/explanations\/([^/]+)$/, api.deleteExplanation],
  ['GET', /^\/api\/study$/, api.getStudy],
  ['POST', /^\/api\/study\/visit$/, api.recordVisit],
  ['POST', /^\/api\/study\/event$/, api.recordEvent],
  ['POST', /^\/api\/questions$/, api.createQuestion],
  ['PUT', /^\/api\/questions\/([^/]+)$/, api.updateQuestion],
  ['DELETE', /^\/api\/questions\/([^/]+)$/, api.deleteQuestion],
  ['POST', /^\/api\/images$/, api.uploadImage],
  ['GET', /^\/api\/export$/, api.exportData],
  ['POST', /^\/api\/import$/, api.importData],
];

// ---------------------------------------------------------------- HTTP

function readBody(req, max = MAX_BODY) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > max) {
        reject(new HttpError(413, 'Request too large.'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJson(req) {
  const buffer = await readBody(req);
  if (!buffer.length) return {};
  try {
    return JSON.parse(buffer.toString('utf8'));
  } catch {
    throw bad('Body is not valid JSON.');
  }
}

function send(res, status, body, headers = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store', ...headers });
  res.end(payload);
}

const LAN_ADDRESSES = LAN
  ? Object.values(networkInterfaces())
      .flat()
      .filter((a) => a && a.family === 'IPv4' && !a.internal)
      .map((a) => a.address)
  : [];
const ALLOWED_HOSTS = new Set([
  `localhost:${PORT}`,
  `127.0.0.1:${PORT}`,
  `[::1]:${PORT}`,
  ...LAN_ADDRESSES.map((ip) => `${ip}:${PORT}`),
]);

// In LAN mode, other devices enter this code once and then get a session cookie.
const ACCESS_CODE = (process.env.LATTICE_PIN || randomBytes(3).toString('hex')).trim().toLowerCase();
const SESSION = randomBytes(24).toString('hex');
const failures = new Map(); // ip -> { count, until }
const isLoopback = (ip) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);
const sameText = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

function hasSession(req) {
  const m = String(req.headers.cookie || '').match(/(?:^|;\s*)lattice_session=([a-f0-9]+)/);
  return !!m && sameText(m[1], SESSION);
}

function unlockPage(res, message = '') {
  res.writeHead(401, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
  res.end(`<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escHtml(APP_NAME)}</title>
<style>body{font:16px system-ui;background:#0d0f15;color:#e8eaf0;display:grid;place-items:center;min-height:100vh;margin:0}
form{display:grid;gap:12px;width:min(320px,90vw)}input,button{font:inherit;padding:12px;border-radius:10px;border:1px solid #272c39;background:#161922;color:inherit}
button{background:#aa9dff;color:#13111f;border:0;font-weight:600}p{color:#7e8598;margin:0}</style>
<form method="get" action="/unlock"><h2 style="margin:0">${escHtml(APP_NAME)}</h2><p>Enter the access code shown in the terminal on your computer.</p>
<input name="code" autocomplete="one-time-code" autocapitalize="off" autofocus placeholder="Access code">${message ? `<p style="color:#f0717a">${message}</p>` : ''}<button>Open</button></form>`);
}

// Returns true when the request may continue; otherwise it has already been answered.
function checkAccess(req, res, url) {
  if (!LAN || isLoopback(req.socket.remoteAddress)) return true;
  if (hasSession(req)) return true;
  const ip = req.socket.remoteAddress;
  if (url.pathname === '/unlock') {
    const lock = failures.get(ip);
    if (lock && lock.until > Date.now()) {
      unlockPage(res, 'Too many tries — wait a minute.');
      return false;
    }
    const code = String(url.searchParams.get('code') || '').trim().toLowerCase();
    if (code && sameText(code, ACCESS_CODE)) {
      failures.delete(ip);
      res.writeHead(302, {
        'Set-Cookie': `lattice_session=${SESSION}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000`,
        Location: '/',
      });
      res.end();
      return false;
    }
    const f = failures.get(ip) || { count: 0, until: 0 };
    f.count++;
    if (f.count >= 5) Object.assign(f, { count: 0, until: Date.now() + 60_000 });
    failures.set(ip, f);
    unlockPage(res, 'That code isn’t right.');
    return false;
  }
  if (url.pathname.startsWith('/api/')) send(res, 401, { error: 'Enter the access code first.' });
  else unlockPage(res);
  return false;
}

async function handleApi(req, res, pathname) {
  // Reject requests addressed to any other host name (DNS rebinding).
  if (!ALLOWED_HOSTS.has(String(req.headers.host).toLowerCase())) throw new HttpError(403, 'Unknown host.');
  // Only same-origin browser calls: blocks other local web pages from posting to the API.
  const origin = req.headers.origin;
  if (req.method !== 'GET' && origin && origin !== `http://${req.headers.host}`) {
    throw new HttpError(403, 'Cross-origin request refused.');
  }
  const matches = ROUTES.filter(([, re]) => re.test(pathname));
  if (!matches.length) throw notFound('Endpoint');
  const route = matches.find(([method]) => method === req.method);
  if (!route) throw new HttpError(405, 'Method not allowed.');
  const [, re, handler] = route;
  const param = decodeURIComponent(pathname.match(re)[1] ?? '');
  const body =
    handler === api.uploadImage ? await readBody(req, MAX_IMAGE + 1)
    : req.method === 'GET' || req.method === 'DELETE' ? {}
    : await readJson(req);
  const result = await handler(body, param);
  if (handler === api.getState) return send(res, 200, result);
  send(res, result.status || 200, result.body, result.headers);
}

// The app shell carries the library’s own name, plus its stylesheet when it has one.
const escHtml = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
function brandPage(html) {
  if (APP_NAME === 'Lattice' && !THEME_FILE) return html;
  const name = escHtml(APP_NAME);
  let out = html
    .replace('<title>Lattice</title>', `<title>${name}</title>`)
    .replace('aria-label="Lattice home"', `aria-label="${name} home"`)
    .replace('<span>Lattice</span>', `<span>${name}</span>`)
    .replace('Loading your lattice…', `Loading your ${name.toLowerCase()}…`);
  if (THEME_FILE) out = out.replace('<link rel="stylesheet" href="/app.css">', '<link rel="stylesheet" href="/app.css">\n  <link rel="stylesheet" href="/theme.css">');
  return out;
}

async function serveStatic(res, pathname) {
  for (const [mount, target] of STATIC_MOUNTS) {
    if (!pathname.startsWith(mount)) continue;
    let file;
    if (!mount.endsWith('/')) {
      if (pathname !== mount) continue;
      file = target;
    } else {
      const rel = pathname.slice(mount.length) || 'index.html';
      file = path.join(target, rel);
      if (!file.startsWith(target + path.sep) && file !== target) throw notFound('File');
    }
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      let data = await readFile(file);
      if (mount === '/' && path.basename(file) === 'index.html') data = brandPage(data.toString('utf8'));
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': mount === '/images/' ? 'max-age=31536000, immutable' : mount.startsWith('/vendor/') ? 'max-age=86400' : 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      return res.end(data);
    } catch (err) {
      if (err.code === 'ENOENT' && mount !== '/') throw notFound('File');
      if (err.code !== 'ENOENT') throw err;
    }
  }
  throw notFound('File');
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || HOST}`);
  const { pathname } = url;
  try {
    if (!checkAccess(req, res, url)) return;
    if (pathname.startsWith('/api/')) await handleApi(req, res, pathname);
    else if (req.method === 'GET' || req.method === 'HEAD') await serveStatic(res, decodeURIComponent(pathname));
    else throw new HttpError(405, 'Method not allowed.');
  } catch (err) {
    const status = err.status || 500;
    if (status === 500) console.error(err);
    if (!res.headersSent) send(res, status, { error: status === 500 ? `Server error: ${err.message}` : err.message });
    else res.end();
  }
});

try {
  await loadState();
} catch (err) {
  console.error(`\n  ${err.message}\n`);
  process.exit(1);
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is busy. ${APP_NAME} may already be running at http://localhost:${PORT}`);
    console.error('  Or start on another port:  $env:PORT=4322; npm start\n');
  } else console.error(err);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n  ${APP_NAME} is running at ${url}`);
  console.log(`  Data: ${DATA_FILE}`);
  console.log(`  ${state.entries.length} entries · ${state.links.length} links · ${state.areas.length} areas`);
  if (LAN) {
    console.log('');
    for (const ip of LAN_ADDRESSES) console.log(`  On your phone (same Wi-Fi):  http://${ip}:${PORT}`);
    console.log(`  Access code:                 ${ACCESS_CODE}`);
    console.log('  Only use this on a network you trust. Anyone with the code can read and edit your notes.');
  }
  console.log('  Press Ctrl+C to stop.\n');
  if (process.argv.includes('--open')) {
    const cmd = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
    exec(cmd);
  }
});
