// Ledger's starter content, written to data/lattice.json the first time Ledger runs.
// After that the data file is the source of truth. To add more to an existing library,
// write a content pack and run: npm run merge -- <pack.js>

import { BASICS_ENTRIES } from './content/basics.js';
import { COMPANIES_ENTRIES } from './content/companies.js';
import { HELP } from './content/help.js';
import { AREAS } from './content/helpers.js';
import { LINKS } from './content/links.js';
import { MACRO_ENTRIES } from './content/macro.js';
import { MARKETS_ENTRIES } from './content/markets.js';
import { MONEY_ENTRIES } from './content/money.js';
import { QUANT_ENTRIES } from './content/quant.js';
import { STORIES_ENTRIES } from './content/stories.js';

export const SEED = {
  areas: AREAS,
  entries: [
    ...MONEY_ENTRIES,
    ...MARKETS_ENTRIES,
    ...QUANT_ENTRIES,
    ...MACRO_ENTRIES,
    ...COMPANIES_ENTRIES,
    ...BASICS_ENTRIES,
    ...STORIES_ENTRIES,
    HELP,
  ],
  links: LINKS,
};

export default SEED;
