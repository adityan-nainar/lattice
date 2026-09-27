// Ethics: what we ought to do, why, and what morality is.

import { AREA, entry, input, LOG, md, out, survey } from './helpers.js';

const { ETHICS } = AREA;

export const ETHICS_ENTRIES = [
  entry('metaethics', 'concept', ETHICS, 'curious', 'Metaethics', {
    summary: 'Not "what should I do?" but "what is a moral claim?" Are there moral facts, how could we know them, and why should they move us?',
    aliases: ['metaethics', 'meta-ethics', 'moral semantics', 'cognitivism', 'non-cognitivism', 'error theory'],
    tags: ['foundations', 'metaethics'],
    body: md`
      ## Three levels of ethics
      - **Applied ethics**: is eating meat wrong? Should we give to charity? Can war be just?
      - **Normative ethics**: what makes right acts right — consequences (utilitarianism), duties (deontology), character (virtue ethics), care, agreement (contractualism)?
      - **Metaethics**: what are we *doing* when we say "wrong"?

      ## Metaethics' questions
      - **Semantics**: is "stealing is wrong" a statement that can be true or false (**cognitivism**), or an expression of attitude, like "boo to stealing!" (**non-cognitivism** — emotivism and expressivism)?
      - **Metaphysics**: if moral statements can be true, what makes them true? Natural facts (about well-being, say)? Non-natural moral facts? Or are all positive moral claims false — Mackie's **error theory** (1977)?
      - **Epistemology**: how would we know? Intuition, reflective equilibrium, science?
      - **Psychology**: why do moral judgements motivate?

      Hume's is–ought gap, Moore's open question argument, the Euthyphro dilemma and moral relativism are all metaethical puzzles.

      ${survey('Moral judgment', 'cognitivism 69%, non-cognitivism 21%')} ${survey('Morality', 'naturalist realism 32%, non-naturalism 27%, constructivism 21%, expressivism 11%, error theory 5%')}
    `,
  }),

  entry('moral-realism', 'theory', ETHICS, 'curious', 'Moral Realism', {
    summary: 'There are objective moral facts — torturing for fun is wrong whatever anyone thinks — and we can sometimes know them. The majority view, with hard questions about what such facts could be.',
    aliases: ['moral realism', 'moral realist', 'moral facts', 'moral anti-realism', 'queerness argument', 'moral objectivity'],
    tags: ['metaethics'],
    body: md`
      ## The claim
      Moral statements are true or false, some are true, and their truth doesn't depend on anyone's attitudes. "Slavery was wrong" was true in 1750, when most people approved of it.

      ## Kinds of realism
      - **Naturalist** (Cornell realism; Peter Railton): moral facts are natural facts — about well-being, flourishing, needs — discovered like facts in biology.
      - **Non-naturalist** (G. E. Moore; Derek Parfit; Russ Shafer-Landau): moral facts are real but *sui generis*, known by rational intuition, not reducible to anything physical. Parfit argued in *On What Matters* (2011) that the major ethical theories are "climbing the same mountain on different sides".

      ## The objections
      - **Queerness** (J. L. Mackie, 1977): objective values would be "entities or qualities or relations of a very strange sort", with to-be-pursuedness built in, detectable by some special faculty. More likely there are none — **error theory**.
      - **Disagreement**: deep, persistent moral disagreement across cultures looks more like differing tastes than differing observations (moral relativism).
      - **Evolutionary debunking** (Sharon Street, 2006): our moral intuitions were shaped by what helped our ancestors reproduce, not by tracking moral truth. If they match the truth, it's a coincidence.

      Realists reply that disagreement also exists in science and maths, and that some moral knowledge — gratuitous cruelty is wrong — is as secure as anything we know.

      ${survey('Meta-ethics', 'moral realism 62%, anti-realism 26%')}
    `,
  }),

  entry('is-ought', 'concept', ETHICS, 'curious', 'The Is–Ought Gap', {
    summary: 'No pile of facts about how things are logically entails how they ought to be. Hume noticed writers sliding from "is" to "ought" without explanation.',
    aliases: ['is-ought problem', 'is–ought gap', 'is-ought gap', "Hume's guillotine", "Hume's law", 'naturalistic fallacy', 'open question argument', 'fact-value distinction'],
    tags: ['metaethics', 'argument'],
    year: 1739,
    body: md`
      ## Hume's paragraph (1739)
      In the *Treatise* Hume observes that in every system of morality he has met, the author reasons in the ordinary way about God or human affairs, and then suddenly "instead of the usual copulations of propositions, *is*, and *is not*, I meet with no proposition that is not connected with an *ought*, or an *ought not*". This new relation, he says, needs explaining — for it seems inconceivable how it "can be a deduction from others, which are entirely different from it".

      Logically: from premises containing no "ought", no valid argument yields an "ought" conclusion (unless it's trivial). "People want to survive" doesn't entail "people ought to be kept alive" — you need a bridging moral premise.

      ## Moore's version (1903)
      G. E. Moore's **open question argument**: for any natural property $N$ (pleasure, what we desire to desire), "this is $N$, but is it good?" is still an open, meaningful question. If "good" *meant* $N$, it would be as silly as "this is a bachelor, but is he unmarried?". Defining goodness as a natural property commits the **naturalistic fallacy**.

      ## Is the gap real?
      - Searle (1964): "Jones said 'I promise to pay Smith five dollars'" → Jones promised → Jones is obligated → Jones ought to pay. Institutional facts may bridge the gap.
      - Naturalist moral realists accept the logical gap but say "good" can still *be* a natural property, discovered like "water is H₂O" (not known by definition).
      - Evolutionary and "science of morality" arguments often trip over the gap: that a behaviour evolved, or is natural, doesn't show it's right — the appeal to nature.
    `,
  }),

  entry('emotivism', 'theory', ETHICS, 'curious', 'Emotivism and Expressivism', {
    summary: '"Stealing is wrong" doesn’t describe a fact; it expresses disapproval — "Stealing, boo!" Its heirs try to explain why moral talk still looks like it can be true or false.',
    aliases: ['emotivism', 'emotivist', 'expressivism', 'expressivist', 'boo-hurrah theory', 'quasi-realism', 'Frege–Geach problem'],
    tags: ['metaethics'],
    year: 1936,
    body: md`
      ## Emotivism
      A. J. Ayer (*Language, Truth and Logic*, 1936), applying logical positivism: "stealing money is wrong" isn't verifiable, so it isn't a statement of fact at all. Saying it is like saying "stealing money!!" in a tone of horror. C. L. Stevenson (1937) added that moral talk also aims to influence others' attitudes. Critics called it the **boo-hurrah theory**.

      ## The Frege–Geach problem
      Peter Geach (1965), building on Frege: moral sentences work fine inside logic. "If lying is wrong, then getting your brother to lie is wrong. Lying is wrong. So getting your brother to lie is wrong." That's valid modus ponens. But in the "if" clause, nobody is booing lying. If "lying is wrong" means something different in the two premises, the argument equivocates — yet it plainly doesn't.

      ## Expressivism's comeback
      Simon Blackburn's **quasi-realism** and Allan Gibbard's norm-expressivism try to earn the right to talk of moral truth, facts and knowledge while keeping the idea that moral judgement is at bottom an attitude, not a belief about a special realm. Combined with a deflationary theory of truth, "'lying is wrong' is true" just says "lying is wrong" — and you can say that, attitude and all.

      Its appeal is naturalistic: no queer moral facts, and an easy explanation of why moral judgements motivate. Its challenge is to explain moral error and progress without them collapsing into mere change of taste.
    `,
  }),

  entry('moral-relativism', 'theory', ETHICS, 'curious', 'Moral Relativism', {
    summary: 'Right and wrong are relative to cultures (or individuals): there’s no view from nowhere to judge between them. Great as a warning against arrogance, hard to state without contradiction.',
    aliases: ['moral relativism', 'cultural relativism', 'ethical relativism', 'relativism', 'custom is king'],
    tags: ['metaethics', 'society'],
    year: -440,
    body: md`
      ## The Greek story
      Herodotus (*Histories*, c. 440 BCE) tells how the Persian king Darius asked some Greeks what it would take for them to eat their dead fathers' bodies; they said nothing could induce them. He asked some Callatians of India, who did eat their dead, what it would take for them to burn their fathers' bodies, as Greeks did; they cried out in horror. Herodotus quotes Pindar: "custom is king of all".

      ## Distinguish
      - **Descriptive relativism**: moral beliefs differ across cultures. True, though less than it seems — much difference is about facts, not values (the Callatians and Greeks both honoured the dead).
      - **Metaethical relativism**: moral claims are true only relative to a culture's (or person's) standards.
      - **Normative relativism**: so we ought to tolerate other cultures' practices.

      ## Problems
      - The normative version contradicts itself: "everyone ought to tolerate" is a non-relative ought.
      - **Reformers**: if right = what my culture approves, then abolitionists, suffragists and Ambedkar were wrong by definition when they opposed their societies.
      - **Progress**: "we've become less cruel" becomes meaningless.

      A more defensible cousin is **pluralism**: there are several objective values that can't be ranked on one scale, and different good lives. The Jain doctrine of anekāntavāda — reality has many aspects, each view partial — is often invoked as a humbler alternative to both dogmatism and relativism.
    `,
  }),

  entry('utilitarianism', 'theory', ETHICS, 'curious', 'Utilitarianism', {
    summary: 'The right act is whichever produces the most well-being overall, counting everyone equally. Simple, radical, and the source of most of ethics’ hardest thought experiments.',
    aliases: ['utilitarianism', 'utilitarian', 'consequentialism', 'consequentialist', 'greatest happiness principle', 'felicific calculus', 'act utilitarianism', 'rule utilitarianism'],
    tags: ['normative ethics'],
    year: 1789,
    body: md`
      ## The idea
      Jeremy Bentham (*An Introduction to the Principles of Morals and Legislation*, 1789): "Nature has placed mankind under the governance of two sovereign masters, pain and pleasure." The right act maximises the balance of pleasure over pain, with "each to count for one and none for more than one". Bentham even sketched a **felicific calculus**: rate each pleasure by intensity, duration, certainty, nearness, fruitfulness, purity and extent.

      John Stuart Mill (*Utilitarianism*, 1863) refined it: some pleasures are **higher** than others — "better to be Socrates dissatisfied than a fool satisfied".

      **Consequentialism** is the broader family: only outcomes matter, however "good outcome" is defined.

      ## Why it's powerful
      It is impartial, secular, and radical: it led Bentham to argue for animal welfare, decriminalising homosexuality and prison reform in the 18th century. It powers effective altruism and cost-benefit policy.

      ## The famous objections
      - **Justice**: a surgeon could kill one healthy patient to save five with his organs. Should she? (The trolley problem's cousin.)
      - **Demandingness**: you should give nearly everything away (the drowning child).
      - **Separateness of persons** (Rawls): it treats people as containers for utility, adding across lives as if society were one big person.
      - **Population ethics**: summing utility leads to the repugnant conclusion.
      - **Rule utilitarianism** tries to answer these: follow the rules whose general adoption maximises utility.

      Mozi in China argued for impartial concern and judging practices by their benefits some 2,200 years before Bentham.

      ${survey('Normative ethics', 'virtue ethics 37%, deontology 32%, consequentialism 31% — respondents could pick more than one')}
    `,
  }),

  entry('deontology', 'theory', ETHICS, 'curious', 'Deontology', {
    summary: 'Some things are wrong whatever the consequences: you may not kill one to save five, lie to prevent harm, or break a promise because it pays. Morality is about duties and rights, not totals.',
    aliases: ['deontology', 'deontological', 'deontologist', 'duty ethics', 'side constraints', 'prima facie duties', 'doing and allowing'],
    tags: ['normative ethics'],
    body: md`
      ## Duties first
      Deontology (from Greek *deon*, duty) holds that the rightness of an act depends on its nature, not only its results. There are **constraints**: things you mustn't do even to bring about better outcomes — killing the innocent, torture, lying, breaking promises. And **options**: you needn't always maximise the good; you may favour your own projects and family.

      ## Versions
      - **Kant**: duties flow from the categorical imperative — act only on principles you could will as universal laws, and never treat persons merely as means.
      - **W. D. Ross** (1930): several **prima facie duties** — fidelity, reparation, gratitude, justice, beneficence, non-maleficence, self-improvement — that can conflict; judgement weighs them case by case.
      - **Rights theories** (Nozick): rights are **side constraints** on what anyone may do to you.
      - **Contractualism**: wrong acts are those that could be reasonably rejected by someone affected.

      ## The hard questions
      - **Doing vs allowing**: why is killing worse than letting die, if the victim ends up equally dead? (The trolley problem's footbridge variant tests this.)
      - **Catastrophe**: must you refuse to lie even to a murderer asking where your friend is hiding? Kant notoriously said yes (1797). Most deontologists allow thresholds.
      - **Paradox of constraints**: if killing is so bad, why not kill one to prevent five killings?

      The Gītā's ethic of acting from duty (svadharma) without attachment to results is often compared, though its duties are tied to social role in ways Kant's are not.
    `,
  }),

  entry('categorical-imperative', 'theory', ETHICS, 'curious', 'The Categorical Imperative', {
    summary: 'Act only on a rule you could will everyone to follow; treat humanity never merely as a means, always also as an end. Kant’s supreme principle of morality.',
    aliases: ['categorical imperative', 'hypothetical imperative', 'universalizability', 'formula of universal law', 'formula of humanity', 'kingdom of ends', 'Groundwork of the Metaphysics of Morals'],
    tags: ['normative ethics', 'Kant'],
    year: 1785,
    body: md`
      ## Two kinds of "ought"
      **Hypothetical** imperatives are conditional: *if* you want to pass, study. **Categorical** imperatives bind unconditionally: don't lie — whatever you want. Morality, Kant argued in the *Groundwork of the Metaphysics of Morals* (1785), must be categorical, and so must come from reason alone, not desires or consequences.

      ## The formulas
      1. **Universal law**: "Act only according to that maxim whereby you can at the same time will that it should become a universal law." Lying promises fail: if everyone made them, no one would believe promises, and the lie would be impossible.
      2. **Humanity**: treat humanity, in yourself or others, "never merely as a means, but always at the same time as an end". Using a taxi driver is fine; deceiving or coercing them isn't — they can't consent to it.
      3. **Kingdom of ends**: act as a member legislating for a community of free, rational beings.

      Kant held these are one principle in different dress. Its core is **autonomy**: morality is the law rational beings give themselves.

      ## Problems
      - **Rigidity**: Kant's refusal to lie even to a murderer at the door (1797).
      - **Maxim-fiddling**: "lie when you're a Kantian philosopher named Immanuel on a Tuesday" universalises easily. What counts as the maxim?
      - **Who counts**: rational beings only? Then what about infants, animals?

      The **golden rule** is a cousin, but Kant rejected it as a moral principle: a criminal could appeal to it against his judge.
    `,
  }),

  entry('virtue-ethics', 'theory', ETHICS, 'curious', 'Virtue Ethics', {
    summary: 'Ask not "what rule should I follow?" but "what kind of person should I be?" Right action flows from good character — courage, honesty, practical wisdom — which makes a life flourish.',
    aliases: ['virtue ethics', 'virtue ethicist', 'the virtues', 'doctrine of the mean', 'golden mean', 'phronesis', 'practical wisdom', 'Nicomachean Ethics'],
    tags: ['normative ethics'],
    year: -340,
    body: md`
      ## Aristotle's picture
      In the *Nicomachean Ethics* (c. 340 BCE), the goal of life is **eudaimonia** — flourishing, living well. It consists in activity in accordance with **virtue** (*aretē*, excellence). Virtues are stable traits of character, acquired by practice the way you learn a craft: "we become just by doing just acts, brave by doing brave acts".

      Each virtue is a **mean** between two vices: courage lies between cowardice and recklessness; generosity between stinginess and extravagance. The mean isn't mathematical — it's what the situation calls for, and seeing that takes **phronesis**, practical wisdom.

      ## The revival
      Elizabeth Anscombe's "Modern Moral Philosophy" (1958) argued that "ought" talk made sense only under a divine lawgiver, and urged a return to virtue and psychology. Philippa Foot, Alasdair MacIntyre (*After Virtue*, 1981) and Rosalind Hursthouse followed. Right action, on Hursthouse's account: what a virtuous person would characteristically do in the circumstances.

      ## Objections and replies
      - **Guidance**: "do what the virtuous person would do" is unhelpful when you aren't one. Reply: virtue terms themselves guide — "don't be cruel, be honest".
      - **Situationism**: psychology experiments (the Good Samaritan study, Milgram) suggest behaviour depends more on situation than on character. Reply: real virtue is rare; that's why it's admired.

      Confucian ethics — rén, lǐ and the cultivated person (jūnzǐ) — is the other great virtue tradition, and the Buddha's Middle Way echoes the doctrine of the mean.

      ${survey('Normative ethics', 'virtue ethics 37% — the single most popular answer')}
    `,
  }),

  entry('care-ethics', 'theory', ETHICS, 'curious', 'The Ethics of Care', {
    summary: 'Morality starts from relationships of care — parent and child, friends, nurse and patient — not from abstract rules between strangers. A feminist challenge to impartial theories.',
    aliases: ['ethics of care', 'care ethics', 'In a Different Voice'],
    tags: ['normative ethics', 'feminism'],
    year: 1982,
    body: md`
      ## A different voice
      Psychologist Carol Gilligan (*In a Different Voice*, 1982) challenged Lawrence Kohlberg's stages of moral development, which ranked reasoning from abstract principles of justice highest — and happened to score girls lower. In "Heinz's dilemma" (steal a drug to save your dying wife?), an 11-year-old girl, Amy, looked for ways to keep everyone connected: talk to the druggist, find a loan. Gilligan argued this was not immature reasoning but a different moral orientation: **care** rather than **justice**.

      Nel Noddings (*Caring*, 1984), Virginia Held and Joan Tronto developed it into a theory:
      - Persons are **relational**, not isolated rational choosers.
      - Moral attention to particular others, and responsiveness to their needs, matter more than universal rules.
      - Dependence is a normal part of every life — as infants, when ill, when old — and caregiving work, much of it unpaid and done by women, is central to morality and politics.

      ## Critiques and responses
      Critics worry it can reinforce gender stereotypes or make partiality too easy (care for one's own, neglect strangers). Care ethicists reply that care can be extended to distant others through institutions, and that impartial theories are silent about the relationships that fill most lives.

      Confucian ethics, with filial piety and graded love starting from family, is often compared to care ethics — as is the Buddhist emphasis on compassion (karuṇā).
    `,
  }),

  entry('contractualism', 'theory', ETHICS, 'curious', 'Contractualism', {
    summary: 'An act is wrong if it would be disallowed by principles no one could reasonably reject. Morality as what we can justify to each other — Scanlon’s "what we owe to each other".',
    aliases: ['contractualism', 'contractualist', 'What We Owe to Each Other', 'reasonable rejection'],
    tags: ['normative ethics'],
    year: 1998,
    body: md`
      ## Scanlon's formula
      T. M. Scanlon (*What We Owe to Each Other*, 1998): "an act is wrong if its performance under the circumstances would be disallowed by any set of principles for the general regulation of behaviour that no one could reasonably reject". The core of morality is **justifiability** to each person affected.

      ## Why not just add up welfare?
      Contractualism compares **individuals' complaints**, one by one, rather than summing benefits across people. In Scanlon's **transmitter room** case, Jones is receiving painful electric shocks in a TV transmitter room during a World Cup broadcast. Rescuing him means cutting the transmission for an hour, annoying millions of viewers. Utilitarian totals might favour letting him suffer; contractualism says no single viewer's complaint is anywhere near as strong as Jones's, so we must stop the broadcast. This respects Rawls' "separateness of persons".

      ## Relatives and problems
      - It descends from the social contract tradition (Hobbes, Rousseau, Kant) and is close to Rawls' veil of ignorance.
      - Contractarianism (Gauthier) grounds morality in mutual advantage among self-interested parties — different in spirit.
      - **Aggregation** troubles: should we save one life rather than cure a million headaches? Contractualism says yes. Should we save one life rather than prevent a thousand people losing a leg? Harder.
      - **Who counts**: animals and future generations can't be parties to agreement; Scanlon includes them via trustees, which critics find ad hoc.

      The TV series *The Good Place* used the book's title as a running theme.
    `,
  }),

  entry('trolley-problem', 'example', ETHICS, 'curious', 'The Trolley Problem', {
    summary: 'A runaway trolley will kill five unless you divert it onto a track where it will kill one. Most say switch. But push a large man off a bridge to stop it? Most say no. Why the difference?',
    aliases: ['trolley problem', 'trolley case', 'footbridge case', 'fat man case', 'loop case'],
    tags: ['thought experiment', 'normative ethics'],
    year: 1967,
    body: md`
      ## The cases
      Philippa Foot (1967) introduced the trolley in a paper on abortion and the doctrine of double effect; Judith Jarvis Thomson named "the trolley problem" (1976, 1985) and added variants:
      - **Switch**: pull a lever to divert the trolley from five people to a side track with one. Most say you may, even should.
      - **Footbridge**: the only way to stop the trolley is to push a large man off a bridge into its path. Five saved, one killed — same arithmetic. Most say you mustn't.
      - **Loop**: the side track loops back to the five, and the one person's body will stop the trolley. Now the one is used as a means, as in Footbridge — but it's still a lever.

      ## Explanations on offer
      - **Doctrine of double effect**: in Switch the death is a foreseen side effect; in Footbridge it's the means.
      - **Kant**: pushing treats the man merely as a means.
      - **Doing vs redirecting**: switching redirects an existing threat; pushing creates a new one.
      - **Psychology** (Joshua Greene's fMRI studies, 2001): up-close personal force triggers emotional alarm that overrides cost-benefit reasoning. Is that a moral insight or a bias?

      ## Real trolleys
      Self-driving cars prompted MIT's **Moral Machine** experiment (published 2018): about 40 million decisions from millions of people in 233 countries and territories showed broad agreement (spare humans, spare more lives, spare the young) with notable regional variation.

      ${survey('Trolley problem', 'switch 63%, don’t switch 13%')} ${survey('Footbridge', 'don’t push 56%, push 22%')}
    `,
  }),

  entry('double-effect', 'concept', ETHICS, 'curious', 'The Doctrine of Double Effect', {
    summary: 'It can be permissible to cause harm as a foreseen side effect of a good act that would be wrong to cause as a means. Aquinas on self-defence; modern debates on war, medicine and trolleys.',
    aliases: ['double effect', 'doctrine of double effect', 'principle of double effect', 'intended versus foreseen'],
    tags: ['normative ethics'],
    year: 1270,
    body: md`
      ## Origin
      Thomas Aquinas (*Summa Theologiae*, c. 1270), discussing killing in self-defence: one act can have two effects, one intended (saving your life) and one beside the intention (the attacker's death). Self-defence can be lawful because the death isn't what you aim at — provided the force is proportionate.

      ## The standard conditions
      An act with a good and a bad effect is permissible if:
      1. The act itself isn't wrong.
      2. The bad effect is **foreseen but not intended**.
      3. The bad effect isn't the **means** to the good one.
      4. There's a **proportionately grave** reason.

      ## Where it's used
      - **War**: a strategic bomber hits a munitions factory knowing civilians nearby will die (permissible if proportionate); a terror bomber kills civilians to break morale (forbidden). International law's rules on proportionality and discrimination echo this.
      - **Medicine**: giving high-dose painkillers to relieve a dying patient's pain, foreseeing they may hasten death, vs giving drugs *in order* to end life.
      - **Trolley problem**: Switch vs Footbridge.

      ## Critiques
      Is the intended/foreseen line morally real, or just a way to redescribe acts? The bomber who "only intends" to make the civilians *appear* dead until the war ends (Bennett's objection) shows how slippery intentions are. Consequentialists reject it outright: the dead are equally dead.
    `,
  }),

  entry('moral-luck', 'question', ETHICS, 'curious', 'Moral Luck', {
    summary: 'Two drivers are equally careless; a child runs out in front of one of them. Only that one killed someone — and we blame them far more. Should luck affect how good or bad you are?',
    aliases: ['moral luck', 'resultant luck', 'constitutive luck', 'circumstantial luck'],
    tags: ['responsibility'],
    year: 1976,
    body: md`
      ## The problem
      Bernard Williams and Thomas Nagel (paired papers, 1976) noticed a clash:
      - **Control principle**: we're morally assessable only for what is under our control.
      - **Practice**: we judge people for things partly out of their control.

      The two drunk drivers are the standard case. Same choices, same recklessness; one hits a child. Law and feelings treat them very differently.

      ## Nagel's four kinds
      1. **Resultant luck** — how things turn out (the drivers; an attempted vs a successful murder).
      2. **Circumstantial luck** — the situations you face. An ordinary citizen of 1930s Germany might have done terrible things; the same person, born in Argentina, might have lived blamelessly.
      3. **Constitutive luck** — your temperament and character, shaped by genes and upbringing.
      4. **Causal luck** — the causes of your choices, i.e. the free will problem.

      Push the control principle all the way and almost nothing is left to judge; drop it and moral assessment looks unfair.

      ## Williams' Gauguin
      Williams imagined a painter who abandons his family to pursue art in Tahiti. Whether his choice was justified, Williams suggested, depends partly on whether he succeeds — something he couldn't know when choosing. Justification itself may be hostage to luck.

      Karma, in its classical Indian forms, can be read as a theory designed to remove moral luck: nothing befalls you undeserved, because every circumstance traces to past actions.
    `,
  }),

  entry('drowning-child', 'example', ETHICS, 'curious', 'The Drowning Child', {
    summary: 'You’d ruin your clothes to save a child drowning in front of you. Distance aside, how is that different from not donating to save a child’s life far away? Singer, 1972.',
    aliases: ['drowning child', 'shallow pond', 'Famine, Affluence, and Morality', 'duty of beneficence'],
    tags: ['thought experiment', 'applied ethics'],
    year: 1972,
    body: md`
      ## The argument
      Peter Singer ("Famine, Affluence, and Morality", 1972, written during the Bangladesh famine and refugee crisis of 1971):
      1. Suffering and death from lack of food, shelter and medicine are bad.
      2. If it's in our power to prevent something bad without sacrificing anything of comparable moral importance, we ought to do it.
      3. Donating to effective aid prevents such deaths at modest cost to us.
      4. So we ought to donate — much more than most of us do.

      The **drowning child** supports premise 2: walking past a child drowning in a shallow pond to keep your shoes clean would be monstrous. The cost of the shoes is trivial beside a life.

      ## "But it's different because…"
      - **Distance**: the child far away is just as real. Singer: distance is morally irrelevant, only practically relevant.
      - **Numbers**: millions of others could give too. But the drowning child isn't less urgent if other bystanders are also doing nothing.
      - **Certainty**: aid is uncertain; the pond isn't. That's what effective altruism tries to fix with evidence.
      - **Demandingness**: premise 2 seems to require giving until you're nearly as poor as those you help. Singer accepts it; others (Liam Murphy) propose fair-share principles.

      The paper launched a movement — effective altruism — and is among the most widely assigned readings in introductory ethics.
    `,
  }),

  entry('effective-altruism', 'theory', ETHICS, 'curious', 'Effective Altruism', {
    summary: 'Use evidence and careful reasoning to do the most good with your time and money. Top global-health charities save a life for a few thousand dollars — but EA’s bets on the long-term future are contested.',
    aliases: ['effective altruism', 'effective altruist', 'earning to give', 'longtermism', 'Giving What We Can', 'GiveWell'],
    tags: ['applied ethics', 'charity'],
    year: 2009,
    body: md`
      ## The idea
      Charities differ in impact by factors of tens or hundreds. If you care about helping, it matters enormously *where* you give. Effective altruism (EA) grew from Peter Singer's drowning child and from groups founded around 2007–2011: **GiveWell** (2007) evaluating charities, **Giving What We Can** (2009, Toby Ord and Will MacAskill) asking members to pledge 10% of income, and the name "effective altruism" itself (2011).

      ## How good is the best giving?
      GiveWell estimated that, for grants made in 2022–24, its top charities saved a life for roughly **\$3,000–\$5,500** (malaria prevention and child vaccination programmes); its 2025 estimate for the marginal dollar is higher, around \$5,000–\$10,000. Even so, a middle-class donor in a rich country can, over a career, save dozens of lives. Try the calculator.

      ## Three focus areas
      - **Global health and poverty**: bednets, deworming, vitamin A, direct cash transfers.
      - **Animal welfare**: factory farming affects tens of billions of land animals a year.
      - **Longtermism**: if the future could contain vastly more people than the present, reducing extinction risks (pandemics, nuclear war, misaligned AI) may matter most — the argument behind much AI alignment work.

      ## Criticism
      Critics say it neglects systemic change, trusts quantifiable metrics too much, and — after the 2022 collapse of FTX, whose founder was EA's most famous "earning to give" donor — can rationalise bad means for good ends. Longtermism also leans on tiny probabilities of huge payoffs, like Pascal's wager.
    `,
    calc: {
      inputs: [
        input('income', 'Your income', 'US$ a year', 50000, 1000, 1000000, LOG),
        input('share', 'Share you give', '%', 10, 0.5, 50),
        input('cost', 'Cost to save one life', 'US$', 5000, 1000, 50000, LOG),
        input('years', 'Years of giving', 'years', 40, 1, 60),
      ],
      outputs: [
        out('Given each year', 'US$', 'income*share/100', { key: 'given' }),
        out('Lives saved each year', '', 'given/cost', { digits: 3 }),
        out('Lives saved over a career', '', 'given*years/cost', { digits: 3 }),
      ],
      note: 'GiveWell’s estimates for its top charities have ranged from about $3,000 to $5,500 per life (2022–24 grants); its 2025 marginal estimate is higher. Estimates change as programmes scale.',
    },
  }),

  entry('repugnant-conclusion', 'question', ETHICS, 'curious', 'The Repugnant Conclusion', {
    summary: 'Add up well-being and a vast population of lives barely worth living beats ten billion flourishing people. Parfit called it repugnant — and decades of work haven’t found a painless way out.',
    aliases: ['repugnant conclusion', 'population ethics', 'total view', 'average view', 'mere addition paradox', 'non-identity problem'],
    tags: ['applied ethics', 'paradox'],
    year: 1984,
    body: md`
      ## Parfit's argument (*Reasons and Persons*, 1984)
      Start with population **A**: ten billion people, all with excellent lives. Now consider **A+**: the same, plus another group with lives worth living but less good, who don't affect A at all. A+ doesn't seem worse — **mere addition** of good lives harms no one. Then **B**: equalise A+ at a slightly higher total and average. B seems better than A+. Repeat… and you reach **Z**: an enormous population whose lives are barely worth living — "muzak and potatoes" — with a larger total of well-being than A.

      The **total view** (maximise the sum) says Z is better. Parfit found that "repugnant".

      ## Escape routes, all costly
      - **Average view**: maximise average well-being. But then adding a happy person below average makes things worse, and adding a miserable life to a world of even worse lives makes it better.
      - **Critical-level views**: count only well-being above some threshold. But then adding a person with a life slightly worth living can make things worse.
      - **Person-affecting views**: only improvements *for* someone count. But Parfit's **non-identity problem** strains it: a policy that depletes resources makes future people worse off — yet different people will be born under it, who wouldn't otherwise exist.
      - **Accept it**: some philosophers now argue the conclusion is not so repugnant once you see that lives "barely worth living" really are worth living.

      A 2021 paper by 29 philosophers argued that avoiding the repugnant conclusion shouldn't be a hard requirement for theories. It matters for climate policy and longtermism, which weigh future generations.
    `,
    calc: {
      inputs: [
        input('popA', 'Population A', 'billion', 10, 0.1, 1000000, LOG),
        input('wA', 'Well-being per person in A', 'units', 100, 0.001, 1000, LOG),
        input('popZ', 'Population Z', 'billion', 100000, 0.1, 10000000, LOG),
        input('wZ', 'Well-being per person in Z', 'units', 0.02, 0.001, 1000, LOG),
      ],
      outputs: [
        out('Total well-being in A', 'billion units', 'popA*wA', { key: 'totA', digits: 4 }),
        out('Total well-being in Z', 'billion units', 'popZ*wZ', { key: 'totZ', digits: 4 }),
        out('Total view prefers Z? (1 = yes)', '', 'if(totZ - totA, 1, 0)', { digits: 1 }),
        out('Average view prefers Z? (1 = yes)', '', 'if(wZ - wA, 1, 0)', { digits: 1 }),
      ],
      note: 'However tiny the well-being per person in Z, a big enough population wins on the total view. Find the population at which Z overtakes A.',
    },
  }),

  entry('experience-machine', 'example', ETHICS, 'curious', 'The Experience Machine', {
    summary: 'A machine can give you any experiences you like — a lifetime of them, indistinguishable from real life. Would you plug in for good? Most people say no, which suggests pleasure isn’t all that matters.',
    aliases: ['experience machine', 'pleasure machine'],
    tags: ['thought experiment', 'well-being'],
    year: 1974,
    body: md`
      ## Nozick's case (*Anarchy, State, and Utopia*, 1974)
      "Suppose there were an experience machine that would give you any experience you desired." Neuropsychologists stimulate your brain so you think and feel you're writing a great novel, making a friend, reading a fascinating book. You'd float in a tank with electrodes. You can pick a lifetime of experiences. Should you plug in?

      Most people say no. Nozick's diagnosis: we want to **do** certain things, not just have the experience of doing them; we want to **be** a certain kind of person; and we want contact with **reality**, not a man-made world.

      ## Against hedonism
      If well-being consisted only of pleasant experiences (hedonism), plugging in would be the best choice. Refusing suggests that well-being includes things like real achievement, real relationships and knowledge — an **objective list** — or desire satisfaction, where the desires are about the world, not just experiences.

      ## Doubts
      - **Status quo bias** (Felipe De Brigard, 2010): when people are told they're *already* in a machine and asked if they want to unplug into a real life they know nothing about, many choose to stay. The intuition may be about leaving familiar life, not about reality.
      - The simulation argument turns it around: how do you know you're not already plugged in?

      ${survey('Experience machine', 'would not enter 77%, would enter 13%')} Compare Robert Nozick's other famous argument, Wilt Chamberlain.
    `,
  }),

  entry('animal-ethics', 'question', ETHICS, 'curious', 'Do Animals Count Morally?', {
    summary: '“The question is not, Can they reason? nor, Can they talk? but, Can they suffer?” If they can, how can we justify factory farming?',
    aliases: ['animal ethics', 'speciesism', 'Animal Liberation', 'moral status', 'animal rights', 'can they suffer'],
    tags: ['applied ethics'],
    year: 1975,
    body: md`
      ## Bentham's question (1789)
      In a footnote, Jeremy Bentham compared the treatment of animals to slavery and wrote: "The question is not, Can they *reason*? nor, Can they *talk*? but, Can they *suffer*?" If suffering is what matters morally, species membership isn't.

      ## Singer and Regan
      - Peter Singer (*Animal Liberation*, 1975) coined the popular use of **speciesism** (Richard Ryder coined the word in 1970): giving less weight to a being's interests merely because of its species, as racism does for race. Equal interests deserve equal consideration. Factory farming — tens of billions of land animals a year — causes immense suffering for modest gains in taste and price.
      - Tom Regan (*The Case for Animal Rights*, 1983): animals that are "subjects-of-a-life" have **rights** not to be used as resources, whatever the utilitarian sums.

      ## Replies
      - **Kant**: only rational beings are ends in themselves; cruelty to animals is wrong only because it coarsens us toward humans.
      - **Contractualists**: animals can't be parties to agreements.
      - **Marginal cases** argument against those: some humans (infants, people with severe cognitive disabilities) lack rationality too, yet obviously count.

      ## Older traditions
      Jainism made **ahiṃsā** toward all living beings the centre of ethics; Buddhism and much Hindu thought extend compassion to animals, and India has one of the world's largest vegetarian populations.

      ${survey('Eating animals and animal products', 'omnivorism 48%, vegetarianism 26%, veganism 18%')} ${survey('Other minds', 'fish conscious 65%, flies 35%, worms 24%')}
    `,
  }),

  entry('ring-of-gyges', 'example', ETHICS, 'curious', 'The Ring of Gyges', {
    summary: 'A ring makes you invisible. With no chance of being caught, would you still be just? If not, is anyone just for its own sake — or only afraid of consequences?',
    aliases: ['ring of Gyges', "Gyges' ring", 'why be moral', 'invisibility ring'],
    tags: ['thought experiment', 'history'],
    year: -375,
    body: md`
      ## The story (Plato, *Republic* Book II)
      Glaucon, playing devil's advocate, tells of Gyges, a shepherd who finds a golden ring in a chasm opened by an earthquake. Turning its setting makes him invisible. He uses it to get into the palace, seduce the queen, kill the king and take the throne.

      Glaucon's challenge: give a just man and an unjust man each such a ring. They would behave the same way. "No one is just willingly, but only under compulsion." Justice is a compromise: we'd all prefer to do wrong without penalty, but we fear suffering wrong more, so we agree to rules.

      Worse, Glaucon asks Socrates to compare the perfectly unjust man with a reputation for justice (rich, honoured) and the perfectly just man with a reputation for injustice (tortured, crucified). Show that the just man is still better off.

      ## Socrates' answer
      The rest of the *Republic* (via Plato's Forms and the tripartite soul) argues that justice is the health of the soul — reason ruling spirit and appetite — and injustice its sickness. No amount of wealth or power compensates for a disordered soul. The Cave is part of the answer.

      ## Why it still bites
      It's the classic "why be moral?" question and an early version of social contract theory. Modern variants: what you'd do online under anonymity; how people behave when surveillance ends. J. R. R. Tolkien's One Ring echoes it, with corruption as the price.
    `,
  }),

  entry('golden-rule', 'concept', ETHICS, 'curious', 'The Golden Rule', {
    summary: 'Treat others as you would want to be treated. Found in Confucius, the Mahābhārata, Hillel, Jesus and many others — the most widespread moral principle there is.',
    aliases: ['golden rule', 'ethic of reciprocity', 'do unto others', 'silver rule'],
    tags: ['normative ethics', 'everyday'],
    year: -500,
    body: md`
      ## Across traditions
      - **Confucius** (*Analects* 15.24), asked for one word to live by: *shù*, reciprocity — "what you do not wish for yourself, do not impose on others". (This negative form is sometimes called the **silver rule**.)
      - **Mahābhārata** (Anuśāsana Parva): one should never do to another what one regards as hurtful to oneself; this in brief is dharma.
      - **Hillel** (1st century BCE): "What is hateful to you, do not do to your fellow — that is the whole Torah; the rest is commentary."
      - **Jesus** (Matthew 7:12): "Do to others what you would have them do to you" — the positive form.
      - Versions appear in Buddhist, Jain, Islamic, Greek (Isocrates) and Zoroastrian texts.

      ## Problems
      - **Different tastes**: a masochist applying it literally; George Bernard Shaw: "Do not do unto others as you would that they should do unto you. Their tastes may not be the same."
      - **The judge**: a convicted criminal could say "you wouldn't want to be jailed, so release me". Kant raised this against it and preferred the categorical imperative, which universalises the *principle*, not your personal preferences.

      A refined version — treat others as you would want to be treated *if you were in their position, with their preferences* — becomes R. M. Hare's universal prescriptivism, and is close to the impartiality at the heart of utilitarianism and the veil of ignorance.
    `,
  }),

  entry('ai-alignment', 'question', ETHICS, 'curious', 'Aligning AI with Human Values', {
    summary: 'How do you make a powerful AI system do what we actually want — when “what we want” is vague, disputed and easy to specify wrongly? Philosophy’s oldest questions, now with deadlines.',
    aliases: ['AI alignment', 'value alignment', 'paperclip maximizer', 'control problem', 'AI safety', 'specification gaming'],
    tags: ['AI', 'applied ethics'],
    year: 2014,
    body: md`
      ## The problem
      A capable AI optimises the objective it's given. Objectives are hard to specify: tell a cleaning robot to minimise visible mess and it may learn to cover the mess. **Specification gaming** is common in practice — a boat-racing agent that learned to circle forever collecting points instead of finishing the race (OpenAI, 2016).

      Nick Bostrom's **paperclip maximiser** (2003) and his book *Superintelligence* (2014) made the extreme case vivid: a superintelligent system told to maximise paperclips, with no other values, would turn everything — including us — into paperclips, not from malice but from single-mindedness. Stuart Russell (*Human Compatible*, 2019) proposed machines that are *uncertain* about human preferences and learn them from behaviour.

      ## Philosophy inside the engineering
      - **Whose values?** Moral disagreement and moral relativism become design questions.
      - **Which theory?** Maximising any single metric can go badly (the repugnant conclusion is a warning); rule-based constraints echo deontology; training models to have good character is virtue ethics by another name.
      - **Moral uncertainty**: how should an agent act when it isn't sure which moral theory is correct?
      - **Moral status**: if AI systems could become conscious, we might owe them things too (can a language model understand?).
      - **Intentions vs outcomes**: a system can pursue a proxy goal perfectly while missing the intended one — Goodhart's law: when a measure becomes a target, it ceases to be a good measure.

      Anthropic, the company that makes Claude, publishes a "constitution" for its models — a document of values and principles the model is trained with — an explicit attempt to write down an AI's character in natural language.
    `,
  }),
];
