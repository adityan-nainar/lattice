// Foundations pack: the prerequisite topics under the starter content, and the links
// from every starter topic down to what it builds on.
//
// Fresh installs get it through seed.js. For an existing library:
//   npm run merge -- content/foundations.js

import { MATHS, MATHS_AREA } from './foundations/maths.js';
import { PHYSICS, PHYSICS_AREA } from './foundations/physics.js';
import { QUANTUM } from './foundations/quantum.js';
import { RELATIVITY } from './foundations/relativity.js';
import { STRINGS } from './foundations/strings.js';
import { FOUNDATION_LINKS } from './foundations/links.js';

export const FOUNDATIONS = {
  areas: [MATHS_AREA, PHYSICS_AREA],
  entries: [...MATHS, ...PHYSICS, ...QUANTUM, ...RELATIVITY, ...STRINGS],
  links: FOUNDATION_LINKS,
};

export default FOUNDATIONS;
