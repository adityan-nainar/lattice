import { AREA, entry, md } from '../helpers.js';

const { REL, QUANTUM, MISC } = AREA;

export const COSMOS = [
  entry('gravitational-waves', 'equation', REL, 'curious', 'Gravitational Waves', {
    summary: 'Ripples in spacetime itself, moving at the speed of light. The first detection in 2015 measured a length change a thousand times smaller than a proton.',
    latex: md`h = \frac{\Delta L}{L} \sim 10^{-21}, \qquad \Delta L \approx 10^{-21}\times 4\ \text{km} = 4\times10^{-18}\ \text{m}`,
    variables: [
      [md`h`, 'Strain: fractional stretching of space'],
      [md`L`, 'Arm length of the LIGO detector (4 km)'],
    ],
    aliases: ['gravitational wave', 'gravitational waves', 'LIGO', 'GW150914', 'GW170817', 'strain'],
    tags: ['general relativity', 'experiments', 'black holes'],
    body: md`
      The [[Einstein Field Equations]] predict waves in the metric, like electromagnetic waves in [[Maxwell’s Equations & Light|Maxwell’s theory]]. Einstein (1916) doubted they could ever be measured.

      - **Indirect evidence:** the Hulse–Taylor binary pulsar’s orbit shrinks exactly as energy loss to gravitational waves predicts ([[Neutron Stars]]).
      - **GW150914** (14 September 2015): LIGO’s two 4 km laser interferometers felt two black holes of about 36 and 29 solar masses merge 1.3 billion light-years away. About 3 solar masses of energy left as waves in a fraction of a second. Nobel Prize 2017.
      - **GW170817:** two neutron stars merged; light arrived 1.7 s after the waves, pinning their speed to the [[Speed of Light]] within about $10^{-15}$.

      The detectors are giant [[Waves, Interference & Normal Modes|interferometers]]; at their sensitivity, quantum noise from the laser light itself is a limit, beaten with squeezed light.
    `,
  }),

  entry('hawking-radiation', 'equation', REL, 'curious', 'Hawking Radiation', {
    summary: 'Quantum fields near a horizon make black holes glow like a blackbody. The smaller the black hole, the hotter — a solar-mass one is at 60 billionths of a kelvin.',
    latex: md`T_H = \frac{\hbar c^3}{8\pi G M k_B} \approx 6.2\times10^{-8}\ \text{K}\,\left(\frac{M_\odot}{M}\right)`,
    variables: [
      [md`T_H`, 'Hawking temperature'],
      [md`M`, 'Black hole mass'],
    ],
    aliases: ['Hawking radiation', 'Hawking temperature', 'black hole evaporation'],
    tags: ['black holes', 'quantum gravity', 'thermodynamics'],
    body: md`
      **Hawking (1974):** do [[Quantum Field Theory]] on the curved spacetime of a [[Black Holes & Event Horizons|black hole]]. What one observer calls empty vacuum, another — far away — sees as a thermal bath of particles. Black holes emit [[Planck’s Law & Blackbody Radiation|blackbody radiation]].

      - **Solar mass:** $6\times10^{-8}$ K, colder than the 2.7 K [[The Cosmic Microwave Background]] — so today it absorbs more than it emits.
      - **Evaporation time** grows as $M^3$: about $10^{67}$ years for a solar-mass black hole.
      - Temperature + energy ⇒ entropy, and it comes out as area/4: [[Black Hole Entropy & the Holographic Principle]].

      **The information paradox:** if a black hole evaporates completely into thermal radiation, what happened to the information that fell in? Resolving it is a major goal of quantum gravity ([[Why don’t quantum mechanics and general relativity fit together?]]), and it led to ideas like [[ER = EPR]].
    `,
  }),

  entry('expanding-universe', 'equation', REL, 'curious', 'The Expanding Universe', {
    summary: 'Galaxies recede at speeds proportional to their distance. Einstein’s equations for a uniform universe predict it — plus an unexpected acceleration driven by dark energy.',
    latex: md`v = H_0\,d, \qquad \left(\frac{\dot a}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2} + \frac{\Lambda c^2}{3}`,
    variables: [
      [md`H_0`, 'Hubble constant ≈ 70 km/s per megaparsec'],
      [md`a(t)`, 'Scale factor: how much distances have stretched'],
      [md`\Lambda`, 'Cosmological constant (dark energy)'],
    ],
    aliases: ['expanding universe', 'Hubble’s law', 'Hubble constant', 'Friedmann equations', 'Big Bang', 'dark energy', 'cosmic acceleration', 'Hubble tension'],
    tags: ['cosmology', 'general relativity'],
    body: md`
      - **Friedmann (1922) and Lemaître (1927)** solved the [[Einstein Field Equations]] for a uniform universe: it can’t sit still.
      - **Hubble (1929)** saw galaxies receding, faster with distance. $1/H_0 \approx 14$ billion years — close to the universe’s age of 13.8 billion years.
      - **1998:** distant type Ia supernovae, exploding white dwarfs ([[Degeneracy Pressure & White Dwarfs]]), were fainter than expected. Expansion is **accelerating**. About 69% of the universe’s energy is “dark energy”, behaving like the cosmological constant $\Lambda$. Nobel Prize 2011.

      **Open problems:**
      - Measured $H_0$ disagrees between methods (about 67 vs 73) — the Hubble tension.
      - Quantum theory predicts a vacuum energy up to $10^{120}$ times too big to be $\Lambda$ ([[The Vacuum Energy Problem]]).

      The universe’s early hot phase left a glow: [[The Cosmic Microwave Background]].
    `,
  }),

  entry('cmb', 'concept', REL, 'curious', 'The Cosmic Microwave Background', {
    summary: 'Light released 380,000 years after the Big Bang, stretched into microwaves. The most perfect blackbody ever measured, at 2.7255 K, with ripples of one part in 100,000.',
    latex: md`T_0 = 2.7255\ \text{K}, \qquad \lambda_{\text{peak}} \approx 1.06\ \text{mm}, \qquad n_\gamma \approx 411\ \text{photons/cm}^3, \qquad \frac{\delta T}{T} \sim 10^{-5}`,
    variables: [
      [md`T_0`, 'Temperature today'],
      [md`n_\gamma`, 'Number of CMB photons per cubic centimetre, everywhere'],
    ],
    aliases: ['cosmic microwave background', 'CMB', 'microwave background', 'recombination', 'last scattering'],
    tags: ['cosmology', 'thermodynamics', 'light'],
    body: md`
      When the universe cooled to about 3,000 K, electrons and protons combined into hydrogen ([[The Hydrogen Atom]]) and space became transparent. That light has been travelling ever since, its wavelength stretched about 1,100 times by [[The Expanding Universe|expansion]].

      - **Found by accident** in 1965 by Penzias and Wilson, who first blamed pigeon droppings in their antenna. Nobel Prize 1978.
      - **COBE (1990)** showed its spectrum matches [[Planck’s Law & Blackbody Radiation|Planck’s law]] almost perfectly — it really was a hot, dense early universe.
      - **Tiny ripples** of one part in $10^5$ are the seeds of every galaxy. Their pattern measures the universe’s age, geometry and contents.

      Every cubic centimetre around you holds about 411 of these photons. They made up roughly 1% of the static on old analogue TVs.
    `,
  }),

  entry('vacuum-energy-problem', 'question', QUANTUM, 'curious', 'The Vacuum Energy Problem', {
    summary: 'Quantum fields say empty space should hold enormous zero-point energy. Gravity says the actual amount is up to 10¹²⁰ times smaller. Called the worst prediction in physics.',
    latex: md`\rho_{\text{vac}}^{\text{QFT}} \sim \frac{c^7}{\hbar G^2} \approx 5\times10^{113}\ \text{J/m}^3 \quad\text{vs}\quad \rho_\Lambda^{\text{observed}} \approx 6\times10^{-10}\ \text{J/m}^3`,
    variables: [
      [md`\rho_{\text{vac}}^{\text{QFT}}`, 'Naive estimate: zero-point energy of all modes up to the Planck scale'],
      [md`\rho_\Lambda`, 'Dark energy density inferred from cosmic acceleration'],
    ],
    aliases: ['vacuum energy', 'cosmological constant problem', 'vacuum catastrophe', 'zero-point energy of the vacuum'],
    tags: ['open question', 'quantum gravity', 'cosmology'],
    body: md`
      Every mode of every field is a [[Quantum Harmonic Oscillator]] with zero-point energy $\tfrac12\hbar\omega$. Add them up to the Planck scale and the vacuum should have a gigantic energy density. In gravity, energy curves spacetime ([[Einstein Field Equations]]), so this would act as a cosmological constant.

      **The observed value** ([[The Expanding Universe|dark energy]]) is smaller by roughly 120 orders of magnitude (about 60 with milder cutoffs).

      **Why it’s strange:** differences in vacuum energy are real — they give the [[Casimir Effect]]. It’s only the absolute amount, felt by gravity, that seems wildly off.

      **Ideas:** [[Supersymmetry]] (boson and fermion contributions cancel — but only if unbroken); anthropic selection among many possible vacua; something deeper about [[Why don’t quantum mechanics and general relativity fit together?|quantum gravity]]. None is established.
    `,
  }),

  entry('er-epr', 'theory', REL, 'curious', 'ER = EPR', {
    summary: 'A conjecture that entangled particles are connected by tiny wormholes — that entanglement and spacetime geometry are the same thing. Speculative, but influential.',
    aliases: ['ER=EPR', 'Einstein–Rosen bridge', 'wormhole', 'wormholes'],
    tags: ['quantum gravity', 'speculative', 'bridge'],
    body: md`
      In **1935** Einstein co-wrote two papers:
      - **EPR** (with Podolsky and Rosen): entangled particles seem to have spooky correlations ([[Entanglement]]).
      - **ER** (with Rosen): the [[Schwarzschild Metric]] contains a bridge joining two regions of space — a wormhole you can’t travel through.

      **Maldacena and Susskind (2013)** proposed these are the same phenomenon: two maximally entangled black holes are joined by an Einstein–Rosen bridge, and perhaps even two entangled particles are joined by a quantum, Planck-scale version.

      **Why people take it seriously:** in [[Anti-de Sitter Space & AdS/CFT|AdS/CFT]], entanglement in the boundary theory measurably builds connected geometry in the bulk. It gives a possible route through the black hole information paradox ([[Hawking Radiation]]).

      **Status:** a conjecture, not established physics — and it doesn’t allow faster-than-light messages.
    `,
  }),

  entry('gravitational-lensing', 'equation', REL, 'curious', 'Gravitational Lensing', {
    summary: 'Mass bends light. The Sun deflects starlight by 1.75 arcseconds — twice what Newton would give — and galaxy clusters bend background galaxies into arcs and rings.',
    latex: md`\alpha = \frac{4GM}{c^2 b}`,
    variables: [
      [md`\alpha`, 'Deflection angle'],
      [md`b`, 'Closest distance of the light ray from the mass (impact parameter)'],
    ],
    aliases: ['gravitational lensing', 'light bending', 'Einstein ring', 'Einstein cross', 'microlensing'],
    tags: ['general relativity', 'experiments', 'astrophysics'],
    body: md`
      Light follows [[Geodesic Equation|geodesics]] of curved spacetime. Half the bending comes from the time part of the metric (what a Newtonian particle at speed $c$ would feel), half from the curvature of space — so GR predicts **twice** the Newtonian value.

      **The Sun:** $b$ = solar radius gives
      $$\alpha = \frac{4 \times 6.674\times10^{-11} \times 1.989\times10^{30}}{(3.00\times10^8)^2 \times 6.96\times10^8} \approx 8.5\times10^{-6}\ \text{rad} = 1.75''$$
      Eddington’s 1919 eclipse expedition confirmed it and made Einstein famous overnight.

      **Today:**
      - Galaxy clusters make arcs and Einstein rings; the amount of bending weighs the cluster — revealing **dark matter**.
      - Microlensing by passing stars finds exoplanets.
      - Around a black hole, light can orbit at $1.5\,r_s$ — the bright ring in the Event Horizon Telescope images ([[Black Holes & Event Horizons]]).
    `,
  }),

  entry('example-mercury-perihelion', 'example', REL, 'curious', 'Mercury’s Perihelion: 43 arcseconds per century', {
    summary: 'Mercury’s orbit slowly rotates. Newtonian gravity left 43″ per century unexplained; general relativity gives exactly 43.',
    tags: ['general relativity', 'experiments'],
    body: md`
      Per orbit, GR adds a rotation of the ellipse ([[Geodesic Equation|geodesics]] in the [[Schwarzschild Metric]]):
      $$\Delta\phi = \frac{6\pi GM_\odot}{c^2\,a\,(1 - e^2)}$$

      **Mercury:** $a = 5.79\times10^{10}$ m, $e = 0.2056$.
      $$\Delta\phi = \frac{6\pi \times 1.327\times10^{20}}{(3.00\times10^8)^2 \times 5.79\times10^{10} \times 0.958} \approx 5.0\times10^{-7}\ \text{rad per orbit}$$

      One orbit takes 88 days, so there are about 415 orbits per century:
      $$5.0\times10^{-7} \times 415 \approx 2.08\times10^{-4}\ \text{rad} \approx 43''$$

      In 1859 Le Verrier noticed that Mercury’s orbit turned slightly faster than the other planets’ pull could explain; the gap was later pinned down to about 43″ per century. Some proposed an unseen planet, “Vulcan”. Einstein’s 1915 calculation matched it — he wrote that it gave him heart palpitations.
    `,
  }),

  entry('example-hafele-keating', 'example', REL, 'curious', 'Hafele–Keating: atomic clocks around the world', {
    summary: 'In 1971, caesium clocks flown east lost about 59 ns and clocks flown west gained 273 ns against clocks on the ground — both kinds of time dilation at once.',
    tags: ['special relativity', 'general relativity', 'experiments'],
    body: md`
      Joseph Hafele and Richard Keating flew four caesium [[Atomic Clocks]] around the world on commercial flights, once eastward and once westward, and compared them with clocks at the US Naval Observatory.

      **Two effects compete:**
      - **Speed** ([[Special-Relativistic Time Dilation]]): viewed from a non-rotating frame, the ground already moves east with Earth’s rotation. Flying east adds speed → the clock runs slower; flying west subtracts → faster.
      - **Height** ([[Gravitational Time Dilation]]): at cruising altitude, both flights run faster than the ground.

      | Direction | Predicted (ns) | Measured (ns) |
      |---|---|---|
      | Eastward | −40 ± 23 | −59 ± 10 |
      | Westward | +275 ± 21 | +273 ± 7 |

      Agreement within the uncertainties — relativity tested with airliners and suitcases of clocks. Modern optical clocks see the gravitational part over a height change of a few centimetres.
    `,
  }),

  entry('arrow-of-time', 'question', MISC, 'curious', 'Why does time only go forward?', {
    summary: 'The fundamental laws run equally well backwards, yet eggs break and never unbreak. The answer seems to be that the universe began in an extraordinarily low-entropy state.',
    aliases: ['arrow of time', 'second law of thermodynamics', 'time asymmetry', 'past hypothesis'],
    tags: ['open question', 'thermodynamics', 'cosmology'],
    body: md`
      Newton’s, Maxwell’s, Schrödinger’s and Einstein’s equations all work with time reversed (up to small effects in the weak force). But entropy — the number of microscopic arrangements ([[Temperature, Entropy & Chemical Potential]]) — always increases. That one-way street is the arrow.

      **Boltzmann’s insight:** there are vastly more disordered states than ordered ones, so any change is overwhelmingly likely to increase entropy ([[Boltzmann Distribution & Partition Function]]). That explains why entropy rises *toward the future* — but by the same logic it should rise toward the past too.

      **The past hypothesis:** the universe started in a state of extremely low entropy. The smooth early universe seen in [[The Cosmic Microwave Background]] is low-entropy once gravity is counted, because gravity makes clumping the *more* likely direction.

      **Threads to pull:**
      - Erasing memories costs entropy, which may be why we remember the past and not the future ([[Maxwell’s Demon & Landauer’s Principle]]).
      - Black holes are the highest-entropy objects known ([[Black Hole Entropy & the Holographic Principle]]).
      - Measurement looks irreversible too ([[The Measurement Problem]]).
    `,
  }),
];
