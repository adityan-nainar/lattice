// CS Fundamentals: the ideas under everything else.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { CS } = AREA;

export const CS_ENTRIES = [
  entry('big-o', 'equation', CS, 'curious', 'Big-O Notation', {
    summary: 'How work grows as input grows. O(1), O(log n), O(n), O(n log n), O(n²) — the difference between instant and never finishing once n gets large.',
    aliases: ['Big-O', 'Big O', 'time complexity', 'O(n)', 'O(n²)', 'O(log n)', 'algorithmic complexity', 'quadratic'],
    tags: ['foundations', 'algorithms'],
    latex: doc`O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n)`,
    variables: [['n', 'Size of the input: rows, tokens, items in a list']],
    body: doc`
      ## What it describes
      Not seconds — *shape*. If doubling the input doubles the time, it's O(n). If it quadruples, O(n²). Constants and small terms are dropped: 3n + 20 is O(n).

      ## Where each shows up in your stack
      | Growth | Example |
      |---|---|
      | O(1) | dict/hash-map lookup; fetching a row by primary key (effectively) |
      | O(log n) | B-tree index lookup; binary search; HNSW search (roughly) |
      | O(n) | scanning a table; a loop over a list; brute-force vector search |
      | O(n log n) | sorting; building most indexes |
      | O(n²) | comparing every item with every other; **attention over n tokens**; the N+1 problem inside a loop; resending chat history each turn |
      | O(2ⁿ) | trying every subset; naive recursive Fibonacci |

      ## Why it matters more than micro-optimisation
      A Python O(n log n) beats a hand-tuned O(n²) in C once n is big enough. Most real slowness in apps is an accidental O(n²): a query inside a loop, §list.index()§ or §x in list§ inside a loop (use a set), re-rendering everything on every keystroke.

      ## Average vs worst case
      Hash maps are O(1) *on average*; quicksort is O(n log n) on average but O(n²) worst case. Databases pick plans based on estimated costs — which is Big-O with constants put back in.
    `,
    calc: {
      inputs: [
        input('n', 'Input size n', '', 100000, 1, 1e10, LOG),
        input('ops', 'Operations per second', '/s', 1e8, 1e3, 1e12, LOG),
      ],
      outputs: [
        out('O(log n)', 's', 'log2(n)/ops', { prefix: true }),
        out('O(n)', 's', 'n/ops', { prefix: true }),
        out('O(n log n)', 's', 'n*log2(n)/ops', { prefix: true }),
        out('O(n²)', 's', 'n^2/ops', { key: 'quad', prefix: true }),
        out('O(n²) in days', 'days', 'quad/day', { digits: 3 }),
      ],
      note: '10⁸ simple operations per second is roughly compiled code; pure Python is 10–100× slower. Try n = 10 million: O(n log n) takes seconds, O(n²) takes weeks.',
    },
  }),

  entry('hash-maps', 'concept', CS, 'curious', 'Hash Maps', {
    summary: 'Python’s dict, JavaScript’s object and Map: store and find values by key in constant time on average, by turning each key into an array position with a hash function.',
    aliases: ['hash map', 'hash maps', 'hash table', 'dictionary', 'dict', 'lookup table'],
    tags: ['data structures', 'foundations'],
    body: doc`
      ## How it's O(1)
      Hash the key to a big number, take it modulo the table size, and that's the slot. Look there — done, no matter how many items. Collisions (two keys, one slot) are handled by probing nearby slots or chaining; the table grows (and rehashes) when it gets too full, keeping collisions rare.

      ## Everyday wins
      ~~~python
      # O(n²): for every note, scan the whole users list
      for note in notes:
          owner = next(u for u in users if u.id == note.owner_id)

      # O(n): build an index once
      users_by_id = {u.id: u for u in users}
      for note in notes:
          owner = users_by_id[note.owner_id]
      ~~~
      And §if x in some_set§ is O(1) where §if x in some_list§ is O(n).

      ## Where they are
      Python dicts (insertion-ordered since 3.7), sets, JavaScript objects and §Map§/§Set§, Redis, database hash indexes and hash joins, HTTP headers, caches keyed by input. JSON objects are hash maps on the wire.

      ## Requirements on keys
      Keys must be hashable and must not change while in the map — which is why Python won't let a §list§ be a dict key but will take a §tuple§.
    `,
  }),

  entry('trees-graphs', 'concept', CS, 'curious', 'Trees and Graphs', {
    summary: 'Nodes joined by edges. Trees have one root and no loops — the DOM, file systems, B-tree indexes, JSON. Graphs are anything connected — links between notes, git history, HNSW.',
    aliases: ['tree', 'trees', 'graph', 'graphs', 'DAG', 'directed acyclic graph', 'graph traversal', 'BFS', 'DFS'],
    tags: ['data structures', 'foundations'],
    body: doc`
      ## Trees everywhere
      - The **DOM**: §html§ → §body§ → §main§ → …
      - **React's** component tree, and reconciliation comparing two trees.
      - **JSON** and file systems.
      - **B-trees** in every database index.
      - Syntax trees: how Python, JavaScript and SQL are parsed before running.

      ## Graphs everywhere
      - **Git history** is a directed acyclic graph (DAG): commits point to parents; merges have two.
      - **Dependencies** (npm, pip) — and the reason install tools must detect cycles.
      - **HNSW** vector indexes: a graph you hop through towards the nearest vectors.
      - A **knowledge graph** of linked topics — like this app. "Connect to…" finds a path between two topics with breadth-first search.
      - Agent workflows drawn as state graphs (LangGraph).

      ## Two ways to walk
      - **Breadth-first (BFS)**: visit all neighbours, then theirs. Finds shortest paths in unweighted graphs.
      - **Depth-first (DFS)**: go as deep as possible, back up. Natural with recursion; finds cycles; orders dependencies (topological sort).

      ## In Postgres
      Store trees and graphs as rows with parent or edge tables, and walk them with §WITH RECURSIVE§ queries.
    `,
  }),

  entry('recursion', 'concept', CS, 'curious', 'Recursion', {
    summary: 'A function that calls itself on a smaller piece of the problem, until a piece is small enough to answer directly. Natural for trees, nested data and divide-and-conquer.',
    aliases: ['recursion', 'recursive', 'base case', 'stack overflow', 'call stack', 'WITH RECURSIVE'],
    tags: ['algorithms', 'foundations'],
    body: doc`
      ~~~python
      def count_words(node):                   # a nested document: sections inside sections
          total = len(node["text"].split())
          for child in node.get("children", []):
              total += count_words(child)      # same question, smaller piece
          return total                         # base case: no children -> loop does nothing
      ~~~

      ## The two parts
      1. **Base case** — small enough to answer outright. Forget it and the function never stops.
      2. **Recursive case** — reduce the problem and call yourself.

      ## The call stack
      Each call waits for the ones it made, holding its local variables on the **call stack**. Too deep and you get Python's §RecursionError§ (default limit ~1,000) or JavaScript's "Maximum call stack size exceeded" — a stack overflow. For deep structures, use an explicit loop with your own stack.

      ## Where you'll use it
      Walking nested JSON, a table of contents, a React tree of comments with replies (a component that renders itself for children), directory trees, and SQL's §WITH RECURSIVE§ for hierarchies.

      ## The classic trap
      Naive recursive Fibonacci recomputes the same values exponentially many times — §fib(40)§ makes over 300 million calls. Remember results (memoisation, §functools.cache§) and it's 40.
    `,
  }),

  entry('binary-search', 'equation', CS, 'curious', 'Binary Search', {
    summary: 'In sorted data, check the middle and throw away the half that can’t hold the answer. A billion items take about 30 steps.',
    aliases: ['binary search', 'bisection', 'bisect', 'logarithmic time'],
    tags: ['algorithms'],
    year: 1946,
    latex: doc`\text{steps} \le \lceil \log_2 (n + 1) \rceil`,
    variables: [['n', 'Number of sorted items']],
    body: doc`
      ## The idea
      Looking for 7,340 in a sorted list of 10,000: check position 5,000 → too small → discard the lower half → check 7,500 → too big → … Each step halves what's left, so $n$ items take about $\log_2 n$ steps: 1,000 → 10, a million → 20, a billion → 30.

      ## It's everywhere once you look
      - **B-tree indexes**: binary search within each page, many-way branching between pages.
      - **git bisect**: find the commit that broke something in log₂(commits) test runs.
      - **Debugging by halving**: comment out half the code, half the input, half the pipeline.
      - **Tuning**: find the largest batch size that fits in memory, or the highest learning rate that doesn't diverge.
      - Python's §bisect§ module for sorted lists.

      ## Getting it right
      Famously easy to get subtly wrong — off-by-one errors and, in languages with fixed-size integers, overflow in §(low + high) / 2§ (a bug that sat in Java's standard library for about nine years). Use the library version.
    `,
    calc: {
      inputs: [input('n', 'Sorted items', '', 1e9, 1, 1e18, LOG)],
      outputs: [
        out('Worst-case steps', '', 'ceil(log2(n + 1))'),
        out('Linear scan, average steps', '', 'n/2'),
      ],
      note: 'Every 1,000× more data costs about 10 more steps.',
    },
  }),

  entry('concurrency', 'concept', CS, 'curious', 'Concurrency: Processes, Threads and the GIL', {
    summary: 'Doing several things at once: processes (separate memory), threads (shared memory), async tasks (cooperative waiting). Python’s GIL shapes which to use for which job.',
    aliases: ['concurrency', 'parallelism', 'thread', 'threads', 'threading', 'multiprocessing', 'GIL', 'global interpreter lock', 'I/O-bound', 'CPU-bound'],
    tags: ['foundations', 'performance'],
    body: doc`
      ## Two kinds of slow
      - **I/O-bound** — waiting: on the network, the database, an LLM API, the disk. The CPU is idle.
      - **CPU-bound** — computing: parsing big PDFs, embedding on CPU, image processing.
      The right tool depends on which.

      ## The three mechanisms
      | | Memory | Good for | In your stack |
      |---|---|---|---|
      | **Processes** | separate | CPU-bound work; isolation | Gunicorn workers, Celery workers, §multiprocessing§ |
      | **Threads** | shared | I/O-bound waiting | Gunicorn §--threads§, §ThreadPoolExecutor§ for parallel API calls |
      | **Async tasks** | shared, one thread | huge numbers of waits | §asyncio§, FastAPI, JavaScript everywhere |

      ## Python's GIL
      In standard CPython, the **global interpreter lock** lets only one thread execute Python code at a time. Threads still help for I/O — a thread waiting on the network releases the lock — but don't speed up pure-Python computation; use processes for that. (Python 3.13+ has an optional free-threaded build without the GIL; the ecosystem is catching up.)

      ## Parallel LLM calls
      ~~~python
      from concurrent.futures import ThreadPoolExecutor
      with ThreadPoolExecutor(max_workers=8) as pool:
          summaries = list(pool.map(summarize_chunk, chunks))   # 8 requests in flight
      ~~~
      Eight concurrent calls finish in roughly the time of one — mind the provider's rate limits.

      ## The price of shared memory
      Two threads updating the same thing → race conditions. Prefer passing data through queues, keep shared state in the database (which has transactions), and avoid module-level mutable globals in Flask apps.
    `,
  }),

  entry('async-await', 'concept', CS, 'curious', 'async/await', {
    summary: 'Syntax for writing code that waits without blocking: “await” pauses this task and lets others run until the result arrives. Standard in JavaScript; available in Python via asyncio.',
    aliases: ['async/await', 'async', 'await', 'asyncio', 'coroutine', 'Promise', 'Promises', 'Promise.all', 'asyncio.gather', 'non-blocking'],
    tags: ['foundations', 'concurrency'],
    body: doc`
      ## JavaScript
      ~~~js
      async function loadPage(id) {
        const [note, links] = await Promise.all([      // both requests in flight at once
          fetch(§/api/notes/\${id}§).then((r) => r.json()),
          fetch(§/api/notes/\${id}/links§).then((r) => r.json()),
        ]);
        return { note, links };
      }
      ~~~
      An §async§ function returns a **Promise** — a placeholder for a value that arrives later. §await§ pauses the function (not the browser) until it resolves. Without §Promise.all§, two §await§s in a row run one after the other.

      ## Python
      ~~~python
      import asyncio
      from anthropic import AsyncAnthropic

      client = AsyncAnthropic()

      async def summarize(text):
          r = await client.messages.create(model="claude-opus-5", max_tokens=1000,
                                           messages=[{"role": "user", "content": f"Summarise:\n{text}"}])
          return r.content[0].text

      async def main(texts):
          return await asyncio.gather(*(summarize(t) for t in texts))   # all concurrently

      summaries = asyncio.run(main(texts))
      ~~~

      ## The rules that bite
      - **Forgetting §await§** gives you a Promise/coroutine object instead of the value — and the work may never run.
      - **Blocking inside async code** (§time.sleep§, §requests.get§, a sync database driver) freezes *every* task on that loop. Use async libraries (§httpx.AsyncClient§, §asyncio.sleep§) end to end.
      - Async is contagious: callers of async functions become async.

      ## In Flask
      Flask supports §async def§ views, but each request still occupies a worker for its duration, so the win is limited to running several awaits concurrently *within* one request. For many simultaneous long-lived streams, an async framework (FastAPI, Quart) — or Gunicorn threads — fits better.
    `,
  }),

  entry('event-loop', 'concept', CS, 'curious', 'The Event Loop', {
    summary: 'One thread, a queue of ready tasks, and a loop that runs them one at a time while I/O happens elsewhere. How JavaScript (and asyncio) juggle thousands of waits without threads.',
    aliases: ['event loop', 'callback', 'callbacks', 'microtask', 'blocking the event loop'],
    tags: ['foundations', 'concurrency'],
    body: doc`
      ## The loop
      1. Run the current piece of code to completion.
      2. Meanwhile the browser (or OS) performs I/O — network requests, timers, clicks — in the background.
      3. When something completes, its callback (or the continuation after an §await§) joins a queue.
      4. The loop takes the next item and runs it. Forever.

      ## Consequences
      - JavaScript never runs two pieces of your code at the same instant, so no data races inside one page.
      - But a long computation **blocks the loop**: no clicks handled, no rendering, no other callbacks. A 2-second loop in a click handler freezes the tab for 2 seconds. Split heavy work into chunks, or move it to a Web Worker (a separate thread).
      - Ordering puzzles: §setTimeout(f, 0)§ runs *after* already-resolved Promise callbacks (microtasks run before the next task).

      ## Same idea elsewhere
      Python's §asyncio§, Node.js servers, nginx, Redis — all event loops. One thread handling ten thousand idle connections is cheaper than ten thousand threads. The rule in all of them: never do slow synchronous work on the loop.
    `,
  }),

  entry('bits-bytes-utf8', 'concept', CS, 'curious', 'Bits, Bytes and UTF-8', {
    summary: 'Everything is bytes; text is bytes plus an encoding. UTF-8 stores English in 1 byte per character and Hindi or Tamil in 3 — and mixing encodings produces garbled “mojibake”.',
    aliases: ['UTF-8', 'Unicode', 'encoding', 'character encoding', 'mojibake', 'code point'],
    tags: ['foundations', 'data'],
    year: 1992,
    body: doc`
      ## Units
      A bit is 0 or 1; a byte is 8 bits (256 values). KB, MB, GB are powers of 1,000 (sometimes of 1,024 — KiB, MiB, GiB — the reason a "1 TB" drive shows as 931 GB). Network speeds are in **bits** per second: 100 Mbit/s moves 12.5 MB/s.

      ## Unicode and UTF-8
      **Unicode** gives every character a number (a code point): A is U+0041, அ (Tamil a) is U+0B85, 😀 is U+1F600. **UTF-8** stores those numbers as 1–4 bytes:
      - ASCII (English letters, digits): 1 byte.
      - Devanagari, Tamil, Bengali: 3 bytes each.
      - Most emoji: 4 bytes.
      Designed by Ken Thompson and Rob Pike in 1992 (on a placemat, the story goes), it's now the encoding of ~99% of the web.

      ## Where it bites
      - §len("नमस्ते")§ in Python is 6 (code points) but it's 18 bytes; a visible "letter" can be several code points (combining marks), so slicing strings can split a character.
      - Reading a file without §encoding="utf-8"§ on Windows can use a legacy code page → mojibake or a §UnicodeDecodeError§. Always pass it.
      - Database column limits in bytes vs characters; Postgres counts characters, good.
      - Tokenizers work on UTF-8 bytes — one reason Indian-language text costs more tokens.
    `,
  }),

  entry('floating-point', 'equation', CS, 'curious', 'Floating Point', {
    summary: 'Computers store most decimals approximately: 0.1 + 0.2 = 0.30000000000000004. Fine for science and ML, wrong for money — and ML formats like BF16 keep only about 3 significant digits.',
    aliases: ['floating point', 'floating-point', 'float', 'float32', 'float64', 'IEEE 754', 'machine epsilon', 'rounding error', '0.1 + 0.2'],
    tags: ['foundations', 'numbers'],
    year: 1985,
    latex: doc`x = (-1)^{s} \times 1.f \times 2^{e}, \qquad \varepsilon = 2^{-m}`,
    variables: [
      ['s', 'Sign bit'],
      ['f', 'Fraction (mantissa) bits'],
      ['e', 'Exponent'],
      ['m', 'Number of fraction bits: 52 for float64, 23 for float32, 10 for FP16, 7 for BF16'],
      [doc`\varepsilon`, 'Machine epsilon: the relative gap between neighbouring numbers'],
    ],
    body: doc`
      ## Why 0.1 isn't 0.1
      Binary fractions can represent halves, quarters, eighths exactly — but not tenths, just as decimals can't write 1/3 exactly. 0.1 is stored as the nearest binary fraction, 0.1000000000000000055…; small errors add up. It's not a Python or JavaScript bug; it's IEEE 754 (1985), in every CPU.

      ## Rules
      - **Money**: never float. Use integer paise, Python's §Decimal§, Postgres §numeric§.
      - **Comparisons**: §math.isclose(a, b)§, not §a == b§.
      - **Big integers in JavaScript**: all numbers are float64, so integers above $2^{53} \approx 9\times10^{15}$ lose precision — send big ids as strings.

      ## The ML formats
      | Format | Fraction bits | ≈ digits | Range |
      |---|---|---|---|
      | float64 | 52 | 16 | ±10³⁰⁸ |
      | float32 | 23 | 7 | ±10³⁸ |
      | FP16 | 10 | 3.3 | ±65,504 |
      | BF16 | 7 | 2.4 | ±10³⁸ |
      BF16 ("brain float") keeps float32's range with little precision — gradients and activations rarely need more than 2–3 digits, but they do need range, which is why it displaced FP16 for training. Quantised formats go further, to 8, 4, even fewer bits.
    `,
    calc: {
      inputs: [
        input('x', 'A number', '', 1000, 1e-6, 1e12, LOG),
        input('m', 'Fraction bits (52 float64, 23 float32, 10 FP16, 7 BF16)', 'bits', 52, 3, 52, INT),
      ],
      outputs: [
        out('Machine epsilon', '', '2^(-m)'),
        out('Gap to the next representable number near x', '', '2^(floor(log2(x)) - m)'),
        out('Significant decimal digits', '', 'm*log10(2) + 1', { digits: 3 }),
        out('Largest integer counted exactly', '', '2^(m + 1)'),
      ],
      note: 'Set m = 7 (BF16) and x = 1000: neighbouring numbers are 8 apart. That is why BF16 weights still work — and why nobody keeps accounts in it.',
    },
  }),

  entry('hash-functions', 'equation', CS, 'curious', 'Hash Functions', {
    summary: 'Turn any input into a fixed-size fingerprint. Cryptographic hashes like SHA-256 are one-way and collision-resistant — used for git commits, file dedup, signatures and passwords (slowly).',
    aliases: ['hash function', 'hash functions', 'hashing', 'SHA-256', 'checksum', 'content hash', 'birthday paradox', 'collision'],
    tags: ['foundations', 'security'],
    latex: doc`P(\text{collision among } n) \approx 1 - e^{-n^2 / 2^{b+1}}`,
    variables: [
      ['n', 'Number of items hashed'],
      ['b', 'Bits in the hash (or random bits in an id)'],
    ],
    body: doc`
      ## Properties
      - Same input → same output, always.
      - Tiny change → completely different output.
      - **Cryptographic** hashes (SHA-256): infeasible to reverse, or to find two inputs with the same hash.

      ## Uses in your stack
      - **Git** names every commit and file by its hash; change anything and the name changes.
      - **Caching and dedup**: key an embedding cache or uploaded file by the SHA-256 of its content — identical content is stored and embedded once.
      - **Cache-busting** filenames in Vite builds.
      - **Signatures**: JWTs and signed cookies use HMAC, a keyed hash.
      - **Passwords**: hashed with deliberately *slow* functions (bcrypt, Argon2), not SHA-256.
      - **Hash maps** use fast non-cryptographic hashes.

      ## The birthday paradox
      In a room of 23 people, two probably share a birthday — collisions arrive around $\sqrt{N}$, not $N$. For a $b$-bit hash, expect the first collision after about $2^{b/2}$ items. So:
      - 32-bit hashes collide after ~77,000 items — unsafe as ids.
      - A random UUID (122 random bits) needs ~2.7 quintillion ($2.7\times10^{18}$) before a 50% chance. Generate a billion a second for 85 years.
    `,
    calc: {
      inputs: [
        input('n', 'Items', '', 1e9, 1, 1e20, LOG),
        input('b', 'Bits', 'bits', 122, 8, 256, INT),
      ],
      outputs: [
        out('Collision probability (small-value approximation)', '', 'n^2/2^(b + 1)'),
        out('Collision probability', '', '1 - exp(-n^2/2^(b + 1))', { digits: 4 }),
        out('Items for a 50% chance', '', 'sqrt(2*ln(2))*2^(b/2)'),
      ],
      note: '122 bits is a random UUID. Try 32 bits (a CRC32 checksum) or 64 bits with a billion items.',
    },
  }),

  entry('caching', 'equation', CS, 'curious', 'Caching', {
    summary: 'Keep a copy of something expensive close by, so the next request is cheap. The hit rate decides how much it helps; invalidation decides whether it’s correct.',
    aliases: ['caching', 'cache', 'cache hit', 'cache miss', 'hit rate', 'cache invalidation', 'TTL', 'memoization', 'memoisation', 'LRU cache'],
    tags: ['performance', 'foundations'],
    latex: doc`\bar t = h\,t_{\text{hit}} + (1 - h)\,t_{\text{miss}}`,
    variables: [
      ['h', 'Hit rate: share of requests served from the cache'],
      [doc`t_{\text{hit}}, t_{\text{miss}}`, 'Time (or cost) of a hit and of a miss'],
    ],
    body: doc`
      ## Layers of cache in one request
      CPU caches → the database's buffer cache → your app's in-memory or Redis cache → HTTP caches and CDNs → the browser cache → TanStack Query's cache in React. And for LLMs: the KV cache inside the model, prompt caching at the provider, and your own cache of past answers or embeddings.

      ## Why hit rate dominates
      If a hit takes 1 ms and a miss (an LLM call) takes 3,000 ms, a 50% hit rate gives 1,500 ms average; 90% gives 301 ms; 99% gives 31 ms. The last few percent matter most.

      ## "There are only two hard things…"
      "…cache invalidation and naming things" (Phil Karlton). A cache returns *old* data until told otherwise. Strategies:
      - **TTL**: expire after N seconds — simple, bounded staleness.
      - **Key by content**: cache embeddings by §sha256(model + text)§ — the key changes when the input does, so nothing needs invalidating.
      - **Invalidate on write**: delete the cached summary when the note is edited.

      ## In Python
      §@functools.cache§ / §@lru_cache(maxsize=1000)§ memoise pure functions in memory — per process, lost on restart. Redis for shared caches across workers.

      ## Caching LLM answers
      Exact-match caching (same prompt → same answer) is safe and useful for repeated questions. "Semantic caching" (similar question → reuse answer) is riskier: similar isn't identical, and a wrong reuse looks like a hallucination.
    `,
    calc: {
      inputs: [
        input('hit', 'Hit rate', '%', 90, 0, 100),
        input('thit', 'Time for a hit', 'ms', 1, 0.01, 1000, LOG),
        input('tmiss', 'Time for a miss', 'ms', 3000, 1, 100000, LOG),
      ],
      outputs: [
        out('Average time', 'ms', 'hit/100*thit + (1 - hit/100)*tmiss', { key: 'avg', digits: 3 }),
        out('Speed-up vs no cache', '×', 'tmiss/avg', { digits: 3 }),
      ],
      note: 'Go from 90% to 99%: ten times faster on average. From 50% to 60%: barely noticeable.',
    },
  }),

  entry('latency-numbers', 'equation', CS, 'curious', 'Latency Numbers Every Programmer Should Know', {
    summary: 'Memory is ~100 ns, an SSD read ~100 µs, a datacentre round trip ~0.5 ms, across the world ~150 ms. Scale 1 ns to 1 second and a network round trip becomes years.',
    aliases: ['latency numbers', 'orders of magnitude', 'memory latency'],
    tags: ['performance', 'numbers'],
    latex: doc`1\ \text{ns} \mapsto 1\ \text{s}`,
    variables: [],
    body: doc`
      ## Approximate numbers (they drift with hardware; the ratios are what matter)
      | Operation | Time | If 1 ns were 1 s |
      |---|---|---|
      | CPU L1 cache | 1 ns | 1 s |
      | Main memory | 100 ns | 1.7 min |
      | Read 1 MB sequentially from memory | ~10 µs | 3 hours |
      | SSD random read | ~100 µs | 1.2 days |
      | Round trip within a datacentre | ~500 µs | 6 days |
      | Read 1 MB from SSD | ~1 ms | 12 days |
      | Round trip Mumbai ↔ Singapore | ~60 ms | 2 years |
      | Round trip India ↔ US East | ~200 ms | 6 years |
      | Typical LLM call | 1–30 s | 30–950 years |

      Popularised by Jeff Dean and Peter Norvig.

      ## Lessons for your app
      - A database query that's served from memory takes microseconds; the **network round trip** to reach it often costs more than the query. Batch queries; avoid N+1.
      - Anything crossing the internet costs tens to hundreds of milliseconds; do it in parallel or in the background.
      - An LLM call is so slow in computer terms that everything around it (a query, a cache lookup, even a few hundred ms of retrieval) is cheap by comparison — optimise the model call first: fewer tokens, streaming, caching, smaller models.
    `,
    calc: {
      inputs: [input('ns', 'Duration', 'ns', 200000000, 0.1, 1e12, LOG)],
      outputs: [
        out('Actual duration', 's', 'ns/1e9', { prefix: true }),
        out('Human scale (1 ns → 1 s): hours', 'hours', 'ns/3600', { digits: 3 }),
        out('Human scale: days', 'days', 'ns/86400', { digits: 3 }),
        out('Human scale: years', 'years', 'ns/yr', { digits: 3 }),
      ],
      note: 'Default is a 200 ms intercontinental round trip. Try 100 (memory) and 3e9 (a 3-second LLM reply).',
    },
  }),

  entry('amdahls-law', 'equation', CS, 'curious', 'Amdahl’s Law', {
    summary: 'Speeding up part of a job only helps as much as that part’s share. If 20% must run serially, no amount of parallelism gets you past 5×.',
    aliases: ["Amdahl's law", 'Amdahl’s law', 'serial fraction', 'speedup'],
    tags: ['performance', 'numbers'],
    year: 1967,
    latex: doc`S(n) = \frac{1}{(1 - p) + p/n}, \qquad S_{\max} = \frac{1}{1 - p}`,
    variables: [
      ['p', 'Share of the work that can be parallelised (or sped up)'],
      ['n', 'Number of workers, or the speed-up factor on that share'],
    ],
    body: doc`
      ## The ceiling
      A RAG request takes 4 s: 0.3 s retrieval, 0.2 s prompt processing, 3.5 s generating the answer. Make retrieval 10× faster and the request drops to 3.73 s — 7% better. The answer generation is 87.5% of the time; that's where effort pays.

      ## Everyday uses
      - **Profile before optimising.** Find the biggest slice; speed-ups elsewhere are capped by it.
      - **Parallel LLM calls**: summarising 100 chunks in parallel is fast, but a final "combine the summaries" call is serial and sets a floor.
      - **Agents**: steps that depend on previous results can't be parallelised; independent tool calls can.
      - **Hardware**: more GPUs help training's parallel part; communication between them is the serial part that limits scaling.

      Gene Amdahl, 1967.
    `,
    calc: {
      inputs: [
        input('p', 'Parallelisable (or improved) share', '%', 80, 0, 100),
        input('n', 'Workers / speed-up factor on that share', '×', 8, 1, 10000, LOG),
      ],
      outputs: [
        out('Overall speed-up', '×', '1/((1 - p/100) + p/100/n)', { digits: 4 }),
        out('Ceiling with infinite workers', '×', '1/(1 - p/100)', { digits: 4 }),
      ],
      note: 'At 80% parallel, 8 workers give 3.3× and a million give 5×. Push p to 99%.',
    },
  }),

  entry('littles-law', 'equation', CS, 'curious', 'Little’s Law', {
    summary: 'Items in a system = arrival rate × time each spends there. Sizes connection pools, worker counts and queues — and shows why slow requests clog everything.',
    aliases: ["Little's law", 'Little’s law', 'queueing', 'queueing theory', 'utilization'],
    tags: ['performance', 'numbers'],
    year: 1961,
    latex: doc`L = \lambda W`,
    variables: [
      ['L', 'Average number of items in the system (requests in flight, people in the queue)'],
      [doc`\lambda`, 'Arrival rate'],
      ['W', 'Average time each item spends in the system'],
    ],
    body: doc`
      ## One formula, many uses
      - 10 chat messages per second, each streaming for 15 s → **150 streams open** at once. Your server needs 150 concurrent slots (threads, async tasks) or requests queue.
      - 200 queries/s at 5 ms → 1 database connection busy on average.
      - A queue receiving 2 jobs/minute with jobs taking 3 minutes → 6 jobs in the system; one worker can't keep up (it needs utilisation below 1).

      ## Utilisation and waiting
      If a worker is busy a fraction $\rho$ of the time, queues grow sharply as $\rho \to 1$: for the simplest queue model, average time in the system is $\text{service time} / (1 - \rho)$. At 50% busy, requests take 2× their service time; at 90%, 10×; at 99%, 100×. That's why systems "fall off a cliff" rather than degrading gently, and why you want headroom.

      John Little proved it in 1961; it holds for almost any system in a steady state, which is what makes it so useful.
    `,
    calc: {
      inputs: [
        input('lam', 'Arrivals', 'per second', 10, 0.01, 10000, LOG),
        input('W', 'Time each spends in the system', 's', 15, 0.001, 3600, LOG),
        input('slots', 'Slots available (workers × threads)', '', 200, 1, 100000, LOG),
      ],
      outputs: [
        out('In flight on average (L = λW)', '', 'lam*W', { key: 'L', digits: 4 }),
        out('Utilisation', '%', 'L/slots*100', { key: 'rho', digits: 3 }),
        out('Slow-down from queueing (simple model)', '×', 'if(100 - rho, 1/(1 - rho/100), 1e9)', { digits: 3 }),
      ],
      note: 'Push arrivals up until utilisation nears 100%: waiting times explode long before you hit the limit.',
    },
  }),

  entry('base64', 'equation', CS, 'curious', 'Base64', {
    summary: 'A way to write arbitrary bytes using 64 safe text characters, so binary data fits in JSON, URLs and emails. Costs a third more space.',
    aliases: ['Base64', 'base64url', 'data URL', 'binary-to-text encoding'],
    tags: ['data', 'formats'],
    latex: doc`\text{encoded length} = 4\left\lceil \frac{n}{3} \right\rceil`,
    variables: [['n', 'Number of bytes to encode']],
    body: doc`
      ## How
      Take 3 bytes (24 bits), split into four 6-bit groups, map each to one of 64 characters (A–Z, a–z, 0–9, §+§, §/§). Pad with §=§ at the end. §base64url§ swaps §+/§ for §-_§ so it's safe in URLs.

      ## Where you meet it
      - Sending **images or PDFs** to an LLM API inside JSON.
      - **JWTs** — each of the three parts is base64url.
      - §data:image/png;base64,iVBORw0…§ URLs embedding small images in HTML/CSS.
      - Email attachments; HTTP Basic auth headers; opaque pagination cursors.

      ## It is not encryption
      Anyone can decode it in one line (§base64.b64decode§, §atob§). It hides nothing — a Basic-auth header or a JWT payload is readable by anyone who sees it.

      ## The cost
      33% larger, plus CPU to encode/decode. For big files, send raw bytes (multipart upload, or a provider's file-upload API) instead of base64 in JSON.
    `,
    calc: {
      inputs: [input('n', 'Bytes', 'B', 3000000, 1, 1e10, LOG)],
      outputs: [
        out('Base64 length', 'characters', '4*ceil(n/3)', { key: 'enc' }),
        out('Growth', '%', '(enc/n - 1)*100', { digits: 3 }),
      ],
      note: 'A 3 MB PDF becomes 4 MB of text inside the JSON request.',
    },
  }),

  entry('idempotency', 'concept', CS, 'curious', 'Idempotency', {
    summary: 'An operation is idempotent if doing it twice has the same effect as doing it once. The property that makes retries safe — in HTTP, jobs, payments and agents.',
    aliases: ['idempotency', 'idempotent', 'idempotency key', 'at-least-once', 'exactly-once', 'retry', 'retries'],
    tags: ['reliability', 'foundations'],
    body: doc`
      ## Why it matters
      Networks fail ambiguously. A request times out: did the server do it or not? The only safe response is to retry — which is only safe if repeating it can't cause harm. Queues deliver "at least once", so jobs *will* sometimes run twice. Users double-click.

      ## Idempotent vs not
      - §SET status = 'done'§ — idempotent. §count = count + 1§ — not.
      - §PUT /notes/42§ with the full note — idempotent. §POST /notes§ — creates another each time.
      - "Upsert chunk (doc 17, #3)" — idempotent. "Insert chunk" — duplicates.
      - "Charge ₹500" — very much not.

      ## Making things idempotent
      - Design writes as "set to X" rather than "change by Δ" where possible.
      - **Unique constraints + upserts** in Postgres.
      - **Idempotency keys**: the client generates a unique id per logical action and sends it (§Idempotency-Key§ header); the server records processed keys and returns the stored result for repeats. Payment APIs work this way.
      - In jobs, check "already done?" before doing, inside the same transaction as the work.

      ## Agents
      An agent retrying a failed step, or re-running after a crash, repeats tool calls. Tools with side effects need the same care — or a human confirmation.
    `,
  }),

  entry('regex', 'concept', CS, 'curious', 'Regular Expressions', {
    summary: 'A tiny language for matching text patterns: emails, dates, error codes, citation markers like [12]. Powerful and write-only — test them, comment them, and don’t parse HTML with them.',
    aliases: ['regular expression', 'regular expressions', 'regex', 'regexp', 'pattern matching'],
    tags: ['tools', 'text'],
    year: 1951,
    body: doc`
      ## The core vocabulary
      | Pattern | Matches |
      |---|---|
      | §\d§ §\w§ §\s§ | a digit, a word character, whitespace |
      | §.§ | any character (except newline) |
      | §[aeiou]§ §[^0-9]§ | one of / none of |
      | §*§ §+§ §?§ §{2,4}§ | 0+, 1+, 0 or 1, 2 to 4 times |
      | §^§ §$§ | start / end of line |
      | §( )§ | a capture group |
      | §\b§ | word boundary |

      ## Useful in an LLM app
      ~~~python
      import re
      cited = [int(n) for n in re.findall(r"\[(\d+)\]", answer)]        # citation markers [12]
      code_blocks = re.findall(r"§§§(\w+)?\n(.*?)§§§", text, flags=re.S)  # fenced code blocks
      clean = re.sub(r"\s+", " ", extracted_pdf_text).strip()           # collapse whitespace
      ~~~
      Use raw strings (§r"…"§) in Python so backslashes reach the regex engine intact.

      ## Cautions
      - Test on real examples (regex101.com explains each part).
      - Don't parse HTML, JSON or nested structures with regex — use a parser.
      - Some patterns take exponential time on unlucky input ("catastrophic backtracking") — a real denial-of-service risk when matching user input.
      - When extracting structured data from messy text, an LLM with structured output is often more robust than a regex jungle; a regex is cheaper and deterministic when the pattern really is regular.
    `,
  }),

  entry('time-and-timezones', 'equation', CS, 'curious', 'Time, Time Zones and Timestamps', {
    summary: 'Store instants in UTC, display them in the user’s zone (IST is UTC+05:30). Unix time counts seconds since 1970 — and 32-bit counters run out in January 2038.',
    aliases: ['time zone', 'time zones', 'UTC', 'IST', 'Unix time', 'Unix epoch', 'ISO 8601', 'Year 2038 problem'],
    tags: ['data', 'foundations'],
    year: 1970,
    latex: doc`t_{\text{overflow}} = 1970 + \frac{2^{\,b-1}}{\text{seconds per year}}`,
    variables: [['b', 'Bits in a signed Unix timestamp']],
    body: doc`
      ## Rules that prevent most bugs
      1. **Store UTC** instants (Postgres §timestamptz§; Python §datetime.now(timezone.utc)§).
      2. **Convert at the edges**: display in the viewer's time zone (the browser knows it: §Intl.DateTimeFormat().resolvedOptions().timeZone§).
      3. **Exchange ISO 8601 strings** with an offset: §2026-09-23T10:15:00Z§ or §2026-09-23T15:45:00+05:30§ — the same instant.
      4. Never do date arithmetic by hand; use the library (§datetime§, §date-fns§/§Temporal§).

      ## Traps
      - **Naive datetimes** in Python (no tzinfo) silently mean "whatever the server's zone is". A server in the US and a laptop in India disagree.
      - **Daylight saving**: India has none, but the US and Europe do — a "daily at 9 AM" job for users there shifts by an hour twice a year, and some local times happen twice or never.
      - **"Today"** depends on where you are: at 2 AM IST it's still yesterday in UTC. Streaks and daily limits need a defined zone.
      - IST's half-hour offset catches code that assumes whole-hour offsets.

      ## Unix time
      Seconds since 1970-01-01 00:00 UTC — the "epoch". A signed 32-bit counter maxes out at $2^{31} - 1$ seconds: 03:14:07 UTC on 19 January 2038, then wraps to 1901. Modern systems use 64 bits (good for 292 billion years); embedded devices and old file formats may not.
    `,
    calc: {
      inputs: [input('b', 'Bits in the signed timestamp', 'bits', 32, 16, 64, INT)],
      outputs: [
        out('Overflow year', '', '1970 + 2^(b - 1)/yr', { digits: 6 }),
        out('Years of range after 1970', 'years', '2^(b - 1)/yr', { digits: 4 }),
      ],
      note: '32 bits gives 2038. 64 bits outlasts the Sun.',
    },
  }),
];
