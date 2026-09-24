// Maths of Money: the tools every other area leans on.

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { BASICS } = AREA;

export const BASICS_ENTRIES = [
  entry('time-value-of-money', 'concept', BASICS, 'curious', 'Time Value of Money', {
    summary: 'A rupee today is worth more than a rupee next year, because today’s rupee can be put to work in the meantime.',
    aliases: ['time value of money', 'price of time'],
    tags: ['foundations', 'interest'],
    body: md`
      ## The idea
      Money has a **when** as well as a **how much**. ₹1,00,000 today can sit in a fixed deposit at 7% and be ₹1,07,000 next year, so a promise of ₹1,00,000 next year is worth *less* than ₹1,00,000 now.

      Three things make later money worth less:
      - **Opportunity** — what the money could earn meanwhile (the opportunity cost of waiting).
      - **Inflation** — what it will buy has shrunk.
      - **Risk** — the promise might not be kept.

      ## Where it shows up
      Almost everything in finance is this one idea in a different costume:
      - compound interest runs it forwards (today → future);
      - present value runs it backwards (future → today);
      - an EMI, a SIP, a pension or a bond is a *stream* of dated amounts, valued with the annuity formula;
      - a company is worth its future cash flows brought back to today — a DCF.

      The interest rate is literally the **price of time**: how many extra rupees the market demands for waiting a year.
    `,
  }),

  entry('compound-interest', 'equation', BASICS, 'curious', 'Compound Interest', {
    summary: 'Interest that earns interest. Growth is multiplied each period, not added, so it runs away with time.',
    aliases: ['compound interest', 'compounding', 'compounded', 'interest on interest', 'simple interest'],
    tags: ['foundations', 'interest', 'growth'],
    latex: md`A = P\left(1 + \frac{r}{n}\right)^{nt}`,
    variables: [
      ['A', 'Amount after t years'],
      ['P', 'Principal: what you start with'],
      ['r', 'Annual interest rate as a decimal (10% → 0.10)'],
      ['n', 'Compounding periods per year (1 yearly, 4 quarterly, 12 monthly)'],
      ['t', 'Time in years'],
    ],
    body: md`
      ## Simple vs compound
      **Simple interest** pays on the original principal only: ₹1 lakh at 10% gives ₹10,000 every year, so ₹2 lakh after 10 years.

      **Compound interest** pays on whatever has built up: year 1 earns ₹10,000, year 2 earns ₹11,000, year 3 earns ₹12,100… After 10 years that is $1.1^{10} = 2.594$ — **₹2.59 lakh**. After 30 years, simple gives ₹4 lakh; compound gives $1.1^{30} = 17.45$, **₹17.4 lakh**.

      The gap is small at first and enormous later: most of a compounded sum arrives in the last few years. That's why starting early beats investing more later — see exponential growth.

      ## How often
      Compounding monthly instead of yearly at the same quoted rate gives slightly more: $(1 + 0.10/12)^{12} = 1.1047$, an *effective* 10.47%. Push $n$ to infinity and you get continuous compounding, where Euler's $e$ appears.

      ## India check
      Bank FDs usually compound quarterly; PPF compounds yearly; credit-card interest compounds monthly — which is why the card's "3.6% a month" is far worse than it sounds.
    `,
    calc: {
      inputs: [
        input('P', 'Principal', '₹', 100000, 1000, 100000000, LOG),
        input('r', 'Interest rate', '% a year', 10, 0, 30),
        input('years', 'Time', 'years', 10, 1, 50, INT),
        input('n', 'Compounded', 'times a year', 12, 1, 365, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Final amount', '₹', 'P*(1 + r/100/n)^(n*years)', { key: 'A' }),
        out('Interest earned', '₹', 'A - P'),
        out('Growth multiple', '×', 'A/P', { digits: 4 }),
        out('Simple interest would give', '₹', 'P*(1 + r/100*years)'),
        out('Effective yearly rate', '%', '((1 + r/100/n)^n - 1)*100', { digits: 4 }),
      ],
      note: 'Double the time and the interest more than doubles — compare 10 years with 20, then 40.',
    },
  }),

  entry('rule-of-72', 'equation', BASICS, 'curious', 'Rule of 72', {
    summary: 'Money doubles in about 72 ÷ (rate in %) years. At 12%, about six years.',
    aliases: ['rule of 72', 'rule of 70', 'doubling time'],
    tags: ['foundations', 'mental maths'],
    latex: md`t_{\text{double}} = \frac{\ln 2}{\ln(1 + r)} \approx \frac{72}{100\,r}`,
    variables: [
      [md`t_{\text{double}}`, 'Years for money to double'],
      ['r', 'Growth rate per year as a decimal'],
    ],
    body: md`
      ## Why 72 works
      Doubling needs $(1+r)^t = 2$, so $t = \ln 2 / \ln(1+r)$. For small $r$, $\ln(1+r) \approx r$, giving $t \approx 0.693/r$ — the "rule of 69.3". Using 72 instead nudges the answer up to correct for $\ln(1+r)$ being a bit less than $r$ at typical rates, and 72 divides neatly by 2, 3, 4, 6, 8, 9 and 12.

      ## Quick uses
      - **Nifty at ~12%**: doubles in ~6 years, so ₹1 lakh becomes ~₹8 lakh in 18 years (three doublings).
      - **PPF at 7.1%**: ~10 years to double.
      - **Inflation at 6%**: prices double in ~12 years — what costs ₹50,000 today costs ₹1 lakh around 2038.
      - **Credit-card debt at ~42%**: doubles in under two years.

      It works for anything growing at a steady percentage: population, GDP, a startup's users, prices under hyperinflation.
    `,
    calc: {
      inputs: [input('r', 'Growth rate', '% a year', 12, 0.5, 60)],
      outputs: [
        out('Exact doubling time', 'years', 'ln(2)/ln(1 + r/100)', { key: 'exact', digits: 4 }),
        out('Rule of 72 says', 'years', '72/r', { digits: 4 }),
        out('Rule of 70 says', 'years', '70/r', { digits: 4 }),
        out('Rule of 72 is off by', '%', '(72/r - exact)/exact*100', { digits: 2 }),
      ],
      note: 'The rule of 72 is best around 8%; at very high rates it drifts. Try 1%, 8% and 50%.',
    },
  }),

  entry('continuous-compounding', 'equation', BASICS, 'curious', 'Continuous Compounding and e', {
    summary: 'Compound more and more often and the growth factor stops at eᴿᵀ. Euler’s number e was first found this way, from interest.',
    aliases: ['continuous compounding', 'continuously compounded', "Euler's number", 'the number e'],
    tags: ['foundations', 'interest', 'exponential'],
    year: 1683,
    latex: md`\lim_{n\to\infty}\left(1 + \frac{r}{n}\right)^{nt} = e^{rt}, \qquad e = 2.71828\ldots`,
    variables: [
      ['r', 'Annual rate as a decimal'],
      ['n', 'Compounding periods per year'],
      ['t', 'Years'],
      ['e', 'Euler’s number, about 2.71828'],
    ],
    body: md`
      ## Bernoulli's question (1683)
      Jacob Bernoulli asked: a bank pays 100% a year. Compounded once, ₹1 becomes ₹2. Compounded twice (50% each half), $1.5^2 = 2.25$. Monthly, $(1 + 1/12)^{12} = 2.613$. Daily, $2.7146$. Does it grow without limit?

      No — it creeps up to $e = 2.71828\ldots$ The number that runs calculus, waves and quantum mechanics was discovered as a question about **interest**.

      ## Why finance loves it
      With continuous compounding, growth rates simply **add**: 5% for a year then 7% for a year is $e^{0.05}e^{0.07} = e^{0.12}$. That's why quants work with log returns, and why the Black–Scholes formula is full of $e^{-rT}$ discount factors.

      ## How much does it matter?
      At ordinary rates, barely: 10% compounded continuously is an effective $e^{0.1} - 1 = 10.517\%$ versus 10.471% monthly. The difference only gets big at big rates — hyperinflations, payday loans and Bernoulli's 100%.
    `,
    calc: {
      inputs: [
        input('r', 'Interest rate', '% a year', 100, 1, 200),
        input('n', 'Compounded', 'times a year', 12, 1, 100000, { ...LOG, ...INT }),
        input('years', 'Time', 'years', 1, 0.1, 30, LOG),
      ],
      outputs: [
        out('Growth, compounding n times a year', '×', '(1 + r/100/n)^(n*years)', { key: 'disc', digits: 6 }),
        out('Growth, compounding continuously', '×', 'exp(r/100*years)', { key: 'cont', digits: 6 }),
        out('Continuous is more by', '%', '(cont/disc - 1)*100', { digits: 3 }),
      ],
      note: 'Leave the rate at 100% and one year, then push compounding from 1 to 100,000: watch 2 → 2.718…',
    },
  }),

  entry('present-value', 'equation', BASICS, 'curious', 'Present Value and Discounting', {
    summary: 'What a future amount is worth today: divide by the growth it could have had. Compounding run backwards.',
    aliases: ['present value', 'net present value', 'NPV', 'discounting', 'discount rate', 'discount factor', 'future value'],
    tags: ['foundations', 'valuation'],
    latex: md`PV = \frac{FV}{(1 + r)^t}`,
    variables: [
      ['PV', 'Present value: worth today'],
      ['FV', 'Future value: the amount received later'],
      ['r', 'Discount rate per year: what the money could earn elsewhere, allowing for risk'],
      ['t', 'Years until the money arrives'],
    ],
    body: md`
      ## The backwards question
      Someone offers ₹10 lakh in 10 years. If you can earn 8% a year elsewhere, the offer is worth ₹10 lakh ÷ $1.08^{10}$ = ₹4.63 lakh today. Pay more than that and you'd have done better investing it yourself.

      The **discount rate** $r$ carries everything: your alternatives (opportunity cost), inflation, and how risky the promise is. A government bond's cash flows get a low rate; a startup's projections get a high one.

      ## Adding up streams
      For a series of payments, discount each by its own date and add: that is **net present value**,
      $$NPV = \sum_t \frac{CF_t}{(1+r)^t}.$$
      A project is worth doing when its NPV is positive at your cost of capital. Bonds, EMIs, pensions and whole companies (DCF) are all valued this way.

      ## Rates move prices
      Because $PV$ divides by $(1+r)^t$, a rise in rates cuts the value of *far-off* money the most. That's why long bonds and high-growth stocks (whose profits are mostly in the distant future) fall hardest when the RBI or the Fed raises rates.
    `,
    calc: {
      inputs: [
        input('FV', 'Amount received later', '₹', 1000000, 1000, 1000000000, LOG),
        input('r', 'Discount rate', '% a year', 8, 0, 25),
        input('years', 'Years away', 'years', 10, 0, 50),
      ],
      outputs: [
        out('Worth today', '₹', 'FV/(1 + r/100)^years', { key: 'PV' }),
        out('Discount factor', '', '(1 + r/100)^(-years)', { digits: 4 }),
        out('Value lost to waiting', '₹', 'FV - PV'),
      ],
    },
  }),

  entry('annuities', 'equation', BASICS, 'curious', 'Annuity Formula', {
    summary: 'The value of a stream of equal payments — the one formula behind EMIs, SIPs, pensions and bond coupons.',
    aliases: ['annuity formula', 'annuity', 'annuities', 'stream of payments'],
    tags: ['foundations', 'valuation'],
    latex: md`PV = C\,\frac{1 - (1+i)^{-N}}{i}, \qquad FV = C\,\frac{(1+i)^{N} - 1}{i}`,
    variables: [
      ['C', 'Payment each period'],
      ['i', 'Interest rate per period (monthly rate = yearly ÷ 12)'],
      ['N', 'Number of payments'],
      ['PV', 'What the whole stream is worth today'],
      ['FV', 'What it grows to if every payment is invested until the end'],
    ],
    body: md`
      ## Where it comes from
      A stream of $N$ payments is a sum of discounted terms, $C/(1+i) + C/(1+i)^2 + \cdots + C/(1+i)^N$ — a geometric series. Summing it gives the closed form above.

      ## Everywhere in India
      - **EMI**: the bank lends $PV$ and asks for $C$ each month; solve the formula for $C$.
      - **SIP**: you pay $C$ each month and want $FV$. (SIPs pay at the *start* of each month — an *annuity due* — so multiply $FV$ by $(1+i)$.)
      - **Pension / NPS annuity**: an insurer takes a lump sum ($PV$) and pays $C$ monthly for life.
      - **Bond coupons**: fixed payments plus the face value at the end.

      ## A number worth knowing
      ₹10,000 a month for 20 years, at 8%:
      - worth **₹11.96 lakh** today (the most a lender would give you for that stream),
      - grows to **₹58.9 lakh** if invested,
      - though you paid in only ₹24 lakh.
    `,
    calc: {
      inputs: [
        input('pmt', 'Payment', '₹ a month', 10000, 500, 1000000, LOG),
        input('r', 'Interest rate', '% a year', 8, 0.5, 20),
        input('years', 'For', 'years', 20, 1, 40, INT),
      ],
      outputs: [
        out('Worth today (present value)', '₹', 'pmt*(1 - (1 + r/1200)^(-12*years))/(r/1200)'),
        out('Grows to (future value)', '₹', 'pmt*((1 + r/1200)^(12*years) - 1)/(r/1200)'),
        out('Total paid in', '₹', 'pmt*12*years'),
      ],
    },
  }),

  entry('geometric-series', 'equation', BASICS, 'curious', 'Geometric Series', {
    summary: 'A sum where each term is the last one times a fixed ratio. It has a neat closed form, which is why loan and SIP maths is solvable by hand.',
    aliases: ['geometric series', 'geometric sum', 'geometric progression'],
    tags: ['foundations', 'maths'],
    latex: md`\sum_{k=0}^{N-1} x^k = \frac{1 - x^N}{1 - x}, \qquad \sum_{k=0}^{\infty} x^k = \frac{1}{1 - x}\ \ (|x| < 1)`,
    variables: [
      ['x', 'The common ratio between terms'],
      ['N', 'Number of terms'],
    ],
    body: md`
      ## The trick
      Call the sum $S = 1 + x + \dots + x^{N-1}$. Then $xS = x + \dots + x^N$. Subtract: $S - xS = 1 - x^N$. Done.

      ## Money versions
      - With $x = 1/(1+i)$ it's the **annuity formula** (and so EMIs).
      - With $x = 1+i$ it's what a **SIP** grows to.
      - The infinite version with $|x|<1$ gives a **perpetuity**: $C/i$. A payment of ₹1 a year forever, at 5%, is worth ₹20 today. Add growth $g$ and you get the Gordon growth model, $D/(r - g)$.
      - The **money multiplier** in banking is a geometric series of re-lent deposits: $1 + (1-\rho) + (1-\rho)^2 + \dots = 1/\rho$.
      - Keynes's spending multiplier $1/(1 - \text{MPC})$ is the same sum.
    `,
  }),

  entry('exponential-growth', 'concept', BASICS, 'curious', 'Exponential Growth', {
    summary: 'Growth by a fixed percentage, not a fixed amount. Slow-looking early, overwhelming late — and badly underestimated by intuition.',
    aliases: ['exponential growth', 'exponentially', 'exponential'],
    tags: ['foundations', 'growth', 'intuition'],
    body: md`
      ## Why intuition fails
      People extrapolate in straight lines. Ask for a guess at $1.12^{30}$ and most say "maybe 4 or 5"; it's **30**. This *exponential growth bias* is well documented and is why people undersave, start investing late and underestimate loan interest.

      ## The shape
      With a steady rate $r$, the amount is $A_0(1+r)^t$ — a curve whose **slope is proportional to its height**. Plot it on a log scale and it becomes a straight line; that's why long-run charts of Sensex or GDP are drawn with log axes.

      ## The late surge
      Invest ₹10,000 a month from 25 to 60 at 1% a month (about 12% a year): about **₹6.5 crore**. At 50 the pot is still only about ₹1.9 crore; the last ten years more than triple it. Start at 35 instead and you end at 60 with that same ₹1.9 crore — ten fewer years cost more than two-thirds of the pot.

      The same mathematics drives inflation eating savings, compounding credit-card debt, epidemics and chain reactions.
    `,
  }),

  entry('logarithms', 'concept', BASICS, 'curious', 'Logarithms', {
    summary: 'The inverse of exponentials: "how many times do I multiply?" They turn growth into addition and make long charts readable.',
    aliases: ['logarithm', 'logarithms', 'natural log', 'log scale', 'logarithmic scale'],
    tags: ['foundations', 'maths'],
    latex: md`\ln(ab) = \ln a + \ln b, \qquad \ln\!\left(\frac{S_T}{S_0}\right) = \sum_{k} \ln\!\left(\frac{S_{k}}{S_{k-1}}\right)`,
    variables: [
      [md`\ln`, 'Natural logarithm (base e)'],
      [md`S_0, S_T`, 'Price at the start and end'],
    ],
    body: md`
      ## What they answer
      "How long until ₹1 lakh becomes ₹8 lakh at 12%?" means solving $1.12^t = 8$, so $t = \ln 8 / \ln 1.12 = 18.3$ years. Logs turn *how many multiplications* into a number.

      ## Why finance uses them
      - **Products become sums.** A year of daily returns multiplies together; their logs add. Log returns can be averaged, summed and fed into statistics.
      - **Log charts.** Sensex went from 100 (1979) to over 80,000 (2024). On a normal axis everything before 2005 is a flat line; on a log scale, equal vertical steps are equal *percentage* moves, and the 1992 and 2008 crashes look like the disasters they were.
      - **Log utility.** Daniel Bernoulli suggested that the pleasure of money grows like its log — the root of risk aversion and the Kelly criterion.
    `,
  }),

  entry('cagr', 'equation', BASICS, 'curious', 'CAGR', {
    summary: 'The steady yearly rate that would turn the start value into the end value. The one-number summary of a bumpy ride.',
    aliases: ['CAGR', 'compound annual growth rate', 'annualised return', 'annualized return'],
    tags: ['returns', 'measurement'],
    latex: md`\text{CAGR} = \left(\frac{V_{\text{end}}}{V_{\text{start}}}\right)^{1/t} - 1`,
    variables: [
      [md`V_{\text{start}}, V_{\text{end}}`, 'Value at the start and end'],
      ['t', 'Years between them'],
    ],
    body: md`
      ## Nifty as an example
      The Nifty 50 started at **1,000** on 3 November 1995 and peaked near **26,000** in September 2024 — about 29 years. CAGR $= 26^{1/28.9} - 1 \approx 11.9\%$ a year, in price alone; dividends add roughly another 1–1.5%.

      ## What CAGR hides
      - **The path.** 12% CAGR could be a smooth ride or a stomach-churning one (Nifty fell ~60% in 2008). The spread of returns is volatility.
      - **Averages lie.** +100% then −50% averages +25% but the CAGR is **0%**: you're back where you started. That gap is volatility drag.
      - **Money going in and out.** For SIPs, with a deposit every month, CAGR doesn't apply — use XIRR.
    `,
    calc: {
      inputs: [
        input('start', 'Start value', '', 1000, 1, 1000000, LOG),
        input('finish', 'End value', '', 26000, 1, 10000000, LOG),
        input('years', 'Years', 'years', 28.9, 0.5, 60),
      ],
      outputs: [
        out('CAGR', '% a year', '((finish/start)^(1/years) - 1)*100', { digits: 3 }),
        out('Multiple', '×', 'finish/start', { digits: 4 }),
      ],
      note: 'Defaults: Nifty 50 from its 1995 base of 1,000 to about 26,000 in 2024. Try the Sensex: 100 in 1979 to 80,000 in 2024.',
    },
  }),

  entry('irr-xirr', 'equation', BASICS, 'curious', 'IRR and XIRR', {
    summary: 'The single interest rate that makes all your deposits and withdrawals balance out. The honest return figure for SIPs, found by trial and improvement.',
    aliases: ['IRR', 'XIRR', 'internal rate of return', 'money-weighted return'],
    tags: ['returns', 'measurement', 'numerical methods'],
    latex: md`\sum_{k} \frac{CF_k}{(1 + \text{IRR})^{t_k}} = 0`,
    variables: [
      [md`CF_k`, 'Each cash flow: money in is negative, money out (or the final value) positive'],
      [md`t_k`, 'When it happened, in years from the start'],
      [md`\text{IRR}`, 'The rate that makes the discounted flows sum to zero'],
    ],
    body: md`
      ## Why a new measure
      With a SIP you invest every month, so different rupees have been invested for different times. CAGR assumes one lump at the start — it would undersell your SIP. **IRR** asks: *what constant rate, applied to every deposit for its own time, reproduces the final value?* **XIRR** is the same thing with real calendar dates (what your mutual fund statement shows).

      ## No formula — you search
      There's no closed form for most cash-flow patterns (it's solving a polynomial of high degree). Spreadsheets use **Newton's method**: guess a rate, see how far off the value is, use the slope to jump to a better guess. The Try it below shows each step — usually four jumps nail it to several decimals.

      ## Watch out
      - A 20-year endowment policy with a "₹15 lakh maturity" often works out to an IRR of only **4–6%** — see endowments and ULIPs.
      - IRR can mislead when cash flows switch sign several times (there can be two answers).
    `,
    calc: {
      inputs: [
        input('P', 'SIP each month', '₹', 10000, 500, 500000, LOG),
        input('n', 'Months invested', 'months', 120, 12, 480, INT),
        input('FV', 'Value now', '₹', 2300000, 10000, 1000000000, LOG),
      ],
      outputs: [
        out('Rough first guess', '% a month', '100*((FV/(P*n))^(2/n) - 1)', { key: 'm0', digits: 6 }),
        out('After Newton step 1', '% a month', 'm0 - 100*(P*((1 + m0/100)^(n + 1) - (1 + m0/100))/(m0/100) - FV)/(P*(((n + 1)*(1 + m0/100)^n - 1)/(m0/100) - ((1 + m0/100)^(n + 1) - (1 + m0/100))/(m0/100)^2))', { key: 'm1', digits: 6 }),
        out('After step 2', '% a month', 'm1 - 100*(P*((1 + m1/100)^(n + 1) - (1 + m1/100))/(m1/100) - FV)/(P*(((n + 1)*(1 + m1/100)^n - 1)/(m1/100) - ((1 + m1/100)^(n + 1) - (1 + m1/100))/(m1/100)^2))', { key: 'm2', digits: 6 }),
        out('After step 3', '% a month', 'm2 - 100*(P*((1 + m2/100)^(n + 1) - (1 + m2/100))/(m2/100) - FV)/(P*(((n + 1)*(1 + m2/100)^n - 1)/(m2/100) - ((1 + m2/100)^(n + 1) - (1 + m2/100))/(m2/100)^2))', { key: 'm3', digits: 6 }),
        out('After step 4', '% a month', 'm3 - 100*(P*((1 + m3/100)^(n + 1) - (1 + m3/100))/(m3/100) - FV)/(P*(((n + 1)*(1 + m3/100)^n - 1)/(m3/100) - ((1 + m3/100)^(n + 1) - (1 + m3/100))/(m3/100)^2))', { key: 'm4', digits: 6 }),
        out('XIRR, as a yearly rate', '% a year', '((1 + m4/100)^12 - 1)*100', { digits: 4 }),
        out('Total invested', '₹', 'P*n'),
        out('Gain', '₹', 'FV - P*n'),
      ],
      note: 'Each step uses the slope of the value curve to jump to a better rate — Newton’s method. Watch the digits settle.',
    },
  }),

  entry('expected-value', 'concept', BASICS, 'curious', 'Expected Value', {
    summary: 'The probability-weighted average outcome. What you’d get per try if you could repeat a bet forever — which, with money, you often can’t.',
    aliases: ['expected value', 'expected return', 'expectation', 'probability-weighted average'],
    tags: ['probability', 'foundations'],
    latex: md`\mathbb{E}[X] = \sum_i p_i\, x_i`,
    variables: [
      [md`p_i`, 'Probability of outcome i'],
      [md`x_i`, 'Payoff of outcome i'],
    ],
    body: md`
      ## A lottery
      A ₹100 ticket with a 1-in-10-lakh chance of ₹50 lakh has an expected payout of ₹50,00,000 ÷ 10,00,000 = ₹5. You pay ₹100 for ₹5 of expectation — an expected loss of ₹95.

      ## Insurance is negative EV too — on purpose
      Your health insurance premium is more than the insurer's expected payout (that's how they pay staff and profit). You still buy it, because losing ₹20 lakh would hurt far more than 20 times losing ₹1 lakh. Expected value ignores **how bad** outcomes feel — that's what utility and risk aversion add.

      ## When EV misleads
      Expected value is an average across many parallel worlds. Your wealth lives in *one* world, compounding through time. For repeated multiplicative bets those two averages differ — the heart of ergodicity economics and the Kelly criterion.
    `,
  }),

  entry('variance-sd', 'concept', BASICS, 'curious', 'Variance and Standard Deviation', {
    summary: 'How spread out outcomes are around the average. In finance, the standard deviation of returns is called volatility.',
    aliases: ['variance', 'standard deviation', 'spread of returns'],
    tags: ['probability', 'statistics', 'risk'],
    latex: md`\sigma^2 = \mathbb{E}\big[(X - \mu)^2\big], \qquad \sigma = \sqrt{\sigma^2}`,
    variables: [
      [md`\mu`, 'The mean (expected value)'],
      [md`\sigma^2`, 'Variance: average squared distance from the mean'],
      [md`\sigma`, 'Standard deviation, in the same units as X'],
    ],
    body: md`
      ## Reading it
      If Nifty's yearly return has mean ~12% and standard deviation ~20%, a "normal" year lands roughly between −8% and +32% about two-thirds of the time — and a year like 2008 (about −52%) is a roughly 3σ event.

      ## Why variance adds nicely
      For *independent* things, variances add: $\text{Var}(X+Y) = \text{Var}(X) + \text{Var}(Y)$. So over $T$ independent years, variance grows like $T$ and standard deviation like $\sqrt{T}$ — the square-root-of-time rule behind volatility scaling and random walks.

      With correlation, a cross term appears: $\sigma_{X+Y}^2 = \sigma_X^2 + \sigma_Y^2 + 2\rho\sigma_X\sigma_Y$. Diversification is the art of making $\rho$ small.

      ## Caveat
      Standard deviation treats up-moves and down-moves alike and assumes the tails are thin. Real markets have fat tails, so σ understates crash risk.
    `,
  }),

  entry('correlation', 'concept', BASICS, 'curious', 'Correlation and Covariance', {
    summary: 'How much two things move together, from −1 (perfect opposites) to +1 (lockstep). Diversification only works when it’s below 1.',
    aliases: ['correlation', 'covariance', 'correlated', 'uncorrelated'],
    tags: ['statistics', 'risk'],
    latex: md`\rho_{XY} = \frac{\operatorname{Cov}(X,Y)}{\sigma_X\,\sigma_Y}, \qquad \operatorname{Cov}(X,Y) = \mathbb{E}\big[(X-\mu_X)(Y-\mu_Y)\big]`,
    variables: [
      [md`\rho_{XY}`, 'Correlation, between −1 and +1'],
      [md`\operatorname{Cov}`, 'Covariance: do X and Y tend to be above average at the same time?'],
    ],
    body: md`
      ## Typical numbers
      - Two Indian large-cap stocks: often $\rho \approx 0.3$–$0.6$.
      - Indian stocks vs gold: close to zero, sometimes negative in crises.
      - Nifty vs S&P 500 (in rupees): moderate, helped by the rupee often falling when markets panic.

      ## The catch
      **In a crash, correlations jump towards 1.** In 2008 and March 2020 almost everything risky fell together. Diversification you measured in calm years can vanish exactly when you need it — one face of fat tails.

      Correlation also isn't causation, and it only captures *linear* co-movement.
    `,
  }),

  entry('normal-distribution', 'concept', BASICS, 'curious', 'Normal Distribution', {
    summary: 'The bell curve: what you get when many small independent effects add up. Finance’s default model — and its most famous blind spot.',
    aliases: ['normal distribution', 'bell curve', 'Gaussian', 'Gaussian distribution'],
    tags: ['probability', 'statistics'],
    latex: md`f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-(x-\mu)^2/2\sigma^2}`,
    variables: [
      [md`\mu`, 'Mean: the centre'],
      [md`\sigma`, 'Standard deviation: the width'],
    ],
    body: md`
      ## Rules of thumb
      About **68%** of outcomes fall within ±1σ, **95%** within ±2σ, **99.7%** within ±3σ. Beyond that the tail thins astonishingly fast: a 5σ day should happen once in ~14,000 years of trading; a 10σ day essentially never.

      ## Why it's everywhere
      The central limit theorem: add up many independent nudges and the total is normal whatever the nudges look like. Daily returns are sums of countless trades, so the bell curve was a natural first model — Bachelier used it in 1900.

      ## Where it breaks
      Real markets have far more big days than the bell curve allows. On Black Monday (19 Oct 1987) the Dow fell 22.6% — something like a 20σ move under a normal model; the calculator's "once every" line runs out of zeros. The **Black–Scholes** model assumes normal log returns, which is one reason option prices show a volatility smile.
    `,
    calc: {
      inputs: [input('k', 'How many standard deviations', 'σ', 2, 0, 10)],
      outputs: [
        out('Chance of landing within ±kσ', '%', '(1 - 2*ncdf(-k))*100', { digits: 6 }),
        out('Chance of a fall bigger than kσ', '', 'ncdf(-k)', { key: 'tail', digits: 4 }),
        out('That’s one trading day in', 'days', '1/tail', { digits: 3 }),
        out('Or once every', 'years', '1/tail/252', { digits: 3 }),
      ],
      note: 'Under a bell curve, a 5σ fall is a once-in-14,000-years event. Markets have produced several in living memory.',
    },
  }),

  entry('law-of-large-numbers', 'theory', BASICS, 'curious', 'Law of Large Numbers', {
    summary: 'Average enough independent tries and the average settles on the expected value. The reason insurers and casinos can promise things individuals can’t.',
    aliases: ['law of large numbers', 'law of averages'],
    tags: ['probability', 'insurance'],
    year: 1713,
    latex: md`\bar{X}_N = \frac{1}{N}\sum_{k=1}^{N} X_k \;\longrightarrow\; \mu, \qquad \text{spread of } \bar{X}_N = \frac{\sigma}{\sqrt{N}}`,
    variables: [
      [md`\bar{X}_N`, 'Average of N independent tries'],
      [md`\mu`, 'The true expected value'],
      [md`\sigma`, 'Spread of a single try'],
    ],
    body: md`
      ## What it promises
      Proved by Jacob Bernoulli (published 1713): the average of many independent tries converges to the expected value, with the wobble shrinking like $1/\sqrt{N}$.

      ## Money uses
      - **Insurance**: one household's medical bill is wildly uncertain; the *average* bill across 10 lakh policyholders is predictable to a few percent. Pooling turns individual catastrophe into a steady premium.
      - **Casinos**: a house edge of 2.7% on roulette is invisible on one spin and certain over millions.
      - **Index funds**: owning 50 or 500 companies averages away the individual surprises (not the market's own swings).

      ## What it doesn't promise
      - It needs **independence**: it fails for correlated risks. Floods hit a whole city at once; 2008 hit every mortgage at once.
      - It needs a finite variance — some fat-tailed processes converge painfully slowly.
      - It's about *averages across many tries*, not about you catching up after a losing streak (the gambler's fallacy), and not about one person's wealth over time (ergodicity).
    `,
  }),

  entry('central-limit-theorem', 'theory', BASICS, 'curious', 'Central Limit Theorem', {
    summary: 'Sums of many independent random nudges look normal, whatever the nudges look like. Why bell curves show up everywhere — and why they fail when nudges aren’t independent.',
    aliases: ['central limit theorem', 'CLT'],
    tags: ['probability', 'statistics'],
    year: 1810,
    body: md`
      ## Statement
      Add $N$ independent random variables with mean $\mu$ and finite variance $\sigma^2$. The sum, centred and divided by $\sigma\sqrt{N}$, approaches a standard normal distribution as $N$ grows.

      ## Finance reading
      A month's log return is the sum of ~21 daily log returns, each the sum of thousands of trades. If those were independent with finite variance, monthly returns would be close to normal. They're closer to normal than daily returns — but still fat-tailed, because:
      - volatility comes in **clusters** (calm months, wild months), so the nudges aren't identically distributed;
      - panics make trades **dependent** (everyone sells at once);
      - some return distributions may have infinite variance in the tails, where the CLT doesn't apply at all (Mandelbrot's point about cotton prices).

      The same theorem explains diffusion in physics: Brownian motion is the continuum limit of a random walk.
    `,
  }),

  entry('utility-risk-aversion', 'theory', BASICS, 'curious', 'Utility and Risk Aversion', {
    summary: 'An extra ₹1 lakh matters less the richer you are. That curvature is why people insure, diversify and turn down fair bets.',
    aliases: ['risk aversion', 'risk-averse', 'utility', 'diminishing marginal utility', 'St Petersburg paradox', 'certainty equivalent', 'log utility'],
    tags: ['decisions', 'probability', 'psychology'],
    year: 1738,
    latex: md`U(W) = \ln W, \qquad \text{certainty equivalent: } CE = U^{-1}\big(\mathbb{E}[U(W)]\big)`,
    variables: [
      ['U', 'Utility: how much a level of wealth is worth to you'],
      ['W', 'Total wealth'],
      ['CE', 'The sure amount you’d accept instead of the gamble'],
    ],
    body: md`
      ## Bernoulli's answer (1738)
      The **St Petersburg paradox**: flip a coin until heads; if heads comes on flip $k$ you win ₹$2^{k}$. The expected value is $\tfrac12\cdot 2 + \tfrac14\cdot 4 + \dots = 1 + 1 + \dots = \infty$. Yet nobody would pay even ₹1,000 to play. Daniel Bernoulli proposed that what matters is not wealth but the **logarithm** of wealth — the tenth lakh adds less happiness than the first — and with log utility the game is worth only a few rupees.

      ## Risk aversion
      With a curved (concave) utility, a 50/50 bet of +₹5 lakh / −₹4 lakh on ₹10 lakh of wealth has positive expected value (+₹50,000) but a **certainty equivalent** below ₹10 lakh: you'd rather not play. That's the calculator below. The gap between EV and CE is the **risk premium** you'd pay to avoid the gamble — the economic basis of insurance.

      ## Where it leads
      - Log utility is exactly what the Kelly criterion maximises.
      - The same coin flip, repeated, is the Peters coin game in ergodicity economics — where log utility stops looking like psychology and starts looking like arithmetic.
      - Prospect theory says real people are also loss-averse: the curve is kinked at zero.
    `,
    calc: {
      inputs: [
        input('W', 'Your wealth', '₹', 1000000, 100000, 100000000, LOG),
        input('gain', 'Heads: you win', '₹', 500000, 0, 10000000),
        input('loss', 'Tails: you lose', '₹', 400000, 0, 10000000),
      ],
      outputs: [
        out('Expected gain', '₹', '(gain - loss)/2'),
        out('Certainty equivalent (log utility)', '₹', 'sqrt((W + gain)*(W - loss))', { key: 'CE' }),
        out('Sure change worth the same to you', '₹', 'CE - W'),
      ],
      note: 'A losing amount at or above your wealth makes the log undefined — ruin is infinitely bad under log utility.',
    },
  }),

  entry('opportunity-cost', 'concept', BASICS, 'curious', 'Opportunity Cost', {
    summary: 'The real cost of anything is the best alternative you gave up. Money sitting idle, a house you live in, and a degree all have one.',
    aliases: ['opportunity cost', 'next best alternative'],
    tags: ['foundations', 'economics', 'decisions'],
    body: md`
      ## Examples
      - **Cash in a savings account at 2.5–3%** while inflation runs 4–5%: no visible loss, but a real one.
      - **Owning your home**: no rent, but the ₹80 lakh in it could earn ~7% in debt instruments (₹5.6 lakh a year) — often more than the rent on the same flat. That's the heart of rent vs buy.
      - **Prepaying a home loan at 8.5%** vs investing at an expected 12%: the prepayment's opportunity cost is the higher (but riskier) return.
      - **Time**: an MBA's cost includes two years of salary, not just the fees.

      ## Why it matters
      The discount rate in every present value calculation *is* an opportunity cost: what the money could earn elsewhere at similar risk. Businesses call it the cost of capital or hurdle rate.
    `,
  }),

  entry('survivorship-bias', 'concept', BASICS, 'curious', 'Survivorship Bias', {
    summary: 'Looking only at the winners that are still around. It inflates fund track records, finfluencer stories and "stocks always go up".',
    aliases: ['survivorship bias', 'survivor bias'],
    tags: ['statistics', 'psychology', 'measurement'],
    year: 1943,
    body: md`
      ## Wald's bombers
      In World War II, Abraham Wald was shown where returning bombers had bullet holes and asked where to add armour. He said: where there are **no** holes — planes hit there didn't come back.

      ## In money
      - **Mutual fund categories**: funds that did badly get merged or closed, so the survivors' average looks better than what investors actually got. SPIVA scorecards correct for this.
      - **"Stocks always recover"**: true for the Sensex *index*, which quietly replaces companies that fail. Individual stocks from the 1990s boom — many are gone.
      - **Finfluencers and trading gurus**: you hear from the ones who made money; the 9 in 10 F&O traders who lost don't make reels.
      - **Country returns**: studies of "long-run equity returns" often start with the US, a spectacular survivor. Russian and Chinese investors in 1917 and 1949 lost everything.
    `,
  }),
];
