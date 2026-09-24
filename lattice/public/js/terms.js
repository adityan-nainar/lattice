// Finding entry names inside ordinary text, so reading a note can point at the topics it
// mentions even without [[wiki links]]. Pure functions, shared with scripts/check.js.

export const MIN_TERM_LENGTH = 3;

// Case, apostrophe style, dash style and spacing don't matter when matching.
export const normTerm = (t) =>
  String(t)
    .normalize('NFC')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[‐‑–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const flexible = (t) =>
  escapeRe(normTerm(t))
    .replace(/'/g, "['’‘]")
    .replace(/-/g, '[-‐‑–—]')
    .replace(/ /g, '\\s+');

// Long, punctuated titles ("Tori, Lattices in ℂ & Elliptic Curves") never appear verbatim in
// prose, so only short plain titles count; aliases carry the everyday names.
export function termsFor(entry) {
  const terms = [];
  if (entry.title.length <= 40 && !/[&:?,()]/.test(entry.title)) terms.push(entry.title);
  for (const a of entry.aliases || []) terms.push(a);
  return terms.filter((t) => normTerm(t).length >= MIN_TERM_LENGTH);
}

export function buildTermIndex(entries) {
  const byTerm = new Map(); // normalized term -> entry id (first entry wins)
  for (const e of entries) {
    for (const t of termsFor(e)) {
      const key = normTerm(t);
      if (!byTerm.has(key)) byTerm.set(key, e.id);
    }
  }
  const terms = [...byTerm.keys()].sort((a, b) => b.length - a.length);
  const regex = terms.length
    ? new RegExp(`(?<![\\p{L}\\p{N}])(${terms.map(flexible).join('|')})(?:e?s)?(?![\\p{L}\\p{N}])`, 'giu')
    : null;
  return { byTerm, regex };
}

// [{ index, length, text, id }] for every term occurrence in a plain string.
export function findTerms(text, index) {
  if (!index.regex) return [];
  const out = [];
  index.regex.lastIndex = 0;
  for (const m of text.matchAll(index.regex)) {
    const id = index.byTerm.get(normTerm(m[1]));
    if (id) out.push({ index: m.index, length: m[0].length, text: m[0], id });
  }
  return out;
}
