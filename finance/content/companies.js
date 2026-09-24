// Businesses & Accounts: reading a company from its statements.

import { AREA, entry, input, LOG, md, out } from './helpers.js';

const { COMPANIES } = AREA;

export const COMPANIES_ENTRIES = [
  entry('double-entry', 'concept', COMPANIES, 'curious', 'Double-entry Bookkeeping', {
    summary: 'Every transaction is recorded twice — where money came from and where it went — so the books always balance. A 500-year-old error check that underlies all accounting.',
    aliases: ['double-entry', 'double-entry bookkeeping', 'bookkeeping', 'debits and credits', 'bahi-khata', 'Pacioli'],
    tags: ['accounting', 'history'],
    year: 1494,
    body: md`
      ## The rule
      Every transaction touches at least two accounts with equal and opposite entries. Borrow ₹10 lakh: cash goes up ₹10 lakh (an asset) *and* a loan of ₹10 lakh appears (a liability). Buy a machine with that cash: cash down, machinery up. The totals always match, which is why
      $$\text{Assets} = \text{Liabilities} + \text{Equity}$$
      holds after every single entry.

      ## History
      Merchants in Italian city-states used it by the 1300s; Luca Pacioli wrote it up in 1494, alongside mathematics. Indian traders kept their own double-sided **bahi-khata** ledgers for centuries — the red cloth-bound books still ceremonially opened at Diwali.

      ## Why it matters
      The balance is a built-in error detector, like a checksum. It's also a conservation law: value can't appear from nowhere in the books — it has to be matched by a source. Frauds like Satyam's invented *both* sides (fake cash matched by fake revenue), which is why audits must check the entries against the outside world, not just against each other.
    `,
  }),

  entry('balance-sheet', 'concept', COMPANIES, 'curious', 'Balance Sheet', {
    summary: 'A snapshot of what a company owns and owes on one date. What’s left for shareholders — assets minus liabilities — is its book value, or net worth.',
    aliases: ['balance sheet', 'balance sheets', 'book value', 'net worth', "shareholders' equity", 'shareholders’ equity', 'current assets', 'current liabilities'],
    tags: ['accounting', 'statements'],
    latex: md`\text{Assets} = \text{Liabilities} + \text{Shareholders' equity}`,
    variables: [
      [md`\text{Assets}`, 'What the company controls: cash, receivables, inventory, plant, investments'],
      [md`\text{Liabilities}`, 'What it owes: loans, bonds, bills to suppliers'],
      [md`\text{Shareholders' equity}`, 'The residue: capital put in plus profits kept over the years'],
    ],
    body: md`
      ## Reading one
      - **Left side** (assets): how the money has been used.
      - **Right side** (liabilities + equity): where the money came from.
      - Current items turn over within a year (cash, inventory, bills payable); non-current ones last longer (factories, long-term loans).

      ## What to look for
      - **Debt vs equity**: how much is borrowed (leverage).
      - **Cash vs debt**: net cash companies can survive downturns.
      - **Receivables and inventory growing faster than sales**: customers not paying, or stock piling up — early warning signs.
      - **Goodwill** from acquisitions: an accounting entry, not cash; can be written off suddenly.

      ## Your own balance sheet
      Everything you own (flat, funds, EPF, gold) minus everything you owe (home loan, card balance) is your **net worth** — the one number that tracks progress better than salary.
    `,
  }),

  entry('income-statement', 'concept', COMPANIES, 'curious', 'Income Statement (Profit and Loss)', {
    summary: 'Revenue minus costs over a period, layer by layer, down to net profit. It shows how the business earns — but profit is an opinion; cash is a fact.',
    aliases: ['income statement', 'profit and loss', 'P&L', 'EBITDA', 'net profit', 'operating profit', 'operating margin', 'profit margin'],
    tags: ['accounting', 'statements'],
    body: md`
      ## The layers
      | Line | Meaning |
      |---|---|
      | Revenue (sales) | what customers paid for |
      | − cost of goods, staff, other expenses | running the business |
      | **= EBITDA** | profit before interest, tax, depreciation, amortisation |
      | − depreciation | spreading the cost of machines over their life |
      | **= EBIT / operating profit** | what the business itself earns |
      | − interest | cost of debt |
      | − tax | |
      | **= Net profit (PAT)** | belongs to shareholders; ÷ shares = EPS |

      ## Margins
      Each profit line divided by revenue: gross, operating, net margin. High, stable margins suggest pricing power — a moat. A software firm might keep 20–25% as operating margin; a supermarket 5%.

      ## Why profit isn't cash
      Revenue is booked when earned, not when paid; depreciation is a non-cash charge; some items are estimates. A company can report rising profits while running out of cash — which is why the cash flow statement exists.
    `,
  }),

  entry('cash-flow-statement', 'concept', COMPANIES, 'curious', 'Cash Flow Statement', {
    summary: 'Where the cash actually came from and went: operations, investments, financing. Free cash flow — cash from operations minus capex — is what a business can hand back to owners.',
    aliases: ['cash flow statement', 'operating cash flow', 'free cash flow', 'FCF', 'capex', 'capital expenditure', 'cash from operations'],
    tags: ['accounting', 'statements', 'valuation'],
    latex: md`\text{FCF} = \text{Cash from operations} - \text{Capital expenditure}`,
    variables: [
      ['FCF', 'Free cash flow: cash left over after keeping the business running and growing'],
    ],
    body: md`
      ## Three sections
      - **Operating**: cash from selling things, after paying suppliers, staff and tax.
      - **Investing**: buying factories and equipment (**capex**), acquisitions, selling assets.
      - **Financing**: borrowing, repaying, issuing shares, paying dividends and buybacks.

      ## The quality test
      Over several years, cash from operations should roughly track net profit. Profits that never turn into cash are a red flag — receivables piling up, or aggressive accounting. Satyam reported fat profits and a mountain of cash that turned out not to exist.

      ## Why valuation uses it
      A DCF values **free cash flow**, not profit, because only cash can be paid out, reinvested or used to repay debt. Businesses that need little capex to grow (software, brands) turn most profit into free cash; capital-hungry ones (telecom, steel, airlines) may show profits for years and little free cash.
    `,
  }),

  entry('roe-dupont', 'equation', COMPANIES, 'curious', 'Return on Equity and DuPont', {
    summary: 'Profit per rupee of shareholders’ money. DuPont splits it into margin × asset turnover × leverage, showing whether a high ROE comes from a great business or a lot of debt.',
    aliases: ['ROE', 'return on equity', 'DuPont', 'DuPont analysis', 'ROCE', 'return on capital', 'return on capital employed', 'ROA', 'asset turnover'],
    tags: ['ratios', 'quality'],
    year: 1914,
    latex: md`\text{ROE} = \frac{\text{Net profit}}{\text{Equity}} = \underbrace{\frac{\text{Profit}}{\text{Sales}}}_{\text{margin}} \times \underbrace{\frac{\text{Sales}}{\text{Assets}}}_{\text{turnover}} \times \underbrace{\frac{\text{Assets}}{\text{Equity}}}_{\text{leverage}}`,
    variables: [
      [md`\text{margin}`, 'How much of each rupee of sales is kept as profit'],
      [md`\text{turnover}`, 'How many rupees of sales each rupee of assets generates'],
      [md`\text{leverage}`, 'Assets per rupee of equity — the equity multiplier'],
    ],
    body: md`
      ## Three roads to 20%
      - **Brand company**: 20% margin × 0.8 turnover × 1.25 leverage = 20%. Pricing power.
      - **Supermarket**: 4% margin × 3.3 turnover × 1.5 leverage = 20%. Speed.
      - **Bank**: 1.5% return on assets × 1 × leverage of ~12 = 18%. Borrowed money.

      The same ROE; wildly different risks. DuPont's finance team (the chemicals company, in the 1910s) split it this way to see which lever was doing the work.

      ## ROCE
      Return on capital employed uses operating profit over *all* capital (debt + equity), so it's harder to flatter with borrowing. A business that earns ROCE well above its cost of capital, for years, is creating value — the hallmark of a moat.

      ## Growth needs ROE
      A company that retains a fraction $b$ of profits and earns ROE on them can grow at about $g = b \times \text{ROE}$ without new capital — the link between ROE, dividends and the Gordon growth model.
    `,
    calc: {
      inputs: [
        input('margin', 'Net margin', '%', 10, -10, 40),
        input('turn', 'Asset turnover', '×', 1.2, 0.05, 5, LOG),
        input('lev', 'Assets ÷ equity', '×', 1.8, 1, 20, LOG),
        input('b', 'Share of profit retained', '%', 60, 0, 100),
      ],
      outputs: [
        out('Return on assets', '%', 'margin*turn', { digits: 3 }),
        out('Return on equity', '%', 'margin*turn*lev', { key: 'roe', digits: 3 }),
        out('Growth it can fund itself', '% a year', 'b/100*roe', { digits: 3 }),
      ],
    },
  }),

  entry('leverage', 'concept', COMPANIES, 'curious', 'Leverage', {
    summary: 'Using borrowed money to own more than your own capital. It multiplies returns when things go well and losses when they don’t — and it’s the common thread in almost every financial crisis.',
    aliases: ['leverage', 'leveraged', 'debt-to-equity', 'gearing', 'margin trading', 'margin call', 'deleveraging'],
    tags: ['risk', 'debt'],
    latex: md`\text{ROE} = r_A + \frac{D}{E}\,\big(r_A - r_D\big)`,
    variables: [
      [md`r_A`, 'Return on the assets'],
      [md`r_D`, 'Interest rate on the debt'],
      [md`D/E`, 'Debt-to-equity ratio'],
    ],
    body: md`
      ## The amplifier
      If assets earn 10% and you borrow at 8%, each borrowed rupee adds 2% profit. With debt-to-equity of 3, return on equity is $10 + 3 \times 2 = 16\%$. But if assets earn 4%, ROE is $4 + 3 \times (-4) = -8\%$. Leverage doesn't change the business; it changes who bears the swings.

      ## The margin call
      With 10× leverage, a 10% fall in the asset wipes out the equity. Lenders demand more collateral (a **margin call**) *as prices fall*, forcing sales into a falling market — a feedback loop.

      ## Where it shows up
      - A home loan is leverage on a house.
      - Banks run 10–12× leverage by design, which is why they're regulated.
      - F&O positions are leveraged bets with small upfront margins.
      - **LTCM** (25×+), **2008** (banks at 30× and more on mortgages), **Harshad Mehta** (bank funds in the market) — the same story in different clothes.
    `,
    calc: {
      inputs: [
        input('ra', 'Return on assets', '% a year', 10, -30, 30),
        input('rd', 'Borrowing rate', '% a year', 8, 0, 20),
        input('de', 'Debt ÷ equity', '×', 3, 0, 30),
      ],
      outputs: [
        out('Return on equity', '% a year', 'ra + de*(ra - rd)', { digits: 3 }),
        out('Asset fall that wipes out equity', '%', '100/(1 + de)', { digits: 3 }),
      ],
      note: 'Set return on assets below the borrowing rate and watch leverage turn against you.',
    },
  }),

  entry('wacc', 'equation', COMPANIES, 'curious', 'Cost of Capital (WACC)', {
    summary: 'The blended return a company must earn to satisfy both its lenders and its shareholders. Projects earning less than this destroy value, even if they show a profit.',
    aliases: ['WACC', 'weighted average cost of capital', 'cost of capital', 'hurdle rate'],
    tags: ['valuation', 'corporate finance'],
    latex: md`\text{WACC} = \frac{E}{D+E}\,r_E + \frac{D}{D+E}\,r_D\,(1 - t)`,
    variables: [
      ['E, D', 'Market values of equity and debt'],
      [md`r_E`, 'Cost of equity (often from CAPM)'],
      [md`r_D`, 'Interest rate on debt'],
      ['t', 'Tax rate — interest is tax-deductible, which makes debt cheaper'],
    ],
    body: md`
      ## Why equity is expensive
      Shareholders are paid last and bear the most risk, so they expect more than lenders — perhaps 13% vs 8.5% for an Indian company. Interest is tax-deductible (at 25% corporate tax, 8.5% debt costs 6.4% after tax).

      ## Why not borrow everything?
      More debt looks cheaper, but it makes the equity riskier (raising $r_E$) and brings bankruptcy risk. Modigliani and Miller showed that without taxes and bankruptcy costs, the mix wouldn't matter at all; in reality, moderate debt helps and heavy debt hurts.

      ## Where it's used
      - The discount rate in a DCF.
      - The bar for new projects: return on capital (ROCE) above WACC creates value; below it, growth *destroys* value.
    `,
    calc: {
      inputs: [
        input('E', 'Equity (market value)', '₹', 7000000000, 10000000, 1000000000000, LOG),
        input('D', 'Debt', '₹', 3000000000, 0, 1000000000000),
        input('rE', 'Cost of equity', '% a year', 13, 5, 25),
        input('rD', 'Interest on debt', '% a year', 8.5, 3, 18),
        input('t', 'Tax rate', '%', 25.17, 0, 40),
      ],
      outputs: [out('WACC', '% a year', 'E/(D + E)*rE + D/(D + E)*rD*(1 - t/100)', { digits: 3 })],
    },
  }),

  entry('economic-moats', 'concept', COMPANIES, 'curious', 'Economic Moats', {
    summary: 'Durable advantages that stop competitors from eroding a company’s profits: brands, network effects, switching costs, scale, licences.',
    aliases: ['economic moat', 'moat', 'moats', 'competitive advantage', 'network effect', 'network effects', 'switching costs', 'pricing power'],
    tags: ['quality', 'strategy'],
    body: md`
      ## Why it matters
      High profits attract competitors, who push returns down toward the cost of capital. A company that keeps earning high returns on capital for decades must have something that stops that — Buffett's **moat**.

      ## Kinds of moat, with Indian examples
      - **Brand / pricing power**: consumer staples that can raise prices every year.
      - **Network effects**: the more users, the more valuable — exchanges, payment networks, marketplaces.
      - **Switching costs**: core banking software, a bank's salary accounts, enterprise IT services.
      - **Scale / low cost**: the cheapest producer in cement, steel or retail.
      - **Regulation / licences**: exchanges, rating agencies, depositories.

      ## Moats and valuation
      A moat lets high ROCE persist, which justifies a higher P/E — but paying too much for a great business can still give poor returns. Moats also erode: technology can drain a moat quickly (think of what UPI did to some payment businesses).
    `,
  }),

  entry('corporate-governance', 'concept', COMPANIES, 'curious', 'Corporate Governance and Red Flags', {
    summary: 'Whether the people running a company treat minority shareholders fairly. In India, where many firms have controlling promoters, it often matters more than the numbers.',
    aliases: ['corporate governance', 'promoter', 'promoters', 'promoter pledging', 'related-party transactions', 'auditor resignation', 'independent directors', 'minority shareholders'],
    tags: ['quality', 'risk', 'India'],
    body: md`
      ## Why India is special
      Most listed Indian companies have a **promoter** family or group owning a controlling stake. That aligns incentives when promoters behave well — and lets them extract value from minority shareholders when they don't.

      ## Red flags
      - **Promoter pledging** shares as collateral for loans: a price fall can trigger forced selling.
      - **Related-party transactions**: big payments to promoter-owned firms.
      - **Auditor resignations**, frequent auditor changes, or qualified audit opinions.
      - **Profits without cash**: net profit growing while operating cash flow doesn't.
      - Complex group structures, frequent equity dilution, aggressive guidance.

      ## Lessons
      Satyam (2009) had respected auditors and independent directors — the fraud ran for years anyway. IL&FS (2018) had an AAA rating. Governance failures are rarely visible in one year's numbers, which is one more argument for diversification.
    `,
  }),
];
