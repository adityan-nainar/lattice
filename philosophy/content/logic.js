// Logic, Paradox & Decisions: the tools of argument, the paradoxes that test them, and choosing under uncertainty.

import { AREA, entry, input, INT, LOG, md, out, survey } from './helpers.js';

const { LOGIC } = AREA;

export const LOGIC_ENTRIES = [
  entry('validity-soundness', 'concept', LOGIC, 'curious', 'Validity and Soundness', {
    summary: 'An argument is valid if the conclusion must be true whenever the premises are; sound if it is valid and the premises really are true.',
    aliases: ['validity', 'soundness', 'valid argument', 'sound argument', 'premises'],
    tags: ['foundations', 'argument'],
    body: md`
      ## Form, not content
      An **argument** is a set of premises offered in support of a conclusion. Logic asks one narrow question about it: *if* the premises were true, would the conclusion have to be?

      - **Valid**: there is no possible situation where every premise is true and the conclusion false.
      - **Sound**: valid, *and* the premises actually are true. Only sound arguments guarantee their conclusions.

      Validity is about shape. "All fish fly; Nemo is a fish; so Nemo flies" is perfectly valid — and unsound, because the first premise is false. "Some cats are black; Tom is a cat; so Tom is black" has true-looking parts but is invalid: the premises allow Tom to be ginger.

      ## Why it matters
      Most philosophical fights are about which premise to give up. Once an argument is laid out validly, you can't dodge the conclusion by complaining about the reasoning — you have to name the premise you reject. That is the discipline behind the cogito, the ontological argument, the zombie argument and the Chinese Room.

      A useful habit: when an argument seems to prove too much, look for an equivocation — a word quietly changing meaning between premises — or a premise doing more work than it admits. Deduction gives certainty only by never going beyond what the premises already contain; induction goes further and pays in certainty.
    `,
  }),

  entry('deduction-induction', 'concept', LOGIC, 'curious', 'Deduction, Induction and Abduction', {
    summary: 'Three ways to reason: from rules to a certain conclusion, from cases to a likely rule, and from evidence to the best explanation.',
    aliases: ['deduction', 'deductive', 'inductive reasoning', 'inductive inference'],
    tags: ['foundations', 'argument'],
    body: md`
      ## Three moves
      - **Deduction** — the conclusion is contained in the premises. *All humans are mortal; Socrates is human; so Socrates is mortal.* Truth-preserving, but it never tells you anything the premises didn't already say.
      - **Induction** — from observed cases to a general rule or the next case. *Every swan I've seen is white; so the next one will be.* It adds information, and so it can fail: Europeans met black swans in Australia in 1697.
      - **Abduction**, or inference to the best explanation — from evidence to the hypothesis that would best explain it. *The grass is wet and the sky is clear; it probably rained overnight* (or the sprinkler ran). Detectives, doctors and scientists do this all day.

      ## The trade-off
      Deduction is safe and sterile; induction and abduction are fertile and risky. Hume showed that induction can't be justified by deduction (that would need a premise like "the future resembles the past", which is itself inductive). Popper tried to run science on deduction alone, with falsifiability. Bayesians treat all three as updating probabilities.

      Indian logic merged the moves: the Nyāya inference *the hill has fire, because it has smoke, like a kitchen* states a general rule and grounds it in an example in the same breath.
    `,
  }),

  entry('propositional-logic', 'equation', LOGIC, 'curious', 'Propositional Logic', {
    summary: 'The logic of "and", "or", "not" and "if…then": whole sentences as true/false switches, and truth tables to test any argument built from them.',
    aliases: ['propositional logic', 'truth table', 'truth-functional', 'Boolean logic', 'material conditional'],
    tags: ['formal logic'],
    year: 1847,
    latex: md`P \to Q \;\equiv\; \lnot P \lor Q`,
    variables: [
      ['P, Q', 'Sentences that are either true (1) or false (0)'],
      [md`\lnot`, 'not'],
      [md`\land,\ \lor`, 'and, or (inclusive)'],
      [md`\to`, 'if … then (the material conditional)'],
    ],
    body: md`
      ## Sentences as switches
      Propositional logic ignores what sentences are about and tracks only whether they are true. Connectives combine them, and a **truth table** lists every combination: with $n$ basic sentences there are $2^n$ rows, so any argument in this logic can be checked mechanically. George Boole made this algebra in 1847; Claude Shannon noticed in 1937 that relay circuits obey it, and every chip since is Boolean logic in silicon.

      ## The strange "if"
      "If $P$ then $Q$" is counted false **only** when $P$ is true and $Q$ false. So "if the Moon is cheese, then 2 + 2 = 5" comes out *true*, because the "if" part is false. This material conditional is useful and odd — it is why "a false statement implies anything". Much of philosophy of language, and relevance logic, is about how real "if"s differ.

      ## Valid in one line
      An argument is valid when no row makes all premises true and the conclusion false. Modus ponens passes; affirming the consequent fails on the row $P = 0, Q = 1$.
    `,
    calc: {
      inputs: [
        input('P', 'P is', '1 = true, 0 = false', 1, 0, 1, INT),
        input('Q', 'Q is', '1 = true, 0 = false', 0, 0, 1, INT),
      ],
      outputs: [
        out('not P', '', '1 - P', { digits: 1 }),
        out('P and Q', '', 'min(P, Q)', { digits: 1 }),
        out('P or Q', '', 'max(P, Q)', { digits: 1 }),
        out('If P then Q', '', 'max(1 - P, Q)', { digits: 1 }),
        out('P if and only if Q', '', '1 - abs(P - Q)', { digits: 1 }),
        out('Either P or Q, not both', '', 'abs(P - Q)', { digits: 1 }),
      ],
      note: '"If P then Q" is false in exactly one row: P = 1, Q = 0. Try all four rows.',
    },
  }),

  entry('modus-ponens', 'equation', LOGIC, 'curious', 'Modus Ponens and Modus Tollens', {
    summary: 'The two workhorse valid forms — "if P then Q; P; so Q" and "if P then Q; not Q; so not P" — and their two invalid look-alikes.',
    aliases: ['modus ponens', 'modus tollens', 'affirming the consequent', 'denying the antecedent'],
    tags: ['formal logic', 'argument'],
    latex: md`\frac{P \to Q \qquad P}{Q} \qquad\qquad \frac{P \to Q \qquad \lnot Q}{\lnot P}`,
    variables: [
      [md`P \to Q`, 'If P then Q'],
      [md`\lnot`, 'not'],
    ],
    body: md`
      ## Two valid, two invalid
      | Form | Shape | Valid? |
      |---|---|---|
      | Modus ponens | If P then Q. P. So Q. | yes |
      | Modus tollens | If P then Q. Not Q. So not P. | yes |
      | Affirming the consequent | If P then Q. Q. So P. | **no** |
      | Denying the antecedent | If P then Q. Not P. So not Q. | **no** |

      "If it rained, the road is wet. The road is wet. So it rained" — maybe a tanker spilled water. The invalid forms feel natural, which is why they are the most common formal fallacies.

      ## One person's modus ponens…
      Philosophers say "one person's modus ponens is another's modus tollens". If an argument runs *if P then Q; P; so Q*, and you find Q absurd, the same premise lets you run *not Q; so not P*. G. E. Moore did this to the skeptic: "if I can't rule out dreaming, I don't know I have hands; but I do know I have hands; so…" Which way you run it depends on what you're more sure of.

      Modus tollens is also Popper's engine of science: if the theory is true, the prediction holds; the prediction fails; so the theory is false.
    `,
  }),

  entry('syllogism', 'concept', LOGIC, 'curious', 'The Syllogism', {
    summary: 'Aristotle’s logic of "all", "some" and "no": two premises sharing a middle term yield a conclusion. The first formal logic, and the only one for two thousand years.',
    aliases: ['syllogism', 'syllogistic', 'term logic', 'Barbara'],
    tags: ['formal logic', 'history'],
    year: -350,
    body: md`
      ## Aristotle's invention
      In the *Prior Analytics* (c. 350 BCE) Aristotle noticed that arguments like

      > All mammals are animals. All whales are mammals. So all whales are animals.

      are valid purely because of their **form** — swap in any terms and validity survives. He catalogued which of the 256 combinations of "all / some / no / some…not" premises are valid (24 moods, depending on how you count) and gave the valid ones proofs. Medieval students memorised them by nonsense names: *Barbara*, *Celarent*, *Darii*, *Ferio*…

      ## Its limits
      Syllogistic handles one-place properties ("is a mammal") but not relations. It cannot represent "everyone loves someone" or prove that if a horse is an animal, the head of a horse is the head of an animal. Kant thought logic was a finished science because it hadn't advanced since Aristotle — about eighty years before Frege rebuilt it from scratch with quantifiers.

      In India the Nyāya school developed its own five-step inference independently, with a worked example built into the form.
    `,
  }),

  entry('predicate-logic', 'concept', LOGIC, 'curious', 'Quantifiers and Predicate Logic', {
    summary: 'Frege’s 1879 logic of "for all x" and "there is an x": enough to write down all of mathematics, and the logic every philosopher now uses.',
    aliases: ['predicate logic', 'first-order logic', 'quantifier', 'Begriffsschrift'],
    tags: ['formal logic', 'history'],
    year: 1879,
    latex: md`\forall x\,\exists y\; \mathrm{Loves}(x, y) \;\;\not\equiv\;\; \exists y\,\forall x\; \mathrm{Loves}(x, y)`,
    variables: [
      [md`\forall x`, 'for every x'],
      [md`\exists y`, 'there is at least one y'],
    ],
    body: md`
      ## The breakthrough
      In a 90-page booklet, the *Begriffsschrift* ("concept-script", 1879), Gottlob Frege split sentences into **predicates** and **arguments** and added **quantifiers**. For the first time logic could handle relations and nested generality:

      - "Everyone loves someone": $\forall x\,\exists y\,L(x,y)$ — each person has *some* beloved, possibly different.
      - "Someone is loved by everyone": $\exists y\,\forall x\,L(x,y)$ — one person everyone loves.

      Swapping the quantifiers changes the meaning, and much bad reasoning (in philosophy and outside) is a quiet quantifier swap: "every event has a cause, so there is a cause of every event".

      ## What followed
      First-order logic is **complete** (Gödel, 1929): every valid formula has a proof. But arithmetic written in it is **incomplete** (Gödel, 1931). Russell's paradox wrecked Frege's attempt to derive arithmetic from logic alone. And Russell used quantifiers to dissolve puzzles about "the present King of France" in his theory of descriptions.
    `,
  }),

  entry('laws-of-thought', 'concept', LOGIC, 'curious', 'The Laws of Thought', {
    summary: 'Non-contradiction (nothing is both P and not-P), excluded middle (everything is P or not-P) and identity (A is A). Aristotle called the first the firmest principle of all.',
    aliases: ['law of non-contradiction', 'non-contradiction', 'law of excluded middle', 'excluded middle', 'law of identity', 'bivalence'],
    tags: ['foundations', 'formal logic'],
    year: -340,
    latex: md`\lnot(P \land \lnot P) \qquad P \lor \lnot P \qquad A = A`,
    variables: [
      [md`\lnot(P \land \lnot P)`, 'Non-contradiction'],
      [md`P \lor \lnot P`, 'Excluded middle'],
    ],
    body: md`
      ## Aristotle's firmest principle
      In *Metaphysics* Γ Aristotle argues that non-contradiction can't be proved — every proof would assume it — but that anyone who denies it refutes themselves the moment they say something definite. Excluded middle and bivalence (every statement is true or false) usually come along with it.

      ## Challenged from several sides
      - **Future contingents**: is "there will be a sea battle tomorrow" true *now*? Aristotle himself hesitated.
      - **Intuitionists** (Brouwer, 1900s) reject excluded middle for infinite mathematics: you may not claim "P or not P" until you can prove one of them.
      - **Vagueness**: is a borderline heap a heap or not? Some responses to the sorites give up bivalence.
      - **Dialetheists** accept a few true contradictions, like the liar sentence.
      - Indian logic's **catuṣkoṭi** lists four options — is, is not, both, neither — and the Jain **syādvāda** seven.

      ${survey('Logic', 'classical 54%, non-classical 26%')} On true contradictions: impossible 71%, actual 12%.
    `,
  }),

  entry('dialetheism', 'theory', LOGIC, 'curious', 'Dialetheism', {
    summary: 'The view that some contradictions are true — the liar sentence, perhaps — paired with a logic in which one contradiction doesn’t make everything true.',
    aliases: ['dialetheism', 'dialetheist', 'paraconsistent logic', 'paraconsistent', 'true contradictions', 'explosion principle'],
    tags: ['formal logic', 'paradox'],
    year: 1979,
    body: md`
      ## Explosion
      In classical logic, from a contradiction you can prove anything (*ex falso quodlibet*): from $P$ get "$P$ or $Q$"; from $\lnot P$ conclude $Q$. So one contradiction makes a theory trivial. A **paraconsistent logic** blocks this step, so contradictions stay local instead of exploding.

      ## Going further
      Graham Priest (*The Logic of Paradox*, 1979) argued for **dialetheism**: some contradictions are *true*. The liar sentence, "this sentence is false", is his lead example — every attempt to make it just true or just false generates a new "revenge" liar, so perhaps it is both. Russell's paradox, the boundaries of motion (Zeno) and legal inconsistencies are other candidates.

      Priest and Jay Garfield have also read Nāgārjuna's catuṣkoṭi and Madhyamaka texts as using dialetheic reasoning — a bridge between modern logic and classical Buddhist thought, though a contested reading.

      Paraconsistent logics are used whether or not you are a dialetheist: databases and legal codes contain contradictions and still need to be reasoned about.
    `,
  }),

  entry('fallacies', 'concept', LOGIC, 'curious', 'Informal Fallacies', {
    summary: 'Arguments that persuade without supporting their conclusion: attacking the person, the straw man, begging the question, the slippery slope and the rest.',
    aliases: ['fallacy', 'informal fallacy', 'ad hominem', 'straw man', 'begging the question', 'slippery slope', 'false dilemma', 'equivocation'],
    tags: ['argument', 'everyday'],
    body: md`
      ## The usual suspects
      - **Ad hominem** — attacking the arguer, not the argument. (But "this witness was paid" can be relevant: it is about reliability, not truth.)
      - **Straw man** — refuting a weaker version of the view than the one held. The cure is the principle of charity.
      - **Begging the question** — assuming the conclusion in the premises: "the Bible is true because it says so".
      - **False dilemma** — "either we ban it or we accept chaos".
      - **Slippery slope** — claiming one step must lead to the extreme without showing why. (Some slopes really are slippery; the fallacy is in not arguing it.)
      - **Equivocation** — a word changing meaning mid-argument: "a feather is light; what is light cannot be dark; so a feather cannot be dark".
      - **Appeal to nature**, **appeal to popularity**, **tu quoque** ("you do it too"), **post hoc** ("after, so because of").

      ## A warning label
      Fallacy-spotting turns lazy fast: most real arguments are inductive and partial, and shouting "slippery slope!" can be its own evasion. The older tradition — Aristotle's *Sophistical Refutations* and the Nyāya catalogue of *hetvābhāsa* ("pseudo-reasons") — treated fallacies as ways an honest reasoner goes wrong, not as debating weapons.
    `,
  }),

  entry('socratic-method', 'concept', LOGIC, 'curious', 'The Socratic Method', {
    summary: 'Question someone about what they claim to know until the contradictions in their beliefs show — and leave both of you knowing that you don’t know.',
    aliases: ['Socratic method', 'elenchus', 'aporia', 'Socratic ignorance', 'Socratic questioning'],
    tags: ['argument', 'history'],
    year: -400,
    body: md`
      ## How it runs
      In Plato's early dialogues Socrates asks someone who claims expertise to define a virtue — courage, piety, justice. They offer a definition; he asks questions they agree to; the answers contradict the definition. Repeat. The dialogue usually ends in **aporia**, a puzzled impasse. The *Euthyphro* ends this way on piety and gives us the Euthyphro dilemma.

      This refutation-by-questioning is the **elenchus**. It shows inconsistency, not falsehood: at least one of your beliefs has to go, and you choose which.

      ## Knowing you don't know
      The Delphic oracle called Socrates the wisest man in Athens. He decided it was because he alone knew he didn't know — **Socratic ignorance**. (The slogan "I know that I know nothing" is a later compression; Plato's *Apology* has him say he doesn't *think* he knows what he doesn't know.)

      ## Where it lives on
      Law schools, therapy (CBT's "Socratic questioning"), and good tutoring all use it. It is also exactly what you do when you jot a question for an AI and then keep asking "but why?". Its risk is the same one Athens noticed: people don't enjoy being shown they're confused, and it helped get Socrates executed in 399 BCE.
    `,
  }),

  entry('principle-of-charity', 'concept', LOGIC, 'curious', 'The Principle of Charity', {
    summary: 'Interpret others so that what they say comes out as sensible as possible before you criticise it. Refute the steelman, not the straw man.',
    aliases: ['principle of charity', 'steelman', 'steelmanning', 'interpretive charity'],
    tags: ['argument', 'everyday'],
    year: 1959,
    body: md`
      ## Two versions
      - **Everyday charity**: before disagreeing, state the other view so well that its holder would say "yes, that's it" — then reply. Refuting a weak version is the straw man fallacy; building the strongest version is **steelmanning**.
      - **Davidson's charity** (1970s): understanding a language *requires* assuming its speakers mostly believe truths and reason well. If your translation has them believing wild falsehoods, the translation is probably wrong. Charity is not politeness here; it is a condition of interpretation at all.

      ## Why it pays
      Charity makes you harder to fool and easier to change your mind: if the best version of a view still fails, you have learned something; if it succeeds, you have learned more. It also matches the Nyāya rules of debate, which distinguished honest *vāda* (discussion aimed at truth) from *jalpa* (debate to win) and *vitaṇḍā* (pure attack).

      The name comes from N. L. Wilson (1959); Quine and Davidson made it central to meaning and radical translation.
    `,
  }),

  entry('necessary-sufficient', 'concept', LOGIC, 'curious', 'Necessary and Sufficient Conditions', {
    summary: 'A is necessary for B if you can’t have B without A; sufficient if A alone guarantees B. Definitions hunt for conditions that are both.',
    aliases: ['necessary condition', 'sufficient condition', 'necessary and sufficient', 'if and only if'],
    tags: ['foundations', 'argument'],
    body: md`
      ## The two directions
      - Oxygen is **necessary** for fire: no oxygen, no fire. But not sufficient: oxygen alone doesn't burn.
      - Being a square is **sufficient** for being a rectangle, not necessary.
      - "A if and only if B" means each is necessary *and* sufficient for the other.

      In logic: "if A then B" makes A sufficient for B and B necessary for A — a flip people get wrong constantly ("only if" marks the necessary one).

      ## The hunt for definitions
      Classical analysis asks for necessary and sufficient conditions for knowledge, justice, causation, personhood. The most famous result is negative: in 1963 Gettier cases showed "justified true belief" is not sufficient for knowledge, and sixty years of patching haven't produced an agreed fix.

      Wittgenstein suspected many words have no such definition at all: the things we call "games" share only overlapping **family resemblances**. And the sorites shows vague words may lack sharp conditions altogether.
    `,
  }),

  entry('paradoxes', 'concept', LOGIC, 'curious', 'What Paradoxes Are For', {
    summary: 'Apparently good reasoning from apparently true premises to an apparently false conclusion. Every paradox forces you to give something up — and choosing what is the philosophy.',
    aliases: ['paradox', 'veridical paradox', 'falsidical paradox', 'antinomy'],
    tags: ['paradox', 'foundations'],
    year: 1962,
    body: md`
      ## Three kinds (Quine, 1962)
      - **Veridical** — the surprising conclusion is actually true. Monty Hall: switching really does win two-thirds of the time. Hilbert's Hotel: an infinite hotel really can be full and still take a guest.
      - **Falsidical** — there is a hidden mistake in the reasoning. Zeno's Achilles: an infinite series of steps can add up to a finite time.
      - **Antinomies** — the reasoning looks airtight and the conclusion contradicts itself, so something basic must change. The liar paradox and Russell's paradox reshaped logic and set theory.

      ## How to hold one
      Write the paradox as a list of claims that each seem true but can't all be. Then every solution is a choice of which claim to deny, and the cost of each choice is visible. The sorites, Newcomb's problem, the surprise exam, the Ship of Theseus, Sleeping Beauty and the problem of evil all work this way.

      Physics has its own: the twin paradox (veridical), Maxwell's demon (falsidical, eventually), and the measurement problem (still open).
    `,
  }),

  entry('liar-paradox', 'question', LOGIC, 'curious', 'The Liar Paradox', {
    summary: '"This sentence is false." If it’s true, it’s false; if it’s false, it’s true. Two and a half thousand years on, there is no agreed solution.',
    aliases: ['liar paradox', 'this sentence is false', 'liar sentence', 'Epimenides paradox'],
    tags: ['paradox', 'self-reference'],
    year: -350,
    body: md`
      ## The loop
      Let $L$ = "$L$ is false". If $L$ is true, then what it says holds, so it's false. If it's false, then what it says fails, so it's true. Eubulides of Miletus posed it in the 4th century BCE; the Cretan Epimenides saying "all Cretans are liars" is a weaker cousin (it can simply be false).

      ## Ways out, and their prices
      - **Tarski** (1933): a language can't contain its own truth predicate; "true" for language 0 lives in language 1, and so on up. Clean, but English plainly does talk about its own truth.
      - **Kripke** (1975): truth is built up in stages; the liar never gets a value — it is "ungrounded". But then "the liar is not true" seems true, and we're back (the **revenge** problem).
      - **Dialetheism**: the liar is both true and false, in a logic that tolerates it.
      - **Buddhist and Jain** logicians had their own self-reference puzzles — Nāgārjuna's "I have no thesis" was attacked as self-refuting.

      ## Why it isn't a toy
      Gödel turned "this sentence is false" into "this sentence is not provable", and got his incompleteness theorems. Turing's halting problem is the same diagonal trick. Self-reference is where formal systems meet their limits.
    `,
  }),

  entry('sorites', 'question', LOGIC, 'curious', 'The Sorites Paradox', {
    summary: 'One grain of sand isn’t a heap; adding one grain never turns a non-heap into a heap; so no number of grains makes a heap. Vagueness breaks simple logic.',
    aliases: ['sorites', 'paradox of the heap', 'vagueness', 'borderline case', 'bald man paradox'],
    tags: ['paradox', 'vagueness'],
    year: -350,
    body: md`
      ## The argument
      1. 1 grain is not a heap.
      2. If $n$ grains aren't a heap, $n + 1$ grains aren't either.
      3. So 1,000,000 grains aren't a heap.

      Each premise looks true, the steps are modus ponens, and the conclusion is false. Eubulides again (4th century BCE), with a companion about how many hairs make a man bald. The same structure hits "tall", "adult", "alive", "red", "a person" — which is why it matters for law and medical ethics.

      ## Solutions on offer
      - **Epistemicism** (Williamson): there *is* a sharp cut-off — some exact grain makes a heap — we just can't know where. Bold, logic-preserving, and strange.
      - **Supervaluationism**: a sentence is true if true on *every* acceptable sharpening of "heap". "There is a cut-off" comes out true, though no particular cut-off is.
      - **Degrees of truth** (fuzzy logic): "5,000 grains is a heap" is 0.7 true; premise 2 is *almost* true every time, and the small losses add up.
      - **Metaphysical vagueness**: the world itself has blurry boundaries — clouds, mountains.

      ${survey('Vagueness', 'semantic 52%, epistemic 24%, metaphysical 21%')}
    `,
  }),

  entry('zeno-paradoxes', 'question', LOGIC, 'curious', "Zeno's Paradoxes", {
    summary: 'Achilles can never catch the tortoise: by the time he reaches where it was, it has moved on — forever. Zeno’s puzzles about motion took infinite series to answer.',
    aliases: ["Zeno's paradoxes", 'Achilles and the tortoise', 'dichotomy paradox', 'arrow paradox'],
    tags: ['paradox', 'infinity'],
    year: -450,
    latex: md`t = \frac{d}{v_A}\left(1 + r + r^2 + \cdots\right) = \frac{d}{v_A}\,\frac{1}{1 - r} = \frac{d}{v_A - v_T}, \qquad r = \frac{v_T}{v_A}`,
    variables: [
      ['d', 'The tortoise’s head start'],
      [md`v_A,\ v_T`, 'Speeds of Achilles and the tortoise'],
      ['r', 'Ratio of their speeds: each catch-up stage is r times the last'],
    ],
    body: md`
      ## The paradoxes
      Zeno of Elea (c. 490–430 BCE) defended his teacher Parmenides, who said change is illusion, with arguments that motion is contradictory:
      - **Achilles**: to catch the tortoise he must reach where it was, by which time it has moved; repeat forever.
      - **Dichotomy**: to cross a room you must first cross half, then half the rest… infinitely many tasks.
      - **Arrow**: at each instant the arrow occupies a space equal to itself, so is at rest; time is made of instants; so it never moves.

      ## The maths answer
      Infinitely many stages can take finite time: the stage times form a geometric series. With a 100 m head start and Achilles ten times faster, the stages take 10 s, 1 s, 0.1 s… totalling $11.1\overline{1}$ s. Cauchy's limits (1820s) made this rigorous.

      ## Is that the end?
      Not quite. Critics ask whether an infinite sequence of *tasks* can be *completed* — "supertasks" like Thomson's lamp (1954), switched at 1, ½, ¼… minutes: is it on or off at 2 minutes? And the arrow asks what velocity at an instant *is*, answered by the derivative, which Zeno never had. In quantum physics the "quantum Zeno effect" — watching an unstable system often enough freezes it — borrows his name.
    `,
    calc: {
      inputs: [
        input('va', 'Achilles’ speed', 'm/s', 10, 1, 12),
        input('vt', 'Tortoise’s speed', 'm/s', 1, 0.01, 9),
        input('d', 'Head start', 'm', 100, 1, 10000, LOG),
      ],
      outputs: [
        out('Speed ratio r', '', 'vt/va', { key: 'r', digits: 3 }),
        out('Time to catch up', 's', 'd/(va - vt)', { key: 'tc', digits: 4 }),
        out('Distance Achilles runs', 'm', 'va*tc', { digits: 4 }),
        out('Time of the first stage', 's', 'd/va', { digits: 4 }),
        out('Stages until the gap is under 1 mm', '', 'floor(ln(d/0.001)/ln(1/r)) + 1', { digits: 3 }),
      ],
      note: 'Infinitely many stages, finite total time: every stage is r times the one before.',
    },
  }),

  entry('russells-paradox', 'question', LOGIC, 'curious', "Russell's Paradox", {
    summary: 'The set of all sets that don’t contain themselves: does it contain itself? Either answer contradicts itself — and it sank Frege’s foundations of arithmetic in a single letter.',
    aliases: ["Russell's paradox", 'barber paradox', 'naive set theory'],
    tags: ['paradox', 'self-reference', 'foundations of maths'],
    year: 1901,
    latex: md`R = \{\,x \mid x \notin x\,\} \;\Rightarrow\; \big(R \in R \iff R \notin R\big)`,
    variables: [
      ['R', 'The set of all sets that are not members of themselves'],
      [md`\in`, 'is a member of'],
    ],
    body: md`
      ## The letter
      Frege's *Basic Laws of Arithmetic* assumed that any condition defines a set. In June 1902, as volume 2 was at the printer, Bertrand Russell wrote to him: consider the set of all sets that are not members of themselves. If it's a member of itself, it isn't; if it isn't, it is. Frege replied that "arithmetic totters" and added a hasty appendix.

      The popular version: a village barber shaves all and only those who don't shave themselves. Who shaves the barber? (That version just shows no such barber exists; the set version is worse, because the naive rule *guaranteed* the set exists.)

      ## What changed
      - **Type theory** (Russell and Whitehead, *Principia Mathematica*, 1910–13): sets come in levels, and nothing can contain itself.
      - **ZF set theory** (Zermelo 1908, Fraenkel 1922): sets are built only by permitted operations from existing sets. This is the foundation most mathematicians use.
      - It is the liar paradox in set form, and the same diagonal pattern as Cantor's proof and Gödel's theorems.
    `,
  }),

  entry('godel-incompleteness', 'theory', LOGIC, 'curious', "Gödel's Incompleteness Theorems", {
    summary: 'Any consistent formal system strong enough for arithmetic contains true statements it can’t prove — and can’t prove its own consistency.',
    aliases: ['incompleteness theorem', "Gödel's theorem", 'Gödel sentence', 'Hilbert’s programme'],
    tags: ['foundations of maths', 'self-reference'],
    year: 1931,
    body: md`
      ## The theorems (1931)
      Kurt Gödel, aged 25, took any consistent, effectively listable set of axioms $F$ that includes basic arithmetic and showed:
      1. There is a sentence $G_F$ that $F$ can neither prove nor refute. Read the right way, $G_F$ says "I am not provable in $F$" — so if $F$ is consistent, $G_F$ is *true* and unprovable.
      2. $F$ cannot prove its own consistency.

      The trick is **Gödel numbering**: formulas and proofs become numbers, so arithmetic can talk about its own proofs — the liar paradox tamed into "this is unprovable".

      ## What it killed, and what it didn't
      It ended **Hilbert's programme** of proving all of mathematics consistent by finite means. It does *not* show that maths is unreliable, that "truth is relative", or (as often claimed) anything about God or the law. Adding $G_F$ as an axiom just creates a new unprovable $G$ for the bigger system.

      ## The mind question
      Lucas (1961) and Penrose (1989) argued humans can "see" the truth of Gödel sentences that machines can't, so minds aren't computers. Most logicians reply that we can only see $G_F$ is true *if* we know $F$ is consistent — which we usually can't. The argument is a live link between logic and the philosophy of mind.
    `,
  }),

  entry('modal-logic', 'concept', LOGIC, 'curious', 'Modal Logic', {
    summary: 'The logic of "necessarily" and "possibly". Read through possible worlds: necessary means true in all of them, possible means true in at least one.',
    aliases: ['modal logic', 'necessary truth', 'necessity and possibility', 'contingent truth', 'S5'],
    tags: ['formal logic', 'modality'],
    year: 1959,
    latex: md`\Box P \iff \lnot \Diamond \lnot P \qquad\quad \Diamond\Box P \to \Box P \;\;(\text{in } S5)`,
    variables: [
      [md`\Box P`, 'Necessarily P: true in every possible world'],
      [md`\Diamond P`, 'Possibly P: true in at least one possible world'],
    ],
    body: md`
      ## Box and diamond
      C. I. Lewis built the first modern modal systems (1918–32). Saul Kripke, as a teenager, gave them a clean semantics (published 1959–63): a set of possible worlds, an "accessibility" relation between them, and $\Box P$ true at a world when $P$ holds at every world accessible from it. Different rules on accessibility give different logics — the strongest common one, **S5**, makes every world accessible from every other.

      ## Why philosophers care
      - **Necessary vs contingent**: 2 + 2 = 4 couldn't have been false; "Paris is in France" could have been.
      - The modal **ontological argument**: in S5, "possibly necessarily God exists" entails "necessarily God exists" — so the whole argument rests on whether God's necessary existence is even possible.
      - **Conceivability arguments** about zombies and dualism move from "conceivable" to "possible".
      - Kripke's *Naming and Necessity* found necessary truths known only by experience: water = H₂O.

      Relatives: **temporal logic** ("always", "eventually") verifies computer chips and protocols; **deontic logic** handles "obligatory" and "permitted"; **epistemic logic** handles "knows".
    `,
  }),

  entry('surprise-exam', 'question', LOGIC, 'curious', 'The Surprise Exam Paradox', {
    summary: 'A teacher announces a surprise exam next week. It can’t be Friday (you’d know Thursday night), so not Thursday either… so it can’t happen. Then it comes on Wednesday, a surprise.',
    aliases: ['surprise exam', 'unexpected hanging', 'surprise examination'],
    tags: ['paradox', 'self-reference', 'knowledge'],
    year: 1948,
    body: md`
      ## The backward induction
      "There will be an exam one day next week (Mon–Fri), and you won't know the day until that morning."
      - Not Friday: if Thursday passes with no exam, you'd know it's Friday — no surprise.
      - So not Thursday: with Friday ruled out, Wednesday night you'd know.
      - …and so on back to Monday. The student concludes no surprise exam is possible, relaxes — and is surprised on Wednesday.

      Published by D. J. O'Connor in 1948 and spread as the "unexpected hanging".

      ## Where the argument slips
      - The student uses "I will still believe the announcement on Thursday night" at each step, but by then the announcement may have become self-undermining — knowledge of the future that erases itself when used.
      - Quine: the student should keep open the possibility that the teacher is wrong, and then Friday *could* be a surprise.
      - It's a cousin of Moore's paradox ("it's raining but I don't believe it") and of the liar: the announcement refers to the student's own knowledge of it.

      Backward induction also drives game theory — the centipede game and the finitely repeated prisoner's dilemma — where real people also refuse to follow it all the way back.
    `,
  }),

  entry('expected-utility', 'equation', LOGIC, 'curious', 'Expected Utility', {
    summary: 'Weigh each outcome’s value by its probability and add up. With utility curved like log(wealth), a bet with positive expected money can still be a bad bet.',
    aliases: ['expected utility', 'decision theory', 'expected value', 'risk aversion', 'certainty equivalent'],
    tags: ['decisions', 'probability'],
    year: 1944,
    latex: md`EU(A) = \sum_i p_i\, U(x_i) \qquad U(w) = \ln w \;\;\text{(Bernoulli, 1738)}`,
    variables: [
      [md`p_i`, 'Probability of outcome i if you choose A'],
      [md`U(x_i)`, 'How much you value that outcome — its utility'],
      ['w', 'Total wealth'],
    ],
    body: md`
      ## From money to utility
      Expected **value** multiplies money by probability. It fails badly on the St Petersburg paradox, so in 1738 Daniel Bernoulli proposed maximising expected **utility**, with utility growing like the logarithm of wealth: the thousandth rupee of a pauper matters more than the thousandth of a millionaire.

      In 1944 von Neumann and Morgenstern proved that if your preferences obey four axioms (completeness, transitivity, continuity, independence), you act *as if* maximising expected utility for some utility function. That turned a proposal into the standard theory of rational choice.

      ## Where it strains
      - **Allais paradox** (1953): most people's choices violate the independence axiom.
      - **Pascal's wager**: infinite utilities break the arithmetic.
      - **Newcomb's problem**: two ways of computing the probabilities — evidential and causal — give opposite advice.
      - Prospect theory (Kahneman and Tversky, 1979) describes what people actually do: losses hurt about twice as much as equal gains please.

      Try the calculator: a coin flip that pays more than it costs has positive expected money, but with log utility you may still rationally decline.
    `,
    calc: {
      inputs: [
        input('wealth', 'Your wealth', '₹', 500000, 10000, 100000000, LOG),
        input('p', 'Chance of winning', '%', 50, 1, 99),
        input('win', 'You win', '₹', 110000, 1000, 10000000, LOG),
        input('loss', 'You lose', '₹', 100000, 1000, 10000000, LOG),
      ],
      outputs: [
        out('Expected money from the bet', '₹', 'p/100*win - (1 - p/100)*loss'),
        out('Expected log-utility, bet', '', 'p/100*ln(wealth + win) + (1 - p/100)*ln(max(wealth - loss, 1))', { key: 'eu', digits: 6 }),
        out('Certainty equivalent of the bet', '₹', 'exp(eu) - wealth', { key: 'ce' }),
        out('Take it? (1 = yes, 0 = no)', '', 'if(ce, 1, 0)', { digits: 1 }),
      ],
      note: 'With ₹5 lakh, a 50–50 bet to win ₹1.1 lakh or lose ₹1 lakh has +₹5,000 expected money but a negative certainty equivalent. Raise your wealth and see when it flips.',
    },
  }),

  entry('st-petersburg', 'example', LOGIC, 'curious', 'The St Petersburg Paradox', {
    summary: 'A coin game whose expected payout is infinite — yet nobody would pay more than about ₹20 to play. The puzzle that invented utility.',
    aliases: ['St Petersburg paradox', 'St. Petersburg paradox', 'St Petersburg game'],
    tags: ['decisions', 'paradox', 'probability'],
    year: 1713,
    latex: md`E = \sum_{k=1}^{\infty} \frac{1}{2^k}\, 2^k = 1 + 1 + 1 + \cdots = \infty`,
    variables: [
      ['k', 'Toss on which the first head appears'],
      [md`2^k`, 'Payout if the first head is on toss k'],
    ],
    body: md`
      ## The game
      Toss a fair coin until it lands heads. If that takes $k$ tosses, you win $2^k$ coins: 2, 4, 8, 16… Each term in the expected value is $\tfrac{1}{2^k}\cdot 2^k = 1$, and there are infinitely many, so the expectation is infinite. Would you pay your life savings to play once? Nobody would. Nicolaus Bernoulli posed it in 1713; his cousin Daniel published a solution in St Petersburg in 1738.

      ## Three answers
      1. **Utility** — Daniel Bernoulli: value wealth by its logarithm. The expected log-gain is $\sum 2^{-k} \ln 2^k = 2\ln 2$, a certainty equivalent of just 4 coins for someone starting from nothing.
      2. **Finite banks** — no casino can pay $2^{40}$. Cap the payout at the bank's size and the fair price collapses to about $\log_2(\text{bank}) + 1$: a billion-coin bank makes it worth only about 31.
      3. **Ignore tiny probabilities** — Buffon's idea (1777): treat a 1-in-a-trillion chance as zero. That is also a proposed answer to Pascal's mugging.

      Physicists like it too: it is a toy model of why ensemble averages and time averages differ (ergodicity), which leads straight to the Kelly criterion.
    `,
    calc: {
      inputs: [input('bank', 'The casino can pay at most', 'coins', 1e9, 2, 1e15, LOG)],
      outputs: [
        out('Tosses the bank can cover in full', '', 'floor(log2(bank))', { key: 'rounds', digits: 3 }),
        out('Fair price with this bank', 'coins', 'rounds + bank/2^rounds', { digits: 4 }),
        out('A bank 1,000× bigger adds only', 'coins', 'log2(1000)', { digits: 3 }),
      ],
      note: 'Every doubling of the bank adds about one coin to the fair price — the infinity lives entirely in impossible payouts.',
    },
  }),

  entry('newcombs-problem', 'question', LOGIC, 'curious', "Newcomb's Problem", {
    summary: 'A near-perfect predictor has filled an opaque box with ₹10 lakh only if it predicted you’d take that box alone. Take one box or both? Philosophers split almost evenly.',
    aliases: ["Newcomb's problem", "Newcomb's paradox", 'one-boxing', 'two-boxing', 'causal decision theory', 'evidential decision theory'],
    tags: ['decisions', 'paradox', 'free will'],
    year: 1969,
    body: md`
      ## The set-up
      Two boxes. A clear one holds ₹1,000. An opaque one holds ₹10 lakh **or nothing**. Yesterday a predictor, right about almost everyone so far, put the money in only if it predicted you would take *just* the opaque box. You may take the opaque box, or both.

      ## Both answers look obviously right
      - **One-box** (evidential reasoning): one-boxers almost always walk away with ₹10 lakh; two-boxers with ₹1,000. Choose the act that is good news.
      - **Two-box** (causal reasoning): the money is already there or not. Whatever is in the opaque box, taking both gets you ₹1,000 more. Your choice can't reach back and change yesterday.

      Robert Nozick published it in 1969 (from the physicist William Newcomb) and wrote that "to almost everyone it is perfectly clear and obvious what should be done. The difficulty is that these people seem to divide almost evenly."

      ${survey("Newcomb's problem", 'two boxes 39%, one box 31%')}

      ## Why it matters
      It splits decision theory into **causal** and **evidential** camps, it is the prisoner's dilemma played against a copy of yourself, and it asks whether being predictable is compatible with free will. In AI it is live: an agent that others can simulate faces Newcomb-like problems all the time.
    `,
    calc: {
      inputs: [
        input('acc', 'Predictor accuracy', '%', 99, 50, 100),
        input('big', 'Opaque box (if filled)', '₹', 1000000, 10000, 100000000, LOG),
        input('small', 'Clear box', '₹', 1000, 1, 1000000, LOG),
      ],
      outputs: [
        out('Average for one-boxers', '₹', 'acc/100*big'),
        out('Average for two-boxers', '₹', '(1 - acc/100)*big + small'),
        out('Accuracy where the averages tie', '%', '(big + small)/(2*big)*100', { digits: 4 }),
      ],
      note: 'These are evidential averages. The two-boxer’s reply: whatever is already in the box, taking both adds the clear box — your choice now doesn’t change what the predictor did yesterday.',
    },
  }),
];
