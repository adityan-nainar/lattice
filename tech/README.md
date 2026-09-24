# Stack

The technology behind a modern AI web app — made for wandering, and for learning properly when you
want to. Computing and maths basics, how the web works, React, Flask and FastAPI backends (with
roles, sessions and audit trails), Postgres (with pgvector), Google Cloud (Cloud Run, Jobs, Cloud
SQL, Storage, IAM), collecting web data (crawling, Playwright, entity resolution, worker pools),
the maths of machine learning (vectors to transformers to scaling laws), building with LLMs
(tokens, RAG, GraphRAG, text-to-SQL, tool use, agents, evals, prompt injection), running models
locally (Ollama, llama.cpp, GGUF, quantisation, KV cache), tools and shipping, CS fundamentals,
and the stories that explain why things are the way they are.

337 topics, 764 links (each with a one-line "why"), 66 playable calculators, code examples with
syntax colouring and a copy button, a timeline from Turing (1950) to DeepSeek-R1 (2025), and a
**main path**: 284 steps in 16 stages, each building only on earlier ones, from "how a computer
runs code" to local AI. Wander off anywhere; every topic shows where it joins the path.

Versions and prices are as of **September 2026**: React 19.3, Flask 3.1, PostgreSQL 18 (19 due
around October), pgvector 0.8, Node 24 LTS. Model names and prices change monthly — treat them as
examples and check the docs.

## Run

Needs Node 20.6+ and the Lattice engine next door (`../lattice`, with its `npm install` done).

```sh
npm start        # http://localhost:4323
```

Or double-click `Stack.cmd` — it installs the engine's dependencies if needed, starts the server
and opens the browser. `npm run lan` opens it to your phone on the same Wi-Fi, behind an access
code (same as Lattice).

`npm run check` validates the starter content (formulas, links, aliases, calculators);
`npm run check -- --data` checks your live notes; add `--calcs` to print every calculator's
default numbers.

## How it's built

Stack is a third library on the **Lattice engine**, like Ledger:

```
env.js           sets LATTICE_NAME, LATTICE_SEED, LATTICE_THEME, LATTICE_DATA, PORT (4323)
seed.js          starter content, written to data/lattice.json on first run
theme.css        amber accent over the Lattice styles
content/         one file per area, plus links.js and help.js
data/            your library (created on first run), backups, pictures, history
```

After the first run `data/lattice.json` is the source of truth — edit in the app. To add a batch
of new topics, write a content pack (same shape as `seed.js`: areas, entries, links) and, with
Stack running, `npm run merge -- path/to/pack.js`.

## Writing content

`content/helpers.js` has a `doc` tag for code-heavy notes: `§like this§` becomes inline code,
`\${` becomes `${` (JavaScript template strings), and fenced blocks use `~~~lang` fences. Write
dollar amounts as `\$5` so they aren't read as maths. Code blocks are coloured by
`../lattice/public/js/highlight.js` (python, js/jsx/ts, sql, bash/powershell, json, yaml, css,
html, http, dockerfile, nginx).

Calculator input keys can't reuse the engine's constant or function names (`c`, `h`, `u`, `G`,
`pi`, `yr`, `day`, `log`, `exp`…); `c` (speed of light) and `yr`/`day` are handy in expressions.
