// Helpers for Stack's content: the Lattice ones, plus a year on each entry and short
// builders for "Try it" calculators.

import { BT, entry as latticeEntry, md } from '../../lattice/content/helpers.js';

export { BT, md };

// Three backticks, for fenced code blocks inside md`` templates.
export const FENCE = BT.repeat(3);

// Same shape as a Lattice entry, with an optional year for the timeline.
export const entry = (id, type, area, status, title, fields = {}) => ({
  ...latticeEntry(id, type, area, status, title, fields),
  year: fields.year ?? null,
  videos: [],
});

// Calculator pieces.
export const input = (key, label, unit, value, min, max, extra = {}) => ({ key, label, unit, value, min, max, ...extra });
export const out = (label, unit, expr, extra = {}) => ({ label, unit, expr, ...extra });
export const LOG = { log: true };
export const INT = { integer: true };

export const AREA = {
  COMP: 'computing',
  MATHS: 'maths',
  WEB: 'web',
  FRONT: 'frontend',
  BACK: 'backend',
  DATA: 'postgres',
  ML: 'ml',
  LLM: 'llm-apps',
  LOCAL: 'local-ai',
  SHIP: 'shipping',
  CS: 'cs',
  PIPE: 'web-data',
  STORIES: 'stories',
  MISC: 'miscellany',
};

export const AREAS = [
  {
    id: AREA.COMP,
    name: 'Computing Basics',
    color: '#f48fb1',
    description: 'How a computer runs code, files and paths, and the ideas every language shares: variables, loops, functions, data structures, objects, errors and modules.',
  },
  {
    id: AREA.WEB,
    name: 'How the Web Works',
    color: '#4f9ee8',
    description: 'What happens between typing a URL and seeing a page: DNS, TCP, TLS, HTTP, HTML, CSS, JavaScript, JSON, cookies, CORS and caching.',
  },
  {
    id: AREA.FRONT,
    name: 'React & the Frontend',
    color: '#5cc8e0',
    description: 'Components, props and state, hooks, rendering, forms, fetching data, routing, TypeScript, Vite and styling — the browser half of the app.',
  },
  {
    id: AREA.BACK,
    name: 'Python Backend: Flask & FastAPI',
    color: '#7cc56f',
    description: 'Python for servers: Flask and FastAPI routes, async with Uvicorn, JSON APIs, SQLAlchemy (sync and async), validation, auth, roles and audit trails, uploads, background jobs and streaming.',
  },
  {
    id: AREA.DATA,
    name: 'Postgres & Data',
    color: '#2bb3a3',
    description: 'Tables, keys and constraints, indexes, query plans, transactions and MVCC, JSONB, full-text search, pgvector, pooling and migrations.',
  },
  {
    id: AREA.MATHS,
    name: 'Maths & Stats for AI',
    color: '#a1887f',
    description: 'Just the maths machine learning uses: functions, exponents and logs, derivatives and the chain rule, vectors and matrices, probability, spread and confidence.',
  },
  {
    id: AREA.ML,
    name: 'AI & ML Foundations',
    color: '#8b7cf6',
    description: 'Vectors, loss, gradient descent, backpropagation, neural networks, embeddings, attention and transformers, training, scaling laws and fine-tuning — with the equations.',
  },
  {
    id: AREA.LLM,
    name: 'Building with LLMs',
    color: '#d07fd8',
    description: 'Calling a model from code: tokens and cost, context windows, prompting, structured output, tool use, RAG, agents, MCP, evals and prompt injection.',
  },
  {
    id: AREA.LOCAL,
    name: 'Local AI',
    color: '#e0697a',
    description: 'Running models on your own machine: Ollama, llama.cpp, GGUF, quantization, VRAM and KV cache sums, tokens per second, local embeddings.',
  },
  {
    id: AREA.SHIP,
    name: 'Tools & Shipping',
    color: '#e0a33a',
    description: 'Terminal, Git and GitHub, environment variables and secrets, Docker, testing, CI/CD, reverse proxies, deploying and keeping it running.',
  },
  {
    id: AREA.CS,
    name: 'CS Fundamentals',
    color: '#c9b458',
    description: 'The ideas under everything: Big-O, hash maps, trees, recursion, concurrency and async, bits and floating point, hashing, caching and latency.',
  },
  {
    id: AREA.PIPE,
    name: 'Web Data & Pipelines',
    color: '#5c7cfa',
    description: 'Crawling sites, parsing HTML, headless browsers, search APIs, cleaning spreadsheets, matching records to the right company, scoring, and running it all with workers that stop safely.',
  },
  {
    id: AREA.STORIES,
    name: 'Stories & Turning Points',
    color: '#e5845a',
    description: 'The web’s birth, JavaScript in ten days, left-pad, Heartbleed, AlexNet, “Attention Is All You Need”, ChatGPT, llama.cpp — each one a lesson.',
  },
  {
    id: AREA.MISC,
    name: 'Miscellany',
    color: '#8a93a6',
    description: 'Random other stuff. Anything that does not have a home yet.',
  },
];

// md, plus two conveniences for code-heavy notes: § becomes a backtick (so inline code reads
// §like this§ instead of ${BT}like this${BT}), and \${ becomes ${ (JavaScript template strings
// inside code blocks). Fenced code blocks use ~~~ fences.
export function doc(strings, ...values) {
  return md(strings, ...values).replace(/§/g, '`').split('\\${').join('${');
}
