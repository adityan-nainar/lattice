// Science, Physics & Maths: how science works, what physics means, and whether numbers are real.

import { AREA, entry, input, LOG, md, out, survey } from './helpers.js';

const { SCIENCE } = AREA;

export const SCIENCE_ENTRIES = [
  entry('falsifiability', 'theory', SCIENCE, 'curious', 'Falsifiability', {
    summary: 'A theory is scientific only if some possible observation could prove it wrong. Popper’s line between science and pseudo-science — and the reason science can never prove a theory true.',
    aliases: ['falsifiability', 'falsifiable', 'falsificationism', 'demarcation problem', 'conjectures and refutations'],
    tags: ['science', 'method'],
    year: 1934,
    body: md`
      ## Popper's idea
      Karl Popper (*Logik der Forschung*, 1934) noticed that Einstein's general relativity made a risky prediction — starlight bending by a precise amount near the Sun, tested in the 1919 eclipse — that could have failed. Freud's psychoanalysis and Adler's psychology, by contrast, could explain *any* behaviour after the fact. That looked like strength, and Popper thought it was weakness.

      So: a theory is **scientific** if it's **falsifiable** — it forbids some observations. No number of white swans proves "all swans are white"; one black swan refutes it (modus tollens). Science advances by **conjectures and refutations**, not by piling up confirmations, which sidesteps Hume's problem of induction.

      ## Troubles
      - **Duhem–Quine**: a failed prediction refutes a *bundle* of hypotheses plus instruments and assumptions — which one goes? When Uranus' orbit misbehaved, astronomers didn't reject Newton; they predicted Neptune (found 1846). When Mercury misbehaved, the same move (planet "Vulcan") failed, and Newton was eventually replaced.
      - **Kuhn**: real scientists don't abandon theories at the first anomaly — and shouldn't.
      - **Probabilistic theories**: "this coin is fair" forbids no particular sequence of flips.
      - **Lakatos** refined it into research programmes judged by whether they predict novel facts (progressive) or only patch anomalies (degenerating).

      Falsifiability survives as a rule of thumb: if nothing could count against a claim, it isn't telling you anything about the world.
    `,
  }),

  entry('paradigm-shifts', 'theory', SCIENCE, 'curious', 'Paradigm Shifts', {
    summary: 'Science mostly runs as puzzle-solving inside a paradigm; anomalies pile up; a crisis ends in a revolution that changes what counts as a problem, a method and even a fact. Kuhn, 1962.',
    aliases: ['paradigm shift', 'paradigm', 'normal science', 'scientific revolution', 'incommensurability', 'research programme', 'anything goes'],
    tags: ['science', 'history'],
    year: 1962,
    body: md`
      ## Kuhn's cycle
      Thomas Kuhn, a physicist turned historian, argued in *The Structure of Scientific Revolutions* (1962) that science isn't steady accumulation:
      1. **Normal science** — work within a **paradigm**: shared theories, exemplary problems, methods, standards. Scientists solve puzzles; they don't test the paradigm.
      2. **Anomalies** — results that don't fit get set aside, until they pile up.
      3. **Crisis** — confidence breaks; rival approaches multiply.
      4. **Revolution** — a new paradigm wins: Copernicus, Newton, Lavoisier's oxygen, Darwin, relativity, quantum mechanics.

      ## The radical part
      Paradigms can be **incommensurable**: "mass" means something different in Newton and Einstein; scientists across a revolution "live in different worlds" and partly talk past each other. Choosing a paradigm isn't settled by a neutral algorithm — simplicity, scope and fruitfulness are weighed differently. Critics heard relativism: is science just fashion? Kuhn said no; he thought science does progress, but *away* from earlier theories rather than toward a final truth.

      ## Around Kuhn
      - **Lakatos**: research programmes with a hard core and a protective belt of auxiliary hypotheses.
      - **Feyerabend** (*Against Method*, 1975): the only rule that holds across history is "anything goes".
      - "Paradigm shift" escaped into business-speak; Kuhn complained he'd lost control of the word.

      The debate with Popper — revolution vs refutation — frames most of 20th-century philosophy of science.
    `,
  }),

  entry('underdetermination', 'concept', SCIENCE, 'curious', 'Underdetermination and the Duhem–Quine Thesis', {
    summary: 'Evidence never tests a hypothesis alone, and any body of evidence fits more than one theory. So data alone can’t force a theory choice.',
    aliases: ['underdetermination', 'Duhem–Quine thesis', 'Duhem-Quine thesis', 'confirmation holism', 'auxiliary hypotheses', 'web of belief'],
    tags: ['science', 'method'],
    year: 1906,
    body: md`
      ## Duhem's point (1906)
      Pierre Duhem, physicist and historian, noted that a physics experiment never tests one hypothesis in isolation. Predicting a meter reading needs the hypothesis *plus* theories of the apparatus, background conditions and assumptions. When the prediction fails, logic says only that *something* in the bundle is false. There are no crucial experiments in physics, strictly speaking.

      ## Quine goes further (1951)
      Our statements face "the tribunal of sense experience" not one by one but together, as a body. Any statement can be held true "come what may" if we make big enough adjustments elsewhere; even logic could be revised. Knowledge is a **web of belief**, touching experience only at the edges.

      ## Underdetermination
      - **Weak** (transient): the data so far fit several theories; more data may decide.
      - **Strong** (permanent): there are empirically equivalent theories that no possible evidence could separate. Standard quantum mechanics and Bohmian mechanics make the same predictions; Newtonian gravity in flat space vs curved-space versions of it.

      If strong underdetermination is common, choosing theories needs extra-empirical virtues — simplicity (Occam's razor), elegance, fruitfulness — and the scientific realist must explain why those should track truth.
    `,
  }),

  entry('scientific-realism', 'theory', SCIENCE, 'curious', 'Scientific Realism', {
    summary: 'Our best scientific theories are approximately true, and the unobservable things they describe — electrons, quarks, dark matter — really exist. Otherwise, why does science work so well?',
    aliases: ['scientific realism', 'scientific anti-realism', 'no-miracles argument', 'pessimistic meta-induction', 'instrumentalism', 'structural realism', 'constructive empiricism'],
    tags: ['science', 'realism'],
    year: 1975,
    body: md`
      ## The no-miracles argument
      Hilary Putnam (1975): realism "is the only philosophy that doesn't make the success of science a miracle". Quantum electrodynamics predicts the electron's magnetic moment to better than one part in a billion. If electrons aren't real, that success is an astonishing coincidence.

      ## The pessimistic meta-induction
      Larry Laudan (1981) listed theories that were empirically successful and are now judged false: crystalline spheres, phlogiston, caloric (heat as fluid), the luminiferous ether. By induction, our current theories will probably be judged false too.

      ## Middle ways
      - **Structural realism** (John Worrall, 1989): what survives revolutions is mathematical **structure**. Fresnel's equations for light were right though his ether was wrong; Maxwell kept the equations.
      - **Constructive empiricism** (Bas van Fraassen, 1980): science aims only at theories that are **empirically adequate** — right about observables. Accept theories; don't believe in their unobservables.
      - **Instrumentalism**: theories are tools for prediction, like a calculator; "true" doesn't apply.
      - **Entity realism** (Ian Hacking, 1983): about electrons, "if you can spray them, then they are real".

      Quantum mechanics is the hard case: what, exactly, would a realist be realist *about*? That's the measurement problem.

      ${survey('Science', 'scientific realism 72%, anti-realism 15%')}
    `,
  }),

  entry('inference-best-explanation', 'concept', SCIENCE, 'curious', 'Inference to the Best Explanation', {
    summary: 'Believe the hypothesis that would, if true, best explain the evidence. How detectives, doctors and scientists reason — but what makes an explanation "best"?',
    aliases: ['inference to the best explanation', 'abduction', 'abductive reasoning', 'IBE'],
    tags: ['science', 'method', 'argument'],
    year: 1965,
    body: md`
      ## The pattern
      C. S. Peirce called it **abduction**; Gilbert Harman (1965) named it *inference to the best explanation*:
      1. Here is some surprising evidence $E$.
      2. Hypothesis $H$ would explain $E$ better than any rival.
      3. So, probably, $H$.

      Darwin argued for evolution this way; astronomers inferred Neptune; you infer a mouse from nibbled biscuits and scratching at night.

      ## What makes an explanation good?
      Peter Lipton (*Inference to the Best Explanation*, 1991) distinguished the **likeliest** explanation (most probably true) from the **loveliest** (most understanding-giving: simple, unifying, precise, mechanistic). IBE claims loveliness is a guide to likeliness. Why should it be? The world might be ugly.

      ## Its big uses
      - The **no-miracles argument** for scientific realism is an IBE: truth best explains success.
      - Arguments for **other minds** and the external world against skepticism.
      - The **design** and **fine-tuning** arguments for God are IBEs — as are the replies (multiverse, anthropic selection).

      Bayesians try to absorb IBE: lovely explanations earn high priors or high likelihoods. Critics like van Fraassen reply that IBE picks the best of the hypotheses *we happened to think of* — "the best of a bad lot".
    `,
  }),

  entry('occams-razor', 'concept', SCIENCE, 'curious', "Occam's Razor", {
    summary: 'Don’t multiply entities beyond necessity: prefer the simpler explanation. A good rule of thumb — but why should reality be simple?',
    aliases: ["Occam's razor", "Ockham's razor", 'parsimony', 'principle of parsimony', 'law of parsimony'],
    tags: ['science', 'method'],
    year: 1323,
    body: md`
      ## The rule
      William of Ockham (c. 1287–1347), an English Franciscan logician, often argued that "plurality should not be posited without necessity". The snappier "entities must not be multiplied beyond necessity" is a later formulation (John Punch, 1639). Ockham used it to shave away universals as real things, backing nominalism.

      ## Why simpler?
      - **Probability**: a hypothesis with fewer free parameters makes sharper predictions, so it's more strongly confirmed when it's right — a Bayesian "Occam factor". More complex models can fit anything, which means they explain little.
      - **Machine learning** knows this as overfitting: a model with too many parameters memorises noise.
      - **Minimum description length**: the best theory is the one that compresses the data most.

      ## Cautions
      Simplicity is ambiguous — fewer kinds of thing, or fewer things? Fewer laws, or shorter equations? The atom was once the unparsimonious hypothesis. Kepler's ellipses beat circles-on-circles by being simpler; relativity beat Newton by being *more* complicated but more accurate. And "the Sun rose because God willed it" is short but explains nothing.

      Einstein's version: make things as simple as possible, but not simpler — a popular paraphrase of a 1933 lecture.
    `,
  }),

  entry('raven-paradox', 'example', SCIENCE, 'curious', 'The Raven Paradox', {
    summary: '"All ravens are black" is logically equivalent to "all non-black things are non-ravens". So seeing a green apple confirms that ravens are black?',
    aliases: ['raven paradox', "Hempel's paradox", 'paradox of confirmation', 'confirmation theory'],
    tags: ['science', 'paradox', 'probability'],
    year: 1945,
    body: md`
      ## Hempel's puzzle (1945)
      Three plausible principles:
      1. **Nicod's criterion**: a black raven confirms "all ravens are black".
      2. **Equivalence**: if evidence confirms a hypothesis, it confirms anything logically equivalent to it.
      3. "All ravens are black" ≡ "all non-black things are non-ravens" (contraposition).

      So a non-black non-raven — a green apple, a white shoe — confirms "all ravens are black". Indoor ornithology!

      ## The Bayesian resolution
      It *does* confirm it — by a negligible amount. There are vastly more non-black things than ravens. If you pick a random non-black object, the chance it turns out to be a raven (which would refute the hypothesis) is tiny whether or not the hypothesis is true, so finding it's a shoe barely moves your credence. Picking a random raven and finding it black is a much riskier test, so it confirms much more. Same logic, very different weights.

      ## The lesson
      Confirmation depends on **how the evidence was gathered** and on background knowledge — the same lesson as the Monty Hall problem. Goodman's grue, published a decade later, showed an even deeper problem for purely logical theories of confirmation: which predicates to project at all.
    `,
  }),

  entry('laplaces-demon', 'example', SCIENCE, 'curious', "Laplace's Demon", {
    summary: 'An intellect that knew every force and every particle’s position could compute the entire future and past. Classical physics’ promise of total predictability — and why it failed.',
    aliases: ["Laplace's demon", 'Laplacean determinism', 'clockwork universe'],
    tags: ['determinism', 'physics', 'thought experiment'],
    year: 1814,
    body: md`
      ## The demon
      Pierre-Simon Laplace, *A Philosophical Essay on Probabilities* (1814): an intellect that knew, at one instant, all the forces of nature and the positions of all things, and could analyse the data, would find "nothing uncertain… the future just like the past would be present before its eyes". This is determinism in its most famous form. (Laplace himself used it to explain why *we* need probability: we are not that intellect.)

      ## What undid it
      - **Chaos**: in many systems, errors in initial data grow exponentially. Weather forecasts lose skill after about two weeks; the solar system's planets become unpredictable after tens of millions of years. The demon would need *infinitely* precise data.
      - **Quantum mechanics**: on standard readings, outcomes like radioactive decay are genuinely random. Even in deterministic interpretations (Bohm, many-worlds), you can't know the needed data.
      - **Thermodynamics and information**: a physical demon storing the state of the universe would need to be as big as the universe — and erasing and recording information costs energy (Maxwell's demon, Landauer).
      - **Self-prediction**: a demon inside the universe that predicts its own actions faces liar-style diagonal problems (Wolpert, 2008).

      The demon remains the clearest picture of what determinism *means*, and why free will worries follow.
    `,
  }),

  entry('measurement-problem', 'question', SCIENCE, 'curious', 'The Measurement Problem', {
    summary: 'Quantum states evolve smoothly into superpositions of many outcomes — yet every measurement shows exactly one. What happens at measurement, and what counts as one?',
    aliases: ['measurement problem', 'wavefunction collapse', 'wave function collapse', 'collapse of the wave function', 'quantum superposition', 'observer effect'],
    tags: ['quantum', 'physics'],
    year: 1932,
    body: md`
      ## Two rules that don't fit
      Standard quantum mechanics (von Neumann's textbook, 1932) has two rules:
      1. Between measurements, the state evolves by the **Schrödinger equation**: smooth, deterministic, linear. Linearity means that if a detector would read "up" for an up-electron and "down" for a down-electron, then for a superposition of up and down it ends up in a **superposition** of reading "up" and reading "down".
      2. On **measurement**, the state **collapses** at random to one outcome, with probability given by the Born rule, $|\psi|^2$.

      But detectors, cats and people are made of atoms obeying rule 1. So when does rule 2 kick in? "Measurement" isn't defined in the theory. That's the problem.

      ## Why decoherence doesn't settle it
      **Decoherence** (1970s–80s) shows interference between macroscopic alternatives is destroyed extremely fast by the environment, so we never *see* superpositions of cats. But it doesn't pick one outcome: the total state is still a superposition, now entangled with the environment. It explains why the world looks classical, not why there's one result.

      ## The ways out
      Every interpretation of quantum mechanics is an answer: deny that the state is complete (hidden variables), deny that collapse happens (many-worlds), make collapse physical (GRW), or deny the state describes reality at all (QBism and epistemic views). Schrödinger's cat and Wigner's friend dramatise it.
    `,
  }),

  entry('qm-interpretations', 'theory', SCIENCE, 'curious', 'Interpretations of Quantum Mechanics', {
    summary: 'Copenhagen, many-worlds, pilot waves, spontaneous collapse, QBism — the same predictions, radically different pictures of what exists. A century on, physicists still disagree.',
    aliases: ['interpretations of quantum mechanics', 'Copenhagen interpretation', 'many-worlds', 'many worlds', 'Everett interpretation', 'pilot wave', 'Bohmian mechanics', 'QBism', 'GRW', 'relational quantum mechanics'],
    tags: ['quantum', 'physics', 'realism'],
    year: 1957,
    body: md`
      ## The main options
      - **Copenhagen** (Bohr, Heisenberg, 1920s): the formalism is a tool for predicting measurement outcomes described in classical terms. Don't ask what happens between measurements. Mermin's summary of the attitude: "shut up and calculate!"
      - **Pilot wave / Bohmian mechanics** (de Broglie 1927, Bohm 1952): particles always have positions, guided by the wavefunction. Deterministic; outcomes are definite; the price is explicit **non-locality** and a preferred notion of simultaneity.
      - **Many-worlds** (Hugh Everett, 1957): the wavefunction never collapses. Every outcome happens, in branches that decohere and stop interfering. Only the Schrödinger equation — the price is an ever-branching reality, and explaining why probabilities follow $|\psi|^2$ when every outcome occurs.
      - **Spontaneous collapse** (Ghirardi–Rimini–Weber, 1986): collapse is a real, random physical process, rare for single particles and near-instant for big objects. It's testable — experiments are narrowing its parameters.
      - **QBism** and **epistemic** views: the quantum state represents an agent's information or credences, not the world directly.
      - **Relational** (Rovelli, 1996): states are relative to other systems; there's no view from nowhere.

      ## Why philosophers care
      Each is an answer to the measurement problem and a different metaphysics: determinism or chance, one world or many, particles or waves, realism or instrumentalism. Bell's theorem constrains them all: any theory reproducing quantum predictions with definite outcomes must be non-local in some sense (or reject other assumptions, like single outcomes).

      ${survey('Quantum mechanics', 'hidden-variables 22%, many-worlds 19%, collapse 17%, epistemic 13%')}
    `,
  }),

  entry('schrodingers-cat', 'example', SCIENCE, 'curious', "Schrödinger's Cat", {
    summary: 'A cat in a box whose life depends on a single atom’s decay: by quantum rules, alive and dead in superposition until someone looks. Schrödinger meant it as a reductio.',
    aliases: ["Schrödinger's cat", 'Schrodinger’s cat', "Wigner's friend"],
    tags: ['quantum', 'thought experiment'],
    year: 1935,
    body: md`
      ## The set-up (1935)
      A cat is sealed in a steel box with a tiny amount of radioactive material, a Geiger counter, a hammer and a flask of poison. If an atom decays in the hour (a 50% chance), the counter clicks, the hammer falls, the flask breaks, the cat dies. If quantum mechanics applies to everything, after an hour the whole system — cat included — is in a superposition of "decayed and dead" and "not decayed and alive", "with the living and dead cat mixed or smeared out in equal parts", as Erwin Schrödinger put it.

      He meant it as **absurd**: something must be wrong with applying superposition to the everyday world. It's the measurement problem in a box.

      ## Wigner's friend (1961)
      Eugene Wigner moved the puzzle to people. His friend measures a quantum system inside a sealed lab and sees a definite result. For Wigner outside, the lab — friend included — is in superposition until he opens the door. Who's right? Wigner concluded consciousness causes collapse (and later abandoned the view).

      Extended Wigner's friend arguments (Frauchiger and Renner, 2018; the "local friendliness" experiments of 2020) show that certain natural-sounding assumptions — quantum mechanics is universal, measurements have single outcomes, no superdeterminism, locality — can't all be true together. Something in our picture of observers has to give.
    `,
  }),

  entry('bell-theorem', 'theory', SCIENCE, 'curious', "Bell's Theorem", {
    summary: 'No theory in which particles carry pre-set answers and influences travel no faster than light can match quantum predictions. Experiments side with quantum mechanics: the 2022 Nobel Prize.',
    aliases: ["Bell's theorem", 'Bell inequality', "Bell's inequality", 'CHSH inequality', 'CHSH', 'local realism', 'local hidden variables', 'EPR paradox', 'quantum non-locality', 'entanglement'],
    tags: ['quantum', 'physics', 'realism'],
    year: 1964,
    latex: md`S = \big|E(a,b) - E(a,b') + E(a',b) + E(a',b')\big| \;\le\; 2 \quad\text{(local realism)}, \qquad S_{\text{QM}} \le 2\sqrt{2}`,
    variables: [
      [md`a, a'`, 'Two measurement angles Alice can choose'],
      [md`b, b'`, 'Two measurement angles Bob can choose'],
      [md`E(a,b)`, 'Average product of results (±1 each); for the spin singlet, −cos(a − b)'],
    ],
    body: md`
      ## EPR (1935)
      Einstein, Podolsky and Rosen argued quantum mechanics is **incomplete**: two particles prepared together stay perfectly correlated however far apart, so (assuming no "spooky action at a distance") each must carry definite hidden values the theory leaves out.

      ## Bell's answer (1964)
      John Bell proved that *any* theory with local hidden variables obeys a limit on how strongly measurements on the two particles can be correlated. In the CHSH form (1969): $S \le 2$. Quantum mechanics predicts up to $2\sqrt{2} \approx 2.83$ (Tsirelson's bound). So the question became experimental.

      ## The verdict
      Freedman and Clauser (1972), Aspect (1982), and "loophole-free" tests in 2015 (Delft, Vienna, Boulder) all found violations of Bell inequalities, as quantum mechanics predicts. Aspect, Clauser and Zeilinger shared the 2022 Nobel Prize in Physics.

      ## What it means
      At least one of these must go: **locality** (no influence faster than light), **realism** (outcomes pre-exist measurement), **single outcomes** (many-worlds rejects this), or **measurement independence** (superdeterminism says your choice of setting is correlated with the particles). It cannot be used to send signals faster than light. Still, Bell's theorem is the nearest thing to experimental metaphysics — a philosophical assumption about the world refuted in a lab.
    `,
    calc: {
      inputs: [
        input('a', 'Alice’s first angle a', '°', 0, 0, 180),
        input('a2', 'Alice’s second angle a′', '°', 90, 0, 180),
        input('b', 'Bob’s first angle b', '°', 45, 0, 180),
        input('b2', 'Bob’s second angle b′', '°', 135, 0, 180),
      ],
      outputs: [
        out('E(a, b)', '', '-cos((a - b)*pi/180)', { key: 'e1', digits: 4 }),
        out('E(a, b′)', '', '-cos((a - b2)*pi/180)', { key: 'e2', digits: 4 }),
        out('E(a′, b)', '', '-cos((a2 - b)*pi/180)', { key: 'e3', digits: 4 }),
        out('E(a′, b′)', '', '-cos((a2 - b2)*pi/180)', { key: 'e4', digits: 4 }),
        out('Quantum prediction S', '', 'abs(e1 - e2 + e3 + e4)', { digits: 4 }),
        out('Largest S any local hidden-variable theory allows', '', '2', { digits: 2 }),
      ],
      note: 'At 0°, 90°, 45°, 135° quantum mechanics gives 2√2 ≈ 2.83 — the maximum. Move the angles and watch S drop below 2.',
    },
  }),

  entry('arrow-of-time', 'question', SCIENCE, 'curious', 'The Arrow of Time', {
    summary: 'The laws of physics work the same forwards and backwards, yet eggs break and never unbreak. Why does time have a direction? Boltzmann’s answer leads back to the Big Bang.',
    aliases: ['arrow of time', 'past hypothesis', 'time asymmetry', 'second law of thermodynamics', 'entropy', 'Boltzmann brain'],
    tags: ['time', 'physics'],
    year: 1877,
    latex: md`S = k_B \ln W, \qquad P(\text{all } N \text{ molecules in the left half}) = 2^{-N}`,
    variables: [
      ['S', 'Entropy'],
      ['W', 'Number of microscopic arrangements matching the macroscopic state'],
      ['N', 'Number of gas molecules'],
    ],
    body: md`
      ## The puzzle
      Newton's laws, Maxwell's equations and the Schrödinger equation are (almost) **time-symmetric**: run a film of colliding atoms backwards and it still obeys physics. But milk mixes into coffee and never unmixes; we remember the past, not the future; causes precede effects. Where does the asymmetry come from?

      ## Boltzmann's answer (1877)
      Entropy counts microstates: $S = k_B \ln W$. There are overwhelmingly more "mixed" arrangements than "separated" ones, so a system wandering randomly among microstates almost always moves toward higher entropy. The chance of a box's gas all gathering in one half is $2^{-N}$ — for 100 molecules about $10^{-30}$; for a real mole, unthinkable.

      ## The catch: the past
      The same statistics say entropy should increase toward the *past* too — unless the past was special. So we need the **Past Hypothesis** (David Albert's term): the universe began in an extraordinarily low-entropy state. The arrow of time points away from the Big Bang. Why the beginning was so special is one of the deepest open questions in cosmology.

      Boltzmann toyed with the idea that our low-entropy region is a rare fluctuation. That leads to the **Boltzmann brain** problem: a lone brain with false memories fluctuating into existence is far more probable than a whole ordered universe — so on that theory you should think you're one. Most take this as a reason to reject the theory, a self-location argument cousin to the doomsday argument.
    `,
    calc: {
      inputs: [input('n', 'Gas molecules in the box', '', 100, 1, 1e24, LOG)],
      outputs: [
        out('Chance all are in the left half', '', '2^(-n)', { digits: 3 }),
        out('Same, as a power of ten', '', '-n*log10(2)', { digits: 4 }),
        out('Times seen if checked a billion times a second since the Big Bang', '', '1e9*4.35e17*2^(-n)', { digits: 3 }),
      ],
      note: 'With 10 molecules it happens about once in a thousand looks; with 100, never in the life of the universe. That gap is the arrow of time.',
    },
  }),

  entry('relativity-of-simultaneity', 'concept', SCIENCE, 'curious', 'The Relativity of Simultaneity', {
    summary: 'Whether two distant events happen "at the same time" depends on how you’re moving. Walk toward Andromeda and its "now" shifts by days. What does that do to the idea of a single present?',
    aliases: ['relativity of simultaneity', 'Andromeda paradox', 'Rietdijk–Putnam argument', 'special relativity', 'spacetime'],
    tags: ['time', 'physics', 'relativity'],
    year: 1905,
    latex: md`\Delta t' = \gamma\left(\Delta t - \frac{v\,\Delta x}{c^2}\right) \;\;\Rightarrow\;\; \Delta t'\big|_{\Delta t = 0} \approx -\frac{v\,\Delta x}{c^2}`,
    variables: [
      [md`\Delta x`, 'Distance between the two events'],
      ['v', 'Your speed relative to the other observer'],
      ['c', 'Speed of light'],
      [md`\gamma`, 'Lorentz factor, ≈ 1 at walking speeds'],
    ],
    body: md`
      ## Einstein's train (1905)
      Lightning strikes both ends of a train. An observer on the platform, midway, sees both flashes at once and calls the strikes simultaneous. An observer at the middle of the moving train is rushing toward one flash and away from the other; she sees the front flash first — and since light's speed is the same for her, she concludes the front strike happened first. Neither is wrong. **Simultaneity at a distance is relative to motion.**

      ## The Andromeda paradox (Penrose, 1989)
      The shift is $v\,\Delta x/c^2$ — tiny for nearby events, big for far ones. Two people pass each other on a street, one walking toward Andromeda (2.5 million light-years away), one away from it. Their planes of "now" at Andromeda differ by about four days: for one, the Andromedan invasion fleet has already launched; for the other, the decision hasn't been made.

      ## Why metaphysicians care
      The **Rietdijk–Putnam argument** (1966–67): if everything simultaneous with me now is real, and what's real for someone real for me is real for me, then relativity forces the future to be real — the **block universe**, eternalism, and the B-theory of time. Presentists reply that "now" might be preferred physically (a cosmic rest frame), or that what exists isn't settled by relativity's geometry.
    `,
    calc: {
      inputs: [
        input('v', 'Your walking speed', 'm/s', 1.4, 0.1, 30000, LOG),
        input('dist', 'Distance to the far event', 'million light-years', 2.5, 0.000001, 10000, LOG),
      ],
      outputs: [
        out('Shift in your "now" at that distance', 's', 'v*dist*1e6*ly/c^2', { key: 'dt', digits: 3 }),
        out('Same, in days', 'days', 'dt/day', { digits: 3 }),
        out('Same, in years', 'years', 'dt/yr', { digits: 3 }),
      ],
      note: 'Walking at 1.4 m/s toward Andromeda shifts "now" there by about 4 days. Try the Moon (0.00000004 million ly) or the Earth’s orbital speed (30,000 m/s).',
    },
  }),

  entry('space-substance', 'question', SCIENCE, 'curious', 'Is Space a Thing?', {
    summary: 'Newton: space is a real container, and spinning water proves it. Leibniz: space is only the relations between things. Einstein made spacetime dynamic — and reopened the question.',
    aliases: ['substantivalism', 'relationalism', 'relationism', "Newton's bucket", 'absolute space', 'hole argument', 'Leibniz–Clarke correspondence', "Mach's principle"],
    tags: ['physics', 'space'],
    year: 1715,
    body: md`
      ## Newton vs Leibniz
      In the *Principia* (1687) Newton posited **absolute space**. His evidence was a bucket of water: spin it, and the water climbs the walls — even when water and bucket rotate together. The water "knows" it's rotating, relative to space itself.

      Leibniz (through the 1715–16 correspondence with Newton's ally Samuel Clarke) argued space is only a system of **relations** between bodies. His weapon was the principle of sufficient reason and Leibniz's law: if the whole universe were shifted three metres east, nothing would be observably different — so there's no real difference, and absolute space is an empty idea.

      ## Mach and Einstein
      Ernst Mach (1883) suggested the water climbs because it rotates relative to the distant stars. Einstein was inspired by this "Mach's principle", though general relativity (1915) only partly obeys it.

      ## The hole argument
      Einstein nearly abandoned general covariance in 1913 over the **hole argument**; John Earman and John Norton revived it in 1987 as an argument against **substantivalism**: if spacetime points are real things, general relativity becomes indeterministic in a way no observation could detect. Most responses make points' identity depend on the metric field — "sophisticated substantivalism", which looks rather relational.

      In quantum gravity the question gets sharper: loop quantum gravity and some string-theory results suggest spacetime itself may emerge from something more basic.

      ${survey('Spacetime', 'relationism 45%, substantivalism 27%')}
    `,
  }),

  entry('fine-tuning', 'question', SCIENCE, 'curious', 'Fine-Tuning', {
    summary: 'Change several constants of nature slightly and there would be no stars, no chemistry, no life. Design? A multiverse and a selection effect? Brute luck?',
    aliases: ['fine-tuning', 'fine-tuned universe', 'fine-tuning argument', 'cosmological constant problem'],
    tags: ['physics', 'cosmology', 'God'],
    year: 1974,
    body: md`
      ## The claim
      Many physicists argue that life-permitting universes are a tiny region of the space of possible constants:
      - The **cosmological constant** is at least ~120 orders of magnitude smaller than naive quantum field theory estimates; much bigger and matter would fly apart before galaxies formed.
      - Stronger or weaker strong force by a few percent and there'd be little or no hydrogen, or few elements heavier than it (the exact tolerances are debated).
      - Fred Hoyle predicted in 1953 a resonance in carbon-12 at about 7.65 MeV because otherwise stars couldn't make enough carbon — and it was found.

      ## Explanations
      - **Design**: a designer chose the constants for life (the fine-tuning argument for God, a modern design argument).
      - **Multiverse + anthropic selection**: if many universes with different constants exist (as eternal inflation and the string landscape may suggest), observers can only find themselves in life-permitting ones.
      - **Brute fact**: the constants are what they are; there's nothing to explain.
      - **Deeper physics**: a future theory may fix the constants (though it would then need to be "fine-tuned" itself).
      - **Skeptics** question the probabilities: over an infinite range of possible values, there's no well-defined uniform probability to call something "unlikely" (McGrew, McGrew and Vestrup, 2001).

      ${survey('Cosmological fine-tuning', 'brute fact 32%, no fine-tuning 22%, design 17%, multiverse 15%')}
    `,
  }),

  entry('anthropic-principle', 'theory', SCIENCE, 'curious', 'The Anthropic Principle', {
    summary: 'We can only observe a universe compatible with our existence — so our observations are biased by our being here to make them. An obvious truism with surprisingly sharp consequences.',
    aliases: ['anthropic principle', 'weak anthropic principle', 'strong anthropic principle', 'observation selection effect', 'anthropic reasoning', 'observer selection'],
    tags: ['cosmology', 'probability', 'self-location'],
    year: 1973,
    body: md`
      ## Carter's principle (1973)
      At a 1973 symposium for Copernicus' 500th birthday, Brandon Carter argued against over-applying the Copernican principle (we're not special): our location is "necessarily privileged to the extent of being compatible with our existence as observers".

      - **Weak anthropic principle**: we must find ourselves in a time and place where observers can exist. E.g. we find the universe about 13.8 billion years old because it takes billions of years for stars to make carbon.
      - **Strong** version (Carter's, and Barrow and Tipler's stronger readings): the universe must have properties allowing observers at some stage — easily read as teleology.

      ## Uses and abuses
      - Weinberg (1987) used anthropic reasoning to predict a small, positive cosmological constant — about a decade before its discovery in 1998.
      - It explains fine-tuning *only* with a multiverse; with one universe, it just says "if we weren't here we wouldn't be asking".
      - The fishing net: if your net has holes 10 cm wide, you'll conclude all fish are over 10 cm. Observation selection effects are real statistical biases, like survivorship bias.

      Nick Bostrom's *Anthropic Bias* (2002) systematised the reasoning; its two main principles (SSA and SIA) give opposite answers to the doomsday argument and the Sleeping Beauty problem.
    `,
  }),

  entry('doomsday-argument', 'question', SCIENCE, 'curious', 'The Doomsday Argument', {
    summary: 'If you’re a random human among all who’ll ever live, you’re probably not among the very first. With about 117 billion born so far, that seems to predict humanity’s end sooner than we’d like.',
    aliases: ['doomsday argument', 'Carter catastrophe', 'Copernican method', 'self-sampling assumption'],
    tags: ['probability', 'self-location', 'paradox'],
    year: 1983,
    latex: md`N_{\text{total}} < \frac{N_{\text{so far}}}{1 - C} \quad \text{with confidence } C`,
    variables: [
      [md`N_{\text{so far}}`, 'Humans born so far (about 117 billion, Population Reference Bureau)'],
      [md`N_{\text{total}}`, 'Humans who will ever be born'],
      ['C', 'Confidence level, e.g. 95%'],
    ],
    body: md`
      ## The argument
      Brandon Carter (1983), then John Leslie, Richard Gott and Holger Nielsen independently: treat your birth rank as a random draw from all humans who will ever live. With 95% confidence you're not in the first 5%, so the total is at most 20× the number born so far. The Population Reference Bureau estimates roughly 117 billion births ever. So with 95% confidence, fewer than about 2.3 trillion humans will ever be born — at today's roughly 130 million births a year, a bound on the order of 17,000 years, sooner if population grows.

      Gott applied the same "Copernican method" in 1969 to the Berlin Wall (8 years old): 50% confidence it would last between 2⅔ and 24 more years. It fell 20 years later.

      ## What's wrong with it?
      - **Reference class**: random among *what*? Humans? Observers? Anyone who could ponder the argument?
      - **SIA** (self-indication assumption): the very fact that you exist is evidence for more observers, which exactly cancels the doomsday shift. But SIA has its own paradoxes (the "presumptuous philosopher" who dismisses a cosmology because it has fewer observers).
      - It ignores everything else we know about risks — though Bayesians reply it's meant to shift priors, not replace evidence.

      The same logic grounds the simulation argument, the thirder in Sleeping Beauty, and the anthropic principle.
    `,
    calc: {
      inputs: [
        input('born', 'Humans born so far', 'billion', 117, 10, 1000, LOG),
        input('conf', 'Confidence', '%', 95, 50, 99.9),
        input('rate', 'Births per year', 'million', 130, 1, 1000, LOG),
      ],
      outputs: [
        out('Upper bound on all humans ever', 'billion', 'born/(1 - conf/100)', { key: 'total', digits: 4 }),
        out('Still to be born, at most', 'billion', 'total - born', { key: 'left', digits: 4 }),
        out('Years left at this birth rate', 'years', 'left*1e9/(rate*1e6)', { digits: 3 }),
      ],
      note: 'At 50% confidence the bound is only 2× births so far — about 900 years at today’s rate. The argument’s force depends entirely on the reference class.',
    },
  }),

  entry('mathematical-platonism', 'question', SCIENCE, 'curious', 'Are Numbers Real?', {
    summary: 'Are numbers, sets and the Monster group discovered or invented? If they exist outside space and time, how do we know about them — and why does physics run on them?',
    aliases: ['mathematical Platonism', 'mathematical realism', 'formalism', 'intuitionism', 'logicism', 'structuralism', 'indispensability argument', 'unreasonable effectiveness'],
    tags: ['maths', 'realism'],
    year: 1960,
    body: md`
      ## The positions
      - **Platonism**: mathematical objects exist, abstract, outside space and time; mathematicians discover them. Gödel was one; so, in spirit, are most working mathematicians. Hardy: "317 is a prime, not because we think so… but because it *is* so."
      - **Formalism** (Hilbert, in some moods): maths is manipulation of symbols by rules — a game, meaningful or not.
      - **Logicism** (Frege, Russell): maths is logic in disguise. Russell's paradox and Gödel's theorems wounded it.
      - **Intuitionism** (Brouwer): maths is mental construction; a statement is true only when proved, so excluded middle fails for infinite domains.
      - **Structuralism**: maths is about structures and positions in them; "3" is a place in the natural-number pattern, not an object on its own.
      - **Nominalism / fictionalism** (Hartry Field): numbers don't exist; maths is a useful fiction.

      ## The two big arguments
      - **Benacerraf's dilemma** (1973): if numbers are abstract and causally inert, how could we ever know about them? Against Platonism.
      - **Indispensability** (Quine, Putnam): our best physics quantifies over numbers and functions; we should believe in what our best theories need. For Platonism.

      Eugene Wigner's "The Unreasonable Effectiveness of Mathematics in the Natural Sciences" (1960) is the background mystery. Monstrous moonshine — a sporadic finite group turning up in modular functions and string theory — is the kind of surprise that makes discovery feel literal.

      ${survey('Abstract objects', 'nominalism 42%, Platonism 38%')} ${survey('Foundations of mathematics', 'structuralism 21%, constructivism/intuitionism 15%, set-theoretic 15%, logicism 12%, formalism 6%')}
    `,
  }),

  entry('infinity', 'concept', SCIENCE, 'curious', 'Infinity', {
    summary: 'Aristotle allowed only potential infinity — always more, never all. Cantor showed completed infinities exist and come in different sizes. Physics still treats infinities as a warning light.',
    aliases: ['infinity', 'actual infinity', 'potential infinity', "Cantor's diagonal argument", 'diagonal argument', 'uncountable', 'continuum hypothesis', 'countable infinity'],
    tags: ['maths', 'paradox'],
    year: 1891,
    body: md`
      ## Potential vs actual
      Aristotle distinguished **potential** infinity (you can always count further, divide further) from **actual** infinity (a completed infinite totality). He allowed only the first — partly to defuse Zeno. That view dominated for two thousand years; Gauss in 1831 still protested "the use of an infinite magnitude as a completed quantity, which is never permissible in mathematics".

      ## Cantor's paradise
      Georg Cantor (1874, 1891) treated infinite sets as completed objects and compared their sizes by one-to-one matching:
      - The even numbers are "as many" as the natural numbers (match $n \leftrightarrow 2n$) — a part as big as the whole, which Galileo had noticed in 1638 and taken as a reason to give up.
      - The rationals are countable too.
      - The **real numbers are not**: the **diagonal argument** (1891) shows any list of reals misses one. So there are bigger infinities — infinitely many sizes, in fact.

      Is there a size between the naturals and the reals? That's the **continuum hypothesis**. Gödel (1940) and Cohen (1963) showed standard set theory can neither prove nor refute it. Whether it nonetheless has a true answer divides Platonists from others.

      Hilbert defended Cantor: "no one shall expel us from the paradise that Cantor has created". Physics is warier: infinities in a calculation usually signal a breakdown — the ultraviolet catastrophe, singularities, renormalisation. Hilbert's Hotel shows how strange actual infinities are in the physical world.

      ${survey('Continuum hypothesis', 'determinate truth value 38%, indeterminate 29%')}
    `,
  }),

  entry('hilberts-hotel', 'example', SCIENCE, 'curious', "Hilbert's Hotel", {
    summary: 'A hotel with infinitely many rooms, all full, can still take a new guest — and infinitely many new guests. Arithmetic with infinity breaks everyday intuition, and maybe shows actual infinities can’t be physical.',
    aliases: ["Hilbert's hotel", 'Hilbert’s Grand Hotel', 'infinite hotel'],
    tags: ['maths', 'paradox', 'thought experiment'],
    year: 1924,
    body: md`
      ## Check-in
      David Hilbert's 1924 lecture (popularised by George Gamow in 1947): the Grand Hotel has rooms 1, 2, 3, … and every one is occupied.
      - **One new guest**: move everyone from room $n$ to room $n + 1$. Room 1 is free.
      - **A coach with infinitely many new guests**: move everyone from room $n$ to room $2n$. All the odd rooms are free.
      - **Infinitely many coaches, each with infinitely many guests**: put coach $c$'s passenger $p$ in room $2^c 3^p$ (prime factorisations are unique, so no clashes).

      It's a **veridical paradox**: the conclusions are true of infinite sets; our intuitions were trained on finite ones, where "full" means "no room".

      ## Where it gets used
      - The **Kalām cosmological argument** (William Lane Craig) uses Hilbert's Hotel to argue that an **actual** infinite can't exist in reality — so the past can't be infinite, so the universe had a beginning, so it has a cause.
      - Critics reply that the hotel is strange but not contradictory. And if the past could be infinite, what exactly would be absurd about it?

      Cantor's diagonal argument adds the twist: a coach with one passenger for each **real** number could not be accommodated.
    `,
  }),

  entry('emergence', 'concept', SCIENCE, 'curious', 'Emergence', {
    summary: 'Wholes with properties none of their parts have: wetness from H₂O, traffic jams from cars, perhaps minds from neurons. Is emergence just surprise, or something genuinely new?',
    aliases: ['emergence', 'emergent', 'emergent properties', 'weak emergence', 'strong emergence', 'downward causation'],
    tags: ['science', 'reduction'],
    body: md`
      ## Two kinds
      - **Weak emergence**: the whole's behaviour follows from the parts and their interactions, but is hard to predict without simulating it. Conway's Game of Life (1970): four simple rules on a grid produce gliders, guns and even universal computers. Flocking, traffic jams, market crashes and superconductivity are all weakly emergent.
      - **Strong emergence**: the whole has properties *not* even in principle deducible from the parts, with new causal powers acting back down on them — **downward causation**. The British emergentists (C. D. Broad, 1925) thought chemistry might be like this; quantum mechanics then explained chemical bonding, and the case weakened.

      ## The live candidate
      Consciousness is the main candidate for strong emergence: the hard problem says experience can't be deduced from physical facts. But strong emergence with downward causation clashes with the causal closure of physics — the same dilemma as dualism, relocated.

      ## Physics' version
      Philip Anderson's "More Is Different" (1972): at each level of complexity, new properties and laws appear that are as fundamental in their way as particle physics. Symmetry breaking gives crystals rigidity that no single atom has. Anderson was a reductionist about *ontology* (it's all particles) but not about *explanation* — the most useful form of the debate with reductionism.
    `,
  }),

  entry('reductionism', 'theory', SCIENCE, 'curious', 'Reductionism', {
    summary: 'Everything is explained by its parts: biology by chemistry, chemistry by physics. True in one sense, false in another — and “More Is Different” is the classic reply.',
    aliases: ['reductionism', 'reductionist', 'reductive explanation', 'more is different', 'unity of science', 'special sciences'],
    tags: ['science', 'reduction'],
    year: 1972,
    body: md`
      ## Three reductionisms
      - **Ontological**: wholes are nothing over and above their parts. A cell is molecules; there's no extra "life force". Almost everyone now accepts this for biology.
      - **Theory reduction** (Ernest Nagel, 1961): the laws of a higher science can be derived from a lower one plus "bridge laws" — thermodynamics from statistical mechanics (temperature = mean molecular kinetic energy).
      - **Explanatory**: the best explanation is always at the lowest level.

      ## The pushback
      - **Multiple realizability** (Fodor's "Special Sciences", 1974): money can be shells, coins or bank records; economics' laws can't be stated in physics' vocabulary because the categories cut across physical kinds. The same argument that sank the mind–brain identity theory.
      - **"More Is Different"** (Philip Anderson, 1972): being able to reduce everything to simple laws doesn't mean you can start from those laws and rebuild the universe. Emergent levels have their own laws.
      - **Explanatory relevance**: Putnam's peg — a square peg won't fit a round hole of slightly smaller diameter. The explanation is geometry, not the positions of every atom, even though the atoms determine the outcome.

      Reductionism is also a value fight: whether "just" chemistry, "just" neurons, "just" code deflates what matters. Physicalism about the mind is a reductionist bet; the hard problem is its biggest open cheque.
    `,
  }),

  entry('maxwells-demon', 'example', SCIENCE, 'curious', "Maxwell's Demon", {
    summary: 'A tiny being sorts fast molecules from slow ones and seems to beat the second law of thermodynamics. The fix took a century: erasing information costs energy.',
    aliases: ["Maxwell's demon", "Landauer's principle", "Szilard engine", 'information is physical'],
    tags: ['physics', 'information', 'thought experiment'],
    year: 1867,
    latex: md`E_{\min} = k_B T \ln 2 \;\text{ per bit erased}`,
    variables: [
      [md`k_B`, 'Boltzmann’s constant, 1.380649 × 10⁻²³ J/K'],
      ['T', 'Temperature of the surroundings'],
    ],
    body: md`
      ## The demon (1867)
      James Clerk Maxwell imagined a box of gas divided by a wall with a tiny door, and a "being whose faculties are so sharpened" that it can see each molecule. It opens the door for fast molecules going right and slow ones going left. Soon the right side is hot, the left cold — a temperature difference created without work, violating the second law. You could run an engine on it forever.

      ## A century of fixes
      - **Szilard** (1929): a one-molecule engine. He argued the demon's measurement must cost at least $k_B T \ln 2$ of entropy.
      - **Landauer** (1961) and **Bennett** (1982): measurement can in principle be free; the unavoidable cost is **erasing** the demon's memory to make room for new measurements. Erasing one bit dissipates at least $k_B T \ln 2$. The demon's notebook fills up, and wiping it pays back all the entropy it saved.
      - **Experiment**: Landauer's bound was measured in 2012 (Bérut and colleagues) with a single colloidal bead in a laser trap.

      ## The philosophy
      "Information is physical" (Landauer). The demon ties thermodynamics, computation and knowledge together, and it's a case study in thought experiments: it seemed to refute a law, then showed what the law really says. Today's chips still use thousands to millions of times more energy per bit operation than the Landauer limit.
    `,
    calc: {
      inputs: [input('T', 'Temperature', 'K', 300, 1, 10000, LOG)],
      outputs: [
        out('Minimum energy to erase one bit', 'J', 'kB*T*ln(2)', { key: 'bit', digits: 4 }),
        out('Same, in electron-volts', 'eV', 'bit/eV', { digits: 4 }),
        out('Minimum to erase one gigabyte (8 × 10⁹ bits)', 'J', 'bit*8e9', { digits: 4 }),
        out('Bits a 15 Wh phone battery could erase at the limit', '', '15*3600/bit', { digits: 3 }),
      ],
      note: 'At room temperature a bit costs at least 2.9 × 10⁻²¹ J. Cooling the surroundings lowers the price.',
    },
  }),
];
