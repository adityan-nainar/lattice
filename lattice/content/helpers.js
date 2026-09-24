// Helpers for writing content packs (seed.js, content/*.js).

// Raw template tag: keeps LaTeX backslashes as typed and strips the code indentation.
export function md(strings, ...values) {
  const raw = String.raw(strings, ...values);
  const lines = raw.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(cut)).join('\n');
}

export const BT = '`';

export const entry = (id, type, area, status, title, fields = {}) => ({
  id,
  type,
  area,
  status,
  title,
  summary: fields.summary || '',
  latex: fields.latex || '',
  variables: (fields.variables || []).map(([symbol, meaning]) => ({ symbol, meaning })),
  tags: fields.tags || [],
  aliases: fields.aliases || [],
  body: fields.body || '',
  sources: fields.sources || [],
  ...(fields.calc ? { calc: fields.calc } : {}),
});

// Area ids used across packs.
export const AREA = {
  STRING: 'string-theory',
  QUANTUM: 'quantum',
  REL: 'relativity',
  MISC: 'miscellany',
  MATHS: 'maths',
  PHYSICS: 'physics',
};
