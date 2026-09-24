// Starter content, written to data/lattice.json the first time the server runs.
// After that the data file is the source of truth and this file is never read again.
// To add a content pack to an existing library, use scripts/merge.js instead.

import { CONNECTIONS } from './content/connections.js';
import { DATES } from './content/dates.js';
import { DEEPER } from './content/deeper.js';
import { EXPANSION } from './content/expansion.js';
import { FOUNDATIONS } from './content/foundations.js';
import { PLAYGROUND } from './content/playground.js';
import { VIDEOS } from './content/videos.js';
import { AREA, BT, entry, md } from './content/helpers.js';

const { STRING, QUANTUM, REL, MISC } = AREA;

const CORE = {
  areas: [
    {
      id: STRING,
      name: 'String Theory & Dimensional Symmetry',
      color: '#8b7cf6',
      description: 'The Monster group, moonshine, vertex operator algebras and strings in 24 transverse dimensions.',
    },
    {
      id: QUANTUM,
      name: 'Quantum Mechanics & Extreme States of Matter',
      color: '#2bb3a3',
      description: 'Superposition, Bose–Einstein condensates and superfluids: quantum effects at macroscopic scale.',
    },
    {
      id: REL,
      name: 'Relativity & Spacetime Mechanics',
      color: '#e0a33a',
      description: 'The speed of light, time dilation and curved spacetime — and where they meet quantum physics.',
    },
    {
      id: MISC,
      name: 'Miscellany',
      color: '#8a93a6',
      description: 'Random other stuff. Anything that does not have a home yet.',
    },
  ],

  entries: [
    // ------------------------------------------------------------ string theory
    entry('monster-group', 'concept', STRING, 'exploring', 'Monster Group', {
      summary:
        'The largest sporadic finite simple group: about $8 \\times 10^{53}$ symmetries, whose smallest non-trivial representation lives in 196,883 dimensions.',
      tags: ['group theory', 'symmetry', 'sporadic groups'],
      body: md`
        ## What it is
        A **finite simple group** is a finite group of symmetries that can't be broken into smaller normal pieces — the "atoms" of finite symmetry. The classification theorem says each one belongs to a few infinite families, apart from exactly **26 sporadic** exceptions. The Monster $\mathbb{M}$ is the largest sporadic group.

        - Order: about $8.08 \times 10^{53}$ elements — see [[Order of the Monster]].
        - Smallest faithful representation: $196\,883$ complex dimensions.
        - 20 of the 26 sporadic groups (the Monster included) are involved in it — the *Happy Family*. The other 6 are the *pariahs*.
        - Predicted independently by Fischer and Griess (1973); constructed by Griess (1982) as the symmetries of a $196\,884$-dimensional algebra.

        ## Why a physicist cares
        The Monster is the full symmetry group of the [[Moonshine Module]], a vertex operator algebra that can be read as a 2D conformal field theory: the worldsheet theory of a bosonic string whose 24 transverse dimensions are curled up using the [[Leech Lattice]]. That is the concrete bridge from this abstract group to string physics — see [[Monstrous Moonshine]].

        Whether the Monster says anything about *our* universe is open: [[Does the Monster describe our universe?]]
      `,
      sources: [
        'Mark Ronan — Symmetry and the Monster (2006)',
        'https://en.wikipedia.org/wiki/Monster_group',
      ],
    }),

    entry('order-of-the-monster', 'equation', STRING, 'curious', 'Order of the Monster', {
      summary: 'Exactly how many symmetries the Monster group has, factored into primes.',
      latex: md`|\mathbb{M}| = 2^{46}\cdot 3^{20}\cdot 5^{9}\cdot 7^{6}\cdot 11^{2}\cdot 13^{3}\cdot 17\cdot 19\cdot 23\cdot 29\cdot 31\cdot 41\cdot 47\cdot 59\cdot 71`,
      variables: [[md`|\mathbb{M}|`, 'Number of elements (distinct symmetries) of the Monster group']],
      tags: ['group theory', 'primes'],
      body: md`
        Written out:

        808,017,424,794,512,875,886,459,904,961,710,757,005,754,368,000,000,000 $\approx 8.08\times10^{53}$

        The 15 primes that divide it are exactly the **supersingular primes** — a coincidence Andrew Ogg noticed in 1975, offering a bottle of Jack Daniel's to anyone who could explain it. One of the first hints of moonshine.
      `,
    }),

    entry('j-invariant', 'equation', STRING, 'exploring', 'The j-invariant', {
      summary: 'The basic modular function. Its expansion coefficients turned out to be sums of Monster dimensions.',
      latex: md`j(\tau) = \frac{1}{q} + 744 + 196884\,q + 21493760\,q^{2} + 864299970\,q^{3} + \cdots, \qquad q = e^{2\pi i \tau}`,
      variables: [
        [md`\tau`, 'A point in the upper half-plane (Im τ > 0); it encodes the shape of a torus'],
        [md`q`, 'The nome, e^{2πiτ}; the expansion is a power series in q'],
        [md`j(\tau)`, 'Unchanged under τ → (aτ + b)/(cτ + d) with integer a, b, c, d and ad − bc = 1'],
      ],
      tags: ['modular forms', 'number theory'],
      body: md`
        Two tori (elliptic curves) have the same shape exactly when their $j$ values agree, and every modular function for $SL(2,\mathbb{Z})$ is a rational function of $j$.

        The constant $744$ is a convention. Moonshine usually drops it: $J(\tau) = j(\tau) - 744$, which is the graded dimension of the [[Moonshine Module]].
      `,
    }),

    entry('monstrous-moonshine', 'theory', STRING, 'exploring', 'Monstrous Moonshine', {
      summary:
        'The coefficients of the j-function are built from dimensions of Monster representations — conjectured in 1979, proved by Borcherds in 1992.',
      tags: ['moonshine', 'modular forms', 'group theory'],
      body: md`
        ## The coincidence
        In 1978 John McKay noticed $196884 = 1 + 196883$: the first interesting coefficient of the [[The j-invariant|j-function]] is one more than the smallest dimension of the [[Monster Group]]. John Thompson checked that the next coefficients decompose into Monster dimensions too.

        ## The conjecture
        Conway and Norton (1979) made it precise. There should be a graded representation $V = \bigoplus_n V_n$ of the Monster whose dimensions are the $j$-coefficients, and for **every** element $g$ the twisted count

        $$T_g(\tau) = \sum_n \operatorname{tr}(g \mid V_n)\, q^{\,n-1}$$

        should be a very special modular function (a *Hauptmodul*). They called it "moonshine" because it seemed crazy.

        ## The proof
        - Frenkel, Lepowsky and Meurman (1984–88) built $V$: the [[Moonshine Module]], a [[Vertex Operator Algebra]].
        - Borcherds (1992) proved all the Conway–Norton conjectures. Key step: add 2 dimensions back to the 24 of the module to get a 26-dimensional bosonic string, then apply the string theory **no-ghost theorem**. Fields Medal, 1998.

        String theory was a tool in the proof — which is why the Monster and strings show up together.
      `,
      sources: [
        'Conway & Norton — Monstrous Moonshine, Bull. London Math. Soc. 11 (1979)',
        'Borcherds — Monstrous moonshine and monstrous Lie superalgebras, Invent. Math. 109 (1992)',
        'Terry Gannon — Moonshine beyond the Monster (2006)',
        'https://en.wikipedia.org/wiki/Monstrous_moonshine',
      ],
    }),

    entry('example-mckay-196884', 'example', STRING, 'solid', "McKay's observation: 196884 = 1 + 196883", {
      summary: 'The first j-coefficients written as sums of Monster representation dimensions.',
      tags: ['moonshine'],
      body: md`
        The smallest irreducible representations of the Monster have dimensions
        $1,\ 196883,\ 21296876,\ 842609326,\ \dots$

        Now compare with the coefficients of $j(\tau) - 744$:

        $$196884 = 1 + 196883$$

        $$21493760 = 1 + 196883 + 21296876$$

        $$864299970 = 2\cdot 1 + 2\cdot 196883 + 21296876 + 842609326$$

        Check them yourself — the arithmetic is exact. Each $j$-coefficient is the dimension of the energy-level-$n$ space of the [[Moonshine Module]], and these sums say how that space splits under the Monster.
      `,
    }),

    entry('vertex-operator-algebra', 'concept', STRING, 'exploring', 'Vertex Operator Algebra', {
      summary:
        'The algebra of a 2D chiral conformal field theory: every state corresponds to a field, and a Virasoro symmetry is built in.',
      latex: md`Y(a, z) = \sum_{n\in\mathbb{Z}} a_{(n)}\, z^{-n-1}`,
      variables: [
        [md`a`, 'A state in the vector space V'],
        [md`z`, 'A formal variable — think: a point on the string worldsheet'],
        [md`a_{(n)}`, 'The modes of the field: linear operators acting on V'],
      ],
      tags: ['cft', 'algebra', 'strings'],
      body: md`
        ## The idea in physics language
        A string sweeps out a 2D worldsheet, and quantizing it gives a 2D **conformal field theory** (CFT). In a CFT every state $a$ corresponds to a field $Y(a,z)$ inserted at a point $z$ — the *state–field correspondence*. A VOA is the rigorous algebraic version of that structure (Borcherds 1986; Frenkel–Lepowsky–Meurman 1988).

        ## The data
        - A graded vector space $V = \bigoplus_{n \ge 0} V_n$: states sorted by energy $n$.
        - A vacuum $\mathbf{1} \in V_0$ and a *conformal vector* $\omega \in V_2$.
        - A vertex operator $Y(a,z)$ for each state, obeying **locality**: $(z-w)^N\,[Y(a,z), Y(b,w)] = 0$ for large enough $N$.
        - The modes of $Y(\omega, z) = \sum_n L_n z^{-n-2}$ satisfy the [[Virasoro Algebra]] with central charge $c$.

        ## How strings "vibrate in 24 dimensions"
        Take 24 free bosons $X^i(z)$, one per transverse direction of the [[Bosonic String|bosonic string]]. Their VOA has $c = 24$. Compactify on a lattice $\Lambda \subset \mathbb{R}^{24}$ and you get a **lattice VOA** $V_\Lambda$: momentum states $e^{\alpha}$ for each $\alpha \in \Lambda$, plus oscillator excitations. With $\Lambda$ = the [[Leech Lattice]], followed by a $\mathbb{Z}_2$ orbifold, you get the [[Moonshine Module]].
      `,
      sources: [
        'Frenkel, Lepowsky & Meurman — Vertex Operator Algebras and the Monster (1988)',
        'https://en.wikipedia.org/wiki/Vertex_operator_algebra',
      ],
    }),

    entry('virasoro-algebra', 'equation', STRING, 'curious', 'Virasoro Algebra', {
      summary: 'The symmetry algebra of 2D conformal field theory, with a quantum correction measured by the central charge c.',
      latex: md`[L_m, L_n] = (m-n)\,L_{m+n} + \frac{c}{12}\,m\,(m^2-1)\,\delta_{m+n,0}`,
      variables: [
        [md`L_n`, 'Modes of the stress–energy tensor; they generate conformal transformations'],
        [md`c`, 'Central charge — roughly, how many degrees of freedom the theory has'],
        [md`\delta_{m+n,0}`, 'Kronecker delta: 1 when m + n = 0, otherwise 0'],
      ],
      tags: ['cft', 'strings', 'anomalies'],
      body: md`
        $L_0$ measures energy (conformal weight), $L_{-1}$ generates translations, $L_{n<0}$ raise the energy and $L_{n>0}$ lower it.

        The central term is a **quantum anomaly** — classically $c = 0$. Each free boson contributes $c = 1$. The Faddeev–Popov ghosts of the string contribute $c = -26$, so a consistent bosonic string needs exactly 26 bosons to cancel them: see [[Critical Dimension of the Bosonic String]].
      `,
    }),

    entry('leech-lattice', 'concept', STRING, 'curious', 'Leech Lattice', {
      summary:
        'The best sphere packing in 24 dimensions: an even unimodular lattice with no vectors of squared length 2. Each sphere touches 196,560 others.',
      tags: ['lattices', 'sphere packing', '24 dimensions'],
      body: md`
        - Found by John Leech (1967).
        - **Even unimodular**: every squared length is even, and there is one lattice point per unit volume.
        - **No roots**: the shortest nonzero vectors have squared length 4, and there are $196\,560$ of them — the kissing number in 24D, proven optimal.
        - Cohn, Kumar, Miller, Radchenko and Viazovska (2017) proved it gives the densest possible sphere packing in 24 dimensions.
        - Symmetry group: the Conway group $Co_0$. Its quotient $Co_1 = Co_0/\{\pm 1\}$ is sporadic and appears inside the [[Monster Group]] (in the subgroup $2^{1+24}\cdot Co_1$).

        There are 24 even unimodular lattices in 24D (the Niemeier lattices), and Leech is the only one without roots. Fewer roots means fewer weight-1 states in the lattice VOA; the $\mathbb{Z}_2$ orbifold then removes the remaining 24, leaving the [[Moonshine Module]] with $\dim V_1 = 0$.
      `,
      sources: ['https://en.wikipedia.org/wiki/Leech_lattice'],
    }),

    entry('bosonic-string', 'concept', STRING, 'curious', 'Bosonic String', {
      summary:
        'The simplest string theory: vibrating strings whose modes are particles. Consistent only in 26 spacetime dimensions, which leaves 24 directions transverse to the string.',
      tags: ['strings', '24 dimensions'],
      body: md`
        ## Picture
        A string moving through spacetime sweeps out a 2D worldsheet. Its vibration modes look like particles of different masses and spins. In light-cone quantization only the $D-2$ directions **transverse** to the worldsheet carry physical oscillations. With $D = 26$ that is **24 transverse dimensions** — the "24-dimensional space" the string vibrates in. Why 26: [[Critical Dimension of the Bosonic String]].

        ## Mass spectrum (closed string)
        $$\alpha' M^2 = 4(N - 1), \qquad N = \tilde N$$

        - $N = 0$: a **tachyon** ($M^2 < 0$) — the vacuum is unstable.
        - $N = 1$: massless graviton, $B$-field and dilaton. Gravity comes out automatically.

        ## Why it is a toy
        No fermions (so no ordinary matter) and the tachyon. Superstrings fix both, and need $D = 10$ instead.
      `,
      sources: ['Barton Zwiebach — A First Course in String Theory (2nd ed., 2009)'],
    }),

    entry('critical-dimension', 'equation', STRING, 'exploring', 'Critical Dimension of the Bosonic String', {
      summary: 'Why the bosonic string needs 26 dimensions: the zero-point energy of 24 transverse oscillator towers must equal −1.',
      latex: md`\frac{D-2}{2}\sum_{n=1}^{\infty} n \;=\; \frac{D-2}{2}\,\zeta(-1) \;=\; -\frac{D-2}{24} \;\stackrel{!}{=}\; -1 \quad\Longrightarrow\quad D = 26`,
      variables: [
        [md`D`, 'Number of spacetime dimensions'],
        [md`D-2`, 'Transverse directions — each one an independent tower of oscillators'],
        [md`n`, 'Mode number of an oscillator (frequency ∝ n, zero-point energy n/2)'],
        [md`\zeta(-1) = -\tfrac{1}{12}`, 'Zeta-regularized value of 1 + 2 + 3 + ⋯'],
      ],
      tags: ['strings', 'regularization', '24 dimensions'],
      body: md`
        Each transverse direction is an infinite tower of harmonic oscillators with frequencies $n = 1, 2, 3, \dots$, each contributing zero-point energy $\tfrac{n}{2}$. The divergent sum is regularized to $\zeta(-1) = -\tfrac{1}{12}$ (see the example).

        Lorentz invariance forces the total to be $-1$: the open-string state at level 1 is a vector with only $D-2$ polarizations, so it must be massless. Hence $D - 2 = 24$.

        The same number appears covariantly: $D$ bosons give central charge $c = D$, ghosts give $-26$, and the anomaly cancels only at $D = 26$ — see [[Virasoro Algebra]].
      `,
    }),

    entry('example-zeta-regularization', 'example', STRING, 'exploring', 'Regularizing 1 + 2 + 3 + ⋯', {
      summary: 'Where the −1/12 comes from, using a smooth cutoff instead of magic.',
      tags: ['regularization'],
      body: md`
        Damp high modes with a cutoff $e^{-\varepsilon n}$ and sum exactly:

        $$\sum_{n=1}^\infty n\,e^{-\varepsilon n} = \frac{e^{-\varepsilon}}{(1-e^{-\varepsilon})^2} = \frac{1}{4\sinh^2(\varepsilon/2)}$$

        Expand for small $\varepsilon$, using $\sinh x = x + x^3/6 + \cdots$:

        $$\frac{1}{4\sinh^2(\varepsilon/2)} = \frac{1}{\varepsilon^2} - \frac{1}{12} + O(\varepsilon^2)$$

        The $1/\varepsilon^2$ piece depends on the cutoff and is cancelled by a counterterm (a worldsheet cosmological constant). The cutoff-independent part, $-\tfrac{1}{12}$, is the physical answer — and matches $\zeta(-1)$.
      `,
    }),

    entry('moonshine-module', 'concept', STRING, 'exploring', 'Moonshine Module', {
      summary:
        'V♮: the c = 24 vertex operator algebra whose symmetry group is exactly the Monster and whose graded dimension is j(τ) − 744.',
      latex: md`\sum_{n\ge 0} \dim V^\natural_n \; q^{\,n-1} = j(\tau) - 744 = q^{-1} + 196884\,q + 21493760\,q^{2} + \cdots`,
      variables: [
        [md`V^\natural_n`, 'States of energy level n in the module'],
        [md`q = e^{2\pi i\tau}`, 'Formal variable that tracks the energy level'],
      ],
      tags: ['moonshine', 'cft', 'strings', '24 dimensions'],
      body: md`
        ## Construction (Frenkel–Lepowsky–Meurman, 1988)
        1. Start with 24 free bosons compactified on the [[Leech Lattice]]: the lattice VOA $V_\Lambda$, central charge $c = 24$.
        2. Take the $\mathbb{Z}_2$ orbifold by $X \mapsto -X$ (reflect all 24 coordinates): keep the invariant states and add a *twisted sector*.
        3. The result $V^\natural$ has $\dim V_1 = 0$ — no massless currents — and $\operatorname{Aut}(V^\natural) = \mathbb{M}$, the [[Monster Group]].

        ## Physics reading
        $V^\natural$ is a chiral CFT: the internal worldsheet theory of a bosonic string with all 24 transverse directions compactified on the orbifold $(\mathbb{R}^{24}/\Lambda)/\mathbb{Z}_2$. The Monster acts as a symmetry of that string background. Borcherds added back the 2 light-cone directions ($24 + 2 = 26$) to build the *Monster Lie algebra* in his proof of [[Monstrous Moonshine]].

        Level 2 counts $\dim V_2 = 196884 = 1 + 196883$: the conformal vector $\omega = L_{-2}\mathbf{1}$ plus the smallest Monster representation.
      `,
    }),

    entry('question-monster-universe', 'question', STRING, 'curious', 'Does the Monster describe our universe?', {
      summary: 'Nobody knows. It is the symmetry of a consistent but unrealistic string background, plus some open proposals.',
      tags: ['open question', 'moonshine', 'quantum gravity'],
      body: md`
        **Short answer: unknown, and there is no experimental evidence either way.**

        What is established:
        - The Monster is the symmetry of a specific 2D CFT, the [[Moonshine Module]] — a consistent string background, but an unrealistic one (26D bosonic string: tachyon, no fermions).

        Proposals and open threads:
        - **3D gravity.** Witten (2007) conjectured that pure 3D quantum gravity in anti-de Sitter space, at the smallest allowed size, is dual to the Moonshine Module. Later work (Maloney–Witten, 2010) found problems with the simplest version, so it is unsettled.
        - **Mathieu moonshine** (Eguchi–Ooguri–Tachikawa, 2010) ties the sporadic group $M_{24}$ to K3 surfaces, which are used in superstring compactifications — closer to "real" string theory. **Umbral moonshine** (Cheng–Duncan–Harvey, 2012) extends it to the 23 Niemeier lattices with roots.

        To look into next:
        - [ ] What exactly does "dual" mean in AdS₃/CFT₂?
        - [ ] Why does $c = 24$ appear both here and in the bosonic string?
      `,
      sources: ['Witten — Three-Dimensional Gravity Revisited, arXiv:0706.3359'],
    }),

    // ------------------------------------------------------------ quantum
    entry('superposition', 'concept', QUANTUM, 'exploring', 'Superposition', {
      summary:
        'A quantum system can be in a weighted sum of states; measurement picks one outcome with probability given by the squared amplitude.',
      latex: md`\ket{\psi} = \sum_i c_i \ket{i}, \qquad \sum_i |c_i|^2 = 1`,
      variables: [
        [md`\ket{\psi}`, 'The state of the system'],
        [md`\ket{i}`, 'Basis states — the possible outcomes of a chosen measurement'],
        [md`c_i`, 'Complex amplitudes'],
      ],
      tags: ['foundations', 'measurement'],
      body: md`
        ## Why it happens
        The [[Schrödinger Equation]] is **linear**: if $\ket{a}$ and $\ket{b}$ are solutions, so is $\alpha\ket{a} + \beta\ket{b}$. Superposition is less an extra postulate than a consequence of that linearity.

        ## What it is not
        It is not "secretly in one state and we don't know which". Amplitudes are complex and **interfere** — they add *before* squaring:

        $$|c_a + c_b|^2 = |c_a|^2 + |c_b|^2 + 2\,\mathrm{Re}(c_a^* c_b)$$

        The double-slit pattern is exactly that cross term.

        ## Measurement
        Measuring in the basis $\{\ket{i}\}$ gives outcome $i$ with probability $|c_i|^2$ ([[Born Rule]]) and leaves the system in $\ket{i}$. Interaction with an environment spreads superpositions into entanglement and makes them look classical: **decoherence**.

        ## At macroscopic scale
        A [[Bose–Einstein Condensate]] is many thousands to millions of atoms sharing one wavefunction, so superposition and interference show up directly in camera images.
      `,
      sources: ['Griffiths & Schroeter — Introduction to Quantum Mechanics (3rd ed., 2018)'],
    }),

    entry('schrodinger-equation', 'equation', QUANTUM, 'exploring', 'Schrödinger Equation', {
      summary: 'How a quantum state changes in time.',
      latex: md`i\hbar \frac{\partial}{\partial t}\ket{\psi(t)} = \hat{H}\ket{\psi(t)}`,
      variables: [
        [md`\hbar`, 'Reduced Planck constant, 1.054571817 × 10⁻³⁴ J·s'],
        [md`\hat{H}`, 'Hamiltonian — the total energy operator'],
        [md`\ket{\psi(t)}`, 'State of the system at time t'],
      ],
      tags: ['foundations', 'dynamics'],
      body: md`
        For one particle in a potential: $\hat H = -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf r)$.

        Stationary states $\psi(\mathbf r,t) = \phi(\mathbf r)\,e^{-iEt/\hbar}$ turn it into the eigenvalue problem $\hat H\phi = E\phi$.

        Linear in $\psi$, which gives [[Superposition]]. Add a self-interaction term and you get the nonlinear [[Gross–Pitaevskii Equation]] for condensates.
      `,
    }),

    entry('born-rule', 'equation', QUANTUM, 'solid', 'Born Rule', {
      summary: 'Probabilities of measurement outcomes are squared magnitudes of amplitudes.',
      latex: md`P(a) = \left|\braket{a|\psi}\right|^2`,
      variables: [
        [md`P(a)`, 'Probability of getting outcome a'],
        [md`\ket{a}`, 'The state corresponding to outcome a'],
        [md`\braket{a|\psi}`, 'Amplitude: the overlap of the state with that outcome'],
      ],
      tags: ['foundations', 'measurement', 'probability'],
      body: md`
        Normalization $\braket{\psi|\psi} = 1$ makes the probabilities add up to 1. Only magnitudes matter for a single measurement — but relative phases change the probabilities in *other* bases (see the qubit example).

        Max Born, 1926 (Nobel Prize 1954).
      `,
    }),

    entry('example-qubit', 'example', QUANTUM, 'solid', 'Measuring a qubit in two bases', {
      summary: 'Same probabilities in one basis, very different ones in another — the relative phase is real.',
      tags: ['measurement', 'qubits'],
      body: md`
        State: $\ket{\psi} = \sqrt{\tfrac13}\,\ket{0} + i\sqrt{\tfrac23}\,\ket{1}$

        **Measure in the $\{\ket0, \ket1\}$ basis**
        - $P(0) = \left|\sqrt{1/3}\right|^2 = 1/3$
        - $P(1) = \left|i\sqrt{2/3}\right|^2 = 2/3$ — the phase $i$ changes nothing here.

        **Measure in the $\ket{\pm} = (\ket0 \pm \ket1)/\sqrt2$ basis**

        $$\braket{+|\psi} = \frac{1}{\sqrt2}\left(\sqrt{\tfrac13} + i\sqrt{\tfrac23}\right) \quad\Rightarrow\quad P(+) = \frac12\left(\frac13 + \frac23\right) = \frac12$$

        Now drop the $i$: $\ket{\psi'} = \sqrt{\tfrac13}\,\ket0 + \sqrt{\tfrac23}\,\ket1$.

        $$P'(+) = \frac12\left(\sqrt{\tfrac13} + \sqrt{\tfrac23}\right)^2 = \frac12 + \frac{\sqrt2}{3} \approx 0.971$$

        Identical statistics in one basis, $0.5$ vs $0.971$ in the other. The cross term is interference.
      `,
    }),

    entry('bose-einstein-statistics', 'equation', QUANTUM, 'exploring', 'Bose–Einstein Distribution', {
      summary: 'Average number of identical bosons in a state of energy ε. Its −1 is what makes condensation possible.',
      latex: md`\bar{n}(\varepsilon) = \frac{1}{e^{(\varepsilon-\mu)/k_B T} - 1}`,
      variables: [
        [md`\bar n(\varepsilon)`, 'Mean occupation of a single-particle state with energy ε'],
        [md`\mu`, 'Chemical potential (always below the lowest energy level)'],
        [md`k_B`, 'Boltzmann constant, 1.380649 × 10⁻²³ J/K'],
        [md`T`, 'Temperature'],
      ],
      tags: ['statistical mechanics', 'bosons'],
      body: md`
        For identical particles with integer spin. The $-1$ (fermions have $+1$) lets the occupation grow without limit as $\varepsilon \to \mu$.

        Lower $T$ at fixed density and $\mu$ climbs toward the ground-state energy. Eventually the excited states can't hold all the particles, and the rest pile into the ground state: [[Bose–Einstein Condensate|Bose–Einstein condensation]].

        Satyendra Nath Bose (1924, photons); Einstein (1924–25, atoms).
      `,
    }),

    entry('bose-einstein-condensate', 'concept', QUANTUM, 'exploring', 'Bose–Einstein Condensate', {
      summary:
        'Below a critical temperature, a macroscopic fraction of bosons occupies the single lowest quantum state and behaves as one giant matter wave.',
      latex: md`\psi(\mathbf{r}) = \sqrt{n(\mathbf{r})}\; e^{i\theta(\mathbf{r})}`,
      variables: [
        [md`\psi`, 'Macroscopic wavefunction (the order parameter)'],
        [md`n(\mathbf r)`, 'Density of condensed atoms'],
        [md`\theta(\mathbf r)`, 'Phase — its gradient sets the superfluid velocity'],
      ],
      tags: ['ultracold atoms', 'macroscopic quantum', 'bosons'],
      body: md`
        ## The idea
        Einstein (1925), extending Bose: cool an ideal gas of bosons enough and the particles condense into the ground state — see [[Bose–Einstein Distribution]]. It happens when the thermal de Broglie wavelength $\lambda_T = h/\sqrt{2\pi m k_B T}$ becomes comparable to the spacing between atoms:

        $$n\,\lambda_T^3 \approx 2.612$$

        ## Making one (1995)
        Laser cooling brings atoms to microkelvin; **evaporative cooling** in a magnetic trap then removes the hottest atoms. Cornell and Wieman (JILA, rubidium-87) and Ketterle (MIT, sodium-23) made the first gaseous condensates — Nobel Prize 2001. Typical temperatures: tens to hundreds of **nanokelvin**.

        ## Macroscopic quantum phenomena
        - **Interference**: two condensates released to overlap show matter-wave fringes (MIT, 1997) — [[Superposition]] visible in an image.
        - **Superfluidity** and **quantized vortices**: see [[Superfluidity]].
        - **Coherence**: all atoms share one phase, which makes an "atom laser" possible.

        When it forms: [[BEC Critical Temperature]]. How it moves: [[Gross–Pitaevskii Equation]].
      `,
      sources: [
        'Pethick & Smith — Bose–Einstein Condensation in Dilute Gases (2nd ed., 2008)',
        'https://en.wikipedia.org/wiki/Bose%E2%80%93Einstein_condensate',
      ],
    }),

    entry('bec-critical-temperature', 'equation', QUANTUM, 'exploring', 'BEC Critical Temperature', {
      summary: 'The temperature below which an ideal Bose gas starts to condense, and how much of it has condensed.',
      latex: md`T_c = \frac{2\pi\hbar^2}{m\,k_B}\left(\frac{n}{\zeta(3/2)}\right)^{2/3}, \qquad \frac{N_0}{N} = 1 - \left(\frac{T}{T_c}\right)^{3/2}`,
      variables: [
        [md`T_c`, 'Critical temperature'],
        [md`m`, 'Mass of one atom'],
        [md`n`, 'Number density (atoms per m³)'],
        [md`\zeta(3/2) \approx 2.612`, 'Riemann zeta function at 3/2'],
        [md`N_0/N`, 'Fraction of atoms in the condensate, when $T < T_c$'],
      ],
      tags: ['ultracold atoms', 'statistical mechanics'],
      body: md`
        Valid for an ideal (non-interacting) gas in a uniform box.

        In a harmonic trap it becomes $k_B T_c \approx 0.94\,\hbar\bar\omega\,N^{1/3}$ and the condensate fraction goes as $1-(T/T_c)^3$.

        Heavier atoms or lower densities mean a colder $T_c$.
      `,
    }),

    entry('example-rb87-tc', 'example', QUANTUM, 'solid', 'Critical temperature of a rubidium-87 gas', {
      summary: 'Plugging real numbers in: about 400 nK at $10^{20}$ atoms per cubic metre.',
      tags: ['ultracold atoms'],
      body: md`
        **Given:** $m = 86.909\ \text{u} = 1.443\times10^{-25}\ \text{kg}$, density $n = 10^{20}\ \text{m}^{-3}$ (that's $10^{14}\ \text{cm}^{-3}$).

        $$\frac{2\pi\hbar^2}{m k_B} = \frac{2\pi\,(1.0546\times10^{-34})^2}{(1.443\times10^{-25})(1.3806\times10^{-23})} \approx 3.51\times10^{-20}\ \text{K}\cdot\text{m}^2$$

        $$\left(\frac{10^{20}}{2.612}\right)^{2/3} \approx 1.136\times10^{13}\ \text{m}^{-2}$$

        $$T_c \approx 3.51\times10^{-20} \times 1.136\times10^{13} \approx 4.0\times10^{-7}\ \text{K} = 400\ \text{nK}$$

        Ten times less dense ($10^{19}\ \text{m}^{-3}$): $T_c$ drops by $10^{2/3} \approx 4.6$, to about $86\ \text{nK}$.
      `,
    }),

    entry('gross-pitaevskii', 'equation', QUANTUM, 'curious', 'Gross–Pitaevskii Equation', {
      summary: 'A nonlinear Schrödinger equation for a whole condensate, where each atom feels the average density of the others.',
      latex: md`i\hbar\frac{\partial\psi}{\partial t} = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r}) + g\,|\psi|^2\right]\psi, \qquad g = \frac{4\pi\hbar^2 a_s}{m}`,
      variables: [
        [md`\psi`, 'Condensate wavefunction; |ψ|² is the atom density'],
        [md`V(\mathbf r)`, 'Trapping potential'],
        [md`g`, 'Interaction strength'],
        [md`a_s`, 's-wave scattering length (Rb-87 ≈ 5.3 nm, Na-23 ≈ 2.75 nm)'],
      ],
      tags: ['ultracold atoms', 'nonlinear', 'dynamics'],
      body: md`
        A mean-field version of the [[Schrödinger Equation]]: the $g|\psi|^2$ term is the interaction with everyone else. Because it is nonlinear, a sum of two solutions is no longer a solution.

        Writing $\psi = \sqrt{n}\,e^{i\theta}$ turns it into fluid equations with velocity $\mathbf v = \frac{\hbar}{m}\nabla\theta$ — the origin of [[Quantized Circulation]] and the [[Bogoliubov Dispersion]].

        Eugene Gross and Lev Pitaevskii, 1961.
      `,
    }),

    entry('superfluidity', 'concept', QUANTUM, 'exploring', 'Superfluidity', {
      summary: 'Flow with zero viscosity: below a critical velocity, a quantum fluid has no way to lose energy to friction.',
      tags: ['helium', 'macroscopic quantum', 'zero viscosity'],
      body: md`
        ## Discovery
        Liquid helium-4 below the **lambda point** $T_\lambda = 2.17\ \text{K}$ flows through narrow capillaries with no measurable viscosity (Kapitza; Allen and Misener — both 1938). It creeps up container walls as a thin film and spurts out in a *fountain* when heated. Helium-3 becomes superfluid too, around a millikelvin, by forming pairs like electrons in a superconductor (discovered 1972).

        ## Why there is no friction
        Friction means the fluid dumps kinetic energy into excitations: phonons, rotons, vortices. By the [[Landau Criterion]], something moving slower than $v_c = \min_p \varepsilon(p)/p$ cannot create *any* excitation while conserving energy and momentum — so it cannot lose energy at all.

        An ideal gas has $\varepsilon = p^2/2m$, giving $v_c = 0$. Interactions give a linear, sound-like spectrum at low momentum ([[Bogoliubov Dispersion]]) and a nonzero $v_c$.

        ## Signatures
        - **Two-fluid model** (Tisza, Landau): a normal component with viscosity plus a superfluid component with none, carrying zero entropy.
        - **Quantized vortices**: rotate the container and the fluid forms an array of thin vortices, each with one quantum of circulation — [[Quantized Circulation]].
        - **Persistent currents** that keep flowing around a ring for as long as anyone has watched.

        ## Connection to BEC
        London (1938) linked helium-4 superfluidity to Bose–Einstein condensation, though strong interactions mean only about 10% of atoms are in the condensate even at absolute zero. Dilute gas condensates ([[Bose–Einstein Condensate]]) are superfluid too, and much cleaner to study.
      `,
      sources: [
        'James F. Annett — Superconductivity, Superfluids and Condensates (2004)',
        'https://en.wikipedia.org/wiki/Superfluidity',
      ],
    }),

    entry('landau-criterion', 'equation', QUANTUM, 'exploring', 'Landau Criterion', {
      summary: 'The speed below which a fluid cannot create excitations — and so flows without friction.',
      latex: md`v_c = \min_{p}\,\frac{\varepsilon(p)}{p}`,
      variables: [
        [md`v_c`, 'Critical velocity for frictionless flow'],
        [md`\varepsilon(p)`, 'Energy of an excitation with momentum p (the dispersion relation)'],
      ],
      tags: ['zero viscosity', 'excitations'],
      body: md`
        **Derivation sketch.** A heavy body (mass $M$) moving through fluid at rest with velocity $\mathbf v$ creates one excitation $(\varepsilon, \mathbf p)$. Conservation gives

        $$\tfrac12 M v^2 = \tfrac12 M v'^2 + \varepsilon, \qquad M\mathbf v = M\mathbf v' + \mathbf p$$

        Eliminating $\mathbf v'$:

        $$\varepsilon = \mathbf v\cdot\mathbf p - \frac{p^2}{2M} \;\le\; v\,p$$

        So creating an excitation needs $v \ge \varepsilon(p)/p$ for some $p$. Below the minimum of $\varepsilon/p$ nothing can be created: no drag, no dissipation.

        Lev Landau, 1941.
      `,
    }),

    entry('example-landau-velocities', 'example', QUANTUM, 'exploring', 'Critical velocities: ideal gas, BEC and helium', {
      summary: 'Why an ideal gas is not superfluid, and what the criterion predicts for a sodium condensate and for helium-4.',
      tags: ['zero viscosity', 'helium'],
      body: md`
        **Ideal Bose gas.** $\varepsilon = p^2/2m$, so $\varepsilon/p = p/2m \to 0$ as $p \to 0$. Then $v_c = 0$: not superfluid. Interactions are essential.

        **Weakly interacting condensate.** At small $p$ the Bogoliubov spectrum is $\varepsilon \approx c_s p$, so $v_c = c_s = \sqrt{gn/m}$. For sodium-23 ($a_s = 2.75\ \text{nm}$) at $n = 10^{20}\ \text{m}^{-3}$:

        $$g = \frac{4\pi\hbar^2 a_s}{m}, \qquad c_s = \sqrt{\frac{gn}{m}} \approx 5\ \text{mm/s}$$

        Stirring experiments (MIT, 1999) saw heating start below $c_s$: vortices are a cheaper excitation than sound.

        **Helium-4.** The phonon–roton spectrum has a minimum near $p_0/\hbar \approx 1.9\ \text{\AA}^{-1}$ with gap $\Delta/k_B \approx 8.6\ \text{K}$:

        $$v_c \approx \frac{\Delta}{p_0} = \frac{8.6 \times 1.38\times10^{-23}}{1.9\times10^{10} \times 1.055\times10^{-34}} \approx 60\ \text{m/s}$$

        Ions pulled through very cold helium get close to this speed. Flow through ordinary channels breaks down far earlier, because vortices form first.
      `,
    }),

    entry('bogoliubov-dispersion', 'equation', QUANTUM, 'curious', 'Bogoliubov Dispersion', {
      summary: 'The excitation spectrum of a weakly interacting condensate: sound at long wavelengths, free particles at short ones.',
      latex: md`\varepsilon(p) = \sqrt{\left(\frac{p^2}{2m}\right)^2 + \frac{g n}{m}\,p^2}, \qquad c_s = \sqrt{\frac{g n}{m}}`,
      variables: [
        [md`\varepsilon(p)`, 'Energy of an excitation with momentum p'],
        [md`g`, 'Interaction strength (from the Gross–Pitaevskii equation)'],
        [md`n`, 'Condensate density'],
        [md`c_s`, 'Speed of sound in the condensate'],
      ],
      tags: ['excitations', 'ultracold atoms'],
      body: md`
        - **Low momentum:** $\varepsilon \approx c_s\,p$ — collective sound waves (phonons).
        - **High momentum:** $\varepsilon \approx \frac{p^2}{2m} + gn$ — single free particles.

        The crossover sits at the *healing length* $\xi = \hbar/\sqrt{2 m g n}$, which is also the size of a vortex core.

        Nikolay Bogoliubov, 1947.
      `,
    }),

    entry('quantized-circulation', 'equation', QUANTUM, 'exploring', 'Quantized Circulation', {
      summary: 'Circulation around any loop in a superfluid comes in whole multiples of h/m.',
      latex: md`\oint \mathbf{v}_s\cdot d\boldsymbol{\ell} = n\,\frac{h}{m}, \qquad \mathbf{v}_s = \frac{\hbar}{m}\nabla\theta`,
      variables: [
        [md`\mathbf v_s`, 'Superfluid velocity'],
        [md`\theta`, 'Phase of the macroscopic wavefunction'],
        [md`n`, 'Integer winding number'],
        [md`h`, 'Planck constant, 6.62607015 × 10⁻³⁴ J·s'],
        [md`m`, 'Mass of one boson (e.g. a helium-4 atom)'],
      ],
      tags: ['vortices', 'zero viscosity', 'topology'],
      body: md`
        The wavefunction $\psi = |\psi|\,e^{i\theta}$ must be single-valued, so going once around a closed loop the phase can only change by $2\pi n$. Velocity is the phase gradient, so circulation comes in units of $h/m$.

        Consequence: a superfluid can't rotate like a rigid body. It forms a lattice of thin vortices instead.

        Onsager (1949) and Feynman (1955) predicted it; Vinen measured it in helium (1961).
      `,
    }),

    entry('example-he4-circulation', 'example', QUANTUM, 'solid', 'Quantum of circulation in helium-4', {
      summary: 'κ ≈ 10⁻⁷ m²/s, flow speeds around one vortex, and how many vortices a spinning bucket holds.',
      tags: ['vortices', 'helium'],
      body: md`
        $m = 4.0026\ \text{u} = 6.646\times10^{-27}\ \text{kg}$

        $$\kappa = \frac{h}{m} = \frac{6.626\times10^{-34}}{6.646\times10^{-27}} \approx 9.97\times10^{-8}\ \text{m}^2/\text{s}$$

        **Flow around one vortex:** $v_s = \kappa / (2\pi r)$. At $r = 1\ \mu\text{m}$ that's $1.6\ \text{cm/s}$; at $r = 1\ \text{nm}$ it's $16\ \text{m/s}$.

        **Rotating bucket:** to mimic rigid rotation at angular velocity $\Omega$ you need vortex density $n_v = 2\Omega/\kappa$ (Feynman's rule). At $\Omega = 1\ \text{rad/s}$:

        $$n_v = \frac{2}{9.97\times10^{-8}} \approx 2.0\times10^{7}\ \text{m}^{-2} \approx 2000\ \text{vortices per cm}^2$$
      `,
    }),

    // ------------------------------------------------------------ relativity
    entry('speed-of-light', 'concept', REL, 'exploring', 'Speed of Light', {
      summary:
        'c = 299,792,458 m/s exactly. The same for every inertial observer, the top speed of cause and effect, and the exchange rate between space and time.',
      latex: md`c = 299\,792\,458\ \text{m/s}, \qquad ds^2 = -c^2\,dt^2 + dx^2 + dy^2 + dz^2`,
      variables: [
        [md`c`, 'Speed of light in vacuum — exact, by definition of the metre'],
        [md`ds^2`, 'Spacetime interval between two events: the same for every inertial observer'],
      ],
      tags: ['special relativity', 'constants', 'causality'],
      body: md`
        ## Absolute, but not how you'd expect
        Velocities don't simply add:

        $$u' = \frac{u + v}{1 + uv/c^2}$$

        Set $u = c$ and you get $u' = c$ for any $v$. Michelson and Morley (1887) found no change in light speed with Earth's motion; Einstein (1905) made the invariance a postulate and rebuilt space and time around it.

        Since 1983, $c$ is **exact by definition**: the metre is the distance light travels in $1/299\,792\,458$ of a second.

        ## What follows
        - **Time dilation and length contraction**: keeping $ds^2$ invariant forces moving clocks to tick slower — [[Special-Relativistic Time Dilation]].
        - **Causality**: events with $ds^2 > 0$ (spacelike separated) can't influence each other. No information travels faster than $c$.
        - **Mass–energy**: $E^2 = (pc)^2 + (mc^2)^2$. Massless particles must travel at exactly $c$.

        ## Bridge to quantum physics
        - Quantum field theory is what you get when you demand quantum mechanics *and* Lorentz invariance: particle creation, antimatter, the spin–statistics link.
        - Entanglement correlations appear instantly but can't send a signal faster than $c$ (the no-signalling theorem).
        - Gravitational waves travel at $c$ too — confirmed to about 1 part in $10^{15}$ by GW170817. With $G$, $c$ also sets the size of [[Gravitational Time Dilation]], through $\Phi/c^2$.
      `,
    }),

    entry('sr-time-dilation', 'equation', REL, 'solid', 'Special-Relativistic Time Dilation', {
      summary: 'A moving clock ticks slower by the Lorentz factor γ.',
      latex: md`\Delta t = \gamma\,\Delta\tau, \qquad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}`,
      variables: [
        [md`\Delta\tau`, 'Proper time — measured by the moving clock itself'],
        [md`\Delta t`, 'Time measured in the frame where the clock moves at speed v'],
        [md`\gamma`, 'Lorentz factor, always ≥ 1'],
        [md`v`, 'Relative speed'],
      ],
      tags: ['special relativity', 'time'],
      body: md`
        **Light-clock derivation.** A photon bounces between two mirrors a distance $L$ apart. In the clock's frame one tick takes $2L/c$. Seen by someone the clock moves past at speed $v$, the photon travels a diagonal:

        $$\left(\frac{c\,\Delta t}{2}\right)^2 = L^2 + \left(\frac{v\,\Delta t}{2}\right)^2 \quad\Longrightarrow\quad \Delta t = \gamma\,\frac{2L}{c}$$

        It's symmetric: each inertial observer sees the *other's* clock run slow. The twin paradox is resolved by the travelling twin changing frames.

        For $v \ll c$: $\gamma \approx 1 + \dfrac{v^2}{2c^2}$.
      `,
    }),

    entry('example-muon', 'example', REL, 'solid', 'Cosmic-ray muons reaching the ground', {
      summary: 'Without time dilation muons would decay within about 660 m. With it, they travel over 10 km.',
      tags: ['special relativity', 'particles'],
      body: md`
        Muons are produced 10–15 km up when cosmic rays hit the atmosphere. Mean lifetime at rest: $\tau = 2.197\ \mu\text{s}$. Take $v = 0.998\,c$.

        **Without relativity:**
        $$v\tau = 0.998 \times 3.00\times10^8 \times 2.197\times10^{-6} \approx 660\ \text{m}$$
        Almost none should reach the ground.

        **With time dilation:**
        $$\gamma = \frac{1}{\sqrt{1 - 0.998^2}} \approx 15.8, \qquad \gamma\tau \approx 34.8\ \mu\text{s}, \qquad v\gamma\tau \approx 10.4\ \text{km}$$

        Plenty survive to sea level — and they do (Rossi and Hall, 1941; Frisch and Smith, 1963).

        In the muon's own frame, the atmosphere is length-contracted by the same $\gamma$. Same answer, different story.
      `,
    }),

    entry('gravitational-time-dilation', 'equation', REL, 'exploring', 'Gravitational Time Dilation', {
      summary: 'Clocks deeper in a gravitational potential run slower.',
      latex: md`d\tau = dt\,\sqrt{1 - \frac{2GM}{r c^2}} \;\approx\; dt\left(1 + \frac{\Phi}{c^2}\right), \qquad \Phi = -\frac{GM}{r}`,
      variables: [
        [md`d\tau`, 'Proper time of a clock at rest at distance r'],
        [md`dt`, 'Time of a clock very far away'],
        [md`G`, 'Gravitational constant, 6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻²'],
        [md`M`, 'Mass of the central body'],
        [md`r`, 'Distance from the centre (Schwarzschild coordinate)'],
        [md`\Phi`, 'Newtonian gravitational potential'],
      ],
      tags: ['general relativity', 'time'],
      body: md`
        Comes straight from the time part of the [[Schwarzschild Metric]] for a clock at rest ($dr = d\Omega = 0$).

        **Weak field, two heights.** Clocks separated by height $h$ near Earth's surface tick at rates differing by

        $$\frac{\Delta\tau}{\tau} \approx \frac{g h}{c^2} \approx 1.1\times10^{-16}\ \text{per metre}$$

        **At the horizon** $r = r_s = 2GM/c^2$ the factor goes to zero: a distant observer sees a falling clock freeze.

        **Equivalence principle view.** A clock at the top of an accelerating rocket runs fast compared with one at the bottom; Einstein (1907–1911) argued gravity must do the same. Light climbing out of a potential is redshifted by the same factor.

        Tests: [[Pound–Rebka Experiment]], [[GPS Clock Corrections]], and optical clocks that resolve height differences of a millimetre — see [[Clocks, Superposition and Gravity]].
      `,
      sources: [
        'James Hartle — Gravity: An Introduction to Einstein’s General Relativity (2003)',
        'https://en.wikipedia.org/wiki/Gravitational_time_dilation',
      ],
    }),

    entry('schwarzschild-metric', 'equation', REL, 'curious', 'Schwarzschild Metric', {
      summary: 'Spacetime outside any non-rotating spherical mass — a planet, a star or a black hole.',
      latex: md`ds^2 = -\left(1-\frac{r_s}{r}\right)c^2\,dt^2 + \left(1-\frac{r_s}{r}\right)^{-1}dr^2 + r^2\,d\Omega^2, \qquad r_s = \frac{2GM}{c^2}`,
      variables: [
        [md`r_s`, 'Schwarzschild radius'],
        [md`d\Omega^2`, 'Angular part: dθ² + sin²θ dφ²'],
        [md`t,\ r`, 'Time and radial coordinates used by a distant observer'],
      ],
      tags: ['general relativity', 'black holes'],
      body: md`
        The unique spherically symmetric vacuum solution of the [[Einstein Field Equations]] (Birkhoff's theorem).

        Karl Schwarzschild found it in 1916 — weeks after Einstein published the field equations — while serving on the Russian front.

        The $dt^2$ term gives [[Gravitational Time Dilation]]; the $dr^2$ term stretches radial distances.
      `,
    }),

    entry('example-schwarzschild-radii', 'example', REL, 'solid', 'Schwarzschild radius of the Earth and the Sun', {
      summary: 'Earth would have to be squeezed to the size of a marble; the Sun to a few kilometres across.',
      tags: ['general relativity', 'black holes'],
      body: md`
        $$r_s = \frac{2GM}{c^2}$$

        - **Earth**, $M = 5.972\times10^{24}\ \text{kg}$: $r_s \approx 8.87\ \text{mm}$.
        - **Sun**, $M = 1.989\times10^{30}\ \text{kg}$: $r_s \approx 2.95\ \text{km}$.

        At Earth's surface $r_s/r = 8.87\ \text{mm} / 6371\ \text{km} \approx 1.4\times10^{-9}$. So a clock on the ground loses about

        $$\frac{r_s}{2r} \times 86\,400\ \text{s} \approx 60\ \mu\text{s per day}$$

        compared with a clock far from Earth (ignoring the Sun and Earth's rotation).
      `,
    }),

    entry('einstein-field-equations', 'equation', REL, 'curious', 'Einstein Field Equations', {
      summary: 'How matter and energy curve spacetime.',
      latex: md`G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}\,T_{\mu\nu}`,
      variables: [
        [md`G_{\mu\nu}`, 'Einstein tensor — curvature built from the metric'],
        [md`g_{\mu\nu}`, 'Metric tensor — measures distances and times'],
        [md`\Lambda`, 'Cosmological constant'],
        [md`T_{\mu\nu}`, 'Stress–energy tensor: energy density, momentum, pressure, stress'],
        [md`8\pi G/c^4`, 'Coupling constant ≈ 2.08 × 10⁻⁴³ N⁻¹ — tiny, which is why curvature needs huge masses'],
      ],
      tags: ['general relativity'],
      body: md`
        Spacetime tells matter how to move; matter tells spacetime how to curve. Ten coupled nonlinear partial differential equations for the metric.

        Solutions include the [[Schwarzschild Metric]], expanding universes (FLRW) and gravitational waves.

        Einstein, November 1915.
      `,
      sources: ['Bernard Schutz — A First Course in General Relativity (2nd ed., 2009)'],
    }),

    entry('example-gps', 'example', REL, 'solid', 'GPS Clock Corrections', {
      summary: 'Satellite clocks gain 45.7 μs/day from gravity and lose 7.2 μs/day from speed: net +38.5 μs/day.',
      tags: ['general relativity', 'special relativity', 'technology'],
      body: md`
        GPS satellites orbit at radius $r \approx 26\,560\ \text{km}$ with speed $v = \sqrt{GM/r} \approx 3.87\ \text{km/s}$. Per day ($86\,400\ \text{s}$):

        **Gravity** — higher up, clocks run faster:
        $$\frac{GM}{c^2}\left(\frac{1}{R_\oplus} - \frac{1}{r}\right)\times 86\,400\ \text{s} \approx +45.7\ \mu\text{s}$$

        **Speed** — moving clocks run slower:
        $$-\frac{v^2}{2c^2}\times 86\,400\ \text{s} \approx -7.2\ \mu\text{s}$$

        **Net:** about $+38.5\ \mu\text{s}$ per day. Light covers about 11.5 km in that time, so uncorrected positions would drift by kilometres per day.

        Fix: the satellite clocks are deliberately set to tick slow before launch, by about $4.465\times10^{-10}$.
      `,
    }),

    entry('pound-rebka', 'example', REL, 'solid', 'Pound–Rebka Experiment', {
      summary: 'The first lab measurement of gravitational redshift: 22.5 metres of height, a shift of 2.5 parts in $10^{15}$.',
      tags: ['general relativity', 'experiments'],
      body: md`
        Harvard, 1959: gamma rays from iron-57 sent up and down a 22.5 m tower. Predicted fractional frequency shift:

        $$\frac{\Delta f}{f} = \frac{g h}{c^2} = \frac{9.81 \times 22.5}{(3.00\times10^8)^2} \approx 2.46\times10^{-15}$$

        The measurement (published 1960) agreed to within 10%; Pound and Snider later got it to 1%. Detecting such a tiny shift was possible only because of the extremely narrow Mössbauer resonance line.
      `,
      sources: ['Pound & Rebka — Apparent Weight of Photons, Phys. Rev. Lett. 4, 337 (1960)'],
    }),

    entry('clocks-superposition-gravity', 'theory', REL, 'curious', 'Clocks, Superposition and Gravity', {
      summary:
        'Where relativity meets quantum mechanics in the lab: quantum clocks that feel gravity across a millimetre, and proposals to put one clock at two heights at once.',
      tags: ['quantum gravity', 'atomic clocks', 'experiments'],
      body: md`
        ## Relativity measured with quantum devices
        Atomic clocks tick at the frequency of a quantum transition, and they are now precise enough to see [[Gravitational Time Dilation]] at tiny scales:
        - **2010, NIST:** two aluminium-ion clocks 33 cm apart in height — rate difference detected (Chou et al.).
        - **2022, JILA:** redshift measured *across a single cloud* of strontium atoms, over about a millimetre — a fractional shift near $10^{-19}$ (Bothwell et al.).

        ## Gravity acting on superpositions
        - **COW experiment (1975):** neutrons in an interferometer, one path higher than the other. Gravity shifts the relative phase — [[Superposition]] responding to a gravitational potential (Colella, Overhauser, Werner).
        - **Zych et al. (2011)** proposed putting a *clock* in a superposition of two heights. The branches age differently, so the clock's own time records which path it took, and interference should fade. Proper time behaves like a quantum degree of freedom.
        - **Pikovski et al. (2015)** argued that time dilation decoheres any composite system in a gravitational field.

        ## Why it matters
        General relativity treats time as part of a smooth classical geometry; quantum mechanics treats time as an external parameter. These experiments probe the regime where *both* matter — early footholds toward quantum gravity. The constant tying them together is [[Speed of Light|c]], through $gh/c^2$.

        ## Open
        - [ ] Can a clock's proper time really be in superposition? A 2015 experiment (Margalit et al.) mimicked the effect with a magnetic field gradient; doing it with gravity alone is still out of reach.
      `,
      sources: [
        'Chou et al. — Optical Clocks and Relativity, Science 329, 1630 (2010)',
        'Bothwell et al. — Resolving the gravitational redshift across a millimetre-scale atomic sample, Nature 602, 420 (2022)',
        'Zych et al. — Quantum interferometric visibility as a witness of general relativistic proper time, Nat. Commun. 2, 505 (2011)',
        'Pikovski et al. — Universal decoherence due to gravitational time dilation, Nat. Phys. 11, 668 (2015)',
      ],
    }),

    // ------------------------------------------------------------ miscellany
    entry('why-24', 'question', MISC, 'curious', 'Why does 24 keep showing up?', {
      summary: 'Bosonic strings, the Leech lattice, the Moonshine Module, ζ(−1)… Are these all the same 24?',
      tags: ['24 dimensions', 'patterns'],
      body: md`
        Noticed while reading:
        - Bosonic string: $26 - 2 = 24$ transverse directions — [[Critical Dimension of the Bosonic String]]
        - The [[Leech Lattice]] lives in 24 dimensions
        - The [[Moonshine Module]] has central charge $c = 24$
        - $\zeta(-1) = -\tfrac{1}{12}$, giving the $\tfrac{1}{24}$ in $-\tfrac{D-2}{24}$
        - The Dedekind eta function $\eta(\tau) = q^{1/24}\prod_{n\ge1}(1-q^n)$, and the modular discriminant $\Delta = \eta^{24}$ — related to [[The j-invariant]]
        - $1^2 + 2^2 + \cdots + 24^2 = 70^2$: the *cannonball problem*, whose only nontrivial solution is 24 (Watson, 1918). Conway used the vector $(0, 1, \dots, 24 \mid 70)$ to construct the Leech lattice.

        Partial answer so far: the eta function, modular forms and string oscillators are one story — the $q^{1/24}$ in $\eta$ is the same zero-point energy as in the string.
      `,
    }),

    entry('how-to-use', 'note', MISC, 'solid', 'How to use Lattice', {
      summary: 'Writing math, linking entries, keyboard shortcuts and where your data lives.',
      tags: ['help'],
      body: md`
        Everything in Lattice is an **entry** — a concept, theory, equation, example, question or note. Entries belong to an **area** and connect to each other with **typed links**.

        ## Writing
        Bodies are Markdown, plus:
        - Inline math: ${BT}$E = mc^2$${BT} → $E = mc^2$
        - Display math: ${BT}$$ ... $$${BT} on its own lines
        - Link to another entry: ${BT}[[Superposition]]${BT}, or with your own text ${BT}[[Speed of Light|c]]${BT}. A link to an entry that doesn't exist yet is shown dashed — click it to create that entry.
        - Checklists: ${BT}- [ ] read the FLM book${BT}

        ## Equations
        Put the formula in the **Formula** field and list what each symbol means. From an equation's page, **+ Example** creates a worked example that's already linked to it.

        ## Try it and Watch
        - **Try it** — many equations come with a small calculator: drag the sliders (or type a number) and see what comes out. Change the GPS orbit and watch the clock drift change, or double the electron's charge and see atoms shrink. Add one to your own entries under **Calculator** in the editor: inputs with a range, outputs as formulas like ${BT}0.5*m*v^2${BT}, with constants such as ${BT}c${BT}, ${BT}G${BT}, ${BT}hbar${BT} and ${BT}kB${BT} built in.
        - **Watch** — videos on the topic from channels like 3Blue1Brown, PBS Space Time and Numberphile. Add your own under **Videos**: a YouTube link per line, with a title after it if you like.

        ## Links
        On any entry use **+ Link**: *builds on*, *describes*, *example of*, *derived from*, *special case of*, *part of*, *explains*, *related to*, *same idea as*, *in tension with*. Each link shows on both entries, read in the right direction.

        While you write, the editor spots other topics you mention and offers to link them — as a **Basic** (this builds on it) or as **Related** — in one click.

        ## Exploring
        Nothing here is a course. Open anything and follow what catches your eye.
        - **Highlights** — while you read, other topics mentioned in the text are marked. The ones this topic *builds on* get a yellow marker-pen highlight: those are the basics worth knowing. Hover (or tap) any highlight to **peek** — what it is, why it's connected here, its formula — without leaving the page.
        - **Basics this uses** — the chips under the summary. Mark one **Solid** from its peek once you know it, and its highlight goes quiet.
        - **Where this leads** — cards at the bottom, each with one line on *why* that connection is interesting.
        - **Surprising connections** — topics in other areas you reach through one shared idea.
        - **Your trail** — the chain of topics you followed to get here.

        Give your own entries a few names under **Also called** so other notes spot them. Highlights can be turned off in **Settings**.

        ## Questions
        While you read, write down whatever you don't get: **Questions** on a topic in Explore, or **Your questions** beside its notes. The **Questions** page in the top bar gathers them from every topic you studied. **Copy** puts them all on the clipboard as one message, grouped by topic with each topic's summary for context, ready to paste into any AI chat. Afterwards, **Mark all as asked**.

        **Answers back:** paste the AI's whole reply into the Questions page. Each numbered answer is matched to its question, and you can drop any of them into the topic's notes. Topics with questions still open are marked wherever they appear, so you can see where you got stuck.

        ## Practising instead of rereading
        Rereading feels like learning, but trying to recall, predict and explain is what actually makes things stick. None of this is a quiz — switch any of it on while you read:
        - **Guess first** in Try it: answers stay hidden until you've guessed, then it tells you how far off you were.
        - **Practise** on a topic: *Explain it back* (notes hidden while you write), *Cover the formula*, *Fill the gaps*, and *Fade the steps* on worked examples.
        - **Hide the reasons and guess them** on Explore, then reveal one at a time.
        - **Compare** two topics and write what's the same underneath before seeing what they share.
        - **Mix it up** (on the start page): five quick tasks from different areas.
        - Coming back to a topic after a couple of weeks, it asks whether you can still recall it first.

        ## Where next
        - **Up next** at the bottom of each page suggests one topic to keep going with.
        - **Connect to…** on a topic (or "How are two topics connected?" in search) finds the chain of links between any two topics, with the reason for each step.

        ## Finding things
        - Search shows the line it matched, not just the title.
        - Type ${BT}=${BT} in any search box for a quick sum: ${BT}=sqrt(hbar*c/G)${BT} gives the Planck mass. All the constants are there.
        - **Equation sheet**, **Timeline** and **Loose ends** live at the top of the Library. The timeline uses the optional **Year** on an entry.

        ## Pictures
        In the editor, **Add a picture**, paste a screenshot, or drop an image into the notes. On a phone the picker offers the camera, which is handy for handwritten working.

        ## Undo
        Every edit keeps the version before it. **History** on an entry lists them and puts any one back — and that restore can be undone the same way.

        ## Tracking
        Every entry has a status — **Curious**, **Exploring** or **Solid** — so you can see what you've actually got a grip on.

        ## Keyboard
        - ${BT}n${BT} new entry · ${BT}q${BT} jot a question · ${BT}/${BT} search · ${BT}g${BT} graph · ${BT}l${BT} library · ${BT}h${BT} home
        - ${BT}e${BT} edit the entry you're viewing
        - ${BT}Ctrl${BT} + ${BT}Enter${BT} save while editing · ${BT}Esc${BT} close

        ## Your data
        Everything is saved in ${BT}data/lattice.json${BT} inside the app folder, with a daily copy in ${BT}data/backups/${BT}. Export or import everything from **Settings**.

        ## On your phone
        Start Lattice with ${BT}npm run lan${BT} instead of ${BT}npm start${BT}. The terminal shows an address and an access code; open the address on a phone on the same Wi-Fi and enter the code once. Only do this on a network you trust — anyone with the code can read and edit your notes. Restarting the server asks for the code again.
      `,
    }),
  ],

  // [from, kind, to, note?]
  links: [
    // string theory
    ['order-of-the-monster', 'describes', 'monster-group'],
    ['monstrous-moonshine', 'builds-on', 'monster-group'],
    ['monstrous-moonshine', 'builds-on', 'j-invariant'],
    ['example-mckay-196884', 'example-of', 'monstrous-moonshine'],
    ['example-mckay-196884', 'related', 'j-invariant'],
    ['moonshine-module', 'explains', 'monstrous-moonshine', 'Borcherds used it to prove the Conway–Norton conjectures (1992)'],
    ['moonshine-module', 'example-of', 'vertex-operator-algebra'],
    ['moonshine-module', 'builds-on', 'leech-lattice'],
    ['moonshine-module', 'related', 'monster-group', 'The Monster is its full symmetry group'],
    ['virasoro-algebra', 'part-of', 'vertex-operator-algebra'],
    ['vertex-operator-algebra', 'describes', 'bosonic-string', 'The worldsheet theory, written as an algebra'],
    ['critical-dimension', 'describes', 'bosonic-string'],
    ['example-zeta-regularization', 'example-of', 'critical-dimension'],
    ['critical-dimension', 'related', 'virasoro-algebra', 'c = 26 cancels the ghost anomaly'],
    ['leech-lattice', 'related', 'bosonic-string', '24 transverse dimensions'],
    ['question-monster-universe', 'related', 'monster-group'],
    ['question-monster-universe', 'related', 'moonshine-module'],
    // quantum
    ['schrodinger-equation', 'explains', 'superposition', 'Linearity: sums of solutions are solutions'],
    ['born-rule', 'related', 'superposition'],
    ['example-qubit', 'example-of', 'born-rule'],
    ['example-qubit', 'example-of', 'superposition'],
    ['bose-einstein-condensate', 'builds-on', 'bose-einstein-statistics'],
    ['bec-critical-temperature', 'derived-from', 'bose-einstein-statistics'],
    ['bec-critical-temperature', 'describes', 'bose-einstein-condensate'],
    ['example-rb87-tc', 'example-of', 'bec-critical-temperature'],
    ['gross-pitaevskii', 'describes', 'bose-einstein-condensate'],
    ['gross-pitaevskii', 'derived-from', 'schrodinger-equation', 'Mean-field approximation'],
    ['bose-einstein-condensate', 'related', 'superposition', 'One wavefunction shared by every atom'],
    ['superfluidity', 'related', 'bose-einstein-condensate'],
    ['landau-criterion', 'explains', 'superfluidity'],
    ['example-landau-velocities', 'example-of', 'landau-criterion'],
    ['bogoliubov-dispersion', 'derived-from', 'gross-pitaevskii'],
    ['landau-criterion', 'related', 'bogoliubov-dispersion', 'A linear spectrum gives v_c = c_s'],
    ['quantized-circulation', 'derived-from', 'gross-pitaevskii', 'Single-valued phase'],
    ['quantized-circulation', 'describes', 'superfluidity'],
    ['example-he4-circulation', 'example-of', 'quantized-circulation'],
    // relativity
    ['sr-time-dilation', 'builds-on', 'speed-of-light'],
    ['example-muon', 'example-of', 'sr-time-dilation'],
    ['gravitational-time-dilation', 'derived-from', 'schwarzschild-metric'],
    ['schwarzschild-metric', 'derived-from', 'einstein-field-equations', 'Exact vacuum solution'],
    ['example-schwarzschild-radii', 'example-of', 'schwarzschild-metric'],
    ['example-schwarzschild-radii', 'example-of', 'gravitational-time-dilation'],
    ['example-gps', 'example-of', 'gravitational-time-dilation'],
    ['example-gps', 'example-of', 'sr-time-dilation'],
    ['pound-rebka', 'example-of', 'gravitational-time-dilation'],
    ['gravitational-time-dilation', 'related', 'speed-of-light', 'Rate shift of Φ/c²'],
    ['sr-time-dilation', 'related', 'gravitational-time-dilation', 'Both matter for GPS'],
    // bridges between areas
    ['clocks-superposition-gravity', 'builds-on', 'gravitational-time-dilation'],
    ['clocks-superposition-gravity', 'builds-on', 'superposition'],
    ['clocks-superposition-gravity', 'related', 'speed-of-light'],
    [
      'einstein-field-equations',
      'tension',
      'superposition',
      'What curvature does a mass in superposition produce? Classical GR has no answer.',
    ],
    // miscellany
    ['why-24', 'related', 'critical-dimension'],
    ['why-24', 'related', 'leech-lattice'],
    ['why-24', 'related', 'moonshine-module'],
    ['why-24', 'related', 'j-invariant'],
  ],
};

// Links are [from, kind, to, note?]. Notes from the connections pack fill in the blanks.
const noteFor = (from, to) =>
  CONNECTIONS.notes.find(([a, b]) => (a === from && b === to) || (a === to && b === from))?.[2];
const withNotes = (links) => links.map(([from, kind, to, note]) => [from, kind, to, note || noteFor(from, to)]);

// Subject areas first, then foundations, with Miscellany last.
export const SEED = {
  areas: [
    ...CORE.areas.filter((a) => a.id !== MISC),
    ...FOUNDATIONS.areas,
    ...CORE.areas.filter((a) => a.id === MISC),
  ],
  entries: [...CORE.entries, ...FOUNDATIONS.entries, ...EXPANSION.entries, ...DEEPER.entries].map((e) => ({
    ...e,
    aliases: e.aliases?.length ? e.aliases : CONNECTIONS.aliases[e.id] || [],
    calc: e.calc || PLAYGROUND.calcs[e.id] || null,
    videos: e.videos?.length ? e.videos : VIDEOS.videos[e.id] || [],
    year: e.year ?? DATES.years[e.id] ?? null,
  })),
  links: withNotes([...CORE.links, ...FOUNDATIONS.links, ...CONNECTIONS.links, ...EXPANSION.links, ...DEEPER.links]),
};
