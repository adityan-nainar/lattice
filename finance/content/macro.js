// Economy & Money System: inflation, the RBI, banks, budgets and currencies.
// Policy numbers as of September 2026: repo 5.25% (held in August 2026), CPI on the new 2024 base.

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { MACRO } = AREA;

export const MACRO_ENTRIES = [
  entry('what-is-money', 'concept', MACRO, 'curious', 'What Money Is', {
    summary: 'Anything widely accepted as a medium of exchange, a unit of account and a store of value. Today most money is a bank’s promise, recorded as a number.',
    aliases: ['medium of exchange', 'store of value', 'unit of account', 'barter', 'legal tender', 'currency in circulation'],
    tags: ['foundations', 'money'],
    body: md`
      ## Three jobs
      - **Medium of exchange**: avoids barter's "double coincidence of wants".
      - **Unit of account**: prices in rupees make comparison possible.
      - **Store of value**: holds purchasing power over time — imperfectly, because of inflation.

      ## What counts as money in India
      - **Currency** (notes and coins): an RBI liability, legal tender — only a modest slice of the total.
      - **Bank deposits**: most of the money supply. Your ₹1 lakh balance is a **bank's promise** to pay, created when banks lend (money creation).
      - **UPI** moves deposits instantly; it isn't new money, just new rails.

      ## Money is trust
      A ₹500 note is paper; it works because everyone expects everyone else to accept it. Demonetisation in 2016 showed how quickly that can be withdrawn by decree; hyperinflations show how quickly it can collapse by itself. The gold standard and Bitcoin are attempts to anchor trust in scarcity instead of institutions.
    `,
  }),

  entry('inflation', 'concept', MACRO, 'curious', 'Inflation', {
    summary: 'The general rise in prices — the fall in what a rupee buys. At 6% a year, prices double in about 12 years, quietly halving the value of cash.',
    aliases: ['inflation', 'inflationary', 'purchasing power', 'price rise', 'cost of living'],
    tags: ['macro', 'basics'],
    body: md`
      ## Why it matters for you
      At 6% inflation, ₹1 lakh buys what ₹55,800 buys today in 10 years, and what ₹31,200 does in 20. Any savings earning less than inflation are shrinking in real terms, even as the number grows. Retirement plans, school fees and medical costs all need inflating.

      ## Causes
      - **Demand-pull**: too much spending chasing too few goods (post-COVID reopening).
      - **Cost-push**: oil, food or wage shocks — in India, vegetable prices (tomatoes, onions) and monsoon failures swing headline inflation.
      - **Expectations**: if everyone expects 6%, wages and prices get set at 6%.
      - **Money growth** over the long run: "too much money chasing too few goods".

      ## India's record
      High and volatile in the 2000s and early 2010s (double digits in 2010 and 2013); much lower since inflation targeting began in 2016, mostly 2–6%. The RBI projects about 5% for FY 2026-27; CPI was about 4.8% in August 2026.

      ## A little is intended
      Central banks aim for low positive inflation, not zero — deflation makes debts heavier and makes people delay spending. See inflation targeting.
    `,
    calc: {
      inputs: [
        input('amt', 'Amount today', '₹', 100000, 100, 100000000, LOG),
        input('infl', 'Inflation', '% a year', 6, 0, 20),
        input('years', 'Years', 'years', 10, 1, 50, INT),
      ],
      outputs: [
        out('Same basket will cost', '₹', 'amt*(1 + infl/100)^years'),
        out('What today’s amount will buy, in today’s rupees', '₹', 'amt/(1 + infl/100)^years'),
        out('Purchasing power lost', '%', '(1 - 1/(1 + infl/100)^years)*100', { digits: 3 }),
        out('Years for prices to double', 'years', 'if(infl, ln(2)/ln(1 + infl/100), 1/0)', { digits: 3 }),
      ],
    },
  }),

  entry('cpi', 'concept', MACRO, 'curious', 'CPI: How Inflation Is Measured', {
    summary: 'The Consumer Price Index tracks the cost of a fixed basket of what households buy. India moved to a new series with base year 2024 in 2026, with less weight on food.',
    aliases: ['CPI', 'consumer price index', 'headline inflation', 'core inflation', 'WPI', 'wholesale price index', 'price index'],
    tags: ['macro', 'measurement', 'India'],
    body: md`
      ## How it's built
      Statisticians (MoSPI in India) price a basket of goods and services every month across cities and villages, weighting each item by its share of household spending in a consumption survey. Inflation is the % change in the index from a year earlier.

      ## The 2026 revision
      From January 2026, India's CPI uses **base year 2024 = 100**, with weights from the 2023-24 Household Consumption Expenditure Survey. Food's weight fell by about 9 percentage points (households spend a smaller share on food as incomes rise), and categories moved to the international COICOP 2018 classification. A lower food weight should make headline inflation a little less hostage to vegetable prices.

      ## Headline vs core
      - **Headline**: everything.
      - **Core**: excludes food and fuel — volatile items driven by weather and oil. Central banks watch core to see underlying trends, but the RBI targets headline.

      ## Your inflation isn't the CPI
      A student, a family with school fees and a retiree with medical bills each face different baskets. Education and healthcare inflation in India often run well above headline CPI.
    `,
  }),

  entry('fisher-equation', 'equation', MACRO, 'curious', 'Real vs Nominal: the Fisher Equation', {
    summary: 'Real return ≈ nominal return − inflation. A 7% FD with 5% inflation earns about 2% in real terms — before tax.',
    aliases: ['Fisher equation', 'Fisher effect', 'real return', 'real returns', 'real interest rate', 'nominal interest rate', 'nominal return', 'real terms', 'real rate'],
    tags: ['macro', 'returns'],
    year: 1896,
    latex: md`1 + r_{\text{real}} = \frac{1 + i}{1 + \pi} \quad\Longrightarrow\quad r_{\text{real}} \approx i - \pi`,
    variables: [
      ['i', 'Nominal interest rate or return'],
      [md`\pi`, 'Inflation rate'],
      [md`r_{\text{real}}`, 'Real rate: growth in purchasing power'],
    ],
    body: md`
      ## The point
      What you care about is what your money **buys**. Irving Fisher (1896, then *The Theory of Interest*, 1930) separated the nominal rate you see from the real rate you get.

      ## After tax, it's worse
      Tax is charged on the *nominal* interest, including the part that merely keeps up with inflation. A 7% FD in the 30% slab with 5% inflation: after tax 4.8%, real **−0.2%**. That's why PPF (tax-free) and equity (taxed lightly, only on sale) matter so much for long-term savers.

      ## For central banks
      The RBI thinks in real policy rates: repo rate minus expected inflation. With the repo at 5.25% and inflation expected near 4–5%, the real policy rate in 2026 is under 1% — mildly supportive of growth.

      ## For borrowers
      Inflation erodes debt in real terms. A fixed-rate loan at 8% during 6% inflation costs about 2% real — one reason governments with big debts don't mind some inflation.
    `,
    calc: {
      inputs: [
        input('i', 'Nominal return', '% a year', 7, -5, 30),
        input('infl', 'Inflation', '% a year', 5, -2, 30),
        input('tax', 'Tax on the return', '%', 31.2, 0, 42.7),
      ],
      outputs: [
        out('Real return, before tax (exact)', '% a year', '((1 + i/100)/(1 + infl/100) - 1)*100', { digits: 3 }),
        out('Rule of thumb (i − π)', '% a year', 'i - infl', { digits: 3 }),
        out('Real return after tax', '% a year', '((1 + i/100*(1 - tax/100))/(1 + infl/100) - 1)*100', { digits: 3 }),
      ],
    },
  }),

  entry('interest-rates', 'concept', MACRO, 'curious', 'Interest Rates: the Price of Time', {
    summary: 'The rate at which the economy trades rupees today for rupees later. It sets EMIs, FD returns, bond prices, stock valuations and the rupee — which is why everyone watches the RBI.',
    aliases: ['interest rate', 'interest rates', 'rate cycle', 'cost of borrowing'],
    tags: ['macro', 'hub'],
    body: md`
      ## One price, many effects
      When rates fall:
      - **EMIs** on floating loans fall (after a lag), and borrowing gets easier.
      - **FD and small-savings rates** fall — savers lose income.
      - **Bond prices** rise (duration).
      - **Stock valuations** rise: a lower discount rate lifts the present value of future profits, most for long-duration growth stocks (Gordon growth: $D/(r-g)$).
      - **Property** prices tend to rise.
      - The **rupee** can weaken as foreign money seeks higher yields elsewhere.
      Rising rates do the reverse.

      ## Who sets them
      The RBI sets the **repo rate** — the overnight rate at which it lends to banks. Longer rates (10-year G-sec, home loans) are set by markets, anchored by expectations of where the repo rate is going, plus inflation and risk premiums (the yield curve).

      ## The long view
      Global interest rates fell for 40 years from 1981 to 2020, lifting almost every asset price along the way; 2022 reversed that sharply. Many "investing lessons" from 1990–2020 were partly lessons about falling rates.
    `,
  }),

  entry('rbi', 'concept', MACRO, 'curious', 'Reserve Bank of India', {
    summary: 'India’s central bank, since 1935: it issues currency, sets interest rates to hit the inflation target, regulates banks, manages the rupee and runs payment systems.',
    aliases: ['RBI', 'Reserve Bank', 'Reserve Bank of India', 'central bank', 'central banks', 'central banking'],
    tags: ['institutions', 'India'],
    year: 1935,
    body: md`
      ## Its jobs
      - **Monetary policy**: sets the repo rate via the six-member Monetary Policy Committee, aiming at 4% CPI inflation.
      - **Issuer of currency**: every banknote except the ₹1 note (issued by the government).
      - **Banker to banks and to the government**: manages government borrowing (G-secs, T-bills).
      - **Bank regulator**: licences, capital rules, rescues (Yes Bank, 2020).
      - **Rupee manager**: buys and sells dollars from its forex reserves to smooth exchange-rate swings.
      - **Payments**: oversees UPI's operator NPCI, RTGS and NEFT.

      ## History
      Founded 1 April 1935 on the recommendation of the Hilton Young Commission; nationalised in 1949. Sanjay Malhotra became governor in December 2024.

      ## Independence
      Since 2016 the RBI has a legal inflation target, set with the government, and a committee that votes on rates — a structure meant to make policy predictable and harder to lean on before elections.
    `,
  }),

  entry('repo-rate', 'concept', MACRO, 'curious', 'Repo Rate and Monetary Policy', {
    summary: 'The RBI’s main lever: the rate at which banks borrow overnight from it. 5.25% since December 2025, held at the August 2026 meeting. It ripples out to EMIs, FDs and the whole economy.',
    aliases: ['repo rate', 'monetary policy', 'MPC', 'Monetary Policy Committee', 'policy rate', 'reverse repo', 'Standing Deposit Facility', 'MSF', 'rate cut', 'rate cuts', 'rate hike', 'rate hikes', 'transmission', 'CRR', 'cash reserve ratio', 'SLR'],
    tags: ['macro', 'policy', 'India'],
    body: md`
      ## The corridor (August 2026)
      - **Repo rate 5.25%**: banks borrow overnight from the RBI against government bonds.
      - **Standing Deposit Facility 5.00%**: the floor — banks park spare cash with the RBI.
      - **MSF and Bank Rate 5.50%**: the ceiling — emergency borrowing.
      Overnight market rates stay inside this corridor, and everything else is priced off them.

      ## The recent cycle
      Held at 6.5% through 2023–24 to bring inflation down; cut from February 2025 (6.25%, 6.0%, then a jumbo 0.5% to 5.5% in June 2025, and 5.25% in December 2025) as inflation fell; held since, with a neutral stance.

      ## Transmission
      Most new floating loans are linked to an external benchmark (the repo rate), so a cut reaches home-loan EMIs within about three months; deposit rates and older loans follow more slowly. Then: cheaper credit → more spending and investment → more demand → pressure on prices.

      ## Other tools
      - **CRR** (cash reserve ratio): share of deposits banks must keep with the RBI, cut to 3% in 2025.
      - **SLR**: share held in government securities.
      - Open market operations, forex swaps — used to add or drain liquidity.
    `,
    calc: {
      inputs: [
        input('P', 'Home loan outstanding', '₹', 5000000, 100000, 100000000, LOG),
        input('rate', 'Current loan rate', '% a year', 8.5, 5, 14),
        input('years', 'Years left', 'years', 20, 1, 30, INT),
        input('bp', 'Policy change passed through', 'basis points', -25, -200, 200),
      ],
      outputs: [
        out('EMI now', '₹', 'P*(rate/1200)*(1 + rate/1200)^(12*years)/((1 + rate/1200)^(12*years) - 1)', { key: 'E0' }),
        out('EMI after the change', '₹', 'P*((rate + bp/100)/1200)*(1 + (rate + bp/100)/1200)^(12*years)/((1 + (rate + bp/100)/1200)^(12*years) - 1)', { key: 'E1' }),
        out('Change per month', '₹', 'E1 - E0'),
        out('Change over the rest of the loan', '₹', '(E1 - E0)*12*years'),
      ],
      note: '100 basis points = 1 percentage point. Banks often keep the EMI and change the tenure instead.',
    },
  }),

  entry('inflation-targeting', 'concept', MACRO, 'curious', 'Inflation Targeting (4% ± 2%)', {
    summary: 'Since 2016 the RBI’s legal goal is CPI inflation of 4%, with a tolerance band of 2–6%. Why 4% and not 0%? Deflation is more dangerous than a little inflation.',
    aliases: ['inflation targeting', 'inflation target', 'flexible inflation targeting', 'tolerance band'],
    tags: ['policy', 'India'],
    year: 2016,
    body: md`
      ## The framework
      Agreed with the government in 2015 and written into the RBI Act in 2016: target **4% CPI inflation**, band **2–6%**, reviewed every five years (renewed in 2021). A **Monetary Policy Committee** of three RBI members and three external members votes on the repo rate. If inflation stays outside the band for three straight quarters, the RBI must write to the government explaining why — it did so for the first time in November 2022.

      ## Did it work?
      Before 2016 India's inflation averaged well above 6% and swung wildly. Since then it has mostly stayed within the band, apart from the pandemic and the 2022 commodity shock — and inflation *expectations* have settled, which is most of the battle.

      ## Why not 0%?
      - Measured inflation overstates true inflation slightly (quality improvements).
      - A little inflation lets real wages adjust without nominal pay cuts.
      - It keeps interest rates above zero, leaving room to cut in a slump.
      - **Deflation** is a trap: debts get heavier in real terms and people delay spending (Japan in the 1990s–2010s).
      Rich economies target 2%; India's 4% reflects a faster-growing economy with more food-price volatility.
    `,
  }),

  entry('money-creation', 'concept', MACRO, 'curious', 'How Banks Create Money', {
    summary: 'When a bank makes a loan, it creates a new deposit — new money — at a keystroke. Lending isn’t limited by deposits so much as by demand, capital rules and the price the RBI sets.',
    aliases: ['money creation', 'money multiplier', 'fractional reserve', 'fractional-reserve banking', 'broad money', 'money supply', 'M3'],
    tags: ['banking', 'macro'],
    body: md`
      ## The modern view
      The textbook story: you deposit ₹100, the bank keeps a fraction and lends the rest, which is deposited and lent again — a geometric series giving a **money multiplier** of $1/\text{reserve ratio}$.

      Central banks now describe it the other way round (Bank of England, 2014): **loans create deposits**. When a bank approves your ₹50 lakh home loan, it credits ₹50 lakh to the builder's account — money that didn't exist before. Repaying the loan destroys it again.

      ## What limits it
      - **Demand** for loans from creditworthy borrowers.
      - **Capital rules**: every loan needs equity capital behind it (Basel norms).
      - **Price**: banks need reserves to settle payments, which they can borrow from the RBI at the repo rate — so the RBI controls money growth mostly through the *price* of reserves, not the quantity.
      - CRR (3% in India) and SLR requirements.

      ## Why it matters
      Credit booms create money and push up asset prices; busts destroy it. The 2008 crisis and India's 2018 NBFC crunch were both stories of lending that had to shrink. Most money is private bank money, backed by public trust — the reason for deposit insurance and bank regulation.
    `,
    calc: {
      inputs: [input('rr', 'Reserve ratio', '%', 3, 0.5, 50, LOG)],
      outputs: [
        out('Textbook money multiplier', '×', '100/rr', { digits: 3 }),
        out('₹100 of reserves could back deposits of', '₹', '100*100/rr'),
      ],
      note: 'The textbook maximum. In practice capital rules and loan demand bind long before reserves do.',
    },
  }),

  entry('bank-runs', 'concept', MACRO, 'curious', 'Bank Runs and Deposit Insurance', {
    summary: 'Banks lend long and borrow short, so if every depositor wants cash at once, even a healthy bank fails. Deposit insurance (₹5 lakh per depositor per bank in India) exists to stop the stampede.',
    aliases: ['bank run', 'bank runs', 'deposit insurance', 'Diamond–Dybvig', 'maturity mismatch', 'lender of last resort'],
    tags: ['banking', 'crises'],
    year: 1983,
    body: md`
      ## The fragility
      A bank holds 20-year home loans funded by deposits you can withdraw today — **maturity transformation**, useful and inherently fragile. Diamond and Dybvig (1983) showed a run can be self-fulfilling: if you *think* others will withdraw, withdrawing first is rational, and the fear makes itself true. Diamond, Dybvig and Bernanke shared the 2022 Nobel.

      ## Defences
      - **Deposit insurance**: DICGC covers ₹5 lakh per depositor per bank (raised from ₹1 lakh in 2020 after PMC Bank).
      - **Lender of last resort**: the RBI lends to solvent banks against collateral in a panic.
      - **Regulation**: capital and liquidity rules; resolution schemes like the SBI-led Yes Bank rescue.

      ## Runs are faster now
      Northern Rock (2007) had queues outside branches; Silicon Valley Bank (2023) saw about **$42 billion** of withdrawal requests in a single day via phone apps, most of it above the insurance limit. Uninsured deposits run first.
    `,
  }),

  entry('gdp', 'concept', MACRO, 'curious', 'GDP', {
    summary: 'Gross Domestic Product: the value of all final goods and services produced in a year. The economy’s headline size and growth number — useful, and famously incomplete.',
    aliases: ['GDP', 'gross domestic product', 'real GDP', 'nominal GDP', 'GDP growth', 'GVA', 'per capita income'],
    tags: ['macro', 'measurement'],
    year: 1934,
    latex: md`\text{GDP} = C + I + G + (X - M)`,
    variables: [
      ['C', 'Household consumption — about 55–60% of India’s GDP'],
      ['I', 'Investment: factories, housing, infrastructure'],
      ['G', 'Government spending'],
      ['X − M', 'Exports minus imports'],
    ],
    body: md`
      ## Nominal and real
      **Nominal** GDP is measured in today's prices; **real** GDP removes inflation. Headline "growth" is real growth. India's nominal growth of ~10–11% a year is roughly 6–7% real growth plus 4% inflation — and it's nominal growth that matters for tax revenue, debt ratios and company sales.

      ## India's size
      Around $4 trillion in 2025, among the five largest economies — but per person roughly one-thirtieth of the US level at market exchange rates, or about one-eighth using purchasing power parity.

      ## What it misses
      Unpaid work at home, the informal sector (hard to measure, large in India), inequality, pollution and depletion. Simon Kuznets, who built the first US national accounts in 1934, warned that "the welfare of a nation can scarcely be inferred" from them.

      ## Markets and GDP
      Fast GDP growth doesn't guarantee good stock returns — what matters is how profits grow relative to what's already priced in. China grew fastest for decades with mediocre equity returns.
    `,
  }),

  entry('fiscal-deficit', 'concept', MACRO, 'curious', 'Union Budget and the Fiscal Deficit', {
    summary: 'When the government spends more than it collects, it borrows the gap: the fiscal deficit. Whether debt is sustainable depends on interest rates versus growth (r − g).',
    aliases: ['Union Budget', 'fiscal deficit', 'government borrowing', 'public debt', 'debt-to-GDP', 'primary deficit', 'fiscal policy', 'r − g'],
    tags: ['macro', 'government', 'India'],
    latex: md`d_{t+1} = d_t\,\frac{1 + r}{1 + g} + p_t`,
    variables: [
      [md`d_t`, 'Government debt as a share of GDP'],
      ['r', 'Average nominal interest rate on the debt'],
      ['g', 'Nominal GDP growth'],
      [md`p_t`, 'Primary deficit (deficit excluding interest) as a share of GDP'],
    ],
    body: md`
      ## India's numbers
      The Union Budget is presented each February. The central government's fiscal deficit was targeted at about **4.4% of GDP** for 2025-26, down from over 9% in the pandemic year; the anchor is now to bring central government debt toward about 50% of GDP by 2031. Adding the states, general government debt is around 80% of GDP. Interest payments take roughly a quarter of the Centre's spending.

      ## The r − g arithmetic
      If nominal growth $g$ exceeds the interest rate $r$, debt ratios fall on their own even with a small primary deficit — India's situation for most years. If $r > g$ (as in many crises), debt snowballs unless the government runs primary surpluses. The calculator iterates the formula.

      ## Why investors care
      Heavy government borrowing competes with private borrowing for savings, pushing up G-sec yields ("crowding out") and every rate priced off them. Budget day also changes your taxes: slabs, capital-gains rates, STT.
    `,
    calc: {
      inputs: [
        input('d0', 'Debt today', '% of GDP', 80, 0, 250),
        input('r', 'Interest rate on the debt', '% a year', 7.5, 0, 20),
        input('g', 'Nominal GDP growth', '% a year', 10.5, -5, 25),
        input('pd', 'Primary deficit', '% of GDP', 2, -5, 10),
        input('years', 'Years ahead', 'years', 10, 1, 50, INT),
      ],
      outputs: [
        out('Growth-adjusted interest factor', '', '(1 + r/100)/(1 + g/100)', { key: 'x', digits: 5 }),
        out('Debt after those years', '% of GDP', 'd0*x^years + pd*if(abs(x - 1) - 0.000001, (x^years - 1)/(x - 1), years)', { digits: 4 }),
        out('Where it settles in the long run', '% of GDP', 'if(1 - x, pd/(1 - x), 1/0)', { digits: 4 }),
      ],
      note: 'When the interest rate beats growth, the long-run level is infinite unless the primary balance turns to surplus (negative deficit).',
    },
  }),

  entry('exchange-rates', 'concept', MACRO, 'curious', 'Exchange Rates: the Rupee', {
    summary: 'The price of the rupee in other currencies. It floats, with the RBI smoothing big swings from its forex reserves; over decades it has weakened against the dollar roughly in line with higher Indian inflation.',
    aliases: ['exchange rate', 'exchange rates', 'rupee depreciation', 'currency depreciation', 'forex reserves', 'foreign exchange reserves', 'foreign exchange', 'USD/INR', 'managed float'],
    tags: ['macro', 'currency', 'India'],
    body: md`
      ## What moves the rupee
      - **Inflation gap**: higher Indian inflation than US inflation erodes the rupee over time — purchasing power parity.
      - **Capital flows**: foreign investors (FPIs) buying Indian stocks and bonds bring dollars in; when they sell, the rupee weakens. US interest rates matter a lot.
      - **Trade**: oil imports are India's biggest dollar need; the current account deficit.
      - **RBI**: buys dollars when inflows are strong (building reserves) and sells when the rupee is under pressure. It manages volatility, not a level.

      ## A long slide
      Roughly ₹45 per dollar in 2000 and near ₹88 in 2025 — about 2.5–3% a year, close to the inflation gap. Sudden falls come in stress: 1991 (devaluation), 2013 (the taper tantrum, ~20% in months), 2022.

      ## What it means for you
      A weaker rupee raises the cost of imports (fuel, electronics, foreign education) and raises the rupee value of foreign assets — the case for some international investing.
    `,
  }),

  entry('ppp', 'equation', MACRO, 'curious', 'Purchasing Power Parity', {
    summary: 'Over the long run, exchange rates drift so that the same basket costs the same everywhere. Higher inflation at home means a steadily weaker currency.',
    aliases: ['purchasing power parity', 'PPP', 'Big Mac index', 'relative PPP'],
    tags: ['macro', 'currency'],
    year: 1986,
    latex: md`\frac{E_{t+1}}{E_t} \approx \frac{1 + \pi_{\text{India}}}{1 + \pi_{\text{US}}}`,
    variables: [
      [md`E_t`, 'Rupees per dollar'],
      [md`\pi`, 'Inflation in each country'],
    ],
    body: md`
      ## The idea
      If a phone costs $500 in the US and ₹44,000 in India, the "right" exchange rate is ₹88. If Indian prices rise 5% a year and US prices 2.5%, the rupee should weaken about 2.4% a year to keep the phone equally priced — **relative PPP**.

      ## The Big Mac index
      *The Economist* has compared burger prices since 1986 as a light-hearted PPP test. The rupee usually looks "undervalued" — as do most poorer countries' currencies, because local services (the labour in the burger) are cheap. That's the Balassa–Samuelson effect, and why GDP comparisons often use PPP rates.

      ## How well it works
      Poorly over months (capital flows dominate), reasonably over decades. The rupee's long-run slide against the dollar is close to what inflation differentials predict.
    `,
    calc: {
      inputs: [
        input('E0', 'Rupees per dollar today', '₹', 88, 10, 300),
        input('pin', 'Indian inflation', '% a year', 4.5, 0, 15),
        input('pus', 'US inflation', '% a year', 2.5, -1, 10),
        input('years', 'Years ahead', 'years', 10, 1, 40, INT),
      ],
      outputs: [
        out('Expected rupee depreciation', '% a year', '((1 + pin/100)/(1 + pus/100) - 1)*100', { digits: 3 }),
        out('Rupees per dollar then (PPP)', '₹', 'E0*((1 + pin/100)/(1 + pus/100))^years'),
      ],
      note: 'A long-run tendency, not a forecast: capital flows can push the rupee far from this path for years.',
    },
  }),

  entry('current-account', 'concept', MACRO, 'curious', 'Current Account and the Balance of Payments', {
    summary: 'A country’s transactions with the world. India usually imports more goods than it exports (mostly oil and gold), offset partly by software exports and remittances; the gap must be financed by foreign capital.',
    aliases: ['current account', 'current account deficit', 'balance of payments', 'trade deficit', 'remittances', 'FDI', 'FPI', 'FII', 'capital flows', 'foreign portfolio investors'],
    tags: ['macro', 'India', 'currency'],
    body: md`
      ## India's pattern
      - **Goods trade**: a big deficit — crude oil, gold, electronics.
      - **Services**: a big surplus — IT and business services.
      - **Remittances**: the world's largest, over $100 billion a year from Indians abroad.
      - Net result: a **current account deficit** usually around 1–2% of GDP.

      ## Paying for it
      The deficit is financed by capital coming in: **FDI** (long-term, building businesses) and **FPI** (portfolio money in stocks and bonds — fast to arrive, fast to leave). If the money stops coming, the rupee falls or reserves are drawn down.

      ## When it goes wrong
      - **1991**: reserves fell to about three weeks of imports; India pledged gold and liberalised.
      - **2013**: a CAD near 5% of GDP met the US "taper tantrum"; the rupee fell ~20% in months and India was branded one of the "Fragile Five". Gold import curbs and new foreign-currency deposits stemmed it.

      ## Balance of payments
      Current account + capital account + change in reserves = 0. Every rupee of deficit has to be matched by borrowing, investment from abroad, or reserves.
    `,
  }),

  entry('business-cycle', 'concept', MACRO, 'curious', 'Recessions and the Business Cycle', {
    summary: 'Economies grow in uneven waves of expansion and contraction. India has had few outright recessions — 1979-80 and the pandemic year 2020-21 — but plenty of slowdowns.',
    aliases: ['recession', 'recessions', 'business cycle', 'economic slowdown', 'stagflation', 'soft landing'],
    tags: ['macro'],
    body: md`
      ## The cycle
      Expansion → overheating (inflation, rising rates) → slowdown or recession → recovery. Credit usually amplifies both directions: easy lending fuels the boom, and forced deleveraging deepens the bust.

      ## India's experience
      Full-year GDP contractions are rare: 1979-80 (drought and the oil shock) and 2020-21 (COVID, about −6%). More common are slowdowns — 2011–13 (policy paralysis, inflation), 2018–19 (the NBFC crunch after IL&FS).

      ## Markets and cycles
      Stock markets usually fall *before* recessions and bottom *before* the economy does — they price expected profits. The Sensex hit its 2020 low in late March, months before GDP data showed the worst quarter.

      ## Stagflation
      High inflation with weak growth (1970s oil shocks) is the policymaker's nightmare: fighting inflation deepens the slump. It broke the simple Phillips curve.
    `,
  }),

  entry('phillips-curve', 'theory', MACRO, 'curious', 'Phillips Curve', {
    summary: 'The observed trade-off between unemployment and inflation: hot economies see prices rise. It works only while inflation expectations stay anchored.',
    aliases: ['Phillips curve', 'NAIRU', 'expectations-augmented Phillips curve'],
    tags: ['macro', 'theory'],
    year: 1958,
    body: md`
      ## Phillips (1958)
      A.W. Phillips found that, in Britain over a century, wage inflation was high when unemployment was low. Policymakers read it as a menu: accept a bit more inflation for less unemployment.

      ## The critique
      Milton Friedman and Edmund Phelps (1967–68) argued that once people *expect* inflation, they build it into wages and prices; the trade-off disappears and you get inflation with no fall in unemployment. The 1970s proved them right — stagflation.

      ## Today
      The modern version adds expectations: inflation depends on expected inflation plus the "slack" in the economy. That's why central banks care so much about anchoring expectations — the whole logic of inflation targeting. In India, food supply shocks often matter more than labour-market slack.
    `,
  }),

  entry('quantitative-easing', 'concept', MACRO, 'curious', 'Quantitative Easing', {
    summary: 'When rates are already near zero, central banks create money to buy bonds, pushing long-term rates down. Used heavily after 2008 and in 2020 — and blamed for inflating asset prices.',
    aliases: ['quantitative easing', 'money printing', 'quantitative tightening', 'balance-sheet expansion', 'G-SAP'],
    tags: ['policy', 'macro'],
    year: 2001,
    body: md`
      ## How it works
      The central bank buys government bonds (and sometimes other assets) from banks and investors, paying with newly created reserves. That lifts bond prices, lowers long-term yields, and pushes investors toward riskier assets.

      ## History
      Japan first (2001); the US Federal Reserve, Bank of England and ECB after 2008; everyone in 2020. The Fed's balance sheet grew from under $1 trillion in 2008 to about $9 trillion by 2022. The RBI ran a smaller version in 2021 — the G-sec Acquisition Programme (G-SAP).

      ## Effects and debates
      - It helped prevent deflationary collapses in 2009 and 2020.
      - It raised asset prices, benefiting those who already owned assets — a distributional cost.
      - It didn't cause high consumer inflation for a decade — until 2021–22, when it coincided with supply shocks and huge fiscal transfers.
      **Quantitative tightening** runs it in reverse, letting bonds mature without replacement.
    `,
  }),

  entry('gold-standard', 'concept', MACRO, 'curious', 'Gold Standard and Fiat Money', {
    summary: 'Currencies were once convertible into gold at a fixed rate; since 1971 they are "fiat" — valuable because governments and central banks say so, and people trust them.',
    aliases: ['gold standard', 'fiat money', 'fiat currency', 'Bretton Woods', 'Nixon shock'],
    tags: ['history', 'money'],
    year: 1971,
    body: md`
      ## Under gold
      A currency was a claim on a fixed weight of gold, which limited how much money governments could create. Stable prices over the long run, but rigid: in the Great Depression, countries that left gold earliest recovered fastest.

      ## Bretton Woods (1944–1971)
      Currencies were pegged to the dollar, and the dollar to gold at $35 an ounce. On 15 August 1971 Nixon ended dollar–gold convertibility (the "Nixon shock"); by 1973 major currencies floated.

      ## Fiat money
      Today's rupee is backed by no commodity. Its value rests on the RBI's credibility, the government's ability to tax, and legal-tender laws. The upside: central banks can respond to crises. The downside: nothing but institutions stops over-issuance — see hyperinflation.

      Gold's continuing appeal in India and Bitcoin's design (a fixed supply of 21 million) are both, in part, votes of no confidence in fiat discipline.
    `,
  }),

  entry('upi', 'concept', MACRO, 'curious', 'UPI and India’s Payment Rails', {
    summary: 'The Unified Payments Interface lets any bank account pay any other instantly, free, from a phone. Launched in 2016, it now handles around 20 billion transactions a month.',
    aliases: ['UPI', 'Unified Payments Interface', 'NPCI', 'digital payments', 'e-rupee', 'digital rupee', 'India Stack'],
    tags: ['payments', 'India', 'technology'],
    year: 2016,
    body: md`
      ## What it is
      A shared protocol run by **NPCI** (a not-for-profit owned by banks) that lets any app — PhonePe, Google Pay, Paytm, bank apps — move money between any two bank accounts in seconds, 24×7, with a simple address or QR code. Person-to-person and small merchant payments carry **no fee** (zero MDR).

      ## Growth
      Launched in April 2016, it took off after demonetisation (November 2016) and COVID. By 2025 it handled around 20 billion transactions a month — the majority of India's digital payments by volume, and more real-time payments than any other country.

      ## Why it matters for money
      UPI doesn't create new money — it moves bank deposits. But it changed who holds cash, gave small merchants a transaction history (useful for credit), and is part of the "India Stack" with Aadhaar and account aggregators. The RBI's **e-rupee** (central bank digital currency) is a separate experiment: a digital note issued by the RBI itself.

      ## Open question
      Who pays for the rails if merchant payments stay free? That tension shapes every debate about UPI's future.
    `,
  }),
];
