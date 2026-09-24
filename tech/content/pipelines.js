// Web Data & Pipelines: collecting facts from the open web, matching them to the right entity,
// and running it all as a pipeline of workers.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { PIPE } = AREA;

export const PIPELINE_ENTRIES = [
  entry('data-pipelines', 'concept', PIPE, 'curious', 'Data Pipelines', {
    summary: 'A sequence of steps that turns raw input into something useful — fetch, clean, extract, match, score, store — with every item recording how far it got and why it stopped.',
    aliases: ['data pipeline', 'data pipelines', 'pipeline stage', 'pipeline stages', 'ETL', 'enrichment pipeline', 'enrichment'],
    tags: ['foundations', 'architecture'],
    body: doc`
      ## The shape
      ~~~text
      input row ─► find source ─► fetch ─► parse ─► extract ─► verify ─► score ─► store
                       │            │                    │          │
                    no source    blocked            wrong match   flagged
      ~~~
      Each stage takes the output of the one before. Each item ends in a named **outcome** — "analyzed", "no website", "blocked", "wrong site", "failed" — never just "error". Outcomes you can count are outcomes you can improve.

      ## Properties of a good pipeline
      - **Idempotent stages**: running an item twice gives the same result, so retries are safe.
      - **Checkpointed**: keep what earlier stages found. If the model call fails after the website was found, the retry skips the (paid) search.
      - **Observable**: per-stage counts, costs and timings; a log per item.
      - **Stoppable**: a stop flag or stop rule halts it cleanly, leaving unprocessed items queued.
      - **Evidence-carrying**: every derived fact remembers where it came from.
      - **Re-runnable from stored data**: when a rule changes, re-apply it to what's already stored instead of re-fetching.

      ## Batch vs streaming
      A state's 10,000 companies is a **batch**: fill a queue, run workers until empty. A single company from a web page is the same pipeline called once. Keeping one pipeline function for both is what keeps them consistent.

      ## ETL, loosely
      Extract, transform, load — the older name for the same idea in data warehousing. With LLMs in the middle, the "transform" step can read unstructured web pages, which is new.
    `,
  }),

  entry('web-crawling', 'concept', PIPE, 'curious', 'Web Crawling', {
    summary: 'Fetching pages from a site and following its links, within limits: which pages first, how many, how long, how fast — and what to do when a site won’t cooperate.',
    aliases: ['web crawling', 'web crawler', 'crawler', 'crawl', 'web scraping', 'scraping', 'scraper'],
    tags: ['web data'],
    body: doc`
      ## A focused crawl
      To profile a company you don't need its whole site — you need the pages that say what it does:
      ~~~python
      PRIORITY = ("about", "product", "capabilit", "service", "infrastructure", "contact")

      async def crawl(client: httpx.AsyncClient, home: str, max_pages: int = 10) -> list[Page]:
          pages, queue, seen = [], [home], {home}
          while queue and len(pages) < max_pages:
              url = queue.pop(0)
              r = await client.get(url, timeout=15, follow_redirects=True)
              if r.status_code != 200 or "text/html" not in r.headers.get("content-type", ""):
                  continue
              page = parse(url, r.text)                        # BeautifulSoup / lxml
              pages.append(page)
              for link in sorted(page.same_site_links, key=lambda u: not any(p in u.lower() for p in PRIORITY)):
                  if link not in seen:
                      seen.add(link); queue.append(link)
          return pages
      ~~~

      ## Limits that keep it sane
      - **Pages per site** (10) and a **total time cap** per site (say five minutes) — some sites have 20,000 product pages or hang forever.
      - **Per-request timeouts**, and a limit on concurrent requests per host.
      - **Same-site only**; normalise URLs (strip fragments and tracking parameters) so the same page isn't fetched twice.
      - A clear **User-Agent** and respect for robots.txt.

      ## When plain HTTP isn't enough
      - The HTML is an empty shell filled by JavaScript → render it with a headless browser.
      - A firewall or bot challenge answers instead of the site → back off; try from a different network only where that's permitted.
      - The "site" is a directory listing, a marketplace or a parked domain → it isn't the company's own site at all; that's a matching problem.

      Fetching is the easy part. Deciding whether you fetched the *right* site is the hard part.
    `,
  }),

  entry('html-parsing', 'concept', PIPE, 'curious', 'Parsing HTML: BeautifulSoup and lxml', {
    summary: 'Turn raw HTML into structure you can query — titles, text, links, addresses — while throwing away navigation, scripts and boilerplate.',
    aliases: ['HTML parsing', 'BeautifulSoup', 'Beautiful Soup', 'lxml', 'CSS selectors', 'boilerplate removal'],
    tags: ['web data', 'python'],
    body: doc`
      ~~~python
      from bs4 import BeautifulSoup
      from urllib.parse import urljoin

      def parse(url: str, html: str) -> dict:
          soup = BeautifulSoup(html, "lxml")                 # lxml: a fast parser underneath
          for tag in soup(["script", "style", "noscript", "svg"]):
              tag.decompose()                                # not content
          title = soup.title.get_text(strip=True) if soup.title else ""
          main = soup.find("main") or soup.body or soup
          text = " ".join(main.get_text(" ", strip=True).split())
          links = {urljoin(url, a["href"]) for a in soup.select("a[href]")}
          emails = {a["href"][7:] for a in soup.select('a[href^="mailto:"]')}
          return {"url": url, "title": title, "text": text, "links": links, "emails": emails}
      ~~~

      ## What you're really doing
      - **Finding content** among menus, footers and cookie banners. Headers and footers repeat on every page; keep them once (the footer often holds the address) and drop them elsewhere.
      - **Resolving links** relative to the page (§urljoin§).
      - **Pulling structured bits**: §mailto:§ and §tel:§ links, JSON-LD (§<script type="application/ld+json">§ often carries the organisation's name and address), meta descriptions.
      - **Limiting size** before it reaches a model: a few thousand characters per page, the most informative pages first.

      ## Robustness
      Real-world HTML is broken; BeautifulSoup tolerates it. Encodings lie; httpx and BeautifulSoup guess well, but check for mojibake in Indian-language pages. Never use regular expressions to parse HTML structure — use selectors — though regexes are fine for spotting patterns like pincodes in the extracted text.
    `,
  }),

  entry('headless-browsers', 'concept', PIPE, 'curious', 'Headless Browsers and Playwright', {
    summary: 'A real browser without a window, driven from code. Needed when a site’s content only appears after JavaScript runs — and far slower and heavier than a plain HTTP request.',
    aliases: ['headless browser', 'headless browsers', 'Playwright', 'headless Chromium', 'Chromium', 'Puppeteer', 'Selenium', 'browser automation'],
    tags: ['web data'],
    year: 2020,
    body: doc`
      ## Why
      Many modern sites send an almost empty HTML page and build the content with JavaScript (exactly what a React app does). A plain HTTP client sees §<div id="root"></div>§. A headless browser runs the JavaScript and gives you the finished DOM.

      ~~~python
      from playwright.async_api import async_playwright

      async def render(urls: list[str], tabs: int = 4) -> dict[str, str]:
          async with async_playwright() as p:
              browser = await p.chromium.launch()
              sem = asyncio.Semaphore(tabs)                   # at most 4 tabs at a time
              async def one(url):
                  async with sem:
                      page = await browser.new_page()
                      try:
                          await page.goto(url, timeout=20_000, wait_until="networkidle")
                          return url, await page.content()
                      finally:
                          await page.close()
              results = await asyncio.gather(*(one(u) for u in urls), return_exceptions=True)
              await browser.close()
          return dict(r for r in results if not isinstance(r, Exception))
      ~~~

      ## The costs
      - **Memory and CPU**: each tab is a renderer process — hundreds of MB. Cap concurrent tabs per worker.
      - **Time**: seconds per page instead of milliseconds.
      - **Packaging**: the browser and its system libraries must be in the container. Microsoft's Playwright Python Docker image ships them, which makes it a convenient base image.

      ## Strategy
      Try plain HTTP first; fall back to the browser only when the page text is empty, the site is JavaScript-only, or a challenge page came back. The fallback path is where the time and money go, so measure how often it's used.

      Playwright (Microsoft, 2020) supersedes Puppeteer and Selenium for most automation; it's also used for end-to-end testing of your own React app.
    `,
  }),

  entry('blocked-cloud-ips', 'concept', PIPE, 'curious', 'Firewalls, Bot Challenges and Blocked Cloud IPs', {
    summary: 'Many sites and data providers block or challenge traffic from cloud data centres. Some pages will only load from an ordinary connection — which is why some pipelines keep a few jobs on a local machine.',
    aliases: ['bot protection', 'bot challenge', 'web application firewall', 'WAF', 'IP blocking', 'CAPTCHA', 'Cloudflare challenge'],
    tags: ['web data', 'networking'],
    body: doc`
      ## What happens
      A request from a Google Cloud or AWS IP address arrives at a site behind a web application firewall (WAF) or bot-protection service. It may get:
      - a **403** or connection reset;
      - a **challenge page** ("checking your browser…", a CAPTCHA) instead of content;
      - **rate limiting** after a few requests;
      - silently different content.
      Cloud IP ranges are published and heavily used by bots, so many services treat them with suspicion. Some registries and directories block them outright.

      ## Handling it honestly
      - **Detect** it: challenge pages have tell-tale titles and tiny text. Record the outcome as "blocked by firewall", not "no content".
      - **Keep the evidence you already have** and retry later or from elsewhere, rather than re-searching.
      - **Run permitted jobs from a different network**: registry look-ups or free local-model runs can run from a local machine, connected to the cloud database through an authenticated proxy.
      - **Don't try to defeat CAPTCHAs** or disguise automation to get around a site's explicit protection — that's where scraping stops being acceptable. Slow down, identify yourself, use the provider's API or buy the data.

      ## Rate and politeness
      A handful of requests per site, spaced out, with reasonable timeouts, rarely trips anything. Hammering one site from many parallel workers is both rude and self-defeating.
    `,
  }),

  entry('search-apis', 'concept', PIPE, 'curious', 'Web Search APIs', {
    summary: 'Paid APIs (like Serper) return search-engine results as JSON: titles, links and snippets. How a pipeline finds a company’s website — at a price per query, with credits that run out.',
    aliases: ['search API', 'search APIs', 'Serper', 'SERP', 'search results', 'Brave Search API'],
    tags: ['web data', 'api'],
    body: doc`
      ~~~python
      r = await client.post("https://google.serper.dev/search",
                            headers={"X-API-KEY": os.environ["SERPER_API_KEY"]},
                            json={"q": f'"{name}" {city} {state} manufacturer', "gl": "in", "num": 10})
      results = r.json()["organic"]        # [{title, link, snippet, position}, ...]
      ~~~

      ## Using results well
      - **Filter hosts** before anything else: directories, marketplaces, social networks and domain-parking pages are never the company's own site.
      - **Check relevance**: a result whose title and snippet never mention the company isn't a candidate.
      - **Keep the snippets** as evidence. Registry sites, news and LinkedIn snippets say a lot about a company even when it has no website — show them to users and feed them to the model.
      - **Spend in order of cost**: try free guesses first (the company name as a domain, the email domain from the registry), search only when they fail.

      ## Credits and stop rules
      Search APIs are prepaid or metered, typically a fraction of a rupee to a few rupees per query. When credits run out, the API starts refusing — a pipeline should notice that specific answer and **stop**, leaving the rest of the queue intact, rather than marking thousands of companies as "no website".

      ## Free fallbacks
      Driving a normal search engine page with a headless browser works for small local runs, but it's slow, brittle and often against the engine's terms. Prefer an API for anything regular.
    `,
  }),

  entry('messy-input-files', 'concept', PIPE, 'curious', 'Messy Input Files: Cleaning and Column Mapping', {
    summary: 'Real spreadsheets arrive with banner rows, renamed headers, mixed date formats, numbers stored as text and addresses in one cell. Recognising columns by meaning and cleaning at the door saves every later step.',
    aliases: ['data cleaning', 'data cleansing', 'column mapping', 'header synonyms', 'data validation on import', 'triage'],
    tags: ['web data', 'data'],
    body: doc`
      ## What goes wrong
      - Headers vary: "Company Name", "Enterprise Name", "Account name", "Employer".
      - Banner rows above the header; totals rows below.
      - Dates as §15-09-2026§, §2026-09-15§, §15/9/26§ or an Excel serial number (§45916§).
      - Money as §"1,30,000"§ (Indian grouping), §1.3 lakh§ or §₹130000.00§.
      - Addresses in one cell, with city and pincode somewhere inside.
      - Encodings: CSVs saved by Excel in a legacy code page, so names turn to mojibake.

      ## Recognise columns by meaning
      ~~~python
      SYNONYMS = {
          "name":    ["full name", "name", "lead name"],
          "title":   ["title", "job title", "position", "designation", "headline"],
          "company": ["company", "company name", "account name", "current company", "employer"],
      }
      def map_columns(headers: list[str]) -> dict[str, str]:
          norm = {h: h.strip().lower() for h in headers}
          return {field: h for field, names in SYNONYMS.items() for h, n in norm.items() if n in names}
      ~~~
      Anything containing "email" is an email column; anything containing "phone", "mobile" or "cell" a phone column. Show the user the mapping before processing (a preview), and report what couldn't be mapped.

      ## Clean at the door
      Parse and normalise once, on import: dates to ISO, money to a plain number in rupees, pincodes to six digits, names trimmed and case-normalised for matching (keep the original too). Reject or quarantine rows that fail, with a reason — an "unmatched" or "rejected" list the user can download and fix.

      ## Triage
      Before spending money on each row, **triage**: assign a priority from cheap signals (industry code, name keywords, capital) so the expensive steps go to the most promising rows first — priority buckets like P1/P2/P3, plus a skip bucket.
    `,
  }),

  entry('entity-resolution', 'concept', PIPE, 'curious', 'Entity Resolution and Record Linkage', {
    summary: 'Deciding whether two records describe the same real-world thing — the same company across a registry list, a website, a CRM and a LinkedIn page — when names, spellings and addresses differ.',
    aliases: ['entity resolution', 'record linkage', 'entity matching', 'deduplication of records', 'master data', 'golden record'],
    tags: ['web data', 'data'],
    body: doc`
      ## Why it's hard
      "Tirumala Forgings Pvt Ltd" (Andhra Pradesh) and "Tirumala Forgings" (Haryana) can be different companies. "ABC Engg. Works" and "A.B.C. Engineering Works Private Limited" are the same one. Group companies share one website. A foreign brand's Indian subsidiary has a site that never names the subsidiary.

      ## The toolkit
      1. **Strong identifiers first**: a registry number (CIN), a GSTIN, an email domain, a LinkedIn company URL. When present, they settle it.
      2. **Normalise** names: lower-case, strip legal suffixes (Pvt, Ltd, Private Limited, LLP), expand or drop abbreviations, collapse punctuation.
      3. **Blocking**: only compare records that share something cheap (same state, same first name-word, same pincode) — comparing every pair of 100,000 companies is 5 billion comparisons.
      4. **Score similarity**: fuzzy name similarity, address overlap, same city or pincode, shared website or phone.
      5. **Decide**: above a high threshold, match; below a low one, no match; in between, **flag for a human**.
      6. **Record why**: store the rule and evidence that made the match, and the confidence.

      ## As a graph
      Matches form a graph: companies linked by shared websites, shared directors, same group names. Connected clusters are candidate "same group" entities — the bridge from entity resolution to knowledge graphs.

      ## The cost of errors
      A false match puts one company's website, products and score on another — a sales rep calls the wrong firm. A missed match creates duplicates. Decide which error is worse for the use case and set thresholds accordingly; keep humans in the loop for the grey zone.
    `,
  }),

  entry('fuzzy-matching', 'equation', PIPE, 'curious', 'Fuzzy Matching and Distinctive Words', {
    summary: 'Compare names that are almost the same with edit distance or token overlap — and weight rare words more than common ones, so “Tirumala” counts and “Industries” doesn’t.',
    aliases: ['fuzzy matching', 'fuzzy match', 'string similarity', 'edit distance', 'Levenshtein distance', 'Jaccard similarity', 'RapidFuzz', 'name normalisation', 'name normalization', 'IDF', 'TF-IDF'],
    tags: ['web data', 'algorithms'],
    latex: doc`\text{idf}(w) = \ln\frac{N}{n_w}, \qquad \text{Jaccard}(A,B) = \frac{|A \cap B|}{|A \cup B|}`,
    variables: [
      ['N', 'Number of names in the whole list'],
      [doc`n_w`, 'Number of names containing the word w'],
      ['A, B', 'The sets of words in two names'],
    ],
    body: doc`
      ## Three families of similarity
      - **Edit distance** (Levenshtein): how many character edits turn one string into the other. Good for typos: "Engg" vs "Engg." vs "Eng".
      - **Token overlap** (Jaccard): shared words over all words. Good for reordering: "Precision Castings Coimbatore" vs "Coimbatore Precision Castings".
      - **Embeddings**: semantic similarity — useful for descriptions, risky for names ("Tirumala Forgings" and "Thirumala Forgings" may be different firms).
      The **RapidFuzz** library does the first two fast.

      ## Not all words are equal
      In a list of 100,000 Indian company names, "industries", "engineering", "private" and "limited" appear thousands of times; "Tirumala" or "Hydroflex" appear a handful. The **inverse document frequency** $\ln(N/n_w)$ scores rarity. An ownership rule can ask: does the website carry any of this company's *distinctive* name words? A site mentioning only "Industries" proves nothing.

      ## Special cases worth handling
      - **Initials**: "ABC Engineering" ↔ "Aravind Bhaskar Chandra Engineering".
      - **Run-together names**: "hydroflex" in a domain ↔ "Hydro Flex" in the registry.
      - **Brand-led domains**: a domain starting with a well-known brand the company name doesn't carry is suspicious (someone else's site).

      ## Thresholds come from data
      Label a few hundred pairs by hand; look at scores for true and false matches; pick thresholds where the error you care about is rare.
    `,
    calc: {
      inputs: [
        input('N', 'Names in the list', '', 100000, 100, 10000000, LOG),
        input('nw', 'Names containing the word', '', 3, 1, 1000000, LOG),
        input('shared', 'Words the two names share', '', 2, 0, 20, INT),
        input('total', 'Distinct words across both names', '', 4, 1, 40, INT),
      ],
      outputs: [
        out('Rarity of the word (idf)', '', 'ln(N/nw)', { digits: 3 }),
        out('Share of names with this word', '%', 'nw/N*100', { digits: 3 }),
        out('Jaccard similarity of the names', '', 'shared/total', { digits: 3 }),
      ],
      note: 'A word in 3 of 100,000 names scores about 10.4; “industries” in 20,000 of them scores about 1.6.',
    },
  }),

  entry('provenance-evidence', 'concept', PIPE, 'curious', 'Evidence and Provenance', {
    summary: 'Store every extracted fact with the URL and snippet it came from. Then any claim can be checked, any rule re-run, and any model answer cited — the difference between data and rumours.',
    aliases: ['provenance', 'data provenance', 'evidence trail', 'data lineage', 'evidence-first', 'source citation'],
    tags: ['web data', 'data', 'quality'],
    body: doc`
      ## The pattern
      ~~~sql
      CREATE TABLE evidence (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        company_id bigint NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        source_type text NOT NULL,          -- website, search_snippet, registry, upload
        source_url text,
        claim text NOT NULL,                -- "makes precision investment castings"
        snippet text,                       -- the exact words that support it
        confidence real,
        retrieved_on timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE products (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        company_id bigint NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name text NOT NULL,
        evidence_id bigint REFERENCES evidence(id)     -- every item points at its proof
      );
      ~~~

      ## What it buys you
      - **Trust**: a salesperson can click through to the sentence on the company's own site.
      - **Hallucination control**: require the model to quote; check the quote actually appears in the page text; drop claims whose quote doesn't match.
      - **Re-processing**: when a matching rule improves, re-apply it to stored evidence without re-crawling.
      - **Free citations** for RAG: every retrieved chunk already knows its URL.
      - **Debugging**: "why is this company tier A?" → the signals that fired and the evidence behind each.

      ## Keep the raw material
      Store raw page text (or the files themselves, hashed, in object storage). Extraction strategies change; raw inputs let you re-extract. Record *when* it was retrieved — websites change.
    `,
  }),

  entry('heuristics-flags', 'concept', PIPE, 'curious', 'Heuristic Rules, Flags and Human Review', {
    summary: 'Hand-written rules catch known classes of mistakes; each either rejects, accepts or flags for a person. Flags never delete anything — they route the uncertain cases to human judgement.',
    aliases: ['heuristic rules', 'heuristics', 'verification flag', 'human in the loop', 'human-in-the-loop', 'human review', 'findings log'],
    tags: ['web data', 'quality'],
    body: doc`
      ## Rules born from real mistakes
      A website-matching pipeline might use rules like these, each added after a class of real errors and recorded in a findings log:
      | Rule | Catches |
      |---|---|
      | Excluded hosts | directories, marketplaces, social sites, parked domains |
      | Guess and verify | a guessed domain that never mentions the company |
      | Publisher check | the model says the site belongs to someone else |
      | Location rule | a long site that never mentions the country, state or city |
      | Ownership rule | none of the company's distinctive name words appear |
      | State-by-pincode | every pincode on the site is in another state |
      | Group site | the site already serves another company and this match is weak |

      ## Reject, accept or flag
      Strong evidence of a wrong match → reject and search again. Weak or conflicting evidence → **flag** ("Verify website match") and keep the profile. A person reviews flagged items with the evidence in front of them and confirms or corrects. Aim for a flag rate small enough for people to clear, but not so small that real errors slip through.

      ## Keeping rules healthy
      - Log which rule fired, with the evidence.
      - Measure each rule's hit rate and, from human reviews, its false-positive rate.
      - Apply rules in a fixed order; later rules shouldn't silently undo earlier ones.
      - When you add a rule, back-test it on stored data before switching it on.

      ## Rules vs models
      Models handle fuzzy judgement ("is this a manufacturer?"); rules encode crisp, explainable constraints ("a Telangana company's site with only Haryana pincodes is suspicious"). Each checks the other. That's the same pattern as LLM guardrails: model output, then deterministic checks, then a human for what's left.
    `,
  }),

  entry('rule-based-scoring', 'equation', PIPE, 'curious', 'Rule-Based Scoring and Tiers', {
    summary: 'Add up weighted signals into a score out of a maximum, then cut the score into tiers (A, B, C). Transparent, explainable and tunable — the classic way to rank leads.',
    aliases: ['lead scoring', 'scoring rules', 'weighted score', 'tiering', 'score breakdown', 'fit score'],
    tags: ['web data', 'ranking'],
    latex: doc`S = \sum_i w_i\,s_i, \qquad \text{tier} = \begin{cases} A & S \ge 60 \\ B & 35 \le S < 60 \\ C & \text{otherwise} \end{cases}`,
    variables: [
      [doc`s_i`, 'Signal i: 1 if it fired (or a strength between 0 and 1)'],
      [doc`w_i`, 'Its weight: points it contributes'],
      ['S', 'Total score, capped at a maximum'],
    ],
    body: doc`
      ## Signals and weights
      For a CAD/ERP prospect: makes mechanical products (+), designs in-house (+), CAD engineers named (+), makes tooling and moulds (+), existing CAD or ERP software detected (+), discrete manufacturing (+), several plants or exports (+). Each signal that fires adds its weight and **records the evidence** that fired it; the breakdown is shown on the company page.

      ## Why rules instead of a trained model?
      - No labelled outcomes yet (which prospects actually bought?) to train on.
      - Sales teams need to see *why* a company is tier A.
      - Weights are easy to argue about and change in a meeting.
      Once outcomes exist (won/lost deals from the CRM), you can fit weights from data — logistic regression is the natural next step, and still explainable.

      ## Tier thresholds are policy
      "Tier A ≥ 60" is a business decision, not a truth. Watch the distribution (how many A, B, C), check samples from each tier by hand, and revisit when the team's capacity changes. Questions like "should a company that fits only one product family reach tier B?" are policy calls, not maths.

      ## Pitfalls
      Double counting (two signals that always fire together), signals that only appear on big companies' sites (bias towards the well-documented), and scores compared across different maxima.
    `,
    calc: {
      inputs: [
        input('products', 'Makes mechanical products (0–1)', '', 1, 0, 1),
        input('design', 'Designs in-house (0–1)', '', 1, 0, 1),
        input('cadnamed', 'CAD engineers named (0–1)', '', 0, 0, 1),
        input('tooling', 'Tooling and moulds (0–1)', '', 1, 0, 1),
        input('software', 'Existing CAD/ERP detected (0–1)', '', 0, 0, 1),
        input('scale', 'Multi-plant or exports (0–1)', '', 0.5, 0, 1),
      ],
      outputs: [
        out('Score (example weights 20/20/15/15/15/15)', '', 'min(100, 20*products + 20*design + 15*cadnamed + 15*tooling + 15*software + 15*scale)', { key: 'S', digits: 3 }),
        out('Tier (3 = A, 2 = B, 1 = C)', '', 'if(S - 59.999, 3, if(S - 34.999, 2, 1))', { digits: 1 }),
      ],
      note: 'Weights here are illustrative. Flip one signal and see a company cross a tier boundary — which is why borderline cases deserve a human look.',
    },
  }),

  entry('worker-pools', 'concept', PIPE, 'curious', 'Worker Pools: Claims, Heartbeats and Stop Flags', {
    summary: 'Several workers pull items from one database queue: claim with SKIP LOCKED so nothing is done twice, report a heartbeat, obey a shared stop flag, and re-queue work a dead worker abandoned.',
    aliases: ['worker pool', 'worker pools', 'heartbeat', 'stop flag', 'claiming work', 'stale claims', 'FOR UPDATE SKIP LOCKED'],
    tags: ['architecture', 'reliability', 'concurrency'],
    body: doc`
      ## Claim one item, atomically
      ~~~sql
      UPDATE companies SET pipeline_status = 'processing', worker_id = :me, claimed_at = now()
      WHERE id = (
        SELECT id FROM companies
        WHERE pipeline_status = 'pending' AND registration_state = :state
        ORDER BY random()                      -- a partial run is a fair sample
        FOR UPDATE SKIP LOCKED                 -- skip rows another worker is claiming right now
        LIMIT 1
      )
      RETURNING id;
      ~~~
      Many workers can run this at once; each gets a different row, with no central coordinator.

      ## The rest of the protocol
      - **Heartbeat**: every 20 seconds, each worker writes "alive, N done, N failed, ₹ spent, last item" to a runs table. The UI shows progress from these rows.
      - **Stop flag**: a row in a settings table. Workers read it on each heartbeat and stop after finishing in-flight items. "Stop all" = set the flag.
      - **Self-stopping**: after repeated "no credits" or quota (429) answers, a worker sets the stop flag itself, so all workers stop together instead of burning through the queue with failures.
      - **Stale claims**: a row claimed hours ago and never finished belonged to a killed worker; put it back to pending.
      - **Exit when empty** or when a per-worker limit is reached.

      ## Parallelism inside a worker
      Each worker processes several items concurrently (async I/O: crawling, model calls). Total in flight = workers × per-worker parallelism. Every in-flight item may hold a database connection, so pool sizes must add up to less than the database's connection limit.

      ## Why the database as the queue
      One system to run, transactional claims, and the queue *is* the data (status column). A dedicated broker (Redis, Pub/Sub, Celery) earns its place at much higher rates or with complex routing.
    `,
  }),

  entry('stop-rules', 'concept', PIPE, 'curious', 'Stop Rules and Circuit Breakers', {
    summary: 'When a dependency starts failing — credits exhausted, quota hit, service down — stop calling it instead of failing every remaining item. Fail cheaply, stop early, resume cleanly.',
    aliases: ['stop rule', 'stop rules', 'circuit breaker', 'quota error', 'credits exhausted', 'fail fast', 'backpressure'],
    tags: ['reliability'],
    body: doc`
      ## The failure it prevents
      A bulk run of 10,000 companies; the search API's credits run out at company 2,000. Without a stop rule, the next 8,000 are all marked "no website" — wrong data, and every one must be found and re-queued by hand.

      ## Distinguish kinds of failure
      | Answer | Meaning | Response |
      |---|---|---|
      | 429 / RESOURCE_EXHAUSTED (model quota) | you're out of budget or rate | stop the run, keep items queued |
      | "no credits" from a search API | prepaid balance used up | stop the run |
      | timeout on one website | that site is slow | fail the item, retry later with more time |
      | 5xx from the provider | transient | retry with backoff, then circuit-break |
      | 400 bad request | your bug | fail loudly, fix the code |

      ## Circuit breaker
      Count recent failures of a dependency; after N in a row, "open the circuit": stop calling it for a while, fail fast, try again later ("half-open") with one request. Protects both you (no wasted time or money) and the dependency (no pile-on while it's down).

      ## Fail cheaply, retry cheaply
      Order steps so expensive work happens after cheap checks, and **keep partial results**: a company that failed at the model step keeps its found website, so the retry costs only the model call. A slower second pass over timeouts often recovers most of them at no search cost.

      ## Budget stops
      A per-run cost cap is a stop rule too: stop at ₹X spent, whatever the queue says.
    `,
  }),

  entry('snapshots-diffs', 'concept', PIPE, 'curious', 'Snapshots and Diffs', {
    summary: 'Keep each version of an imported dataset instead of overwriting it, then compare any two: what’s new, what’s gone, what changed. How “renewals due” and “lapsed since last quarter” get answered.',
    aliases: ['data snapshot', 'data snapshots', 'dataset diff', 'change detection', 'slowly changing dimension', 'time travel'],
    tags: ['data', 'history'],
    body: doc`
      ## The pattern
      1. Upload a file with its **as-of date**. Store the file itself (object storage) with its **SHA-256** — an identical file uploaded twice is rejected.
      2. Load it into a **snapshot table** keyed by extract: §extract_customers(extract_id, customer_id, …)§.
      3. **Compare** any two snapshots with SQL: new keys, dropped keys, changed fields.
      4. **Apply** a chosen snapshot to the live tables — a separate, deliberate step, after reviewing the diff.

      ~~~sql
      -- customers present in the old extract but not the new one
      SELECT o.customer_id FROM extract_customers o
      LEFT JOIN extract_customers n ON n.customer_id = o.customer_id AND n.extract_id = :new
      WHERE o.extract_id = :old AND n.customer_id IS NULL;
      ~~~

      ## Why not just overwrite?
      Overwriting loses history: you can't say who lapsed this quarter, whose seats grew, or what the renewal calendar looked like in June. Snapshots make the data a time series. Keeping the original files means you can re-load with a fixed parser.

      ## Absent ≠ deleted
      A record missing from the new extract might have lapsed, been renamed, or been dropped by a filter upstream. Keeping absent records and marking them (say, lapsed) rather than deleting them is a policy worth making explicit.

      ## Related ideas
      Data warehouses call tracked history "slowly changing dimensions"; some databases offer "time travel" queries. For a side project, a snapshot table and a diff query go a long way.
    `,
  }),

  entry('spreadsheets-in-out', 'concept', PIPE, 'curious', 'Spreadsheets In and Out: Excel and CSV', {
    summary: 'Business data arrives as Excel and leaves as CSV. Read .xlsx with openpyxl or pandas, by header name (or position when the layout is fixed); write CSV as UTF-8 with a BOM so Excel shows Indian names correctly.',
    aliases: ['Excel', 'xlsx', 'openpyxl', 'read_excel', 'CSV export', 'CSV exports', 'UTF-8 BOM'],
    tags: ['data', 'python'],
    body: doc`
      ## Reading
      ~~~python
      import pandas as pd
      df = pd.read_excel("mca_karnataka.xlsx", sheet_name=None, dtype=str)   # every sheet, everything as text
      for sheet, rows in df.items():
          rows.columns = [c.strip() for c in rows.columns]
      # a report with two banner rows above the header:
      report = pd.read_excel("vendor_report.xlsx", header=2, dtype=str)
      ~~~
      - Read everything as **text** first (§dtype=str§) and convert deliberately — otherwise CINs lose leading zeros, pincodes become floats (§560001.0§) and long numbers turn into scientific notation.
      - **.xlsx only**; the old .xls format needs another library and is best refused with a clear message.
      - Large files: §openpyxl.load_workbook(path, read_only=True)§ streams rows without loading everything.

      ## Writing CSV from an API
      ~~~python
      from fastapi.responses import StreamingResponse
      import csv, io

      def export_csv(rows):
          def generate():
              buf = io.StringIO()
              writer = csv.writer(buf)
              buf.write("﻿")                          # BOM: Excel then reads UTF-8 correctly
              writer.writerow(["Company", "City", "Tier"])
              for r in rows:
                  writer.writerow([r.name, r.city, r.tier])
                  yield buf.getvalue(); buf.seek(0); buf.truncate(0)
              yield buf.getvalue()
          return StreamingResponse(generate(), media_type="text/csv",
                                   headers={"Content-Disposition": 'attachment; filename="prospects.csv"'})
      ~~~
      Stream big exports row by row instead of building them in memory.

      ## Templates you don't control
      When a file must match someone else's upload template (LinkedIn's account-upload file, a CRM import), treat the template as a contract: exact column names and order, required fields filled, one test upload before the big one.

      ## Security note
      A cell starting with §=§, §+§, §-§ or §@§ can run as a formula when opened ("CSV injection"). Prefix such values with a quote when exporting user-supplied text.
    `,
  }),

  entry('india-addresses-geo', 'concept', PIPE, 'curious', 'Indian Addresses, Pincodes and Geocoding', {
    summary: 'Six-digit PIN codes map to regions and states; addresses are free text; geocoding turns them into map pins with a precision you should show. The raw material of “near Coimbatore” filters.',
    aliases: ['pincode', 'pincodes', 'PIN code', 'postal code', 'geocoding', 'address parsing', 'Google Maps', 'Places API', 'map pin'],
    tags: ['data', 'india'],
    body: doc`
      ## PIN codes
      Six digits. The **first digit** is a postal region (1–2 north, 3–4 west, 5–6 south, 7–8 east; 9 the army postal service), the first **two or three** narrow it to a circle and district. Most pincode ranges fall within one state, so a site listing only pincodes from another state is a strong hint you've found a different company — though border towns and Telangana/Andhra Pradesh (one state until 2014) need care.

      ## Parsing addresses
      Registry addresses are single strings: "Plot 12, Phase II, Peenya Industrial Area, Bengaluru, Karnataka 560058". Pull the pincode with a regex (§\b[1-9][0-9]{5}\b§), the city from a list of known towns, and keep the whole string. Where the "district" slot holds a street line, fall back to known-town matching.

      ## Geocoding
      Turning an address into latitude/longitude — Google's Geocoding and Places APIs, or open alternatives (Nominatim on OpenStreetMap, with strict usage limits). Always show **precision**: a pin from a full street address, from a pincode centroid, or only from the city are very different. Google's business listing for a company (Places) adds a verified-looking pin and a Maps link — but can be a different branch or a namesake. Paid APIs come with monthly free allowances; batch and cache geocodes rather than repeating them.

      ## Industrial estates
      Clusters like Peenya, Ambattur, Chakan or MIDC areas show up as repeated address fragments — a natural "neighbour of" relationship for grouping prospects and planning visits.
    `,
  }),

  entry('scraping-responsibly', 'concept', PIPE, 'curious', 'Scraping Responsibly: Terms, robots.txt and Personal Data', {
    summary: 'Public doesn’t mean free-for-all. Respect robots.txt and rate limits, follow platforms’ terms (no automating LinkedIn), minimise personal data, and know India’s DPDP rules are coming into force.',
    aliases: ['robots.txt', 'terms of service', 'DPDP Act', 'Digital Personal Data Protection Act', 'personal data', 'data minimisation', 'responsible scraping'],
    tags: ['web data', 'ethics', 'india'],
    year: 2023,
    body: doc`
      ## Technical courtesy
      - Read **robots.txt** (standardised as RFC 9309 in 2022) and honour disallowed paths.
      - Identify your crawler with a User-Agent and contact; keep request rates low per site.
      - Cache; don't re-fetch what hasn't changed.

      ## Platform terms
      Some platforms forbid automated access outright. **LinkedIn** is the prominent example — a careful tool never scrapes or drives it, and uses Sales Navigator only through its own manual upload and export files. That's both a legal and an account-safety decision: automated access gets accounts banned.

      ## Personal data
      Company facts are one thing; **people** (names, emails, phone numbers of directors or employees) are personal data.
      - Collect only what the purpose needs; record where each item came from.
      - Restrict who can see and export it (roles, view-only accounts, audit trails).
      - Honour removal requests; don't keep data indefinitely without a reason.
      India's **Digital Personal Data Protection Act, 2023** now has its rules (notified November 2025), with obligations phasing in over about 18 months — through May 2027 — covering notice and consent, purpose limitation, security safeguards and breach reporting. How it applies to B2B contact data depends on specifics; when a product stores people's details, get proper advice rather than guessing.

      ## A useful test
      Would the site owner, or the person whose details you hold, be surprised or upset by what you're doing? If yes, rethink it.
    `,
  }),
];
