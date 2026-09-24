// The whole library as a 3D universe: areas are galaxies, entries are stars, links are threads of light.
// A small hand-rolled 3D engine on a 2D canvas (no WebGL, no dependencies): force layout in 3D,
// perspective projection, orbit camera. Same interface as mountGraph in graph.js, so the Graph
// page can switch between the two.

const saved = new Map(); // id -> {x, y, z}; survives re-mounts within a session
const TAU = Math.PI * 2;
const NEAR = 20;
const LINK_DIST = 80;
const TYPE_SIZE = { theory: 1.2, concept: 1, equation: 1, question: 1, example: 0.7, note: 0.7 };

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Evenly spread points on a sphere: where the galaxies (areas) sit. Each galaxy also gets a tilt
// (the normal of its disc), so the areas look like flattened galaxies at different angles.
function fibonacciSphere(count, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = count === 1 ? 0 : 1 - (2 * i) / (count - 1);
    const ring = Math.sqrt(1 - y * y);
    const a = golden * i;
    const t = golden * (i + 3) * 1.7;
    const nx = Math.cos(t) * 0.6, ny = 0.8, nz = Math.sin(t) * 0.6;
    const len = Math.hypot(nx, ny, nz);
    return { x: Math.cos(a) * ring * radius, y: y * radius, z: Math.sin(a) * ring * radius, nx: nx / len, ny: ny / len, nz: nz / len };
  });
}

export function mountUniverse(container, { nodes, edges, groups, selectedId, onSelect, onOpen, insetLeft = () => 0, route = null, routeDone = null, routeNext = null }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'universe';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Universe of entries and their connections');
  container.append(canvas);
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const font = getComputedStyle(container).fontFamily || 'system-ui, sans-serif';

  // ---- world
  const anchors = fibonacciSphere(Math.max(1, groups.length), groups.length > 1 ? 380 + 30 * groups.length : 0);
  const groupIndex = new Map(groups.map((g, i) => [g, i]));
  const byId = new Map();
  const scatter = (n) => {
    const u = Math.random() * TAU;
    const v = Math.acos(2 * Math.random() - 1);
    const d = 60 + Math.random() * 90;
    n.x = n.anchor.x + Math.sin(v) * Math.cos(u) * d;
    n.y = n.anchor.y + Math.cos(v) * d;
    n.z = n.anchor.z + Math.sin(v) * Math.sin(u) * d;
  };
  for (const n of nodes) {
    n.anchor = anchors[groupIndex.get(n.group) ?? 0] || { x: 0, y: 0, z: 0, nx: 0, ny: 1, nz: 0 };
    const s = saved.get(n.id);
    if (s) Object.assign(n, s);
    else scatter(n);
    n.vx = n.vy = n.vz = 0;
    n.size = (3.2 + 1.9 * Math.sqrt(n.degree)) * (TYPE_SIZE[n.type] ?? 1);
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
  const bigCut = [...nodes].map((n) => n.degree).sort((a, b) => b - a)[Math.min(nodes.length - 1, 11)] ?? 0;
  // The main path, when shown: an ordered list of node ids drawn as one gold line.
  const onRoute = new Set(route || []);

  // Background stars: directions on the sky sphere, so they turn with the camera but never get closer.
  const sky = Array.from({ length: 1600 }, () => {
    const u = Math.random() * TAU;
    const v = Math.acos(2 * Math.random() - 1);
    return { x: Math.sin(v) * Math.cos(u), y: Math.cos(v), z: Math.sin(v) * Math.sin(u), b: Math.random() ** 3, t: Math.random() * TAU };
  });

  // ---- simulation (3D forces)
  let alpha = nodes.length && nodes.every((n) => saved.has(n.id)) ? 0.05 : 1;
  let refit = alpha === 1; // fit again once the layout has settled
  function tick() {
    const count = nodes.length;
    for (let i = 0; i < count; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < count; j++) {
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dz = b.z - a.z;
        let d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > 360000) continue;
        if (d2 < 0.01) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; dz = Math.random() - 0.5; d2 = 0.5; }
        const d = Math.sqrt(d2);
        let f = (5200 * alpha) / d2;
        const minD = a.size + b.size + 16;
        if (d < minD) f += (minD - d) * 0.1;
        f = Math.min(f, 40);
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        const fz = (dz / d) * f;
        a.vx -= fx; a.vy -= fy; a.vz -= fz;
        b.vx += fx; b.vy += fy; b.vz += fz;
      }
    }
    for (const l of links) {
      const dx = l.t.x - l.s.x;
      const dy = l.t.y - l.s.y;
      const dz = l.t.z - l.s.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const k = ((d - LINK_DIST) / d) * 0.04 * alpha;
      const wS = l.t.neighbors.size / (l.s.neighbors.size + l.t.neighbors.size);
      l.s.vx += dx * k * wS; l.s.vy += dy * k * wS; l.s.vz += dz * k * wS;
      l.t.vx -= dx * k * (1 - wS); l.t.vy -= dy * k * (1 - wS); l.t.vz -= dz * k * (1 - wS);
    }
    for (const n of nodes) {
      const a = n.anchor;
      n.vx += (a.x - n.x) * 0.006 * alpha;
      n.vy += (a.y - n.y) * 0.006 * alpha;
      n.vz += (a.z - n.z) * 0.006 * alpha;
      // flatten towards the galaxy's disc
      const off = ((n.x - a.x) * a.nx + (n.y - a.y) * a.ny + (n.z - a.z) * a.nz) * 0.03 * alpha;
      n.vx -= a.nx * off; n.vy -= a.ny * off; n.vz -= a.nz * off;
      n.vx *= 0.6; n.vy *= 0.6; n.vz *= 0.6;
      n.x += n.vx; n.y += n.vy; n.z += n.vz;
    }
  }
  if (alpha === 1) for (let i = 0; i < 220; i++) { tick(); alpha *= 0.985; }

  // ---- camera
  const cam = { yaw: 0.6, pitch: -0.28, dist: 900, tx: 0, ty: 0, tz: 0 };
  let W = 0, H = 0, dpr = 1, focal = 600;
  function resize() {
    const r = container.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width;
    H = r.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    focal = Math.min(W, H) * 1.05;
  }
  resize();
  const center = () => ({ x: Math.min(insetLeft(), W * 0.4) + (W - Math.min(insetLeft(), W * 0.4)) / 2, y: H / 2 });

  let rot = null;
  const project = (x, y, z, c) => {
    const px = x - cam.tx;
    const py = y - cam.ty;
    const pz = z - cam.tz;
    const x1 = px * rot.cy - pz * rot.sy;
    const z1 = px * rot.sy + pz * rot.cy;
    const y2 = py * rot.cp - z1 * rot.sp;
    const z2 = py * rot.sp + z1 * rot.cp;
    const depth = z2 + cam.dist;
    if (depth < NEAR) return null;
    const s = focal / depth;
    return { x: c.x + x1 * s, y: c.y + y2 * s, s, depth };
  };

  // Smooth camera moves (fit, zoom, fly to a star).
  let flight = null;
  function flyTo(to, ms = 650) {
    const from = { ...cam };
    const t0 = performance.now();
    flight = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - (1 - p) ** 3;
      for (const k of Object.keys(to)) cam[k] = from[k] + (to[k] - from[k]) * e;
      if (p >= 1) flight = null;
    };
  }

  function fit(animate = true) {
    if (!nodes.length) return;
    let cx = 0, cy = 0, cz = 0;
    for (const n of nodes) { cx += n.x; cy += n.y; cz += n.z; }
    cx /= nodes.length; cy /= nodes.length; cz /= nodes.length;
    // Frame most of the universe; a few far-flung stars may sit just outside.
    const reach = nodes.map((n) => Math.hypot(n.x - cx, n.y - cy, n.z - cz) + n.size).sort((a, b) => a - b);
    const R = Math.max(40, reach[Math.floor((reach.length - 1) * 0.94)]);
    const usable = Math.min(W - Math.min(insetLeft(), W * 0.4), H) / 2 - 30;
    const dist = clamp((R * focal) / Math.max(80, usable) + R * 0.2, 120, 20000);
    const to = { tx: cx, ty: cy, tz: cz, dist };
    if (animate) flyTo(to);
    else Object.assign(cam, to);
  }

  // ---- interaction state
  let hovered = null;
  let selected = selectedId && byId.has(selectedId) ? selectedId : null;
  let lastInput = -Infinity;
  let projected = []; // [{ n, x, y, r, depth }] from the last frame, front-most last

  function pick(mx, my) {
    let best = null;
    for (const p of projected) {
      const hitR = Math.max(6, p.r) + 3;
      if ((p.x - mx) ** 2 + (p.y - my) ** 2 <= hitR * hitR && (!best || p.depth < best.depth)) best = p;
    }
    return best?.n || null;
  }

  const pointers = new Map();
  let drag = null;
  let lastClick = { id: null, t: 0 }; // the first click of a double-click starts a camera flight
  const local = (ev) => {
    const r = canvas.getBoundingClientRect();
    return { x: ev.clientX - r.left, y: ev.clientY - r.top };
  };
  canvas.addEventListener('pointerdown', (ev) => {
    canvas.setPointerCapture?.(ev.pointerId);
    pointers.set(ev.pointerId, local(ev));
    lastInput = performance.now();
    flight = null;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      drag = { mode: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y), dist0: cam.dist, moved: true };
      return;
    }
    const p = local(ev);
    drag = { mode: ev.button === 2 || ev.shiftKey ? 'pan' : 'orbit', x: p.x, y: p.y, sx: p.x, sy: p.y, moved: false };
  });
  canvas.addEventListener('pointermove', (ev) => {
    const p = local(ev);
    if (pointers.has(ev.pointerId)) pointers.set(ev.pointerId, p);
    if (!drag) {
      hovered = pick(p.x, p.y);
      canvas.style.cursor = hovered ? 'pointer' : 'grab';
      return;
    }
    lastInput = performance.now();
    if (drag.mode === 'pinch') {
      if (pointers.size < 2) return;
      const [a, b] = [...pointers.values()];
      cam.dist = clamp((drag.dist0 * drag.d0) / Math.max(10, Math.hypot(a.x - b.x, a.y - b.y)), 60, 20000);
      return;
    }
    const dx = p.x - drag.x;
    const dy = p.y - drag.y;
    drag.x = p.x;
    drag.y = p.y;
    if (!drag.moved && Math.hypot(p.x - drag.sx, p.y - drag.sy) > 4) drag.moved = true;
    if (!drag.moved) return;
    canvas.style.cursor = 'grabbing';
    if (drag.mode === 'orbit') {
      cam.yaw += dx * 0.006;
      cam.pitch = clamp(cam.pitch + dy * 0.006, -1.45, 1.45);
    } else {
      // Move the point we orbit so the world follows the pointer: the screen's right and down
      // directions, turned back into world space (the inverse of the rotation in project()).
      const k = cam.dist / focal;
      const [cy, sy, cp, sp] = [Math.cos(cam.yaw), Math.sin(cam.yaw), Math.cos(cam.pitch), Math.sin(cam.pitch)];
      cam.tx -= k * (dx * cy - dy * sp * sy);
      cam.ty -= k * (dy * cp);
      cam.tz -= k * (-dx * sy - dy * sp * cy);
    }
  });
  const end = (ev) => {
    pointers.delete(ev.pointerId);
    if (!drag) return;
    if (drag.mode === 'pinch') {
      if (pointers.size === 0) drag = null;
      return;
    }
    if (!drag.moved && ev.type === 'pointerup') {
      const p = local(ev);
      const n = pick(p.x, p.y);
      select(n ? n.id : null);
      onSelect?.(n ? n.id : null);
      if (n) {
        lastClick = { id: n.id, t: performance.now() };
        centerOn(n.id);
      }
    }
    drag = null;
    canvas.style.cursor = hovered ? 'pointer' : 'grab';
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => { if (!drag) hovered = null; });
  canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());
  canvas.addEventListener('dblclick', (ev) => {
    const recent = performance.now() - lastClick.t < 700 && byId.get(lastClick.id);
    const p = local(ev);
    const n = recent || pick(p.x, p.y);
    if (n) onOpen?.(n.id);
  });
  canvas.addEventListener(
    'wheel',
    (ev) => {
      ev.preventDefault();
      lastInput = performance.now();
      flight = null;
      cam.dist = clamp(cam.dist * Math.exp(ev.deltaY * (ev.ctrlKey ? 0.01 : 0.0012)), 60, 20000);
    },
    { passive: false },
  );

  // ---- drawing
  // Only the on-screen part of a line gets stroked (Liang–Barsky clipping). Zoomed in, links run
  // thousands of pixels off-screen, and stroking them whole made close-up frames several times slower.
  function line(a, b) {
    const m = 8;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    let t0 = 0, t1 = 1;
    for (const [p, q] of [[-dx, a.x + m], [dx, W + m - a.x], [-dy, a.y + m], [dy, H + m - a.y]]) {
      if (p === 0) {
        if (q < 0) return;
        continue;
      }
      const t = q / p;
      if (p < 0) {
        if (t > t1) return;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return;
        if (t < t1) t1 = t;
      }
    }
    ctx.lineDashOffset = t0 * Math.hypot(dx, dy); // dashes stay put on the line, not on the screen edge
    ctx.beginPath();
    ctx.moveTo(a.x + t0 * dx, a.y + t0 * dy);
    ctx.lineTo(a.x + t1 * dx, a.y + t1 * dy);
    ctx.stroke();
  }

  function draw(now) {
    rot = { cy: Math.cos(cam.yaw), sy: Math.sin(cam.yaw), cp: Math.cos(cam.pitch), sp: Math.sin(cam.pitch) };
    const c = center();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // sky
    ctx.globalCompositeOperation = 'lighter';
    for (const st of sky) {
      const x1 = st.x * rot.cy - st.z * rot.sy;
      const z1 = st.x * rot.sy + st.z * rot.cy;
      const y2 = st.y * rot.cp - z1 * rot.sp;
      const z2 = st.y * rot.sp + z1 * rot.cp;
      if (z2 < 0.05) continue;
      const x = c.x + (x1 / z2) * focal * 0.8;
      const y = c.y + (y2 / z2) * focal * 0.8;
      if (x < -2 || y < -2 || x > W + 2 || y > H + 2) continue;
      const a = (0.35 + 0.65 * st.b) * (reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(now * 0.0012 + st.t));
      ctx.fillStyle = `rgba(215,224,255,${a.toFixed(3)})`;
      const s = 0.8 + st.b * 1.6;
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }

    // project stars
    const focusId = hovered?.id ?? selected;
    const lit = focusId ? new Set([focusId, ...byId.get(focusId).neighbors]) : null;
    projected = [];
    for (const n of nodes) {
      const p = project(n.x, n.y, n.z, c);
      if (!p) continue;
      projected.push({ n, x: p.x, y: p.y, r: clamp(n.size * 0.8 * p.s, 2.5, 16), depth: p.depth, s: p.s });
    }
    projected.sort((a, b) => b.depth - a.depth);
    const pos = new Map(projected.map((p) => [p.n.id, p]));
    const fade = (depth) => clamp(1.35 - depth / (cam.dist * 2.1), 0.12, 1);

    // links
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'butt'; // round caps are invisible on thin lines, and long round-capped strokes draw slowly
    for (const l of links) {
      const a = pos.get(l.s.id);
      const b = pos.get(l.t.id);
      if (!a || !b) continue;
      const on = lit && lit.has(l.s.id) && lit.has(l.t.id) && (l.s.id === focusId || l.t.id === focusId);
      const base = fade((a.depth + b.depth) / 2);
      const alphaL = on ? 0.75 : lit ? 0.025 : 0.11 * base;
      if (alphaL < 0.01) continue;
      const tension = l.kind === 'tension';
      ctx.strokeStyle = tension ? `rgba(240,113,122,${Math.min(1, alphaL * 2)})` : on ? `rgba(200,210,255,${alphaL})` : `rgba(160,175,230,${alphaL})`;
      ctx.lineWidth = on ? 1.6 : 1;
      ctx.setLineDash(tension ? [5, 4] : []);
      line(a, b);
    }
    ctx.setLineDash([]);

    // the main path: a gold line from step to step (bright where both ends are solid)
    if (route) {
      ctx.lineWidth = 2.2;
      for (let i = 1; i < route.length; i++) {
        const a = pos.get(route[i - 1]);
        const b = pos.get(route[i]);
        if (!a || !b) continue;
        const done = routeDone?.has(route[i - 1]) && routeDone?.has(route[i]);
        ctx.strokeStyle = `rgba(240,190,90,${(done ? 0.95 : 0.5) * (lit ? 0.5 : 1)})`;
        ctx.setLineDash(done ? [] : [6, 5]);
        line(a, b);
      }
      ctx.setLineDash([]);
    }
    ctx.lineDashOffset = 0;

    // stars: plain dots in their area's colour, far to near, with a dark edge so overlapping dots stay
    // distinct. Questions are hollow rings. Farther dots are smaller and a little dimmer, never faint.
    for (const p of projected) {
      const n = p.n;
      const dim = lit && !lit.has(n.id) ? 0.25 : route && !onRoute.has(n.id) ? 0.3 : 1;
      ctx.globalAlpha = clamp((0.55 + 0.45 * fade(p.depth)) * dim, 0.15, 1);
      const r = p.r * (n.id === focusId ? 1.2 : 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, TAU);
      if (n.type === 'question') {
        ctx.fillStyle = '#070912';
        ctx.fill();
        ctx.lineWidth = Math.max(1.5, r * 0.4);
        ctx.strokeStyle = n.color;
      } else {
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(4,6,14,0.9)';
      }
      ctx.stroke();
      // a warm ring where you still have questions open
      if (n.stuck) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3.5, 0, TAU);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(240,205,120,0.9)';
        ctx.stroke();
      }
      if (n.id === routeNext) {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5 + (reduceMotion ? 0 : 1.5 * Math.sin(now * 0.004)), 0, TAU);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(240,190,90,0.95)';
        ctx.stroke();
      }
      if (n.id === selected) {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + (n.stuck ? 7 : 4), 0, TAU);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    // labels: the focused star and its neighbours, else the biggest nearby stars; never on top of each other
    const wanted = [];
    for (const p of projected) {
      const n = p.n;
      let priority = 0;
      if (n.id === focusId) priority = 3;
      else if (lit?.has(n.id)) priority = 2;
      else if (!lit && n.id === routeNext) priority = 2;
      else if (!lit && onRoute.has(n.id) && fade(p.depth) > 0.35) priority = 1;
      else if (!lit && n.degree >= Math.max(3, bigCut) && fade(p.depth) > 0.45) priority = 1;
      if (priority) wanted.push({ p, priority });
    }
    wanted.sort((a, b) => b.priority - a.priority || a.p.depth - b.p.depth);
    const boxes = [];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (const { p, priority } of wanted) {
      const text = p.n.title.length > 40 ? `${p.n.title.slice(0, 38)}…` : p.n.title;
      ctx.font = `${priority === 3 ? 600 : 500} ${priority === 3 ? 14 : 12}px ${font}`;
      const w = ctx.measureText(text).width;
      const y = p.y + p.r + 5;
      const box = { l: p.x - w / 2 - 4, r: p.x + w / 2 + 4, t: y - 2, b: y + (priority === 3 ? 18 : 15) };
      if (boxes.some((b) => box.l < b.r && b.l < box.r && box.t < b.b && b.t < box.b)) continue;
      boxes.push(box);
      ctx.globalAlpha = priority >= 2 ? 1 : fade(p.depth);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(4,6,14,0.85)';
      ctx.strokeText(text, p.x, y);
      ctx.fillStyle = priority === 3 ? '#ffffff' : 'rgba(225,230,248,0.92)';
      ctx.fillText(text, p.x, y);
      if (boxes.length > 60) break;
    }
    ctx.globalAlpha = 1;
  }

  // ---- loop
  let frame = null;
  let last = performance.now();
  function loop(now) {
    const dt = Math.min(50, now - last);
    last = now;
    if (alpha > 0.003) {
      tick();
      alpha *= 0.985;
      if (alpha <= 0.003) for (const n of nodes) saved.set(n.id, { x: n.x, y: n.y, z: n.z });
      if (refit && alpha < 0.08 && !selected && now - lastInput > 1500) {
        refit = false;
        fit();
      }
    }
    if (flight) flight(now);
    const idle = !drag && !hovered && now - lastInput > 5000;
    if (idle && !reduceMotion) cam.yaw += dt * 0.00005;
    draw(now);
    frame = requestAnimationFrame(loop);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);

  function select(id) {
    selected = id && byId.has(id) ? id : null;
  }
  function zoomBy(factor) {
    flyTo({ dist: clamp(cam.dist / factor, 60, 20000) }, 260);
    lastInput = performance.now();
  }
  function centerOn(id) {
    const n = byId.get(id);
    if (!n) return;
    flyTo({ tx: n.x, ty: n.y, tz: n.z, dist: Math.min(cam.dist, 520) });
    lastInput = performance.now();
  }
  function relayout() {
    for (const n of nodes) {
      saved.delete(n.id);
      scatter(n);
    }
    alpha = 1;
    for (let i = 0; i < 120; i++) { tick(); alpha *= 0.985; }
    refit = true;
    fit();
  }

  fit(false);
  if (selected) {
    const n = byId.get(selected);
    Object.assign(cam, { tx: n.x, ty: n.y, tz: n.z, dist: Math.min(cam.dist, 700) });
  }
  draw(performance.now());
  frame = requestAnimationFrame(loop);

  return {
    fit,
    zoomBy,
    select,
    centerOn,
    relayout,
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      for (const n of nodes) saved.set(n.id, { x: n.x, y: n.y, z: n.z });
      canvas.remove();
    },
  };
}
