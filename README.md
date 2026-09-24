# Lattice

A personal knowledge app for wandering between connected topics — and three libraries that run on it.

| Folder | Library | What's in it | Port |
|---|---|---|---|
| `lattice/` | **Lattice** — the engine, plus a physics and maths library | moonshine, vertex algebras, BECs, superfluids, relativity and their foundations | 4321 |
| `finance/` | **Ledger** | personal money in India, markets, quant finance, the economy, crises | 4322 |
| `tech/` | **Stack** | computing basics, the web, React, Flask and FastAPI, Postgres, Google Cloud, web-data pipelines, ML maths, LLMs, RAG, local AI — with a main learning path | 4323 |

Each topic is a note with links to the topics it builds on and leads to (every link says why), term highlights and peeks, "Try it" calculators, an equation sheet, a timeline, a graph, and a place to jot questions for an AI. Stack also has an optional **main path**: one ordered route through the library that you can follow, wander off, and return to.

## Run

Needs Node 20.6+.

```sh
cd lattice && npm install      # once: the engine's dependencies
npm start                      # Lattice on http://localhost:4321

cd ../finance && npm start     # Ledger on http://localhost:4322
cd ../tech && npm start        # Stack  on http://localhost:4323
```

On Windows, double-click `lattice/Lattice.cmd`, `finance/Ledger.cmd` or `tech/Stack.cmd`.

Each library writes its starter content to its own `data/` folder on first run; after that the data file is the source of truth. `data/` folders hold personal notes and are not tracked. `npm run check` in any folder validates its content (formulas, links, aliases, calculators, and the main path where there is one).

## Layout

Ledger and Stack are not copies of the engine: each has an `env.js` that points the Lattice server at its own name, starter content (`seed.js` + `content/`), theme and data folder. Engine changes in `lattice/` apply to all three.

`tech/private/` (not tracked) can hold extra topics built from private documents; `tech/seed.js` loads it only when it exists.
