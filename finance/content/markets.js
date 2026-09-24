// Markets & Investing: what you can own, how it's priced, and how people get it wrong.

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { MARKETS } = AREA;

export const MARKETS_ENTRIES = [
  entry('stocks', 'concept', MARKETS, 'curious', 'Stocks (Equity Shares)', {
    summary: 'A share is a small slice of a company: a claim on its future profits, with a vote. Its price is the market’s current guess at what those profits are worth today.',
    aliases: ['stocks', 'equity shares', 'equities', 'shareholder', 'shareholders', 'listed company'],
    tags: ['equity', 'basics'],
    body: md`
      ## What you actually own
      Buy one share of a company with 100 crore shares and you own one hundred-croreth of it: that fraction of every future profit (paid as dividends or reinvested for growth), a vote at meetings, and a claim on what's left if it's wound up — after every lender has been paid.

      ## Why prices move
      A share's value is the present value of all its future cash flows. Prices move when **expectations** about those cash flows change, or when the **discount rate** changes (interest rates, the market's appetite for risk). News that's already expected moves nothing; surprises move everything.

      ## Why own them
      Over long periods equities have beaten bonds, FDs and gold, because owners bear the most risk and so demand the highest expected return — the equity risk premium. Indian stocks: roughly 11–12% a year in price over three decades for the Nifty, with falls of 30–60% along the way.

      ## One stock vs many
      A single company can go to zero (Satyam, Kingfisher, Jet Airways). An index can't in practice, which is why diversification and index funds matter.
    `,
  }),

  entry('stock-exchanges', 'concept', MARKETS, 'curious', 'Stock Exchanges: NSE, BSE and Trading', {
    summary: 'Where buyers and sellers meet. In India that’s mostly the NSE, all electronic, with trades settled the next working day (T+1) into your demat account.',
    aliases: ['stock exchange', 'stock exchanges', 'NSE', 'National Stock Exchange', 'BSE', 'Bombay Stock Exchange', 'demat', 'demat account', 'T+1', 'order book', 'stockbroker', 'circuit breaker'],
    tags: ['markets', 'India', 'plumbing'],
    year: 1994,
    body: md`
      ## A short history
      The **BSE** began under a banyan tree on Dalal Street in 1875 and was a shouting floor for over a century. The **NSE** started equity trading in **1994**, fully on screens, after the Harshad Mehta scam exposed how opaque the old system was. Paper share certificates gave way to electronic **demat** holdings (NSDL, 1996).

      ## How a trade works
      - Buy and sell orders sit in an **order book**, sorted by price. A trade happens when a buy price meets a sell price.
      - Your **broker** routes the order; the exchange matches it; a **clearing corporation** guarantees both sides.
      - Settlement is **T+1**: shares reach your demat account the next working day. India finished moving to T+1 in January 2023, ahead of the US.

      ## Guard rails
      - **Circuit breakers**: market-wide trading halts if the index falls 10%, 15% or 20% in a day (it happened in March 2020); individual stocks have price bands.
      - Upfront margins and SEBI surveillance for unusual trading.
    `,
  }),

  entry('stock-indices', 'concept', MARKETS, 'curious', 'Stock Indices: Nifty 50 and Sensex', {
    summary: 'A weighted basket that stands for "the market". The Sensex (30 stocks, base 100 in 1978-79) and Nifty 50 (base 1,000 in 1995) are India’s scoreboards.',
    aliases: ['stock index', 'stock market index', 'Nifty', 'Nifty 50', 'Sensex', 'free-float', 'index constituents'],
    tags: ['markets', 'India', 'measurement'],
    year: 1986,
    body: md`
      ## The two big ones
      - **Sensex**: 30 large BSE-listed companies; base value **100** for 1978-79; launched in 1986. It crossed 80,000 in July 2024 — an 800-fold rise in 45 years, about 16% a year in price.
      - **Nifty 50**: 50 large NSE-listed companies; base **1,000** on 3 November 1995. It peaked near 26,000 in September 2024 — about 12% a year.

      ## How they're weighted
      By **free-float market cap**: a company's weight is its share price × shares actually available to trade (excluding promoter holdings). Bigger companies move the index more — a few banks and IT firms carry a large share of the Nifty.

      ## What they hide
      - Price indices ignore **dividends**; the *Total Return Index* (TRI) adds them back and is the fair benchmark for funds.
      - Indices **replace losers** with winners over time — a quiet source of survivorship bias when people say "the market always recovers".
    `,
  }),

  entry('market-cap', 'concept', MARKETS, 'curious', 'Market Capitalisation', {
    summary: 'Share price × number of shares: what the market says the whole company is worth. SEBI sorts listed companies into large-, mid- and small-caps by it.',
    aliases: ['market cap', 'market capitalisation', 'market capitalization', 'large-cap', 'mid-cap', 'small-cap', 'large cap', 'mid cap', 'small cap'],
    tags: ['markets', 'measurement'],
    body: md`
      ## Calculation
      ₹1,500 a share × 100 crore shares = ₹1.5 lakh crore market cap.

      A high share *price* says nothing about a company's size — it depends on how many shares exist. MRF at over ₹1 lakh a share isn't "bigger" than a ₹1,500 bank with vastly more shares.

      ## SEBI's buckets (for mutual funds)
      - **Large-cap**: the top 100 listed companies by market cap.
      - **Mid-cap**: numbers 101–250.
      - **Small-cap**: 251 onwards.
      AMFI updates the list twice a year.

      Small-caps have historically offered higher returns *and* much deeper crashes — falls of 60–70% in 2008 and 2018–20.

      ## Market cap vs value
      Market cap is the value of the equity. Add debt and subtract cash to get **enterprise value** — what you'd pay to buy the whole business, which is what a DCF estimates.
    `,
  }),

  entry('mutual-funds', 'concept', MARKETS, 'curious', 'Mutual Funds and NAV', {
    summary: 'A pool of many investors’ money run by a professional manager. You own units; the NAV is the value of one unit, worked out every evening.',
    aliases: ['mutual fund', 'mutual funds', 'NAV', 'net asset value', 'AMC', 'AMFI', 'fund house', 'mutual fund units'],
    tags: ['funds', 'investing'],
    year: 1963,
    body: md`
      ## How it works
      A fund collects money, buys stocks or bonds according to its stated category, and issues **units**. At the end of each day:
      $$\text{NAV} = \frac{\text{value of holdings} + \text{cash} - \text{expenses owed}}{\text{units outstanding}}$$
      Buy before the cut-off and you get that day's NAV. A "cheap" NAV of ₹10 isn't better than ₹500; only the percentage change matters.

      ## In India
      UTI's Unit Scheme 64 (1964) was the first; private fund houses (AMCs) arrived in 1993. SEBI's 2017 rules set clear categories (large-cap, flexi-cap, liquid, gilt…) so funds can't drift. Industry assets passed ₹70 lakh crore in 2025, much of it arriving through SIPs.

      ## What you pay
      The **expense ratio**, taken daily from the NAV. **Direct** plans (bought from the AMC or a direct platform) are cheaper than **regular** plans (which pay a distributor commission) — the same portfolio, a different price.

      ## Protection
      The fund's assets are held by a custodian in trust for unitholders, separately from the AMC — if the AMC fails, your holdings don't vanish. Market losses, of course, are yours.
    `,
  }),

  entry('index-funds', 'concept', MARKETS, 'curious', 'Index Funds and ETFs', {
    summary: 'Funds that simply buy everything in an index, in the same weights. No stock-picking, tiny fees, and over long periods they beat most active funds.',
    aliases: ['index fund', 'index funds', 'ETF', 'ETFs', 'exchange-traded fund', 'passive investing', 'passive fund', 'tracking error'],
    tags: ['funds', 'investing', 'passive'],
    year: 1976,
    body: md`
      ## The idea
      John Bogle launched the first retail index fund at Vanguard in **1976**; it was mocked as "Bogle's folly". The logic: the average active rupee *is* the market, before costs. After costs, the average active investor must trail the index. So own the index and pay almost nothing.

      ## Index fund vs ETF
      - **Index fund**: a normal mutual fund; buy at the day's NAV, SIPs are easy.
      - **ETF**: trades on the exchange like a share during the day; needs a demat account; watch the bid-ask spread and liquidity.

      ## What to check
      - **Expense ratio**: a Nifty 50 index fund's direct plan often costs 0.1–0.3% a year.
      - **Tracking error**: how closely it follows the index — lower is better.
      - **Which index**: Nifty 50, Nifty Next 50, Nifty 500, or factor indices (momentum, value, low-volatility).

      ## The case in one line
      You'll never beat the market with an index fund — and you'll never badly trail it either, which is more than most active funds manage over 10 years.
    `,
  }),

  entry('expense-ratio', 'equation', MARKETS, 'curious', 'Expense Ratio: Direct vs Regular', {
    summary: 'The yearly fee a fund takes from your money. A 1% difference sounds tiny but compounds into lakhs over 20 years.',
    aliases: ['expense ratio', 'TER', 'total expense ratio', 'direct plan', 'regular plan', 'fee drag', 'distributor commission'],
    tags: ['funds', 'costs'],
    year: 2013,
    latex: md`V_T = V_0\,(1 + r - f)^T`,
    variables: [
      [md`V_0`, 'Amount invested'],
      ['r', 'Gross return of the portfolio'],
      ['f', 'Expense ratio (yearly fee)'],
      ['T', 'Years'],
    ],
    body: md`
      ## Why fees bite
      The fee comes off the *return*, every year, and the lost amount would itself have compounded. Over 20 years at 12%, a 1% higher fee takes about **16%** of your final corpus.

      ## Direct vs regular
      Since January 2013 every Indian fund has had a **direct** plan without distributor commission. Same fund manager, same stocks — the regular plan's expense ratio is typically 0.5–1% higher, and that difference goes to whoever sold it to you.

      Paying for advice can be worth it; paying for it invisibly, forever, as a percentage of a growing corpus is expensive. (SEBI-registered investment advisers charge explicit fees instead.)

      ## Fees vs skill
      A fee is certain; outperformance isn't. That asymmetry is the whole argument for index funds.
    `,
    calc: {
      inputs: [
        input('V0', 'Invested', '₹', 1000000, 10000, 100000000, LOG),
        input('r', 'Gross return', '% a year', 12, 4, 18),
        input('fd', 'Direct plan fee', '% a year', 0.5, 0, 3),
        input('fr', 'Regular plan fee', '% a year', 1.5, 0, 3),
        input('years', 'Years', 'years', 20, 1, 40, INT),
      ],
      outputs: [
        out('Direct plan grows to', '₹', 'V0*(1 + (r - fd)/100)^years', { key: 'D' }),
        out('Regular plan grows to', '₹', 'V0*(1 + (r - fr)/100)^years', { key: 'R' }),
        out('Cost of the higher fee', '₹', 'D - R'),
        out('Share of the corpus lost', '%', '(1 - R/D)*100', { digits: 3 }),
      ],
    },
  }),

  entry('active-vs-passive', 'concept', MARKETS, 'curious', 'Active vs Passive Investing', {
    summary: 'Active funds try to beat the index by picking stocks; most don’t, after fees, over long periods. The debate is mostly about costs and whether skill can be spotted in advance.',
    aliases: ['active fund', 'active funds', 'active management', 'actively managed', 'SPIVA', 'fund manager', 'stock picking'],
    tags: ['funds', 'evidence'],
    body: md`
      ## The arithmetic (William Sharpe, 1991)
      Before costs, the average actively managed rupee earns the market return, because together all investors *are* the market. After costs it must earn less. That's not an opinion about skill; it's addition.

      ## The evidence
      S&P's **SPIVA India** scorecards compare active funds to their benchmarks, correcting for funds that were closed or merged (survivorship bias). They regularly find that most actively managed large-cap funds trail their benchmark over 5–10 years; mid- and small-cap results are more mixed, with more room for skill in less-researched stocks.

      ## Why picking winners is hard
      - Past outperformance barely predicts future outperformance.
      - Successful funds attract money and get too big to stay nimble.
      - If markets are roughly efficient, the edge is thin and fees eat it.

      ## A sensible middle
      Many investors use a low-cost index fund for large-caps (where beating the index is hardest) and consider active funds only where the evidence for skill is stronger.
    `,
  }),

  entry('bonds', 'concept', MARKETS, 'curious', 'Bonds', {
    summary: 'A loan you make to a government or company, in a tradeable form: fixed coupons, then your money back at maturity. Their prices move opposite to interest rates.',
    aliases: ['bond', 'bonds', 'coupon', 'coupon rate', 'face value', 'debenture', 'NCD', 'fixed income', 'maturity date'],
    tags: ['debt', 'basics'],
    body: md`
      ## The parts
      - **Face value**: what's repaid at maturity (₹1,000 for most corporate bonds, ₹100 for government securities).
      - **Coupon**: the fixed interest, e.g. 7.5% of face value a year.
      - **Maturity**: when the face value comes back.
      - **Issuer**: the Government of India (G-secs), states, PSUs, banks, companies — each with its own credit risk.

      ## Price and yield move opposite
      A bond paying ₹75 a year was issued when rates were 7.5%. If new bonds now pay 8.5%, nobody will pay ₹1,000 for yours; its price falls until its **yield** matches the market. If rates fall, it rises. How *much* it moves is its duration.

      ## Why own bonds
      Steady income, capital back at maturity (if the issuer pays), and — for high-quality bonds — prices that often rise when stocks crash and rates are cut. They're the ballast in an asset allocation.
    `,
  }),

  entry('bond-pricing', 'equation', MARKETS, 'curious', 'Bond Prices, Yields and Duration', {
    summary: 'A bond’s price is its coupons and face value discounted at the market yield. Duration says how much the price moves when yields move: about −duration × change in yield.',
    aliases: ['yield to maturity', 'YTM', 'bond yield', 'bond yields', 'bond price', 'modified duration', 'Macaulay duration', 'bond duration', 'interest rate risk', 'interest-rate risk', 'convexity'],
    tags: ['debt', 'valuation', 'risk'],
    latex: md`P = \sum_{t=1}^{N} \frac{C}{(1+y)^t} + \frac{F}{(1+y)^N}, \qquad \frac{\Delta P}{P} \approx -D_{\text{mod}}\,\Delta y`,
    variables: [
      ['P', 'Bond price'],
      ['C', 'Coupon paid each year'],
      ['F', 'Face value repaid at maturity'],
      ['y', 'Yield to maturity: the market’s discount rate for this bond'],
      ['N', 'Years to maturity'],
      [md`D_{\text{mod}}`, 'Modified duration: % price change for a 1-point change in yield'],
    ],
    body: md`
      ## Yield to maturity
      The single discount rate that makes the present value of the bond's payments equal its price — the bond's IRR if you hold it to the end and every payment arrives.

      ## Duration: the sensitivity
      **Macaulay duration** is the average time until you get your money back, weighting each payment by its present value. Divide by $(1+y)$ for **modified duration**, which is the handy one: a bond with modified duration 7 loses about **7%** if yields rise by 1 percentage point.

      - Longer maturity → longer duration → bigger swings.
      - Higher coupon → more money back early → shorter duration.
      - A zero-coupon bond's duration equals its maturity.

      ## Why it matters
      SVB in 2023 held long-duration bonds bought when yields were ~1–2%; when US yields rose past 4%, the losses sank the bank. In India, gilt funds swing hard with RBI rate expectations for the same reason. The price–yield curve is also slightly curved (**convexity**), so the linear rule overstates losses and understates gains for big moves.
    `,
    calc: {
      inputs: [
        input('F', 'Face value', '₹', 1000, 100, 1000000, LOG),
        input('cpn', 'Coupon rate', '% a year', 7.5, 0, 15),
        input('y', 'Market yield', '% a year', 7.5, 0.5, 20),
        input('N', 'Years to maturity', 'years', 10, 1, 40, INT),
      ],
      outputs: [
        out('Price', '₹', 'F*cpn/100*(1 - (1 + y/100)^(-N))/(y/100) + F*(1 + y/100)^(-N)', { key: 'P' }),
        out('Macaulay duration', 'years', 'if(cpn, (1 + y/100)/(y/100) - (1 + y/100 + N*(cpn/100 - y/100))/(cpn/100*((1 + y/100)^N - 1) + y/100), N)', { key: 'Dm', digits: 4 }),
        out('Modified duration', '', 'Dm/(1 + y/100)', { key: 'Dmod', digits: 4 }),
        out('Price if yields rise 1 point (exact)', '₹', 'F*cpn/100*(1 - (1 + y/100 + 0.01)^(-N))/(y/100 + 0.01) + F*(1 + y/100 + 0.01)^(-N)'),
        out('Duration’s estimate of that', '₹', 'P*(1 - Dmod/100)'),
      ],
      note: 'Coupon equal to yield prices the bond at face value. Raise the yield, lengthen the maturity, and watch the price fall.',
    },
  }),

  entry('yield-curve', 'concept', MARKETS, 'curious', 'The Yield Curve', {
    summary: 'Interest rates for different lengths of loan, drawn as a curve. Normally upward-sloping; when short rates exceed long ones (inverted), a recession has often followed.',
    aliases: ['yield curve', 'inverted yield curve', 'term premium', 'term structure'],
    tags: ['debt', 'macro', 'signals'],
    body: md`
      ## Reading it
      Plot the yields of government bonds against their maturity: 3 months, 1 year, 5 years, 10 years, 30 years.
      - **Normal (upward)**: lending for longer pays more — compensation for inflation risk and for locking money up (the *term premium*).
      - **Flat**: markets expect rates to stay put.
      - **Inverted**: short rates above long ones. Markets expect the central bank to *cut* later, usually because they expect a slowdown.

      ## The recession signal
      In the US, an inverted 10-year/2-year spread preceded most recessions since the 1970s — though the long 2022–24 inversion was not quickly followed by one, a reminder that signals aren't laws.

      ## India
      The short end tracks the RBI's repo rate (5.25% in 2026); the long end reflects inflation expectations, the government's borrowing and global rates. When the RBI cuts, the short end moves first and banks' lending rates follow.
    `,
  }),

  entry('government-securities', 'concept', MARKETS, 'curious', 'G-Secs and T-Bills', {
    summary: 'Bonds issued by the Government of India. No default risk in rupees, so their yields are the "risk-free rate" that everything else is priced above.',
    aliases: ['G-Sec', 'G-Secs', 'government bond', 'government bonds', 'government securities', 'T-bill', 'T-bills', 'treasury bill', 'RBI Retail Direct', '10-year yield', 'risk-free rate', 'SDL'],
    tags: ['debt', 'government', 'India'],
    body: md`
      ## The menu
      - **T-bills**: 91, 182 and 364 days, sold at a discount.
      - **Dated G-secs**: 2 to 40 years, with half-yearly coupons.
      - **SDLs**: state government loans, yielding a little more.

      ## The risk-free rate
      A government that borrows in its own currency can always pay in rupees (its central bank can create them), so rupee G-secs carry essentially no default risk. Their yields are the base in CAPM, in company valuations and in loan pricing. The **10-year G-sec yield** is the most-watched interest rate in India.

      ## Not risk-free in every sense
      - **Interest-rate risk**: a 30-year G-sec's price can fall 10%+ if yields jump (duration).
      - **Inflation risk**: repaid in rupees that may buy less.

      ## Buying them directly
      Since 2021, individuals can buy G-secs and T-bills at auction with no fees through **RBI Retail Direct**. Gilt funds and target-maturity funds are the fund route.
    `,
  }),

  entry('credit-risk', 'concept', MARKETS, 'curious', 'Credit Risk and Ratings', {
    summary: 'The chance a borrower doesn’t pay. Ratings from AAA down to D summarise it; riskier borrowers must pay a higher yield — the credit spread.',
    aliases: ['credit risk', 'credit rating', 'credit ratings', 'default risk', 'credit spread', 'AAA', 'junk bond', 'high-yield bond', 'investment grade', 'defaulted'],
    tags: ['debt', 'risk'],
    body: md`
      ## Ratings
      Agencies such as CRISIL, ICRA, CARE and India Ratings grade issuers from **AAA** (highest safety) through AA, A and BBB (still *investment grade*) down to junk and **D** (in default). A rating is an opinion, paid for by the issuer — and ratings can be cut from AAA to D in weeks, as IL&FS showed in 2018.

      ## The credit spread
      Yield on a corporate bond minus the yield on a G-sec of the same maturity. It pays you for expected losses from default *plus* a premium for bearing that risk. Spreads widen sharply in panics, which is when lower-rated bonds fall hardest.

      ## Why "high yield" is a warning
      A bond or FD paying 3–4% more than everyone else is telling you something. The extra yield is usually compensation for a real chance of losing money — Yes Bank's AT1 bondholders learned in 2020 that "bank bond" didn't mean "safe".
    `,
  }),

  entry('debt-funds', 'concept', MARKETS, 'curious', 'Debt Funds', {
    summary: 'Mutual funds that hold bonds and money-market paper. Flexible and diversified, but they carry interest-rate and credit risk — and since April 2023, gains are taxed like FD interest.',
    aliases: ['debt fund', 'debt funds', 'liquid fund', 'liquid funds', 'overnight fund', 'gilt fund', 'target maturity fund', 'credit risk fund', 'Bharat Bond'],
    tags: ['debt', 'funds'],
    body: md`
      ## Types, by the two risks
      | Fund | Duration risk | Credit risk |
      |---|---|---|
      | Overnight, liquid | tiny | tiny |
      | Money market, ultra-short | low | low |
      | Corporate bond, banking & PSU | medium | low–medium |
      | Gilt, long duration | high | none |
      | Credit risk | medium | **high** |
      | Target maturity (e.g. Bharat Bond ETF) | falls as maturity nears | depends on holdings |

      ## Lessons from 2018–2020
      IL&FS and DHFL defaults hit several funds; in April 2020 Franklin Templeton shut six credit-heavy debt schemes, freezing investors' money for months. Debt funds are not FDs.

      ## Tax
      For units bought from 1 April 2023, gains are taxed at your **slab rate** regardless of holding period. The old long-term advantage over FDs is gone; the remaining edge is that tax is due only when you sell, not every year.
    `,
  }),

  entry('risk-return', 'concept', MARKETS, 'curious', 'Risk and Return', {
    summary: 'In a market with competition, higher expected returns come only with more risk. The extra return for holding equity over safe bonds is the equity risk premium.',
    aliases: ['risk premium', 'equity risk premium', 'risk-return trade-off', 'risk and return'],
    tags: ['basics', 'risk'],
    body: md`
      ## Why they travel together
      If an asset offered high returns with no risk, everyone would buy it until its price rose and its return fell. What survives competition is a trade-off: safe assets pay little; risky ones must *promise* more to find buyers — and sometimes fail to deliver.

      ## Rough Indian numbers
      - Savings account ~3%; FDs and G-secs ~6–7%.
      - Large-cap equity ~11–13% long-run, with 20%+ yearly swings.
      That gap of ~5% a year is the **equity risk premium** — pay for sitting through crashes.

      ## Which risk is paid?
      Only risk you *can't* diversify away. A single stock's own surprises (a fraud, a failed product) can be removed by holding many stocks, so the market doesn't pay you for them — that's the insight behind CAPM and modern portfolio theory.

      ## Risk isn't only volatility
      Permanent loss (a default, a fraud), inflation eroding "safe" money, running out of money in retirement, and being forced to sell at the bottom are the risks that actually hurt.
    `,
  }),

  entry('diversification', 'concept', MARKETS, 'curious', 'Diversification', {
    summary: 'Owning many things that don’t move in lockstep cuts risk without cutting expected return. It removes company-specific risk — but not the market’s own swings.',
    aliases: ['diversification', 'diversify', 'diversified', 'idiosyncratic risk', 'systematic risk', 'market risk', 'specific risk'],
    tags: ['risk', 'portfolio'],
    latex: md`\sigma_p^2 = \sigma^2\left(\rho + \frac{1 - \rho}{N}\right)`,
    variables: [
      [md`\sigma_p`, 'Volatility of an equal-weighted portfolio of N stocks'],
      [md`\sigma`, 'Volatility of each stock'],
      [md`\rho`, 'Average correlation between pairs of stocks'],
      ['N', 'Number of stocks'],
    ],
    body: md`
      ## "The only free lunch"
      Harry Markowitz's phrase. Combine assets whose ups and downs partly cancel, and the portfolio swings less than its average member while earning the average return.

      ## The limit
      As $N$ grows, the $(1-\rho)/N$ term vanishes but $\rho$ stays. With stocks of 30% volatility and average correlation 0.3, one stock swings 30%; 20 stocks about 17%; infinitely many about 16.4%. That floor is **systematic** (market) risk; what you removed is **idiosyncratic** risk.

      So: most of the benefit comes from the first 20–30 stocks — and to go further you need *different* assets (bonds, gold, other countries) with lower correlation.

      ## When it fails
      Correlations rise in crises, so diversification is weakest exactly when you want it most — one face of fat tails.
    `,
    calc: {
      inputs: [
        input('sig', 'Volatility of each stock', '% a year', 30, 5, 80),
        input('rho', 'Average correlation', '', 0.3, 0, 1),
        input('N', 'Number of stocks', '', 20, 1, 1000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Portfolio volatility', '% a year', 'sig*sqrt(rho + (1 - rho)/N)', { digits: 3 }),
        out('Floor with infinitely many stocks', '% a year', 'sig*sqrt(rho)', { digits: 3 }),
        out('Risk removed vs one stock', '%', '(1 - sqrt(rho + (1 - rho)/N))*100', { digits: 3 }),
      ],
    },
  }),

  entry('modern-portfolio-theory', 'theory', MARKETS, 'curious', 'Modern Portfolio Theory', {
    summary: 'Judge an investment by what it does to the whole portfolio’s risk and return. The best mixes lie on the “efficient frontier”.',
    aliases: ['modern portfolio theory', 'Markowitz', 'efficient frontier', 'mean-variance', 'mean–variance optimisation'],
    tags: ['portfolio', 'theory', 'Nobel'],
    year: 1952,
    latex: md`\mu_p = w\,\mu_1 + (1-w)\,\mu_2, \qquad \sigma_p^2 = w^2\sigma_1^2 + (1-w)^2\sigma_2^2 + 2w(1-w)\rho\,\sigma_1\sigma_2`,
    variables: [
      ['w', 'Share of the portfolio in asset 1'],
      [md`\mu_1, \mu_2`, 'Expected returns'],
      [md`\sigma_1, \sigma_2`, 'Volatilities'],
      [md`\rho`, 'Correlation between the two'],
    ],
    body: md`
      ## Markowitz (1952)
      Harry Markowitz, then a graduate student, showed that return adds up linearly but risk doesn't — the correlation term means a mix can be *less* risky than either ingredient. For every level of risk there's a best achievable return; those best mixes form the **efficient frontier**. Nobel Prize, 1990.

      ## A surprising result
      Add a little of a risky, uncorrelated asset (say gold, or international stocks) to a portfolio and total risk can *fall*. Try the calculator: with correlation near zero, moving from 0% to ~20% of the riskier asset lowers volatility.

      ## In practice
      Optimisers are hypersensitive to estimated returns, which are very uncertain, so pure mean-variance portfolios swing wildly. Practitioners use it as a way of thinking, with constraints — and simple rules like 60/40 or equal weight often do as well out of sample.

      The next step, adding a risk-free asset, leads to CAPM and the Sharpe ratio.
    `,
    calc: {
      inputs: [
        input('w', 'Share in asset 1', '%', 80, 0, 100),
        input('m1', 'Asset 1 return', '% a year', 12, 0, 25),
        input('s1', 'Asset 1 volatility', '% a year', 20, 1, 50),
        input('m2', 'Asset 2 return', '% a year', 9, 0, 25),
        input('s2', 'Asset 2 volatility', '% a year', 16, 1, 50),
        input('rho', 'Correlation', '', 0, -1, 1),
      ],
      outputs: [
        out('Portfolio return', '% a year', 'w/100*m1 + (1 - w/100)*m2', { digits: 3 }),
        out('Portfolio volatility', '% a year', 'sqrt((w/100*s1)^2 + ((1 - w/100)*s2)^2 + 2*(w/100)*(1 - w/100)*rho*s1*s2)', { digits: 3 }),
        out('Lowest-risk share in asset 1', '%', 'max(0, min(100, 100*(s2^2 - rho*s1*s2)/max(0.000000001, s1^2 + s2^2 - 2*rho*s1*s2)))', { digits: 3 }),
      ],
    },
  }),

  entry('capm', 'equation', MARKETS, 'curious', 'CAPM and Beta', {
    summary: 'The Capital Asset Pricing Model: a stock should earn the risk-free rate plus beta times the market’s risk premium. Beta measures how much it swings with the market.',
    aliases: ['CAPM', 'capital asset pricing model', 'beta', 'alpha', 'security market line', 'cost of equity'],
    tags: ['valuation', 'theory', 'Nobel'],
    year: 1964,
    latex: md`\mathbb{E}[R_i] = R_f + \beta_i\,\big(\mathbb{E}[R_m] - R_f\big), \qquad \beta_i = \frac{\operatorname{Cov}(R_i, R_m)}{\sigma_m^2}`,
    variables: [
      [md`R_f`, 'Risk-free rate (e.g. the 10-year G-sec yield)'],
      [md`\beta_i`, 'Beta: the stock’s sensitivity to market moves'],
      [md`\mathbb{E}[R_m] - R_f`, 'Market risk premium'],
    ],
    body: md`
      ## The claim (Sharpe, Lintner, 1964–65)
      If everyone diversifies, company-specific risk is free to remove, so it earns nothing extra. Only exposure to the whole market — **beta** — is rewarded.
      - $\beta = 1$: moves with the market.
      - $\beta = 1.5$: a 10% market fall means ~15% for this stock on average (many banks, metals).
      - $\beta = 0.6$: defensive (FMCG, pharma).

      ## Alpha
      Return beyond what beta predicts is **alpha** — what active managers sell. Most of it disappears once you account for fees and for other risk factors (size, value, momentum).

      ## Uses and limits
      CAPM gives the **cost of equity** used in DCF valuations and WACC. Empirically it's shaky: low-beta stocks have earned more than CAPM predicts and high-beta less, and factors beyond beta explain returns better (Fama–French). Still the most used model in corporate finance — because it's simple.
    `,
    calc: {
      inputs: [
        input('rf', 'Risk-free rate', '% a year', 6.5, 0, 12),
        input('beta', 'Beta', '', 1.2, -0.5, 3),
        input('rm', 'Expected market return', '% a year', 12, 0, 20),
      ],
      outputs: [
        out('Expected return (cost of equity)', '% a year', 'rf + beta*(rm - rf)', { digits: 3 }),
        out('Market risk premium', '% a year', 'rm - rf', { digits: 3 }),
        out('Typical move on a 10% market fall', '%', '-10*beta', { digits: 3 }),
      ],
    },
  }),

  entry('sharpe-ratio', 'equation', MARKETS, 'curious', 'Sharpe Ratio', {
    summary: 'Extra return per unit of volatility. The standard way to compare how well two funds were paid for the risk they took.',
    aliases: ['Sharpe ratio', 'risk-adjusted return', 'Sortino ratio'],
    tags: ['measurement', 'risk'],
    year: 1966,
    latex: md`S = \frac{R_p - R_f}{\sigma_p}`,
    variables: [
      [md`R_p`, 'Portfolio return'],
      [md`R_f`, 'Risk-free rate'],
      [md`\sigma_p`, 'Volatility of the portfolio’s returns'],
    ],
    body: md`
      ## Reading it
      A fund returning 14% with 18% volatility, when G-secs pay 6.5%, has $S = (14 - 6.5)/18 = 0.42$. A broad equity index usually sits around 0.3–0.5 over long periods; sustained values above 1 are rare and worth suspicion (LTCM and Madoff both showed beautiful Sharpe ratios).

      ## Why it's useful
      Leverage can scale any portfolio's return and volatility up or down together, leaving the Sharpe ratio unchanged. So a higher Sharpe portfolio, levered to the same risk, beats a lower one. In MPT, the portfolio with the highest Sharpe ratio is the *tangency portfolio*.

      ## Its blind spots
      It treats upside volatility as bad and assumes returns are roughly normal. Strategies that sell insurance — steady small gains, rare huge losses — look great on Sharpe until the loss arrives (fat tails). The **Sortino ratio** counts only downside volatility.
    `,
    calc: {
      inputs: [
        input('R', 'Portfolio return', '% a year', 14, -20, 40),
        input('rf', 'Risk-free rate', '% a year', 6.5, 0, 12),
        input('vol', 'Volatility', '% a year', 18, 1, 60),
      ],
      outputs: [out('Sharpe ratio', '', '(R - rf)/vol', { digits: 3 })],
    },
  }),

  entry('efficient-market-hypothesis', 'theory', MARKETS, 'curious', 'Efficient Market Hypothesis', {
    summary: 'Prices already reflect available information, so beating the market consistently is very hard. Mostly true for big, liquid stocks — not a claim that prices are always "right".',
    aliases: ['efficient market hypothesis', 'EMH', 'efficient markets', 'market efficiency', 'Grossman–Stiglitz paradox'],
    tags: ['theory', 'evidence', 'Nobel'],
    year: 1970,
    body: md`
      ## Fama's three versions (1970)
      - **Weak**: past prices can't predict future prices (charts don't work).
      - **Semi-strong**: public information (results, news) is priced in within minutes.
      - **Strong**: even private information is priced in — clearly false; insider trading is profitable, which is why it's illegal.

      ## Why it's roughly true
      Thousands of analysts and algorithms compete to exploit any edge; exploiting it moves the price and removes it. What's left is close to a random walk — Bachelier's 1900 insight and Samuelson's 1965 proof that properly anticipated prices fluctuate randomly.

      ## The paradox
      If markets were perfectly efficient, nobody would pay to research, and then they couldn't be efficient (Grossman and Stiglitz, 1980). Markets are *efficiently inefficient*: small edges exist, and are paid for by the costs of finding them.

      ## Where it strains
      Bubbles (dot-com, 2008), momentum, and the behaviour catalogued by behavioural finance. Shiller shared the 2013 Nobel with Fama for showing prices swing far more than dividends justify. Both can be right: short-term price moves are nearly unpredictable, while long-run valuations wander from fundamentals.
    `,
  }),

  entry('behavioural-finance', 'theory', MARKETS, 'curious', 'Behavioural Finance', {
    summary: 'Investors aren’t the cool calculators of textbook models. Predictable errors — loss aversion, overconfidence, herding — show up in prices and, mostly, in people’s own returns.',
    aliases: ['behavioural finance', 'behavioral finance', 'behavioural economics', 'behavioral economics', 'behaviour gap'],
    tags: ['psychology', 'evidence'],
    body: md`
      ## Two big ideas
      1. People use shortcuts (heuristics) that fail in predictable ways — the investor biases.
      2. Mispricing can persist because betting against it is risky and costly (**limits to arbitrage**): the market can stay irrational longer than you can stay solvent.

      ## The behaviour gap
      Fund investors typically earn *less* than the funds they own, because they buy after rallies and sell after crashes. Studies of Indian SIP and lump-sum flows show the same pattern: money pours in near peaks and leaks out near bottoms. The dull fix — automatic SIPs, rebalancing rules, not checking prices daily — is behavioural finance applied to yourself.

      ## Key names
      Kahneman and Tversky (prospect theory), Richard Thaler (mental accounting, nudges; Nobel 2017), Robert Shiller (excess volatility, bubbles; Nobel 2013).
    `,
  }),

  entry('prospect-theory', 'theory', MARKETS, 'curious', 'Prospect Theory and Loss Aversion', {
    summary: 'People judge outcomes as gains or losses from a reference point, and a loss hurts about twice as much as an equal gain pleases.',
    aliases: ['prospect theory', 'loss aversion', 'loss-averse', 'reference point', 'Kahneman and Tversky'],
    tags: ['psychology', 'decisions', 'Nobel'],
    year: 1979,
    latex: md`v(x) = \begin{cases} x^{\alpha} & x \ge 0 \\ -\lambda\,(-x)^{\beta} & x < 0 \end{cases} \qquad \alpha \approx \beta \approx 0.88,\ \lambda \approx 2.25`,
    variables: [
      ['v(x)', 'How a gain or loss of x feels'],
      [md`\lambda`, 'Loss aversion: how much more a loss hurts'],
      [md`\alpha, \beta`, 'Curvature: diminishing sensitivity for gains and for losses'],
    ],
    body: md`
      ## Kahneman and Tversky (1979)
      Unlike expected utility, prospect theory says:
      - We feel **changes**, not levels of wealth — relative to a reference point (what we paid, what we expected).
      - **Losses loom larger**: $\lambda \approx 2$–2.5. Most people refuse a 50/50 bet of +₹1,000 / −₹1,000, and need about +₹2,000 to accept.
      - **Diminishing sensitivity** both ways: the gap between losing ₹1,000 and ₹2,000 feels bigger than between ₹21,000 and ₹22,000 — so people gamble to avoid locking in a loss.
      - Small probabilities are **overweighted** (lottery tickets, insurance against rare events).
      Kahneman received the 2002 Nobel; Tversky had died in 1996.

      ## In markets
      - **Disposition effect**: selling winners too early and holding losers too long, hoping to "get back to even".
      - Checking your portfolio daily shows many small losses, each hurting double — *myopic loss aversion* — which may help explain why stocks must pay such a large premium (the equity premium puzzle).
    `,
    calc: {
      inputs: [
        input('x', 'Amount gained or lost', '₹', 10000, 100, 1000000, LOG),
        input('lam', 'Loss aversion λ', '', 2.25, 1, 4),
        input('a', 'Curvature α = β', '', 0.88, 0.3, 1),
      ],
      outputs: [
        out('Feel of the gain', 'units', 'x^a', { key: 'vg' }),
        out('Feel of the equal loss', 'units', '-lam*x^a', { key: 'vl' }),
        out('50/50 bet: gain needed to accept losing x', '₹', 'lam^(1/a)*x'),
      ],
    },
  }),

  entry('investor-biases', 'concept', MARKETS, 'curious', 'Investor Biases', {
    summary: 'Anchoring, overconfidence, herding, recency and mental accounting: the predictable mistakes that cost ordinary investors more than fees do.',
    aliases: ['anchoring', 'overconfidence', 'herding', 'herd behaviour', 'recency bias', 'disposition effect', 'FOMO', 'mental accounting', 'sunk cost', 'confirmation bias', 'home bias'],
    tags: ['psychology', 'habits'],
    body: md`
      - **Anchoring**: judging a stock "cheap" because it's below the price you paid or its old high. The market doesn't know what you paid.
      - **Overconfidence**: most people rate themselves above-average drivers — and above-average traders. Frequent traders earn less, mostly through costs (Barber and Odean).
      - **Herding / FOMO**: buying what everyone else is buying, late. IPO frenzies, small-cap manias, crypto in 2021.
      - **Recency bias**: expecting the last three years to continue. After a boom, people expect booms.
      - **Disposition effect**: selling winners, keeping losers (from prospect theory).
      - **Mental accounting**: treating money differently by label — keeping an FD at 7% while paying a credit card at 40%.
      - **Sunk cost**: holding a bad investment "because I've already put so much in".
      - **Confirmation bias**: seeking only news that supports what you own.
      - **Home bias**: owning only Indian stocks when India is ~4% of world markets.

      The defence is rarely willpower. It's **rules decided in advance**: automatic SIPs, a target asset allocation with rebalancing dates, a checklist before buying.
    `,
  }),

  entry('pe-ratio', 'equation', MARKETS, 'curious', 'P/E Ratio and EPS', {
    summary: 'Price divided by earnings per share: how many years of today’s profit you’re paying for. High P/Es price in fast growth; low ones, doubt.',
    aliases: ['P/E', 'P/E ratio', 'PE ratio', 'price-to-earnings', 'EPS', 'earnings per share', 'earnings yield', 'price-to-book', 'P/B'],
    tags: ['valuation', 'ratios'],
    latex: md`\text{P/E} = \frac{\text{share price}}{\text{EPS}}, \qquad \text{EPS} = \frac{\text{net profit}}{\text{shares outstanding}}`,
    variables: [
      ['EPS', 'Earnings per share: net profit ÷ number of shares'],
      ['P/E', 'Price-to-earnings multiple'],
    ],
    body: md`
      ## Reading it
      A ₹1,500 share earning ₹75 per share trades at **20× earnings**. Flip it for the **earnings yield**: 1/20 = 5% — comparable, roughly, with bond yields.

      ## What decides a "fair" P/E
      From the Gordon growth model: $\text{P/E} \approx \dfrac{\text{payout}}{r - g}$. Higher growth $g$ or a lower discount rate $r$ (lower interest rates) justify a higher P/E. That's why P/Es expand when rates fall and why fast-growing companies trade at 50–80×.

      ## Nifty's history
      The Nifty's trailing P/E has mostly lived between about 15 and 30; it briefly went far higher in 2021 when COVID crushed earnings (the "E" collapsed). Buying when the market P/E is high has historically led to lower 5–10 year returns — a tendency, not a timer.

      ## Pitfalls
      - Earnings can be one-off, cyclical (metals at peak profits look cheap) or massaged — check cash flow.
      - Loss-making companies have no meaningful P/E.
      - Banks are usually valued on **price-to-book** instead.
    `,
    calc: {
      inputs: [
        input('price', 'Share price', '₹', 1500, 1, 100000, LOG),
        input('eps', 'Earnings per share', '₹', 75, 0.1, 10000, LOG),
        input('g', 'Expected EPS growth', '% a year', 12, 0, 40),
      ],
      outputs: [
        out('P/E', '×', 'price/eps', { digits: 3 }),
        out('Earnings yield', '%', 'eps/price*100', { digits: 3 }),
        out('Years for growing earnings to add up to the price', 'years', 'if(g - 0.001, ln(1 + price/eps*g/100)/ln(1 + g/100), price/eps)', { digits: 3 }),
        out('PEG ratio (P/E ÷ growth)', '', 'price/eps/g', { digits: 3 }),
      ],
    },
  }),

  entry('dcf', 'equation', MARKETS, 'curious', 'Discounted Cash Flow (DCF) Valuation', {
    summary: 'Value a business as the present value of all the cash it will ever generate. Most of the answer usually comes from the "terminal value" far in the future.',
    aliases: ['DCF', 'discounted cash flow', 'intrinsic value', 'terminal value', 'enterprise value', 'fair value'],
    tags: ['valuation', 'companies'],
    latex: md`V = \sum_{t=1}^{N} \frac{FCF_0 (1+g)^t}{(1+r)^t} + \frac{1}{(1+r)^N}\cdot\frac{FCF_N (1+g_\infty)}{r - g_\infty}`,
    variables: [
      [md`FCF_0`, 'Free cash flow this year'],
      ['g', 'Growth rate during the forecast years'],
      ['N', 'Years of explicit forecast'],
      [md`g_\infty`, 'Long-run growth forever after (below the economy’s nominal growth)'],
      ['r', 'Discount rate — the cost of capital (WACC)'],
    ],
    body: md`
      ## The recipe
      1. Forecast **free cash flow** — cash left after running and investing in the business — for 5–10 years.
      2. After that, assume steady growth forever and value the tail with the Gordon growth formula: the **terminal value**.
      3. Discount everything at the cost of capital.

      ## The uncomfortable truth
      With 15% growth for 10 years, then 5% forever, at a 12% discount rate, about **60%** of the value is the terminal value — cash flows more than ten years away. Change $r$ by 1% or $g_\infty$ by 1% and the value swings 15–25%. A DCF is less a measurement than a **structured argument** about the future; its main use is asking "what growth is the current price assuming?"

      ## Reverse DCF
      Put in today's market cap and solve for the growth rate that justifies it. If a company must grow 30% a year for 15 years to deserve its price, you know what you're betting on.
    `,
    calc: {
      inputs: [
        input('F0', 'Free cash flow this year', '₹', 1000000000, 1000000, 1000000000000, LOG),
        input('g', 'Growth in the forecast years', '% a year', 15, -10, 40),
        input('N', 'Forecast years', 'years', 10, 1, 20, INT),
        input('ginf', 'Growth forever after', '% a year', 5, 0, 8),
        input('r', 'Discount rate', '% a year', 12, 6, 20),
      ],
      outputs: [
        out('Value of the forecast years', '₹', 'F0*if(abs(r - g) - 0.001, (1 + g/100)/(r/100 - g/100)*(1 - ((1 + g/100)/(1 + r/100))^N), N)', { key: 'A' }),
        out('Value of the terminal tail', '₹', 'F0*(1 + g/100)^N*(1 + ginf/100)/(r/100 - ginf/100)/(1 + r/100)^N', { key: 'B' }),
        out('Total value', '₹', 'A + B'),
        out('Share of value from the tail', '%', 'B/(A + B)*100', { digits: 3 }),
        out('Implied multiple of this year’s cash flow', '×', '(A + B)/F0', { digits: 3 }),
      ],
    },
  }),

  entry('gordon-growth', 'equation', MARKETS, 'curious', 'Gordon Growth Model', {
    summary: 'A payment growing at g forever, discounted at r, is worth D/(r − g). Tiny, but it explains why valuations are so sensitive to interest rates and growth.',
    aliases: ['Gordon growth model', 'dividend discount model', 'DDM', 'growing perpetuity', 'perpetuity'],
    tags: ['valuation'],
    year: 1956,
    latex: md`P_0 = \frac{D_1}{r - g}`,
    variables: [
      [md`D_1`, 'Next year’s dividend (or cash flow)'],
      ['r', 'Required return / discount rate'],
      ['g', 'Growth rate forever, must be below r'],
    ],
    body: md`
      ## Derivation
      $P = \dfrac{D}{1+r} + \dfrac{D(1+g)}{(1+r)^2} + \cdots$ is a geometric series with ratio $(1+g)/(1+r)$, summing to $D/(r-g)$ when $g < r$.

      ## The knife-edge
      The denominator $r - g$ is a small difference of two uncertain numbers. With $r = 12\%$ and $g = 8\%$, $P = 25 D$. Let $g$ slip to 7% and $P = 20D$ — a 20% fall from a 1-point change in belief. Push $g$ toward $r$ and the price explodes: bubbles are, in this language, $g$ assumed to be nearly $r$ forever.

      ## Rates move everything
      A lower discount rate (RBI or Fed cuts) shrinks $r - g$ and lifts all long-duration assets — growth stocks most, as 2020–21 showed, and in reverse in 2022.

      ## Used for
      Terminal values in DCF, dividend-paying utilities and banks, and the intuition behind "justified" P/E ratios.
    `,
    calc: {
      inputs: [
        input('D1', 'Next year’s dividend', '₹', 20, 0.1, 10000, LOG),
        input('r', 'Required return', '% a year', 12, 1, 25),
        input('g', 'Growth forever', '% a year', 8, -5, 24),
      ],
      outputs: [
        out('Fair price', '₹', 'if(r - g, D1/(r/100 - g/100), 1/0)', { key: 'P' }),
        out('Price if growth is 1 point lower', '₹', 'D1/(r/100 - g/100 + 0.01)'),
        out('Dividend yield', '%', 'D1/P*100', { digits: 3 }),
      ],
      note: 'Growth at or above the required return breaks the formula: the price would be infinite.',
    },
  }),

  entry('dividends-buybacks', 'concept', MARKETS, 'curious', 'Dividends and Buybacks', {
    summary: 'Two ways a company hands cash back to shareholders. Neither creates value by itself; the tax treatment decides which is better for you.',
    aliases: ['dividend', 'dividends', 'buyback', 'buybacks', 'share buyback', 'dividend yield', 'payout ratio'],
    tags: ['companies', 'tax'],
    body: md`
      ## Dividends
      Cash paid per share. The share price drops by about the dividend on the ex-date — you've been handed part of what you already owned. Since 2020, dividends are taxed in **your** hands at your slab rate (TDS above ₹10,000 a year).

      ## Buybacks
      The company buys back its own shares, so each remaining share owns a bigger slice. From **April 2026** (Budget 2026), money received in a buyback is taxed as **capital gains** — 12.5% long-term or 20% short-term — rather than as a dividend, which had been the rule since October 2024.

      ## Why neither is "free money"
      Paying out cash leaves the company with less; what matters is whether the company can earn more on retained cash than you could elsewhere (compare its return on equity with your alternatives).

      ## Signals
      Steady dividends signal confidence in cash flows; buybacks at high prices can destroy value, and some are done mainly to lift EPS.
    `,
  }),

  entry('ipos', 'concept', MARKETS, 'curious', 'IPOs', {
    summary: 'An initial public offering: a company sells shares to the public for the first time. Exciting, often oversubscribed — and on average a poor long-term buy.',
    aliases: ['IPO', 'IPOs', 'initial public offering', 'listing gains', 'grey market premium', 'oversubscribed', 'offer for sale'],
    tags: ['markets', 'India'],
    body: md`
      ## Who sells
      A **fresh issue** raises money for the company; an **offer for sale** lets existing owners (founders, private equity) cash out. Many large Indian IPOs are mostly offer-for-sale — insiders choosing the moment to sell.

      ## Why that matters
      The seller knows more than the buyer, and picks a time when prices are high (IPO waves cluster after bull runs — India had record IPO years in 2024–25). Research across countries finds IPOs, on average, **underperform** comparable stocks over the following 3–5 years (Jay Ritter's "new issues puzzle"), even though first-day pops are common.

      ## India-specific
      - Applications through ASBA/UPI; allotment by lottery for retail when oversubscribed.
      - The **grey market premium** is unofficial and unregulated — a mood gauge, not a price.
      - SEBI requires detailed offer documents (the RHP): read the "risk factors" and "objects of the issue".
    `,
  }),

  entry('sebi', 'concept', MARKETS, 'curious', 'SEBI', {
    summary: 'The Securities and Exchange Board of India regulates exchanges, brokers, mutual funds and listed companies. Born from the reforms after the 1992 scam.',
    aliases: ['SEBI', 'Securities and Exchange Board of India', 'insider trading', 'market regulator', 'front-running'],
    tags: ['regulation', 'India'],
    year: 1992,
    body: md`
      ## Origins
      Set up in 1988 without real powers; the **SEBI Act of 1992**, passed in the wake of the Harshad Mehta scam, made it a statutory regulator able to investigate, fine and ban.

      ## What it does
      - Registers and supervises brokers, mutual funds, investment advisers, research analysts.
      - Sets disclosure rules for listed companies and IPOs.
      - Pursues insider trading, front-running and manipulation.
      - Designs market structure: T+1 settlement, mutual fund categories, the separation of direct and regular plans.

      ## F&O curbs (2024–25)
      After its studies found that about **9 in 10 individual F&O traders lose money**, SEBI raised minimum contract sizes, limited weekly expiries to one index per exchange and tightened margins. Budget 2026 then raised the securities transaction tax on futures and options.

      ## What it can't do
      Stop you losing money on a legitimate but bad investment — and it has no power over unregulated products like "digital gold" or most crypto.
    `,
  }),

  entry('short-selling', 'concept', MARKETS, 'curious', 'Short Selling', {
    summary: 'Selling something you’ve borrowed, hoping to buy it back cheaper. Losses are unlimited in theory; short sellers are unpopular but often the ones who uncover frauds.',
    aliases: ['short selling', 'short sell', 'short seller', 'short sellers', 'shorting', 'short squeeze', 'short interest'],
    tags: ['markets', 'trading'],
    body: md`
      ## Mechanics
      Borrow a share worth ₹1,000, sell it, and later buy one back to return. If the price falls to ₹700, you keep ₹300. If it rises to ₹3,000, you lose ₹2,000 — and there's no ceiling on how high it can go.

      ## The squeeze
      When many people are short and the price rises, they must buy to limit losses, which pushes the price higher, forcing more buying. GameStop in January 2021 went from about $17 to an intraday $483 this way.

      ## In India
      Individuals can short intraday in the cash market, or hold short positions through futures, options or the securities lending and borrowing (SLB) system. Naked shorting (selling without arranging to borrow) isn't allowed.

      ## Why markets need them
      Short sellers make prices reflect bad news as well as good, and many corporate frauds (Enron, Wirecard) were first flagged by shorts.
    `,
  }),

  entry('market-liquidity', 'concept', MARKETS, 'curious', 'Liquidity and the Bid-Ask Spread', {
    summary: 'How easily you can trade without moving the price. The gap between the best buy and sell quotes is a hidden cost on every trade.',
    aliases: ['market liquidity', 'bid-ask spread', 'bid–ask spread', 'illiquid', 'market maker', 'market makers', 'slippage', 'impact cost'],
    tags: ['markets', 'costs', 'plumbing'],
    body: md`
      ## The spread
      If the best bid is ₹99.90 and the best offer ₹100.10, buying and immediately selling costs ₹0.20 — 0.2% — before any fee. Large-cap stocks have spreads of a paisa or two; small-caps and thinly traded ETFs can have 1% or more.

      ## Depth and impact
      A big order eats through several price levels in the order book (**impact cost** or **slippage**). What looks like a cheap small-cap can be expensive to buy in size and very hard to sell in a panic.

      ## Liquidity vanishes when you need it
      In March 2020 even some debt funds couldn't sell corporate bonds at sensible prices. Illiquid assets should pay a premium — the price of possibly not being able to get out.
    `,
  }),

  entry('international-investing', 'concept', MARKETS, 'curious', 'International Investing from India', {
    summary: 'India is about 4% of world stock markets. Owning some foreign stocks spreads risk across economies and gives a hedge against a falling rupee.',
    aliases: ['international investing', 'international diversification', 'US stocks', 'Liberalised Remittance Scheme', 'LRS', 'fund of funds', 'foreign stocks'],
    tags: ['investing', 'diversification', 'currency'],
    body: md`
      ## Why bother
      - **Diversification**: different sectors (global tech, healthcare) and economies with imperfect correlation.
      - **Currency**: the rupee has weakened against the dollar by roughly 3–4% a year over the long run (from about ₹45 per dollar in 2000 to near ₹88 in 2025). Dollar assets gain that on top of their own return — and the rupee tends to fall when Indian markets panic.

      ## Routes
      - **Indian mutual funds** investing abroad (fund-of-funds or feeder funds). An industry-wide RBI/SEBI cap on overseas investment has at times forced them to stop taking new money.
      - **Direct**, through the **Liberalised Remittance Scheme**: up to **$250,000** a person a year. Tax collected at source (TCS) of 20% applies to remittances above ₹10 lakh a year for investment, adjustable against your tax.

      ## Watch out for
      Foreign-currency costs on the way in and out, tax paperwork (foreign assets must be reported in your return), and US estate tax on large direct US holdings.
    `,
  }),

  entry('factor-investing', 'concept', MARKETS, 'curious', 'Factor Investing', {
    summary: 'Certain traits — cheapness (value), recent strength (momentum), small size, low volatility, quality — have historically earned returns beyond the market’s. Smart-beta funds package them.',
    aliases: ['factor investing', 'value investing', 'momentum', 'momentum investing', 'size premium', 'Fama–French', 'smart beta', 'low volatility', 'quality factor'],
    tags: ['investing', 'evidence'],
    year: 1992,
    body: md`
      ## The factors
      - **Value**: cheap stocks (low P/E, low price-to-book) beat expensive ones over long periods — Graham and Buffett's instinct, measured by Fama and French (1992).
      - **Size**: small companies, historically (a weaker effect lately).
      - **Momentum**: recent winners keep winning for 3–12 months (Jegadeesh and Titman, 1993) — awkward for the efficient market hypothesis.
      - **Low volatility**: calmer stocks have delivered similar returns with less risk — a direct contradiction of CAPM.
      - **Quality**: profitable, low-debt, high-ROE firms.

      ## Risk or mistake?
      Either the factors are compensation for hidden risks (value firms are fragile in recessions) or they're behavioural mistakes that persist (investors overpay for glamour stocks, underreact to news). Probably some of each.

      ## The catch
      Every factor has had painful decade-long droughts — value badly lagged from about 2010 to 2020. In India, NSE indices such as momentum, value, quality and low-volatility versions of the Nifty let you hold factors cheaply.
    `,
  }),

  entry('market-timing', 'question', MARKETS, 'curious', 'Can anyone time the market?', {
    summary: 'Getting out before crashes and back in before rallies would be wonderful. The best and worst days come clustered together, so missing a few good ones wrecks returns.',
    aliases: ['market timing', 'time the market', 'time in the market', 'buy the dip'],
    tags: ['evidence', 'decisions'],
    body: md`
      ## Why it's so hard
      - You must be right **twice**: when to leave and when to return.
      - The biggest up-days usually arrive in the middle of crashes (March 2020 had both huge falls and some of the biggest rises in years). Selling in fear tends to mean missing the rebound.
      - Over long periods, a large share of all market gains come from a small number of days. Missing even ten of the best days over 20 years has, in study after study, cut returns dramatically.

      ## What does work (a bit)
      - **Valuation** as a gentle tilt: starting from very high P/Es has led to lower long-run returns — useful for rebalancing, useless for predicting next month.
      - **Rules, not feelings**: an asset allocation with rebalancing automatically trims after booms and adds after crashes.

      ## "Time in the market beats timing the market"
      A cliché because it's mostly true. See also efficient markets and the behaviour gap.
    `,
  }),

  entry('equity-premium-puzzle', 'question', MARKETS, 'curious', 'Why do stocks pay so much more than bonds?', {
    summary: 'The equity premium puzzle: historically stocks beat safe bonds by ~5–6% a year — far more than standard models of risk aversion can explain.',
    aliases: ['equity premium puzzle', 'Mehra–Prescott'],
    tags: ['puzzle', 'theory'],
    year: 1985,
    body: md`
      ## The puzzle (Mehra and Prescott, 1985)
      In the US over a century, stocks beat Treasury bills by about 6% a year. Standard economic models, with reasonable risk aversion and the actual smoothness of consumption, predict a premium well under 1%. To fit the data you need people to be absurdly risk-averse — refusing a 50/50 bet of +₹1 lakh / −₹10,000 on moderate wealth.

      ## Candidate answers
      - **Myopic loss aversion** (Benartzi and Thaler): people check returns often and feel each loss double (prospect theory), so they need a big premium to hold stocks.
      - **Rare disasters**: investors price in small chances of catastrophic crashes (wars, revolutions) that may not appear in a lucky sample.
      - **Survivorship**: the US was the century's big winner; world averages are lower.
      - **Ergodicity**: an individual experiences the *time* average of returns, not the ensemble average; that changes what "fair compensation" means.

      Still unresolved. For an Indian saver it's also an opportunity: if the premium persists, patient equity owners collect it.
    `,
  }),

  entry('crypto', 'concept', MARKETS, 'curious', 'Crypto and Bitcoin', {
    summary: 'Digital tokens recorded on a shared public ledger. Bitcoin works as a scarce, hard-to-censor digital asset; most tokens are speculation. India taxes gains at a flat 30% with 1% TDS.',
    aliases: ['crypto', 'cryptocurrency', 'cryptocurrencies', 'Bitcoin', 'blockchain', 'stablecoin', 'stablecoins', 'virtual digital asset', 'VDA'],
    tags: ['assets', 'money', 'speculation'],
    year: 2009,
    body: md`
      ## What Bitcoin is
      Launched in 2009 after Satoshi Nakamoto's 2008 paper: a ledger that thousands of computers agree on, with new coins released on a fixed schedule to a hard cap of **21 million**. Nobody can print more or reverse a transaction.

      ## Is it money?
      Judged against money's three jobs: a poor **unit of account** and **medium of exchange** (prices swing 5–10% in a day), and a debated **store of value** — it has had several 70–80% crashes. Stablecoins pegged to the dollar fix the volatility but depend on whoever holds the reserves.

      ## Blow-ups
      Terra/Luna (May 2022) lost about $40 billion in days; the FTX exchange collapsed in November 2022 with customer funds missing. Holding coins on an exchange means trusting that exchange.

      ## India
      Not banned, not legal tender. Gains are taxed at a flat **30%** (plus cess), losses can't be set off against anything, and **1% TDS** is deducted on transfers above small thresholds. The RBI runs its own digital rupee (**e₹**) pilots — a central bank digital currency, which is a different thing entirely.
    `,
  }),
];
