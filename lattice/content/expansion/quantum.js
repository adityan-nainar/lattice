import { AREA, entry, md } from '../helpers.js';

const { QUANTUM, PHYSICS } = AREA;

export const QUANTUM_MORE = [
  // ---------------------------------------------------------------- core quantum
  entry('quantum-tunneling', 'equation', QUANTUM, 'curious', 'Quantum Tunneling', {
    summary: 'A particle can pass through an energy barrier it classically can’t climb. The chance falls off exponentially with the barrier’s width.',
    latex: md`T \approx e^{-2\kappa L}, \qquad \kappa = \frac{\sqrt{2m\,(V - E)}}{\hbar}`,
    variables: [
      [md`T`, 'Probability of getting through'],
      [md`L`, 'Barrier width'],
      [md`V - E`, 'How far the barrier is above the particle’s energy'],
    ],
    aliases: ['tunneling', 'tunnelling', 'quantum tunnelling', 'barrier penetration'],
    tags: ['foundations', 'wavefunctions'],
    body: md`
      Inside a barrier the [[Schrödinger Equation]] has decaying solutions $e^{-\kappa x}$ instead of waves. If the barrier is thin, some wavefunction leaks out the other side.

      **Numbers for an electron, barrier 1 eV above its energy** ($\kappa \approx 5.1\times10^{9}\ \text{m}^{-1}$):
      - $L = 1$ nm: $T \approx e^{-10.2} \approx 4\times10^{-5}$
      - $L = 0.5$ nm: $T \approx 6\times10^{-3}$ — halving the width makes it 170 times likelier.

      **Where it matters:**
      - **Scanning tunnelling microscope:** the current changes about tenfold per 0.1 nm of tip height, fine enough to image single atoms.
      - **Alpha decay** (Gamow, 1928): alpha particles tunnel out of nuclei; tiny changes in energy change half-lives by factors of $10^{20}$.
      - **The Sun shines** because protons tunnel through their electric repulsion to fuse.
      - [[The Josephson Effect]]: Cooper pairs tunnel between superconductors.
    `,
  }),

  entry('hydrogen-atom', 'equation', QUANTUM, 'curious', 'The Hydrogen Atom', {
    summary: 'The one atom you can solve exactly. Its energy levels explain spectral lines, the periodic table’s shape, and the ticks of hydrogen masers.',
    latex: md`E_n = -\frac{m_e e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\,\frac{1}{n^2} = -\frac{13.6\ \text{eV}}{n^2}`,
    variables: [
      [md`n = 1, 2, 3, \dots`, 'Principal quantum number'],
      [md`13.6\ \text{eV}`, 'Ionization energy (the Rydberg energy)'],
    ],
    aliases: ['hydrogen atom', 'Rydberg', 'Balmer series', 'spectral line', 'atomic orbital'],
    tags: ['atoms', 'spectra'],
    body: md`
      Solve the [[Schrödinger Equation]] with the Coulomb potential. The allowed energies are $-13.6\ \text{eV}/n^2$; each level holds orbitals labelled by angular momentum ([[Spin & Angular Momentum]]).

      **Spectral lines:** a jump from level $n_i$ to $n_f$ emits a photon of energy $E_{n_i} - E_{n_f}$ ([[Wave–Particle Duality & de Broglie Wavelength|E = hf]]).
      - $3 \to 2$: $13.6\,(\tfrac14 - \tfrac19) = 1.89$ eV → $\lambda \approx 656$ nm, the red H-α line that colours nebulae.
      - $2 \to 1$: 10.2 eV → 121.5 nm, Lyman-α, in the ultraviolet.

      **Finer detail, each a new piece of physics:**
      - Fine structure — relativity and spin ([[The Dirac Equation & Antimatter]]).
      - The Lamb shift — vacuum fluctuations ([[Quantum Field Theory]]).
      - The 21 cm hyperfine line at 1420.4 MHz — maps hydrogen across galaxies, and ticks in hydrogen maser [[Atomic Clocks]].
    `,
  }),

  entry('fermi-dirac', 'equation', QUANTUM, 'curious', 'Fermi–Dirac Distribution', {
    summary: 'Occupation of states by fermions: at most one per state. Its +1 is the Pauli principle, and it is why metals conduct and stars don’t collapse.',
    latex: md`\bar n(\varepsilon) = \frac{1}{e^{(\varepsilon - \mu)/k_BT} + 1}, \qquad E_F = \frac{\hbar^2}{2m}\left(3\pi^2 n\right)^{2/3}`,
    variables: [
      [md`E_F`, 'Fermi energy: the highest filled level at absolute zero'],
      [md`n`, 'Number density of fermions (spin-½, two per momentum state)'],
    ],
    aliases: ['Fermi–Dirac statistics', 'Fermi energy', 'Fermi sea', 'Fermi level', 'Fermi temperature'],
    tags: ['statistical mechanics', 'fermions'],
    body: md`
      Compare the [[Bose–Einstein Distribution]]: one sign flips from $-1$ to $+1$, and the physics turns upside down. Bosons pile into the ground state; fermions **stack up**, one per state, like filling a stadium from the front row.

      **Copper:** conduction electrons at $n \approx 8.5\times10^{28}\ \text{m}^{-3}$ fill up to $E_F \approx 7$ eV — a "Fermi temperature" of about 80,000 K. So even at room temperature, metal electrons are a cold, degenerate quantum gas.

      **Consequences:**
      - The stacking creates pressure even at zero temperature — [[Degeneracy Pressure & White Dwarfs]].
      - Helium-3 atoms are fermions, so they can’t condense directly: they must pair up first ([[Identical Particles: Bosons & Fermions]]). So must electrons in [[Superconductivity]].
    `,
  }),

  entry('stimulated-emission', 'concept', QUANTUM, 'curious', 'Stimulated Emission & Lasers', {
    summary: 'A photon can make an excited atom emit an identical photon. Bosons like company — and that is how a laser works.',
    latex: md`\text{rate}(n \to n+1) \propto n + 1`,
    variables: [[md`n`, 'Number of photons already in that mode']],
    aliases: ['stimulated emission', 'laser', 'lasers', 'population inversion', 'atom laser'],
    tags: ['light', 'bosons', 'technology'],
    body: md`
      **Einstein (1917):** to match Planck’s radiation law ([[Planck’s Law & Blackbody Radiation]]), atoms must emit not only spontaneously but also when stimulated by light already present. The stimulated photon is a perfect copy: same direction, frequency, phase.

      **Why $n+1$:** for bosons, adding a particle to a mode already holding $n$ is enhanced by $n+1$ ([[Second Quantization & Fock Space]]). The “1” is spontaneous emission; the $n$ is stimulation. Fermions get the opposite: they are forbidden from doubling up.

      **A laser:** pump more atoms into the excited state than the lower one (population inversion), put them between mirrors, and one photon cascades into a coherent beam. Maiman built the first in 1960.

      **Same physics, different bosons:** a [[Bose–Einstein Condensate]] is macroscopic occupation of one mode by atoms, and an outcoupled condensate is literally called an atom laser. Lasers then cool atoms to make condensates ([[Laser Cooling & Atom Traps]]).
    `,
  }),

  entry('path-integral', 'equation', QUANTUM, 'curious', 'Feynman Path Integral', {
    summary: 'A particle takes every path at once; each contributes a phase set by its action. Classical motion is where the phases agree.',
    latex: md`\langle x_f, t_f \mid x_i, t_i\rangle = \int \mathcal{D}x(t)\; e^{\,i S[x(t)]/\hbar}, \qquad S = \int L\,dt`,
    variables: [
      [md`\mathcal{D}x(t)`, 'Sum over all paths from x_i to x_f'],
      [md`S`, 'Classical action of each path'],
    ],
    aliases: ['path integral', 'sum over histories', 'Feynman path integral', 'Feynman diagram'],
    tags: ['foundations', 'action', 'qft'],
    body: md`
      **Feynman (1948):** instead of solving the [[Schrödinger Equation]], add up $e^{iS/\hbar}$ over every conceivable path — straight, wiggly, absurd.

      **Why classical physics emerges:** for everyday objects $S \gg \hbar$, so neighbouring paths have wildly different phases and cancel — except near the path where $S$ is stationary. That is exactly the [[Lagrangian Mechanics & Least Action|principle of least action]].

      **The double slit, made obvious:** paths through each slit add as complex amplitudes and interfere ([[Superposition]]).

      **Where it goes next:**
      - In [[Quantum Field Theory]], expanding the path integral gives Feynman diagrams.
      - A string sums over worldsheets; at one loop the worldsheet is a torus, whose shapes must be integrated over — the root of modular invariance ([[Torus Partition Function & Modular Invariance]]).
      - Replace $it/\hbar$ by $-1/k_BT$ and the path integral becomes a partition function ([[Boltzmann Distribution & Partition Function]]).
    `,
  }),

  entry('dirac-equation', 'equation', QUANTUM, 'curious', 'The Dirac Equation & Antimatter', {
    summary: 'The relativistic equation for the electron. It explained spin, predicted antimatter four years before it was found, and got g = 2.',
    latex: md`\left(i\hbar\,\gamma^\mu\partial_\mu - mc\right)\psi = 0, \qquad \{\gamma^\mu, \gamma^\nu\} = 2\eta^{\mu\nu}`,
    variables: [
      [md`\psi`, 'A four-component spinor'],
      [md`\gamma^\mu`, 'Dirac matrices'],
      [md`\eta^{\mu\nu}`, 'Minkowski metric'],
    ],
    aliases: ['Dirac equation', 'antimatter', 'positron', 'antiparticle', 'spinor'],
    tags: ['relativity', 'particle physics', 'spin'],
    body: md`
      Dirac (1928) wanted an equation first-order in time, like Schrödinger’s, but consistent with [[Four-Momentum & E = mc²|E² = (pc)² + (mc²)²]]. The only way: matrices $\gamma^\mu$, and a four-component wavefunction.

      **What fell out:**
      - **Spin ½** appears automatically, with magnetic g-factor 2 ([[Spin & Angular Momentum]]).
      - **Negative-energy solutions.** Dirac reinterpreted them as a new particle with the electron’s mass and opposite charge. Anderson found the positron in cosmic rays in 1932.
      - The fine structure of [[The Hydrogen Atom]].

      The negative-energy puzzle only fully resolves in [[Quantum Field Theory]], where particles and antiparticles are both excitations of one field — and where the spin–statistics theorem forces spin-½ particles to be fermions ([[Identical Particles: Bosons & Fermions]]).
    `,
  }),

  entry('gauge-symmetry', 'concept', QUANTUM, 'curious', 'Gauge Symmetry', {
    summary: 'Demand that a phase can be changed independently at every point, and you are forced to introduce a force field. Every fundamental force arises this way.',
    latex: md`\psi \to e^{i\alpha(x)}\psi, \qquad A_\mu \to A_\mu - \frac{1}{q}\,\partial_\mu\alpha, \qquad D_\mu = \partial_\mu + iqA_\mu`,
    variables: [
      [md`\alpha(x)`, 'A phase that may differ at every point'],
      [md`A_\mu`, 'Gauge field (for electromagnetism, the electromagnetic potential)'],
      [md`D_\mu`, 'Covariant derivative'],
    ],
    aliases: ['gauge symmetry', 'gauge invariance', 'gauge field', 'gauge theory', 'Yang–Mills'],
    tags: ['symmetry', 'qft', 'forces'],
    body: md`
      A global phase change $\psi \to e^{i\alpha}\psi$ is a symmetry whose [[Noether’s Theorem|Noether charge]] is electric charge. Now let $\alpha$ vary from place to place. Derivatives of $\psi$ pick up extra terms — unless you add a field $A_\mu$ that shifts to cancel them. That field obeys [[Maxwell’s Equations & Light|Maxwell’s equations]]. **Electromagnetism is the price of a local phase symmetry.**

      - Replace the phase by $SU(2)$ or $SU(3)$ matrices ([[Lie Groups & Lie Algebras]]) and you get Yang–Mills theory: the weak and strong forces ([[The Standard Model]]).
      - A gauge field’s mass would break the symmetry — unless the symmetry is broken spontaneously: [[The Higgs Mechanism]].
      - Gauge freedom is redundancy in the description, which is why quantizing it needs ghosts ([[Ghosts, BRST & the No-Ghost Theorem]]).
    `,
  }),

  entry('higgs-mechanism', 'theory', QUANTUM, 'curious', 'The Higgs Mechanism', {
    summary: 'How W and Z bosons get mass without breaking gauge symmetry: a field fills all of space and picks a direction. Found at CERN in 2012.',
    latex: md`V(\phi) = -\mu^2|\phi|^2 + \lambda|\phi|^4, \qquad \langle\phi\rangle = \frac{v}{\sqrt2},\ v \approx 246\ \text{GeV}, \qquad m_H \approx 125\ \text{GeV}`,
    variables: [
      [md`V(\phi)`, 'The “Mexican hat” potential'],
      [md`v`, 'Vacuum expectation value: the Higgs field’s value everywhere in empty space'],
    ],
    aliases: ['Higgs mechanism', 'Higgs boson', 'Higgs field', 'Mexican hat potential'],
    tags: ['particle physics', 'symmetry', 'qft'],
    body: md`
      The potential is lowest not at $\phi = 0$ but on a circle. The universe settles at one point on that circle — [[Spontaneous Symmetry Breaking & Goldstone Modes|spontaneous symmetry breaking]]. Normally that would create a massless Goldstone mode; with a gauge field present, the gauge boson swallows it and becomes massive.

      - The W and Z bosons become heavy (80 and 91 GeV), so the weak force is short-range.
      - Quarks and electrons get their masses from coupling to the Higgs field.
      - The leftover ripple is the Higgs boson, discovered at the LHC in 2012. Nobel Prize 2013 to Englert and Higgs.

      **The same idea in the lab:** inside a superconductor the photon effectively gains mass, so magnetic fields can only penetrate a short distance — the Meissner effect ([[Superconductivity]]). Anderson pointed this out in 1962, before the particle-physics version.
    `,
  }),

  entry('standard-model', 'theory', QUANTUM, 'curious', 'The Standard Model', {
    summary: 'The quantum field theory of all known particles and three of the four forces. Extraordinarily accurate — and silent on gravity, dark matter and dark energy.',
    latex: md`SU(3)_C \times SU(2)_L \times U(1)_Y`,
    variables: [
      [md`SU(3)_C`, 'Strong force (colour): gluons'],
      [md`SU(2)_L \times U(1)_Y`, 'Electroweak force: W, Z and photon'],
    ],
    aliases: ['Standard Model', 'particle physics', 'quarks', 'gluons', 'electroweak'],
    tags: ['particle physics', 'qft'],
    body: md`
      **Ingredients:** 12 fermions (6 quarks, 6 leptons), 4 kinds of force carrier (gluon, photon, W, Z), and the Higgs boson.

      - Forces come from [[Gauge Symmetry]] with the groups above; masses from [[The Higgs Mechanism]].
      - Gauge anomalies must cancel between quarks and leptons in each generation — one reason the particle content is what it is ([[Quantum Anomalies & the Central Charge]]).
      - Predicts the electron’s magnetic moment to better than a part in a billion.

      **What it doesn’t explain:** gravity ([[Why don’t quantum mechanics and general relativity fit together?]]), dark matter, dark energy ([[The Vacuum Energy Problem]]), neutrino masses, or why there are three generations — which [[Calabi–Yau Manifolds]] try to answer with topology.
    `,
  }),

  entry('bell-chsh', 'equation', QUANTUM, 'curious', 'Bell’s Theorem', {
    summary: 'No theory of pre-existing local properties can reproduce quantum correlations. Experiments side with quantum mechanics: S reaches 2√2, beyond the classical limit of 2.',
    latex: md`S = E(a,b) - E(a,b') + E(a',b) + E(a',b'), \qquad |S|_{\text{local}} \le 2, \qquad |S|_{\text{quantum}} \le 2\sqrt2 \approx 2.83`,
    variables: [
      [md`E(a,b)`, 'Correlation of ±1 outcomes when Alice measures along a and Bob along b'],
      [md`2\sqrt2`, 'Tsirelson’s bound, reached by an entangled pair'],
    ],
    aliases: ['Bell’s theorem', 'CHSH inequality', 'Bell test', 'Tsirelson bound', 'local hidden variables'],
    tags: ['foundations', 'nonlocality', 'experiments'],
    body: md`
      **The setup (CHSH, 1969):** Alice picks one of two measurement settings, Bob one of two, far apart. If outcomes were fixed in advance by local hidden variables, the combination $S$ could never exceed 2.

      **Quantum prediction:** with polarization-[[Entanglement|entangled]] photons in the state $\ket{\Phi^+}$ and polarizers at 0° and 45° (Alice) and 22.5° and 67.5° (Bob), $S = 2\sqrt2$.

      **Experiments:** Aspect (1982) and loophole-free tests in 2015 find violations. Nobel Prize 2022.

      **What it means:** either properties aren’t fixed before measurement, or influences are nonlocal — yet no usable signal goes faster than light ([[Speed of Light]]). Which way to read it is part of [[The Measurement Problem]].

      Used today to certify randomness and secure quantum key distribution ([[Quantum Computing]]).
    `,
  }),

  entry('measurement-problem', 'question', QUANTUM, 'curious', 'The Measurement Problem', {
    summary: 'The Schrödinger equation never picks a single outcome, yet every measurement has one. What actually happens is still argued about.',
    aliases: ['measurement problem', 'wavefunction collapse', 'collapse of the wavefunction', 'many-worlds', 'Copenhagen interpretation', 'Schrödinger’s cat'],
    tags: ['foundations', 'open question', 'interpretation'],
    body: md`
      [[Superposition]] + linear evolution says a measuring device (and you) should end up in a superposition too. [[Measurement, Density Matrices & Decoherence|Decoherence]] explains why the branches stop interfering, but not why you see only one.

      **Main camps:**
      - **Copenhagen:** don’t ask; quantum mechanics predicts measurement statistics ([[Born Rule]]).
      - **Many-worlds** (Everett, 1957): nothing collapses; every outcome happens in its own branch.
      - **Hidden variables / Bohmian mechanics** (1952): particles have definite positions guided by the wavefunction — necessarily nonlocal ([[Bell’s Theorem]]).
      - **Objective collapse** (GRW 1986; Penrose–Diósi): collapse is a real physical process. Penrose links it to gravity: superposing a mass in two places superposes two spacetimes, which might be unstable.

      That last idea is testable in principle — the same territory as [[Clocks, Superposition and Gravity]].
    `,
  }),

  entry('quantum-computing', 'concept', QUANTUM, 'curious', 'Quantum Computing', {
    summary: 'Computing with superpositions of many bit-strings at once and making the wrong answers cancel. n qubits carry 2ⁿ amplitudes — 300 qubits beat the number of atoms in the universe.',
    latex: md`\ket{\psi} = \sum_{x\in\{0,1\}^n} c_x \ket{x}, \qquad 2^{300} \approx 2\times10^{90}`,
    variables: [
      [md`c_x`, 'An amplitude for every n-bit string'],
    ],
    aliases: ['quantum computer', 'quantum computing', 'qubit', 'qubits', 'Shor’s algorithm', 'Grover’s algorithm', 'quantum error correction'],
    tags: ['technology', 'information', 'superposition'],
    body: md`
      A qubit is a two-level system in [[Superposition]]; many qubits can be [[Entanglement|entangled]]. The state holds $2^n$ amplitudes, but a measurement returns only $n$ bits, so algorithms must arrange [[Waves, Interference & Normal Modes|interference]] so the right answers survive.

      - **Shor (1994):** factor large numbers exponentially faster than any known classical method — breaking today’s RSA encryption, eventually.
      - **Grover (1996):** search $N$ items in about $\sqrt N$ steps.
      - **Simulating nature:** molecules and materials are quantum, so quantum computers are natural simulators — Feynman’s original 1981 motivation.

      **The enemy is decoherence** ([[Measurement, Density Matrices & Decoherence]]): the environment learns about the qubits and superpositions leak away. Hardware: superconducting circuits built on [[The Josephson Effect]], trapped ions cooled by lasers ([[Laser Cooling & Atom Traps]]), and proposals using anyons from the [[Quantum Hall Effect]].
    `,
  }),

  // ---------------------------------------------------------------- extreme matter
  entry('superconductivity', 'concept', QUANTUM, 'curious', 'Superconductivity', {
    summary: 'Cooled far enough, some metals lose all electrical resistance and push out magnetic fields. Electrons pair up and the pairs flow like a superfluid.',
    latex: md`\Phi = n\,\frac{h}{2e}, \qquad \frac{h}{2e} \approx 2.07\times10^{-15}\ \text{Wb}, \qquad \Delta(0) \approx 1.76\,k_B T_c`,
    variables: [
      [md`\Phi`, 'Magnetic flux through a superconducting ring — quantized'],
      [md`2e`, 'Charge of a Cooper pair'],
      [md`\Delta`, 'Energy gap (BCS theory)'],
    ],
    aliases: ['superconductor', 'superconducting', 'Cooper pair', 'BCS theory', 'Meissner effect', 'flux quantum'],
    tags: ['extreme matter', 'macroscopic quantum', 'zero resistance'],
    body: md`
      - **1911:** Kamerlingh Onnes finds mercury’s resistance vanish at 4.2 K.
      - **1933:** the Meissner effect — magnetic fields are expelled, so magnets levitate above superconductors.
      - **1957, BCS theory:** vibrations of the crystal ([[Quasiparticles: Phonons & Rotons|phonons]]) make electrons weakly attract and form **Cooper pairs**. Two fermions make a boson ([[Identical Particles: Bosons & Fermions]]), and the pairs share one macroscopic phase.
      - **1986:** copper-oxide “high-temperature” superconductors; YBCO works at 92 K, above liquid nitrogen’s boiling point. Their mechanism is still debated.

      **Superconductivity is superfluidity of charged pairs:** zero resistance ↔ zero viscosity ([[Superfluidity]]); flux quantized in units of $h/2e$ ↔ circulation quantized in $h/m$ ([[Quantized Circulation]]). Helium-3 goes superfluid by the same pairing trick.

      The Meissner effect is the photon acquiring mass — the lab version of [[The Higgs Mechanism]].
    `,
  }),

  entry('josephson-effect', 'equation', QUANTUM, 'curious', 'The Josephson Effect', {
    summary: 'Cooper pairs tunnel between two superconductors separated by a thin barrier. A DC voltage produces an AC current at a frequency set only by fundamental constants.',
    latex: md`I = I_c \sin\varphi, \qquad \frac{d\varphi}{dt} = \frac{2eV}{\hbar} \;\Rightarrow\; f = \frac{2e}{h}V \approx 483.6\ \text{GHz per mV}`,
    variables: [
      [md`\varphi`, 'Phase difference between the two superconductors'],
      [md`I_c`, 'Critical current of the junction'],
    ],
    aliases: ['Josephson junction', 'Josephson effect', 'SQUID'],
    tags: ['extreme matter', 'technology', 'metrology'],
    body: md`
      Brian Josephson predicted it in 1962 as a graduate student (Nobel Prize 1973).

      - Current flows with **no voltage**, driven purely by the phase difference — a direct readout of the macroscopic wavefunction of [[Superconductivity]], via [[Quantum Tunneling]].
      - Apply a voltage and the phase winds steadily, so the current oscillates at $f = 2eV/h$. Because $2e/h$ is exact, Josephson junction arrays define the **volt** worldwide.
      - **SQUIDs** (two junctions in a loop) measure magnetic flux to a tiny fraction of $h/2e$ — sensitive enough to detect brain activity.
      - Superconducting qubits in most [[Quantum Computing|quantum computers]] are Josephson circuits.

      Superfluid helium shows the same effect through tiny apertures ([[Superfluidity]]).
    `,
  }),

  entry('quantum-hall-effect', 'equation', QUANTUM, 'curious', 'Quantum Hall Effect', {
    summary: 'In a 2D electron gas in a strong magnetic field, the Hall resistance locks onto h/(ne²) — exact to parts per billion, whatever the material’s imperfections. Topology at work.',
    latex: md`R_{xy} = \frac{h}{\nu\,e^2}, \qquad \frac{h}{e^2} = R_K \approx 25\,812.807\ \Omega`,
    variables: [
      [md`\nu`, 'Filling factor: an integer, or a fraction like 1/3'],
      [md`R_K`, 'von Klitzing constant'],
    ],
    aliases: ['quantum Hall effect', 'von Klitzing constant', 'fractional quantum Hall effect', 'anyons', 'anyon', 'Landau levels'],
    tags: ['extreme matter', 'topology', 'metrology'],
    body: md`
      - **Integer effect** (von Klitzing, 1980; Nobel 1985): plateaus at integer $\nu$. The integer is a topological winding (Chern) number of the electrons’ quantum states, which is why dirt and defects can’t change it ([[Topology & Winding Numbers]]). Now used to define the ohm.
      - **Fractional effect** (Tsui, Störmer, Gossard, 1982; Laughlin’s theory): plateaus at $\nu = 1/3, 2/5, \dots$ The excitations carry fractional charge $e/3$ and are **anyons** — neither bosons nor fermions ([[Identical Particles: Bosons & Fermions]]). That only works in two dimensions.

      Anyons are described by Chern–Simons theory ([[Knots & Quantum Field Theory]]), and braiding them is one proposed way to build noise-proof [[Quantum Computing|quantum computers]].
    `,
  }),

  entry('degeneracy-pressure', 'equation', QUANTUM, 'curious', 'Degeneracy Pressure & White Dwarfs', {
    summary: 'Electrons can’t share states, so squeezing them costs energy even at zero temperature. That pressure holds up white dwarfs — up to about 1.4 solar masses.',
    latex: md`P \propto \frac{\hbar^2}{m_e}\,n^{5/3}\ (\text{non-relativistic}), \qquad M_{\text{Ch}} \approx \frac{5.83}{\mu_e^2}\,M_\odot \approx 1.4\,M_\odot`,
    variables: [
      [md`n`, 'Electron number density'],
      [md`\mu_e`, 'Nucleons per electron (≈ 2 for carbon and oxygen)'],
      [md`M_{\text{Ch}}`, 'Chandrasekhar limit'],
    ],
    aliases: ['degeneracy pressure', 'white dwarf', 'Chandrasekhar limit', 'electron degeneracy'],
    tags: ['astrophysics', 'fermions', 'extreme matter'],
    body: md`
      Pack electrons tighter and the [[Fermi–Dirac Distribution|Fermi energy]] rises, so the gas pushes back — pure quantum mechanics, no heat needed.

      **White dwarfs:** a star like the Sun ends as a ball of carbon and oxygen the size of Earth, about a tonne per cubic centimetre, held up by electron degeneracy pressure.

      **The limit (Chandrasekhar, 1930, age 19):** in a heavy enough star the electrons become relativistic ([[Four-Momentum & E = mc²]]), pressure grows more slowly, and gravity wins above about 1.4 solar masses. Nobel Prize 1983.

      **Beyond the limit:** electrons merge with protons into neutrons → [[Neutron Stars]]. Beyond *their* limit → [[Black Holes & Event Horizons]]. White dwarfs that cross the limit explode as type Ia supernovae — the “standard candles” that revealed dark energy ([[The Expanding Universe]]).
    `,
  }),

  entry('neutron-stars', 'concept', QUANTUM, 'curious', 'Neutron Stars', {
    summary: 'A sun’s mass crushed into a 12 km ball of neutrons. Superfluid inside, clocks at its surface run about 19% slow, and some rotate hundreds of times a second.',
    latex: md`\rho \sim 4\times10^{17}\ \text{kg/m}^3, \qquad \frac{d\tau}{dt}\bigg|_{\text{surface}} = \sqrt{1 - \frac{r_s}{R}} \approx \sqrt{1 - \frac{4.1\ \text{km}}{12\ \text{km}}} \approx 0.81`,
    variables: [
      [md`\rho`, 'Average density — about that of an atomic nucleus'],
      [md`r_s`, 'Schwarzschild radius of 1.4 solar masses'],
    ],
    aliases: ['neutron star', 'pulsar', 'pulsars', 'magnetar', 'pulsar glitch'],
    tags: ['astrophysics', 'extreme matter', 'bridge'],
    body: md`
      Formed when a massive star’s core collapses past the [[Degeneracy Pressure & White Dwarfs|Chandrasekhar limit]]. Neutron degeneracy pressure and nuclear forces hold it up — until about 2–2.3 solar masses, beyond which it becomes a [[Black Holes & Event Horizons|black hole]].

      **One object, many of your topics:**
      - **Superfluid inside:** neutrons pair up and form a superfluid threaded by [[Quantized Circulation|quantized vortices]]. Pulsars sometimes suddenly speed up — “glitches” — thought to be vortices unpinning and dumping angular momentum into the crust ([[Superfluidity]]).
      - **Strong gravity:** surface clocks run at ~81% the rate of distant ones ([[Gravitational Time Dilation]]); light bends so much you can see part of the back.
      - **Pulsars** keep time to rival [[Atomic Clocks]]. The Hulse–Taylor binary pulsar’s slowly shrinking orbit was the first evidence for [[Gravitational Waves]] (Nobel 1993), and merging neutron stars (GW170817) showed gravitational waves travel at the [[Speed of Light]].
    `,
  }),

  // ---------------------------------------------------------------- classical physics additions
  entry('planck-blackbody', 'equation', PHYSICS, 'curious', 'Planck’s Law & Blackbody Radiation', {
    summary: 'The spectrum of light from any hot object. Explaining it forced Planck to introduce h in 1900 — the birth of quantum physics.',
    latex: md`B_\nu(T) = \frac{2h\nu^3}{c^2}\,\frac{1}{e^{h\nu/k_BT} - 1}, \qquad \lambda_{\max} T \approx 2.898\times10^{-3}\ \text{m·K}, \qquad j = \sigma T^4`,
    variables: [
      [md`B_\nu`, 'Spectral radiance at frequency ν'],
      [md`\lambda_{\max}`, 'Peak wavelength (Wien’s law)'],
      [md`\sigma T^4`, 'Total power per area (Stefan–Boltzmann law)'],
    ],
    aliases: ['blackbody', 'black body', 'blackbody radiation', 'Planck’s law', 'Wien’s law', 'Stefan–Boltzmann law', 'ultraviolet catastrophe'],
    tags: ['light', 'thermodynamics', 'history'],
    body: md`
      Classical physics predicted infinite energy at high frequencies — the ultraviolet catastrophe. Planck fixed it by assuming energy comes in chunks $h\nu$ ([[Wave–Particle Duality & de Broglie Wavelength]]).

      **Look at the last factor:** $1/(e^{h\nu/k_BT} - 1)$ is the [[Bose–Einstein Distribution]] with $\mu = 0$. A blackbody is a gas of photons — bosons whose number isn’t conserved. Each mode is a [[Quantum Harmonic Oscillator]].

      **Examples:**
      - The Sun (5,800 K) peaks near 500 nm — green light, which our eyes are tuned around.
      - You (310 K) peak near 9.3 μm, in the infrared.
      - The universe itself glows at 2.7 K: [[The Cosmic Microwave Background]].
      - A black hole radiates as a blackbody too ([[Hawking Radiation]]).
    `,
  }),

  entry('rayleigh-scattering', 'equation', PHYSICS, 'curious', 'Why the Sky Is Blue', {
    summary: 'Air molecules scatter short wavelengths far more than long ones — as 1/λ⁴. So blue light is scattered across the sky and sunsets are red.',
    latex: md`I_{\text{scattered}} \propto \frac{1}{\lambda^4}, \qquad \left(\frac{700\ \text{nm}}{450\ \text{nm}}\right)^4 \approx 5.9`,
    variables: [[md`\lambda`, 'Wavelength of the light']],
    aliases: ['Rayleigh scattering', 'blue sky', 'sunset'],
    tags: ['light', 'everyday physics'],
    body: md`
      Light’s oscillating electric field shakes the electrons in molecules much smaller than the wavelength; they re-radiate like tiny antennas ([[Maxwell’s Equations & Light]]). The radiated power grows as frequency to the fourth, i.e. $1/\lambda^4$. Rayleigh, 1871.

      - Blue light (450 nm) scatters about **6 times** more than red (700 nm) — look anywhere away from the Sun and you see scattered blue.
      - **Why not violet?** The Sun emits less violet ([[Planck’s Law & Blackbody Radiation]]), some is absorbed high in the atmosphere, and our eyes are less sensitive to it.
      - **Sunsets:** light crosses much more air, the blue is scattered away, and the red-orange remains.
      - **Clouds are white** because water droplets are larger than the wavelength, and scatter all colours about equally.
    `,
  }),

  entry('landauer-principle', 'equation', PHYSICS, 'curious', 'Maxwell’s Demon & Landauer’s Principle', {
    summary: 'Erasing one bit of information must release at least k_BT ln 2 of heat. Information is physical — which is how the second law survives Maxwell’s demon.',
    latex: md`E_{\min} = k_B T \ln 2 \approx 2.9\times10^{-21}\ \text{J} \approx 0.018\ \text{eV at } 300\ \text{K}`,
    variables: [
      [md`\ln 2`, 'Entropy of one bit, in units of k_B'],
    ],
    aliases: ['Maxwell’s demon', 'Landauer’s principle', 'Landauer limit', 'information entropy', 'Shannon entropy'],
    tags: ['thermodynamics', 'information', 'computing'],
    body: md`
      **The demon (Maxwell, 1867):** a tiny being opens a door to let fast molecules one way and slow ones the other. Hot and cold separate without work — breaking the second law ([[Temperature, Entropy & Chemical Potential]]).

      **The resolution:** the demon has to record each molecule’s speed. Its memory fills up, and wiping it (Landauer, 1961; Bennett, 1982) costs at least $k_BT\ln 2$ per bit — exactly enough to pay back the entropy.

      - Measured directly in 2012 with a single colloidal bead in a laser trap.
      - Today’s chips dissipate far more than this per bit, but the limit sets the ultimate efficiency of computing.
      - Reversible and [[Quantum Computing|quantum computation]] avoid erasing information, so avoid this cost in principle.
      - Entropy as missing information links thermodynamics to [[Black Hole Entropy & the Holographic Principle|black hole entropy]].
    `,
  }),
];
