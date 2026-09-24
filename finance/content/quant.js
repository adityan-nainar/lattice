// Quant & Mathematical Finance: randomness, options, betting and tails — the part of finance
// that grew out of physics (Brownian motion, diffusion, statistical mechanics).

import { AREA, entry, input, INT, LOG, md, out } from './helpers.js';

const { QUANT } = AREA;

export const QUANT_ENTRIES = [
  entry('random-walk', 'concept', QUANT, 'curious', 'Random Walk', {
    summary: 'A path built from independent random steps. The typical distance from the start grows like the square root of the number of steps — the root of the √t rule for risk.',
    aliases: ['random walk', 'random walks', 'drunkard’s walk', 'random-walk'],
    tags: ['probability', 'physics bridge'],
    year: 1905,
    latex: md`X_N = \sum_{k=1}^{N} \varepsilon_k, \qquad \sqrt{\mathbb{E}[X_N^2]} = s\sqrt{N}`,
    variables: [
      [md`\varepsilon_k`, 'Independent steps of size ±s'],
      ['N', 'Number of steps'],
    ],
    body: md`
      ## The √N law
      Flip a coin 100 times, stepping +1 or −1. You don't end up ~0; you typically end up about **10** steps from the start ($\sqrt{100}$). After 10,000 flips, about 100 away. Distance grows, but only like the square root of time, because steps partly cancel.

      ## In markets
      If daily returns are independent with 1% spread, a year of 252 trading days gives about $1\% \times \sqrt{252} \approx 16\%$ — which is why volatility is quoted "annualised" by multiplying by $\sqrt{252}$, and why risk grows more slowly than expected return over long horizons.

      ## Where the name comes from
      Karl Pearson posed "the problem of the random walk" in *Nature* in 1905 — the same year Einstein explained Brownian motion as a random walk of molecular kicks. Five years *earlier*, Louis Bachelier had already used one to model the Paris bourse. The idea that stock prices wander unpredictably is the heart of the efficient market hypothesis.
    `,
    calc: {
      inputs: [
        input('N', 'Number of steps', 'steps', 252, 1, 100000, { ...LOG, ...INT }),
        input('s', 'Size of each step', '%', 1, 0.1, 5),
      ],
      outputs: [
        out('Typical (root-mean-square) distance', '%', 's*sqrt(N)', { digits: 3 }),
        out('Average absolute distance', '%', 's*sqrt(2*N/pi)', { digits: 3 }),
        out('Chance of ending more than 2 typical distances away', '%', '2*ncdf(-2)*100', { digits: 3 }),
      ],
      note: '252 steps of 1% is a trading year of daily moves: about 16%.',
    },
  }),

  entry('brownian-motion', 'concept', QUANT, 'curious', 'Brownian Motion', {
    summary: 'The continuous-time limit of a random walk. Bachelier used it for stock prices in 1900 — five years before Einstein used it to prove atoms exist.',
    aliases: ['Brownian motion', 'Wiener process', 'Bachelier', 'diffusion'],
    tags: ['stochastic processes', 'physics bridge', 'history'],
    year: 1900,
    latex: md`W_t \sim \mathcal{N}(0,\, t), \qquad W_{t+s} - W_t \ \text{independent of the past}, \qquad (dW)^2 = dt`,
    variables: [
      [md`W_t`, 'Position of the Brownian path at time t, starting at 0'],
      [md`\mathcal{N}(0, t)`, 'Normal distribution with mean 0 and variance t'],
    ],
    body: md`
      ## Two discoveries of one idea
      - **1900**: Louis Bachelier's PhD thesis *Théorie de la spéculation* modelled French government bond options with a random walk in continuous time, derived what is essentially the heat equation for prices, and priced options. His examiners (including Poincaré) were polite; finance ignored it for 50 years.
      - **1905**: Einstein explained pollen grains jittering in water as kicks from invisible molecules, predicting that their spread grows like $\sqrt{t}$. Perrin's measurements (1908) confirmed it — decisive evidence that atoms are real.

      Same mathematics: a quantity nudged by countless tiny independent shocks spreads out like $\sqrt{t}$ and obeys the **diffusion (heat) equation**.

      ## Strange properties
      A Brownian path is continuous but nowhere smooth — zoom in and it's as jagged as ever. Its squared increments add up to elapsed time, $(dW)^2 = dt$, which is why ordinary calculus fails and Itô's calculus is needed.

      ## The finance fix
      Prices can't go negative, but Brownian motion can. So finance uses geometric Brownian motion — random *percentage* moves — where the log of the price is Brownian.
    `,
  }),

  entry('log-returns', 'equation', QUANT, 'curious', 'Log Returns', {
    summary: 'Returns measured as ln(new/old). They add across time, are symmetric for ups and downs, and are what quant models assume are normally distributed.',
    aliases: ['log return', 'log returns', 'logarithmic return', 'continuously compounded return'],
    tags: ['returns', 'measurement'],
    latex: md`r_{\log} = \ln\frac{S_1}{S_0}, \qquad r_{\log} = \ln(1 + r_{\text{simple}})`,
    variables: [
      [md`S_0, S_1`, 'Price before and after'],
      [md`r_{\text{simple}}`, 'Ordinary percentage return'],
    ],
    body: md`
      ## Why bother
      Simple returns don't add: +10% then −10% leaves you at 0.99, down 1%. Log returns do: $\ln 1.1 + \ln 0.9 = 0.0953 - 0.1054 = -0.0101$ — exactly the −1% (in log terms) you ended with.

      - A year's log return is the **sum** of its daily log returns, so the central limit theorem applies to the sum.
      - A fall to zero is $-\infty$ in log terms, so a normal model for log returns never produces negative prices — the lognormal model.
      - For small moves, log and simple returns are nearly equal ($\ln(1.01) = 0.00995$).

      ## A trap
      The average of log returns gives the **geometric** (compound) growth rate; the average of simple returns gives the **arithmetic** one. The gap between them is volatility drag.
    `,
  }),

  entry('volatility', 'equation', QUANT, 'curious', 'Volatility', {
    summary: 'The standard deviation of returns, usually annualised with the √time rule. Nifty’s is typically 12–20% a year; India VIX measures what options markets expect next.',
    aliases: ['volatility', 'volatile', 'annualised volatility', 'annualized volatility', 'India VIX', 'VIX', 'fear index', 'realised volatility'],
    tags: ['risk', 'measurement'],
    latex: md`\sigma_{\text{year}} = \sigma_{\text{day}}\,\sqrt{252}`,
    variables: [
      [md`\sigma_{\text{day}}`, 'Standard deviation of daily returns'],
      ['252', 'Trading days in a year'],
    ],
    body: md`
      ## Scaling with √time
      If daily returns were independent, variance would add across days, so spread grows with $\sqrt{t}$: a 1% daily volatility is about 16% a year; 2% daily is about 32%.

      ## Typical numbers
      - Nifty 50: ~12–20% a year in calm periods, 40%+ in crises (2008, March 2020).
      - A single mid-cap stock: 30–50%.
      - A liquid fund: well under 1%.

      ## India VIX
      Computed by the NSE from Nifty option prices: the market's forecast of volatility over the next 30 days, in annual terms (it's **implied** volatility, not measured history). Below ~12 is calm; above 25 is fear. Divide by $\sqrt{252}$ for the implied typical daily move.

      ## What volatility isn't
      It isn't the chance of permanent loss, and it assumes a bell curve. Volatility itself changes (it **clusters**), and fat tails mean the extreme days are far more common than σ suggests.
    `,
    calc: {
      inputs: [
        input('sd', 'Daily volatility', '%', 1, 0.1, 6),
        input('mu', 'Expected yearly return', '%', 12, -10, 30),
        input('vix', 'India VIX reading', '', 14, 5, 90),
      ],
      outputs: [
        out('Annual volatility', '% a year', 'sd*sqrt(252)', { key: 'ann', digits: 3 }),
        out('Monthly volatility', '%', 'sd*sqrt(21)', { digits: 3 }),
        out('Two years in three land between (low)', '%', 'mu - ann', { digits: 3 }),
        out('… and (high)', '%', 'mu + ann', { digits: 3 }),
        out('VIX implies a typical daily move of', '%', 'vix/sqrt(252)', { digits: 3 }),
      ],
    },
  }),

  entry('volatility-drag', 'equation', QUANT, 'curious', 'Volatility Drag', {
    summary: 'Ups and downs cost you even when the average return is fine: +50% then −50% leaves you 25% poorer. Compound growth ≈ average return − σ²/2.',
    aliases: ['volatility drag', 'variance drag', 'variance drain', 'geometric mean', 'arithmetic mean', 'geometric average'],
    tags: ['returns', 'risk', 'compounding'],
    latex: md`g \approx \mu - \frac{\sigma^2}{2}`,
    variables: [
      ['g', 'Geometric (compound) growth rate — what your wealth actually does'],
      [md`\mu`, 'Arithmetic average of the yearly returns'],
      [md`\sigma`, 'Volatility of yearly returns'],
    ],
    body: md`
      ## The simplest example
      +50% then −50%: average return 0%, but ₹100 → ₹150 → ₹75. Losses and gains aren't symmetric: a 50% fall needs a 100% rise to recover.

      ## The formula
      For returns with mean $\mu$ and volatility $\sigma$, compound growth is about $\mu - \sigma^2/2$. An asset averaging 12% with 20% volatility compounds at about **10%**; one averaging 12% with 40% volatility compounds at only **4%** — even though "average returns" are identical.

      ## Consequences
      - Leveraged ETFs (2× or 3× daily) decay in choppy markets.
      - Reducing volatility (diversification, rebalancing) can *raise* long-run wealth without raising average returns.
      - Fund brochures quoting "average returns" flatter; CAGR is the honest number.
      - It's the same gap as between ensemble and time averages in ergodicity economics, and the reason Itô's lemma gives $\ln S$ a drift of $\mu - \sigma^2/2$.
    `,
    calc: {
      inputs: [
        input('mu', 'Average yearly return', '%', 12, -10, 40),
        input('sig', 'Volatility', '% a year', 20, 0, 80),
        input('years', 'Years', 'years', 20, 1, 50, INT),
      ],
      outputs: [
        out('Compound growth rate (approx.)', '% a year', 'mu - sig^2/200', { key: 'g', digits: 3 }),
        out('₹1 lakh at the average return', '₹', '100000*(1 + mu/100)^years'),
        out('₹1 lakh at the compound rate — what you’d typically get', '₹', '100000*(1 + g/100)^years'),
      ],
    },
  }),

  entry('lognormal', 'concept', QUANT, 'curious', 'Lognormal Prices', {
    summary: 'If log returns are normal, prices are lognormal: never negative, skewed to the right, with a long tail of big winners and a median below the mean.',
    aliases: ['lognormal', 'log-normal', 'lognormal distribution'],
    tags: ['probability', 'models'],
    body: md`
      ## Shape
      A price $S_T = S_0 e^{X}$ with $X$ normal can't go below zero, but has a long right tail: a stock can fall at most 100% but rise 1,000%.

      ## Mean vs median
      Because of that tail, the **mean** outcome is above the **median**: $\text{mean} = \text{median} \times e^{\sigma^2 T/2}$. Most individual investors (and most stocks) end up below the average — a few huge winners drag the mean up. Studies of stock markets find that a small fraction of companies account for most of all wealth created.

      ## Where it's used
      Black–Scholes assumes lognormal prices. Reality has fatter tails, especially on the downside, which the volatility smile reveals.
    `,
  }),

  entry('geometric-brownian-motion', 'equation', QUANT, 'curious', 'Geometric Brownian Motion', {
    summary: 'The standard model of a stock price: a steady percentage drift plus random percentage shocks. Its log is a Brownian motion with drift μ − σ²/2.',
    aliases: ['geometric Brownian motion', 'GBM'],
    tags: ['stochastic processes', 'models'],
    year: 1965,
    latex: md`dS_t = \mu\, S_t\, dt + \sigma\, S_t\, dW_t \quad\Longrightarrow\quad S_t = S_0\, e^{(\mu - \sigma^2/2)t + \sigma W_t}`,
    variables: [
      [md`\mu`, 'Drift: expected return per year'],
      [md`\sigma`, 'Volatility per year'],
      [md`W_t`, 'Brownian motion'],
    ],
    body: md`
      ## What it says
      Over a short time $dt$, the percentage change is $\mu\,dt$ plus a random shock of size $\sigma\sqrt{dt}$. Paul Samuelson proposed it (1965) to fix Bachelier's model, which allowed negative prices.

      ## The solution
      Solving it needs Itô's lemma, and produces a surprise: the log-price drifts at $\mu - \sigma^2/2$, not $\mu$. The **expected** price grows at $\mu$, but the **typical** (median) path grows more slowly — volatility drag, built into the model.

      ## Limits
      Real prices jump, volatility changes over time and clusters, and tails are fat. GBM is the starting point of Black–Scholes, not the last word.
    `,
  }),

  entry('ito-lemma', 'equation', QUANT, 'curious', 'Itô’s Lemma', {
    summary: 'The chain rule for random processes. Because (dW)² = dt, a second-derivative term survives that ordinary calculus would throw away.',
    aliases: ['Itô’s lemma', "Ito's lemma", 'Itô calculus', 'Ito calculus', 'stochastic calculus', 'stochastic differential equation'],
    tags: ['stochastic processes', 'maths'],
    year: 1951,
    latex: md`df(S,t) = \left(\frac{\partial f}{\partial t} + \mu S\frac{\partial f}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 f}{\partial S^2}\right)dt + \sigma S \frac{\partial f}{\partial S}\, dW`,
    variables: [
      ['f(S, t)', 'Any smooth function of the price and time — for example an option’s value'],
      [md`\tfrac12\sigma^2 S^2 f_{SS}`, 'The Itô term: curvature times variance'],
    ],
    body: md`
      ## Why ordinary calculus fails
      In a Taylor expansion, $df = f_S\,dS + \tfrac12 f_{SS}\,(dS)^2 + \dots$ The $(dS)^2$ term is normally negligible. But for Brownian motion, $(dW)^2 = dt$ — the same size as the drift term — so it can't be dropped.

      ## Quick use: why log prices drift at μ − σ²/2
      Take $f = \ln S$: $f_S = 1/S$, $f_{SS} = -1/S^2$. Itô gives $d\ln S = (\mu - \tfrac12\sigma^2)\,dt + \sigma\,dW$. The $-\sigma^2/2$ is volatility drag appearing from pure calculus.

      ## Where it leads
      Apply it to an option's value $V(S,t)$, build a portfolio that cancels the $dW$ term (delta hedging), and the Black–Scholes equation falls out. Kiyosi Itô developed this calculus in the 1940s (the lemma in 1951) as pure mathematics; he later won the first Gauss Prize (2006) as its reach into finance and physics became clear.
    `,
  }),

  entry('options', 'concept', QUANT, 'curious', 'Options: Calls and Puts', {
    summary: 'A call is the right, not the obligation, to buy at a fixed strike price; a put, the right to sell. Small premium, lopsided payoff — insurance or a lottery ticket depending on who’s holding it.',
    aliases: ['call option', 'call options', 'put option', 'put options', 'calls and puts', 'strike price', 'option premium', 'options trading', 'option buyer', 'option seller', 'in the money', 'out of the money'],
    tags: ['derivatives', 'basics'],
    body: md`
      ## Payoffs at expiry
      - **Call** with strike $K$: worth $\max(S - K, 0)$. Profitable if the price ends well above $K$.
      - **Put** with strike $K$: worth $\max(K - S, 0)$. Insurance against a fall.
      The buyer pays a **premium** up front and can lose at most that. The **seller** (writer) collects it and takes the other side — for a naked call, an unlimited risk.

      ## Why they're priced the way they are
      An option is worth more when:
      - the price is closer to (or beyond) the strike;
      - more **time** remains;
      - **volatility** is higher — more chance of a big move, and the downside is capped.
      Black–Scholes turns this into a formula.

      ## In India
      Nifty and Bank Nifty options are among the most traded derivatives contracts in the world by number. Most retail trading is in short-dated, out-of-the-money options — cheap lottery tickets that usually expire worthless. SEBI's studies found about **9 in 10** individual F&O traders lose money.
    `,
  }),

  entry('put-call-parity', 'equation', QUANT, 'curious', 'Put–Call Parity', {
    summary: 'A call minus a put with the same strike equals owning the stock minus a loan. If prices break this identity, there is free money — so they don’t, for long.',
    aliases: ['put-call parity', 'put–call parity', 'synthetic position'],
    tags: ['derivatives', 'arbitrage'],
    year: 1969,
    latex: md`C - P = S - K\,e^{-rT}`,
    variables: [
      ['C, P', 'Prices of a European call and put with the same strike and expiry'],
      ['S', 'Current price of the underlying'],
      [md`K e^{-rT}`, 'Present value of the strike'],
    ],
    body: md`
      ## Why it must hold
      Buy a call, sell a put (same strike $K$, same expiry). At expiry you'll own the stock for $K$ whatever happens: if it's above $K$ you exercise the call; below, the put is exercised on you. That's the same as holding the stock today and owing $K$ at expiry. Two portfolios with identical payoffs must cost the same — the **law of one price**.

      ## Arbitrage check
      If $C - P$ is bigger than $S - Ke^{-rT}$, sell the call, buy the put, buy the stock, borrow: a riskless profit. Traders do exactly this, which keeps parity within transaction costs.

      ## Uses
      Build **synthetic** positions (a synthetic long stock is a long call + short put), check option quotes for errors, and read the market's implied interest rate or dividend. It needs no model of how prices move — only the absence of free money.
    `,
    calc: {
      inputs: [
        input('C', 'Call price', '₹', 469, 0, 5000),
        input('P', 'Put price', '₹', 336, 0, 5000),
        input('S', 'Index level', '₹', 25000, 1000, 100000, LOG),
        input('K', 'Strike', '₹', 25000, 1000, 100000, LOG),
        input('r', 'Interest rate', '% a year', 6.5, 0, 15),
        input('days', 'Days to expiry', 'days', 30, 1, 365, INT),
      ],
      outputs: [
        out('Put implied by the call', '₹', 'C - S + K*exp(-r/100*days/365)'),
        out('Parity gap (C − P) − (S − K e^−rT)', '₹', 'C - P - (S - K*exp(-r/100*days/365))'),
      ],
      note: 'A gap bigger than trading costs is an arbitrage. Index values are shown in ₹ because Nifty options settle at ₹1 a point, times the lot size.',
    },
  }),

  entry('no-arbitrage', 'concept', QUANT, 'curious', 'No-Arbitrage and the Law of One Price', {
    summary: 'Two things with identical future payoffs must cost the same today, or traders would get something for nothing. Most of derivatives pricing follows from this one rule.',
    aliases: ['arbitrage', 'no-arbitrage', 'law of one price', 'arbitrageur', 'arbitrageurs', 'free lunch'],
    tags: ['theory', 'derivatives'],
    body: md`
      ## The principle
      If you can buy something for ₹100 in one place and sell an identical thing for ₹101 elsewhere at the same moment, arbitrageurs will do it until the gap closes. No arbitrage means no riskless profit without investment.

      ## How much follows
      - Futures prices: stock plus cost of carrying it.
      - Put–call parity.
      - Option prices via **replication**: build a portfolio of stock and borrowing that copies the option; the option must cost what the portfolio costs (binomial model, Black–Scholes).
      - Covered interest parity in currency forwards.

      ## Limits
      Real arbitrage needs capital and carries risk: prices can diverge further before converging (LTCM's trades were "arbitrages" that ruined it). Shleifer and Vishny called these the **limits of arbitrage** — one reason mispricings described by behavioural finance can last.
    `,
  }),

  entry('binomial-model', 'equation', QUANT, 'curious', 'Binomial Option Pricing', {
    summary: 'Let the price move up or down one step, copy the option with stock and borrowing, and its price falls out — without needing anyone’s guess of the real odds.',
    aliases: ['binomial model', 'binomial tree', 'Cox–Ross–Rubinstein', 'replicating portfolio', 'replication'],
    tags: ['derivatives', 'models'],
    year: 1979,
    latex: md`C = \frac{p\,C_u + (1-p)\,C_d}{1 + r}, \qquad p = \frac{(1 + r) - d}{u - d}, \qquad \Delta = \frac{C_u - C_d}{S(u - d)}`,
    variables: [
      ['u, d', 'Up and down factors for the price over one step'],
      ['r', 'Risk-free rate per step'],
      [md`C_u, C_d`, 'Option value after an up or a down move'],
      ['p', 'Risk-neutral probability — not the real chance of an up-move'],
      [md`\Delta`, 'Shares held in the replicating portfolio (the hedge ratio)'],
    ],
    body: md`
      ## One step, by hand
      A stock at ₹100 goes to ₹120 or ₹85; the rate is 5% per step; a call has strike ₹100, so it pays ₹20 or ₹0.
      - Hold $\Delta = 20/35 = 0.571$ shares and borrow ₹46.26: the portfolio pays exactly ₹20 or ₹0, like the call.
      - It costs 0.571 × ₹100 − ₹46.26 = ₹10.88. So must the call.

      Nobody asked how *likely* the up-move was. Whether you think it's 90% or 10%, the price is ₹10.88 — otherwise there's an arbitrage.

      ## Risk-neutral probability
      The same answer comes from pretending the up-move has probability $p = (1.05 - 0.85)/(1.2 - 0.85) = 0.571$ and discounting at the risk-free rate. That's risk-neutral pricing.

      ## Many steps
      Cox, Ross and Rubinstein (1979) chained steps into a tree. With many small steps it converges to Black–Scholes, and it handles American options (early exercise) easily.
    `,
    calc: {
      inputs: [
        input('S', 'Stock price', '₹', 100, 1, 10000, LOG),
        input('up', 'Up move', '%', 20, 1, 100),
        input('dn', 'Down move', '%', 15, 1, 90),
        input('rp', 'Risk-free rate per step', '%', 5, 0, 20),
        input('K', 'Strike', '₹', 100, 1, 10000, LOG),
      ],
      outputs: [
        out('Risk-neutral probability of up', '', '((1 + rp/100) - (1 - dn/100))/((1 + up/100) - (1 - dn/100))', { key: 'p', digits: 4 }),
        out('Call pays after up', '₹', 'max(0, S*(1 + up/100) - K)', { key: 'Cu' }),
        out('Call pays after down', '₹', 'max(0, S*(1 - dn/100) - K)', { key: 'Cd' }),
        out('Hedge ratio Δ (shares)', '', '(Cu - Cd)/(S*(up/100 + dn/100))', { key: 'delta', digits: 4 }),
        out('Borrow', '₹', '-((1 + up/100)*Cd - (1 - dn/100)*Cu)/((up/100 + dn/100)*(1 + rp/100))', { key: 'borrow' }),
        out('Call price (replication)', '₹', 'delta*S - borrow'),
        out('Call price (risk-neutral)', '₹', '(p*Cu + (1 - p)*Cd)/(1 + rp/100)'),
      ],
      note: 'The two prices always agree. If the risk-free rate is above the up move or below the down move, p leaves 0–1: that market has an arbitrage.',
    },
  }),

  entry('risk-neutral-pricing', 'concept', QUANT, 'curious', 'Risk-Neutral Pricing', {
    summary: 'Price a derivative as its expected payoff under made-up probabilities where everything earns the risk-free rate, then discount. It works because hedging removes risk preferences.',
    aliases: ['risk-neutral', 'risk-neutral pricing', 'risk-neutral measure', 'risk-neutral probability', 'martingale measure'],
    tags: ['theory', 'derivatives'],
    body: md`
      ## The trick
      Because an option can be replicated with stock and borrowing, its price can't depend on investors' attitudes to risk. So compute it in an imaginary world where everyone is **risk-neutral**: every asset is expected to earn the risk-free rate $r$. Then
      $$V_0 = e^{-rT}\,\mathbb{E}^{\mathbb{Q}}[\text{payoff}]$$
      where $\mathbb{Q}$ is the risk-neutral measure.

      ## What it is not
      $\mathbb{Q}$-probabilities aren't forecasts. The risk-neutral chance that a Nifty call finishes in the money ($N(d_2)$ in Black–Scholes) is a pricing device; the real-world chance is different.

      ## Deeper
      Under $\mathbb{Q}$, discounted prices are martingales — "fair games". The *fundamental theorem of asset pricing* says: no arbitrage ⇔ such a measure exists. Pricing becomes a question of computing expectations, which is where Monte Carlo methods and the Feynman–Kac link to physics come in.
    `,
  }),

  entry('black-scholes', 'equation', QUANT, 'curious', 'Black–Scholes Formula', {
    summary: 'The 1973 formula for a European option’s price from five inputs: price, strike, time, rate and volatility. Only volatility isn’t directly observable.',
    aliases: ['Black–Scholes', 'Black-Scholes', 'Black–Scholes–Merton', 'Black–Scholes formula', 'Black–Scholes model', 'Black–Scholes equation'],
    tags: ['derivatives', 'models', 'Nobel'],
    year: 1973,
    latex: md`C = S\,N(d_1) - K e^{-rT} N(d_2), \qquad d_{1,2} = \frac{\ln(S/K) + \left(r \pm \tfrac12\sigma^2\right)T}{\sigma\sqrt{T}}`,
    variables: [
      ['C', 'Price of a European call'],
      ['S', 'Current price of the underlying'],
      ['K', 'Strike price'],
      ['T', 'Time to expiry, in years'],
      ['r', 'Risk-free interest rate (continuous)'],
      [md`\sigma`, 'Volatility of the underlying'],
      [md`N(\cdot)`, 'Standard normal cumulative distribution'],
    ],
    body: md`
      ## The idea
      Fischer Black, Myron Scholes and Robert Merton (1973) showed that an option can be hedged continuously with the underlying so that the combined position is riskless. A riskless position must earn the risk-free rate — which pins down a partial differential equation, whose solution is the formula above. Scholes and Merton shared the 1997 Nobel (Black had died in 1995).

      ## Reading it
      - $N(d_1)$ is the option's **delta**: how many shares hedge it.
      - $N(d_2)$ is the **risk-neutral** probability that the call finishes in the money.
      - The expected return of the stock, $\mu$, appears nowhere — hedging removed it.

      ## The equation is physics
      Change variables and the Black–Scholes equation becomes the **heat equation** — option values diffuse backwards in time like heat through a rod.

      ## What's wrong with it
      Constant volatility, lognormal prices, no jumps, frictionless continuous hedging. Markets know this: they quote options by the $\sigma$ that makes the formula fit — **implied volatility** — and that σ differs by strike (the smile). The formula survives as a common language, not as the truth.
    `,
    calc: {
      inputs: [
        input('S', 'Index level', '₹', 25000, 1000, 100000, LOG),
        input('K', 'Strike', '₹', 25000, 1000, 100000, LOG),
        input('days', 'Days to expiry', 'days', 30, 1, 730, { ...LOG, ...INT }),
        input('vol', 'Volatility', '% a year', 14, 2, 100),
        input('r', 'Risk-free rate', '% a year', 6.5, 0, 15),
      ],
      outputs: [
        out('d₁', '', '(ln(S/K) + (r/100 + (vol/100)^2/2)*days/365)/(vol/100*sqrt(days/365))', { key: 'd1', digits: 4 }),
        out('d₂', '', 'd1 - vol/100*sqrt(days/365)', { key: 'd2', digits: 4 }),
        out('Call price', '₹', 'S*ncdf(d1) - K*exp(-r/100*days/365)*ncdf(d2)'),
        out('Put price', '₹', 'K*exp(-r/100*days/365)*ncdf(-d2) - S*ncdf(-d1)'),
        out('Call delta N(d₁)', '', 'ncdf(d1)', { digits: 4 }),
        out('Risk-neutral chance the call ends in the money', '%', 'ncdf(d2)*100', { digits: 3 }),
      ],
      note: 'Nifty-like defaults: at-the-money, one month, 14% volatility. Double the volatility and the price roughly doubles.',
    },
  }),

  entry('black-scholes-heat', 'concept', QUANT, 'curious', 'Black–Scholes is the Heat Equation', {
    summary: 'A change of variables turns the Black–Scholes equation into the equation for heat spreading through a rod. Option value diffuses backwards from expiry like heat.',
    aliases: ['heat equation', 'diffusion equation', 'Feynman–Kac', 'Feynman-Kac'],
    tags: ['physics bridge', 'derivatives', 'PDEs'],
    latex: md`\frac{\partial V}{\partial t} + \tfrac12\sigma^2 S^2\frac{\partial^2 V}{\partial S^2} + rS\frac{\partial V}{\partial S} - rV = 0 \;\;\xrightarrow{\;x = \ln S,\ \tau = T - t,\ \dots\;}\;\; \frac{\partial u}{\partial \tau} = \frac{\partial^2 u}{\partial x^2}`,
    variables: [
      ['V(S, t)', 'Option value'],
      [md`u(x, \tau)`, 'Rescaled option value, as a function of log-price and time left'],
    ],
    body: md`
      ## The transformation
      Use log-price $x = \ln S$ and time-to-expiry $\tau$; factor out a discounting-and-drift exponential. The Black–Scholes PDE becomes $u_\tau = u_{xx}$ — Fourier's 1822 heat equation. The option's payoff at expiry is the initial temperature profile; its value today is how that profile has spread out.

      ## Why it's not a coincidence
      Both describe **diffusion**: heat is molecules random-walking; prices (in log terms) random-walk too. Bachelier had written down essentially this equation for prices in 1900, before physicists had it for Brownian motion.

      ## Feynman–Kac
      The deeper link: the solution of such a PDE equals an **expected value over random paths** — the risk-neutral price is an average over Brownian paths, the same way Feynman's path integral averages over particle histories. Pricing by PDE and pricing by Monte Carlo simulation are two faces of one theorem.

      ## A physicist's intuition
      At-the-money options are like the hottest point of the rod: time smooths the kink in the payoff, which is exactly why time value is highest there.
    `,
  }),

  entry('greeks', 'concept', QUANT, 'curious', 'The Greeks', {
    summary: 'How an option’s price responds to each input: delta (price), gamma (delta’s change), theta (time), vega (volatility). Traders manage risk by managing Greeks.',
    aliases: ['Greeks', 'option Greeks', 'delta', 'gamma', 'theta', 'vega', 'delta hedging', 'time decay'],
    tags: ['derivatives', 'risk'],
    latex: md`\Delta = \frac{\partial V}{\partial S},\quad \Gamma = \frac{\partial^2 V}{\partial S^2},\quad \Theta = \frac{\partial V}{\partial t},\quad \nu = \frac{\partial V}{\partial \sigma}`,
    variables: [
      [md`\Delta`, 'Delta: change in option price per ₹1 move in the underlying'],
      [md`\Gamma`, 'Gamma: how fast delta changes'],
      [md`\Theta`, 'Theta: value lost per day as expiry nears'],
      [md`\nu`, 'Vega: change per 1 point of volatility'],
    ],
    body: md`
      ## What each one tells you
      - **Delta**: an at-the-money call has delta ≈ 0.5 — it moves about half as much as the index. It's also the hedge ratio.
      - **Gamma**: largest at the money near expiry — why short-dated options swing so violently, and why option *sellers* get hurt by big moves.
      - **Theta**: options lose value every day, fastest in the last weeks. Buyers bleed theta; sellers collect it — until a big move arrives.
      - **Vega**: buying options is buying volatility. After an event (results, elections), implied volatility collapses and options can lose value even if the price moved your way ("IV crush").

      ## The trade-off
      Gamma and theta are two sides of one coin. For a delta-hedged option, Black–Scholes says $\Theta + \tfrac12\sigma^2 S^2\Gamma = r(V - S\Delta)$, a small number — so $\Theta \approx -\tfrac12\sigma^2S^2\Gamma$: you're paid time decay to bear gamma risk, or you pay it to own gamma.
    `,
    calc: {
      inputs: [
        input('S', 'Index level', '₹', 25000, 1000, 100000, LOG),
        input('K', 'Strike', '₹', 25000, 1000, 100000, LOG),
        input('days', 'Days to expiry', 'days', 30, 1, 730, { ...LOG, ...INT }),
        input('vol', 'Volatility', '% a year', 14, 2, 100),
        input('r', 'Risk-free rate', '% a year', 6.5, 0, 15),
      ],
      outputs: [
        out('d₁', '', '(ln(S/K) + (r/100 + (vol/100)^2/2)*days/365)/(vol/100*sqrt(days/365))', { key: 'd1', digits: 4 }),
        out('Call delta', '', 'ncdf(d1)', { digits: 4 }),
        out('Put delta', '', 'ncdf(d1) - 1', { digits: 4 }),
        out('Gamma (delta change per 100 points)', '', '100*npdf(d1)/(S*vol/100*sqrt(days/365))', { digits: 4 }),
        out('Vega (per 1 point of volatility)', '₹', 'S*npdf(d1)*sqrt(days/365)/100'),
        out('Call theta (per day)', '₹', '(-S*npdf(d1)*(vol/100)/(2*sqrt(days/365)) - r/100*K*exp(-r/100*days/365)*ncdf(d1 - vol/100*sqrt(days/365)))/365'),
      ],
      note: 'Shrink the days to expiry and watch gamma and theta grow at the money.',
    },
  }),

  entry('implied-volatility', 'concept', QUANT, 'curious', 'Implied Volatility and the Smile', {
    summary: 'The volatility that makes Black–Scholes match a market price. It differs by strike — downside puts are dearer — revealing that markets expect fatter tails than the model.',
    aliases: ['implied volatility', 'volatility smile', 'volatility skew', 'IV crush', 'volatility surface'],
    tags: ['derivatives', 'markets'],
    year: 1987,
    body: md`
      ## Running the formula backwards
      Price, strike, time and rate are observable; volatility isn't. So traders ask: *what σ makes Black–Scholes give today's market price?* That's **implied volatility** — the market's price of uncertainty. India VIX is built from Nifty options' implied volatilities.

      ## The smile
      If Black–Scholes were right, all strikes would imply the same σ. Before 1987 they roughly did. After the Black Monday crash (−22.6% in one day), out-of-the-money **puts** have traded at much higher implied volatility than calls: a **skew**. Markets learned that crashes are far likelier than a lognormal model allows — fat tails priced in.

      ## Using it
      - High IV = expensive options; sellers like it, buyers pay up.
      - Before events (budgets, results, elections) IV rises; afterwards it collapses ("IV crush").
      - Implied vs later realised volatility: implied is usually a bit higher on average — the insurance premium option sellers collect (and occasionally pay back all at once).
    `,
  }),

  entry('futures-forwards', 'equation', QUANT, 'curious', 'Futures and Forwards', {
    summary: 'Agreements to buy or sell later at a price fixed today. Their fair price is the spot price plus the cost of carrying it until then.',
    aliases: ['futures', 'futures contract', 'futures contracts', 'forward contract', 'forward contracts', 'derivatives market', 'F&O', 'cost of carry', 'mark-to-market'],
    tags: ['derivatives', 'arbitrage'],
    latex: md`F = S\,e^{(r - q)T}`,
    variables: [
      ['F', 'Fair futures price'],
      ['S', 'Spot price today'],
      ['r', 'Interest rate (cost of financing the purchase)'],
      ['q', 'Dividend yield (or other income from holding it)'],
      ['T', 'Time to expiry in years'],
    ],
    body: md`
      ## Cost of carry
      Buying Nifty today and holding it for a month costs interest on the money but earns dividends. So a one-month future should trade at about $S e^{(r-q)T}$. If it trades higher, **arbitrageurs** buy the stocks and sell the future (cash-and-carry) — a trade Indian arbitrage mutual funds run all day.

      ## Futures vs forwards
      - **Forward**: a private contract, settled at the end (common for currency hedging by importers).
      - **Futures**: standardised, exchange-traded, **marked to market** daily — gains and losses are paid every evening, and margin must be topped up.

      ## Leverage
      A Nifty future needs perhaps 10–15% margin, so a 5% move is a 35–50% gain or loss on your margin. Hedgers use futures to reduce risk; most retail users use them to increase it. Budget 2026 raised securities transaction tax on futures from 0.02% to 0.05%.
    `,
    calc: {
      inputs: [
        input('S', 'Spot index level', '₹', 25000, 1000, 100000, LOG),
        input('r', 'Interest rate', '% a year', 6.5, 0, 15),
        input('q', 'Dividend yield', '% a year', 1.3, 0, 6),
        input('days', 'Days to expiry', 'days', 30, 1, 365, INT),
        input('mgn', 'Margin', '% of contract value', 12, 5, 50),
      ],
      outputs: [
        out('Fair futures price', '₹', 'S*exp((r - q)/100*days/365)', { key: 'F' }),
        out('Basis (futures − spot)', '₹', 'F - S'),
        out('Gain or loss on margin from a 1% move', '%', '1/mgn*100', { digits: 3 }),
      ],
    },
  }),

  entry('fno-retail-losses', 'example', QUANT, 'curious', 'Why most F&O traders lose (SEBI’s data)', {
    summary: 'SEBI’s studies: about 9 in 10 individual equity F&O traders lost money every year from FY22 to FY25 — ₹1.06 lakh crore in FY25 alone. Costs, leverage and option-buying lottery tickets explain most of it.',
    aliases: ['F&O losses', 'SEBI F&O study', 'retail F&O traders'],
    tags: ['derivatives', 'India', 'evidence'],
    year: 2024,
    body: md`
      ## What SEBI found
      - **FY22–FY24**: 93% of individual traders in equity derivatives lost money; total losses exceeded **₹1.8 lakh crore** over three years; average loss about ₹2 lakh per person (study published September 2024).
      - **FY25**: about **91%** lost; net losses rose to about **₹1.06 lakh crore** across roughly 96 lakh traders — around ₹1.1 lakh each.
      - Only about 1% made profits above ₹1 lakh after costs.

      ## Why
      1. **It's zero-sum before costs.** Every option bought is sold by someone — often a professional firm with better models and faster systems.
      2. **Costs are negative-sum.** Brokerage, STT (raised again in April 2026), exchange fees, GST, stamp duty and bid-ask spreads on every trade. The calculator shows how quickly they add up.
      3. **Out-of-the-money option buying** is buying lottery tickets: most expire worthless. Prospect theory's overweighting of small probabilities makes them feel better than they are.
      4. **Leverage** turns ordinary moves into account-ending ones.
      5. **Overconfidence** and survivorship bias from social media winners.

      ## Policy response
      SEBI tightened contract sizes and expiries (late 2024); Budget 2026 raised STT on futures (0.02% → 0.05%) and options (0.1% → 0.15%).
    `,
    calc: {
      inputs: [
        input('cost', 'All-in cost per round trip', '₹', 100, 10, 2000, LOG),
        input('trades', 'Round trips per trading day', '', 5, 1, 100, { ...LOG, ...INT }),
        input('days', 'Trading days a year', 'days', 200, 10, 250, INT),
        input('cap', 'Trading capital', '₹', 200000, 10000, 100000000, LOG),
      ],
      outputs: [
        out('Costs in a year', '₹', 'cost*trades*days', { key: 'yearly' }),
        out('Return needed just to break even', '% of capital', 'yearly/cap*100', { digits: 3 }),
      ],
      note: 'Put in your own broker’s charges. Costs are certain; the edge that must beat them is not.',
    },
  }),

  entry('kelly-criterion', 'equation', QUANT, 'curious', 'Kelly Criterion', {
    summary: 'The bet size that makes wealth grow fastest over many rounds: stake the fraction p − q/b of your bankroll. Bet more and you grow slower; bet double and you can go broke even with an edge.',
    aliases: ['Kelly criterion', 'Kelly bet', 'Kelly betting', 'fractional Kelly', 'Kelly'],
    tags: ['betting', 'growth', 'information theory'],
    year: 1956,
    latex: md`f^{*} = p - \frac{q}{b}, \qquad g(f) = p\ln(1 + bf) + q\ln(1 - f)`,
    variables: [
      [md`f^{*}`, 'Fraction of current wealth to bet'],
      ['p, q', 'Chances of winning and losing (q = 1 − p)'],
      ['b', 'Net odds: you win b rupees per rupee staked'],
      ['g(f)', 'Long-run growth rate per bet when staking a fraction f'],
    ],
    body: md`
      ## Where it came from
      John Kelly, a physicist at Bell Labs, wrote *A New Interpretation of Information Rate* in 1956: a gambler with a private tip-off line (a noisy channel) should bet so that his wealth grows at a rate equal to the channel's **information rate** — Shannon's entropy, in money. Ed Thorp used it for blackjack and then in his hedge fund.

      ## The logic
      Wealth after many bets multiplies, so maximise the average of $\ln(\text{wealth})$ — log utility, as Bernoulli suggested for other reasons. That gives $f^*$.

      A 60% chance at even money ($b = 1$): $f^* = 0.6 - 0.4 = 20\%$ of your bankroll, for growth of about 2% per bet. Bet 40% (double Kelly) and growth is slightly **negative** — you'll likely lose money despite the edge. Over-betting is worse than under-betting.

      ## In practice
      Real edges are uncertain, so professionals bet **half Kelly** or less: about 75% of the growth with much smaller drawdowns. For investing, the continuous version says: hold a risky asset in proportion $(\mu - r)/\sigma^2$ — for Indian equities perhaps 5%/0.04 ≈ 125%, suggesting that even a full-equity portfolio isn't reckless in Kelly terms, while leverage beyond that is.

      It's the practical face of ergodicity economics: optimise the growth *you* experience, not the average across parallel worlds.
    `,
    calc: {
      inputs: [
        input('p', 'Chance of winning', '%', 60, 1, 99),
        input('b', 'Net odds (win b per ₹1)', '×', 1, 0.1, 10, LOG),
        input('f', 'Fraction you bet', '%', 20, 0, 99),
      ],
      outputs: [
        out('Kelly fraction', '%', '(p/100 - (1 - p/100)/b)*100', { key: 'fk', digits: 4 }),
        out('Expected gain per bet (per ₹1 staked)', '%', '(p/100*b - (1 - p/100))*100', { digits: 4 }),
        out('Growth per bet at your fraction', '%', '(p/100*ln(1 + b*f/100) + (1 - p/100)*ln(1 - f/100))*100', { key: 'gf', digits: 4 }),
        out('Growth per bet at Kelly', '%', 'if(fk, (p/100*ln(1 + b*fk/100) + (1 - p/100)*ln(1 - fk/100))*100, 0)', { digits: 4 }),
        out('Typical wealth after 100 bets, at your fraction', '×', 'exp(gf)', { digits: 4 }),
      ],
      note: 'Try betting double the Kelly fraction: the edge is still there, but typical wealth shrinks.',
    },
  }),

  entry('ergodicity', 'theory', QUANT, 'curious', 'Ergodicity Economics', {
    summary: 'The average across many people and the growth one person experiences over time can differ. A bet can have positive expected value and still make almost everyone who keeps playing it poorer.',
    aliases: ['ergodicity', 'ergodic', 'non-ergodic', 'ergodicity economics', 'time average', 'ensemble average', 'Peters coin game'],
    tags: ['physics bridge', 'decisions', 'growth'],
    year: 2019,
    latex: md`\underbrace{\tfrac12(1.5) + \tfrac12(0.6) = 1.05}_{\text{ensemble average}} \qquad \text{vs} \qquad \underbrace{\sqrt{1.5 \times 0.6} = 0.949}_{\text{time-average growth factor}}`,
    variables: [
      ['1.5, 0.6', 'Heads: wealth ×1.5 (+50%). Tails: wealth ×0.6 (−40%)'],
    ],
    body: md`
      ## Peters' coin game
      Each round, heads multiplies your wealth by 1.5, tails by 0.6. The expected value per round is **+5%**. Yet a single player's wealth, over many rounds, shrinks by about **5% per round**, because one head and one tail give $1.5 \times 0.6 = 0.9$. After 100 rounds, the *average* across a huge crowd of players is up 131×, while the *typical* player has lost 99.5% — a few astronomically lucky players carry the mean.

      ## Ergodicity
      A process is **ergodic** when the time average for one system equals the average over many systems at one moment — Boltzmann's assumption that let statistical mechanics replace following one gas molecule forever with averaging over many. Multiplicative wealth isn't ergodic. Ole Peters and Murray Gell-Mann argued (2016; "The ergodicity problem in economics", *Nature Physics* 2019) that much of decision theory quietly assumed it was.

      ## What it explains
      - Maximising time-average growth is maximising $\mathbb{E}[\ln W]$ — so log utility and the Kelly criterion follow from dynamics, not psychology.
      - Why people refuse positive-EV gambles: they live in time, not across parallel worlds.
      - Why **pooling and cooperation** help: sharing wealth each round between two players raises both players' growth rates.
      - Volatility drag and the St Petersburg paradox get the same resolution.

      ## Status
      The maths is uncontroversial; how much it overturns standard economics is debated.
    `,
    calc: {
      inputs: [
        input('up', 'Heads: wealth rises by', '%', 50, 1, 200),
        input('dn', 'Tails: wealth falls by', '%', 40, 1, 99),
        input('N', 'Rounds played', '', 100, 1, 1000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Expected (ensemble) change per round', '%', '((1 + up/100) + (1 - dn/100))/2*100 - 100', { digits: 4 }),
        out('Time-average change per round', '%', '(sqrt((1 + up/100)*(1 - dn/100)) - 1)*100', { digits: 4 }),
        out('Average wealth across all players after N', '×', '(((1 + up/100) + (1 - dn/100))/2)^N', { digits: 4 }),
        out('Typical player’s wealth after N', '×', '((1 + up/100)*(1 - dn/100))^(N/2)', { digits: 4 }),
        out('Best share of wealth to stake each round', '%', 'max(0, min(100, (up/100 - dn/100)/(2*(up/100)*(dn/100))*100))', { key: 'fs', digits: 4 }),
        out('Time-average growth at that stake', '%', '(sqrt((1 + up/100*fs/100)*(1 - dn/100*fs/100)) - 1)*100', { digits: 4 }),
      ],
      note: 'Staking only part of your wealth each round turns a shrinking game into a growing one — the Kelly idea.',
    },
  }),

  entry('fat-tails', 'concept', QUANT, 'curious', 'Fat Tails and Black Swans', {
    summary: 'Extreme market moves happen far more often than the bell curve allows. A “once in 10,000 years” day under a normal model turns up every few years in real data.',
    aliases: ['fat tails', 'fat-tailed', 'heavy tails', 'black swan', 'black swans', 'tail risk', 'kurtosis', 'power law', 'power laws', 'Mandelbrot'],
    tags: ['risk', 'evidence', 'physics bridge'],
    year: 1963,
    latex: md`P(|r| > x) \sim C\,x^{-\alpha}, \qquad \alpha \approx 3 \ \text{for stock returns}`,
    variables: [
      ['r', 'Return over a short interval (e.g. a day)'],
      [md`\alpha`, 'Tail exponent: smaller means fatter tails'],
    ],
    body: md`
      ## Mandelbrot's cotton (1963)
      Benoit Mandelbrot studied a century of cotton prices and found big moves far too frequent for a normal distribution; price changes looked **power-law** distributed, like earthquakes and city sizes. Later studies of stock returns found tails following roughly an "inverse cubic law", $\alpha \approx 3$.

      ## The size of the error
      With Nifty's daily volatility near 1%:
      - a 5% one-day fall is a 5σ event — once in ~14,000 years under a bell curve;
      - Nifty has had several: 2008, 2009, March 2020 (−13% on 23 March 2020).
      The calculator compares the bell curve with a cubic-law tail matched at 2σ.

      ## Why tails get fat
      Leverage and margin calls force selling into falls; correlations jump to 1 in panics; volatility clusters; information arrives in lumps. These are feedbacks, like avalanches in physics — which is why econophysicists borrow tools from critical phenomena.

      ## Living with them
      Nassim Taleb's **black swans**: rare, huge, explained only afterwards. Practical responses: less leverage, an emergency fund, real diversification, avoiding strategies that earn small steady gains by selling crash insurance, and distrusting risk measures that assume normality (Value at Risk, the Sharpe ratio).
    `,
    calc: {
      inputs: [
        input('fall', 'Size of the one-day fall', '%', 5, 0.5, 25),
        input('sd', 'Normal daily volatility', '%', 1, 0.3, 4),
      ],
      outputs: [
        out('That’s how many standard deviations', 'σ', 'fall/sd', { key: 'k', digits: 3 }),
        out('Bell curve: once every', 'years', '1/(ncdf(-k)*252)', { digits: 3 }),
        out('Cubic-law tail: once every', 'years', '1/(ncdf(-2)*(k/2)^(-3)*252)', { digits: 3 }),
      ],
      note: 'The cubic-law line matches the bell curve at 2σ and follows a power law beyond — a rough stand-in for real market data.',
    },
  }),

  entry('value-at-risk', 'equation', QUANT, 'curious', 'Value at Risk', {
    summary: '“With 99% confidence, we won’t lose more than X tomorrow.” A single number banks and regulators use for risk — and a famous way to be blind to the 1% that matters.',
    aliases: ['Value at Risk', 'VaR', 'expected shortfall', 'CVaR', 'RiskMetrics'],
    tags: ['risk', 'regulation'],
    year: 1994,
    latex: md`\text{VaR}_c = V\,\sigma_{\text{day}}\,\sqrt{h}\;z_c, \qquad z_{0.99} = 2.33`,
    variables: [
      ['V', 'Portfolio value'],
      [md`\sigma_{\text{day}}`, 'Daily volatility'],
      ['h', 'Horizon in days'],
      [md`z_c`, 'Normal quantile for confidence c'],
    ],
    body: md`
      ## Origin
      J.P. Morgan's chairman wanted one number at 4:15 every afternoon summarising the bank's risk; the result became **RiskMetrics** (1994) and then the basis of bank capital rules.

      ## What it says and doesn't
      A 1-day 99% VaR of ₹23,000 means: on 99 days in 100, losses should be smaller. It says **nothing** about how bad the other day is. With fat tails, that day can be many times the VaR — which is roughly what happened to banks in 2008, whose VaR models were calibrated on calm years.

      ## Expected shortfall
      The average loss *given* that you're in the worst 1% (or 2.5%). It looks into the tail, so regulators under Basel's newer market-risk rules moved to it.
    `,
    calc: {
      inputs: [
        input('V', 'Portfolio value', '₹', 1000000, 10000, 10000000000, LOG),
        input('sd', 'Daily volatility', '%', 1, 0.1, 5),
        input('conf', 'Confidence', '%', 99, 90, 99.9),
        input('hz', 'Horizon', 'days', 1, 1, 30, INT),
      ],
      outputs: [
        out('z-score', '', 'ninv(conf/100)', { key: 'z', digits: 4 }),
        out('Value at Risk', '₹', 'V*sd/100*sqrt(hz)*z'),
        out('Expected shortfall (normal model)', '₹', 'V*sd/100*sqrt(hz)*npdf(z)/(1 - conf/100)'),
      ],
      note: 'Both lines assume a bell curve. Real tails make the true numbers worse.',
    },
  }),

  entry('monte-carlo', 'concept', QUANT, 'curious', 'Monte Carlo Simulation', {
    summary: 'Answer hard probability questions by simulating thousands of random paths and counting. Born in the Manhattan Project; now used for retirement plans and exotic options.',
    aliases: ['Monte Carlo', 'Monte Carlo simulation', 'Monte Carlo method', 'simulation'],
    tags: ['methods', 'physics bridge', 'history'],
    year: 1946,
    body: md`
      ## Origin
      In 1946 Stanisław Ulam, recovering from illness and playing solitaire, wondered about the odds of winning — and realised it was easier to *play many games and count* than to calculate. With John von Neumann he applied the idea to neutron diffusion for nuclear weapons, on the first electronic computers. Nicholas Metropolis named it after the casino.

      ## In finance
      - **Retirement planning**: simulate 10,000 sequences of market returns and see in how many the money lasts — capturing sequence risk that a single average return hides.
      - **Option pricing**: average the discounted payoff over thousands of risk-neutral paths (Boyle, 1977) — essential for options whose payoff depends on the path.
      - **Risk**: Value at Risk from simulated portfolio moves.

      ## Its weakness
      The output is only as good as the model of randomness you feed it. Simulate with a bell curve and you'll underestimate crashes (fat tails). Error shrinks like $1/\sqrt{N}$: 100× more runs for 10× more precision.
    `,
  }),

  entry('martingale', 'concept', QUANT, 'curious', 'Martingales (and the Doubling Strategy)', {
    summary: 'A fair game: your expected future wealth equals what you have now. Doubling your bet after every loss can’t beat it — it trades many small wins for a rare catastrophe.',
    aliases: ['martingale', 'martingales', 'fair game', 'doubling strategy', 'martingale betting'],
    tags: ['probability', 'betting'],
    body: md`
      ## Two meanings
      - In probability, a **martingale** is a process whose expected next value is its current value. Discounted prices under the risk-neutral measure are martingales; so is your wealth in a fair coin game.
      - At the casino, the **martingale strategy**: bet ₹100; if you lose, bet ₹200; then ₹400… When you finally win, you're up ₹100.

      ## Why doubling fails
      It almost always wins a little — until a losing streak outlasts your bankroll or the table limit. With ₹1 lakh and a ₹100 first bet you can afford nine doubling bets (₹100 up to ₹25,600: ₹51,100 in all). At roulette (18/37 chance of red), losing all nine has probability about $0.514^{9} \approx 0.25\%$. Rare — but it costs ₹51,100, about 500 cycles' worth of ₹100 wins, so the expected result per cycle is negative. The **optional stopping theorem** says no betting system can turn a fair (or unfavourable) game into a favourable one.

      ## In markets
      "Averaging down" on a falling stock without limit, or selling far out-of-the-money options for steady premium, share the martingale's shape: frequent small gains, rare ruinous losses (fat tails).
    `,
    calc: {
      inputs: [
        input('B', 'Bankroll', '₹', 100000, 1000, 100000000, LOG),
        input('bet', 'Starting bet', '₹', 100, 10, 100000, LOG),
        input('p', 'Chance of winning each bet', '%', 48.65, 1, 60),
      ],
      outputs: [
        out('Doubling bets you can afford', '', 'floor(log2(B/bet + 1))', { key: 'k' }),
        out('Chance a cycle ends in a wipe-out', '%', '(1 - p/100)^k*100', { key: 'bust', digits: 4 }),
        out('Win per successful cycle', '₹', 'bet'),
        out('Loss in the wipe-out', '₹', 'bet*(2^k - 1)'),
        out('Expected result per cycle', '₹', '(1 - bust/100)*bet - bust/100*bet*(2^k - 1)', { digits: 4 }),
      ],
      note: 'Default p is European roulette red: 18/37. At exactly 50% the expected result is zero — no system beats a fair game.',
    },
  }),

  entry('gamblers-ruin', 'equation', QUANT, 'curious', 'Gambler’s Ruin', {
    summary: 'Keep betting against a house with even a small edge and you will eventually go broke — the odds of doubling your money first shrink fast as the stakes get small relative to your stack.',
    aliases: ['gambler’s ruin', "gambler's ruin", 'risk of ruin', 'house edge'],
    tags: ['probability', 'betting'],
    year: 1656,
    latex: md`P(\text{ruin}) = \frac{(q/p)^{i} - (q/p)^{N}}{1 - (q/p)^{N}} \quad (p \ne q), \qquad 1 - \frac{i}{N} \quad (p = q)`,
    variables: [
      ['p, q', 'Chance of winning and losing each ₹1 bet'],
      ['i', 'Your starting stake, in bets'],
      ['N', 'Target: stop when you reach it'],
    ],
    body: md`
      ## The classic
      Posed by Pascal and Fermat's circle and solved by Huygens (1656–57). You start with $i$ units and bet one at a time until you reach $N$ or hit zero.

      - In a **fair** game, the chance of reaching $N$ is simply $i/N$.
      - With even a slight house edge, small bets are deadly: at roulette ($p = 18/37$), trying to turn ₹50 into ₹100 with ₹1 bets fails about **94%** of the time. One bold ₹50 bet fails only 51%.

      ## Lessons
      - Against an edge, fewer, bigger bets beat many small ones (you give the edge fewer chances to work).
      - *With* an edge (you're the house, or you have a Kelly-sized advantage), the opposite: many small bets and ruin becomes vanishingly rare.
      - For traders: an edge smaller than costs is a negative edge — see F&O losses.
    `,
    calc: {
      inputs: [
        input('p', 'Chance of winning each bet', '%', 48.65, 30, 70),
        input('i', 'Starting stake', 'bets', 50, 1, 1000, { ...LOG, ...INT }),
        input('N', 'Stop when you reach', 'bets', 100, 2, 2000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Odds against you on each bet (q/p)', '', '(1 - p/100)/(p/100)', { key: 'x', digits: 4 }),
        out('Chance of going broke first', '%', 'max(0, if(abs(p - 50) - 0.0001, if(50 - p, (x^(i - N) - 1)/(x^(-N) - 1), (x^i - x^N)/(1 - x^N)), 1 - i/N))*100', { key: 'ruin', digits: 4 }),
        out('Chance of reaching the target', '%', '100 - ruin', { digits: 4 }),
      ],
      note: 'Keep the target above the starting stake. At exactly 50% the answer is simply 1 − stake/target.',
    },
  }),

  entry('econophysics', 'concept', QUANT, 'curious', 'Econophysics', {
    summary: 'Physicists applying statistical mechanics to markets: power laws, scaling, crashes as critical points. The traffic has run both ways since Bachelier.',
    aliases: ['econophysics', 'statistical mechanics of markets', 'inverse cubic law'],
    tags: ['physics bridge', 'research'],
    year: 1995,
    body: md`
      ## A two-way street
      - **Finance → physics**: Bachelier's random walk (1900) came before Einstein's; option pricing's heat equation predates finance's rediscovery of it.
      - **Physics → finance**: Brownian motion, the Fokker–Planck and heat equations, path integrals (Feynman–Kac), Monte Carlo, entropy (Kelly), ergodicity.

      ## The econophysics programme
      H. Eugene Stanley coined the word in 1995. Findings that stuck:
      - returns have **power-law tails** with exponent near 3, across markets and eras;
      - volatility has long memory and clusters;
      - crashes can look like critical phenomena, with markets organising themselves near instability (analogies to avalanches and phase transitions).

      ## Caution
      Markets are made of people who learn and adapt; if a pattern becomes known, trading can erase it. Physics' laws don't read the papers about them. That makes finance a stranger system than a gas — and its "laws" statistical tendencies, not constants.
    `,
  }),
];
