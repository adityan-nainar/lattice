// Sanity check for content: every formula parses in KaTeX, every [[wiki link]] resolves,
// every typed link points at real entries.
//
//   npm run check            checks seed.js
//   npm run check -- --data  checks data/lattice.json (your real notes)
// Another library on this engine points LATTICE_SEED and LATTICE_DATA at its own files.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import katex from 'katex';

import { formatNumber, normalizeCalc, runCalc } from '../public/js/calc.js';
import { mathSnippets, wikiTargets } from '../public/js/markup.js';
import { youtubeId } from '../public/js/media.js';
import { learningPath, prerequisiteMap } from '../public/js/paths.js';
import { LINK_KINDS, slugify, STATUSES, TYPES } from '../public/js/schema.js';
import { buildTermIndex, findTerms, MIN_TERM_LENGTH, normTerm, termsFor } from '../public/js/terms.js';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SEED_FILE = process.env.LATTICE_SEED ? path.resolve(process.env.LATTICE_SEED) : path.join(ROOT, 'seed.js');
const DATA_DIR = process.env.LATTICE_DATA ? path.resolve(process.env.LATTICE_DATA) : path.join(ROOT, 'data');
const ownSeed = SEED_FILE === path.join(ROOT, 'seed.js');
const { SEED } = await import(pathToFileURL(SEED_FILE).href);
// Lattice's link notes pack only describes Lattice's own starter content.
const CONNECTIONS = ownSeed ? (await import('../content/connections.js')).CONNECTIONS : { notes: [] };
const useData = process.argv.includes('--data');

let data;
if (useData) {
  data = JSON.parse(await readFile(path.join(DATA_DIR, 'lattice.json'), 'utf8'));
} else {
  data = {
    ...SEED,
    links: SEED.links.map(([from, kind, to, note]) => ({ from, kind, to, note })),
  };
}

const problems = [];
const warn = [];
const ids = new Map(data.entries.map((e) => [e.id, e]));
const slugs = new Map();
for (const e of data.entries) {
  const s = slugify(e.title);
  if (slugs.has(s)) warn.push(`Two entries share a title slug "${s}": ${slugs.get(s)} and ${e.id}`);
  else slugs.set(s, e.id);
}
const areaIds = new Set(data.areas.map((a) => a.id));
if (ids.size !== data.entries.length) problems.push('Duplicate entry ids.');

// Aliases: resolve [[links]] like titles, and must point at exactly one entry.
const termOwner = new Map();
for (const e of data.entries) {
  for (const t of termsFor(e)) {
    const key = normTerm(t);
    if (key.length < MIN_TERM_LENGTH) problems.push(`${e.id}: alias "${t}" is too short to match safely`);
    const owner = termOwner.get(key);
    if (owner && owner !== e.id) problems.push(`"${t}" names both ${owner} and ${e.id}`);
    termOwner.set(key, e.id);
  }
  for (const a of e.aliases || []) if (!slugs.has(slugify(a))) slugs.set(slugify(a), e.id);
}

if (!useData) {
  for (const [from, to] of CONNECTIONS.notes) {
    const hit = data.links.some((l) => (l.from === from && l.to === to) || (l.from === to && l.to === from));
    if (!hit) problems.push(`connections note ${from} ↔ ${to}: no such link`);
  }
}

function tex(where, source, display) {
  try {
    katex.renderToString(source, { displayMode: display, throwOnError: true, strict: 'error' });
  } catch (err) {
    const msg = err.message.split('\n')[0];
    // strict-mode complaints (unicode in text etc.) are warnings; parse errors are problems
    (err instanceof katex.ParseError && !/LaTeX-incompatible|unknownSymbol|unicodeTextInMathMode/.test(msg)
      ? problems
      : warn
    ).push(`${where}: ${msg}\n      ${source.slice(0, 120)}`);
  }
}

// A lone backslash in a normal JS string eats the next letter: \t in \times becomes a TAB.
const CONTROL = /[\b\t\v\f]/;

let formulas = 0;
const calcResults = [];
for (const e of data.entries) {
  const fields = [['summary', e.summary], ['latex', e.latex], ...(e.variables || []).flatMap((v) => [['symbol', v.symbol], ['meaning', v.meaning]])];
  for (const [name, value] of fields) {
    if (CONTROL.test(value || '')) problems.push(`${e.id} ${name}: contains a control character — probably an unescaped backslash`);
  }
  if (!TYPES[e.type]) problems.push(`${e.id}: unknown type ${e.type}`);
  if (!STATUSES[e.status]) problems.push(`${e.id}: unknown status ${e.status}`);
  if (e.area && !areaIds.has(e.area)) problems.push(`${e.id}: unknown area ${e.area}`);
  if (e.latex) (formulas++, tex(`${e.id} formula`, e.latex, true));
  for (const v of e.variables || []) if (v.symbol) (formulas++, tex(`${e.id} symbol`, v.symbol, false));
  for (const field of ['body', 'summary']) {
    for (const m of mathSnippets(e[field])) (formulas++, tex(`${e.id} ${field}`, m.tex, m.display));
    for (const target of wikiTargets(e[field])) {
      if (!ids.has(target) && !slugs.has(slugify(target))) problems.push(`${e.id}: [[${target}]] does not match any entry`);
    }
  }
  if (e.calc) {
    try {
      const calc = normalizeCalc(e.calc);
      const results = runCalc(calc);
      const broken = results.filter((r) => !Number.isFinite(r.value));
      if (broken.length) problems.push(`${e.id} calculator: ${broken.map((b) => b.label).join(', ')} is not a number at the default inputs`);
      for (const edge of ['min', 'max']) {
        const at = runCalc(calc, Object.fromEntries(calc.inputs.map((i) => [i.key, i[edge]])));
        if (at.some((r) => Number.isNaN(r.value))) warn.push(`${e.id} calculator: NaN with every input at its ${edge}`);
      }
      calcResults.push([e.id, calc, results]);
    } catch (err) {
      problems.push(`${e.id} calculator: ${err.message}`);
    }
  }
  for (const v of e.videos || []) if (!youtubeId(v.url)) problems.push(`${e.id}: not a YouTube link: ${v.url}`);
}

const seen = new Set();
for (const l of data.links) {
  const tag = `${l.from} -${l.kind}-> ${l.to}`;
  if (!LINK_KINDS[l.kind]) problems.push(`link ${tag}: unknown kind`);
  if (!ids.has(l.from)) problems.push(`link ${tag}: missing source`);
  if (!ids.has(l.to)) problems.push(`link ${tag}: missing target`);
  const key = LINK_KINDS[l.kind]?.symmetric ? [l.from, l.to].sort().join('|') + l.kind : tag;
  if (seen.has(key)) problems.push(`link ${tag}: duplicate`);
  seen.add(key);
}

const linked = new Set(data.links.flatMap((l) => [l.from, l.to]));
const orphans = data.entries.filter((e) => !linked.has(e.id) && e.type !== 'note');
for (const o of orphans) warn.push(`${o.id}: no typed links`);

// A prerequisite cycle would make "learn this first" impossible to order.
const needs = prerequisiteMap(data.links);
const cyclesSeen = new Set();
const pathSizes = [];
for (const e of data.entries) {
  const { steps, cycles } = learningPath(e.id, needs);
  pathSizes.push([e.id, steps.length]);
  for (const cycle of cycles) {
    const key = cycle.slice(0, -1).sort().join(',');
    if (cyclesSeen.has(key)) continue;
    cyclesSeen.add(key);
    problems.push(`prerequisite cycle: ${cycle.join(' → ')}`);
  }
}
const longest = pathSizes.sort((a, b) => b[1] - a[1]).slice(0, 5);

// The main path (optional, from the seed): every step exists once, links to an earlier step, and
// comes after anything on the path it builds on — so following it never needs a later step.
const route = SEED.route;
let routeLine = '';
if (route) {
  const steps = (route.stages || []).flatMap((s) => (s.steps || []).map((id) => ({ id, stage: s.id })));
  const position = new Map();
  steps.forEach(({ id, stage }, i) => {
    if (!ids.has(id)) problems.push(`main path (${stage}): no entry "${id}"`);
    else if (position.has(id)) problems.push(`main path (${stage}): "${id}" appears twice`);
    else position.set(id, i);
  });
  const neighbours = new Map();
  for (const l of data.links) {
    if (!neighbours.has(l.from)) neighbours.set(l.from, new Set());
    if (!neighbours.has(l.to)) neighbours.set(l.to, new Set());
    neighbours.get(l.from).add(l.to);
    neighbours.get(l.to).add(l.from);
  }
  for (const [id, i] of position) {
    if (i > 0 && ![...(neighbours.get(id) || [])].some((o) => position.has(o) && position.get(o) < i)) {
      problems.push(`main path: "${id}" (step ${i + 1}) has no link to an earlier step`);
    }
    for (const need of needs.get(id) || []) {
      if (position.has(need) && position.get(need) > i) {
        problems.push(`main path: "${id}" (step ${i + 1}) builds on "${need}", which comes later (step ${position.get(need) + 1})`);
      }
    }
  }
  const basicsOff = data.entries.filter((e) => e.tags?.includes('basics') && !position.has(e.id)).map((e) => e.id);
  if (basicsOff.length) warn.push(`basics not on the main path: ${basicsOff.join(', ')}`);
  routeLine = `  main path: ${position.size} steps in ${route.stages.length} stages · ${Math.round((position.size / data.entries.length) * 100)}% of entries`;
}

console.log(`\n  ${useData ? path.relative(process.cwd(), path.join(DATA_DIR, 'lattice.json')) : path.relative(process.cwd(), SEED_FILE)}: ${data.entries.length} entries · ${data.links.length} links · ${data.areas.length} areas · ${formulas} formulas`);
console.log(`  longest prerequisite chains: ${longest.map(([id, n]) => `${id} (${n})`).join(', ')}`);
if (routeLine) console.log(routeLine);

// How connected reading feels: links with a "why" note, and topics spotted in each entry's text.
const explained = data.links.filter((l) => l.note && l.kind !== 'example-of').length;
const explainable = data.links.filter((l) => l.kind !== 'example-of').length;
const index = buildTermIndex(data.entries);
const spotted = data.entries.map((e) => new Set(findTerms(`${e.summary}\n${e.body}`, index).map((m) => m.id).filter((id) => id !== e.id)).size);
const quiet = data.entries.filter((e, i) => spotted[i] === 0 && e.body.trim()).map((e) => e.id);
console.log(`  links with a "why" note: ${explained}/${explainable} · topics spotted per entry: ${(spotted.reduce((a, b) => a + b, 0) / spotted.length).toFixed(1)} on average`);
if (quiet.length) console.log(`  entries mentioning no other topic: ${quiet.join(', ')}`);
console.log(`  calculators: ${calcResults.length} · entries with videos: ${data.entries.filter((e) => e.videos?.length).length}`);

// npm run check -- --calcs   prints every calculator's default inputs and outputs, for eyeballing numbers.
if (process.argv.includes('--calcs')) {
  for (const [id, calc, results] of calcResults) {
    const inputs = calc.inputs.map((i) => `${i.key}=${i.value}${i.unit ? ` ${i.unit}` : ''}`).join(', ');
    const outputs = results.map((r) => {
      const f = formatNumber(r.value, { unit: r.unit, prefix: r.prefix, digits: r.digits || 3 });
      return `${r.label} = ${f.text}${f.unit ? ` ${f.unit}` : ''}`;
    });
    console.log(`\n  ${id}  (${inputs})\n    ${outputs.join('\n    ')}`);
  }
}
for (const w of warn) console.log(`  warn  ${w}`);
for (const p of problems) console.log(`  FAIL  ${p}`);
console.log(problems.length ? `\n  ${problems.length} problem(s).\n` : '\n  All good.\n');
process.exit(problems.length ? 1 : 0);
