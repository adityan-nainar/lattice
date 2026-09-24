// Deeper pack: big puzzle questions, quantum ↔ gravity bridges, more of the Monster,
// and extra links for topics that were only loosely connected.
//   npm run merge -- content/deeper.js

import { AREA, entry, md } from './helpers.js';

const { STRING, QUANTUM, REL, MISC } = AREA;
const input = (key, label, unit, value, min, max, extra = {}) => ({ key, label, unit, value, min, max, ...extra });
const out = (label, unit, expr, extra = {}) => ({ label, unit, expr, ...extra });

const ENTRIES = [
  // ---------------------------------------------------------------- puzzles
  entry('puzzle-137', 'question', MISC, 'curious', 'Why is the fine-structure constant about 1/137?', {
    summary: 'The strength of electromagnetism is a pure number, α ≈ 1/137.036, the same in any units. Nobody can derive it — and small changes would rewrite chemistry.',
    latex: md`\alpha = \frac{e^2}{4\pi\varepsilon_0\,\hbar c} \approx \frac{1}{137.036}`,
    variables: [
      [md`e`, 'Charge of the electron'],
      [md`\hbar c`, 'Quantum × relativity: the natural scale to compare it with'],
    ],
    aliases: ['fine-structure constant', 'coupling constant of electromagnetism'],
    tags: ['open question', 'constants', 'patterns'],
    calc: {
      inputs: [input('k', 'Scale the electron’s charge by', '×', 1, 0.5, 2)],
      outputs: [
        out('α', '', 'k^2*qe^2/(4*pi*eps0*hbar*c)', { key: 'a', digits: 6 }),
        out('1/α', '', '1/a', { digits: 6 }),
        out('Hydrogen’s binding energy ½α²mₑc²', 'eV', '0.5*me*c^2*a^2/eV', { digits: 4 }),
        out('Size of hydrogen (Bohr radius ħ/mₑcα)', 'm', 'hbar/(me*c*a)', { prefix: true, digits: 4 }),
        out('Electron speed in hydrogen ≈ αc', 'm/s', 'a*c', { prefix: true }),
      ],
      note: 'Double the charge and atoms shrink 4 times while their binding energies grow 16 times — all of chemistry would change.',
    },
    body: md`
      **What it does:** α sets how strongly light and matter interact. The size of atoms, the energy of chemical bonds, the colours of spectral lines ([[The Hydrogen Atom]]) and the fine structure of those lines all scale with powers of α.

      **Why it’s strange:** it has no units, so its value can’t be an accident of metres or seconds. The [[The Standard Model|Standard Model]] takes it as input; nothing predicts it. Sommerfeld introduced it in 1916; Eddington later tried to “prove” it was exactly 1/136, then 1/137. Feynman called it one of the great mysteries of physics.

      **A twist:** α isn’t even fixed. Quantum fluctuations screen the electron’s charge, so at high energies it grows — about 1/128 at the energy of the Z boson ([[Regularization & Renormalization]], [[Quantum Field Theory]]).

      **Possible answers:** a deeper theory will derive it; or it varies across a multiverse and we live where chemistry works ([[Are the laws of nature fine-tuned for life?]]). Astronomers check whether α was different billions of years ago — so far, no change beyond a few parts per million.
    `,
  }),

  entry('puzzle-three-dimensions', 'question', MISC, 'curious', 'Why does space have three dimensions?', {
    summary: 'Three is the only number of large dimensions where stable orbits, stable atoms and knots all exist. Whether that explains it is another matter.',
    aliases: ['three spatial dimensions', 'number of dimensions'],
    tags: ['open question', 'dimensions', 'patterns'],
    body: md`
      **What goes wrong in other dimensions:**
      - **Orbits** (Ehrenfest, 1917): in $d$ space dimensions gravity falls off as $1/r^{d-1}$ ([[Newtonian Gravity]]). Circular orbits are stable only for $d \le 3$. In 4D or more, a tiny nudge sends a planet spiralling into its star or off to infinity.
      - **Atoms:** the same problem for electrons — no stable, normal atoms with more than three space dimensions ([[The Hydrogen Atom]]).
      - **Knots** only exist in three dimensions: in two you can’t cross over, in four every knot slips undone ([[Knots & Quantum Field Theory]]).
      - **Clean signals:** waves carry sharp, echo-free pulses only in odd numbers of dimensions (3, 5, …) — a clap in 2D would ring on.

      **And yet:** string theory needs 10 or 26 dimensions ([[Critical Dimension of the Bosonic String]]), so it must explain why only three grew large while the rest stayed curled up ([[Compactification on a Torus]], [[Calabi–Yau Manifolds]]). One speculative idea: in the hot early universe, strings wrapped around dimensions and pinned them small, and wound strings can only find each other and unwind in three or fewer.
    `,
  }),

  entry('puzzle-weak-gravity', 'question', MISC, 'curious', 'Why is gravity so weak?', {
    summary: 'Between two protons, gravity is 10³⁶ times weaker than their electric repulsion. A fridge magnet beats the whole Earth. Explaining the gap is the hierarchy problem.',
    latex: md`\frac{F_{\text{grav}}}{F_{\text{elec}}} = \frac{G m_p^2}{e^2/4\pi\varepsilon_0} \approx 8\times10^{-37}, \qquad \frac{M_{\text{Planck}}}{m_{\text{Higgs}}} \approx \frac{1.2\times10^{19}\ \text{GeV}}{125\ \text{GeV}} \approx 10^{17}`,
    variables: [
      [md`M_{\text{Planck}} = \sqrt{\hbar c/G}`, 'Mass scale where gravity becomes as strong as the other forces'],
    ],
    aliases: ['hierarchy problem', 'weakness of gravity'],
    tags: ['open question', 'gravity', 'constants'],
    calc: {
      inputs: [input('mm', 'Mass of each particle', 'proton masses', 1, 0.0005446, 1e20, { log: true })],
      outputs: [
        out('Gravity ÷ electric force (each with charge e)', '', 'G*(mm*mp)^2/(qe^2/(4*pi*eps0))'),
        out('Mass where they would be equal', 'kg', 'sqrt(qe^2/(4*pi*eps0*G))', { prefix: false }),
      ],
      note: 'Electrons: set 0.000545. Equal strength needs about 2 micrograms per elementary charge — 10¹⁸ proton masses.',
    },
    body: md`
      **Gravity always adds up**, which is why it rules planets and galaxies. Particle by particle it is absurdly feeble ([[Newtonian Gravity]]).

      **The hierarchy problem:** quantum corrections should drag the Higgs boson’s mass up toward the Planck scale unless something cancels them with astonishing precision ([[The Higgs Mechanism]], [[Regularization & Renormalization]]).

      **Proposed answers:**
      - [[Supersymmetry]]: boson and fermion corrections cancel.
      - **Large extra dimensions** (1998): gravity leaks into hidden dimensions, so we only feel a diluted fraction of it — a modern [[Kaluza–Klein Theory]].
      - **Warped extra dimensions** (Randall–Sundrum, 1999): gravity is strong elsewhere in a fifth dimension and exponentially weak where we live.
      - Or the numbers are just what they are ([[Are the laws of nature fine-tuned for life?]]).

      The Large Hadron Collider has so far seen no sign of any of these. Related: [[Why don’t quantum mechanics and general relativity fit together?]]
    `,
  }),

  entry('puzzle-effectiveness', 'question', MISC, 'curious', 'Why is mathematics so good at describing physics?', {
    summary: 'Maths invented for its own sake keeps turning out to be exactly what nature uses — curved geometry for gravity, complex numbers for quantum states, modular forms for strings.',
    aliases: ['unreasonable effectiveness of mathematics'],
    tags: ['open question', 'philosophy', 'patterns'],
    body: md`
      Eugene Wigner’s 1960 essay called it “unreasonable effectiveness”. Examples from this library:
      - **Curved geometry** was worked out by Riemann in 1854 — sixty years before Einstein needed exactly that for gravity ([[Metric, Connection & Curvature]]).
      - **Complex numbers**, once “imaginary”, are unavoidable in quantum amplitudes ([[Complex Numbers & Euler’s Formula]]).
      - **Group theory** organised particles so well that Gell-Mann predicted the Ω⁻ particle from a missing slot in an $SU(3)$ pattern; it was found in 1964 ([[Lie Groups & Lie Algebras]]).
      - **Modular forms** from 19th-century number theory count string states, pack spheres and encode the Monster ([[Monstrous Moonshine]], [[Sphere Packing]]).
      - **Zeros of the zeta function** space themselves like energy levels of heavy nuclei ([[The Riemann Hypothesis]]).

      **Possible answers:**
      - Maths is the study of all possible patterns, so nature’s patterns are somewhere in it.
      - Selection: we notice the successes and work on problems maths can handle.
      - Physics and maths share an origin in the same simple ideas — symmetry, continuity, counting ([[Groups & Symmetry]]).
      - The universe *is* a mathematical structure (Tegmark).
    `,
  }),

  entry('puzzle-emergent-spacetime', 'question', MISC, 'curious', 'Is spacetime made of entanglement?', {
    summary: 'In holography, the geometry of space seems to be built from quantum entanglement: remove the entanglement and space falls apart.',
    latex: md`S_A = \frac{\text{Area}(\gamma_A)}{4G\hbar}\quad(\text{Ryu–Takayanagi})`,
    variables: [
      [md`S_A`, 'Entanglement entropy of a region A of the boundary theory'],
      [md`\gamma_A`, 'Smallest surface in the bulk spacetime that ends on A’s edge'],
    ],
    aliases: ['emergent spacetime', 'Ryu–Takayanagi', 'entanglement entropy', 'it from qubit'],
    tags: ['open question', 'quantum gravity', 'holography'],
    body: md`
      **The clue:** black hole entropy is proportional to *area*, not volume ([[Black Hole Entropy & the Holographic Principle]]). Entanglement entropy of a region in quantum field theory also scales with the area of its boundary.

      **Ryu–Takayanagi (2006):** in [[Anti-de Sitter Space & AdS/CFT|AdS/CFT]], the entanglement entropy of part of the boundary equals the area of a minimal surface in the bulk. Geometry measures entanglement.

      **Van Raamsdonk (2010):** reduce the entanglement between two halves of the boundary theory and the bulk spacetime connecting them stretches thin and pinches off. Connected space seems to *need* entanglement — the same idea as [[ER = EPR]].

      **Open:** whether this applies to our universe, which is not anti-de Sitter, and what spacetime is “made of” before it emerges ([[Why don’t quantum mechanics and general relativity fit together?]]). Related: [[Entanglement]].
    `,
  }),

  entry('puzzle-fine-tuning', 'question', MISC, 'curious', 'Are the laws of nature fine-tuned for life?', {
    summary: 'Nudge several constants a little and there would be no stars, no carbon, or no galaxies. Coincidence, a deeper law, or one universe among many?',
    aliases: ['fine-tuning', 'fine-tuned', 'Hoyle state', 'anthropic principle'],
    tags: ['open question', 'constants', 'cosmology'],
    body: md`
      **Examples:**
      - **Dark energy** is about $10^{120}$ times smaller than naive quantum estimates; much bigger and galaxies could never form ([[The Vacuum Energy Problem]], [[The Expanding Universe]]).
      - **Carbon:** in 1953 Fred Hoyle predicted that carbon-12 must have an energy level near 7.65 MeV, or stars couldn’t make enough carbon. It was found soon after — the Hoyle state.
      - **The strength of electromagnetism** sets chemistry ([[Why is the fine-structure constant about 1/137?]]).
      - **Star masses** are set by constants: the largest white dwarf, $M_{\text{Ch}} \propto (\hbar c/G)^{3/2}/m_p^2$, comes out near the Sun’s mass ([[Degeneracy Pressure & White Dwarfs]]).

      **Responses:**
      - **Deeper theory:** the values are forced and we just don’t know why yet.
      - **Multiverse + selection:** many regions with different constants; observers only arise in friendly ones.
      - **Selection bias:** life adapted to the universe, not the reverse, and we can’t easily judge what “other life” could exist.
      - **Probability is ill-defined** for constants that are only measured once.
    `,
  }),

  // ---------------------------------------------------------------- quantum ↔ gravity bridges
  entry('unruh-effect', 'equation', REL, 'curious', 'The Unruh Effect', {
    summary: 'An accelerating observer sees empty space as warm. Acceleration and temperature are linked by the same formula that gives black holes their Hawking temperature.',
    latex: md`T_U = \frac{\hbar\,a}{2\pi c\,k_B}`,
    variables: [
      [md`a`, 'Proper acceleration of the observer'],
      [md`T_U`, 'Temperature of the thermal bath they detect'],
    ],
    aliases: ['Unruh effect', 'Unruh temperature', 'Rindler horizon'],
    tags: ['quantum gravity', 'thermodynamics', 'bridge'],
    calc: {
      inputs: [input('acc', 'Acceleration', 'm/s²', 9.81, 0.001, 1e25, { log: true })],
      outputs: [
        out('Unruh temperature', 'K', 'hbar*acc/(2*pi*c*kB)', { prefix: true }),
        out('That acceleration in g', 'g', 'acc/g0'),
        out('Acceleration needed for 1 K', 'm/s²', '2*pi*c*kB/hbar'),
      ],
      note: 'At 1 g the bath is 4 × 10⁻²⁰ K — hopelessly small, which is why it hasn’t been seen directly.',
    },
    body: md`
      **Fulling (1973), Davies (1975), Unruh (1976):** the vacuum of [[Quantum Field Theory]] is not the same for every observer. A uniformly accelerating detector responds as if immersed in [[Planck’s Law & Blackbody Radiation|blackbody radiation]] at temperature $T_U$.

      **Why:** an accelerating observer has a horizon behind them — regions of spacetime they can never receive signals from ([[Minkowski Spacetime, Light Cones & Proper Time|light cones]]). Correlations with what lies beyond that horizon look thermal.

      **The bridge:** by the [[Equivalence Principle]], hovering just outside a black hole is like accelerating. Replace $a$ by the horizon’s surface gravity and you get exactly the [[Hawking Radiation|Hawking temperature]].

      **Status:** far too small to measure at ordinary accelerations; analogue versions have been studied with fluids, lasers and condensates.
    `,
  }),

  entry('kerr-black-holes', 'concept', REL, 'curious', 'Spinning Black Holes & Frame Dragging', {
    summary: 'Real black holes spin. A spinning mass drags spacetime around with it — measured around Earth by Gravity Probe B, and extreme enough near a black hole to steal energy from its spin.',
    latex: md`r_+ = \frac{GM}{c^2}\left(1 + \sqrt{1 - \chi^2}\right), \qquad \chi = \frac{cJ}{GM^2} \le 1`,
    variables: [
      [md`r_+`, 'Event horizon radius of a spinning (Kerr) black hole'],
      [md`\chi`, 'Dimensionless spin, 0 (not spinning) to 1 (maximal)'],
      [md`J`, 'Angular momentum'],
    ],
    aliases: ['Kerr black hole', 'Kerr metric', 'rotating black hole', 'frame dragging', 'ergosphere', 'Penrose process', 'Gravity Probe B'],
    tags: ['general relativity', 'black holes', 'experiments'],
    calc: {
      inputs: [input('M', 'Mass', 'solar masses', 10, 1, 1e10, { log: true }), input('chi', 'Spin χ', '', 0.7, 0, 0.9999)],
      outputs: [
        out('Horizon radius r₊', 'm', 'G*M*Msun/c^2*(1 + sqrt(1 - chi^2))', { prefix: true }),
        out('Non-spinning radius for comparison', 'm', '2*G*M*Msun/c^2', { prefix: true }),
        out('Share of its mass-energy stored in the spin', '', '1 - sqrt((1 + sqrt(1 - chi^2))/2)', { digits: 3 }),
      ],
      note: 'At maximal spin, 29% of the mass-energy could in principle be extracted (the Penrose process).',
    },
    body: md`
      **Kerr (1963)** found the exact solution for a rotating black hole. Unlike the [[Schwarzschild Metric]], it has an **ergosphere**: a region outside the horizon where spacetime is dragged around so fast that nothing can stay still relative to distant stars.

      - **Penrose process:** throw something into the ergosphere, split it, and one piece can escape with more energy than you sent in — paid for by the black hole’s spin.
      - **Frame dragging near Earth:** Gravity Probe B (results 2011) watched gyroscopes in orbit twist by 37 ± 7 milliarcseconds per year, against a predicted 39 ([[Geodesic Equation]]).
      - **Measured spins:** merging black holes seen in [[Gravitational Waves]] reveal their spins, and many astrophysical [[Black Holes & Event Horizons|black holes]] spin fast.
      - The Kerr solution depends on only two numbers, mass and spin — black holes are the simplest macroscopic objects known.
    `,
  }),

  entry('quantum-bouncing-neutrons', 'equation', QUANTUM, 'curious', 'Neutrons Bouncing in Quantum Gravity States', {
    summary: 'Ultracold neutrons bouncing on a mirror under Earth’s gravity can only sit at certain heights — quantum energy levels created by gravity itself, a few peV apart.',
    latex: md`E_n = a_n\left(\frac{\hbar^2 m g^2}{2}\right)^{1/3}, \qquad z_n = a_n\left(\frac{\hbar^2}{2m^2 g}\right)^{1/3}, \qquad a_1 \approx 2.338,\ a_2 \approx 4.088,\ a_3 \approx 5.521`,
    variables: [
      [md`a_n`, 'Zeros of the Airy function (the solutions of the Schrödinger equation in a linear potential)'],
      [md`z_n`, 'Classical turning height of level n'],
      [md`m`, 'Neutron mass'],
    ],
    aliases: ['qBounce', 'gravitational quantum states', 'quantum bouncing ball', 'ultracold neutrons'],
    tags: ['quantum gravity', 'experiments', 'bridge'],
    calc: {
      inputs: [
        input('n', 'Energy level', '', 1, 1, 10, { integer: true }),
        input('gg', 'Gravity', 'm/s²', 9.81, 0.1, 100, { log: true }),
        input('mm', 'Mass', 'neutron masses', 1, 0.001, 100, { log: true }),
      ],
      outputs: [
        out('Airy zero aₙ (approximation)', '', '(3*pi*(4*n - 1)/8)^(2/3)', { key: 'an', digits: 3 }),
        out('Energy Eₙ', 'eV', 'an*cbrt(hbar^2*mm*mn*gg^2/2)/eV', { prefix: true }),
        out('Height of the level', 'm', 'an*cbrt(hbar^2/(2*(mm*mn)^2*gg))', { prefix: true }),
      ],
      note: 'The approximation for aₙ is about 1% low for n = 1 and better above. Notice the mass does not cancel, unlike classical free fall.',
    },
    body: md`
      **Nesvizhevsky et al. (2002)** at the Institut Laue-Langevin let very slow neutrons fly over a horizontal mirror with an absorber above. Neutrons only got through when the gap exceeded about 15 μm — the size of the lowest quantum state. It was the first observation of quantum states in a gravitational field.

      **Why:** the [[Schrödinger Equation]] for a particle above a floor in uniform gravity ([[Newtonian Gravity]]) has discrete solutions, the Airy functions. The lowest level is 1.4 peV above the floor — a trillionth of an electronvolt.

      **Why it matters:**
      - Gravity acting on a quantum system, now measured by spectroscopy (the qBounce experiments drive transitions between levels).
      - The mass appears in the energy levels, unlike in classical free fall — a quantum test of the [[Equivalence Principle]].
      - Hunts for new short-range forces and dark-energy fields.

      A cousin of the COW experiment in [[Matter-Wave Interferometry]], and a step toward [[Clocks, Superposition and Gravity]].
    `,
  }),

  // ---------------------------------------------------------------- more Monster
  entry('griess-algebra', 'concept', STRING, 'curious', 'The Griess Algebra', {
    summary: 'A 196,884-dimensional algebra whose symmetry group is exactly the Monster. Griess used it to construct the Monster by hand in 1982.',
    latex: md`\dim B = 196884 = 1 + 196883, \qquad a \times b = b \times a, \quad (a \times b) \times c \neq a \times (b \times c)`,
    variables: [[md`B`, 'The Griess algebra: commutative but not associative']],
    aliases: ['Griess algebra'],
    tags: ['group theory', 'moonshine', 'algebra'],
    body: md`
      **The construction (Griess, 1980–82):** the existence of the [[Monster Group]] had been predicted but not proved. Griess wrote down an explicit product on a 196,884-dimensional space and built, out of its symmetries, a group with exactly the predicted properties — published as “The Friendly Giant”. Tits later showed the Monster is the *whole* symmetry group of the algebra.

      - Commutative but **not associative** — like the [[Octonions]], only far bigger.
      - As a Monster representation it splits as $1 + 196883$, the same numbers as [[McKay's observation: 196884 = 1 + 196883]].
      - It is the weight-2 part of the [[Moonshine Module]]: the vertex operator’s product on those states *is* the Griess product. That is why the Monster acts on the whole module.
    `,
  }),

  entry('conway-groups', 'concept', STRING, 'curious', 'The Conway Groups', {
    summary: 'The symmetries of the Leech lattice: Co₀, with 8,315,553,613,086,720,000 elements. Its quotient Co₁ and relatives Co₂, Co₃ are three of the 26 sporadic groups.',
    latex: md`|Co_0| = 2^{22}\cdot 3^{9}\cdot 5^{4}\cdot 7^{2}\cdot 11\cdot 13\cdot 23 = 8\,315\,553\,613\,086\,720\,000, \qquad Co_1 = Co_0/\{\pm1\}`,
    variables: [
      [md`Co_0`, 'All rotations and reflections that map the Leech lattice to itself'],
      [md`\{\pm1\}`, 'Identity and the reflection through the origin'],
    ],
    aliases: ['Conway group', 'Co₀', 'Co₁'],
    tags: ['group theory', 'sporadic groups', '24 dimensions'],
    body: md`
      **John Conway, 1968:** asked to find the symmetry group of the [[Leech Lattice]], he worked it out quickly and found three new [[Classification of Finite Simple Groups|sporadic simple groups]] inside it.

      - $Co_0$ is not simple, because $-1$ commutes with everything. Dividing it out gives the simple group $Co_1$.
      - $Co_2$ and $Co_3$ are the symmetries fixing particular lattice vectors.
      - The Mathieu group $M_{24}$ sits inside $Co_0$, inherited from the Golay code the lattice is built from ([[Golay Code & the Mathieu Group M₂₄]]).
      - $Co_1$ is involved in the [[Monster Group]]: the Monster contains a subgroup $2^{1+24}\cdot Co_1$, coming from the Leech lattice part of the [[Moonshine Module]].
    `,
  }),

  entry('example-mckay-thompson', 'example', STRING, 'curious', 'McKay–Thompson series for the elements 2A and 2B', {
    summary: 'Replace dimensions by traces of a Monster element and j turns into a different modular function — built from η quotients, just as Conway and Norton predicted.',
    tags: ['moonshine', 'modular forms'],
    body: md`
      For the identity element, counting states gives $J = j - 744 = q^{-1} + 196884\,q + \cdots$ ([[The j-invariant]]). For another element $g$ of the [[Monster Group]], take traces instead of dimensions ([[Representation Theory & Characters]]):
      $$T_g(\tau) = \sum_n \operatorname{tr}(g \mid V_n)\,q^{n-1}$$

      **Element class 2B** — a modular function for $\Gamma_0(2)$, built from the Dedekind eta function ([[Eisenstein Series, η and the Discriminant]]):
      $$T_{2B} = \left(\frac{\eta(\tau)}{\eta(2\tau)}\right)^{24} + 24 = q^{-1} + 276\,q - 2048\,q^2 + 11202\,q^3 + \cdots$$

      **Element class 2A:**
      $$T_{2A} = T_{2B} + 4096\left(\frac{\eta(2\tau)}{\eta(\tau)}\right)^{24} = q^{-1} + 4372\,q + 96256\,q^2 + 1240002\,q^3 + \cdots$$

      **Reading the numbers:** the coefficient of $q$ is $1 + \chi(g)$, where $\chi$ is the trace on the 196,883-dimensional representation. So $\chi(2A) = 4371$ and $\chi(2B) = 275$.

      **Where 4371 comes from:** a 2A element commutes with a double cover of the Baby Monster $B$, the second-largest sporadic group. Under it the 196,883 dimensions split as $1 + 4371 + 96255 + 96256$. The 2A element acts as $+1$ on the first three pieces and $-1$ on the last, so its trace is $1 + 4371 + 96255 - 96256 = 4371$ — and 4371 is the smallest representation of $B$.

      Each $T_g$ is a [[Genus-Zero Groups & Hauptmoduln|Hauptmodul]] — the heart of [[Monstrous Moonshine]]. (All coefficients above were checked by multiplying out the eta products.)
    `,
  }),
];

// [from, kind, to, why]
const LINKS = [
  // puzzles
  ['puzzle-137', 'related', 'hydrogen-atom', 'Atom sizes and spectral lines scale with powers of α'],
  ['puzzle-137', 'related', 'standard-model', 'An input the Standard Model can’t explain'],
  ['puzzle-137', 'related', 'regularization', 'α isn’t constant: it grows at high energy (≈ 1/128 at the Z mass)'],
  ['puzzle-137', 'related', 'maxwell-light', 'The strength of electromagnetism, as a pure number'],
  ['puzzle-137', 'related', 'puzzle-fine-tuning', 'Change α a little and chemistry changes'],
  ['puzzle-three-dimensions', 'related', 'newtonian-gravity', 'Stable orbits only exist in three dimensions'],
  ['puzzle-three-dimensions', 'related', 'knot-theory', 'Knots only exist in three dimensions'],
  ['puzzle-three-dimensions', 'related', 'critical-dimension', 'String theory needs 26 (or 10) — so why do we see 3?'],
  ['puzzle-three-dimensions', 'related', 'compactification', 'The rest would have to be curled up'],
  ['puzzle-three-dimensions', 'related', 'kaluza-klein', 'The first idea of hidden extra dimensions'],
  ['puzzle-weak-gravity', 'related', 'newtonian-gravity', 'Gravity between protons is 10³⁶ times weaker than their repulsion'],
  ['puzzle-weak-gravity', 'related', 'higgs-mechanism', 'Why is the Higgs so much lighter than the Planck mass?'],
  ['puzzle-weak-gravity', 'related', 'supersymmetry', 'One proposed fix for the hierarchy problem'],
  ['puzzle-weak-gravity', 'related', 'kaluza-klein', 'Gravity might leak into extra dimensions'],
  ['puzzle-weak-gravity', 'related', 'quantum-gravity-problem', 'Gravity’s weakness is why quantum gravity is so hard to test'],
  ['puzzle-effectiveness', 'related', 'riemannian-geometry', 'Riemann’s geometry waited 60 years for Einstein'],
  ['puzzle-effectiveness', 'related', 'complex-numbers', '“Imaginary” numbers turned out to be essential to quantum states'],
  ['puzzle-effectiveness', 'related', 'lie-algebras', 'SU(3) patterns predicted a particle before it was found'],
  ['puzzle-effectiveness', 'related', 'monstrous-moonshine', 'Number theory, group theory and strings turned out to be one story'],
  ['puzzle-effectiveness', 'related', 'riemann-hypothesis', 'Prime-number zeros behave like nuclear energy levels'],
  ['puzzle-emergent-spacetime', 'builds-on', 'holographic-principle', 'Entropy scales with area — the first clue'],
  ['puzzle-emergent-spacetime', 'builds-on', 'ads-cft', 'Ryu–Takayanagi: entanglement = minimal area'],
  ['puzzle-emergent-spacetime', 'same-idea', 'er-epr', 'Entanglement holds space together'],
  ['puzzle-emergent-spacetime', 'related', 'entanglement', 'Could entanglement be the stuff geometry is made of?'],
  ['puzzle-emergent-spacetime', 'related', 'quantum-gravity-problem', 'If space emerges, what does quantum gravity quantize?'],
  ['puzzle-fine-tuning', 'related', 'vacuum-energy-problem', 'Dark energy is small by 120 orders of magnitude'],
  ['puzzle-fine-tuning', 'related', 'degeneracy-pressure', 'Constants fix the maximum mass of a white dwarf'],
  ['puzzle-fine-tuning', 'related', 'expanding-universe', 'Bigger dark energy and no galaxies would form'],
  ['puzzle-fine-tuning', 'related', 'arrow-of-time', 'Another question about the universe’s special starting point'],

  // bridges
  ['unruh-effect', 'builds-on', 'quantum-field-theory', 'The vacuum depends on who is looking'],
  ['unruh-effect', 'builds-on', 'equivalence-principle', 'Acceleration and gravity are locally the same'],
  ['unruh-effect', 'builds-on', 'planck-blackbody', 'The bath has a blackbody spectrum'],
  ['unruh-effect', 'same-idea', 'hawking-radiation', 'Same formula, with acceleration replaced by surface gravity'],
  ['unruh-effect', 'related', 'minkowski-spacetime', 'An accelerating observer has a horizon'],
  ['kerr-black-holes', 'builds-on', 'black-holes', 'Black holes, now spinning'],
  ['kerr-black-holes', 'builds-on', 'einstein-field-equations', 'Kerr’s exact solution of the field equations'],
  ['kerr-black-holes', 'related', 'geodesics', 'Gyroscopes and orbits get dragged around'],
  ['kerr-black-holes', 'related', 'gravitational-waves', 'Mergers reveal black hole spins'],
  ['kerr-black-holes', 'related', 'schwarzschild-metric', 'Set the spin to zero and Kerr becomes Schwarzschild'],
  ['quantum-bouncing-neutrons', 'builds-on', 'schrodinger-equation', 'Airy-function solutions above a floor'],
  ['quantum-bouncing-neutrons', 'builds-on', 'newtonian-gravity', 'A linear potential mgz'],
  ['quantum-bouncing-neutrons', 'related', 'equivalence-principle', 'The mass doesn’t cancel in the quantum levels'],
  ['quantum-bouncing-neutrons', 'related', 'interferometry', 'Another way to watch gravity act on a quantum state'],
  ['quantum-bouncing-neutrons', 'related', 'clocks-superposition-gravity', 'Quantum physics meeting gravity in the lab'],

  // Monster
  ['griess-algebra', 'related', 'monster-group', 'The Monster is exactly its symmetry group'],
  ['griess-algebra', 'part-of', 'moonshine-module', 'It is the module’s weight-2 space'],
  ['griess-algebra', 'related', 'example-mckay-196884', 'Its dimension is 196884 = 1 + 196883'],
  ['griess-algebra', 'related', 'octonions', 'Another non-associative algebra with exceptional symmetry'],
  ['conway-groups', 'builds-on', 'leech-lattice', 'The symmetries of the Leech lattice'],
  ['conway-groups', 'builds-on', 'finite-simple-groups', 'Three of the 26 sporadic groups'],
  ['conway-groups', 'related', 'monster-group', 'The Monster contains 2¹⁺²⁴·Co₁'],
  ['conway-groups', 'related', 'golay-m24', 'M₂₄ sits inside Co₀'],
  ['example-mckay-thompson', 'example-of', 'monstrous-moonshine', 'Traces instead of dimensions give new modular functions'],
  ['example-mckay-thompson', 'example-of', 'hauptmodul', 'T₂A and T₂B are Hauptmoduln'],
  ['example-mckay-thompson', 'related', 'eisenstein-discriminant', 'Built from quotients of the eta function'],

  // loosely connected topics
  ['order-of-the-monster', 'related', 'hauptmodul', 'Ogg: its 15 primes are exactly the p where X₀(p)⁺ has genus zero'],
  ['order-of-the-monster', 'related', 'tori-elliptic-curves', 'Supersingular primes come from elliptic curves'],
  ['normal-subgroups', 'related', 'monster-group', 'The Monster has no normal subgroups — that’s what simple means'],
  ['scattering-length', 'related', 'superconductivity', 'Tune it with a Feshbach resonance and a molecular BEC turns into BCS-like pairs'],
  ['scattering-length', 'related', 'neutron-stars', 'Neutrons scatter with a huge length (≈ −19 fm), shaping neutron-star matter'],
  ['riemann-hypothesis', 'related', 'statistical-mechanics', 'ζ is the partition function of a “primon gas” with energies log p'],
  ['modularity-fermat', 'related', 'ramanujan-tau', 'Both proofs use Galois representations attached to modular forms'],
  ['t-duality', 'related', 'uncertainty-principle', 'Strings can’t resolve distances below their own length'],
  ['t-duality', 'related', 'calabi-yau', 'Mirror symmetry is T-duality on tori hidden inside Calabi–Yau spaces'],
  ['quantum-tunneling', 'related', 'wave-particle-duality', 'Only waves can leak through walls'],
  ['quantum-tunneling', 'related', 'path-integral', 'Tunnelling rates come from paths through the barrier in imaginary time'],
];

export const DEEPER = { areas: [], entries: ENTRIES, links: LINKS };
export default DEEPER;
