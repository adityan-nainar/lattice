// Mind & Consciousness: how minds fit into a physical world, consciousness, the self, machine minds.

import { AREA, entry, input, LOG, md, out, survey } from './helpers.js';

const { MIND } = AREA;

export const MIND_ENTRIES = [
  entry('mind-body-problem', 'question', MIND, 'curious', 'The Mind–Body Problem', {
    summary: 'How do thoughts, feelings and experiences relate to the brain? Are they the same thing, two different things, or is one of them not what it seems?',
    aliases: ['mind-body problem', 'mind–body problem', 'philosophy of mind'],
    tags: ['foundations', 'consciousness'],
    body: md`
      ## The puzzle
      Your pain is felt, private, and about something; your brain is grey matter obeying physics. Yet pinching your arm causes the pain, and the pain makes you say "ouch". How can the two be connected?

      ## The map of answers
      - **Dualism**: mind and matter are different kinds of thing (Descartes) or at least have different kinds of property (property dualism).
      - **Physicalism**: everything is physical, minds included. Its versions: behaviourism, identity theory, functionalism, eliminativism.
      - **Idealism**: everything is mental; matter is how mind appears.
      - **Neutral monism** (Spinoza, Russell): mind and matter are two aspects of something that is neither.
      - **Panpsychism**: consciousness is a basic feature of matter, everywhere.

      ## The two hard parts
      1. **Mental causation**: if physics is causally closed (every physical event has a sufficient physical cause), how can a non-physical mind make anything happen? This haunts dualism — and even physicalist views of qualia.
      2. **Consciousness**: why is any of this *felt*? This is the hard problem, sharpened by Mary's room, zombies and Nagel's bat.

      Sāṅkhya drew the line elsewhere: thinking and feeling belong to *matter* (prakṛti), and only pure witnessing consciousness (puruṣa) is separate — a dualism with the mind on the physical side.

      ${survey('Mind', 'physicalism 52%, non-physicalism 32%')}
    `,
  }),

  entry('dualism', 'theory', MIND, 'curious', 'Substance Dualism', {
    summary: 'Descartes: the mind is a thinking thing, the body an extended thing, and they are distinct substances. Elegant, intuitive — and stuck on how the two could ever interact.',
    aliases: ['dualism', 'dualist', 'Cartesian dualism', 'substance dualism', 'property dualism', 'interaction problem', 'causal closure'],
    tags: ['consciousness', 'history'],
    year: 1641,
    body: md`
      ## Descartes' arguments (Meditations, 1641)
      - **Doubt**: I can doubt I have a body, but not that I think. So I am a thinking thing, distinct from my body.
      - **Divisibility**: bodies can be divided; the mind has no parts.
      - **Conceivability**: I can clearly conceive my mind existing without my body; whatever I can clearly conceive, God could make; so they are really distinct. Chalmers' zombie argument is a modern descendant.

      ## Elisabeth's question
      In 1643, Princess Elisabeth of Bohemia wrote to Descartes asking how an unextended soul could move a body, since pushing requires contact and extension. Descartes' replies (a "union" of mind and body; the pineal gland as the meeting point) didn't satisfy her, or most readers since. With energy conservation and the **causal closure** of physics, the problem got sharper: any mental push would show up as a physical anomaly, and none is found.

      ## Property dualism
      Most modern dualists (Chalmers, Jackson in 1982) are **property dualists**: there's one kind of stuff, but it has irreducibly mental properties — qualia — alongside physical ones. That avoids ghostly substances but inherits the causal problem, leading some to epiphenomenalism.

      ${survey('Consciousness', 'functionalism 33%, dualism 22%, identity theory 13%, panpsychism 8%, eliminativism 5%')}
    `,
  }),

  entry('floating-man', 'example', MIND, 'curious', "Avicenna's Floating Man", {
    summary: 'Imagine being created suspended in the air, blindfolded, limbs apart, touching nothing. You’d know nothing of your body — yet you’d still know that you exist.',
    aliases: ['floating man', 'flying man', 'suspended man'],
    tags: ['self', 'thought experiment', 'history'],
    year: 1020,
    body: md`
      ## The thought experiment
      In the *Kitāb al-Shifāʾ* (The Book of Healing, c. 1020s), Ibn Sīnā — Avicenna — asks you to imagine being created all at once, fully mature, but blindfolded and floating in empty air, limbs held apart so that nothing touches anything, not even your own body. You have no sensations at all.

      Would you affirm that you exist? Avicenna says yes, without hesitation — while being unaware of your body, limbs, or organs. What you are aware of is therefore not the body. The self is known directly, prior to and independently of sensation.

      ## Six centuries before Descartes
      The resemblance to the cogito and to Cartesian dualism is striking, and Latin translations of Avicenna were read in medieval Europe. There are differences: Avicenna's point is about **self-awareness** as the soul's constant, primitive state — we are never unaware of ourselves, even asleep — rather than a foundation for certainty.

      ## Objections
      Could you really have no sense of your body? Modern science suggests proprioception and interoception (your sense of heartbeat, breath, balance) are woven into the sense of self. And even if you could *conceive* yourself without a body, it doesn't follow that you *are* separate from it — the same gap between conceivability and possibility that critics press against zombie arguments.
    `,
  }),

  entry('physicalism', 'theory', MIND, 'curious', 'Physicalism', {
    summary: 'Everything that exists is physical, or fixed by the physical — minds included. The majority view, with one big unpaid bill: consciousness.',
    aliases: ['physicalism', 'physicalist', 'materialism', 'materialist', 'supervenience', 'causal closure of the physical'],
    tags: ['consciousness', 'foundations'],
    body: md`
      ## The claim
      There is nothing over and above the physical. A precise version uses **supervenience**: any world physically identical to ours would be identical in every respect, mental facts included. Duplicate every particle and you duplicate every thought and feeling.

      ## Why most philosophers accept it
      - **Causal closure**: physics seems complete — every physical effect has a sufficient physical cause. If minds make a difference to behaviour, they must be physical.
      - **Track record**: life turned out to be chemistry (no "vital force"), heredity turned out to be DNA. Mind is the last holdout.
      - **Neuroscience**: damage the brain and you damage the mind, in specific ways.

      ## Versions
      Behaviourism (mind = behaviour), identity theory (mind = brain states), functionalism (mind = functional organisation), eliminativism (much of our mind-talk is false).

      ## The bill
      The explanatory gap: even a complete physical story of the brain seems to leave out *what it's like* to see red. Mary's room, zombies and the hard problem press on exactly this. Physicalists reply that the gap is in our concepts, not the world (the "phenomenal concepts" strategy), or that consciousness is not what it seems (illusionism).

      "Physical" is itself slippery — physics defined by *which* physics? Today's would be incomplete, and a future one might include anything. This is "Hempel's dilemma".

      ${survey('Mind', 'physicalism 52%, non-physicalism 32%')}
    `,
  }),

  entry('identity-theory', 'theory', MIND, 'curious', 'Mind–Brain Identity Theory', {
    summary: 'Pain just is a certain brain process, as lightning just is electrical discharge. Discovered, not defined — and blocked by the thought that octopuses feel pain too.',
    aliases: ['identity theory', 'mind-brain identity', 'type identity theory', 'type physicalism', 'C-fibres'],
    tags: ['consciousness'],
    year: 1959,
    body: md`
      ## The idea
      U. T. Place ("Is Consciousness a Brain Process?", 1956) and J. J. C. Smart ("Sensations and Brain Processes", 1959) argued that mental states *are* brain states. The identity is **contingent and discovered**, like "lightning is electrical discharge" or "water is H₂O": the words have different meanings, but science shows they pick out the same thing. The philosophers' stock example: pain = C-fibre firing (bad neuroscience, but a placeholder).

      ## The objection that won
      **Multiple realizability** (Putnam, 1967): if pain *is* C-fibre firing, then creatures without C-fibres — octopuses, with a very different nervous system, or a hypothetical silicon-based alien, or a robot — can't be in pain. That seems wrong. Pain seems definable by what it *does*, not what it's made of — which leads to functionalism.

      ## Kripke's objection
      In *Naming and Necessity* Kripke argued that if pain = C-fibre firing, the identity must be necessary. But it seems possible to have the firing without the pain. With water and H₂O we can explain the illusion of contingency (something watery-feeling but not H₂O); with pain we can't, because anything that feels like pain *is* pain.

      Identity theory has made a comeback in forms like "token identity" (each particular pain is some physical state, but not always the same kind) and in neuroscience's search for neural correlates of consciousness.
    `,
  }),

  entry('behaviourism', 'theory', MIND, 'curious', 'Philosophical Behaviourism', {
    summary: 'To have a mind is to behave, or be disposed to behave, in certain ways. Ryle mocked Cartesian dualism as "the ghost in the machine" — a category mistake.',
    aliases: ['behaviourism', 'behaviorism', 'logical behaviourism', 'ghost in the machine', 'category mistake', 'The Concept of Mind'],
    tags: ['consciousness', 'history'],
    year: 1949,
    body: md`
      ## Ryle's attack
      In *The Concept of Mind* (1949) Gilbert Ryle called Cartesian dualism "the dogma of the Ghost in the Machine" and diagnosed it as a **category mistake**. A visitor shown Oxford's colleges, libraries and labs asks, "But where is the University?" — as if it were one more building. Likewise, asking where the mind is, over and above intelligent behaviour, treats it as a thing of the wrong category.

      **Logical behaviourism** (Ryle, Hempel, and some read the later Wittgenstein this way) says mental words are about dispositions: "brittle" means "would shatter if struck"; "wants tea" means "would take tea if offered, would go to the kitchen…".

      ## Why it collapsed
      - **Circularity**: the disposition for "wants tea" depends on other mental states — believing there's tea, not wanting to seem rude.
      - **Super-actors and super-spartans** (Putnam, 1963): someone could feel intense pain and never show it, or fake it perfectly.
      - **Inner life**: behaviourism seems to deny the one thing we're sure of — there's something going on inside.

      Its legacy is large anyway: functionalism is behaviourism plus inner states defined by causal role, and the Turing test is a behavioural criterion for thinking.
    `,
  }),

  entry('functionalism', 'theory', MIND, 'curious', 'Functionalism', {
    summary: 'A mental state is defined by what it does — its causes, effects and links to other states — not what it’s made of. Minds are like software; brains are one kind of hardware.',
    aliases: ['functionalism', 'functionalist', 'multiple realizability', 'multiply realizable', 'computational theory of mind'],
    tags: ['consciousness', 'AI'],
    year: 1967,
    body: md`
      ## The idea
      Pain is whatever state is typically caused by tissue damage, causes distress and the desire for it to stop, and produces wincing and avoidance. Anything playing that **role** is pain — in a human, an octopus, a Martian or, in principle, a computer. This handles the multiple realizability that sank identity theory. Hilary Putnam proposed it in 1967, modelling minds on Turing machines; David Lewis and David Armstrong gave versions based on commonsense psychology.

      The **computational theory of mind** (Fodor) is a strong form: thinking is computation over mental representations — a "language of thought".

      ## Objections
      - **Qualia**: couldn't something play pain's role without *feeling* like anything? Zombies, inverted spectra (your red is my green, with identical behaviour), and Ned Block's **China brain** — the population of China, each person radioing others to simulate one neuron each, running your functional organisation for an hour. Would China feel pain?
      - **Understanding**: Searle's Chinese Room argues that running the right program isn't enough for meaning.

      Functionalism is the unspoken default of cognitive science and AI. If it's true, whether an LLM thinks is a question about its functional organisation — which is why the question "can a language model understand?" is taken seriously rather than dismissed.

      ${survey('Consciousness', 'functionalism 33% — the most popular single view')}
    `,
  }),

  entry('qualia', 'concept', MIND, 'curious', 'Qualia', {
    summary: 'The felt qualities of experience — the redness of red, the hurt of pain, the taste of coffee. If anything resists physical explanation, it’s these.',
    aliases: ['qualia', 'quale', 'phenomenal consciousness', 'what it is like', 'inverted spectrum', 'subjective experience'],
    tags: ['consciousness'],
    body: md`
      ## What they are
      **Qualia** (singular *quale*) are the qualitative, felt aspects of conscious states: what it is like to see a ripe mango, hear a sitar, feel a headache. They are private (only you have yours), and they seem ineffable — you can't explain the taste of cardamom to someone who's never tasted it.

      ## Thought experiments built on them
      - **Inverted spectrum** (Locke): perhaps your red looks the way my green looks, and since we both call ripe tomatoes "red" and behave identically, nothing would reveal it.
      - **Mary's room**: a scientist who knows every physical fact about colour learns something new on seeing red.
      - **Zombies**: beings physically like us with no qualia at all.
      - **Nagel's bat**: we can't know what echolocation is like from the inside.

      ## Deflating them
      Daniel Dennett ("Quining Qualia", 1988) argued the concept is confused: no properties are intrinsic, ineffable, private *and* directly known all at once. **Illusionists** (Keith Frankish) say phenomenal consciousness is a kind of introspective illusion — there's no such thing as qualia, only a very convincing representation of them. **Representationalists** say the qualities are just the represented properties of things (the redness is the tomato's, as represented).

      ${survey('Perceptual experience', 'representationalism 39%, qualia theory 15%, disjunctivism 16%, sense-datum theory 5%')}
    `,
  }),

  entry('bat', 'example', MIND, 'curious', 'What Is It Like to Be a Bat?', {
    summary: 'Bats perceive the world by echolocation. However much we learn about their brains, we still won’t know what it is like for the bat. Nagel’s 1974 paper defined consciousness for a generation.',
    aliases: ['like to be a bat', "Nagel's bat", 'subjective character of experience'],
    tags: ['consciousness', 'thought experiment'],
    year: 1974,
    body: md`
      ## The argument
      Thomas Nagel (*The Philosophical Review*, 1974) proposed that a creature is conscious just when there is "something that it is like to be" it — something it is like *for* the creature. That became the standard definition of consciousness.

      Bats navigate by **echolocation**: they emit high-pitched calls and build a picture of the world from the returning echoes, fine enough to catch insects in flight. This sense is unlike anything we have. We can imagine flapping around catching bugs, but that is what it would be like for *us* to behave like a bat — not what it is like for the *bat*.

      Physical science aims at an **objective** view from nowhere, stripping away any particular perspective. But the facts about the bat's experience seem essentially tied to a point of view. So a complete objective description of the bat's brain would still leave something out.

      ## What Nagel didn't say
      He did not claim physicalism is false — only that we have no idea how it *could* be true, like a pre-Socratic told that matter is energy. The paper points toward the hard problem and Mary's room.

      Zhuangzi and his friend Huizi had a version around 300 BCE, on a bridge over the Hao river: "You're not a fish — how do you know the fish are happy?"
    `,
  }),

  entry('marys-room', 'example', MIND, 'curious', "Mary's Room", {
    summary: 'Mary knows every physical fact about colour vision but has lived in a black-and-white room. When she first sees a red rose, does she learn something new? If so, physicalism leaves something out.',
    aliases: ["Mary's room", 'knowledge argument', 'Mary the colour scientist', 'Mary the color scientist'],
    tags: ['consciousness', 'thought experiment'],
    year: 1982,
    body: md`
      ## The argument (Frank Jackson, 1982)
      Mary is a brilliant neuroscientist raised in a black-and-white room, learning about the world through a black-and-white monitor. She knows **every physical fact** about colour: wavelengths, the retina, the visual cortex, exactly what happens when someone sees red and says "red". Then she steps outside and sees a ripe tomato.

      1. Before release, Mary knew all the physical facts about colour vision.
      2. On release, she learns something new: what it's like to see red.
      3. So there are facts that aren't physical facts. Physicalism is false.

      ## The replies
      - **Ability hypothesis** (Lewis, Nemirow): Mary gains know-how — to recognise, imagine and remember red — not a new fact.
      - **Acquaintance**: she gains acquaintance with a fact she already knew, under a new concept (the "phenomenal concepts" strategy).
      - **Dennett**: if she *really* knew everything physical, she'd have predicted exactly what red would be like — we're misled by imagining a merely very well-read Mary.
      - **Jackson himself** changed his mind and became a physicalist in the late 1990s, deciding the intuition was an illusion.

      A real case sits nearby: people with colour blindness corrected by special glasses, and the congenitally blind who gain sight, report experiences no description prepared them for.
    `,
  }),

  entry('hard-problem', 'question', MIND, 'curious', 'The Hard Problem of Consciousness', {
    summary: 'Explaining how the brain processes information, discriminates, reports and controls behaviour is “easy”. Explaining why any of it is accompanied by felt experience is hard.',
    aliases: ['hard problem', 'hard problem of consciousness', 'easy problems', 'explanatory gap', 'meta-problem of consciousness'],
    tags: ['consciousness'],
    year: 1995,
    body: md`
      ## Chalmers' split (1995)
      David Chalmers ("Facing Up to the Problem of Consciousness", 1995) separated:
      - **Easy problems**: explaining how we discriminate stimuli, integrate information, report mental states, focus attention, control behaviour, and the difference between waking and sleep. Hard in practice, but just a matter of finding the mechanism — functions, explained by mechanisms that perform them.
      - **The hard problem**: why is the performance of these functions accompanied by *experience*? Why doesn't all this processing go on "in the dark"?

      Joseph Levine's **explanatory gap** (1983) was the precursor: "pain = C-fibre firing" leaves it unexplained why that firing feels like *this*.

      ## Responses
      - **Type-A physicalists** (Dennett): once the easy problems are solved, nothing is left — the hard problem is an illusion.
      - **Type-B physicalists**: consciousness is physical, but the gap is an artefact of how our concepts work.
      - **Non-physicalists**: consciousness is fundamental, like mass or charge, needing new basic laws — or panpsychism.
      - **Mysterians** (McGinn): the answer exists but our minds can't grasp it.
      - The **meta-problem** (Chalmers, 2018): explain why we *think* there's a hard problem — a tractable, easy-style question whose answer might dissolve the hard one.

      ${survey('Hard problem of consciousness', 'yes 62%, no 30%')}
    `,
  }),

  entry('zombies', 'example', MIND, 'curious', 'Philosophical Zombies', {
    summary: 'A being atom-for-atom like you that behaves exactly like you — but with no inner experience at all. If such a zombie is even possible, consciousness isn’t just physical.',
    aliases: ['philosophical zombie', 'p-zombie', 'zombie argument', 'conceivability argument', 'zombie twin'],
    tags: ['consciousness', 'thought experiment', 'modality'],
    year: 1996,
    body: md`
      ## Not the film kind
      A **philosophical zombie** is physically identical to a conscious human — same neurons, same behaviour, same words, even saying "I'm conscious, I see red!" — but with no experience whatsoever. The lights are on, nobody's home.

      ## The argument (Chalmers, *The Conscious Mind*, 1996; Robert Kirk had the idea in 1974)
      1. Zombies are conceivable — no contradiction in the idea.
      2. What is conceivable is metaphysically possible.
      3. If zombies are possible, then the physical facts don't fix the facts about consciousness.
      4. So physicalism is false.

      ## Where it's attacked
      - **Premise 1**: perhaps zombies only *seem* conceivable, like an iron bar that's not made of iron atoms seemed conceivable before chemistry. Dennett: imagine them properly and they're incoherent — zombies would talk and write papers about their qualia for exactly the reasons we do.
      - **Premise 2**: the most popular target. "Water isn't H₂O" once seemed conceivable too. Conceivability may be a poor guide to what is possible — as Kripke showed, some necessities are only known a posteriori.
      - The **zombie's own words**: a zombie Chalmers would write *The Conscious Mind* too. So the book's existence can't be evidence of consciousness — an awkward result for the view.

      ${survey('Zombies', 'conceivable but not metaphysically possible 37%, metaphysically possible 24%, inconceivable 16%')}
    `,
  }),

  entry('chinese-room', 'example', MIND, 'curious', 'The Chinese Room', {
    summary: 'Searle, locked in a room with a rulebook, answers Chinese questions perfectly without understanding a word. So running a program — however good — is not understanding.',
    aliases: ['Chinese room', 'Chinese room argument', 'syntax is not semantics', 'strong AI', 'systems reply'],
    tags: ['AI', 'thought experiment', 'meaning'],
    year: 1980,
    body: md`
      ## The argument (John Searle, 1980)
      Searle, who knows no Chinese, sits in a room with baskets of Chinese symbols and a rulebook in English: "when you see these shapes, send out those shapes". People outside pass in questions in Chinese; he follows the rules and passes out replies. The replies are indistinguishable from a native speaker's. Yet Searle understands nothing.

      A computer running a program is in Searle's position: it manipulates symbols by their shapes (**syntax**) and never gets to their meaning (**semantics**). "Syntax is not sufficient for semantics." So **strong AI** — the claim that the right program would literally understand — is false.

      ## The replies
      - **Systems reply**: Searle doesn't understand, but the whole system — man, rulebook, baskets — does. Searle: let me memorise the rulebook; now I *am* the system, and I still don't understand.
      - **Robot reply**: connect the symbols to cameras and arms, grounding them in the world. Searle: that just adds more symbols.
      - **Brain simulator reply**: simulate a Chinese speaker's neurons. Searle: simulating digestion doesn't digest anything.
      - **Intuition pump** (Dennett): the scenario hides the scale. A rulebook good enough to pass would be astronomically large, and the room would run millions of times slower than a brain — our intuition about "just shuffling symbols" may not survive that.

      The calculator puts numbers on the last point, using a modern language model as the rulebook.

      ${survey('Chinese room', "doesn't understand 67%, understands 18%")}
    `,
    calc: {
      inputs: [
        input('params', 'Model size', 'billion parameters', 70, 1, 2000, LOG),
        input('ops', 'Your speed by hand', 'operations/second', 1, 0.1, 100, LOG),
        input('tokens', 'Length of the reply', 'tokens', 100, 1, 10000, LOG),
      ],
      outputs: [
        out('Arithmetic per token (≈ 2 × parameters)', 'operations', '2*params*1e9', { key: 'per' }),
        out('Time for you to produce one token', 'years', 'per/ops/yr', { digits: 3 }),
        out('Time for the whole reply', 'years', 'per*tokens/ops/yr', { key: 'all', digits: 3 }),
        out('That is this many 80-year lifetimes', '', 'all/80', { digits: 3 }),
      ],
      note: 'A 70-billion-parameter model needs about 140 billion multiply-adds per token: over 4,000 years by hand at one per second. Does the speed change whether anything understands?',
    },
  }),

  entry('turing-test', 'concept', MIND, 'curious', 'The Turing Test', {
    summary: 'Replace “can machines think?” with a game: can a machine chatting by text fool a judge into thinking it’s human? Turing predicted it would happen around 2000.',
    aliases: ['Turing test', 'imitation game', 'Computing Machinery and Intelligence'],
    tags: ['AI', 'history'],
    year: 1950,
    body: md`
      ## The proposal
      In "Computing Machinery and Intelligence" (*Mind*, 1950) Alan Turing called "can machines think?" "too meaningless to deserve discussion" and replaced it with the **imitation game**: a judge chats by text with a human and a machine and tries to say which is which. If the machine is picked out no more often than chance, we should grant it intelligence — the same courtesy we extend to other humans, whose minds we also only know through behaviour.

      He predicted that by about 2000, machines would fool an average judge 30% of the time after five minutes, and that "one will be able to speak of machines thinking without expecting to be contradicted".

      ## Turing's replies to objections
      He answered nine in advance, including the theological one, the "heads in the sand" objection, Lady Lovelace's (machines only do what they're told — Turing: they surprise me often), and the argument from consciousness (by that standard, only you know you think — solipsism).

      ## Today
      Large language models now pass short, informal versions routinely; controlled studies in 2024–25 found people often judge the best chatbots to be human at rates near or above chance. Few philosophers take that to settle whether they think. The test measures imitation of human conversation — which a system can learn from human text without, perhaps, understanding it (the Chinese Room worry). It also rewards *acting* human, down to strategic typos. Behaviourism's weaknesses are the test's weaknesses.
    `,
  }),

  entry('machine-understanding', 'question', MIND, 'curious', 'Can a Language Model Understand?', {
    summary: 'Chatbots write, reason and explain. Is that understanding, or — in the 2021 phrase — a “stochastic parrot” stitching together patterns? And could such a system be conscious?',
    aliases: ['stochastic parrot', 'machine consciousness', 'AI consciousness', 'LLM understanding', 'symbol grounding'],
    tags: ['AI', 'consciousness', 'meaning'],
    year: 2021,
    body: md`
      ## Two questions
      1. **Understanding**: do large language models grasp meaning, or only predict likely text?
      2. **Consciousness**: is there anything it is like to be one?

      ## The case against
      - **Stochastic parrots** (Bender, Gebru and colleagues, 2021): trained only on the form of text, a model has no access to what the words are about. Bender and Koller's octopus, tapping an undersea cable between two islanders, learns their message patterns perfectly — but can't help when one of them is attacked by a bear.
      - The Chinese Room and the **symbol-grounding** problem (Harnad, 1990): symbols must connect to perception and action to mean anything.

      ## The case for
      - Functionalism: if understanding is a matter of the right internal organisation, models trained to predict text may have been pushed into building world models to do it well. Interpretability research finds internal representations of space, time and board states.
      - Meaning-as-use (Wittgenstein): if a system uses words competently across countless contexts, what more could "understanding" require?

      ## Consciousness
      Theories disagree about what to look for. A 2023 report (Butlin, Long and others) derived "indicator properties" from scientific theories — global workspace, recurrence, higher-order monitoring — and concluded no current system is a strong candidate, but that there's no obvious technical barrier. The question is live because the other-minds problem never had a behavioural solution.

      ${survey('Other minds', 'current AI systems conscious — 3% accept, 82% reject; future AI systems — 39% accept, 27% reject')}
    `,
  }),

  entry('panpsychism', 'theory', MIND, 'curious', 'Panpsychism', {
    summary: 'Consciousness is a basic feature of matter, present in some tiny form in electrons and quarks. It avoids the jump from dead matter to mind — and faces the problem of how micro-experiences combine.',
    aliases: ['panpsychism', 'panpsychist', 'combination problem', 'Russellian monism', 'cosmopsychism'],
    tags: ['consciousness'],
    body: md`
      ## The argument
      Physics tells us what matter **does** — mass is resistance to acceleration, charge is how particles push and pull — but not what it intrinsically **is**. Meanwhile, the one intrinsic nature we know directly is our own experience. So perhaps the intrinsic nature of matter is experiential. This is **Russellian monism** (after Russell's *The Analysis of Matter*, 1927), and it sidesteps both the hard problem (no mysterious emergence of experience from non-experience) and dualism's causal problem (experience *is* what does the causing).

      Galen Strawson (2006) argued that any real physicalist should be a panpsychist: you can't get experience out of wholly non-experiential stuff, any more than you can get extension out of the unextended.

      ## The combination problem
      Even if each electron has a flicker of experience, how do trillions of micro-experiences add up to one unified human consciousness — and why don't rocks form a subject? William James raised it in 1890: a hundred feelings shuffled together don't make a feeling of the hundred. Variants: **cosmopsychism** starts from one cosmic consciousness and asks how it divides into individuals — closer to Advaita and to Spinoza.

      Integrated information theory is sometimes described as a scientific panpsychism, since it assigns a little consciousness to simple systems with integrated information.

      ${survey('Consciousness', 'panpsychism 8%')} — small, but far larger than it was thirty years ago.
    `,
  }),

  entry('consciousness-science', 'theory', MIND, 'curious', 'Scientific Theories of Consciousness', {
    summary: 'Global workspace, integrated information, higher-order and recurrent theories all try to say which brain processes are conscious. In 2025 a head-to-head test left both main contenders bruised.',
    aliases: ['global workspace theory', 'global workspace', 'integrated information theory', 'neural correlates of consciousness', 'higher-order theory'],
    tags: ['consciousness', 'science'],
    year: 2004,
    body: md`
      ## The contenders
      - **Global workspace** (Bernard Baars, 1988; Stanislas Dehaene): consciousness is information being broadcast to many brain systems at once — a sudden "ignition" across the prefrontal and parietal cortex. The workspace is like a stage; unconscious processing is backstage.
      - **Integrated information theory** (Giulio Tononi, 2004): consciousness *is* integrated information, measured as Φ — how much a system's whole is more than its parts. Predicts consciousness in the posterior "hot zone" of the brain; implies some simple devices are slightly conscious and some powerful computers barely at all.
      - **Higher-order theories** (David Rosenthal): a state is conscious when you have a thought or representation *about* it.
      - **Recurrent processing** (Victor Lamme): feedback loops within sensory cortex suffice.

      ## An adversarial test
      Rival camps agreed in advance on experiments whose outcomes would count against each theory. The results, published in *Nature* in 2025, challenged key predictions of both IIT and global neuronal workspace theory. In 2023 a public letter from over a hundred researchers had called IIT "pseudoscience"; others protested. The field is young, and the hard problem remains untouched by all of this — these theories aim at the **neural correlates**, not at why they feel like anything.

      Scientific theories matter for ethics too: which animals, patients in vegetative states, or AI systems are conscious decides what we owe them.
    `,
  }),

  entry('intentionality', 'concept', MIND, 'curious', 'Intentionality', {
    summary: 'Thoughts are about things — the Taj Mahal, next Tuesday, unicorns. Brentano called this "aboutness" the mark of the mental. How can a physical state be about anything?',
    aliases: ['intentionality', 'aboutness', 'mental representation', 'mental content', 'intentional object'],
    tags: ['meaning', 'foundations'],
    year: 1874,
    body: md`
      ## Brentano's thesis
      In *Psychology from an Empirical Standpoint* (1874) Franz Brentano proposed that every mental phenomenon is directed at an object: you hope *for* rain, fear *the* exam, think *of* Paris. Physical things aren't about anything — a rock is just a rock. So **intentionality** is the mark of the mental. (Not "intending" in the sense of meaning to do something; from Latin *intendere*, to aim at.)

      The puzzle: you can think about things that don't exist (Sherlock Holmes, the largest prime). What is the thought related to then?

      ## Naturalising it
      How could brain states be *about* anything? Proposals:
      - **Causal**: a state represents what reliably causes it (a smoke detector "represents" smoke). Problem: misrepresentation — if a cow on a dark night sometimes causes "horse" thoughts, why don't they mean "horse or cow on a dark night"?
      - **Teleosemantics** (Millikan, Dretske): a state represents what it was *selected* to track. A frog's fly-detector means "fly" even when fooled by a flicked pellet.
      - **Interpretational** (Dennett's intentional stance): having beliefs is being usefully predictable by attributing beliefs.

      Language models sharpen the question: do their internal states *represent* anything, or does their "aboutness" borrow entirely from the humans who read them — **derived** rather than **original** intentionality (Searle's distinction)?

      ${survey('Grounds of intentionality', 'causal/teleological 35%, interpretational 15%, primitive 14%, phenomenal 13%, inferential 9%')}
    `,
  }),

  entry('other-minds', 'question', MIND, 'curious', 'The Problem of Other Minds', {
    summary: 'You feel your own pain, but you only see other people’s behaviour. How do you know anyone else is conscious — or which animals are, or whether a machine could be?',
    aliases: ['other minds', 'problem of other minds', 'solipsism', 'argument from analogy'],
    tags: ['consciousness', 'knowledge'],
    body: md`
      ## The problem
      Your access to your own mind is direct; your access to anyone else's is through their faces, words and actions. Perfect acting — or a philosophical zombie — would look the same. So how do you know others have minds?

      ## Answers
      - **Analogy** (Mill): my behaviour is caused by my feelings; others behave similarly; so theirs probably is too. Critics: generalising from a single case is weak induction.
      - **Inference to the best explanation**: other minds are the best explanation of others' behaviour — abduction.
      - **Wittgenstein**: the problem is confused. Mental concepts are learned in public use, not by labelling private inner items (the private language argument); "my attitude toward him is an attitude toward a soul" isn't a hypothesis.
      - **Perception**: we don't infer emotion from faces — we *see* anger in a face.
      - **Solipsism**: only my mind exists. Irrefutable, and believed by no one; Russell recalled a logician who wrote to him that she was a solipsist and was surprised there weren't more of them.

      ## Where it bites
      Animals, newborns, patients who can't respond, and machines. The 2020 PhilPapers Survey asked "for which groups are some members conscious?":

      Adult humans 95%, cats 89%, newborn babies 84%, fish 65%, flies 35%, worms 24%, plants 7%, particles 2%, current AI systems 3%, future AI systems 39%.

      Zhuangzi's happy fish is a 2,300-year-old version.
    `,
  }),

  entry('bundle-theory', 'theory', MIND, 'curious', 'The Bundle Theory of the Self', {
    summary: 'Look inside for your "self" and you find only particular perceptions — heat, a thought, a memory. Hume concluded the self is just a bundle of them. The Buddha had said much the same.',
    aliases: ['bundle theory', 'bundle of perceptions', 'no-self view', 'narrative self', 'self as illusion'],
    tags: ['self'],
    year: 1739,
    body: md`
      ## Hume's search
      *A Treatise of Human Nature* (1739): "For my part, when I enter most intimately into what I call myself, I always stumble on some particular perception or other, of heat or cold, light or shade, love or hatred, pain or pleasure. I never can catch myself at any time without a perception." The self is "nothing but a bundle or collection of different perceptions, which succeed each other with an inconceivable rapidity, and are in a perpetual flux". The mind is like a theatre — but there's no stage, only the performers.

      Hume later confessed, in the appendix, that he couldn't explain what binds the bundle together.

      ## Parallels
      The Buddhist **anattā** doctrine, more than two thousand years earlier, analysed the person into five aggregates (body, feeling, perception, mental formations, consciousness), with no further owner. Alison Gopnik has asked whether Hume could have heard of it through Jesuits at La Flèche, where he wrote the *Treatise* — a suggestive, unproven link.

      ## Modern versions
      - **Narrative self** (Dennett's "centre of narrative gravity"; Ricoeur): the self is a story the brain tells, real the way a character is real.
      - **Neuroscience**: split-brain cases and confabulation suggest the unified self is partly a construction.
      - Parfit's view of personal identity is Humean in spirit: there is no deep further fact about what "I" am.
    `,
  }),

  entry('epiphenomenalism', 'theory', MIND, 'curious', 'Epiphenomenalism', {
    summary: 'Conscious experience is caused by brain activity but causes nothing itself — like the whistle on a steam engine, or a shadow. Awkward: then why do we talk about it?',
    aliases: ['epiphenomenalism', 'epiphenomenal', 'epiphenomenon', 'steam whistle'],
    tags: ['consciousness'],
    year: 1874,
    body: md`
      ## The view
      T. H. Huxley (1874) compared consciousness to "the steam-whistle which accompanies the work of a locomotive engine" without influencing its machinery. Brain events cause experiences; experiences are causal dead ends. Everything you do is fully explained by physical causes.

      ## Why anyone would hold it
      If you think (a) qualia are not physical (Mary's room, zombies) and (b) physics is causally closed, then qualia can't cause anything physical — epiphenomenalism follows. Frank Jackson's 1982 paper "Epiphenomenal Qualia" took this route.

      ## Why it's hard to hold
      - **Self-stultification**: if your experience of pain doesn't cause you to say "ouch" or write "I'm conscious", then your words about consciousness aren't caused by consciousness. So how could they be *about* it, or be evidence of it?
      - **Evolution**: if consciousness does nothing, natural selection couldn't have favoured it. Why is pain so reliably painful, and paired with the right behaviour?
      - **Libet** and the "user illusion" results are sometimes cited in its favour; they're consistent with it but don't require it.

      It's the dualist's price for accepting physics, and the reason many conclude that either consciousness is physical or physics isn't closed.
    `,
  }),

  entry('eliminativism', 'theory', MIND, 'curious', 'Eliminative Materialism', {
    summary: 'Our everyday talk of beliefs and desires is a folk theory — and likely false, destined to be replaced by neuroscience like phlogiston by oxygen chemistry.',
    aliases: ['eliminative materialism', 'eliminativism', 'eliminativist', 'folk psychology', 'illusionism'],
    tags: ['consciousness'],
    year: 1981,
    body: md`
      ## The claim
      Paul Churchland ("Eliminative Materialism and the Propositional Attitudes", 1981): "folk psychology" — explaining people by beliefs, desires, intentions — is a **theory**, and like folk physics and folk biology it could turn out false. It has stagnated for millennia, can't explain sleep, memory, learning or mental illness, and doesn't map onto the neuroscience. When mature neuroscience arrives, "belief" may go the way of **phlogiston** and **witches**: not reduced, but eliminated.

      Patricia Churchland's *Neurophilosophy* (1986) pressed the same line from the brain side.

      ## Objections
      - **Self-refutation**: "I believe there are no beliefs" undercuts itself. Eliminativists reply that this assumes what's in dispute — like a vitalist objecting that anyone denying vital force would be dead.
      - **Success**: folk psychology predicts people extremely well. You know your friend will be at the airport at 6 because she said she would.

      ## Illusionism
      Keith Frankish (2016) applies the idea to consciousness: phenomenal properties — qualia — don't exist; introspection misrepresents our brain states as having them. The task is to explain the **illusion**, which is an "easy" problem. Dennett largely agreed.

      ${survey('Consciousness', 'eliminativism 5%')}
    `,
  }),

  entry('extended-mind', 'theory', MIND, 'curious', 'The Extended Mind', {
    summary: 'If a notebook — or a phone — plays the same role as memory, it’s part of your mind. Clark and Chalmers’ 1998 paper; its question is now in everyone’s pocket.',
    aliases: ['extended mind', 'extended cognition', "Otto's notebook", 'embodied cognition', '4E cognition'],
    tags: ['self', 'technology'],
    year: 1998,
    body: md`
      ## Otto and Inga
      Inga hears of an exhibition at MoMA, recalls it's on 53rd Street, and walks there. Otto has Alzheimer's; he writes everything in a notebook he always carries. He hears of the exhibition, looks up the address in his notebook, and walks there.

      Andy Clark and David Chalmers ("The Extended Mind", 1998) argued that Otto's notebook plays the same **functional role** as Inga's memory: it's reliably available, automatically trusted, and was consciously endorsed when written. So Otto *believed* the museum was on 53rd Street before he looked — and the belief was partly in the notebook. The **parity principle**: if a process in the world works in a way we'd call cognitive if it were in the head, it's cognitive.

      ## Objections
      - **Cognitive bloat**: does the internet become part of your mind? Is everything in Wikipedia your belief?
      - **Coupling-constitution fallacy** (Adams and Aizawa): being *coupled* to a notebook doesn't make it *part* of cognition.

      ## Why it matters now
      Phones, search and AI assistants make the question practical: if losing your phone is like losing a chunk of memory, is someone who searches your phone searching your mind? Some legal scholars have used the idea in arguments about privacy. And this app is a small extended mind — notes, links and questions you've offloaded.

      ${survey('Extended mind', 'yes 51%, no 37%')}
    `,
  }),

  entry('libet', 'example', MIND, 'curious', "Libet's Experiment", {
    summary: 'Brain activity building toward a movement appears hundreds of milliseconds before people feel they decided to move. Proof that free will is an illusion? Later work says: not so fast.',
    aliases: ['Libet experiment', "Libet's experiment", 'readiness potential', 'Bereitschaftspotential'],
    tags: ['free will', 'science', 'consciousness'],
    year: 1983,
    body: md`
      ## The experiment (1983)
      Benjamin Libet asked people to flex a wrist whenever they felt like it, watching a fast clock and reporting where the dot was when they first felt the urge (the "W" time). EEG recorded the **readiness potential**, a slow build-up of brain activity first described by Kornhuber and Deecke in 1965.

      Roughly: the readiness potential began about **550 ms** before the movement; the conscious urge was reported about **200 ms** before. So the brain seemed to "start" about a third of a second before the person was aware of deciding.

      ## The free-will headlines
      If the brain decides before "you" do, is conscious will an after-the-fact story? Libet himself kept a role for consciousness: a **veto** in the last 200 ms. Later fMRI work (Soon and colleagues, 2008) predicted simple left/right choices several seconds early — at about 60% accuracy, only a little better than chance.

      ## The reinterpretation
      Aaron Schurger and colleagues (2012) modelled the readiness potential as the average of random neural noise drifting toward a threshold. When the noise happens to cross, you move. Averaged over many trials, it *looks* like a build-up starting early — but no decision has been made then. On this view the readiness potential isn't an unconscious decision at all.

      The deeper point: tiny arbitrary finger-flicks are a poor model of the choices free will is about — whom to marry, whether to lie. Compatibilists were never committed to an uncaused conscious trigger in the first place.
    `,
  }),

  entry('split-brain', 'example', MIND, 'curious', 'Split-Brain Cases', {
    summary: 'Cut the bridge between the brain’s hemispheres and each can know, want and do things the other doesn’t. How many minds are in that skull?',
    aliases: ['split-brain', 'split brain', 'corpus callosotomy', 'left-brain interpreter', 'unity of consciousness'],
    tags: ['self', 'consciousness', 'science'],
    year: 1962,
    body: md`
      ## The surgery and the experiments
      To stop severe epileptic seizures spreading, surgeons cut the **corpus callosum**, the main connection between the hemispheres. From the 1960s Roger Sperry and Michael Gazzaniga tested patients by flashing images to one visual field only (each field goes to the opposite hemisphere). Show "key" to the right hemisphere: the patient says (using the left hemisphere's language) that they saw nothing — while their left hand picks out a key from a pile.

      The **interpreter**: when the right hemisphere was shown a snow scene and the left a chicken claw, one patient's left hand picked a shovel and right hand a chicken. Asked why, the speaking left hemisphere invented a story: "the chicken claw goes with the chicken, and you need a shovel to clean out the chicken shed". Confident, fluent — and made up.

      ## The philosophy
      Thomas Nagel ("Brain Bisection and the Unity of Consciousness", 1971) concluded there may be no whole-number answer to how many minds such a patient has. Parfit used it for personal identity: if each half could be a person, what happens if the halves are transplanted into two bodies?

      Later studies (Pinto and colleagues, 2017) found some patients can respond accurately from either field with either hand, suggesting a unified but split *perception* — the picture is messier than the classic textbook story. The interpreter finding holds up well, and it supports the bundle and narrative views of the self: we explain our actions after the fact more than we'd like to think.
    `,
  }),
];
