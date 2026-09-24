import { AREA, entry, md } from '../helpers.js';

const A = AREA.MATHS;

export const MATHS_AREA = {
  id: A,
  name: 'Mathematical Foundations',
  color: '#4f9ee8',
  description: 'The maths underneath everything else: complex numbers, linear algebra, groups, modular forms, geometry.',
};

export const MATHS = [
  entry('complex-numbers', 'concept', A, 'curious', 'Complex Numbers & Euler’s Formula', {
    summary: 'Numbers of the form a + bi with i² = −1. Every quantum amplitude, phase and q = e^{2πiτ} lives here.',
    latex: md`e^{i\theta} = \cos\theta + i\sin\theta, \qquad z = r\,e^{i\theta}`,
    variables: [
      [md`i`, 'The imaginary unit, $i^2 = -1$'],
      [md`r = |z|`, 'Magnitude (modulus)'],
      [md`\theta`, 'Phase (argument), an angle'],
    ],
    tags: ['basics'],
    body: md`
      A complex number is a point in the plane: $z = a + bi = r e^{i\theta}$. Multiplying complex numbers **multiplies magnitudes and adds phases** — that one fact is why they run through all of wave physics.

      - $|z|^2 = z^* z = a^2 + b^2$ — the squared magnitude used in the [[Born Rule]].
      - $e^{i\pi} + 1 = 0$.
      - Going once around a circle multiplies by $e^{2\pi i} = 1$: phases are only defined modulo $2\pi$, which is where [[Quantized Circulation]] comes from.

      **Where it shows up:** quantum amplitudes ([[Superposition]]), the phase of a condensate wavefunction, and the variable $q = e^{2\pi i\tau}$ in [[The j-invariant]].
    `,
  }),

  entry('calculus', 'concept', A, 'curious', 'Calculus & Taylor Series', {
    summary: 'Derivatives measure rates of change, integrals add up small pieces, and Taylor series approximate any smooth function by a polynomial.',
    latex: md`f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}\,(x-a)^n`,
    variables: [
      [md`f^{(n)}(a)`, 'The n-th derivative of f at the point a'],
    ],
    tags: ['basics'],
    body: md`
      Physics is written in calculus: velocity is $dx/dt$, work is $\int F\,dx$.

      **Taylor series** are how "weak field" and "slow speed" approximations are made:
      - $\sqrt{1-x} \approx 1 - \tfrac{x}{2}$ turns the exact [[Gravitational Time Dilation]] formula into $1 + \Phi/c^2$.
      - $\gamma = (1 - v^2/c^2)^{-1/2} \approx 1 + \tfrac{v^2}{2c^2}$ in [[Special-Relativistic Time Dilation]].
      - $\sinh x = x + x^3/6 + \cdots$ in [[Regularizing 1 + 2 + 3 + ⋯]].
    `,
    sources: ['Stewart — Calculus', 'Mary Boas — Mathematical Methods in the Physical Sciences'],
  }),

  entry('infinite-series', 'concept', A, 'curious', 'Infinite Series & Convergence', {
    summary: 'Adding infinitely many terms: when it gives a finite answer, and what to do when it doesn’t.',
    latex: md`\sum_{n=0}^{\infty} x^n = \frac{1}{1-x} \quad (|x| < 1)`,
    variables: [[md`x`, 'The ratio between successive terms']],
    tags: ['basics', 'series'],
    body: md`
      A series converges if its partial sums approach a limit. The **geometric series** above is the workhorse:

      - Summing $\sum_n e^{-n\beta\varepsilon}$ for a single boson mode gives $1/(1 - e^{-\beta\varepsilon})$ — the first step to the [[Bose–Einstein Distribution]].
      - $1 + 2 + 3 + \cdots$ diverges, yet string theory needs a finite value for it. Making sense of that is [[Regularization & Renormalization]] (and the [[Riemann Zeta Function]]).
      - Power series in $q$ are the language of [[Generating Functions & q-Series]].
    `,
  }),

  entry('generating-functions', 'concept', A, 'curious', 'Generating Functions & q-Series', {
    summary: 'Store a whole sequence of numbers as the coefficients of one power series. Counting string states, partitions and Monster dimensions all work this way.',
    latex: md`\sum_{n\ge 0} p(n)\,q^n = \prod_{k=1}^{\infty}\frac{1}{1-q^k} = 1 + q + 2q^2 + 3q^3 + 5q^4 + 7q^5 + 11q^6 + \cdots`,
    variables: [
      [md`p(n)`, 'Number of ways to write n as a sum of positive integers (partitions)'],
      [md`q`, 'A bookkeeping variable; its power tracks the size n'],
    ],
    tags: ['series', 'counting', 'moonshine'],
    body: md`
      **Why the product works:** $\frac{1}{1-q^k} = 1 + q^k + q^{2k} + \cdots$ chooses how many parts of size $k$ to use. Multiplying over all $k$ counts every partition once.

      **Physics reading:** one oscillator mode of frequency $k$ can be excited 0, 1, 2… times, each adding energy $k$. So $\prod_k (1-q^k)^{-1}$ counts the states of a single vibrating string direction by energy — and $\prod_k (1-q^k)^{-24}$ counts them for 24 directions ([[Counting states of 24 string oscillators]]).

      A **graded dimension** $\sum_n \dim V_n\, q^n$ is a generating function too — exactly how the [[Moonshine Module]] is compared with [[The j-invariant]].
    `,
  }),

  entry('linear-algebra', 'concept', A, 'curious', 'Vector Spaces & Linear Maps', {
    summary: 'Vectors you can add and scale, and the maps (matrices) that respect that structure. The grammar of quantum mechanics and representation theory.',
    latex: md`\mathbf v = \sum_i v_i\,\mathbf e_i, \qquad (A\mathbf v)_i = \sum_j A_{ij}\,v_j`,
    variables: [
      [md`\mathbf e_i`, 'A basis: every vector is a unique combination of these'],
      [md`A_{ij}`, 'Matrix of a linear map in that basis'],
    ],
    tags: ['basics', 'linear algebra'],
    body: md`
      Key ideas to be comfortable with:
      - **Basis and dimension** (the Monster’s smallest representation has dimension $196\,883$).
      - **Inner products** $\langle u, v\rangle$ — lengths and angles; in quantum mechanics, overlaps and probabilities.
      - **Matrices** as linear maps, **change of basis**, **trace** and **determinant**.
      - **Tensor products** $V \otimes W$ — how composite quantum systems and [[Entanglement]] are built.

      Functions form vector spaces too, which is why [[Fourier Series & Transforms]] is "linear algebra with infinitely many dimensions".
    `,
    sources: ['Sheldon Axler — Linear Algebra Done Right', 'Gilbert Strang — Introduction to Linear Algebra'],
  }),

  entry('eigenvalues', 'equation', A, 'curious', 'Eigenvalues & Eigenvectors', {
    summary: 'Directions a linear map only stretches. In quantum mechanics the eigenvalues are the possible measurement results.',
    latex: md`A\,\mathbf v = \lambda\,\mathbf v, \qquad \det(A - \lambda I) = 0`,
    variables: [
      [md`\mathbf v`, 'Eigenvector (nonzero)'],
      [md`\lambda`, 'Eigenvalue'],
      [md`I`, 'Identity matrix'],
    ],
    tags: ['linear algebra'],
    body: md`
      **Spectral theorem:** a Hermitian matrix ($A = A^\dagger$) has real eigenvalues and an orthonormal basis of eigenvectors. That is exactly what an observable needs — see [[Observables, Operators & Commutators]].

      **Quick example:** $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ has $\det(A-\lambda I) = \lambda^2 - 1$, so $\lambda = \pm 1$ with eigenvectors $(1, \pm 1)/\sqrt2$. That matrix is the spin operator $\sigma_x$, and those eigenvectors are the $\ket{\pm}$ states used in [[Measuring a qubit in two bases]].

      Normal modes of vibration, stationary states of the [[Schrödinger Equation]] and energy levels of the [[Quantum Harmonic Oscillator]] are all eigenvalue problems.
    `,
  }),

  entry('differential-equations', 'concept', A, 'curious', 'Differential Equations', {
    summary: 'Equations relating a function to its derivatives. Nearly every law of physics is one.',
    latex: md`\ddot x = -\omega^2 x \quad\Longrightarrow\quad x(t) = A\cos(\omega t + \varphi)`,
    variables: [
      [md`\ddot x`, 'Second time derivative (acceleration)'],
      [md`\omega`, 'Angular frequency'],
      [md`A,\ \varphi`, 'Amplitude and phase, fixed by initial conditions'],
    ],
    tags: ['basics'],
    body: md`
      - **Ordinary** (one variable): the harmonic oscillator above, Newton’s $F = m\ddot x$.
      - **Partial** (several variables): the wave equation, Maxwell’s equations, the [[Schrödinger Equation]], the [[Einstein Field Equations]].
      - **Linear** equations allow superposition of solutions; **nonlinear** ones like the [[Gross–Pitaevskii Equation]] don’t.
      - **Separation of variables** and **eigenfunction expansions** turn PDEs into many simple ODEs.
    `,
  }),

  entry('vector-calculus', 'concept', A, 'curious', 'Vector Calculus & Stokes’ Theorem', {
    summary: 'Gradient, divergence and curl of fields, and the theorems that turn loop integrals into area integrals.',
    latex: md`\oint_{C} \mathbf v\cdot d\boldsymbol\ell = \iint_{S} (\nabla\times\mathbf v)\cdot d\mathbf A`,
    variables: [
      [md`\nabla\times\mathbf v`, 'Curl: local rotation (vorticity) of the field'],
      [md`C,\ S`, 'A closed loop and a surface bounded by it'],
    ],
    tags: ['basics', 'fields'],
    body: md`
      - $\nabla\Phi$ (gradient): force from a potential, $\mathbf F = -m\nabla\Phi$.
      - $\nabla\cdot\mathbf E$ (divergence): sources of a field.
      - $\nabla\times\mathbf v$ (curl): rotation.

      **Why it matters for superfluids:** superfluid velocity is a gradient, $\mathbf v_s = \frac{\hbar}{m}\nabla\theta$, and the curl of a gradient is zero. So by Stokes’ theorem the circulation should vanish — unless the loop encloses a vortex core where $\theta$ is undefined. That loophole is [[Quantized Circulation]].
    `,
  }),

  entry('fourier-analysis', 'concept', A, 'curious', 'Fourier Series & Transforms', {
    summary: 'Any reasonable function is a sum of pure waves. Modes of a string, momentum space and q-expansions are all Fourier analysis.',
    latex: md`f(x) = \sum_{n\in\mathbb Z} c_n\,e^{2\pi i n x/L}, \qquad c_n = \frac1L\int_0^L f(x)\,e^{-2\pi i n x/L}\,dx`,
    variables: [
      [md`c_n`, 'Amplitude of the n-th harmonic'],
      [md`L`, 'Period'],
    ],
    tags: ['waves', 'series'],
    body: md`
      - A vibrating string is a sum of harmonics $n = 1, 2, 3, \dots$ — the oscillators whose zero-point energies add up to the [[Critical Dimension of the Bosonic String]].
      - Position and momentum wavefunctions are Fourier transforms of each other, which is the root of the [[Heisenberg Uncertainty Principle]].
      - A function periodic under $\tau \to \tau + 1$ has an expansion in $q = e^{2\pi i\tau}$ — the $q$-expansion of [[The j-invariant]].
    `,
  }),

  entry('probability', 'concept', A, 'curious', 'Probability & Expectation Values', {
    summary: 'Weights that add to one, averages, and spreads. Quantum measurement and statistical mechanics both speak it.',
    latex: md`\langle X\rangle = \sum_i p_i\,x_i, \qquad \sigma_X^2 = \langle X^2\rangle - \langle X\rangle^2`,
    variables: [
      [md`p_i`, 'Probability of outcome i (all ≥ 0, summing to 1)'],
      [md`\sigma_X`, 'Standard deviation — the spread'],
    ],
    tags: ['basics'],
    body: md`
      - In quantum mechanics $p_i = |c_i|^2$ ([[Born Rule]]) and the expectation value is $\langle A\rangle = \bra{\psi}\hat A\ket{\psi}$.
      - The $\sigma$ in the [[Heisenberg Uncertainty Principle]] is exactly this standard deviation.
      - In [[Boltzmann Distribution & Partition Function]] the probabilities are $e^{-E/k_BT}/Z$.
    `,
  }),

  entry('complex-analysis', 'concept', A, 'curious', 'Complex Analysis & Laurent Series', {
    summary: 'Calculus of functions of a complex variable. Holomorphic functions are astonishingly rigid — the basis of 2D conformal field theory and modular forms.',
    latex: md`f(z) = \sum_{n\in\mathbb Z} a_n (z-z_0)^n, \qquad \oint f(z)\,dz = 2\pi i\,a_{-1}`,
    variables: [
      [md`a_n`, 'Laurent coefficients (negative n allowed: poles)'],
      [md`a_{-1}`, 'The residue at z₀'],
    ],
    tags: ['complex analysis'],
    body: md`
      - **Holomorphic** = complex-differentiable. Such functions are determined by very little data, and angle-preserving (conformal).
      - **Laurent series** allow negative powers. Vertex operators $Y(a,z) = \sum a_{(n)} z^{-n-1}$ and $j(\tau) = q^{-1} + 744 + \cdots$ are both Laurent series.
      - **Residues** turn contour integrals into algebra — how modes are extracted from fields in [[2D Conformal Field Theory]] and the [[Operator Product Expansion]].
      - **Analytic continuation** extends a function beyond where its series converges — how the [[Riemann Zeta Function]] gets a value at $s = -1$.
    `,
    sources: ['Tristan Needham — Visual Complex Analysis'],
  }),

  entry('riemann-zeta', 'equation', A, 'curious', 'Riemann Zeta Function', {
    summary: 'ζ(s) = Σ 1/nˢ, continued to the whole complex plane. Its values fix both the BEC transition temperature and the dimension of string theory.',
    latex: md`\zeta(s) = \sum_{n=1}^{\infty}\frac{1}{n^s} \qquad \zeta(2) = \frac{\pi^2}{6},\quad \zeta(\tfrac32) \approx 2.612,\quad \zeta(0) = -\tfrac12,\quad \zeta(-1) = -\tfrac{1}{12}`,
    variables: [[md`s`, 'Complex variable; the sum converges for Re s > 1']],
    tags: ['number theory', 'series', 'bridge'],
    body: md`
      The series only converges for $\mathrm{Re}\,s > 1$, but $\zeta$ extends uniquely (by analytic continuation — see [[Complex Analysis & Laurent Series]]) to every $s \neq 1$. Euler found $\zeta(2) = \pi^2/6$ in 1734; Riemann studied the continuation in 1859.

      **Two of your topics depend on it:**
      - $\zeta(3/2) \approx 2.612$ sets the [[BEC Critical Temperature]]: $n\lambda_T^3 = \zeta(3/2)$.
      - $\zeta(-1) = -1/12$ sets the zero-point energy of string oscillators and forces $D = 26$ ([[Critical Dimension of the Bosonic String]]).

      $\zeta(-1) = -1/12$ does **not** mean $1 + 2 + 3 + \cdots$ literally equals $-1/12$; it is the finite, cutoff-independent part that survives [[Regularization & Renormalization]].
    `,
  }),

  entry('group-theory', 'concept', A, 'curious', 'Groups & Symmetry', {
    summary: 'A group is the set of symmetries of something: you can combine them, undo them, and do nothing.',
    latex: md`(gh)k = g(hk), \qquad e\,g = g\,e = g, \qquad g\,g^{-1} = e`,
    variables: [
      [md`e`, 'Identity element (do nothing)'],
      [md`g^{-1}`, 'Inverse (undo g)'],
    ],
    tags: ['group theory', 'symmetry'],
    body: md`
      **Examples to have in your head:**
      - $\mathbb Z_n$: rotations of a regular $n$-gon.
      - $S_n$: all permutations of $n$ objects ($n!$ elements).
      - $SO(3)$: rotations in space — infinite and continuous (a Lie group).
      - $SL(2,\mathbb Z)$: integer matrices with determinant 1, acting on $\tau$ in [[Modular Group & Modular Forms]].

      **Order** = number of elements. **Homomorphisms** are maps that respect the multiplication.

      In physics, symmetries give conservation laws ([[Noether’s Theorem]]) and organize particles and states ([[Representation Theory & Characters]]).
    `,
    sources: ['Nathan Carter — Visual Group Theory', 'Mark Ronan — Symmetry and the Monster'],
  }),

  entry('normal-subgroups', 'concept', A, 'curious', 'Subgroups, Normal Subgroups & Quotients', {
    summary: 'How groups break into pieces. A group with no normal pieces is simple — an atom of symmetry.',
    latex: md`|G| = |H|\,[G:H], \qquad G/N = \{\,gN : g\in G\,\}`,
    variables: [
      [md`H \le G`, 'A subgroup; its size divides |G| (Lagrange’s theorem)'],
      [md`N \trianglelefteq G`, 'A normal subgroup: gNg⁻¹ = N for all g'],
      [md`G/N`, 'Quotient group'],
    ],
    tags: ['group theory'],
    body: md`
      Normal subgroups are exactly the kernels of homomorphisms, and they let you form the quotient $G/N$. Repeatedly splitting a finite group this way ends in **simple** groups (the Jordan–Hölder theorem), just as integers factor into primes.

      Example: $A_5$, the 60 rotations of an icosahedron, has no normal subgroups other than itself and $\{e\}$ — it is the smallest non-abelian simple group.

      This is the vocabulary needed for the [[Classification of Finite Simple Groups]].
    `,
  }),

  entry('finite-simple-groups', 'theory', A, 'curious', 'Classification of Finite Simple Groups', {
    summary: 'Every finite simple group is cyclic of prime order, alternating, of Lie type — or one of exactly 26 sporadic exceptions.',
    tags: ['group theory', 'sporadic groups'],
    body: md`
      **The list:**
      1. Cyclic groups $\mathbb Z_p$, $p$ prime.
      2. Alternating groups $A_n$, $n \ge 5$.
      3. Groups of Lie type — finite-field versions of matrix groups like $PSL(n, q)$ (16 families).
      4. **26 sporadic groups** that fit no family: the five Mathieu groups (including $M_{24}$, see [[Golay Code & the Mathieu Group M₂₄]]), the Conway groups from the [[Leech Lattice]], … and the largest, the [[Monster Group]].

      **The proof** is spread over tens of thousands of pages by around 100 authors. It was announced around 1983; the last gap (quasithin groups) was closed by Aschbacher and Smith in 2004.
    `,
    sources: ['https://en.wikipedia.org/wiki/Classification_of_finite_simple_groups'],
  }),

  entry('representation-theory', 'concept', A, 'curious', 'Representation Theory & Characters', {
    summary: 'Making a group act by matrices on a vector space. “The Monster has a 196,883-dimensional representation” is a statement in this language.',
    latex: md`\rho(gh) = \rho(g)\,\rho(h), \qquad \chi_\rho(g) = \operatorname{tr}\rho(g), \qquad \sum_{\text{irreps}} (\dim V_i)^2 = |G|`,
    variables: [
      [md`\rho: G \to GL(V)`, 'A representation: each group element becomes an invertible matrix'],
      [md`\chi_\rho`, 'Character: the trace of the matrices'],
      [md`V_i`, 'Irreducible representations (no invariant subspace)'],
    ],
    tags: ['group theory', 'representations'],
    body: md`
      - **Irreducible** representations are the building blocks; every representation of a finite group splits into them.
      - **Characters** (traces) determine a representation completely, and are cheap to compute.
      - Finite groups have as many irreducibles as conjugacy classes. The Monster has 194.

      **Where it shows up:**
      - Quantum states of a symmetric system organize into representations (e.g. spin multiplets — [[Spin & Angular Momentum]]).
      - [[Monstrous Moonshine]] says each energy level of the [[Moonshine Module]] is a Monster representation; the twisted series $T_g$ are built from **characters** $\operatorname{tr}(g \mid V_n)$.

      Worked example: [[Representations of S₃]].
    `,
    sources: ['Fulton & Harris — Representation Theory: A First Course'],
  }),

  entry('example-s3-characters', 'example', A, 'curious', 'Representations of S₃', {
    summary: 'The six permutations of three objects have three irreducible representations, of dimensions 1, 1 and 2 — and 1² + 1² + 2² = 6.',
    tags: ['group theory', 'representations'],
    body: md`
      $S_3$ has 6 elements in 3 conjugacy classes: the identity, 3 transpositions, 2 three-cycles. So it has 3 irreducible representations:

      | | $e$ (×1) | $(12)$ (×3) | $(123)$ (×2) |
      |---|---|---|---|
      | trivial | 1 | 1 | 1 |
      | sign | 1 | −1 | 1 |
      | standard | 2 | 0 | −1 |

      **Checks:**
      - Dimensions: $1^2 + 1^2 + 2^2 = 6 = |S_3|$.
      - Orthogonality: $\frac16\left(1\cdot 2^2 + 3\cdot 0^2 + 2\cdot(-1)^2\right) = 1$ for the standard representation.
      - The 3-dimensional permutation representation has character $(3, 1, 0)$ = trivial + standard.

      Moonshine does the same kind of bookkeeping at vastly larger scale: $196884 = 1 + 196883$ splits a 196,884-dimensional space into Monster irreducibles.
    `,
  }),

  entry('lie-algebras', 'concept', A, 'curious', 'Lie Groups & Lie Algebras', {
    summary: 'Continuous symmetry groups (rotations, Lorentz boosts) and their infinitesimal generators, which multiply by commutators.',
    latex: md`[J_i, J_j] = i\hbar\,\epsilon_{ijk}\,J_k`,
    variables: [
      [md`J_i`, 'Generators of rotations (angular momentum)'],
      [md`\epsilon_{ijk}`, 'Levi-Civita symbol: +1, −1 or 0'],
      [md`[A,B] = AB - BA`, 'Commutator — the Lie bracket'],
    ],
    tags: ['group theory', 'symmetry'],
    body: md`
      A Lie group is a group that is also a smooth space: $SO(3)$, $SU(2)$, the Lorentz group. Near the identity every element is $e^{i\theta^a T_a}$, so the group is captured by its **generators** $T_a$ and their commutators — the **Lie algebra**.

      - $\mathfrak{su}(2)$ above is the algebra of [[Spin & Angular Momentum]].
      - The Lorentz algebra generates [[Lorentz Transformations]].
      - An **infinite-dimensional** Lie algebra, the Witt algebra of [[Conformal Symmetry in Two Dimensions]], acquires a central term and becomes the [[Virasoro Algebra]].
      - Generalizing further: [[Borcherds–Kac–Moody Algebras & the Monster Lie Algebra]].
    `,
  }),

  entry('lattices', 'concept', A, 'curious', 'Lattices & Theta Functions', {
    summary: 'A regular grid of points in n dimensions. Its theta function counts lattice points by length.',
    latex: md`\Lambda = \Big\{\sum_{i=1}^{n} m_i\,\mathbf b_i : m_i \in \mathbb Z\Big\}, \qquad \theta_\Lambda(\tau) = \sum_{\mathbf v\in\Lambda} q^{\,\mathbf v\cdot\mathbf v/2}`,
    variables: [
      [md`\mathbf b_i`, 'Basis vectors'],
      [md`\theta_\Lambda`, 'Theta series: coefficient of qᵏ counts vectors with v·v = 2k'],
    ],
    tags: ['lattices', 'sphere packing'],
    body: md`
      **Vocabulary for the Leech lattice:**
      - **Integral**: all dot products are integers. **Even**: every $\mathbf v\cdot\mathbf v$ is even.
      - **Unimodular**: one lattice point per unit volume (Gram matrix has determinant ±1).
      - **Roots**: vectors with $\mathbf v\cdot\mathbf v = 2$.
      - **Kissing number**: how many shortest vectors — how many spheres touch one sphere.

      Even unimodular lattices exist only in dimensions divisible by 8. In 8D there is exactly one, $E_8$: 240 roots, and $\theta_{E_8} = E_4 = 1 + 240q + 2160q^2 + \cdots$ (Viazovska proved it is the densest 8D packing, 2016). In 24D there are 24 (Niemeier lattices), one of them the [[Leech Lattice]].

      Theta functions of even unimodular lattices are [[Modular Group & Modular Forms|modular forms]] — that is the bridge from lattices to $j$. Physically, a lattice defines a torus $\mathbb R^n/\Lambda$ for [[Compactification on a Torus]].
    `,
    sources: ['Conway & Sloane — Sphere Packings, Lattices and Groups'],
  }),

  entry('tori-elliptic-curves', 'concept', A, 'curious', 'Tori, Lattices in ℂ & Elliptic Curves', {
    summary: 'Glue opposite edges of a parallelogram and you get a torus. Its shape is one complex number τ — defined only up to SL(2,ℤ).',
    latex: md`E_\tau = \mathbb C / (\mathbb Z + \tau\mathbb Z), \qquad E_\tau \cong E_{\tau'} \iff \tau' = \frac{a\tau+b}{c\tau+d},\ \begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL(2,\mathbb Z)`,
    variables: [
      [md`\tau`, 'Shape (modular parameter), in the upper half-plane'],
      [md`\mathbb Z + \tau\mathbb Z`, 'A 2D lattice in the complex plane'],
    ],
    tags: ['modular forms', 'geometry'],
    body: md`
      The same torus can be described by many different parallelograms — any change of basis of the lattice with integer entries and determinant 1. So a function of "the shape of a torus" must be unchanged under $\tau \to \tau + 1$ and $\tau \to -1/\tau$: it must be **modular**. [[The j-invariant]] is the function that tells tori apart.

      **Why string theory cares:** the one-loop worldsheet of a closed string is a torus. The physics can’t depend on how you chose the parallelogram, so string partition functions must be modular invariant — see [[Torus Partition Function & Modular Invariance]].

      Tori are also elliptic curves $y^2 = x^3 + ax + b$ (with complex points), central in number theory.
    `,
  }),

  entry('modular-forms', 'concept', A, 'curious', 'Modular Group & Modular Forms', {
    summary: 'Functions on the upper half-plane that transform simply under SL(2,ℤ). Strange but central: they appear in string theory, number theory and moonshine.',
    latex: md`f\!\left(\frac{a\tau+b}{c\tau+d}\right) = (c\tau+d)^k\,f(\tau), \qquad \begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL(2,\mathbb Z)`,
    variables: [
      [md`\tau`, 'Point in the upper half-plane, Im τ > 0'],
      [md`k`, 'Weight; k = 0 means genuinely invariant (a modular function)'],
    ],
    tags: ['modular forms', 'number theory'],
    body: md`
      The modular group $SL(2,\mathbb Z)$ is generated by $T: \tau \to \tau + 1$ and $S: \tau \to -1/\tau$.

      - Invariance under $T$ means $f$ has a $q$-expansion, $q = e^{2\pi i\tau}$ ([[Fourier Series & Transforms]]).
      - A **modular form** of weight $k$ is holomorphic, obeys the rule above, and is bounded as $\tau \to i\infty$.
      - A **cusp form** vanishes there; the discriminant $\Delta$ is the first one.
      - A **modular function** has weight 0 and may have poles — like $j$.

      The space of weight-$k$ forms is finite-dimensional; weight 4 is spanned by $E_4$ alone. Rigid constraints like that are why coincidences such as $\theta_{E_8} = E_4$ are forced. Building blocks: [[Eisenstein Series, η and the Discriminant]]. Deeper: [[Genus-Zero Groups & Hauptmoduln]].
    `,
    sources: ['Diamond & Shurman — A First Course in Modular Forms', 'Zagier — Elliptic Modular Forms and Their Applications'],
  }),

  entry('eisenstein-discriminant', 'equation', A, 'curious', 'Eisenstein Series, η and the Discriminant', {
    summary: 'The basic modular forms E₄, E₆, Δ = η²⁴ — and j is built from them.',
    latex: md`E_4 = 1 + 240\sum_{n\ge1}\sigma_3(n)q^n,\quad E_6 = 1 - 504\sum_{n\ge1}\sigma_5(n)q^n,\quad \Delta = \eta^{24} = q\prod_{n\ge1}(1-q^n)^{24} = \frac{E_4^3 - E_6^2}{1728},\quad j = \frac{E_4^3}{\Delta}`,
    variables: [
      [md`\sigma_k(n)`, 'Sum of the k-th powers of the divisors of n'],
      [md`\eta(\tau) = q^{1/24}\prod_{n\ge 1}(1-q^n)`, 'Dedekind eta function'],
      [md`\Delta`, 'Modular discriminant, weight 12, the first cusp form'],
    ],
    tags: ['modular forms', '24 dimensions', 'moonshine'],
    body: md`
      - $E_4 = 1 + 240q + 2160q^2 + 6720q^3 + \cdots$ (weight 4) — also the theta function of the $E_8$ lattice.
      - $\Delta = q - 24q^2 + 252q^3 - 1472q^4 + \cdots$ (weight 12).
      - $j = E_4^3/\Delta$ has weight $12 - 12 = 0$: a modular function.

      **The 24 in $\eta^{24}$** is the same 24 as the transverse dimensions of the bosonic string: $1/\eta^{24}$ counts the states of 24 oscillators, and the $q^{1/24}$ per boson is its zero-point energy $-\tfrac{1}{24}$. See [[Why does 24 keep showing up?]]

      Worked example: [[Computing 744 and 196884 from E₄ and Δ]].
    `,
  }),

  entry('example-j-from-e4', 'example', A, 'curious', 'Computing 744 and 196884 from E₄ and Δ', {
    summary: 'Three lines of series multiplication produce the famous coefficients of the j-function.',
    tags: ['modular forms', 'moonshine'],
    body: md`
      **Step 1 — cube $E_4$:**
      $$E_4^3 = (1 + 240q + 2160q^2 + \cdots)^3 = 1 + 720q + 179280q^2 + \cdots$$
      ($179280 = 3\cdot 2160 + 3\cdot 240^2$.)

      **Step 2 — invert $\Delta$:**
      $$\frac{1}{\Delta} = \frac{1}{q}\,(1 - 24q + 252q^2 - \cdots)^{-1} = \frac1q\,(1 + 24q + 324q^2 + \cdots)$$
      ($324 = 24^2 - 252$.)

      **Step 3 — multiply:**
      $$j = \frac{E_4^3}{\Delta} = \frac1q\Big(1 + (720 + 24)\,q + (179280 + 720\cdot 24 + 324)\,q^2 + \cdots\Big) = q^{-1} + 744 + 196884\,q + \cdots$$

      $179280 + 17280 + 324 = 196884$ — one more than the dimension of the Monster’s smallest representation ([[McKay's observation: 196884 = 1 + 196883]]). Nothing in this calculation mentions the Monster, which is what made moonshine so startling.
    `,
  }),

  entry('hauptmodul', 'concept', A, 'curious', 'Genus-Zero Groups & Hauptmoduln', {
    summary: 'When a modular group’s quotient surface is a sphere, a single function (a Hauptmodul) generates all its modular functions. Conway–Norton predicted every Monster element gives one.',
    latex: md`\Gamma\backslash\mathbb H^* \cong \mathbb{P}^1 \;\Longrightarrow\; \mathbb C(\Gamma\backslash\mathbb H^*) = \mathbb C(t_\Gamma)`,
    variables: [
      [md`\Gamma`, 'A subgroup of SL(2,ℝ) commensurable with SL(2,ℤ)'],
      [md`\mathbb H^*`, 'Upper half-plane plus cusps'],
      [md`t_\Gamma`, 'Hauptmodul: a single generator of the modular functions'],
    ],
    tags: ['modular forms', 'moonshine'],
    body: md`
      Fold the upper half-plane by a group $\Gamma$ and you get a surface. If that surface has genus zero (a sphere), all $\Gamma$-invariant functions are rational functions of one special function $t_\Gamma$, normalized as $q^{-1} + 0 + O(q)$.

      For $SL(2,\mathbb Z)$ the Hauptmodul is $J = j - 744$.

      **The Conway–Norton conjecture:** for each element $g$ of the [[Monster Group]], the series $T_g(\tau) = \sum_n \operatorname{tr}(g\mid V_n)\,q^{n-1}$ is the Hauptmodul of some genus-zero group. Genus-zero groups are rare, so this is a very strong prediction. The Monster’s 194 conjugacy classes give 171 distinct functions. Proved by Borcherds — see [[Monstrous Moonshine]].
    `,
  }),

  entry('tensors', 'concept', A, 'curious', 'Tensors & Index Notation', {
    summary: 'Objects that transform in a definite way when you change coordinates. Relativity is written in them.',
    latex: md`A'^{\mu} = \Lambda^{\mu}{}_{\nu}\,A^{\nu}, \qquad v_\mu = g_{\mu\nu}\,v^\nu, \qquad \mathbf u\cdot\mathbf v = g_{\mu\nu}\,u^\mu v^\nu`,
    variables: [
      [md`\Lambda^\mu{}_\nu`, 'Coordinate transformation matrix'],
      [md`g_{\mu\nu}`, 'Metric tensor: raises and lowers indices, defines dot products'],
      [md`\mu,\nu`, 'Indices running over 0, 1, 2, 3 (t, x, y, z)'],
    ],
    tags: ['geometry', 'general relativity'],
    body: md`
      **Einstein summation:** a repeated upper and lower index is summed over, so $g_{\mu\nu}u^\mu v^\nu$ means a double sum.

      - A **vector** has one upper index, a **covector** one lower index, the **metric** two lower indices.
      - An equation between tensors that holds in one coordinate system holds in all — which is why physical laws are written this way.

      Needed for [[Four-Momentum & E = mc²]], the [[Stress–Energy Tensor]] and the [[Einstein Field Equations]].
    `,
  }),

  entry('manifolds', 'concept', A, 'curious', 'Manifolds & Tangent Spaces', {
    summary: 'Spaces that look flat up close but can be curved overall, like the surface of the Earth — or spacetime.',
    tags: ['geometry'],
    body: md`
      A manifold is covered by coordinate patches that overlap smoothly. At each point there is a **tangent space** — the space of velocities of curves through that point — where vectors live.

      - The sphere $S^2$ needs at least two patches; no single flat map covers it without distortion.
      - Spacetime in general relativity is a 4-dimensional manifold with a metric.
      - The string worldsheet is a 2D manifold; the torus is the one-loop case ([[Tori, Lattices in ℂ & Elliptic Curves]]).

      Next step: [[Metric, Connection & Curvature]].
    `,
    sources: ['Sean Carroll — Spacetime and Geometry, chapter 2'],
  }),

  entry('riemannian-geometry', 'equation', A, 'curious', 'Metric, Connection & Curvature', {
    summary: 'How to measure distances, compare vectors at different points, and detect curvature from inside a space.',
    latex: md`\Gamma^{\lambda}_{\mu\nu} = \tfrac12 g^{\lambda\sigma}\left(\partial_\mu g_{\sigma\nu} + \partial_\nu g_{\sigma\mu} - \partial_\sigma g_{\mu\nu}\right), \qquad R^{\rho}{}_{\sigma\mu\nu} = \partial_\mu\Gamma^\rho_{\nu\sigma} - \partial_\nu\Gamma^\rho_{\mu\sigma} + \Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}`,
    variables: [
      [md`g_{\mu\nu}`, 'Metric: ds² = g_{μν} dx^μ dx^ν'],
      [md`\Gamma^\lambda_{\mu\nu}`, 'Christoffel symbols (connection) — how basis vectors change from point to point'],
      [md`R^\rho{}_{\sigma\mu\nu}`, 'Riemann curvature tensor'],
      [md`R_{\mu\nu} = R^\lambda{}_{\mu\lambda\nu},\ R = g^{\mu\nu}R_{\mu\nu}`, 'Ricci tensor and Ricci scalar'],
    ],
    tags: ['geometry', 'general relativity'],
    body: md`
      **Curvature test:** carry a vector around a small loop keeping it "as parallel as possible". If it comes back rotated, the space is curved; the Riemann tensor measures how much.

      **Example:** a sphere of radius $r$ has Gaussian curvature $1/r^2$ and Ricci scalar $R = 2/r^2$. A triangle drawn on it has angles adding to more than $180°$.

      Needed for: the [[Geodesic Equation]] (free fall), and the curvature side $G_{\mu\nu} = R_{\mu\nu} - \tfrac12 R\,g_{\mu\nu}$ of the [[Einstein Field Equations]].
    `,
    sources: ['Sean Carroll — Spacetime and Geometry, chapter 3'],
  }),
];
