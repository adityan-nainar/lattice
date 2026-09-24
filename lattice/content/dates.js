// When each topic turned up, for the timeline. One year per entry: the moment the idea arrived,
// or — where an idea waited a long time for evidence — the year it was actually found.
// Only entries with a clear, well-known date are here; the rest simply don't appear on the timeline.
//   npm run merge -- content/dates.js

export const YEARS = {
  // ---- maths
  'group-theory': 1832, // Galois
  'representation-theory': 1896, // Frobenius' characters
  'lie-algebras': 1873, // Lie's continuous groups
  'finite-simple-groups': 1983, // the classification announced
  'riemann-zeta': 1734, // Euler sums 1/n²
  'riemann-hypothesis': 1859, // Riemann's paper
  'ramanujan-tau': 1916,
  'modularity-fermat': 1995, // Wiles' proof
  'complex-numbers': 1748, // Euler's formula
  calculus: 1684, // Leibniz publishes
  'fourier-analysis': 1822, // Fourier's heat theory
  'complex-analysis': 1825, // Cauchy's integral theorem
  'hilbert-space': 1932, // von Neumann's quantum foundations
  'riemannian-geometry': 1854, // Riemann's habilitation lecture
  tensors: 1900, // Ricci and Levi-Civita
  'sphere-packing': 1611, // Kepler's conjecture
  octonions: 1843, // Graves
  'knot-theory': 1984, // the Jones polynomial
  'golay-m24': 1861, // Mathieu's first sporadic groups

  // ---- the Monster and strings
  'leech-lattice': 1967,
  'conway-groups': 1968,
  'monster-group': 1973, // predicted by Fischer and Griess
  'order-of-the-monster': 1975, // Ogg spots the supersingular primes
  'example-mckay-196884': 1978, // McKay's observation
  'monstrous-moonshine': 1979, // Conway and Norton
  'example-mckay-thompson': 1979,
  'griess-algebra': 1982, // the Monster constructed by hand
  'vertex-operator-algebra': 1986, // Borcherds' definition
  'moonshine-module': 1988, // Frenkel, Lepowsky and Meurman
  'borcherds-algebras': 1988,
  'mathieu-umbral-moonshine': 2010,
  'question-monster-universe': 2007, // Witten's 3D gravity proposal
  'classical-string': 1970, // Nambu and Goto
  'bosonic-string': 1970,
  'critical-dimension': 1971, // Lovelace finds 26
  'ghosts-no-ghost': 1972, // Goddard and Thorn
  'light-cone-quantization': 1973,
  'superstrings': 1984, // anomaly cancellation
  'conformal-field-theory': 1984, // Belavin, Polyakov, Zamolodchikov
  orbifolds: 1985,
  'calabi-yau': 1977, // Yau proves Calabi's conjecture
  'kaluza-klein': 1921,
  'd-branes': 1995, // Polchinski
  'ads-cft': 1997, // Maldacena

  // ---- classical physics
  'newtonian-mechanics': 1687, // the Principia
  'newtonian-gravity': 1687,
  'lagrangian-mechanics': 1788, // Lagrange's analytical mechanics
  'hamiltonian-mechanics': 1833,
  'maxwell-light': 1865,
  thermodynamics: 1865, // Clausius names entropy
  'statistical-mechanics': 1877, // Boltzmann
  'fluid-dynamics': 1845, // Stokes completes the equations
  'rayleigh-scattering': 1871,
  'noether-theorem': 1918,

  // ---- relativity
  'lorentz-transformations': 1904,
  'principle-of-relativity': 1905,
  'sr-time-dilation': 1905,
  'four-momentum': 1905,
  'speed-of-light': 1887, // Michelson and Morley find no aether
  'minkowski-spacetime': 1908,
  'equivalence-principle': 1907,
  'gravitational-time-dilation': 1907,
  'gravitational-redshift': 1911,
  'einstein-field-equations': 1915,
  'example-mercury-perihelion': 1915,
  'schwarzschild-metric': 1916,
  'gravitational-waves': 1916, // predicted; first heard in 2015
  'gravitational-lensing': 1919, // Eddington's eclipse
  'black-holes': 1939, // Oppenheimer and Snyder
  'kerr-black-holes': 1963,
  'hawking-radiation': 1974,
  'unruh-effect': 1976,
  'holographic-principle': 1972, // Bekenstein's black hole entropy
  'pound-rebka': 1959,
  'example-hafele-keating': 1971,
  'example-gps': 1978, // the first GPS satellite
  'atomic-clocks': 1955, // the first caesium clock
  'expanding-universe': 1929, // Hubble
  cmb: 1965, // Penzias and Wilson
  'vacuum-energy-problem': 1998, // the universe found to be accelerating
  'neutron-stars': 1967, // the first pulsar
  'degeneracy-pressure': 1930, // Chandrasekhar
  'er-epr': 2013,
  'puzzle-emergent-spacetime': 2006, // Ryu and Takayanagi
  'quantum-bouncing-neutrons': 2002,
  'clocks-superposition-gravity': 1975, // the COW experiment
  interferometry: 1975,

  // ---- quantum
  'planck-blackbody': 1900,
  'stimulated-emission': 1917,
  'hydrogen-atom': 1913, // Bohr
  'wave-particle-duality': 1924, // de Broglie
  'bose-einstein-statistics': 1924,
  spin: 1925, // Uhlenbeck and Goudsmit
  'identical-particles': 1925, // Pauli's exclusion principle
  'schrodinger-equation': 1926,
  'born-rule': 1926,
  'fermi-dirac': 1926,
  'uncertainty-principle': 1927,
  'second-quantization': 1927,
  'quantum-field-theory': 1927,
  'dirac-equation': 1928,
  'quantum-tunneling': 1928, // Gamow explains alpha decay
  entanglement: 1935, // EPR
  'measurement-problem': 1935, // Schrödinger's cat
  superfluidity: 1938,
  'landau-criterion': 1941,
  quasiparticles: 1941,
  'bogoliubov-dispersion': 1947,
  regularization: 1948, // renormalization works
  'path-integral': 1948,
  'example-casimir': 1948,
  'quantized-circulation': 1949, // Onsager
  'gauge-symmetry': 1954, // Yang and Mills
  'spontaneous-symmetry-breaking': 1960, // Nambu
  'landauer-principle': 1961,
  'gross-pitaevskii': 1961,
  superconductivity: 1911, // Kamerlingh Onnes
  'josephson-effect': 1962,
  'higgs-mechanism': 1964,
  'bell-chsh': 1964,
  decoherence: 1970, // Zeh
  anomalies: 1969, // Adler, Bell and Jackiw
  supersymmetry: 1974, // Wess and Zumino
  'quantum-hall-effect': 1980,
  'quantum-computing': 1981, // Feynman's proposal
  'laser-cooling': 1985,
  'bose-einstein-condensate': 1995, // the first one made
  'example-muon': 1941, // Rossi and Hall

  // ---- open questions
  'puzzle-137': 1916, // Sommerfeld's constant
  'puzzle-three-dimensions': 1917, // Ehrenfest asks
  'puzzle-fine-tuning': 1953, // Hoyle's carbon prediction
  'puzzle-effectiveness': 1960, // Wigner's essay
  'puzzle-weak-gravity': 1998, // large extra dimensions
};

export const DATES = { years: YEARS };
export default DATES;
