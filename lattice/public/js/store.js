import { wikiTargets } from './markup.js';
import { learningPath, prerequisiteMap } from './paths.js';
import { buildTermIndex } from './terms.js';
import { LINK_KINDS, slugify } from './schema.js';

async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `${res.status} ${res.statusText}`);
  return data;
}

// The seed's main path, trimmed to entries that still exist, with each entry's position.
function buildRoute(raw, byId) {
  if (!raw?.stages?.length) return null;
  const order = [];
  const pos = new Map();
  const stages = [];
  for (const s of raw.stages) {
    const stage = { ...s, steps: (s.steps || []).filter((id) => byId.has(id) && !pos.has(id)) };
    if (!stage.steps.length) continue;
    const stageIndex = stages.push(stage) - 1;
    stage.steps.forEach((id, step) => {
      pos.set(id, { index: order.length, stage, stageIndex, step });
      order.push(id);
    });
  }
  return order.length ? { title: raw.title || 'Main path', intro: raw.intro || '', stages, order, pos } : null;
}

export const store = {
  areas: [],
  entries: [],
  links: [],
  questions: [],
  explanations: [],
  study: { visits: {}, events: [] },
  byId: new Map(),
  bySlug: new Map(),
  areaById: new Map(),
  adjacency: new Map(), // entry id -> [{ link, other, dir, label }]
  _mentions: null,

  async load() {
    const [state, study] = await Promise.all([api('GET', '/api/state'), api('GET', '/api/study').catch(() => null)]);
    this.set(state);
    if (study) this.study = study;
  },

  set({ areas, entries, links, questions, explanations, route }) {
    this._route = route || null;
    this.areas = areas;
    this.entries = entries;
    this.links = links;
    this.questions = questions || [];
    this.explanations = explanations || [];
    this.reindex();
  },

  reindex() {
    this.byId = new Map(this.entries.map((e) => [e.id, e]));
    this.bySlug = new Map();
    for (const e of this.entries) if (!this.bySlug.has(slugify(e.title))) this.bySlug.set(slugify(e.title), e);
    // Aliases resolve [[links]] too, but never shadow a real title.
    for (const e of this.entries) {
      for (const a of e.aliases || []) if (!this.bySlug.has(slugify(a))) this.bySlug.set(slugify(a), e);
    }
    this._terms = null;
    this.areaById = new Map(this.areas.map((a) => [a.id, a]));
    this.adjacency = new Map(this.entries.map((e) => [e.id, []]));
    for (const link of this.links) {
      const kind = LINK_KINDS[link.kind];
      this.adjacency.get(link.from)?.push({ link, other: link.to, dir: 'out', label: kind.label });
      this.adjacency.get(link.to)?.push({ link, other: link.from, dir: 'in', label: kind.inverse });
    }
    this._mentions = null;
    this.needs = prerequisiteMap(this.links);
    this.route = buildRoute(this._route, this.byId);
  },

  // Where an entry sits on the main path: { index, stage, stageIndex, step } or undefined.
  onRoute(id) {
    return this.route?.pos.get(id);
  },

  // The first step not yet marked Solid — where "Continue" goes.
  routeNext() {
    return this.route?.order.find((id) => this.byId.get(id)?.status !== 'solid') ?? null;
  },

  // Why a step comes where it does: the link to the latest earlier step, if any.
  routeWhy(id) {
    const at = this.onRoute(id);
    if (!at || at.index === 0) return null;
    let best = null;
    for (const c of this.connections(id)) {
      const other = this.onRoute(c.other);
      if (other && other.index < at.index && (!best || other.index > best.at.index)) best = { at: other, connection: c };
    }
    return best && { entry: this.byId.get(best.connection.other), link: best.connection.link };
  },

  // Ids of everything an entry builds on, directly or indirectly.
  foundationsOf(id) {
    return new Set(learningPath(id, this.needs).steps.map((s) => s.id));
  },

  get terms() {
    this._terms ||= buildTermIndex(this.entries);
    return this._terms;
  },

  entry: (id) => store.byId.get(id),
  area: (id) => store.areaById.get(id),
  connections: (id) => store.adjacency.get(id) || [],

  resolve(target) {
    const t = String(target).trim();
    return this.byId.get(t) || this.bySlug.get(slugify(t)) || null;
  },

  // Questions you wrote while studying, newest last. id = null for ones not about any topic.
  questionsFor(id) {
    return this.questions.filter((q) => q.entry === id);
  },

  // Chains of links from one entry to another, shortest first: [[{ entry, link, dir }]].
  // Alternatives are found by banning one middle step of the best chain at a time.
  pathsBetween(fromId, toId, max = 3) {
    if (!this.byId.has(fromId) || !this.byId.has(toId) || fromId === toId) return [];
    const search = (banned) => {
      const prev = new Map([[fromId, null]]);
      const queue = [fromId];
      while (queue.length) {
        const cur = queue.shift();
        if (cur === toId) break;
        for (const c of this.connections(cur)) {
          if (prev.has(c.other) || banned.has(c.other)) continue;
          prev.set(c.other, { from: cur, connection: c });
          queue.push(c.other);
        }
      }
      if (!prev.has(toId)) return null;
      const steps = [];
      for (let at = toId; prev.get(at); at = prev.get(at).from) {
        const { connection } = prev.get(at);
        steps.unshift({ entry: this.entry(at), link: connection.link, dir: connection.dir, label: connection.label });
      }
      return steps;
    };
    const first = search(new Set());
    if (!first) return [];
    const found = [first];
    const seen = new Set([first.map((s) => s.entry.id).join('>')]);
    for (const step of first.slice(0, -1)) {
      if (found.length >= max) break;
      const alt = search(new Set([step.entry.id]));
      const key = alt?.map((s) => s.entry.id).join('>');
      if (alt && !seen.has(key)) {
        seen.add(key);
        found.push(alt);
      }
    }
    return found.sort((a, b) => a.length - b.length);
  },

  // id -> entries whose body contains a [[wiki link]] to it
  mentionsOf(id) {
    if (!this._mentions) {
      this._mentions = new Map();
      for (const e of this.entries) {
        for (const target of new Set(wikiTargets(e.body))) {
          const hit = this.resolve(target);
          if (!hit || hit.id === e.id) continue;
          if (!this._mentions.has(hit.id)) this._mentions.set(hit.id, new Set());
          this._mentions.get(hit.id).add(e);
        }
      }
    }
    return [...(this._mentions.get(id) || [])];
  },

  // [[targets]] that don't match any entry yet: [{ target, from: [entries] }]
  missingLinks() {
    const missing = new Map();
    for (const e of this.entries) {
      for (const target of wikiTargets(e.body)) {
        if (this.resolve(target)) continue;
        const key = slugify(target);
        if (!missing.has(key)) missing.set(key, { target, from: new Set() });
        missing.get(key).from.add(e);
      }
    }
    return [...missing.values()].map((m) => ({ target: m.target, from: [...m.from] }));
  },

  tags() {
    const counts = new Map();
    for (const e of this.entries) {
      for (const t of e.tags) {
        const key = t.toLowerCase();
        const cur = counts.get(key) || { tag: t, count: 0 };
        cur.count++;
        counts.set(key, cur);
      }
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  },

  // ---- mutations

  async createEntry(data) {
    const { entry, links } = await api('POST', '/api/entries', data);
    this.entries.push(entry);
    this.links.push(...links);
    this.reindex();
    return entry;
  },

  async updateEntry(id, patch) {
    const entry = await api('PUT', `/api/entries/${encodeURIComponent(id)}`, patch);
    this.entries[this.entries.findIndex((e) => e.id === id)] = entry;
    this.reindex();
    return entry;
  },

  async deleteEntry(id) {
    const result = await api('DELETE', `/api/entries/${encodeURIComponent(id)}`);
    this.entries = this.entries.filter((e) => e.id !== id);
    this.links = this.links.filter((l) => l.from !== id && l.to !== id);
    this.reindex();
    return result;
  },

  async createLink(data) {
    const link = await api('POST', '/api/links', data);
    this.links.push(link);
    this.reindex();
    return link;
  },

  async deleteLink(id) {
    await api('DELETE', `/api/links/${encodeURIComponent(id)}`);
    this.links = this.links.filter((l) => l.id !== id);
    this.reindex();
  },

  async createArea(data) {
    const area = await api('POST', '/api/areas', data);
    this.areas.push(area);
    this.reindex();
    return area;
  },

  async updateArea(id, patch) {
    const area = await api('PUT', `/api/areas/${encodeURIComponent(id)}`, patch);
    this.areas[this.areas.findIndex((a) => a.id === id)] = area;
    this.reindex();
    return area;
  },

  async deleteArea(id) {
    const result = await api('DELETE', `/api/areas/${encodeURIComponent(id)}`);
    this.areas = this.areas.filter((a) => a.id !== id);
    for (const e of this.entries) if (e.area === id) e.area = null;
    this.reindex();
    return result;
  },

  async createQuestion(data) {
    const question = await api('POST', '/api/questions', data);
    this.questions.push(question);
    return question;
  },

  async updateQuestion(id, patch) {
    const question = await api('PUT', `/api/questions/${encodeURIComponent(id)}`, patch);
    this.questions[this.questions.findIndex((q) => q.id === id)] = question;
    return question;
  },

  async entryHistory(id) {
    return api('GET', `/api/entries/${encodeURIComponent(id)}/history`);
  },

  async restoreEntry(id, index) {
    const entry = await api('POST', `/api/entries/${encodeURIComponent(id)}/restore`, { index });
    this.entries[this.entries.findIndex((e) => e.id === id)] = entry;
    this.reindex();
    return entry;
  },

  explanationsFor(id) {
    return this.explanations.filter((x) => x.entry === id).sort((a, b) => b.created.localeCompare(a.created));
  },

  async createExplanation(entry, text) {
    const explanation = await api('POST', '/api/explanations', { entry, text });
    this.explanations.push(explanation);
    return explanation;
  },

  async deleteExplanation(id) {
    await api('DELETE', `/api/explanations/${encodeURIComponent(id)}`);
    this.explanations = this.explanations.filter((x) => x.id !== id);
  },

  // ---- study log
  visitsOf: (id) => store.study.visits[id] || null,
  eventsFor: (id) => store.study.events.filter((e) => e.entry === id),

  // Returns when you last opened this topic before now (or null).
  async recordVisit(entry) {
    try {
      const { previous, visit } = await api('POST', '/api/study/visit', { entry });
      this.study.visits[entry] = visit;
      return previous;
    } catch {
      return null;
    }
  },

  async recordEvent(event) {
    try {
      const saved = await api('POST', '/api/study/event', event);
      this.study.events.push(saved);
      return saved;
    } catch {
      return null;
    }
  },

  async deleteQuestion(id) {
    await api('DELETE', `/api/questions/${encodeURIComponent(id)}`);
    this.questions = this.questions.filter((q) => q.id !== id);
  },

  // Sketches and photos in notes. Returns the url to put in the Markdown.
  async uploadImage(file) {
    const res = await fetch('/api/images', { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `${res.status} ${res.statusText}`);
    return data.url;
  },

  async importAll(data) {
    const result = await api('POST', '/api/import', data);
    await this.load();
    return result;
  },
};

// ---- search

const fold = (s) =>
  String(s ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// A term counts when it starts a word: "superflu" finds "superfluidity", but "roton" no
// longer matches "protons".
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const startsWord = (haystack, term) => new RegExp(`\\b${escapeRegex(term)}`).test(haystack);

export function searchEntries(query, entries = store.entries) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return entries.slice();
  const scored = [];
  for (const e of entries) {
    const title = fold(e.title);
    const aliases = fold((e.aliases || []).join(' '));
    const tags = fold(e.tags.join(' '));
    const summary = fold(e.summary);
    const rest = fold(`${e.body} ${e.latex} ${e.variables.map((v) => `${v.symbol} ${v.meaning}`).join(' ')}`);
    let score = 0;
    let ok = true;
    for (const t of terms) {
      const s =
        (title.startsWith(t) ? 12 : 0) +
        (startsWord(title, t) ? 8 : 0) +
        (startsWord(aliases, t) ? 6 : 0) +
        (startsWord(tags, t) ? 5 : 0) +
        (startsWord(summary, t) ? 3 : 0) +
        (startsWord(rest, t) ? 1 : 0);
      if (!s) {
        ok = false;
        break;
      }
      score += s;
    }
    if (ok) scored.push([score, e]);
  }
  return scored.sort((a, b) => b[0] - a[0] || a[1].title.localeCompare(b[1].title)).map(([, e]) => e);
}
