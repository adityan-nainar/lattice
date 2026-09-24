// Adds a content pack to a running Lattice server without changing anything already there.
// Entries that already exist (same title) and links that already exist are skipped.
//
//   npm run merge -- content/foundations.js
//   npm run merge -- content/foundations.js --dry-run

import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { LINK_KINDS, slugify } from '../public/js/schema.js';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const BASE = `http://127.0.0.1:${Number(process.env.PORT) || 4321}`;

if (!file) {
  console.error('\n  Usage: npm run merge -- <pack.js> [--dry-run]\n');
  process.exit(1);
}

const mod = await import(pathToFileURL(path.resolve(file)).href);
const pack = mod.default ?? Object.values(mod).find((v) => v && (Array.isArray(v.entries) || v.aliases || v.notes || v.calcs || v.videos || v.years));
if (!pack) {
  console.error(`\n  ${file} doesn't export a content pack (entries, links, notes or aliases).\n`);
  process.exit(1);
}

async function api(method, url, body) {
  const res = await fetch(BASE + url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `${res.status} ${res.statusText}`);
  return data;
}

let state;
try {
  state = await api('GET', '/api/state');
} catch {
  console.error(`\n  Can't reach ${process.env.LATTICE_NAME || 'Lattice'} at ${BASE}. Start it first with: npm start\n`);
  process.exit(1);
}

const count = { areas: 0, entries: 0, links: 0, notes: 0, aliases: 0, calcs: 0, videos: 0, years: 0, skippedEntries: 0, skippedLinks: 0 };
const warnings = [];

// ---- areas: match by id or name
const areaIds = new Map(state.areas.map((a) => [a.id, a.id]));
for (const a of pack.areas || []) {
  const hit = state.areas.find((x) => x.id === a.id || x.name.toLowerCase() === a.name.toLowerCase());
  if (hit) {
    areaIds.set(a.id, hit.id);
    continue;
  }
  const created = dryRun ? { id: a.id } : await api('POST', '/api/areas', a);
  areaIds.set(a.id, created.id);
  count.areas++;
}

// ---- entries: match by title, so renamed ids or re-runs never duplicate anything
const liveById = new Map(state.entries.map((e) => [e.id, e]));
const liveBySlug = new Map(state.entries.map((e) => [slugify(e.title), e]));
const entryIds = new Map();
for (const e of pack.entries || []) {
  const hit = liveBySlug.get(slugify(e.title));
  if (hit) {
    entryIds.set(e.id, hit.id);
    count.skippedEntries++;
    continue;
  }
  const area = e.area ? (areaIds.get(e.area) ?? null) : null;
  if (e.area && !area) warnings.push(`${e.id}: area "${e.area}" not found, left unfiled`);
  if (dryRun) {
    entryIds.set(e.id, e.id);
  } else {
    const { entry } = await api('POST', '/api/entries', { ...e, area });
    entryIds.set(e.id, entry.id);
    liveById.set(entry.id, entry);
  }
  count.entries++;
}

// ---- links: pack ids first, then ids already in the library
const resolve = (id) => entryIds.get(id) ?? (liveById.has(id) ? id : null);
const links = [...state.links];
const findLink = (from, to, kind) =>
  links.find(
    (l) =>
      l.kind === kind &&
      ((l.from === from && l.to === to) || (LINK_KINDS[kind]?.symmetric && l.from === to && l.to === from)),
  );

async function fillNote(link, note) {
  if (!note || link.note) return false;
  if (!dryRun && link.id) Object.assign(link, await api('PUT', `/api/links/${encodeURIComponent(link.id)}`, { note }));
  else link.note = note;
  count.notes++;
  return true;
}

for (const raw of pack.links || []) {
  const [from, kind, to, note] = Array.isArray(raw) ? raw : [raw.from, raw.kind, raw.to, raw.note];
  const f = resolve(from);
  const t = resolve(to);
  if (!f || !t) {
    warnings.push(`link ${from} -${kind}-> ${to}: ${!f ? from : to} is not in the library`);
    continue;
  }
  const existing = findLink(f, t, kind);
  if (existing) {
    count.skippedLinks++;
    await fillNote(existing, note);
    continue;
  }
  if (!dryRun) links.push(await api('POST', '/api/links', { from: f, to: t, kind, note }));
  else links.push({ from: f, to: t, kind, note });
  count.links++;
}

// ---- notes for links that already exist: [from, to, note], either direction, any kind
for (const [from, to, note] of pack.notes || []) {
  const f = resolve(from);
  const t = resolve(to);
  const matches = links.filter((l) => (l.from === f && l.to === t) || (l.from === t && l.to === f));
  if (!matches.length) {
    warnings.push(`note ${from} ↔ ${to}: no link between them`);
    continue;
  }
  for (const l of matches) await fillNote(l, note);
}

// ---- aliases: only for entries that have none yet
for (const [id, aliases] of Object.entries(pack.aliases || {})) {
  const live = liveById.get(resolve(id));
  if (!live) {
    if (aliases.length) warnings.push(`aliases for ${id}: entry not in the library`);
    continue;
  }
  if (!aliases.length || live.aliases?.length) continue;
  if (!dryRun) Object.assign(live, await api('PUT', `/api/entries/${encodeURIComponent(live.id)}`, { aliases }));
  count.aliases++;
}

// ---- calculators and videos: only for entries that have none yet
for (const [field, map, counter] of [
  ['calc', pack.calcs, 'calcs'],
  ['videos', pack.videos, 'videos'],
  ['year', pack.years, 'years'],
]) {
  for (const [id, value] of Object.entries(map || {})) {
    const live = liveById.get(resolve(id));
    if (!live) {
      warnings.push(`${field} for ${id}: entry not in the library`);
      continue;
    }
    const hasOne = field === 'calc' ? !!live.calc : field === 'year' ? live.year != null : live.videos?.length > 0;
    if (hasOne || !value || (Array.isArray(value) && !value.length)) continue;
    if (!dryRun) Object.assign(live, await api('PUT', `/api/entries/${encodeURIComponent(live.id)}`, { [field]: value }));
    count[counter]++;
  }
}

console.log(`\n  ${dryRun ? 'Dry run — nothing written. Would add' : 'Added'}: ${count.areas} areas · ${count.entries} entries · ${count.links} links · ${count.notes} link notes · ${count.aliases} alias lists · ${count.calcs} calculators · ${count.videos} video lists · ${count.years} years`);
console.log(`  Already there: ${count.skippedEntries} entries · ${count.skippedLinks} links`);
for (const w of warnings) console.log(`  warn  ${w}`);
console.log('');
