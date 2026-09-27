// Language & Meaning: how words hook onto the world.

import { AREA, entry, md, survey } from './helpers.js';

const { LANG } = AREA;

export const LANGUAGE_ENTRIES = [
  entry('sense-reference', 'concept', LANG, 'curious', 'Sense and Reference', {
    summary: '"The Morning Star" and "the Evening Star" name the same planet but mean something different. Frege’s distinction explains how identity statements can be informative.',
    aliases: ['sense and reference', 'Sinn and Bedeutung', "Frege's puzzle", 'Hesperus and Phosphorus', 'Hesperus is Phosphorus', 'Morning Star', 'Evening Star'],
    tags: ['meaning', 'foundations'],
    year: 1892,
    body: md`
      ## Frege's puzzle (1892)
      "Hesperus is Hesperus" is trivial. "Hesperus is Phosphorus" was a real astronomical discovery — the bright "evening star" and the "morning star" are both Venus. If a name's meaning were just the object it names, the two sentences would mean the same thing. They clearly don't.

      Gottlob Frege's answer in "Über Sinn und Bedeutung": expressions have a **reference** (*Bedeutung*) — the object — and a **sense** (*Sinn*) — a "mode of presentation" of it. "Hesperus" presents Venus as the bright thing in the evening sky; "Phosphorus" as the one before dawn. Same reference, different senses; so the identity is informative.

      ## More work for senses
      - **Belief reports**: Lois Lane believes Superman can fly but not that Clark Kent can. Swapping co-referring names changes truth value in "believes that…" contexts, so there the sense matters.
      - **Empty names**: "Sherlock Holmes" has a sense but no reference.
      - A sentence's sense is a **thought** (what we'd call a proposition); its reference, strangely, is its truth value.

      ## Afterlife
      Russell tried to do without senses (theory of descriptions); Kripke argued names refer directly, not via senses (*Naming and Necessity*). The debate between Fregeans and **Millians** (names just stand for their bearers) is still going.

      ${survey('Proper names', 'Millian 39%, Fregean 36%')}
    `,
  }),

  entry('theory-of-descriptions', 'theory', LANG, 'curious', "Russell's Theory of Descriptions", {
    summary: '"The present King of France is bald" — true, false, or neither, since there is no king? Russell showed the sentence hides a claim that a king exists, so it’s simply false.',
    aliases: ['theory of descriptions', 'definite description', 'definite descriptions', 'present King of France', 'On Denoting'],
    tags: ['meaning', 'logic'],
    year: 1905,
    latex: md`\exists x\,\big(Kx \land \forall y\,(Ky \to y = x) \land Bx\big)`,
    variables: [
      ['Kx', 'x is presently King of France'],
      ['Bx', 'x is bald'],
    ],
    body: md`
      ## The puzzle
      France has no king. So is "the present King of France is bald" true? No. False? Then "the present King of France is not bald" should be true — but it isn't either. Excluded middle seems to fail. And what is the sentence *about*?

      ## "On Denoting" (1905)
      Bertrand Russell's analysis, using the new quantifiers: "the $F$ is $G$" means **there is exactly one $F$, and it is $G$**. The sentence is a claim about the world, not about a mysterious non-existent king. Since no one is King of France, it's **false**. "The King of France is not bald" is ambiguous: false if it means "there's exactly one king and he's not bald", true if it means "it's not the case that there's exactly one bald king".

      F. P. Ramsey called it "a paradigm of philosophy": a surface grammar that misleads, and a logical form that dissolves the problem.

      ## Objections
      P. F. Strawson ("On Referring", 1950) replied that the sentence *presupposes* a king rather than asserting one; if the presupposition fails, the question of truth "does not arise". Keith Donnellan (1966) noticed descriptions can be used to refer to someone even when they don't fit ("the man drinking a martini" — who's actually drinking water).

      Russell also treated ordinary names as disguised descriptions — "Aristotle" = "the teacher of Alexander" — which Kripke later attacked.
    `,
  }),

  entry('picture-theory', 'theory', LANG, 'curious', 'The Picture Theory of Meaning', {
    summary: 'A sentence pictures a possible fact, sharing its logical form the way a map shares the layout of a city. What can’t be pictured — ethics, the mystical — can only be shown, not said.',
    aliases: ['picture theory', 'Tractatus', 'Tractatus Logico-Philosophicus', 'whereof one cannot speak', 'saying and showing'],
    tags: ['meaning', 'Wittgenstein'],
    year: 1921,
    body: md`
      ## The Tractatus (1921)
      Ludwig Wittgenstein wrote it largely in the trenches and a prisoner-of-war camp of the First World War. Its numbered remarks begin "The world is everything that is the case" and build a theory:
      - The world is made of **facts**, combinations of simple objects.
      - A meaningful proposition is a **picture** of a possible fact: its elements stand for objects, and their arrangement shows how the objects are arranged. He was reportedly inspired by a Paris court reconstructing a car accident with toy cars and dolls.
      - Logic shows the form that pictures share with reality — but that form can't itself be pictured. It is **shown**, not said.

      ## The ladder
      Ethics, aesthetics, the meaning of life and the "mystical" lie outside what can be said. And the propositions of the Tractatus itself are, strictly, nonsense: you use them like a ladder and throw it away after climbing. It ends: "Whereof one cannot speak, thereof one must be silent."

      ## Legacy
      The Vienna Circle read it as a manifesto for logical positivism, and were baffled when Wittgenstein, visiting, read them Tagore's poetry. He later rejected much of it in favour of meaning as use.

      ${survey('Wittgenstein', 'prefer late Wittgenstein 58%, early 25%')}
    `,
  }),

  entry('meaning-as-use', 'theory', LANG, 'curious', 'Meaning as Use', {
    summary: 'Words are tools, and a word’s meaning is its use in the "language games" woven into our activities. The late Wittgenstein’s turn away from logic toward life.',
    aliases: ['meaning is use', 'meaning as use', 'language game', 'language-game', 'family resemblance', 'Philosophical Investigations', 'form of life', 'rule-following'],
    tags: ['meaning', 'Wittgenstein'],
    year: 1953,
    body: md`
      ## A new start
      The *Philosophical Investigations* (published 1953, after Wittgenstein's death) opens with Augustine's picture of learning language by naming objects, and argues it fits only a tiny part of language. Words are like tools in a toolbox — hammer, glue, saw — with wildly different jobs. "For a large class of cases… the meaning of a word is its use in the language."

      ## Key ideas
      - **Language games**: builders calling "slab!", giving orders, telling jokes, praying, reporting — each an activity with its own rules, embedded in a **form of life**.
      - **Family resemblance**: "games" share no single common feature, only overlapping similarities, like faces in a family. Many concepts lack necessary and sufficient conditions.
      - **Rule-following**: what makes it true that "+2" means continuing 1000, 1002, 1004 and not 1000, 1004, 1008? Not any inner mental picture — only a shared practice. Kripke's 1982 reading turned this into a skeptical paradox.
      - **Private language argument**: meaning can't rest on purely private inner labels.
      - Philosophical problems arise "when language goes on holiday"; the aim is to show the fly the way out of the fly-bottle.

      Meaning-as-use sounds strikingly like how language models learn: meaning from patterns of use, with no definitions. Whether that vindicates Wittgenstein, or shows use without a form of life isn't enough, is one version of the language-model understanding debate.
    `,
  }),

  entry('private-language', 'question', LANG, 'curious', 'The Private Language Argument', {
    summary: 'Could you invent a word for a sensation only you can know — and use it correctly? Wittgenstein argued no: without any public check, "seems right" and "is right" collapse.',
    aliases: ['private language argument', 'private language', 'beetle in a box'],
    tags: ['meaning', 'Wittgenstein', 'mind'],
    year: 1953,
    body: md`
      ## The diary
      Suppose you want to track a recurring sensation, so you write "S" in a diary each time it occurs. The sign's meaning is fixed by privately concentrating on the sensation. Wittgenstein asks: what makes a later use of "S" *correct*? Only your impression that it's the same sensation. "Whatever is going to seem right to me is right. And that only means that here we can't talk about 'right'." A rule no one — not even you — could check isn't a rule.

      ## The beetle in the box
      Everyone has a box with something they call a "beetle" inside; no one can look in anyone else's box. The word "beetle" could still be used in the community's language — but the thing in the box would "drop out of consideration as irrelevant". It could be different for each person, or constantly changing, or nothing at all.

      ## Why it matters
      It targets a picture shared by Descartes, the empiricists and many theories of qualia: that we first know our own inner states and then name them, and that other minds are a problem of inference. For Wittgenstein, sensation words get their meaning from public expressions — "pain" is learned in place of crying — so the other-minds problem is misconceived.

      Critics reply that Robinson Crusoe could follow rules alone, and that the argument, if it works, only shows private languages can't be *shared*, not that private sensations lack names.
    `,
  }),

  entry('speech-acts', 'theory', LANG, 'curious', 'Speech Acts', {
    summary: '"I promise", "I bet", "I now pronounce you married" don’t describe anything — they do something. Austin showed saying is a kind of doing.',
    aliases: ['speech act', 'speech acts', 'performative', 'performative utterance', 'illocutionary act', 'How to Do Things with Words'],
    tags: ['meaning', 'action'],
    year: 1955,
    body: md`
      ## Austin's discovery
      In his 1955 Harvard lectures, published as *How to Do Things with Words* (1962), J. L. Austin noticed **performatives**: "I name this ship the *Queen Elizabeth*", "I bet you ₹100 it'll rain", "I do" (at a wedding). They aren't true or false; they can go wrong in other ways — "infelicities": if you're not the person entitled to name the ship, or the bet isn't taken up.

      Then he generalised: every utterance does several things at once:
      - **Locutionary** act: saying something with a meaning.
      - **Illocutionary** act: what you *do* in saying it — asserting, warning, promising, ordering.
      - **Perlocutionary** act: the effect *by* saying it — persuading, scaring, amusing.

      "There's a bull in that field" can be a report, a warning, or a threat.

      ## Where it went
      John Searle (1969) classified speech acts and their rules. Grice's implicature explains how we mean more than we say. **Social ontology**: money, marriages and companies exist because we collectively *declare* them so (Searle, 1995). **Feminist philosophy** used speech-act theory in arguments about whether some speech subordinates or silences (Rae Langton, 1993).

      In the Mīmāṃsā school, the Vedic injunction ("one who desires heaven should sacrifice") was analysed as a command whose force creates a duty — a much older theory of language as action.
    `,
  }),

  entry('implicature', 'concept', LANG, 'curious', 'Implicature', {
    summary: '“Some students passed” suggests not all did — though it doesn’t say so. Grice explained how cooperative conversation lets us mean far more than our words literally state.',
    aliases: ['implicature', 'conversational implicature', 'Gricean maxims', 'cooperative principle', 'scalar implicature'],
    tags: ['meaning', 'everyday'],
    year: 1975,
    body: md`
      ## The cooperative principle
      Paul Grice ("Logic and Conversation", William James Lectures 1967, published 1975) proposed that conversation assumes cooperation, organised into **maxims**:
      - **Quantity**: be as informative as needed, no more.
      - **Quality**: say only what you believe true and have evidence for.
      - **Relation**: be relevant.
      - **Manner**: be clear, brief, orderly.

      When someone seems to break a maxim, listeners infer what they must have meant to keep the cooperation going. That inferred meaning is an **implicature**.

      ## Examples
      - A reference letter for a philosophy job: "Mr X's command of English is excellent, and his attendance at tutorials has been regular." Saying so little implicates he's no good at philosophy.
      - "Some of the students passed" implicates "not all" (**scalar implicature**) — but it can be cancelled: "some, in fact all, passed" isn't a contradiction. Cancellability separates implicature from entailment.
      - "Is there a petrol pump nearby?" "There's one round the corner." Implicated: as far as I know, it's open.

      ## Why it matters to philosophers
      Grice used implicature to defend the logician's "and", "or" and "if" (material conditional): the odd-sounding cases are true but misleading, not false. It's also a practical tool for reading contracts, politics, and AI chat output — and for noticing when you're being misled by true statements.
    `,
  }),

  entry('naming-necessity', 'theory', LANG, 'curious', 'Naming and Necessity', {
    summary: 'Names aren’t hidden descriptions; they refer directly, fixed by a chain of use back to a baptism. And some necessary truths — water is H₂O — are discovered by science.',
    aliases: ['Naming and Necessity', 'rigid designator', 'rigid designation', 'causal theory of reference', 'a posteriori necessity', 'water is H2O'],
    tags: ['meaning', 'modality'],
    year: 1970,
    body: md`
      ## The lectures (1970)
      Saul Kripke gave three lectures at Princeton in January 1970, without notes; published as *Naming and Necessity* (1980), they changed philosophy of language and metaphysics together.

      ## Against descriptions
      If "Gödel" meant "the man who proved incompleteness", then if someone named Schmidt had actually proved it and Gödel stolen the proof, "Gödel" would refer to Schmidt. It wouldn't: we'd say *Gödel* was a fraud. Names aren't abbreviated descriptions (against Frege and Russell).

      ## The alternative
      - A name is a **rigid designator**: it picks out the same object in every possible world where that object exists. "Nixon might have lost the 1968 election" is about Nixon, in a world where he lost.
      - Reference is fixed by an initial **baptism** and passed along a **causal chain** of speakers, each intending to use the name as the person they got it from did. You can refer to Aristotle while knowing almost nothing about him.

      ## Necessity discovered
      If "water" rigidly designates the stuff *this* is, and science shows this is H₂O, then water = H₂O **necessarily** — yet known only **a posteriori**. That split necessity from a priori knowledge and revived essences. Kripke then used it against the mind–brain identity theory. Putnam's Twin Earth, written at the same time, drew out consequences for meaning.

      ${survey('Theory of reference', 'causal 46%, descriptive 22%, deflationary 15%')}
    `,
  }),

  entry('twin-earth', 'example', LANG, 'curious', 'Twin Earth', {
    summary: 'On Twin Earth a liquid exactly like water is XYZ, not H₂O. When your twin says "water", do you both mean the same thing? Putnam: no — "meanings just ain’t in the head".',
    aliases: ['Twin Earth', 'semantic externalism', 'content externalism', 'meanings ain’t in the head', 'division of linguistic labour'],
    tags: ['meaning', 'thought experiment', 'mind'],
    year: 1975,
    body: md`
      ## The case (Hilary Putnam, "The Meaning of 'Meaning'", 1975)
      Imagine Twin Earth, a planet exactly like Earth except that the clear, drinkable, wet stuff in its lakes and rain is not H₂O but a different compound, XYZ. Go back to 1750, before chemistry. Oscar on Earth and Twin Oscar are molecule-for-molecule alike, with identical experiences and beliefs about "water".

      Yet Oscar's word "water" refers to H₂O and Twin Oscar's to XYZ. Same heads, different meanings. So "meanings just ain't in the head" — they depend on the environment. This is **semantic externalism**.

      ## The division of linguistic labour
      Putnam's second point: you can't tell elms from beeches, but your word "elm" still refers to elms, because you defer to experts who can. Meaning is partly **social**. Tyler Burge (1979) extended this to beliefs themselves: someone who says "I have arthritis in my thigh" (it's a joint disease) has a belief *about arthritis* only because of their community's usage.

      ## Consequences
      - If the *contents* of thoughts depend on the world outside, self-knowledge gets puzzling: do you know what you're thinking?
      - It powers Putnam's argument that you can't coherently think you're a brain in a vat.
      - For language models: whose environment fixes what the model's "water" refers to — the world, or only the humans whose text it learned from?

      ${survey('Mental content', 'externalism 58%, internalism 26%')}
    `,
  }),

  entry('logical-positivism', 'theory', LANG, 'curious', 'Logical Positivism', {
    summary: 'A statement is meaningful only if it can be verified by experience or is true by definition. Everything else — metaphysics, theology, ethics — is literally nonsense. It didn’t survive its own test.',
    aliases: ['logical positivism', 'logical empiricism', 'verification principle', 'verificationism', 'Vienna Circle', 'Language, Truth and Logic'],
    tags: ['meaning', 'science', 'history'],
    year: 1929,
    body: md`
      ## The Vienna Circle
      In the 1920s and 30s a group of philosophers and scientists in Vienna — Moritz Schlick, Rudolf Carnap, Otto Neurath, with Kurt Gödel attending — published a manifesto in 1929, "The Scientific Conception of the World". Inspired by the Tractatus, Einstein's relativity and modern logic, they wanted philosophy to become the logic of science.

      ## The verification principle
      A statement is **cognitively meaningful** only if it is either (a) analytic — true by meaning, like logic and maths — or (b) empirically verifiable. "God exists", "the Absolute is perfect", "murder is wrong" pass neither test, so they're neither true nor false but meaningless — at best expressions of feeling. A. J. Ayer brought the gospel to English readers in *Language, Truth and Logic* (1936), and with it emotivism in ethics.

      ## Why it fell
      - **Self-refutation**: the verification principle itself is neither analytic nor empirically verifiable.
      - **Too strong**: universal laws ("all electrons have charge −e") can't be conclusively verified. Weaker versions ("confirmable in principle") kept letting nonsense in.
      - **Quine's "Two Dogmas"** (1951) attacked both the analytic–synthetic distinction and the idea of testing sentences one by one.
      - Popper proposed falsifiability as a criterion of *science*, not meaning.

      The Circle scattered with the rise of Nazism (Schlick was murdered in 1936). Its style — clear, logical, science-minded — became analytic philosophy.
    `,
  }),

  entry('theories-of-truth', 'theory', LANG, 'curious', 'Theories of Truth', {
    summary: 'What makes a statement true? Matching the facts, fitting with other beliefs, working in practice — or is "true" just a handy device for saying things like "everything she said is true"?',
    aliases: ['theories of truth', 'correspondence theory', 'coherence theory of truth', 'pragmatist theory of truth', 'deflationism about truth', 'T-schema', 'snow is white'],
    tags: ['foundations', 'meaning'],
    year: 1933,
    latex: md`\ulcorner S \urcorner \text{ is true} \iff S \qquad \text{e.g. "snow is white" is true} \iff \text{snow is white}`,
    variables: [[md`\ulcorner S \urcorner`, 'A name of the sentence S']],
    body: md`
      ## The candidates
      - **Correspondence**: a statement is true if it corresponds to a fact. Aristotle: "to say of what is that it is, or of what is not that it is not, is true." Trouble: what exactly is a fact, and what is "correspondence"?
      - **Coherence**: true beliefs are ones that fit together in a comprehensive, consistent system. Trouble: a consistent fairy tale.
      - **Pragmatist** (Peirce, James): truth is what inquiry would converge on, or what works. James's version — true is "the expedient in the way of our thinking" — drew Russell's ridicule.
      - **Deflationary**: "'Snow is white' is true" says no more than "snow is white". The word "true" is a device for endorsing statements you can't list ("everything the Buddha said is true") — not a deep property.

      ## Tarski (1933)
      Alfred Tarski gave a mathematically precise definition for formal languages, built around the **T-schema**: "$S$" is true iff $S$. To avoid the liar paradox, a language's truth predicate must be defined in a richer **metalanguage**. His work underlies model theory and much of formal semantics.

      Indian epistemologists debated whether truth is **intrinsic** (svataḥ prāmāṇya — a cognition is true by default until defeated, the Mīmāṃsā view) or **extrinsic** (parataḥ — confirmed by later success, the Nyāya view): a pragmatist theory centuries before Peirce.

      ${survey('Truth', 'correspondence 51%, deflationary 25%, epistemic 10%')}
    `,
  }),

  entry('linguistic-relativity', 'theory', LANG, 'curious', 'Linguistic Relativity', {
    summary: 'Does the language you speak shape how you think? The strong Sapir–Whorf hypothesis is dead; weaker effects on colour, space and time are real and measurable.',
    aliases: ['linguistic relativity', 'Sapir–Whorf hypothesis', 'Sapir-Whorf', 'Whorfian', 'linguistic determinism'],
    tags: ['meaning', 'mind', 'science'],
    year: 1940,
    body: md`
      ## The hypothesis
      Benjamin Lee Whorf, a fire-insurance inspector and student of Edward Sapir, argued in 1940 that "we dissect nature along lines laid down by our native languages". His famous claim that the Hopi language has no words for time, so the Hopi conceive time differently, was later shown to be wrong (Ekkehart Malotki's *Hopi Time*, 1983, is 600 pages of Hopi time expressions).

      - **Strong version** (linguistic determinism): language determines thought; you can't think what your language can't say. Almost no one holds this — translation, and new words for new ideas, would be impossible.
      - **Weak version**: language influences habitual attention, memory and categorisation.

      ## Evidence for the weak version
      - **Colour**: Russian has separate basic words for light blue (*goluboy*) and dark blue (*siniy*); Russian speakers are measurably faster at telling those shades apart (Winawer and colleagues, 2007).
      - **Space**: speakers of Guugu Yimithirr (Australia) and Tzeltal (Mexico) use absolute directions ("the cup is north of the plate") instead of left/right, and they keep track of compass directions constantly, even indoors.
      - **Grammatical gender** and **number** have smaller, more contested effects.

      Wittgenstein: "The limits of my language mean the limits of my world" (Tractatus 5.6) — a line that looks Whorfian but is about logic. And Indian grammarians like Bhartṛhari held that all cognition is interwoven with language — a much stronger claim, made fifteen centuries before Whorf.
    `,
  }),

  entry('gavagai', 'example', LANG, 'curious', 'Gavagai', {
    summary: 'A native speaker points at a rabbit and says "gavagai". Rabbit? Rabbit-part? Rabbit-stage? Quine argued no evidence could ever settle which — translation is indeterminate.',
    aliases: ['gavagai', 'indeterminacy of translation', 'radical translation', 'inscrutability of reference', 'Word and Object'],
    tags: ['meaning', 'thought experiment'],
    year: 1960,
    body: md`
      ## Radical translation (Quine, *Word and Object*, 1960)
      A linguist arrives among speakers of a totally unknown language — no dictionaries, no bilinguals. A rabbit scurries by; a native says "Gavagai!" The linguist writes down "rabbit" and tests it: point at rabbits, ask "Gavagai?", note assent or dissent.

      But every situation that prompts assent to "Gavagai" for "rabbit" also contains an **undetached rabbit part**, a **temporal stage of a rabbit**, and an instance of **rabbithood**. Adjust the translation of the natives' words for "same" and "is" and each hypothesis fits all possible evidence equally well. So reference is **inscrutable**, and translation is **indeterminate**: not just unknown, but with no fact of the matter.

      ## Why so radical
      Quine was a behaviourist about meaning: all there is to meaning is dispositions to assent and dissent. If behaviour can't decide, nothing can. And the same applies at home: when *you* say "rabbit", nothing fixes whether you mean rabbits or rabbit-stages — only that the whole scheme works.

      ## Replies
      Most linguists and philosophers reject the extreme conclusion: children learning words show strong biases toward whole objects, and shared human psychology constrains interpretation (Davidson's principle of charity). But gavagai remains the sharpest statement of how little raw data fixes meaning — a problem machine-translation systems solve in practice by statistics over enormous amounts of use.
    `,
  }),
];
