// "Try it" calculators: a tiny, safe arithmetic language (no JavaScript is ever executed from
// data), SI constants, and number formatting. Shared by the browser, the server (validation)
// and scripts/check.js.
//
// A calculator on an entry looks like:
//   { inputs:  [{ key, label, unit, value, min, max, step?, log?, integer? }],
//     outputs: [{ key?, label, unit, expr, prefix?, digits? }],
//     note? }
// Output expressions may use input keys, earlier output keys, the constants and functions below.

export const CONSTANTS = {
  pi: Math.PI,
  c: 299792458, // m/s
  G: 6.6743e-11, // m³ kg⁻¹ s⁻²
  h: 6.62607015e-34, // J s
  hbar: 1.054571817e-34, // J s
  kB: 1.380649e-23, // J/K
  qe: 1.602176634e-19, // C (elementary charge)
  eV: 1.602176634e-19, // J
  me: 9.1093837015e-31, // kg
  mp: 1.67262192369e-27, // kg
  mn: 1.67492749804e-27, // kg
  u: 1.6605390666e-27, // kg (atomic mass unit)
  NA: 6.02214076e23,
  eps0: 8.8541878128e-12, // F/m
  mu0: 1.25663706212e-6, // N/A²
  sigmaSB: 5.670374419e-8, // W m⁻² K⁻⁴
  Msun: 1.98847e30, // kg
  Rsun: 6.957e8, // m
  Mearth: 5.9722e24, // kg
  Rearth: 6.371e6, // m
  GMearth: 3.986004418e14, // m³/s²
  g0: 9.80665, // m/s²
  AU: 1.495978707e11, // m
  ly: 9.4607304725808e15, // m
  pc: 3.0856775814913673e16, // m
  Mpc: 3.0856775814913673e22, // m
  yr: 3.15576e7, // s (Julian year)
  day: 86400, // s
};

function zeta(s) {
  if (!(s > 1)) return NaN;
  // Direct sum plus Euler–Maclaurin tail: accurate to ~1e-9 for s ≥ 1.05.
  const N = 2000;
  let sum = 0;
  for (let n = 1; n < N; n++) sum += n ** -s;
  return sum + N ** (1 - s) / (s - 1) + 0.5 * N ** -s + (s / 12) * N ** (-s - 1);
}

// Complementary error function (Numerical Recipes' erfcc): relative error below 1.2e-7
// everywhere, so far tails like ncdf(-8) stay accurate instead of rounding to zero.
function erfc(x) {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? r : 2 - r;
}
// Standard normal distribution: ncdf(x) = P(Z ≤ x), npdf its density.
const ncdf = (x) => 0.5 * erfc(-x / Math.SQRT2);
const npdf = (x) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
// Inverse of ncdf (Acklam's rational approximation, relative error below 1.2e-9):
// ninv(0.99) = 2.326, the z-score for 99% confidence.
function ninv(p) {
  if (!(p > 0 && p < 1)) return NaN;
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const tail = (q) =>
    (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)));
  if (p > 1 - 0.02425) return -tail(Math.sqrt(-2 * Math.log(1 - p)));
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

const FUNCTIONS = {
  sqrt: [1, Math.sqrt],
  cbrt: [1, Math.cbrt],
  exp: [1, Math.exp],
  ln: [1, Math.log],
  log: [1, Math.log],
  log10: [1, Math.log10],
  log2: [1, Math.log2],
  sin: [1, Math.sin],
  cos: [1, Math.cos],
  tan: [1, Math.tan],
  asin: [1, Math.asin],
  acos: [1, Math.acos],
  atan: [1, Math.atan],
  sinh: [1, Math.sinh],
  cosh: [1, Math.cosh],
  tanh: [1, Math.tanh],
  abs: [1, Math.abs],
  floor: [1, Math.floor],
  ceil: [1, Math.ceil],
  round: [1, Math.round],
  sign: [1, Math.sign],
  erf: [1, (x) => 1 - erfc(x)],
  erfc: [1, erfc],
  ncdf: [1, ncdf],
  npdf: [1, npdf],
  ninv: [1, ninv],
  zeta: [1, zeta],
  pow: [2, Math.pow],
  min: [-1, Math.min],
  max: [-1, Math.max],
  // if(condition, then, else): condition counts as true when > 0
  if: [3, (cond, a, b) => (cond > 0 ? a : b)],
};

// ---------------------------------------------------------------- parsing

function tokenize(src) {
  const tokens = [];
  const re = /\s*(?:(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(\*\*|[-+*/^(),]))/y;
  let i = 0;
  const text = String(src);
  while (i < text.length) {
    if (/^\s*$/.test(text.slice(i))) break;
    re.lastIndex = i;
    const m = re.exec(text);
    if (!m) throw new Error(`Unexpected “${text.slice(i).trim()[0]}” in “${text}”`);
    if (m[1] !== undefined) tokens.push({ t: 'num', v: Number(m[1]) });
    else if (m[2] !== undefined) tokens.push({ t: 'id', v: m[2] });
    else tokens.push({ t: 'op', v: m[3] === '**' ? '^' : m[3] });
    i = re.lastIndex;
  }
  return tokens;
}

export function parse(src) {
  const tokens = tokenize(src);
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v) => peek()?.t === 'op' && peek().v === v;
  const expectOp = (v) => {
    if (!isOp(v)) throw new Error(`Expected “${v}” in “${src}”`);
    pos++;
  };

  function expression() {
    let node = term();
    while (isOp('+') || isOp('-')) {
      const op = tokens[pos++].v;
      node = { k: 'bin', op, a: node, b: term() };
    }
    return node;
  }
  function term() {
    let node = unary();
    while (isOp('*') || isOp('/')) {
      const op = tokens[pos++].v;
      node = { k: 'bin', op, a: node, b: unary() };
    }
    return node;
  }
  function unary() {
    if (isOp('-') || isOp('+')) {
      const op = tokens[pos++].v;
      const arg = unary();
      return op === '-' ? { k: 'neg', a: arg } : arg;
    }
    return power();
  }
  function power() {
    const base = primary();
    if (isOp('^')) {
      pos++;
      return { k: 'bin', op: '^', a: base, b: unary() }; // right-associative; -2^2 = -(2^2)
    }
    return base;
  }
  function primary() {
    const tok = peek();
    if (!tok) throw new Error(`Unexpected end of “${src}”`);
    if (tok.t === 'num') {
      pos++;
      return { k: 'num', v: tok.v };
    }
    if (tok.t === 'id') {
      pos++;
      if (isOp('(')) {
        pos++;
        const args = [];
        if (!isOp(')')) {
          args.push(expression());
          while (isOp(',')) {
            pos++;
            args.push(expression());
          }
        }
        expectOp(')');
        const fn = Object.hasOwn(FUNCTIONS, tok.v) ? FUNCTIONS[tok.v] : null;
        if (!fn) throw new Error(`Unknown function “${tok.v}”`);
        if (fn[0] >= 0 && fn[0] !== args.length) throw new Error(`${tok.v}() takes ${fn[0]} argument(s)`);
        return { k: 'call', name: tok.v, args };
      }
      return { k: 'id', name: tok.v };
    }
    if (isOp('(')) {
      pos++;
      const inner = expression();
      expectOp(')');
      return inner;
    }
    throw new Error(`Unexpected “${tok.v}” in “${src}”`);
  }

  const tree = expression();
  if (pos < tokens.length) throw new Error(`Unexpected “${tokens[pos].v}” in “${src}”`);
  return tree;
}

export function evaluate(node, scope) {
  switch (node.k) {
    case 'num':
      return node.v;
    case 'neg':
      return -evaluate(node.a, scope);
    case 'id': {
      if (Object.hasOwn(scope, node.name)) return scope[node.name];
      if (Object.hasOwn(CONSTANTS, node.name)) return CONSTANTS[node.name];
      throw new Error(`Unknown name “${node.name}”`);
    }
    case 'call':
      return FUNCTIONS[node.name][1](...node.args.map((a) => evaluate(a, scope)));
    case 'bin': {
      const a = evaluate(node.a, scope);
      const b = evaluate(node.b, scope);
      if (node.op === '+') return a + b;
      if (node.op === '-') return a - b;
      if (node.op === '*') return a * b;
      if (node.op === '/') return a / b;
      return a ** b;
    }
    default:
      throw new Error('Bad expression');
  }
}

// Runs a calculator: returns [{ ...output, value }] (throws on a broken definition).
export function runCalc(calc, values = {}) {
  const scope = Object.create(null);
  for (const input of calc.inputs) scope[input.key] = Object.hasOwn(values, input.key) ? values[input.key] : input.value;
  return calc.outputs.map((out, i) => {
    const value = evaluate(parse(out.expr), scope);
    if (out.key) scope[out.key] = value;
    return { ...out, index: i, value };
  });
}

// ---------------------------------------------------------------- validation

const KEY = /^[A-Za-z_][A-Za-z0-9_]{0,30}$/;
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v));
const text = (v, max) => (typeof v === 'string' ? v.slice(0, max).trim() : '');

// Cleans a calculator definition, or throws with a readable reason.
// A one-off sum typed into a search box: "=hbar*c/G" or "= sqrt(2*G*Mearth/Rearth)".
// Only the built-in constants and functions are in scope, and nothing is ever run as code.
export function quickCalc(source) {
  const src = String(source || '').replace(/^\s*=\s*/, '').trim();
  if (!src) return null;
  try {
    const scope = Object.create(null);
    const value = evaluate(parse(src), scope);
    if (typeof value !== 'number' || Number.isNaN(value)) return { src, error: 'That does not come out as a number.' };
    return { src, value, ...formatNumber(value, { prefix: true, digits: 6 }) };
  } catch (err) {
    return { src, error: err.message };
  }
}

export function normalizeCalc(raw) {
  if (!raw) return null;
  if (typeof raw !== 'object') throw new Error('Calculator must be an object.');
  const inputs = (Array.isArray(raw.inputs) ? raw.inputs : []).slice(0, 12).map((i, n) => {
    const key = text(i?.key, 31);
    if (!KEY.test(key)) throw new Error(`Input ${n + 1}: key must be a simple name like “mass”.`);
    if (Object.hasOwn(CONSTANTS, key) || Object.hasOwn(FUNCTIONS, key)) throw new Error(`Input “${key}” clashes with a built-in name.`);
    const min = num(i.min);
    const max = num(i.max);
    const value = num(i.value);
    if (![min, max, value].every(Number.isFinite) || !(max > min)) throw new Error(`Input “${key}” needs numeric min < max and a value.`);
    if (i.log && !(min > 0)) throw new Error(`Input “${key}”: a log slider needs min > 0.`);
    const out = { key, label: text(i.label, 80) || key, unit: text(i.unit, 30), value: Math.min(max, Math.max(min, value)), min, max };
    if (i.log) out.log = true;
    if (i.integer) out.integer = true;
    if (Number.isFinite(num(i.step)) && num(i.step) > 0) out.step = num(i.step);
    return out;
  });
  const keys = new Set();
  for (const i of inputs) {
    if (keys.has(i.key)) throw new Error(`Input “${i.key}” appears twice.`);
    keys.add(i.key);
  }
  const outputs = (Array.isArray(raw.outputs) ? raw.outputs : []).slice(0, 12).map((o, n) => {
    const expr = text(o?.expr, 500);
    if (!expr) throw new Error(`Output ${n + 1} has no expression.`);
    parse(expr);
    const out = { label: text(o.label, 80) || `Output ${n + 1}`, unit: text(o.unit, 30), expr };
    const key = text(o.key, 31);
    if (key) {
      if (!KEY.test(key) || keys.has(key)) throw new Error(`Output key “${key}” is invalid or already used.`);
      keys.add(key);
      out.key = key;
    }
    if (o.prefix) out.prefix = true;
    if (Number.isInteger(num(o.digits)) && num(o.digits) >= 1 && num(o.digits) <= 10) out.digits = num(o.digits);
    return out;
  });
  if (!inputs.length || !outputs.length) throw new Error('A calculator needs at least one input and one output.');
  const calc = { inputs, outputs };
  const note = text(raw.note, 500);
  if (note) calc.note = note;
  runCalc(calc); // names must all resolve
  return calc;
}

// ---------------------------------------------------------------- formatting

const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const PREFIXES = { '-24': 'y', '-21': 'z', '-18': 'a', '-15': 'f', '-12': 'p', '-9': 'n', '-6': 'μ', '-3': 'm', 0: '', 3: 'k', 6: 'M', 9: 'G', 12: 'T', 15: 'P', 18: 'E' };

function tidy(x, digits) {
  const s = Number(x.toPrecision(digits)).toString();
  return s.includes('e') ? Number(x).toPrecision(digits) : s;
}

// Indian digit grouping: 12,34,567.
export const groupIndian = (n) => Math.round(n).toLocaleString('en-IN');

// Rupees read the Indian way: ₹850 · ₹45,600 · ₹12.3 lakh · ₹1.23 crore · ₹4.56 lakh crore.
export function formatRupees(value, digits = 3) {
  const sign = value < 0 ? '−' : '';
  const a = Math.abs(value);
  const d = Math.max(digits, 4);
  const scaled = (x) => {
    const s = tidy(x, d);
    return Number(s) >= 1000 ? groupIndian(Number(s)) : s;
  };
  if (a < 1000) return { text: `${sign}₹${tidy(a, d)}`, unit: '' };
  if (a < 1e5) return { text: `${sign}₹${groupIndian(a)}`, unit: '' };
  if (a < 1e7) return { text: `${sign}₹${scaled(a / 1e5)}`, unit: 'lakh' };
  if (a < 1e12) return { text: `${sign}₹${scaled(a / 1e7)}`, unit: 'crore' };
  return { text: `${sign}₹${scaled(a / 1e12)}`, unit: 'lakh crore' };
}

// Axis labels: ₹50k, ₹12L, ₹1.5Cr.
export function shortRupees(value) {
  const a = Math.abs(value);
  const sign = value < 0 ? '−' : '';
  const n = (x) => String(Number(x.toPrecision(2)));
  if (a < 1000) return `${sign}₹${n(a)}`;
  if (a < 1e5) return `${sign}₹${n(a / 1e3)}k`;
  if (a < 1e7) return `${sign}₹${n(a / 1e5)}L`;
  return `${sign}₹${n(a / 1e7)}Cr`;
}

// Numbers as people type them: 1.2e-8, 1.2×10^-8, 3,000, ₹12,34,567, 12 lakh, 1.5cr, 50k, 7%.
const SCALES = { k: 1e3, thousand: 1e3, l: 1e5, lakh: 1e5, lakhs: 1e5, lac: 1e5, lacs: 1e5, cr: 1e7, crore: 1e7, crores: 1e7 };
export function parseAmount(raw) {
  let s = String(raw ?? '')
    .trim()
    .toLowerCase()
    .replace(/[₹,\s%]/g, '')
    .replace(/^rs\.?/, '')
    .replace(/[×x*]10\^?\(?([+\-−]?\d+)\)?/, 'e$1')
    .replace(/−/g, '-');
  if (!s) return null;
  let scale = 1;
  const m = s.match(/^(.*?\d\.?)(k|thousand|lakhs?|lacs?|l|crores?|cr)$/);
  if (m) {
    s = m[1];
    scale = SCALES[m[2]];
  }
  const n = Number(s) * scale;
  return Number.isFinite(n) ? n : null;
}

// Units that start with ₹ ("₹", "₹ a month") are rupee amounts, shown in lakh and crore.
export const isRupees = (unit) => typeof unit === 'string' && unit.startsWith('₹');

// { text, unit } for display, e.g. 2.46 × 10⁻¹⁵, or 38.5 μs with prefix on. Unit ₹ reads in lakh and crore.
export function formatNumber(value, { unit = '', prefix = false, digits = 3 } = {}) {
  if (!Number.isFinite(value)) return { text: value === Infinity ? '∞' : value === -Infinity ? '−∞' : '—', unit };
  if (isRupees(unit)) {
    const rest = unit.slice(1).trim();
    const r = value === 0 ? { text: '₹0', unit: '' } : formatRupees(value, digits);
    return { text: r.text, unit: [r.unit, rest].filter(Boolean).join(' ') };
  }
  if (value === 0) return { text: '0', unit };
  const exp3 = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
  if (prefix && unit && PREFIXES[exp3] !== undefined) {
    return { text: tidy(value / 10 ** exp3, digits).replace('-', '−'), unit: PREFIXES[exp3] + unit };
  }
  const abs = Math.abs(value);
  if (abs >= 1e-3 && abs < 1e6) {
    const s = tidy(value, digits);
    return { text: (Math.abs(Number(s)) >= 1000 ? Number(s).toLocaleString('en-US') : s).replace('-', '−'), unit };
  }
  const exponent = Math.floor(Math.log10(abs));
  let mantissa = value / 10 ** exponent;
  let e = exponent;
  if (Math.abs(Number(mantissa.toPrecision(digits))) >= 10) {
    mantissa /= 10;
    e += 1;
  }
  const sup = String(e).split('').map((ch) => SUP[ch]).join('');
  return { text: `${tidy(mantissa, digits).replace('-', '−')} × 10${sup}`, unit };
}
