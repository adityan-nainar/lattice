// Reading aids for exploring rather than studying:
//  - highlight topics mentioned in the text (basics get a marker-pen highlight)
//  - peek at any highlighted topic without leaving the page
//  - suggest where to go next, including connections two steps away
//  - remember the trail of topics you followed

import { PREREQUISITE_KINDS } from './paths.js';
import { escapeHtml as esc, renderInline, renderTex } from './render.js';
import { LINK_KINDS, STATUSES, TYPES } from './schema.js';
import { store } from './store.js';
import { findTerms } from './terms.js';
import { areaChip, colorOf, entryHref, readPref, typeIcon, writePref } from './ui.js';

const idFromHash = (href) => {
  const m = String(href || '').match(/#\/entry\/([^?]+)/);
  return m ? decodeURIComponent(m[1]) : null;
};
const currentEntryId = () => idFromHash(location.hash);

// ------------------------------------------------------------------ connections

// A connection means "you need that first" when it is a prerequisite link pointing away
// from this entry (builds on, derived from) or a part pointing in.
export const isBasicConnection = (c) => PREREQUISITE_KINDS[c.link.kind] === (c.dir === 'out' ? 'out' : 'in');

export function basicsOf(id) {
  const seen = new Set();
  return store
    .connections(id)
    .filter((c) => isBasicConnection(c) && !seen.has(c.other) && seen.add(c.other))
    .map((c) => ({ entry: store.entry(c.other), connection: c }))
    .filter((b) => b.entry);
}

const KIND_WEIGHT = { 'same-idea': 3, tension: 3, explains: 2.5, 'special-case-of': 2, describes: 1.5, related: 1, 'part-of': 1 };

// Direct connections worth following next: everything except basics and this entry's own examples.
export function rabbitHoles(entry) {
  const best = new Map();
  for (const c of store.connections(entry.id)) {
    if (isBasicConnection(c)) continue;
    if (c.link.kind === 'example-of' && c.dir === 'in') continue;
    const other = store.entry(c.other);
    if (!other || other.type === 'note') continue;
    const crossArea = other.area !== entry.area;
    const score =
      (c.link.note ? 3 : 0) +
      (crossArea ? 3 : 0) +
      (KIND_WEIGHT[c.link.kind] || 0.5) +
      (c.link.kind === 'builds-on' && c.dir === 'in' ? 1.5 : 0) + // this unlocks something
      (other.status === 'solid' ? -1 : 0);
    const prev = best.get(other.id);
    if (!prev || score > prev.score) best.set(other.id, { entry: other, connection: c, score, crossArea });
  }
  return [...best.values()].sort((a, b) => b.score - a.score);
}

// Entries two steps away that share a not-too-common neighbour — preferring other areas.
// "BEC critical temperature" → via "Riemann zeta function" → "Critical dimension of the bosonic string".
export function surprisingConnections(entry, limit = 4) {
  // Skip direct neighbours and anything this entry builds on — those are basics, not surprises.
  const direct = new Set([...store.connections(entry.id).map((c) => c.other), ...store.foundationsOf(entry.id)]);
  direct.add(entry.id);
  const found = new Map();
  for (const c of store.connections(entry.id)) {
    const via = store.entry(c.other);
    if (!via) continue;
    const degree = store.connections(via.id).length;
    if (degree > 16) continue; // "calculus" connects everything, so it says nothing
    for (const c2 of store.connections(via.id)) {
      if (isBasicConnection(c2)) continue; // walking down into the neighbour's own basics isn't a leap
      const x = store.entry(c2.other);
      if (!x || direct.has(x.id) || x.type === 'note') continue;
      const crossArea = x.area !== entry.area;
      const score = (crossArea ? 2 : 0.6) / degree + (c2.link.note ? 0.15 : 0);
      const cur = found.get(x.id);
      if (!cur) found.set(x.id, { entry: x, via, link: c2.link, score, crossArea, shared: 1 });
      else {
        cur.score += score;
        cur.shared++;
        if (!cur.link.note && c2.link.note) Object.assign(cur, { via, link: c2.link });
      }
    }
  }
  const ranked = [...found.values()].sort((a, b) => b.score - a.score);
  const jumps = ranked.filter((f) => f.crossArea);
  // Leaps into other areas are the point; only without any, show close neighbours sharing several ideas.
  return jumps.length ? jumps.slice(0, limit) : ranked.filter((f) => f.shared > 1).slice(0, 2);
}

// One suggested next topic, like an "up next" video: something connected to this one that you
// haven't just read and don't already know, preferring a leap into another area. Falls back to a
// two-step surprise, and then to anything you're curious about.
export function nextUp(entry) {
  const recent = new Set(readTrail().slice(-8));
  const seen = new Set([entry.id]);
  // Coming back to something after a couple of weeks is spacing without a schedule.
  const DAY = 24 * 60 * 60 * 1000;
  const comeBack = (x) => {
    const last = store.visitsOf(x.id)?.last;
    if (!last || x.status === 'solid') return 0;
    const days = (Date.now() - Date.parse(last)) / DAY;
    return days >= 14 ? Math.min(3, 1.5 + days / 30) : 0;
  };
  const rank = (x, base) =>
    base +
    (recent.has(x.id) ? -6 : 0) +
    ({ curious: 1.5, exploring: 0.5, solid: -3 }[x.status] ?? 0) +
    (x.body.trim() ? 0.5 : -1) +
    comeBack(x);

  const options = [];
  for (const hole of rabbitHoles(entry)) {
    if (seen.has(hole.entry.id)) continue;
    seen.add(hole.entry.id);
    options.push({
      entry: hole.entry,
      why: hole.connection.link.note || hole.entry.summary,
      how: `${hole.connection.dir === 'out' ? LINK_KINDS[hole.connection.link.kind].inverse : LINK_KINDS[hole.connection.link.kind].label} ${entry.title}`,
      score: rank(hole.entry, hole.score),
    });
  }
  for (const s of surprisingConnections(entry, 4)) {
    if (seen.has(s.entry.id)) continue;
    seen.add(s.entry.id);
    options.push({
      entry: s.entry,
      why: s.link.note || s.entry.summary,
      how: `two steps away, through ${s.via.title}`,
      score: rank(s.entry, 2 + s.score),
    });
  }
  for (const b of basicsOf(entry.id)) {
    if (seen.has(b.entry.id) || b.entry.status === 'solid') continue;
    seen.add(b.entry.id);
    options.push({
      entry: b.entry,
      why: b.connection.link.note || b.entry.summary,
      how: `${entry.title} builds on it`,
      score: rank(b.entry, 1),
    });
  }
  return options.sort((a, b) => b.score - a.score)[0] || null;
}

// ------------------------------------------------------------------ highlighting

export const highlightsEnabled = () => readPref('lattice.highlights', 'on') !== 'off';

const SKIP = 'a, code, pre, .katex, .katex-display, h1, h2, h3, h4, h5, h6, button, select, textarea, .term';

// Marks the first mention of each known topic inside `roots` (in order). Existing [[wiki links]]
// count as mentions. Topics this entry builds on (at any depth) are "basic".
export function highlightTerms(roots, entry, { limit = 40 } = {}) {
  const basics = store.foundationsOf(entry.id);
  const direct = new Set(store.connections(entry.id).map((c) => c.other));
  const seen = new Set([entry.id]);
  const decorate = (el, id) => {
    const target = store.entry(id);
    el.dataset.peek = id;
    el.classList.toggle('basic', basics.has(id));
    el.classList.toggle('linked', direct.has(id));
    el.classList.toggle('known', target?.status === 'solid');
    el.style.setProperty('--c', colorOf(target));
  };

  for (const root of roots) {
    for (const a of root.querySelectorAll('a.wikilink:not(.missing)')) {
      const id = idFromHash(a.getAttribute('href'));
      if (!id || !store.entry(id) || id === entry.id) continue;
      decorate(a, id);
      seen.add(id);
    }
  }
  if (!highlightsEnabled()) return;

  let count = 0;
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement?.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (count >= limit) return;
      const text = node.nodeValue;
      const hits = findTerms(text, store.terms).filter((h) => !seen.has(h.id) && seen.add(h.id));
      if (!hits.length) continue;
      const frag = document.createDocumentFragment();
      let last = 0;
      for (const h of hits.slice(0, limit - count)) {
        frag.append(text.slice(last, h.index));
        const a = document.createElement('a');
        a.className = 'term';
        a.href = entryHref(h.id);
        a.textContent = h.text;
        decorate(a, h.id);
        frag.append(a);
        last = h.index + h.length;
        count++;
      }
      frag.append(text.slice(last));
      node.replaceWith(frag);
    }
  }
}

// ------------------------------------------------------------------ peek

let peekEl;
let anchor = null;
let showTimer;
let hideTimer;
let lastPointer = 'mouse';

function statusButtons(e) {
  return Object.entries(STATUSES)
    .map(
      ([k, s]) =>
        `<button type="button" class="${e.status === k ? 'on' : ''}" data-peek-status="${k}" title="${esc(s.hint)}"><span class="status status-${k}">${esc(s.label)}</span></button>`,
    )
    .join('');
}

function peekHtml(e) {
  const here = currentEntryId();
  const rel = here && here !== e.id ? store.connections(here).filter((c) => c.other === e.id) : [];
  const note = rel.find((c) => c.link.note);
  const basic = here ? store.foundationsOf(here).has(e.id) : false;
  return `
    <div class="peek-head" style="--c:${colorOf(e)}">
      ${typeIcon(e.type)}<span class="badge">${esc(TYPES[e.type].label)}</span>
      ${basic ? '<span class="peek-flag">basic here</span>' : ''}
    </div>
    <h4>${esc(e.title)}</h4>
    <div class="peek-area">${areaChip(e.area, { link: false })}</div>
    ${
      rel.length
        ? `<p class="peek-why"><b>${esc(rel[0].label)}</b>${note ? ` — ${esc(note.link.note)}` : ''}</p>`
        : ''
    }
    ${e.summary ? `<p class="peek-summary">${renderInline(e.summary, (t) => store.resolve(t), { linkify: false })}</p>` : ''}
    ${e.latex ? `<div class="peek-tex">${renderTex(e.latex, true)}</div>` : ''}
    <div class="peek-foot">
      <div class="peek-status" role="group" aria-label="How well you know this">${statusButtons(e)}</div>
      <a class="btn btn-sm btn-primary" href="${entryHref(e.id)}">Open</a>
    </div>`;
}

function place() {
  if (!anchor || peekEl.hidden) return;
  const rects = anchor.getClientRects();
  const r = rects[0] || anchor.getBoundingClientRect();
  const w = peekEl.offsetWidth;
  const h = peekEl.offsetHeight;
  const gap = 8;
  let top = r.bottom + gap;
  if (top + h > innerHeight - 12 && r.top - gap - h > 12) top = r.top - gap - h;
  const left = Math.max(12, Math.min(r.left, innerWidth - w - 12));
  peekEl.style.top = `${Math.max(12, top)}px`;
  peekEl.style.left = `${left}px`;
}

export function showPeek(el) {
  const e = store.entry(el.dataset.peek);
  if (!e) return;
  clearTimeout(hideTimer);
  anchor = el;
  peekEl.dataset.id = e.id;
  peekEl.innerHTML = peekHtml(e);
  peekEl.hidden = false;
  place();
}

export function hidePeek() {
  clearTimeout(showTimer);
  if (peekEl) peekEl.hidden = true;
  anchor = null;
}

export function initPeek({ onStatusChange, onError, beforeSolid }) {
  peekEl = document.createElement('div');
  peekEl.className = 'peek card';
  peekEl.hidden = true;
  peekEl.setAttribute('role', 'dialog');
  peekEl.setAttribute('aria-label', 'Topic preview');
  document.body.append(peekEl);

  document.addEventListener('pointerdown', (ev) => {
    lastPointer = ev.pointerType || 'mouse';
    if (!peekEl.hidden && !peekEl.contains(ev.target) && !ev.target.closest?.('[data-peek]')) hidePeek();
  });

  document.addEventListener('pointerover', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    const t = ev.target.closest?.('[data-peek]');
    if (t) {
      clearTimeout(hideTimer);
      if (t === anchor && !peekEl.hidden) return;
      clearTimeout(showTimer);
      showTimer = setTimeout(() => showPeek(t), anchor ? 120 : 350);
    } else if (peekEl.contains(ev.target)) {
      clearTimeout(hideTimer);
    }
  });

  document.addEventListener('pointerout', (ev) => {
    if (ev.pointerType !== 'mouse') return;
    const from = ev.target.closest?.('[data-peek], .peek');
    if (!from) return;
    const to = ev.relatedTarget;
    if (to && (peekEl.contains(to) || to.closest?.('[data-peek]') === anchor)) return;
    clearTimeout(showTimer);
    hideTimer = setTimeout(hidePeek, 250);
  });

  // Touch: the first tap on a highlighted topic previews it; tapping again (or "Open") goes there.
  document.addEventListener(
    'click',
    (ev) => {
      const t = ev.target.closest?.('[data-peek]');
      if (!t || lastPointer === 'mouse' || ev.ctrlKey || ev.metaKey) return;
      if (anchor === t && !peekEl.hidden) return;
      ev.preventDefault();
      showPeek(t);
    },
    true,
  );

  peekEl.addEventListener('click', async (ev) => {
    const btn = ev.target.closest('[data-peek-status]');
    if (!btn) return;
    const id = peekEl.dataset.id;
    try {
      if (btn.dataset.peekStatus === 'solid' && beforeSolid) {
        hidePeek();
        await beforeSolid(store.entry(id));
      }
      const updated = await store.updateEntry(id, { status: btn.dataset.peekStatus });
      peekEl.querySelector('.peek-status').innerHTML = statusButtons(updated);
      for (const el of document.querySelectorAll(`[data-peek="${CSS.escape(id)}"]`)) {
        el.classList.toggle('known', updated.status === 'solid');
      }
      onStatusChange?.(updated);
    } catch (err) {
      onError?.(err);
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && !peekEl.hidden) hidePeek();
  });
  window.addEventListener('hashchange', hidePeek);
  window.addEventListener('scroll', () => (lastPointer === 'mouse' ? hidePeek() : place()), { passive: true });
  window.addEventListener('resize', place);
}

// ------------------------------------------------------------------ trail

const TRAIL_KEY = 'lattice.trail';
const TRAIL_MAX = 30;

export function readTrail() {
  try {
    const t = JSON.parse(readPref(TRAIL_KEY, '[]'));
    return Array.isArray(t) ? t.filter((id) => store.entry(id)) : [];
  } catch {
    return [];
  }
}

export function pushTrail(id) {
  const trail = readTrail().filter((x) => x !== id);
  trail.push(id);
  writePref(TRAIL_KEY, JSON.stringify(trail.slice(-TRAIL_MAX)));
}

export const clearTrail = () => writePref(TRAIL_KEY, '[]');

// The label on the step between two consecutive trail entries, if they are linked.
export function stepLabel(fromId, toId) {
  const c = store.connections(fromId).find((x) => x.other === toId);
  if (!c) return null;
  return c.link.note ? `${c.label} — ${c.link.note}` : c.label;
}
