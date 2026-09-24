// "Try it" calculators and "Watch" video lists.

import { formatNumber, groupIndian, isRupees, parseAmount, runCalc, shortRupees } from './calc.js';
import { thumbnailUrl } from './media.js';
import { guessVerdict, parseGuess, record } from './practice.js';
import { escapeHtml as esc, renderInline } from './render.js';

const SLIDER_STEPS = 1000;

const plain = (v) => (Number.isFinite(v) ? String(Number(v.toPrecision(4))) : '');
// What the number box shows: rupee amounts with Indian grouping (12,00,000), the rest plain.
const shown = (input, v) => (isRupees(input.unit) && Number.isFinite(v) && Math.abs(v) >= 1000 ? groupIndian(v) : plain(v));

function toSlider(input, value) {
  if (input.log) {
    const t = Math.log(value / input.min) / Math.log(input.max / input.min);
    return Math.round(Math.min(1, Math.max(0, t)) * SLIDER_STEPS);
  }
  return value;
}

function fromSlider(input, raw) {
  if (input.log) {
    const v = input.min * (input.max / input.min) ** (Number(raw) / SLIDER_STEPS);
    return Number(v.toPrecision(3));
  }
  const v = Number(raw);
  return input.integer ? Math.round(v) : v;
}

function sliderAttrs(input) {
  if (input.log) return `min="0" max="${SLIDER_STEPS}" step="1"`;
  const step = input.integer ? 1 : input.step || (input.max - input.min) / SLIDER_STEPS;
  return `min="${input.min}" max="${input.max}" step="${step}"`;
}

export function calcHtml(calc) {
  return `
    <section class="card tryit" data-tryit>
      <div class="tryit-head">
        <h2>Try it</h2>
        <button type="button" class="btn btn-sm btn-ghost" data-tryit-guess aria-pressed="false" title="Hide the answers until you've guessed them">Guess first</button>
        ${calc.inputs.length && calc.outputs.length ? '<button type="button" class="btn btn-sm btn-ghost" data-tryit-plot aria-expanded="false">Plot</button>' : ''}
        <button type="button" class="btn btn-sm btn-ghost" data-tryit-reset>Reset</button>
      </div>
      <div class="tryit-grid">
        <div class="tryit-inputs">
          ${calc.inputs
            .map(
              (i) => `
            <label class="tryit-input">
              <span class="tryit-label">${esc(i.label)}${i.unit ? ` <span class="tryit-unit">${esc(i.unit)}</span>` : ''}</span>
              <span class="tryit-controls">
                <input type="range" ${sliderAttrs(i)} value="${toSlider(i, i.value)}" data-slider="${esc(i.key)}" aria-label="${esc(i.label)}">
                <input type="text" inputmode="decimal" class="input tryit-number" value="${shown(i, i.value)}" data-number="${esc(i.key)}" aria-label="${esc(i.label)} value">
              </span>
            </label>`,
            )
            .join('')}
        </div>
        <div class="tryit-outputs" aria-live="polite">
          ${calc.outputs
            .map(
              (o, n) => `
            <div class="tryit-output">
              <span class="tryit-label">${esc(o.label)}</span>
              <span class="tryit-value" data-output="${n}"></span>
              <input type="text" inputmode="decimal" class="input tryit-guess" data-guess="${n}" placeholder="Your guess${o.unit ? `, in ${esc(o.unit)}` : ''}" aria-label="Your guess for ${esc(o.label)}">
              <span class="tryit-verdict" data-verdict="${n}"></span>
            </div>`,
            )
            .join('')}
          <button type="button" class="btn btn-sm btn-primary tryit-reveal" data-tryit-reveal>Reveal</button>
        </div>
      </div>
      <div class="tryit-plot-panel" data-plot-panel hidden>
        <div class="tryit-plot-picks">
          <label>Show
            <select class="select" data-plot-output>
              ${calc.outputs.map((o, n) => `<option value="${n}">${esc(o.label)}</option>`).join('')}
            </select>
          </label>
          ${
            calc.inputs.length > 1
              ? `<label>against
                  <select class="select" data-plot-input>
                    ${calc.inputs.map((i) => `<option value="${esc(i.key)}">${esc(i.label)}</option>`).join('')}
                  </select>
                </label>`
              : `<span class="muted">against ${esc(calc.inputs[0]?.label || '')}</span>`
          }
        </div>
        <div data-plot></div>
        <p class="tryit-note">The dot is where the sliders are now. The other inputs stay where you set them.</p>
      </div>
      ${calc.note ? `<p class="tryit-note">${renderInline(calc.note)}</p>` : ''}
    </section>`;
}

// Guess first: outputs stay hidden until you've committed to a guess and pressed Reveal.
// Predicting before seeing is what makes the answer stick (predict–observe–explain).
const GUESS_PREF = 'lattice.guessFirst';
const readGuessPref = () => {
  try {
    return localStorage.getItem(GUESS_PREF) === 'on';
  } catch {
    return false;
  }
};

export function mountCalc(root, calc, { entryId = null } = {}) {
  const box = root.querySelector('[data-tryit]');
  if (!box) return;
  const values = Object.fromEntries(calc.inputs.map((i) => [i.key, i.value]));
  let guessing = readGuessPref();
  let revealed = false;
  let last = [];

  function setGuessing(on) {
    guessing = on;
    revealed = false;
    box.toggleAttribute('data-guessing', on);
    box.removeAttribute('data-revealed');
    const btn = box.querySelector('[data-tryit-guess]');
    btn?.setAttribute('aria-pressed', String(on));
    btn?.classList.toggle('on', on);
    for (const v of box.querySelectorAll('[data-verdict]')) v.textContent = '';
    update();
  }

  function reveal() {
    revealed = true;
    box.setAttribute('data-revealed', '');
    update();
    last.forEach((r) => {
      const field = box.querySelector(`[data-guess="${r.index}"]`);
      const guess = parseGuess(field?.value);
      const verdictEl = box.querySelector(`[data-verdict="${r.index}"]`);
      if (!verdictEl) return;
      if (guess === null) {
        verdictEl.textContent = '';
        return;
      }
      const v = guessVerdict(guess, r.value);
      verdictEl.textContent = v.text;
      verdictEl.dataset.level = v.level;
      record(entryId, 'guess', { label: r.label, guess, actual: r.value });
    });
  }

  function drawPlot() {
    const panel = box.querySelector('[data-plot-panel]');
    if (!panel || panel.hidden) return;
    const outputIndex = Number(box.querySelector('[data-plot-output]')?.value || 0);
    const inputKey = box.querySelector('[data-plot-input]')?.value || calc.inputs[0]?.key;
    box.querySelector('[data-plot]').innerHTML = plotSvg(calc, values, inputKey, outputIndex);
  }

  function update() {
    let results;
    try {
      results = runCalc(calc, values);
    } catch {
      results = calc.outputs.map((o) => ({ ...o, value: NaN }));
    }
    last = results;
    const hidden = guessing && !revealed;
    for (const r of results) {
      const f = formatNumber(r.value, { unit: r.unit, prefix: r.prefix, digits: r.digits || 3 });
      const el = box.querySelector(`[data-output="${r.index}"]`);
      if (el) el.innerHTML = hidden ? '<span class="tryit-hidden">?</span>' : `${esc(f.text)}${f.unit ? ` <span class="tryit-unit">${esc(f.unit)}</span>` : ''}`;
    }
    if (!hidden) drawPlot();
  }

  function set(key, value, from) {
    const input = calc.inputs.find((i) => i.key === key);
    if (!input || !Number.isFinite(value) || (input.log && value <= 0)) return false;
    values[key] = input.integer ? Math.round(value) : value;
    // a new setting means a new guess
    if (guessing && revealed) {
      revealed = false;
      box.removeAttribute('data-revealed');
      for (const v of box.querySelectorAll('[data-verdict]')) v.textContent = '';
      for (const g of box.querySelectorAll('[data-guess]')) g.value = '';
    }
    if (from !== 'slider') box.querySelector(`[data-slider="${key}"]`).value = toSlider(input, values[key]);
    if (from !== 'number') box.querySelector(`[data-number="${key}"]`).value = shown(input, values[key]);
    update();
    return true;
  }

  box.addEventListener('input', (ev) => {
    const slider = ev.target.closest('[data-slider]');
    if (slider) {
      const input = calc.inputs.find((i) => i.key === slider.dataset.slider);
      set(input.key, fromSlider(input, slider.value), 'slider');
    }
  });
  box.addEventListener('change', (ev) => {
    const field = ev.target.closest('[data-number]');
    if (!field) return;
    const input = calc.inputs.find((i) => i.key === field.dataset.number);
    const ok = set(field.dataset.number, parseAmount(field.value) ?? NaN, 'number');
    field.classList.toggle('invalid', !ok);
    if (!ok) field.value = shown(input, values[field.dataset.number]);
    else if (input) field.value = shown(input, values[input.key]);
  });
  box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.closest('[data-number]')) {
      ev.preventDefault();
      ev.target.blur();
    }
  });
  box.querySelector('[data-tryit-reset]')?.addEventListener('click', () => {
    for (const i of calc.inputs) set(i.key, i.value);
  });
  box.querySelector('[data-tryit-guess]')?.addEventListener('click', () => {
    const on = !guessing;
    try {
      localStorage.setItem(GUESS_PREF, on ? 'on' : 'off');
    } catch {}
    setGuessing(on);
  });
  box.querySelector('[data-tryit-reveal]')?.addEventListener('click', reveal);
  box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.closest('[data-guess]')) {
      ev.preventDefault();
      reveal();
    }
  });
  box.querySelector('[data-tryit-plot]')?.addEventListener('click', (ev) => {
    const panel = box.querySelector('[data-plot-panel]');
    panel.hidden = !panel.hidden;
    ev.currentTarget.setAttribute('aria-expanded', String(!panel.hidden));
    ev.currentTarget.classList.toggle('on', !panel.hidden);
    drawPlot();
  });
  box.addEventListener('change', (ev) => {
    if (ev.target.closest('[data-plot-output], [data-plot-input]')) drawPlot();
  });
  setGuessing(guessing);
}

export function videosHtml(videos, { heading = true } = {}) {
  if (!videos?.length) return '';
  return `
    <section class="watch">
      ${heading ? '<h2>Watch</h2>' : ''}
      <div class="watch-list">
        ${videos
          .map(
            (v) => `
          <a class="watch-item" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer">
            <span class="watch-thumb">
              <img src="${esc(thumbnailUrl(v.url))}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5.5v9l7.5-4.5z"/></svg>
            </span>
            <span class="watch-text">
              <span class="watch-title">${esc(v.title || 'Video')}</span>
              ${v.channel ? `<span class="watch-channel">${esc(v.channel)}</span>` : ''}
            </span>
          </a>`,
          )
          .join('')}
      </div>
    </section>`;
}

// ---------------------------------------------------------------- the curve behind the numbers

const PLOT = { w: 560, h: 220, left: 62, right: 14, top: 14, bottom: 34, samples: 160 };

// Nice round numbers for the axis ends.
function ticks(min, max, log) {
  if (log) {
    const out = [];
    for (let e = Math.ceil(Math.log10(min)); e <= Math.floor(Math.log10(max)); e++) out.push(10 ** e);
    return out.length > 1 ? out.slice(0, 8) : [min, max];
  }
  const step = (max - min) / 4;
  return [0, 1, 2, 3, 4].map((i) => min + i * step);
}

const shortNumber = (v) => {
  if (!Number.isFinite(v)) return '';
  const a = Math.abs(v);
  if (a !== 0 && (a < 1e-3 || a >= 1e5)) {
    const e = Math.floor(Math.log10(a));
    const m = v / 10 ** e;
    return `${Number(m.toFixed(1))}e${e}`;
  }
  return String(Number(v.toPrecision(3)));
};

// Runs the calculator across one input's range and draws the chosen output as a curve.
export function plotSvg(calc, values, inputKey, outputIndex) {
  const input = calc.inputs.find((i) => i.key === inputKey) || calc.inputs[0];
  const points = [];
  for (let s = 0; s <= PLOT.samples; s++) {
    const t = s / PLOT.samples;
    const x = input.log ? input.min * (input.max / input.min) ** t : input.min + t * (input.max - input.min);
    const at = input.integer ? Math.round(x) : x;
    let y = NaN;
    try {
      y = runCalc(calc, { ...values, [input.key]: at })[outputIndex]?.value ?? NaN;
    } catch {}
    if (Number.isFinite(y)) points.push([at, y]);
  }
  const out = calc.outputs[outputIndex];
  if (points.length < 2) {
    return `<p class="tryit-note">This one can't be drawn as a curve.</p>`;
  }
  const ys = points.map((p) => p[1]);
  let yMin = Math.min(...ys);
  let yMax = Math.max(...ys);
  // A curve spanning many orders of magnitude only reads on a log scale.
  const logY = yMin > 0 && yMax / yMin > 500;
  if (yMin === yMax) {
    yMin -= Math.abs(yMin) * 0.1 + 1;
    yMax += Math.abs(yMax) * 0.1 + 1;
  } else if (!logY) {
    const pad = (yMax - yMin) * 0.08;
    yMin -= pad;
    yMax += pad;
  }
  const { w, h, left, right, top, bottom } = PLOT;
  const px = (x) => left + ((input.log ? Math.log(x / input.min) / Math.log(input.max / input.min) : (x - input.min) / (input.max - input.min)) * (w - left - right));
  const py = (y) => h - bottom - ((logY ? Math.log(y / yMin) / Math.log(yMax / yMin) : (y - yMin) / (yMax - yMin)) * (h - top - bottom));
  const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${px(x).toFixed(1)},${py(y).toFixed(1)}`).join('');
  const here = values[input.key];
  const hereY = points.reduce((best, p) => (Math.abs(p[0] - here) < Math.abs(best[0] - here) ? p : best), points[0]);

  const xTicks = ticks(input.min, input.max, input.log).filter((t) => t >= input.min && t <= input.max);
  const yTicks = ticks(yMin, yMax, logY).filter((t) => t >= yMin && t <= yMax);

  return `
    <svg class="tryit-plot" viewBox="0 0 ${w} ${h}" role="img"
         aria-label="${esc(out.label)} against ${esc(input.label)}">
      ${yTicks
        .map(
          (t) => `<g class="grid"><line x1="${left}" x2="${w - right}" y1="${py(t).toFixed(1)}" y2="${py(t).toFixed(1)}"/>
            <text x="${left - 8}" y="${(py(t) + 4).toFixed(1)}" text-anchor="end">${esc(isRupees(out.unit) ? shortRupees(t) : shortNumber(t))}</text></g>`,
        )
        .join('')}
      ${xTicks
        .map(
          (t) => `<g class="grid"><line x1="${px(t).toFixed(1)}" x2="${px(t).toFixed(1)}" y1="${top}" y2="${h - bottom}"/>
            <text x="${px(t).toFixed(1)}" y="${h - bottom + 16}" text-anchor="middle">${esc(isRupees(input.unit) ? shortRupees(t) : shortNumber(t))}</text></g>`,
        )
        .join('')}
      <path class="curve" d="${path}"/>
      <circle class="here" cx="${px(hereY[0]).toFixed(1)}" cy="${py(hereY[1]).toFixed(1)}" r="4"/>
      <text class="axis-x" x="${(left + w - right) / 2}" y="${h - 4}" text-anchor="middle">${esc(input.label)}${input.unit ? ` (${esc(input.unit)})` : ''}${input.log ? ', log scale' : ''}</text>
      <text class="axis-y" transform="translate(13 ${(top + h - bottom) / 2}) rotate(-90)" text-anchor="middle">${esc(out.label)}${out.unit ? ` (${esc(out.unit)})` : ''}${logY ? ', log scale' : ''}</text>
    </svg>`;
}
