// Force-directed graph on SVG. Small custom simulation: fine for a few hundred nodes.

const NS = 'http://www.w3.org/2000/svg';
const savedPositions = new Map(); // id -> {x, y}; survives re-mounts within a session

export function shapePath(type, r) {
  switch (type) {
    case 'theory': {
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        pts.push(`${(Math.cos(a) * r * 1.12).toFixed(2)},${(Math.sin(a) * r * 1.12).toFixed(2)}`);
      }
      return `M${pts.join('L')}Z`;
    }
    case 'equation': {
      const s = r * 0.92;
      const k = r * 0.3;
      return `M${-s + k},${-s}H${s - k}Q${s},${-s} ${s},${-s + k}V${s - k}Q${s},${s} ${s - k},${s}H${-s + k}Q${-s},${s} ${-s},${s - k}V${-s + k}Q${-s},${-s} ${-s + k},${-s}Z`;
    }
    case 'example': {
      const s = r * 1.2;
      return `M0,${-s}L${s},0L0,${s}L${-s},0Z`;
    }
    case 'note': {
      const s = r * 1.15;
      return `M0,${-s}L${s * 0.95},${s * 0.7}L${-s * 0.95},${s * 0.7}Z`;
    }
    default:
      return `M${-r},0a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 ${-r * 2},0`;
  }
}

// Nodes may bring a starting x/y, a radius, a shorter label (and labelY), a className, and fixed: true
// to stay where they are put. Edges may bring a className. A node with class "quiet" hides its label
// until hovered, and doesn't count it when fitting.
// remember: false keeps this graph's layout out of the shared memory (small side maps).
// wheelZoom: false leaves the mouse wheel to scroll the page; Ctrl + wheel still zooms.
// pad: empty space kept around the graph when fitting; fitLabels: fit to label widths too; maxZoom: closest fit.
export function mountGraph(
  container,
  { nodes, edges, groups, selectedId, onSelect, onOpen, insetLeft = () => 0, remember: keepLayout = true, wheelZoom = true, pad = 60, fitLabels = false, maxZoom = 1.4, route = null, routeDone = null, routeNext = null },
) {
  const positions = keepLayout ? savedPositions : new Map();
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('graph-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Graph of entries and their connections');
  const viewport = document.createElementNS(NS, 'g');
  const edgeLayer = document.createElementNS(NS, 'g');
  const nodeLayer = document.createElementNS(NS, 'g');
  // The main path, when shown: one polyline through its steps, drawn over the edges.
  const routeLayer = document.createElementNS(NS, 'g');
  viewport.append(edgeLayer, routeLayer, nodeLayer);
  if (route) svg.classList.add('route-on');
  svg.append(viewport);
  container.append(svg);

  const byId = new Map();
  const groupIndex = new Map(groups.map((g, i) => [g, i]));
  const spread = 160 + 34 * Math.sqrt(nodes.length);
  const remember = (n) => positions.set(n.id, { x: n.x, y: n.y });

  for (const n of nodes) {
    const saved = positions.get(n.id);
    const gi = groupIndex.get(n.group) ?? groups.length;
    const angle = (2 * Math.PI * gi) / Math.max(1, groups.length) - Math.PI / 2;
    n.ax = groups.length > 1 ? Math.cos(angle) * spread * 0.8 : 0; // group anchor
    n.ay = groups.length > 1 ? Math.sin(angle) * spread * 0.8 : 0;
    n.x = saved ? saved.x : (n.x ?? n.ax + (Math.random() - 0.5) * spread * 0.6);
    n.y = saved ? saved.y : (n.y ?? n.ay + (Math.random() - 0.5) * spread * 0.6);
    n.vx = 0;
    n.vy = 0;
    n.r = n.radius ?? 6 + Math.min(10, 2.2 * Math.sqrt(n.degree));
    n.pinned = !!n.fixed;
    n.neighbors = new Set();
    byId.set(n.id, n);
  }
  const links = edges
    .filter((e) => byId.has(e.source) && byId.has(e.target))
    .map((e) => {
      const s = byId.get(e.source);
      const t = byId.get(e.target);
      s.neighbors.add(t.id);
      t.neighbors.add(s.id);
      return { ...e, s, t };
    });

  // ---- DOM
  for (const l of links) {
    l.el = document.createElementNS(NS, 'line');
    l.el.setAttribute('class', `edge k-${l.kind}${l.className ? ` ${l.className}` : ''}`);
    edgeLayer.append(l.el);
  }
  const degreeCut = [...nodes].map((n) => n.degree).sort((a, b) => b - a)[Math.min(nodes.length - 1, 7)] ?? 0;
  for (const n of nodes) {
    const g = document.createElementNS(NS, 'g');
    const routeClass = !route ? '' : n.id === routeNext ? ' on-route route-next' : routeDone?.has(n.id) ? ' on-route route-done' : route.includes(n.id) ? ' on-route' : '';
    g.setAttribute('class', `node t-${n.type}${n.degree >= Math.max(3, degreeCut) ? ' big' : ''}${n.className ? ` ${n.className}` : ''}${routeClass}`);
    g.style.setProperty('--c', n.color);
    g.dataset.id = n.id;
    const halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('class', 'halo');
    halo.setAttribute('r', n.r + 9);
    const shape = document.createElementNS(NS, 'path');
    shape.setAttribute('class', 'shape');
    shape.setAttribute('d', shapePath(n.type, n.r));
    const title = document.createElementNS(NS, 'title');
    title.textContent = n.title;
    const label = document.createElementNS(NS, 'text');
    label.setAttribute('class', 'label');
    label.setAttribute('y', n.labelY ?? n.r + 15);
    label.textContent = n.label ?? (n.title.length > 38 ? `${n.title.slice(0, 36)}…` : n.title);
    n.quiet = /quiet/.test(n.className || '');
    n.halfLabel = fitLabels && !n.quiet ? label.textContent.length * 3.2 + 5 : 0;
    g.append(halo, shape, title, label);
    nodeLayer.append(g);
    n.el = g;
  }

  const routeSegs = [];
  for (let i = 1; route && i < route.length; i++) {
    const a = byId.get(route[i - 1]);
    const b = byId.get(route[i]);
    if (!a || !b) continue;
    const el = document.createElementNS(NS, 'line');
    el.setAttribute('class', `route-seg${routeDone?.has(a.id) && routeDone?.has(b.id) ? ' done' : ''}`);
    routeLayer.append(el);
    routeSegs.push({ a, b, el });
  }

  // ---- view transform
  const view = { x: 0, y: 0, k: 1 };
  const applyView = () => {
    viewport.setAttribute('transform', `translate(${view.x},${view.y}) scale(${view.k})`);
    svg.classList.toggle('far', view.k < 0.85 && nodes.length > 25);
  };
  const toWorld = (cx, cy) => {
    const rect = svg.getBoundingClientRect();
    return { x: (cx - rect.left - view.x) / view.k, y: (cy - rect.top - view.y) / view.k };
  };
  function fit(animate = true) {
    const rect = svg.getBoundingClientRect();
    if (!nodes.length || !rect.width) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const n of nodes) {
      const half = Math.max(n.r, n.halfLabel);
      const ly = n.quiet ? 0 : (n.labelY ?? n.r + 15);
      x0 = Math.min(x0, n.x - half); y0 = Math.min(y0, n.y - n.r, n.y + ly - 13);
      x1 = Math.max(x1, n.x + half); y1 = Math.max(y1, n.y + n.r, n.y + ly + 4);
    }
    const left = Math.min(insetLeft(), rect.width * 0.4);
    const w = rect.width - left;
    const labelRoom = fitLabels ? 0 : 120;
    const k = Math.max(0.2, Math.min(maxZoom, Math.min((w - pad * 2) / (x1 - x0 + labelRoom || 1), (rect.height - pad * 2) / (y1 - y0 || 1))));
    const target = { k, x: left + w / 2 - ((x0 + x1) / 2) * k, y: rect.height / 2 - ((y0 + y1) / 2) * k };
    if (!animate) return Object.assign(view, target), applyView();
    const from = { ...view };
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 380);
      const e = 1 - (1 - p) ** 3;
      view.x = from.x + (target.x - from.x) * e;
      view.y = from.y + (target.y - from.y) * e;
      view.k = from.k + (target.k - from.k) * e;
      applyView();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ---- simulation
  let alpha = positions.size && nodes.every((n) => positions.has(n.id)) ? 0.25 : 1;
  let frame = null;
  let fittedOnce = false;
  const LINK_DIST = 95;

  function tick() {
    const n = nodes.length;
    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 > 640000) continue;
        if (d2 < 0.01) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; d2 = 0.5; }
        const d = Math.sqrt(d2);
        let f = (4200 * alpha) / d2;
        // labels are wide: keep more room side by side than stacked
        const minD = a.r + b.r + 22 + 46 * Math.min(1, Math.abs(dx) / d);
        if (d < minD) f += (minD - d) * 0.12;
        f = Math.min(f, 50);
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }
    for (const l of links) {
      const dx = l.t.x - l.s.x;
      const dy = l.t.y - l.s.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const k = ((d - LINK_DIST) / d) * 0.045 * alpha;
      const wS = l.t.neighbors.size / (l.s.neighbors.size + l.t.neighbors.size);
      l.s.vx += dx * k * wS; l.s.vy += dy * k * wS;
      l.t.vx -= dx * k * (1 - wS); l.t.vy -= dy * k * (1 - wS);
    }
    for (const a of nodes) {
      a.vx += (a.ax - a.x) * 0.0022 * alpha - a.x * 0.0006 * alpha;
      a.vy += (a.ay - a.y) * 0.0022 * alpha - a.y * 0.0006 * alpha;
      if (a.pinned) { a.vx = a.vy = 0; continue; }
      a.vx *= 0.62; a.vy *= 0.62;
      a.x += a.vx; a.y += a.vy;
    }
  }

  function draw() {
    for (const l of links) {
      l.el.setAttribute('x1', l.s.x.toFixed(1));
      l.el.setAttribute('y1', l.s.y.toFixed(1));
      l.el.setAttribute('x2', l.t.x.toFixed(1));
      l.el.setAttribute('y2', l.t.y.toFixed(1));
    }
    for (const seg of routeSegs) {
      seg.el.setAttribute('x1', seg.a.x.toFixed(1));
      seg.el.setAttribute('y1', seg.a.y.toFixed(1));
      seg.el.setAttribute('x2', seg.b.x.toFixed(1));
      seg.el.setAttribute('y2', seg.b.y.toFixed(1));
    }
    for (const n of nodes) n.el.setAttribute('transform', `translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`);
  }

  function loop() {
    const steps = alpha > 0.5 ? 3 : 1;
    for (let i = 0; i < steps; i++) {
      tick();
      alpha *= 0.982;
    }
    draw();
    if (!fittedOnce && alpha < 0.12) { fittedOnce = true; fit(); }
    if (alpha > 0.004) frame = requestAnimationFrame(loop);
    else {
      frame = null;
      for (const nd of nodes) remember(nd);
    }
  }
  function reheat(to = 0.3) {
    alpha = Math.max(alpha, to);
    if (!frame) frame = requestAnimationFrame(loop);
  }

  // Warm start off-screen so the first paint isn't a jumble.
  if (alpha === 1) for (let i = 0; i < 120; i++) { tick(); alpha *= 0.985; }
  draw();
  fit(false);
  if (alpha < 0.12) fittedOnce = true;
  frame = requestAnimationFrame(loop);

  // ---- highlight + selection
  let selected = selectedId || null;
  function light(id) {
    svg.classList.toggle('hovering', !!id);
    const nb = id ? byId.get(id)?.neighbors : null;
    for (const nd of nodes) nd.el.classList.toggle('lit', !!id && (nd.id === id || nb?.has(nd.id)));
    for (const l of links) l.el.classList.toggle('lit', !!id && (l.s.id === id || l.t.id === id));
  }
  function select(id) {
    selected = id;
    for (const nd of nodes) nd.el.classList.toggle('selected', nd.id === id);
  }
  select(selected);

  // ---- pointer interaction
  let drag = null; // { mode: 'pan'|'node', startX, startY, moved, node, vx0, vy0 }
  svg.addEventListener('pointerdown', (ev) => {
    if (ev.button !== 0) return;
    const nodeEl = ev.target.closest?.('.node');
    svg.setPointerCapture(ev.pointerId);
    drag = { startX: ev.clientX, startY: ev.clientY, moved: false };
    if (nodeEl) {
      drag.mode = 'node';
      drag.node = byId.get(nodeEl.dataset.id);
      drag.node.pinned = true;
    } else {
      drag.mode = 'pan';
      drag.vx0 = view.x;
      drag.vy0 = view.y;
    }
  });
  svg.addEventListener('pointermove', (ev) => {
    if (!drag) {
      const nodeEl = ev.target.closest?.('.node');
      light(nodeEl ? nodeEl.dataset.id : null);
      return;
    }
    const dx = ev.clientX - drag.startX;
    const dy = ev.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
    if (!drag.moved) return;
    if (drag.mode === 'pan') {
      svg.classList.add('panning');
      view.x = drag.vx0 + dx;
      view.y = drag.vy0 + dy;
      applyView();
    } else {
      const p = toWorld(ev.clientX, ev.clientY);
      drag.node.x = p.x;
      drag.node.y = p.y;
      light(drag.node.id);
      reheat(0.25);
      draw();
    }
  });
  const endDrag = (ev) => {
    if (!drag) return;
    svg.classList.remove('panning');
    if (drag.mode === 'node') {
      drag.node.pinned = !!drag.node.fixed;
      if (!drag.moved) {
        select(drag.node.id);
        onSelect?.(drag.node.id);
      }
      remember(drag.node);
    } else if (!drag.moved && ev.type === 'pointerup') {
      select(null);
      onSelect?.(null);
    }
    drag = null;
  };
  svg.addEventListener('pointerup', endDrag);
  svg.addEventListener('pointercancel', endDrag);
  svg.addEventListener('pointerleave', () => !drag && light(null));
  svg.addEventListener('dblclick', (ev) => {
    const nodeEl = ev.target.closest?.('.node');
    if (nodeEl) onOpen?.(nodeEl.dataset.id);
  });
  svg.addEventListener(
    'wheel',
    (ev) => {
      if (!wheelZoom && !ev.ctrlKey) return;
      ev.preventDefault();
      const rect = svg.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;
      const factor = Math.exp(-ev.deltaY * (ev.ctrlKey ? 0.01 : 0.0015));
      const k = Math.max(0.15, Math.min(4, view.k * factor));
      view.x = mx - ((mx - view.x) * k) / view.k;
      view.y = my - ((my - view.y) * k) / view.k;
      view.k = k;
      applyView();
    },
    { passive: false },
  );

  function zoomBy(factor) {
    const rect = svg.getBoundingClientRect();
    const mx = rect.width / 2;
    const my = rect.height / 2;
    const k = Math.max(0.15, Math.min(4, view.k * factor));
    view.x = mx - ((mx - view.x) * k) / view.k;
    view.y = my - ((my - view.y) * k) / view.k;
    view.k = k;
    applyView();
  }

  function centerOn(id) {
    const nd = byId.get(id);
    if (!nd) return;
    const rect = svg.getBoundingClientRect();
    view.x = rect.width / 2 - nd.x * view.k;
    view.y = rect.height / 2 - nd.y * view.k;
    applyView();
  }

  function relayout() {
    for (const nd of nodes) {
      positions.delete(nd.id);
      if (nd.fixed) continue;
      nd.x = nd.ax + (Math.random() - 0.5) * spread * 0.6;
      nd.y = nd.ay + (Math.random() - 0.5) * spread * 0.6;
    }
    fittedOnce = false;
    reheat(1);
  }

  applyView();
  return {
    fit,
    zoomBy,
    select,
    centerOn,
    relayout,
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      for (const nd of nodes) remember(nd);
      svg.remove();
    },
  };
}
