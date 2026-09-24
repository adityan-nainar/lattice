// Expansion pack: ~45 more rabbit holes branching off the starter topics — extreme matter,
// big-picture quantum, cosmology, exceptional maths and more string theory — all linked in,
// each link with a one-line "why".
//
//   npm run merge -- content/expansion.js

import { COSMOS } from './expansion/cosmos.js';
import { EXPANSION_LINKS } from './expansion/links.js';
import { MATHS_STRINGS } from './expansion/maths-strings.js';
import { QUANTUM_MORE } from './expansion/quantum.js';

export const EXPANSION = {
  areas: [],
  entries: [...MATHS_STRINGS, ...QUANTUM_MORE, ...COSMOS],
  links: EXPANSION_LINKS,
};

export default EXPANSION;
