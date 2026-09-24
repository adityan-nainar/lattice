// The small network beside a topic on the Explore page: the topic in the middle, what it links to
// directly on a ring around it (labelled, basics first from the top), and topics two steps away on
// an outer ring next to the connection that leads there (small and faint, labelled where there's room).
// Positions are computed here and fixed, so labels never pile up in the small space.

import { basicsOf } from './explore.js';
import { openCount } from './questions.js';
import { store } from './store.js';
import { colorOf } from './ui.js';

const MAX_OUTER = 40;
const SQUASH = 1.2; // the map is taller than it is wide

// Labels in the map: cut at a word, full title on hover.
const shortTitle = (t, max) => (t.length <= max ? t : `${t.slice(0, max).replace(/[\s,&:–—-]+\S*$/, '')}…`);

const hit = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
const shapeBox = (n) => ({ l: n.x - n.radius - 2, r: n.x + n.radius + 2, t: n.y - n.radius - 2, b: n.y + n.radius + 2 });
// Label boxes, from the label sizes in app.css: 11.5px text (about 6.4px a character), 10px on the outer ring.
function labelBox(n) {
  const w = n.label.length * (n.outer ? 5.6 : 6.4) + 10;
  const baseline = n.y + n.labelY;
  return { l: n.x - w / 2, r: n.x + w / 2, t: baseline - (n.outer ? 11 : 13), b: baseline + 4 };
}

export function topicMapData(e) {
  const neighbours = (id) => new Set(store.connections(id).map((c) => c.other).filter((o) => o !== id && store.entry(o)));

  const basics = new Set(basicsOf(e.id).map((b) => b.entry.id));
  const conns = store.connections(e.id);
  const rank = (id) => (basics.has(id) ? 0 : conns.some((c) => c.other === id && c.link.kind === 'example-of') ? 2 : 1);
  const firstIds = neighbours(e.id);
  const first = [...firstIds].map((id) => store.entry(id)).sort((a, b) => rank(a.id) - rank(b.id));

  // Two steps away: reached through one or more direct connections. Most-shared first.
  const via = new Map();
  for (const f of first) {
    for (const o of neighbours(f.id)) {
      if (o === e.id || firstIds.has(o)) continue;
      if (!via.has(o)) via.set(o, []);
      via.get(o).push(f.id);
    }
  }
  const outerAll = [...via.keys()]
    .map((id) => store.entry(id))
    .sort((a, b) => via.get(b.id).length - via.get(a.id).length || store.connections(b.id).length - store.connections(a.id).length);
  const outer = outerAll.slice(0, MAX_OUTER);

  const inner = new Set([e.id, ...firstIds]);
  const shown = new Set([...inner, ...outer.map((x) => x.id)]);
  const edges = store.links
    .filter((l) => l.from !== l.to && shown.has(l.from) && shown.has(l.to) && (inner.has(l.from) || inner.has(l.to)))
    .map((l) => ({ source: l.from, target: l.to, kind: l.kind, className: inner.has(l.from) && inner.has(l.to) ? '' : 'outer' }));
  const degree = new Map();
  for (const l of edges) for (const id of [l.source, l.target]) degree.set(id, (degree.get(id) || 0) + 1);

  const node = (x, props) => ({
    id: x.id,
    title: x.title,
    type: x.type,
    color: colorOf(x),
    degree: degree.get(x.id) || 0,
    className: openCount(x.id) ? 'stuck' : '',
    fixed: true,
    x: 0,
    y: 0,
    ...props,
  });
  const center = node(e, { label: shortTitle(e.title, 36), radius: 15, labelY: 30 });
  const ring = first.map((x) => {
    const radius = 7 + Math.min(5, 1.6 * Math.sqrt(degree.get(x.id) || 0));
    return node(x, { label: shortTitle(x.title, 22), radius, labelY: radius + 15 });
  });
  const far = outer.map((x) => node(x, { label: shortTitle(x.title, 20), radius: 4.5, outer: true, className: `outer${openCount(x.id) ? ' stuck' : ''}` }));

  placeRing(center, ring);
  placeOuter([center, ...ring], far, via);
  return { nodes: [center, ...ring, ...far], edges, direct: first.length, further: outerAll.length, furtherShown: outer.length };
}

// Smallest ring (or two or three staggered rings) where no label runs into another label or node.
function placeRing(center, around) {
  const boxes = (n) => [shapeBox(n), labelBox(n)];
  const clear = (all) => {
    const bs = all.map(boxes);
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++) if (bs[i].some((a) => bs[j].some((b) => hit(a, b)))) return false;
    return true;
  };
  const count = around.length;
  for (let R = 80; R <= 480; R += 10) {
    for (const rings of count > 5 ? [[1], [1, 0.64], [1, 0.72, 0.46]] : [[1]]) {
      around.forEach((n, i) => {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2;
        const r = R * rings[i % rings.length];
        n.x = Math.cos(angle) * r;
        n.y = Math.sin(angle) * r * SQUASH;
      });
      if (clear([center, ...around])) return;
    }
  }
}

// Outer ring: each topic sits at the average direction of the connections that lead to it,
// nudged apart until nodes don't touch, on the smallest ring that clears the inner labels.
function placeOuter(inner, outer, via) {
  if (!outer.length) return;
  const byId = new Map(inner.map((n) => [n.id, n]));
  const angleOf = (n) => Math.atan2(n.y / SQUASH, n.x);
  const TAU = 2 * Math.PI;
  const wanted = outer.map((n) => {
    const ps = via.get(n.id).map((id) => byId.get(id));
    return Math.atan2(ps.reduce((s, p) => s + Math.sin(angleOf(p)), 0), ps.reduce((s, p) => s + Math.cos(angleOf(p)), 0));
  });
  const order = outer.map((_, i) => i).sort((a, b) => wanted[a] - wanted[b]);
  const innerR = Math.max(0, ...inner.slice(1).map((n) => Math.hypot(n.x, n.y / SQUASH)));
  const innerBoxes = inner.flatMap((n) => [shapeBox(n), labelBox(n)]);

  // Angles as close as possible to the wanted ones, in the same order, at least `gap` apart.
  // Cut the circle at the widest empty stretch, then it's a straight line: with q[i] = angle[i] - i·gap
  // the constraint is just "q never decreases", solved by pooling adjacent violators.
  const n = order.length;
  const sorted = order.map((i) => wanted[i]);
  let cut = 0;
  let widest = -1;
  for (let k = 0; k < n; k++) {
    const next = k + 1 < n ? sorted[k + 1] : sorted[0] + TAU;
    if (next - sorted[k] > widest) [widest, cut] = [next - sorted[k], (k + 1) % n];
  }
  const line = Array.from({ length: n }, (_, k) => {
    const i = (cut + k) % n;
    return { node: outer[order[i]], want: sorted[i] + (i < cut ? TAU : 0) };
  });

  const spread = (R) => {
    const gap = (outer[0].radius * 2 + 9) / R;
    if (gap * n >= TAU) return false;
    const blocks = [];
    line.forEach((p, k) => {
      blocks.push({ sum: p.want - k * gap, count: 1 });
      while (blocks.length > 1 && blocks.at(-2).sum / blocks.at(-2).count > blocks.at(-1).sum / blocks.at(-1).count) {
        const last = blocks.pop();
        blocks.at(-1).sum += last.sum;
        blocks.at(-1).count += last.count;
      }
    });
    const q = blocks.flatMap((b) => Array(b.count).fill(b.sum / b.count));
    const angles = q.map((v, k) => v + k * gap);
    if (angles[n - 1] - angles[0] > TAU - gap + 1e-9) return false; // would run into itself round the back
    line.forEach((p, k) => {
      p.node.x = Math.cos(angles[k]) * R;
      p.node.y = Math.sin(angles[k]) * R * SQUASH;
    });
    return true;
  };

  let R = innerR + 60;
  for (let tries = 0; tries < 60; tries++, R += 12) {
    if (spread(R) && !outer.some((o) => innerBoxes.some((b) => hit(shapeBox(o), b)))) break;
  }

  // Labels point outwards (or inwards if that fits); each shows only if it has room, most-shared first.
  const taken = [...innerBoxes, ...outer.map(shapeBox)];
  for (const o of outer) {
    const out = o.y < 0 ? -(o.radius + 5) : o.radius + 13;
    const inward = o.y < 0 ? o.radius + 13 : -(o.radius + 5);
    const fits = [out, inward].find((y) => {
      o.labelY = y;
      return !taken.some((b) => hit(labelBox(o), b));
    });
    if (fits === undefined) {
      o.labelY = out;
      o.className += ' quiet';
    } else {
      o.labelY = fits;
      taken.push(labelBox(o));
    }
  }
}
