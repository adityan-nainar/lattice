// The maths, statistics and ML basics under the AI topics, plus a few CS basics.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { MATHS, ML, CS } = AREA;

export const BASIC_MATHS_ENTRIES = [
  // ---------------------------------------------------------------- maths
  entry('functions-graphs', 'concept', MATHS, 'curious', 'Mathematical Functions and Graphs', {
    summary: 'A function turns an input into an output, like y = 2x + 1. Plotting it shows its shape — straight, curved, flattening out — and that shape is what machine learning bends to fit data.',
    aliases: ['mathematical function', 'mathematical functions', 'slope', 'intercept', 'linear function', 'nonlinear'],
    tags: ['basics', 'maths'],
    latex: doc`y = f(x), \qquad \text{e.g. } y = m x + c`,
    variables: [
      ['m', 'Slope: how much y changes when x goes up by 1'],
      ['c', 'Intercept: the value of y when x is 0'],
    ],
    body: doc`
      ## Function = machine
      Put in $x$, get out $y$. $f(x) = 2x + 1$: $f(3) = 7$. Programming functions are the same idea with more steps.

      ## Shapes you'll meet
      - **Straight line** $y = mx + c$: constant slope. Linear regression fits one to data.
      - **Parabola** $y = x^2$: a bowl with one lowest point — the simplest loss surface.
      - **Exponential** $y = e^x$: grows faster and faster — compounding, and softmax.
      - **Logarithm** $y = \ln x$: grows slower and slower — cross-entropy, information.
      - **S-curve** (sigmoid): flat, steep, flat — squashes any number into 0…1.

      ## Why ML is "just" this
      A trained model is a function with billions of adjustable numbers. Training means changing those numbers until the function's outputs match the examples. A neural network's power comes from being able to bend into almost any shape — straight lines stacked with bends in between.

      ## Reading graphs
      Look at the axes (what's measured, what units, linear or log scale), then the trend, then the details. Many ML plots — scaling laws, loss curves — use **log scales**, where a straight line means a power law.
    `,
  }),

  entry('exponents-logs', 'equation', MATHS, 'curious', 'Exponents and Logarithms', {
    summary: 'Exponents are repeated multiplication; logarithms undo them and answer “how many times?”. Growth, decay, probabilities, information and Big-O all run on these two.',
    aliases: ['exponent', 'exponents', 'exponential', 'exponential growth', 'logarithm', 'logarithms', 'natural log', 'log scale', 'powers of two'],
    tags: ['basics', 'maths'],
    latex: doc`b^{\,y} = x \iff y = \log_b x, \qquad \ln(ab) = \ln a + \ln b`,
    variables: [
      ['b', 'Base: 2 (bits), 10 (orders of magnitude) or e ≈ 2.718 (natural log, ln)'],
      ['y', 'The exponent: how many times b is multiplied'],
    ],
    body: doc`
      ## Exponents
      $2^{10} = 1024$. $10^6$ = a million. $e^x$ with $e \approx 2.718$ is the "natural" growth function. Rules: $a^m a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^{-1} = 1/a$.

      ## Logarithms answer "how many times?"
      - $\log_2 1024 = 10$: halve 1024 ten times to get to 1 — why binary search on a billion items takes 30 steps.
      - $\log_{10} 1{,}000{,}000 = 6$: a million has six zeros — "orders of magnitude".
      - $\ln$ is log base $e$; in ML "log" almost always means $\ln$.

      ## The superpower: products become sums
      $\ln(ab) = \ln a + \ln b$. Multiplying thousands of small probabilities underflows to zero on a computer; adding their logs doesn't. That's why models work with **log-probabilities**, why the loss is $-\ln p$, and why perplexity is $e^{\text{loss}}$.

      ## Log scales
      On a log axis, each step is ×10 instead of +10. Model sizes (1B, 10B, 100B), costs and latencies span orders of magnitude, so they're plotted this way — and a power law becomes a straight line.
    `,
    calc: {
      inputs: [
        input('b', 'Base', '', 2, 1.1, 10),
        input('x', 'Number', '', 1024, 0.001, 1e12, LOG),
      ],
      outputs: [
        out('log base b of x', '', 'ln(x)/ln(b)', { key: 'lg', digits: 5 }),
        out('Check: b to that power', '', 'b^lg', { digits: 5 }),
        out('Natural log ln x', '', 'ln(x)', { digits: 5 }),
        out('Digits before the decimal point', '', 'max(1, floor(log10(x)) + 1)'),
      ],
      note: 'Base 2, x = 1,000,000,000: about 30 — the steps a binary search needs.',
    },
  }),

  entry('sigma-notation', 'concept', MATHS, 'curious', 'Summation Notation', {
    summary: 'The big Σ means “add these up”. It’s just a for-loop written in maths: Σ from i = 1 to n of xᵢ is x₁ + x₂ + … + xₙ.',
    aliases: ['sigma notation', 'summation', 'summation notation', 'product notation'],
    tags: ['basics', 'maths'],
    latex: doc`\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n`,
    variables: [
      ['i', 'The loop counter'],
      ['n', 'Where it stops'],
      [doc`x_i`, 'The i-th item'],
    ],
    body: doc`
      ## Read it as code
      $$\sum_{i=1}^{n} w_i x_i$$
      ~~~python
      total = 0
      for i in range(n):
          total += w[i] * x[i]        # a dot product
      ~~~
      Subscripts ($x_i$) are indexes; the thing after Σ is the loop body.

      ## Where you'll see it
      - Dot products and neurons: $\sum_i w_i x_i + b$.
      - Averages: $\bar x = \frac{1}{n}\sum_i x_i$.
      - Loss over a dataset: $\frac{1}{N}\sum_i \text{loss}_i$.
      - Softmax's denominator: $\sum_j e^{z_j}$.
      - Probabilities adding to 1: $\sum_i p_i = 1$.

      ## Its sibling
      $\prod$ (capital pi) means multiply them all — the probability of a whole sentence is a product of per-token probabilities, which is why we take logs and turn it back into a sum.
    `,
  }),

  entry('derivatives', 'equation', MATHS, 'curious', 'Derivatives', {
    summary: 'A derivative is the slope of a function at a point: how fast the output changes as the input nudges. Training a model is following derivatives downhill.',
    aliases: ['derivative', 'derivatives', 'rate of change', 'differentiation', 'calculus'],
    tags: ['basics', 'maths'],
    latex: doc`f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}`,
    variables: [
      [doc`f'(x)`, 'The derivative: slope of f at x'],
      ['h', 'A tiny nudge to the input'],
    ],
    body: doc`
      ## Slope, zoomed in
      Nudge the input a tiny bit; see how much the output moves; divide. For $f(x) = x^2$ at $x = 3$: $(3.001^2 - 9)/0.001 = 6.001$ — the slope is 6, and in general $f'(x) = 2x$.

      ## The handful of rules you need
      - $x^n \to n x^{n-1}$ (so $x^2 \to 2x$, $x \to 1$, a constant $\to 0$).
      - $e^x \to e^x$; $\ln x \to 1/x$.
      - Sums differentiate term by term; constants multiply through.
      - Functions inside functions: the **chain rule**.

      ## What the sign tells you
      Positive slope: output rises if you increase $x$. Negative: it falls. Zero: a flat spot — maybe the minimum you're looking for. Gradient descent steps *against* the slope: if increasing a weight increases the loss, decrease the weight.

      ## You won't do these by hand
      PyTorch computes derivatives of millions of operations automatically (autograd). Knowing what a derivative *means* is enough to understand learning rates, vanishing gradients and why training works at all.
    `,
    calc: {
      inputs: [
        input('x', 'Point x', '', 3, -10, 10),
        input('hh', 'Nudge size', '', 0.001, 1e-8, 1, LOG),
      ],
      outputs: [
        out('f(x) = x²', '', 'x^2', { digits: 5 }),
        out('Estimated slope (f(x+h) − f(x)) / h', '', '((x + hh)^2 - x^2)/hh', { digits: 6 }),
        out('Exact slope 2x', '', '2*x', { digits: 6 }),
      ],
      note: 'Shrink the nudge and the estimate closes in on 2x. Make it tiny (1e-8) and floating-point rounding starts to bite.',
    },
  }),

  entry('partial-derivatives', 'concept', MATHS, 'curious', 'Partial Derivatives and Gradients', {
    summary: 'With many inputs, take the slope along each one separately — a partial derivative. Stack them into a vector and you have the gradient: the direction of steepest climb.',
    aliases: ['partial derivative', 'partial derivatives', 'gradient vector', 'steepest ascent', 'loss landscape', 'loss surface'],
    tags: ['basics', 'maths'],
    latex: doc`\nabla f = \left(\frac{\partial f}{\partial w_1}, \frac{\partial f}{\partial w_2}, \ldots, \frac{\partial f}{\partial w_n}\right)`,
    variables: [
      [doc`\partial f / \partial w_i`, 'How f changes when only wᵢ moves, everything else held still'],
      [doc`\nabla f`, 'The gradient: all of them together, one per input'],
    ],
    body: doc`
      ## One knob at a time
      A loss depends on every weight in the model. The partial derivative with respect to one weight asks: if I nudge *just this one*, how does the loss change? For $f(a, b) = a^2 + 3b$: $\partial f/\partial a = 2a$, $\partial f/\partial b = 3$.

      ## The gradient
      Put all the partials in a vector. It points in the direction the function rises fastest; its length says how steep. Walking the *opposite* way goes downhill fastest — that's gradient descent, applied to billions of weights at once.

      ## The landscape picture
      Imagine the loss as terrain over a map of all possible weight settings (a "loss landscape"). Training starts somewhere random and walks downhill. Real landscapes have billions of dimensions — the picture is a guide, not a literal view — but valleys, flat plateaus and steep cliffs are real phenomena that learning rates and optimisers like Adam are designed around.

      ## Computing them
      Backpropagation computes every partial derivative of the loss in one backward pass, using the chain rule layer by layer.
    `,
  }),

  entry('chain-rule', 'equation', MATHS, 'curious', 'The Chain Rule', {
    summary: 'For functions inside functions, multiply the slopes: how the outside changes with the middle, times how the middle changes with the inside. Backpropagation is this rule, applied layer after layer.',
    aliases: ['chain rule', 'composite function', 'function composition'],
    tags: ['basics', 'maths'],
    latex: doc`\frac{dz}{dx} = \frac{dz}{dy}\cdot\frac{dy}{dx}`,
    variables: [
      ['x', 'Input'],
      ['y', 'Middle value, y = g(x)'],
      ['z', 'Output, z = f(y)'],
    ],
    body: doc`
      ## Gears
      If gear A turns gear B three times as fast, and B turns C twice as fast, then A turns C $3 \times 2 = 6$ times as fast. Rates multiply along a chain.

      ## Worked example
      $z = (3x + 1)^2$. Let $y = 3x + 1$, so $z = y^2$.
      $dz/dy = 2y$, $dy/dx = 3$, so $dz/dx = 2y \cdot 3 = 6(3x + 1)$. At $x = 1$: $6 \times 4 = 24$.

      ## Why it runs deep learning
      A network is a long chain: input → layer 1 → layer 2 → … → loss. The chain rule says the loss's sensitivity to a weight in layer 1 is a product of local slopes all the way along. Backpropagation computes those products efficiently, from the loss backwards, reusing each partial product for the layer before.

      ## And why depth used to be hard
      Multiply many numbers smaller than 1 and the product vanishes; many bigger than 1 and it explodes. That's the vanishing/exploding gradient problem — solved in practice by ReLU-family activations, normalisation and residual connections.
    `,
    calc: {
      inputs: [
        input('x', 'x', '', 1, -5, 5),
        input('k', 'Inner slope (y = k·x + 1)', '', 3, -5, 5),
      ],
      outputs: [
        out('y = k·x + 1', '', 'k*x + 1', { key: 'y', digits: 4 }),
        out('z = y²', '', 'y^2', { digits: 4 }),
        out('dz/dy = 2y', '', '2*y', { key: 'dzdy', digits: 4 }),
        out('dy/dx = k', '', 'k', { digits: 4 }),
        out('dz/dx = dz/dy × dy/dx', '', 'dzdy*k', { digits: 4 }),
      ],
      note: 'Defaults reproduce the worked example: 24.',
    },
  }),

  entry('linear-algebra-basics', 'concept', MATHS, 'curious', 'Matrices and Linear Algebra', {
    summary: 'Vectors are lists of numbers; matrices are grids of them; multiplying a vector by a matrix transforms it. Every layer of a neural network is exactly that.',
    aliases: ['linear algebra', 'transpose', 'matrix transpose', 'identity matrix', 'matrix shape', 'dimensions of a matrix'],
    tags: ['basics', 'maths'],
    latex: doc`W\mathbf x = \begin{pmatrix} w_{11} & w_{12} \\ w_{21} & w_{22} \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} w_{11}x_1 + w_{12}x_2 \\ w_{21}x_1 + w_{22}x_2 \end{pmatrix}`,
    variables: [
      ['W', 'A matrix: rows × columns of numbers'],
      [doc`\mathbf x`, 'A vector'],
    ],
    body: doc`
      ## The objects
      - **Scalar**: one number.
      - **Vector**: a list — a point or direction. An embedding is a vector of 768 numbers.
      - **Matrix**: a grid, *rows × columns*. A layer's weights, a batch of embeddings (one per row).
      - **Tensor**: the same idea with more axes — a batch of sequences of token vectors is 3D: (batch, tokens, features).

      ## Matrix × vector
      Each output entry is the dot product of one row of $W$ with $\mathbf x$. A $3 \times 2$ matrix turns 2-number vectors into 3-number vectors — a layer mapping 2 features to 3.

      ## Shapes are half the battle
      $(m \times k)$ times $(k \times n)$ gives $(m \times n)$; the inner sizes must match. Most PyTorch errors in practice are shape mismatches: "mat1 and mat2 shapes cannot be multiplied (32x768 and 512x10)". Printing §.shape§ is the first debugging move.

      ## Transpose
      $W^\top$ swaps rows and columns. Attention's $QK^\top$ is "every query dotted with every key" — transposing $K$ lines up the shapes so one matrix multiply produces all the scores.

      You need the *vocabulary* here much more than the theory: shapes, dot products, multiplying, transposing.
    `,
  }),

  entry('probability-basics', 'equation', MATHS, 'curious', 'Probability Basics', {
    summary: 'A number from 0 to 1 for how likely something is. Probabilities of all outcomes add to 1; independent events multiply. LLMs output a probability for every possible next token.',
    aliases: ['probability', 'probabilities', 'conditional probability', 'independent events', 'likelihood', 'Bayes'],
    tags: ['basics', 'maths', 'statistics'],
    latex: doc`P(A \text{ and } B) = P(A)\,P(B) \ \ (\text{independent}), \qquad P(\text{at least one in } n) = 1 - (1-p)^n`,
    variables: [
      ['P(A)', 'Probability of A, between 0 and 1'],
      ['p', 'Chance of success on one try'],
      ['n', 'Number of independent tries'],
    ],
    body: doc`
      ## The rules
      - All outcomes together: probabilities add to 1. A softmax output is exactly such a list.
      - **Independent** events multiply: two coin flips both heads: $0.5 \times 0.5 = 0.25$.
      - **Not**: $P(\text{not } A) = 1 - P(A)$.
      - **Conditional**: $P(A \mid B)$ — the chance of A *given* B happened. A language model gives $P(\text{next token} \mid \text{everything so far})$.

      ## "At least once" surprises
      A 5% failure on each of 20 independent API calls: chance all succeed is $0.95^{20} = 36\%$. A 1-in-1,000 bug seen by 10,000 users will certainly show up. Agents, retries and eval pass rates are all this arithmetic.

      ## Bayes, in one line
      $P(A \mid B) = P(B \mid A)\,P(A) / P(B)$. How to update a belief with evidence — and the reason a "99% accurate" test for a rare condition is still mostly wrong when it says yes.

      ## Probability ≠ certainty
      A model saying 0.9 is right about 90% of the time *only if it's calibrated*. Many aren't, especially after RLHF — don't treat model confidence as truth.
    `,
    calc: {
      inputs: [
        input('p', 'Chance of success each try', '%', 95, 0.01, 99.99),
        input('n', 'Independent tries', '', 20, 1, 10000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('All n succeed', '%', '(p/100)^n*100', { digits: 4 }),
        out('At least one fails', '%', '(1 - (p/100)^n)*100', { digits: 4 }),
        out('Expected failures', '', 'n*(1 - p/100)', { digits: 4 }),
      ],
      note: 'Set p = 99.9 and n = 10,000 (a rare bug, lots of users): failures are near-certain.',
    },
  }),

  entry('probability-distributions', 'equation', MATHS, 'curious', 'Probability Distributions', {
    summary: 'The full picture of how likely each outcome is. A softmax over tokens is a distribution; so are latencies, eval scores and model weights. The bell curve is the most famous one.',
    aliases: ['probability distribution', 'probability distributions', 'distribution', 'normal distribution', 'bell curve', 'Gaussian', 'long tail', 'uniform distribution'],
    tags: ['basics', 'maths', 'statistics'],
    latex: doc`p(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-(x-\mu)^2 / 2\sigma^2}`,
    variables: [
      [doc`\mu`, 'Mean: the centre'],
      [doc`\sigma`, 'Standard deviation: the spread'],
    ],
    body: doc`
      ## Discrete and continuous
      - **Discrete**: a list of outcomes with probabilities — the next token (100,000 options), a die roll, pass/fail.
      - **Continuous**: a curve over a range — response time, a weight's value. Probability lives in *areas* under the curve.

      ## The normal (Gaussian) distribution
      The bell curve, fixed by its mean $\mu$ and spread $\sigma$. About **68%** of values fall within ±1σ, **95%** within ±2σ, **99.7%** within ±3σ. Sums of many small independent effects tend towards it (the central limit theorem) — why measurement errors and averages are often bell-shaped, and why neural network weights are initialised from one.

      ## Not everything is a bell
      - **Latency** has a **long tail**: most requests are fast, a few are very slow. That's why you watch p95/p99, not the average.
      - **Token probabilities** are spiky: a few likely tokens, a vast tail of unlikely ones — what top-p sampling trims.
      - **Uniform**: every outcome equally likely — a fair die, a random UUID's bits.

      ## Sampling
      Drawing a random outcome according to the probabilities. Every token an LLM writes is a sample from its distribution (unless temperature is ~0).
    `,
    calc: {
      inputs: [
        input('mu', 'Mean μ', '', 0, -100, 100),
        input('sd', 'Standard deviation σ', '', 1, 0.01, 100, LOG),
        input('x', 'Value x', '', 1.96, -300, 300),
      ],
      outputs: [
        out('z-score (x − μ)/σ', '', '(x - mu)/sd', { key: 'z', digits: 4 }),
        out('Share below x', '%', 'ncdf(z)*100', { digits: 4 }),
        out('Share within ±|z|σ of the mean', '%', '(ncdf(abs(z)) - ncdf(-abs(z)))*100', { digits: 4 }),
      ],
      note: 'z = 1.96 leaves 2.5% in each tail: the “95%” in confidence intervals. Try x = 1, 2 and 3 for the 68–95–99.7 rule.',
    },
  }),

  entry('mean-variance', 'equation', MATHS, 'curious', 'Mean, Variance and Standard Deviation', {
    summary: 'The average says where the values sit; the standard deviation says how spread out they are. The median and percentiles tell the truth when there are outliers.',
    aliases: ['variance', 'standard deviation', 'median', 'arithmetic mean', 'percentile', 'percentiles', 'p95', 'outlier', 'outliers'],
    tags: ['basics', 'maths', 'statistics'],
    latex: doc`\bar x = \frac{1}{n}\sum_{i} x_i, \qquad \sigma = \sqrt{\frac{1}{n}\sum_i (x_i - \bar x)^2}`,
    variables: [
      [doc`\bar x`, 'Mean (average)'],
      [doc`\sigma`, 'Standard deviation: typical distance from the mean'],
      [doc`\sigma^2`, 'Variance'],
    ],
    body: doc`
      ## Familiar from analysis — with an app twist
      Five LLM response times in seconds: 1, 1, 2, 2, 14. Mean **4 s**. Median **2 s**. The mean says "slow"; the median says "usually fine, one terrible outlier". For latency, report median and **p95** (95% of requests are faster than this) — one slow request in twenty is what users remember.

      ## Standard deviation
      Square root of the average squared distance from the mean, in the same units as the data. Small = consistent; large = all over the place. For samples, divide by $n - 1$ instead of $n$ (Bessel's correction) — libraries have a flag for it.

      ## Where they show up in ML
      - **Normalisation**: subtract the mean, divide by the standard deviation, so features (and layer activations — LayerNorm) are on a common scale.
      - **Initialisation**: random weights with a chosen standard deviation.
      - **Evals**: a pass rate is a mean of 0s and 1s; its uncertainty comes from the standard deviation.
      - **Adam**: tracks a running mean and variance of each gradient.
    `,
    calc: {
      inputs: [
        input('x1', 'Value 1', '', 1, -1000, 1000),
        input('x2', 'Value 2', '', 1, -1000, 1000),
        input('x3', 'Value 3', '', 2, -1000, 1000),
        input('x4', 'Value 4', '', 2, -1000, 1000),
        input('x5', 'Value 5', '', 14, -1000, 1000),
      ],
      outputs: [
        out('Mean', '', '(x1 + x2 + x3 + x4 + x5)/5', { key: 'm', digits: 4 }),
        out('Standard deviation (population)', '', 'sqrt(((x1 - m)^2 + (x2 - m)^2 + (x3 - m)^2 + (x4 - m)^2 + (x5 - m)^2)/5)', { key: 'sdev', digits: 4 }),
        out('Sample standard deviation (n − 1)', '', 'sdev*sqrt(5/4)', { digits: 4 }),
        out('Smallest', '', 'min(x1, x2, x3, x4, x5)'),
        out('Largest', '', 'max(x1, x2, x3, x4, x5)'),
      ],
      note: 'Change the 14 to 2 and watch the mean and spread collapse — one outlier was doing all the work.',
    },
  }),

  entry('confidence-intervals', 'equation', MATHS, 'curious', 'Samples and Confidence Intervals', {
    summary: 'You measure a sample, not everything, so every number has wobble. A confidence interval says how much — and tells you whether “prompt B beat prompt A” means anything.',
    aliases: ['confidence interval', 'confidence intervals', 'sample size', 'margin of error', 'statistical significance', 'standard error', 'A/B test'],
    tags: ['basics', 'statistics', 'evaluation'],
    latex: doc`\hat p \pm z\sqrt{\frac{\hat p(1-\hat p)}{n}}, \qquad z = 1.96 \text{ for } 95\%`,
    variables: [
      [doc`\hat p`, 'Measured proportion (pass rate, click rate)'],
      ['n', 'Sample size'],
      ['z', 'How many standard errors: 1.96 for 95% confidence'],
    ],
    body: doc`
      ## The idea
      Test a prompt on 50 questions and 40 pass: 80%. On a different 50 it might be 72% or 88%. The **standard error** $\sqrt{p(1-p)/n}$ measures that wobble; ±1.96 of them gives a 95% confidence interval: 80% ± 11 points.

      ## The √n law
      Precision improves with the square root of the sample: 4× the cases halves the margin. 50 cases → ±11 points; 200 → ±5.5; 800 → ±2.8.

      ## Comparing two versions
      Two independent measurements each wobble, so their *difference* wobbles more. On the same test cases (paired), look at the cases that flipped — much more sensitive. In either case, a 3-point improvement on 50 cases is noise.

      ## From dashboards to evals
      As an analyst you've seen this in A/B tests. The same discipline makes LLM evals honest: report the interval, grow the eval set until the differences you care about are bigger than the noise, and be suspicious of improvements that disappear on new data.
    `,
    calc: {
      inputs: [
        input('p', 'Measured rate', '%', 80, 1, 99),
        input('n', 'Sample size', '', 50, 5, 100000, { ...LOG, ...INT }),
        input('conf', 'Confidence', '%', 95, 50, 99.9),
      ],
      outputs: [
        out('z for this confidence', '', 'ninv(1 - (1 - conf/100)/2)', { key: 'z', digits: 4 }),
        out('Standard error', 'points', 'sqrt(p/100*(1 - p/100)/n)*100', { key: 'se', digits: 3 }),
        out('Margin of error, ±', 'points', 'z*se', { key: 'moe', digits: 3 }),
        out('Interval low', '%', 'p - moe', { digits: 3 }),
        out('Interval high', '%', 'p + moe', { digits: 3 }),
      ],
      note: 'Multiply n by 4 and the margin halves.',
    },
  }),

  entry('entropy-information', 'equation', MATHS, 'curious', 'Entropy and Information', {
    summary: 'Entropy measures uncertainty in bits: a fair coin is 1 bit, a sure thing is 0. Cross-entropy, perplexity, compression and temperature all build on it.',
    aliases: ['entropy', 'information theory', 'Shannon', 'bits of information', 'surprisal'],
    tags: ['basics', 'maths', 'information theory'],
    year: 1948,
    latex: doc`H = -\sum_i p_i \log_2 p_i`,
    variables: [
      [doc`p_i`, 'Probability of outcome i'],
      ['H', 'Entropy in bits: the average surprise'],
    ],
    body: doc`
      ## Surprise
      An outcome with probability $p$ carries $-\log_2 p$ bits of information: a coin landing heads (½) is 1 bit; rolling a six (⅙) is 2.58 bits; something certain is 0 bits. Rare events are more informative.

      ## Entropy = average surprise
      A fair coin: 1 bit. A coin that lands heads 99% of the time: 0.08 bits — you can almost predict it. A uniform choice among 32 tokens: 5 bits.

      ## Why it's everywhere in AI
      - A language model's **cross-entropy loss** is its average surprise at the real next token. Training lowers it.
      - **Perplexity** $= 2^{H}$ (or $e^{\text{loss}}$): the number of options it's effectively choosing between.
      - **Temperature** raises or lowers the entropy of the next-token distribution.
      - **Compression**: Shannon (1948) showed you can't compress below the entropy — and a better predictor is a better compressor.
      - Decision trees choose splits that reduce entropy the most.
    `,
    calc: {
      inputs: [input('p', 'Probability of heads', '', 0.5, 0.001, 0.999)],
      outputs: [
        out('Entropy of the coin', 'bits', '-(p*log2(p) + (1 - p)*log2(1 - p))', { key: 'H', digits: 4 }),
        out('Surprise of heads', 'bits', '-log2(p)', { digits: 4 }),
        out('Surprise of tails', 'bits', '-log2(1 - p)', { digits: 4 }),
        out('Perplexity (2^H)', '', '2^H', { digits: 4 }),
      ],
      note: '0.5 is maximum uncertainty: 1 bit. Push towards 0.99 and the entropy collapses.',
    },
  }),

  // ---------------------------------------------------------------- ML basics
  entry('features-labels', 'concept', ML, 'curious', 'Features, Labels and Predictions', {
    summary: 'In supervised learning each example has features (what you know) and a label (what you want predicted). The model learns the mapping from one to the other.',
    aliases: ['features and labels', 'feature engineering', 'labelled data', 'labeled data', 'target variable', 'feature vector', 'training example'],
    tags: ['basics', 'ml'],
    body: doc`
      ## A row is an example
      | words | has_link | sender_known | **label: spam?** |
      |---|---|---|---|
      | 23 | 1 | 0 | **1** |
      | 180 | 0 | 1 | **0** |
      Columns you feed in are **features**; the column you want predicted is the **label** (or target). Training learns $f(\text{features}) \approx \text{label}$; afterwards it predicts labels for new rows.

      ## Very familiar territory
      This is the analyst's table. Feature engineering — ratios, flags, time since last purchase — is often worth more than a fancier model on tabular data.

      ## In the LLM world
      - For an LLM, the "features" are the tokens so far and the "label" is the next token — labels come free from the text itself (self-supervised).
      - Embeddings are *learned* features: the model builds its own representation of text.
      - When you fine-tune, each example is a (prompt, ideal response) pair — features and label again.
      - An **eval set** is labelled data: inputs with the right answers or grading criteria.

      ## Label quality
      Garbage labels, garbage model. A few hundred carefully checked examples often beat thousands of sloppy ones — for classic ML, fine-tuning and evals alike.
    `,
  }),

  entry('classification-regression', 'concept', ML, 'curious', 'Classification and Regression', {
    summary: 'Predicting a category (spam or not, which topic) is classification; predicting a number (price, time, score) is regression. Different outputs, different losses, different metrics.',
    aliases: ['classification', 'classifier', 'classifiers', 'regression task', 'binary classification', 'multi-class'],
    tags: ['basics', 'ml'],
    body: doc`
      | | Classification | Regression |
      |---|---|---|
      | Output | a category (with probabilities) | a number |
      | Examples | spam? topic of a support ticket? which intent? | delivery time, price, tokens a request will use |
      | Last layer | softmax / sigmoid | plain number |
      | Loss | cross-entropy | mean squared error |
      | Metrics | accuracy, precision, recall, F1 | error in units: MAE, RMSE |

      ## Everything is classification to an LLM
      Next-token prediction is classification over the vocabulary, repeated. And you can use an LLM *as* a classifier with a prompt ("reply with one of: billing, bug, feature") — often with structured output to guarantee a valid label.

      ## Which tool for your app?
      - A few thousand labelled rows of tabular data → gradient boosting (XGBoost/LightGBM).
      - Text, few or no labels → an LLM with a good prompt, or embeddings + a simple classifier.
      - Lots of text labels and high volume → fine-tune a small model, or train a classifier on embeddings: cheap, fast, and often as good.
    `,
  }),

  entry('training-vs-inference', 'concept', ML, 'curious', 'Training and Inference', {
    summary: 'Training adjusts a model’s weights using examples — slow, expensive, done rarely. Inference uses the frozen weights to make predictions — what happens every time you call an LLM.',
    aliases: ['inference', 'training vs inference', 'model serving', 'frozen weights', 'forward pass'],
    tags: ['basics', 'ml'],
    body: doc`
      ## Training
      Forward pass → loss → backward pass → update weights, over and over, across the dataset. Needs gradients and optimiser state in memory (~16 bytes per parameter for full training), and huge compute for big models: frontier LLMs take thousands of GPUs for months.

      ## Inference
      Forward pass only, weights fixed. "Given this input, what comes out?" Every API call and every Ollama response is inference. Much cheaper per request, but it happens billions of times, so it dominates the total cost of a popular model.

      ## Why the distinction matters to you
      - **The model doesn't learn from your conversations** during inference. "Memory" features are the app re-sending context, not the weights changing.
      - Fine-tuning is training, with its own data, compute and memory needs; RAG and prompting change only the *input* at inference time.
      - Hardware sizing differs: running a 8B model needs ~5 GB at 4-bit; training even a LoRA on it needs more.
      - A model's knowledge stops at its **training cutoff**; anything newer must come in through the prompt.
    `,
  }),

  entry('training-loop', 'concept', ML, 'curious', 'The Training Loop: Epochs and Batches', {
    summary: 'Shuffle the data, cut it into batches, and for each batch: predict, measure loss, backpropagate, step. One full pass over the data is an epoch. That loop is all training is.',
    aliases: ['training loop', 'epoch', 'epochs', 'batch size', 'mini-batch', 'mini-batches', 'learning curve', 'loss curve', 'early stopping'],
    tags: ['basics', 'ml', 'training'],
    body: doc`
      ~~~python
      for epoch in range(num_epochs):
          model.train()
          for x, y in train_loader:              # batches of, say, 32 examples
              pred = model(x)                    # forward pass
              loss = loss_fn(pred, y)            # how wrong?
              loss.backward()                    # backpropagation: gradients
              optimizer.step()                   # gradient descent: update weights
              optimizer.zero_grad()
          val_loss = evaluate(model, val_loader) # check on held-out data
          print(epoch, loss.item(), val_loss)
      ~~~

      ## The vocabulary
      - **Batch**: examples processed together — fast on GPUs, and averaging their gradients smooths the noise.
      - **Step**: one weight update. **Epoch**: one pass through all the data.
      - **Learning curve**: loss over steps. Training loss should fall; watch validation loss for overfitting.
      - **Early stopping**: stop when validation loss stops improving.
      - **Checkpoint**: saved weights along the way.

      ## Scale changes the details, not the loop
      Classic models train for many epochs on small data. LLM pretraining sees most data only about once (one epoch over trillions of tokens); fine-tuning runs 1–3 epochs over a small dataset. Same loop, very different numbers.
    `,
  }),

  entry('evaluation-metrics', 'equation', ML, 'curious', 'Accuracy, Precision and Recall', {
    summary: 'Accuracy alone hides problems. Precision asks “of what I flagged, how much was right?”; recall asks “of what I should have flagged, how much did I catch?”. F1 balances them.',
    aliases: ['accuracy', 'precision and recall', 'recall', 'F1 score', 'confusion matrix', 'false positive', 'false positives', 'false negative', 'false negatives', 'true positive'],
    tags: ['basics', 'ml', 'evaluation'],
    latex: doc`\text{precision} = \frac{TP}{TP + FP}, \quad \text{recall} = \frac{TP}{TP + FN}, \quad F_1 = \frac{2PR}{P + R}`,
    variables: [
      ['TP', 'True positives: flagged, and should have been'],
      ['FP', 'False positives: flagged, but shouldn’t have been'],
      ['FN', 'False negatives: missed'],
      ['TN', 'True negatives: correctly left alone'],
    ],
    body: doc`
      ## Why accuracy misleads
      If 1% of messages are spam, a classifier that says "not spam" to everything is 99% accurate and useless. Precision and recall look at the class you care about.

      ## The trade-off
      - A cautious filter (flags only when sure): high precision, low recall.
      - An eager filter (flags anything suspicious): high recall, low precision.
      Which matters more depends on the cost of each mistake: missing fraud (recall) vs annoying good customers (precision).

      ## In LLM and RAG work
      - **Retrieval recall@k**: of the chunks that answer the question, how many are in the top k? The key RAG metric — if the answer isn't retrieved, the model can't use it.
      - **Retrieval precision**: how many of the retrieved chunks are relevant — noise in the prompt.
      - **LLM-as-judge** agreement with humans is summarised with these, plus Cohen's kappa.
      - **Guardrails** (e.g. a prompt-injection detector) trade false positives (blocking real users) against false negatives (letting attacks through).
    `,
    calc: {
      inputs: [
        input('TP', 'True positives', '', 80, 1, 100000),
        input('FP', 'False positives', '', 20, 0, 100000),
        input('FN', 'False negatives', '', 40, 0, 100000),
        input('TN', 'True negatives', '', 860, 0, 1000000),
      ],
      outputs: [
        out('Accuracy', '%', '(TP + TN)/(TP + FP + FN + TN)*100', { digits: 4 }),
        out('Precision', '%', 'TP/(TP + FP)*100', { key: 'P', digits: 4 }),
        out('Recall', '%', 'TP/(TP + FN)*100', { key: 'R', digits: 4 }),
        out('F1', '%', '2*P*R/(P + R)', { digits: 4 }),
      ],
      note: 'Set TP = 1, FP = 0, FN = 99, TN = 9900: 99% accuracy, 1% recall.',
    },
  }),

  entry('numpy', 'concept', ML, 'curious', 'NumPy and Arrays', {
    summary: 'Python’s library for fast arrays of numbers. One line of NumPy replaces a slow Python loop — and its style (shapes, broadcasting, vectorised maths) carries straight over to PyTorch.',
    aliases: ['NumPy', 'ndarray', 'vectorization', 'vectorisation', 'vectorized', 'broadcasting'],
    tags: ['basics', 'python', 'ml'],
    year: 2006,
    body: doc`
      ~~~python
      import numpy as np

      q = np.array([0.1, 0.3, 0.5])                       # a query embedding
      docs = np.random.rand(10_000, 3)                    # 10,000 document embeddings (rows)

      docs_n = docs / np.linalg.norm(docs, axis=1, keepdims=True)   # normalise every row at once
      q_n = q / np.linalg.norm(q)
      scores = docs_n @ q_n                               # 10,000 cosine similarities in one matmul
      top5 = np.argsort(-scores)[:5]                      # indexes of the best 5
      print(docs.shape, scores.shape)                     # (10000, 3) (10000,)
      ~~~

      ## Why it's fast
      The loop runs in compiled C over a compact block of numbers, not in Python one object at a time — often 50–100× faster. "Vectorising" means expressing the computation as whole-array operations.

      ## Ideas to get used to
      - **Shape**: §(10000, 3)§ — rows × columns. Most bugs are shape bugs.
      - **Axis**: §axis=0§ goes down rows, §axis=1§ across columns.
      - **Broadcasting**: dividing a (10000, 3) array by a (10000, 1) array stretches the second to match.
      - §@§ is matrix multiplication.

      A brute-force vector search over tens of thousands of embeddings in NumPy is milliseconds — often all a prototype needs before pgvector.
    `,
  }),

  entry('pandas', 'concept', ML, 'curious', 'pandas and DataFrames', {
    summary: 'Tables in Python: load CSVs and SQL results, filter, group, join and summarise — SQL and Excel habits, in code. Handy for eval results, logs and datasets.',
    aliases: ['pandas', 'DataFrame', 'DataFrames', 'Polars'],
    tags: ['basics', 'python', 'data'],
    year: 2008,
    body: doc`
      ~~~python
      import pandas as pd

      calls = pd.read_sql("SELECT * FROM llm_calls WHERE created_at > now() - interval '7 days'", engine)
      calls["cost"] = (calls.input_tokens * 5 + calls.output_tokens * 25) / 1e6

      summary = (calls.groupby("feature")
                      .agg(calls=("id", "count"), cost=("cost", "sum"), p95_ms=("latency_ms", lambda s: s.quantile(0.95)))
                      .sort_values("cost", ascending=False))

      evals = pd.read_csv("eval_results.csv")                       # one row per test case
      evals.pivot_table(index="category", columns="prompt_version", values="passed", aggfunc="mean")
      ~~~

      ## The analyst's bridge
      If you know SQL: §df[df.x > 3]§ is WHERE, §groupby().agg()§ is GROUP BY, §merge§ is JOIN, §pivot_table§ is… a pivot table. Great in Jupyter for exploring eval results, logs and datasets before building anything.

      ## Where it doesn't belong
      In the request path of a web API — loading a DataFrame per request is slow and memory-hungry. Let Postgres do aggregates for the app; use pandas for analysis, data prep and offline jobs.

      **Polars** is a newer, much faster alternative with a similar feel.
    `,
  }),

  entry('jupyter', 'concept', ML, 'curious', 'Jupyter Notebooks', {
    summary: 'Code, output, charts and notes in one document, run cell by cell. The natural place to explore data, try prompts, test embeddings and prototype before it becomes app code.',
    aliases: ['Jupyter', 'Jupyter notebook', 'Jupyter notebooks', 'notebook cell', 'Google Colab', 'Colab'],
    tags: ['basics', 'tooling'],
    body: doc`
      ## Why notebooks
      Run a cell, look at the result, tweak, run again — without re-running everything before it. Perfect for: exploring a dataset, trying five prompt variants side by side, checking what an embedding model thinks is similar, plotting eval scores.

      ## Getting started
      ~~~bash
      uv add --dev jupyterlab ipykernel
      uv run jupyter lab
      ~~~
      Or open §.ipynb§ files directly in VS Code with the Jupyter extension, using your project's §.venv§ as the kernel. **Google Colab** gives free cloud notebooks with a GPU for experiments your laptop can't run.

      ## Pitfalls
      - **Hidden state**: cells run out of order leave variables the code on the page doesn't explain. Restart and run all before trusting a result.
      - **Secrets in outputs**: printed API keys get saved in the file and committed. Clear outputs before committing, or keep notebooks out of git.
      - **Not production code**: once something works, move it into a module with tests.
    `,
  }),

  entry('pytorch', 'concept', ML, 'curious', 'PyTorch and Tensors', {
    summary: 'The main library for building and training neural networks: NumPy-like tensors that run on GPUs and track gradients automatically.',
    aliases: ['PyTorch', 'torch', 'tensor', 'tensors', 'nn.Module', 'Hugging Face Transformers'],
    tags: ['basics', 'python', 'ml'],
    year: 2016,
    body: doc`
      ~~~python
      import torch
      from torch import nn

      device = "cuda" if torch.cuda.is_available() else "cpu"

      model = nn.Sequential(            # a small classifier over 768-dim embeddings
          nn.Linear(768, 256),
          nn.ReLU(),
          nn.Linear(256, 5),            # 5 ticket categories
      ).to(device)

      x = torch.randn(32, 768, device=device)          # a batch of 32 embeddings
      logits = model(x)                                # shape (32, 5)
      loss = nn.functional.cross_entropy(logits, labels)
      loss.backward()                                  # autograd fills .grad on every weight
      ~~~

      ## Tensors
      Like NumPy arrays, plus: they can live on the GPU (§.to("cuda")§), and operations on them are recorded so gradients can be computed backwards (autograd).

      ## Where you'll meet it
      - Training small models (a classifier on embeddings is a great first project).
      - Running open models in Python with **Hugging Face Transformers** (§AutoModelForCausalLM§), fine-tuning with PEFT/LoRA or Unsloth.
      - Under sentence-transformers for local embeddings.

      For just *using* LLMs in your app — through an API or Ollama — you don't need PyTorch at all.
    `,
  }),

  // ---------------------------------------------------------------- CS basics
  entry('binary-numbers', 'equation', CS, 'curious', 'Binary Numbers', {
    summary: 'Computers count in base 2: each bit doubles the number of values. 8 bits make 256 values, 32 bits about 4 billion — the maths behind integer limits, quantisation levels and hash sizes.',
    aliases: ['binary', 'binary numbers', 'base 2', 'hexadecimal', 'hex', 'two’s complement'],
    tags: ['basics', 'foundations'],
    latex: doc`\text{values with } n \text{ bits} = 2^n`,
    variables: [['n', 'Number of bits']],
    body: doc`
      ## Counting in base 2
      Decimal 13 = 8 + 4 + 1 = binary **1101**. Each position is a power of two: 1, 2, 4, 8, 16…

      ## Doubling per bit
      | Bits | Values | Where you meet it |
      |---|---|---|
      | 1 | 2 | a boolean |
      | 4 | 16 | 4-bit quantised weights: 16 levels |
      | 8 | 256 | a byte; INT8 quantisation |
      | 16 | 65,536 | FP16 / BF16 numbers |
      | 32 | ~4.3 billion | §int§ ids (signed: ±2.1 billion), IPv4 addresses, Unix time until 2038 |
      | 64 | ~1.8 × 10¹⁹ | §bigint§ ids, float64 |
      | 128 | ~3.4 × 10³⁸ | UUIDs, IPv6 |
      | 256 | ~1.2 × 10⁷⁷ | SHA-256 hashes |

      ## Hexadecimal
      Base 16 (0–9, a–f): one hex digit = 4 bits, two = a byte. Colours (§#f0a449§), hashes (§3f9a1c§), memory addresses and UUIDs are written in hex because it's compact and maps cleanly onto bits.

      ## Negative numbers
      Stored with "two's complement", which is why a signed 32-bit integer tops out at 2,147,483,647 and then wraps to −2,147,483,648 — the kind of overflow that bites ids and counters.
    `,
    calc: {
      inputs: [input('n', 'Bits', 'bits', 8, 1, 256, INT)],
      outputs: [
        out('Distinct values', '', '2^n'),
        out('Largest unsigned', '', '2^n - 1'),
        out('Largest signed', '', '2^(n - 1) - 1'),
        out('Decimal digits needed', '', 'ceil(n*log10(2))'),
      ],
      note: 'Try 4 (a quantised weight), 32 (an int id) and 122 (the random bits in a UUID).',
    },
  }),

  entry('encryption', 'equation', CS, 'curious', 'Encryption and Public-Key Cryptography', {
    summary: 'Encryption scrambles data so only key-holders can read it. Public-key cryptography lets strangers set up secrets and verify signatures — the basis of HTTPS, JWTs and SSH.',
    aliases: ['encryption', 'encrypted', 'decryption', 'public key', 'private key', 'public-key cryptography', 'cryptography', 'digital signature', 'digital signatures', 'SSH key'],
    tags: ['basics', 'security'],
    latex: doc`\text{brute force} \approx 2^{k-1} \text{ guesses on average}`,
    variables: [['k', 'Key length in bits']],
    body: doc`
      ## Symmetric
      One shared key locks and unlocks (AES). Fast — used for the bulk of every HTTPS connection and for encrypting disks and backups. Problem: how do two strangers agree on the key?

      ## Public-key (asymmetric)
      Each party has a **key pair**: a public key anyone can have, a private key kept secret.
      - Encrypt with someone's public key → only their private key decrypts.
      - **Sign** with your private key → anyone with your public key can verify it came from you and wasn't altered.
      - Key exchange (Diffie–Hellman) lets two sides compute the same secret over a public channel.

      ## Where it's in your stack
      - **HTTPS**: key exchange sets up a symmetric session key; the server's certificate is signed by a certificate authority.
      - **JWTs** (with RS256/ES256) and OAuth ID tokens are signed.
      - **SSH keys** for GitHub: your public key on GitHub, private key on your laptop.
      - **Password hashing** is related but different: hashing is one-way, encryption is reversible with the key.

      ## Rules
      Never invent your own crypto; use the platform's (TLS, libsodium, the §cryptography§ package). Keep private keys out of git and logs. Encryption at rest doesn't help if the app itself hands data to whoever asks — access control still matters.
    `,
    calc: {
      inputs: [
        input('k', 'Key length', 'bits', 128, 32, 256, INT),
        input('rate', 'Attacker guesses per second', '/s', 1e12, 1e6, 1e20, LOG),
      ],
      outputs: [
        out('Possible keys', '', '2^k'),
        out('Average time to brute-force', 'years', '2^(k - 1)/rate/yr'),
        out('Compared with the age of the universe', '×', '2^(k - 1)/rate/yr/1.38e10'),
      ],
      note: 'Every extra bit doubles the work. A trillion guesses a second against a 128-bit key is still hopeless.',
    },
  }),

  entry('sorting', 'equation', CS, 'curious', 'Sorting', {
    summary: 'Putting things in order — the most studied problem in computing. Good sorts take n log n comparisons; naive ones take n². You’ll use the built-in one, and ORDER BY.',
    aliases: ['sorting', 'sorting algorithm', 'sorting algorithms', 'quicksort', 'merge sort', 'Timsort', 'stable sort'],
    tags: ['basics', 'algorithms'],
    latex: doc`\text{comparisons} \approx n\log_2 n \ \ (\text{good}) \quad\text{vs}\quad \frac{n^2}{2} \ \ (\text{naive})`,
    variables: [['n', 'Items to sort']],
    body: doc`
      ## In practice
      ~~~python
      notes.sort(key=lambda n: n["updated"], reverse=True)        # in place
      top = sorted(chunks, key=lambda c: c.score, reverse=True)[:5]
      ~~~
      ~~~js
      const byNewest = [...notes].sort((a, b) => b.updated - a.updated);
      ~~~
      Python's built-in sort (Timsort) and modern JavaScript engines' are **stable** (equal items keep their order) and O(n log n). In SQL: §ORDER BY§, ideally served by an index so nothing needs sorting at all.

      ## The classic algorithms, in a sentence each
      - **Bubble / insertion sort**: compare neighbours and swap — O(n²), fine for tiny lists.
      - **Merge sort**: split in half, sort each, merge — always O(n log n).
      - **Quicksort**: pick a pivot, partition around it, recurse — O(n log n) on average, very fast in practice.

      ## Things to know
      - JavaScript's §sort()§ with no comparator sorts as **strings**: §[10, 9, 1].sort()§ → §[1, 10, 9]§. Always pass a comparator for numbers.
      - Top-k doesn't need a full sort: §heapq.nlargest(5, items)§ — the same idea vector indexes use.
      - Sorting once and then binary searching beats repeated linear scans.
    `,
    calc: {
      inputs: [input('n', 'Items', '', 1e6, 2, 1e10, LOG)],
      outputs: [
        out('n log₂ n comparisons', '', 'n*log2(n)', { key: 'good' }),
        out('n²/2 comparisons', '', 'n^2/2', { key: 'naive' }),
        out('Naive is slower by', '×', 'naive/good'),
      ],
      note: 'At a million items, the naive sort does about 25,000× more work.',
    },
  }),

  entry('data-formats', 'concept', CS, 'curious', 'Data Formats: CSV, YAML and Markdown', {
    summary: 'Plain-text formats you’ll read and write constantly: CSV for tables, YAML for configuration, Markdown for docs and LLM output, JSON Lines for datasets.',
    aliases: ['CSV', 'YAML', 'Markdown', 'JSON Lines', 'JSONL', 'file format', 'file formats', 'TOML'],
    tags: ['basics', 'data'],
    body: doc`
      | Format | Looks like | Used for |
      |---|---|---|
      | **CSV** | §id,title,tokens§ rows | spreadsheets, exports, eval results |
      | **JSON** | §{"id": 1}§ | APIs, config, LLM structured output |
      | **JSON Lines** | one JSON object per line | fine-tuning datasets, logs, batch jobs — easy to stream and append |
      | **YAML** | §key: value§ with indentation | Docker Compose, GitHub Actions, Kubernetes |
      | **TOML** | §[section]§ and §key = "value"§ | §pyproject.toml§ |
      | **Markdown** | §## Heading§, §**bold**§, lists | READMEs, notes (like this app), and most LLM replies |

      ## Gotchas
      - **CSV**: commas inside values need quoting; encodings vary (Excel likes UTF-8 with a BOM); always use a CSV library rather than §split(",")§.
      - **YAML**: indentation is structure; §no§, §on§ and §off§ may become booleans; tabs are forbidden.
      - **Markdown**: LLMs answer in it by default — render it (safely, sanitised) in the UI, or ask for plain text when you need plain text.
      - **JSON**: no comments, no trailing commas.

      ## Datasets for LLM work
      Fine-tuning and eval sets are almost always JSONL: one example per line, e.g. §{"messages": [...], "expected": "..."}§.
    `,
  }),
];
