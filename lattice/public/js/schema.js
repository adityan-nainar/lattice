// Shared by the server (validation) and the browser (labels, pickers).

export const TYPES = {
  concept: { label: 'Concept', plural: 'Concepts', hint: 'An idea, object or phenomenon' },
  theory: { label: 'Theory', plural: 'Theories', hint: 'A framework, conjecture or explanation' },
  equation: { label: 'Equation', plural: 'Equations', hint: 'A formula, with its symbols explained' },
  example: { label: 'Example', plural: 'Examples', hint: 'A worked case with real numbers' },
  question: { label: 'Question', plural: 'Questions', hint: 'Something you want to find out' },
  note: { label: 'Note', plural: 'Notes', hint: 'Anything else worth keeping' },
};

export const STATUSES = {
  curious: { label: 'Curious', hint: 'Heard of it, want to know more' },
  exploring: { label: 'Exploring', hint: 'Actively working through it' },
  solid: { label: 'Solid', hint: 'Could explain it to someone else' },
};

// A link reads "from <label> to". Seen from the other end it reads "to <inverse> from".
export const LINK_KINDS = {
  'builds-on': { label: 'builds on', inverse: 'foundation for' },
  describes: { label: 'describes', inverse: 'described by' },
  'example-of': { label: 'example of', inverse: 'has example' },
  'derived-from': { label: 'derived from', inverse: 'leads to' },
  'special-case-of': { label: 'special case of', inverse: 'generalized by' },
  'part-of': { label: 'part of', inverse: 'includes' },
  explains: { label: 'explains', inverse: 'explained by' },
  related: { label: 'related to', inverse: 'related to', symmetric: true },
  'same-idea': { label: 'same idea as', inverse: 'same idea as', symmetric: true },
  tension: { label: 'in tension with', inverse: 'in tension with', symmetric: true },
};

export const AREA_COLORS = [
  '#8b7cf6', '#2bb3a3', '#e0a33a', '#e0697a', '#4f9ee8',
  '#7cc56f', '#d07fd8', '#e5845a', '#8a93a6', '#c9b458',
];

export function slugify(text) {
  return String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function uniqueId(base, taken) {
  const root = base || 'item';
  if (!taken.has(root)) return root;
  let n = 2;
  while (taken.has(`${root}-${n}`)) n++;
  return `${root}-${n}`;
}
