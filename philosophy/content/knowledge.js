// Knowledge & Doubt: what knowing is, whether we can do it, and reasoning with probabilities.

import { AREA, entry, input, INT, LOG, md, out, survey } from './helpers.js';

const { KNOW } = AREA;

export const KNOWLEDGE_ENTRIES = [
  entry('justified-true-belief', 'concept', KNOW, 'curious', 'Justified True Belief', {
    summary: 'The classic analysis: you know something when you believe it, it’s true, and you have good reason for it. It stood for centuries — until three pages in 1963.',
    aliases: ['justified true belief', 'analysis of knowledge', 'epistemic justification'],
    tags: ['foundations', 'knowledge'],
    year: -369,
    body: md`
      ## Three conditions
      In Plato's *Theaetetus* (c. 369 BCE) Socrates tests the idea that knowledge is "true belief with an account" (*logos*). The modern version:

      $S$ knows that $P$ if and only if (1) $P$ is true, (2) $S$ believes $P$, and (3) $S$ is **justified** in believing $P$.

      - **Truth**: you can't know the Earth is flat, only believe it.
      - **Belief**: if you don't accept $P$, you don't know it.
      - **Justification**: a lucky guess that turns out true isn't knowledge.

      ## The trouble
      Each condition looks necessary. Gettier cases show the three together aren't sufficient: you can be justified, believe, and be right — by luck. Fixes include adding "no false lemmas", requiring **reliable** processes (reliabilism), **safety** (you couldn't easily have been wrong) or **virtue** (you got it right *because of* skill). Timothy Williamson flipped the project: knowledge is basic and can't be analysed; justification should be explained in terms of it.

      The Nyāya school had met the problem centuries earlier: a belief can be true by accident when it rests on a flawed means of knowing — see pramāṇa.

      ${survey('Epistemic justification', 'externalism 51%, internalism 36%')}
    `,
  }),

  entry('gettier-cases', 'example', KNOW, 'curious', 'Gettier Cases', {
    summary: 'Justified, true, believed — and still not knowledge, because you were right by luck. Edmund Gettier’s three-page paper from 1963 is the most famous short paper in philosophy.',
    aliases: ['Gettier case', 'Gettier problem', 'Gettier example', 'epistemic luck'],
    tags: ['knowledge', 'thought experiment'],
    year: 1963,
    body: md`
      ## The case
      Smith and Jones apply for a job. Smith has strong evidence that Jones will get it, and he has counted ten coins in Jones's pocket. So he infers: *the man who gets the job has ten coins in his pocket.* In fact Smith gets the job — and, unknown to him, Smith also has ten coins in his pocket. His belief is justified, true, and believed. Did he *know*? Almost everyone says no.

      ## Cleaner versions
      - **The stopped clock** (Russell, 1948): you glance at a clock that stopped exactly twelve hours ago. It shows the right time. Justified, true — not knowledge.
      - **Fake barns** (Goldman, 1976): driving through a county full of barn façades, you happen to look at the one real barn and think "that's a barn".
      - **Dharmottara**, an 8th-century Buddhist philosopher, had the same idea: a thirsty traveller sees a mirage and concludes there is water ahead — and there is, hidden under a rock. Right, reasonable, and not knowledge.

      ## Why it lasted
      Every proposed fourth condition met new counter-examples, a cycle that ran for decades. Gettier cases are also a test for experimental philosophy: studies across many languages and cultures (Machery and colleagues, 2017) found people widely share the intuition that these aren't knowledge.
    `,
  }),

  entry('skepticism', 'theory', KNOW, 'curious', 'Philosophical Skepticism', {
    summary: 'The challenge that we know much less than we think — perhaps nothing at all about the world outside our minds. Ancient skeptics found the doubt itself brought calm.',
    aliases: ['skepticism', 'scepticism', 'skeptic', 'sceptic', 'Pyrrhonism', 'Pyrrhonian', 'external-world skepticism'],
    tags: ['knowledge'],
    year: -330,
    body: md`
      ## Ancient skepticism
      **Pyrrho** of Elis (c. 360–270 BCE) travelled with Alexander to India, and reportedly came back teaching that things are undecidable, so one should suspend judgement — and that doing so brings *ataraxia*, tranquillity. Sextus Empiricus (c. 200 CE) wrote the manual: for every argument there is an equally strong counter-argument; suspend judgement; peace follows "as a shadow follows a body". Many scholars see parallels with Buddhist thinkers Pyrrho may have met.

      **Agrippa's trilemma**: any justification either goes on forever, circles back, or stops at an unjustified assumption. That is the regress behind foundationalism.

      ## Modern skepticism
      Descartes' evil demon and the brain in a vat give the modern form:
      1. If you know you have hands, you know you're not a handless brain in a vat.
      2. You don't know you're not a brain in a vat.
      3. So you don't know you have hands.

      Replies: Moore runs it backwards ("I know I have hands, so I'm not a brain in a vat"); **contextualists** say "know" shifts standards with conversation; **externalists** say knowledge needs reliable contact with the world, not proof you have it; Putnam argued a brain in a vat couldn't even *think* "I am a brain in a vat" meaningfully.

      ${survey('External world', 'non-skeptical realism 80%, idealism 7%, skepticism 5%')}
    `,
  }),

  entry('cogito', 'concept', KNOW, 'curious', 'Cogito, Ergo Sum', {
    summary: '"I think, therefore I am." Doubt everything and one thing survives: the doubting. Descartes’ attempt to rebuild knowledge on a single certainty.',
    aliases: ['cogito', 'cogito ergo sum', 'I think, therefore I am', 'method of doubt', 'Cartesian doubt'],
    tags: ['knowledge', 'self'],
    year: 1637,
    body: md`
      ## The foundation
      Descartes wanted a science built on certainty, so he resolved to doubt everything that could be doubted: the senses deceive, he might be dreaming, an evil demon might be feeding him illusions, even about mathematics. But while he doubts, he is thinking — and to think, he must exist. "Je pense, donc je suis" appears in the *Discourse on Method* (1637); in the *Meditations* (1641) it becomes "I am, I exist, is necessarily true whenever I put it forward".

      ## Objections
      - **Lichtenberg** (18th century): all you're entitled to is "there is thinking" — like "it is raining". The "I" is smuggled in. Hume and the Buddhist no-self view agree.
      - **Is it an inference?** If it's "everything that thinks exists; I think; so I exist", the first premise needs proof. Many read it as a direct intuition instead.
      - **Getting out**: from the cogito Descartes rebuilds the world only via a proof of a non-deceiving God, and the "Cartesian circle" charge says he used clear-and-distinct perception to prove God and God to vouch for clear-and-distinct perception.

      Avicenna's "floating man", six centuries earlier, reached a similar self-awareness by a different route. And the cogito's certainty about one's own mind is where the mind–body split in Cartesian dualism begins.
    `,
  }),

  entry('evil-demon', 'example', KNOW, 'curious', 'The Evil Demon and the Brain in a Vat', {
    summary: 'What if a powerful deceiver — or a supercomputer wired to your brain in a vat — were feeding you every experience you have? Nothing you could see would tell.',
    aliases: ['evil demon', 'evil genius', 'brain in a vat', 'brains in vats', 'dream argument'],
    tags: ['knowledge', 'thought experiment'],
    year: 1641,
    body: md`
      ## Three escalating doubts
      In the first *Meditation* (1641) Descartes doubts: (1) the senses, which sometimes deceive; (2) whether he is awake at all — dreams feel real while you're in them; (3) even arithmetic, if "some malicious demon of the utmost power and cunning" is deceiving him. The demon is a tool to find what can't be doubted — the cogito.

      Hilary Putnam modernised it in 1981: a scientist removes your brain, keeps it alive in a vat, and feeds it electrical signals exactly like those from a body walking around. *The Matrix* (1999) is the film; the simulation argument is the statistics.

      ## Putnam's twist
      Putnam argued the vat hypothesis defeats itself. Words refer to what they are causally connected to (semantic externalism, as in Twin Earth). A vat-brain's word "vat" is connected to vat-*images*, not vats — so when it thinks "I am a brain in a vat", it says something false. Critics reply that this at most shows the thought can't be expressed, not that it's false.

      ## Much older
      Zhuangzi woke from dreaming he was a butterfly and wondered if he was now a butterfly dreaming he was Zhuangzi; the Advaita notion of māyā and the Yogācāra "mind-only" school ask whether the world outside experience is what it seems.
    `,
  }),

  entry('rationalism', 'theory', KNOW, 'curious', 'Rationalism', {
    summary: 'Some of our most important knowledge comes from reason alone, not the senses — maths, logic, perhaps God and the self. Descartes, Spinoza and Leibniz.',
    aliases: ['rationalism', 'rationalist', 'innate ideas', 'clear and distinct'],
    tags: ['knowledge', 'history'],
    body: md`
      ## The claim
      Rationalists hold that reason can discover substantial truths about reality without experience, and that some concepts are **innate**. Plato's *Meno* has an untaught slave boy "recollect" a geometry proof; Descartes finds the idea of God and of the self by reason; Leibniz calls the mind not a blank slate but a block of marble veined in the shape of a statue.

      ## The continental trio
      - **Descartes** (1596–1650): certainty through clear and distinct ideas, starting from the cogito.
      - **Spinoza** (1632–1677): ethics laid out like Euclid, with definitions, axioms and proofs, ending in God-or-Nature.
      - **Leibniz** (1646–1716): the principle of sufficient reason, necessary vs contingent truths, and this as the best of all possible worlds.

      ## Why it's attractive
      Maths seems known *a priori* and yet describes the world with eerie precision — Wigner's "unreasonable effectiveness". Physics runs partly on symmetry arguments done at a desk. And Chomsky's argument that children learn grammar from too little data revived innate structure for the 20th century.

      Rationalism is in tension with empiricism; Kant thought both were half right: concepts without intuitions are empty, intuitions without concepts are blind.

      ${survey('Knowledge', 'empiricism 44%, rationalism 34%')}
    `,
  }),

  entry('empiricism', 'theory', KNOW, 'curious', 'Empiricism', {
    summary: 'All our ideas and knowledge of the world come from experience. The mind starts as a blank slate. Locke, Berkeley and Hume — and, in spirit, modern science.',
    aliases: ['empiricism', 'empiricist', 'tabula rasa', 'blank slate', 'British empiricists'],
    tags: ['knowledge', 'history'],
    year: 1689,
    body: md`
      ## The claim
      "Nothing is in the intellect that was not first in the senses." In *An Essay Concerning Human Understanding* (1689) John Locke argued there are no innate ideas: the mind begins as "white paper", and all ideas come from sensation and reflection.

      ## Pushed to the limit
      - **Locke**: ideas come from experience, but they are caused by a material world with real primary qualities (shape, motion) and mind-dependent secondary ones (colour, taste).
      - **Berkeley** (1710): if all we meet are ideas, why posit matter at all? *To be is to be perceived* — idealism.
      - **Hume** (1739): even cause and effect is just constant conjunction plus habit; the self is a bundle of perceptions; and induction has no rational justification. Empiricism, followed honestly, ends near skepticism.

      ## After Hume
      Kant's answer was that experience needs a structure the mind supplies. The logical positivists of the 1920s–30s revived a strict empiricism — meaningful claims must be verifiable — and it collapsed under its own weight. Science today is empiricist in method and rationalist in its love of mathematics.

      In India, the Cārvāka school was even more thoroughgoing: only perception counts, and inference is never certain.
    `,
  }),

  entry('a-priori', 'concept', KNOW, 'curious', 'A Priori and A Posteriori', {
    summary: 'A priori knowledge is known without checking the world (7 + 5 = 12, all bachelors are unmarried); a posteriori knowledge needs experience (water boils at 100 °C at sea level).',
    aliases: ['a priori', 'a posteriori', 'priori knowledge', 'empirical knowledge'],
    tags: ['knowledge', 'foundations'],
    body: md`
      ## The distinction
      - **A priori**: justified independently of experience (beyond whatever experience you needed to grasp the words). Logic, maths, "nothing is red and green all over".
      - **A posteriori**: justified by experience. The boiling point of water, the charge of the electron, who won the 2011 World Cup.

      It's about how a belief is **justified**, not how you came to have it — you may have learned Pythagoras from a teacher, but you can check the proof without looking at triangles.

      ## Three distinctions that don't line up
      Kant (1781) crossed a priori/a posteriori with **analytic/synthetic** and claimed there is *synthetic a priori* knowledge: geometry, arithmetic, "every event has a cause". Kripke (1970) crossed it with **necessary/contingent**: "water is H₂O" is necessary but known a posteriori; "the standard metre is one metre long" is contingent but, he argued, known a priori.

      ## Does a priori knowledge exist?
      Quine said no: everything, even logic, is revisable in light of experience — quantum logic was once proposed for exactly that. Most philosophers disagree.

      ${survey('A priori knowledge', 'yes 73%, no 18%')}
    `,
  }),

  entry('analytic-synthetic', 'concept', KNOW, 'curious', 'Analytic and Synthetic', {
    summary: 'Analytic truths are true by meaning alone ("bachelors are unmarried"); synthetic ones say something about the world. Kant built on the line; Quine tried to erase it.',
    aliases: ['analytic truth', 'synthetic truth', 'analytic-synthetic distinction', 'synthetic a priori', 'Two Dogmas of Empiricism'],
    tags: ['knowledge', 'language'],
    year: 1781,
    body: md`
      ## Kant's version
      In the *Critique of Pure Reason* (1781) a judgement is **analytic** if the predicate is "contained in" the subject ("all bodies are extended") and **synthetic** if it adds something ("all bodies are heavy"). Kant's big claim: some synthetic truths are known a priori — "7 + 5 = 12" (he thought "12" isn't contained in "7 + 5"), Euclidean geometry, and causation. They hold because the mind imposes space, time and causality on experience.

      Non-Euclidean geometry, and Einstein's use of it in general relativity (1915), hurt this: the geometry of space turned out to be an empirical question.

      ## Quine's attack
      "Two Dogmas of Empiricism" (1951) argued the distinction can't be drawn without circularity: "analytic" is explained by "synonymy", synonymy by "necessity", necessity by "analytic"… Instead our beliefs form a **web**, tested against experience as a whole, and any strand can be revised — the Duhem–Quine thesis in epistemology.

      ${survey('Analytic–synthetic distinction', 'yes 62%, no 26%')} Quine lost the vote but changed how the line is drawn.
    `,
  }),

  entry('problem-of-induction', 'question', KNOW, 'curious', 'The Problem of Induction', {
    summary: 'Why expect the future to resemble the past? Any argument that it will seems to assume that it will. Hume’s problem has no universally accepted answer.',
    aliases: ['problem of induction', "Hume's problem", 'uniformity of nature', 'black swan'],
    tags: ['knowledge', 'science'],
    year: 1739,
    body: md`
      ## Hume's argument
      We believe bread will nourish us tomorrow because it has before. But what justifies the step from "all observed" to "the next"?
      - Not **deduction**: there's no contradiction in the sun failing to rise.
      - Not **induction** — "induction has worked so far" is itself an inductive argument, so it's circular.

      So, says Hume (*Treatise*, 1739; *Enquiry*, 1748), our expectation rests on **custom or habit**, not reason. Russell's version: the chicken fed every day by the farmer, "more refined views as to the uniformity of nature would have been useful to the chicken" — the day the farmer wrings its neck.

      ## Responses
      - **Popper**: science doesn't use induction; it makes bold conjectures and tries to falsify them.
      - **Bayesians**: update probabilities by Bayes' theorem — but you need priors, and the problem returns as "why these priors?".
      - **Pragmatic** (Reichenbach): if *any* method works, induction does; so it's the best bet.
      - **Strawson**: asking for induction to be justified by deduction is a confusion; being inductively supported is part of what "reasonable" means.
      - Goodman's **grue** shows the problem is worse: even which regularities to project is unclear.

      Centuries earlier, the Cārvāka school in India rejected inference on almost the same grounds: you can never survey every case of smoke to know it always comes with fire.
    `,
  }),

  entry('grue', 'example', KNOW, 'curious', 'Grue: The New Riddle of Induction', {
    summary: 'Every emerald seen so far is green — and also "grue" (green if first seen before 2030, blue after). The same evidence supports both predictions. Why project "green"?',
    aliases: ['grue', 'new riddle of induction', 'bleen', 'projectible'],
    tags: ['knowledge', 'science', 'thought experiment'],
    year: 1955,
    body: md`
      ## The riddle
      Nelson Goodman (*Fact, Fiction, and Forecast*, 1955) defined: an object is **grue** if it is first observed before some future time $T$ (say 2030) and is green, or not observed before $T$ and is blue.

      Every emerald ever examined is green. It is equally true that every emerald ever examined is grue. By the same inductive rule, we should predict both that emeralds examined after 2030 will be green and that they will be grue — i.e. blue. The evidence can't choose.

      ## "But grue is gerrymandered"
      The natural reply is that "grue" mentions a time and "green" doesn't. Goodman's comeback: define **bleen** (blue before $T$, green after). Then *green* = grue before $T$, bleen after. From the grue-speaker's side, *our* word is the one with the time in it. Nothing in the logic favours green.

      ## What it shows
      Induction needs a prior choice of **projectible** predicates. Goodman said we project terms that are "entrenched" — used successfully before. Quine linked it to **natural kinds**. Machine learning meets the same wall as the "no free lunch" theorems: every learner needs an inductive bias, because the data alone never decide how to generalise.
    `,
  }),

  entry('bayes-theorem', 'equation', KNOW, 'curious', "Bayes' Theorem", {
    summary: 'How much to believe a hypothesis after seeing evidence: prior belief times how well the hypothesis predicted the evidence, rescaled. Most people ignore the prior — the base-rate fallacy.',
    aliases: ["Bayes' theorem", 'Bayes theorem', 'Bayesian', 'Bayesianism', 'base rate', 'base-rate fallacy', 'prior probability', 'posterior probability', 'credence'],
    tags: ['probability', 'knowledge', 'science'],
    year: 1763,
    latex: md`P(H \mid E) = \frac{P(E \mid H)\, P(H)}{P(E \mid H)\,P(H) + P(E \mid \lnot H)\,P(\lnot H)}`,
    variables: [
      [md`P(H)`, 'Prior: how likely the hypothesis was before the evidence'],
      [md`P(E \mid H)`, 'How likely the evidence is if the hypothesis is true'],
      [md`P(E \mid \lnot H)`, 'How likely the evidence is if it is false'],
      [md`P(H \mid E)`, 'Posterior: how likely the hypothesis is now'],
    ],
    body: md`
      ## The rule
      Thomas Bayes' essay, published after his death in 1763, and Laplace's independent version (1774) give the rule for updating beliefs. In odds form it's even simpler: **posterior odds = prior odds × likelihood ratio**.

      ## The classic trap
      A disease affects 1% of people. A test catches 90% of cases and wrongly flags 9% of healthy people. You test positive. Chance you're ill? Most people — including many doctors in Gigerenzer's studies — say around 90%. The answer is about **9%**: out of 1,000 people, 9 sick people test positive and about 89 healthy ones do too. Ignoring the 1% prior is the **base-rate fallacy**.

      ## Bayesian epistemology
      Treat beliefs as **credences** between 0 and 1, and learn by conditioning. It explains why surprising predictions confirm a theory strongly (Popper's point, in numbers), why extraordinary claims need extraordinary evidence (Hume on miracles), and it makes the Monty Hall problem and the raven paradox tractable. Its soft spot is the prior: where do the first numbers come from? And Sleeping Beauty shows that even conditioning can be ambiguous when you're unsure *when* you are.
    `,
    calc: {
      inputs: [
        input('prior', 'Prior: how common is it', '%', 1, 0.01, 99, LOG),
        input('hit', 'Chance the evidence appears if true', '%', 90, 1, 100),
        input('fp', 'Chance it appears anyway if false', '%', 9, 0.01, 99, LOG),
      ],
      outputs: [
        out('Posterior probability', '%', 'hit*prior/(hit*prior + fp*(100 - prior))*100', { digits: 3 }),
        out('Likelihood ratio', '×', 'hit/fp', { digits: 3 }),
        out('Of 1,000 people: true positives', '', '1000*prior/100*hit/100', { digits: 3 }),
        out('Of 1,000 people: false positives', '', '1000*(1 - prior/100)*fp/100', { digits: 3 }),
      ],
      note: 'Even a good test mostly flags healthy people when the condition is rare. Raise the prior to 10% and watch the posterior jump.',
    },
  }),

  entry('monty-hall', 'example', KNOW, 'curious', 'The Monty Hall Problem', {
    summary: 'Pick one of three doors; the host, who knows where the car is, opens a goat door and offers a switch. Switching wins two-thirds of the time — a veridical paradox that fooled mathematicians.',
    aliases: ['Monty Hall problem', 'Monty Hall', 'three doors problem'],
    tags: ['probability', 'paradox'],
    year: 1975,
    body: md`
      ## Why switching wins
      Your first pick is right 1 time in 3. The host *always* opens a goat door you didn't pick, so his action carries information about the other doors but none about yours. If you were wrong (2 times in 3), the car is behind the one remaining door. So **switch wins 2/3, stay wins 1/3**.

      Make it 100 doors: you pick one, the host opens 98 goat doors, leaving yours and one other. Stick with your 1-in-100 guess?

      ## The fuss
      Steve Selvin posed it in 1975. When Marilyn vos Savant gave the right answer in *Parade* magazine in 1990, she received thousands of letters, many from PhD mathematicians, telling her she was wrong. Paul Erdős reportedly remained unconvinced until he saw a computer simulation.

      ## The fine print
      The answer depends on the host's **rule**. If he opens a random door and it happens to show a goat, switching and staying are 50–50. Bayes' theorem makes this exact: what matters is how likely the evidence (this door opened) was under each hypothesis. The same point decides the Sleeping Beauty problem and the doomsday argument — how you came to see your evidence is part of the evidence.
    `,
    calc: {
      inputs: [
        input('n', 'Doors', '', 3, 3, 100, INT),
        input('k', 'Goat doors the host opens', '', 1, 1, 98, INT),
      ],
      outputs: [
        out('Doors actually opened', '', 'min(k, n - 2)', { key: 'kk', digits: 3 }),
        out('Win if you stay', '%', '100/n', { digits: 3 }),
        out('Win if you switch (to one of the rest)', '%', '100*(n - 1)/(n*(n - 1 - kk))', { digits: 3 }),
      ],
      note: 'With 100 doors and 98 opened, switching wins 99%. The host can open at most n − 2 doors.',
    },
  }),

  entry('foundationalism', 'theory', KNOW, 'curious', 'Foundationalism and Coherentism', {
    summary: 'If every belief needs a reason, the reasons run forever, circle, or stop. Foundationalists stop at basic beliefs; coherentists say beliefs support each other like a web.',
    aliases: ['foundationalism', 'foundationalist', 'coherentism', 'coherentist', 'regress problem', "Agrippa's trilemma", 'Münchhausen trilemma', 'infinitism'],
    tags: ['knowledge'],
    body: md`
      ## The regress
      Ask "why do you believe that?" and then ask it of the answer. Agrippa (1st century CE) noted only three endings: an **infinite** chain, a **circle**, or a **stopping point** with no further reason. The German philosopher Hans Albert later called it the Münchhausen trilemma, after the baron who pulled himself out of a swamp by his own hair.

      ## The options
      - **Foundationalism** — some beliefs are basic: self-evident, incorrigible, or directly perceived ("I seem to see red"). Descartes' cogito is the classic foundation. Worry: can a thin foundation support everything?
      - **Coherentism** — no belief is basic; justification is membership in a coherent system. Otto Neurath's image: we are sailors rebuilding our ship at sea, plank by plank, never able to put into dock. Worry: a coherent fairy tale would count as justified.
      - **Infinitism** (Peter Klein) — the chain really is infinite, and that's fine.
      - **Reliabilism** — sidesteps the trilemma: a belief is justified if produced by a reliable process, whether or not you can cite reasons.

      ${survey('Justification', 'reliabilism 34%, foundationalism 25%, coherentism 24%, infinitism 2%')}

      Buddhist epistemologists (Dignāga, Dharmakīrti) took perception as foundational but momentary and pre-conceptual — a foundation that is barely a belief at all.
    `,
  }),

  entry('sleeping-beauty', 'question', KNOW, 'curious', 'The Sleeping Beauty Problem', {
    summary: 'Beauty is woken once if a coin lands heads, twice (with memory wiped) if tails. On waking, how confident should she be that it landed heads? ½ or ⅓ — nobody agrees.',
    aliases: ['Sleeping Beauty problem', 'Sleeping Beauty', 'halfer', 'thirder', 'self-locating belief'],
    tags: ['probability', 'paradox', 'self-location'],
    year: 2000,
    body: md`
      ## The set-up
      On Sunday Beauty is put to sleep and a fair coin is tossed. Heads: she's woken on Monday only. Tails: she's woken Monday *and* Tuesday, with Monday's memory erased. Each waking feels identical. When she wakes, what should her credence be that the coin landed heads?

      ## Two camps
      - **Halfers** (David Lewis): she learned nothing new — she knew she'd wake at least once. The coin is fair, so ½.
      - **Thirders** (Adam Elga, who published the problem in 2000): run it many times; one-third of all wakings are heads-wakings. And if she bets on heads at every waking at even odds, she loses money on average. So ⅓.

      Each side has sharp arguments. The disagreement is about **self-locating belief** — not "what is the world like?" but "where and when am I in it?" — which ordinary Bayes' theorem wasn't built for.

      ${survey('Sleeping Beauty', 'one-third 28%, one-half 19%, and 54% chose neither or had no view')}

      ## Why it matters
      The same question drives the doomsday argument, the anthropic principle, the simulation argument and the many-worlds interpretation, where "which branch am I in?" is a Sleeping Beauty question. Make tails wake her a million times and the thirder's answer becomes the heart of cosmology's measure problem.
    `,
    calc: {
      inputs: [input('n', 'Wakings if tails', '', 2, 1, 1000000, { ...LOG, ...INT })],
      outputs: [
        out('Halfer’s credence in heads', '%', '50', { digits: 3 }),
        out('Thirder’s credence in heads', '%', '100/(1 + n)', { digits: 4 }),
        out('Avg winnings per experiment, ₹100 on heads at every waking (even odds)', '₹', '0.5*100 - 0.5*100*n'),
      ],
      note: 'Crank the tails wakings up to a million. The halfer still says ½; the thirder is nearly certain of tails.',
    },
  }),

  entry('testimony', 'concept', KNOW, 'curious', 'Knowing from Others', {
    summary: 'Almost everything you know — your birthday, that the Earth orbits the Sun — you know because someone told you. When is taking someone’s word knowledge?',
    aliases: ['testimony', 'epistemology of testimony', 'epistemic trust', 'epistemic injustice'],
    tags: ['knowledge', 'society'],
    year: 1764,
    body: md`
      ## Reductionists and anti-reductionists
      - **Hume**: trust testimony only as far as experience has shown testimony of that kind to be reliable. Testimony is reducible to perception, memory and induction.
      - **Thomas Reid** (1764): we have a natural "principle of credulity" to trust others, matched by a "principle of veracity" to tell the truth. Testimony is a basic source, like perception — a child couldn't check enough cases to build trust Hume's way.

      ## India got there first
      Nyāya counted **śabda** (the word of a reliable person) as its own pramāṇa, a means of knowledge not reducible to inference; Buddhists and Vaiśeṣikas disagreed and reduced it to inference, reproducing the Hume–Reid debate centuries earlier.

      ## Live versions
      - **Epistemic injustice** (Miranda Fricker, 2007): discounting someone's word because of prejudice about who they are wrongs them *as a knower*.
      - **Experts and laypeople**: how can you tell a real expert if you can't judge the subject? Look at track records, consensus, conflicts of interest.
      - **AI answers**: is an LLM a testifier, an instrument like a thermometer, or neither? It gives confident assertions without having beliefs — a new problem for the epistemology of testimony, and a reason to keep your own question list and check.
    `,
  }),

  entry('moores-hand', 'example', KNOW, 'curious', 'Here Is One Hand', {
    summary: 'G. E. Moore held up his hands and said: here is one hand, here is another, so external things exist. Is that a proof, a joke, or the only sane reply to skepticism?',
    aliases: ['here is one hand', "Moore's hand", "Moore's proof", 'Moorean', "Moore's paradox"],
    tags: ['knowledge', 'common sense'],
    year: 1939,
    body: md`
      ## The "proof"
      In a 1939 British Academy lecture, "Proof of an External World", G. E. Moore gestured and said: "Here is one hand", and "here is another". So at least two external objects exist. The premises are true, he knew them, and the conclusion follows. What more could a proof need?

      ## Why it isn't silly
      Moore's point is about **comparative certainty**. The skeptic's premises ("you can't rule out dreaming", "knowledge needs certainty") are philosophical claims. "I have hands" is more certain than any of them. So when an argument concludes you don't know you have hands, reject a premise — modus tollens instead of modus ponens.

      Wittgenstein, in his last notes (*On Certainty*), argued that "I have hands" isn't something known or doubted at all: it is a **hinge** on which the door of inquiry turns. Doubting it isn't careful — it's losing the rules of the game.

      ## Moore's paradox
      Moore also noticed that "it's raining, but I don't believe it's raining" is absurd to *say* — though it could perfectly well be true. The gap between what's true and what's assertable reappears in the surprise exam paradox and in thinking about self-knowledge.
    `,
  }),
];
