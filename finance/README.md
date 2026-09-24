# Ledger

Money, markets and the maths underneath — made for wandering, not studying. Personal finance
with Indian rules and numbers (SIPs, PPF, EPF, NPS, tax regimes, EMIs, insurance), markets and
investing, quant finance (random walks to Black–Scholes, Kelly, ergodicity, fat tails), the economy
(inflation, the RBI, money creation, the rupee) and the crises that taught the lessons (1991,
Harshad Mehta, 2008, Satyam, IL&FS, SVB…).

159 topics, 355 links (each with a one-line "why"), 64 playable calculators, and a timeline
from double-entry bookkeeping (1494) to SVB (2023).

Rules, rates and limits are as of **September 2026** (tax year 2026-27): repo rate 5.25%, PPF 7.1%,
EPF 8.25%, new-regime slabs unchanged by Budget 2026, STT raised on F&O from April 2026. They
change with every Budget and RBI meeting. Ledger explains how things work; it isn't advice.

## Run

Needs Node 20.6+ and the Lattice engine next door (`../lattice`, with its `npm install` done).

```sh
npm start        # http://localhost:4322
```

Or double-click `Ledger.cmd` — it installs the engine's dependencies if needed, starts the
server and opens the browser. `npm run lan` opens it to your phone on the same Wi-Fi, behind an
access code (same as Lattice).

`npm run check` validates the starter content (formulas, links, aliases, calculators);
`npm run check -- --data` checks your live notes; add `--calcs` to print every calculator's
default numbers.

## How it's built

Ledger is a second library on the **Lattice engine** — the same app, run with its own name,
starter content, colours and data:

```
env.js           sets LATTICE_NAME, LATTICE_SEED, LATTICE_THEME, LATTICE_DATA, PORT (4322)
seed.js          starter content, written to data/lattice.json on first run
theme.css        green accent over the Lattice styles
content/         the content, one file per area, plus links.js and help.js
data/            your library (created on first run), backups, pictures, history
```

Every script is the Lattice one, loaded with `node --import ./env.js`. Improvements to the engine
show up in both apps; your physics notes and your finance notes never mix (different data folder,
different port, different browser storage).

After the first run `data/lattice.json` is the source of truth — edit in the app. To add a batch
of new topics to an existing library, write a content pack (same shape as `seed.js`: areas,
entries, links) and, with Ledger running, `npm run merge -- path/to/pack.js`.

## Calculators

Rupee amounts use the unit `₹` (or `₹ a month`, `₹ a year`…) and show in lakh and crore; number
boxes accept `12 lakh`, `1.5cr`, `50k` or `12,00,000`. Expressions can use `ncdf` / `npdf` / `ninv`
(the normal distribution and its inverse) for option pricing and Value at Risk, and `if`, `min`,
`max` for tax slabs. Input keys can't reuse Lattice's constant names (`c`, `h`, `u`, `pi`, `G`,
`yr`, `day`…).
