import { normalizeCalc, quickCalc } from './calc.js';
import { mountGraph } from './graph.js';
import { normalizeVideos } from './media.js';
import { escapeHtml as esc, renderInline, renderMarkdown, renderTex } from './render.js';
import { AREA_COLORS, LINK_KINDS, STATUSES, TYPES } from './schema.js';
import {
  copyText,
  handleItemClick,
  matchAnswers,
  mountQuestions,
  openQuestions,
  questionItemHtml,
  questionsText,
  rememberOrder,
  stuckMark,
  topicInView,
  topicQuestionsHtml,
} from './questions.js';
import {
  RATE_WORDS,
  TASK_KIND,
  answerHtml,
  buildSession,
  checkGap,
  comebackHtml,
  coverFormula,
  explanationsHtml,
  fadeSteps,
  fluencyHtml,
  makeGaps,
  rateHtml,
  record,
  stepBlocks,
  taskHtml,
  whyGuessHtml,
} from './practice.js';
import { searchEntries, store } from './store.js';
import { findTerms } from './terms.js';
import { topicMapData } from './topicmap.js';
import { mountUniverse } from './universe.js';
import { calcHtml, mountCalc, videosHtml } from './tryit.js';
import {
  basicsOf,
  clearTrail,
  highlightsEnabled,
  highlightTerms,
  initPeek,
  nextUp,
  pushTrail,
  rabbitHoles,
  readTrail,
  stepLabel,
  surprisingConnections,
} from './explore.js';
import { areaChip, colorOf, entryHref, icon, readPref, statusHtml, typeIcon, writePref } from './ui.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const viewEl = $('#view');
const resolve = (target) => store.resolve(target);
const enc = encodeURIComponent;
const byUpdated = (a, b) => b.updated.localeCompare(a.updated);

// ------------------------------------------------------------------ small helpers

function countBy(list, fn) {
  const out = {};
  for (const x of list) {
    const k = fn(x);
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

function ago(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  const d = Math.floor(s / 86400);
  if (d === 1) return 'yesterday';
  if (d < 7) return `${d} days ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: d > 300 ? 'numeric' : undefined });
}

const fullDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// ------------------------------------------------------------------ toasts + dialogs

function toast(message, { error = false, action, onAction } = {}) {
  const el = document.createElement('div');
  el.className = `toast${error ? ' error' : ''}`;
  el.innerHTML = `<span>${esc(message)}</span>`;
  if (action) {
    const a = document.createElement('a');
    a.href = typeof onAction === 'string' ? onAction : '#';
    a.textContent = action;
    a.addEventListener('click', (ev) => {
      if (typeof onAction === 'function') {
        ev.preventDefault();
        onAction();
      }
      el.remove();
    });
    el.append(a);
  }
  $('#toasts').append(el);
  setTimeout(() => el.remove(), error ? 7000 : 4500);
}
const fail = (err) => toast(err?.message || String(err), { error: true });

function openDialog(html, className = '') {
  const dlg = document.createElement('dialog');
  dlg.className = className;
  dlg.innerHTML = html;
  document.body.append(dlg);
  let downOnBackdrop = false;
  dlg.addEventListener('pointerdown', (ev) => (downOnBackdrop = ev.target === dlg));
  dlg.addEventListener('click', (ev) => {
    if (ev.target === dlg && downOnBackdrop) dlg.close();
  });
  dlg.addEventListener('close', () => dlg.remove());
  $$('[data-cancel]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
  dlg.showModal();
  return dlg;
}

function confirmDialog({ title, message, confirm = 'Confirm', danger = false }) {
  return new Promise((done) => {
    const dlg = openDialog(`
      <form method="dialog">
        <div class="dialog-body"><h2>${esc(title)}</h2><p>${esc(message)}</p></div>
        <div class="dialog-foot">
          <button class="btn btn-ghost" value="cancel">Cancel</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" value="ok" autofocus>${esc(confirm)}</button>
        </div>
      </form>`);
    dlg.addEventListener('close', () => done(dlg.returnValue === 'ok'));
  });
}

function swatchesHtml(current) {
  return AREA_COLORS.map(
    (c) => `<button type="button" class="swatch${c === current ? ' on' : ''}" style="--c:${c}" data-color="${c}" aria-label="Colour ${c}"></button>`,
  ).join('');
}

function bindSwatches(root, onPick) {
  root.addEventListener('click', (ev) => {
    const sw = ev.target.closest('[data-color]');
    if (!sw) return;
    $$('.swatch', root).forEach((s) => s.classList.toggle('on', s === sw));
    onPick(sw.dataset.color);
  });
}

function areaDialog() {
  return new Promise((done) => {
    let color = AREA_COLORS[store.areas.length % AREA_COLORS.length];
    let created = null;
    const dlg = openDialog(`
      <form data-form>
        <div class="dialog-body">
          <h2>New area</h2>
          <div class="field"><label for="a-name">Name</label><input id="a-name" class="input" placeholder="e.g. Cosmology" autocomplete="off"></div>
          <div class="field"><label for="a-desc">Description <span class="hint">optional</span></label><input id="a-desc" class="input" autocomplete="off"></div>
          <div class="field"><span class="label">Colour</span><div class="swatches">${swatchesHtml(color)}</div></div>
        </div>
        <div class="dialog-foot">
          <button type="button" class="btn btn-ghost" data-cancel>Cancel</button>
          <button type="submit" class="btn btn-primary">Create area</button>
        </div>
      </form>`);
    bindSwatches($('.swatches', dlg), (c) => (color = c));
    $('#a-name', dlg).focus();
    $('form', dlg).addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const name = $('#a-name', dlg).value.trim();
      if (!name) return $('#a-name', dlg).focus();
      try {
        created = await store.createArea({ name, description: $('#a-desc', dlg).value, color });
        toast(`Area “${created.name}” created`);
        dlg.close();
      } catch (err) {
        fail(err);
      }
    });
    dlg.addEventListener('close', () => done(created));
  });
}

// ------------------------------------------------------------------ router

const ROUTES = [
  [/^\/$/, viewHome, 'home'],
  [/^\/library$/, viewLibrary, 'library'],
  [/^\/entry\/([^/]+)$/, viewEntry, 'library'],
  [/^\/new$/, viewEditor, ''],
  [/^\/edit\/([^/]+)$/, viewEditor, ''],
  [/^\/graph$/, viewGraph, 'graph'],
  [/^\/questions$/, viewQuestions, 'questions'],
  [/^\/sheet$/, viewSheet, 'library'],
  [/^\/loose$/, viewLoose, 'library'],
  [/^\/timeline$/, viewTimeline, 'library'],
  [/^\/compare$/, viewCompare, ''],
  [/^\/practice$/, viewPractice, ''],
  [/^\/path$/, viewPath, ''],
  [/^\/learn$/, viewLearn, 'learn'],
  [/^\/settings$/, viewSettings, 'settings'],
];

// The little number next to "Questions" in the top bar.
function drawQuestionCount() {
  const badge = $('[data-open-questions]');
  if (!badge) return;
  const n = openQuestions().length;
  badge.textContent = n;
  badge.hidden = !n;
}

let teardown = null; // cleanup for the current view
let guard = null; // () => true when leaving would lose unsaved work
let lastHash = location.hash;

function currentRoute() {
  const raw = location.hash.slice(1) || '/';
  const q = raw.indexOf('?');
  return { path: q < 0 ? raw : raw.slice(0, q), params: new URLSearchParams(q < 0 ? '' : raw.slice(q + 1)) };
}

const hashNow = () => location.hash || '#/';

function render({ keepScroll = false } = {}) {
  const y = window.scrollY;
  teardown?.();
  teardown = null;
  guard = null;
  lastHash = hashNow();
  const { path, params } = currentRoute();
  const route = ROUTES.find(([re]) => re.test(path));
  $$('[data-nav]').forEach((a) => a.classList.toggle('active', !!route && a.dataset.nav === route[2]));
  drawQuestionCount();
  $('.nav a.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  viewEl.className = '';
  if (route) route[1]({ match: path.match(route[0]), params });
  else viewNotFound('That page doesn’t exist.');
  window.scrollTo(0, keepScroll ? y : 0);
}

const refresh = () => render({ keepScroll: true });

function go(hash) {
  if (hashNow() === hash) refresh();
  else location.hash = hash;
}

// Re-render only if the user is still on the page that started an async action.
function refreshIfStill(hash) {
  if (hashNow() === hash) refresh();
}

async function onHashChange() {
  if (guard?.()) {
    const target = location.hash;
    history.replaceState(null, '', lastHash || '#/');
    const ok = await confirmDialog({
      title: 'Discard changes?',
      message: 'You have unsaved edits. Leaving now will lose them.',
      confirm: 'Discard',
      danger: true,
    });
    if (!ok) return;
    guard = null;
    location.hash = target;
    return;
  }
  render();
}

function viewNotFound(message = 'That entry doesn’t exist — it may have been deleted.') {
  viewEl.innerHTML = `<div class="page"><div class="boot"><p>${esc(message)}</p><p><a class="btn" href="#/library">Back to the library</a></p></div></div>`;
}

function randomEntry() {
  const pool = store.entries;
  if (!pool.length) return toast('Nothing to wander to yet.');
  const current = currentRoute().path.match(/^\/entry\/(.+)$/)?.[1];
  let pick;
  do pick = pool[Math.floor(Math.random() * pool.length)];
  while (pool.length > 1 && pick.id === decodeURIComponent(current || ''));
  go(entryHref(pick.id));
}

// ------------------------------------------------------------------ home: explore a topic

const typeOptions = (selected) =>
  Object.entries(TYPES).map(([k, t]) => `<option value="${k}"${k === selected ? ' selected' : ''}>${esc(t.label)}</option>`).join('');

const areaOptions = (selected, { unfiled = 'Unfiled', create = false } = {}) =>
  `<option value="">${esc(unfiled)}</option>` +
  store.areas.map((a) => `<option value="${esc(a.id)}"${a.id === selected ? ' selected' : ''}>${esc(a.name)}</option>`).join('') +
  (create ? '<option value="__new">＋ New area…</option>' : '');

const exploreHref = (id) => `#/?t=${enc(id)}`;
const STATUS_ORDER = { curious: 0, exploring: 1, solid: 2 };

function topicItem(x, { rel = '', why = '' } = {}) {
  return `
    <li>
      <a class="topic-item${x.status === 'solid' ? ' known' : ''}" href="${exploreHref(x.id)}" style="--c:${colorOf(x)}">
        ${typeIcon(x.type)}
        <span class="topic-item-text">
          <span class="topic-item-title"><span class="topic-item-name">${esc(x.title)}</span>${stuckMark(x.id)}${rel ? `<span class="topic-item-rel">${esc(rel)}</span>` : ''}</span>
          ${why ? `<span class="topic-item-why">${renderInline(why, resolve, { linkify: false })}</span>${whyGuessHtml()}` : ''}
        </span>
        <span class="status status-${x.status}" title="${esc(STATUSES[x.status].label)}"></span>
      </a>
    </li>`;
}

// One topic: what it is, the basics it needs, then where it leads.
function topicHtml(e) {
  const basics = basicsOf(e.id).sort(
    (a, b) => STATUS_ORDER[a.entry.status] - STATUS_ORDER[b.entry.status] || a.entry.title.localeCompare(b.entry.title),
  );
  const connected = rabbitHoles(e);
  const examples = store
    .connections(e.id)
    .filter((c) => c.link.kind === 'example-of' && c.dir === 'in')
    .map((c) => store.entry(c.other))
    .filter(Boolean);
  const further = surprisingConnections(e, 3);
  const area = store.area(e.area);
  let step = 0;

  return `
    <article class="topic" style="--c:${colorOf(e)}">
      ${routeStripHtml(e, exploreHref)}
      <header class="topic-head">
        <p class="topic-meta">${typeIcon(e.type)}<span>${esc(TYPES[e.type].label)}</span>${area ? `<span class="dot-sep"></span><span>${esc(area.name)}</span>` : ''}</p>
        <h1>${esc(e.title)}${stuckMark(e.id)}</h1>
        ${e.summary ? `<p class="topic-summary">${renderInline(e.summary, resolve, { linkify: false })}</p>` : ''}
        <div class="topic-actions">
          <a class="btn btn-sm" href="${entryHref(e.id)}">Read the notes ${icon('arrow')}</a>
          ${e.calc ? `<button type="button" class="btn btn-sm" data-toggle="tryit" aria-expanded="false">${icon('sliders')} Try it</button>` : ''}
          ${e.videos?.length ? `<button type="button" class="btn btn-sm" data-toggle="watch" aria-expanded="false">${icon('play')} Watch</button>` : ''}
          <button type="button" class="btn btn-sm" data-toggle="ask" aria-expanded="false">${icon('question')} Questions${store.questionsFor(e.id).filter((q) => !q.asked).length ? ` · ${store.questionsFor(e.id).filter((q) => !q.asked).length}` : ''}</button>
          <a class="btn btn-sm btn-ghost" href="#/path?from=${enc(e.id)}">${icon('link')} Connect to…</a>
          <a class="btn btn-sm btn-ghost" href="#/compare?a=${enc(e.id)}">${icon('graph')} Compare with…</a>
        </div>
      </header>
      ${e.calc ? `<div class="topic-panel" data-panel="tryit" hidden>${calcHtml(e.calc)}</div>` : ''}
      ${e.videos?.length ? `<div class="topic-panel" data-panel="watch" hidden>${videosHtml(e.videos, { heading: false })}</div>` : ''}
      <div class="topic-panel" data-panel="ask" hidden>${topicQuestionsHtml(e)}</div>

      <p class="why-toggle"><button type="button" class="link-btn" data-act="guess-why">Hide the reasons and guess them</button></p>
      ${
        basics.length
          ? `<section class="topic-group topic-basics">
              <h2><span class="step">${++step}</span>Basics first</h2>
              <ul class="topic-list">${basics.map(({ entry: x, connection: c }) => topicItem(x, { why: c.link.note || x.summary })).join('')}</ul>
            </section>`
          : '<p class="topic-note">Nothing to learn first — this is a starting point.</p>'
      }

      ${
        connected.length || examples.length
          ? `<section class="topic-group">
              <h2><span class="step">${++step}</span>Then it connects to</h2>
              <ul class="topic-list">${[
                ...connected.map(({ entry: x, connection: c }) => {
                  // Read from the item's side: "Landau Criterion — explains this".
                  const kind = LINK_KINDS[c.link.kind];
                  return topicItem(x, { rel: `${c.dir === 'out' ? kind.inverse : kind.label} this`, why: c.link.note || x.summary });
                }),
                ...examples.map((x) => topicItem(x, { rel: 'worked example', why: x.summary })),
              ].join('')}</ul>
            </section>`
          : ''
      }

      ${
        further.length
          ? `<section class="topic-group">
              <h2><span class="step">${icon('spark')}</span>Further afield</h2>
              <ul class="topic-list">${further.map((s) => topicItem(s.entry, { rel: `via ${s.via.title}`, why: s.link.note || s.entry.summary })).join('')}</ul>
            </section>`
          : ''
      }

      ${upNextHtml(e)}
    </article>`;
}

// ------------------------------------------------------------------ main path
// An optional route through the library (a seed's `route`). Exploring stays free; the path is a
// thread to come back to. A step counts as done when it's marked Solid.

const routeStepCount = (ids) => ids.filter((id) => store.entry(id)?.status === 'solid').length;

// The strip at the top of a topic: where it sits on the path, why it comes here, and the way on.
// `href` builds links (entry pages link to entry pages, the explorer to the explorer).
function routeStripHtml(e, href = entryHref) {
  const r = store.route;
  if (!r) return '';
  const at = store.onRoute(e.id);
  const next = store.routeNext();
  if (!at) {
    const joins = store
      .connections(e.id)
      .map((c) => c.other)
      .filter((id, i, all) => store.onRoute(id) && all.indexOf(id) === i)
      .sort((a, b) => store.onRoute(a).index - store.onRoute(b).index)
      .slice(0, 3);
    if (!joins.length && !next) return '';
    return `
      <p class="route-off">
        ${icon('route')}<span>Off the main path${
          joins.length
            ? ` — it joins at ${joins.map((id) => `<a href="${href(id)}" data-peek="${esc(id)}">${esc(store.entry(id).title)}</a> <span class="muted">(${store.onRoute(id).index + 1})</span>`).join(', ')}`
            : ''
        }</span>
        ${next ? `<a class="route-off-go" href="${href(next)}">Back to the path ${icon('arrow')}</a>` : ''}
      </p>`;
  }
  const prev = r.order[at.index - 1];
  const after = r.order[at.index + 1];
  const why = store.routeWhy(e.id);
  const solid = e.status === 'solid';
  const nextHref = after ? href(after) : '#/learn';
  return `
    <nav class="route-strip" aria-label="Main path">
      <div class="route-strip-top">
        <a class="route-strip-where" href="#/learn?stage=${enc(at.stage.id)}">
          ${icon('route')}<span>Main path · <b>${esc(at.stage.title)}</b></span>
        </a>
        <span class="route-strip-count">Step ${at.index + 1} of ${r.order.length}</span>
      </div>
      ${
        why
          ? `<p class="route-why"><span class="route-why-label">Why here</span> after <a href="${href(why.entry.id)}" data-peek="${esc(why.entry.id)}">${esc(why.entry.title)}</a>${why.link.note ? ` — ${renderInline(why.link.note, resolve, { linkify: false })}` : ''}</p>`
          : at.index === 0
            ? '<p class="route-why"><span class="route-why-label">Start here</span> the first step of the path.</p>'
            : ''
      }
      <div class="route-strip-nav">
        ${prev ? `<a class="btn btn-sm btn-ghost" href="${href(prev)}" title="Previous step">← ${esc(store.entry(prev).title)}</a>` : '<span></span>'}
        ${
          solid
            ? `<a class="btn btn-sm btn-primary" href="${nextHref}">${after ? `Next: ${esc(store.entry(after).title)}` : 'Back to the path'} ${icon('arrow')}</a>`
            : `<button type="button" class="btn btn-sm btn-primary" data-route-done="${esc(e.id)}" data-next="${esc(nextHref)}" title="Mark this Solid and go to the next step">${icon('check')} Got it — next</button>`
        }
      </div>
    </nav>`;
}

function routeHintHtml() {
  if (!store.route) return '';
  const next = store.routeNext();
  return `<p class="explore-hint explore-route"><a href="#/learn">${icon('route')} Main path</a>${
    next ? ` · continue with <a href="${exploreHref(next)}">${esc(store.entry(next).title)}</a> <span class="muted">(step ${store.onRoute(next).index + 1} of ${store.route.order.length})</span>` : ' · all done'
  }</p>`;
}

// "Got it — next": say it back (the usual Solid check), mark Solid, move on.
document.addEventListener('click', async (ev) => {
  const btn = ev.target.closest('[data-route-done]');
  if (!btn) return;
  const e = store.entry(btn.dataset.routeDone);
  if (!e) return;
  btn.disabled = true;
  try {
    if (e.status !== 'solid') {
      await solidCheck(e);
      await store.updateEntry(e.id, { status: 'solid' });
    }
    go(btn.dataset.next || '#/learn');
  } catch (err) {
    btn.disabled = false;
    fail(err);
  }
});

function viewLearn({ params }) {
  const r = store.route;
  if (!r) return viewNotFound('This library has no main path.');
  const next = store.routeNext();
  const nextAt = next ? store.onRoute(next) : null;
  const done = routeStepCount(r.order);
  const stagesDone = r.stages.filter((s) => routeStepCount(s.steps) === s.steps.length).length;
  const open = new Set([params.get('stage') || nextAt?.stage.id || r.stages[0].id]);

  const stepHtml = (id) => {
    const e = store.entry(id);
    const at = store.onRoute(id);
    return `
      <li class="route-step status-${e.status}${id === next ? ' next' : ''}" style="--c:${colorOf(e)}">
        <a href="${entryHref(id)}" data-peek="${esc(id)}">
          <span class="route-node" aria-hidden="true">${e.status === 'solid' ? icon('check') : ''}</span>
          <span class="route-step-text">
            <span class="route-step-title">${esc(e.title)}${e.calc ? '<span class="route-step-tag">Try it</span>' : ''}${e.type === 'example' ? '<span class="route-step-tag">Walkthrough</span>' : ''}</span>
            ${e.summary ? `<span class="route-step-sum">${renderInline(e.summary, resolve, { linkify: false })}</span>` : ''}
          </span>
          <span class="route-step-n">${at.index + 1}</span>
        </a>
      </li>`;
  };

  viewEl.innerHTML = `
  <div class="page learn">
    <header class="learn-head">
      <h1>${icon('route')} ${esc(r.title)}</h1>
      ${r.intro ? `<p class="learn-intro">${esc(r.intro)}</p>` : ''}
      <div class="learn-progress">
        <div class="learn-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${r.order.length}" aria-valuenow="${done}"><span style="width:${((done / r.order.length) * 100).toFixed(1)}%"></span></div>
        <span><b>${done}</b> of ${r.order.length} steps solid · ${stagesDone} of ${r.stages.length} stages</span>
      </div>
      <div class="learn-actions">
        ${
          next
            ? `<a class="btn btn-primary" href="${entryHref(next)}">Continue · step ${nextAt.index + 1}: ${esc(store.entry(next).title)} ${icon('arrow')}</a>`
            : '<p class="learn-done">Every step is marked solid. Now build something.</p>'
        }
        <a class="btn btn-ghost" href="#/graph?route=1">${icon('graph')} See it on the graph</a>
      </div>
      <p class="learn-hint">A step counts as done when you mark it <b>Solid</b> — “Got it — next” on each step does that after a quick say-it-back. Wander off anywhere; each topic shows where it joins the path, and Continue always brings you back.</p>
    </header>
    <ol class="route-stages">
      ${r.stages
        .map((s, i) => {
          const d = routeStepCount(s.steps);
          const n = s.steps.length;
          return `
            <li class="route-stage${d === n ? ' done' : ''}${nextAt?.stage.id === s.id ? ' current' : ''}" id="stage-${esc(s.id)}">
              <details${open.has(s.id) ? ' open' : ''}>
                <summary>
                  <span class="stage-num">${d === n ? icon('check') : i + 1}</span>
                  <span class="stage-title">${esc(s.title)}</span>
                  <span class="stage-count">${d}/${n}</span>
                  <span class="stage-bar"><span style="width:${((d / n) * 100).toFixed(1)}%"></span></span>
                </summary>
                ${s.blurb ? `<p class="stage-blurb">${esc(s.blurb)}</p>` : ''}
                <ol class="route-line">${s.steps.map(stepHtml).join('')}</ol>
                ${
                  d < n
                    ? `<div class="stage-foot"><button type="button" class="btn btn-sm btn-ghost" data-route-know="${esc(s.id)}">${icon('check')} I know these already</button></div>`
                    : ''
                }
              </details>
            </li>`;
        })
        .join('')}
    </ol>
  </div>`;

  const root = viewEl.firstElementChild;
  const hash = hashNow();
  if (params.get('stage')) $(`#stage-${CSS.escape(params.get('stage'))}`, root)?.scrollIntoView({ block: 'start' });
  root.addEventListener('click', async (ev) => {
    const know = ev.target.closest('[data-route-know]');
    if (!know) return;
    const stage = r.stages.find((s) => s.id === know.dataset.routeKnow);
    const todo = stage.steps.filter((id) => store.entry(id)?.status !== 'solid');
    const ok = await confirmDialog({
      title: `Mark “${stage.title}” as known?`,
      message: `Marks ${todo.length} step${todo.length === 1 ? '' : 's'} Solid so Continue skips past them. You can change any of them back from its page.`,
      confirm: 'Mark them solid',
    });
    if (!ok) return;
    try {
      for (const id of todo) await store.updateEntry(id, { status: 'solid' });
      toast(`Marked ${todo.length} step${todo.length === 1 ? '' : 's'} solid.`);
      refreshIfStill(hash);
    } catch (err) {
      fail(err);
    }
  });
}

function viewHome({ params }) {
  const focus = store.entry(params.get('t'));
  if (focus) pushTrail(focus.id);
  const map = focus ? topicMapData(focus) : null;

  viewEl.innerHTML = `
  <div class="page explorer${focus ? ' has-topic' : ''}">
    <div class="explore-main">
      <div class="explore-box">
        <div class="explore-search">
          ${icon('search')}
          <input type="search" data-explore placeholder="Type a topic…" value="${focus ? esc(focus.title) : ''}"
            autocomplete="off" spellcheck="false" aria-label="Topic to explore" aria-controls="explore-suggest">
        </div>
        <ul class="explore-suggest" id="explore-suggest" role="listbox" hidden></ul>
        ${
          focus
            ? ''
            : `<p class="explore-hint">Basics first, then where it leads. <button type="button" class="link-btn" data-act="random">Surprise me</button> · <a href="#/practice">Mix it up</a></p>${routeHintHtml()}`
        }
      </div>
      ${focus ? topicHtml(focus) : ''}
    </div>
    ${
      focus
        ? `<aside class="card topic-map" aria-label="Network of ${esc(focus.title)} and its connections">
            <div class="topic-map-stage" data-map></div>
            <p class="topic-map-foot">
              <span><b>${map.direct}</b> linked · <b>${map.further}</b> two steps away${map.furtherShown < map.further ? ` (${map.furtherShown} shown)` : ''}</span>
              <a href="#/graph?focus=${enc(focus.id)}&depth=2">Full graph ${icon('arrow')}</a>
            </p>
          </aside>`
        : ''
    }
  </div>`;

  const root = viewEl.firstElementChild;
  const input = $('[data-explore]', root);
  const list = $('.explore-suggest', root);
  let items = [];
  let idx = 0;

  function draw() {
    const q = input.value.trim();
    if (!q || (focus && q === focus.title)) {
      list.hidden = true;
      items = [];
      return;
    }
    const sum = q.startsWith('=') ? quickCalc(q) : null;
    if (sum) {
      const answer = sum.error ? '' : `${sum.text}${sum.unit ? ` ${sum.unit}` : ''}`;
      items = [{ href: '#', html: `${icon('sliders', 'cmd-icon')}<span class="t sum">${esc(sum.error || answer)}</span><span class="sub">${sum.error ? esc(sum.src) : 'Enter to copy'}</span>`, copy: answer }];
      idx = 0;
      list.innerHTML = items
        .map((it) => `<li role="option" aria-selected="true"><button type="button" class="palette-item on" data-copy>${it.html}</button></li>`)
        .join('');
      list.hidden = false;
      return;
    }
    items = searchEntries(q)
      .slice(0, 8)
      .map((x) => {
        const where = snippetFor(x, q);
        return {
          href: exploreHref(x.id),
          color: colorOf(x),
          html: `${typeIcon(x.type)}<span class="t">${esc(x.title)}${where ? `<span class="hit">${where}</span>` : ''}</span><span class="sub">${esc(store.area(x.area)?.name || TYPES[x.type].label)}</span>`,
        };
      });
    if (!items.length) {
      items.push({ href: `#/new?title=${enc(q)}`, html: `${icon('plus', 'cmd-icon')}<span class="t">Nothing yet — add “${esc(q)}” as a new topic</span>` });
    }
    idx = Math.max(0, Math.min(idx, items.length - 1));
    list.innerHTML = items
      .map(
        (it, i) =>
          `<li role="option" aria-selected="${i === idx}"><a class="palette-item${i === idx ? ' on' : ''}" href="${it.href}"${it.color ? ` style="--c:${it.color}"` : ''}>${it.html}</a></li>`,
      )
      .join('');
    list.hidden = false;
  }

  input.addEventListener('input', () => {
    idx = 0;
    draw();
  });
  input.addEventListener('focus', () => {
    if (focus && input.value === focus.title) input.select();
    else draw();
  });
  input.addEventListener('blur', () => setTimeout(() => (list.hidden = true), 150));
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      list.hidden = true;
      return;
    }
    if (list.hidden || !items.length) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      idx = (idx + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      draw();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      const it = items[idx];
      if (it?.copy !== undefined) {
        copyText(it.copy).then((ok) => toast(ok ? `Copied ${it.copy}` : 'Could not reach the clipboard.', { error: !ok }));
      } else if (it) go(it.href);
    }
  });
  list.addEventListener('click', (ev) => {
    if (!ev.target.closest('[data-copy]')) return;
    const answer = items[0]?.copy;
    if (answer) copyText(answer).then((ok) => toast(ok ? `Copied ${answer}` : 'Could not reach the clipboard.', { error: !ok }));
  });
  list.addEventListener('mousedown', (ev) => ev.preventDefault()); // keep focus so the click lands

  if (focus?.calc) mountCalc(root, focus.calc, { entryId: focus.id });
  if (focus) store.recordVisit(focus.id);
  if (focus) mountQuestions(root, { onChange: drawQuestionCount });

  if (focus) {
    const stage = $('[data-map]', root);
    const graph = mountGraph(stage, {
      nodes: map.nodes,
      edges: map.edges,
      groups: [],
      selectedId: focus.id,
      remember: false,
      wheelZoom: false,
      pad: 22,
      fitLabels: true,
      maxZoom: 1.15,
      onSelect: (id) => id && id !== focus.id && go(exploreHref(id)),
      onOpen: (id) => go(entryHref(id)),
    });
    const ro = new ResizeObserver(() => graph.fit(false));
    ro.observe(stage);
    teardown = () => {
      ro.disconnect();
      graph.destroy();
    };
  }

  root.addEventListener('click', (ev) => {
    // guess the reasons: hide every "why", reveal one at a time
    if (ev.target.closest('[data-act="guess-why"]')) {
      const article = $('.topic', root);
      const on = article.classList.toggle('guessing');
      article.querySelectorAll('.why-revealed').forEach((li) => li.classList.remove('why-revealed'));
      ev.target.closest('[data-act="guess-why"]').textContent = on ? 'Show all the reasons again' : 'Hide the reasons and guess them';
      return;
    }
    const whyBtn = ev.target.closest('[data-why-guess]');
    if (whyBtn) {
      ev.preventDefault();
      const li = whyBtn.closest('li');
      li.classList.add('why-revealed');
      whyBtn.outerHTML = rateHtml('data-why-rate');
      return;
    }
    const whyRate = ev.target.closest('[data-why-rate] [data-rate]');
    if (whyRate) {
      ev.preventDefault();
      const li = whyRate.closest('li');
      const other = li.querySelector('.topic-item')?.getAttribute('href')?.match(/t=([^&]+)/)?.[1];
      record(focus?.id || null, 'why', { result: whyRate.dataset.rate, other: other ? decodeURIComponent(other) : undefined });
      whyRate.closest('[data-why-rate]').outerHTML = `<span class="rated">${esc(RATE_WORDS[whyRate.dataset.rate])}</span>`;
      return;
    }
    const toggle = ev.target.closest('[data-toggle]');
    if (toggle) {
      const panel = $(`[data-panel="${toggle.dataset.toggle}"]`, root);
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      toggle.classList.toggle('on', !panel.hidden);
      return;
    }
    if (!ev.target.closest('[data-act="random"]')) return;
    const pool = store.entries.filter((x) => x.type !== 'note');
    if (pool.length) go(exploreHref(pool[Math.floor(Math.random() * pool.length)].id));
  });

  if (!focus) input.focus();
}

// ------------------------------------------------------------------ library

const LIB_KEYS = ['q', 'type', 'area', 'status', 'tag', 'sort'];

// The line a search hit came from, with the words you typed marked. Empty when the title says it all.
function snippetFor(entry, query) {
  const words = String(query || '')
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (!words.length) return '';
  const title = entry.title.toLowerCase();
  if (words.every((w) => title.includes(w))) return '';
  const haystack = `${entry.summary}\n${entry.body}`;
  const lower = haystack.toLowerCase();
  const escapeForRegex = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let at = -1;
  for (const w of words) {
    const i = lower.search(new RegExp(`\\b${escapeForRegex(w)}`));
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0) return '';
  const start = Math.max(0, haystack.lastIndexOf(' ', Math.max(0, at - 45)) + 1);
  const raw = haystack
    .slice(start, start + 130)
    .replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, '$1')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const marked = esc(raw).replace(new RegExp(`\\b(${words.map(escapeForRegex).join('|')})`, 'gi'), '<mark>$1</mark>');
  return `${start > 0 ? '…' : ''}${marked}…`;
}

function entryRow(e, query = '') {
  const n = store.connections(e.id).length;
  const hit = snippetFor(e, query);
  return `
    <a class="card entry-row" href="${entryHref(e.id)}" style="--c:${colorOf(e)}">
      <div class="top">${typeIcon(e.type)}<h3>${esc(e.title)}</h3>${stuckMark(e.id)}</div>
      <div class="meta">${statusHtml(e.status)}</div>
      ${e.summary ? `<p class="summary">${renderInline(e.summary, resolve, { linkify: false })}</p>` : ''}
      ${hit ? `<p class="hit-line">${hit}</p>` : ''}
      <div class="foot">
        <span class="badge">${esc(TYPES[e.type].label)}</span>
        ${areaChip(e.area, { link: false })}
        <span class="links-n" title="${n} connection${n === 1 ? '' : 's'}">${icon('link')}${n}</span>
        <span>${esc(ago(e.updated))}</span>
        ${e.tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
      </div>
    </a>`;
}

function viewLibrary({ params }) {
  const f = Object.fromEntries(LIB_KEYS.map((k) => [k, params.get(k) || '']));

  viewEl.innerHTML = `
  <div class="page">
    <div class="page-head">
      <h1>Library</h1>
      <div class="lib-links">
        <a href="#/sheet">${icon('sliders')} Equation sheet</a>
        <a href="#/timeline">${icon('spark')} Timeline</a>
        <a href="#/loose">${icon('check')} Loose ends</a>
        <a class="btn" href="#/new">${icon('plus')} New entry</a>
      </div>
    </div>
    <div class="library">
      <aside class="filters">
        <div class="search-box">${icon('search')}<input class="input" type="search" placeholder="Search titles, notes, formulas…" value="${esc(f.q)}" data-q aria-label="Search"></div>
        <details class="facets"${matchMedia('(min-width: 821px)').matches ? ' open' : ''}>
          <summary>Filters</summary>
          <div data-facets></div>
        </details>
      </aside>
      <section>
        <div class="lib-toolbar">
          <span class="count" data-count></span>
          <div class="active-filters" data-active></div>
          <select class="select" data-sort style="width:auto" aria-label="Sort"></select>
        </div>
        <div class="entry-list" data-results></div>
      </section>
    </div>
  </div>`;

  const root = viewEl.firstElementChild;
  const facets = $('[data-facets]', root);
  const sortSel = $('[data-sort]', root);

  const matches = (e, skip) =>
    (skip === 'type' || !f.type || e.type === f.type) &&
    (skip === 'area' || !f.area || (f.area === 'none' ? !e.area : e.area === f.area)) &&
    (skip === 'status' || !f.status || e.status === f.status) &&
    (skip === 'tag' || !f.tag || e.tags.some((t) => t.toLowerCase() === f.tag.toLowerCase()));

  function update() {
    const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString();
    history.replaceState(null, '', `#/library${qs ? `?${qs}` : ''}`);
    lastHash = location.hash;

    const base = f.q ? searchEntries(f.q) : store.entries.slice();
    const results = base.filter((e) => matches(e));
    const sort = f.sort || (f.q ? 'relevance' : 'updated');
    const degree = (e) => store.connections(e.id).length;
    if (sort === 'updated') results.sort(byUpdated);
    if (sort === 'created') results.sort((a, b) => b.created.localeCompare(a.created));
    if (sort === 'title') results.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'links') results.sort((a, b) => degree(b) - degree(a) || a.title.localeCompare(b.title));

    const facetCounts = (key, fn) => countBy(base.filter((e) => matches(e, key)), fn);
    const opt = (key, value, label, n) =>
      `<button type="button" class="filter-opt${f[key] === value ? ' on' : ''}" data-k="${key}" data-v="${esc(value)}">${label}<span class="n">${n || 0}</span></button>`;

    const tc = facetCounts('type', (e) => e.type);
    const ac = facetCounts('area', (e) => e.area || 'none');
    const sc = facetCounts('status', (e) => e.status);
    const tagCounts = new Map();
    for (const e of base.filter((x) => matches(x, 'tag'))) {
      for (const t of e.tags) {
        const k = t.toLowerCase();
        tagCounts.set(k, { tag: t, n: (tagCounts.get(k)?.n || 0) + 1 });
      }
    }
    const tags = [...tagCounts.values()].sort((a, b) => b.n - a.n || a.tag.localeCompare(b.tag)).slice(0, 36);

    facets.innerHTML = `
      <div class="filter-group"><h4>Type</h4>${Object.entries(TYPES)
        .map(([k, t]) => opt('type', k, `${typeIcon(k)}<span class="label">${esc(t.plural)}</span>`, tc[k]))
        .join('')}</div>
      <div class="filter-group"><h4>Area</h4>${store.areas
        .map((a) => opt('area', a.id, `<span class="area-dot" style="--c:${esc(a.color)}"></span><span class="label">${esc(a.name)}</span>`, ac[a.id]))
        .join('')}${ac.none || f.area === 'none' ? opt('area', 'none', '<span class="area-dot"></span><span class="label">Unfiled</span>', ac.none) : ''}</div>
      <div class="filter-group"><h4>Status</h4>${Object.entries(STATUSES)
        .map(([k]) => opt('status', k, `<span class="label">${statusHtml(k)}</span>`, sc[k]))
        .join('')}</div>
      ${
        tags.length
          ? `<div class="filter-group"><h4>Tags</h4><div class="filter-tags">${tags
              .map((t) => `<button type="button" class="tag${f.tag.toLowerCase() === t.tag.toLowerCase() ? ' on' : ''}" data-k="tag" data-v="${esc(t.tag)}">${esc(t.tag)}</button>`)
              .join('')}</div></div>`
          : ''
      }`;

    const labels = {
      type: (v) => TYPES[v]?.plural,
      area: (v) => (v === 'none' ? 'Unfiled' : store.area(v)?.name),
      status: (v) => STATUSES[v]?.label,
      tag: (v) => `#${v}`,
    };
    $('[data-active]', root).innerHTML = ['type', 'area', 'status', 'tag']
      .filter((k) => f[k])
      .map((k) => `<button type="button" data-k="${k}" data-v="${esc(f[k])}" title="Remove filter">${esc(labels[k](f[k]) || f[k])}</button>`)
      .join('');

    sortSel.innerHTML = [
      ...(f.q ? [['relevance', 'Best match']] : []),
      ['updated', 'Recently updated'],
      ['created', 'Recently added'],
      ['title', 'Title A–Z'],
      ['links', 'Most connected'],
    ]
      .map(([v, l]) => `<option value="${v}"${v === sort ? ' selected' : ''}>${l}</option>`)
      .join('');

    $('[data-count]', root).textContent = `${results.length} ${results.length === 1 ? 'entry' : 'entries'}`;
    $('[data-results]', root).innerHTML = results.length
      ? results.map((e) => entryRow(e, f.q)).join('')
      : `<div class="card" style="padding:28px;text-align:center">
          <p class="empty" style="margin:0 0 14px">Nothing matches${f.q ? ` “${esc(f.q)}”` : ''}.</p>
          ${f.q ? `<a class="btn btn-primary" href="#/new?title=${enc(f.q)}">${icon('plus')} Create “${esc(f.q)}”</a>` : ''}
        </div>`;
  }

  root.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-k]');
    if (!btn) return;
    const { k, v } = btn.dataset;
    f[k] = f[k].toLowerCase() === v.toLowerCase() ? '' : v;
    update();
  });
  const q = $('[data-q]', root);
  q.addEventListener(
    'input',
    debounce(() => {
      f.q = q.value.trim();
      if (f.sort === 'relevance' && !f.q) f.sort = '';
      update();
    }, 90),
  );
  sortSel.addEventListener('change', () => {
    f.sort = sortSel.value;
    update();
  });
  update();
  if (f.q) q.focus();
}

// ------------------------------------------------------------------ entry page

function formulaHtml(latex, variables, { copy = true } = {}) {
  const vars = variables.filter((v) => v.symbol || v.meaning);
  if (!latex && !vars.length) return '';
  return `
    <section class="formula">
      ${copy && latex ? `<button type="button" class="icon-btn copy" data-act="copy-tex" title="Copy LaTeX" aria-label="Copy LaTeX">${icon('copy')}</button>` : ''}
      ${latex ? `<div class="tex">${renderTex(latex, true)}</div>` : ''}
      ${
        vars.length
          ? `<table class="symbols"><tbody>${vars
              .map((v) => `<tr><td>${v.symbol ? renderTex(v.symbol) : ''}</td><td>${renderInline(v.meaning, resolve)}</td></tr>`)
              .join('')}</tbody></table>`
          : ''
      }
    </section>`;
}

function connItem(c) {
  const other = store.entry(c.other);
  return `
    <div class="conn-item" style="--c:${colorOf(other)}">
      ${typeIcon(other.type)}
      <a href="${entryHref(other.id)}" data-peek="${esc(other.id)}">${esc(other.title)}${c.link.note ? `<span class="note">${esc(c.link.note)}</span>` : ''}</a>
      <button type="button" class="unlink" data-unlink="${esc(c.link.id)}" title="Remove this link" aria-label="Remove link to ${esc(other.title)}">×</button>
    </div>`;
}

// The last few topics followed to get here, oldest first.
function trailHtml(e) {
  const trail = readTrail().filter((id) => id !== e.id).slice(-5);
  if (!trail.length) return '';
  const chain = [...trail, e.id];
  const steps = chain.map((id, i) => {
    const x = store.entry(id);
    const label = i > 0 ? stepLabel(chain[i - 1], id) : null;
    const arrow = i > 0 ? `<span class="trail-step${label ? ' linked' : ''}" title="${esc(label || 'jumped')}">${label ? '→' : '⋯'}</span>` : '';
    const node =
      id === e.id
        ? `<span class="trail-here" style="--c:${colorOf(x)}">${esc(x.title)}</span>`
        : `<a href="${entryHref(id)}" style="--c:${colorOf(x)}" data-peek="${esc(id)}">${esc(x.title)}</a>`;
    return arrow + node;
  });
  return `
    <nav class="trail" aria-label="Your trail">
      <span class="trail-label">Your trail</span>
      <span class="trail-chain">${steps.join('')}</span>
      <button type="button" class="trail-clear" data-act="clear-trail" title="Start a fresh trail" aria-label="Clear trail">${icon('close')}</button>
    </nav>`;
}

function basicsHtml(e) {
  const basics = basicsOf(e.id);
  if (!basics.length) return '';
  const known = basics.filter((b) => b.entry.status === 'solid').length;
  return `
    <div class="basics">
      <span class="basics-label" title="Topics this one builds on. They are highlighted in the text below — hover to peek.">
        <i class="hl-swatch"></i>Basics this uses${known ? ` · ${known}/${basics.length} known` : ''}
      </span>
      ${basics
        .map(
          ({ entry: b }) =>
            `<a class="basic-chip${b.status === 'solid' ? ' known' : ''}" href="${entryHref(b.id)}" data-peek="${esc(b.id)}" style="--c:${colorOf(b)}">${typeIcon(b.type)}<span>${esc(b.title)}</span>${icon('check', 'known-mark')}</a>`,
        )
        .join('')}
    </div>`;
}

function hookCard({ entry: x, connection: c, crossArea }) {
  const teaser = c.link.note || x.summary;
  const area = store.area(x.area);
  return `
    <a class="card hook${crossArea ? ' cross' : ''}" href="${entryHref(x.id)}" style="--c:${colorOf(x)}">
      <span class="hook-top">
        <span class="hook-rel">${esc(c.label)}</span>
        ${crossArea && area ? `<span class="hook-area">${icon('arrow')} ${esc(area.name)}</span>` : ''}
      </span>
      <span class="hook-title">${typeIcon(x.type)}${esc(x.title)}</span>
      ${teaser ? `<span class="hook-teaser">${renderInline(teaser, resolve, { linkify: false })}</span>` : ''}
    </a>`;
}

// "Up next": one suggestion to keep going, like the next video.
function upNextHtml(e) {
  const next = nextUp(e);
  if (!next) return '';
  return `
    <section class="section up-next">
      <div class="section-head"><h2>${icon('arrow', 'spark')} Up next</h2></div>
      <a class="card up-next-card" href="${entryHref(next.entry.id)}" style="--c:${colorOf(next.entry)}">
        <span class="up-next-rel">${esc(next.how)}</span>
        <span class="up-next-title">${typeIcon(next.entry.type)}${esc(next.entry.title)}</span>
        ${next.why ? `<span class="up-next-why">${renderInline(next.why, resolve, { linkify: false })}</span>` : ''}
        <span class="up-next-go">Keep going ${icon('arrow')}</span>
      </a>
    </section>`;
}

function leadsHtml(e) {
  const holes = rabbitHoles(e);
  const surprises = surprisingConnections(e);
  if (!holes.length && !surprises.length) return '';
  const shown = holes.slice(0, 6);
  return `
    <section class="section leads">
      ${
        holes.length
          ? `<div class="section-head"><h2>Where this leads</h2></div>
             <div class="hooks">${shown.map(hookCard).join('')}</div>
             ${
               holes.length > shown.length
                 ? `<details class="more-hooks"><summary>${holes.length - shown.length} more connection${holes.length - shown.length === 1 ? '' : 's'}</summary><div class="hooks">${holes.slice(shown.length).map(hookCard).join('')}</div></details>`
                 : ''
             }`
          : ''
      }
      ${
        surprises.length
          ? `<div class="section-head surprise-head"><h2>${icon('spark', 'spark')} Surprising connections</h2></div>
             <p class="muted surprise-intro">Not linked directly — they meet through a shared idea.</p>
             <div class="hooks">${surprises
               .map(
                 (s) => `
               <a class="card hook surprise" href="${entryHref(s.entry.id)}" style="--c:${colorOf(s.entry)}">
                 <span class="hook-top"><span class="hook-rel">via <b style="color:${colorOf(s.via)}">${esc(s.via.title)}</b></span></span>
                 <span class="hook-title">${typeIcon(s.entry.type)}${esc(s.entry.title)}</span>
                 <span class="hook-teaser">${renderInline(s.link.note || s.entry.summary || '', resolve, { linkify: false })}</span>
               </a>`,
               )
               .join('')}</div>`
          : ''
      }
    </section>`;
}

function viewEntry({ match, params }) {
  const e = store.entry(decodeURIComponent(match[1]));
  if (!e) return viewNotFound();
  const hash = hashNow();
  const conns = store.connections(e.id);
  const isExample = (c) => c.link.kind === 'example-of' && c.dir === 'in';
  const examples = conns.filter(isExample).map((c) => store.entry(c.other));

  const groups = [];
  for (const [kind, def] of Object.entries(LINK_KINDS)) {
    for (const dir of def.symmetric ? ['out'] : ['out', 'in']) {
      const items = conns.filter((c) => c.link.kind === kind && (def.symmetric || c.dir === dir) && !isExample(c));
      if (items.length) groups.push({ label: dir === 'out' ? def.label : def.inverse, items });
    }
  }
  const connectedIds = new Set(conns.map((c) => c.other));
  const mentions = store.mentionsOf(e.id).filter((m) => !connectedIds.has(m.id));
  const canHaveExamples = e.type !== 'example' && e.type !== 'note';
  const trail = trailHtml(e);
  pushTrail(e.id);

  viewEl.innerHTML = `
  <div class="page">
    ${trail}
    ${routeStripHtml(e)}
    <div class="entry-page">
      <article>
        <header class="entry-head">
          <div class="entry-crumbs" style="--c:${colorOf(e)}">
            <span class="badge" style="color:var(--c)">${typeIcon(e.type)}<span style="color:var(--ink-2)">${esc(TYPES[e.type].label)}</span></span>
            ${areaChip(e.area)}
            <select class="status-select status-${e.status}" data-status aria-label="Status" title="How well you know this">
              ${Object.entries(STATUSES).map(([k, s]) => `<option value="${k}"${k === e.status ? ' selected' : ''}>${esc(s.label)}</option>`).join('')}
            </select>
          </div>
          <h1>${esc(e.title)}${stuckMark(e.id)}</h1>
          ${e.summary ? `<p class="lead" data-read>${renderInline(e.summary, resolve)}</p>` : ''}
          ${basicsHtml(e)}
          <div class="entry-actions">
            <a class="btn" href="#/edit/${enc(e.id)}" title="Edit (e)">${icon('edit')} Edit</a>
            <button type="button" class="btn" data-act="link">${icon('link')} Link</button>
            ${canHaveExamples ? `<a class="btn" href="#/new?type=example&area=${enc(e.area || '')}&link=${enc(`example-of:out:${e.id}`)}">${icon('plus')} Example</a>` : ''}
            <a class="btn btn-ghost" href="#/graph?focus=${enc(e.id)}">${icon('graph')} Graph</a>
            <button type="button" class="btn btn-ghost" data-act="history">${icon('shuffle')} History</button>
            <button type="button" class="btn btn-ghost btn-danger" data-act="delete">${icon('trash')} Delete</button>
            <button type="button" class="btn btn-practice" data-act="practise" aria-expanded="false">${icon('spark')} Practise</button>
          </div>
          <div class="practice-strip" data-practice-strip hidden>
            <span class="practice-hint">Instead of reading it again:</span>
            <button type="button" class="btn btn-sm" data-practice="explain" title="Write it in your own words, notes hidden">Explain it back</button>
            ${e.latex ? '<button type="button" class="btn btn-sm" data-practice="cover" title="Hide the formula and recall it">Cover the formula</button>' : ''}
            ${e.body.trim() ? '<button type="button" class="btn btn-sm" data-practice="gaps" title="Blank out a few things and fill them in">Fill the gaps</button>' : ''}
            ${e.type === 'example' && e.body.trim() ? '<button type="button" class="btn btn-sm" data-practice="fade" title="Hide the last steps and work them out">Fade the steps</button>' : ''}
            <a class="btn btn-sm btn-ghost" href="#/compare?a=${enc(e.id)}">Compare with…</a>
          </div>
          <div data-nudge>${fluencyHtml(e)}</div>
        </header>

        ${explanationsHtml(e)}

        ${formulaHtml(e.latex, e.variables)}

        ${e.calc ? calcHtml(e.calc) : ''}

        ${
          e.body.trim()
            ? `<div class="prose" data-read>${renderMarkdown(e.body, resolve)}</div>`
            : `<p class="empty">Nothing written yet. <a class="wikilink" href="#/edit/${enc(e.id)}">Start writing</a></p>`
        }

        ${videosHtml(e.videos)}

        ${
          examples.length
            ? `<section class="section">
                <div class="section-head"><h2>Examples</h2>
                  <a class="btn btn-sm" href="#/new?type=example&area=${enc(e.area || '')}&link=${enc(`example-of:out:${e.id}`)}">${icon('plus')} Add example</a></div>
                <div class="examples">${examples
                  .map(
                    (x) => `
                  <details class="card example-card" style="--c:${colorOf(x)}">
                    <summary>${typeIcon('example')}<div><b>${esc(x.title)}</b>${x.summary ? `<small>${renderInline(x.summary, resolve, { linkify: false })}</small>` : ''}</div></summary>
                    <div class="body">
                      ${formulaHtml(x.latex, x.variables, { copy: false })}
                      <div class="prose" data-read>${renderMarkdown(x.body, resolve)}</div>
                      <a class="open-link" href="${entryHref(x.id)}">Open example →</a>
                    </div>
                  </details>`,
                  )
                  .join('')}</div>
              </section>`
            : ''
        }

        ${leadsHtml(e)}

        ${upNextHtml(e)}
      </article>

      <aside class="aside">
        <div>
          <p class="eyebrow">Your questions</p>
          ${topicQuestionsHtml(e)}
        </div>
        <div>
          <p class="eyebrow">Connections · ${conns.length}</p>
          ${
            groups.length
              ? groups.map((g) => `<div class="conn-group"><h5>${esc(g.label)}</h5>${g.items.map(connItem).join('')}</div>`).join('')
              : `<p class="muted" style="margin:0 0 10px;font-size:14px">${examples.length ? 'Only examples so far.' : 'Not connected to anything yet.'}</p>`
          }
          <button type="button" class="btn btn-sm btn-ghost" data-act="link" style="margin:8px 0 0 -10px">${icon('plus')} Add connection</button>
        </div>
        ${
          mentions.length
            ? `<div><p class="eyebrow">Mentioned in</p>${mentions
                .map((m) => `<div class="conn-item" style="--c:${colorOf(m)}">${typeIcon(m.type)}<a href="${entryHref(m.id)}" data-peek="${esc(m.id)}">${esc(m.title)}</a></div>`)
                .join('')}</div>`
            : ''
        }
        ${e.tags.length ? `<div><p class="eyebrow">Tags</p><div class="tags">${e.tags.map((t) => `<a class="tag" href="#/library?tag=${enc(t)}">${esc(t)}</a>`).join('')}</div></div>` : ''}
        ${
          e.sources.length
            ? `<div><p class="eyebrow">Sources</p><ul class="sources">${e.sources
                .map((s) => `<li>${/^https?:\/\/\S+$/.test(s) ? `<a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(s.replace(/^https?:\/\/(www\.)?/, ''))}</a>` : renderInline(s, resolve)}</li>`)
                .join('')}</ul></div>`
            : ''
        }
        <div class="meta-dates">Created ${esc(fullDate(e.created))}<br>Updated ${esc(fullDate(e.updated))}</div>
      </aside>
    </div>
  </div>`;

  const root = viewEl.firstElementChild;
  highlightTerms($$('[data-read]', root), e);
  if (e.calc) mountCalc(root, e.calc, { entryId: e.id });
  mountQuestions(root, { onChange: drawQuestionCount });

  // coming back after a while: offer to recall before rereading
  store.recordVisit(e.id).then((previous) => {
    if (hashNow() !== hash) return;
    const nudge = comebackHtml(e, previous);
    if (nudge) $('[data-nudge]', root).insertAdjacentHTML('afterbegin', nudge);
  });
  mountPractice(root, e, hash);
  if (params?.get('practice')) startPractice(root, e, params.get('practice'), hash);

  $('[data-status]', root).addEventListener('change', async (ev) => {
    try {
      if (ev.target.value === 'solid') await solidCheck(e);
      await store.updateEntry(e.id, { status: ev.target.value });
      toast(`Marked ${STATUSES[ev.target.value].label.toLowerCase()}`);
      refreshIfStill(hash);
    } catch (err) {
      fail(err);
    }
  });

  root.addEventListener('click', async (ev) => {
    const unlink = ev.target.closest('[data-unlink]');
    if (unlink) {
      const link = store.links.find((l) => l.id === unlink.dataset.unlink);
      if (!link) return;
      try {
        await store.deleteLink(link.id);
        refreshIfStill(hash);
        toast('Link removed', {
          action: 'Undo',
          onAction: async () => {
            try {
              await store.createLink({ from: link.from, to: link.to, kind: link.kind, note: link.note });
              refreshIfStill(hash);
            } catch (err) {
              fail(err);
            }
          },
        });
      } catch (err) {
        fail(err);
      }
      return;
    }
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'link') linkDialog(e);
    if (act === 'clear-trail') {
      clearTrail();
      pushTrail(e.id);
      ev.target.closest('.trail')?.remove();
    }
    if (act === 'copy-tex') {
      try {
        await navigator.clipboard.writeText(e.latex);
        toast('LaTeX copied');
      } catch {
        toast('Couldn’t reach the clipboard', { error: true });
      }
    }
    if (act === 'history') {
      await showHistory(e);
      return;
    }
    if (act === 'delete') {
      const n = conns.length;
      const ok = await confirmDialog({
        title: `Delete “${e.title}”?`,
        message: `This removes the entry${n ? ` and its ${n} connection${n === 1 ? '' : 's'}` : ''}. Daily backups in data/backups keep older copies.`,
        confirm: 'Delete entry',
        danger: true,
      });
      if (!ok) return;
      try {
        await store.deleteEntry(e.id);
        toast(`Deleted “${e.title}”`);
        go('#/library');
      } catch (err) {
        fail(err);
      }
    }
  });
}

// ------------------------------------------------------------------ practice on a topic page

function mountPractice(root, e, hash) {
  root.addEventListener('click', async (ev) => {
    if (ev.target.closest('[data-act="practise"]')) {
      const strip = $('[data-practice-strip]', root);
      strip.hidden = !strip.hidden;
      ev.target.closest('[data-act="practise"]').setAttribute('aria-expanded', String(!strip.hidden));
      return;
    }
    if (ev.target.closest('[data-comeback-close]')) {
      ev.target.closest('[data-comeback]').remove();
      return;
    }
    const start = ev.target.closest('[data-practice]');
    if (start) {
      ev.target.closest('[data-comeback]')?.remove();
      startPractice(root, e, start.dataset.practice, hash);
    }
  });
}

function startPractice(root, e, kind, hash) {
  const prose = $('.prose', root);

  if (kind === 'explain') {
    const section = $('[data-explain]', root);
    section.outerHTML = explanationsHtml(e, { writing: true });
    root.classList.add('explaining'); // hides the notes while you write
    const box = $('[data-explain]', root);
    const text = $('[data-explain-text]', box);
    text.focus();
    box.scrollIntoView({ block: 'start', behavior: 'smooth' });
    const finish = () => root.classList.remove('explaining');
    $('[data-explain-cancel]', box).addEventListener('click', () => {
      finish();
      box.outerHTML = explanationsHtml(e);
    });
    $('[data-explain-save]', box).addEventListener('click', async () => {
      const value = text.value.trim();
      finish();
      if (!value) {
        box.outerHTML = explanationsHtml(e);
        return;
      }
      try {
        await store.createExplanation(e.id, value);
        $('[data-explain]', root).outerHTML = explanationsHtml(e);
        $('[data-nudge] .fluency', root)?.remove();
        toast('Saved in your own words. Now compare it with the notes below.');
      } catch (err) {
        fail(err);
      }
    });
    return;
  }

  if (kind === 'cover') {
    const formula = $('.formula', root);
    if (!formula) return;
    formula.scrollIntoView({ block: 'center', behavior: 'smooth' });
    coverFormula(root, e, { onDone: (r) => toast(r === 'got' ? 'Nice — that one is yours.' : 'Worth another look later.') });
    return;
  }

  if (kind === 'gaps' && prose) {
    if ($('.gap', prose)) return;
    const gaps = makeGaps(prose, 3);
    if (!gaps.length) return toast('Nothing in these notes to blank out — try Explain it back instead.');
    const bar = document.createElement('div');
    bar.className = 'card gaps-bar';
    bar.innerHTML = `<span>${gaps.length} gap${gaps.length === 1 ? '' : 's'} in the notes below. Fill them from memory.</span>
      <button type="button" class="btn btn-sm btn-primary" data-gaps-check>Check</button>
      <button type="button" class="btn btn-sm btn-ghost" data-gaps-done>Put the notes back</button>`;
    prose.before(bar);
    gaps[0].focus();
    gaps[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
    const restore = () => refreshIfStill(hash);
    bar.querySelector('[data-gaps-done]').addEventListener('click', restore);
    bar.querySelector('[data-gaps-check]').addEventListener('click', () => {
      let right = 0;
      for (const g of gaps) {
        const ok = checkGap(g);
        right += ok ? 1 : 0;
        g.classList.add(ok ? 'right' : 'wrong');
        g.title = `It said: ${g.dataset.answer}`;
        if (!ok) g.insertAdjacentHTML('afterend', `<span class="gap-answer">${esc(g.dataset.answer)}</span>`);
        g.readOnly = true;
        record(e.id, 'gap', { result: ok ? 'got' : 'missed', label: g.dataset.answer });
      }
      bar.querySelector('span').textContent = `${right} of ${gaps.length} from memory.${right < gaps.length ? ' The right answers are shown next to the gaps.' : ''}`;
      bar.querySelector('[data-gaps-check]').remove();
    });
    return;
  }

  if (kind === 'fade' && prose) {
    const total = stepBlocks(prose).length;
    let hidden = Math.min(1, total);
    const bar = document.createElement('div');
    bar.className = 'card gaps-bar';
    const drawBar = () => {
      bar.innerHTML = `<span>The last ${hidden} step${hidden === 1 ? ' is' : 's are'} hidden. Work ${hidden === 1 ? 'it' : 'them'} out, then reveal.</span>
        ${hidden < total ? '<button type="button" class="btn btn-sm" data-fade-more>Hide one more</button>' : ''}
        <button type="button" class="btn btn-sm btn-ghost" data-fade-done>Show everything</button>`;
    };
    drawBar();
    prose.before(bar);
    fadeSteps(prose, hidden);
    bar.addEventListener('click', (ev2) => {
      if (ev2.target.closest('[data-fade-more]')) {
        hidden = Math.min(total, hidden + 1);
        fadeSteps(prose, hidden);
        drawBar();
      } else if (ev2.target.closest('[data-fade-done]')) {
        fadeSteps(prose, 0);
        bar.remove();
      }
    });
    prose.addEventListener('click', (ev2) => {
      const btn = ev2.target.closest('[data-unfade]');
      if (btn) {
        const cover = btn.closest('.fade-cover');
        cover.nextElementSibling?.classList.remove('faded');
        cover.innerHTML = rateHtml('data-step-rate');
        return;
      }
      const rate = ev2.target.closest('[data-step-rate] [data-rate]');
      if (rate) {
        record(e.id, 'step', { result: rate.dataset.rate });
        rate.closest('.fade-cover').remove();
      }
    });
  }
}

// Marking something Solid: say it from memory first. Never blocks — "Skip" still marks it.
function solidCheck(entry) {
  if (!entry) return Promise.resolve();
  return new Promise((done) => {
    const dlg = openDialog(
      `
      <div class="dialog-body solid-check">
        <h2>Before you mark “${esc(entry.title)}” solid</h2>
        <p class="muted">From memory, without looking: what is it, in a sentence or two?${entry.latex ? ' And its main formula?' : ''} Feeling familiar with something isn't the same as knowing it — this is the quick test.</p>
        <textarea class="textarea" rows="4" data-solid-text placeholder="In my own words…"></textarea>
      </div>
      <div class="dialog-foot">
        <button type="button" class="btn btn-ghost" data-solid-skip>Skip</button>
        <button type="button" class="btn btn-primary" data-solid-save>Save it and mark solid</button>
      </div>`,
      'solid-dialog',
    );
    const text = $('[data-solid-text]', dlg);
    text.focus();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      dlg.close();
      done();
    };
    dlg.addEventListener('close', finish);
    $('[data-solid-skip]', dlg).addEventListener('click', finish);
    $('[data-solid-save]', dlg).addEventListener('click', async () => {
      const value = text.value.trim();
      if (value) {
        try {
          await store.createExplanation(entry.id, value);
          record(entry.id, 'solid', { note: 'explained before marking solid' });
        } catch (err) {
          fail(err);
        }
      }
      finish();
    });
  });
}

// ------------------------------------------------------------------ link dialog

function linkDialog(entry) {
  const relations = [];
  for (const [kind, def] of Object.entries(LINK_KINDS)) {
    relations.push({ value: `${kind}|out`, label: def.label });
    if (!def.symmetric) relations.push({ value: `${kind}|in`, label: def.inverse });
  }
  const dlg = openDialog(`
    <form data-form autocomplete="off">
      <div class="dialog-body">
        <h2>Connect “${esc(entry.title)}”</h2>
        <div class="field">
          <label for="l-rel">This entry…</label>
          <select id="l-rel" class="select">${relations.map((r) => `<option value="${r.value}"${r.value === 'related|out' ? ' selected' : ''}>${esc(r.label)}</option>`).join('')}</select>
        </div>
        <div class="field">
          <label for="l-q">…which entry?</label>
          <div data-picked hidden></div>
          <input id="l-q" class="input" placeholder="Search, or type a new title to create it">
          <div class="picker-results" data-results></div>
        </div>
        <div class="field">
          <label for="l-note">Note <span class="hint">optional — how are they connected?</span></label>
          <input id="l-note" class="input">
        </div>
        <div class="link-preview" data-preview></div>
      </div>
      <div class="dialog-foot">
        <button type="button" class="btn btn-ghost" data-cancel>Cancel</button>
        <button type="submit" class="btn btn-primary" data-submit disabled>Add link</button>
      </div>
    </form>`);

  const rel = $('#l-rel', dlg);
  const q = $('#l-q', dlg);
  const results = $('[data-results]', dlg);
  const picked = $('[data-picked]', dlg);
  const preview = $('[data-preview]', dlg);
  const submit = $('[data-submit]', dlg);
  const hash = hashNow();
  let choice = null; // { entry } | { title, type }
  let items = [];
  let idx = 0;

  function drawPreview() {
    const label = rel.selectedOptions[0].textContent;
    const other = choice ? esc(choice.entry ? choice.entry.title : choice.title) : '<span class="muted">…</span>';
    preview.innerHTML = `<b>${esc(entry.title)}</b> <i>${esc(label)}</i> <b>${other}</b>`;
    submit.disabled = !choice;
  }

  function drawResults() {
    const text = q.value.trim();
    const already = new Set(store.connections(entry.id).map((c) => c.other));
    const found = searchEntries(text)
      .filter((x) => x.id !== entry.id)
      .sort((a, b) => (text ? 0 : byUpdated(a, b)))
      .slice(0, 7);
    items = found.map((x) => ({ entry: x }));
    if (text && !store.resolve(text)) items.push({ title: text });
    idx = Math.min(idx, Math.max(0, items.length - 1));
    results.innerHTML = items
      .map((it, i) =>
        it.entry
          ? `<button type="button" class="palette-item${i === idx ? ' on' : ''}" data-i="${i}" style="--c:${colorOf(it.entry)}">${typeIcon(it.entry.type)}<span class="t">${esc(it.entry.title)}</span><span class="sub">${already.has(it.entry.id) ? 'already linked' : esc(TYPES[it.entry.type].label)}</span></button>`
          : `<button type="button" class="palette-item${i === idx ? ' on' : ''}" data-i="${i}">${icon('plus', 'cmd-icon')}<span class="t">Create “${esc(it.title)}”</span><span class="sub">new entry</span></button>`,
      )
      .join('');
  }

  function choose(i) {
    const it = items[i];
    if (!it) return;
    choice = it.entry ? { entry: it.entry } : { title: it.title, type: 'concept' };
    q.hidden = true;
    results.hidden = true;
    picked.hidden = false;
    picked.innerHTML = choice.entry
      ? `<div class="picker-selected" style="--c:${colorOf(choice.entry)}">${typeIcon(choice.entry.type)}<span class="t">${esc(choice.entry.title)}</span><button type="button" class="btn btn-sm btn-ghost" data-change>Change</button></div>`
      : `<div class="picker-selected">${icon('plus', 'type-icon')}<span class="t">${esc(choice.title)}</span><select class="select" data-newtype style="width:auto;height:30px;padding-top:2px;padding-bottom:2px">${typeOptions('concept')}</select><button type="button" class="btn btn-sm btn-ghost" data-change>Change</button></div>`;
    drawPreview();
    $('#l-note', dlg).focus();
  }

  picked.addEventListener('click', (ev) => {
    if (!ev.target.closest('[data-change]')) return;
    choice = null;
    picked.hidden = true;
    q.hidden = false;
    results.hidden = false;
    drawResults();
    drawPreview();
    q.focus();
  });
  picked.addEventListener('change', (ev) => {
    if (ev.target.matches('[data-newtype]')) choice.type = ev.target.value;
  });
  results.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-i]');
    if (b) choose(Number(b.dataset.i));
  });
  q.addEventListener('input', () => {
    idx = 0;
    drawResults();
  });
  q.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      idx = (idx + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(1, items.length);
      drawResults();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      choose(idx);
    }
  });
  rel.addEventListener('change', drawPreview);

  $('form', dlg).addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!choice) return;
    const [kind, dir] = rel.value.split('|');
    const note = $('#l-note', dlg).value.trim();
    submit.disabled = true;
    try {
      if (choice.entry) {
        const [from, to] = dir === 'out' ? [entry.id, choice.entry.id] : [choice.entry.id, entry.id];
        await store.createLink({ from, to, kind, note });
        toast('Linked');
      } else {
        const created = await store.createEntry({
          title: choice.title,
          type: choice.type,
          area: entry.area,
          status: 'curious',
          links: [{ kind, other: entry.id, dir: dir === 'out' ? 'in' : 'out', note }],
        });
        toast(`Created and linked “${created.title}”`, { action: 'Open', onAction: entryHref(created.id) });
      }
      dlg.close();
      refreshIfStill(hash);
    } catch (err) {
      submit.disabled = false;
      fail(err);
    }
  });

  drawResults();
  drawPreview();
  q.focus();
}

// ------------------------------------------------------------------ editor

function viewEditor({ match, params }) {
  const id = match[1] ? decodeURIComponent(match[1]) : null;
  const existing = id ? store.entry(id) : null;
  if (id && !existing) return viewNotFound();

  const draft = existing
    ? structuredClone(existing)
    : {
        title: params.get('title') || '',
        type: TYPES[params.get('type')] ? params.get('type') : 'concept',
        area: store.area(params.get('area')) ? params.get('area') : '',
        status: 'curious',
        summary: '',
        latex: '',
        variables: [],
        body: '',
        tags: [],
        aliases: [],
        sources: [],
        videos: [],
        year: null,
        calc: null,
      };
  draft.area = draft.area || '';
  draft.aliases ||= [];
  draft.videos ||= [];
  let calcText = draft.calc ? JSON.stringify(draft.calc, null, 2) : '';
  let calcError = '';

  // Links to create on save: [{ kind, dir: 'out' | 'in', other }]
  const pending = [];
  for (const spec of params.getAll('link')) {
    const [kind, dir, other] = spec.split(':');
    if (LINK_KINDS[kind] && store.entry(other)) pending.push({ kind, dir: dir === 'in' ? 'in' : 'out', other });
  }
  const connectedIds = new Set(existing ? store.connections(existing.id).map((c) => c.other) : []);
  const dismissed = new Set();

  const snapshot = () => JSON.stringify([draft, pending, calcText]);
  const initial = snapshot();
  let formulaOpen = draft.type === 'equation' || !!draft.latex || draft.variables.length > 0;
  const cancelHash = existing ? entryHref(existing.id) : pending[0] ? entryHref(pending[0].other) : '#/';

  viewEl.innerHTML = `
  <div class="page">
    <div class="editor">
      <form class="editor-form" novalidate>
        <div class="field">
          <p class="eyebrow" style="margin:0">${existing ? 'Editing' : 'New entry'}</p>
          <input class="input title-input" name="title" value="${esc(draft.title)}" placeholder="Title" aria-label="Title" autocomplete="off">
          <div class="muted" style="font-size:13px" data-dup></div>
        </div>

        <div class="field">
          <span class="label">Type</span>
          <div class="seg" data-seg="type">${Object.entries(TYPES)
            .map(([k, t]) => `<button type="button" data-v="${k}" class="${draft.type === k ? 'on' : ''}" title="${esc(t.hint)}">${typeIcon(k)}${esc(t.label)}</button>`)
            .join('')}</div>
        </div>

        <div class="editor-row">
          <div class="field">
            <label for="e-area">Area</label>
            <select id="e-area" class="select" name="area">${areaOptions(draft.area, { create: true })}</select>
          </div>
          <div class="field">
            <label for="e-year">Year <span class="hint">optional, for the timeline</span></label>
            <input id="e-year" class="input" name="year" type="number" inputmode="numeric" step="1" min="-3000" max="2999" value="${draft.year ?? ''}" placeholder="e.g. 1925">
          </div>
          <div class="field">
            <span class="label">Status</span>
            <div class="seg" data-seg="status">${Object.entries(STATUSES)
              .map(([k, s]) => `<button type="button" data-v="${k}" class="${draft.status === k ? 'on' : ''}" title="${esc(s.hint)}">${statusHtml(k)}</button>`)
              .join('')}</div>
          </div>
        </div>

        <div class="field">
          <label for="e-summary">Summary <span class="hint">one or two sentences</span></label>
          <textarea id="e-summary" class="textarea" name="summary" rows="2">${esc(draft.summary)}</textarea>
        </div>

        <div data-formula></div>

        <div class="field">
          <label for="e-body">Notes <span class="hint">Markdown</span></label>
          <div class="md-help">
            <span><code>$x^2$</code> math</span><span><code>$ … $</code> display math</span><span><code>[[Title]]</code> link an entry</span><span><code>**bold**</code></span><span><code>## Heading</code></span><span><code>- [ ] to do</code></span>
          </div>
          <div class="md-tools">
            <button type="button" class="btn btn-sm" data-act="pick-image">${icon('image')} Add a picture</button>
            <span class="hint">or paste a screenshot, or drop a file in — sketches and photos of handwritten work are kept with your notes</span>
            <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" multiple hidden data-image-input>
          </div>
          <div class="body-wrap">
            <textarea id="e-body" class="textarea" name="body" rows="16" spellcheck="true">${esc(draft.body)}</textarea>
            <div class="suggest" hidden></div>
          </div>
        </div>

        <div class="field link-helper" data-links></div>

        <div class="field">
          <label for="e-aliases">Also called <span class="hint">other names, comma separated — they get highlighted when other notes mention them</span></label>
          <input id="e-aliases" class="input" name="aliases" value="${esc(draft.aliases.join(', '))}" autocomplete="off" placeholder="e.g. BEC, condensate">
        </div>

        <div class="editor-row">
          <div class="field">
            <label for="e-tags">Tags <span class="hint">comma separated</span></label>
            <input id="e-tags" class="input" name="tags" value="${esc(draft.tags.join(', '))}" autocomplete="off" list="tag-options">
            <datalist id="tag-options">${store.tags().map((t) => `<option value="${esc(t.tag)}">`).join('')}</datalist>
          </div>
          <div class="field">
            <label for="e-sources">Sources <span class="hint">one per line</span></label>
            <textarea id="e-sources" class="textarea" name="sources" rows="2" placeholder="Book, paper or https://…">${esc(draft.sources.join('\n'))}</textarea>
          </div>
        </div>

        <div class="field">
          <label for="e-videos">Videos <span class="hint">YouTube links, one per line, optionally followed by a title</span></label>
          <textarea id="e-videos" class="textarea" name="videos" rows="${Math.min(6, Math.max(2, draft.videos.length))}" placeholder="https://www.youtube.com/watch?v=…  Title" spellcheck="false">${esc(draft.videos.map((v) => `${v.url}${v.title ? `  ${v.title}` : ''}`).join('\n'))}</textarea>
        </div>

        <details class="field calc-field"${calcText ? ' open' : ''}>
          <summary class="label">Calculator <span class="hint">optional “Try it” panel — sliders in, numbers out</span></summary>
          <textarea class="textarea mono" name="calc" rows="10" spellcheck="false" placeholder='${esc(CALC_TEMPLATE)}'>${esc(calcText)}</textarea>
          <p class="calc-help">Inputs: <code>key, label, unit, value, min, max</code> (+ <code>log</code> for wide ranges, <code>integer</code>). Outputs: <code>label, unit, expr</code> (+ <code>key</code> to reuse, <code>prefix</code> for μs/km, <code>digits</code>). Expressions can use + − × ÷ ^, sqrt, exp, ln, sin…, zeta, <code>ncdf</code> (normal distribution), <code>min max if</code>, and constants like <code>c G h hbar kB qe me mp u Msun Mearth Rearth eV yr</code>. Unit <code>₹</code> shows amounts in lakh and crore.</p>
          <p class="calc-error" data-calc-error></p>
        </details>

        <div class="editor-bar">
          <button class="btn btn-primary" type="submit" data-save>${existing ? 'Save changes' : 'Create entry'}</button>
          <button class="btn btn-ghost" type="button" data-act="cancel">Cancel</button>
          <span class="spacer"></span>
          <span class="keys"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> to save</span>
        </div>
      </form>

      <aside class="card editor-preview" aria-label="Preview">
        <p class="eyebrow"><span>Preview</span><span data-pv-type></span></p>
        <div data-preview></div>
      </aside>
    </div>
  </div>`;

  const root = viewEl.firstElementChild;
  const form = $('form', root);
  const formulaBox = $('[data-formula]', root);
  const linksBox = $('[data-links]', root);
  const pv = $('[data-preview]', root);

  function drawFormula() {
    if (!formulaOpen) {
      formulaBox.innerHTML = `<button type="button" class="btn btn-sm btn-ghost" data-act="open-formula" style="margin-left:-10px">${icon('plus')} Add a formula</button>`;
      return;
    }
    formulaBox.innerHTML = `
      <div class="field">
        <label for="e-latex">Formula <span class="hint">LaTeX, no $ signs needed</span></label>
        <textarea id="e-latex" class="textarea mono" name="latex" rows="2" placeholder="E = mc^2" spellcheck="false">${esc(draft.latex)}</textarea>
        <div class="formula-preview" data-fpv></div>
      </div>
      <div class="field" style="margin-top:14px">
        <span class="label">Symbols <span class="hint">what each one means</span></span>
        <div class="sym-rows" data-syms></div>
        <div><button type="button" class="btn btn-sm btn-ghost" data-act="add-sym" style="margin-left:-10px">${icon('plus')} Add symbol</button></div>
      </div>`;
    drawSymbols();
  }

  function drawSymbols() {
    const box = $('[data-syms]', root);
    if (!box) return;
    box.innerHTML = draft.variables
      .map(
        (v, i) => `
        <div class="sym-row">
          <input class="input mono" data-sym="${i}" data-f="symbol" value="${esc(v.symbol)}" placeholder="\\hbar" spellcheck="false" aria-label="Symbol (LaTeX)">
          <input class="input" data-sym="${i}" data-f="meaning" value="${esc(v.meaning)}" placeholder="What it means" aria-label="Meaning">
          <button type="button" class="icon-btn" data-del-sym="${i}" aria-label="Remove symbol">${icon('close')}</button>
        </div>`,
      )
      .join('');
  }

  // ---- "Link what you mentioned": topics spotted in the draft, one click to connect
  function drawLinks() {
    const text = `${draft.title}\n${draft.summary}\n${draft.body}`;
    const pendingIds = new Set(pending.map((p) => p.other));
    const spotted = [];
    for (const hit of findTerms(text, store.terms)) {
      if (hit.id === existing?.id || connectedIds.has(hit.id) || pendingIds.has(hit.id) || dismissed.has(hit.id)) continue;
      if (spotted.some((s) => s.id === hit.id)) continue;
      spotted.push(hit);
      if (spotted.length >= 8) break;
    }
    if (!spotted.length && !pending.length) {
      linksBox.innerHTML = '';
      return;
    }
    linksBox.innerHTML = `
      <span class="label">Connections <span class="hint">mark what this builds on so it shows as a basic</span></span>
      ${
        spotted.length
          ? `<div class="link-suggestions">${spotted
              .map((s) => {
                const x = store.entry(s.id);
                return `<div class="link-suggestion" style="--c:${colorOf(x)}">
                  ${typeIcon(x.type)}<span class="t" title="${esc(x.summary)}">${esc(x.title)}</span>
                  <button type="button" class="btn btn-sm" data-suggest="builds-on" data-other="${esc(x.id)}" title="${esc(draft.title || 'This')} builds on ${esc(x.title)}">Basic</button>
                  <button type="button" class="btn btn-sm btn-ghost" data-suggest="related" data-other="${esc(x.id)}">Related</button>
                  <button type="button" class="icon-btn" data-dismiss="${esc(x.id)}" aria-label="Not relevant">${icon('close')}</button>
                </div>`;
              })
              .join('')}</div>`
          : ''
      }
      ${
        pending.length
          ? `<div class="pending-links">${pending
              .map((p, i) => {
                const def = LINK_KINDS[p.kind];
                return `<span class="pending-link">${esc(p.dir === 'out' ? def.label : def.inverse)} <b>${esc(store.entry(p.other).title)}</b><button type="button" data-unpend="${i}" aria-label="Don't link">×</button></span>`;
              })
              .join('')}</div>`
          : ''
      }`;
  }

  function parseCalc() {
    calcError = '';
    if (!calcText.trim()) return { ok: true, calc: null };
    try {
      return { ok: true, calc: normalizeCalc(JSON.parse(calcText)) };
    } catch (err) {
      calcError = err instanceof SyntaxError ? `Not valid JSON: ${err.message}` : err.message;
      return { ok: false };
    }
  }

  const drawPreview = () => {
    $('[data-pv-type]', root).innerHTML = `<span class="badge">${typeIcon(draft.type)} ${esc(TYPES[draft.type].label)}</span>`;
    const parsed = parseCalc();
    $('[data-calc-error]', root).textContent = calcError;
    pv.innerHTML = `
      <h1>${draft.title.trim() ? esc(draft.title) : '<span class="muted">Untitled</span>'}</h1>
      ${draft.summary.trim() ? `<p class="lead">${renderInline(draft.summary, resolve)}</p>` : ''}
      ${formulaHtml(draft.latex, draft.variables, { copy: false })}
      ${parsed.ok && parsed.calc ? calcHtml(parsed.calc) : ''}
      <div class="prose">${draft.body.trim() ? renderMarkdown(draft.body, resolve) : '<p class="empty">Notes will appear here.</p>'}</div>
      ${videosHtml(draft.videos)}`;
    if (parsed.ok && parsed.calc) mountCalc(pv, parsed.calc);
    const fpv = $('[data-fpv]', root);
    if (fpv) fpv.innerHTML = draft.latex.trim() ? renderTex(draft.latex, true) : '';
    const dup = store.resolve(draft.title.trim());
    $('[data-dup]', root).innerHTML =
      draft.title.trim() && dup && dup.id !== existing?.id
        ? `An entry called “${esc(dup.title)}” already exists — <a class="wikilink" href="${entryHref(dup.id)}">open it</a>`
        : '';
    drawLinks();
  };
  const schedulePreview = debounce(drawPreview, 150);

  form.addEventListener('input', (ev) => {
    const t = ev.target;
    if (t.dataset.sym !== undefined) {
      draft.variables[Number(t.dataset.sym)][t.dataset.f] = t.value;
    } else if (t.name === 'tags') {
      draft.tags = t.value.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (t.name === 'aliases') {
      draft.aliases = t.value.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (t.name === 'sources') {
      draft.sources = t.value.split('\n').map((s) => s.trim()).filter(Boolean);
    } else if (t.name === 'year') {
      draft.year = t.value.trim() === '' ? null : Number(t.value);
    } else if (t.name === 'videos') {
      // One per line: a link, optionally followed by a title. Titles already known for a link are kept.
      const known = new Map((existing?.videos || []).map((v) => [v.url, v]));
      const lines = t.value.split('\n').map((s) => s.trim()).filter(Boolean).map((s) => {
        const [url, ...rest] = s.split(/\s+/);
        return { url, title: rest.join(' ') };
      });
      draft.videos = normalizeVideos(lines).map((v) => {
        const k = known.get(v.url);
        return k ? { ...k, title: v.title || k.title } : v;
      });
    } else if (t.name === 'calc') {
      calcText = t.value;
    } else if (['title', 'summary', 'body', 'latex'].includes(t.name)) {
      draft[t.name] = t.value;
    }
    schedulePreview();
  });

  form.addEventListener('change', async (ev) => {
    if (ev.target.name !== 'area') return;
    const sel = ev.target;
    if (sel.value !== '__new') {
      draft.area = sel.value;
      return;
    }
    const area = await areaDialog();
    if (area) draft.area = area.id;
    sel.innerHTML = areaOptions(draft.area, { create: true });
  });

  form.addEventListener('click', (ev) => {
    const seg = ev.target.closest('[data-seg] [data-v]');
    if (seg) {
      const key = seg.parentElement.dataset.seg;
      draft[key] = seg.dataset.v;
      $$('[data-v]', seg.parentElement).forEach((b) => b.classList.toggle('on', b === seg));
      if (key === 'type' && draft.type === 'equation' && !formulaOpen) {
        formulaOpen = true;
        drawFormula();
      }
      drawPreview();
      return;
    }
    const suggestion = ev.target.closest('[data-suggest]');
    if (suggestion) {
      pending.push({ kind: suggestion.dataset.suggest, dir: 'out', other: suggestion.dataset.other });
      drawLinks();
      return;
    }
    const dismiss = ev.target.closest('[data-dismiss]');
    if (dismiss) {
      dismissed.add(dismiss.dataset.dismiss);
      drawLinks();
      return;
    }
    const del = ev.target.closest('[data-del-sym]');
    if (del) {
      draft.variables.splice(Number(del.dataset.delSym), 1);
      drawSymbols();
      drawPreview();
      return;
    }
    const unpend = ev.target.closest('[data-unpend]');
    if (unpend) {
      dismissed.add(pending[Number(unpend.dataset.unpend)].other);
      pending.splice(Number(unpend.dataset.unpend), 1);
      drawLinks();
      return;
    }
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'open-formula') {
      formulaOpen = true;
      drawFormula();
      $('#e-latex', root).focus();
    } else if (act === 'add-sym') {
      draft.variables.push({ symbol: '', meaning: '' });
      drawSymbols();
      $$('[data-f="symbol"]', root).at(-1).focus();
    } else if (act === 'cancel') {
      go(cancelHash);
    }
  });

  // ---- pictures: paste a screenshot, drop a file, or pick one (a phone offers its camera)
  const body = $('#e-body', root);
  const imageInput = $('[data-image-input]', root);

  function insertInBody(text) {
    const at = body.selectionStart ?? body.value.length;
    body.setRangeText(text, at, body.selectionEnd ?? at, 'end');
    body.dispatchEvent(new Event('input', { bubbles: true }));
    body.focus();
  }

  async function addImages(files) {
    const pictures = [...files].filter((file) => file.type.startsWith('image/'));
    if (!pictures.length) return;
    for (const file of pictures) {
      try {
        const url = await store.uploadImage(file);
        const name = file.name?.replace(/\.[^.]+$/, '').slice(0, 60) || 'picture';
        insertInBody(`\n![${name}](${url})\n`);
      } catch (err) {
        toast(err.message, { error: true });
      }
    }
  }

  $('[data-act="pick-image"]', root).addEventListener('click', () => imageInput.click());
  imageInput.addEventListener('change', () => {
    addImages(imageInput.files);
    imageInput.value = '';
  });
  body.addEventListener('paste', (ev) => {
    const files = [...(ev.clipboardData?.files || [])];
    if (!files.length) return;
    ev.preventDefault();
    addImages(files);
  });
  body.addEventListener('dragover', (ev) => {
    if (!ev.dataTransfer?.types.includes('Files')) return;
    ev.preventDefault();
    body.classList.add('dropping');
  });
  body.addEventListener('dragleave', () => body.classList.remove('dropping'));
  body.addEventListener('drop', (ev) => {
    body.classList.remove('dropping');
    const files = [...(ev.dataTransfer?.files || [])];
    if (!files.length) return;
    ev.preventDefault();
    addImages(files);
  });

  // ---- [[wiki link]] autocomplete in the notes field
  const suggest = $('.suggest', root);
  let sItems = [];
  let sIdx = 0;
  const hideSuggest = () => {
    suggest.hidden = true;
    sItems = [];
  };
  function updateSuggest() {
    const before = body.value.slice(0, body.selectionStart);
    const m = before.match(/\[\[([^[\]\n|]{0,60})$/);
    if (!m || body.selectionStart !== body.selectionEnd) return hideSuggest();
    sItems = searchEntries(m[1]).filter((x) => x.id !== existing?.id).slice(0, 7);
    if (!sItems.length) return hideSuggest();
    sIdx = Math.min(sIdx, sItems.length - 1);
    suggest.innerHTML = sItems
      .map((x, i) => `<button type="button" class="${i === sIdx ? 'on' : ''}" data-i="${i}" style="--c:${colorOf(x)}">${typeIcon(x.type)}<span>${esc(x.title)}</span></button>`)
      .join('');
    suggest.hidden = false;
  }
  function pickSuggestion(i) {
    const x = sItems[i];
    if (!x) return;
    const pos = body.selectionStart;
    const before = body.value.slice(0, pos);
    const after = body.value.slice(pos);
    const start = before.lastIndexOf('[[');
    const insert = `[[${x.title}${after.startsWith(']]') ? '' : ']]'}`;
    body.value = before.slice(0, start) + insert + after;
    const caret = start + x.title.length + 4;
    body.setSelectionRange(caret, caret);
    draft.body = body.value;
    hideSuggest();
    body.focus();
    schedulePreview();
  }
  body.addEventListener('input', () => {
    sIdx = 0;
    updateSuggest();
  });
  body.addEventListener('click', updateSuggest);
  body.addEventListener('blur', () => setTimeout(hideSuggest, 120));
  body.addEventListener('keydown', (ev) => {
    if (suggest.hidden) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      sIdx = (sIdx + (ev.key === 'ArrowDown' ? 1 : -1) + sItems.length) % sItems.length;
      updateSuggest();
    } else if ((ev.key === 'Enter' || ev.key === 'Tab') && !ev.ctrlKey) {
      ev.preventDefault();
      pickSuggestion(sIdx);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      ev.stopPropagation();
      hideSuggest();
    }
  });
  suggest.addEventListener('mousedown', (ev) => {
    ev.preventDefault();
    const b = ev.target.closest('[data-i]');
    if (b) pickSuggestion(Number(b.dataset.i));
  });

  // ---- save
  let saving = false;
  async function save() {
    if (saving) return;
    draft.title = draft.title.trim();
    if (!draft.title) {
      toast('Give it a title first.', { error: true });
      form.title.focus();
      return;
    }
    const parsed = parseCalc();
    if (!parsed.ok) {
      toast(`Calculator: ${calcError}`, { error: true });
      return;
    }
    const payload = {
      ...draft,
      area: draft.area || null,
      variables: draft.variables.filter((v) => v.symbol.trim() || v.meaning.trim()),
      calc: parsed.calc,
    };
    saving = true;
    $('[data-save]', root).disabled = true;
    try {
      let saved;
      if (existing) {
        saved = await store.updateEntry(existing.id, payload);
        const failed = [];
        for (const p of pending) {
          const [from, to] = p.dir === 'out' ? [saved.id, p.other] : [p.other, saved.id];
          try {
            await store.createLink({ from, to, kind: p.kind });
          } catch (err) {
            failed.push(`${store.entry(p.other)?.title}: ${err.message}`);
          }
        }
        if (failed.length) toast(`Some links weren’t added — ${failed.join('; ')}`, { error: true });
      } else {
        saved = await store.createEntry({ ...payload, links: pending });
      }
      guard = null;
      go(entryHref(saved.id));
      toast(existing ? 'Saved' : `Created “${saved.title}”`);
    } catch (err) {
      saving = false;
      $('[data-save]', root).disabled = false;
      fail(err);
    }
  }
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    save();
  });
  root.addEventListener('keydown', (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
      ev.preventDefault();
      save();
    } else if (ev.key === 'Escape' && !document.querySelector('dialog[open]')) {
      go(cancelHash);
    }
  });

  guard = () => !saving && snapshot() !== initial;
  drawFormula();
  drawPreview();
  if (!draft.title) form.title.focus();
}

const CALC_TEMPLATE = `{
  "inputs": [
    { "key": "v", "label": "Speed", "unit": "c", "value": 0.9, "min": 0, "max": 0.999 }
  ],
  "outputs": [
    { "label": "Lorentz factor γ", "expr": "1/sqrt(1 - v^2)" }
  ]
}`;

// ------------------------------------------------------------------ graph

const graphPrefs = {
  hiddenAreas: new Set(),
  hiddenTypes: new Set(),
  panelOpen: false,
  mode: readPref('graphMode', '3d') === '2d' ? '2d' : '3d',
  route: readPref('graphRoute', 'off') === 'on',
};
const ROUTE_HINT = 'Main path: the gold line runs step by step · filled = solid · ringed = next';
const GRAPH_HINTS = {
  '3d': 'Drag to orbit · right-drag or Shift-drag to pan · scroll to zoom · click a star · double-click to open',
  '2d': 'Drag nodes · scroll to zoom · double-click to open',
};

function viewGraph({ params }) {
  viewEl.className = 'full';
  if (params.get('route') === '1' && store.route) {
    graphPrefs.route = true;
    writePref('graphRoute', 'on');
  }
  const showRoute = () => graphPrefs.route && !!store.route;
  const focus = store.entry(params.get('focus'));
  const depth = Math.max(1, Math.min(3, Number(params.get('depth')) || 2));

  viewEl.innerHTML = `
  <div class="graph-view${graphPrefs.mode === '3d' ? ' space' : ''}">
    <div class="graph-stage" data-stage></div>
    <div class="card graph-panel${graphPrefs.panelOpen ? ' open' : ''}" data-panel></div>
    <div class="card graph-tools">
      <button type="button" class="icon-btn" data-g="panel" title="Filters" aria-label="Filters">${icon('filter')}</button>
      <button type="button" class="icon-btn" data-g="in" title="Zoom in" aria-label="Zoom in">${icon('plus')}</button>
      <button type="button" class="icon-btn" data-g="out" title="Zoom out" aria-label="Zoom out">${icon('minus')}</button>
      <button type="button" class="icon-btn" data-g="fit" title="Fit to screen" aria-label="Fit to screen">${icon('fit')}</button>
      <button type="button" class="icon-btn" data-g="relayout" title="Shuffle layout" aria-label="Shuffle layout">${icon('shuffle')}</button>
      ${store.route ? `<button type="button" class="icon-btn${showRoute() ? ' on' : ''}" data-g="route" title="Show the main path" aria-label="Show the main path" aria-pressed="${showRoute()}">${icon('route')}</button>` : ''}
      <button type="button" class="graph-mode" data-g="mode" title="Switch between the 3D universe and the flat map">${graphPrefs.mode === '3d' ? '2D' : '3D'}</button>
    </div>
    <div class="card graph-card" data-card hidden></div>
    <div class="graph-hint" data-hint>${showRoute() ? ROUTE_HINT : GRAPH_HINTS[graphPrefs.mode]}</div>
  </div>`;

  const root = viewEl.firstElementChild;
  const stage = $('[data-stage]', root);
  const panel = $('[data-panel]', root);
  const card = $('[data-card]', root);
  let graph = null;
  let selected = focus?.id || null;

  function build() {
    graph?.destroy();
    let pool = store.entries.filter((e) => !graphPrefs.hiddenTypes.has(e.type) && !graphPrefs.hiddenAreas.has(e.area || 'none'));
    if (focus) {
      const reach = new Map([[focus.id, 0]]);
      const queue = [focus.id];
      while (queue.length) {
        const cur = queue.shift();
        if (reach.get(cur) >= depth) continue;
        for (const c of store.connections(cur)) {
          if (!reach.has(c.other)) {
            reach.set(c.other, reach.get(cur) + 1);
            queue.push(c.other);
          }
        }
      }
      pool = pool.filter((e) => reach.has(e.id));
      if (!pool.includes(focus)) pool.push(focus);
    }
    const ids = new Set(pool.map((e) => e.id));
    const edges = store.links
      .filter((l) => ids.has(l.from) && ids.has(l.to))
      .map((l) => ({ source: l.from, target: l.to, kind: l.kind }));
    const degree = new Map();
    for (const l of edges) {
      degree.set(l.source, (degree.get(l.source) || 0) + 1);
      degree.set(l.target, (degree.get(l.target) || 0) + 1);
    }
    const nodes = pool.map((e) => ({
      id: e.id,
      title: e.title,
      type: e.type,
      color: store.area(e.area)?.color || '#8a93a6',
      group: e.area || 'none',
      degree: degree.get(e.id) || 0,
      stuck: store.questionsFor(e.id).some((q) => !q.asked),
    }));
    const groups = [...store.areas.map((a) => a.id), 'none'].filter((g) => nodes.some((n) => n.group === g));
    const route = showRoute() ? store.route.order.filter((id) => ids.has(id)) : null;
    graph = (graphPrefs.mode === '3d' ? mountUniverse : mountGraph)(stage, {
      nodes,
      edges,
      groups,
      route,
      routeDone: route ? new Set(route.filter((id) => store.entry(id).status === 'solid')) : null,
      routeNext: route ? store.routeNext() : null,
      selectedId: selected,
      onSelect: showCard,
      onOpen: (id) => go(entryHref(id)),
      insetLeft: () => (getComputedStyle(panel).display === 'none' ? 0 : panel.offsetWidth + 16),
    });
    drawPanel(nodes.length, edges.length);
    showCard(selected && ids.has(selected) ? selected : null);
  }

  function drawPanel(nNodes, nEdges) {
    const areas = [...store.areas];
    if (store.entries.some((e) => !e.area)) areas.push({ id: 'none', name: 'Unfiled', color: '#8a93a6' });
    panel.innerHTML = `
      <div class="graph-focus">
        <h4>Focus</h4>
        ${
          focus
            ? `<div class="picker-selected" style="--c:${colorOf(focus)}">${typeIcon(focus.type)}<span class="t">${esc(focus.title)}</span><a class="icon-btn" href="#/graph" title="Show everything" aria-label="Clear focus" style="width:26px;height:26px">${icon('close')}</a></div>
               <div class="seg">${[1, 2, 3]
                 .map((d) => `<a href="#/graph?focus=${enc(focus.id)}&depth=${d}" class="${d === depth ? 'on' : ''}">${d} step${d > 1 ? 's' : ''}</a>`)
                 .join('')}</div>`
            : `<div class="search-box">${icon('search')}<input class="input" placeholder="Focus on an entry…" data-focus-q aria-label="Focus on an entry"></div>
               <div class="picker-results" data-focus-results></div>`
        }
      </div>
      <div>
        <h4>Areas</h4>
        ${areas
          .map(
            (a) =>
              `<button type="button" class="filter-opt${graphPrefs.hiddenAreas.has(a.id) ? '' : ' on'}" data-area="${esc(a.id)}"><span class="area-dot" style="--c:${esc(a.color)}"></span><span class="label">${esc(a.name)}</span></button>`,
          )
          .join('')}
      </div>
      <div>
        <h4>Types</h4>
        ${Object.entries(TYPES)
          .map(
            ([k, t]) =>
              `<button type="button" class="filter-opt${graphPrefs.hiddenTypes.has(k) ? '' : ' on'}" data-type="${k}">${typeIcon(k)}<span class="label">${esc(t.plural)}</span></button>`,
          )
          .join('')}
      </div>
      <p class="muted" style="margin:0;font-size:12.5px">${nNodes} entries · ${nEdges} links${
        store.links.some((l) => l.kind === 'tension') ? ' · <span style="color:var(--danger)">dashed red</span> = in tension' : ''
      }</p>`;

    const fq = $('[data-focus-q]', panel);
    if (fq) {
      const out = $('[data-focus-results]', panel);
      fq.addEventListener('input', () => {
        const text = fq.value.trim();
        out.innerHTML = text
          ? searchEntries(text)
              .slice(0, 6)
              .map((x) => `<a class="palette-item" href="#/graph?focus=${enc(x.id)}" style="--c:${colorOf(x)}">${typeIcon(x.type)}<span class="t">${esc(x.title)}</span></a>`)
              .join('')
          : '';
      });
    }
  }

  function showCard(id) {
    selected = id;
    const e = id && store.entry(id);
    if (!e) {
      card.hidden = true;
      return;
    }
    const conns = store.connections(e.id);
    card.hidden = false;
    card.style.setProperty('--c', colorOf(e));
    card.innerHTML = `
      <button type="button" class="icon-btn close" data-g="close" aria-label="Close">${icon('close')}</button>
      <div class="entry-crumbs" style="margin:0;gap:12px"><span class="badge">${typeIcon(e.type)} ${esc(TYPES[e.type].label)}</span>${statusHtml(e.status)}</div>
      <h3>${esc(e.title)}</h3>
      <div style="margin-bottom:10px">${areaChip(e.area)}</div>
      ${e.summary ? `<p class="summary">${renderInline(e.summary, resolve)}</p>` : ''}
      ${e.latex ? `<div class="formula-mini">${renderTex(e.latex, true)}</div>` : ''}
      ${
        conns.length
          ? `<div>${conns
              .slice(0, 10)
              .map((c) => {
                const o = store.entry(c.other);
                return `<div class="conn-item" style="--c:${colorOf(o)};padding-right:8px">${typeIcon(o.type)}<a href="${entryHref(o.id)}" data-select="${esc(o.id)}"><span class="note" style="margin:0 0 1px">${esc(c.label)}</span>${esc(o.title)}</a></div>`;
              })
              .join('')}${conns.length > 10 ? `<p class="muted" style="font-size:12.5px;margin:6px 0 0">+ ${conns.length - 10} more</p>` : ''}</div>`
          : '<p class="muted" style="font-size:13.5px;margin:0">No connections yet.</p>'
      }
      <div class="actions">
        <a class="btn btn-primary btn-sm" href="${entryHref(e.id)}">Open</a>
        <a class="btn btn-sm" href="#/graph?focus=${enc(e.id)}">Focus</a>
        <a class="btn btn-sm btn-ghost" href="#/edit/${enc(e.id)}">Edit</a>
      </div>`;
  }

  root.addEventListener('click', (ev) => {
    const sel = ev.target.closest('[data-select]');
    if (sel && !ev.ctrlKey && !ev.metaKey) {
      ev.preventDefault();
      graph.select(sel.dataset.select);
      graph.centerOn(sel.dataset.select);
      showCard(sel.dataset.select);
      return;
    }
    const areaBtn = ev.target.closest('[data-area]');
    const typeBtn = ev.target.closest('[data-type]');
    if (areaBtn || typeBtn) {
      const set = areaBtn ? graphPrefs.hiddenAreas : graphPrefs.hiddenTypes;
      const key = areaBtn ? areaBtn.dataset.area : typeBtn.dataset.type;
      set.has(key) ? set.delete(key) : set.add(key);
      build();
      return;
    }
    const g = ev.target.closest('[data-g]')?.dataset.g;
    if (g === 'in') graph.zoomBy(1.3);
    if (g === 'out') graph.zoomBy(1 / 1.3);
    if (g === 'fit') graph.fit();
    if (g === 'relayout') graph.relayout();
    if (g === 'close') {
      graph.select(null);
      showCard(null);
    }
    if (g === 'mode') {
      graphPrefs.mode = graphPrefs.mode === '3d' ? '2d' : '3d';
      writePref('graphMode', graphPrefs.mode);
      root.classList.toggle('space', graphPrefs.mode === '3d');
      ev.target.closest('[data-g]').textContent = graphPrefs.mode === '3d' ? '2D' : '3D';
      $('[data-hint]', root).textContent = showRoute() ? ROUTE_HINT : GRAPH_HINTS[graphPrefs.mode];
      build();
    }
    if (g === 'route') {
      graphPrefs.route = !graphPrefs.route;
      writePref('graphRoute', graphPrefs.route ? 'on' : 'off');
      const btn = ev.target.closest('[data-g]');
      btn.classList.toggle('on', graphPrefs.route);
      btn.setAttribute('aria-pressed', graphPrefs.route);
      $('[data-hint]', root).textContent = showRoute() ? ROUTE_HINT : GRAPH_HINTS[graphPrefs.mode];
      build();
    }
    if (g === 'panel') {
      graphPrefs.panelOpen = !panel.classList.contains('open');
      panel.classList.toggle('open', graphPrefs.panelOpen);
    }
  });

  build();
  teardown = () => graph?.destroy();
}

// ------------------------------------------------------------------ questions

// Everything you wondered while studying, in one place, ready to copy into an AI chat.
function viewQuestions({ params }) {
  const show = ['open', 'asked', 'all'].includes(params.get('show')) ? params.get('show') : 'open';
  const opts = { context: readPref('lattice.q.context', 'on') !== 'off', intro: readPref('lattice.q.intro', 'on') !== 'off' };

  const shown = () => {
    const all = [...store.questions].sort((a, b) => a.created.localeCompare(b.created));
    return show === 'all' ? all : all.filter((q) => (show === 'asked' ? q.asked : !q.asked));
  };

  function groupsHtml() {
    const list = shown();
    if (!list.length) {
      return `<p class="empty q-empty">${
        show === 'asked'
          ? 'Nothing asked yet. Questions land here once you tick them off.'
          : 'No questions yet. While you read a topic, use <b>Questions</b> on it to jot down whatever you don’t get — they all collect here.'
      }</p>`;
    }
    const byEntry = new Map();
    for (const q of list) {
      const key = q.entry || '';
      if (!byEntry.has(key)) byEntry.set(key, []);
      byEntry.get(key).push(q);
    }
    return [...byEntry.entries()]
      .sort(([a], [b]) => (a === '') - (b === ''))
      .map(([id, items]) => {
        const entry = id && store.entry(id);
        return `
          <section class="q-group card" style="--c:${entry ? colorOf(entry) : 'var(--muted)'}">
            <h2>${
              entry ? `${typeIcon(entry.type)}<a href="${entryHref(entry.id)}">${esc(entry.title)}</a>` : 'Not about a particular topic'
            }<span class="q-group-count">${items.length}</span></h2>
            ${entry?.summary ? `<p class="q-group-summary">${renderInline(entry.summary, resolve, { linkify: false })}</p>` : ''}
            <ul class="q-list">${items.map((q) => questionItemHtml(q)).join('')}</ul>
          </section>`;
      })
      .join('');
  }

  viewEl.innerHTML = `
  <div class="page page-narrow questions-page">
    <div class="page-head">
      <h1>Questions</h1>
      <div class="seg">${['open', 'asked', 'all']
        .map((k) => `<a href="#/questions?show=${k}" class="${k === show ? 'on' : ''}">${k[0].toUpperCase()}${k.slice(1)}</a>`)
        .join('')}</div>
    </div>
    <p class="muted page-intro">Write questions down as you read. Copy them all from here, paste them into any AI, then tick off the ones you asked.</p>

    <div class="card q-copy">
      <div class="q-copy-row">
        <button type="button" class="btn btn-primary" data-act="copy">${icon('copy')} <span data-copy-label></span></button>
        ${show === 'asked' ? '' : `<button type="button" class="btn btn-ghost" data-act="mark-all">${icon('check')} Mark all as asked</button>`}
        <label class="q-opt"><input type="checkbox" data-opt="context"${opts.context ? ' checked' : ''}> Include each topic’s summary</label>
        <label class="q-opt"><input type="checkbox" data-opt="intro"${opts.intro ? ' checked' : ''}> Start with a short instruction</label>
      </div>
      <details class="q-preview"><summary>See what gets copied</summary><pre data-preview></pre></details>
      <details class="q-paste" data-paste>
        <summary>Paste the answers back</summary>
        <p class="q-hint">Paste the whole reply. Answers are matched to your questions by their numbers.</p>
        <textarea class="textarea" rows="5" data-answers placeholder="1. Because …"></textarea>
        <div class="q-paste-actions">
          <button type="button" class="btn btn-sm" data-act="match">Match up</button>
          <span class="muted" data-match-info></span>
        </div>
        <div data-matches></div>
      </details>
    </div>

    <div data-groups>${groupsHtml()}</div>

    <form class="card q-add q-add-general" data-add-general>
      <input type="text" name="text" placeholder="A question that isn’t about one topic…" autocomplete="off" aria-label="Add a question">
      <button type="submit" class="btn">${icon('plus')} Add</button>
    </form>

    ${
      store.questions.some((q) => q.asked)
        ? `<p class="q-tidy"><button type="button" class="link-btn" data-act="clear-asked">Delete the ${store.questions.filter((q) => q.asked).length} asked question${store.questions.filter((q) => q.asked).length === 1 ? '' : 's'}</button></p>`
        : ''
    }
  </div>`;

  const root = viewEl.firstElementChild;
  let pendingAnswers = [];
  function drawCopy() {
    const list = shown();
    $('[data-copy-label]', root).textContent = list.length ? `Copy ${list.length} question${list.length === 1 ? '' : 's'}` : 'Nothing to copy';
    $('[data-act="copy"]', root).disabled = !list.length;
    const markAll = $('[data-act="mark-all"]', root);
    if (markAll) markAll.disabled = !list.some((q) => !q.asked);
    $('[data-preview]', root).textContent = questionsText(list, opts) || '—';
  }
  const redraw = (info) => {
    $('[data-groups]', root).innerHTML = groupsHtml();
    drawCopy();
    drawQuestionCount();
    if (info?.savedToNotes) toast(`Added to ${info.savedToNotes}'s notes.`);
  };
  drawCopy();

  root.addEventListener('click', async (ev) => {
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'copy') {
      const list = shown();
      rememberOrder(list);
      const ok = await copyText(questionsText(list, opts));
      if (!ok) return toast('Could not reach the clipboard — copy the text from “See what gets copied”.', { error: true });
      const unasked = list.filter((q) => !q.asked);
      toast(`${list.length} question${list.length === 1 ? '' : 's'} copied. Paste them into any AI.`, {
        action: unasked.length ? 'Mark as asked' : undefined,
        onAction: async () => {
          for (const q of unasked) await store.updateQuestion(q.id, { asked: true });
          redraw();
        },
      });
    } else if (act === 'match') {
      const text = $('[data-answers]', root).value;
      const pairs = matchAnswers(text);
      $('[data-match-info]', root).textContent = pairs.length
        ? `${pairs.length} answer${pairs.length === 1 ? '' : 's'} matched`
        : 'No numbered answers found — they should start with "1.", "2." and so on.';
      $('[data-matches]', root).innerHTML = pairs
        .map(
          (p, i) => `
          <label class="q-match">
            <input type="checkbox" data-keep="${i}" checked>
            <span class="q-match-body">
              <b>${p.number}. ${esc(p.question.text)}</b>
              <span class="q-match-answer">${esc(p.answer.length > 400 ? `${p.answer.slice(0, 400)}…` : p.answer)}</span>
              ${p.question.answer ? '<em class="muted">replaces the answer already saved</em>' : ''}
            </span>
          </label>`,
        )
        .join('');
      if (pairs.length) {
        $('[data-matches]', root).insertAdjacentHTML(
          'beforeend',
          '<button type="button" class="btn btn-primary btn-sm" data-act="save-answers">Save the ticked answers</button>',
        );
        pendingAnswers = pairs;
      }
    } else if (act === 'save-answers') {
      const keep = pendingAnswers.filter((_, i) => $(`[data-keep="${i}"]`, root)?.checked);
      for (const p of keep) await store.updateQuestion(p.question.id, { answer: p.answer, asked: true });
      $('[data-answers]', root).value = '';
      $('[data-matches]', root).innerHTML = '';
      $('[data-match-info]', root).textContent = '';
      pendingAnswers = [];
      toast(`${keep.length} answer${keep.length === 1 ? '' : 's'} saved with your questions.`);
      redraw();
    } else if (act === 'mark-all') {
      const open = shown().filter((q) => !q.asked);
      for (const q of open) await store.updateQuestion(q.id, { asked: true });
      if (open.length) toast(`${open.length} question${open.length === 1 ? '' : 's'} moved to Asked.`);
      redraw();
    } else if (act === 'clear-asked') {
      for (const q of store.questions.filter((q) => q.asked)) await store.deleteQuestion(q.id);
      render({ keepScroll: true });
    } else {
      handleItemClick(ev, redraw);
    }
  });
  root.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.matches?.('[data-q-act="edit"]')) {
      ev.preventDefault();
      ev.target.click();
    }
  });
  root.addEventListener('change', (ev) => {
    const opt = ev.target.dataset?.opt;
    if (!opt) return;
    opts[opt] = ev.target.checked;
    writePref(`lattice.q.${opt}`, ev.target.checked ? 'on' : 'off');
    drawCopy();
  });
  $('[data-add-general]', root).addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const input = ev.target.elements.text;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    await store.createQuestion({ entry: null, text });
    if (show === 'asked') return go('#/questions');
    redraw();
  });
}

// ------------------------------------------------------------------ how two topics connect

// The shortest chain of links from one topic to another, with the "why" note on every step.
function viewPath({ params }) {
  const from = store.entry(params.get('from'));
  const to = store.entry(params.get('to'));
  const paths = from && to ? store.pathsBetween(from.id, to.id) : [];
  const hashFor = (f, t) => `#/path${f || t ? `?${[f ? `from=${enc(f)}` : '', t ? `to=${enc(t)}` : ''].filter(Boolean).join('&')}` : ''}`;

  const pickerHtml = (side, chosen) => `
    <div class="path-picker">
      <span class="label">${side === 'from' ? 'From' : 'To'}</span>
      ${
        chosen
          ? `<div class="picker-selected" style="--c:${colorOf(chosen)}">${typeIcon(chosen.type)}<span class="t">${esc(chosen.title)}</span>
             <button type="button" class="icon-btn" data-clear="${side}" title="Change" aria-label="Change" style="width:26px;height:26px">${icon('close')}</button></div>`
          : `<div class="search-box">${icon('search')}<input class="input" data-q="${side}" placeholder="Pick a topic…" autocomplete="off" aria-label="${side === 'from' ? 'Start' : 'Destination'} topic"></div>
             <div class="picker-results" data-results="${side}"></div>`
      }
    </div>`;

  const chainHtml = (steps, i) => `
    <section class="path-chain${i ? ' alt' : ''}">
      <h2>${i ? 'Another way' : 'Shortest way'} · ${steps.length} step${steps.length === 1 ? '' : 's'}</h2>
      <ol class="path-steps">
        <li class="path-node" style="--c:${colorOf(from)}">${typeIcon(from.type)}<a href="${entryHref(from.id)}">${esc(from.title)}</a></li>
        ${steps
          .map(
            (s) => `
          <li class="path-link"><span class="path-rel">${esc(s.label)}</span>${
            s.link.note ? `<span class="path-why">${renderInline(s.link.note, resolve, { linkify: false })}</span>` : ''
          }</li>
          <li class="path-node" style="--c:${colorOf(s.entry)}">${typeIcon(s.entry.type)}<a href="${entryHref(s.entry.id)}">${esc(s.entry.title)}</a></li>`,
          )
          .join('')}
      </ol>
    </section>`;

  viewEl.innerHTML = `
  <div class="page page-narrow path-page">
    <div class="page-head"><h1>How are these connected?</h1></div>
    <p class="muted page-intro">Pick two topics and follow the chain of links between them, with the reason for every step.</p>
    <div class="card path-pickers">
      ${pickerHtml('from', from)}
      <button type="button" class="icon-btn path-swap" data-act="swap" title="Swap them" aria-label="Swap them"${from && to ? '' : ' disabled'}>${icon('shuffle')}</button>
      ${pickerHtml('to', to)}
    </div>
    ${
      from && to
        ? paths.length
          ? paths.map(chainHtml).join('')
          : `<p class="empty">Nothing links them yet, even indirectly. <a class="wikilink" href="${entryHref(from.id)}">Open ${esc(from.title)}</a> and add a connection.</p>`
        : `<p class="empty">${from || to ? 'Now pick the other one.' : 'Pick two topics above.'} <button type="button" class="link-btn" data-act="surprise">Surprise me</button></p>`
    }
  </div>`;

  const root = viewEl.firstElementChild;
  for (const side of ['from', 'to']) {
    const input = $(`[data-q="${side}"]`, root);
    if (!input) continue;
    const out = $(`[data-results="${side}"]`, root);
    input.addEventListener('input', () => {
      const q = input.value.trim();
      out.innerHTML = q
        ? searchEntries(q)
            .filter((x) => x.id !== from?.id && x.id !== to?.id)
            .slice(0, 6)
            .map(
              (x) =>
                `<a class="palette-item" href="${hashFor(side === 'from' ? x.id : from?.id, side === 'to' ? x.id : to?.id)}" style="--c:${colorOf(x)}">${typeIcon(x.type)}<span class="t">${esc(x.title)}</span></a>`,
            )
            .join('')
        : '';
    });
  }
  $('[data-q="from"]', root)?.focus();

  root.addEventListener('click', (ev) => {
    const clear = ev.target.closest('[data-clear]')?.dataset.clear;
    if (clear) return go(hashFor(clear === 'from' ? null : from?.id, clear === 'to' ? null : to?.id));
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'swap' && from && to) go(hashFor(to.id, from.id));
    if (act === 'surprise') {
      const pool = store.entries.filter((x) => x.type !== 'note' && store.connections(x.id).length);
      const pick = () => pool[Math.floor(Math.random() * pool.length)];
      const a = from || pick();
      let b = pick();
      for (let i = 0; i < 20 && (b.id === a.id || b.area === a.area); i++) b = pick();
      go(hashFor(a.id, b.id));
    }
  });
}

// ------------------------------------------------------------------ equation sheet

// Every formula in one place, grouped by area — for revision, or to print.
function viewSheet({ params }) {
  const area = params.get('area') || '';
  const withFormula = store.entries.filter((e) => e.latex.trim() && (!area || (e.area || 'none') === area));
  const areas = [...store.areas, { id: 'none', name: 'Unfiled' }].filter((a) =>
    store.entries.some((e) => e.latex.trim() && (e.area || 'none') === a.id),
  );
  const groups = new Map();
  for (const e of withFormula) {
    const key = e.area || 'none';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  }

  viewEl.innerHTML = `
  <div class="page sheet-page">
    <div class="page-head">
      <h1><a class="page-back no-print" href="#/library">Library</a> Equation sheet</h1>
      <div class="sheet-tools no-print">
        <div class="seg">
          <a href="#/sheet" class="${area ? '' : 'on'}">All</a>
          ${areas.map((a) => `<a href="#/sheet?area=${enc(a.id)}" class="${area === a.id ? 'on' : ''}">${esc(a.name)}</a>`).join('')}
        </div>
        <button type="button" class="btn btn-sm" data-act="cover-all" aria-pressed="false">Cover them all</button>
        <button type="button" class="btn btn-sm" data-act="print">${icon('copy')} Print</button>
      </div>
    </div>
    <p class="muted page-intro no-print">${withFormula.length} formula${withFormula.length === 1 ? '' : 's'}, with what every symbol means. Click a title to open the notes.</p>
    ${[...groups.entries()]
      .map(
        ([id, list]) => `
      <section class="sheet-group">
        <h2 style="--c:${store.area(id)?.color || 'var(--muted)'}">${esc(store.area(id)?.name || 'Unfiled')}<span class="muted">${list.length}</span></h2>
        ${list
          .map(
            (e) => `
          <article class="sheet-item" style="--c:${colorOf(e)}">
            <h3>${typeIcon(e.type)}<a href="${entryHref(e.id)}">${esc(e.title)}</a>${e.calc ? `<span class="sheet-tag no-print">${icon('sliders')} Try it</span>` : ''}</h3>
            <div class="sheet-tex">${renderTex(e.latex, true)}</div>
            ${
              e.variables.length
                ? `<table class="symbols">${e.variables
                    .map((v) => `<tr><td>${v.symbol ? renderTex(v.symbol) : ''}</td><td>${renderInline(v.meaning, resolve, { linkify: false })}</td></tr>`)
                    .join('')}</table>`
                : ''
            }
          </article>`,
          )
          .join('')}
      </section>`,
      )
      .join('') || '<p class="empty">No formulas here yet.</p>'}
  </div>`;

  const sheet = viewEl.firstElementChild;
  sheet.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-act="print"]')) window.print();
    // cover every formula; tap one to reveal it, then say how you did
    const coverAll = ev.target.closest('[data-act="cover-all"]');
    if (coverAll) {
      const on = sheet.classList.toggle('covering');
      coverAll.setAttribute('aria-pressed', String(on));
      coverAll.textContent = on ? 'Uncover them all' : 'Cover them all';
      sheet.querySelectorAll('.sheet-item').forEach((it) => it.classList.remove('uncovered'));
      sheet.querySelectorAll('.sheet-rate').forEach((r) => r.remove());
      return;
    }
    const tex = ev.target.closest('.covering .sheet-item:not(.uncovered) .sheet-tex');
    if (tex) {
      const item = tex.closest('.sheet-item');
      item.classList.add('uncovered');
      tex.insertAdjacentHTML('afterend', `<div class="sheet-rate">${rateHtml()}</div>`);
      return;
    }
    const rate = ev.target.closest('.sheet-rate [data-rate]');
    if (rate) {
      const id = rate.closest('.sheet-item').querySelector('h3 a')?.getAttribute('href')?.replace('#/entry/', '');
      record(id ? decodeURIComponent(id) : null, 'recall', { what: 'formula', result: rate.dataset.rate });
      rate.closest('.sheet-rate').outerHTML = `<p class="rated">${esc(RATE_WORDS[rate.dataset.rate])}</p>`;
    }
  });
}

// ------------------------------------------------------------------ loose ends

// What's unfinished in the library: empty notes, topics with nothing linked, dead [[links]],
// connections with no "why", and questions still open.
function viewLoose() {
  const real = store.entries.filter((e) => e.type !== 'note');
  const noNotes = real.filter((e) => !e.body.trim());
  const noSummary = real.filter((e) => !e.summary.trim());
  const noLinks = real.filter((e) => !store.connections(e.id).length);
  const missing = store.missingLinks();
  const noWhy = store.links.filter((l) => !l.note?.trim() && l.kind !== 'example-of');
  const open = openQuestions();

  const rows = (list, render) => `<ul class="loose-list">${list.map(render).join('')}</ul>`;
  const entryLink = (e) => `<li style="--c:${colorOf(e)}">${typeIcon(e.type)}<a href="${entryHref(e.id)}">${esc(e.title)}</a>${stuckMark(e.id)}</li>`;
  const section = (title, hint, count, body) =>
    count
      ? `<details class="card loose-group"${count <= 12 ? ' open' : ''}>
           <summary><b>${esc(title)}</b><span class="loose-count">${count}</span></summary>
           <p class="muted loose-hint">${hint}</p>
           ${body}
         </details>`
      : '';

  viewEl.innerHTML = `
  <div class="page page-narrow loose-page">
    <div class="page-head"><h1><a class="page-back" href="#/library">Library</a> Loose ends</h1></div>
    <p class="muted page-intro">Everything in the library that's half-finished. Nothing here is urgent — it's a list to pick from when you feel like tidying.</p>
    ${
      noNotes.length + noSummary.length + noLinks.length + missing.length + noWhy.length + open.length === 0
        ? '<p class="empty">Nothing loose. Everything has notes, links and reasons.</p>'
        : ''
    }
    ${section('Topics with no notes yet', 'They have a title and maybe a formula, but nothing written.', noNotes.length, rows(noNotes, entryLink))}
    ${section('Topics with no one-line summary', 'The summary is what shows in lists, peeks and the text you copy for an AI.', noSummary.length, rows(noSummary, entryLink))}
    ${section('Topics connected to nothing', 'They sit outside the lattice until you link them to something.', noLinks.length, rows(noLinks, entryLink))}
    ${section(
      'Links pointing at topics that don’t exist',
      'Written as [[something]] in your notes. Click to create the topic.',
      missing.length,
      rows(
        missing,
        (m) =>
          `<li>${icon('plus')}<a href="#/new?title=${enc(m.target)}">${esc(m.target)}</a><span class="muted"> — from ${m.from
            .slice(0, 3)
            .map((e) => `<a href="${entryHref(e.id)}">${esc(e.title)}</a>`)
            .join(', ')}${m.from.length > 3 ? ` and ${m.from.length - 3} more` : ''}</span></li>`,
      ),
    )}
    ${section(
      'Connections with no reason written',
      'The one line that says why a connection is interesting — the thing that makes wandering worth it.',
      noWhy.length,
      rows(noWhy, (l) => {
        const from = store.entry(l.from);
        const to = store.entry(l.to);
        return from && to
          ? `<li><a href="${entryHref(from.id)}">${esc(from.title)}</a> <span class="muted">${esc(LINK_KINDS[l.kind].label)}</span> <a href="${entryHref(to.id)}">${esc(to.title)}</a></li>`
          : '';
      }),
    )}
    ${section(
      'Questions still open',
      'Copy them into an AI from the Questions page, then tick them off.',
      open.length,
      `${rows(open.slice(0, 12), (q) => {
        const e = q.entry && store.entry(q.entry);
        return `<li>${icon('question')}<span>${esc(q.text)}</span>${e ? `<span class="muted"> — <a href="${entryHref(e.id)}">${esc(e.title)}</a></span>` : ''}</li>`;
      })}<p><a class="btn btn-sm" href="#/questions">Open the Questions page</a></p>`,
    )}
  </div>`;
}

// ------------------------------------------------------------------ timeline

// The library in order of when things happened, so you can wander by era instead of by link.
function viewTimeline({ params }) {
  const area = params.get('area') || '';
  const dated = store.entries
    .filter((e) => e.year != null && (!area || (e.area || 'none') === area))
    .sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
  const areas = [...store.areas, { id: 'none', name: 'Unfiled' }].filter((a) =>
    store.entries.some((e) => e.year != null && (e.area || 'none') === a.id),
  );
  const undated = store.entries.filter((e) => e.year == null && e.type !== 'note').length;

  // Everything before 1800 is thin, so it shares one band; after that, decade by decade.
  const bandOf = (year) => (year < 1800 ? 'Before 1800' : `${Math.floor(year / 10) * 10}s`);
  const bands = new Map();
  for (const e of dated) {
    const key = bandOf(e.year);
    if (!bands.has(key)) bands.set(key, []);
    bands.get(key).push(e);
  }

  viewEl.innerHTML = `
  <div class="page timeline-page">
    <div class="page-head">
      <h1><a class="page-back" href="#/library">Library</a> Timeline</h1>
      <div class="seg">
        <a href="#/timeline" class="${area ? '' : 'on'}">All</a>
        ${areas.map((a) => `<a href="#/timeline?area=${enc(a.id)}" class="${area === a.id ? 'on' : ''}">${esc(a.name)}</a>`).join('')}
      </div>
    </div>
    <p class="muted page-intro">${dated.length} topics with a date on them, oldest first. ${undated} more have no year — add one in the editor and they'll show up here.</p>
    <div class="timeline">
      ${[...bands.entries()]
        .map(
          ([band, list]) => `
        <section class="tl-band">
          <h2 class="tl-band-label">${esc(band)}</h2>
          <ul class="tl-items">
            ${list
              .map(
                (e) => `
              <li class="tl-item" style="--c:${colorOf(e)}">
                <span class="tl-year">${e.year < 0 ? `${-e.year} BCE` : e.year}</span>
                <a class="tl-card" href="${entryHref(e.id)}">
                  <span class="tl-title">${typeIcon(e.type)}${esc(e.title)}${stuckMark(e.id)}</span>
                  ${e.summary ? `<span class="tl-summary">${renderInline(e.summary, resolve, { linkify: false })}</span>` : ''}
                  <span class="tl-area">${esc(store.area(e.area)?.name || 'Unfiled')}</span>
                </a>
              </li>`,
              )
              .join('')}
          </ul>
        </section>`,
        )
        .join('') || '<p class="empty">No dated topics here yet.</p>'}
    </div>
  </div>`;
}

// ------------------------------------------------------------------ compare two topics

// Two topics side by side. Comparing two cases is what makes the shared idea visible
// (analogical encoding), so you're asked what's the same before being shown.
function viewCompare({ params }) {
  const a = store.entry(params.get('a'));
  const b = store.entry(params.get('b'));
  const hashFor = (x, y) => `#/compare${x || y ? `?${[x ? `a=${enc(x)}` : '', y ? `b=${enc(y)}` : ''].filter(Boolean).join('&')}` : ''}`;

  const picker = (side, chosen) =>
    chosen
      ? `<div class="picker-selected" style="--c:${colorOf(chosen)}">${typeIcon(chosen.type)}<span class="t">${esc(chosen.title)}</span>
           <button type="button" class="icon-btn" data-clear="${side}" title="Change" aria-label="Change" style="width:26px;height:26px">${icon('close')}</button></div>`
      : `<div class="search-box">${icon('search')}<input class="input" data-q="${side}" placeholder="Pick a topic…" autocomplete="off" aria-label="Topic ${side === 'a' ? 'one' : 'two'}"></div>
         <div class="picker-results" data-results="${side}"></div>`;

  const column = (e) => `
    <article class="compare-col" style="--c:${colorOf(e)}">
      <p class="compare-meta">${typeIcon(e.type)} ${esc(TYPES[e.type].label)} · ${esc(store.area(e.area)?.name || 'Unfiled')}</p>
      <h2><a href="${entryHref(e.id)}">${esc(e.title)}</a></h2>
      ${e.summary ? `<p class="compare-summary">${renderInline(e.summary, resolve, { linkify: false })}</p>` : ''}
      ${e.latex ? `<div class="compare-tex">${renderTex(e.latex, true)}</div>` : ''}
      ${
        e.variables.length
          ? `<table class="symbols">${e.variables
              .slice(0, 6)
              .map((v) => `<tr><td>${v.symbol ? renderTex(v.symbol) : ''}</td><td>${renderInline(v.meaning, resolve, { linkify: false })}</td></tr>`)
              .join('')}</table>`
          : ''
      }
    </article>`;

  function sharedHtml() {
    const na = new Map(store.connections(a.id).map((c) => [c.other, c]));
    const nb = new Map(store.connections(b.id).map((c) => [c.other, c]));
    const shared = [...na.keys()].filter((id) => nb.has(id) && id !== a.id && id !== b.id).map((id) => store.entry(id)).filter(Boolean);
    const direct = store.connections(a.id).filter((c) => c.other === b.id);
    const path = !direct.length ? store.pathsBetween(a.id, b.id, 1)[0] : null;
    const tags = a.tags.filter((t) => b.tags.some((u) => u.toLowerCase() === t.toLowerCase()));
    const parts = [];
    if (direct.length) {
      parts.push(`<div><h3>Linked directly</h3>${direct
        .map((c) => `<p><b>${esc(a.title)}</b> ${esc(c.label)} <b>${esc(b.title)}</b>${c.link.note ? ` — ${renderInline(c.link.note, resolve, { linkify: false })}` : ''}</p>`)
        .join('')}</div>`);
    }
    if (shared.length) {
      parts.push(`<div><h3>Both connect to</h3><ul class="compare-shared">${shared
        .map((x) => `<li style="--c:${colorOf(x)}">${typeIcon(x.type)}<a href="${entryHref(x.id)}">${esc(x.title)}</a></li>`)
        .join('')}</ul></div>`);
    }
    if (path) {
      parts.push(`<div><h3>How they meet</h3><p>${[a, ...path.map((s) => s.entry)].map((x) => `<a href="${entryHref(x.id)}">${esc(x.title)}</a>`).join(' → ')}</p></div>`);
    }
    if (tags.length) parts.push(`<div><h3>Shared tags</h3><p>${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join(' ')}</p></div>`);
    return parts.join('') || '<p class="muted">Nothing links them in the library yet — which makes whatever you wrote above the interesting part.</p>';
  }

  viewEl.innerHTML = `
  <div class="page compare-page">
    <div class="page-head"><h1>Compare</h1></div>
    <p class="muted page-intro">Put two topics side by side and look for what is the same underneath. That shared idea is the part that carries over to new problems.</p>
    <div class="card path-pickers">
      <div class="path-picker"><span class="label">One</span>${picker('a', a)}</div>
      <button type="button" class="icon-btn path-swap" data-act="swap" title="Swap" aria-label="Swap"${a && b ? '' : ' disabled'}>${icon('shuffle')}</button>
      <div class="path-picker"><span class="label">Two</span>${picker('b', b)}</div>
    </div>
    ${
      a && b
        ? `<div class="compare-cols">${column(a)}${column(b)}</div>
           <div class="card compare-ask">
             <label for="c-same"><b>What's the same underneath?</b> And what's the real difference?</label>
             <textarea id="c-same" class="textarea" rows="3" data-same placeholder="Both are about… but…"></textarea>
             <button type="button" class="btn btn-primary btn-sm" data-act="reveal-shared">Show what the library says</button>
             <div class="compare-shared-box" data-shared hidden></div>
           </div>`
        : `<p class="empty">${a || b ? 'Now pick the other one.' : 'Pick two topics above.'}</p>
           ${a && !b ? `<p class="muted">Good ones to try with ${esc(a.title)}: ${suggestComparisons(a)
               .map((x) => `<a href="${hashFor(a.id, x.id)}">${esc(x.title)}</a>`)
               .join(' · ')}</p>` : ''}`
    }
  </div>`;

  const root = viewEl.firstElementChild;
  for (const side of ['a', 'b']) {
    const input = $(`[data-q="${side}"]`, root);
    if (!input) continue;
    const out = $(`[data-results="${side}"]`, root);
    input.addEventListener('input', () => {
      const q = input.value.trim();
      out.innerHTML = q
        ? searchEntries(q)
            .filter((x) => x.id !== a?.id && x.id !== b?.id)
            .slice(0, 6)
            .map((x) => `<a class="palette-item" href="${hashFor(side === 'a' ? x.id : a?.id, side === 'b' ? x.id : b?.id)}" style="--c:${colorOf(x)}">${typeIcon(x.type)}<span class="t">${esc(x.title)}</span></a>`)
            .join('')
        : '';
    });
  }
  ($('[data-q="a"]', root) || $('[data-q="b"]', root))?.focus();

  root.addEventListener('click', (ev) => {
    const clear = ev.target.closest('[data-clear]')?.dataset.clear;
    if (clear) return go(hashFor(clear === 'a' ? null : a?.id, clear === 'b' ? null : b?.id));
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'swap' && a && b) go(hashFor(b.id, a.id));
    if (act === 'reveal-shared') {
      const box = $('[data-shared]', root);
      box.innerHTML = sharedHtml();
      box.hidden = false;
      const note = $('[data-same]', root).value.trim();
      record(a.id, 'compare', { other: b.id, note });
      ev.target.closest('[data-act]').remove();
    }
  });
}

// Worth comparing: things this topic is said to be "the same idea as" or "in tension with",
// then topics two steps away in other areas.
function suggestComparisons(entry) {
  const picks = new Map();
  for (const c of store.connections(entry.id)) {
    if (['same-idea', 'tension', 'related'].includes(c.link.kind)) picks.set(c.other, store.entry(c.other));
  }
  for (const s of surprisingConnections(entry, 3)) picks.set(s.entry.id, s.entry);
  return [...picks.values()].filter(Boolean).slice(0, 5);
}

// ------------------------------------------------------------------ mixed practice

// A short mixed session: five small tasks from different areas, one at a time.
// Mixing topics up (interleaving) and trying before seeing (retrieval) both beat rereading.
function viewPractice() {
  const tasks = buildSession(5);
  const results = [];
  let i = 0;

  viewEl.innerHTML = `
  <div class="page page-narrow practice-page">
    <div class="page-head"><h1>Mix it up</h1><span class="muted" data-progress></span></div>
    <p class="muted page-intro">Five quick ones from different corners of the library. Have a go before you look — getting it wrong first still helps the answer stick.</p>
    <div class="card task" data-task></div>
  </div>`;
  const root = viewEl.firstElementChild;
  const box = $('[data-task]', root);

  function drawTask() {
    if (!tasks.length) {
      box.innerHTML = '<p class="empty">Nothing to practise yet — add a few topics with summaries or formulas first.</p>';
      return;
    }
    if (i >= tasks.length) return drawEnd();
    $('[data-progress]', root).textContent = `${i + 1} of ${tasks.length}`;
    box.innerHTML = `${taskHtml(tasks[i])}
      <div class="task-actions"><button type="button" class="btn btn-primary" data-act="reveal">Show me</button></div>
      <div data-answer></div>`;
    $('[data-task-input]', box)?.focus();
  }

  function drawEnd() {
    $('[data-progress]', root).textContent = 'Done';
    const counts = { got: 0, partly: 0, missed: 0 };
    for (const r of results) counts[r.result] = (counts[r.result] || 0) + 1;
    const toRevisit = results.filter((r) => r.result !== 'got');
    box.innerHTML = `
      <h2>That's the five.</h2>
      <p>${counts.got} had it · ${counts.partly} partly · ${counts.missed} missed.</p>
      ${
        toRevisit.length
          ? `<p class="muted">Worth another look, now or in a few days:</p>
             <ul class="compare-shared">${toRevisit
               .map((r) => `<li style="--c:${colorOf(r.entry)}">${typeIcon(r.entry.type)}<a href="${entryHref(r.entry.id)}">${esc(r.entry.title)}</a></li>`)
               .join('')}</ul>`
          : '<p class="muted">All of them from memory. Come back to a different mix in a few days.</p>'
      }
      <div class="task-actions">
        <button type="button" class="btn btn-primary" data-act="again">Another five</button>
        <a class="btn btn-ghost" href="#/">Back to exploring</a>
      </div>`;
    record(null, 'session', { note: `${counts.got}/${results.length} had it` });
  }

  root.addEventListener('click', (ev) => {
    const act = ev.target.closest('[data-act]')?.dataset.act;
    if (act === 'reveal') {
      const attempt = $('[data-task-input]', box)?.value || '';
      $('[data-answer]', box).innerHTML = `${answerHtml(tasks[i], attempt)}${rateHtml()}`;
      ev.target.closest('[data-act]').remove();
      return;
    }
    if (act === 'again') return render();
    const rate = ev.target.closest('[data-rate]')?.dataset.rate;
    if (rate) {
      const t = tasks[i];
      results.push({ entry: t.entry, result: rate });
      record(t.entry.id, TASK_KIND[t.kind], { result: rate, what: t.kind, other: t.other?.id });
      i++;
      drawTask();
    }
  });
  root.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.matches('input[data-task-input]')) {
      ev.preventDefault();
      $('[data-act="reveal"]', box)?.click();
    }
  });
  drawTask();
}

// ------------------------------------------------------------------ settings

function viewSettings() {
  viewEl.innerHTML = `
  <div class="page page-narrow">
    <div class="page-head"><h1>Settings</h1></div>
    <div class="settings-grid">
      <section>
        <div class="section-head"><h2>Areas</h2><button type="button" class="btn btn-sm" data-act="new-area">${icon('plus')} New area</button></div>
        <div data-areas></div>
      </section>

      <section>
        <div class="section-head"><h2>Your data</h2></div>
        <p class="muted" style="margin:0 0 16px;max-width:62ch">
          Everything lives in <code>data/lattice.json</code> inside the app folder — plain JSON you can read, copy or put in git.
          A copy goes to <code>data/backups/</code> once a day (the last 30 are kept), and again before every import.
        </p>
        <div class="data-actions">
          <a class="btn" href="/api/export" download>Export everything (JSON)</a>
          <label class="btn">Import from JSON…<input type="file" accept=".json,application/json" hidden data-import></label>
        </div>
      </section>

      <section>
        <div class="section-head"><h2>Reading</h2></div>
        <label class="toggle-row">
          <input type="checkbox" data-highlights${highlightsEnabled() ? ' checked' : ''}>
          <span>
            <b>Highlight topics in the text</b>
            <small>Mentions of other entries are marked as you read. Basics a topic builds on get a marker-pen highlight; hover or tap to peek.</small>
          </span>
        </label>
        <p class="muted" style="margin:14px 0 0;font-size:14px">
          Your trail (the topics you followed) is kept in this browser only.
          <button type="button" class="btn btn-sm btn-ghost" data-act="clear-trail">Clear trail</button>
        </p>
      </section>

      <section>
        <div class="section-head"><h2>Keyboard</h2></div>
        <table class="symbols" style="max-width:460px;margin:0">
          <tbody>
            ${[
              ['/ or Ctrl K', 'Search and jump anywhere'],
              ['n', 'New entry'],
              ['e', 'Edit the entry you’re viewing'],
              ['h · l · g', 'Home · Library · Graph'],
              ['r', 'Random entry'],
              ['Ctrl Enter', 'Save while editing'],
              ['Esc', 'Close a dialog / cancel editing'],
            ]
              .map(([k, d]) => `<tr><td>${k.split(' ').map((p) => (/^(or|·)$/.test(p) ? `<span class="muted">${p}</span>` : `<kbd>${esc(p)}</kbd>`)).join(' ')}</td><td>${esc(d)}</td></tr>`)
              .join('')}
          </tbody>
        </table>
      </section>
    </div>
  </div>`;

  const root = viewEl.firstElementChild;
  const box = $('[data-areas]', root);

  function drawAreas() {
    box.innerHTML = store.areas.length
      ? store.areas
          .map((a) => {
            const n = store.entries.filter((e) => e.area === a.id).length;
            return `
            <form class="card area-edit" data-id="${esc(a.id)}" style="--c:${esc(a.color)}">
              <div class="swatches">${swatchesHtml(a.color)}</div>
              <div class="fields">
                <input class="input" name="name" value="${esc(a.name)}" aria-label="Area name" style="font-weight:500">
                <input class="input" name="description" value="${esc(a.description)}" placeholder="Description (optional)" aria-label="Description">
                <input type="hidden" name="color" value="${esc(a.color)}">
                <span class="muted" style="font-size:12.5px">${n} ${n === 1 ? 'entry' : 'entries'}</span>
              </div>
              <div class="row-actions">
                <button type="submit" class="btn btn-sm" data-save disabled>Save</button>
                <button type="button" class="icon-btn" data-delete title="Delete area" aria-label="Delete area ${esc(a.name)}">${icon('trash')}</button>
              </div>
            </form>`;
          })
          .join('')
      : '<p class="empty">No areas yet.</p>';

    for (const form of $$('form.area-edit', box)) {
      const a = store.area(form.dataset.id);
      const saveBtn = $('[data-save]', form);
      const dirty = () => {
        saveBtn.disabled = form.name.value.trim() === a.name && form.description.value.trim() === a.description && form.color.value === a.color;
      };
      bindSwatches($('.swatches', form), (c) => {
        form.color.value = c;
        dirty();
      });
      form.addEventListener('input', dirty);
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        try {
          await store.updateArea(a.id, { name: form.name.value, description: form.description.value, color: form.color.value });
          toast('Area saved');
          drawAreas();
        } catch (err) {
          fail(err);
        }
      });
      $('[data-delete]', form).addEventListener('click', async () => {
        const n = store.entries.filter((e) => e.area === a.id).length;
        const ok = await confirmDialog({
          title: `Delete “${a.name}”?`,
          message: n ? `Its ${n} ${n === 1 ? 'entry stays' : 'entries stay'} in your library, just unfiled.` : 'It has no entries.',
          confirm: 'Delete area',
          danger: true,
        });
        if (!ok) return;
        try {
          await store.deleteArea(a.id);
          toast('Area deleted');
          drawAreas();
        } catch (err) {
          fail(err);
        }
      });
    }
  }

  root.addEventListener('click', async (ev) => {
    if (ev.target.closest('[data-act="new-area"]') && (await areaDialog())) drawAreas();
  });

  $('[data-import]', root).addEventListener('change', async (ev) => {
    const file = ev.target.files[0];
    ev.target.value = '';
    if (!file) return;
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch {
      return toast('That file isn’t valid JSON.', { error: true });
    }
    const n = Array.isArray(data?.entries) ? data.entries.length : 0;
    const ok = await confirmDialog({
      title: 'Replace everything?',
      message: `This replaces all current data with “${file.name}” (${n} entries). Your current data is backed up to data/backups first.`,
      confirm: 'Import',
      danger: true,
    });
    if (!ok) return;
    try {
      const result = await store.importAll(data);
      toast(`Imported ${result.entries} entries, ${result.links} links, ${result.areas} areas`);
      refresh();
    } catch (err) {
      fail(err);
    }
  });

  $('[data-highlights]', root).addEventListener('change', (ev) => {
    writePref('lattice.highlights', ev.target.checked ? 'on' : 'off');
    toast(ev.target.checked ? 'Highlights on' : 'Highlights off');
  });
  root.addEventListener('click', (ev) => {
    if (!ev.target.closest('[data-act="clear-trail"]')) return;
    clearTrail();
    toast('Trail cleared');
  });

  drawAreas();
}

// ------------------------------------------------------------------ command palette

// Press q anywhere: jot a question about whatever you are reading, without leaving the page.
function quickQuestion() {
  if ($('dialog.quick-q')) return;
  const entry = topicInView();
  const dlg = openDialog(
    `
    <form class="quick-q-form">
      <p class="eyebrow">${entry ? `Question about ${esc(entry.title)}` : 'Question'}</p>
      <input name="text" placeholder="What don't you get?" autocomplete="off" aria-label="Your question">
      <div class="quick-q-foot">
        <span class="muted">${entry ? 'Saved with this topic' : 'Not about a particular topic'} · <kbd>Esc</kbd> to close</span>
        <button type="submit" class="btn btn-primary btn-sm">${icon('plus')} Add</button>
      </div>
    </form>`,
    'quick-q',
  );
  const input = $('input', dlg);
  input.focus();
  $('form', dlg).addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (!text) return dlg.close();
    dlg.close();
    try {
      await store.createQuestion({ entry: entry?.id || null, text });
      drawQuestionCount();
      toast(entry ? `Noted with ${entry.title}.` : 'Question noted.', { action: 'See all', onAction: () => go('#/questions') });
      if (/^#\/(entry|\?t=)/.test(location.hash) || location.hash.startsWith('#/?t=')) refresh();
    } catch (err) {
      fail(err);
    }
  });
}

// Earlier versions of an entry, with a way to put one back. Restoring is itself undoable,
// because the version it replaces is kept too.
async function showHistory(entry) {
  let versions = [];
  try {
    ({ versions } = await store.entryHistory(entry.id));
  } catch (err) {
    return fail(err);
  }
  const now = entry.body.length;
  const dlg = openDialog(
    `
    <div class="dialog-body">
    <h2>History of “${esc(entry.title)}”</h2>
    <p class="muted" style="margin:0 0 14px;font-size:13.5px">
      ${versions.length ? 'Earlier versions, newest first. Putting one back can be undone the same way.' : 'No earlier versions yet — they are kept from the next edit onwards.'}
    </p>
    <ul class="version-list">
      <li class="version now">
        <span class="version-when">Now</span>
        <span class="version-what">${esc(entry.title)} · ${now} characters of notes · ${esc(STATUSES[entry.status].label)}</span>
      </li>
      ${versions
        .map(
          (v) => `
        <li class="version">
          <span class="version-when">${esc(ago(v.at))}</span>
          <span class="version-what">${esc(v.title)} · ${v.bodyLength} characters${
            v.bodyLength === now ? '' : ` (${v.bodyLength > now ? '+' : '−'}${Math.abs(v.bodyLength - now)} vs now)`
          } · ${esc(STATUSES[v.status]?.label || v.status)}</span>
          <button type="button" class="btn btn-sm" data-restore="${v.index}">Put this back</button>
        </li>`,
        )
        .join('')}
    </ul>
    </div>
    <div class="dialog-foot"><button type="button" class="btn" data-close>Close</button></div>`,
    'history-dialog',
  );
  dlg.addEventListener('click', async (ev) => {
    if (ev.target.closest('[data-close]')) return dlg.close();
    const index = ev.target.closest('[data-restore]')?.dataset.restore;
    if (index === undefined) return;
    try {
      await store.restoreEntry(entry.id, Number(index));
      dlg.close();
      toast('Put that version back.', { action: 'Undo', onAction: () => showHistory(store.entry(entry.id)) });
      refresh();
    } catch (err) {
      fail(err);
    }
  });
}

function openPalette() {
  if ($('dialog.palette')) return;
  const dlg = openDialog(
    `
    <div class="palette-input">${icon('search')}<input placeholder="Search entries or jump somewhere…" aria-label="Search" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div>
    <div class="palette-list" role="listbox"></div>
    <div class="palette-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span></div>`,
    'palette',
  );
  const input = $('input', dlg);
  const list = $('.palette-list', dlg);
  const commands = [
    { label: 'New entry', icon: 'plus', run: () => go('#/new') },
    { label: 'New question', icon: 'question', run: () => go('#/new?type=question') },
    { label: 'Home', icon: 'home', run: () => go('#/') },
    { label: 'Library', icon: 'library', run: () => go('#/library') },
    { label: 'Graph', icon: 'graph', run: () => go('#/graph') },
    ...(store.route ? [{ label: 'Main path — continue learning', icon: 'route', run: () => go('#/learn') }] : []),
    { label: 'Your questions — copy them for an AI', icon: 'question', run: () => go('#/questions') },
    { label: 'How are two topics connected?', icon: 'link', run: () => go('#/path') },
    { label: 'Equation sheet — every formula in one place', icon: 'sliders', run: () => go('#/sheet') },
    { label: 'Loose ends — what is half-finished', icon: 'check', run: () => go('#/loose') },
    { label: 'Timeline — when each idea turned up', icon: 'spark', run: () => go('#/timeline') },
    { label: 'Mix it up — five quick ones from different areas', icon: 'dice', run: () => go('#/practice') },
    { label: 'Compare two topics side by side', icon: 'graph', run: () => go('#/compare') },
    { label: 'Wander to a random entry', icon: 'dice', run: randomEntry },
    { label: 'Settings, areas & data', icon: 'settings', run: () => go('#/settings') },
  ];
  let items = [];
  let idx = 0;

  const itemHtml = (i, iconHtml, label, sub = '', color = '') =>
    `<button type="button" class="palette-item${i === idx ? ' on' : ''}" data-i="${i}"${color ? ` style="--c:${color}"` : ''}>${iconHtml}<span class="t">${label}</span><span class="sub">${sub}</span></button>`;

  function draw() {
    const q = input.value.trim();
    const sum = q.startsWith('=') ? quickCalc(q) : null;
    const entries = q && !sum ? searchEntries(q).slice(0, 10) : sum ? [] : [...store.entries].sort(byUpdated).slice(0, 6);
    const cmds = commands.filter((c) => !q || c.label.toLowerCase().includes(q.toLowerCase()));
    items = [];
    let html = '';
    if (sum) {
      const answer = sum.error ? '' : `${sum.text}${sum.unit ? ` ${sum.unit}` : ''}`;
      items.push(() => answer && copyText(answer));
      html += `<div class="palette-group">Maths</div>${itemHtml(
        0,
        icon('sliders', 'cmd-icon'),
        sum.error ? esc(sum.error) : `<span class="sum">${esc(answer)}</span>`,
        sum.error ? esc(sum.src) : 'Enter to copy',
      )}`;
    }
    if (entries.length) {
      html += `<div class="palette-group">${q ? 'Entries' : 'Recent'}</div>`;
      for (const e of entries) {
        items.push(() => go(entryHref(e.id)));
        const where = snippetFor(e, q);
        html += itemHtml(
          items.length - 1,
          typeIcon(e.type),
          `${esc(e.title)}${where ? `<span class="hit">${where}</span>` : ''}`,
          esc(store.area(e.area)?.name || TYPES[e.type].label),
          colorOf(e),
        );
      }
    }
    if (q && !sum && !store.resolve(q)) {
      items.push(() => go(`#/new?title=${enc(q)}`));
      html += `<div class="palette-group">Create</div>${itemHtml(items.length - 1, icon('plus', 'cmd-icon'), `Create “${esc(q)}”`, 'new entry')}`;
    }
    if (cmds.length) {
      html += '<div class="palette-group">Go to</div>';
      for (const c of cmds) {
        items.push(c.run);
        html += itemHtml(items.length - 1, icon(c.icon, 'cmd-icon'), esc(c.label));
      }
    }
    idx = Math.max(0, Math.min(idx, items.length - 1));
    list.innerHTML = html || '<p class="empty" style="padding:14px 12px;margin:0">Nothing found.</p>';
    list.querySelector('.on')?.scrollIntoView({ block: 'nearest' });
  }

  const run = (i) => {
    const fn = items[i];
    if (!fn) return;
    dlg.close();
    fn();
  };
  input.addEventListener('input', () => {
    idx = 0;
    draw();
  });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      idx = (idx + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(1, items.length);
      draw();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      run(idx);
    }
  });
  list.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-i]');
    if (b) run(Number(b.dataset.i));
  });
  draw();
  input.focus();
}

// ------------------------------------------------------------------ global wiring

function toggleTheme() {
  const html = document.documentElement;
  const dark = html.dataset.theme ? html.dataset.theme === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches;
  html.dataset.theme = dark ? 'light' : 'dark';
  try {
    localStorage.setItem('lattice.theme', html.dataset.theme);
  } catch {}
}

document.addEventListener('click', (ev) => {
  const act = ev.target.closest('[data-action]')?.dataset.action;
  if (act === 'palette') openPalette();
  if (act === 'theme') toggleTheme();
});

// Copy buttons on code blocks (rendered in render.js).
document.addEventListener('click', async (ev) => {
  const button = ev.target.closest('.code-copy');
  const code = button?.closest('.code-wrap')?.querySelector('pre code');
  if (!code) return;
  const ok = await copyText(code.textContent);
  button.textContent = ok ? 'Copied' : 'Copy failed';
  setTimeout(() => (button.textContent = 'Copy'), 1400);
});

document.addEventListener('keydown', (ev) => {
  if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
    ev.preventDefault();
    openPalette();
    return;
  }
  if (document.querySelector('dialog[open]')) return;
  if (ev.ctrlKey || ev.metaKey || ev.altKey || ev.target.closest?.('input, textarea, select, [contenteditable]')) return;
  const { path } = currentRoute();
  const keys = {
    '/': () => {
      const box = document.querySelector('[data-explore]');
      if (!box) return openPalette();
      box.focus();
      box.select();
    },
    n: () => go('#/new'),
    q: quickQuestion,
    h: () => go('#/'),
    l: () => go('#/library'),
    g: () => go('#/graph'),
    p: () => store.route && go('#/learn'),
    r: randomEntry,
    e: () => {
      const m = path.match(/^\/entry\/(.+)$/);
      if (m) go(`#/edit/${m[1]}`);
    },
  };
  if (keys[ev.key]) {
    ev.preventDefault();
    keys[ev.key]();
  }
});

window.addEventListener('beforeunload', (ev) => {
  if (guard?.()) {
    ev.preventDefault();
    ev.returnValue = '';
  }
});

async function boot() {
  try {
    await store.load();
  } catch (err) {
    viewEl.innerHTML = `
      <div class="boot">
        <p>Can’t reach the ${esc(document.title || 'Lattice')} server.</p>
        <p class="muted">Start it from its folder with <code>npm start</code>, then reload this page.</p>
        <p class="muted" style="font-size:13px">${esc(err.message)}</p>
      </div>`;
    return;
  }
  initPeek({ onError: fail, beforeSolid: solidCheck });
  const pathTab = $('[data-route-nav]');
  if (pathTab) pathTab.hidden = !store.route;
  window.addEventListener('hashchange', onHashChange);
  render();
}

boot();
