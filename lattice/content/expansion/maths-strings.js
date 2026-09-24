import { AREA, entry, md } from '../helpers.js';

const { MATHS, STRING } = AREA;

export const MATHS_STRINGS = [
  // ---------------------------------------------------------------- maths
  entry('octonions', 'concept', MATHS, 'curious', 'Octonions', {
    summary: 'An 8-dimensional number system where multiplication is neither commutative nor associative — and the last one of its kind. Behind E₈, the exceptional groups and 10-dimensional superstrings.',
    latex: md`\dim\ \mathbb{R},\ \mathbb{C},\ \mathbb{H},\ \mathbb{O} = 1,\ 2,\ 4,\ 8 \qquad |xy| = |x|\,|y|`,
    variables: [
      [md`\mathbb{H}`, 'Quaternions: 4D, not commutative'],
      [md`\mathbb{O}`, 'Octonions: 8D, not even associative'],
    ],
    aliases: ['octonion', 'quaternions', 'quaternion', 'division algebra', 'Hurwitz’s theorem'],
    tags: ['algebra', 'exceptional structures'],
    body: md`
      Double the reals to get the complex numbers, double again to get quaternions (Hamilton, 1843), double once more to get octonions (Graves and Cayley, 1843–45). Each step loses something: order, then commutativity, then associativity.

      **Hurwitz’s theorem (1898):** a number system where the size of a product is the product of the sizes exists only in dimensions **1, 2, 4 and 8**. There is no 16-dimensional version — the doubling breaks down.

      **Why they keep turning up:**
      - The symmetry group of the octonions is $G_2$, the smallest exceptional Lie group; $F_4$, $E_6$, $E_7$ and [[E₈]] can all be built from them.
      - Supersymmetric strings are consistent in $1+2 = 3$, $2+2 = 4$, $4+2 = 6$ and $8+2 = 10$ dimensions — one for each normed division algebra. The octonions go with [[Superstring Theory]] in 10D.
    `,
    sources: ['John Baez — The Octonions, Bull. AMS 39 (2002)'],
  }),

  entry('e8', 'concept', MATHS, 'curious', 'E₈', {
    summary: 'The largest exceptional Lie group (248 dimensions) and its root lattice, the densest packing in 8D. Shows up in heterotic strings, in theta functions — and in a real magnet.',
    latex: md`\dim E_8 = 248 = 8 + 240, \qquad \theta_{E_8}(\tau) = E_4(\tau) = 1 + 240\,q + 2160\,q^2 + \cdots`,
    variables: [
      [md`8`, 'Rank (the Cartan subalgebra)'],
      [md`240`, 'Number of roots = shortest lattice vectors = kissing number in 8D'],
    ],
    aliases: ['E8 lattice', 'E₈ lattice', 'E8 Lie group', 'exceptional Lie group', 'exceptional Lie algebra'],
    tags: ['lie algebras', 'lattices', 'exceptional structures'],
    body: md`
      **Three faces of one object:**
      - **A Lie algebra:** classification of simple Lie algebras gives four infinite families plus five exceptions — $G_2, F_4, E_6, E_7, E_8$. $E_8$ is the biggest, with 248 dimensions ([[Lie Groups & Lie Algebras]]).
      - **A lattice:** its 240 roots generate the unique even unimodular lattice in 8 dimensions. Its theta function is exactly the Eisenstein series $E_4$ ([[Eisenstein Series, η and the Discriminant]]). The lattice VOA of $E_8$ has $\dim V_1 = 8 + 240 = 248$ — the Lie algebra reappears ([[Lattice Vertex Algebras]]).
      - **A packing:** the densest way to pack spheres in 8D ([[Sphere Packing]]).

      **In physics:**
      - The heterotic string’s gauge group $E_8\times E_8$ comes from two copies of this lattice ([[Superstring Theory]]).
      - In 2010, neutron scattering on the magnet cobalt niobate near a quantum critical point found excitations whose first two masses have ratio ≈ 1.618 — the golden ratio predicted by Zamolodchikov’s $E_8$ field theory.
    `,
    sources: ['Coldea et al. — Quantum Criticality in an Ising Chain: Experimental Evidence for Emergent E8 Symmetry, Science 327, 177 (2010)'],
  }),

  entry('sphere-packing', 'theory', MATHS, 'curious', 'Sphere Packing', {
    summary: 'How densely can identical balls fill space? Solved in 3, 8 and 24 dimensions — and the proofs for 8 and 24 use modular forms.',
    latex: md`\Delta_3 = \frac{\pi}{\sqrt{18}} \approx 0.7405, \qquad \Delta_8 = \frac{\pi^4}{384} \approx 0.2537, \qquad \Delta_{24} = \frac{\pi^{12}}{12!} \approx 0.00193`,
    variables: [[md`\Delta_d`, 'Fraction of d-dimensional space filled by the best packing']],
    aliases: ['packing density', 'Kepler conjecture', 'Viazovska'],
    tags: ['lattices', 'geometry', '24 dimensions'],
    body: md`
      - **3D:** oranges on a market stall (face-centred cubic) are optimal — Kepler’s 1611 conjecture, proved by Hales (1998, formally verified 2014).
      - **8D:** the [[E₈]] lattice. Proved optimal by Maryna Viazovska in 2016.
      - **24D:** the [[Leech Lattice]], a week later, by Cohn, Kumar, Miller, Radchenko and Viazovska. Fields Medal 2022.
      - Every other dimension above 3 is still open.

      **The surprise:** Viazovska’s proof builds a special “magic function” out of [[Modular Group & Modular Forms|modular forms]] — the same objects behind [[The j-invariant]] and moonshine. Why dimensions 8 and 24 are solvable while 4, 5, 6… are not is tied to how exceptional those two lattices are ([[Why does 24 keep showing up?]]).
    `,
    sources: ['Erica Klarreich — Sphere Packing Solved in Higher Dimensions, Quanta Magazine (2016)'],
  }),

  entry('riemann-hypothesis', 'question', MATHS, 'curious', 'The Riemann Hypothesis', {
    summary: 'All non-trivial zeros of ζ(s) lie on the line Re s = ½. If true, primes are as evenly spread as they can be. The zeros look statistically like energy levels of a quantum system.',
    latex: md`\zeta(s) = \prod_{p\ \text{prime}} \frac{1}{1 - p^{-s}}, \qquad \zeta(s) = 0,\ 0 < \mathrm{Re}\,s < 1 \;\overset{?}{\Longrightarrow}\; \mathrm{Re}\,s = \tfrac12`,
    variables: [
      [md`\prod_p`, 'Euler product: the zeta function encodes every prime'],
    ],
    aliases: ['Riemann hypothesis', 'critical line', 'prime number theorem', 'Hilbert–Pólya conjecture'],
    tags: ['number theory', 'open question', 'primes'],
    body: md`
      **Why primes:** the Euler product ties $\zeta$ to the primes. The zeros control the error in the prime number theorem $\pi(x) \sim x/\ln x$. Riemann (1859) guessed they all sit on $\mathrm{Re}\,s = \tfrac12$. More than $10^{13}$ zeros have been checked. A proof would win a million-dollar Clay Millennium Prize.

      **The physics rabbit hole:**
      - In 1972, Hugh Montgomery showed Freeman Dyson his formula for how zeros repel each other. Dyson recognised it instantly: the same statistics as eigenvalues of random Hermitian matrices, which describe energy levels of heavy nuclei.
      - **Hilbert–Pólya idea:** maybe the zeros *are* the eigenvalues of some quantum Hamiltonian. That would prove the hypothesis, since Hermitian operators have real eigenvalues ([[Eigenvalues & Eigenvectors]]). No such operator is known.

      The trivial zeros are at $-2, -4, -6, \dots$ — the same continued function that gives $\zeta(-1) = -\tfrac1{12}$ ([[Riemann Zeta Function]]).
    `,
  }),

  entry('modularity-fermat', 'theory', MATHS, 'curious', 'Fermat’s Last Theorem & Modularity', {
    summary: 'xⁿ + yⁿ = zⁿ has no whole-number solutions for n > 2. The proof went through elliptic curves and modular forms — every elliptic curve secretly is one.',
    latex: md`x^n + y^n = z^n,\ n > 2 \;\Rightarrow\; \text{no } x, y, z \in \mathbb{Z}_{>0}; \qquad E_{\text{Frey}}:\ y^2 = x\,(x - a^n)(x + b^n)`,
    variables: [
      [md`E_{\text{Frey}}`, 'The elliptic curve built from a hypothetical solution aⁿ + bⁿ = cⁿ'],
    ],
    aliases: ['Fermat’s Last Theorem', 'modularity theorem', 'Taniyama–Shimura', 'Frey curve'],
    tags: ['number theory', 'modular forms', 'elliptic curves'],
    body: md`
      Fermat (1637) scribbled that he had a proof too large for the margin. It took 358 years.

      **The route:**
      1. Frey (1984): a solution $a^n + b^n = c^n$ would give a very strange [[Tori, Lattices in ℂ & Elliptic Curves|elliptic curve]].
      2. Ribet (1986): that curve could not be modular.
      3. **Modularity (Taniyama–Shimura):** every elliptic curve over the rationals comes from a [[Modular Group & Modular Forms|modular form]] — its point counts are the coefficients of a $q$-series.
      4. Wiles (1995, with Taylor) proved enough of modularity to rule out Frey’s curve. So no solution exists.

      The full modularity theorem was finished in 2001. Modular forms: the same objects that count string states and encode moonshine.
    `,
  }),

  entry('ramanujan-tau', 'equation', MATHS, 'curious', 'Ramanujan’s Tau Function', {
    summary: 'The coefficients of Δ = η²⁴. Ramanujan found patterns in them in 1916 that took 58 years and the Weil conjectures to prove.',
    latex: md`\Delta(\tau) = q\prod_{n\ge1}(1-q^n)^{24} = \sum_{n\ge1}\tau(n)\,q^n = q - 24q^2 + 252q^3 - 1472q^4 + 4830q^5 - \cdots`,
    variables: [
      [md`\tau(n)`, 'Ramanujan’s tau function'],
    ],
    aliases: ['tau function', 'Ramanujan tau', 'Ramanujan–Petersson conjecture'],
    tags: ['number theory', 'modular forms', '24 dimensions'],
    body: md`
      Ramanujan conjectured (1916):
      - **Multiplicative:** $\tau(mn) = \tau(m)\tau(n)$ when $\gcd(m,n) = 1$ — proved by Mordell (1917).
      - **Size bound:** $|\tau(p)| \le 2p^{11/2}$ for primes — proved by Deligne (1974) as part of the Weil conjectures. Fields Medal.
      - **Congruence:** $\tau(n) \equiv \sigma_{11}(n) \pmod{691}$.

      Still open: **Lehmer’s question** — is $\tau(n)$ ever zero?

      **Connection:** the coefficients of $1/\Delta$ count states of 24 string oscillators ([[Counting states of 24 string oscillators]]), and $\Delta$ is the denominator of [[The j-invariant]]. See [[Eisenstein Series, η and the Discriminant]].
    `,
  }),

  entry('knot-theory', 'concept', MATHS, 'curious', 'Knots & Quantum Field Theory', {
    summary: 'Telling knots apart is hard. The Jones polynomial does it surprisingly well — and Witten showed it is secretly a quantum field theory calculation.',
    tags: ['topology', 'qft'],
    aliases: ['knot theory', 'Jones polynomial', 'Chern–Simons theory', 'knot invariant'],
    body: md`
      A **knot** is a closed loop in 3D space, considered up to wiggling without cutting. A **knot invariant** is any quantity that doesn’t change under wiggling — if two knots have different invariants, they really are different.

      - **Jones polynomial** (Vaughan Jones, 1984): an invariant discovered from operator algebras, far stronger than earlier ones.
      - **Witten (1989):** the Jones polynomial is the expectation value of a Wilson loop in **Chern–Simons theory**, a 3D [[Quantum Field Theory]] whose answers don’t depend on distances at all — a *topological* field theory.
      - Jones and Witten both received the Fields Medal in 1990.

      The same topological QFT is connected to 2D [[2D Conformal Field Theory|conformal field theories]] on its boundary, and to anyons in the fractional [[Quantum Hall Effect]] — a candidate route to error-protected quantum computers ([[Quantum Computing]]).
    `,
  }),

  entry('topology-winding', 'concept', MATHS, 'curious', 'Topology & Winding Numbers', {
    summary: 'Properties that survive any smooth deformation — like how many times a loop winds around a hole. Explains why some physical quantities come in exact whole numbers.',
    latex: md`n = \frac{1}{2\pi}\oint \nabla\theta\cdot d\boldsymbol\ell \in \mathbb{Z}`,
    variables: [
      [md`\theta`, 'A phase (angle) defined around a loop'],
      [md`n`, 'Winding number: how many full turns the phase makes'],
    ],
    aliases: ['topology', 'topological', 'winding number', 'topological invariant', 'Chern number'],
    tags: ['topology', 'geometry'],
    body: md`
      A coffee mug and a doughnut are the same to a topologist: one hole each. Topological quantities are integers, so small perturbations can’t change them — they are *robust*.

      **Where exact integers in physics come from:**
      - A superfluid’s phase must come back to itself around a loop, so it winds a whole number of times → [[Quantized Circulation]].
      - Electrons in a 2D material have a winding (Chern) number over momentum space → resistance quantized to $h/e^2n$ in the [[Quantum Hall Effect]], precise to parts per billion.
      - Magnetic flux through a superconducting ring comes in units of $h/2e$ ([[Superconductivity]]).

      Nobel Prize 2016 (Thouless, Haldane, Kosterlitz): topological phases of matter. Related: [[Knots & Quantum Field Theory]].
    `,
  }),

  // ---------------------------------------------------------------- strings & dimensions
  entry('kaluza-klein', 'theory', STRING, 'curious', 'Kaluza–Klein Theory', {
    summary: 'Add a fifth, tiny, curled-up dimension to general relativity and electromagnetism falls out for free. The 1920s ancestor of string theory’s extra dimensions.',
    latex: md`g^{(5)}_{MN} = \begin{pmatrix} g_{\mu\nu} + \phi^2 A_\mu A_\nu & \phi^2 A_\mu \\ \phi^2 A_\nu & \phi^2 \end{pmatrix}, \qquad q = \frac{n\hbar}{R}\ (\text{in suitable units})`,
    variables: [
      [md`g_{\mu\nu}`, '4D metric: gravity'],
      [md`A_\mu`, 'Electromagnetic potential, hiding in the 5th row and column'],
      [md`\phi`, 'Size of the extra dimension (a scalar field)'],
      [md`R`, 'Radius of the curled-up dimension; momentum around it looks like charge'],
    ],
    aliases: ['Kaluza–Klein', 'extra dimension', 'extra dimensions', 'fifth dimension'],
    tags: ['dimensions', 'general relativity', 'electromagnetism'],
    body: md`
      **Kaluza (1921):** write Einstein’s equations in 5 dimensions. The extra components of the metric obey [[Maxwell’s Equations & Light|Maxwell’s equations]]. Gravity and electromagnetism from one geometry.

      **Klein (1926):** why don’t we see the fifth dimension? Because it is a tiny circle. Quantum momentum around a circle is quantized ([[Compactification on a Torus]]), which would explain why electric charge comes in whole units.

      **What went wrong:** the predicted scalar field $\phi$ and the Planck-sized radius didn’t fit experiments.

      **What survived:** the idea that forces are geometry in hidden dimensions. String theory needs 6 (superstrings) or 22 (bosonic) of them — curled up on shapes like [[Calabi–Yau Manifolds]].
    `,
  }),

  entry('calabi-yau', 'concept', STRING, 'curious', 'Calabi–Yau Manifolds', {
    summary: 'The six-dimensional shapes superstrings are usually curled up on. Their geometry decides the particles and forces you would see in four dimensions.',
    latex: md`R_{i\bar j} = 0, \qquad \text{complex dimension } 3\ (\text{6 real}), \qquad N_{\text{generations}} = \tfrac12|\chi|`,
    variables: [
      [md`R_{i\bar j}`, 'Ricci curvature — zero: these spaces are Ricci-flat'],
      [md`\chi`, 'Euler characteristic, a topological count of the shape'],
    ],
    aliases: ['Calabi–Yau', 'Calabi–Yau manifold', 'Calabi–Yau space'],
    tags: ['strings', 'geometry', 'dimensions'],
    body: md`
      - **Calabi (1954)** conjectured that certain complex spaces admit Ricci-flat metrics; **Yau (1977)** proved it.
      - **1985:** Candelas, Horowitz, Strominger and Witten showed that compactifying the heterotic [[Superstring Theory|superstring]] on such a space keeps some supersymmetry in 4D.
      - In the simplest models the number of particle generations is half the Euler characteristic — **topology decides how many kinds of quark you get** ([[Topology & Winding Numbers]]).
      - Hundreds of millions of Calabi–Yau threefold constructions are known, which is part of why string theory struggles to make unique predictions.

      The simplest Calabi–Yau spaces are the 1D one — a [[Tori, Lattices in ℂ & Elliptic Curves|torus]] — and the 2D K3 surface of [[Mathieu & Umbral Moonshine]].
    `,
  }),

  entry('t-duality', 'concept', STRING, 'curious', 'T-Duality', {
    summary: 'A string on a circle of radius R behaves exactly like one on a circle of radius α′/R. Distances below the string length stop making sense.',
    latex: md`R \;\longleftrightarrow\; \frac{\alpha'}{R}, \qquad n \;\longleftrightarrow\; m, \qquad M^2 \supset \left(\frac{n}{R}\right)^2 + \left(\frac{mR}{\alpha'}\right)^2`,
    variables: [
      [md`n`, 'Momentum number around the circle'],
      [md`m`, 'Winding number: how many times the string wraps'],
      [md`\sqrt{\alpha'}`, 'String length'],
    ],
    aliases: ['T-dual'],
    tags: ['strings', 'dualities', 'dimensions'],
    body: md`
      Momentum states get lighter as the circle grows ($n/R$); winding states get lighter as it shrinks ($mR/\alpha'$). Swap the two and swap $R \to \alpha'/R$ — the whole spectrum is unchanged ([[Compactification on a Torus]]).

      **Why it’s mind-bending:** a tiny circle is physically the same as a huge one. Strings can’t probe distances shorter than $\sqrt{\alpha'}$; trying just gives you back a large space.

      - A point particle has only momentum — no winding — so nothing like this happens for ordinary fields. It is a genuinely stringy symmetry.
      - T-duality maps open strings with free ends to strings stuck on surfaces — that is how [[D-Branes]] were discovered.
      - For a lattice torus $\mathbb R^d/\Lambda$ the duality group is richer and involves the lattice’s dual ([[Lattices & Theta Functions]]).
    `,
  }),

  entry('d-branes', 'concept', STRING, 'curious', 'D-Branes', {
    summary: 'Surfaces where open strings can end. They carry charge, can wrap hidden dimensions, and let string theory count black hole microstates.',
    aliases: ['D-brane', 'brane', 'branes', 'Dirichlet brane'],
    tags: ['strings', 'black holes'],
    body: md`
      An open string’s ends must satisfy boundary conditions. **Dirichlet** conditions pin the ends to a surface — a D$p$-brane with $p$ space dimensions. Polchinski (1995) showed these are real dynamical objects carrying charge.

      **Why they matter:**
      - Open strings on a stack of $N$ branes give an $SU(N)$ gauge theory — forces like the Standard Model’s live on branes ([[The Standard Model]]).
      - **Strominger and Vafa (1996)** built certain black holes from D-branes and counted their microstates. The count matched $S = A/4$ exactly — the first microscopic derivation of [[Black Hole Entropy & the Holographic Principle|Bekenstein–Hawking entropy]].
      - Maldacena’s [[Anti-de Sitter Space & AdS/CFT|AdS/CFT]] came from looking at a stack of D3-branes two ways.

      Discovered through [[T-Duality]].
    `,
  }),

  entry('holographic-principle', 'equation', STRING, 'curious', 'Black Hole Entropy & the Holographic Principle', {
    summary: 'A black hole’s entropy is its horizon area in Planck units, divided by four — not its volume. Hint that a region’s information lives on its boundary.',
    latex: md`S_{BH} = \frac{k_B\,c^3 A}{4 G\hbar} = \frac{k_B A}{4\,\ell_P^2}`,
    variables: [
      [md`A`, 'Area of the event horizon'],
      [md`\ell_P = \sqrt{\hbar G/c^3}`, 'Planck length, 1.6 × 10⁻³⁵ m'],
    ],
    aliases: ['Bekenstein–Hawking entropy', 'black hole entropy', 'holographic principle', 'Bekenstein bound'],
    tags: ['black holes', 'thermodynamics', 'quantum gravity', 'holography'],
    body: md`
      **Bekenstein (1972), Hawking (1975):** throw something hot into a black hole and its entropy seems to vanish, breaking the second law — unless the black hole itself has entropy proportional to its area.

      **Example:** a solar-mass black hole ($r_s \approx 2.95$ km) has $A = 4\pi r_s^2 \approx 1.1\times10^8\ \text{m}^2$, so
      $$S/k_B = \frac{A}{4\ell_P^2} \approx 10^{77}$$
      — about $10^{19}$ times the entropy of the Sun itself.

      **The holographic principle:** the maximum information in a region grows with its *surface area*, not its volume. Gravity in a volume might be fully described by a theory on its boundary — made precise in [[Anti-de Sitter Space & AdS/CFT|AdS/CFT]].

      Entropy counts microstates ([[Temperature, Entropy & Chemical Potential]]), so what are a black hole’s microstates? String theory answered for special cases with [[D-Branes]].
    `,
  }),

  entry('supersymmetry', 'theory', STRING, 'curious', 'Supersymmetry', {
    summary: 'A proposed symmetry that swaps bosons and fermions, pairing every particle with a superpartner. Essential for superstrings; not yet seen in nature.',
    latex: md`Q\,|\text{boson}\rangle = |\text{fermion}\rangle, \qquad \{Q, Q^\dagger\} \sim P_\mu`,
    variables: [
      [md`Q`, 'Supercharge: turns bosons into fermions and back'],
      [md`P_\mu`, 'Momentum — two supersymmetry steps make a translation'],
    ],
    aliases: ['SUSY', 'superpartner', 'supersymmetric'],
    tags: ['symmetry', 'strings', 'particle physics'],
    body: md`
      Ordinary symmetries turn bosons into bosons. Supersymmetry mixes [[Identical Particles: Bosons & Fermions|bosons and fermions]] — and two supersymmetry transformations in a row give a spacetime translation, so it extends the symmetries of [[Minkowski Spacetime, Light Cones & Proper Time|spacetime]] itself.

      **Why physicists like it:**
      - Boson and fermion zero-point energies come with opposite signs and cancel — helping with the [[The Vacuum Energy Problem|vacuum energy problem]] and the lightness of the Higgs ([[The Higgs Mechanism]]).
      - Worldsheet supersymmetry removes the tachyon and brings the string dimension down to 10 ([[Superstring Theory]]).

      **Status:** the Large Hadron Collider has found no superpartners so far. If supersymmetry exists, it is broken at energies higher than originally hoped.
    `,
  }),
];
