// Personal Money (India). Rules and rates as of September 2026 (tax year 2026-27):
// small-savings rates for Jul–Sep 2026, EPF 8.25% for FY 2025-26, repo 5.25%.
// Tax rules change every Budget — each entry says so where it matters.

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { MONEY } = AREA;

export const MONEY_ENTRIES = [
  entry('budgeting', 'concept', MONEY, 'curious', 'Budgeting and the 50/30/20 Rule', {
    summary: 'Split take-home pay into needs, wants and savings — and pay the savings first, on salary day, before the month can eat them.',
    aliases: ['budgeting', '50/30/20 rule', 'pay yourself first', 'savings rate'],
    tags: ['basics', 'habits'],
    body: md`
      ## A starting split
      - **50% needs** — rent, groceries, EMIs, insurance, school fees.
      - **30% wants** — eating out, travel, gadgets.
      - **20% savings** — SIPs, PPF, the emergency fund, prepaying debt.

      It's a rule of thumb (popularised by Elizabeth Warren), not a law. In a metro with high rent, "needs" may be 60%; on a first salary living with family, saving 40% is realistic.

      ## Pay yourself first
      The one habit that matters most: set SIPs and recurring transfers to run **on salary day**. Whatever is left is what you can spend. Saving "what's left at month-end" usually leaves nothing, because spending expands to fill income — lifestyle inflation.

      ## The number that drives everything
      Your **savings rate** decides how fast you can reach financial independence far more than your investment returns do. Going from 10% to 30% saved roughly halves the working years needed.
    `,
  }),

  entry('emergency-fund', 'concept', MONEY, 'curious', 'Emergency Fund', {
    summary: 'Three to six months of expenses kept safe and instantly reachable, so a job loss or hospital bill doesn’t force you to sell investments or borrow at 40%.',
    aliases: ['emergency fund', 'emergency corpus', 'rainy-day fund'],
    tags: ['basics', 'safety'],
    body: md`
      ## How much
      - **3 months** of essential spending if your job is stable and you have health insurance.
      - **6–12 months** if income is irregular (freelance, business, commission) or one salary supports the family.

      ## Where
      Safety and speed beat return:
      - a **savings account** or sweep-in FD for the first month;
      - a **liquid fund** or overnight fund for the rest (redeems in one working day);
      - short FDs you can break.

      Not in stocks — emergencies and market crashes like to arrive together (March 2020 brought both layoffs and a 38% Nifty fall).

      ## Why it's first
      Without one, any shock pushes you onto credit cards at ~42% a year, a personal loan, or into selling equity at the bottom. The fund is the cheapest insurance you'll ever buy; it earns little because its job is to exist.
    `,
  }),

  entry('sip', 'concept', MONEY, 'curious', 'SIP (Systematic Investment Plan)', {
    summary: 'A fixed sum into a mutual fund every month, automatically. It buys more units when prices are low, and makes investing a habit instead of a decision.',
    aliases: ['SIP', 'systematic investment plan', 'rupee cost averaging', 'step-up SIP'],
    tags: ['investing', 'mutual funds', 'habits'],
    latex: md`FV = C\,\frac{(1+i)^{N} - 1}{i}\,(1+i)`,
    variables: [
      ['C', 'Monthly SIP amount'],
      ['i', 'Monthly return (yearly return ÷ 12)'],
      ['N', 'Number of months'],
    ],
    body: md`
      ## What it is
      An instruction to your bank to move a fixed amount into a mutual fund on a fixed date. Industry-wide, Indian SIP inflows have run at well over ₹25,000 crore a month since 2025 — it's how most Indians now own equities.

      ## Rupee cost averaging
      ₹10,000 buys 100 units at ₹100 and 125 units at ₹80. Your average cost ends up *below* the average price, because the same rupees buy more when prices fall. It's a real but modest effect; the bigger benefits are behavioural:
      - you never have to decide *when* to invest (no market timing);
      - crashes become sales rather than reasons to panic.

      ## The maths
      A SIP is an annuity due (payment at the start of each month), so its future value is the annuity formula times $(1+i)$. The honest return on a SIP is its XIRR, not CAGR.

      ## Step-up
      Raising the SIP by 10% each year (as salary rises) makes a huge difference over 20 years — try it in the calculator.
    `,
    calc: {
      inputs: [
        input('C', 'Monthly SIP', '₹', 10000, 500, 500000, LOG),
        input('r', 'Expected return', '% a year', 12, 1, 20),
        input('years', 'For', 'years', 20, 1, 40, INT),
        input('step', 'Yearly step-up', '%', 10, 0, 25),
      ],
      outputs: [
        out('Grows to (no step-up)', '₹', 'C*((1 + r/1200)^(12*years) - 1)/(r/1200)*(1 + r/1200)'),
        out('You put in (no step-up)', '₹', 'C*12*years'),
        out('Grows to, with the step-up', '₹', 'C*((1 + r/1200)^12 - 1)/(r/1200)*(1 + r/1200)*if(abs((1 + r/1200)^12 - 1 - step/100) - 0.00001, ((1 + r/1200)^(12*years) - (1 + step/100)^years)/((1 + r/1200)^12 - 1 - step/100), years*(1 + step/100)^(years - 1))'),
        out('You put in, with the step-up', '₹', 'C*12*if(step - 0.001, ((1 + step/100)^years - 1)/(step/100), years)'),
      ],
      note: 'Set the step-up to 0 and the two “grows to” lines agree. Then try 10%: the SIP rises with your salary.',
    },
  }),

  entry('ppf', 'concept', MONEY, 'curious', 'PPF (Public Provident Fund)', {
    summary: 'A 15-year government savings account at 7.1% (Jul–Sep 2026), fully tax-free on the way out. Safe, boring and very hard to beat after tax for the debt part of a portfolio.',
    aliases: ['PPF', 'Public Provident Fund'],
    tags: ['small savings', 'tax-free', 'debt'],
    year: 1968,
    body: md`
      ## The rules
      - Deposit **₹500 to ₹1.5 lakh** per financial year, in lump sums or instalments.
      - Matures after **15 years**; extend in 5-year blocks, with or without new deposits.
      - Rate set by the government every quarter: **7.1%** since 2020 (unchanged again for July–September 2026). Interest compounds yearly.
      - **Tax**: interest and maturity are tax-free in *both* regimes; deposits get the 80C deduction only in the old regime. This "EEE" status is rare.
      - Partial withdrawals from year 7; loans in years 3–6. Government-backed: no credit risk.

      ## The 5th-of-the-month trick
      Interest for each month is paid on the *lowest* balance between the 5th and the month's end. Deposit the yearly ₹1.5 lakh **before 5 April** and it earns interest for all 12 months.

      ## What ₹1.5 lakh a year becomes
      At 7.1% for 15 years, deposited each April: **₹40.68 lakh** from ₹22.5 lakh paid in. A taxable FD would need about 10% pre-tax to match that for someone in the 30% slab.

      ## Where it fits
      PPF is the "debt" side of an asset allocation for long goals. Its weaknesses: the 15-year lock-in, the ₹1.5 lakh cap, and a rate that can be cut (it was 8.7–8.8% in 2012–14).
    `,
    calc: {
      inputs: [
        input('D', 'Deposit each April', '₹', 150000, 500, 150000, LOG),
        input('r', 'PPF rate', '% a year', 7.1, 4, 10),
        input('years', 'Years', 'years', 15, 15, 40, INT),
      ],
      outputs: [
        out('Maturity value', '₹', 'D*((1 + r/100)^years - 1)/(r/100)*(1 + r/100)', { key: 'M' }),
        out('You paid in', '₹', 'D*years'),
        out('Tax-free interest', '₹', 'M - D*years'),
        out('Taxable rate needed to match, 30% slab', '% a year', 'r/(1 - 0.312)', { digits: 3 }),
      ],
      note: 'Extend beyond 15 years to see the late surge of compounding. 31.2% = 30% slab plus 4% cess.',
    },
  }),

  entry('epf', 'concept', MONEY, 'curious', 'EPF (Employees’ Provident Fund)', {
    summary: 'Forced retirement savings for salaried workers: 12% of basic from you, about as much from your employer, earning 8.25% (FY 2025-26).',
    aliases: ['EPF', 'provident fund', 'EPFO', 'VPF', 'Voluntary Provident Fund', 'Employees’ Pension Scheme'],
    tags: ['retirement', 'salary', 'debt'],
    year: 1952,
    body: md`
      ## How the money flows
      For basic pay + DA of $B$ a month:
      - **You**: 12% of $B$ into EPF.
      - **Employer**: 12% of $B$, split — 8.33% of $B$ (capped at 8.33% × ₹15,000 = **₹1,250**) goes to the pension scheme **EPS**, the rest to your EPF.

      So on a ₹50,000 basic, about **₹10,750 a month** lands in EPF (₹6,000 + ₹4,750), and ₹1,250 in EPS.

      ## Returns and tax
      - Rate declared yearly by the EPFO board and approved by the government: **8.25%** for FY 2023-24, 2024-25 and 2025-26.
      - Your contribution counts under 80C (old regime); the employer's share is not taxed up to limits.
      - Interest is tax-free, except on your own contributions above **₹2.5 lakh a year** (₹5 lakh if there's no employer contribution).
      - Withdrawing before **5 years** of continuous service makes it taxable.

      ## VPF
      You can put in more than 12% as Voluntary PF and earn the same 8.25% — one of the best safe rates available, within the ₹2.5 lakh tax-free limit.

      ## Why it's a big deal
      Because it's automatic and hard to touch, EPF quietly becomes many people's largest asset. Over a career with rising salary, it compounds into crores — see the calculator.
    `,
    calc: {
      inputs: [
        input('basic', 'Basic + DA now', '₹ a month', 50000, 15000, 500000, LOG),
        input('years', 'Years of work left', 'years', 25, 1, 40, INT),
        input('g', 'Yearly salary growth', '%', 7, 0, 15),
        input('r', 'EPF rate', '% a year', 8.25, 6, 10),
      ],
      outputs: [
        out('Into EPF this year', '₹', '12*(0.24*basic - 0.0833*min(basic, 15000))', { key: 'C1' }),
        out('EPF at retirement', '₹', 'C1*(1 + r/200)*if(abs(r - g) - 0.001, ((1 + r/100)^years - (1 + g/100)^years)/(r/100 - g/100), years*(1 + r/100)^(years - 1))'),
        out('Of which you paid', '₹', '12*0.12*basic*if(g - 0.001, ((1 + g/100)^years - 1)/(g/100), years)'),
      ],
      note: 'Assumes salary rises once a year and contributions land mid-year on average. EPS pension is extra.',
    },
  }),

  entry('nps', 'concept', MONEY, 'curious', 'NPS (National Pension System)', {
    summary: 'A low-cost pension account invested in stocks, bonds and government securities. Extra tax breaks, but part of the corpus must buy an annuity at 60.',
    aliases: ['NPS', 'National Pension System', 'PFRDA', '80CCD'],
    tags: ['retirement', 'tax', 'pension'],
    year: 2004,
    body: md`
      ## How it works
      You contribute to a **Tier I** account (locked until 60); a pension fund manager invests it across equity (up to 75% if you choose), corporate bonds and government securities. Fund management fees are tiny — a fraction of what most mutual funds charge.

      ## Tax
      - **Old regime**: your contribution counts in 80C, plus an extra **₹50,000** under 80CCD(1B).
      - **Both regimes**: your employer's contribution is deductible under 80CCD(2) — up to **14% of basic** in the new regime. For many salaried people this is the only big deduction left in the new regime.
      - Under the Income-tax Act 2025 (in force from April 2026) these became **Section 124**; the limits didn't change.

      ## At 60 (rules changed December 2025)
      For non-government subscribers with a corpus above ₹12 lakh:
      - up to **80%** can be taken as a lump sum;
      - at least **20%** must buy an **annuity** — a pension for life from an insurer.
      Smaller pots get more freedom (a corpus up to ₹8 lakh can be withdrawn fully). Historically 60% of the corpus has been tax-free; the annuity income is taxed as salary. Check the current tax treatment of the extra 20% before you withdraw.

      ## The trade-off
      Cheap, disciplined, tax-efficient — but illiquid, and annuity rates (~6–7%) are low compared with what the corpus could earn, which is why the old 40% annuity rule was unpopular.
    `,
    calc: {
      inputs: [
        input('C', 'Monthly contribution', '₹', 10000, 500, 200000, LOG),
        input('years', 'Years to 60', 'years', 30, 1, 42, INT),
        input('r', 'Expected return', '% a year', 10, 5, 14),
        input('lump', 'Taken as a lump sum', '%', 80, 0, 80),
        input('ann', 'Annuity rate', '% a year', 6.5, 4, 9),
      ],
      outputs: [
        out('Corpus at 60', '₹', 'C*((1 + r/1200)^(12*years) - 1)/(r/1200)', { key: 'corpus' }),
        out('Lump sum', '₹', 'corpus*lump/100'),
        out('Pension from the annuity', '₹ a month', 'corpus*(1 - lump/100)*ann/100/12'),
        out('You paid in', '₹', 'C*12*years'),
      ],
    },
  }),

  entry('fixed-deposits', 'concept', MONEY, 'curious', 'Fixed Deposits', {
    summary: 'Lend the bank a lump sum for a fixed term at a fixed rate. Safe up to ₹5 lakh per bank, but taxed at your slab — after tax and inflation, often close to zero real return.',
    aliases: ['fixed deposit', 'fixed deposits', 'bank FD', 'term deposit', 'recurring deposit', 'DICGC'],
    tags: ['debt', 'safety', 'banking'],
    body: md`
      ## Why people love them
      Known rate, known date, no market swings. Rates follow the RBI's repo rate with a lag: after cuts to 5.25%, big-bank FDs in 2026 pay around 6–7% for 1–3 years (senior citizens ~0.5% more).

      ## Safety
      Deposits are insured by **DICGC** up to **₹5 lakh per depositor per bank** (principal plus interest). The cover was raised from ₹1 lakh in 2020 after the PMC Bank collapse. Above that, you're a creditor of the bank.

      ## The tax problem
      FD interest is added to your income and taxed at your **slab rate**, every year, even if you don't withdraw it. Banks deduct TDS (10%) once yearly interest passes a threshold.

      At 6.5% in the 30% slab: $6.5 \times (1 - 0.312) = 4.47\%$ after tax. With inflation at ~4.5%, the real return is about **zero**. The calculator shows it for your numbers; the Fisher equation is what's doing the subtraction.

      ## Better homes for long money
      For the long-term safe portion: PPF (tax-free), EPF/VPF, or debt funds for flexibility. FDs shine for short, known needs and the emergency fund.
    `,
    calc: {
      inputs: [
        input('rate', 'FD rate', '% a year', 6.5, 3, 9.5),
        input('slab', 'Your tax slab', '%', 30, 0, 30),
        input('infl', 'Inflation', '% a year', 4.5, 1, 10),
        input('amt', 'Deposit', '₹', 500000, 10000, 50000000, LOG),
      ],
      outputs: [
        out('After-tax rate (with cess)', '% a year', 'rate*(1 - slab/100*1.04)', { key: 'post', digits: 3 }),
        out('Real after-tax return', '% a year', '((1 + post/100)/(1 + infl/100) - 1)*100', { digits: 3 }),
        out('Interest in a year', '₹', 'amt*rate/100'),
        out('Tax on it', '₹', 'amt*rate/100*slab/100*1.04'),
      ],
    },
  }),

  entry('small-savings', 'concept', MONEY, 'curious', 'Small Savings Schemes', {
    summary: 'Government-backed post-office schemes — NSC, SCSS, Sukanya Samriddhi, KVP — with rates reset each quarter. Jul–Sep 2026: 4% to 8.2%.',
    aliases: ['small savings', 'small savings schemes', 'NSC', 'National Savings Certificate', 'SCSS', 'Senior Citizens Savings Scheme', 'Sukanya Samriddhi', 'KVP', 'Kisan Vikas Patra', 'post office schemes'],
    tags: ['debt', 'government', 'safety'],
    body: md`
      ## Rates for July–September 2026
      Unchanged since early 2024:

      | Scheme | Rate | Notes |
      |---|---|---|
      | Post office savings | 4.0% | like a savings account |
      | 3-year time deposit | 7.1% | |
      | PPF | 7.1% | 15 years, tax-free |
      | Kisan Vikas Patra | 7.5% | doubles money in 115 months |
      | NSC | 7.7% | 5 years, 80C in the old regime; interest taxable |
      | Sukanya Samriddhi | 8.2% | for a daughter under 10; tax-free |
      | Senior Citizens Savings Scheme | 8.2% | 60+; paid quarterly; taxable |

      KVP's "115 months" is just the rule of 72 made exact: $1.075^{115/12} = 2.00$.

      ## How rates are set
      A formula links them to government bond yields of similar maturity, plus a spread; the Finance Ministry announces them each quarter but doesn't always follow the formula. With the repo rate cut to 5.25%, the formula would suggest lower rates — so far the government has held them, which makes these schemes unusually good value in 2026.

      ## Credit risk
      None in practice — they are obligations of the Government of India, unlike bank FDs above ₹5 lakh or corporate bonds.
    `,
  }),

  entry('elss', 'concept', MONEY, 'curious', 'ELSS (Tax-saving Funds)', {
    summary: 'Equity mutual funds with a 3-year lock-in that qualify for the ₹1.5 lakh deduction — in the old tax regime only.',
    aliases: ['ELSS', 'tax-saving fund', 'tax saver fund', 'equity-linked savings scheme'],
    tags: ['tax', 'mutual funds', 'equity'],
    body: md`
      ## Why it existed
      Among 80C options, ELSS has the **shortest lock-in** (3 years per SIP instalment) and the only **equity** exposure, so over 15+ years it has usually beaten PPF — with more ups and downs.

      ## The new-regime twist
      The new tax regime has no 80C deduction. If you're in it (most salaried people under ~₹15 lakh now are), ELSS is just an equity fund with a lock-in. A plain index fund is then better: same equity, lower cost, no lock-in.

      ## Tax on the way out
      Gains are equity long-term capital gains: 12.5% above ₹1.25 lakh a year.
    `,
  }),

  entry('term-insurance', 'concept', MONEY, 'curious', 'Term Life Insurance', {
    summary: 'Pure life cover: a small yearly premium buys a large payout if you die during the term, and nothing otherwise. The only life insurance most people need.',
    aliases: ['term insurance', 'term plan', 'life cover', 'sum assured', 'claim settlement ratio'],
    tags: ['insurance', 'protection'],
    body: md`
      ## Who needs it
      Anyone whose income others depend on. If nobody would be short of money if you died, you don't need life insurance at all.

      ## How much
      Enough for your family to replace your income and clear debts: a common rule is **10–15× annual income**, or add up (future expenses you'd have covered, in present value) + loans − existing investments. The calculator does that sum.

      ## Why it's cheap
      Most policyholders don't die during the term, so pooling spreads a rare large loss across many people. A healthy 30-year-old non-smoker can typically buy **₹1 crore** of cover to age 60 for around ₹10,000–20,000 a year. Since 22 September 2025, individual life and health insurance premiums are **exempt from GST** (it used to be 18%).

      ## What to check
      Claim settlement ratio and speed, honest disclosure (non-disclosure is the main reason claims fail), and a term that runs until your dependants are independent — not "to 99".

      Contrast with endowment plans and ULIPs, which bundle a little cover with a poor investment.
    `,
    calc: {
      inputs: [
        input('spend', 'Family’s yearly expenses you cover', '₹', 600000, 100000, 10000000, LOG),
        input('years', 'For how many years', 'years', 25, 1, 50, INT),
        input('rr', 'Real return on the payout', '% a year', 2, 0, 6),
        input('loans', 'Loans outstanding', '₹', 3000000, 0, 50000000),
        input('assets', 'Investments you already have', '₹', 1000000, 0, 50000000),
      ],
      outputs: [
        out('Present value of the expenses', '₹', 'spend*if(rr - 0.001, (1 - (1 + rr/100)^(-years))/(rr/100)*(1 + rr/100), years)', { key: 'pv' }),
        out('Cover needed', '₹', 'max(0, pv + loans - assets)'),
      ],
      note: 'Real return = what the payout earns minus inflation, since expenses rise every year.',
    },
  }),

  entry('endowment-ulip', 'concept', MONEY, 'curious', 'Endowment Plans and ULIPs', {
    summary: 'Policies that mix insurance with investing. The promised "maturity amount" usually works out to a 4–6% return, with little life cover — term insurance plus investing separately almost always wins.',
    aliases: ['endowment plan', 'endowment policy', 'ULIP', 'ULIPs', 'money-back policy', 'traditional plan', 'guaranteed return plan'],
    tags: ['insurance', 'mis-selling'],
    body: md`
      ## The pitch
      "Pay ₹50,000 a year for 20 years, get ₹15 lakh at maturity **plus** life cover." Paying ₹10 lakh to get ₹15 lakh sounds like a 50% gain.

      ## The maths
      The honest measure is the IRR of the premiums against the payout. ₹50,000 a year for 20 years turning into ₹15 lakh is about **3.7% a year** — below PPF, below inflation. The calculator finds it with the same Newton steps as XIRR.

      Meanwhile the life cover is often just 10× the premium (₹5 lakh), which wouldn't replace an income.

      ## Buy term, invest the rest
      Take a term plan for ~₹12,000 a year, invest the other ₹38,000 each year at a plausible 10% — after 20 years that's about **₹23.9 lakh** instead of ₹15 lakh, with far more cover along the way.

      ## ULIPs
      Unit-linked plans invest in market funds but carry premium allocation, mortality and admin charges; the 5-year lock-in stops you leaving. Maturity is tax-free only if yearly premiums are ≤ ₹2.5 lakh.

      ## Why they're sold
      Commissions on traditional plans are high, and the product feels safe and "guaranteed". Mixing insurance and investment makes it very hard to see what you're paying for.
    `,
    calc: {
      inputs: [
        input('prem', 'Premium each year', '₹', 50000, 5000, 1000000, LOG),
        input('n', 'Years of premiums', 'years', 20, 5, 40, INT),
        input('M', 'Promised maturity amount', '₹', 1500000, 50000, 50000000, LOG),
        input('term', 'Cost of a term plan instead', '₹ a year', 12000, 0, 100000),
        input('alt', 'Return if you invest the rest', '% a year', 10, 4, 15),
      ],
      outputs: [
        out('First guess', '% a year', '100*((M/(prem*n))^(2/n) - 1)', { key: 'x0', digits: 5 }),
        out('Refined', '% a year', 'x0 - 100*(prem*((1 + x0/100)^(n + 1) - (1 + x0/100))/(x0/100) - M)/(prem*(((n + 1)*(1 + x0/100)^n - 1)/(x0/100) - ((1 + x0/100)^(n + 1) - (1 + x0/100))/(x0/100)^2))', { key: 'x1', digits: 5 }),
        out('Policy’s real return (IRR)', '% a year', 'x1 - 100*(prem*((1 + x1/100)^(n + 1) - (1 + x1/100))/(x1/100) - M)/(prem*(((n + 1)*(1 + x1/100)^n - 1)/(x1/100) - ((1 + x1/100)^(n + 1) - (1 + x1/100))/(x1/100)^2))', { digits: 3 }),
        out('Term plan + investing the difference', '₹', '(prem - term)*((1 + alt/100)^(n + 1) - (1 + alt/100))/(alt/100)'),
        out('Premiums paid in total', '₹', 'prem*n'),
      ],
    },
  }),

  entry('health-insurance', 'concept', MONEY, 'curious', 'Health Insurance', {
    summary: 'Cover for hospital bills, which are the most common way Indian families fall into debt. A base policy plus a cheap super top-up covers most of the risk.',
    aliases: ['health insurance', 'mediclaim', 'super top-up', 'co-pay', 'cashless hospitalisation', '80D'],
    tags: ['insurance', 'protection'],
    body: md`
      ## Why it's essential
      A serious illness or surgery in a private hospital can cost ₹5–20 lakh. Out-of-pocket health spending is one of the biggest reasons households slip into poverty in India. An employer's group cover ends when the job does.

      ## A sensible structure
      - **Base policy**: ₹5–10 lakh family floater.
      - **Super top-up**: kicks in once total bills in a year cross a deductible (say ₹5 lakh) and covers up to ₹25–50 lakh more — for a small premium, because big claims are rare. This is risk pooling at its most efficient.

      ## Fine print that matters
      - **Room-rent caps** (they shrink the whole claim proportionally), **co-pay**, sub-limits on specific treatments.
      - **Waiting periods**: IRDAI capped pre-existing disease waits at 3 years (2024), and after **5 years** of continuous cover a claim can't be refused for non-disclosure except fraud.
      - Premiums are GST-exempt from 22 September 2025.

      ## Tax
      Premiums are deductible under 80D (₹25,000 for self/family, ₹50,000 if senior; more for parents) — in the old tax regime only.
    `,
  }),

  entry('insurance-pooling', 'concept', MONEY, 'curious', 'How Insurance Works (Risk Pooling)', {
    summary: 'Swap a small chance of a huge loss for a certain small premium. Pooling many independent risks makes the average cost predictable.',
    aliases: ['risk pooling', 'pooling risk', 'insurance pool', 'actuarial'],
    tags: ['insurance', 'probability'],
    latex: md`\text{spread of cost per member} = L\,\sqrt{\frac{p(1-p)}{N}}`,
    variables: [
      ['p', 'Chance any one member claims in a year'],
      ['L', 'Size of a claim'],
      ['N', 'Members in the pool'],
    ],
    body: md`
      ## The idea
      Each of $N$ members faces a chance $p$ of a loss $L$. Alone, your cost is either 0 or $L$ — terrifying. In a pool, everyone pays about $pL$ (plus costs), and by the law of large numbers the pool's *average* claim per member barely wobbles once $N$ is large.

      With $p = 1\%$ and $L$ = ₹10 lakh: the fair premium is ₹10,000. In a pool of 10 people, most years nobody claims (₹0 each) and some years one person does (₹1 lakh each). In a pool of a million, the cost comes out at ₹10,000 give or take about ₹100.

      ## When pooling fails
      - **Correlated risks**: floods, pandemics and earthquakes hit many members at once — reinsurers and governments step in.
      - **Adverse selection**: if only sick people buy health cover, $p$ rises and premiums spiral. Waiting periods and group policies exist to stop this.
      - **Moral hazard**: insured people take fewer precautions. Co-pays and deductibles share a bit of the loss back.

      Insurance is negative expected value for you — you pay more than the average claim — and still rational, because utility is curved: avoiding ruin is worth the markup.
    `,
    calc: {
      inputs: [
        input('p', 'Chance of a claim', '% a year', 1, 0.01, 30, LOG),
        input('L', 'Claim size', '₹', 1000000, 10000, 100000000, LOG),
        input('N', 'People in the pool', '', 1000, 1, 10000000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Fair premium (expected claim)', '₹', 'p/100*L', { key: 'fair' }),
        out('Typical wobble of the pool’s cost per member', '₹', 'L*sqrt(p/100*(1 - p/100)/N)', { key: 'wob' }),
        out('Wobble as a share of the premium', '%', 'wob/fair*100', { digits: 3 }),
      ],
      note: 'Slide the pool from 1 person to 10 million: the wobble shrinks like 1/√N.',
    },
  }),

  entry('emi', 'equation', MONEY, 'curious', 'EMI (Loan Repayment)', {
    summary: 'The fixed monthly payment that clears a loan with interest. Early EMIs are mostly interest; the principal only starts shrinking fast near the end.',
    aliases: ['EMI', 'EMIs', 'equated monthly instalment', 'amortisation', 'amortization', 'loan tenure'],
    tags: ['loans', 'debt'],
    latex: md`\text{EMI} = P\,\frac{i\,(1+i)^N}{(1+i)^N - 1}`,
    variables: [
      ['P', 'Loan amount'],
      ['i', 'Monthly interest rate (yearly rate ÷ 12)'],
      ['N', 'Number of monthly instalments'],
    ],
    body: md`
      ## Where it comes from
      The bank lends $P$ today and wants a stream of equal payments whose present value, at the loan rate, is exactly $P$. Solve the annuity formula for the payment and you get the EMI.

      ## A ₹50 lakh home loan at 8.5% for 20 years
      - EMI: **₹43,391**
      - Total paid: **₹1.04 crore** — so ₹54 lakh of it is interest.
      - First EMI: ₹35,417 interest and only ₹7,974 principal (82% interest).

      ## Tenure is the big lever
      Stretching to 30 years cuts the EMI to about ₹38,400 but raises total interest to about ₹88 lakh. Every extra rupee of prepayment early on saves years at the end — see home loans.

      ## Floating rates
      Most home loans are linked to the RBI's repo rate (through the bank's EBLR/RLLR). When the repo rate moves, banks usually keep the EMI fixed and change the *tenure* — worth checking after rate hikes, when tenures can silently balloon.
    `,
    calc: {
      inputs: [
        input('P', 'Loan amount', '₹', 5000000, 10000, 100000000, LOG),
        input('rate', 'Interest rate', '% a year', 8.5, 1, 40),
        input('years', 'Tenure', 'years', 20, 1, 30, INT),
      ],
      outputs: [
        out('EMI', '₹', 'P*(rate/1200)*(1 + rate/1200)^(12*years)/((1 + rate/1200)^(12*years) - 1)', { key: 'E' }),
        out('Total paid', '₹', 'E*12*years'),
        out('Total interest', '₹', 'E*12*years - P'),
        out('Interest share of the first EMI', '%', 'P*rate/1200/E*100', { digits: 3 }),
      ],
    },
  }),

  entry('home-loans', 'concept', MONEY, 'curious', 'Home Loans and Prepayment', {
    summary: 'India’s biggest household debt. Floating rates follow the repo rate; prepaying early saves years of interest; tax breaks exist only in the old regime.',
    aliases: ['home loan', 'home loans', 'housing loan', 'prepayment', 'loan prepayment', 'EBLR', 'RLLR'],
    tags: ['loans', 'property'],
    body: md`
      ## The basics
      Banks lend up to 75–90% of the property value. Rates in 2026, with the repo at 5.25%, are roughly **7.5–9%** depending on credit score and lender. Floating-rate home loans can be prepaid **without penalty** for individuals.

      ## Prepayment
      Because early EMIs are mostly interest, extra payments early on are powerful. On a ₹50 lakh, 20-year loan at 8.5%, adding ₹5,000 a month to the ₹43,391 EMI finishes about **4½ years** sooner and saves roughly **₹14 lakh** of interest.

      Prepay or invest? Prepaying earns exactly the loan rate, risk-free, after tax. Equity might earn more, with risk. A common middle path: prepay when the rate is high, invest when it's low, and never at the expense of the emergency fund.

      ## Tax (old regime only)
      - Interest on a self-occupied home: up to **₹2 lakh** a year deducted (Section 24(b)).
      - Principal: inside the ₹1.5 lakh 80C limit.
      In the new regime these don't apply to a self-occupied home, which changes the rent-vs-buy sums.
    `,
    calc: {
      inputs: [
        input('P', 'Loan amount', '₹', 5000000, 100000, 100000000, LOG),
        input('rate', 'Interest rate', '% a year', 8.5, 5, 14),
        input('years', 'Tenure', 'years', 20, 5, 30, INT),
        input('extra', 'Extra paid each month', '₹', 5000, 0, 200000),
      ],
      outputs: [
        out('Normal EMI', '₹', 'P*(rate/1200)*(1 + rate/1200)^(12*years)/((1 + rate/1200)^(12*years) - 1)', { key: 'E' }),
        out('Months to repay with the extra', 'months', '-ln(1 - P*rate/1200/(E + extra))/ln(1 + rate/1200)', { key: 'm', digits: 4 }),
        out('Time saved', 'years', 'years - m/12', { digits: 3 }),
        out('Interest saved', '₹', 'E*12*years - (E + extra)*m'),
      ],
    },
  }),

  entry('rent-vs-buy', 'question', MONEY, 'curious', 'Rent or buy a home?', {
    summary: 'In Indian metros, rent is often 2–3% of the flat’s price a year, while owning costs ~8–10% in interest and upkeep, minus appreciation. The maths favours renting more often than people expect.',
    aliases: ['rent vs buy', 'rent or buy', 'price-to-rent ratio'],
    tags: ['property', 'decisions'],
    body: md`
      ## The fair comparison
      Owning isn't free because you have no rent. The yearly **cost of owning** is:
      $$\text{price} \times (\text{interest or opportunity cost} + \text{maintenance \& tax} - \text{expected appreciation})$$
      Economists call this the *user cost* of housing. Compare it with a year's rent on the same flat.

      A ₹1 crore flat renting for ₹25,000 a month (3% yield): at 8.5% interest, 1% upkeep and 5% appreciation, owning costs ~₹4.5 lakh a year vs ₹3 lakh rent. Renting and investing the difference comes out ahead — *unless* prices rise faster than 5%.

      ## Things the formula misses
      - **Transaction costs**: stamp duty (5–7%) and registration (~1%) — sunk the day you buy.
      - **Tax**: old-regime deductions on interest and principal help owners.
      - **Leverage**: a loan magnifies both appreciation and losses.
      - **Non-money reasons**: security, no landlord, schools, family. These are real — just know what they cost.

      ## Rules of thumb
      Price-to-rent above ~25 (yield below ~4%) usually favours renting; below ~15 favours buying. Many Indian metros sit at 30–40.
    `,
    calc: {
      inputs: [
        input('price', 'Price of the home', '₹', 10000000, 1000000, 500000000, LOG),
        input('rent', 'Rent for the same home', '₹ a month', 25000, 2000, 1000000, LOG),
        input('rate', 'Loan rate or what the money could earn', '% a year', 8.5, 4, 14),
        input('upkeep', 'Maintenance, property tax, insurance', '% a year', 1, 0, 3),
        input('appr', 'Expected price growth', '% a year', 5, -5, 15),
      ],
      outputs: [
        out('Rental yield', '% a year', 'rent*12/price*100', { digits: 3 }),
        out('Price-to-rent ratio', '', 'price/(rent*12)', { digits: 3 }),
        out('Yearly cost of owning', '₹', 'price*(rate + upkeep - appr)/100', { key: 'own' }),
        out('Yearly rent', '₹', 'rent*12'),
        out('Owning costs more by (negative = cheaper)', '₹ a year', 'own - rent*12'),
        out('Break-even price growth', '% a year', 'rate + upkeep - rent*12/price*100', { digits: 3 }),
      ],
    },
  }),

  entry('credit-score', 'concept', MONEY, 'curious', 'Credit Score (CIBIL)', {
    summary: 'A 300–900 number summarising how reliably you’ve repaid. It decides whether you get a loan and at what rate.',
    aliases: ['credit score', 'CIBIL', 'CIBIL score', 'credit report', 'credit bureau', 'credit utilisation'],
    tags: ['loans', 'credit'],
    body: md`
      ## Who keeps score
      Four RBI-licensed bureaus — TransUnion CIBIL, Experian, Equifax and CRIF High Mark — collect every lender's repayment data. Scores run **300 to 900**; above ~750 gets the best rates.

      ## What moves it
      - **Payment history** (biggest): even one 30-day-late EMI or card bill stays on record for years.
      - **Credit utilisation**: using over ~30% of your card limits looks stretched.
      - **Age and mix**: a long history and a mix of secured (home, car) and unsecured (card, personal) credit helps.
      - **Hard enquiries**: many loan applications in a short time look desperate.

      ## Your rights
      You can get a free full report from each bureau once a year, and lenders now report to bureaus at least every 15 days, so fixes show up faster. Checking your own score doesn't lower it.

      ## Why it matters in money
      On a ₹50 lakh home loan, a 0.5% better rate saves about ₹4 lakh over 20 years.
    `,
  }),

  entry('credit-card-debt', 'concept', MONEY, 'curious', 'Credit Card Debt', {
    summary: 'Free if you pay the full bill; ruinous if you don’t. ~3.6% a month plus 18% GST on the interest compounds to over 60% a year.',
    aliases: ['credit card', 'credit cards', 'credit card debt', 'minimum due', 'revolving credit', 'interest-free period'],
    tags: ['debt', 'traps'],
    body: md`
      ## The trap
      Pay the whole statement and a card is a free 20–50 day loan with rewards. Pay only the **minimum due** (often 5%) and:
      - interest (typically **3.5–3.75% a month**) is charged on the whole balance;
      - the interest-free period disappears, so new purchases start costing interest from the day you swipe;
      - **18% GST** is added on the interest and fees.

      "3.6% a month" sounds small; compounded, it's $1.036^{12} - 1 = 53\%$ a year, and with GST on the interest about **65%**. At that rate a balance doubles in about 17 months.

      ## Getting out
      Stop new spending on the card, pay off the highest-rate debt first, and consider replacing it with a cheaper personal loan (12–16%) or a loan against an FD — it's arbitrage in your favour. Paying the minimum on ₹1 lakh can take over five years to halve the balance.
    `,
    calc: {
      inputs: [
        input('B', 'Balance you carry', '₹', 100000, 1000, 5000000, LOG),
        input('m', 'Card interest', '% a month', 3.6, 1, 4.5),
        input('months', 'Months unpaid', 'months', 12, 1, 60, INT),
        input('minp', 'Minimum due', '% of balance', 5, 1, 10),
      ],
      outputs: [
        out('Rate as usually quoted', '% a year', 'm*12', { digits: 3 }),
        out('Effective yearly rate, compounded', '% a year', '((1 + m/100)^12 - 1)*100', { digits: 3 }),
        out('Effective with 18% GST on interest', '% a year', '((1 + m/100*1.18)^12 - 1)*100', { digits: 3 }),
        out('Balance after those months', '₹', 'B*(1 + m/100*1.18)^months'),
        out('Paying only the minimum: months to halve it', 'months', 'ln(0.5)/ln((1 + m/100*1.18)*(1 - minp/100))', { digits: 3 }),
      ],
      note: 'If the minimum is smaller than the monthly interest, the balance never halves — the last line goes negative.',
    },
  }),

  entry('income-tax-regimes', 'concept', MONEY, 'curious', 'Income Tax: New vs Old Regime', {
    summary: 'India has two personal tax systems: the default new regime (low slabs, almost no deductions, zero tax up to ₹12.75 lakh of salary) and the old one (higher slabs, 80C/80D/HRA/home-loan deductions).',
    aliases: ['new tax regime', 'old tax regime', 'tax regime', 'tax slab', 'tax slabs', 'Section 87A', 'standard deduction', 'marginal relief', 'Income-tax Act 2025'],
    tags: ['tax', 'salary'],
    year: 2020,
    body: md`
      ## New regime (default), tax year 2026-27
      Unchanged by Budget 2026:

      | Taxable income | Rate |
      |---|---|
      | up to ₹4 lakh | 0 |
      | ₹4–8 lakh | 5% |
      | ₹8–12 lakh | 10% |
      | ₹12–16 lakh | 15% |
      | ₹16–20 lakh | 20% |
      | ₹20–24 lakh | 25% |
      | above ₹24 lakh | 30% |

      - **Standard deduction** ₹75,000 for salary and pension.
      - **Rebate** (Section 87A, up to ₹60,000) makes tax **zero up to ₹12 lakh** of taxable income — so **₹12.75 lakh of salary**. Just above that, **marginal relief** caps the tax at the income above ₹12 lakh, so earning ₹10,000 more never costs more than ₹10,000.
      - Plus 4% health & education cess; surcharge above ₹50 lakh.
      - Almost no deductions — the big exception is the employer's NPS contribution.

      ## Old regime
      Slabs 0 / 5% / 20% / 30% at ₹2.5 / 5 / 10 lakh; standard deduction ₹50,000; rebate up to ₹5 lakh. In exchange you keep 80C (₹1.5 lakh), 80D, 80CCD(1B) NPS, HRA and home-loan interest.

      ## Which wins
      The calculator finds the **deductions you'd need** for the old regime to beat the new one at your salary. At ₹15 lakh it's about ₹5.4 lakh of deductions — only people with large rent (HRA) plus a home loan usually get there.

      ## The new Act
      From 1 April 2026 the **Income-tax Act, 2025** replaced the 1961 Act. "Previous year/assessment year" became a single **tax year**, and sections were renumbered (80C → 123, 80CCD → 124, 80D → 126). The rates and limits carried over. This entry uses the familiar old numbers because that's what most people still search for.
    `,
    calc: {
      inputs: [
        input('salary', 'Yearly salary (gross)', '₹', 1500000, 300000, 5000000, LOG),
        input('ded', 'Old-regime deductions (80C, 80D, HRA, home-loan interest, NPS)', '₹', 250000, 0, 1000000),
      ],
      outputs: [
        out('Taxable income, new regime', '₹', 'max(0, salary - 75000)', { key: 'Tn' }),
        out('Tax, new regime (with cess)', '₹', '1.04*if(Tn - 1200000, min(Tn - 1200000, 0.05*max(0, min(Tn, 800000) - 400000) + 0.10*max(0, min(Tn, 1200000) - 800000) + 0.15*max(0, min(Tn, 1600000) - 1200000) + 0.20*max(0, min(Tn, 2000000) - 1600000) + 0.25*max(0, min(Tn, 2400000) - 2000000) + 0.30*max(0, Tn - 2400000)), 0)', { key: 'N' }),
        out('Taxable income, old regime', '₹', 'max(0, salary - 50000 - ded)', { key: 'To' }),
        out('Tax, old regime (with cess)', '₹', '1.04*if(To - 500000, 0.05*max(0, min(To, 500000) - 250000) + 0.20*max(0, min(To, 1000000) - 500000) + 0.30*max(0, To - 1000000), 0)', { key: 'O' }),
        out('New regime saves you', '₹', 'O - N'),
        out('Old regime wins only with deductions above', '₹', 'salary - 50000 - if(12500 - N/1.04, 500000, if(112500 - N/1.04, 500000 + (N/1.04 - 12500)/0.2, 1000000 + (N/1.04 - 112500)/0.3))'),
        out('Effective tax rate, new regime', '%', 'N/salary*100', { digits: 3 }),
      ],
      note: 'Salaried, under 60, tax year 2026-27, income up to ₹50 lakh (no surcharge). A guide, not tax advice.',
    },
  }),

  entry('section-80c', 'concept', MONEY, 'curious', 'Section 80C Deductions', {
    summary: 'Up to ₹1.5 lakh a year of PPF, EPF, ELSS, life premiums, home-loan principal and more, taken off taxable income — old regime only. Now Section 123 of the 2025 Act.',
    aliases: ['80C', 'Section 80C', 'Section 123', 'tax-saving investments'],
    tags: ['tax'],
    body: md`
      ## What counts (₹1.5 lakh combined)
      EPF and VPF (your share), PPF, ELSS, NSC, 5-year tax-saving FDs, Sukanya Samriddhi, life insurance premiums, home-loan principal, children's tuition fees, NPS (within the same cap).

      ## What it's worth
      A deduction saves tax at your **marginal rate**: ₹1.5 lakh in the 30% slab saves ₹1.5 lakh × 31.2% = ₹46,800; in the 5% slab only ₹7,800.

      ## The trap
      "Tax-saving" became a reason to buy poor products — endowment plans bought in March to save tax. Choose the investment on its merits first; the deduction is a bonus.

      ## The regime question
      None of this applies in the new regime, which most taxpayers now use. Many people's EPF already fills most of the ₹1.5 lakh anyway.
    `,
  }),

  entry('capital-gains-tax', 'concept', MONEY, 'curious', 'Capital Gains Tax (India)', {
    summary: 'Tax on profit when you sell. Listed equity: 12.5% on long-term gains above ₹1.25 lakh a year (held over 12 months), 20% on short-term gains. Debt funds bought after April 2023: your slab rate.',
    aliases: ['capital gains tax', 'capital gains', 'LTCG', 'STCG', 'long-term capital gains', 'short-term capital gains', 'tax harvesting', 'tax-loss harvesting', 'indexation'],
    tags: ['tax', 'investing'],
    year: 2024,
    body: md`
      ## Equity shares and equity funds (from 23 July 2024; unchanged by Budget 2026)
      - **Long-term** (held over 12 months): **12.5%** on gains above **₹1.25 lakh** per year.
      - **Short-term**: **20%**.
      - Plus 4% cess (and surcharge, capped at 15% on these gains, for high incomes).
      - Gains made before 31 January 2018 are grandfathered.

      ## Debt
      Debt mutual funds bought on or after 1 April 2023: gains taxed at your **slab rate**, however long you hold — the same as FD interest. Indexation (inflation-adjusting the purchase price) was removed for most assets in July 2024; property bought before 23 July 2024 can still choose 20% with indexation or 12.5% without.

      ## Buybacks
      From April 2026, money from a company buying back its shares is taxed as **capital gains**, not as a dividend.

      ## Harvesting
      Sell and immediately rebuy enough equity each year to realise ₹1.25 lakh of long-term gains: no tax now, and your cost price resets higher, cutting future tax. Worth about ₹16,250 a year.

      Also: losses can be set off against gains (long-term losses only against long-term gains) and carried forward 8 years if you file on time.
    `,
    calc: {
      inputs: [
        input('lt', 'Long-term equity gains this year', '₹', 400000, 0, 20000000),
        input('st', 'Short-term equity gains this year', '₹', 50000, 0, 20000000),
      ],
      outputs: [
        out('Tax on long-term gains', '₹', '1.04*0.125*max(0, lt - 125000)'),
        out('Tax on short-term gains', '₹', '1.04*0.20*st'),
        out('Effective rate on all gains', '%', 'if(lt + st, (1.04*0.125*max(0, lt - 125000) + 1.04*0.20*st)/(lt + st)*100, 0)', { digits: 3 }),
        out('Yearly saving from harvesting ₹1.25 lakh', '₹', '1.04*0.125*125000'),
      ],
      note: 'Ignores surcharge. Tax rules change with Budgets — check before you sell.',
    },
  }),

  entry('retirement-corpus', 'equation', MONEY, 'curious', 'Retirement Corpus', {
    summary: 'How big a pot you need to fund 30 years of retirement with prices rising, and the monthly SIP that gets you there.',
    aliases: ['retirement corpus', 'retirement planning', 'retirement fund'],
    tags: ['retirement', 'planning'],
    latex: md`\text{Corpus} = E_R\,\frac{1 - (1+r_{\text{real}})^{-N}}{r_{\text{real}}}\,(1 + r_{\text{real}}), \qquad 1 + r_{\text{real}} = \frac{1 + r}{1 + \pi}`,
    variables: [
      [md`E_R`, 'Yearly expenses in the first year of retirement (today’s spending grown by inflation)'],
      ['N', 'Years in retirement'],
      ['r', 'Return on the corpus during retirement'],
      [md`\pi`, 'Inflation'],
      [md`r_{\text{real}}`, 'Real return: what the corpus earns above inflation'],
    ],
    body: md`
      ## Two steps
      1. **Inflate today's spending** to the year you retire: ₹50,000 a month now, at 6% inflation, is ₹2.15 lakh a month in 25 years.
      2. **Fund a rising stream** for $N$ years. Withdrawals grow with inflation while the corpus earns $r$, so only the *real* return helps — the annuity formula at $r_{\text{real}}$.

      With ₹50,000 a month today, 25 years to go, 30 years of retirement, 8% returns in retirement and 6% inflation: a corpus of about **₹6 crore**, reachable with a SIP of roughly **₹31,500 a month** at 12%.

      ## What moves the answer most
      - **Inflation** (try 5% vs 7%) — the biggest single lever over 25 years.
      - **Years to go** — starting 5 years later needs a much bigger SIP.
      - **Real return in retirement** — keeping some equity after retiring raises it.

      See the safe withdrawal rate for the other way round: given a corpus, how much can you spend?
    `,
    calc: {
      inputs: [
        input('spend', 'Monthly expenses today', '₹', 50000, 5000, 1000000, LOG),
        input('infl', 'Inflation', '% a year', 6, 2, 10),
        input('yrs', 'Years until retirement', 'years', 25, 1, 45, INT),
        input('N', 'Years in retirement', 'years', 30, 5, 50, INT),
        input('post', 'Return during retirement', '% a year', 8, 3, 12),
        input('pre', 'Return until retirement (SIP)', '% a year', 12, 4, 16),
      ],
      outputs: [
        out('Monthly expenses at retirement', '₹', 'spend*(1 + infl/100)^yrs', { key: 'Em' }),
        out('Real return during retirement', '% a year', '((1 + post/100)/(1 + infl/100) - 1)*100', { key: 'rr', digits: 3 }),
        out('Corpus needed', '₹', '12*Em*if(abs(rr) - 0.0001, (1 - (1 + rr/100)^(-N))/(rr/100)*(1 + rr/100), N)', { key: 'K' }),
        out('Monthly SIP needed from today', '₹', 'K*(pre/1200)/(((1 + pre/1200)^(12*yrs) - 1)*(1 + pre/1200))'),
      ],
    },
  }),

  entry('safe-withdrawal-rate', 'concept', MONEY, 'curious', 'Safe Withdrawal Rate (4% Rule)', {
    summary: 'Withdraw ~4% of your pot in year one and raise it with inflation; historically that lasted 30 years in the US. With India’s higher inflation, 3–3.5% is a more cautious start.',
    aliases: ['safe withdrawal rate', '4% rule', 'Trinity study', 'sequence of returns risk', 'sequence risk'],
    tags: ['retirement'],
    year: 1994,
    body: md`
      ## Where 4% comes from
      William Bengen (1994) and the "Trinity study" (1998) checked US history: a 50/50 stock/bond portfolio that paid out 4% of its starting value, rising with inflation each year, survived every 30-year period since 1926.

      ## Why India is different
      - Inflation has been higher and more volatile, so withdrawals grow faster.
      - A 40-year retirement (retiring at 50) needs a lower rate than a 30-year one.
      Many Indian planners use **3–3.5%** — i.e. a corpus of 30–35× annual spending.

      ## Sequence risk
      The same average returns can succeed or fail depending on their **order**. A crash in the first years of retirement, while you're withdrawing, does permanent damage — you sell low to eat. A crash 20 years in barely matters. It's why retirees keep a few years of spending in debt and why "average return" planning is dangerous (compare volatility drag and ergodicity).

      The calculator uses a steady real return, which hides sequence risk — treat it as an optimistic floor.
    `,
    calc: {
      inputs: [
        input('K', 'Corpus', '₹', 50000000, 1000000, 1000000000, LOG),
        input('W', 'First-year withdrawal', '₹', 2000000, 50000, 100000000, LOG),
        input('rr', 'Real return (above inflation)', '% a year', 2, -3, 6),
      ],
      outputs: [
        out('Withdrawal rate', '%', 'W/K*100', { digits: 3 }),
        out('Years the money lasts', 'years', 'if(abs(rr) - 0.0001, if(W - rr/100*K, -ln(1 - rr/100*K/W)/ln(1 + rr/100), 1/0), K/W)', { digits: 3 }),
        out('Withdrawal that lasts forever', '₹ a year', 'max(0, rr/100*K)'),
      ],
      note: '∞ means the real return covers the withdrawals — the corpus never runs down in this steady-return model.',
    },
  }),

  entry('financial-independence', 'concept', MONEY, 'curious', 'Financial Independence (FIRE)', {
    summary: 'Having enough invested that work becomes optional. The time it takes depends mostly on your savings rate, not your salary.',
    aliases: ['financial independence', 'FIRE movement', 'retire early', 'lean FIRE', 'fat FIRE'],
    tags: ['retirement', 'planning'],
    latex: md`n = \frac{\ln\!\left(1 + \dfrac{r\,(1-s)}{s \cdot w}\right)}{\ln(1 + r)}`,
    variables: [
      ['n', 'Years to financial independence, starting from zero'],
      ['s', 'Savings rate: share of take-home income invested'],
      ['r', 'Real return on investments'],
      ['w', 'Withdrawal rate you’ll live on (0.035 = 3.5%)'],
    ],
    body: md`
      ## Why savings rate rules
      Saving a share $s$ of income means living on $(1-s)$. You need a pot of $(1-s)/w$ years of income, and you build it at $s$ per year plus returns. Salary cancels out — a high earner who spends it all never gets there.

      With a 5% real return and a 3.5% withdrawal rate:
      - save 10% → about **54 years**;
      - save 25% → about **34 years**;
      - save 40% → about **23½ years**;
      - save 60% → about **14 years**.

      ## The Indian twist
      Healthcare costs, supporting parents, and higher inflation argue for a bigger margin (lower $w$). "Lean" versus "fat" FIRE is just choosing $1-s$.
    `,
    calc: {
      inputs: [
        input('s', 'Savings rate', '% of income', 40, 1, 90),
        input('r', 'Real return', '% a year', 5, 0.5, 10),
        input('w', 'Withdrawal rate in retirement', '%', 3.5, 2, 6),
      ],
      outputs: [
        out('Years to financial independence', 'years', 'ln(1 + (r/100)*(1 - s/100)/((s/100)*(w/100)))/ln(1 + r/100)', { digits: 3 }),
        out('Pot needed, in years of spending', 'years', '100/w', { digits: 3 }),
      ],
    },
  }),

  entry('lifestyle-inflation', 'concept', MONEY, 'curious', 'Lifestyle Inflation', {
    summary: 'Spending rises to meet every raise. The bigger flat and newer car feel normal within months, and the savings rate never moves.',
    aliases: ['lifestyle inflation', 'lifestyle creep', 'hedonic treadmill', 'hedonic adaptation'],
    tags: ['habits', 'psychology'],
    body: md`
      ## What happens
      Salary goes from ₹60,000 to ₹1 lakh a month; within a year spending has grown to match. Psychologists call it **hedonic adaptation**: the new flat stops feeling special, but its rent stays.

      ## Why it matters so much
      Lifestyle inflation hits twice: you save less *and* the retirement corpus you need grows, because it's sized on your spending. Keeping spending flat while income rises is the fastest route to financial independence.

      ## A simple defence
      **Save half of every raise.** Step up your SIP by the same percentage as each increment, on the day it arrives, and let the other half improve your life.
    `,
  }),

  entry('asset-allocation', 'concept', MONEY, 'curious', 'Asset Allocation and Rebalancing', {
    summary: 'How you split money between equity, debt and gold matters more than which fund you pick. Rebalancing back to the split sells high and buys low automatically.',
    aliases: ['asset allocation', 'rebalancing', 'rebalance', 'glide path', 'equity allocation', 'portfolio mix'],
    tags: ['investing', 'planning', 'risk'],
    body: md`
      ## The big decision
      Most of a diversified portfolio's ups and downs come from the **mix** — how much is in equity versus debt — not the individual funds. A 100% equity portfolio might fall 50–60% in a crash like 2008; a 60/40 mix perhaps 30%.

      Rough guides (not rules):
      - money needed within ~3 years → debt;
      - 5+ year goals → mostly equity;
      - the "100 minus age in equity" rule is a crude glide path that shifts to debt as a goal nears.

      ## Rebalancing
      Pick a target (say 60/40). After a boom, equity may be 70%: sell some, buy debt. After a crash it may be 50%: buy equity. This forces you to **buy low and sell high** without predicting anything, and keeps risk where you chose it. Once a year, or when a slice drifts 5%+, is enough. In India, rebalancing inside the ₹1.25 lakh LTCG allowance keeps the tax cost small.

      ## Why diversification between asset classes works
      Equity and debt have low correlation, and gold often rises in panics — so the mix swings less than its parts. The calculator shows the effect.
    `,
    calc: {
      inputs: [
        input('w', 'Equity share', '%', 60, 0, 100),
        input('re', 'Equity return', '% a year', 12, 0, 20),
        input('se', 'Equity volatility', '% a year', 20, 5, 40),
        input('rd', 'Debt return', '% a year', 7, 2, 10),
        input('sdd', 'Debt volatility', '% a year', 3, 0.5, 10),
        input('rho', 'Correlation between them', '', 0, -1, 1),
      ],
      outputs: [
        out('Expected return', '% a year', 'w/100*re + (1 - w/100)*rd', { key: 'mu', digits: 3 }),
        out('Volatility', '% a year', 'sqrt((w/100*se)^2 + ((1 - w/100)*sdd)^2 + 2*rho*(w/100)*(1 - w/100)*se*sdd)', { key: 'vol', digits: 3 }),
        out('A bad year (about 1 in 40)', '%', 'mu - 2*vol', { digits: 3 }),
      ],
      note: 'A bad year here assumes a bell curve; real crashes are worse (fat tails).',
    },
  }),

  entry('gold', 'concept', MONEY, 'curious', 'Gold in India', {
    summary: 'Indian households hold a huge amount of gold, mostly as jewellery. As an investment it pays no income but often rises when rupees and stocks fall.',
    aliases: ['gold', 'Sovereign Gold Bond', 'Sovereign Gold Bonds', 'SGB', 'SGBs', 'gold ETF', 'gold ETFs', 'digital gold'],
    tags: ['assets', 'India'],
    body: md`
      ## Why Indians own it
      Tradition, weddings, distrust of banks after past crises, and a hedge against a falling rupee: gold is priced in dollars, so when the rupee weakens, rupee gold rises. Estimates put household holdings around 25,000 tonnes — among the largest private stocks in the world.

      ## As an investment
      - **No cash flow**: no dividends or interest, so its value is only what the next buyer pays.
      - **Crisis behaviour**: low or negative correlation with stocks in panics; useful as a 5–15% slice for diversification.
      - **Long flat spells**: rupee gold went roughly nowhere from 2012 to 2018.

      ## Ways to hold it
      - **Jewellery**: making charges (8–25%) and purity doubts — poor as an investment.
      - **Gold ETFs** and gold mutual funds: track the price with low costs; taxed as capital gains.
      - **Sovereign Gold Bonds**: paid 2.5% interest on top of the gold price, tax-free if held to maturity. The government hasn't issued new ones since February 2024; older ones still trade on exchanges.
      - **"Digital gold"** on apps is **not regulated by SEBI**, which has warned investors about it.
    `,
  }),

  entry('real-estate-reits', 'concept', MONEY, 'curious', 'Real Estate and REITs', {
    summary: 'Property is most Indian families’ biggest asset: illiquid, lumpy and heavily leveraged. REITs let you own a slice of rented offices for a few hundred rupees, with most of the rent paid out.',
    aliases: ['real estate', 'property investment', 'REIT', 'REITs', 'InvIT', 'InvITs', 'rental yield'],
    tags: ['assets', 'property'],
    year: 2019,
    body: md`
      ## Property as an investment
      - **Rental yields** on homes in big Indian cities are low, often **2–3.5%**; commercial property yields more (7–8%).
      - Returns come mostly from **price growth**, magnified by a home loan (leverage).
      - Costs: stamp duty (5–7%), registration, brokerage, maintenance, vacancies.
      - Illiquid: selling takes months; you can't sell 10% of a flat.

      ## REITs
      Real Estate Investment Trusts own rent-yielding property (mostly Grade-A offices and malls) and trade on exchanges like shares. India's first listed in **2019** (Embassy Office Parks). Rules require them to distribute at least **90%** of net distributable cash flow, so they behave a bit like bonds with growth. **InvITs** do the same for roads, power lines and pipelines.

      ## What connects them
      Every property's value is its rent stream discounted — so when interest rates rise, property and REIT prices tend to fall, just as bonds do.
    `,
  }),
];
