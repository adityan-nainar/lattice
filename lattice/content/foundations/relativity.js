import { AREA, entry, md } from '../helpers.js';

const A = AREA.REL;

export const RELATIVITY = [
  entry('principle-of-relativity', 'theory', A, 'curious', 'Principle of Relativity & Einstein’s Postulates', {
    summary: 'The laws of physics are the same in every inertial frame — and so is the speed of light. Everything in special relativity follows from these two statements.',
    tags: ['special relativity', 'foundations'],
    body: md`
      **Galileo:** in a smoothly moving ship below deck, no experiment tells you you’re moving.

      **Einstein (1905):**
      1. The laws of physics take the same form in all inertial frames.
      2. The speed of light in vacuum is the same for all inertial observers, whatever the motion of the source.

      Together they contradict Galilean velocity addition, so time and space themselves must transform differently: [[Lorentz Transformations]].

      The second postulate resolves the puzzle left by [[Maxwell’s Equations & Light]], whose wave speed $c$ didn’t refer to any frame. Gravity’s version of the idea is the [[Equivalence Principle]].
    `,
    sources: ['Taylor & Wheeler — Spacetime Physics'],
  }),

  entry('lorentz-transformations', 'equation', A, 'curious', 'Lorentz Transformations', {
    summary: 'How time and space coordinates change between observers moving at relative speed v. They mix space with time.',
    latex: md`t' = \gamma\left(t - \frac{v x}{c^2}\right), \quad x' = \gamma\,(x - v t), \quad \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}, \qquad u' = \frac{u - v}{1 - uv/c^2}`,
    variables: [
      [md`(t, x),\ (t', x')`, 'Coordinates of the same event in the two frames'],
      [md`v`, 'Relative velocity along x'],
      [md`u,\ u'`, 'Velocity of an object measured in each frame'],
    ],
    tags: ['special relativity'],
    body: md`
      **Three effects fall out:**
      - **Relativity of simultaneity:** events at the same $t$ but different $x$ have different $t'$ — the $vx/c^2$ term.
      - **Time dilation:** a clock at rest in the primed frame ticks slower by $\gamma$ — [[Special-Relativistic Time Dilation]].
      - **Length contraction:** a moving rod is shorter by $\gamma$ along its motion. (This is the muon’s view in [[Cosmic-ray muons reaching the ground]].)

      They leave the interval $c^2t^2 - x^2$ unchanged — the geometry of [[Minkowski Spacetime, Light Cones & Proper Time]]. They form a group, the Lorentz group ([[Lie Groups & Lie Algebras]]). For $v \ll c$ they reduce to Galileo’s $x' = x - vt$, $t' = t$.

      Example: [[Adding 0.9c to 0.9c]].
    `,
  }),

  entry('example-velocity-addition', 'example', A, 'curious', 'Adding 0.9c to 0.9c', {
    summary: 'A rocket at 0.9c fires a probe forward at 0.9c. Seen from Earth the probe moves at 0.9945c — not 1.8c.',
    tags: ['special relativity'],
    body: md`
      Velocity addition from the [[Lorentz Transformations]] (in the form $w = \frac{u + v}{1 + uv/c^2}$):

      $$w = \frac{0.9c + 0.9c}{1 + 0.9\times0.9} = \frac{1.8}{1.81}\,c \approx 0.9945\,c$$

      **Checks:**
      - Small speeds: $uv/c^2 \approx 0$, so $w \approx u + v$ as in everyday life.
      - Light: $u = c$ gives $w = \frac{c + v}{1 + v/c} = c$ for any $v$ — the invariance of the [[Speed of Light]].
    `,
  }),

  entry('minkowski-spacetime', 'concept', A, 'curious', 'Minkowski Spacetime, Light Cones & Proper Time', {
    summary: 'Space and time as one 4D geometry. Distances are replaced by the interval, and every object ages by its own proper time along its path.',
    latex: md`ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2, \qquad d\tau = \sqrt{-ds^2}/c = dt\,\sqrt{1 - v^2/c^2}`,
    variables: [
      [md`ds^2`, 'Spacetime interval (invariant)'],
      [md`d\tau`, 'Proper time: what a clock carried along the path measures'],
    ],
    tags: ['special relativity', 'geometry'],
    body: md`
      Minkowski (1908) recast Einstein’s theory as geometry.

      - **Light cone:** $ds^2 = 0$. Events inside it (timelike, $ds^2 < 0$) can be causally connected; outside (spacelike) they can’t.
      - **Worldline:** an object’s path through spacetime. Its length in proper time is its age.
      - **Twin paradox as geometry:** in Minkowski space the straight worldline has the *longest* proper time. The travelling twin takes a bent path and ages less.

      **Proper time is the thread through your relativity topics:** clocks in orbit ([[GPS Clock Corrections]]), clocks at different heights ([[Gravitational Time Dilation]]), and a single clock in superposition ([[Clocks, Superposition and Gravity]]). In curved spacetime the flat metric is replaced by a general $g_{\mu\nu}$ ([[Metric, Connection & Curvature]]).
    `,
  }),

  entry('four-momentum', 'equation', A, 'curious', 'Four-Momentum & E = mc²', {
    summary: 'Energy and momentum combine into one four-vector whose length is the rest mass.',
    latex: md`p^\mu = \left(\frac{E}{c}, \mathbf p\right), \qquad E^2 = (pc)^2 + (mc^2)^2, \qquad E = \gamma mc^2, \quad \mathbf p = \gamma m\mathbf v`,
    variables: [
      [md`m`, 'Rest mass (invariant)'],
      [md`E`, 'Total energy'],
      [md`\mathbf p`, 'Relativistic momentum'],
    ],
    tags: ['special relativity'],
    body: md`
      - At rest: $E = mc^2$. Massless particles: $E = pc$, and they must move at exactly $c$.
      - **Muon example:** at $v = 0.998c$, $\gamma \approx 15.8$, so $E \approx 15.8\times 105.7\ \text{MeV} \approx 1.67$ GeV ([[Cosmic-ray muons reaching the ground]]).
      - Conservation of four-momentum lets energy become new particles — why [[Quantum Field Theory]] needs variable particle number.
      - String theory’s mass formula $\alpha' M^2 = 4(N-1)$ is a statement about $-p^\mu p_\mu = M^2c^2$ for the string’s centre of mass ([[Bosonic String]]).
      - Energy and momentum densities of matter assemble into the [[Stress–Energy Tensor]].
    `,
  }),

  entry('equivalence-principle', 'theory', A, 'curious', 'Equivalence Principle', {
    summary: 'Locally, gravity is indistinguishable from acceleration. A freely falling lab feels no gravity at all.',
    tags: ['general relativity', 'foundations'],
    body: md`
      - **Weak form:** all bodies fall with the same acceleration — inertial mass equals gravitational mass. Tested to about 1 part in $10^{15}$ (MICROSCOPE satellite, 2022).
      - **Einstein’s form:** in a small freely falling frame, the laws of special relativity hold. Gravity is not a force but the curvature that makes free-fall frames at different places disagree.

      **Consequences:**
      - A clock at the top of an accelerating rocket runs fast relative to one at the bottom, so clocks higher in a gravitational field run fast: [[Gravitational Time Dilation]], [[Gravitational Redshift]].
      - Light bends in gravity.
      - Free fall is motion along straight lines of curved spacetime: [[Geodesic Equation]].

      Einstein had the idea in 1907 and later called it the happiest thought of his life. It is the physical input behind the [[Einstein Field Equations]].
    `,
  }),

  entry('geodesics', 'equation', A, 'curious', 'Geodesic Equation', {
    summary: 'Free particles follow the straightest possible paths through curved spacetime. Orbits are geodesics.',
    latex: md`\frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\,\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0`,
    variables: [
      [md`x^\mu(\tau)`, 'Worldline, parametrized by proper time'],
      [md`\Gamma^\mu_{\alpha\beta}`, 'Christoffel symbols of the metric'],
    ],
    tags: ['general relativity', 'geometry'],
    body: md`
      - In flat spacetime $\Gamma = 0$ and this is just $\ddot x^\mu = 0$: straight lines, Newton’s first law.
      - It is what you get by extremizing proper time $\int d\tau$ ([[Lagrangian Mechanics & Least Action]]).
      - In the weak-field limit $\Gamma^i_{00} \approx \partial_i\Phi/c^2$ and it becomes $\ddot{\mathbf x} = -\nabla\Phi$ — Newtonian gravity ([[Newtonian Limit of General Relativity]]).

      Geodesics in the [[Schwarzschild Metric]] give planetary orbits (including Mercury’s perihelion shift), light bending, and the innermost stable orbit at $3r_s$ around [[Black Holes & Event Horizons|black holes]].
    `,
  }),

  entry('stress-energy-tensor', 'equation', A, 'curious', 'Stress–Energy Tensor', {
    summary: 'All the energy, momentum, pressure and stress at a point in spacetime, packaged in one tensor. It is the source of gravity.',
    latex: md`T^{\mu\nu} = \left(\rho + \frac{p}{c^2}\right)u^\mu u^\nu + p\,g^{\mu\nu}, \qquad \nabla_\mu T^{\mu\nu} = 0`,
    variables: [
      [md`\rho`, 'Mass density in the fluid’s rest frame'],
      [md`p`, 'Pressure'],
      [md`u^\mu`, 'Four-velocity of the fluid'],
      [md`T^{00}`, 'Energy density; T^{0i} momentum density; T^{ij} stress'],
    ],
    tags: ['general relativity'],
    body: md`
      The formula above is for a **perfect fluid** (signature $-+++$), good for stars and cosmology.

      - In GR, pressure gravitates as well as mass-energy.
      - $\nabla_\mu T^{\mu\nu} = 0$ is local energy–momentum conservation ([[Noether’s Theorem]] for spacetime translations).
      - The right-hand side of the [[Einstein Field Equations]].

      In 2D conformal field theory the analogous object $T(z)$ generates conformal transformations, and its modes are the $L_n$ of the [[Virasoro Algebra]].
    `,
  }),

  entry('newtonian-limit', 'equation', A, 'curious', 'Newtonian Limit of General Relativity', {
    summary: 'For weak gravity and slow motion, Einstein’s equations reduce to Newton’s — with the potential Φ sitting in the time part of the metric.',
    latex: md`g_{00} \approx -\left(1 + \frac{2\Phi}{c^2}\right), \qquad \nabla^2\Phi = 4\pi G\rho`,
    variables: [
      [md`g_{00}`, 'Time–time component of the metric'],
      [md`\Phi`, 'Newtonian gravitational potential'],
    ],
    tags: ['general relativity', 'gravity'],
    body: md`
      **Where the famous formula comes from:** for a clock at rest $ds^2 = g_{00}\,c^2dt^2 = -c^2d\tau^2$, so
      $$d\tau = \sqrt{1 + 2\Phi/c^2}\;dt \approx \left(1 + \frac{\Phi}{c^2}\right)dt$$
      — the weak-field [[Gravitational Time Dilation]].

      - The $00$ component of the [[Einstein Field Equations]] reduces to Poisson’s equation $\nabla^2\Phi = 4\pi G\rho$.
      - The [[Geodesic Equation]] reduces to $\ddot{\mathbf x} = -\nabla\Phi$.

      Near Earth $\Phi/c^2 \approx -7\times10^{-10}$ — tiny, which is why Newton works so well and why [[Atomic Clocks]] had to get so good before they could see it directly.
    `,
  }),

  entry('gravitational-redshift', 'equation', A, 'curious', 'Gravitational Redshift', {
    summary: 'Light climbing out of a gravitational well arrives at lower frequency. The same effect as clocks running slower lower down.',
    latex: md`\frac{f_\infty}{f_{\text{emit}}} = \sqrt{1 - \frac{r_s}{r}}, \qquad \frac{\Delta f}{f} \approx -\frac{g h}{c^2}`,
    variables: [
      [md`f_{\text{emit}}`, 'Frequency at the emitter, at radius r'],
      [md`f_\infty`, 'Frequency received far away'],
      [md`h`, 'Height climbed (weak field)'],
    ],
    tags: ['general relativity'],
    body: md`
      Think of the photon’s wave crests as clock ticks: the emitter’s clock runs slow, so fewer ticks per second arrive upstairs. Redshift and [[Gravitational Time Dilation]] are one phenomenon seen two ways.

      - **Lab:** [[Pound–Rebka Experiment]], $\Delta f/f \approx 2.5\times10^{-15}$ over 22.5 m.
      - **White dwarfs:** spectral lines shifted by about $10^{-4}$.
      - **Near a black hole horizon** the redshift diverges ([[Black Holes & Event Horizons]]).
    `,
  }),

  entry('black-holes', 'concept', A, 'curious', 'Black Holes & Event Horizons', {
    summary: 'Regions where spacetime is curved so strongly that nothing, not even light, can get back out.',
    latex: md`r_s = \frac{2GM}{c^2}, \qquad r_{\text{photon sphere}} = \tfrac32 r_s, \qquad r_{\text{ISCO}} = 3r_s`,
    variables: [
      [md`r_s`, 'Event horizon radius of a non-rotating black hole'],
      [md`r_{\text{ISCO}}`, 'Innermost stable circular orbit'],
    ],
    tags: ['general relativity', 'black holes'],
    body: md`
      In the [[Schwarzschild Metric]] the surface $r = r_s$ is an **event horizon**: inside, every future-directed path leads inward. A distant observer sees infalling clocks slow and light redshift without limit.

      - **Sagittarius A\***, at our galaxy’s centre, has $M \approx 4.3$ million solar masses, so $r_s \approx 1.3\times10^{10}$ m ≈ 0.085 AU. Imaged by the Event Horizon Telescope in 2022 (M87\* in 2019).
      - LIGO detected gravitational waves from two merging black holes in 2015.
      - Hawking radiation and black hole entropy $S = k_B A c^3/(4G\hbar)$ are major clues to quantum gravity ([[Why don’t quantum mechanics and general relativity fit together?]]).
      - In 3D anti-de Sitter gravity, black holes (BTZ) are what Witten’s Monster proposal had to count ([[Anti-de Sitter Space & AdS/CFT]]).
    `,
  }),

  entry('atomic-clocks', 'concept', A, 'curious', 'Atomic Clocks', {
    summary: 'Clocks that count the oscillations of light absorbed by an atomic transition. The best now keep time to about 1 part in 10¹⁸.',
    latex: md`\Delta E = h f, \qquad f_{\text{Cs-133}} = 9\,192\,631\,770\ \text{Hz (exact, defines the second)}`,
    variables: [
      [md`\Delta E`, 'Energy gap between two atomic levels'],
      [md`f`, 'Frequency of the photon that drives the transition'],
    ],
    tags: ['atomic clocks', 'experiments', 'bridge'],
    body: md`
      A laser or microwave source is locked to the frequency where atoms respond most strongly ([[Wave–Particle Duality & de Broglie Wavelength|E = hf]]). Counting its cycles is counting time.

      - **Caesium microwave clocks** define the SI second: 9,192,631,770 cycles.
      - **Optical clocks** (strontium, ytterbium, aluminium ions) tick about 50,000 times faster, so they divide time more finely. Fractional uncertainty is around $10^{-18}$; they use cold atoms from [[Laser Cooling & Atom Traps]].
      - At $10^{-18}$, raising a clock 1 cm changes its rate measurably ($gh/c^2 \approx 1.1\times10^{-18}$) — clocks are now gravity sensors.

      Used in: [[GPS Clock Corrections]], [[Clocks, Superposition and Gravity]].
    `,
  }),

  entry('quantum-gravity-problem', 'question', A, 'curious', 'Why don’t quantum mechanics and general relativity fit together?', {
    summary: 'Both theories pass every test in their own domain, but combining them runs into infinities, the meaning of time, and what curvature a superposition produces.',
    latex: md`\ell_P = \sqrt{\frac{\hbar G}{c^3}} \approx 1.6\times10^{-35}\ \text{m}`,
    variables: [[md`\ell_P`, 'Planck length — where quantum gravity effects are expected to be large']],
    tags: ['quantum gravity', 'open question'],
    body: md`
      **The main problems:**
      1. **Non-renormalizable.** Treat the metric as a quantum field and new infinities appear at every order that can’t all be absorbed ([[Regularization & Renormalization]]); confirmed at two loops (Goroff–Sagnotti, 1986).
      2. **Time.** In quantum mechanics time is an external parameter; in GR it is part of the dynamical geometry.
      3. **Superposed sources.** What spacetime surrounds a mass in a superposition of two places? GR needs a definite $T_{\mu\nu}$ ([[Einstein Field Equations]] is *in tension with* [[Superposition]]).
      4. **Black holes** have an entropy that suggests hidden microscopic states ([[Black Holes & Event Horizons]]).

      **Approaches:** string theory ([[Bosonic String]], [[Superstring Theory]]), holography ([[Anti-de Sitter Space & AdS/CFT]]), loop quantum gravity, and experiments probing gravity with quantum systems ([[Clocks, Superposition and Gravity]]).
    `,
  }),
];
