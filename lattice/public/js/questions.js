// Questions you write down while studying. They live with your notes, and the Questions page
// gathers them all so you can copy them in one go and paste them into any AI chat.

import { escapeHtml as esc, renderMarkdown } from './render.js';
import { store } from './store.js';
import { icon } from './ui.js';

export const openQuestions = () => store.questions.filter((q) => !q.asked);

// The order questions were last numbered in, so pasted answers can be matched back to them.
const ORDER_KEY = 'lattice.q.order';
export const rememberOrder = (questions) => {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(questions.map((q) => q.id)));
  } catch {}
};
export const lastOrder = () => {
  try {
    const ids = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]');
    return Array.isArray(ids) ? ids.filter((id) => store.questions.some((q) => q.id === id)) : [];
  } catch {
    return [];
  }
};

// Splits an answer pasted back from a chat into numbered pieces: "3." / "3)" / "**3.**" / "Answer 3:"
// at the start of a line. Returns Map(number -> answer text).
export function splitAnswers(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const found = new Map();
  let current = null;
  let buffer = [];
  const flush = () => {
    if (current !== null) found.set(current, buffer.join('\n').trim());
    buffer = [];
  };
  for (const line of lines) {
    const m = line.match(/^\s{0,3}(?:[*_]{0,2})(?:answer\s*)?(\d{1,3})(?:[*_]{0,2})\s*[.):\-—]\s*(.*)$/i);
    if (m && Number(m[1]) > 0 && Number(m[1]) < 400) {
      flush();
      current = Number(m[1]);
      buffer = [m[2]];
    } else if (current !== null) {
      buffer.push(line);
    }
  }
  flush();
  for (const [n, body] of found) if (!body) found.delete(n);
  return found;
}

// Pairs pasted answers with the questions they belong to, using the numbering from the last copy.
export function matchAnswers(text, { order = lastOrder(), fallback = openQuestions() } = {}) {
  const pieces = splitAnswers(text);
  const ids = order.length ? order : fallback.map((q) => q.id);
  const pairs = [];
  for (const [n, answer] of [...pieces].sort((a, b) => a[0] - b[0])) {
    const id = ids[n - 1];
    const question = id && store.questions.find((q) => q.id === id);
    if (question) pairs.push({ question, answer, number: n });
  }
  return pairs;
}

// The text that goes on the clipboard. Grouped by topic, numbered straight through,
// with each topic's one-line summary for context when asked for.
export function questionsText(questions, { context = true, intro = true } = {}) {
  const groups = new Map();
  for (const q of questions) {
    const key = q.entry || '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }
  // Questions not about any one topic go last.
  if (groups.has('')) {
    const general = groups.get('');
    groups.delete('');
    groups.set('', general);
  }
  const parts = [];
  if (intro) {
    parts.push(
      'I am studying physics and maths. Here are my questions, grouped by topic.\n' +
        'Please answer each one by its number: the idea first in plain words, then the maths where it helps.',
    );
  }
  let n = 0;
  for (const [id, items] of groups) {
    const entry = id && store.entry(id);
    const lines = items.map((q) => `${++n}. ${q.text}`);
    if (!entry) {
      parts.push(['## Not about a particular topic', ...lines].join('\n'));
      continue;
    }
    const head = [`## ${entry.title}`];
    if (context && entry.summary) head.push(`(${entry.summary})`);
    if (context && entry.latex) head.push(`Key formula: $${entry.latex}$`);
    parts.push([...head, ...lines].join('\n'));
  }
  return parts.join('\n\n');
}

// navigator.clipboard needs a secure page, which http://192.168… on a phone is not.
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.append(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

// How many questions about a topic are still waiting for an answer.
export const openCount = (entryId) => store.questionsFor(entryId).filter((q) => !q.asked).length;

// The little marker that says "you got stuck here".
export function stuckMark(entryId, { label = false } = {}) {
  const n = openCount(entryId);
  if (!n) return '';
  return `<span class="stuck" title="${n} question${n === 1 ? '' : 's'} of yours still open">${icon('question')}${label ? `<span>${n} question${n === 1 ? '' : 's'}</span>` : n}</span>`;
}

export function questionItemHtml(q, { topic = false } = {}) {
  const entry = q.entry && store.entry(q.entry);
  return `
    <li class="q-item${q.asked ? ' asked' : ''}${q.answer ? ' answered' : ''}" data-q="${esc(q.id)}">
      <button type="button" class="q-check" data-q-act="toggle" aria-pressed="${q.asked}" title="${q.asked ? 'Put back on the list' : 'Mark as asked'}">${icon('check')}</button>
      <div class="q-body">
        <p class="q-text" data-q-act="edit" role="button" tabindex="0" title="Click to edit">${esc(q.text)}</p>
        ${topic && entry ? `<a class="q-topic" href="#/entry/${encodeURIComponent(entry.id)}">${esc(entry.title)}</a>` : ''}
        ${
          q.answer
            ? `<details class="q-answer"><summary>Answer</summary><div class="prose">${renderMarkdown(q.answer, (t) => store.resolve(t))}</div>
                 ${entry ? `<button type="button" class="link-btn" data-q-act="to-notes">Add to ${esc(entry.title)}'s notes</button>` : ''}
               </details>`
            : ''
        }
      </div>
      <button type="button" class="icon-btn q-del" data-q-act="delete" title="Delete" aria-label="Delete question">${icon('trash')}</button>
    </li>`;
}

// The box shown on a topic: its own questions, and a line to add another.
export function topicQuestionsHtml(entry) {
  const mine = store.questionsFor(entry.id);
  const open = mine.filter((q) => !q.asked);
  return `
    <div class="q-box" data-questions="${esc(entry.id)}">
      <ul class="q-list">${[...open, ...mine.filter((q) => q.asked)].map((q) => questionItemHtml(q)).join('')}</ul>
      <form class="q-add" data-q-add>
        <input type="text" name="text" placeholder="Something you don't get? Write it down…" autocomplete="off" aria-label="Add a question about ${esc(entry.title)}">
        <button type="submit" class="btn btn-sm">${icon('plus')} Add</button>
      </form>
      <p class="q-hint">${mine.length ? `<a href="#/questions">All questions${openQuestions().length ? ` · ${openQuestions().length} open` : ''}</a> — copy them together for an AI.` : 'They collect on the Questions page, ready to copy into an AI.'}</p>
    </div>`;
}

// The topic you are looking at right now, for quick capture.
export function topicInView() {
  const hash = location.hash || '';
  const entry = hash.match(/#\/entry\/([^?]+)/) || hash.match(/#\/\?t=([^&]+)/);
  return entry ? store.entry(decodeURIComponent(entry[1])) || null : null;
}

// Wires up every question box inside `root` (events are delegated, so boxes can redraw themselves).
// onChange runs after any change, for whatever else shows a question count.
export function mountQuestions(root, { onChange } = {}) {
  const boxOf = (el) => el.closest('[data-questions]');
  const redraw = (entryId, focus = false) => {
    const box = root.querySelector(`[data-questions="${CSS.escape(entryId)}"]`);
    const entry = store.entry(entryId);
    if (box && entry) box.outerHTML = topicQuestionsHtml(entry);
    onChange?.();
    if (focus) root.querySelector(`[data-questions="${CSS.escape(entryId)}"] [name="text"]`)?.focus();
  };
  root.addEventListener('submit', async (ev) => {
    const form = ev.target.closest('[data-q-add]');
    const box = form && boxOf(form);
    if (!box) return;
    ev.preventDefault();
    const input = form.elements.text;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    await store.createQuestion({ entry: box.dataset.questions, text });
    redraw(box.dataset.questions, true);
  });
  root.addEventListener('click', (ev) => {
    const box = boxOf(ev.target);
    if (box) handleItemClick(ev, () => redraw(box.dataset.questions));
  });
  root.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.matches?.('[data-q-act="edit"]') && boxOf(ev.target)) {
      ev.preventDefault();
      ev.target.click();
    }
  });
}

// Shared by the topic box and the Questions page: tick, edit in place, delete.
export async function handleItemClick(ev, redraw) {
  const item = ev.target.closest('[data-q]');
  const act = ev.target.closest('[data-q-act]')?.dataset.qAct;
  if (!item || !act) return;
  const id = item.dataset.q;
  const question = store.questions.find((q) => q.id === id);
  if (!question) return;
  if (act === 'toggle') {
    await store.updateQuestion(id, { asked: !question.asked });
    redraw();
  } else if (act === 'delete') {
    await store.deleteQuestion(id);
    redraw();
  } else if (act === 'to-notes') {
    const entry = store.entry(question.entry);
    if (!entry) return;
    const block = `\n\n## ${question.text}\n\n${question.answer}\n`;
    await store.updateEntry(entry.id, { body: entry.body + block });
    redraw({ savedToNotes: entry.title });
  } else if (act === 'edit') {
    const p = ev.target.closest('.q-text');
    if (!p || p.querySelector('input')) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'q-edit';
    input.value = question.text;
    p.replaceWith(input);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    const save = async () => {
      const text = input.value.trim();
      if (text && text !== question.text) await store.updateQuestion(id, { text });
      redraw();
    };
    input.addEventListener('blur', save, { once: true });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
      if (e.key === 'Escape') {
        input.removeEventListener('blur', save);
        redraw();
      }
    });
  }
}
