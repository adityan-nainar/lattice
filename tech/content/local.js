// Local AI: running models on your own machine.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { LOCAL } = AREA;

export const LOCAL_ENTRIES = [
  entry('local-llms', 'concept', LOCAL, 'curious', 'Running LLMs Locally', {
    summary: 'Download an open-weight model and run it on your own laptop or server. Private, offline, free per token — and bounded by your memory and its bandwidth.',
    aliases: ['local LLM', 'local LLMs', 'local AI', 'local model', 'local models', 'self-hosted LLM', 'on-device AI', 'open-weight model', 'open-weight models'],
    tags: ['foundations', 'local'],
    year: 2023,
    body: doc`
      ## Why bother
      - **Privacy** — data never leaves the machine. Sometimes a hard requirement (company documents, health data).
      - **Cost** — no per-token bill. Great for bulk jobs: embedding thousands of documents, classifying every row, drafting summaries overnight.
      - **Offline and predictable** — no rate limits, no provider outages, no model silently changing under you.
      - **Learning** — you see the machinery: quantisation, context memory, speed limits.

      ## What it costs instead
      - Quality: a model that fits on a laptop (3–30B parameters) is well behind frontier hosted models on hard reasoning, long agentic tasks and coding — while being genuinely good at summarising, extracting, classifying, embedding and chat.
      - Hardware and your time: setup, updates, memory juggling.
      - Speed: often slower than hosted APIs, especially for long prompts.

      ## The whole stack in one line
      **Ollama** (or llama.cpp, LM Studio) loads a **GGUF** file of a **quantised** open-weight model into your GPU/unified memory and serves an HTTP API on localhost. Your Flask app calls it like any other API.

      ## Three numbers decide everything
      1. **Memory** for weights: parameters × bits per weight ÷ 8.
      2. **Memory** for context: the KV cache, growing with every token.
      3. **Bandwidth**: generation speed ≈ bandwidth ÷ bytes read per token.
      The entries in this area are those three numbers, explained.
    `,
  }),

  entry('ollama', 'concept', LOCAL, 'curious', 'Ollama', {
    summary: 'The easiest way to run local models: one install, “ollama run qwen3”, and an HTTP API on localhost:11434 that your app can call — including OpenAI- and Anthropic-compatible endpoints.',
    aliases: ['Ollama', 'ollama run', 'ollama pull', 'Modelfile', 'num_ctx', 'localhost:11434'],
    tags: ['tooling', 'local'],
    year: 2023,
    body: doc`
      ## Basics
      ~~~bash
      ollama pull qwen3:8b              # download (a quantised GGUF under the hood)
      ollama run qwen3:8b               # chat in the terminal
      ollama list                       # what's downloaded
      ollama ps                         # what's loaded, and on GPU or CPU
      ollama pull nomic-embed-text      # an embedding model
      ~~~
      It runs a background server on **http://localhost:11434**, built on llama.cpp, and handles downloading, GPU detection and loading/unloading models.

      ## The API
      ~~~bash
      curl http://localhost:11434/api/chat -d '{
        "model": "qwen3:8b",
        "messages": [{"role": "user", "content": "What is a KV cache?"}],
        "stream": false,
        "options": {"num_ctx": 8192, "temperature": 0.3}
      }'
      ~~~
      - §/api/chat§ — chat; streams newline-delimited JSON by default.
      - §/api/embed§ — embeddings (§{"model": "nomic-embed-text", "input": ["text 1", "text 2"]}§).
      - §/v1/chat/completions§, §/v1/embeddings§ — OpenAI-compatible; since early 2026 also an Anthropic-compatible endpoint — so many existing tools and SDKs work by changing the base URL.
      - §format§ — pass a JSON schema to force structured output.

      ## Settings that bite
      - **Context length** (§num_ctx§): Ollama's default is modest, and text beyond it is silently cut from the start of the conversation. Set it per request or in a Modelfile — and remember a bigger context costs memory.
      - **keep_alive**: models unload after ~5 minutes idle; the next call pays the load time again. Set §"keep_alive": "30m"§ (or -1) for a dev session.
      - **GPU vs CPU**: §ollama ps§ shows the split. "100% GPU" is what you want; a partial CPU split can be several times slower.

      ## Modelfile
      Like a Dockerfile for a model: base model + system prompt + parameters, saved under a new name (§ollama create study-helper -f Modelfile§).
    `,
  }),

  entry('llama-cpp', 'concept', LOCAL, 'curious', 'llama.cpp', {
    summary: 'The C/C++ inference engine that made local LLMs practical — runs quantised models on CPUs, Apple Silicon and every GPU brand. Ollama and LM Studio build on it.',
    aliases: ['llama.cpp', 'llama-server', 'llama-cli', 'GPU offload', 'ggml'],
    tags: ['tooling', 'local'],
    year: 2023,
    body: doc`
      ## Origin
      In March 2023, days after Meta's LLaMA weights leaked, Georgi Gerganov released llama.cpp: plain C/C++, no Python, 4-bit quantisation, running a 7B model on a MacBook. It kicked off the local-model movement. Its tensor library, **ggml**, gave the GGUF format its name.

      ## Using it directly
      ~~~bash
      # an OpenAI-compatible server with a web UI at http://localhost:8080
      llama-server -m models/Qwen3-8B-Q4_K_M.gguf -c 16384 -ngl 99 --port 8080
      ~~~
      - §-m§ — the GGUF file.
      - §-c§ — context length in tokens (KV cache memory grows with it).
      - §-ngl§ — how many layers to offload to the GPU; 99 means "all". Fewer layers on GPU lets a too-big model still run, with the rest on CPU — slower but working.
      - Prebuilt binaries cover CUDA (NVIDIA), Metal (Apple), Vulkan (AMD, Intel, NVIDIA) and CPU.

      ## Why use it instead of Ollama
      Newest features and model support first; exact control over every setting (quant types, KV-cache quantisation with §--cache-type-k q8_0§, speculative decoding, grammars); a single binary with nothing else. Ollama is the friendly wrapper; llama.cpp is the engine.

      ## Also in the toolbox
      §llama-quantize§ (make your own quants), §llama-bench§ (measure tokens/s on your hardware), §llama-perplexity§ (measure how much a quant hurt quality).
    `,
  }),

  entry('gguf', 'concept', LOCAL, 'curious', 'GGUF', {
    summary: 'The single-file format for local models: weights (usually quantised), tokenizer, chat template and metadata together. What Ollama, llama.cpp and LM Studio load.',
    aliases: ['GGUF', 'GGUF file', 'safetensors', 'chat template', 'Hugging Face', 'model file'],
    tags: ['formats', 'local'],
    year: 2023,
    body: doc`
      ## What's inside
      One file holding:
      - the **tensors** — every weight matrix, each stored in some quantisation type;
      - the **architecture** and hyperparameters — layers, heads, context length, RoPE settings;
      - the **tokenizer** — vocabulary and merge rules;
      - the **chat template** — how to wrap system/user/assistant turns in the special tokens this model was trained with.

      Introduced by llama.cpp in August 2023, replacing the older GGML files. A single self-describing file is what makes "download and run" possible.

      ## Where models come from
      Labs publish weights on **Hugging Face**, usually in §safetensors§ format at 16-bit (a safe, fast format for raw tensors — PyTorch's old pickle files could run arbitrary code when loaded). Community members (and increasingly the labs) convert them to GGUF at many quantisation levels: a repo will list §Q2_K§ … §Q8_0§ files for the same model. Ollama's library does this packaging for you.

      ## The chat template matters
      Models are trained with specific markers around turns. A wrong template — common with hand-imported GGUFs — gives rambling, repetitive or broken output. GGUF carries the template so the runtime can apply it; Ollama does so automatically.

      ## Picking a file
      For a given model, **Q4_K_M** is the usual sweet spot; go to Q5/Q6 if you have memory to spare, Q3 or IQ-quants only if you must.
    `,
  }),

  entry('quantization', 'equation', LOCAL, 'curious', 'Quantization', {
    summary: 'Store each weight in fewer bits — 4 instead of 16 — so a model takes a quarter of the memory and runs faster. Quality drops only a little at 4–6 bits, then falls off a cliff.',
    aliases: ['quantization', 'quantisation', 'quantized', 'quantised', 'quant', 'Q4_K_M', 'Q8_0', 'bits per weight', 'FP16', 'BF16', 'INT4', 'INT8', 'MXFP4', 'QAT'],
    tags: ['efficiency', 'local', 'numbers'],
    latex: doc`w \approx s\cdot q + m, \qquad q \in \{0, 1, \dots, 2^{b} - 1\}`,
    variables: [
      ['w', 'The original weight'],
      ['q', 'The stored integer code, b bits'],
      ['s, m', 'Scale and offset stored per small block of weights (e.g. 32)'],
      ['b', 'Bits per weight'],
    ],
    body: doc`
      ## The idea
      Weights are trained as 16- or 32-bit floats, but most of that precision is noise. Group weights into blocks of 32, store one scale (and offset) per block, and each weight as a small integer. At 4 bits every weight is one of 16 levels within its block's range.

      ## Number formats you'll see
      | Format | Bits | Notes |
      |---|---|---|
      | FP32 | 32 | training master copies |
      | BF16 / FP16 | 16 | "full precision" releases; BF16 keeps FP32's range with less precision |
      | Q8_0 | ~8.5 | practically lossless |
      | Q6_K, Q5_K_M | ~6.6, ~5.7 | very close to original |
      | **Q4_K_M** | ~4.8 | the default sweet spot |
      | Q3_K_M, Q2_K | ~3.9, ~3.4 | noticeable damage; for when nothing else fits |
      | MXFP4 | ~4.25 | 4-bit floats with shared exponents; gpt-oss ships in it |

      "K" quants (llama.cpp) mix precisions — more bits for sensitive tensors. "IQ" quants use smarter codebooks for better quality at 2–4 bits. **QAT** (quantisation-aware training) models were trained expecting 4-bit and lose less.

      ## Rules of thumb
      - A bigger model at 4-bit usually beats a smaller model at 8-bit of the same file size.
      - Quantisation hurts more on maths, code and long reasoning than on chat.
      - Small models (≤3B) suffer more from low bits than big ones.
      - Measure on *your* task if it matters: run a few eval questions on Q4 and Q8.
    `,
    calc: {
      inputs: [
        input('P', 'Parameters', 'billion', 8, 0.5, 700, LOG),
        input('b', 'Bits per weight', 'bits', 4.8, 1.5, 32),
      ],
      outputs: [
        out('Levels per weight', '', '2^floor(b)'),
        out('Model file size', 'GB', 'P*b/8', { key: 'gb', digits: 3 }),
        out('Size at 16-bit', 'GB', 'P*2', { digits: 3 }),
        out('Compression vs 16-bit', '×', '16/b', { digits: 3 }),
      ],
      note: '8B at Q4_K_M ≈ 4.8 GB (the real Llama 3.1 8B Q4_K_M file is 4.9 GB). 70B at 4.8 bits is 42 GB — out of reach for most laptops.',
    },
  }),

  entry('model-memory', 'equation', LOCAL, 'curious', 'How Much Memory a Model Needs', {
    summary: 'Weights (parameters × bits ÷ 8) plus KV cache for your context plus a runtime overhead. If the total fits in GPU or unified memory, it runs well; if not, it spills and crawls.',
    aliases: ['VRAM estimate', 'how much VRAM', 'memory requirements', 'will it fit', 'model memory'],
    tags: ['numbers', 'local', 'hardware'],
    latex: doc`M \approx \frac{P\,b}{8} + M_{\text{KV}}(\text{context}) + M_{\text{overhead}}`,
    variables: [
      ['P', 'Parameters'],
      ['b', 'Bits per weight after quantisation'],
      [doc`M_{\text{KV}}`, 'KV cache: grows linearly with context length'],
      [doc`M_{\text{overhead}}`, 'Runtime buffers, typically 0.5–1.5 GB'],
    ],
    body: doc`
      ## Quick table (Q4_K_M, ~8K context)
      | Model size | Weights | Rough total | Runs well on |
      |---|---|---|---|
      | 1–4B | 0.7–2.5 GB | 2–4 GB | any recent laptop, even CPU-only |
      | 7–9B | 4.5–5.5 GB | 6–8 GB | 8 GB GPU; 16 GB Mac |
      | 12–14B | 7.5–9 GB | 10–12 GB | 12–16 GB GPU; 24 GB Mac |
      | 20–32B (dense) | 12–20 GB | 16–24 GB | 24 GB GPU; 32 GB+ Mac |
      | 70B | ~42 GB | 48+ GB | 2 × 24 GB GPUs; 64 GB+ Mac |

      MoE models need memory for *all* experts: gpt-oss-20b ≈ 13 GB of weights even though it runs like a small model.

      ## Where it lives
      - **Discrete GPU**: VRAM is separate and fixed (8–32 GB on consumer cards). Anything that doesn't fit goes to system RAM over PCIe — much slower.
      - **Apple Silicon / unified memory**: the GPU uses system RAM directly; macOS lets it use roughly two-thirds to three-quarters of it by default.
      - **CPU only**: system RAM; works, just slower (bandwidth again).

      ## Leave room
      For the OS, your browser, VS Code, Docker, Postgres… A 16 GB laptop realistically gives a model 8–10 GB.

      Before downloading anything, run the numbers here.
    `,
    calc: {
      inputs: [
        input('P', 'Parameters', 'billion', 8, 0.5, 700, LOG),
        input('b', 'Bits per weight', 'bits', 4.8, 2, 16),
        input('kvpt', 'KV cache per token', 'KB', 128, 8, 2048, LOG),
        input('ctx', 'Context length', 'tokens', 8192, 512, 1000000, LOG),
        input('ovh', 'Runtime overhead', 'GB', 1, 0, 4),
        input('avail', 'Memory available to the model', 'GB', 8, 1, 512, LOG),
      ],
      outputs: [
        out('Weights', 'GB', 'P*b/8', { key: 'w', digits: 3 }),
        out('KV cache', 'GB', 'kvpt*1024*ctx/1e9', { key: 'kv', digits: 3 }),
        out('Total', 'GB', 'w + kv + ovh', { key: 'tot', digits: 3 }),
        out('Fits? (1 = yes)', '', 'if(avail - tot, 1, 0)', { digits: 1 }),
        out('Largest context that fits', 'tokens', 'max(0, (avail - w - ovh)*1e9/(kvpt*1024))'),
      ],
      note: '128 KB per token is Llama-3-8B-style at 16-bit (see KV Cache). Try a 32K or 128K context on an 8 GB card.',
    },
  }),

  entry('kv-cache', 'equation', LOCAL, 'curious', 'KV Cache', {
    summary: 'The keys and values of every earlier token, kept so they aren’t recomputed for each new one. It makes generation fast — and grows with every token of context, eating memory.',
    aliases: ['KV cache', 'key-value cache', 'grouped-query attention', 'GQA', 'KV cache quantization', 'PagedAttention'],
    tags: ['internals', 'numbers', 'local'],
    latex: doc`M_{\text{KV}} = 2 \times L \times h_{kv} \times d_{\text{head}} \times n_{\text{ctx}} \times \text{bytes}`,
    variables: [
      ['2', 'One key and one value per position'],
      ['L', 'Layers'],
      [doc`h_{kv}`, 'Key/value heads (fewer than query heads with grouped-query attention)'],
      [doc`d_{\text{head}}`, 'Size of each head'],
      [doc`n_{\text{ctx}}`, 'Tokens in the context'],
      [doc`\text{bytes}`, 'Per number: 2 at 16-bit, ~1 at 8-bit'],
    ],
    body: doc`
      ## Why it exists
      Generating token 1,001 needs attention over tokens 1–1,000, which needs their keys and values in every layer. They don't change, so compute them once and keep them. Without the cache, each new token would redo the whole prefix — quadratic work.

      ## Why it's big
      Llama 3 8B: 32 layers, 8 key/value heads, head size 128, at 16-bit:
      $2 \times 32 \times 8 \times 128 \times 2 = 131{,}072$ bytes = **128 KB per token**.
      At 8K context: 1 GB. At 128K context: **16 GB** — three times the 4-bit weights.

      ## Tricks to shrink it
      - **Grouped-query attention** (GQA): many query heads share fewer key/value heads. Llama 3 8B has 32 query heads but only 8 KV heads — a 4× saving already included above.
      - **KV cache quantisation**: store at 8-bit (§--cache-type-k q8_0§ in llama.cpp, §OLLAMA_KV_CACHE_TYPE§ in Ollama) — half the memory, small quality cost.
      - **Sliding-window** layers that only keep recent tokens (Gemma, gpt-oss), and latent attention that compresses keys and values (DeepSeek).
      - **PagedAttention** (vLLM): allocate the cache in pages like an OS does memory, so many users' caches pack tightly.

      ## Link to cost
      Prompt caching on hosted APIs is literally this cache, saved between requests.
    `,
    calc: {
      inputs: [
        input('L', 'Layers', '', 32, 1, 128, INT),
        input('hkv', 'KV heads', '', 8, 1, 128, INT),
        input('dh', 'Head size', '', 128, 32, 512, INT),
        input('ctx', 'Context length', 'tokens', 8192, 256, 2000000, LOG),
        input('bytes', 'Bytes per number', 'B', 2, 0.5, 4),
      ],
      outputs: [
        out('Per token', 'B', '2*L*hkv*dh*bytes', { key: 'pt', prefix: true }),
        out('Whole context', 'B', 'pt*ctx', { prefix: true }),
        out('Without GQA (if KV heads = 32)', 'B', '2*L*32*dh*bytes*ctx', { prefix: true }),
      ],
      note: 'Defaults are Llama 3 8B. Set bytes to 1 for an 8-bit cache. Push context to 131072 and compare with the 4.9 GB of weights.',
    },
  }),

  entry('tokens-per-second', 'equation', LOCAL, 'curious', 'Why Generation Is Memory-Bound', {
    summary: 'For one user, every generated token reads every active weight from memory once. So tokens per second ≈ memory bandwidth ÷ model size — compute barely matters.',
    aliases: ['memory bandwidth', 'memory-bound', 'bandwidth-bound', 'local generation speed'],
    tags: ['numbers', 'local', 'hardware'],
    latex: doc`\text{tokens/s} \lesssim \frac{\text{bandwidth}}{\text{bytes of active weights}}`,
    variables: [],
    body: doc`
      ## The argument
      To produce one token, the model multiplies its current vector by every weight matrix — each weight is read once and used for just 2 FLOPs. A GPU can do trillions of FLOPs per second but reads memory far more slowly, so it spends most of its time waiting for weights to arrive. The ceiling is simply how many times per second you can stream the model through the chip.

      ## Worked numbers (8B model at Q4_K_M ≈ 4.9 GB)
      | Hardware | Bandwidth | Ceiling | Typical real |
      |---|---|---|---|
      | Laptop CPU, dual-channel DDR5 | ~90 GB/s | ~18 tok/s | ~10 |
      | Apple M-series Pro / Max | 200–550 GB/s | 40–110 | 30–80 |
      | RTX 4090 | ~1,000 GB/s | ~200 | ~130 |

      ## Consequences
      - Halving the bits (8→4) roughly doubles speed — quantisation buys speed as well as space.
      - MoE models read only active experts: fast for their size.
      - Prompt processing (prefill) is *not* memory-bound — many tokens share each weight read — so it runs at hundreds to thousands of tokens per second, and it's a GPU's compute that matters there. A long prompt on CPU is painfully slow.
      - Serving several users at once is nearly free per token (each weight read serves the whole batch) — which is how hosted providers make the economics work, and what vLLM exploits.
    `,
    calc: {
      inputs: [
        input('bw', 'Memory bandwidth', 'GB/s', 400, 20, 8000, LOG),
        input('P', 'Active parameters', 'billion', 8, 0.5, 700, LOG),
        input('b', 'Bits per weight', 'bits', 4.8, 2, 16),
        input('eff', 'Efficiency (real / ceiling)', '%', 65, 20, 95),
      ],
      outputs: [
        out('Bytes read per token', 'GB', 'P*b/8', { key: 'gb', digits: 3 }),
        out('Ceiling', 'tokens/s', 'bw/gb', { key: 'ceil', digits: 3 }),
        out('Expected', 'tokens/s', 'ceil*eff/100', { key: 'tps', digits: 3 }),
        out('Time for a 500-token answer', 's', '500/tps', { digits: 3 }),
      ],
      note: 'Try 90 GB/s (a laptop CPU) with a 3B model, then a 70B model on 800 GB/s.',
    },
  }),

  entry('open-weight-families', 'concept', LOCAL, 'curious', 'Open-Weight Model Families', {
    summary: 'Llama, Qwen, Gemma, Mistral, DeepSeek, gpt-oss, Phi — downloadable models of every size, each with its own strengths and licence. Versions change monthly; families persist.',
    aliases: ['Llama', 'Qwen', 'Gemma', 'Mistral', 'DeepSeek', 'gpt-oss', 'Phi', 'open weights', 'open-source model', 'model licence'],
    tags: ['models', 'local'],
    body: doc`
      ## Families to know
      - **Qwen** (Alibaba) — the broadest range of sizes, strong at coding and multilingual text, dense and MoE, mostly Apache-2.0. A common default for local use.
      - **Llama** (Meta) — the family that started open-weight LLMs; huge ecosystem. Custom licence with conditions.
      - **Gemma** (Google) — well-behaved small and mid-size models, some with vision; QAT versions quantise well. Custom terms.
      - **Mistral** (France) — efficient models; several Apache-2.0.
      - **DeepSeek** — big MoE models (V3, R1) that shook up the field in 2025, MIT-licensed; distilled small versions run locally.
      - **gpt-oss** (OpenAI, 2025) — 20B and 120B MoE reasoning models, Apache-2.0; the 20B runs in ~16 GB.
      - **Phi** (Microsoft) — small models trained heavily on synthetic data, MIT.
      Plus specialists: coding models, vision-language models (§-vl§), embedding models, rerankers.

      ## "Open weights" isn't "open source"
      You get the trained parameters, usually not the training data or full recipe. Licences vary: Apache-2.0 and MIT are simple; Llama- and Gemma-style licences add conditions (acceptable-use policies, naming, user-count thresholds). Read the licence before building a product on one.

      ## Keeping current
      This field moves monthly — any specific "best model" list is stale by the time you read it. Check the Ollama library, Hugging Face trending models and a couple of trusted leaderboards, then **test the top two or three on your own eval**. Your task, your hardware, your languages decide.
    `,
  }),

  entry('model-names', 'example', LOCAL, 'curious', 'Reading a Model Name', {
    summary: 'qwen3:8b-instruct-q4_K_M, Llama-3.1-8B-Instruct-Q4_K_M.gguf, Qwen3-30B-A3B — every part of the name tells you something: family, version, size, tuning, quantisation.',
    aliases: ['model tag', 'model name', 'instruct model', 'A3B'],
    tags: ['local', 'walkthrough'],
    body: doc`
      ## Take §Qwen3-30B-A3B-Instruct-Q4_K_M.gguf§ apart
      | Part | Meaning |
      |---|---|
      | §Qwen3§ | family and generation |
      | §30B§ | total parameters: 30 billion |
      | §A3B§ | *active* parameters per token: 3 billion → a mixture-of-experts model (fast like 3B, memory like 30B) |
      | §Instruct§ | post-trained to follow instructions and chat (vs §Base§: raw text continuation). Also written §-it§, §-chat§ |
      | §Q4_K_M§ | quantisation: ~4.8 bits per weight, K-quant, medium mix |
      | §.gguf§ | file format for llama.cpp / Ollama / LM Studio |

      ## Other suffixes
      - §Coder§, §Math§ — specialised fine-tunes.
      - §VL§, §Vision§ — accepts images.
      - §Distill§ — trained to imitate a bigger model (e.g. §DeepSeek-R1-Distill-Qwen-7B§: Qwen 7B taught by R1).
      - §QAT§ — quantisation-aware trained; holds up better at 4-bit.
      - §128k§, §1M§ — context length (check whether "native" or stretched with YaRN).
      - §GPTQ§, §AWQ§, §EXL2§ — other quantisation formats for GPU servers, not GGUF.
      - §F16§, §BF16§ — unquantised 16-bit.

      ## Ollama's tags
      §qwen3:8b§ = family §qwen3§, tag §8b§ — Ollama picks a sensible default quant (usually Q4_K_M). Explicit tags like §qwen3:8b-q8_0§ pick another. §ollama show qwen3:8b§ prints parameters, quantisation, context length and template.

      ## Estimating from the name alone
      §8B§ at §Q4_K_M§: 8 × 4.8 ÷ 8 ≈ **4.8 GB** of weights. That's the first check before any download.
    `,
  }),

  entry('local-embeddings', 'concept', LOCAL, 'curious', 'Local Embedding Models', {
    summary: 'Small models that turn text into vectors, fast enough to run on a CPU. The easiest win for local AI: private, free RAG indexing with quality close to hosted APIs.',
    aliases: ['embedding models', 'nomic-embed-text', 'bge-m3', 'sentence-transformers', 'mxbai-embed-large', 'EmbeddingGemma', 'multilingual embeddings'],
    tags: ['local', 'rag', 'vectors'],
    body: doc`
      ## Why local embeddings are a no-brainer
      Embedding models are tiny next to chat models — tens to a few hundred million parameters — so they run quickly even without a GPU. Indexing thousands of documents costs nothing, and your documents never leave the machine.

      ## Some well-known choices
      | Model | Dimensions | Notes |
      |---|---|---|
      | §all-MiniLM-L6-v2§ | 384 | tiny, fast, English, older |
      | §nomic-embed-text§ | 768 | popular default in Ollama; long inputs |
      | §mxbai-embed-large§ | 1024 | strong English retrieval |
      | §bge-m3§ | 1024 | multilingual (useful for Hindi, Tamil and mixed text) |
      | §EmbeddingGemma§, §Qwen3-Embedding§ | 768–4096 | 2025 generation, multilingual |
      Check the MTEB leaderboard (retrieval tab) and — as always — test on your own questions.

      ## Using them
      ~~~python
      # via Ollama
      r = requests.post("http://localhost:11434/api/embed",
                        json={"model": "nomic-embed-text", "input": [c.text for c in batch]}, timeout=120)
      vectors = r.json()["embeddings"]

      # or in-process with sentence-transformers
      from sentence_transformers import SentenceTransformer
      model = SentenceTransformer("BAAI/bge-m3")
      vectors = model.encode(texts, normalize_embeddings=True, batch_size=32)
      ~~~

      ## Gotchas
      - Some models want task prefixes (§"search_query: "§ vs §"search_document: "§ for nomic) — read the model card; skipping them quietly hurts retrieval.
      - Every document and query must use the **same model** (and prefix scheme). Store the model name next to each vector.
      - Batch your inputs; one HTTP call per chunk is slow.
    `,
  }),

  entry('openai-compatible-apis', 'concept', LOCAL, 'curious', 'OpenAI-Compatible APIs', {
    summary: 'OpenAI’s chat completions request shape became a de facto standard. Ollama, llama.cpp, vLLM, LM Studio and LiteLLM all speak it, so switching models is often a base-URL change.',
    aliases: ['OpenAI-compatible', 'OpenAI compatible API', '/v1/chat/completions', 'base URL', 'base_url'],
    tags: ['api', 'local', 'interoperability'],
    body: doc`
      ## The shape
      ~~~bash
      curl http://localhost:11434/v1/chat/completions \
        -H "Content-Type: application/json" \
        -d '{"model": "qwen3:8b", "messages": [{"role": "user", "content": "Hi"}], "stream": true}'
      ~~~
      Same paths, fields and streaming format across servers:
      - Ollama — §http://localhost:11434/v1§
      - llama.cpp's §llama-server§ — §http://localhost:8080/v1§
      - LM Studio — §http://localhost:1234/v1§
      - vLLM — §http://localhost:8000/v1§
      Any client library for that API works by pointing its base URL there (the API key can be any string locally).

      ## Why it matters for your app
      Develop against a local model for free, fast iteration; run bulk jobs locally; send hard requests to a hosted model — with one internal function whose base URL and model name come from configuration.

      ## Where compatibility ends
      Advanced features differ: tool calling reliability varies by model and server, structured-output support differs, reasoning/thinking fields differ, and provider-specific features (prompt caching controls, citations, server tools) don't translate. Ollama also offers an Anthropic-compatible endpoint, and each hosted provider's own SDK exposes features the compatible layer can't. Keep provider-specific code behind your §llm.py§ boundary and test each backend you use with your evals.
    `,
  }),

  entry('serving-vllm', 'equation', LOCAL, 'curious', 'Serving Many Users: vLLM and Batching', {
    summary: 'One user leaves a GPU mostly idle waiting on memory. Batch many users’ tokens into each step and throughput multiplies almost for free — the idea behind vLLM and every hosted API.',
    aliases: ['vLLM', 'continuous batching', 'batching', 'inference server', 'throughput vs latency', 'SGLang', 'TGI'],
    tags: ['serving', 'performance'],
    year: 2023,
    latex: doc`\text{throughput} \approx B \times \frac{\text{bandwidth}}{\text{model bytes}} \quad\text{until}\quad 2N B \approx \text{peak FLOP/s} \times \frac{\text{model bytes}}{\text{bandwidth}}`,
    variables: [
      ['B', 'Sequences decoded together in each step (batch size)'],
      ['N', 'Active parameters'],
    ],
    body: doc`
      ## Why batching is nearly free
      Generating one token reads all the weights once. Generating one token for each of 32 users *also* reads all the weights once — each weight is multiplied against 32 vectors instead of 1. Until the arithmetic catches up with memory, each step costs about the same and produces 32 tokens.

      ## vLLM (2023)
      An inference server built for this:
      - **Continuous batching** — new requests join the running batch at the next step instead of waiting for a whole batch to finish.
      - **PagedAttention** — KV cache stored in fixed-size pages, so memory isn't wasted on each request's worst-case length and many more requests fit.
      - Prefix caching, speculative decoding, tensor parallelism across GPUs, an OpenAI-compatible API.
      Alternatives: SGLang, TensorRT-LLM, Hugging Face TGI.

      ## Ollama vs vLLM
      Ollama/llama.cpp: one or a few users, laptops, any hardware, GGUF quants — perfect for development and personal tools. vLLM: a Linux server with a proper NVIDIA (or AMD) GPU serving many concurrent users. If your side project ever hosts an open model for real traffic, this is the jump.

      ## The trade-off
      Bigger batches raise total throughput but can slow each individual user's stream a little. Hosted APIs tune this constantly — it's why their speed varies with time of day.
    `,
    calc: {
      inputs: [
        input('gb', 'Model weights', 'GB', 16, 1, 1000, LOG),
        input('N', 'Active parameters', 'billion', 8, 0.5, 700, LOG),
        input('bw', 'GPU memory bandwidth', 'GB/s', 1000, 100, 8000, LOG),
        input('peak', 'GPU compute', 'TFLOP/s', 150, 10, 5000, LOG),
        input('B', 'Batch size (concurrent sequences)', '', 1, 1, 1024, { ...LOG, ...INT }),
      ],
      outputs: [
        out('Time per step, memory-bound', 'ms', 'gb/bw*1000', { key: 'tm', digits: 3 }),
        out('Time per step, compute-bound', 'ms', '2*N*1e9*B/(peak*1e12)*1000', { key: 'tc', digits: 3 }),
        out('Tokens/s per user', 'tokens/s', '1000/max(tm, tc)', { key: 'per', digits: 3 }),
        out('Total throughput', 'tokens/s', 'per*B', { digits: 4 }),
        out('Batch size where compute takes over', '', 'peak*1e12*(gb/bw)/(2*N*1e9)', { digits: 3 }),
      ],
      note: 'Defaults: an 8B model at 16-bit on a 4090-class GPU. Raise the batch from 1 to 64: total throughput soars while each user barely slows. (KV-cache memory, ignored here, is the other limit.)',
    },
  }),

  entry('local-hardware', 'concept', LOCAL, 'curious', 'Hardware for Local AI', {
    summary: 'What your machine can run comes down to memory size and bandwidth. A rough guide from CPU-only laptops to Macs with lots of unified memory to 24 GB GPUs.',
    aliases: ['Apple Silicon', 'unified memory', 'RTX', 'CPU inference', 'NPU'],
    tags: ['hardware', 'local'],
    body: doc`
      ## Tiers (4-bit models, comfortable contexts)
      | Machine | Comfortable | Feels like |
      |---|---|---|
      | Laptop, 16 GB RAM, no usable GPU | 1–4B; 7–8B slowly | ~5–15 tok/s; slow on long prompts |
      | Gaming laptop / PC, 8 GB GPU | 7–9B | 40–80 tok/s |
      | 12–16 GB GPU | 12–14B, gpt-oss-20b | 40–100 tok/s |
      | 24–32 GB GPU (4090, 5090) | 27–32B dense, 30B-class MoE | 30–150 tok/s |
      | Mac, 32–64 GB unified | 30B-class; 70B at 64 GB | 10–60 tok/s |
      | Mac, 128 GB unified | 70B comfortably, ~120B MoE | 10–40 tok/s |

      ## Choosing
      - **NVIDIA GPU**: fastest per rupee for models that fit in VRAM; best software support (CUDA). Hard ceiling at the card's memory.
      - **Apple Silicon**: lots of memory the GPU can use (unified), decent bandwidth, silent — big models run, slower than a high-end GPU.
      - **CPU only**: everything works through llama.cpp, just slower; small models (≤4B) and embeddings are perfectly usable.
      - **NPUs** in newer laptops: improving, but software support for LLMs is still patchy.

      ## Check what you have
      Windows: Task Manager → Performance → GPU shows "Dedicated GPU memory". Then run a small model with Ollama and look at §ollama ps§ for the GPU/CPU split, and §--verbose§ for tokens/s.

      ## Or rent
      Cloud GPUs by the hour (RunPod, Lambda, Vast.ai, Colab) for fine-tuning or trying big models, without buying hardware.
    `,
  }),

  entry('speculative-decoding', 'equation', LOCAL, 'curious', 'Speculative Decoding', {
    summary: 'A small draft model guesses several tokens ahead; the big model checks them all in one pass and keeps the ones it agrees with. Same output, often 2–3× faster.',
    aliases: ['speculative decoding', 'draft model', 'speculative sampling', 'multi-token prediction'],
    tags: ['performance', 'local'],
    year: 2023,
    latex: doc`\mathbb E[\text{tokens per big-model pass}] = \frac{1 - \alpha^{\gamma + 1}}{1 - \alpha}`,
    variables: [
      [doc`\alpha`, 'Chance the big model accepts each drafted token'],
      [doc`\gamma`, 'Tokens drafted per round'],
    ],
    body: doc`
      ## Why it works
      Generation is memory-bound: checking 5 tokens in one pass costs about the same as generating 1, because the weights are read once either way. So let a cheap model propose 5; the big model verifies them in parallel, accepts the prefix it agrees with, and supplies the next token itself. With the right acceptance rule the output distribution is *exactly* the big model's (Leviathan et al.; Chen et al., 2023).

      ## When it helps
      - Predictable text — code, boilerplate, structured output, rewriting given text — where a small model guesses right often (high $\alpha$).
      - The draft must share the big model's tokenizer: e.g. a 0.6–1.7B model drafting for an 8–32B one from the same family.
      - Less gain on creative, high-temperature text.

      ## Using it
      llama.cpp's server takes a draft model (§-md draft.gguf§); vLLM supports several variants. Some newer models include their own **multi-token prediction** heads that do the drafting internally.

      Hosted APIs use this and similar tricks behind the scenes; it's one reason their speed keeps improving.
    `,
    calc: {
      inputs: [
        input('alpha', 'Acceptance rate per token', '%', 75, 10, 99),
        input('g', 'Tokens drafted per round', '', 5, 1, 16, INT),
        input('cost', 'Draft cost per token, relative to the big model', '%', 5, 1, 50),
      ],
      outputs: [
        out('Tokens per big-model pass', '', '(1 - (alpha/100)^(g + 1))/(1 - alpha/100)', { key: 'tpp', digits: 3 }),
        out('Speed-up', '×', 'tpp/(1 + g*cost/100)', { digits: 3 }),
      ],
      note: 'Code with a good draft model can reach 80–90% acceptance. At 40% acceptance, drafting many tokens barely helps.',
    },
  }),

  entry('local-chat-apps', 'concept', LOCAL, 'curious', 'Local Chat Apps: LM Studio and Open WebUI', {
    summary: 'Desktop and web interfaces for local models — browse, download, chat, compare, and run a local API server — without touching a terminal.',
    aliases: ['LM Studio', 'Open WebUI', 'Jan', 'local chat app'],
    tags: ['tooling', 'local'],
    body: doc`
      ## LM Studio
      A desktop app (Windows, Mac, Linux): search Hugging Face for GGUF (and on Mac, MLX) models, see which quant fits your memory, download, chat, tweak settings, and start an OpenAI-compatible server on §localhost:1234§. Good for trying many models quickly.

      ## Open WebUI
      A self-hosted ChatGPT-style web interface (usually run in Docker) that talks to Ollama or any OpenAI-compatible server: conversations, document upload with built-in RAG, multiple users, model comparison side by side.

      ## Jan, Msty and others
      Similar desktop apps with different trade-offs; the ecosystem shifts often.

      ## How they fit your project
      Use them to **explore**: which model, which quant, which prompt works for your task — then wire the winner into Flask through Ollama or llama-server's API. Open WebUI is also a quick way to give a few friends a private chat with your local model before you've built your own UI.
    `,
  }),

  entry('flask-ollama-walkthrough', 'example', LOCAL, 'curious', 'Walkthrough: Flask Talks to Ollama', {
    summary: 'Stream a local model’s reply through your Flask API to React — Ollama’s newline-delimited JSON in, Server-Sent Events out — plus local embeddings for RAG.',
    aliases: ['Flask and Ollama', 'Ollama from Python'],
    tags: ['walkthrough', 'local', 'streaming'],
    body: doc`
      ## Chat, streamed
      ~~~python
      import json, os, requests
      from flask import Blueprint, Response, request, stream_with_context

      OLLAMA = os.environ.get("OLLAMA_URL", "http://localhost:11434")
      MODEL = os.environ.get("LOCAL_MODEL", "qwen3:8b")
      bp = Blueprint("local_chat", __name__)

      @bp.post("/")
      def chat():
          messages = request.get_json()["messages"][-20:]

          def events():
              with requests.post(f"{OLLAMA}/api/chat", json={
                  "model": MODEL,
                  "messages": [{"role": "system", "content": "Be concise."}, *messages],
                  "stream": True,
                  "options": {"num_ctx": 8192},
                  "keep_alive": "30m",
              }, stream=True, timeout=(5, 300)) as r:
                  r.raise_for_status()
                  for line in r.iter_lines():          # one JSON object per line
                      if not line:
                          continue
                      part = json.loads(line)
                      if part.get("done"):
                          tps = part["eval_count"] / (part["eval_duration"] / 1e9)
                          yield f"data: {json.dumps({'done': True, 'tokens_per_s': round(tps, 1)})}\n\n"
                          break
                      yield f"data: {json.dumps({'delta': part['message']['content']})}\n\n"

          return Response(stream_with_context(events()), mimetype="text/event-stream",
                          headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
      ~~~
      The React side is the same as for a hosted model (Streaming a Chat UI). Only the backend knows which model answered.

      ## Embeddings for RAG
      ~~~python
      def embed(texts: list[str]) -> list[list[float]]:
          r = requests.post(f"{OLLAMA}/api/embed",
                            json={"model": "nomic-embed-text", "input": texts}, timeout=120)
          r.raise_for_status()
          return r.json()["embeddings"]
      ~~~

      ## Details
      - Ollama's final line includes §prompt_eval_count§, §eval_count§ and durations in nanoseconds — log them like token usage for hosted calls.
      - First request after idle includes model load time (seconds). §keep_alive§ avoids it during a session.
      - In Docker Compose, Flask reaches Ollama on the host at §http://host.docker.internal:11434§, or run Ollama as its own service.
      - Keep this behind the same §llm.py§ interface as the hosted model, so switching is configuration.
    `,
  }),
];
