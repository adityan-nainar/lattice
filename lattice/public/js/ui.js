// Small HTML helpers shared by the views (app.js) and the reading aids (explore.js).

import { shapePath } from './graph.js';
import { escapeHtml as esc } from './render.js';
import { STATUSES } from './schema.js';
import { store } from './store.js';

const ICONS = {
  plus: '<path d="M10 4v12M4 10h12"/>',
  link: '<path d="M8.5 11.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M11.5 8.5a3.5 3.5 0 0 0-5 0L4 11a3.5 3.5 0 0 0 5 5l1-1"/>',
  edit: '<path d="M13.5 3.5l3 3L7 16H4v-3z"/>',
  graph: '<circle cx="5" cy="5" r="2"/><circle cx="15" cy="7" r="2"/><circle cx="8" cy="15" r="2"/><path d="M6.9 5.4l6.2 1.2M13.6 8.5l-4.2 5M5.5 6.9l1.9 6.2"/>',
  trash: '<path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"/>',
  copy: '<rect x="7" y="7" width="9" height="9" rx="1.5"/><path d="M13 7V5.5A1.5 1.5 0 0 0 11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6A1.5 1.5 0 0 0 5.5 13H7"/>',
  search: '<circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4.5 4.5"/>',
  dice: '<rect x="3" y="3" width="14" height="14" rx="3"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="13" cy="13" r="1" fill="currentColor"/><circle cx="10" cy="10" r="1" fill="currentColor"/>',
  home: '<path d="M3.5 9 10 3.5 16.5 9v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z"/>',
  library: '<path d="M4 3.5h3v13H4zM8.5 3.5h3v13h-3zM13 4.2l2.8-.7 2.6 12.3-2.8.7z"/>',
  settings: '<circle cx="10" cy="10" r="2.6"/><path d="M10 2v2.2M10 15.8V18M2 10h2.2M15.8 10H18M4.3 4.3l1.6 1.6M14.1 14.1l1.6 1.6M4.3 15.7l1.6-1.6M14.1 5.9l1.6-1.6"/>',
  question: '<circle cx="10" cy="10" r="7.5"/><path d="M7.8 7.8a2.3 2.3 0 1 1 3.2 2.1c-.6.3-1 .8-1 1.5v.4M10 14.4v.1"/>',
  minus: '<path d="M4 10h12"/>',
  fit: '<path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4"/>',
  shuffle: '<path d="M3 6h3.5c4 0 5 8 9 8H17M3 14h3.5c1.5 0 2.5-1.2 3.3-2.8M12.5 7.2C13.2 6.4 14 6 15.5 6H17M15 4l2 2-2 2M15 12l2 2-2 2"/>',
  filter: '<path d="M3 5h14M6 10h8M8.5 15h3"/>',
  close: '<path d="M5 5l10 10M15 5 5 15"/>',
  arrow: '<path d="M4 10h11M11 6l4 4-4 4"/>',
  spark: '<path d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M4.7 4.7l2.5 2.5M12.8 12.8l2.5 2.5M4.7 15.3l2.5-2.5M12.8 7.2l2.5-2.5"/>',
  check: '<path d="M4 10.5 8 14.5 16 5.5"/>',
  sliders: '<path d="M4 6h12M4 14h12"/><circle cx="8" cy="6" r="2"/><circle cx="13" cy="14" r="2"/>',
  image: '<rect x="3" y="4" width="14" height="12" rx="2"/><circle cx="7.5" cy="8" r="1.3"/><path d="M4 13.5 8 10l3 2.5 2.5-2 2.5 2.5"/>',
  play: '<rect x="2.5" y="4.5" width="15" height="11" rx="3"/><path d="M8.5 7.8v4.4l3.8-2.2z"/>',
  route: '<circle cx="4.5" cy="15.5" r="1.8"/><circle cx="15.5" cy="4.5" r="1.8"/><path d="M6.3 15.5H11a2.6 2.6 0 0 0 0-5.2H9a2.6 2.6 0 0 1 0-5.2h4.7"/>',
};

export const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 20 20" aria-hidden="true">${ICONS[name]}</svg>`;

export const typeIcon = (type) =>
  `<svg class="type-icon" viewBox="-8 -8 16 16" aria-hidden="true"><path class="${type === 'question' ? '' : 'solid'}" d="${shapePath(type, type === 'question' ? 5.4 : 5.6)}"/></svg>`;

export const colorOf = (e) => esc(store.area(e?.area)?.color || '#8a93a6');
export const statusHtml = (s) => `<span class="status status-${s}">${esc(STATUSES[s]?.label || s)}</span>`;
export const entryHref = (id) => `#/entry/${encodeURIComponent(id)}`;

export function areaChip(areaId, { link = true } = {}) {
  const a = store.area(areaId);
  if (!a) return '<span class="area-chip muted"><span class="area-dot"></span><span>Unfiled</span></span>';
  const inner = `<span class="area-dot" style="--c:${esc(a.color)}"></span><span>${esc(a.name)}</span>`;
  return link ? `<a class="area-chip" href="#/library?area=${encodeURIComponent(a.id)}">${inner}</a>` : `<span class="area-chip">${inner}</span>`;
}

// Per-viewer conveniences only; the app works the same when storage is unavailable.
export function readPref(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
