// Helpers for Agora's content: the Lattice ones, plus a year on each entry, short builders for
// "Try it" calculators, and a one-line "what philosophers think" note from the 2020 PhilPapers Survey.

import { BT, entry as latticeEntry, md } from '../../lattice/content/helpers.js';

export { BT, md };

// Same shape as a Lattice entry, with an optional year for the timeline.
// Ancient years are approximate (the timeline shows 470 BCE for "c. 470 BCE").
export const entry = (id, type, area, status, title, fields = {}) => ({
  ...latticeEntry(id, type, area, status, title, fields),
  year: fields.year ?? null,
  videos: [],
});

// A thinker: year of birth on the timeline, dates and one-line summary.
export const person = (id, title, fields = {}) =>
  entry(id, 'person', AREA.PEOPLE, 'curious', title, { ...fields, tags: ['thinker', ...(fields.tags || [])] });

// Calculator pieces.
export const input = (key, label, unit, value, min, max, extra = {}) => ({ key, label, unit, value, min, max, ...extra });
export const out = (label, unit, expr, extra = {}) => ({ label, unit, expr, ...extra });
export const LOG = { log: true };
export const INT = { integer: true };

// The 2020 PhilPapers Survey: about 1,785 philosophers at leading departments, "accept or lean
// towards" each answer. Several answers could be picked, so rows can add up to more than 100%.
export const survey = (question, answers) =>
  `**What philosophers think** — ${question} (2020 PhilPapers Survey): ${answers}.`;

export const AREA = {
  LOGIC: 'logic',
  KNOW: 'knowledge',
  REAL: 'reality',
  MIND: 'mind',
  SCIENCE: 'science',
  LANG: 'language',
  ETHICS: 'ethics',
  POLITICS: 'politics',
  GOD: 'religion',
  LIVING: 'living',
  INDIA: 'india',
  EAST: 'east-asia',
  PEOPLE: 'thinkers',
  MISC: 'miscellany',
};

export const AREAS = [
  {
    id: AREA.LOGIC,
    name: 'Logic, Paradox & Decisions',
    color: '#4f9ee8',
    description: 'What makes an argument good, the paradoxes that break our rules, Gödel, and how to choose when you are unsure.',
  },
  {
    id: AREA.KNOW,
    name: 'Knowledge & Doubt',
    color: '#2bb3a3',
    description: 'What knowing is, whether we can know anything, reason versus experience, induction, and reasoning with probabilities.',
  },
  {
    id: AREA.REAL,
    name: 'Reality & Metaphysics',
    color: '#8b7cf6',
    description: 'What exists, what things are, identity over time, free will, causation, possible worlds and time itself.',
  },
  {
    id: AREA.MIND,
    name: 'Mind & Consciousness',
    color: '#e0697a',
    description: 'How minds fit into a physical world, consciousness and qualia, the self, and whether machines could think.',
  },
  {
    id: AREA.SCIENCE,
    name: 'Science, Physics & Maths',
    color: '#5cc8e0',
    description: 'How science works and what it tells us, what quantum mechanics and relativity mean, and whether numbers are real.',
  },
  {
    id: AREA.LANG,
    name: 'Language & Meaning',
    color: '#f48fb1',
    description: 'How words hook onto the world: sense and reference, names, descriptions, Wittgenstein, speech acts and implicature.',
  },
  {
    id: AREA.ETHICS,
    name: 'Ethics',
    color: '#7cc56f',
    description: 'What we ought to do and why: consequences, duties, virtues, care, what morality is, and the hard cases.',
  },
  {
    id: AREA.POLITICS,
    name: 'Society & Justice',
    color: '#e5845a',
    description: 'Why have a state at all, what makes a society just, liberty, voting, cooperation, power and resistance.',
  },
  {
    id: AREA.GOD,
    name: 'God & Religion',
    color: '#e6c07b',
    description: 'The classic arguments for and against God, faith and reason, miracles, and the God of the philosophers.',
  },
  {
    id: AREA.LIVING,
    name: 'How to Live',
    color: '#d07fd8',
    description: 'Stoics and Epicureans, happiness and flourishing, death, the absurd, existentialism, Nietzsche, beauty and meaning.',
  },
  {
    id: AREA.INDIA,
    name: 'Indian Philosophy',
    color: '#f0a449',
    description: 'The darśanas, ways of knowing, Nyāya logic, Sāṅkhya, Vedānta, Buddhist and Jain thought, the Gītā and Kauṭilya.',
  },
  {
    id: AREA.EAST,
    name: 'Chinese & Japanese Thought',
    color: '#b5c23a',
    description: 'Confucius and Mencius, the Dao and wú wéi, Zhuangzi, Mohists and Legalists, Zen, Dōgen and ikigai.',
  },
  {
    id: AREA.PEOPLE,
    name: 'Thinkers',
    color: '#bcaaa4',
    description: 'The people behind the ideas — who they were, what they changed, and where to go next from each.',
  },
  {
    id: AREA.MISC,
    name: 'Miscellany',
    color: '#6b7385',
    description: 'Random other stuff. Anything that does not have a home yet.',
  },
];
