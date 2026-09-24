// The "How to use Ledger" note.

import { AREA, BT, entry, md } from './helpers.js';

export const HELP = entry('how-to-use', 'note', AREA.MISC, 'solid', 'How to use Ledger', {
  summary: 'What Ledger is, how to wander it, the calculators, and where your notes live.',
  tags: ['help'],
  body: md`
    Ledger is a map of money — personal finance in India, markets, the maths underneath, the economy, and the crises that taught us the lessons. It isn't a course: open anything and follow whatever catches your eye.

    **Not advice.** Ledger explains how things work, with real numbers. It can't know your situation, and it isn't a registered adviser. Tax rules, rates and limits here are as of **September 2026** (tax year 2026-27); they change with every Budget and RBI meeting, so check before acting.

    ## Wandering
    - **Highlights** — other topics mentioned in the text are marked; the ones this topic *builds on* get a yellow marker. Hover or tap to **peek** without leaving the page.
    - **Basics this uses**, **Where this leads** (each with a one-line why) and **Surprising connections** in other areas — PPF leads to compounding, compounding to Bernoulli's discovery of *e*, and *e* to Black–Scholes.
    - **Up next** at the bottom suggests one more topic; **Connect to…** finds the chain of links between any two.
    - **Graph** shows everything as a universe: each area is a galaxy.

    ## Try it
    Most equations and many concepts have a calculator: drag a slider or type a number. Rupee amounts show in lakh and crore, and you can type them that way too — ${BT}12 lakh${BT}, ${BT}1.5cr${BT}, ${BT}50k${BT}. **Plot** draws any output against any input (SIP value against years, bond price against yield). **Guess first** hides the answers until you've committed to a guess — predicting first is what makes numbers stick.

    Type ${BT}=${BT} in any search box for a quick sum: ${BT}=100000*1.12^20${BT}.

    ## Crises & Stories
    Every crash is a concept in action: LTCM is leverage and fat tails; SVB is duration; Satyam is double-entry bookkeeping gamed. Start from a story and follow its links back to the ideas.

    ## Your own notes
    - **+ New** for anything: a fund you're researching, a question about your payslip, a rule you want to remember.
    - ${BT}[[Title]]${BT} links to another entry; the editor also spots topics you mention and offers to link them.
    - **Questions**: write down whatever you don't get, then copy them all at once to paste into any AI chat, and paste the answers back.
    - Mark topics **Curious → Exploring → Solid** as you go.

    ## Your data
    Everything is saved in ${BT}finance/data/lattice.json${BT}, with daily copies in ${BT}finance/data/backups/${BT}. Export or import from **Settings**. Ledger runs on the same engine as Lattice but keeps a completely separate library.

    ## On your phone
    Start Ledger with ${BT}npm run lan${BT} from the ${BT}finance${BT} folder. The terminal shows an address and an access code; open it on a phone on the same Wi-Fi. Only on a network you trust.

    ## Keyboard
    - ${BT}n${BT} new entry · ${BT}q${BT} jot a question · ${BT}/${BT} search · ${BT}g${BT} graph · ${BT}l${BT} library · ${BT}h${BT} home · ${BT}r${BT} random
    - ${BT}e${BT} edit the entry you're viewing · ${BT}Ctrl${BT} + ${BT}Enter${BT} save · ${BT}Esc${BT} close
  `,
});
