// Reality & Metaphysics: what exists, what things are, identity, free will, causation, time.

import { AREA, entry, input, LOG, md, out, survey } from './helpers.js';

const { REAL } = AREA;

export const REALITY_ENTRIES = [
  entry('ontology', 'concept', REAL, 'curious', 'Ontology', {
    summary: 'The study of what exists — and what it takes for something to exist at all. Numbers? Holes? Properties? Fictional detectives?',
    aliases: ['ontology', 'ontological commitment', 'On What There Is'],
    tags: ['foundations'],
    year: 1948,
    body: md`
      ## Two questions
      Ontology asks **what there is** and **what kinds of thing** there are. The first sounds trivial — Quine's answer in "On What There Is" (1948) was one word, "everything" — but the fights are over the details: do numbers, properties, possible worlds, events, holes, or Sherlock Holmes exist?

      ## Quine's test
      "To be is to be the value of a variable." Write your best theory in predicate logic; you are committed to whatever your quantifiers must range over for the theory to be true. If physics needs $\exists x\,(x \text{ is a number} \ldots)$, you're committed to numbers — the Quine–Putnam **indispensability argument** for mathematical Platonism.

      ## Different styles
      - **Deflationists** (Carnap): "do numbers exist?" is either trivially yes inside mathematics or meaningless outside any framework.
      - **Heavyweights**: there's a fact of the matter about what *really* exists, beyond how we talk.
      - **Grounding** theorists ask not just what exists but what depends on what — the "layered" world of physics, chemistry, biology, minds.

      Indian schools argued similar lists. Vaiśeṣika sorted everything into six (later seven) categories — substance, quality, action, universal, particularity, inherence, and absence — and Buddhists replied that only momentary events are ultimately real.

      ${survey('Metaontology', 'heavyweight realism 39%, deflationary realism 28%, anti-realism 12%')}
    `,
  }),

  entry('being-becoming', 'concept', REAL, 'curious', 'Being and Becoming', {
    summary: 'Heraclitus: everything flows, you can’t step in the same river twice. Parmenides: change is impossible, what is simply is. Western metaphysics starts with this argument.',
    aliases: ['being and becoming', 'panta rhei', 'everything flows', 'same river twice', 'flux', 'Eleatic'],
    tags: ['history', 'change'],
    year: -500,
    body: md`
      ## Heraclitus of Ephesus (c. 500 BCE)
      Reality is **flux**: fire, strife, the unity of opposites. "Upon those who step into the same rivers, different and again different waters flow." The world keeps its shape by constant change — like a flame, or a river, whose identity *is* a pattern of flow. The underlying order is the *logos*.

      ## Parmenides of Elea (c. 475 BCE)
      In a poem, a goddess teaches that "what is, is, and cannot not be". You can't think or speak of what is not; change would require what-is to become what-is-not; so change, plurality and motion are illusions of the senses. Reality is one, eternal, unchanging. His student Zeno's paradoxes defended this.

      ## Everything after
      - **Atomists** split the difference: unchanging atoms (Parmenides) rearranging in the void (Heraclitus).
      - **Plato**: the changing world of the senses copies an unchanging world of Forms.
      - **Buddhist impermanence** is a thoroughgoing Heraclitean view — and the momentariness doctrine goes further than Heraclitus did.
      - **Physics**: the block universe of relativity is oddly Parmenidean — all of spacetime simply *is*, and the flow of time looks like a feature of our perspective. The A-theory vs B-theory debate is this same fight.
    `,
  }),

  entry('forms', 'theory', REAL, 'curious', "Plato's Theory of Forms", {
    summary: 'Behind every beautiful thing is Beauty itself; behind every circle, the perfect Circle. The Forms are eternal, unchanging and more real than the things we see.',
    aliases: ['theory of forms', 'Platonic Forms', 'Platonic Form', 'the Form of the Good', 'Platonic realism'],
    tags: ['history', 'universals'],
    year: -380,
    body: md`
      ## The idea
      Many things are beautiful, but each is beautiful only partly, for a while, from some angle. What makes them all beautiful? Plato's answer: they **participate in** a single Form, Beauty itself, which is perfectly and unchangingly beautiful. No drawn circle is perfectly round; geometry is about the Circle. The Forms are known by reason, not the senses, and the highest is the **Form of the Good**, which Plato compares to the Sun.

      ## Why believe it
      - It explains how different things can share a nature — the problem of universals.
      - It explains how we know necessary truths that no experience shows: we recollect the Forms (the *Meno*).
      - It gives ethics a target: justice itself, not whatever Athens happens to call just.

      ## The objections — starting with Plato's own
      In the *Parmenides* Plato raises the **Third Man**: if large things share Largeness, then the large things plus Largeness share a further Largeness, and so on forever. Aristotle pressed it and brought forms down *into* things: this horse's form is its structure, not a separate object.

      Mathematical Platonism is the modern heir: numbers and sets exist outside space and time, discovered, not invented. So are moral realism's non-natural moral facts. Plato's Cave is his own picture of what learning about the Forms is like.
    `,
  }),

  entry('platos-cave', 'example', REAL, 'curious', "Plato's Cave", {
    summary: 'Prisoners chained in a cave see only shadows on a wall and take them for reality. One escapes, sees the sun, returns — and is mocked. Plato’s picture of education and illusion.',
    aliases: ["Plato's cave", 'allegory of the cave', 'the cave allegory'],
    tags: ['thought experiment', 'knowledge', 'history'],
    year: -375,
    body: md`
      ## The story (Republic, Book VII)
      Prisoners have been chained since childhood facing a wall. Behind them a fire burns, and people carry objects past it, casting shadows. The prisoners name the shadows and compete to predict them; for them, the shadows are all there is.

      One prisoner is freed. The fire hurts his eyes; the objects seem less real than the shadows he knew. Dragged up into daylight, he's first dazzled, then sees reflections, then things, and at last the sun, which makes everything visible. He goes back down to free the others. His eyes, now used to light, fumble in the dark; the prisoners laugh, and say that if anyone tries to lead them up they'll kill him — a clear nod to Socrates.

      ## Reading it
      - **Epistemology**: the levels (shadows → objects → reflections → things → sun) map onto opinion vs knowledge and the Form of the Good.
      - **Education** "is not putting sight into blind eyes" but turning the whole soul toward the light.
      - **Politics**: the philosopher must return to rule, unwillingly — the philosopher king.

      Modern echoes: the brain in a vat, *The Matrix*, and Advaita's māyā, where the everyday world is appearance and liberation is seeing what's real. Some also read it against Plato: whoever escapes the cave gets to tell everyone else what "reality" is.
    `,
  }),

  entry('universals', 'question', REAL, 'curious', 'Universals and Particulars', {
    summary: 'Two red things share something — redness. Is that shared thing real, existing in many places at once? Or only similar particulars and a shared word?',
    aliases: ['problem of universals', 'universals', 'nominalism', 'nominalist', 'tropes', 'trope theory', 'particulars'],
    tags: ['foundations', 'universals'],
    body: md`
      ## The problem
      Two cricket balls are both red and both spherical. **Particulars** are the balls; **universals** are what they share. The ancient question: do universals exist, and how?

      - **Platonic realism**: universals exist apart from things (Plato's Forms — "transcendent").
      - **Aristotelian realism**: universals exist, but only *in* the things that have them ("immanent"); no redness without red things.
      - **Nominalism**: only particulars exist. "Red" is a word we apply to similar things (William of Ockham, 14th century, wielding his razor).
      - **Trope theory**: properties exist but are particular: this ball's redness and that ball's redness are two distinct, exactly resembling tropes.
      - **Conceptualism**: universals are concepts in minds.

      ## The same fight elsewhere
      Nyāya-Vaiśeṣika held universals (*jāti*, like cowness) to be real and eternal, inhering in particulars; Buddhists answered with **apoha**, "exclusion": "cow" means only "not non-cow", so no positive universal is needed. The Chinese logician Gongsun Long's "a white horse is not a horse" plays with the same distinction.

      In physics, every electron is exactly like every other — a strong case for something shared.

      ${survey('Properties', 'immanent universals 21%, transcendent universals 20%, tropes 15%, classes 11%, nonexistent 8%')} ${survey('Abstract objects', 'nominalism 42%, Platonism 38%')}
    `,
  }),

  entry('atomism', 'theory', REAL, 'curious', 'Atomism', {
    summary: 'Everything is made of tiny, uncuttable pieces moving in empty space. Leucippus and Democritus guessed it in the 5th century BCE — about 2,300 years before it was confirmed.',
    aliases: ['atomism', 'atomist', 'atoms and the void', 'Democritus'],
    tags: ['history', 'matter'],
    year: -440,
    body: md`
      ## The Greek atomists
      Leucippus and his student **Democritus** (c. 460–370 BCE) answered Parmenides: change *is* possible if what-is comes in indivisible bits (*atomos*, uncuttable) that rearrange in the **void** — the what-is-not that Parmenides banned. Atoms differ only in shape, size, arrangement and position. "By convention sweet, by convention bitter, by convention hot… in reality atoms and void." Colours and tastes are appearances; this is the first primary/secondary quality distinction.

      Epicurus adopted atomism, added a random **swerve** to atoms to leave room for free will, and used it to argue we shouldn't fear the gods or death. Lucretius' poem *On the Nature of Things* carried it to the Renaissance.

      ## In India
      The **Vaiśeṣika** school developed its own atomism (paramāṇu), with atoms combining in dyads and triads, alongside Jain and Buddhist variants. Unlike Democritus, it had atoms of distinct kinds for earth, water, fire and air.

      ## The long wait
      Dalton's chemistry (1808) revived atoms; Einstein's analysis of Brownian motion (1905) and Perrin's measurements (1908) settled their reality. Then they turned out to be cuttable after all — and the "uncuttable" role passed to quarks and electrons, which quantum field theory treats as excitations of fields rather than tiny balls.
    `,
  }),

  entry('substance-essence', 'concept', REAL, 'curious', 'Substance and Essence', {
    summary: 'A substance is what stands on its own and bears properties; an essence is what something must have to be what it is. Aristotle’s framework ran Western thought for two thousand years.',
    aliases: ['substance', 'essence', 'essentialism', 'hylomorphism', 'matter and form', 'essential property'],
    tags: ['history', 'foundations'],
    year: -350,
    body: md`
      ## Aristotle's picture
      In the *Categories* and *Metaphysics*, the primary beings are **substances** — this horse, this person — which have properties (colour, size, location) but aren't properties of anything else. Some properties are **essential** (being an animal, for Socrates) and some **accidental** (being snub-nosed). Lose an essential one and the thing ceases to exist.

      **Hylomorphism** (matter + form): a bronze statue is bronze (matter) shaped a certain way (form). A living thing's form is its **soul** — not a ghost inside, but its organisation and capacities. That makes Aristotle's view of mind closer to functionalism than to Cartesian dualism.

      ## Later fortunes
      - Descartes kept two substances: thinking and extended — dualism.
      - Spinoza argued there can be only **one** substance: God-or-Nature.
      - Locke called substance a "something, I know not what" holding properties together; Hume and the Buddhists dropped it — things are bundles of qualities.
      - Kripke and Putnam revived essences with science: water's essence is H₂O, discovered a posteriori.
      - Feminist and social critics attack **essentialism** about gender or race: claiming groups have fixed natures has often been politics in disguise.
    `,
  }),

  entry('four-causes', 'concept', REAL, 'curious', "Aristotle's Four Causes", {
    summary: 'To explain a thing, say what it’s made of, what form it has, what produced it, and what it’s for. Modern science kept two of the four.',
    aliases: ['four causes', 'final cause', 'efficient cause', 'formal cause', 'material cause', 'teleology', 'teleological explanation', 'telos'],
    tags: ['history', 'explanation', 'causation'],
    year: -340,
    body: md`
      ## Four answers to "why?"
      Take a bronze statue:
      - **Material** cause — what it's made of: bronze.
      - **Formal** cause — its shape or structure: the form of a runner.
      - **Efficient** cause — what brought it about: the sculptor at work.
      - **Final** cause — what it's for, its *telos*: honouring a victory.

      Aristotle thought natural things have final causes too: teeth grow sharp in front *for* biting; an acorn develops *toward* being an oak.

      ## What happened next
      The scientific revolution threw out final causes in physics: Bacon compared them to "virgins consecrated to God, which bear no offspring". Modern "cause" usually means efficient cause alone.

      But purpose didn't vanish. Darwin explained the *appearance* of design by natural selection, so biologists can say "the heart is for pumping blood" without a designer. Formal causes live on as structure and information — why a crystal or a protein has its shape. And the argument from design is an argument from final causes, which Paley and Aquinas used and Hume criticised.
    `,
  }),

  entry('ship-of-theseus', 'example', REAL, 'curious', 'The Ship of Theseus', {
    summary: 'Replace a ship plank by plank until no original part remains. Same ship? Now build a second ship from the discarded planks. Which one is Theseus’ ship?',
    aliases: ['Ship of Theseus', "Theseus' paradox", "grandfather's axe"],
    tags: ['identity', 'thought experiment', 'paradox'],
    year: 75,
    body: md`
      ## Plutarch's puzzle
      In his *Life of Theseus* (c. 75 CE) Plutarch reports that the Athenians preserved Theseus' ship, replacing rotten timbers one by one, "so that this ship became a standing example among the philosophers" — some saying it stayed the same, some that it did not.

      Hobbes (1655) added the twist: suppose someone kept the old planks and reassembled them. Now there are two ships. The **continuity** one (in the harbour, never out of service) and the **composition** one (all the original parts). Both can't be the original, and each has a claim.

      ## Answers
      - **Continuity wins**: gradual replacement preserves identity, as with a river or your body's cells.
      - **It's a verbal question**: every fact is known; "same ship" just has no sharp answer — like the sorites.
      - **Four-dimensionalism**: objects are "worms" through time; two worms share early stages and later diverge.
      - **Buddhist view**: the ship was only ever a convenient label for a flow of parts — the chariot simile applied to boats.

      It is the warm-up for personal identity and for the teletransporter, where the "planks" are your atoms.
    `,
    calc: {
      inputs: [
        input('r', 'Share of planks replaced each year', '%', 10, 0.5, 90),
        input('t', 'Years', 'years', 20, 1, 200),
      ],
      outputs: [
        out('Original planks remaining (random replacement)', '%', '100*(1 - r/100)^t', { digits: 3 }),
        out('Years until half are original', 'years', 'ln(2)/(-ln(1 - r/100))', { digits: 3 }),
        out('Years until under 1% original', 'years', 'ln(100)/(-ln(1 - r/100))', { digits: 3 }),
      ],
      note: 'Replacing planks at random, some originals survive a very long time. Is the ship "the same" at 50%? 1%? 0%?',
    },
  }),

  entry('personal-identity', 'question', REAL, 'curious', 'Personal Identity', {
    summary: 'What makes you, now, the same person as the child in your old photos? Your body, your memories and character, or some further fact? And does it matter?',
    aliases: ['personal identity', 'psychological continuity', 'memory theory', 'animalism', 'what matters in survival'],
    tags: ['identity', 'self'],
    year: 1694,
    body: md`
      ## The candidates
      - **Body** (or brain, or organism — "animalism"): you are a human animal; you persist as long as it does.
      - **Psychological continuity**: Locke (added to the *Essay* in 1694) said a person extends "as far as consciousness can be extended backwards" — memory. Reid's **brave officer** objection: the old general remembers the young officer, who remembered the boy flogged for stealing apples, but the general doesn't remember the boy — so by Locke he both is and isn't the boy. The fix is overlapping chains of memory, intention and character.
      - **Further fact**: a soul or simple self, all-or-nothing, not reducible to body or mind.
      - **No self**: Hume's bundle theory and the Buddha's anattā.

      ## Parfit's turn
      Derek Parfit (*Reasons and Persons*, 1984) argued, with the teletransporter and cases of brains split between two bodies, that identity is **not what matters**. What matters is psychological connectedness, which comes in degrees. If both halves of your brain survive in two bodies, you don't get *one* survivor — but you're not dead either. Parfit found this liberating: once he stopped believing in a deep further fact about identity, the difference between his own future and other people's seemed smaller, and he cared less about his own death.

      ${survey('Personal identity', 'psychological view 44%, biological view 19%, further-fact view 15%')}
    `,
  }),

  entry('teletransporter', 'example', REAL, 'curious', 'The Teletransporter', {
    summary: 'A machine scans you, destroys you, and builds an exact copy on Mars. Is that travel, or death plus a twin? And what if it forgets to destroy the original?',
    aliases: ['teletransporter', 'teleporter problem', 'teletransportation paradox', 'branch-line case', 'mind uploading'],
    tags: ['identity', 'thought experiment'],
    year: 1984,
    body: md`
      ## Parfit's case
      You step into the teletransporter on Earth. It records the exact state of every cell, destroys your body, and beams the information to Mars, where a replica is built from new matter. The person on Mars has your memories, character and plans, and feels exactly as if they just stepped out of a booth. Did *you* travel?

      Then the **branch-line case**: the machine malfunctions and doesn't destroy you. You're still on Earth; your replica is on Mars. Now it seems clear the Mars person isn't you — so how could they have been you when the original *was* destroyed? Being you shouldn't depend on what happens to someone else.

      ## Where people land
      - **Death**: identity requires physical continuity, and the booth kills you.
      - **Survival**: psychological continuity is what counts; the cause doesn't matter.
      - **Parfit**: "is it me?" may have no answer, and ordinary survival already contains nearly everything that matters — so the booth is "about as good as ordinary survival".

      ${survey('Teletransporter', 'death 40%, survival 35%')} ${survey('Mind uploading', 'death 54%, survival 27%')}

      It is not only science fiction: the questions resurface for brain emulation, and — gently — for sleep, anaesthesia, and the gradual replacement of the atoms in your body.
    `,
  }),

  entry('free-will', 'question', REAL, 'curious', 'Free Will', {
    summary: 'Could you have done otherwise? If every choice is fixed by prior causes — or left to chance — is anyone ever truly responsible? The most-argued question in philosophy.',
    aliases: ['free will', 'freedom of the will', 'libertarian free will', 'hard incompatibilism', 'could have done otherwise'],
    tags: ['free will', 'responsibility'],
    body: md`
      ## The dilemma
      1. If determinism is true, every choice was fixed before you were born.
      2. If indeterminism is true, some choices happen by chance — and chance isn't control either.
      3. Either way, it seems, you aren't the true source of your actions.

      ## The positions
      - **Hard determinism**: determinism is true, so there's no free will. (Spinoza: we think we're free because we're aware of our desires but ignorant of their causes.)
      - **Libertarian free will** (not the political kind): some choices aren't determined, and agents cause them — "agent causation". Kant thought morality requires it.
      - **Compatibilism**: free will doesn't need the ability to break physical law; it needs acting from your own reasons without coercion. Most philosophers take this line.
      - **Hard incompatibilism** (Pereboom): free will is incompatible with determinism *and* indeterminism; drop desert-based blame but keep much of morality.

      ## Evidence and reframing
      Libet's experiment seemed to show brains "decide" before we're aware; its interpretation is now disputed. Frankfurt cases question whether "could have done otherwise" is even the right test. And Indian thought met it through karma: if present acts flow from past ones, where is freedom — the Gītā's answer is to act well without clinging to results.

      ${survey('Free will', 'compatibilism 59%, libertarianism 19%, no free will 11%')}
    `,
  }),

  entry('determinism', 'theory', REAL, 'curious', 'Determinism', {
    summary: 'The state of the world at one time, plus the laws of nature, fixes the state at every later time. There is only one possible future, given the past.',
    aliases: ['determinism', 'deterministic', 'causal determinism', 'hard determinism', 'fatalism'],
    tags: ['free will', 'causation', 'physics'],
    body: md`
      ## The thesis
      Given the complete state of the universe at any moment and the laws of nature, only one future is possible. Laplace's demon is the image: an intellect that knew every position and force could compute everything to come.

      It is not **fatalism** (whatever you do, the outcome is the same). Under determinism what you do still matters — your deliberation is one of the causes.

      ## Is physics deterministic?
      - **Newtonian mechanics**: mostly, though there are odd exceptions (Norton's dome, 2003: a ball balanced on a specially shaped dome can start rolling at an arbitrary time without violating Newton's laws).
      - **Chaos**: deterministic but unpredictable in practice — tiny differences blow up exponentially.
      - **Quantum mechanics**: the Schrödinger equation is deterministic; measurement outcomes seem random. Whether reality is deterministic depends on the interpretation: Bohmian mechanics and many-worlds are deterministic; collapse theories aren't.
      - **Relativity**: the block universe makes the future as real as the past, which some read as a kind of determinism.

      Even genuine randomness wouldn't obviously help free will — a random choice isn't *yours* either. That is why many think compatibilism is the real battleground. Stoics were determinists who embraced it: fate is the rational order of the cosmos.
    `,
  }),

  entry('compatibilism', 'theory', REAL, 'curious', 'Compatibilism', {
    summary: 'Free will and determinism can both be true: you act freely when you act from your own reasons and values, unforced — even if those were caused.',
    aliases: ['compatibilism', 'compatibilist', 'soft determinism', 'reasons-responsiveness'],
    tags: ['free will', 'responsibility'],
    year: 1748,
    body: md`
      ## The classic version
      Hobbes and Hume: freedom is doing what you want without obstruction. The opposite of free isn't *caused*; it's *forced* — chains, a gun to the head, a compulsion. In the *Enquiry* (1748) Hume calls liberty "a power of acting or not acting, according to the determinations of the will".

      ## Sharper versions
      - **Frankfurt** (1971): what matters is whether you endorse your desires — your first-order wants match your second-order wants about which wants to act on. The willing addict and the unwilling addict differ in freedom though both are determined.
      - **Reasons-responsiveness** (Fischer and Ravizza): you're responsible if the mechanism producing your action would have responded to good reasons to do otherwise.
      - **Strawson's "Freedom and Resentment"** (1962): blame and gratitude are *reactive attitudes* built into human relationships; no metaphysical discovery could make us give them up.

      ## The objections
      **Consequence argument** (van Inwagen): if determinism is true, our acts are consequences of the laws and the remote past; we have no control over those; so we have no control over our acts. And the **manipulation** cases: a neuroscientist who designs your desires from birth seems to rob you of freedom, even though you act on your own reasons — how is being designed by the Big Bang different?

      ${survey('Free will', 'compatibilism 59%')} — the clear majority view.
    `,
  }),

  entry('frankfurt-cases', 'example', REAL, 'curious', 'Frankfurt Cases', {
    summary: 'A hidden device would have forced you to choose X — but you choose X on your own, so it never activates. You couldn’t have done otherwise, yet you seem responsible.',
    aliases: ['Frankfurt case', 'Frankfurt-style case', 'principle of alternate possibilities'],
    tags: ['free will', 'thought experiment', 'responsibility'],
    year: 1969,
    body: md`
      ## The case
      Black wants Jones to vote for a candidate. He secretly implants a device in Jones's brain: if Jones shows any sign of deciding to vote the other way, the device will kick in and make him vote Black's way. As it happens, Jones decides entirely on his own to vote as Black wanted. The device does nothing.

      Jones **could not have done otherwise** — the device guaranteed the outcome. But he seems fully responsible: he did it for his own reasons, and the device played no role in what actually happened.

      ## The target
      Harry Frankfurt (1969) aimed at the **principle of alternate possibilities**: you're morally responsible only if you could have done otherwise. If Frankfurt cases work, responsibility depends on the **actual sequence** of causes, not on alternatives — which removes a key premise from arguments that determinism rules out responsibility, and helps compatibilism.

      ## The reply
      Libertarians answer with a dilemma: for the device to know what Jones *will* decide, there must be a reliable prior sign. If the sign determines the decision, the case assumes determinism; if it doesn't, Jones could still have done otherwise at the moment of choice. Fifty years of variations on "Black" followed.
    `,
  }),

  entry('causation', 'concept', REAL, 'curious', 'Causation', {
    summary: 'Hume looked for the necessary connection between cause and effect and found only one thing reliably following another. Is causation in the world, or in how we think?',
    aliases: ['causation', 'cause and effect', 'constant conjunction', 'necessary connection', 'counterfactual theory of causation', 'Humean'],
    tags: ['causation', 'foundations'],
    year: 1739,
    body: md`
      ## Hume's billiard balls
      One ball strikes another; the second moves. We see the first ball's motion, contact, then the second ball's motion. Where is the **necessary connection**? Hume (1739) says we never observe it — only **constant conjunction**: events of this type always follow events of that type. The feeling of necessity is our mind's habit, projected onto the world.

      ## Theories since
      - **Regularity**: cause = regularly followed by. Problem: night regularly follows day but doesn't cause it.
      - **Counterfactual** (Lewis, 1973): $C$ caused $E$ if, had $C$ not happened, $E$ wouldn't have. Problem: pre-emption — two assassins, the backup would have fired if the first missed.
      - **Interventionist** (Pearl, Woodward): $C$ causes $E$ if intervening on $C$ would change $E$ — the logic of randomised trials, and of Judea Pearl's causal diagrams in statistics and AI.
      - **Process**: causation is a physical transfer of energy or momentum.
      - **Russell** (1913): the word should be dropped; physics has differential equations, not causes.

      Buddhist dependent origination treats all things as arising from conditions, with no independent first cause; Aristotle's four causes treat "cause" far more broadly than we do.

      ${survey('Causation', 'counterfactual/difference-making 37%, process 23%, primitive 21%, nonexistent 4%')} ${survey('Laws of nature', 'non-Humean 54%, Humean 31%')}
    `,
  }),

  entry('possible-worlds', 'concept', REAL, 'curious', 'Possible Worlds', {
    summary: 'Talk of what could have been, pictured as a space of complete alternative worlds. Leibniz thought God chose the best one; David Lewis thought they all really exist.',
    aliases: ['possible worlds', 'possible world', 'modal realism', 'counterfactual', 'best of all possible worlds'],
    tags: ['modality'],
    year: 1710,
    body: md`
      ## A tool
      "It's possible that dinosaurs survived" = there is a possible world where they did. "Necessarily 2 + 2 = 4" = in every possible world. This gives modal logic its semantics, and counterfactuals ("if I'd left earlier, I'd have caught the train") their truth conditions: look at the nearest worlds where I left earlier.

      ## What are they?
      - **Leibniz** (*Theodicy*, 1710): possible worlds are ideas in God's mind; God, being good, actualised the best — this is the best of all possible worlds. Voltaire mocked it in *Candide* after the 1755 Lisbon earthquake.
      - **David Lewis** (*On the Plurality of Worlds*, 1986): **modal realism** — every possible world exists as concretely as ours, just not here. "Actual" means only "this one". People responded with what Lewis called "the incredulous stare".
      - **Ersatzism**: worlds are abstract objects — maximal consistent sets of sentences or propositions.
      - **Fictionalism**: worlds are a useful story.

      ## Physics cousins
      The many-worlds interpretation of quantum mechanics and the cosmological multiverse are not Lewis's worlds — they're parts of *our* actual reality, governed by the same laws — but they revive the question of whether "other worlds" can be real.
    `,
  }),

  entry('theories-of-time', 'theory', REAL, 'curious', 'A-Theory and B-Theory of Time', {
    summary: 'Does time really flow, with a special moving "now"? Or are past, present and future all equally real, like places on a map, with "now" as relative as "here"?',
    aliases: ['A-theory', 'B-theory', 'A-series', 'B-series', 'presentism', 'eternalism', 'growing block', 'block universe', 'flow of time', 'unreality of time'],
    tags: ['time', 'physics'],
    year: 1908,
    body: md`
      ## McTaggart's two series (1908)
      - **A-series**: events ordered as past, present, future — and they *change* position: your birthday was future, then present, now past.
      - **B-series**: events ordered as earlier-than and later-than. These relations never change.

      McTaggart argued the A-series is essential to time but contradictory (every event is past, present and future), so **time is unreal**. Few accept the conclusion; everyone uses the distinction.

      ## The views
      - **A-theory / presentism**: only the present exists; the future is open; time really passes.
      - **Growing block**: past and present exist; the future doesn't yet; reality grows.
      - **B-theory / eternalism**: all times exist equally in a **block universe**. "Now" is indexical, like "here". The passage of time is a feature of experience, not the world.

      ## Physics weighs in
      Special relativity has no absolute simultaneity: observers moving differently slice spacetime into "nows" differently. If what exists "now" depended on your walking speed, presentism looks strained — the Rietdijk–Putnam argument. Einstein, consoling a friend's widow in 1955: "the distinction between past, present and future is only a stubbornly persistent illusion." A-theorists answer that physics describes time's geometry, not its passage.

      Dōgen's "being-time" (1240) offered a very different model: each moment *is* the whole of existence.

      ${survey('Time', 'B-theory 38%, A-theory 27%')} ${survey('Temporal ontology', 'eternalism 40%, presentism 18%, growing block 17%')}
    `,
  }),

  entry('time-travel', 'question', REAL, 'curious', 'Time Travel Paradoxes', {
    summary: 'If you went back and stopped your grandfather meeting your grandmother, you’d never be born to go back. Does that make time travel impossible, or just constrained?',
    aliases: ['time travel', 'grandfather paradox', 'bootstrap paradox', 'closed timelike curve'],
    tags: ['time', 'paradox', 'physics'],
    year: 1976,
    body: md`
      ## Physics allows the geometry
      General relativity has solutions with **closed timelike curves** — paths through spacetime that loop back to their own past. Kurt Gödel found one in 1949 (a rotating universe) as a birthday present for Einstein, who was troubled by it. Wormholes and Tipler cylinders are other candidates. None is known to be physically realisable.

      ## The paradoxes
      - **Grandfather**: you go back and prevent your own birth. Then who went back?
      - **Bootstrap**: an old man gives young Shakespeare the plays; Shakespeare publishes them; the old man had read them in an edition… Who wrote them?

      ## David Lewis's answer (1976)
      "The Paradoxes of Time Travel": time travel is consistent if the history is. You *can* kill your grandfather in the sense of having the gun and the skill, but you *won't* — something will stop you (a slip on a banana peel). The past is fixed; you were always part of it. Physicists call this the **Novikov self-consistency principle** (1980s).

      Stephen Hawking proposed a "chronology protection conjecture" (1992): the laws of physics prevent closed timelike curves from forming — "making the universe safe for historians".

      ${survey('Time travel', 'metaphysically possible 42%, impossible 41%')}
    `,
  }),

  entry('something-nothing', 'question', REAL, 'curious', 'Why Is There Something Rather Than Nothing?', {
    summary: 'Leibniz called it the first question we have a right to ask. Is there an answer — God, necessity, physics — or is the world a brute fact?',
    aliases: ['something rather than nothing', 'why anything exists', 'brute fact'],
    tags: ['big questions'],
    year: 1714,
    body: md`
      ## The question
      Leibniz, in "The Principles of Nature and Grace" (1714): "The first question we have a right to ask will be: why is there something rather than nothing? For nothing is simpler and easier than something." Heidegger called it the fundamental question of metaphysics.

      ## Kinds of answer
      - **God**: a necessary being explains why contingent things exist — the cosmological argument, relying on the principle of sufficient reason.
      - **Necessity**: perhaps "nothing" is impossible; some things (numbers? the laws?) couldn't have failed to exist.
      - **Brute fact**: there is no explanation; the chain of whys ends in "it just is". Russell, in his 1948 radio debate with Copleston: "I should say that the universe is just there, and that's all."
      - **Physics**: some claim quantum fields can produce a universe "from nothing" (Krauss, 2012). Critics like David Albert reply that a quantum vacuum, with its laws, is very much *something*.
      - **Probability** (van Inwagen): there's one way for there to be nothing and infinitely many for there to be something, so something is overwhelmingly likely. This assumes a lot.

      Upaniṣadic and Buddhist thought approach it differently: the Nāsadīya hymn of the Ṛg Veda (10.129) ends asking whether even the highest overseer knows how creation began — "or perhaps he does not know".
    `,
  }),

  entry('sufficient-reason', 'concept', REAL, 'curious', 'The Principle of Sufficient Reason', {
    summary: 'Nothing happens without a reason why it is so and not otherwise. Leibniz built a metaphysics on it; accept it fully and it seems to leave no room for chance or freedom.',
    aliases: ['principle of sufficient reason', 'PSR', 'sufficient reason'],
    tags: ['explanation', 'foundations'],
    year: 1714,
    body: md`
      ## Leibniz's great principles
      Along with non-contradiction, Leibniz put the **principle of sufficient reason** at the base of his philosophy (*Monadology*, 1714): no fact is true and no event happens unless there is a sufficient reason for it being so and not otherwise.

      From it he drew:
      - **God**: the whole series of contingent things needs a reason outside the series — the cosmological argument.
      - **Relationism about space**: if space were absolute, God would have had no reason to put the universe *here* rather than three metres east, so absolute space is impossible (the Leibniz–Clarke correspondence against Newton).
      - **Leibniz's law**: two things alike in every respect would give God no reason to place one here and the other there — so there can't be two.

      ## Its costs
      The strong PSR threatens to make everything **necessary**. If every fact has a sufficient reason, so does the whole set of facts; that reason can't be contingent (it would need a further reason), so it's necessary — and what follows from necessity is necessary. Spinoza embraced this. Quantum mechanics seems to have events — a nucleus decaying now rather than later — with no sufficient reason at all.

      ${survey('Principle of sufficient reason', 'false 46%, true 36%')}
    `,
  }),

  entry('leibniz-law', 'concept', REAL, 'curious', "Leibniz's Law", {
    summary: 'If two things are identical, they share all properties; and (more controversially) if they share all properties, they’re identical. Quantum particles put the second half to the test.',
    aliases: ["Leibniz's law", 'identity of indiscernibles', 'indiscernibility of identicals', 'numerical identity', 'qualitative identity'],
    tags: ['identity', 'physics'],
    year: 1686,
    latex: md`a = b \;\to\; \forall F\,(Fa \leftrightarrow Fb) \qquad \forall F\,(Fa \leftrightarrow Fb) \;\to\; a = b`,
    variables: [
      [md`a = b`, 'a and b are one and the same thing (numerical identity)'],
      ['F', 'Any property'],
    ],
    body: md`
      ## Two principles
      - **Indiscernibility of identicals** (left): if Hesperus is Phosphorus, whatever is true of one is true of the other. Almost everyone accepts this — it's how we prove things *aren't* identical: Clark Kent can fly? No; Superman can; so… (and here Frege's puzzle bites).
      - **Identity of indiscernibles** (right): no two distinct things are exactly alike. Leibniz (*Discourse on Metaphysics*, 1686) said no two leaves in the garden are the same, and a courtier who searched found he was right.

      ## Numerical vs qualitative identity
      Twins are qualitatively similar but numerically two. Your car and the car you bought are numerically one — the kind of identity the Ship of Theseus and personal identity are about.

      ## The physics challenge
      Max Black (1952) imagined a universe with just two identical iron spheres, two miles apart — every property shared, yet two. Quantum mechanics made this real: two electrons in the same helium atom share all state-independent properties, and their joint state is symmetric under swapping them. Are they two things, or is "which is which" meaningless? Some philosophers of physics say electrons are only **weakly discernible** — distinguishable by irreflexive relations like "has opposite spin to" — which preserves a version of Leibniz's law.
    `,
  }),

  entry('idealism', 'theory', REAL, 'curious', 'Idealism', {
    summary: 'Reality is fundamentally mental. For Berkeley, to be is to be perceived — a tree unobserved exists only because God perceives it. Other idealisms put mind at the base in subtler ways.',
    aliases: ['idealism', 'idealist', 'esse est percipi', 'immaterialism', 'subjective idealism', 'transcendental idealism', 'absolute idealism'],
    tags: ['mind', 'history'],
    year: 1710,
    body: md`
      ## Berkeley's argument (1710)
      Everything we perceive — colours, shapes, hardness — is an idea in a mind. Talk of "matter" existing unperceived, with ideas as copies of it, is empty: an idea can only resemble another idea. So *esse est percipi* — to be is to be perceived. Things persist when you look away because God perceives them continuously.

      Ronald Knox's famous limerick pictures a young man puzzled that a tree in a college quad keeps existing when no one is around — and God's reply that it does, because *He* is always about in the quad.

      Samuel Johnson kicked a large stone and said "I refute it *thus*" — which misses that Berkeley never denied stones feel solid.

      ## Other idealisms
      - **Kant's transcendental idealism** (1781): space, time and causality are forms our minds impose; things-in-themselves are unknowable. Empirical realism, transcendental idealism.
      - **Hegel's absolute idealism**: reality is Spirit coming to know itself through history.
      - **Yogācāra** Buddhism ("mind-only") and **Advaita Vedānta** give Indian idealisms — for Advaita, the only reality is pure consciousness, Brahman.
      - Modern **analytic idealism** (Bernardo Kastrup) and some readings of quantum mechanics, where observation seems to matter, revive it — though most physicists deny observers need to be conscious.

      ${survey('External world', 'idealism 7%')} — a small but persistent minority.
    `,
  }),

  entry('composition', 'question', REAL, 'curious', 'When Do Parts Make a Whole?', {
    summary: 'Your nose and the Eiffel Tower — is there an object made of just those two? Some say always, some say never (only particles and living things), most say “sometimes”, and nobody can say when.',
    aliases: ['mereology', 'special composition question', 'mereological nihilism', 'universalism about composition', 'statue and the clay'],
    tags: ['identity', 'objects'],
    year: 1990,
    body: md`
      ## The question
      Peter van Inwagen's **special composition question** (*Material Beings*, 1990): when do some things together make up a further thing?

      - **Universalism**: always. Any collection of things, however scattered, makes an object — including your nose plus the Eiffel Tower ("trout-turkeys", in the literature).
      - **Nihilism**: never. Only simples (fundamental particles) exist, "arranged table-wise" or "arranged cat-wise". There are no tables, strictly speaking.
      - **Restrictivism**: sometimes. Van Inwagen's own answer: only when the activity of the parts constitutes a **life**. So there are organisms (and particles) but no tables or chairs.

      ## The statue and the lump
      A sculptor makes a statue from a lump of clay. Same place, same matter. But the lump existed before the statue and would survive being squashed; the statue wouldn't. Different properties — so by Leibniz's law, two things in one place? Or one thing described two ways?

      ${survey('Material composition', 'restrictivism 35%, universalism 27%, nihilism 8%')} ${survey('Statue and lump', 'two things 42%, one thing 30%')}

      Buddhist philosophers took the nihilist line two thousand years earlier: the chariot is a convenient name for axle, wheels and pole; ultimately there are only the parts — and ultimately, they said, not even those.
    `,
  }),

  entry('dialectic', 'concept', REAL, 'curious', 'Dialectic', {
    summary: 'Progress through contradiction: a position generates its opposite, and their conflict is resolved at a higher level. From Socrates’ conversations to Hegel’s history to Marx’s class struggle.',
    aliases: ['dialectic', 'dialectics', 'Hegelian dialectic', 'thesis, antithesis, synthesis', 'Aufhebung', 'sublation'],
    tags: ['history', 'change'],
    year: 1807,
    body: md`
      ## Three meanings
      - **Socratic / Platonic**: dialectic is reasoned conversation — question and answer driving toward definitions (the Socratic method).
      - **Kantian**: "transcendental dialectic" is reason overreaching into contradictions (antinomies) when it tries to know what lies beyond experience — whether the world had a beginning, whether there's free will.
      - **Hegelian**: reality itself develops through contradiction. In the *Phenomenology of Spirit* (1807) a form of consciousness hits its own internal tension, and passes into a richer one that **sublates** (*aufheben* — cancels, preserves and lifts up) the earlier stage. The master–slave dialectic is the famous episode.

      "Thesis, antithesis, synthesis" is Fichte's vocabulary, popularised by later textbooks. Hegel himself rarely used it.

      ## After Hegel
      Marx turned the dialectic "right side up": material conditions and class conflict, not Spirit, drive history — dialectical materialism. Critics (Popper, *The Open Society and Its Enemies*, 1945) saw a method that could explain anything and so predicted nothing.

      Chinese yin and yang offer a different picture of opposites: not conflict ending in a higher synthesis but complementary forces in endless balance and exchange.
    `,
  }),

  entry('simulation-argument', 'question', REAL, 'curious', 'The Simulation Argument', {
    summary: 'If civilisations like ours ever run many detailed simulations of their ancestors, simulated minds would vastly outnumber real ones — so you are probably simulated. Unless one of two other things is true.',
    aliases: ['simulation argument', 'simulation hypothesis', 'ancestor simulation', 'we live in a simulation'],
    tags: ['self-location', 'probability', 'technology'],
    year: 2003,
    latex: md`f_{\text{sim}} = \frac{f_P\, f_I\, N_I}{f_P\, f_I\, N_I + 1}`,
    variables: [
      [md`f_P`, 'Fraction of civilisations like ours that reach a "posthuman" stage'],
      [md`f_I`, 'Fraction of those that want to run ancestor simulations'],
      [md`N_I`, 'Average number of simulations such a civilisation runs'],
      [md`f_{\text{sim}}`, 'Fraction of all observers with human-type experiences who are simulated'],
    ],
    body: md`
      ## Bostrom's trilemma (2003)
      Nick Bostrom argued that at least one of these is true:
      1. Almost all civilisations like ours go extinct before they can run realistic simulations of minds ($f_P \approx 0$).
      2. Almost none that could are interested in doing so ($f_I \approx 0$).
      3. We are almost certainly living in a simulation ($f_{\text{sim}} \approx 1$).

      The logic is counting: if even a small fraction of civilisations each run millions of ancestor simulations, simulated people outnumber unsimulated ones by millions to one. Given no way to tell from the inside, you should reason as if you're a random observer — the same **self-locating** principle behind the doomsday argument and the thirder in Sleeping Beauty.

      ## Objections
      - Consciousness might not be simulable (the Chinese Room, biological views of mind).
      - The indifference principle may be wrong: why assume you're a *random* observer?
      - Simulations of simulations blow up the computing cost; perhaps physics is too expensive to simulate.

      Descartes' evil demon is the ancestor; the difference is that Bostrom's argument puts a number on it. Bostrom himself put roughly equal credence on the three options.
    `,
    calc: {
      inputs: [
        input('fp', 'Civilisations reaching posthuman stage', '%', 10, 0.0001, 100, LOG),
        input('fi', 'Of those, share that run ancestor sims', '%', 1, 0.0001, 100, LOG),
        input('n', 'Sims per interested civilisation', '', 1000000, 1, 1e12, LOG),
      ],
      outputs: [
        out('Simulated observers per real one', '', 'fp/100*fi/100*n', { key: 'x', digits: 4 }),
        out('Chance a random observer is simulated', '%', '100*x/(x + 1)', { digits: 4 }),
      ],
      note: 'The conclusion is only as strong as the smallest factor. Make almost everyone go extinct (fp tiny) and the probability collapses.',
    },
  }),
];
