// AI & ML Foundations: how models learn, with the equations and real numbers.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { ML } = AREA;

export const ML_ENTRIES = [
  entry('machine-learning', 'concept', ML, 'curious', 'What Machine Learning Is', {
    summary: 'Instead of writing rules, show a program examples and let it adjust numbers until its outputs match. Model, loss, optimiser, data — four parts, every time.',
    aliases: ['machine learning', 'supervised learning', 'unsupervised learning', 'self-supervised learning', 'training data', 'model training'],
    tags: ['foundations'],
    body: doc`
      ## The recipe
      Every ML system, from a spam filter to a frontier LLM, has the same four parts:
      1. **A model** — a function with adjustable numbers (parameters): $\hat y = f(x; \theta)$.
      2. **A loss** — one number saying how wrong the outputs are on examples.
      3. **An optimiser** — usually gradient descent: nudge every parameter in the direction that lowers the loss.
      4. **Data** — the examples. Mostly, *this* is what decides how good the model is.

      Training = repeat "predict, measure loss, nudge" millions of times.

      ## Kinds of learning
      - **Supervised** — examples come with answers: email → spam or not, house → price. What you did as an analyst with regression.
      - **Unsupervised** — no answers; find structure: clusters, embeddings.
      - **Self-supervised** — the answers are hidden inside the data itself. Hide the next word and predict it. No labelling needed, so you can train on the whole internet — the trick behind LLMs.
      - **Reinforcement learning** — act, get a reward, do more of what worked. Used to turn LLMs into assistants (RLHF) and reasoners.

      ## What "learned" means
      The model doesn't store the examples; it stores parameters that happen to produce the right outputs for them — and, if training went well, for new inputs too (generalisation). Whether it memorised or generalised is the question behind overfitting, and behind every eval.
    `,
  }),

  entry('vectors-dot-product', 'equation', ML, 'curious', 'Vectors and Dot Products', {
    summary: 'A vector is a list of numbers — a point or arrow in space. The dot product multiplies matching entries and adds: one number that measures how much two vectors point the same way.',
    aliases: ['vector', 'vectors', 'dot product', 'inner product', 'dimension', 'dimensions'],
    tags: ['maths', 'foundations'],
    latex: doc`\mathbf a \cdot \mathbf b = \sum_{i=1}^{d} a_i b_i = \lVert \mathbf a\rVert \, \lVert \mathbf b\rVert \cos\theta`,
    variables: [
      [doc`\mathbf a, \mathbf b`, 'Two vectors with d entries each'],
      [doc`\lVert \mathbf a\rVert`, 'Length of a: the square root of a · a'],
      [doc`\theta`, 'Angle between them'],
    ],
    body: doc`
      ## Why this one operation runs AI
      - A **neuron** computes a dot product of its inputs with its weights, then adds a bias.
      - A **matrix multiplication** is a grid of dot products — and that's nearly all the arithmetic in a transformer.
      - **Attention** scores are dot products between a query and each key: "how relevant is that token to this one?"
      - **Embedding search** ranks documents by the dot product (or cosine) with the question's vector.

      ## Two readings
      Algebraic: multiply pairwise and sum — $(1,2,3)\cdot(4,5,6) = 4 + 10 + 18 = 32$.
      Geometric: $\lVert\mathbf a\rVert\lVert\mathbf b\rVert\cos\theta$. Positive when they point roughly the same way, zero when perpendicular (unrelated), negative when opposed.

      ## High dimensions
      Embeddings have 384–4,096 dimensions. You can't picture them, but the maths is identical to 3D. One surprise: in high dimensions, two random vectors are almost always nearly perpendicular — so a cosine of 0.5 between embeddings is actually a strong signal.
    `,
    calc: {
      inputs: [
        input('a1', 'a₁', '', 1, -10, 10),
        input('a2', 'a₂', '', 2, -10, 10),
        input('a3', 'a₃', '', 3, -10, 10),
        input('b1', 'b₁', '', 4, -10, 10),
        input('b2', 'b₂', '', 5, -10, 10),
        input('b3', 'b₃', '', 6, -10, 10),
      ],
      outputs: [
        out('Dot product a · b', '', 'a1*b1 + a2*b2 + a3*b3', { key: 'dot', digits: 4 }),
        out('Length of a', '', 'sqrt(a1^2 + a2^2 + a3^2)', { key: 'na', digits: 4 }),
        out('Length of b', '', 'sqrt(b1^2 + b2^2 + b3^2)', { key: 'nb', digits: 4 }),
        out('cos θ', '', 'dot/(na*nb)', { key: 'cosang', digits: 4 }),
        out('Angle θ', '°', 'acos(cosang)*180/pi', { digits: 4 }),
      ],
      note: 'Make b = (2, 4, 6): same direction, cos θ = 1. Try (3, 0, −1): perpendicular to a, dot product 0.',
    },
  }),

  entry('matrix-multiplication', 'equation', ML, 'curious', 'Matrix Multiplication', {
    summary: 'Multiplying an m×k matrix by a k×n one takes 2mnk arithmetic operations. Nearly all the compute in a neural network is this, which is why GPUs exist.',
    aliases: ['matrix multiplication', 'matmul', 'matrix', 'matrices', 'FLOPs', 'FLOP', 'arithmetic intensity'],
    tags: ['maths', 'compute'],
    latex: doc`C_{ij} = \sum_{p=1}^{k} A_{ip}B_{pj}, \qquad \text{FLOPs} = 2mnk`,
    variables: [
      ['A', 'An m × k matrix (for example, a batch of m token vectors of size k)'],
      ['B', 'A k × n matrix (for example, a layer’s weights)'],
      ['C', 'The m × n result'],
    ],
    body: doc`
      ## A layer is a matmul
      Push a batch of $m$ token vectors (each of size $k$) through a layer with a $k \times n$ weight matrix: every output entry is a dot product of length $k$ — one multiply and one add per term, so $2mnk$ floating-point operations (FLOPs).

      A 4096 × 4096 layer on one token: 2 × 4096² ≈ 34 million FLOPs. A 7-billion-parameter model does about 14 billion FLOPs per generated token — roughly two per parameter.

      ## Compute-bound vs memory-bound
      A GPU can do hundreds of trillions of FLOPs per second, but can only read a few trillion **bytes** per second from memory. What matters is **arithmetic intensity**: FLOPs per byte moved.
      - Training, or processing a long prompt: big $m$, each weight is reused across many tokens → high intensity → limited by compute.
      - Generating one token at a time: $m = 1$, each weight read once for 2 FLOPs → intensity ≈ 1 → the GPU mostly waits on memory.

      That single fact explains why local generation speed is set by memory bandwidth, why batching many users together is so much cheaper per token, and why prompt processing is far faster than generation.
    `,
    calc: {
      inputs: [
        input('m', 'Rows of A (tokens in the batch)', '', 1, 1, 100000, { ...LOG, ...INT }),
        input('k', 'Shared dimension', '', 4096, 16, 65536, { ...LOG, ...INT }),
        input('n', 'Columns of B (layer outputs)', '', 4096, 16, 65536, { ...LOG, ...INT }),
        input('tflops', 'GPU compute', 'TFLOP/s', 100, 1, 2000, LOG),
        input('tbs', 'GPU memory bandwidth', 'TB/s', 1, 0.05, 8, LOG),
      ],
      outputs: [
        out('FLOPs', '', '2*m*n*k', { key: 'fl' }),
        out('Bytes moved (16-bit numbers)', 'B', '2*(m*k + k*n + m*n)', { key: 'by', prefix: true }),
        out('Arithmetic intensity', 'FLOP/byte', 'fl/by', { digits: 3 }),
        out('Time if compute-bound', 's', 'fl/(tflops*1e12)', { key: 'tc', prefix: true }),
        out('Time if memory-bound', 's', 'by/(tbs*1e12)', { key: 'tm', prefix: true }),
        out('Actual limit', '', 'if(tm - tc, 1, 0)', { digits: 1 }),
      ],
      note: 'Last line: 1 = memory is the bottleneck, 0 = compute is. m = 1 is generating one token; raise m to 512 (a prompt, or a batch of users) and it flips.',
    },
  }),

  entry('loss-functions', 'concept', ML, 'curious', 'Loss Functions', {
    summary: 'One number that says how wrong the model is. Training is nothing more than pushing it down — so what you choose to measure is what you get.',
    aliases: ['loss function', 'loss', 'objective function', 'mean squared error', 'MSE', 'cost function'],
    tags: ['foundations', 'training'],
    body: doc`
      ## The common ones
      - **Mean squared error** for numbers: $\frac1N\sum (y - \hat y)^2$. Squares punish big misses hard. It's what least-squares regression minimises.
      - **Cross-entropy** for choices (classes, next tokens): $-\ln p(\text{correct answer})$. Punishes confident wrong answers without limit.
      - **Contrastive losses** for embeddings: pull matching pairs together, push random pairs apart.

      ## It's the whole specification
      A model optimises exactly what the loss measures — not what you meant.
      - Next-token cross-entropy on internet text rewards producing *plausible* text, not *true* text. Hallucination follows directly.
      - A reward model that likes long, confident answers produces long, confident answers.
      - A classifier trained on 99% "not spam" learns to say "not spam".

      ## Loss vs metric
      Loss has to be smooth so gradients exist; what you actually care about (accuracy, "did it answer correctly", user satisfaction) often isn't. You train on the loss and judge on the metric — which is what evals are for.

      Goodhart's law in one line: *when a measure becomes a target, it ceases to be a good measure.* Machine learning is Goodhart's law on an industrial scale.
    `,
  }),

  entry('gradient-descent', 'equation', ML, 'curious', 'Gradient Descent', {
    summary: 'Find the slope of the loss for every parameter, step a little downhill, repeat. The learning rate sets the step: too small crawls, too big blows up.',
    aliases: ['gradient descent', 'learning rate', 'gradient', 'gradients', 'SGD', 'stochastic gradient descent', 'Adam', 'optimizer', 'optimiser'],
    tags: ['training', 'foundations'],
    year: 1847,
    latex: doc`\theta_{t+1} = \theta_t - \eta\,\nabla_\theta L(\theta_t)`,
    variables: [
      [doc`\theta`, 'All the parameters'],
      [doc`\eta`, 'Learning rate: the step size'],
      [doc`\nabla_\theta L`, 'Gradient: how much the loss changes as each parameter changes'],
    ],
    body: doc`
      ## Walking downhill in fog
      You can't see the whole landscape of the loss — billions of dimensions — but you can feel the slope where you stand. Step downhill, feel again, repeat. Cauchy described the method in 1847.

      ## The learning rate on a bowl
      Take the simplest loss, $L = a x^2$. Its slope is $2ax$, so each step gives
      $$x_{t+1} = x_t - \eta \cdot 2a x_t = (1 - 2\eta a)\,x_t.$$
      - $\eta < 1/(2a)$: shrinks smoothly towards 0.
      - $1/(2a) < \eta < 1/a$: overshoots, zig-zags, still converges.
      - $\eta > 1/a$: each step lands further out — **divergence**. That's the "loss went to NaN" of real training.
      Real losses have many curvatures at once; the steepest direction sets the safe step, the flattest sets how long it takes.

      ## In practice
      - **Stochastic**: compute the gradient on a mini-batch of examples, not the whole dataset — noisy but thousands of times cheaper per step.
      - **Adam** keeps running averages of each parameter's gradient and its square, giving every parameter its own effective step size. The default for transformers (as AdamW).
      - **Schedules**: warm the learning rate up from zero, then decay it.

      Backpropagation is how the gradient gets computed; gradient descent is what's done with it.
    `,
    calc: {
      inputs: [
        input('a', 'Curvature a in L = a·x²', '', 1, 0.1, 10, LOG),
        input('eta', 'Learning rate η', '', 0.1, 0.001, 2, LOG),
        input('x0', 'Starting point', '', 5, -10, 10),
        input('steps', 'Steps', '', 20, 1, 200, INT),
      ],
      outputs: [
        out('Factor per step (1 − 2ηa)', '', '1 - 2*eta*a', { key: 'q', digits: 4 }),
        out('Position after the steps', '', 'x0*q^steps', { key: 'xt', digits: 4 }),
        out('Loss after the steps', '', 'a*xt^2', { digits: 4 }),
        out('Largest learning rate that still converges', '', '1/a', { digits: 4 }),
        out('Steps to shrink the distance 1000×', '', 'ln(1000)/abs(ln(abs(q)))', { digits: 3 }),
      ],
      note: 'With a = 1, try η = 0.1 (smooth), 0.5 (one step!), 0.9 (zig-zag) and 1.1 (divergence).',
    },
  }),

  entry('linear-regression', 'equation', ML, 'curious', 'Linear Regression', {
    summary: 'Fit a straight line (or plane) to data by minimising squared error. The analyst’s workhorse — and a neural network with no hidden layers.',
    aliases: ['linear regression', 'least squares', 'regression', 'linear model'],
    tags: ['foundations', 'statistics'],
    year: 1805,
    latex: doc`\hat y = \mathbf w \cdot \mathbf x + b, \qquad \min_{\mathbf w, b} \frac{1}{N}\sum_{i}\left(y_i - \hat y_i\right)^2`,
    variables: [
      [doc`\mathbf x`, 'Input features'],
      [doc`\mathbf w, b`, 'Weights and bias: the parameters'],
      [doc`\hat y`, 'Prediction'],
    ],
    body: doc`
      ## The bridge from analysis to deep learning
      You've fitted these in Excel, SQL or statsmodels. Look at it as ML:
      - **model**: a dot product plus a bias;
      - **loss**: mean squared error;
      - **optimiser**: here there's a closed-form answer (the normal equations), but gradient descent reaches the same line.

      A neural network is this, stacked: many linear layers, each followed by a nonlinearity. Remove the nonlinearities and the whole stack collapses back into one linear regression — which is exactly why activation functions exist.

      ## Logistic regression
      Squash the output through a sigmoid and train with cross-entropy, and you have a classifier: $p(\text{spam}) = \sigma(\mathbf w\cdot\mathbf x + b)$. That is one neuron.

      ## What carries over
      Everything you know about regression still bites in deep learning: correlated features, outliers dominating squared error, leakage between train and test, and the difference between fitting the data and predicting new data.

      Legendre published least squares in 1805; Gauss claimed he'd used it since 1795.
    `,
  }),

  entry('softmax', 'equation', ML, 'curious', 'Sigmoid and Softmax', {
    summary: 'Turn raw scores (logits) into probabilities. Sigmoid for one yes/no; softmax for picking one of many — every next token an LLM produces comes out of a softmax.',
    aliases: ['softmax', 'sigmoid', 'logistic function', 'logits', 'logit', 'logistic regression'],
    tags: ['maths', 'foundations'],
    latex: doc`\text{softmax}(\mathbf z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}, \qquad \sigma(z) = \frac{1}{1 + e^{-z}}`,
    variables: [
      [doc`\mathbf z`, 'Logits: raw scores, any real numbers'],
      [doc`\sigma`, 'Sigmoid: squashes one score to between 0 and 1'],
    ],
    body: doc`
      ## Why exponentials
      Scores can be negative or huge; probabilities must be positive and sum to 1. Exponentiating makes everything positive and preserves order; dividing by the total normalises. Differences matter, not absolute values: logits (2, 1, 0) and (102, 101, 100) give identical probabilities.

      ## Worked example
      Logits $(2, 1, 0)$: $e^2 = 7.389$, $e^1 = 2.718$, $e^0 = 1$; total 11.107. Probabilities **0.665, 0.245, 0.090**. A gap of 1 in logits is a factor of $e \approx 2.7$ in probability.

      ## In an LLM
      The last layer produces one logit per vocabulary entry — 100,000+ of them. Softmax turns those into a probability for every possible next token; sampling picks one. **Temperature** divides the logits before the softmax to sharpen or flatten the distribution.

      ## In attention
      Softmax again: turns a token's similarity scores with every other token into weights that sum to 1 — how much to "look at" each.

      Sigmoid is the two-class case: softmax over $(z, 0)$ gives $\sigma(z)$.
    `,
    calc: {
      inputs: [
        input('z1', 'Logit 1', '', 2, -10, 10),
        input('z2', 'Logit 2', '', 1, -10, 10),
        input('z3', 'Logit 3', '', 0, -10, 10),
      ],
      outputs: [
        out('Sum of exponentials', '', 'exp(z1) + exp(z2) + exp(z3)', { key: 'Z', digits: 4 }),
        out('p₁', '', 'exp(z1)/Z', { digits: 4 }),
        out('p₂', '', 'exp(z2)/Z', { digits: 4 }),
        out('p₃', '', 'exp(z3)/Z', { digits: 4 }),
        out('Sigmoid of logit 1', '', '1/(1 + exp(-z1))', { digits: 4 }),
      ],
      note: 'Add 100 to every logit — nothing changes. Stretch the gaps (6, 3, 0) and the top choice takes almost everything.',
    },
  }),

  entry('cross-entropy', 'equation', ML, 'curious', 'Cross-Entropy and Perplexity', {
    summary: 'The loss for predicting choices: minus the log of the probability given to the right answer. Average it over tokens and exponentiate, and you get perplexity.',
    aliases: ['cross-entropy', 'cross entropy', 'log loss', 'negative log-likelihood', 'perplexity', 'bits per token'],
    tags: ['training', 'information theory'],
    year: 1948,
    latex: doc`L = -\frac{1}{T}\sum_{t=1}^{T} \ln p_\theta(x_t \mid x_{<t}), \qquad \text{perplexity} = e^{L}`,
    variables: [
      [doc`p_\theta(x_t \mid x_{<t})`, 'Probability the model gave to the actual next token, given everything before it'],
      ['T', 'Number of tokens'],
    ],
    body: doc`
      ## Per token
      If the model gave the real next token probability 0.5, the loss is $-\ln 0.5 = 0.69$. At 0.9 it's 0.105; at 0.01 it's 4.6; at 0 it's infinite. Confident mistakes are punished without limit — so models learn to spread a little probability everywhere.

      ## Perplexity: "choosing among how many?"
      $e^{L}$ is the effective number of equally likely options the model is torn between at each step. Perplexity 1 = certain; perplexity 20 = as unsure as picking uniformly from 20 words. Good LLMs on ordinary English text reach single digits.

      ## Bits and compression
      With $\log_2$ instead of $\ln$ you get **bits per token** — Shannon's information content (1948). A model with low cross-entropy is literally a good compressor: arithmetic coding with an LLM's probabilities compresses text better than zip. "Prediction is compression" is one of the deepest ideas in the field.

      ## Where you see it
      Training curves plot this loss falling. Scaling laws predict it from model size and data. And an LLM API's "logprobs" option shows you $\ln p$ for each generated token — a rough confidence signal.
    `,
    calc: {
      inputs: [input('p', 'Probability given to the correct token', '', 0.25, 0.0001, 1, LOG)],
      outputs: [
        out('Loss (nats)', '', '-ln(p)', { digits: 4 }),
        out('Loss (bits)', 'bits', '-log2(p)', { digits: 4 }),
        out('Perplexity if every token were like this', '', '1/p', { digits: 4 }),
      ],
      note: 'Halving the probability always adds the same 0.693 nats (1 bit) of loss.',
    },
  }),

  entry('neural-networks', 'equation', ML, 'curious', 'Neural Networks', {
    summary: 'Layers of simple units, each a weighted sum passed through a nonlinearity. Stack enough of them and they can approximate almost any function.',
    aliases: ['neural network', 'neural networks', 'neuron', 'neurons', 'deep learning', 'MLP', 'multilayer perceptron', 'hidden layer', 'weights and biases', 'feed-forward network'],
    tags: ['foundations', 'architecture'],
    latex: doc`\mathbf h = \phi(W\mathbf x + \mathbf b)`,
    variables: [
      [doc`\mathbf x`, 'Input vector'],
      ['W', 'Weight matrix: one row per neuron'],
      [doc`\mathbf b`, 'Bias vector'],
      [doc`\phi`, 'Activation function, applied to each entry (ReLU, GELU…)'],
      [doc`\mathbf h`, 'The layer’s output, fed to the next layer'],
    ],
    body: doc`
      ## One neuron, one layer, many layers
      A neuron: dot product of inputs with its weights, plus a bias, through a nonlinearity. A layer: many neurons at once — a matrix multiply. A network: layers chained, each transforming the previous one's output. "Deep" just means many layers.

      ## Why the nonlinearity
      Two linear layers in a row, $W_2(W_1\mathbf x)$, equal one linear layer $(W_2W_1)\mathbf x$. Without $\phi$, depth buys nothing. With it, each layer can bend and fold the space, and the **universal approximation theorem** says a wide enough network can approximate any reasonable function.

      ## What the parameters are
      Every entry of every $W$ and $\mathbf b$. A model file — §.safetensors§, §.gguf§ — is essentially these numbers, billions of them, plus a description of the wiring. "A 7B model" means about 7 billion of them.

      ## Inside a transformer
      Each block has a two-layer MLP (the "feed-forward network") with a hidden size about 4× the model width. These MLPs hold about two-thirds of a transformer's parameters and are thought to store much of its factual knowledge; attention moves information between tokens, MLPs process it at each position.
    `,
    calc: {
      inputs: [
        input('din', 'Inputs', '', 784, 1, 100000, { ...LOG, ...INT }),
        input('width', 'Neurons per hidden layer', '', 256, 1, 100000, { ...LOG, ...INT }),
        input('layers', 'Hidden layers', '', 2, 1, 200, INT),
        input('dout', 'Outputs', '', 10, 1, 100000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Parameters', '', '(din*width + width) + (layers - 1)*(width*width + width) + (width*dout + dout)', { key: 'np' }),
        out('Memory at 32-bit', 'B', 'np*4', { prefix: true }),
        out('FLOPs per input (forward pass)', '', '2*np'),
      ],
      note: 'Defaults are a classic handwritten-digit classifier (28×28 pixels in, 10 digits out): about 270,000 parameters. GPT-3 has 175 billion.',
    },
  }),

  entry('activation-functions', 'equation', ML, 'curious', 'Activation Functions', {
    summary: 'The nonlinearity after each layer. ReLU zeroes negatives; GELU and SiLU are smooth versions used in transformers. Without them, depth is pointless.',
    aliases: ['activation function', 'activation functions', 'ReLU', 'GELU', 'SiLU', 'SwiGLU', 'tanh'],
    tags: ['architecture'],
    latex: doc`\text{ReLU}(x) = \max(0, x), \qquad \text{GELU}(x) = x\,\Phi(x), \qquad \text{SiLU}(x) = \frac{x}{1 + e^{-x}}`,
    variables: [[doc`\Phi(x)`, 'Standard normal cumulative distribution: the chance a normal variable is below x']],
    body: doc`
      ## The lineage
      - **Sigmoid** and **tanh** (1980s–2000s): smooth, but flat at both ends, so gradients vanish in deep networks and training stalls.
      - **ReLU** (popular from ~2010): zero for negatives, identity for positives. Cheap, doesn't saturate for positive inputs — part of why deep networks started training well (AlexNet used it).
      - **GELU** (2016): $x$ times the probability a standard normal is below $x$ — a smooth ReLU that lets a little negative signal through. GPT-2, BERT.
      - **SiLU / Swish** and **SwiGLU**: smooth and gated; SwiGLU (an MLP where one branch gates the other through SiLU) is in Llama, Qwen, Mistral and most current open models.

      ## Does it matter much?
      Less than people think: the switch to ReLU was a big deal; since then choices move results by a percent or two. But they're part of the architecture, which is why a model can't just be loaded into code expecting a different activation.
    `,
    calc: {
      inputs: [input('x', 'Input x', '', -0.5, -5, 5)],
      outputs: [
        out('ReLU', '', 'max(0, x)', { digits: 4 }),
        out('GELU', '', 'x*ncdf(x)', { digits: 4 }),
        out('SiLU / Swish', '', 'x/(1 + exp(-x))', { digits: 4 }),
        out('Sigmoid', '', '1/(1 + exp(-x))', { digits: 4 }),
        out('tanh', '', 'tanh(x)', { digits: 4 }),
      ],
      note: 'Around x = −0.5 the smooth ones go slightly negative where ReLU is flat zero. Far from 0 they all agree with ReLU (except sigmoid and tanh, which flatten).',
    },
  }),

  entry('backpropagation', 'equation', ML, 'curious', 'Backpropagation', {
    summary: 'The chain rule, applied layer by layer backwards, gives the gradient for every parameter in about the cost of two forward passes. The engine of deep learning.',
    aliases: ['backpropagation', 'backprop', 'backward pass', 'autograd', 'automatic differentiation'],
    tags: ['training', 'maths'],
    year: 1986,
    latex: doc`\frac{\partial L}{\partial W_\ell} = \frac{\partial L}{\partial \mathbf h_\ell}\,\frac{\partial \mathbf h_\ell}{\partial W_\ell}, \qquad \frac{\partial L}{\partial \mathbf h_{\ell-1}} = \frac{\partial L}{\partial \mathbf h_\ell}\,\frac{\partial \mathbf h_\ell}{\partial \mathbf h_{\ell-1}}`,
    variables: [
      [doc`\mathbf h_\ell`, 'Output of layer ℓ'],
      [doc`W_\ell`, 'Weights of layer ℓ'],
    ],
    body: doc`
      ## The problem
      Gradient descent needs $\partial L/\partial w$ for *every* weight — billions of them. Nudging each weight and re-running the network would take billions of forward passes per step.

      ## The trick
      The loss depends on the last layer, which depends on the one before, and so on. The chain rule lets you pass a "blame signal" backwards: once you know how the loss changes with layer ℓ's output, one multiply gives it for layer ℓ's weights *and* for layer ℓ−1's output. One backward sweep yields every gradient, for about twice the compute of the forward pass. (Hence training ≈ 3× the FLOPs of inference per token: one forward, two backward.)

      Rumelhart, Hinton and Williams popularised it for neural networks in 1986, though versions go back to the 1960s–70s.

      ## You'll never write it by hand
      PyTorch records every operation in the forward pass and replays it backwards: §loss.backward()§ fills §.grad§ on every parameter. That's **autograd**.
      ~~~python
      loss = F.cross_entropy(model(x), y)
      loss.backward()        # backprop
      optimizer.step()       # gradient descent
      optimizer.zero_grad()
      ~~~

      ## Why depth used to be hard
      Multiply many small derivatives and the signal **vanishes**; many large ones and it **explodes**. ReLU-family activations, careful initialisation, normalisation layers and residual connections (the "+ x" in every transformer block) are what made hundred-layer networks trainable.
    `,
  }),

  entry('overfitting', 'concept', ML, 'curious', 'Overfitting and Generalization', {
    summary: 'A model that memorises its training data fails on new data. Hold out data it never trains on, and judge it only there.',
    aliases: ['overfitting', 'overfit', 'generalization', 'generalisation', 'train/test split', 'validation set', 'test set', 'data leakage', 'regularization'],
    tags: ['foundations', 'evaluation'],
    body: doc`
      ## The symptom
      Training loss keeps falling; validation loss bottoms out and rises. The model has started fitting noise and quirks of its particular examples.

      ## The discipline
      - **Train** set: fit parameters.
      - **Validation** set: choose settings — learning rate, epochs, prompt variants.
      - **Test** set: look once, at the end, to report how good it is.
      Tuning against the test set turns it into a validation set, and your reported number becomes optimistic.

      ## Leakage — the analyst's old enemy
      Anything that lets information from test into training inflates scores: duplicates across splits, features computed with future data, normalising with statistics from the full dataset. For LLMs the big one is **contamination**: benchmark questions (and answers) are on the internet the model trained on. A model acing a public benchmark may have seen it.

      ## Remedies
      More data; smaller or simpler models; regularisation (weight decay, dropout); stopping early; data augmentation.

      ## Why huge LLMs generalise at all
      They have enough parameters to memorise a lot, and they do memorise some (they can recite famous text). But the training data is so vast and varied that the cheapest way to predict it is to learn general patterns. And "double descent" showed that past a point, bigger models can generalise *better*, confounding the classic picture.

      For your app: an eval set you tune prompts against is a validation set. Keep a separate held-out set.
    `,
  }),

  entry('decision-trees-boosting', 'concept', ML, 'curious', 'Decision Trees and Gradient Boosting', {
    summary: 'For tables of numbers and categories, ensembles of decision trees (XGBoost, LightGBM) still usually beat neural networks. Not everything needs an LLM.',
    aliases: ['decision tree', 'decision trees', 'random forest', 'gradient boosting', 'XGBoost', 'LightGBM', 'tabular data'],
    tags: ['classic ml'],
    year: 2014,
    body: doc`
      ## A tree
      A flowchart of yes/no questions learned from data: *is income > ₹8 lakh? is age < 30?* Leaves hold predictions. Easy to read, but one tree overfits.

      ## Many trees
      - **Random forest**: hundreds of trees on random subsets of rows and columns, averaged.
      - **Gradient boosting**: trees added one at a time, each fitting the *errors* of all the previous ones. XGBoost (2014) and LightGBM made it fast; it wins most competitions on tabular data.

      ## Why it matters for you
      From analyst work you'll meet problems like churn, fraud, demand and scoring — rows and columns. There, boosting is fast to train on a laptop, handles missing values and mixed types, and is usually more accurate than a neural network — and far cheaper and more predictable than asking an LLM to classify rows.

      A useful split for a side project: **LLMs for language** (understanding, generating, extracting from text), **classic ML for tables**, and plain SQL for anything with a crisp rule. An LLM can even produce features — extract "sentiment" or "topic" from a free-text column — that a boosted model then uses.
    `,
  }),

  entry('embeddings', 'concept', ML, 'curious', 'Embeddings', {
    summary: 'A list of numbers that captures what something means, so that similar meanings land close together. The bridge between text and maths — and the heart of RAG.',
    aliases: ['embedding', 'embeddings', 'embedding model', 'vector embedding', 'semantic similarity', 'semantic search', 'latent space'],
    tags: ['foundations', 'vectors', 'rag'],
    year: 2013,
    body: doc`
      ## The idea
      An embedding model maps a piece of text (a word, a sentence, a paragraph) to a vector of, say, 768 numbers. It's trained so that texts with similar meaning get vectors pointing in similar directions:
      - "How do I reset my password?" and "I forgot my login" → close.
      - "How do I reset my password?" and "Recipe for dosa" → far apart.

      Nobody picks what each dimension means; they emerge from training, typically contrastively — pairs that belong together are pulled close, random pairs pushed apart.

      ## What you do with them
      - **Semantic search / RAG**: embed your documents once, embed the question, find nearest vectors.
      - **Clustering** support tickets or notes by topic.
      - **Deduplication**: near-identical vectors = near-identical content.
      - **Classification** with a handful of examples: nearest labelled neighbour.
      - **Recommendations**: "notes like this one".

      ## Practicalities
      - Different models live in different spaces. Vectors from model A and model B **can't be compared** — switch models and you re-embed everything.
      - Embedding models are small and cheap next to chat models; good ones run locally (see Local Embedding Models).
      - Store them in Postgres with pgvector.

      ## Inside LLMs too
      The first layer of every LLM turns each token into an embedding; every layer after refines those vectors. The famous word2vec result (2013) — *king − man + woman ≈ queen* — showed directions in this space can carry meaning.
    `,
  }),

  entry('cosine-similarity', 'equation', ML, 'curious', 'Cosine Similarity', {
    summary: 'How closely two vectors point the same way, ignoring length: 1 same direction, 0 unrelated, −1 opposite. The default way to compare embeddings.',
    aliases: ['cosine similarity', 'cosine distance', 'Euclidean distance', 'normalized vectors', 'unit vector'],
    tags: ['maths', 'vectors', 'rag'],
    latex: doc`\cos\theta = \frac{\mathbf a \cdot \mathbf b}{\lVert\mathbf a\rVert\,\lVert\mathbf b\rVert}, \qquad \lVert\hat{\mathbf a} - \hat{\mathbf b}\rVert^2 = 2 - 2\cos\theta`,
    variables: [
      [doc`\hat{\mathbf a}`, 'a scaled to length 1'],
      [doc`\theta`, 'Angle between the vectors'],
    ],
    body: doc`
      ## Why ignore length
      For many embedding models, a vector's length reflects things like text length or word frequency rather than meaning. Direction is what carries the meaning, so compare angles.

      ## The three distances are one distance
      If vectors are **normalised** to length 1 (many embedding APIs return them that way):
      - dot product = cosine similarity;
      - squared Euclidean distance = $2 - 2\cos\theta$.
      So ranking by any of the three gives the same order. pgvector's §<=>§ is cosine *distance* = $1 - \cos\theta$; smaller is closer.

      ## What values mean
      Depends on the model. Some put unrelated texts around 0.1–0.3 and near-duplicates above 0.9; others squeeze everything into 0.7–0.9. **Don't hard-code a threshold from a blog post** — embed a few pairs you know are related and unrelated, and look.

      ## The cost
      Comparing a query with a million 768-dim vectors is 768 million multiply-adds — well under a second on a CPU, which is why brute force is fine for small collections and vector indexes matter for large ones.
    `,
    calc: {
      inputs: [
        input('deg', 'Angle between vectors', '°', 60, 0, 180),
        input('d', 'Dimensions', '', 768, 2, 4096, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Cosine similarity', '', 'cos(deg*pi/180)', { key: 'cs', digits: 4 }),
        out('Cosine distance (pgvector <=>)', '', '1 - cs', { digits: 4 }),
        out('Euclidean distance between unit vectors', '', 'sqrt(2 - 2*cs)', { digits: 4 }),
        out('Typical |cos| between two random vectors', '', 'sqrt(2/(pi*d))', { digits: 3 }),
      ],
      note: 'The last line is why high-dimensional spaces are roomy: random vectors in 768 dimensions are nearly perpendicular (|cos| about 0.03), so modest similarities are meaningful.',
    },
  }),

  entry('tokenization', 'equation', ML, 'curious', 'Tokens and Tokenization', {
    summary: 'LLMs read and write tokens — common chunks of text, not letters or words. About ¾ of an English word each; more for Hindi or Tamil. Prices, limits and quirks all follow.',
    aliases: ['token', 'tokens', 'tokenization', 'tokenizer', 'tokeniser', 'BPE', 'byte-pair encoding', 'vocabulary'],
    tags: ['foundations', 'llm'],
    year: 2015,
    latex: doc`\text{tokens} \approx \frac{\text{words}}{0.75} \approx \frac{\text{characters}}{4} \quad (\text{English})`,
    variables: [],
    body: doc`
      ## Byte-pair encoding
      Start with bytes. Find the most frequent adjacent pair in a huge corpus, merge it into a new symbol; repeat ~100,000 times. Common words become one token (" the", " attention"), rarer words split into pieces ("Kolmogorov" → "K", "olm", "ogor", "ov"), and nothing is ever unknown because raw bytes remain as a fallback.

      ## Consequences you'll meet
      - **Pricing and limits** are per token, not per word or character.
      - **Other languages cost more.** Tokenizers trained mostly on English split Hindi, Tamil or Bengali into many more tokens per word — the same sentence can cost several times as much and use more context. Newer tokenizers narrow the gap.
      - **Spelling and counting are hard**: the model sees " strawberry" as a couple of chunks, not ten letters.
      - **Numbers split oddly** — "12345" might be "123" + "45" — one reason arithmetic is shaky without tools.
      - **Leading spaces matter**: " Hello" and "Hello" are different tokens.
      - Each model family has its own tokenizer; the same text gives different counts on Claude, GPT, Llama or Qwen. Use the provider's token-counting endpoint for exact numbers.

      ## Rules of thumb (English)
      1 token ≈ 4 characters ≈ ¾ of a word. A page ≈ 500 words ≈ 650–700 tokens. A 300-page book ≈ 100,000 words ≈ 130,000 tokens. Code usually packs fewer characters per token.
    `,
    calc: {
      inputs: [
        input('words', 'Words', '', 1000, 1, 10000000, LOG),
        input('tpw', 'Tokens per word', '', 1.33, 1, 8, LOG),
      ],
      outputs: [
        out('Tokens', '', 'words*tpw', { key: 'tk' }),
        out('Pages (500 words each)', '', 'words/500', { digits: 3 }),
        out('Characters (≈ 6 per English word incl. space)', '', 'words*6'),
        out('Share of a 200,000-token context', '%', 'tk/200000*100', { digits: 3 }),
      ],
      note: '1.33 tokens/word is typical English. Try 3–5 to see what a less-represented language can cost with an English-heavy tokenizer.',
    },
  }),

  entry('strawberry-question', 'question', ML, 'curious', 'Why can’t LLMs count the r’s in “strawberry”?', {
    summary: 'The model never sees letters — it sees a couple of tokens. Counting letters means recalling how each token is spelled, a skill it only half-learned. Tokenization, not stupidity.',
    aliases: ['strawberry problem', 'letter counting'],
    tags: ['puzzle', 'llm'],
    body: doc`
      ## What the model actually receives
      Not §s-t-r-a-w-b-e-r-r-y§ but something like §[" straw", "berry"]§ — two ids from a vocabulary of 100,000+. Ask "how many r's?" and the model must know, from training, how those chunks are spelled, then count — without ever having looked at letters.

      It *has* learned spellings, patchily, from text that happens to spell things out ("s-t-r-a-w…", dictionaries, typo discussions). "berry" containing two r's is a less common fact than you'd think.

      ## Same root, other symptoms
      - Reversing a word, rhyming, anagrams, counting words in a paragraph.
      - Arithmetic on long numbers split into odd chunks.
      - "Which is bigger, 9.11 or 9.9?" — tokenization plus the pull of version numbers and dates, where 9.11 comes after 9.9.

      ## How it's handled now
      - **Reasoning models** spell the word out character by character in their thinking, then count — mostly fixing it.
      - **Tools**: give the model a code-execution tool and it runs §"strawberry".count("r")§.

      ## The lesson for your app
      Don't ask an LLM to do what a line of Python does exactly: counting, sorting, date arithmetic, sums of a column. Compute those in code and give the model the result — or give it a tool.
    `,
  }),

  entry('attention', 'equation', ML, 'curious', 'Attention', {
    summary: 'Each token asks a question (query), every token advertises what it has (key), and each gets a weighted mix of the others’ information (values). The core of the transformer.',
    aliases: ['attention', 'self-attention', 'attention mechanism', 'scaled dot-product attention', 'multi-head attention', 'attention heads', 'queries keys and values', 'QKV'],
    tags: ['architecture', 'transformers'],
    year: 2014,
    latex: doc`\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V`,
    variables: [
      ['Q', 'Queries: what each token is looking for (n × dₖ)'],
      ['K', 'Keys: what each token offers to be matched on (n × dₖ)'],
      ['V', 'Values: the information each token passes on (n × dᵥ)'],
      [doc`d_k`, 'Size of each query/key vector; dividing by √dₖ keeps scores from growing with dimension'],
    ],
    body: doc`
      ## In words
      For the sentence "The cat sat on the mat because **it** was tired", the token "it" needs to work out what it refers to. Its query is compared (dot product) with every token's key; "cat" scores high. Softmax turns scores into weights; "it" receives mostly "cat"'s value vector. The same happens for every token, in parallel.

      ## Multi-head
      Do this 16–128 times in parallel with different learned projections — heads — each free to track something different: one follows syntax, one coreference, one copies earlier patterns. Concatenate, project, move on.

      ## Causal masking
      In a decoder LLM, a token may only attend to tokens *before* it (scores for later positions set to −∞ before the softmax), so the model can be trained to predict each next token in parallel without peeking.

      ## The n² in the room
      Every token is compared with every other: $n^2$ scores per head per layer. Doubling context quadruples attention work. Per layer, attention costs about $4n^2d$ FLOPs against $8nd^2$ for the projections, so attention dominates once the context is longer than about twice the model width.

      That cost drives much of modern engineering: **FlashAttention** (never materialise the full $n \times n$ matrix), the **KV cache** (don't recompute old keys and values), grouped-query attention (share keys/values across heads), and sliding-window or sparse variants.

      Bahdanau, Cho and Bengio introduced attention for translation in 2014; "Attention Is All You Need" (2017) built a whole architecture from it.
    `,
    calc: {
      inputs: [
        input('n', 'Context length', 'tokens', 8192, 16, 2000000, { ...LOG, ...INT }),
        input('d', 'Model width', '', 4096, 128, 32768, { ...LOG, ...INT }),
        input('heads', 'Attention heads', '', 32, 1, 256, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Attention scores per head per layer', '', 'n^2'),
        out('Score matrix size, all heads, one layer (16-bit)', 'B', 'n^2*heads*2', { prefix: true }),
        out('Attention FLOPs per layer', '', '4*n^2*d', { key: 'fa' }),
        out('Projection FLOPs per layer (Q, K, V, output)', '', '8*n*d^2', { key: 'fp' }),
        out('Attention share of the layer’s attention-block compute', '%', 'fa/(fa + fp)*100', { digits: 3 }),
      ],
      note: 'The full score matrix at long context would not fit in any GPU — which is exactly why FlashAttention computes it in tiles and never stores it. Try n = 1,000,000.',
    },
  }),

  entry('transformer', 'concept', ML, 'curious', 'The Transformer', {
    summary: 'A stack of identical blocks — attention to mix information across tokens, an MLP to process each token — with residual connections and normalisation. The architecture behind every major LLM.',
    aliases: ['transformer', 'transformers', 'transformer block', 'decoder-only', 'residual connection', 'residual stream', 'layer norm', 'LayerNorm', 'RMSNorm'],
    tags: ['architecture', 'transformers'],
    year: 2017,
    body: doc`
      ## One block
      ~~~text
      x = x + Attention(Norm(x))     # tokens exchange information
      x = x + MLP(Norm(x))           # each token processed on its own
      ~~~
      Repeat 12 (GPT-2 small) to 100+ times. The **residual** "x = x + …" means each block *adds* to a running vector per token — the residual stream — rather than replacing it. Gradients flow straight through the additions, which is what lets very deep stacks train.

      ## The whole model (decoder-only, like every chat LLM)
      1. Token ids → embeddings (plus position information, usually RoPE inside attention).
      2. N blocks.
      3. Final norm → a linear layer to one logit per vocabulary token → softmax → next-token probabilities.

      ## Why it won
      - **Parallel training**: unlike recurrent networks (RNNs, LSTMs) that read one token after another, a transformer processes all positions of a training sequence at once — a perfect fit for GPUs.
      - **Direct long-range links**: any token can attend to any earlier one in one step.
      - **It scales**: loss keeps improving predictably with more parameters, data and compute.

      ## Variations on the theme
      Encoder-only (BERT: reads the whole text both ways; embeddings and classifiers), encoder-decoder (the original, T5: translation), decoder-only (GPT, Claude, Llama: generation). Mixture-of-experts swaps the MLP for many routed ones. Vision transformers chop images into patches and treat them as tokens.
    `,
  }),

  entry('positional-encoding', 'concept', ML, 'curious', 'Positional Encoding and RoPE', {
    summary: 'Attention has no built-in sense of order — “dog bites man” looks like “man bites dog”. Position encodings add it; RoPE does it by rotating queries and keys.',
    aliases: ['positional encoding', 'position embedding', 'RoPE', 'rotary position embedding', 'context extension', 'YaRN'],
    tags: ['architecture', 'transformers'],
    year: 2021,
    body: doc`
      ## The problem
      Attention compares every token with every other using dot products — a set operation. Shuffle the input and each token gets the same scores. Order must be injected.

      ## Approaches
      - **Sinusoidal** (2017 paper): add sine and cosine waves of different frequencies to each embedding.
      - **Learned** absolute positions (GPT-2): a trained vector per position up to a fixed maximum (1,024) — the model can't go beyond it.
      - **RoPE** (Su et al., 2021): rotate each query and key vector by an angle proportional to its position, in many 2D planes at different frequencies. The dot product of a rotated query and key then depends only on their *relative* distance. Used by Llama, Qwen, Mistral, Gemma and most open models.

      ## Why you'll hear about it
      Context length. A model trained on 8K-token sequences has never seen rotation angles for position 100,000. Tricks like position interpolation and **YaRN** rescale the frequencies so a model can be stretched to longer contexts with a little extra training. When a local model's card says "32K native, 128K with YaRN", this is what it means — and quality usually degrades somewhat in the stretched range.
    `,
  }),

  entry('next-token-prediction', 'concept', ML, 'curious', 'Next-Token Prediction and Pretraining', {
    summary: 'LLMs are trained on one task: given the text so far, predict the next token. Done over trillions of tokens, that single objective forces a model to learn grammar, facts and reasoning patterns.',
    aliases: ['next-token prediction', 'pretraining', 'pre-training', 'base model', 'language model', 'language modeling', 'autoregressive', 'foundation model'],
    tags: ['training', 'llm'],
    body: doc`
      ## The objective
      Take a document, and at every position ask the model for a probability distribution over the next token; the loss is cross-entropy against the real one. Every position of every document is a free training example — no labels needed.

      ## Why so little yields so much
      To predict the next word of a physics textbook well, it helps to know physics. To predict a detective novel's last chapter, it helps to track the clues. To predict code, it helps to understand what the code does. Minimising prediction error on enough varied text pushes the model to build internal machinery for all of it. Whether that amounts to "understanding" is argued; that it's useful isn't.

      ## Generation is prediction in a loop
      Predict a distribution, sample a token, append it, repeat. Each token is generated one at a time — which is why output is slower and pricier than input, and why streaming exists.

      ## Base model vs assistant
      A **base model** straight out of pretraining is a document continuer: ask it a question and it may write three more questions, as if continuing a quiz. **Post-training** — supervised fine-tuning on example conversations, then RLHF-style preference tuning and reinforcement learning — turns it into an assistant that answers, follows instructions and declines some requests. Open-weight releases often publish both; for apps you want the **instruct** version.

      ## Scale
      Modern pretraining runs use 10–40 trillion tokens. Chinchilla-style scaling laws say how to split a compute budget between model size and data.
    `,
  }),

  entry('sampling-temperature', 'equation', ML, 'curious', 'Temperature and Sampling', {
    summary: 'Temperature divides the logits before softmax: low makes the top choice dominate (focused, repetitive), high flattens the odds (varied, erratic). Top-p trims the unlikely tail.',
    aliases: ['temperature', 'sampling', 'top-p', 'nucleus sampling', 'top-k', 'greedy decoding', 'deterministic output'],
    tags: ['llm', 'generation'],
    latex: doc`p_i = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}`,
    variables: [
      [doc`z_i`, 'Logit (raw score) for token i'],
      ['T', 'Temperature: 1 leaves the model’s distribution as trained; → 0 approaches always picking the top token'],
    ],
    body: doc`
      ## The knobs
      - **Temperature** $T$: sharpen ($T < 1$) or flatten ($T > 1$) the distribution.
      - **Top-k**: only consider the $k$ most likely tokens.
      - **Top-p (nucleus)**: only the smallest set of tokens whose probabilities add up to $p$ (say 0.9) — adapts to how confident the model is.
      - **Greedy**: always take the top token ($T \to 0$).

      ## When to use what
      - Extraction, classification, code, structured output: low temperature (0–0.3). You want the most likely answer.
      - Brainstorming, writing, varied examples: higher (0.7–1.0).
      - Very high: word salad.

      ## Current API reality
      Many recent hosted reasoning models manage sampling themselves and **reject** §temperature§/§top_p§ parameters (Claude's newest models return an error if you send them). Their outputs are shaped more by the prompt and by effort settings. Local models (Ollama, llama.cpp) expose all the knobs plus a **seed** for repeatable output.

      ## "Temperature 0 isn't deterministic"
      Even greedy decoding can vary slightly between runs on hosted APIs: floating-point sums on GPUs depend on how requests are batched together. Don't build tests that expect byte-identical output; test properties of the output instead.
    `,
    calc: {
      inputs: [
        input('z1', 'Logit of “Paris”', '', 5, -10, 20),
        input('z2', 'Logit of “Lyon”', '', 3, -10, 20),
        input('z3', 'Logit of “Nice”', '', 2, -10, 20),
        input('T', 'Temperature', '', 1, 0.05, 5, LOG),
      ],
      outputs: [
        out('Normaliser', '', 'exp(z1/T) + exp(z2/T) + exp(z3/T)', { key: 'Z', digits: 4 }),
        out('p(“Paris”)', '', 'exp(z1/T)/Z', { key: 'p1', digits: 4 }),
        out('p(“Lyon”)', '', 'exp(z2/T)/Z', { key: 'p2', digits: 4 }),
        out('p(“Nice”)', '', 'exp(z3/T)/Z', { key: 'p3', digits: 4 }),
        out('Entropy (0 = certain)', 'bits', '-(p1*log2(p1) + p2*log2(p2) + p3*log2(p3))', { digits: 3 }),
      ],
      note: 'Slide T from 0.1 to 5: at 0.1 it is nearly always “Paris”; at 5 the three are close to a coin toss.',
    },
  }),

  entry('parameter-count', 'equation', ML, 'curious', 'Counting a Transformer’s Parameters', {
    summary: 'Each block holds about 12·d² weights (4d² in attention, 8d² in the MLP), plus the token embedding table. GPT-2 small: 124 million. GPT-3: 175 billion.',
    aliases: ['parameter count', 'model parameters', 'model weights', 'weights', 'model size', 'billion parameters'],
    tags: ['architecture', 'numbers'],
    latex: doc`N \approx 12\,L\,d^2 + V d`,
    variables: [
      ['L', 'Number of transformer blocks (layers)'],
      ['d', 'Model width (embedding size)'],
      ['V', 'Vocabulary size'],
    ],
    body: doc`
      ## Where 12d² comes from
      - Attention: four $d \times d$ matrices (query, key, value, output) → $4d^2$.
      - MLP: up-projection $d \to 4d$ and down-projection $4d \to d$ → $8d^2$.
      Norms and biases add a rounding error.

      ## Checks against real models
      - **GPT-2 small**: $L = 12$, $d = 768$, $V = 50{,}257$. $12 \cdot 12 \cdot 768^2 = 84.9$M plus $50{,}257 \times 768 = 38.6$M → **123.5M**. OpenAI reported 124M.
      - **GPT-3**: $L = 96$, $d = 12{,}288$: $12 \cdot 96 \cdot 12{,}288^2 = 173.9$B plus 0.6B of embeddings → **174.6B**. Reported: 175B.

      Modern models tweak the recipe — SwiGLU MLPs with three matrices of width ~2.7d, grouped-query attention with smaller key/value projections, vocabularies of 128K–260K — but the estimate stays within a few percent to a few tens of percent.

      ## Why you care
      Parameters × bytes per parameter = memory to hold the model. 7B at 16-bit = 14 GB; at 4-bit ≈ 4 GB. And compute per generated token ≈ 2 × parameters FLOPs. Those two numbers decide what runs on your laptop.
    `,
    calc: {
      inputs: [
        input('L', 'Layers', '', 12, 1, 200, INT),
        input('d', 'Model width', '', 768, 64, 32768, { ...LOG, ...INT }),
        input('V', 'Vocabulary size', '', 50257, 1000, 300000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Parameters in the blocks', '', '12*L*d^2', { key: 'pb' }),
        out('Parameters in the embedding table', '', 'V*d', { key: 'pe' }),
        out('Total parameters', '', 'pb + pe', { key: 'N' }),
        out('Memory at 16-bit', 'B', 'N*2', { prefix: true }),
        out('Memory at 4-bit', 'B', 'N*0.5', { prefix: true }),
        out('FLOPs per generated token (≈ 2N)', '', '2*N'),
      ],
      note: 'Defaults are GPT-2 small. Try L = 96, d = 12288 for GPT-3, or L = 32, d = 4096, V = 128000 for a Llama-3-8B-sized model (the SwiGLU MLP makes the real one a bit bigger).',
    },
  }),

  entry('training-compute', 'equation', ML, 'curious', 'Training Compute: 6ND', {
    summary: 'Training costs about 6 FLOPs per parameter per token (2 forward, 4 backward); generating costs about 2. Enough to estimate GPU-hours for any model — and it matches published numbers.',
    aliases: ['training compute', '6ND', 'GPU-hours', 'MFU', 'model FLOPs utilization', 'compute budget'],
    tags: ['numbers', 'training', 'compute'],
    latex: doc`C_{\text{train}} \approx 6ND, \qquad C_{\text{infer}} \approx 2N \text{ per token}`,
    variables: [
      ['N', 'Parameters'],
      ['D', 'Training tokens'],
      ['C', 'Total floating-point operations'],
    ],
    body: doc`
      ## Where 6 comes from
      Forward pass: each parameter is used in one multiply and one add per token → 2N. Backward pass: gradients with respect to both activations and weights → about 4N. Total ≈ 6N per training token.

      ## A check against reality
      Llama 2 7B: $N = 7\times10^9$, $D = 2\times10^{12}$ tokens → $C = 8.4\times10^{22}$ FLOPs. An A100 GPU peaks at 312 TFLOP/s in 16-bit; real training achieves maybe 40% of that ("model FLOPs utilisation"). $8.4\times10^{22} / (1.25\times10^{14}) \approx 6.7\times10^8$ GPU-seconds ≈ **187,000 GPU-hours**. Meta reported 184,320. The back-of-envelope lands within 2%.

      ## Inference
      At 2N FLOPs per token, a 70B model needs 140 GFLOPs per token. For a single user that's usually not the limit — memory bandwidth is — but across millions of users it's the electricity bill.

      ## Why this matters to an app builder
      It explains the economics you're renting: why frontier models cost what they do per token, why smaller distilled models are so much cheaper, and why providers batch many users onto each GPU.
    `,
    calc: {
      inputs: [
        input('N', 'Parameters', '', 7e9, 1e6, 2e12, LOG),
        input('D', 'Training tokens', '', 2e12, 1e8, 1e14, LOG),
        input('peak', 'GPU peak', 'TFLOP/s', 312, 10, 5000, LOG),
        input('mfu', 'Utilisation (MFU)', '%', 40, 5, 80),
        input('gpus', 'GPUs', '', 1000, 1, 200000, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Training compute', 'FLOPs', '6*N*D', { key: 'C' }),
        out('GPU-hours', '', 'C/(peak*1e12*mfu/100)/3600', { key: 'gh' }),
        out('Wall-clock time on these GPUs', 'days', 'gh/gpus/24', { digits: 3 }),
        out('Tokens per parameter', '', 'D/N', { digits: 3 }),
        out('FLOPs to generate one token', '', '2*N'),
      ],
      note: 'Defaults reproduce Llama 2 7B on A100s. Try N = 175e9, D = 300e9 for GPT-3 (reported ≈ 3.1 × 10²³ FLOPs).',
    },
  }),

  entry('scaling-laws', 'equation', ML, 'curious', 'Scaling Laws', {
    summary: 'Loss falls as a smooth power law in parameters and data. Chinchilla (2022) showed the compute-optimal recipe is roughly 20 training tokens per parameter.',
    aliases: ['scaling laws', 'scaling law', 'Chinchilla', 'compute-optimal', 'Kaplan scaling laws'],
    tags: ['theory', 'training', 'numbers'],
    year: 2022,
    latex: doc`L(N, D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}`,
    variables: [
      ['N', 'Parameters'],
      ['D', 'Training tokens'],
      ['E', 'Irreducible loss: the entropy of text itself (fitted ≈ 1.69)'],
      [doc`A, B, \alpha, \beta`, 'Fitted constants (≈ 406.4, 410.7, 0.34, 0.28 in the Chinchilla paper)'],
    ],
    body: doc`
      ## The discovery
      Kaplan et al. (OpenAI, 2020) found that test loss follows power laws in model size, data and compute across many orders of magnitude — so you can train small models and predict what a big one will reach before spending the money. Hoffmann et al. (DeepMind, 2022) refitted with better experiments: **Chinchilla**, 70B parameters on 1.4T tokens, beat the 280B Gopher trained on 300B tokens, for the same compute.

      ## Reading the formula
      Three terms: a floor you can't beat ($E$), a penalty for too few parameters, a penalty for too little data. With a fixed budget $C \approx 6ND$, the best split grows both together — about 20 tokens per parameter.

      ## Since then
      Modern open models are trained far past "compute-optimal" — Llama 3 8B saw 15T tokens, ~1,900 per parameter — because a smaller model that's over-trained is cheaper to *serve* for years. Chinchilla-optimal minimises training cost; product teams care about training plus inference.

      Newer axes scale too: reinforcement learning compute, and **test-time compute** — letting a reasoning model think longer. The loss formula here is only about pretraining.

      ## A caution
      Lower loss predicts broad capability, not any specific skill. Some abilities appear smoothly; others look sudden on particular benchmarks.
    `,
    calc: {
      inputs: [
        input('N', 'Parameters', '', 7e10, 1e7, 1e13, LOG),
        input('D', 'Training tokens', '', 1.4e12, 1e9, 1e14, LOG),
      ],
      outputs: [
        out('Predicted loss', 'nats/token', '1.69 + 406.4/N^0.34 + 410.7/D^0.28', { digits: 4 }),
        out('Penalty for limited parameters', '', '406.4/N^0.34', { digits: 3 }),
        out('Penalty for limited data', '', '410.7/D^0.28', { digits: 3 }),
        out('Tokens per parameter', '', 'D/N', { digits: 3 }),
        out('Compute (6ND)', 'FLOPs', '6*N*D', { key: 'C' }),
        out('Chinchilla-optimal size for this compute', 'parameters', 'sqrt(C/120)'),
      ],
      note: 'Defaults are Chinchilla. Try Gopher (N = 2.8e11, D = 3e11) — same compute, higher loss. Then Llama 3 8B (8e9, 1.5e13).',
    },
  }),

  entry('fine-tuning', 'concept', ML, 'curious', 'Fine-Tuning', {
    summary: 'Keep training a pretrained model on your own examples to change its behaviour or style. Powerful, but usually not the first thing to reach for — prompting and RAG come first.',
    aliases: ['fine-tuning', 'fine-tune', 'fine-tuned', 'finetuning', 'SFT', 'supervised fine-tuning', 'instruction tuning', 'transfer learning'],
    tags: ['training', 'decisions'],
    body: doc`
      ## What it is
      Start from a trained model, and continue gradient descent on a smaller dataset of examples — input/output pairs, or conversations. The model shifts towards producing outputs like yours. Most of what the model knew stays; the new data mostly teaches **form**: format, tone, the task's shape.

      ## What it's good at
      - A consistent **output format or style** that prompting struggles to hold.
      - A narrow, repetitive task where a **small model** fine-tuned beats a big model prompted — cheaper and faster at scale.
      - **Distilling** a big model's behaviour into a small local one.
      - Domain jargon and conventions.

      ## What it's bad at
      - **Adding knowledge** reliably. Fine-tuning on your documents makes a model *sound* like it knows them while still getting facts wrong; it can even raise hallucination. For facts, use RAG.
      - Anything that changes weekly — you'd retrain weekly.

      ## The cost side
      You need hundreds to thousands of good examples, an eval to know it helped, and a way to serve the result. Full fine-tuning needs roughly 16 bytes of GPU memory per parameter; LoRA and QLoRA cut that enough to tune a 7–8B model on one consumer GPU.

      ## Order of operations
      Better prompt → few-shot examples → RAG → fine-tune. Each step up costs more and should be justified by an eval showing the previous step fell short.
    `,
  }),

  entry('lora', 'equation', ML, 'curious', 'LoRA and QLoRA', {
    summary: 'Freeze the model and train small low-rank add-on matrices instead. Updates well under 1% of the parameters, fits on one GPU, and the adapter file is megabytes.',
    aliases: ['LoRA', 'QLoRA', 'low-rank adaptation', 'adapter', 'adapters', 'PEFT', 'parameter-efficient fine-tuning'],
    tags: ['training', 'efficiency'],
    year: 2021,
    latex: doc`W' = W + \frac{\alpha}{r}\,BA, \qquad B \in \mathbb R^{d \times r},\ A \in \mathbb R^{r \times k},\ r \ll d, k`,
    variables: [
      ['W', 'A frozen d × k weight matrix of the base model'],
      ['B, A', 'The small trainable matrices'],
      ['r', 'Rank: 8–64 typically'],
      [doc`\alpha`, 'Scaling factor'],
    ],
    body: doc`
      ## The insight
      The *change* a fine-tune makes to a weight matrix turns out to be low-rank: it can be written as a thin matrix times a wide one. So instead of updating all $d \times k$ numbers, train $B$ ($d \times r$) and $A$ ($r \times k$) — $r(d + k)$ numbers. For $d = k = 4096$ and $r = 16$: 131,072 instead of 16.8 million, **0.8%**.

      ## Why it's practical
      - Memory: no gradients or optimiser state for the frozen weights. Full fine-tuning with Adam needs about 16 bytes per parameter (weights, gradients, two moment estimates, a full-precision master copy); LoRA needs that only for the adapters.
      - **QLoRA** (2023) also stores the frozen base in 4-bit, so a 7–8B model fine-tunes on a single 16–24 GB GPU, and a 70B one on a single 48 GB card.
      - Adapters are tiny files; swap them on one base model for different tasks. Ollama and llama.cpp can load a LoRA on top of a GGUF.

      ## Tools
      Hugging Face PEFT, Unsloth (fast, memory-efficient, notebook-friendly), Axolotl. The workflow: a JSONL of example conversations → train for a few epochs → evaluate against the base model on held-out examples.
    `,
    calc: {
      inputs: [
        input('Nb', 'Base model parameters', 'billion', 8, 0.1, 700, LOG),
        input('d', 'Model width', '', 4096, 256, 16384, { ...LOG, ...INT }),
        input('L', 'Layers', '', 32, 1, 128, INT),
        input('mats', 'Matrices adapted per layer', '', 4, 1, 7, INT),
        input('r', 'Rank', '', 16, 1, 256, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Trainable LoRA parameters', '', 'L*mats*r*2*d', { key: 'lp' }),
        out('Share of the model', '%', 'lp/(Nb*1e9)*100', { digits: 3 }),
        out('Full fine-tune memory (≈ 16 bytes/param)', 'B', 'Nb*1e9*16', { prefix: true }),
        out('LoRA memory, 16-bit base', 'B', 'Nb*1e9*2 + lp*16', { prefix: true }),
        out('QLoRA memory, 4-bit base', 'B', 'Nb*1e9*0.55 + lp*16', { prefix: true }),
      ],
      note: 'Memory excludes activations, which grow with batch size and sequence length. Mats = 4 adapts the attention projections; 7 adds the MLP too.',
    },
  }),

  entry('rlhf', 'concept', ML, 'curious', 'RLHF and Preference Tuning', {
    summary: 'People (or AIs) compare pairs of answers; the model is tuned to produce the preferred kind. How a text predictor becomes a helpful, harmless assistant — and why it sometimes flatters.',
    aliases: ['RLHF', 'reinforcement learning from human feedback', 'reward model', 'DPO', 'direct preference optimization', 'preference tuning', 'RLAIF', 'constitutional AI', 'AI alignment'],
    tags: ['training', 'alignment'],
    year: 2022,
    body: doc`
      ## Post-training, step by step
      1. **SFT**: fine-tune the base model on example conversations written by people.
      2. **Preferences**: show raters two answers to the same prompt; they pick the better one.
      3. **Reward model**: train a model to predict those preferences — a score for any answer.
      4. **RL**: optimise the LLM to get high reward (PPO), with a penalty for drifting too far from the SFT model so it doesn't learn to game the scorer.

      OpenAI's InstructGPT (2022) showed a 1.3B model tuned this way was preferred by users over the 175B GPT-3 base. ChatGPT followed that year.

      ## Simpler variants
      - **DPO** (2023): skip the reward model and RL loop; a clever loss trains directly on preference pairs. Popular for open models.
      - **RLAIF / Constitutional AI**: an AI does the rating, guided by written principles — Anthropic's approach for scaling feedback.
      - **RL with verifiable rewards**: for maths and code, the reward is simply "is the answer right / do the tests pass?" — the engine behind reasoning models.

      ## Side effects worth knowing
      Rewarding what raters *like* can reward confidence, length and agreement. **Sycophancy** — telling you your idea is great, changing a right answer when you push back — is a known result. When evaluating, ask models to critique, and don't take agreement as confirmation.
    `,
  }),

  entry('reasoning-models', 'concept', ML, 'curious', 'Reasoning Models and Test-Time Compute', {
    summary: 'Models trained to think step by step before answering, spending extra tokens on hard problems. More thinking buys accuracy on maths, code and planning — at the cost of time and tokens.',
    aliases: ['reasoning model', 'reasoning models', 'chain of thought', 'chain-of-thought', 'test-time compute', 'thinking tokens', 'extended thinking', 'adaptive thinking'],
    tags: ['llm', 'training'],
    year: 2024,
    body: doc`
      ## From a prompt trick to a training target
      In 2022, researchers found that asking a model to "think step by step" improved maths answers: writing intermediate steps gives the model more computation per answer (each token is another forward pass) and lets later steps build on earlier ones. From late 2024 (OpenAI's o1, then DeepSeek-R1 in January 2025, then essentially every frontier model), models were trained with **reinforcement learning** to produce long, useful chains of thought: try, check, backtrack, try again.

      ## Test-time compute
      A new scaling axis: instead of a bigger model, let the same model think longer. Accuracy on hard problems rises with thinking budget — with diminishing returns.

      ## In your app
      - Thinking tokens are billed as **output tokens**, usually the pricier kind. A short answer can hide thousands of thinking tokens.
      - Latency: thinking happens before the first answer token, so time-to-first-token grows. Stream, and show "thinking…".
      - Control it: current Claude models use **adaptive thinking** and an **effort** setting (low → max); other providers have similar knobs. Low effort for simple extraction and chat; higher for code, analysis and multi-step agents.
      - Hosted models often return only a *summary* of their reasoning, not the raw chain.

      ## When it doesn't help
      Simple lookups, formatting, short creative writing, classification. You pay more and wait longer for the same answer. Match effort to the task — and measure with evals.
    `,
  }),

  entry('gpus', 'concept', ML, 'curious', 'GPUs and Why AI Runs on Them', {
    summary: 'Thousands of simple cores doing the same arithmetic on different numbers — exactly the shape of matrix multiplication. Memory size decides what fits; memory bandwidth decides how fast it runs.',
    aliases: ['GPU', 'GPUs', 'CUDA', 'graphics card', 'tensor cores', 'VRAM', 'HBM', 'NVIDIA', 'TPU'],
    tags: ['hardware', 'compute'],
    year: 2007,
    body: doc`
      ## CPU vs GPU
      A CPU has a few complex cores, each fast at branching, unpredictable work. A GPU has thousands of simple ones built to do the same operation on huge arrays at once — first for pixels, then (with NVIDIA's CUDA, 2007) for anything. **Tensor cores** go further: dedicated units that multiply small matrices in one step, in low precision.

      ## The three numbers on a spec sheet
      | | Memory | Bandwidth | 16-bit compute |
      |---|---|---|---|
      | RTX 4090 (consumer) | 24 GB | ~1.0 TB/s | ~165 TFLOP/s (dense) |
      | RTX 5090 (consumer) | 32 GB | ~1.8 TB/s | ~210 TFLOP/s (dense) |
      | H100 SXM (datacentre) | 80 GB | ~3.35 TB/s | ~990 TFLOP/s (dense) |
      | Apple M-series Max (laptop) | up to 128 GB unified | ~0.4–0.55 TB/s | far lower |

      - **Memory** decides whether a model fits at all. Weights + KV cache must fit (or spill slowly to system RAM).
      - **Bandwidth** decides generation speed for one user: every token reads all active weights once.
      - **Compute** decides training speed and prompt-processing speed.

      ## Why NVIDIA
      The CUDA software ecosystem — PyTorch, FlashAttention, vLLM — was built on it for 15 years. AMD (ROCm), Apple (Metal/MLX), Google (TPUs) and others are catching up; llama.cpp runs well on all of them.

      Specs are approximate and vary by variant; treat them as orders of magnitude.
    `,
  }),

  entry('mixture-of-experts', 'equation', ML, 'curious', 'Mixture of Experts', {
    summary: 'Replace each MLP with many “expert” MLPs and a router that picks a few per token. Total parameters (memory) grow; active parameters (compute) stay small.',
    aliases: ['mixture of experts', 'mixture-of-experts', 'MoE', 'experts', 'active parameters', 'sparse model'],
    tags: ['architecture', 'efficiency'],
    year: 2017,
    latex: doc`\text{memory} \propto N_{\text{total}}, \qquad \text{compute per token} \approx 2N_{\text{active}}`,
    variables: [
      [doc`N_{\text{total}}`, 'All parameters, including every expert'],
      [doc`N_{\text{active}}`, 'Parameters actually used for one token: shared layers plus the chosen experts'],
    ],
    body: doc`
      ## How it works
      Each MoE layer has, say, 64 or 128 expert MLPs. A small router looks at each token and sends it to the top 2–8. Different tokens use different experts, so the model has a huge total capacity but each token only pays for a slice.

      ## Real examples
      | Model | Total | Active per token |
      |---|---|---|
      | Mixtral 8×7B (2023) | 46.7B | 12.9B |
      | DeepSeek-V3 (2024) | 671B | 37B |
      | gpt-oss-120b (2025) | 117B | 5.1B |
      | gpt-oss-20b (2025) | 21B | 3.6B |

      ## Why it matters for running models locally
      Generation speed is bounded by bytes read per token, and an MoE only reads the *active* experts' weights. gpt-oss-20b needs memory for 21B parameters but generates about as fast as a ~4B dense model. On a machine with lots of (even slowish) memory — a Mac with unified memory, or a PC offloading experts to system RAM — MoE models are often the sweet spot.

      The catch: all experts must still be *stored*. And routing makes batching and fine-tuning more complex.
    `,
    calc: {
      inputs: [
        input('tot', 'Total parameters', 'billion', 21, 1, 2000, LOG),
        input('act', 'Active parameters', 'billion', 3.6, 0.1, 500, LOG),
        input('bits', 'Bits per weight', 'bits', 4.25, 2, 16),
        input('bw', 'Memory bandwidth', 'GB/s', 400, 20, 8000, LOG),
      ],
      outputs: [
        out('Memory for weights', 'GB', 'tot*bits/8', { digits: 3 }),
        out('Bytes read per token', 'GB', 'act*bits/8', { key: 'rd', digits: 3 }),
        out('Upper bound on generation speed', 'tokens/s', 'bw/rd', { digits: 3 }),
        out('Same-size dense model would manage', 'tokens/s', 'bw/(tot*bits/8)', { digits: 3 }),
        out('FLOPs per token', '', '2*act*1e9'),
      ],
      note: 'Defaults ≈ gpt-oss-20b (4.25 bits ≈ its MXFP4 weights) on a 400 GB/s laptop. Real speed lands at maybe 50–80% of the bound.',
    },
  }),

  entry('distillation', 'concept', ML, 'curious', 'Distillation and Small Models', {
    summary: 'Train a small model to imitate a big one’s outputs. Much of the recent jump in what small and local models can do comes from learning from larger teachers.',
    aliases: ['distillation', 'knowledge distillation', 'distilled model', 'small language model', 'SLM', 'teacher model', 'student model'],
    tags: ['training', 'efficiency'],
    year: 2015,
    body: doc`
      ## The idea (Hinton et al., 2015)
      A big "teacher" model's full probability distribution says more than the one right answer: that "cat" is a likelier wrong answer than "car" is information. Train a small "student" to match those soft outputs, and it learns more per example than from hard labels alone.

      ## In the LLM era
      Often simpler: have a big model generate lots of high-quality answers, reasoning traces or conversations, then fine-tune a small model on them. DeepSeek released R1-distilled Qwen and Llama models in early 2025 that took small open models' maths ability up sharply this way.

      ## Why it matters to you
      - The small models you'll run locally (1–30B) are much stronger than their size once suggested, largely thanks to distillation and heavy over-training.
      - Your own app can do it in miniature: log your big hosted model's good outputs for one narrow task, then fine-tune a small local model on them — cheaper, faster and private, once the task is stable. Check the provider's terms first: many prohibit using outputs to train competing models.

      ## The ceiling
      A student rarely exceeds its teacher on the teacher's strengths, and imitation copies the *style* of reasoning more easily than its reliability. Evaluate on your task, not on vibes.
    `,
  }),

  entry('diffusion-models', 'concept', ML, 'curious', 'Diffusion Models', {
    summary: 'Image (and video and audio) generators that learn to remove noise step by step. Start from pure static and denoise, guided by a text prompt, until a picture appears.',
    aliases: ['diffusion model', 'diffusion models', 'Stable Diffusion', 'image generation', 'denoising', 'text-to-image'],
    tags: ['generative', 'images'],
    year: 2020,
    body: doc`
      ## Training
      Take a real image, add a little Gaussian noise, and train a network to predict the noise that was added. Do this at every noise level from "barely noisy" to "pure static". The network learns, in effect, which direction makes an image *more like a real image*.

      ## Generating
      Start from random noise. Ask the network "what noise is in this?", subtract a bit of it, repeat 20–50 times. A text encoder (like the embedding models behind search) feeds in the prompt so each step is nudged towards "a watercolour of a tiger". Guidance strength trades prompt-faithfulness against variety.

      ## Landmarks
      DDPM (2020) made the approach work well; DALL·E 2, Midjourney and Stable Diffusion (2022) made it public; Stable Diffusion's open weights made it run on home GPUs. Latent diffusion does the denoising in a compressed space rather than on raw pixels, which is what made that affordable. Video models extend the same idea through time.

      ## Versus LLMs
      LLMs generate one token after another; diffusion refines the whole output in parallel over many steps. Some newer image models are transformer-based or autoregressive, and diffusion *text* models exist — the architectures are converging. For your stack, image generation is another API call (or a local model via ComfyUI) returning bytes to store.
    `,
  }),
];
