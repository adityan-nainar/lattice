// The basics under everything else: computers, programming ideas, Python, JavaScript, the web and SQL.
// Short on purpose — each one is a stepping stone to the fuller topics it links to.

import { AREA, doc, entry } from './helpers.js';

const { COMP, WEB, FRONT, BACK, DATA } = AREA;

export const BASIC_CODE_ENTRIES = [
  // ---------------------------------------------------------------- the machine
  entry('how-computers-run-code', 'concept', COMP, 'curious', 'How a Computer Runs Code', {
    summary: 'A processor follows simple instructions very fast, reading and writing numbers in memory. Everything else — Python, browsers, LLMs — is layers built on that.',
    aliases: ['CPU', 'processor', 'RAM', 'main memory', 'machine code', 'storage'],
    tags: ['basics', 'hardware'],
    body: doc`
      ## Three parts to know
      - **CPU (processor)** — executes instructions: add these two numbers, compare, jump to another instruction. Billions per second, a few at a time per core; a laptop has 4–16 cores.
      - **RAM (memory)** — where running programs keep their data. Fast (about 100 nanoseconds per access) but wiped when power goes off. 8–32 GB on a laptop.
      - **Storage (SSD)** — files that survive a restart: your code, the database, downloaded models. Much slower than RAM, much bigger.
      Plus a **GPU**: thousands of simple cores for doing the same arithmetic on lots of numbers at once — graphics, and now AI.

      ## From your code to the CPU
      The CPU only understands **machine code** — numbered instructions for its specific chip. Your Python or JavaScript is translated down to that, by a compiler or an interpreter, before anything happens.

      ## Why it matters here
      - "Out of memory" means RAM (or GPU memory) is full — the constant question with local models.
      - Reading from memory is ~1,000× faster than from an SSD, and ~1,000,000× faster than a round trip across the internet. Those gaps explain caching, databases and why web apps feel slow.
      - A program that's "running" is a process: some code plus its memory, managed by the operating system.
    `,
  }),

  entry('compilers-interpreters', 'concept', COMP, 'curious', 'Compilers and Interpreters', {
    summary: 'Two ways to turn source code into something a CPU runs: translate it all ahead of time (compile) or read and run it as you go (interpret). Python and JavaScript mostly do the second, cleverly.',
    aliases: ['compiler', 'interpreter', 'bytecode', 'JIT', 'just-in-time compilation', 'compiled language'],
    tags: ['basics', 'languages'],
    body: doc`
      ## The two approaches
      - **Compiled** (C, Rust, Go): a compiler translates the whole program to machine code once. Fast to run; you must rebuild after every change; errors like type mismatches are caught before running.
      - **Interpreted** (Python, originally JavaScript): an interpreter reads your code and carries it out as it goes. Instant to start, easier to experiment with, slower per operation.

      ## Reality is in between
      - **Python** compiles your file to **bytecode** (the §.pyc§ files in §__pycache__§), and the interpreter runs that bytecode.
      - **JavaScript** engines (V8 in Chrome and Node) start interpreting, then **JIT-compile** hot code to machine code while it runs — which is why JavaScript is fast.
      - **TypeScript** is compiled — to JavaScript, not machine code — with type checks along the way.

      ## Why you care
      - Python loops are slow; libraries like NumPy and PyTorch are fast because their inner loops are compiled C/C++/CUDA. Push heavy work into them instead of writing loops.
      - llama.cpp is fast partly because it's compiled C++.
      - "Build steps" (Vite, the TypeScript compiler) exist because browsers only run JavaScript.
    `,
  }),

  entry('operating-systems', 'concept', COMP, 'curious', 'Operating Systems', {
    summary: 'Windows, macOS and Linux sit between programs and hardware: they run processes, share out memory and CPU, manage files and the network. Servers almost always run Linux.',
    aliases: ['operating system', 'operating systems', 'Linux', 'kernel', 'system call'],
    tags: ['basics', 'systems'],
    body: doc`
      ## What an OS does
      - **Processes**: every running program gets its own memory and a share of CPU time; the OS switches between them thousands of times a second.
      - **Files**: organises storage into folders and files, with permissions.
      - **Networking**: sockets, ports and the TCP/IP stack your web server uses.
      - **Devices**: the GPU driver is how PyTorch and Ollama reach the graphics card.
      The core of it is the **kernel**; programs ask it for things through system calls.

      ## The three you'll meet
      - **Windows** — your laptop. PowerShell, backslash paths (§C:\Users\…§), drive letters.
      - **macOS** — Unix underneath, so terminal commands match Linux closely.
      - **Linux** — nearly every server, every Docker container, every cloud VM. Forward-slash paths from §/§, bash, permissions, package managers like §apt§.

      ## Practical upshot
      Write code that doesn't assume one OS: use §pathlib§ in Python rather than gluing strings with backslashes, don't hard-code drive letters, keep line endings consistent. On Windows, WSL gives you a real Linux to match the server.
    `,
  }),

  entry('files-and-paths', 'concept', COMP, 'curious', 'Files, Folders and Paths', {
    summary: 'A path says where a file lives. Absolute paths start from the root; relative paths start from wherever you are now — the source of most “file not found” errors.',
    aliases: ['file path', 'file paths', 'relative path', 'absolute path', 'file system', 'filesystem', 'pathlib'],
    tags: ['basics', 'systems'],
    body: doc`
      ## Absolute vs relative
      - Absolute: §C:\Users\HP\projects\notes\app.py§ (Windows) or §/home/hp/projects/notes/app.py§ (Linux/Mac). Works from anywhere.
      - Relative: §data/notes.csv§ means "the §data§ folder inside the current working directory". §..§ means "one level up", §.§ means "here".

      A script that opens §data/notes.csv§ works when you run it from the project folder and fails from anywhere else — because relative paths are relative to where you *ran* it, not where the script lives.

      ## Robust in Python
      ~~~python
      from pathlib import Path

      HERE = Path(__file__).resolve().parent          # the folder this file is in
      data_file = HERE / "data" / "notes.csv"         # / joins paths on any OS
      text = data_file.read_text(encoding="utf-8")
      for p in (HERE / "uploads").glob("*.pdf"):
          print(p.name, p.stat().st_size)
      ~~~

      ## Conventions worth knowing
      - Hidden files start with a dot: §.env§, §.gitignore§, §.venv§.
      - File extensions (§.py§, §.tsx§, §.json§) are hints, not guarantees.
      - Names with spaces need quotes in the terminal — one reason developers avoid them.
      - Windows accepts forward slashes in most programming contexts; §pathlib§ handles both.
    `,
  }),

  entry('code-editors', 'concept', COMP, 'curious', 'Code Editors and VS Code', {
    summary: 'Where you’ll spend your day. VS Code (or a fork like Cursor) with the Python, ESLint and Prettier extensions gives you autocomplete, error squiggles, a debugger and a terminal in one window.',
    aliases: ['VS Code', 'Visual Studio Code', 'code editor', 'IDE', 'integrated development environment'],
    tags: ['basics', 'tooling'],
    body: doc`
      ## Setup that pays off on day one
      - Open the **project folder**, not single files (§File → Open Folder§, or §code .§ in a terminal).
      - Extensions: **Python** (Pylance), **ESLint**, **Prettier**, maybe **Tailwind CSS IntelliSense**, **Docker**, and **WSL** if you use it.
      - Select the Python interpreter from your project's §.venv§ (bottom-right corner) — otherwise imports show as errors.
      - Turn on **format on save**.

      ## Features to use deliberately
      - **Go to definition** (F12) and **find all references** (Shift+F12) — read unfamiliar code by jumping, not scrolling.
      - **Rename symbol** (F2) — renames safely everywhere.
      - **Command palette** (Ctrl+Shift+P) — every command, searchable.
      - **Integrated terminal** (Ctrl+\`) — run the dev servers in split terminals.
      - **Debugger** — breakpoints in Flask and React code instead of print statements.
      - **Source control** panel — see diffs before committing.

      ## AI in the editor
      Copilot-style completions and chat agents live here too. Treat suggestions like a colleague's code: read, run, test.
    `,
  }),

  entry('installing-tools', 'example', COMP, 'curious', 'Setting Up Your Machine', {
    summary: 'The one-time installs for this stack on Windows: Git, Python (via uv), Node.js LTS, VS Code, Docker Desktop, Ollama — and how to check each one worked.',
    aliases: ['dev environment setup', 'winget', 'Homebrew', 'installing Python', 'installing Node'],
    tags: ['basics', 'setup', 'walkthrough'],
    body: doc`
      ## On Windows, with winget (in PowerShell)
      ~~~powershell
      winget install Git.Git
      winget install astral-sh.uv            # Python versions and packages
      winget install OpenJS.NodeJS.LTS
      winget install Microsoft.VisualStudioCode
      winget install Docker.DockerDesktop    # also enables WSL 2
      winget install Ollama.Ollama
      ~~~
      (On a Mac, Homebrew does the same job: §brew install git uv node§ and friends.)

      ## Then open a *new* terminal and check
      ~~~powershell
      git --version
      uv --version
      uv python install 3.13                 # uv manages Python itself
      node --version                         # expect v24.x (LTS)
      docker run hello-world
      ollama run qwen3:4b "say hi"
      ~~~
      "Command not found" right after installing almost always means the terminal was open before the install — PATH is read when it starts.

      ## First-time Git identity
      ~~~bash
      git config --global user.name "Your Name"
      git config --global user.email "you@example.com"
      ~~~

      ## Keep it tidy
      One folder for projects (e.g. §C:\Users\you\code§ or §~/code§ in WSL), one virtual environment per project, and let tools manage versions (uv for Python, the LTS Node) rather than installing things globally by hand.
    `,
  }),

  // ---------------------------------------------------------------- programming ideas
  entry('programming-basics', 'concept', COMP, 'curious', 'What Programming Is', {
    summary: 'Writing precise instructions for a computer: store some values, make decisions, repeat things, and package steps into reusable pieces. Every language is a different spelling of the same few ideas.',
    aliases: ['programming', 'coding', 'source code', 'syntax'],
    tags: ['basics', 'foundations'],
    body: doc`
      ## The same ideas everywhere
      | Idea | Python | JavaScript |
      |---|---|---|
      | Store a value | §count = 0§ | §let count = 0;§ |
      | Decide | §if count > 3:§ | §if (count > 3) {…}§ |
      | Repeat | §for note in notes:§ | §for (const note of notes) {…}§ |
      | Package steps | §def summarize(text):§ | §function summarize(text) {…}§ |
      | Group data | §{"title": "RAG"}§ | §{ title: "RAG" }§ |

      Learn the ideas once (variables, types, conditionals, loops, functions, data structures, objects, errors, modules) and a new language becomes mostly new spelling.

      ## Precision is the job
      Computers do exactly what you wrote, not what you meant. Most bugs are the gap between the two: an off-by-one in a loop, a value that's §None§ when you expected text, a condition the wrong way round.

      ## How people actually learn it
      By building small things and reading errors. Type the examples rather than pasting them; change one thing and predict what happens; break it on purpose. With an AI assistant, ask it to *explain* code before you ask it to write more.

      ## Syntax vs semantics
      Syntax is the spelling (colons, brackets, indentation) — tools catch those errors instantly. Semantics is what the code *does* — only running and testing catches those.
    `,
  }),

  entry('variables-types', 'concept', COMP, 'curious', 'Variables and Data Types', {
    summary: 'A variable is a name pointing at a value; the value’s type — number, text, true/false, list, nothing — decides what you can do with it.',
    aliases: ['variable', 'variables', 'data type', 'data types', 'boolean', 'booleans', 'integer', 'integers', 'NoneType', 'null value'],
    tags: ['basics', 'foundations'],
    body: doc`
      ## Basic types, two languages
      | Kind | Python | JavaScript |
      |---|---|---|
      | whole number | §int§: §42§ | §number§: §42§ |
      | decimal | §float§: §0.1§ | §number§: §0.1§ |
      | text | §str§: §"hello"§ | §string§: §"hello"§ |
      | true/false | §bool§: §True§ | §boolean§: §true§ |
      | nothing | §None§ | §null§, §undefined§ |
      | list | §list§: §[1, 2]§ | §Array§: §[1, 2]§ |
      | key → value | §dict§: §{"a": 1}§ | §Object§: §{ a: 1 }§ |

      ## Dynamic typing
      In Python and JavaScript a variable can hold any type, and the type is checked only when the code runs:
      ~~~python
      tokens = "1200"          # text, from a form or a JSON field
      tokens + 100             # TypeError: can only concatenate str (not "int") to str
      int(tokens) + 100        # 1300 — convert first
      ~~~
      JavaScript is looser and often guesses instead of failing: §"1200" + 100§ is §"1200100"§. Type hints (Python) and TypeScript add checking before running.

      ## Nothing is a value too
      §None§ / §null§ means "no value here". The most common crash in any language is using something that turned out to be nothing: §'NoneType' object has no attribute 'title'§ in Python, §Cannot read properties of undefined§ in JavaScript. Check for it where values might be missing — database rows, API fields, dictionary lookups.
    `,
  }),

  entry('control-flow', 'concept', COMP, 'curious', 'Conditionals and Loops', {
    summary: 'if/else chooses a branch; for and while repeat. Together they’re how a program reacts to data instead of doing the same thing every time.',
    aliases: ['control flow', 'conditionals', 'if statement', 'if/else', 'for loop', 'for loops', 'while loop', 'loops'],
    tags: ['basics', 'foundations'],
    body: doc`
      ## Deciding
      ~~~python
      if tokens > 100_000:
          model = "large-context"
      elif tokens > 8_000:
          model = "standard"
      else:
          model = "small"
      ~~~
      ~~~js
      const label = count === 0 ? "No notes" : §\${count} notes§;   // the ternary: a one-line if/else
      ~~~

      ## Repeating
      ~~~python
      for note in notes:                  # each item in a collection
          print(note["title"])

      for i, chunk in enumerate(chunks):  # with its position
          save(i, chunk)

      while not job.done():               # until a condition changes
          time.sleep(1)
      ~~~
      ~~~js
      for (const note of notes) console.log(note.title);
      notes.forEach((note, i) => console.log(i, note.title));
      ~~~
      §break§ leaves a loop early; §continue§ skips to the next item.

      ## Truthiness
      Both languages treat some values as false in an §if§: §0§, §""§, empty lists (Python), §None§/§null§/§undefined§. Handy (§if notes:§ = "if there are any notes"), and a source of bugs when §0§ is a legitimate value.

      ## Loops at scale
      A loop inside a loop is O(n²); a database query inside a loop is the N+1 problem. When loops get slow, the fix is usually a different data structure or one bulk operation, not a faster loop.
    `,
  }),

  entry('functions-basics', 'concept', COMP, 'curious', 'Functions, Parameters and Return Values', {
    summary: 'A function packages steps under a name: inputs in (parameters), result out (return value). The main tool for not repeating yourself and for making code testable.',
    aliases: ['function call', 'function calls', 'function parameters', 'return value', 'return values', 'keyword arguments', 'default arguments', '*args'],
    tags: ['basics', 'foundations'],
    body: doc`
      ## Python
      ~~~python
      def estimate_cost(input_tokens: int, output_tokens: int, price_in: float = 5.0, price_out: float = 25.0) -> float:
          """Dollars for one LLM request. Prices are per million tokens."""
          return (input_tokens * price_in + output_tokens * price_out) / 1_000_000

      estimate_cost(4000, 500)                              # 0.0325
      estimate_cost(4000, 500, price_in=1, price_out=5)     # keyword arguments: clear and order-free
      ~~~

      ## JavaScript
      ~~~js
      function estimateCost(inputTokens, outputTokens, { priceIn = 5, priceOut = 25 } = {}) {
        return (inputTokens * priceIn + outputTokens * priceOut) / 1e6;
      }
      estimateCost(4000, 500, { priceIn: 1, priceOut: 5 });
      ~~~

      ## What makes a good function
      - **One job**, named for it: §chunk_text§, §embed_batch§, §build_prompt§.
      - **Inputs in, output out**: depend on parameters rather than globals, return a result rather than printing it. That's what makes it testable.
      - **Short enough to read at once.** If you're scrolling, split it.

      ## Things to know
      - A function without §return§ gives back §None§ (Python) / §undefined§ (JS).
      - §*args§ and §**kwargs§ collect extra positional / keyword arguments — you'll see them in decorators.
      - **Never use a mutable default** in Python (§def f(items=[])§): the same list is shared between calls. Use §None§ and create it inside.
      - Functions are values: you can pass them around — which is how callbacks, decorators, React components and LLM tools all work.
    `,
  }),

  entry('scope-closures', 'concept', COMP, 'curious', 'Scope and Closures', {
    summary: 'Scope decides where a name is visible. A closure is a function that remembers the variables around it when it was made — the mechanism behind React hooks, event handlers and decorators.',
    aliases: ['variable scope', 'closure', 'closures', 'lexical scope', 'global variable', 'global variables', 'stale closure'],
    tags: ['basics', 'languages'],
    body: doc`
      ## Scope
      Variables made inside a function exist only inside it. Inner code can read outer variables; outer code can't see inner ones.
      ~~~python
      MODEL = "qwen3:8b"          # module level ("global")

      def ask(q):
          prompt = f"Answer briefly: {q}"   # local to ask()
          return call(MODEL, prompt)        # can read MODEL
      ~~~
      Keep globals for true constants; mutable global state in a web server is shared by every request and every thread — a classic source of bugs.

      ## Closures
      A function created inside another keeps access to the outer variables, even after the outer function has returned:
      ~~~js
      function makeCounter() {
        let n = 0;
        return () => ++n;       // this arrow function "closes over" n
      }
      const next = makeCounter();
      next(); next();           // 1, 2 — n lives on inside the closure
      ~~~

      ## Where you'll hit them
      - **React**: every render creates new functions that close over *that render's* state. An effect or timer created in an old render sees old values — a **stale closure**. Hence dependency arrays and the updater form §setCount(c => c + 1)§.
      - **Decorators** in Python are closures wrapping a function.
      - **Event handlers** and callbacks close over the variables they need.
    `,
  }),

  entry('data-structures-basics', 'concept', COMP, 'curious', 'Arrays, Stacks and Queues', {
    summary: 'Ordered collections are the default container. Add to the end and take from the end: a stack. Add to the end and take from the front: a queue. Picking the right one is half of writing fast code.',
    aliases: ['data structure', 'data structures', 'array', 'arrays', 'queue', 'FIFO', 'LIFO', 'deque'],
    tags: ['basics', 'data structures'],
    body: doc`
      ## Arrays / lists
      Items in order, found by position: §notes[0]§ is the first, §notes[-1]§ the last (Python). Reading by position is instant; appending at the end is fast; inserting or removing at the *front* shifts everything — slow for big lists; searching for a value means scanning (O(n)).

      ## Stack — last in, first out
      Like a pile of plates. §push§ / §pop§ at the end. The **call stack** of function calls, undo history, walking a tree depth-first, matching brackets.

      ## Queue — first in, first out
      Like a line at a counter. Add at the back, take from the front. Background **job queues**, the browser's **event loop**, breadth-first search, rate-limited request queues. In Python use §collections.deque§ (fast at both ends), not a list.

      ## Choosing a structure
      | Need | Use |
      |---|---|
      | Keep things in order, go through them all | list / array |
      | Look up by key or id | dict / Map (hash map) |
      | "Have I seen this?" | set |
      | Process in arrival order | queue (deque) |
      | Most recent first, undo | stack |
      | Always get the smallest / highest priority | heap (§heapq§) |

      Switching a list lookup inside a loop to a dict or set is the single most common speed-up in everyday code.
    `,
  }),

  entry('strings-text', 'concept', COMP, 'curious', 'Strings and Text', {
    summary: 'Text in a program is a string: a sequence of characters you can slice, search, split, join and format. LLM apps are mostly string handling around a model call.',
    aliases: ['string', 'strings', 'f-string', 'f-strings', 'template literal', 'string formatting', 'text processing'],
    tags: ['basics', 'text'],
    body: doc`
      ## The everyday operations
      ~~~python
      title = "  Attention Is All You Need  "
      title.strip()                    # "Attention Is All You Need"
      title.lower()                    # case-insensitive comparisons
      "attention" in title.lower()     # True
      "a,b,c".split(",")               # ["a", "b", "c"]
      "\n\n".join(chunks)              # glue pieces with blank lines
      text[:200]                       # first 200 characters
      f"{name} has {n} notes"          # f-string formatting
      f"{cost:.4f} USD"                # 4 decimal places
      ~~~
      ~~~js
      title.trim().toLowerCase().includes("attention");
      §\${name} has \${n} notes§;         // template literal, in backticks
      text.slice(0, 200);
      ~~~

      ## Strings are immutable
      Methods return *new* strings; §title.strip()§ on its own line changes nothing. Assign the result.

      ## Building prompts
      Prompts are strings assembled from parts — instructions, retrieved chunks, the question. Keep templates in one place, mark where untrusted text goes (§<document>…</document>§), and cap lengths before sending.

      ## Characters vs bytes
      A string is characters; on disk and over the network it's bytes in an encoding — UTF-8. Always pass §encoding="utf-8"§ when reading files in Python on Windows.
    `,
  }),

  entry('oop', 'concept', COMP, 'curious', 'Objects and Classes', {
    summary: 'A class bundles data with the functions that work on it; objects are instances of it. SQLAlchemy models, Pydantic schemas and SDK clients are all classes you’ll use daily.',
    aliases: ['object-oriented programming', 'OOP', 'classes', 'inheritance', 'constructor', '__init__'],
    tags: ['basics', 'languages'],
    body: doc`
      ## A class
      ~~~python
      class Conversation:
          def __init__(self, system: str):
              self.system = system          # attributes: this object's data
              self.messages = []

          def add(self, role: str, content: str) -> None:   # methods: functions on the data
              self.messages.append({"role": role, "content": content})

          def token_estimate(self) -> int:
              return sum(len(m["content"]) for m in self.messages) // 4

      chat = Conversation("Be concise.")     # an instance (object)
      chat.add("user", "What is RAG?")
      chat.token_estimate()
      ~~~
      §self§ is the particular object the method was called on. JavaScript's equivalent uses §class§, §constructor§ and §this§.

      ## Inheritance
      §class Note(Base):§ — Note gets everything Base has, and adds or overrides. SQLAlchemy models inherit from a declarative base; Pydantic schemas from §BaseModel§; Flask views sometimes from §MethodView§. Deep inheritance trees get confusing; prefer composition (an object *holding* another) in your own code.

      ## Where you'll use classes vs functions
      - **Using** classes: all the time — §anthropic.Anthropic()§, §Flask(__name__)§, models, schemas.
      - **Writing** classes: when data and behaviour genuinely belong together, or a library asks for them. Otherwise plain functions and dicts are simpler.
      - **React** used classes long ago; modern React is functions plus hooks.
    `,
  }),

  entry('mutability', 'concept', COMP, 'curious', 'Mutability, Values and References', {
    summary: 'Some values can be changed in place (lists, dicts, objects); others can’t (numbers, strings). Variables point at values, so two names can share one list — and React only notices changes when you make new objects.',
    aliases: ['mutable', 'immutable', 'mutability', 'immutability', 'shallow copy', 'deep copy', 'pass by reference'],
    tags: ['basics', 'languages'],
    body: doc`
      ## Two names, one list
      ~~~python
      a = ["rag"]
      b = a              # b points at the SAME list
      b.append("agents")
      print(a)           # ['rag', 'agents'] — surprise
      c = list(a)        # a (shallow) copy: a new list with the same items
      ~~~
      Variables hold references to values. Assigning, passing to a function, or storing in another structure shares the reference; it doesn't copy.

      ## Mutable vs immutable
      - Immutable: numbers, strings, tuples (Python). "Changing" one makes a new value.
      - Mutable: lists, dicts, sets, objects, arrays. Changes in place are visible to everyone holding a reference.

      ## Why React cares
      React decides whether to re-render by checking if state is a **different object** (§Object.is§). Mutating in place keeps the same reference, so React sees "no change":
      ~~~js
      items.push(x); setItems(items);        // ✗ same array — no re-render
      setItems([...items, x]);               // ✓ new array
      setNote({ ...note, title: "New" });    // ✓ new object with one field changed
      ~~~

      ## Python gotchas
      - Mutable default arguments are shared across calls.
      - A function that modifies a list you passed in changes *your* list.
      - A shallow copy of a list of dicts still shares the dicts (§copy.deepcopy§ copies all the way down).
    `,
  }),

  entry('errors-exceptions', 'concept', COMP, 'curious', 'Errors and Exceptions', {
    summary: 'When something goes wrong at runtime, the code raises an exception that travels up until something catches it. Catch what you can handle; let the rest fail loudly with a traceback.',
    aliases: ['exception', 'exceptions', 'try/except', 'try/catch', 'error handling'],
    tags: ['basics', 'debugging'],
    body: doc`
      ## Raising and catching
      ~~~python
      def load_note(note_id: int) -> dict:
          note = db.get(note_id)
          if note is None:
              raise LookupError(f"note {note_id} not found")
          return note

      try:
          note = load_note(42)
      except LookupError:
          note = None                    # handled: we know what to do here
      ~~~
      ~~~js
      try {
        const data = await api("/notes/42");
      } catch (err) {
        showError(err.message);
      } finally {
        setLoading(false);               // runs either way
      }
      ~~~

      ## Rules of thumb
      - **Catch specific exceptions** you can do something about (§KeyError§, §httpx.TimeoutException§, §anthropic.RateLimitError§).
      - **Don't swallow errors** with a bare §except: pass§ — the bug doesn't go away, it just becomes invisible.
      - **Fail early** on bad input or missing config, with a clear message.
      - At the **edges** (a Flask error handler, a React error boundary), catch everything, log it, and show something sensible.

      ## Reading a traceback
      Python prints the chain of calls that led to the error; read from the **bottom** (the error and message), then up to the first line in *your* code. The error's type and message usually say exactly what happened — read them before guessing.
    `,
  }),

  entry('modules-imports', 'concept', COMP, 'curious', 'Modules, Packages and Imports', {
    summary: 'Code is split into files (modules) grouped in folders (packages); import pulls names from one into another. How a project grows beyond one file — and the source of “ModuleNotFoundError”.',
    aliases: ['module', 'modules', 'import statement', 'ES modules', 'ModuleNotFoundError', 'circular import', '__init__.py'],
    tags: ['basics', 'languages'],
    body: doc`
      ## Python
      ~~~python
      # backend/app/llm.py
      def summarize(text: str) -> str: ...

      # backend/app/notes.py
      from app.llm import summarize          # absolute import from the package "app"
      from .db import db                     # relative import within the same package
      import json                            # standard library
      import httpx                           # installed third-party package
      ~~~
      A folder with an §__init__.py§ is a **package**. Python finds imports through the current project, the standard library, and the active virtual environment's installed packages.

      ## JavaScript (ES modules)
      ~~~js
      // src/api.ts
      export async function api(path, options) { … }
      export default api;

      // src/pages/Notes.tsx
      import api from "../api";
      import { useState } from "react";
      ~~~

      ## The errors you'll see
      - §ModuleNotFoundError: No module named 'flask'§ — not installed in *this* environment (wrong venv, or forgot §uv add§).
      - §No module named 'app'§ — running from the wrong folder, so the package isn't on the path.
      - **Circular imports** — §a.py§ imports §b.py§ which imports §a.py§. Move the shared piece into a third module, or import inside a function; Flask's app factory pattern exists partly to avoid this.
    `,
  }),

  entry('libraries-frameworks', 'concept', COMP, 'curious', 'Libraries, Frameworks and Dependencies', {
    summary: 'A library is code you call; a framework calls your code. Either way it becomes a dependency — a version you install, trust, update and sometimes fight with.',
    aliases: ['library', 'libraries', 'framework', 'frameworks', 'dependency', 'dependencies', 'third-party package'],
    tags: ['basics', 'tooling'],
    body: doc`
      ## Library vs framework
      - **Library**: you're in charge and call it when you want — §requests.get(…)§, §numpy.dot(…)§, §date-fns§.
      - **Framework**: it's in charge and calls *your* code at the right moments — Flask calls your view when a request arrives; React calls your component when state changes. "Inversion of control."

      ## Dependencies
      Everything you install (and everything *it* installs) is a dependency. A React app has hundreds; a Flask app dozens.
      - Declared in §pyproject.toml§ / §package.json§, exact versions pinned in the **lockfile**.
      - Updated deliberately: read the changelog for major versions; run the tests.
      - Checked for known vulnerabilities: §pip-audit§, §npm audit§, Dependabot.

      ## Choosing one
      Popular and maintained (recent releases, open issues answered), a licence you can use, not dragging in half the internet, solves a problem you actually have. For tiny tasks, a few lines of your own code beats a dependency (see left-pad).

      ## Reading a library's docs
      Quickstart first, then the API reference for the functions you use. Check which version the docs are for — tutorials from two major versions ago are the most common source of "this doesn't work".
    `,
  }),

  entry('functional-style', 'concept', COMP, 'curious', 'Functional Style: map, filter, reduce', {
    summary: 'Transform collections with small functions instead of hand-written loops, and prefer functions that return new values over ones that change things. React code is written almost entirely this way.',
    aliases: ['map/filter/reduce', 'pure function', 'pure functions', 'higher-order function', 'higher-order functions', 'side-effect free', 'list comprehension'],
    tags: ['basics', 'languages'],
    body: doc`
      ## The three verbs
      ~~~js
      const titles = notes.map((n) => n.title);                        // transform each
      const pinned = notes.filter((n) => n.pinned);                    // keep some
      const words  = notes.reduce((sum, n) => sum + n.wordCount, 0);   // combine into one
      const sorted = [...notes].sort((a, b) => b.updated - a.updated); // copy, then sort
      ~~~
      ~~~python
      titles = [n["title"] for n in notes]                  # list comprehension = map
      pinned = [n for n in notes if n["pinned"]]            # = filter
      words  = sum(n["word_count"] for n in notes)          # = reduce
      by_id  = {n["id"]: n for n in notes}                  # dict comprehension
      ~~~

      ## Pure functions
      A pure function's output depends only on its inputs, and it changes nothing outside itself. Easy to test, safe to call twice, easy to cache. React components are meant to be pure: same props and state → same JSX.

      ## Higher-order functions
      Functions that take or return functions: §map§ takes one; a decorator returns one; §useCallback§ stores one. Once "functions are values" clicks, a lot of modern code reads naturally.

      ## When a loop is clearer
      Several steps with side effects (saving, logging, early exit) often read better as a plain §for§ loop. Clarity beats cleverness.
    `,
  }),

  entry('algorithms-basics', 'concept', COMP, 'curious', 'Algorithms and Problem Solving', {
    summary: 'An algorithm is a precise recipe for solving a problem. Break the problem down, solve the small cases, then think about how the work grows as the input grows.',
    aliases: ['algorithm', 'algorithms', 'problem solving', 'pseudocode', 'decomposition'],
    tags: ['basics', 'algorithms'],
    body: doc`
      ## A way to approach any task
      1. **Say it in plain words**: "given a document, return overlapping 500-token pieces".
      2. **Work a tiny example by hand**: 1,200 tokens, size 500, overlap 100 → pieces at 0, 400, 800.
      3. **Write pseudocode**, then code.
      4. **Test edge cases**: empty input, exactly one chunk, overlap bigger than size.
      5. **Ask how it scales**: fine for 10 items? 10 million?

      ## Classic building blocks
      Searching (linear, binary), sorting, counting with a dict, two pointers walking a list, recursion over trees, breadth- and depth-first search over graphs. Most everyday tasks are a combination.

      ## In app work
      You'll rarely invent algorithms; you'll choose them — often by choosing the right library or database feature (an index *is* an algorithm choice). What you do need is the habit of noticing when something that works for 50 rows will fall over at 50,000.

      ## With AI assistants
      Describe the problem, constraints and edge cases precisely — that's the same skill as step 1 above, and it's what makes generated code correct.
    `,
  }),

  entry('reading-docs', 'concept', COMP, 'curious', 'Reading Docs and Error Messages', {
    summary: 'The fastest developers aren’t the ones who remember everything — they’re the ones who read error messages fully and know how to find the right page of the docs.',
    aliases: ['documentation', 'docs', 'error message', 'error messages', 'API reference'],
    tags: ['basics', 'craft'],
    body: doc`
      ## Error messages
      - Read the **whole** message, especially the last line (Python) or first red line (browser console).
      - Copy the exact error text into a search or an AI chat — including the library name and version.
      - Find the **first line in your own code** in the traceback; the bug is usually there or in what you passed to the library.

      ## Docs, in order of usefulness
      1. **Official docs** for the version you use (check the version switcher).
      2. The library's **examples** folder and README on GitHub.
      3. **Changelogs / migration guides** when upgrading.
      4. GitHub **issues** — someone has hit your error before; closed issues often contain the fix.
      5. Blog posts and Q&A sites — check the date.

      ## Kinds of docs
      - **Tutorial**: follow along to build something (start here with a new tool).
      - **How-to guide**: steps for a specific task.
      - **Reference**: every function and parameter (look things up here).
      - **Explanation**: why it works the way it does.

      ## Asking for help well
      What you tried, what you expected, what happened (exact error), a minimal example, versions. Writing that often solves it before you send it.
    `,
  }),

  // ---------------------------------------------------------------- Python
  entry('python-basics', 'concept', BACK, 'curious', 'Python Basics', {
    summary: 'Python reads almost like pseudocode: indentation marks blocks, there are no semicolons or braces, and a big standard library comes built in. The language of the backend and of AI.',
    aliases: ['Python', 'Python syntax', 'indentation', 'REPL', 'print()'],
    tags: ['basics', 'python'],
    year: 1991,
    body: doc`
      ## Shape of a program
      ~~~python
      import json
      from pathlib import Path

      MAX_CHARS = 2000                      # constants in CAPS by convention

      def load_notes(path: Path) -> list[dict]:
          with path.open(encoding="utf-8") as f:
              return json.load(f)

      def main() -> None:
          notes = load_notes(Path("notes.json"))
          for note in notes:
              if len(note["body"]) > MAX_CHARS:     # indentation IS the block structure
                  print(f"{note['title']} is long")

      if __name__ == "__main__":            # run main() only when executed directly
          main()
      ~~~

      ## Things that feel different coming from SQL or Excel
      - Indentation (4 spaces) defines blocks — mixing tabs and spaces breaks things.
      - Everything is an object with methods: §"text".upper()§, §notes.append(x)§.
      - Counting starts at **0**; §range(3)§ is 0, 1, 2; slices exclude the end (§s[0:3]§ is three characters).
      - §=§ assigns, §==§ compares.

      ## Try things interactively
      Type §python§ (or §uv run python§) for a REPL, or use a Jupyter notebook — run a line, see the result. Faster than editing a file for experiments.

      ## Style
      PEP 8: §snake_case§ for functions and variables, §PascalCase§ for classes. Let Ruff format it for you.
    `,
  }),

  entry('python-collections', 'concept', BACK, 'curious', 'Lists, Dicts, Sets and Tuples', {
    summary: 'Python’s four built-in containers: lists (ordered), dicts (key → value), sets (unique items) and tuples (fixed, unchangeable). JSON maps straight onto lists and dicts.',
    aliases: ['Python list', 'Python lists', 'Python dict', 'tuple', 'tuples', 'Python set', 'comprehension', 'comprehensions'],
    tags: ['basics', 'python', 'data structures'],
    body: doc`
      ~~~python
      tags = ["ml", "rag", "ml"]                      # list: ordered, duplicates allowed
      note = {"id": 42, "title": "RAG", "tags": tags} # dict: key -> value
      unique = set(tags)                              # {'ml', 'rag'}: no duplicates, fast "in"
      point = (3, 4)                                  # tuple: fixed; can be a dict key

      note["title"]              # 'RAG'
      note.get("summary", "")    # '' instead of KeyError when missing
      note["tags"].append("llm") # lists change in place
      "rag" in unique            # True, O(1)
      for key, value in note.items(): ...
      ~~~

      ## Comprehensions
      ~~~python
      titles = [n["title"] for n in notes if n["pinned"]]
      counts = {tag: tags.count(tag) for tag in set(tags)}
      ~~~
      Read them as "give me *this* for each item in *that*, if *condition*".

      ## Useful extras from the standard library
      - §collections.Counter(tags)§ — count things.
      - §collections.defaultdict(list)§ — group things without "if key not in dict".
      - §sorted(notes, key=lambda n: n["updated"], reverse=True)§ — sort by a field.

      ## Picking one
      Order matters → list. Look up by key → dict. Membership and uniqueness → set. Fixed record → tuple (or a dataclass for readability).
    `,
  }),

  entry('python-files-context', 'concept', BACK, 'curious', 'Files and Context Managers', {
    summary: 'Open, read and write files — and let a with-block close them for you, even if something fails. The same with-pattern manages database sessions, locks and streamed API responses.',
    aliases: ['context manager', 'context managers', 'with statement', 'open()', 'reading files'],
    tags: ['basics', 'python'],
    body: doc`
      ## Reading and writing
      ~~~python
      from pathlib import Path
      import csv, json

      text = Path("notes.md").read_text(encoding="utf-8")        # whole file at once

      with open("big.txt", encoding="utf-8") as f:              # line by line, low memory
          for line in f:
              process(line)

      with open("out.json", "w", encoding="utf-8") as f:
          json.dump(results, f, ensure_ascii=False, indent=2)

      with open("rows.csv", newline="", encoding="utf-8") as f:
          for row in csv.DictReader(f):                          # each row as a dict
              print(row["title"])
      ~~~

      ## What "with" does
      §with X as y:§ calls X's setup, runs the block, and **always** runs the cleanup when the block ends — normally or by exception. For files: close. For a database transaction: commit or roll back. For a streamed LLM response: close the connection.
      ~~~python
      with client.messages.stream(...) as stream:    # connection closed afterwards, guaranteed
          for text in stream.text_stream: ...
      with Session(engine) as session, session.begin():
          ...                                          # committed, or rolled back on error
      ~~~

      ## Binary files
      PDFs, images and model files are bytes: §open(path, "rb")§. Don't pass an encoding; do check sizes before loading huge files into memory.
    `,
  }),

  // ---------------------------------------------------------------- JavaScript and the browser
  entry('js-values-types', 'concept', FRONT, 'curious', 'let, const and JavaScript Types', {
    summary: 'Declare with const by default and let when a value must change; never var. Know JavaScript’s few types — and its quirks with ==, null and undefined.',
    aliases: ['let and const', 'JavaScript types', 'typeof', 'strict equality', 'undefined'],
    tags: ['basics', 'javascript'],
    body: doc`
      ~~~js
      const model = "qwen3:8b";     // can't be reassigned (but an object's contents can change)
      let retries = 0;              // will change
      retries += 1;

      typeof 42          // "number"   (no separate integer type)
      typeof "hi"        // "string"
      typeof true        // "boolean"
      typeof undefined   // "undefined" — declared but never given a value, or a missing property
      typeof null        // "object"   — a famous 1995 bug; null means "deliberately empty"
      typeof [1, 2]      // "object"   — use Array.isArray()
      typeof {}          // "object"
      typeof (() => 1)   // "function"
      ~~~

      ## Equality
      Always §===§ and §!==§. The loose §==§ converts types first: §0 == ""§ is true, §null == undefined§ is true. Strict equality compares without conversion.

      ## Missing values
      - Reading a property that doesn't exist gives §undefined§, not an error — until you read a property *of* it: §note.author.name§ → "Cannot read properties of undefined".
      - Optional chaining §note.author?.name§ returns §undefined§ instead of crashing; §??§ supplies a default: §note.title ?? "Untitled"§.

      ## Numbers
      All numbers are 64-bit floats: §0.1 + 0.2 !== 0.3§, integers are exact only up to 2⁵³. Use §Number(x)§ / §parseInt(x, 10)§ to convert form input, which is always a string.
    `,
  }),

  entry('js-functions', 'concept', FRONT, 'curious', 'JavaScript Functions and Arrow Functions', {
    summary: 'Functions are values in JavaScript: declared, stored, passed and returned. Arrow functions are the short form you’ll see everywhere in React.',
    aliases: ['arrow function', 'arrow functions', 'callback function', 'default parameters', 'rest parameters'],
    tags: ['basics', 'javascript'],
    body: doc`
      ## Three ways to write one
      ~~~js
      function add(a, b) { return a + b; }          // declaration (hoisted: usable before this line)
      const add2 = function (a, b) { return a + b; };
      const add3 = (a, b) => a + b;                  // arrow: implicit return for one expression
      const toNote = (row) => ({ id: row.id, title: row.title });   // returning an object: wrap in ()
      ~~~

      ## Passing functions around
      ~~~js
      notes.filter((n) => n.pinned);                 // a callback
      button.addEventListener("click", () => save());
      setTimeout(() => setStatus("idle"), 2000);
      <button onClick={() => onDelete(note.id)}>Delete</button>   // React: pass a function, don't call it
      ~~~
      §onClick={onDelete(note.id)}§ (no arrow) *calls* it during render — a classic bug.

      ## Parameters
      ~~~js
      function search(query, { limit = 10, tags = [] } = {}) { … }   // defaults + destructured options
      function log(...parts) { console.log(parts.join(" ")); }       // rest: any number of arguments
      ~~~

      ## this
      Regular functions get their own §this§ depending on how they're called; arrow functions use the §this§ of where they were written. Modern React code rarely uses §this§ at all — one reason arrow functions took over.
    `,
  }),

  entry('js-arrays-objects', 'concept', FRONT, 'curious', 'Arrays and Objects in JavaScript', {
    summary: 'JavaScript’s everyday containers, and the modern syntax for working with them without mutation: destructuring, spread, map/filter, Object.entries.',
    aliases: ['destructuring', 'spread operator', 'spread syntax', 'JavaScript object', 'JavaScript objects', 'JavaScript array', 'Object.entries'],
    tags: ['basics', 'javascript'],
    body: doc`
      ## Objects
      ~~~js
      const note = { id: 42, title: "RAG", tags: ["llm"] };
      note.title;                 // "RAG"
      note["title"];              // same, with a computed key
      const { title, tags = [] } = note;          // destructuring, with a default
      const updated = { ...note, title: "RAG basics" };   // copy with one change
      Object.keys(note); Object.entries(note);    // loop over fields
      ~~~

      ## Arrays
      ~~~js
      const ids = notes.map((n) => n.id);
      const found = notes.find((n) => n.id === 42);        // first match or undefined
      const has = notes.some((n) => n.pinned);             // true/false
      const [first, ...rest] = notes;                      // array destructuring
      const merged = [...a, ...b];                         // concatenate
      const without = notes.filter((n) => n.id !== 42);    // "remove" without mutating
      ~~~

      ## Mutating vs non-mutating methods
      §push§, §pop§, §splice§, §sort§ and §reverse§ change the array in place — avoid them on React state. §map§, §filter§, §slice§, §concat§, spread, and the newer §toSorted§ / §toReversed§ return new arrays.

      ## JSON
      These map directly to JSON: §JSON.stringify(note)§ to send, §JSON.parse(text)§ (or §await res.json()§) to receive.
    `,
  }),

  entry('dom-events', 'concept', FRONT, 'curious', 'Events and Event Listeners', {
    summary: 'Clicks, key presses, form submits and network responses arrive as events; your code registers functions to run when they happen. React wraps this in onClick-style props.',
    aliases: ['event listener', 'event listeners', 'addEventListener', 'event handler', 'event handlers', 'event bubbling', 'preventDefault'],
    tags: ['basics', 'browser'],
    body: doc`
      ## Plain JavaScript
      ~~~js
      const form = document.querySelector("#ask");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();                        // stop the full-page reload
        const question = new FormData(form).get("q");
        await ask(question);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "/" ) focusSearch();
      });
      ~~~

      ## In React
      ~~~jsx
      <form onSubmit={handleSubmit}>…</form>
      <input onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setOpen(true)}>Open</button>
      ~~~
      Same events, attached for you and removed when the component goes away.

      ## Things to know
      - **Bubbling**: an event on a button also fires on its parents up to §document§. §event.stopPropagation()§ stops it; one listener on a list can handle all its rows.
      - **Default actions**: links navigate, forms submit and reload — §event.preventDefault()§ cancels that.
      - **event.target** is what was actually clicked; in forms, §e.target.value§ is always a string.
      - Handlers run on the single JavaScript thread: keep them quick, and hand slow work to §async§ code.
    `,
  }),

  // ---------------------------------------------------------------- the web
  entry('internet-basics', 'concept', WEB, 'curious', 'What the Internet Is', {
    summary: 'A network of networks: millions of machines passing small packets of data between numbered addresses, hop by hop. The web is one of many things running on top of it.',
    aliases: ['internet', 'the internet', 'computer network', 'ISP'],
    tags: ['basics', 'networking'],
    body: doc`
      ## The layers, loosely
      1. **Physical**: fibre, copper, Wi-Fi, undersea cables (India connects to the world through a few dozen of them, landing mostly in Mumbai and Chennai).
      2. **IP**: every device has an address; routers pass **packets** towards their destination one hop at a time.
      3. **TCP / UDP**: turn packets into reliable conversations between programs on those devices (identified by ports).
      4. **Applications**: the web (HTTP), email, DNS, video calls, SSH, databases, your app talking to an LLM API.

      ## Internet vs web
      The **internet** is the network. The **web** is one application on it: pages and APIs fetched over HTTP, linked by URLs. Your Flask server talking to Postgres, or Ollama on localhost, uses the same networking without being "the web".

      ## Your home connection
      Your router gives devices private addresses (like §192.168.1.23§) and shares one public address; that's why your phone can reach your laptop's dev server on the same Wi-Fi but the rest of the internet can't.

      ## Speed has two parts
      **Bandwidth** (how much per second) and **latency** (how long one trip takes). For web apps, latency usually dominates.
    `,
  }),

  entry('websites-web-apps', 'concept', WEB, 'curious', 'Websites and Web Apps', {
    summary: 'A static site sends the same files to everyone; a web app runs code per request, with logins, a database and personal data. Your side project is the second kind.',
    aliases: ['web app', 'web apps', 'web application', 'static site', 'dynamic site', 'frontend and backend split'],
    tags: ['basics', 'web'],
    body: doc`
      ## Three shapes
      - **Static site** — HTML, CSS and JS files served as-is: a portfolio, docs, a blog. Cheap, fast, nothing to break.
      - **Server-rendered app** — the server builds HTML per request from a database (Flask with Jinja templates, Django, Rails).
      - **Single-page app + API** — the server sends a JavaScript app once (React, built by Vite); the app then fetches JSON from an API (Flask) and draws everything in the browser.

      ## The pieces of your stack
      ~~~text
      Browser ── React app (built files) ───────────┐
         │                                          │ served as static files
         └── fetch("/api/…") ──► Flask API ──► Postgres (+ pgvector)
                                     │
                                     ├──► LLM provider API (hosted)
                                     └──► Ollama on a GPU box (local models)
      ~~~

      ## What "full stack" means here
      Knowing enough of each layer to build a feature end to end: a form in React, an endpoint in Flask, a table and query in Postgres, a model call in the middle, and the deploy that puts it online.
    `,
  }),

  entry('web-servers', 'concept', WEB, 'curious', 'Web Servers', {
    summary: 'A program that listens on a port, reads HTTP requests and writes responses — either files from disk (static) or whatever your code produces (dynamic).',
    aliases: ['web server', 'web servers', 'static files', 'static file server', 'dev server', 'development server'],
    tags: ['basics', 'web'],
    body: doc`
      ## The smallest one
      ~~~bash
      python -m http.server 8000        # serves the current folder at http://localhost:8000
      ~~~
      That's a static server: request §/index.html§, get the file.

      ## Dynamic
      Flask is a web *framework*: a server calls your Python function for each request and sends back what it returns. In development, §flask run§ is a simple built-in server; in production, Gunicorn runs your app and a reverse proxy (nginx, Caddy or the hosting platform's) sits in front.

      ## Your dev setup has several
      - Vite's dev server on :5173 — serves the React app, rebuilds on save.
      - Flask on :5000 — the API.
      - Plus Postgres (:5432) and Ollama (:11434), which aren't web servers but listen on ports the same way.

      ## What any server must handle
      Many requests at once (concurrency), slow clients, timeouts, errors that shouldn't crash everything, and HTTPS. Dev servers skip most of this — which is why they're not for production.
    `,
  }),

  entry('html-forms', 'concept', WEB, 'curious', 'HTML Forms', {
    summary: 'Inputs, labels and a submit button — the browser’s built-in way to collect data. React forms still use the same elements and events underneath.',
    aliases: ['HTML form', 'HTML forms', 'input element', 'form submission', 'textarea', 'FormData'],
    tags: ['basics', 'html'],
    body: doc`
      ~~~html
      <form action="/api/ask" method="post">
        <label for="q">Your question</label>
        <textarea id="q" name="q" required maxlength="2000"></textarea>

        <label for="model">Model</label>
        <select id="model" name="model">
          <option value="local">Local (Ollama)</option>
          <option value="hosted">Hosted</option>
        </select>

        <label><input type="checkbox" name="cite" checked> Cite sources</label>
        <button type="submit">Ask</button>
      </form>
      ~~~

      ## Built-in behaviour worth keeping
      - Enter submits; §required§, §maxlength§, §type="email"§ validate before sending (convenience only — the server must validate too).
      - §<label for>§ makes the label clickable and tells screen readers what the field is.
      - Input types give the right phone keyboard: §email§, §number§, §url§, §search§.

      ## Two ways to submit
      - **Classic**: the browser sends the form and loads the response as a new page.
      - **JavaScript / React**: intercept §submit§, §preventDefault()§, send JSON with §fetch§, update the page in place. What your React app will do.

      Values always arrive as **strings** (checkbox: present or not) — convert numbers on both sides.
    `,
  }),

  // ---------------------------------------------------------------- SQL
  entry('sql-select', 'concept', DATA, 'curious', 'SQL SELECT Basics', {
    summary: 'SELECT columns FROM a table WHERE rows match, ORDER BY something, LIMIT how many. Written in that order, run in a different one.',
    aliases: ['SELECT statement', 'WHERE clause', 'ORDER BY', 'LIMIT clause', 'SQL query', 'SQL queries'],
    tags: ['basics', 'sql'],
    body: doc`
      ~~~sql
      SELECT id, title, created_at
      FROM notes
      WHERE owner_id = 42
        AND created_at > now() - interval '30 days'
        AND title ILIKE '%attention%'
      ORDER BY created_at DESC
      LIMIT 20;
      ~~~

      ## Logical order of execution
      §FROM§ → §WHERE§ → §GROUP BY§ → §HAVING§ → §SELECT§ → §ORDER BY§ → §LIMIT§. That's why you can't use a §SELECT§ alias in §WHERE§, but you can in §ORDER BY§.

      ## NULL is not a value
      §WHERE summary = NULL§ matches nothing; use §IS NULL§ / §IS NOT NULL§. Any comparison with NULL is "unknown", which §WHERE§ treats as false. §coalesce(summary, '')§ substitutes a default.

      ## From analyst SQL to app SQL
      You've written queries that run once over a whole table. App queries run thousands of times with different parameters — §WHERE owner_id = %s§ — so they must be **parameterised** (never string-glued), **indexed** for their filters, and **bounded** (§LIMIT§, pagination).
    `,
  }),

  entry('sql-joins', 'concept', DATA, 'curious', 'SQL Joins', {
    summary: 'Combine rows from tables that share a key. INNER keeps only matches; LEFT keeps every row from the left table, with NULLs where nothing matched.',
    aliases: ['SQL join', 'SQL joins', 'inner join', 'left join', 'outer join', 'join condition'],
    tags: ['basics', 'sql'],
    body: doc`
      ~~~sql
      -- every chunk with its document's title
      SELECT c.id, c.text, d.title
      FROM chunks c
      JOIN documents d ON d.id = c.document_id;          -- INNER: only chunks whose document exists

      -- every document, with how many chunks it has (0 if none yet)
      SELECT d.id, d.title, count(c.id) AS chunk_count
      FROM documents d
      LEFT JOIN chunks c ON c.document_id = d.id
      GROUP BY d.id, d.title;
      ~~~

      ## Picking the join
      - **INNER JOIN** (plain §JOIN§): rows that have a match on both sides.
      - **LEFT JOIN**: all rows from the left, matched where possible — "documents *and* their chunks, if any". Filtering the right table in §WHERE§ quietly turns it back into an inner join; put such conditions in §ON§.
      - Many-to-many goes through a join table: §notes → note_tags → tags§.

      ## Row multiplication
      Joining one note to its 5 tags and 3 links gives 15 rows. Aggregates over that (sums, counts) are silently wrong. Join one relationship at a time, or aggregate in a subquery first.

      ## In an ORM
      SQLAlchemy writes these joins for you from relationships; knowing what they compile to is how you spot the N+1 problem and the multiplication bug.
    `,
  }),

  entry('sql-aggregates', 'concept', DATA, 'curious', 'GROUP BY and Aggregates', {
    summary: 'Collapse many rows into summary rows: count, sum, average, min, max per group. HAVING filters the groups; WHERE filters the rows before grouping.',
    aliases: ['GROUP BY', 'aggregate function', 'aggregate functions', 'HAVING clause', 'COUNT(*)'],
    tags: ['basics', 'sql'],
    body: doc`
      ~~~sql
      -- LLM spend per feature per day, last week
      SELECT date_trunc('day', created_at) AS day,
             feature,
             count(*)                       AS calls,
             sum(input_tokens + output_tokens) AS tokens,
             round(sum(cost_usd), 2)        AS cost_usd,
             percentile_cont(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_ms
      FROM llm_calls
      WHERE created_at > now() - interval '7 days'
      GROUP BY 1, 2
      HAVING count(*) > 10
      ORDER BY day, cost_usd DESC;
      ~~~

      ## Rules
      - Every selected column is either in §GROUP BY§ or inside an aggregate.
      - §WHERE§ runs before grouping (filter rows); §HAVING§ after (filter groups).
      - §count(*)§ counts rows; §count(col)§ skips NULLs; §count(DISTINCT user_id)§ counts unique users.
      - §FILTER§ does conditional aggregates neatly: §count(*) FILTER (WHERE feedback = -1)§.

      ## In your app
      Dashboards, cost reports, eval scores by prompt version, "notes per tag" — all GROUP BY queries. Postgres is fast at these; do the maths in SQL rather than loading every row into Python.
    `,
  }),

  entry('sql-ctes-windows', 'concept', DATA, 'curious', 'CTEs, Subqueries and Window Functions', {
    summary: 'Break big queries into named steps with WITH, nest queries inside queries, and compute per-row values across related rows (rank, running totals, previous row) with window functions.',
    aliases: ['CTE', 'CTEs', 'common table expression', 'subquery', 'subqueries', 'window function', 'window functions', 'ROW_NUMBER', 'PARTITION BY'],
    tags: ['basics', 'sql'],
    body: doc`
      ## CTEs: queries in readable steps
      ~~~sql
      WITH recent AS (
        SELECT * FROM llm_calls WHERE created_at > now() - interval '1 day'
      ), per_user AS (
        SELECT user_id, sum(cost_usd) AS cost FROM recent GROUP BY user_id
      )
      SELECT * FROM per_user WHERE cost > 1 ORDER BY cost DESC;
      ~~~

      ## Window functions: aggregates without collapsing rows
      ~~~sql
      -- the top 3 chunks per document by similarity to a query
      SELECT * FROM (
        SELECT c.*, row_number() OVER (PARTITION BY document_id ORDER BY embedding <=> :q) AS rn
        FROM chunks c
      ) ranked
      WHERE rn <= 3;

      -- running total of spend
      SELECT day, cost, sum(cost) OVER (ORDER BY day) AS running_cost FROM daily_cost;
      ~~~
      §OVER (PARTITION BY … ORDER BY …)§ defines each row's "window"; §row_number§, §rank§, §lag§ / §lead§ (previous / next row), running §sum§ and §avg§ work within it.

      ## Where they shine in apps
      Top-N per group (latest message per conversation), deduplication (keep row_number = 1), gaps and streaks, and hybrid search — ranking vector and keyword results separately, then fusing them.
    `,
  }),

  entry('sql-modify', 'concept', DATA, 'curious', 'INSERT, UPDATE and DELETE', {
    summary: 'The statements that change data. In an app they run constantly, from many users at once — so they need parameters, WHERE clauses you’ve double-checked, and transactions.',
    aliases: ['INSERT statement', 'UPDATE statement', 'DELETE statement', 'DML', 'writing data'],
    tags: ['basics', 'sql'],
    body: doc`
      ~~~sql
      INSERT INTO notes (owner_id, title, body) VALUES (42, 'RAG', '…') RETURNING id;

      UPDATE notes SET title = 'RAG basics', updated_at = now()
      WHERE id = 17 AND owner_id = 42;          -- always scope by owner in a multi-user app

      DELETE FROM sessions WHERE expires_at < now();
      ~~~

      ## The one mistake everyone makes once
      §UPDATE notes SET title = 'x';§ — no §WHERE§, every row changed. Habits: write the §WHERE§ first; run the same §WHERE§ as a §SELECT count(*)§ before; do manual fixes inside §BEGIN; … ROLLBACK;§ until the numbers look right.

      ## In an app
      - Values always as **parameters**, never pasted into the SQL text.
      - Several related writes in **one transaction**.
      - Use **RETURNING** to get generated ids and new values without a second query.
      - **Upserts** (§ON CONFLICT§) instead of "check, then insert" races.
      - Soft deletes (§deleted_at timestamptz§) when users may want things back.
    `,
  }),

  entry('data-modeling', 'concept', DATA, 'curious', 'Data Modeling and ER Diagrams', {
    summary: 'Before writing tables, name the things your app is about (entities), what you store about each, and how they relate — one-to-many, many-to-many. The schema follows.',
    aliases: ['data modeling', 'data modelling', 'entity-relationship', 'ER diagram', 'one-to-many', 'schema design', 'entities'],
    tags: ['basics', 'schema design'],
    body: doc`
      ## For a "chat with your study notes" app
      ~~~text
      users ─┬─< documents ─< chunks            (a user has many documents; a document many chunks)
             ├─< conversations ─< messages
             └─< notes >─< tags                 (many-to-many, through note_tags)
      messages >─ llm_calls                     (each assistant message came from one model call)
      ~~~
      ─< means one-to-many; >─< many-to-many.

      ## Questions that shape the schema
      - What are the nouns? (users, documents, chunks, conversations, messages)
      - For each relationship: one or many on each side?
      - What do pages and features need to *ask*? ("latest 20 conversations for this user", "chunks of documents this user can see nearest to this vector")
      - What must never be wrong? (ownership, uniqueness) → constraints.
      - What will change shape often? → maybe a JSONB column.

      ## From model to tables
      One table per entity; a foreign key column on the "many" side; a join table for many-to-many; ids that never change; timestamps on everything (§created_at§, §updated_at§). Then add indexes for the questions above.

      Sketch it on paper or a whiteboard first — ten minutes here saves painful migrations later.
    `,
  }),
];
