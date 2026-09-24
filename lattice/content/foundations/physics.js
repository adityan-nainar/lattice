import { AREA, entry, md } from '../helpers.js';

const A = AREA.PHYSICS;

export const PHYSICS_AREA = {
  id: A,
  name: 'Classical & Statistical Physics',
  color: '#7cc56f',
  description: 'Mechanics, gravity, waves, light, heat and fluids — the classical physics that quantum theory and relativity grow out of.',
};

export const PHYSICS = [
  entry('newtonian-mechanics', 'concept', A, 'curious', 'Newtonian Mechanics & Conservation Laws', {
    summary: 'Forces change momentum; energy and momentum are conserved. The starting point for everything else.',
    latex: md`\mathbf F = \frac{d\mathbf p}{dt}, \qquad E = \tfrac12 m v^2 + V, \qquad \mathbf p = m\mathbf v`,
    variables: [
      [md`\mathbf F`, 'Net force'],
      [md`\mathbf p`, 'Momentum'],
      [md`V`, 'Potential energy'],
    ],
    tags: ['basics', 'mechanics'],
    body: md`
      - **Momentum** is conserved when no external force acts; **energy** is conserved when forces come from a potential.
      - Collisions are solved with those two conservation laws alone — exactly the argument behind the [[Landau Criterion]].
      - **Inertial frames** (no fictitious forces) are where Newton’s laws hold; the question of which frames are equivalent leads to the [[Principle of Relativity & Einstein’s Postulates]].
    `,
    sources: ['Kleppner & Kolenkow — An Introduction to Mechanics'],
  }),

  entry('newtonian-gravity', 'equation', A, 'curious', 'Newtonian Gravity', {
    summary: 'Every mass attracts every other with an inverse-square force. Accurate whenever gravity is weak and speeds are low.',
    latex: md`F = \frac{GMm}{r^2}, \qquad \Phi = -\frac{GM}{r}, \qquad g = \frac{GM}{R^2}, \qquad v_{\text{orbit}} = \sqrt{\frac{GM}{r}}, \qquad v_{\text{esc}} = \sqrt{\frac{2GM}{r}}`,
    variables: [
      [md`G`, 'Gravitational constant, 6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻²'],
      [md`\Phi`, 'Gravitational potential (energy per unit mass)'],
      [md`g`, 'Surface gravity, 9.81 m/s² on Earth'],
    ],
    tags: ['gravity', 'mechanics'],
    body: md`
      - The **potential** $\Phi$ is what enters the weak-field [[Gravitational Time Dilation]]: clocks tick at rate $1 + \Phi/c^2$.
      - The **circular orbit speed** gives the GPS satellite speed of 3.87 km/s in [[GPS Clock Corrections]].
      - Set the **escape velocity** equal to $c$ and you get $r = 2GM/c^2$ — Michell and Laplace’s 18th-century "dark star", the same radius as in the [[Schwarzschild Metric]].

      General relativity reduces to this in the [[Newtonian Limit of General Relativity]].
    `,
  }),

  entry('waves-normal-modes', 'concept', A, 'curious', 'Waves, Interference & Normal Modes', {
    summary: 'Disturbances that travel, add up and interfere. A string fixed at both ends vibrates in a ladder of harmonics.',
    latex: md`\frac{\partial^2 y}{\partial t^2} = v^2\,\frac{\partial^2 y}{\partial x^2}, \qquad v = \sqrt{\frac{T}{\mu}}, \qquad f_n = \frac{n\,v}{2L}`,
    variables: [
      [md`y(x,t)`, 'Displacement of the string'],
      [md`T,\ \mu`, 'Tension and mass per length'],
      [md`f_n`, 'Frequency of the n-th normal mode (n = 1, 2, 3, …)'],
    ],
    tags: ['waves', 'basics'],
    body: md`
      - **Superposition of waves:** the wave equation is linear, so waves add. Where crests meet crests they reinforce; where crests meet troughs they cancel. That is interference — the classical ancestor of quantum [[Superposition]].
      - **Normal modes:** a string of length $L$ fixed at both ends only supports whole numbers of half-wavelengths. Any motion is a sum of these modes ([[Fourier Series & Transforms]]).
      - A **relativistic string** is the same idea with tension $1/(2\pi\alpha')$, where each mode becomes a particle: [[Relativistic String & Nambu–Goto Action]].
    `,
  }),

  entry('dispersion-relations', 'equation', A, 'curious', 'Dispersion Relations, Phase & Group Velocity', {
    summary: 'How a wave’s frequency depends on its wavelength. It decides how fast wave crests and wave packets move.',
    latex: md`\omega = \omega(k), \qquad v_{\text{phase}} = \frac{\omega}{k}, \qquad v_{\text{group}} = \frac{d\omega}{dk}`,
    variables: [
      [md`k = 2\pi/\lambda`, 'Wavenumber'],
      [md`\omega`, 'Angular frequency'],
    ],
    tags: ['waves', 'excitations'],
    body: md`
      - **Sound, light in vacuum:** $\omega = ck$ — all wavelengths move together (no dispersion).
      - **Deep-water waves:** $\omega = \sqrt{gk}$, so a wave group travels at half the speed of its crests.
      - **Quantum particles:** with $E = \hbar\omega$ and $p = \hbar k$ a dispersion relation is an energy–momentum relation $\varepsilon(p)$. A free particle has $\varepsilon = p^2/2m$.

      The [[Landau Criterion]] asks for the minimum of $\varepsilon(p)/p$ — a phase velocity. The [[Bogoliubov Dispersion]] and the phonon–roton curve of helium are dispersion relations for [[Quasiparticles: Phonons & Rotons]].
    `,
  }),

  entry('lagrangian-mechanics', 'equation', A, 'curious', 'Lagrangian Mechanics & Least Action', {
    summary: 'Nature picks the path that makes the action stationary. The same principle describes particles, fields, strings and spacetime.',
    latex: md`S = \int L(q, \dot q, t)\,dt, \qquad \frac{d}{dt}\frac{\partial L}{\partial \dot q} - \frac{\partial L}{\partial q} = 0`,
    variables: [
      [md`L = T - V`, 'Lagrangian: kinetic minus potential energy'],
      [md`S`, 'Action'],
      [md`q`, 'Generalized coordinates'],
    ],
    tags: ['mechanics', 'action'],
    body: md`
      Why this reformulation matters:
      - Symmetries of $L$ give conservation laws directly ([[Noether’s Theorem]]).
      - A free relativistic particle has action $-mc^2\int d\tau$: it maximizes its own **proper time**. The same statement in curved spacetime gives the [[Geodesic Equation]].
      - A relativistic string’s action is its worldsheet **area** ([[Relativistic String & Nambu–Goto Action]]).
      - Field theories (including [[Quantum Field Theory]]) start from a Lagrangian density.
    `,
    sources: ['Leonard Susskind & George Hrabovsky — The Theoretical Minimum: Classical Mechanics'],
  }),

  entry('hamiltonian-mechanics', 'equation', A, 'curious', 'Hamiltonian Mechanics & Poisson Brackets', {
    summary: 'Mechanics in terms of energy, positions and momenta. Replace Poisson brackets with commutators and you get quantum mechanics.',
    latex: md`\dot q = \frac{\partial H}{\partial p}, \quad \dot p = -\frac{\partial H}{\partial q}, \qquad \{q, p\} = 1 \;\longrightarrow\; [\hat q, \hat p] = i\hbar`,
    variables: [
      [md`H(q,p)`, 'Hamiltonian — usually the total energy'],
      [md`\{\cdot,\cdot\}`, 'Poisson bracket'],
    ],
    tags: ['mechanics', 'quantization'],
    body: md`
      The Hamiltonian $H = p\dot q - L$ generates time evolution. **Canonical quantization** (Dirac) keeps the same structure but turns $q, p$ into operators with $[\hat q, \hat p] = i\hbar$.

      - $H$ becomes the operator in the [[Schrödinger Equation]].
      - $H = \frac{p^2}{2m} + \frac12 m\omega^2 q^2$ becomes the [[Quantum Harmonic Oscillator]].
      - Energies $E_i$ of $H$ enter the [[Boltzmann Distribution & Partition Function]].
    `,
  }),

  entry('noether-theorem', 'theory', A, 'curious', 'Noether’s Theorem', {
    summary: 'Every continuous symmetry comes with a conserved quantity. Time symmetry gives energy, space symmetry gives momentum, phase symmetry gives particle number.',
    latex: md`\delta L = 0 \text{ under a continuous symmetry} \;\Longrightarrow\; \partial_\mu j^\mu = 0, \qquad Q = \int j^0\,d^3x \text{ is conserved}`,
    variables: [
      [md`j^\mu`, 'Conserved current'],
      [md`Q`, 'Conserved charge'],
    ],
    tags: ['symmetry', 'conservation'],
    body: md`
      Emmy Noether, 1918.

      | Symmetry | Conserved |
      |---|---|
      | time translation | energy |
      | space translation | momentum |
      | rotation | angular momentum |
      | phase $\psi \to e^{i\alpha}\psi$ | particle number / charge |

      **Where it shows up:**
      - In 2D conformal field theory the symmetry is infinite, so there are infinitely many conserved charges — the modes $L_n$ of the [[Virasoro Algebra]].
      - When quantization breaks a classical symmetry, that is a [[Quantum Anomalies & the Central Charge|quantum anomaly]].
      - A condensate that picks a definite phase breaks the phase symmetry: [[Spontaneous Symmetry Breaking & Goldstone Modes]].
    `,
  }),

  entry('maxwell-light', 'equation', A, 'curious', 'Maxwell’s Equations & Light', {
    summary: 'Electricity and magnetism unified. Their wave solutions travel at c = 1/√(μ₀ε₀) — light.',
    latex: md`\nabla\cdot\mathbf E = \frac{\rho}{\varepsilon_0},\quad \nabla\cdot\mathbf B = 0,\quad \nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t},\quad \nabla\times\mathbf B = \mu_0\mathbf J + \mu_0\varepsilon_0\frac{\partial\mathbf E}{\partial t}, \qquad c = \frac{1}{\sqrt{\mu_0\varepsilon_0}}`,
    variables: [
      [md`\mathbf E,\ \mathbf B`, 'Electric and magnetic fields'],
      [md`\varepsilon_0,\ \mu_0`, 'Vacuum permittivity and permeability'],
      [md`\rho,\ \mathbf J`, 'Charge and current density'],
    ],
    tags: ['electromagnetism', 'light'],
    body: md`
      In empty space the equations combine into a wave equation with speed $1/\sqrt{\mu_0\varepsilon_0} = 299\,792\,458$ m/s. Maxwell (1865) recognized this as the speed of light.

      **The puzzle this created:** the equations contain a speed but don’t say relative to what. Einstein’s answer — it is the same for every inertial observer — is the [[Speed of Light]] postulate and the start of special relativity.

      Quantizing the field gives photons; photon momentum $p = h/\lambda$ is what slows atoms in [[Laser Cooling & Atom Traps]].
    `,
  }),

  entry('thermodynamics', 'concept', A, 'curious', 'Temperature, Entropy & Chemical Potential', {
    summary: 'The laws of heat. Entropy counts microscopic arrangements; chemical potential is the cost of adding one particle.',
    latex: md`dU = T\,dS - p\,dV + \mu\,dN, \qquad S = k_B \ln \Omega`,
    variables: [
      [md`U`, 'Internal energy'],
      [md`S`, 'Entropy; Ω is the number of microstates'],
      [md`\mu`, 'Chemical potential'],
      [md`k_B`, 'Boltzmann constant, 1.380649 × 10⁻²³ J/K'],
    ],
    tags: ['thermodynamics', 'basics'],
    body: md`
      - **Temperature** measures how much entropy grows when you add energy: $1/T = \partial S/\partial U$.
      - **Absolute zero** can be approached but never reached (third law). Condensates reach tens of nanokelvin.
      - The **chemical potential** $\mu$ appears in the [[Bose–Einstein Distribution]]; condensation happens when it reaches the ground-state energy.
      - The superfluid component of helium carries **zero entropy** in the two-fluid model of [[Superfluidity]].

      Microscopic foundation: [[Boltzmann Distribution & Partition Function]].
    `,
  }),

  entry('statistical-mechanics', 'equation', A, 'curious', 'Boltzmann Distribution & Partition Function', {
    summary: 'At temperature T, a state of energy E is occupied with probability ∝ e^{−E/k_BT}. The partition function Z packages everything.',
    latex: md`P_i = \frac{e^{-E_i/k_BT}}{Z}, \qquad Z = \sum_i e^{-E_i/k_BT}, \qquad \mathcal Z = \sum_{\text{states}} e^{-(E - \mu N)/k_BT}`,
    variables: [
      [md`Z`, 'Partition function (canonical ensemble)'],
      [md`\mathcal Z`, 'Grand partition function — particle number can vary'],
      [md`\beta = 1/k_BT`, 'Inverse temperature'],
    ],
    tags: ['statistical mechanics', 'bridge'],
    body: md`
      From $Z$ you get everything: $\langle E\rangle = -\partial \ln Z/\partial\beta$, free energy $F = -k_BT\ln Z$.

      **Bosons:** one mode of energy $\varepsilon$ can hold $n = 0, 1, 2, \dots$ particles. Its grand partition function is a geometric series ([[Infinite Series & Convergence]]):
      $$\sum_{n}e^{-n(\varepsilon-\mu)/k_BT} = \frac{1}{1 - e^{-(\varepsilon-\mu)/k_BT}} \;\Rightarrow\; \bar n = \frac{1}{e^{(\varepsilon-\mu)/k_BT} - 1}$$
      — the [[Bose–Einstein Distribution]].

      **Bridge to string theory:** a string’s worldsheet partition function $\operatorname{Tr} e^{-\beta H}$ is literally this $Z$, with the "temperature" set by the shape of a torus: [[Torus Partition Function & Modular Invariance]].
    `,
    sources: ['Daniel Schroeder — An Introduction to Thermal Physics'],
  }),

  entry('density-of-states', 'equation', A, 'curious', 'Density of States', {
    summary: 'How many quantum states there are per unit energy. For a particle in a 3D box it grows like √ε.',
    latex: md`g(\varepsilon) = \frac{V}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\sqrt{\varepsilon}`,
    variables: [
      [md`g(\varepsilon)\,d\varepsilon`, 'Number of single-particle states with energy between ε and ε + dε'],
      [md`V`, 'Volume of the box'],
      [md`m`, 'Particle mass'],
    ],
    tags: ['statistical mechanics'],
    body: md`
      **Where it comes from:** in a box of side $L$ the allowed wavevectors form a grid with spacing $2\pi/L$ (standing waves — [[Waves, Interference & Normal Modes]]). Count grid points inside a sphere of radius $k$, use $\varepsilon = \hbar^2k^2/2m$, and differentiate.

      Sums over states become integrals: $\sum_i f(\varepsilon_i) \to \int g(\varepsilon) f(\varepsilon)\,d\varepsilon$.

      **The catch that makes condensation possible:** $g(0) = 0$, so the integral gives the ground state zero weight. Below $T_c$ the integral can’t hold all the atoms and the missing ones sit in the ground state. See [[Deriving T_c from the density of states]].
    `,
  }),

  entry('fluid-dynamics', 'concept', A, 'curious', 'Fluids, Viscosity & Vorticity', {
    summary: 'How liquids and gases flow. Viscosity is internal friction — exactly what a superfluid lacks.',
    latex: md`\rho\left(\frac{\partial\mathbf v}{\partial t} + (\mathbf v\cdot\nabla)\mathbf v\right) = -\nabla p + \eta\,\nabla^2\mathbf v, \qquad \mathrm{Re} = \frac{\rho v L}{\eta}`,
    variables: [
      [md`\eta`, 'Dynamic viscosity'],
      [md`\boldsymbol\omega = \nabla\times\mathbf v`, 'Vorticity: local spinning of the fluid'],
      [md`\mathrm{Re}`, 'Reynolds number: inertia versus viscosity'],
    ],
    tags: ['fluids', 'zero viscosity'],
    body: md`
      - **Navier–Stokes** (above, incompressible): the $\eta\nabla^2\mathbf v$ term drains kinetic energy into heat.
      - Set $\eta = 0$ and you get the **Euler equation** of an ideal fluid; then circulation around a loop moving with the fluid is conserved (Kelvin’s theorem).
      - Ordinary vortices can have any strength. In a superfluid the velocity is a phase gradient, so vorticity is confined to thin cores with fixed circulation $h/m$ — [[Quantized Circulation]].
      - For scale: water’s kinematic viscosity $\eta/\rho \approx 10^{-6}$ m²/s, while helium’s quantum of circulation is about $10^{-7}$ m²/s.

      [[Superfluidity]] is the case $\eta = 0$ realized by quantum mechanics.
    `,
  }),
];
