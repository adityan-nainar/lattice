// Connections pack: turns the library from a syllabus into something to wander through.
//  - aliases: everyday names, so topics get spotted and highlighted in any entry's text
//  - notes:   a one-line "why these connect" for existing links
//  - links:   extra connections that jump between areas
//
// Merge into an existing library (fills only what's empty; never overwrites your edits):
//   npm run merge -- content/connections.js

import { ALIASES } from './connections/aliases.js';
import { NOTES } from './connections/notes.js';

// [from, kind, to, note]
const LINKS = [
  ['generating-functions', 'same-idea', 'statistical-mechanics', 'A partition function is a generating function that counts states by energy'],
  ['eisenstein-discriminant', 'related', 'lattices', 'E₄ is exactly the theta function of the E₈ lattice'],
  ['quantum-harmonic-oscillator', 'related', 'waves-normal-modes', 'Quantize any normal mode and you get a harmonic oscillator'],
  ['fluid-dynamics', 'related', 'gross-pitaevskii', 'Write ψ = √n e^{iθ} and GP becomes fluid equations — with no viscosity term'],
  ['noether-theorem', 'related', 'stress-energy-tensor', '∇·T = 0 is Noether’s theorem for spacetime translations'],
  ['black-holes', 'related', 'statistical-mechanics', 'Black holes have entropy A/4 — so what microstates is it counting?'],
  ['identical-particles', 'explains', 'superfluidity', 'Why helium-4 goes superfluid at 2.17 K but helium-3 only near a millikelvin'],
  ['interferometry', 'related', 'decoherence', 'Which-path information wipes out the fringes'],
  ['second-quantization', 'related', 'light-cone-quantization', 'String states are built with the same creation operators'],
  ['quantum-field-theory', 'related', 'speed-of-light', 'QFT is what quantum mechanics becomes when nothing may outrun light'],
  ['anomalies', 'same-idea', 'critical-dimension', 'Cancelling the conformal anomaly and the light-cone calculation both give D = 26'],
  ['tori-elliptic-curves', 'related', 'compactification', 'A torus is a lattice quotient — in 2D for j, in 24D for the Monster'],
  ['example-casimir', 'same-idea', 'critical-dimension', 'Both are zero-point energy, regularized into a finite, physical number'],
  ['gravitational-redshift', 'related', 'atomic-clocks', 'Optical clocks now see the redshift across a 1 cm height change'],
  ['uncertainty-principle', 'related', 'quantum-harmonic-oscillator', 'Why the ground state can’t sit still: zero-point energy'],
  ['lattices', 'related', 'superstrings', 'The heterotic string’s gauge groups come from 16-dimensional even lattices'],
  ['dispersion-relations', 'related', 'wave-particle-duality', 'With E = ħω and p = ħk, a dispersion relation is an energy–momentum relation'],
  ['entanglement', 'tension', 'minkowski-spacetime', 'Instant correlations across spacelike separation — yet no signal travels faster than light'],
];

export const CONNECTIONS = { areas: [], entries: [], aliases: ALIASES, notes: NOTES, links: LINKS };

export default CONNECTIONS;
