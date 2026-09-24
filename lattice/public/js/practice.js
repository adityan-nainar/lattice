// Ways to practise instead of rereading, from the learning research: guess before you see,
// recall before you look, explain in your own words, compare, mix topics up, come back later.
// Nothing here is a quiz or a schedule. Each tool is something you switch on while reading.

import { formatNumber, parseAmount, runCalc } from './calc.js';
import { escapeHtml as esc, renderInline, renderTex } from './render.js';
import { store } from './store.js';
import { icon } from './ui.js';

const resolve = (t) => store.resolve(t);
const DAY = 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------- shared bits

// "Had it / Partly / Missed" — your own judgement after seeing the answer.
export const rateHtml = (attrs = '') => `
  <span class="rate" ${attrs}>
    <span class="rate-label">How did you do?</span>
    <button type="button" data-rate="got">Had it</button>
    <button type="button" data-rate="partly">Partly</button>
    <button type="button" data-rate="missed">Missed it</button>
  </span>`;

export const RATE_WORDS = { got: 'had it', partly: 'partly', missed: 'missed it' };

export function record(entry, kind, extra = {}) {
  return store.recordEvent({ entry, kind, ...extra });
}

// Numbers as people type them: 1.2e-8, 1.2×10^-8, 3,000, ₹12 lakh, 1.5cr.
export const parseGuess = parseAmount;

// How close a guess was, in words. Physics guesses are about orders of magnitude.
export function guessVerdict(guess, actual) {
  if (!Number.isFinite(guess) || !Number.isFinite(actual)) return { level: 'none', text: '' };
  if (actual === 0) return guess === 0 ? { level: 'close', text: 'Spot on.' } : { level: 'far', text: 'The answer is zero.' };
  if (Math.sign(guess) !== Math.sign(actual)) return { level: 'far', text: 'Wrong sign.' };
  const ratio = Math.abs(guess / actual);
  const factor = ratio >= 1 ? ratio : 1 / ratio;
  const way = ratio >= 1 ? 'too big' : 'too small';
  if (factor <= 1.1) return { level: 'close', text: 'Within 10% — spot on.' };
  if (factor <= 2) return { level: 'close', text: `Close: ${way} by ${factor.toFixed(1)}×.` };
  if (factor < 10) return { level: 'order', text: `Right order of magnitude, ${way} by ${factor.toFixed(1)}×.` };
  const orders = Math.log10(factor);
  return { level: 'far', text: `Off by ${orders < 1.95 ? `about ${Math.round(factor)}×` : `${orders.toFixed(1)} orders of magnitude`} (${way}).` };
}

const daysSince = (iso) => (iso ? Math.floor((Date.now() - Date.parse(iso)) / DAY) : null);
// "today", "yesterday", "3 weeks ago"
export const agoWords = (iso) => {
  const d = daysSince(iso);
  if (d === null) return '';
  if (d === 0) return 'today';
  if (d === 1) return 'yesterday';
  return `${sinceWords(iso)} ago`;
};

export const sinceWords = (iso) => {
  const d = daysSince(iso);
  if (d === null) return '';
  if (d < 14) return `${d} days`;
  if (d < 60) return `${Math.round(d / 7)} weeks`;
  return `${Math.round(d / 30)} months`;
};

// ---------------------------------------------------------------- explain it back

export function explanationsHtml(entry, { writing = false } = {}) {
  const mine = store.explanationsFor(entry.id);
  return `
    <section class="explain" data-explain>
      ${
        writing
          ? `<div class="card explain-write">
              <p class="explain-prompt"><b>Explain ${esc(entry.title)}</b> as if to a friend who hasn't met it. What is it, why does it matter, how does it connect to what they already know? The notes are hidden while you write.</p>
              <textarea class="textarea" rows="6" data-explain-text placeholder="In my own words…"></textarea>
              <div class="explain-actions">
                <button type="button" class="btn btn-primary btn-sm" data-explain-save>Save and show the notes</button>
                <button type="button" class="btn btn-sm btn-ghost" data-explain-cancel>Not now</button>
              </div>
            </div>`
          : ''
      }
      ${
        mine.length
          ? `<div class="explain-mine">
              <p class="eyebrow">In your own words · ${esc(agoWords(mine[0].created))}</p>
              <div class="explain-text">${renderInline(mine[0].text, resolve)}</div>
              ${
                mine.length > 1
                  ? `<details class="explain-older"><summary>${mine.length - 1} earlier version${mine.length === 2 ? '' : 's'}</summary>${mine
                      .slice(1)
                      .map((x) => `<div class="explain-old"><span class="muted">${esc(agoWords(x.created))}</span><div>${renderInline(x.text, resolve)}</div></div>`)
                      .join('')}</details>`
                  : ''
              }
            </div>`
          : ''
      }
    </section>`;
}

// ---------------------------------------------------------------- cover the formula

export function coverFormula(root, entry, { onDone } = {}) {
  const section = root.querySelector('.formula');
  const tex = section?.querySelector('.tex');
  if (!tex || section.classList.contains('covered')) return;
  section.classList.add('covered');
  const veil = document.createElement('div');
  veil.className = 'cover-veil';
  veil.innerHTML = `<p>Write it or say it out loud from memory — the symbols below are your clue.</p>
    <button type="button" class="btn btn-sm btn-primary" data-uncover>Reveal</button>`;
  tex.after(veil);
  veil.querySelector('[data-uncover]').addEventListener('click', () => {
    section.classList.remove('covered');
    veil.innerHTML = rateHtml();
    veil.classList.add('rating');
    veil.addEventListener(
      'click',
      (ev) => {
        const r = ev.target.closest('[data-rate]')?.dataset.rate;
        if (!r) return;
        record(entry.id, 'recall', { what: 'formula', result: r });
        veil.remove();
        onDone?.(r);
      },
    );
  });
}

// ---------------------------------------------------------------- fill the gaps

const SKIP = 'a, code, pre, .katex, .katex-display, h1, h2, h3, h4, h5, h6, .gap, .term';
const NUMBER_WITH_UNIT = /(?<![\w.])(\d+(?:[.,]\d+)?(?:\s?[×x]\s?10\^?[−-]?\d+)?)\s?(μs|ms|ns|nK|μK|mK|K|km|mm|cm|nm|μm|m\/s|m|kg|g|eV|keV|MeV|GeV|TeV|J|W|Hz|kHz|MHz|GHz|s|%|dimensions|years)(?![\w])/;

// Blanks out a few things in the notes — bold terms and numbers with units — for you to fill in.
export function makeGaps(prose, max = 3) {
  const candidates = [];
  for (const b of prose.querySelectorAll('strong')) {
    if (b.closest(SKIP)) continue;
    const text = b.textContent.trim();
    if (text.length >= 3 && text.length <= 40 && !/[:$]/.test(text)) candidates.push({ node: b, text, kind: 'term' });
  }
  const walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const m = n.nodeValue.match(NUMBER_WITH_UNIT);
    if (m) candidates.push({ node: n, text: m[0], match: m, kind: 'number' });
  }
  if (!candidates.length) return [];
  // spread the picks through the notes rather than bunching them at the top
  const picks = [];
  const step = candidates.length / Math.min(max, candidates.length);
  for (let i = 0; i < Math.min(max, candidates.length); i++) picks.push(candidates[Math.floor(i * step + step / 2)]);

  return picks.map((p, i) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'gap';
    input.dataset.answer = p.text;
    input.dataset.kind = p.kind;
    input.setAttribute('aria-label', `Gap ${i + 1}`);
    input.style.width = `${Math.max(4, Math.min(28, p.text.length + 2))}ch`;
    if (p.kind === 'term') {
      p.node.replaceWith(input);
    } else {
      const node = p.node;
      const at = p.match.index;
      const after = node.splitText(at);
      after.nodeValue = after.nodeValue.slice(p.text.length);
      node.after(input);
    }
    return input;
  });
}

const normal = (s) => String(s).toLowerCase().replace(/[\s\-–—.,']/g, '');
export function checkGap(input) {
  const answer = input.dataset.answer;
  const given = input.value.trim();
  if (!given) return false;
  if (input.dataset.kind === 'number') {
    const a = parseGuess(answer.match(/[\d.,]+(?:\s?[×x]\s?10\^?[−-]?\d+)?/)?.[0]);
    const g = parseGuess(given.match(/[\d.,]+(?:[eE][−-]?\d+|\s?[×x]\s?10\^?[−-]?\d+)?/)?.[0]);
    return a != null && g != null && Math.abs(g - a) <= Math.abs(a) * 0.05;
  }
  return normal(given) === normal(answer) || (normal(answer).length > 6 && normal(answer).startsWith(normal(given)) && normal(given).length >= normal(answer).length - 2);
}

// ---------------------------------------------------------------- fade the steps (worked examples)

export const stepBlocks = (prose) => [...prose.children].filter((el) => !/^(H[1-6]|HR)$/.test(el.tagName));

export function fadeSteps(prose, count) {
  const blocks = stepBlocks(prose);
  blocks.forEach((el, i) => {
    const hide = i >= blocks.length - count;
    el.classList.toggle('faded', hide);
    const existing = el.previousElementSibling?.classList.contains('fade-cover') ? el.previousElementSibling : null;
    if (hide && !existing) {
      const cover = document.createElement('div');
      cover.className = 'fade-cover';
      cover.innerHTML = `<span>Step ${i + 1} — work it out first, then</span> <button type="button" class="btn btn-sm" data-unfade>reveal</button>`;
      el.before(cover);
    } else if (!hide && existing) {
      existing.remove();
    }
  });
  return blocks.length;
}

// ---------------------------------------------------------------- guess the reasons (connections)

export const whyGuessHtml = () =>
  `<span class="why-guess" data-why-guess>Why would that be? <b>Think, then tap</b></span>`;

// ---------------------------------------------------------------- mixed practice session

// Five small tasks from different areas, preferring topics you've actually opened.
export function buildSession(size = 5) {
  const visits = store.study.visits;
  const usable = store.entries.filter(
    (e) => e.type !== 'note' && (e.type !== 'example' || e.calc) && (e.latex || e.calc || e.summary),
  );
  const score = (e) => {
    const v = visits[e.id];
    const since = v ? daysSince(v.last) : null;
    return (v ? 3 : 0) + (since !== null && since >= 3 ? Math.min(3, since / 7) : 0) + (e.status === 'solid' ? -1 : 0) + Math.random() * 2.5;
  };
  const ranked = usable.map((e) => [score(e), e]).sort((a, b) => b[0] - a[0]).map(([, e]) => e);
  const picked = [];
  const areasUsed = new Map();
  for (const e of ranked) {
    const a = e.area || 'none';
    if ((areasUsed.get(a) || 0) >= 2) continue; // mix areas up
    picked.push(e);
    areasUsed.set(a, (areasUsed.get(a) || 0) + 1);
    if (picked.length >= size) break;
  }
  // give each task the least-used kind this topic allows, so a session mixes guesses,
  // formulas, reasons and explanations rather than five of the same
  const used = { guess: 0, formula: 0, why: 0, explain: 0 };
  return picked.map((e) => {
    const task = taskFor(e, used);
    used[task.kind]++;
    return task;
  });
}

function taskFor(entry, used) {
  const kinds = [];
  if (entry.calc?.outputs?.length) kinds.push('guess');
  if (entry.latex) kinds.push('formula');
  const withWhy = store.connections(entry.id).filter((c) => c.link.note && store.entry(c.other));
  if (withWhy.length) kinds.push('why');
  kinds.push('explain');
  const kind = kinds
    .map((k) => [used[k] + (k === 'explain' ? 0.5 : 0) + Math.random() * 0.4, k])
    .sort((a, b) => a[0] - b[0])[0][1];
  if (kind === 'guess') {
    const n = Math.floor(Math.random() * entry.calc.outputs.length);
    const result = runCalc(entry.calc)[n];
    return { entry, kind, output: entry.calc.outputs[n], actual: result?.value, inputs: entry.calc.inputs };
  }
  if (kind === 'why') {
    const c = withWhy[Math.floor(Math.random() * withWhy.length)];
    return { entry, kind, other: store.entry(c.other), connection: c };
  }
  return { entry, kind };
}

export function taskHtml(task) {
  const e = task.entry;
  const head = `<p class="task-topic">${esc(store.area(e.area)?.name || 'Unfiled')}</p>`;
  if (task.kind === 'guess') {
    const settings = task.inputs.map((i) => `${esc(i.label)} = ${esc(formatNumber(i.value, { digits: 4 }).text)}${i.unit ? ` ${esc(i.unit)}` : ''}`).join(' · ');
    return `${head}<h2>${esc(e.title)}</h2>
      <p class="task-ask">Guess: <b>${esc(task.output.label)}</b>${task.output.unit ? ` (in ${esc(task.output.unit)})` : ''}</p>
      <p class="muted">${settings}</p>
      <input class="input task-input" data-task-input placeholder="Your guess, e.g. 3e-8" inputmode="decimal">`;
  }
  if (task.kind === 'formula') {
    return `${head}<h2>${esc(e.title)}</h2>
      ${e.summary ? `<p class="task-context">${renderInline(e.summary, resolve, { linkify: false })}</p>` : ''}
      <p class="task-ask">Write down (or say) the main formula.</p>
      <textarea class="textarea task-input" rows="2" data-task-input placeholder="Your attempt — or just think it"></textarea>`;
  }
  if (task.kind === 'why') {
    return `${head}<h2>${esc(e.title)} <span class="muted">and</span> ${esc(task.other.title)}</h2>
      <p class="task-ask">They're linked (${esc(task.connection.label)}). Why? What's the idea that joins them?</p>
      <textarea class="textarea task-input" rows="2" data-task-input placeholder="Your reason"></textarea>`;
  }
  return `${head}<h2>${esc(e.title)}</h2>
    <p class="task-ask">What is it, in one or two sentences of your own?</p>
    <textarea class="textarea task-input" rows="3" data-task-input placeholder="In my own words…"></textarea>`;
}

export function answerHtml(task, attempt) {
  const e = task.entry;
  if (task.kind === 'guess') {
    const f = formatNumber(task.actual, { unit: task.output.unit, prefix: task.output.prefix, digits: 3 });
    const v = guessVerdict(parseGuess(attempt), task.actual);
    return `<p class="task-answer">${esc(task.output.label)}: <b>${esc(f.text)}${f.unit ? ` ${esc(f.unit)}` : ''}</b></p>
      ${v.text ? `<p class="verdict verdict-${v.level}">${esc(v.text)}</p>` : ''}`;
  }
  if (task.kind === 'formula') return `<div class="task-answer">${renderTex(e.latex, true)}</div>`;
  if (task.kind === 'why') return `<p class="task-answer">${renderInline(task.connection.link.note, resolve, { linkify: false })}</p>`;
  return `<p class="task-answer">${renderInline(e.summary || '', resolve, { linkify: false })}</p>`;
}

export const TASK_KIND = { guess: 'guess', formula: 'recall', why: 'why', explain: 'recall' };

// ---------------------------------------------------------------- nudges

// "It's been a while": shown when you come back to a topic after two weeks or more.
export function comebackHtml(entry, previous) {
  const since = daysSince(previous);
  if (since === null || since < 14 || entry.status === 'curious') return '';
  const ask = entry.latex ? 'can you still write down its main formula' : 'can you still say what it is in a sentence';
  return `
    <div class="card comeback" data-comeback>
      <span>${icon('spark')} It's been ${esc(sinceWords(previous))} since you read this. Before you look — ${ask}?</span>
      <span class="comeback-actions">
        <button type="button" class="btn btn-sm btn-primary" data-practice="${entry.latex ? 'cover' : 'explain'}">Try it</button>
        <button type="button" class="btn btn-sm btn-ghost" data-comeback-close>Not now</button>
      </span>
    </div>`;
}

// "Opened seven times, nothing written" — the fluency trap, pointed out quietly.
export function fluencyHtml(entry) {
  const v = store.visitsOf(entry.id);
  if (!v || v.count < 6) return '';
  if (store.explanationsFor(entry.id).length || store.questionsFor(entry.id).length) return '';
  if (store.eventsFor(entry.id).length) return '';
  return `<p class="fluency">You've opened this ${v.count} times but haven't written or tried anything on it yet. Reading again feels like learning; <button type="button" class="link-btn" data-practice="explain">explaining it back</button> is what makes it stick.</p>`;
}
