# Lattice

A personal knowledge lattice: concepts, theories, equations and worked examples, and the
connections between them. Made for wandering, not studying: open any topic, and the
basics it uses are highlighted as you read, every connection says *why* it's interesting,
and surprising links into other areas show up at the bottom.

Starts with notes on the Monster group and moonshine, vertex operator algebras,
Bose–Einstein condensates, superfluids, superposition, and time dilation — plus ~90
foundation topics underneath them (complex numbers, modular forms, the harmonic
oscillator, curvature, QFT, CFT…) and ~45 rabbit holes branching off (neutron stars,
superconductivity, Hawking radiation, the Higgs, E₈, the Riemann hypothesis, why the sky
is blue…), big open puzzles (why 1/137? why three dimensions? why is gravity so weak?),
about 50 playable calculators and videos for most topics. Then it grows with whatever you add.

## Run

Needs Node 20+.

```sh
npm install      # first time only
npm start        # http://localhost:4321
```

Or double-click `Lattice.cmd` — it starts the server and opens the browser.

### On your phone

```sh
npm run lan      # also reachable from other devices on your network
```

The terminal prints an address like `http://192.168.1.20:4321` and a 6-character access
code. Open the address on a phone on the same Wi-Fi and enter the code once; the phone then
gets a session cookie. Set your own code with `LATTICE_PIN`. Five wrong codes lock that
device out for a minute, and restarting the server signs every device out.

**Only use this on a network you trust.** Traffic is plain HTTP, and anyone with the code
can read and edit your notes. Windows may ask whether Node.js may accept connections on
the network — that's needed for LAN mode. Plain `npm start` never listens beyond this computer.

`npm run check` validates the starter content: every formula parses, every `[[link]]`
resolves, no two entries claim the same name, no circular "builds on" chains. It also
reports how many links explain themselves and how many topics are spotted per entry.
It runs every calculator at its defaults (and at its slider ends) and checks video links.
`npm run check -- --data` does the same for your own notes; add `--calcs` to print
every calculator's default numbers.

### Content packs

`content/` holds content packs. To add one to an existing library without touching
anything already there, with the server running:

```sh
npm run merge -- content/foundations.js --dry-run   # show what would be added
npm run merge -- content/foundations.js
npm run merge -- content/connections.js
npm run merge -- content/expansion.js
npm run merge -- content/deeper.js       # puzzles, quantum↔gravity bridges, more Monster
npm run merge -- content/playground.js   # calculators for existing equations
npm run merge -- content/videos.js       # videos for existing topics
npm run merge -- content/dates.js        # years, for the timeline
```

Entries are matched by title and links by endpoints and kind. Link notes, alias lists,
calculators, videos and years are only filled in where they're still empty, so your edits are
never overwritten and re-running is safe.

## Using it

**Reading and wandering**
- **Explore** (the start page): type a topic, pick it, and you get its **basics first**, then
  **what it connects to** (each with a one-line why), then a few **further afield** leaps.
  Click any of them to explore that one instead; Back retraces your steps.
- **Map** (beside the topic on wide screens): the topic in the middle, what it links to directly
  on a ring around it, and topics two steps away on an outer ring next to the link that leads
  there. Click any of them to explore it.
- **Highlights**: other topics mentioned in an entry's text are marked. Topics it
  *builds on* get a yellow marker-pen highlight — the basics worth knowing. Anything you've
  marked solid goes quiet.
- **Peek**: hover (or tap) a highlight, a basic, a connection or a trail step to see what it
  is, why it's connected here and its formula, and to mark how well you know it.
- **Basics this uses**: chips under the summary.
- **Where this leads**: connection cards at the bottom, each with a one-line "why".
- **Surprising connections**: topics in other areas reached through one shared idea
  (BEC critical temperature → *via* the Riemann zeta function → the dimension of string theory).
- **Your trail**: the chain of topics you followed, shown at the top of each topic's notes.
- **Try it**: equations with a calculator get sliders and live numbers — GPS clock drift,
  the muon's travel distance, a BEC's critical temperature, the Casimir pressure, what
  happens to atoms if the electron's charge doubles…
- **Watch**: videos on the topic (3Blue1Brown, PBS Space Time, Numberphile, Veritasium…),
  opening on YouTube.
- **Plot**: inside Try it, draw any output against any input as a curve — the Planck peak against
  temperature, GPS drift against orbit height. The dot shows where the sliders are.
- **Quick sums**: type `=` in any search box — `=sqrt(hbar*c/G)` gives the Planck mass — with all
  the constants available. Enter copies the answer.
- **Search shows the line it matched**, with your words marked, so you can find a half-remembered
  sentence rather than just a title.
- **Timeline**: every dated topic in order, from Kepler's sphere packing (1611) to ER = EPR (2013),
  filterable by area. Add a year to any entry in the editor and it appears there.
- **Equation sheet**: every formula in one place, grouped by area, with the symbols explained —
  made to read or print.
- **Up next**: one suggested topic at the bottom of every page — connected to this one, not
  something you just read or already know, preferring a leap into another area.
- **How are these connected?** (**Connect to…** on a topic, or from search): pick two topics
  and get the shortest chain of links between them, plus a couple of other routes, with the
  reason for every step.

**Practising instead of rereading**

Built on the learning research (Dunlosky et al. 2013 and related work): rereading and highlighting
feel productive but do little; recalling, predicting, explaining and comparing are what make
things stick. None of this is a quiz or a schedule — each is something you switch on while reading.
- **Guess first** (in Try it): the answers stay hidden until you've typed a guess and pressed
  Reveal; you're told how far off you were. Moving a slider asks for a fresh guess.
- **Practise** on any topic opens a strip of tools:
  - **Explain it back** — write it in your own words with the notes blurred, then compare. Your
    latest explanation shows above the notes from then on, with earlier versions kept.
  - **Cover the formula** — recall it from the symbols, then reveal and say how you did.
  - **Fill the gaps** — a few bold terms and numbers in the notes become blanks to fill in.
  - **Fade the steps** (worked examples) — hide the last step, then the last two, and work them out.
- **Guess the reasons** (on Explore): hide every "why" in the lists and reveal them one at a time.
- **Compare** two topics side by side, writing down what's the same underneath before the library
  shows what they actually share.
- **Mix it up**: five quick tasks from different areas — a guess, a formula, a reason, an
  explanation — then a list of what's worth another look.
- **Coming back**: open a topic after two weeks or more and it asks whether you can still recall
  it before you reread; Up next quietly favours topics you haven't opened in a while.
- **Before marking something Solid**, it asks for a sentence from memory (Skip always works), and
  a topic you've opened many times without writing or trying anything says so, quietly.
- The **Equation sheet** has **Cover them all**: tap a formula to reveal it.

**Questions**
- On any topic, **Questions** (on Explore) or **Your questions** (beside the notes): write down
  whatever you don't get while you read.
- **Paste the answers back**: paste the AI's whole reply into the Questions page and each
  numbered answer is matched to the question it belongs to. Keep the ones you want, and add any
  of them into the topic's notes with one click.
- Topics you have open questions about are marked everywhere — in lists, in the Library, on the
  small map and in the 3D graph — so you can see where you got stuck.
- The **Questions** page gathers them from every topic. **Copy** puts them all on the
  clipboard as one message — grouped by topic, numbered, with each topic's summary and
  formula for context — ready to paste into any AI chat. Then **Mark all as asked** (or tick
  them one by one); asked ones move to the *Asked* tab.

**Writing**
- **Entries** have a type (concept, theory, equation, example, question, note), an
  area, a status (curious → exploring → solid), other names ("Also called"), tags,
  sources, a Markdown body, and optionally a formula with its symbols explained.
- **Math**: `$inline$` and `$$display$$` anywhere in Markdown, rendered with KaTeX.
- **Wiki links**: `[[Title]]`, `[[alias]]` or `[[Title|label]]`. Type `[[` in the editor for
  suggestions. Links to entries that don't exist yet show dashed; click to create.
- **Typed links**: builds on, describes, example of, derived from, special case of,
  part of, explains, related to, same idea as, in tension with — each with an optional
  note saying why. *Builds on*, *derived from* and *part of* define what counts as a basic.
- **+ Example** on an entry creates a worked example already linked to it.
- **Link suggestions**: while you write, the editor spots topics you mention and offers
  to link each one as a *Basic* (builds on) or *Related* in one click.
- **Calculator** (optional, in the editor): JSON with `inputs` (key, label, unit, value,
  min, max, plus `log` or `integer`) and `outputs` (label, unit, `expr`, plus `key`,
  `prefix`, `digits`). Expressions support `+ - * / ^`, `sqrt exp ln log10 sin cos
  zeta min max if`… and constants `c G h hbar kB qe eV me mp mn u NA eps0 Msun Mearth
  Rearth AU ly yr`…. They're parsed by a small safe evaluator, never run as code.
- **Videos**: YouTube links, one per line, optionally followed by a title.
- **Year** (optional): when the idea turned up, which puts the entry on the timeline.
- **History**: every edit keeps the previous version (the last 12). **History** on an entry shows
  them and puts any one back; restoring is itself undoable.
- **Loose ends** (from the Library): what's half-finished — topics with no notes, no summary or no
  links, `[[links]]` pointing at nothing, connections with no reason written, and open questions.
- **Pictures**: **Add a picture**, paste a screenshot, or drop an image into the notes (on a
  phone, the picker offers the camera — handy for handwritten derivations). PNG, JPEG, GIF or
  WebP, up to 10 MB.

**Elsewhere**
- **Graph**: the whole library as a 3D universe — areas are galaxies, entries are stars, links
  are threads of light. Drag to orbit, right-drag (or Shift-drag) to pan, scroll to zoom, click a
  star to light up its connections, double-click to open it. **2D** switches to the flat map.
  Filter by area/type, or focus on one entry and its 1–3 step neighbourhood.
- **+ New** in the top bar for anything random you want to jot down.

Keyboard: `/` search (on Explore it jumps to the search box) · `Ctrl K` jump anywhere ·
`n` new · `q` jot a question about whatever you're reading · `e` edit ·
`h` `l` `g` explore/library/graph · `r` random · `Ctrl Enter` save · `Esc` cancel.

## Data

All data is one JSON file: `data/lattice.json` (created from `seed.js` on first run).
Writes are atomic; a daily copy goes to `data/backups/` (30 kept) and another before
every import. Export/import from **Settings** (that file holds your notes, links and questions).
Pictures are kept in `data/images/` and earlier versions of entries in `data/history.json`;
neither is inside the export file — copy those too if you move your library. Your explanations
are part of the library itself. `data/study.json` is a small log of when you opened each topic and
how your guesses and recall went; it drives the "coming back" nudges and can be deleted any time. The trail and the highlight setting live in the browser only.

To start completely fresh, stop the server and delete `data/lattice.json` — it will be
recreated from `seed.js`. To start empty instead, import a file containing
`{"areas": [], "entries": [], "links": []}`.

Environment: `PORT` (default 4321), `LATTICE_DATA` (data folder, default `./data`),
`LATTICE_PIN` (access code for `npm run lan`). The server only listens on 127.0.0.1
unless started with `--lan`.

The same engine can run a separate library: `LATTICE_NAME` (the app's name), `LATTICE_SEED`
(its starter content), `LATTICE_THEME` (an extra stylesheet) and `LATTICE_DATA`. `../finance`
(Ledger) is one — see its `env.js`. Calculators also know `ncdf`, `npdf` and `ninv` (the normal
distribution), and outputs with the unit `₹` show in lakh and crore.

## Layout

```
server.js             HTTP server + JSON API + validation + backups (Node built-ins only)
seed.js               starter content (core topics + the packs below)
public/index.html     app shell
public/app.css        styles (dark + light)
public/js/app.js      router and views: home, library, entry, editor, graph, settings
public/js/explore.js  highlights, peek, trail, "where this leads", surprising connections
public/js/tryit.js    "Try it" calculator cards and "Watch" video lists
public/js/calc.js     safe expression evaluator, constants, number formatting (shared)
public/js/media.js    YouTube link parsing           (shared with the server and check)
public/js/ui.js       small shared HTML helpers
public/js/store.js    API client, indexes, search
public/js/graph.js    force-directed SVG graph (flat Graph view, and the Explore map)
public/js/universe.js 3D universe Graph view (canvas, no WebGL or libraries)
public/js/topicmap.js layout of the Explore map: rings, spacing, label collisions
public/js/questions.js questions you write while studying, and the text copied for an AI
public/js/practice.js  guessing, covering, gaps, faded steps, explanations, mixed sessions
public/js/render.js   Markdown + KaTeX + [[wiki links]]
public/js/markup.js   math/link extraction          (shared with scripts/check.js)
public/js/terms.js    spotting entry names in text   (shared with scripts/check.js)
public/js/paths.js    what an entry builds on        (shared with scripts/check.js)
public/js/schema.js   entry types, statuses, link kinds (shared with the server)
content/              content packs: foundations, connections (aliases + notes), expansion (more
                      rabbit holes), deeper (puzzles, bridges, Monster), playground (calculators),
                      videos (checked YouTube links)
scripts/check.js      content validator
scripts/merge.js      add a content pack to a running library
```

Dependencies (served locally, so it works offline): KaTeX, marked, DOMPurify.
