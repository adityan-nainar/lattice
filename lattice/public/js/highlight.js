// Syntax colouring for fenced code blocks: a small regex tokenizer per language, no
// dependencies. It only wraps recognised pieces in <span class="tk-…">; everything is
// HTML-escaped, and an unknown language comes back as plain escaped text.

const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const words = (list) => new RegExp(`\\b(?:${list.trim().split(/\s+/).join('|')})\\b`);

const STR_DQ = /"(?:\\.|[^"\\\n])*"/;
const STR_SQ = /'(?:\\.|[^'\\\n])*'/;
const NUM = /\b(?:0x[\da-fA-F]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/;
const CALL = /\b[A-Za-z_]\w*(?=\()/;

// Each language: ordered [class, regex] pairs. Earlier pairs win when two match at the same place.
const LANGS = {
  python: [
    ['com', /#.*/],
    ['str', /[rRbBfFuU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?''')/],
    ['str', /[rRbBfFuU]{0,2}(?:"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/],
    ['dec', /@[\w.]+/],
    ['kw', words('and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case')],
    ['lit', words('True False None self')],
    ['num', NUM],
    ['fn', CALL],
  ],
  js: [
    ['com', /\/\/.*|\/\*[\s\S]*?\*\//],
    ['str', /`(?:\\.|[^`\\])*`/],
    ['str', STR_DQ],
    ['str', STR_SQ],
    ['tag', /<\/?[A-Za-z][\w.]*|\/>/],
    ['kw', words('async await break case catch class const continue default delete do else export extends finally for from function if import in instanceof let new of return switch throw try typeof var void while yield type interface as')],
    ['lit', words('true false null undefined this')],
    ['num', NUM],
    ['fn', CALL],
  ],
  sql: [
    ['com', /--.*/],
    ['str', STR_SQ],
    ['kw', /\b(?:SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|AS|ON|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|RETURNING|CREATE|TABLE|INDEX|EXTENSION|IF|EXISTS|ALTER|ADD|COLUMN|DROP|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CHECK|DEFAULT|CONSTRAINT|CASCADE|RESTRICT|BEGIN|COMMIT|ROLLBACK|WITH|RECURSIVE|UNION|ALL|DISTINCT|CASE|WHEN|THEN|ELSE|END|DESC|ASC|GENERATED|ALWAYS|IDENTITY|STORED|USING|CONFLICT|DO|NOTHING|EXPLAIN|ANALYZE|FOR|SKIP|LOCKED|BETWEEN|LIKE|ILIKE|ANY|CONCURRENTLY|VACUUM|INTERVAL)\b/i],
    ['type', /\b(?:bigint|int|integer|smallint|text|varchar|boolean|timestamptz|timestamp|date|numeric|real|jsonb|json|uuid|vector|halfvec|tsvector|serial)\b/i],
    ['num', NUM],
    ['fn', CALL],
  ],
  bash: [
    ['com', /(?<=^|\s)#.*/],
    ['str', STR_DQ],
    ['str', STR_SQ],
    ['var', /\$\{[^}\n]*\}|\$env:\w+|\$\w+/],
    ['attr', /(?<=\s)--?[\w-]+/],
    ['kw', words('if then else fi for do done in export sudo cd echo source')],
    ['num', NUM],
  ],
  json: [
    ['prop', /"(?:\\.|[^"\\\n])*"(?=\s*:)/],
    ['str', STR_DQ],
    ['lit', words('true false null')],
    ['num', /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/],
  ],
  yaml: [
    ['com', /(?<=^|\s)#.*/],
    ['prop', /[\w.-]+(?=:(?:\s|$))/],
    ['str', STR_DQ],
    ['str', STR_SQ],
    ['lit', words('true false null yes no')],
    ['num', NUM],
  ],
  css: [
    ['com', /\/\*[\s\S]*?\*\//],
    ['str', STR_DQ],
    ['str', STR_SQ],
    ['kw', /@[\w-]+/],
    ['prop', /--?[\w-]+(?=\s*:)/],
    ['var', /var\(--[\w-]+\)/],
    ['num', /-?\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr)?\b/],
  ],
  html: [
    ['com', /<!--[\s\S]*?-->/],
    ['tag', /<\/?[\w-]+|\/?>/],
    ['str', STR_DQ],
    ['attr', /[\w:-]+(?==)/],
  ],
  http: [
    ['kw', /^(?:GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b|^HTTP\/[\d.]+/m],
    ['num', /(?<=^HTTP\/[\d.]+ )\d{3}/m],
    ['prop', /^[\w-]+(?=:)/m],
    ['str', STR_DQ],
  ],
  dockerfile: [
    ['com', /(?<=^|\s)#.*/],
    ['kw', /^(?:FROM|WORKDIR|COPY|ADD|RUN|CMD|ENTRYPOINT|ENV|ARG|EXPOSE|USER|VOLUME|LABEL)\b/m],
    ['str', STR_DQ],
    ['attr', /--[\w-]+/],
  ],
  nginx: [
    ['com', /#.*/],
    ['var', /\$\w+/],
    ['kw', /^\s*[\w_]+(?=\s)/m],
    ['str', STR_DQ],
    ['num', NUM],
  ],
};

const ALIASES = {
  py: 'python', python3: 'python',
  javascript: 'js', jsx: 'js', ts: 'js', tsx: 'js', typescript: 'js', mjs: 'js', node: 'js',
  postgres: 'sql', postgresql: 'sql', psql: 'sql',
  sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash', powershell: 'bash', ps1: 'bash', pwsh: 'bash',
  jsonc: 'json', yml: 'yaml', xml: 'html', svg: 'html', docker: 'dockerfile',
};

const compiled = new Map();
function compile(lang) {
  if (compiled.has(lang)) return compiled.get(lang);
  const rules = LANGS[lang];
  const re = rules
    ? new RegExp(rules.map(([, r]) => `(${r.source})`).join('|'), `g${rules.some(([, r]) => r.flags.includes('i')) ? 'i' : ''}m`)
    : null;
  compiled.set(lang, re);
  return re;
}

export const languageOf = (lang) => {
  const key = String(lang || '').toLowerCase().trim();
  return ALIASES[key] || key;
};

export function highlight(code, lang) {
  const name = languageOf(lang);
  const re = compile(name);
  if (!re) return escape(code);
  const rules = LANGS[name];
  let html = '';
  let last = 0;
  re.lastIndex = 0;
  for (const m of code.matchAll(re)) {
    if (!m[0]) continue;
    const group = m.slice(1).findIndex((g) => g !== undefined);
    html += escape(code.slice(last, m.index)) + `<span class="tk-${rules[group][0]}">${escape(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return html + escape(code.slice(last));
}
