// Crises & Stories: bubbles, crashes, frauds and rescues. Each one is a concept in action.

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { STORIES } = AREA;

export const STORIES_ENTRIES = [
  entry('bubbles', 'concept', STORIES, 'curious', 'Anatomy of a Bubble', {
    summary: 'Displacement, boom, euphoria, distress, panic: bubbles follow a remarkably similar script, and credit is usually the fuel. Minsky: stability breeds instability.',
    aliases: ['bubble', 'bubbles', 'speculative bubble', 'mania', 'Minsky', 'Minsky moment', 'financial instability hypothesis', 'greater fool'],
    tags: ['crises', 'psychology', 'theory'],
    year: 1978,
    body: md`
      ## The script
      Charles Kindleberger's *Manias, Panics, and Crashes* (1978), built on Hyman Minsky's ideas, describes five stages:
      1. **Displacement** — a genuine novelty: railways, the internet, cheap mortgages, crypto.
      2. **Boom** — prices rise, credit expands, early investors get rich.
      3. **Euphoria** — "this time is different"; people buy because prices are rising (the *greater fool*).
      4. **Distress** — insiders sell; prices stall; borrowers get squeezed.
      5. **Panic** — forced selling, margin calls, a collapse far below fair value.

      ## Minsky's insight
      Long calm periods encourage more borrowing against rising asset values — first prudent, then speculative, then Ponzi-like (debt serviced only by rising prices). **Stability breeds instability.** The "Minsky moment" is when the music stops.

      ## Spot the family resemblance
      Tulips (1637), the South Sea Company (1720), 1929, Harshad Mehta's market (1992), dot-com (2000), US housing (2008), and many small-cap and crypto frenzies since. The asset changes; leverage, stories and herding don't.

      ## The hard part
      Bubbles are only certain afterwards. Prices can stay "too high" for years (the efficient market hypothesis's defenders have a point), which is why shorting bubbles ruins so many sceptics.
    `,
  }),

  entry('tulip-mania', 'example', STORIES, 'curious', 'Tulip Mania (1637)', {
    summary: 'Dutch traders bid rare tulip bulbs to the price of a house, then the market vanished in days. The original bubble story — and more exaggerated than legend says.',
    aliases: ['tulip mania', 'tulipmania', 'Semper Augustus'],
    tags: ['bubbles', 'history'],
    year: 1637,
    body: md`
      ## The story
      In the Dutch Golden Age, rare "broken" tulips (streaked by a virus, though nobody knew) became status symbols. Through the winter of 1636–37, contracts for future bulbs changed hands in taverns at soaring prices — a single Semper Augustus bulb was reportedly priced at thousands of guilders, more than a fine canal house. In early February 1637, buyers stopped showing up, and prices collapsed.

      ## The revision
      Historians such as Anne Goldgar (2007) found little evidence of widespread ruin: trading was concentrated among merchants, many contracts were never enforced, and the economy barely noticed. Much of the lurid version comes from moralising pamphlets and Charles Mackay's 1841 *Extraordinary Popular Delusions*.

      ## Why it's still told
      It has the clean shape of every bubble: a novelty, a futures-like market with little money down, prices rising because they're rising, and a sudden absence of buyers.
    `,
  }),

  entry('south-sea-bubble', 'example', STORIES, 'curious', 'South Sea Bubble (1720)', {
    summary: 'A company with a government debt deal and a trade monopoly that barely traded saw its shares rise about eightfold in 1720, then crash. Isaac Newton lost a fortune.',
    aliases: ['South Sea Bubble', 'South Sea Company', 'Mississippi Company', 'Bubble Act'],
    tags: ['bubbles', 'history', 'physics bridge'],
    year: 1720,
    body: md`
      ## What happened
      The South Sea Company took over British government debt in exchange for shares and a monopoly on trade with Spanish South America — trade that hardly existed. Promoters talked the price from about £128 in January 1720 to about £1,000 by the summer, lending investors money to buy shares. Copycat "bubble companies" sprang up (one reputedly for "an undertaking of great advantage, but nobody to know what it is"). By September the price was collapsing; by December it was back near where it began. Across the Channel, John Law's Mississippi Company in France followed the same arc the same year.

      ## Newton
      Isaac Newton — who was also Master of the Royal Mint — sold early at a profit, then bought back in near the top and lost around £20,000, a huge sum. He is *said* to have remarked that he could calculate the motions of the heavenly bodies but not the madness of people; the line is reported second-hand, but the loss is real.

      ## Lessons
      Leverage to buy shares, a great story with no cash flows behind it, and insiders who sold into the frenzy. Parliament's Bubble Act made new joint-stock companies hard to form for a century.
    `,
  }),

  entry('crash-1929', 'example', STORIES, 'curious', '1929 Crash and the Great Depression', {
    summary: 'The Dow fell 89% from its 1929 peak to 1932 and took 25 years to recover. Margin debt, bank failures and tight money turned a crash into a depression.',
    aliases: ['1929 crash', 'Wall Street Crash', 'Great Depression', 'Black Tuesday'],
    tags: ['crashes', 'history'],
    year: 1929,
    body: md`
      ## The fall
      The Dow Jones peaked at 381 on 3 September 1929. In late October — Black Thursday, Black Monday (−13%), Black Tuesday (−12%) — it crashed; after a false recovery it kept sliding to **41** in July 1932, a fall of **89%**. It didn't regain its 1929 peak until **1954**.

      ## Why so bad
      - **Leverage**: investors bought on margin with as little as 10% down; falling prices triggered margin calls and forced selling.
      - **Bank runs**: around 9,000 US banks failed in 1930–33, with no deposit insurance, destroying money.
      - **Policy mistakes**: the Fed let the money supply shrink by about a third; the gold standard tied hands; tariffs (Smoot–Hawley) choked trade.
      US unemployment reached ~25%. Friedman and Schwartz, and later Ben Bernanke, blamed the collapse of money and banking more than the stock crash itself.

      ## Legacy
      Deposit insurance, securities regulation (the SEC, 1934), and the central-bank reflex — visible in 2008 and 2020 — to flood the system with liquidity rather than let banks fail in a chain.
    `,
  }),

  entry('bop-crisis-1991', 'example', STORIES, 'curious', 'India’s 1991 Crisis', {
    summary: 'In mid-1991 India had foreign-exchange reserves for about three weeks of imports. It pledged 67 tonnes of gold, devalued the rupee and dismantled the licence raj.',
    aliases: ['1991 crisis', '1991 balance of payments crisis', 'liberalisation', '1991 reforms', 'licence raj', 'gold pledge'],
    tags: ['India', 'crises', 'history'],
    year: 1991,
    body: md`
      ## How it got there
      A decade of large fiscal deficits, rising foreign borrowing, and then the 1990 Gulf War: oil prices spiked and remittances from Gulf workers dried up. Political instability scared lenders; NRIs pulled deposits; credit ratings were cut.

      ## The edge
      By June 1991 reserves had fallen to roughly **$1 billion** — about **three weeks of imports**. The government pledged gold: about **20 tonnes** via UBS in May and **47 tonnes** flown to the Bank of England in July, raising roughly $600 million. The rupee was devalued by about **18–20%** in two steps in early July, and the IMF lent support.

      ## The turn
      The 24 July 1991 Budget (Manmohan Singh as finance minister, P.V. Narasimha Rao as prime minister) ended most industrial licensing, opened sectors to foreign investment, cut tariffs and began the move to a market-determined rupee. Reserves and growth recovered within a few years.

      ## Why it still matters
      Every Indian concern about the current account deficit, forex reserves and foreign borrowing traces back to 1991. The RBI's large reserve buffer today is, in part, a vow never to repeat it.
    `,
  }),

  entry('harshad-mehta-scam', 'example', STORIES, 'curious', 'Harshad Mehta Scam (1992)', {
    summary: 'A broker diverted thousands of crores of bank money into stocks via the bond market’s paper-based plumbing. The Sensex quadrupled, then crashed — and India got SEBI’s teeth, the NSE and demat.',
    aliases: ['Harshad Mehta', 'Scam 1992', 'securities scam', 'ready forward', 'bank receipts'],
    tags: ['India', 'fraud', 'history'],
    year: 1992,
    body: md`
      ## The mechanism
      Banks lent to each other using **ready-forward** deals in government securities, settled with paper **bank receipts** (BRs) rather than actual bonds. Harshad Mehta, acting as a broker between banks, used BRs from obliging smaller banks — some worthless — to route bank funds into his own account for weeks at a time, and poured the money into stocks like ACC.

      ## The boom and bust
      The Sensex rose from about **1,000** in early 1991 to **4,467** in April 1992. On 23 April 1992, journalist Sucheta Dalal exposed the shortfall at SBI in *The Times of India*. The Sensex fell about **43%** to around 2,500 by August. Estimates of the funds diverted run to roughly ₹4,000–5,000 crore.

      ## What changed
      - **SEBI** got statutory powers (SEBI Act, 1992).
      - The **NSE** began screen-based trading (1994), ending the opaque floor.
      - **Demat** accounts (NSDL, 1996) replaced paper certificates.
      - The RBI tightened rules on bank investments and interbank deals.

      A textbook case of leverage, bad plumbing and a compelling story, told again in the 2020 series *Scam 1992*.
    `,
  }),

  entry('dotcom-bubble', 'example', STORIES, 'curious', 'Dot-com Bubble (2000)', {
    summary: 'Internet stocks soared on stories and “eyeballs” rather than profits. The Nasdaq fell 78% from March 2000 to October 2002 and needed 15 years to recover.',
    aliases: ['dot-com bubble', 'dotcom bubble', 'tech bubble', 'Ketan Parekh', 'K-10 stocks'],
    tags: ['bubbles', 'technology'],
    year: 2000,
    body: md`
      ## The mania
      The internet was a genuine revolution (the displacement), which made any price seem justified. Companies with no profits and sometimes no revenue listed at huge valuations; "new economy" metrics replaced earnings. The Nasdaq Composite peaked at **5,048** on 10 March 2000.

      ## The crash
      By October 2002 it was at **1,114** — down **78%**. Many companies vanished; survivors like Amazon fell over 90% before becoming giants. The Nasdaq only regained its 2000 peak in 2015.

      ## India's version
      Software stocks and the "K-10" stocks associated with broker Ketan Parekh soared in 1999–2000. The Sensex, near 6,000 in February 2000, fell by more than half by late 2001, and Parekh was later banned by SEBI for manipulation.

      ## Lessons
      A technology can transform the world and still be a terrible investment at the wrong price: in a DCF, the growth was real but the terminal value assumed was impossible. Twenty-five years later, the same debate rages about AI.
    `,
  }),

  entry('ltcm', 'example', STORIES, 'curious', 'LTCM (1998)', {
    summary: 'A hedge fund run by star traders and two Nobel laureates, leveraged more than 25 to 1, lost $4.6 billion in four months when “impossible” moves happened. The Fed had to organise a rescue.',
    aliases: ['LTCM', 'Long-Term Capital Management'],
    tags: ['leverage', 'models', 'crises'],
    year: 1998,
    body: md`
      ## The fund
      Long-Term Capital Management, founded in 1994 by John Meriwether with Myron Scholes and Robert Merton (Nobel 1997 for option pricing), made small, supposedly low-risk bets that prices of similar bonds would converge. Small edges needed leverage: roughly **25:1** on the balance sheet, and derivatives with over a trillion dollars of notional value. Returns in 1995–96 were about 40% a year.

      ## The fall
      In August 1998 Russia defaulted on its rouble debt. Investors everywhere fled to the safest, most liquid bonds, so spreads that "should" converge **widened** instead — together. LTCM's risk models, calibrated on calm years and assuming modest correlations, said such losses were near-impossible. It lost **$4.6 billion** in under four months.

      ## The rescue
      Fearing a chain of forced selling, the New York Fed brought 14 banks together to inject $3.6 billion and wind the fund down. No public money, but a precedent.

      ## Lessons
      Fat tails, correlations jumping to one, liquidity vanishing when needed, and leverage turning a paper loss into ruin. Arbitrage has limits: being right eventually is useless if you're insolvent first.
    `,
  }),

  entry('gfc-2008', 'example', STORIES, 'curious', 'The 2008 Global Financial Crisis', {
    summary: 'US mortgage lending to borrowers who couldn’t repay, sliced into “safe” securities and held with huge leverage, blew up in 2007–08. Lehman failed; world markets fell by half; the Sensex fell about 60%.',
    aliases: ['2008 crisis', 'global financial crisis', 'GFC', 'financial crisis', 'subprime', 'subprime crisis', 'Lehman Brothers', 'CDO', 'mortgage-backed securities'],
    tags: ['crises', 'banking', 'leverage'],
    year: 2008,
    body: md`
      ## The build-up
      US house prices rose for years; lenders made **subprime** loans with teaser rates and little checking, assuming prices would keep rising. Banks bundled mortgages into securities, then into CDOs, whose top slices were rated AAA on the assumption that defaults would be uncorrelated. Investment banks funded holdings with short-term borrowing at leverage of 30:1 or more.

      ## The bust
      House prices fell (about 27% nationally from the peak). Defaults were correlated after all; "AAA" securities collapsed; nobody knew who held the losses, so lending between banks froze — a bank run on the shadow banking system. **Lehman Brothers** filed for bankruptcy on 15 September 2008. AIG, Fannie Mae, Freddie Mac and major banks were rescued.

      ## India
      Indian banks held little of the toxic debt, but foreign investors pulled money out: the Sensex fell from about 21,000 in January 2008 to around 8,000 by October — roughly **60%**. The RBI cut the repo rate from 9% to 4.75% and slashed the CRR; the government added fiscal stimulus. Growth dipped, then rebounded strongly in 2009–10.

      ## Echoes
      Leverage, correlated tails, ratings trusted too much, maturity mismatch — every lesson from 1929 and LTCM at once. The response (QE, bailouts, Basel III capital and liquidity rules) shaped the next fifteen years.
    `,
  }),

  entry('satyam-scandal', 'example', STORIES, 'curious', 'Satyam Scandal (2009)', {
    summary: 'India’s fourth-largest IT company admitted in January 2009 that ₹5,040 crore of the cash on its books didn’t exist. “India’s Enron” reshaped audit and governance rules.',
    aliases: ['Satyam', 'Satyam scandal', 'Ramalinga Raju', 'India’s Enron'],
    tags: ['India', 'fraud', 'governance'],
    year: 2009,
    body: md`
      ## The confession
      On 7 January 2009, chairman B. Ramalinga Raju wrote to the board that the company's accounts had been falsified for years: of about ₹5,361 crore of cash and bank balances on the balance sheet, **₹5,040 crore was fictitious**, along with inflated revenues and understated liabilities. He compared it to "riding a tiger, not knowing how to get off without being eaten". The share price fell about **78%** that day.

      ## How it hid
      Fake invoices created fake revenue; fake bank statements showed matching fake cash — both sides of double-entry satisfied. The auditors (a Big Four firm's Indian affiliate) signed off for years; independent directors didn't catch it.

      ## Aftermath
      The government replaced the board; Tech Mahindra bought the business in 2009. Raju and others were convicted; the auditors were fined and banned. The Companies Act 2013 tightened rules on auditor rotation, independent directors and fraud reporting.

      ## Lesson for investors
      Check whether profits turn into cash that can be *verified* — cash flow and interest income that match the claimed cash pile. Satyam's reported cash earned suspiciously little interest.
    `,
  }),

  entry('ilfs-debt-shock', 'example', STORIES, 'curious', 'IL&FS and the Debt Fund Shock (2018–2020)', {
    summary: 'An AAA-rated infrastructure lender defaulted in 2018 with over ₹90,000 crore of group debt. The shock spread through NBFCs and debt funds, and in 2020 Franklin Templeton froze six schemes.',
    aliases: ['IL&FS', 'IL&FS crisis', 'NBFC crisis', 'DHFL', 'Franklin Templeton'],
    tags: ['India', 'credit risk', 'debt funds'],
    year: 2018,
    body: md`
      ## IL&FS
      Infrastructure Leasing & Financial Services funded roads, power and water projects with short-term borrowing — a maturity mismatch — while carrying an **AAA** rating. In September 2018 it defaulted; ratings were cut to junk and default within weeks. Group debt was over **₹90,000 crore**. The government superseded the board in October 2018.

      ## Contagion
      Mutual funds held IL&FS paper; NBFCs that depended on short-term funding found lenders gone. DHFL, a large housing financier, defaulted in 2019. Credit spreads widened across the market — India's own mini-2008 in the shadow banking system, and a big reason for the 2019 growth slowdown.

      ## Franklin Templeton
      In April 2020, amid COVID redemptions, Franklin Templeton India wound up **six debt schemes** holding about ₹25,000 crore, many of them in lower-rated bonds. Investors' money was locked for months; most was eventually returned over several years.

      ## Lessons
      Ratings can fail; "debt" doesn't mean safe; chasing slightly higher yields in credit-risk funds carries tail risk; and liquidity disappears exactly when everyone wants it.
    `,
  }),

  entry('yes-bank-rescue', 'example', STORIES, 'curious', 'Yes Bank Rescue (2020)', {
    summary: 'A fast-growing private bank hid bad loans until the RBI froze it in March 2020. Depositors were protected by an SBI-led rescue; ₹8,415 crore of AT1 bonds were written off to zero.',
    aliases: ['Yes Bank', 'Yes Bank rescue', 'AT1 bonds', 'AT1 bond', 'PMC Bank'],
    tags: ['India', 'banking', 'credit risk'],
    year: 2020,
    body: md`
      ## What happened
      Yes Bank grew rapidly by lending to risky corporate borrowers, several of which defaulted; bad loans were under-reported. On **5 March 2020** the RBI imposed a moratorium, capped withdrawals at ₹50,000 a month and replaced the board. Within weeks an **SBI-led** group of banks invested to recapitalise it, and the moratorium was lifted.

      ## Winners and losers
      - **Depositors**: protected in full — a run on a large bank was too dangerous to allow.
      - **AT1 bondholders**: **₹8,415 crore** written off. These perpetual bank bonds pay higher interest precisely because they absorb losses; many buyers, including retail investors sold them as "safe as an FD", learned that the hard way.
      - **Shareholders**: diluted heavily; the share price had already fallen ~90%.

      ## Context
      PMC Bank's collapse in 2019 had frozen depositors' money and pushed deposit insurance up from ₹1 lakh to ₹5 lakh. Together they're a lesson in credit risk and in reading the fine print of "bank" products.
    `,
  }),

  entry('demonetisation', 'example', STORIES, 'curious', 'Demonetisation (2016)', {
    summary: 'On 8 November 2016, ₹500 and ₹1,000 notes — 86% of currency by value — stopped being legal tender overnight. About 99% came back to banks; digital payments took off.',
    aliases: ['demonetisation', 'demonetization', 'note ban'],
    tags: ['India', 'money', 'policy'],
    year: 2016,
    body: md`
      ## The move
      At 8 pm on 8 November 2016, the Prime Minister announced that ₹500 and ₹1,000 notes would cease to be legal tender at midnight. They made up about **86%** of currency in circulation by value (~₹15.4 lakh crore). People had until the end of December to deposit them; new ₹500 and ₹2,000 notes were printed.

      ## Aims and outcomes
      - **Black money**: the hope was that illicit cash wouldn't be deposited. The RBI reported in 2018 that about **99.3%** of the demonetised value came back.
      - **Counterfeits and terror funding**: some reduction in fake notes.
      - **Digital payments**: a lasting boost; UPI, launched months earlier, grew rapidly.
      - **Economy**: months of cash shortage hit the informal sector, farmers and small traders; most estimates show a growth dip. Cash in circulation was back above pre-2016 levels within a few years.

      The ₹2,000 note itself was withdrawn in 2023.

      ## Money lesson
      Currency is a claim that works only while everyone accepts it. A decree can remove that acceptance overnight — a vivid illustration of what money is.
    `,
  }),

  entry('hyperinflation', 'example', STORIES, 'curious', 'Hyperinflation: Weimar and Zimbabwe', {
    summary: 'When a government prints money to pay its bills and trust breaks, prices can double every few days. Germany 1923, Zimbabwe 2008, Hungary 1946 — the record: prices doubling every 15 hours.',
    aliases: ['hyperinflation', 'Weimar', 'Weimar hyperinflation', 'Zimbabwe', 'Zimbabwe dollar'],
    tags: ['money', 'history', 'crises'],
    year: 1923,
    body: md`
      ## Weimar Germany, 1923
      War debts and reparations, financed by printing money, and then the French occupation of the Ruhr: by October 1923 prices rose about **29,500% a month** — doubling every **3.7 days**. In November a US dollar cost 4.2 trillion marks. Wages were paid twice a day; people rushed to spend them before lunch. Savers were wiped out, which scarred German attitudes to inflation for a century.

      ## Zimbabwe, 2008
      Land seizures collapsed farm output; the government printed money to fund spending. In November 2008 monthly inflation was estimated at **79.6 billion percent** — prices doubling every **~25 hours**. A 100-trillion-dollar note was issued. The country abandoned its own currency for the US dollar and rand in 2009.

      ## The record
      Hungary, July 1946: prices doubled roughly every **15 hours**.

      ## The common thread
      Governments that cannot borrow or tax enough, a central bank that finances them, and a collapse of confidence so that people spend money as fast as possible — which makes prices rise faster still. Money only works while people trust it.
    `,
    calc: {
      inputs: [input('m', 'Monthly inflation', '%', 29500, 1, 100000000000, LOG)],
      outputs: [
        out('Yearly inflation', '%', '((1 + m/100)^12 - 1)*100'),
        out('Prices double every', 'days', '30.4*ln(2)/ln(1 + m/100)', { digits: 3 }),
        out('Daily price rise', '%', '((1 + m/100)^(1/30.4) - 1)*100', { digits: 3 }),
      ],
      note: 'Try 29,500 (Germany, October 1923), 79.6 billion (Zimbabwe, November 2008) and 0.4 (about 5% a year).',
    },
  }),

  entry('ponzi-schemes', 'example', STORIES, 'curious', 'Ponzi Schemes: from Ponzi to Saradha', {
    summary: 'Pay old investors with new investors’ money and call it returns. It must keep growing exponentially — which is why every one of them collapses.',
    aliases: ['Ponzi scheme', 'Ponzi schemes', 'Ponzi', 'pyramid scheme', 'Madoff', 'Saradha', 'chit fund scam'],
    tags: ['fraud', 'India', 'exponential'],
    year: 1920,
    body: md`
      ## The original
      In 1920 Charles Ponzi promised Boston investors **50% in 45 days**, supposedly from arbitraging international postal reply coupons. There was no real business; early investors were paid from later ones' deposits. It collapsed within months.

      ## The arithmetic of doom
      To keep paying a promised return, the money coming in must grow at least as fast as the promises. At 50% per 45 days, that's about **27× a year**. A scheme starting with 1,000 investors would need about 20 million within three years, and more people than exist on Earth within five. Exponential growth always wins — see the calculator.

      ## Famous cases
      - **Bernard Madoff** (collapsed 2008): steady ~1% a month for decades — suspiciously smooth, a Sharpe ratio too good to be true. Paper losses around $65 billion.
      - **Saradha** (2013, West Bengal and neighbouring states): collected money from lakhs of small depositors through agents promising high returns; its collapse led to arrests and a Supreme Court-ordered CBI probe. India's Banning of Unregulated Deposit Schemes Act (2019) followed a string of such schemes.

      ## Warning signs
      Guaranteed high returns, unusually smooth returns, pressure to recruit, vague strategies, and payouts that depend on staying invested.
    `,
    calc: {
      inputs: [
        input('ret', 'Promised return per period', '%', 50, 1, 100),
        input('period', 'Period', 'days', 45, 7, 365, INT),
        input('start', 'Investors at the start', '', 1000, 1, 1000000, { ...LOG, ...INT }),
        input('years', 'Years it runs', 'years', 3, 0.5, 10),
      ],
      outputs: [
        out('Promises grow each year by', '×', '(1 + ret/100)^(365/period)', { key: 'yr', digits: 4 }),
        out('Investors needed to keep paying', '', 'start*yr^years'),
        out('That’s this many times India’s population', '×', 'start*yr^years/1.45e9', { digits: 3 }),
      ],
    },
  }),

  entry('gamestop-squeeze', 'example', STORIES, 'curious', 'GameStop Short Squeeze (2021)', {
    summary: 'Retail traders coordinating on Reddit piled into a heavily shorted video-game retailer. Short sellers were forced to buy; the stock rose about 20-fold in weeks.',
    aliases: ['GameStop', 'meme stock', 'meme stocks', 'WallStreetBets'],
    tags: ['markets', 'short selling', 'psychology'],
    year: 2021,
    body: md`
      ## Setup
      By early 2021, hedge funds had sold short more GameStop shares than were freely tradable — short interest around **140% of the float**. Retail investors on Reddit's WallStreetBets noticed, and started buying shares and short-dated call options.

      ## Squeeze
      As the price rose, short sellers faced mounting losses and bought to cover — pushing the price higher. Option market makers who had sold calls hedged by buying shares too (a "gamma squeeze", see the Greeks). The stock went from about **$17** at the start of January to a close of **$347** on 27 January and an intraday high of **$483** the next day. Melvin Capital lost more than half its value that month and needed a rescue.

      ## The twist
      On 28 January some brokers, including Robinhood, restricted buying because clearing houses demanded more collateral — and the price fell sharply. Many late buyers lost heavily.

      ## Lessons
      Short selling carries unlimited risk; crowded trades can reverse violently; and market plumbing (margins, settlement) matters as much as fundamentals in a frenzy.
    `,
  }),

  entry('covid-crash-2020', 'example', STORIES, 'curious', 'The COVID Crash (March 2020)', {
    summary: 'The Nifty fell 38% in about ten weeks — including a 13% fall in a single day — then regained its highs within the year. A masterclass in panic, policy response and why not to sell at the bottom.',
    aliases: ['COVID crash', 'March 2020 crash', 'pandemic crash'],
    tags: ['crashes', 'India', 'psychology'],
    year: 2020,
    body: md`
      ## The fall
      From its January 2020 high near 12,360, the Nifty fell to about **7,610** on 23 March 2020 — about **−38%**. That day alone it fell **13%**, and trading was halted twice that month by market-wide circuit breakers. Debt markets seized up too (Franklin Templeton's freeze came weeks later).

      ## The response
      The RBI cut the repo rate to 4% and flooded banks with liquidity; the Fed and others did the same on a vast scale, with QE and fiscal support.

      ## The rebound
      The Nifty passed its pre-COVID high by November 2020 and kept rising through 2021. Anyone who sold in March locked in the loss; anyone whose SIP kept running bought units at the lows. Indian demat accounts more than doubled within two years as new investors arrived.

      ## Lessons
      Volatility clusters (the 13% day), the best rebound days sit right next to the worst days (market timing), and an emergency fund is what lets you avoid selling at the bottom.
    `,
  }),

  entry('svb-collapse', 'example', STORIES, 'curious', 'Silicon Valley Bank (2023)', {
    summary: 'A bank that parked deposits in long-dated “safe” bonds was sunk by rising interest rates and a 24-hour digital bank run. Duration risk, not credit risk, did it.',
    aliases: ['Silicon Valley Bank', 'SVB', 'SVB collapse'],
    tags: ['banking', 'interest rates', 'crises'],
    year: 2023,
    body: md`
      ## The mismatch
      During 2020–21, tech start-ups deposited floods of cash at SVB. It invested much of it in US Treasuries and mortgage bonds with long maturities, at yields of ~1.5%. No credit risk — but a lot of **duration**.

      ## Rates rise
      As the Fed raised rates from near zero to about 5% in 2022–23, those bonds lost value: by the end of 2022, SVB's unrealised losses on bonds it planned to hold to maturity were around **$15 billion** — roughly its entire equity. Meanwhile start-ups, now short of funding, were withdrawing deposits.

      ## The run
      On 8 March 2023 SVB announced a loss on selling bonds and a plan to raise capital. Venture investors told their companies to pull money; on 9 March customers requested about **$42 billion** — a quarter of deposits — mostly by phone app. Most deposits were above the insurance limit. Regulators closed the bank on 10 March and, to stop contagion, guaranteed all its deposits.

      ## Lessons
      "Safe" bonds aren't safe at the wrong duration; uninsured depositors run first and fast; and a bank's health depends on the maturity match between what it owes and what it owns (bank runs).
    `,
    calc: {
      inputs: [
        input('hold', 'Bond holdings', 'billion $', 120, 1, 1000, LOG),
        input('dur', 'Duration', 'years', 6, 0.5, 20),
        input('rise', 'Rise in yields', 'percentage points', 3, 0, 8),
        input('eq', 'Bank’s equity', 'billion $', 16, 0.5, 200, LOG),
      ],
      outputs: [
        out('Loss on the bonds (duration estimate)', 'billion $', 'hold*dur*rise/100', { key: 'loss', digits: 3 }),
        out('Loss as a share of equity', '%', 'loss/eq*100', { digits: 3 }),
      ],
      note: 'Rough SVB-like numbers. The linear duration rule slightly overstates losses for big moves (convexity).',
    },
  }),
];
