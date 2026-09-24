import katex from '/vendor/katex/katex.mjs';
import { marked } from '/vendor/marked.js';
import DOMPurify from '/vendor/purify.js';

import { highlight, languageOf } from './highlight.js';
import { MARK, protect } from './markup.js';

// Fenced code blocks get syntax colouring, a language label and a copy button.
marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    code({ text, lang }) {
      const name = String(lang || '').trim().split(/\s+/)[0];
      const label = name ? `<span class="code-lang">${escapeHtml(name)}</span>` : '';
      return (
        `<div class="code-wrap"><div class="code-tools">${label}` +
        `<button type="button" class="code-copy" aria-label="Copy code">Copy</button></div>` +
        `<pre><code class="language-${escapeHtml(languageOf(name) || 'text')}">${highlight(text.replace(/\n$/, ''), name)}</code></pre></div>\n`
      );
    },
  },
});

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'IMG') node.setAttribute('loading', 'lazy');
  if (node.tagName === 'A' && /^https?:/i.test(node.getAttribute('href') || '')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

const texCache = new Map();

export function renderTex(tex, display = false) {
  const key = `${display ? 'D' : 'I'}${tex}`;
  let html = texCache.get(key);
  if (html === undefined) {
    html = katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: 'ignore',
      output: 'htmlAndMathml',
    });
    if (texCache.size > 3000) texCache.clear();
    texCache.set(key, html);
  }
  return html;
}

export const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// resolve(target) -> { id, title } | null. linkify=false renders wiki links as plain text
// (for places already inside an <a>, like list rows).
function finish(html, math, links, resolve, linkify = true) {
  const [di, dj] = MARK.display;
  const [ii, ij] = MARK.inline;
  const [li, lj] = MARK.link;
  return DOMPurify.sanitize(html)
    .replace(new RegExp(`<p>${di}(\\d+)${dj}</p>`, 'g'), (_, i) => renderTex(math[i].tex, true))
    .replace(new RegExp(`${di}(\\d+)${dj}`, 'g'), (_, i) => renderTex(math[i].tex, true))
    .replace(new RegExp(`${ii}(\\d+)${ij}`, 'g'), (_, i) => renderTex(math[i].tex, false))
    .replace(new RegExp(`${li}(\\d+)${lj}`, 'g'), (_, i) => {
      const { target, label } = links[i];
      if (!linkify) return `<span class="wikilink-plain">${escapeHtml(label)}</span>`;
      const hit = resolve?.(target);
      return hit
        ? `<a class="wikilink" href="#/entry/${encodeURIComponent(hit.id)}" title="${escapeHtml(hit.title)}">${escapeHtml(label)}</a>`
        : `<a class="wikilink missing" href="#/new?title=${encodeURIComponent(target)}" title="Create “${escapeHtml(target)}”">${escapeHtml(label)}</a>`;
    });
}

export function renderMarkdown(src, resolve) {
  const { text, math, links } = protect(src);
  return finish(marked.parse(text), math, links, resolve);
}

export function renderInline(src, resolve, { linkify = true } = {}) {
  const { text, math, links } = protect(src);
  return finish(marked.parseInline(text), math, links, resolve, linkify);
}
