// Learning paths: which entries you need before an entry, in study order.
// Shared by the browser and scripts/check.js.
//
// "A builds on B" and "A derived from B" mean B comes first.
// "B part of A" also means B comes first (you learn the parts of A to learn A).
export const PREREQUISITE_KINDS = { 'builds-on': 'out', 'derived-from': 'out', 'part-of': 'in' };

export function prerequisiteMap(links) {
  const needs = new Map(); // id -> Set of ids it needs
  const add = (topic, prereq) => {
    if (!needs.has(topic)) needs.set(topic, new Set());
    needs.get(topic).add(prereq);
  };
  for (const l of links) {
    const dir = PREREQUISITE_KINDS[l.kind];
    if (dir === 'out') add(l.from, l.to);
    else if (dir === 'in') add(l.to, l.from);
  }
  return needs;
}

// Every prerequisite of `id`, direct or indirect. Level 0 needs nothing else in the
// path; an entry's level is one more than its highest prerequisite.
export function learningPath(id, needs) {
  const level = new Map();
  const onStack = new Set();
  const cycles = [];

  function visit(node, trail) {
    if (level.has(node)) return level.get(node);
    if (onStack.has(node)) {
      cycles.push([...trail.slice(trail.indexOf(node)), node]);
      return 0;
    }
    onStack.add(node);
    let depth = 0;
    for (const p of needs.get(node) || []) depth = Math.max(depth, visit(p, [...trail, node]) + 1);
    onStack.delete(node);
    level.set(node, depth);
    return depth;
  }

  visit(id, []);
  level.delete(id);
  const steps = [...level].map(([entryId, lvl]) => ({ id: entryId, level: lvl }));
  steps.sort((a, b) => a.level - b.level);
  return { steps, cycles };
}
