// Helpers for Ledger's content: the Lattice ones, plus a year on each entry and short
// builders for "Try it" calculators.

import { BT, entry as latticeEntry, md } from '../../lattice/content/helpers.js';

export { BT, md };

// Same shape as a Lattice entry, with an optional year for the timeline.
export const entry = (id, type, area, status, title, fields = {}) => ({
  ...latticeEntry(id, type, area, status, title, fields),
  year: fields.year ?? null,
  videos: [],
});

// Calculator pieces. Rupee amounts use the unit ₹, which the app shows in lakh and crore.
export const input = (key, label, unit, value, min, max, extra = {}) => ({ key, label, unit, value, min, max, ...extra });
export const out = (label, unit, expr, extra = {}) => ({ label, unit, expr, ...extra });
export const LOG = { log: true };
export const INT = { integer: true };

export const AREA = {
  BASICS: 'maths-of-money',
  MONEY: 'personal-money',
  MARKETS: 'markets',
  COMPANIES: 'companies',
  QUANT: 'quant',
  MACRO: 'economy',
  STORIES: 'stories',
  MISC: 'miscellany',
};

export const AREAS = [
  {
    id: AREA.MONEY,
    name: 'Personal Money (India)',
    color: '#7cc56f',
    description: 'Saving, SIPs, PPF, EPF and NPS, loans and EMIs, insurance, income tax and retirement — with Indian rules and numbers.',
  },
  {
    id: AREA.MARKETS,
    name: 'Markets & Investing',
    color: '#4f9ee8',
    description: 'Stocks, bonds and funds, how they are priced, risk and return, diversification, and why investors behave as they do.',
  },
  {
    id: AREA.QUANT,
    name: 'Quant & Mathematical Finance',
    color: '#8b7cf6',
    description: 'Random walks, Brownian motion, options and Black–Scholes, Kelly betting, ergodicity and fat tails — where finance meets physics.',
  },
  {
    id: AREA.MACRO,
    name: 'Economy & Money System',
    color: '#e0a33a',
    description: 'Inflation, the RBI and interest rates, how banks create money, GDP, budgets, currencies and the balance of payments.',
  },
  {
    id: AREA.COMPANIES,
    name: 'Businesses & Accounts',
    color: '#e5845a',
    description: 'Reading a company: balance sheet, profit and loss, cash flow, returns on capital, leverage, moats and governance.',
  },
  {
    id: AREA.BASICS,
    name: 'Maths of Money',
    color: '#2bb3a3',
    description: 'The maths underneath everything else: compounding, discounting, annuities, logarithms, probability and spread.',
  },
  {
    id: AREA.STORIES,
    name: 'Crises & Stories',
    color: '#d07fd8',
    description: 'Bubbles, crashes, scams and rescues — tulips to Harshad Mehta to 2008 — each one a lesson with numbers attached.',
  },
  {
    id: AREA.MISC,
    name: 'Miscellany',
    color: '#8a93a6',
    description: 'Random other stuff. Anything that does not have a home yet.',
  },
];
