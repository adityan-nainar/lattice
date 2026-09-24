// Pure text processing shared by the browser renderer and scripts/check.js.
//
// Math ($...$, $$...$$) and wiki links ([[Title]], [[Title|label]]) are swapped for
// private-use placeholder characters before Markdown parsing, so the Markdown parser
// never mangles LaTeX backslashes, underscores or pipes. Code spans and fenced code
// blocks are left untouched.

const CODE = /(```[\s\S]*?(?:```|$)|~~~[\s\S]*?(?:~~~|$)|`[^`\n]+`)/g;
const DISPLAY_MATH = /\$\$([\s\S]+?)\$\$/g;
const INLINE_MATH = /(^|[^\\$])\$(?![\s$])((?:\\.|[^$\\\n])+?)(?<![\s\\])\$(?!\d)/g;
const WIKILINK = /\[\[([^\[\]\n|]+?)(?:\|([^\[\]\n]+?))?\]\]/g;

export const MARK = {
  inline: ['', ''],
  display: ['', ''],
  link: ['', ''],
};

export function protect(src) {
  const math = [];
  const links = [];
  const parts = String(src ?? '').split(CODE);
  for (let i = 0; i < parts.length; i += 2) {
    parts[i] = parts[i]
      .replace(DISPLAY_MATH, (_, tex) => `${MARK.display[0]}${math.push({ tex: tex.trim(), display: true }) - 1}${MARK.display[1]}`)
      .replace(INLINE_MATH, (_, pre, tex) => `${pre}${MARK.inline[0]}${math.push({ tex, display: false }) - 1}${MARK.inline[1]}`)
      .replace(WIKILINK, (_, target, label) => {
        const n = links.push({ target: target.trim(), label: (label ?? target).trim() }) - 1;
        return `${MARK.link[0]}${n}${MARK.link[1]}`;
      });
  }
  return { text: parts.join(''), math, links };
}

export function wikiTargets(src) {
  return protect(src).links.map((l) => l.target);
}

export function mathSnippets(src) {
  return protect(src).math;
}
