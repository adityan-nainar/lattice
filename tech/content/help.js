// The "How to use Stack" note.

import { AREA, BT, entry, md } from './helpers.js';

export const HELP = entry('how-to-use', 'note', AREA.MISC, 'solid', 'How to use Stack', {
  summary: 'What Stack is, how to wander it, the calculators, the code, and where your notes live.',
  tags: ['help'],
  body: md`
    Stack is a map of the technology behind a modern AI web app — how the web works, React, Flask, Postgres, the maths of machine learning, building with LLMs, running models locally, shipping, and the stories that explain why things are the way they are. It isn't a course: open anything and follow whatever catches your eye.

    Versions, prices and model names are as of **September 2026** (React 19.3, Flask 3.1, PostgreSQL 18 with 19 on the way, pgvector 0.8). This field moves monthly — treat specific model names and prices as examples and check the current docs before relying on them.

    ## Two ways in
    - **Wander**: search anything, follow whatever catches your eye. Nothing is locked.
    - **The main path** (${BT}Path${BT} in the top bar, or press ${BT}p${BT}): one route through about 280 topics in 16 stages — your machine → programming in Python → Git → SQL → the web → HTML/CSS/JS → React → Flask and FastAPI → shipping on Google Cloud → collecting web data → maths → machine learning → transformers → building with LLMs → RAG, graphs and text-to-SQL → local AI. Each step builds only on earlier ones and says **why it comes here**. Press **Got it — next** to mark a step Solid (after a quick say-it-back) and move on; **I know these already** skips a stage you know. Wander off whenever you like — every topic shows where it joins the path, and **Continue** takes you back to your next step. The graph can draw the path as a gold line.

    ## Wandering
    - **Highlights** — other topics mentioned in the text are marked; the ones this topic *builds on* get a yellow marker. Hover or tap to **peek** without leaving the page.
    - **Basics this uses**, **Where this leads** (each with a one-line why) and **Surprising connections** in other areas — the KV cache leads to prompt caching, attention's n² leads to Big-O, Log4Shell leads to prompt injection.
    - **Up next** suggests one more topic; **Connect to…** finds the chain of links between any two.
    - **Graph** shows everything as a universe: each area is a galaxy.

    ## Try it
    Many topics have a calculator: token costs in dollars and rupees, how much memory a model needs, KV cache size, tokens per second from memory bandwidth, Chinchilla scaling, softmax with temperature, B-tree depth, connection pools, bcrypt cracking times. Drag a slider or type a number. **Plot** draws any output against any input. **Guess first** hides the answers until you've committed to a guess.

    Type ${BT}=${BT} in any search box for a quick sum: ${BT}=8*4.8/8${BT}.

    ## Code
    Code examples use the stack you're building with — React with TypeScript, Flask with SQLAlchemy, Postgres with pgvector, the Anthropic SDK and Ollama. They're written to be read and adapted, not pasted blind: check names and versions against the docs.

    ## Your own notes
    - **+ New** for anything: a snippet that worked, an error and its fix, a design decision for the side project.
    - ${BT}[[Title]]${BT} links to another entry; the editor also spots topics you mention and offers to link them.
    - **Questions**: write down whatever you don't get, then copy them all at once to paste into any AI chat, and paste the answers back.
    - Mark topics **Curious → Exploring → Solid** as you go.

    ## Your data
    Everything is saved in ${BT}tech/data/lattice.json${BT}, with daily copies in ${BT}tech/data/backups/${BT}. Export or import from **Settings**. Stack runs on the same engine as Lattice and Ledger but keeps a completely separate library.

    ## On your phone
    Start Stack with ${BT}npm run lan${BT} from the ${BT}tech${BT} folder. The terminal shows an address and an access code; open it on a phone on the same Wi-Fi. Only on a network you trust.

    ## Keyboard
    - ${BT}n${BT} new entry · ${BT}q${BT} jot a question · ${BT}/${BT} search · ${BT}g${BT} graph · ${BT}l${BT} library · ${BT}h${BT} home · ${BT}r${BT} random
    - ${BT}e${BT} edit the entry you're viewing · ${BT}Ctrl${BT} + ${BT}Enter${BT} save · ${BT}Esc${BT} close
  `,
});
