// Agora's starter content, written to data/lattice.json the first time Agora runs.
// After that the data file is the source of truth. To add more to an existing library,
// write a content pack and run: npm run merge -- <pack.js>

import { ETHICS_ENTRIES } from './content/ethics.js';
import { AREAS } from './content/helpers.js';
import { KNOWLEDGE_ENTRIES } from './content/knowledge.js';
import { LANGUAGE_ENTRIES } from './content/language.js';
import { LOGIC_ENTRIES } from './content/logic.js';
import { MIND_ENTRIES } from './content/mind.js';
import { REALITY_ENTRIES } from './content/reality.js';
import { SCIENCE_ENTRIES } from './content/science.js';

export const SEED = {
  areas: AREAS,
  entries: [
    ...LOGIC_ENTRIES,
    ...KNOWLEDGE_ENTRIES,
    ...REALITY_ENTRIES,
    ...MIND_ENTRIES,
    ...SCIENCE_ENTRIES,
    ...LANGUAGE_ENTRIES,
    ...ETHICS_ENTRIES,
  ],
  links: [],
};

export default SEED;
