// More of Building with LLMs: the Gemini API, extraction with evidence, knowledge graphs,
// GraphRAG and text-to-SQL.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { LLM } = AREA;

export const AI_EXTRA_ENTRIES = [
  entry('gemini-api', 'concept', LLM, 'curious', 'The Gemini API', {
    summary: 'Google’s LLM API, called from Python with the google-genai SDK: generate text or schema-checked JSON, embed text, and handle quota errors (429) and prepaid credit.',
    aliases: ['Gemini', 'Gemini API', 'google-genai', 'Google AI Studio', 'AI Studio', 'Vertex AI', 'Gemini Flash'],
    tags: ['llm', 'api'],
    body: doc`
      ## Structured output
      ~~~python
      from google import genai
      from google.genai import types
      from pydantic import BaseModel

      class Item(BaseModel):
          name: str
          evidence: str                      # the exact quote from the page

      class Profile(BaseModel):
          is_own_site: bool
          is_manufacturer: bool
          products: list[Item]
          processes: list[Item]

      client = genai.Client()                # reads GEMINI_API_KEY (or GOOGLE_API_KEY)
      resp = client.models.generate_content(
          model=os.environ["GEMINI_MODEL_FAST"],
          contents=prompt,
          config=types.GenerateContentConfig(
              response_mime_type="application/json",
              response_schema=Profile,
              temperature=0.1,
          ),
      )
      profile: Profile = resp.parsed          # validated Pydantic object
      print(resp.usage_metadata.prompt_token_count, resp.usage_metadata.candidates_token_count)
      ~~~
      Async code uses §client.aio.models.generate_content(...)§.

      ## Embeddings
      ~~~python
      r = client.models.embed_content(
          model="gemini-embedding-001",
          contents=chunks,
          config=types.EmbedContentConfig(output_dimensionality=768, task_type="RETRIEVAL_DOCUMENT"),
      )
      vectors = [e.values for e in r.embeddings]
      ~~~
      §gemini-embedding-001§ returns 3,072 numbers by default; it's trained (Matryoshka-style) so shorter prefixes still work, and 768 is a recommended size that saves storage. Normalise vectors you've shortened before cosine search. Use §RETRIEVAL_QUERY§ for the question side.

      ## Operating it
      - **Quotas and 429**: rate or credit exhausted returns 429 / RESOURCE_EXHAUSTED. Retry a transient one with backoff; on repeated ones, stop the run rather than failing every remaining item.
      - **Billing**: via Google AI Studio (API key) or Vertex AI on Google Cloud (service-account auth, enterprise controls). Prepaid credit can simply run out mid-run.
      - **Model names change**: keep them in configuration (§GEMINI_MODEL_FAST§, §GEMINI_MODEL_PRO§), log the model with every call, and re-run evals when you switch.
      - **Grounding with Google Search** exists as a paid extra; its cost per call makes it worth switching on only where it clearly helps.

      The concepts — system instructions, token usage, structured output, streaming, embeddings — are the same across providers; the SDK spelling differs.
    `,
  }),

  entry('llm-extraction', 'concept', LLM, 'curious', 'Extraction with Evidence: LLMs as Readers', {
    summary: 'Give a model the pages and a strict schema, and ask for every fact with a quote proving it. Then check the quotes exist, apply rules, and store facts with their evidence. How a pipeline turns websites into structured profiles.',
    aliases: ['information extraction', 'LLM extraction', 'evidence quotes', 'quote verification', 'web page to JSON'],
    tags: ['llm', 'web data'],
    body: doc`
      ## The prompt, in outline
      ~~~text
      You are reading pages from a company's website and search results about it.
      Company (from the registry): {legal_name}, {city}, {state}.

      Decide:
      - is this site published by that company (not a directory, a namesake or a parent brand)?
      - is it a manufacturer, and what does it make?
      For every product, process, design capability and technology, include the exact sentence
      from the pages that shows it. If the pages don't show something, leave it out.

      <search_results>…</search_results>
      <page url="…">…</page>  (up to N pages, trimmed)
      ~~~
      With structured output, the reply is a validated object: booleans, lists of items, each with its evidence.

      ## After the model
      1. **Verify quotes**: normalise whitespace and check each quote appears in the page text; drop or down-weight items whose quote doesn't. This is the cheapest, strongest hallucination filter there is.
      2. **Apply rules** the model can't be trusted with alone (location checks, ownership by distinctive words).
      3. **Score** from the verified items.
      4. **Store** items with evidence rows, and the whole profile as a JSON document.

      ## Budgeting context
      All pages for a large-context hosted model; for a local 14B model with an 8K context, maybe six pages of 2,500 characters. Put the most informative pages (about, products, capabilities) first; trim boilerplate.

      ## Evaluate it
      Hand-label 50–100 companies (own site? manufacturer? main products?) and measure accuracy per field, per model. A findings log of mistakes is the qualitative version of that; a labelled set turns it into numbers you can track when prompts or models change.
    `,
  }),

  entry('knowledge-graphs', 'concept', LLM, 'curious', 'Knowledge Graphs and Property Graphs', {
    summary: 'Entities as nodes, relationships as typed edges with properties — companies, people, products, places, linked by DIRECTOR_OF, SHARES_WEBSITE, OWNS_LICENCE. Stored in Postgres as two tables, or in a graph database like Neo4j.',
    aliases: ['knowledge graph', 'knowledge graphs', 'property graph', 'graph database', 'Neo4j', 'Cypher', 'Apache AGE', 'nodes and edges'],
    tags: ['data', 'graphs', 'rag'],
    body: doc`
      ## Two tables in Postgres
      ~~~sql
      CREATE TABLE nodes (id bigint PRIMARY KEY, kind text NOT NULL, name text, props jsonb DEFAULT '{}');
      CREATE TABLE edges (
        src bigint NOT NULL REFERENCES nodes(id), dst bigint NOT NULL REFERENCES nodes(id),
        kind text NOT NULL,                     -- DIRECTOR_OF, SHARES_WEBSITE, OWNS_LICENCE, LOCATED_IN…
        props jsonb DEFAULT '{}',               -- seats, support end, score, confidence
        evidence_id bigint,                     -- every edge points at what asserts it
        PRIMARY KEY (src, kind, dst)
      );

      -- companies within two hops of a prospect through shared directors
      WITH RECURSIVE hop(id, depth) AS (
        SELECT :company_id, 0
        UNION
        SELECT CASE WHEN e.src = h.id THEN e.dst ELSE e.src END, h.depth + 1
        FROM hop h JOIN edges e ON (e.src = h.id OR e.dst = h.id) AND e.kind = 'DIRECTOR_OF'
        WHERE h.depth < 4
      )
      SELECT DISTINCT n.* FROM hop JOIN nodes n ON n.id = hop.id WHERE n.kind = 'company';
      ~~~
      (Director → company edges: company → person → company is two edge hops per "company hop".)

      ## When you need a graph database
      Deep or variable-length traversals, path-finding, and graph algorithms over millions of edges read more naturally in a graph query language — **Cypher** in **Neo4j**, or in **Apache AGE** (a Postgres extension; not available on every managed Postgres, so check Cloud SQL's extension list). For two-to-three-hop questions over a few hundred thousand edges, recursive CTEs in the database you already run are enough.

      ## Where the edges come from
      Mostly from data you already have, made explicit: shared websites, directors in common, customer ↔ prospect links, licence ↔ product, company ↔ pincode. Entity-resolution rules become edge-proposal rules with a confidence. Keep an evidence pointer on every edge, as with every fact.

      ## Why bother
      Many sales questions are about relationships: which companies belong to the same group, which customers have sister companies without licences, which prospects cluster around one industrial estate. Tables answer them awkwardly; a graph answers them directly.
    `,
  }),

  entry('graphrag', 'concept', LLM, 'curious', 'GraphRAG', {
    summary: 'RAG that uses a knowledge graph: detect communities of related entities, have a model summarise each once, and answer broad questions from those summaries plus the specific passages. Good for “what’s the landscape of…” questions plain RAG answers badly.',
    aliases: ['GraphRAG', 'graph RAG', 'community detection', 'community summaries', 'Leiden algorithm', 'Louvain', 'global questions'],
    tags: ['rag', 'graphs'],
    year: 2024,
    body: doc`
      ## The limit of plain RAG
      Vector search finds passages *similar to the question*. "What is the aerospace supplier landscape around Bengaluru?" isn't answered by any single passage; it needs an overview of many companies and how they relate.

      ## The GraphRAG recipe (after Microsoft Research, 2024)
      1. **Build the graph**: entities and relationships (extracted by a model from text, or — often — already sitting in your database as keys and shared values).
      2. **Detect communities**: groups of densely connected nodes, found with an algorithm like **Leiden** (or Louvain) — a corporate group, the companies of an industrial estate, a cluster of suppliers around a customer.
      3. **Summarise each community** once with a model; embed the summaries.
      4. **Answer**:
         - *global* questions from community summaries (map over relevant communities, then reduce);
         - *local* questions ("who are the directors of X's sister companies?") by walking the graph from the matching entities and pulling their passages.

      ## Keeping it current and affordable
      Summaries are the expensive part. Re-summarise only communities whose members changed. Store summaries with the list of members and evidence they drew on, so answers can cite them.

      ## Is it worth it?
      Build plain RAG and the explicit graph first; measure which questions fail. GraphRAG earns its cost on overview and relationship questions over many entities — exactly the "landscape" and "group" questions a sales team asks.
    `,
  }),

  entry('text-to-sql', 'concept', LLM, 'curious', 'Text-to-SQL', {
    summary: 'The model reads your table descriptions and writes a SQL query for a plain-language question; the query runs on a read-only connection and the answer shows the rows. Powerful over structured data — and a place where least privilege is not optional.',
    aliases: ['text-to-SQL', 'text to SQL', 'NL2SQL', 'question-to-SQL', 'natural language to SQL', 'natural-language query'],
    tags: ['llm', 'sql'],
    body: doc`
      ## The loop
      ~~~python
      SCHEMA = """
      companies(id, legal_name, registration_state, city, pincode, paid_up_capital_inr,
                is_manufacturer, niche, tier, fit_score, is_customer)
      products(company_id -> companies.id, name, category)
      customers(id, company_name, state, support_status, renewal_due)
      -- tier is 'A', 'B' or 'C'; support_status is healthy | partial | at_risk | lapsed
      """
      sql = ask_model(f"Write one PostgreSQL SELECT answering the question. Schema:\n{SCHEMA}\n"
                      f"Question: {question}\nReturn only SQL.")
      check_is_single_select(sql)                             # parse it; reject anything else
      async with readonly_engine.connect() as conn:           # a user with SELECT only
          await conn.execute(text("SET LOCAL statement_timeout = '5s'"))
          rows = (await conn.execute(text(sql + " LIMIT 500"))).mappings().all()
      ~~~

      ## What makes it work
      - **Good table descriptions**: column meanings, allowed values, join paths, units (rupees, not lakhs). This is the prompt.
      - **Examples**: a handful of question → SQL pairs for your schema (few-shot).
      - **Show the SQL** to the user alongside the rows, so they can sanity-check it.
      - **Evals**: a set of questions with known correct results; compare row sets, not SQL text.

      ## What keeps it safe
      - A **read-only database user** with access only to the tables you describe — even if the model (or a prompt injection in the question) writes §DROP TABLE§, the database refuses.
      - Parse and allow only a single SELECT; add a row limit and a statement timeout.
      - Hide sensitive columns (personal data) from the schema and the user's grants.
      - Respect application roles: a view-only user shouldn't get an export by asking nicely.

      ## Text-to-SQL or RAG?
      Counting, filtering, ranking and joining structured facts → SQL. "What does this company make, and what did its website say?" → RAG over evidence. Good assistants route between them.
    `,
  }),

  entry('semantic-search-product', 'example', LLM, 'curious', 'Semantic Search in a Product: “Describe What You’re Looking For”', {
    summary: 'A search box that ranks records by meaning within the usual filters and shows the passage that matched — and the first step towards an “Ask” panel.',
    aliases: ['semantic search box', 'describe what you are looking for', 'filter then rank'],
    tags: ['rag', 'walkthrough'],
    body: doc`
      ## The query
      ~~~sql
      -- :q is the embedding of "precision castings with in-house design"
      WITH best AS (
        SELECT DISTINCT ON (ch.company_id)
               ch.company_id, ch.text, ch.embedding <=> :q AS distance
        FROM evidence_chunks ch
        JOIN companies c ON c.id = ch.company_id
        WHERE c.registration_state = :state            -- the filters the UI already has
          AND c.tier = ANY(:tiers)
          AND NOT c.is_customer
        ORDER BY ch.company_id, ch.embedding <=> :q
      )
      SELECT c.id, c.legal_name, c.city, c.tier, best.text AS matched_passage, best.distance
      FROM best JOIN companies c ON c.id = best.company_id
      ORDER BY best.distance
      LIMIT 25;
      ~~~
      One best chunk per company (§DISTINCT ON§), ranked by distance, inside the structured filters.

      ## Design choices worth copying
      - **Filter first, rank second**: "near Coimbatore, tier A" is a filter, not something to hope the embedding captures.
      - **Show the matching passage** so users see *why* a company came up — and trust (or distrust) it.
      - **Embed at the end of the pipeline**: every new profile is searchable the moment it's stored; a back-fill script covers old rows.
      - **Keep the evidence pointer** on each chunk: citations for a future answer panel come free.

      ## From search to answers
      The next step is an **Ask** panel: retrieve the top passages the same way, hand them to a model with "answer only from these, cite company ids and URLs", and show the answer with its sources — RAG on top of the search you already have.

      ## Watch the filters
      With HNSW indexes, strict filters can leave too few results; pgvector 0.8's iterative index scans fix most of that. Check result counts on narrow filters.
    `,
  }),
];
