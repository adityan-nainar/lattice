// Postgres & Data: where the app keeps what matters.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { DATA } = AREA;

export const DATA_ENTRIES = [
  entry('relational-model', 'theory', DATA, 'curious', 'The Relational Model', {
    summary: 'Data as tables of rows, related by keys, queried by describing what you want rather than how to get it. Codd’s 1970 idea still runs most of the world’s data.',
    aliases: ['relational model', 'relational database', 'SQL'],
    tags: ['foundations', 'theory'],
    year: 1970,
    body: doc`
      ## Codd's idea
      In 1970 Edgar Codd at IBM proposed storing data as **relations** — tables of rows with named columns — and asking questions with a declarative language: say *what* you want, and let the database work out *how*. Before that, programs navigated pointer-linked records by hand, and any change to storage broke every program.

      ## Why it won
      - **Independence**: add an index, and every query that could use it speeds up with no code change.
      - **Relationships by value**: §notes.owner_id = users.id§ — no pointers to break.
      - **One query language** — SQL, from IBM's System R in the mid-70s — for everything from a side project to a bank.
      - **Guarantees**: constraints and transactions keep data correct even when code is buggy.

      ## You already know the query side
      From analysis work, SELECT/JOIN/GROUP BY are familiar. Building apps adds the *other* half: designing tables, keys and constraints; indexes for the queries your pages make; transactions so concurrent users don't corrupt things; and migrations to change the schema safely while the app runs.

      ## Where it bends
      Documents (JSONB), full-text search, vectors (pgvector), queues — Postgres now does all of these inside the relational model. For a side project, one Postgres usually beats three specialised databases.
    `,
  }),

  entry('postgres', 'concept', DATA, 'curious', 'PostgreSQL', {
    summary: 'The open-source relational database most new projects reach for: correct, extensible, and able to do JSON, search, vectors and queues without extra systems.',
    aliases: ['Postgres', 'PostgreSQL', 'psql', 'psycopg', 'libpq'],
    tags: ['database', 'foundations'],
    year: 1996,
    body: doc`
      ## Why Postgres
      - Strict about correctness: real transactions, constraints, types.
      - **Extensions**: pgvector (embeddings), PostGIS (maps), pg_trgm (fuzzy text), pg_cron (scheduling).
      - JSONB when you want document-style flexibility, full-text search built in.
      - Every hosting platform offers it managed: Neon, Supabase, Render, RDS, Cloud SQL.

      ## Architecture in one paragraph
      Each client connection gets its own server **process** (a few MB of memory each), which is why connections are precious and pooling matters. Data lives in 8 KB **pages**; changes go to a **write-ahead log** first (crash safety, replication, backups). Old row versions pile up (MVCC) and **autovacuum** cleans them.

      ## Local setup
      ~~~bash
      docker run -d --name pg -e POSTGRES_PASSWORD=dev -p 5432:5432 pgvector/pgvector:pg18
      psql postgresql://postgres:dev@localhost:5432/postgres
      ~~~
      Connection string for SQLAlchemy: §postgresql+psycopg://postgres:dev@localhost:5432/postgres§ (psycopg 3).

      ## psql survival kit
      §\dt§ tables · §\d notes§ describe one · §\x§ expanded rows · §\timing§ show query time · §\q§ quit.

      ## Versions
      PostgreSQL 18 (September 2025) is the current release: asynchronous I/O, a built-in §uuidv7()§, virtual generated columns. PostgreSQL 19 is in beta, with general availability expected around October 2026. Majors come yearly and each is supported for five years.
    `,
  }),

  entry('keys-constraints', 'concept', DATA, 'curious', 'Keys and Constraints', {
    summary: 'Primary keys identify rows, foreign keys link tables, and NOT NULL, UNIQUE and CHECK stop bad data at the door — even when your application code has bugs.',
    aliases: ['primary key', 'foreign key', 'foreign keys', 'UNIQUE constraint', 'CHECK constraint', 'NOT NULL', 'constraints', 'ON DELETE CASCADE'],
    tags: ['schema design'],
    body: doc`
      ~~~sql
      CREATE TABLE users (
        id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        email       text NOT NULL UNIQUE,
        created_at  timestamptz NOT NULL DEFAULT now()
      );

      CREATE TABLE notes (
        id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        owner_id    bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title       text NOT NULL CHECK (length(title) BETWEEN 1 AND 200),
        status      text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        UNIQUE (owner_id, title)
      );
      CREATE INDEX ON notes (owner_id);   -- Postgres does NOT index foreign keys for you
      ~~~

      ## Why put rules in the database
      Your Flask validation will have a bug someday, a script will bypass it, two requests will race. Constraints are the last line that *can't* be skipped: a duplicate email fails at the database even if two sign-ups arrive in the same millisecond. Catch the error (§IntegrityError§) and return a 409.

      ## Foreign keys
      §owner_id REFERENCES users(id)§ guarantees every note belongs to a real user. §ON DELETE§ says what happens when the user goes: §CASCADE§ (delete their notes), §RESTRICT§ (refuse), §SET NULL§. Index the foreign-key column — joins and cascading deletes need it.

      ## Natural vs surrogate keys
      Email *could* be the key, but emails change. A meaningless surrogate id that never changes, plus a UNIQUE constraint on the natural key, is the usual choice.
    `,
  }),

  entry('normalization', 'concept', DATA, 'curious', 'Normalization', {
    summary: 'Store each fact once. Split repeating or dependent data into its own table so updates can’t leave copies disagreeing — then denormalise deliberately where reads demand it.',
    aliases: ['normalization', 'normalisation', 'normal form', 'denormalization', 'many-to-many', 'join table'],
    tags: ['schema design'],
    body: doc`
      ## The smell
      ~~~text
      notes(id, title, owner_email, owner_name, tags)
            1   "RAG"  a@x.com     "Asha"      "ml,llm"
            2   "KV"   a@x.com     "Asha "     "llm"
      ~~~
      Asha's name is stored twice (and already disagrees), and tags are a comma list you can't index or join.

      ## Normalised
      ~~~text
      users(id, email, name)
      notes(id, owner_id → users, title)
      tags(id, name UNIQUE)
      note_tags(note_id → notes, tag_id → tags, PRIMARY KEY (note_id, tag_id))
      ~~~
      - One fact, one place: rename Asha once.
      - **Many-to-many** (notes ↔ tags) always needs a join table.

      The textbook forms (1NF, 2NF, 3NF) formalise "every column depends on the key, the whole key, and nothing but the key".

      ## When to bend
      - A **counter** or cached total (§notes.link_count§) to avoid counting on every page load — keep it in sync with a trigger or in the same transaction.
      - A **snapshot** that *should* not change later: the price on an invoice, the model name and prompt used for an LLM answer.
      - Tags as a §text[]§ array or JSONB, if you never need to query across them.

      Start normalised; denormalise when a measured query needs it, and write down why.
    `,
  }),

  entry('column-types', 'concept', DATA, 'curious', 'Choosing Column Types', {
    summary: 'text over varchar, timestamptz over timestamp, numeric for money, bigint or UUIDv7 for ids, jsonb for flexible blobs. Small choices that save big headaches.',
    aliases: ['timestamptz', 'UUID', 'UUIDv7', 'bigint', 'numeric type', 'identity column', 'serial'],
    tags: ['schema design'],
    body: doc`
      | Need | Use | Avoid |
      |---|---|---|
      | Strings | §text§ (with a CHECK for max length if needed) | §varchar(255)§ out of habit |
      | Points in time | §timestamptz§ | §timestamp§ — no zone, ambiguous |
      | Money | §numeric(12,2)§, or integer paise | §float§ — 0.1 + 0.2 ≠ 0.3 |
      | Ids | §bigint GENERATED ALWAYS AS IDENTITY§ or §uuid§ | §int§ (2.1 billion runs out), §serial§ (legacy) |
      | Yes/no | §boolean§ | §'Y'/'N'§ strings |
      | Flexible structure | §jsonb§ | §json§ (text, no indexing) |
      | Embeddings | §vector(n)§ from pgvector | arrays of floats |

      ## timestamptz, really
      §timestamptz§ stores an absolute instant (in UTC) and converts to the session's time zone on display. Store instants in UTC, convert to IST at the edge (in React, with the user's locale). A server in Virginia and a user in Chennai then never argue about what "10 AM" meant.

      ## Integer ids or UUIDs?
      - **bigint**: small, fast, readable in URLs — but guessable (§/notes/42§ invites trying 43) and needs the database to hand them out.
      - **UUID**: 128 random bits, generated anywhere, safe to expose. Random (v4) UUIDs scatter inserts across the index; **UUIDv7** starts with a timestamp, so new ids sort together and index nicely. Postgres 18 has §uuidv7()§ built in.
      Either way, check ownership on every request — hiding ids isn't security.
    `,
  }),

  entry('indexes', 'equation', DATA, 'curious', 'Indexes and B-Trees', {
    summary: 'An index is a sorted structure that finds rows without reading the whole table. A B-tree reaches any of a billion rows in about four page reads.',
    aliases: ['indexes', 'database index', 'B-tree', 'B-tree index', 'composite index', 'GIN index', 'sequential scan', 'index scan'],
    tags: ['performance', 'data structures'],
    year: 1970,
    latex: doc`\text{depth} = \left\lceil \log_{f} N \right\rceil`,
    variables: [
      ['N', 'Rows in the table'],
      ['f', 'Fan-out: keys per 8 KB index page, often a few hundred'],
    ],
    body: doc`
      ## Without an index
      §SELECT * FROM notes WHERE owner_id = 42§ on 10 million rows reads all 10 million — a **sequential scan**. Fine for 1,000 rows, painful at a million.

      ## A B-tree
      A balanced tree of pages: the root points to a few hundred children, each to a few hundred more. With fan-out ~300, three levels cover 27 million keys and four cover 8 billion. Every lookup is a handful of page reads, usually cached in memory. Sorted, so it also serves ranges (§created_at > now() - interval '7 days'§) and §ORDER BY§.

      ## Index what you filter, join and sort by
      ~~~sql
      CREATE INDEX notes_owner_created ON notes (owner_id, created_at DESC);
      -- serves: WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 20
      ~~~
      A **composite** index works left to right: it helps §WHERE owner_id = ?§ alone, not §WHERE created_at > ?§ alone.

      ## Other kinds
      - **GIN** — for "contains" questions: JSONB keys, arrays, full-text search.
      - **HNSW / IVFFlat** (pgvector) — approximate nearest neighbours for embeddings.
      - **Partial** — §WHERE status = 'pending'§, tiny and fast for a job queue.

      ## Costs
      Every index slows writes (it must be updated too) and takes space. §CREATE INDEX CONCURRENTLY§ on a live table avoids locking out writes. Check with §EXPLAIN ANALYZE§ that the index is actually used.
    `,
    calc: {
      inputs: [
        input('rows', 'Rows in the table', '', 1e7, 100, 1e11, LOG),
        input('f', 'Keys per index page (fan-out)', '', 300, 10, 1000, LOG),
        input('perpage', 'Rows per table page', '', 60, 1, 500, LOG),
        input('io', 'Time per page read', 'ms', 0.1, 0.001, 10, LOG),
      ],
      outputs: [
        out('Index depth (page reads to find a row)', 'levels', 'ceil(ln(rows)/ln(f))', { key: 'depth' }),
        out('Lookup via index', 'ms', '(depth + 1)*io', { digits: 3 }),
        out('Pages in a full table scan', '', 'rows/perpage', { key: 'pages' }),
        out('Full table scan', 's', 'pages*io/1000', { digits: 3 }),
        out('Index is faster by', '×', 'pages/(depth + 1)', { digits: 3 }),
      ],
      note: 'Push rows from 10 million to 10 billion: the index gets one level deeper, the scan gets 1,000× slower. 0.1 ms is roughly an SSD read; memory is ~100× faster.',
    },
  }),

  entry('explain-analyze', 'concept', DATA, 'curious', 'Reading EXPLAIN ANALYZE', {
    summary: 'Ask Postgres how it ran a query: which scans, which joins, how many rows it expected versus found, and where the time went.',
    aliases: ['EXPLAIN', 'EXPLAIN ANALYZE', 'query plan', 'query planner', 'slow query'],
    tags: ['performance', 'debugging'],
    body: doc`
      ~~~sql
      EXPLAIN ANALYZE
      SELECT * FROM notes WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 20;
      ~~~
      ~~~text
      Limit  (cost=0.43..8.9 rows=20) (actual time=0.03..0.09 rows=20 loops=1)
        ->  Index Scan using notes_owner_created on notes
              (cost=0.43..512.1 rows=1210) (actual time=0.03..0.08 rows=20 loops=1)
              Index Cond: (owner_id = 42)
      Planning Time: 0.2 ms
      Execution Time: 0.1 ms
      ~~~

      ## How to read it
      - It's a tree; read **inside-out**, bottom-up. Each node feeds its parent.
      - **cost** is the planner's estimate in abstract units; **actual time** is real milliseconds (first row..last row), per loop.
      - Compare **rows** estimated vs actual. A 1,000× miss means stale statistics (run §ANALYZE§) or correlated columns, and bad plans follow.
      - **loops=5000** on an inner node means it ran 5,000 times — multiply.

      ## Red flags
      - §Seq Scan§ on a big table with a selective filter → missing index.
      - §Sort§ with "external merge Disk" → sort spilled to disk; add an index matching the ORDER BY, or more §work_mem§.
      - §Nested Loop§ with a huge outer side → often a missing join index.

      ## Workflow
      Turn on slow-query logging (§log_min_duration_statement = 200§) or the §pg_stat_statements§ extension, find the worst queries by *total* time, §EXPLAIN ANALYZE§ them, fix, re-measure. Paste plans into explain.dalibo.com for a picture.

      Careful: §ANALYZE§ really runs the query — wrap an UPDATE/DELETE in §BEGIN; … ROLLBACK;§.
    `,
  }),

  entry('transactions-acid', 'concept', DATA, 'curious', 'Transactions and ACID', {
    summary: 'A transaction groups statements so they all happen or none do. ACID — atomic, consistent, isolated, durable — is what makes databases trustworthy.',
    aliases: ['transaction', 'transactions', 'ACID', 'rollback', 'atomicity', 'durability'],
    tags: ['correctness', 'foundations'],
    body: doc`
      ~~~sql
      BEGIN;
      INSERT INTO documents (owner_id, title) VALUES (42, 'Paper') RETURNING id;   -- 17
      INSERT INTO chunks (document_id, n, text) VALUES (17, 0, '…'), (17, 1, '…');
      UPDATE users SET doc_count = doc_count + 1 WHERE id = 42;
      COMMIT;
      ~~~
      If the process dies after the first insert, nothing is saved — no orphan document without chunks, no wrong count.

      ## ACID
      - **Atomic** — all or nothing.
      - **Consistent** — constraints hold before and after.
      - **Isolated** — concurrent transactions don't see each other's half-done work (how strictly: isolation levels).
      - **Durable** — once §COMMIT§ returns, it survives a power cut (it's in the write-ahead log on disk).

      ## In SQLAlchemy
      The session is a transaction: §session.commit()§ or §session.rollback()§. Flask-SQLAlchemy removes the session at the end of each request; commit explicitly when you mean to.
      ~~~python
      with Session(engine) as session, session.begin():   # commits, or rolls back on exception
          ...
      ~~~

      ## Keep them short
      A transaction holds locks and pins old row versions. **Never call an LLM inside an open transaction** — a 20-second model call holding row locks blocks every other request touching those rows. Read what you need, commit, call the model, then open a new transaction to save the result.
    `,
  }),

  entry('isolation-levels', 'concept', DATA, 'curious', 'Isolation Levels and Locking', {
    summary: 'How much concurrent transactions can see of each other. Postgres defaults to Read Committed; lost updates and races need row locks or stricter levels.',
    aliases: ['isolation level', 'isolation levels', 'Read Committed', 'Serializable', 'SELECT FOR UPDATE', 'deadlock', 'lost update', 'race condition'],
    tags: ['correctness', 'concurrency'],
    body: doc`
      ## The classic bug: lost update
      Two requests spend credits at the same moment:
      ~~~python
      user = session.get(User, 42)           # both read credits = 10
      user.credits -= 1                      # both compute 9
      session.commit()                       # both write 9 — one spend vanished
      ~~~

      ## Fixes
      1. **Let the database do the arithmetic** — atomic and simplest:
         §UPDATE users SET credits = credits - 1 WHERE id = 42 AND credits > 0 RETURNING credits;§
      2. **Lock the row** while you think: §SELECT … FOR UPDATE§ makes the second transaction wait for the first to commit.
      3. **Serializable** isolation: Postgres detects conflicting transactions and aborts one with a serialization error; you retry it.

      ## The levels in Postgres
      - **Read Committed** (default): each *statement* sees data committed before it began. Two SELECTs in one transaction can disagree.
      - **Repeatable Read**: the whole transaction sees one snapshot.
      - **Serializable**: results as if transactions ran one after another. Safest, needs retry logic.

      ## Deadlocks
      Transaction A locks row 1 then wants row 2; B locks row 2 then wants row 1. Postgres notices and kills one. Lock rows in a consistent order (e.g. by id) and keep transactions short.

      ## SKIP LOCKED
      §SELECT … FOR UPDATE SKIP LOCKED LIMIT 1§ lets several workers each grab a *different* pending job without blocking each other — a job queue in one line.
    `,
  }),

  entry('mvcc-vacuum', 'concept', DATA, 'curious', 'MVCC and VACUUM', {
    summary: 'Postgres never overwrites a row in place: an UPDATE writes a new version, so readers and writers don’t block each other. VACUUM cleans up the dead versions.',
    aliases: ['MVCC', 'multiversion concurrency control', 'VACUUM', 'autovacuum', 'dead tuples', 'table bloat'],
    tags: ['internals', 'concurrency'],
    body: doc`
      ## Versions, not overwrites
      Each row version carries the transaction id that created it (§xmin§) and the one that deleted or replaced it (§xmax§). A transaction sees only versions that were committed as of its snapshot. So:
      - Readers never wait for writers, and writers never wait for readers.
      - An §UPDATE§ is really "mark old version dead, insert new version".
      - A long-running transaction can still see very old versions — so they can't be removed while it's open.

      ## VACUUM
      Dead versions ("dead tuples") take space until **VACUUM** marks it reusable. **Autovacuum** runs in the background and usually handles it. Trouble starts when:
      - a table is updated very frequently (a counter row, a job-status table);
      - a transaction sits open for hours ("idle in transaction" — often a forgotten §BEGIN§ in a psql window, or app code that never commits) and pins everything.

      Symptoms: tables and indexes grow while row counts don't ("bloat"), queries slow down.

      ## Wraparound
      Transaction ids are 32-bit, so about 2 billion transactions can be told apart. VACUUM "freezes" old rows so ids can be reused; if it's blocked long enough, Postgres eventually refuses writes to protect data. Rare in a side project, famous in outage reports.

      ## Check on it
      §SELECT relname, n_dead_tup, last_autovacuum FROM pg_stat_user_tables ORDER BY n_dead_tup DESC;§
    `,
  }),

  entry('connection-pooling', 'equation', DATA, 'curious', 'Connection Pooling', {
    summary: 'Opening a Postgres connection is slow and each one is a whole server process. A pool keeps a few open and lends them out — and Little’s law tells you how many you need.',
    aliases: ['connection pool', 'connection pooling', 'PgBouncer', 'max_connections', 'pool size', 'too many connections'],
    tags: ['performance', 'deployment'],
    latex: doc`L = \lambda\,W`,
    variables: [
      ['L', 'Connections busy at once, on average'],
      [doc`\lambda`, 'Queries per second'],
      ['W', 'Average time a query holds a connection'],
    ],
    body: doc`
      ## Why pool
      A new connection costs a TCP + TLS handshake, authentication and forking a server process — several milliseconds, more over a network. Doing that per request wastes more time than the query. A pool opens a few connections once and reuses them. SQLAlchemy's engine has one built in (§pool_size=5, max_overflow=10§ by default).

      ## Why not a huge pool
      Postgres's §max_connections§ defaults to **100**, each connection is a process with its own memory, and more than a few times your CPU cores of *active* queries just makes them fight. Add it up: 4 Gunicorn workers × pool of 15 × 3 app instances = 180 → "FATAL: too many connections".

      ## How many do you need?
      Little's law: busy connections = queries/second × seconds each holds one. 200 queries/s at 5 ms each keeps only **one** connection busy on average. Small pools go a long way — *if* connections are returned promptly.

      ## What wrecks it
      Holding a connection while doing something slow: an open transaction during an LLM call, or streaming a response while a session is checked out. Now $W$ is 20 s instead of 5 ms, and the same load needs 4,000× the connections. Release the connection before waiting on anything external.

      ## PgBouncer
      A lightweight pooler in front of Postgres that multiplexes thousands of client connections onto a few dozen real ones. Managed hosts (Neon, Supabase) offer a pooled connection string — use it for serverless or many-instance setups.
    `,
    calc: {
      inputs: [
        input('qps', 'Queries per second', '/s', 200, 0.1, 100000, LOG),
        input('ms', 'Time each holds a connection', 'ms', 5, 0.1, 60000, LOG),
        input('procs', 'App processes (workers × instances)', '', 12, 1, 500, LOG),
        input('pool', 'Pool size per process (incl. overflow)', '', 15, 1, 100, LOG),
      ],
      outputs: [
        out('Connections busy on average (L = λW)', '', 'qps*ms/1000', { digits: 3 }),
        out('Connections the app could open', '', 'procs*pool', { key: 'maxc' }),
        out('Share of default max_connections (100)', '%', 'maxc/100*100', { digits: 3 }),
      ],
      note: 'Set the hold time to 20000 ms — a connection held during an LLM call — and watch the busy count explode.',
    },
  }),

  entry('n-plus-one', 'equation', DATA, 'curious', 'The N+1 Query Problem', {
    summary: 'Load 50 notes with one query, then their authors with 50 more. Each query pays a round trip; the page gets slow in a way no single query shows.',
    aliases: ['N+1 problem', 'N+1 query', 'N+1 queries', 'eager loading', 'selectinload', 'joinedload', 'lazy loading'],
    tags: ['performance', 'orm'],
    latex: doc`t_{N+1} = (N+1)(t_{\text{rtt}} + t_q) \quad\text{vs}\quad t_{\text{batched}} = 2(t_{\text{rtt}} + t_q)`,
    variables: [
      ['N', 'Rows in the first result'],
      [doc`t_{\text{rtt}}`, 'Network round trip to the database'],
      [doc`t_q`, 'Time to execute one small query'],
    ],
    body: doc`
      ## How it happens
      ~~~python
      notes = session.scalars(select(Note).limit(50)).all()      # 1 query
      for n in notes:
          print(n.owner.name)                                  # lazy load: 50 more queries
      ~~~
      The ORM loads relationships lazily — on first access — so innocent-looking attribute access in a loop (or in a §to_dict()§) fires a query per row.

      ## Fix: load related rows up front
      ~~~python
      from sqlalchemy.orm import selectinload
      stmt = select(Note).options(selectinload(Note.owner)).limit(50)
      # 2 queries total: the notes, then owners WHERE id IN (…)
      ~~~
      §joinedload§ does it in one query with a JOIN — good for many-to-one; §selectinload§ is better for collections.

      ## Spot it
      - §echo=True§ on the engine in development and watch the log scroll.
      - Count queries per request in a test and assert an upper bound.

      ## Why it's worse than it looks
      Locally the database is 0.1 ms away and 51 queries take 10 ms — invisible. In production with a managed database 2 ms away, it's over 100 ms, and it grows with the data. The same shape appears in React (one fetch per list item) and in agents (one tool call per item when one batched call would do).
    `,
    calc: {
      inputs: [
        input('N', 'Rows in the list', '', 50, 1, 10000, LOG),
        input('rtt', 'Round trip to the database', 'ms', 2, 0.05, 100, LOG),
        input('tq', 'Execution time per small query', 'ms', 0.3, 0.01, 50, LOG),
      ],
      outputs: [
        out('N+1 pattern', 'ms', '(N + 1)*(rtt + tq)', { key: 'bad', digits: 3 }),
        out('Eager loading (2 queries)', 'ms', '2*(rtt + tq)', { key: 'good', digits: 3 }),
        out('Slowdown', '×', 'bad/good', { digits: 3 }),
      ],
      note: 'Try rtt 0.1 ms (database on your laptop) and 5 ms (managed database in another zone).',
    },
  }),

  entry('pagination', 'concept', DATA, 'curious', 'Pagination: OFFSET vs Keyset', {
    summary: 'LIMIT/OFFSET is easy but gets slower with every page and skips or repeats rows when data changes. Keyset (cursor) pagination stays fast and stable.',
    aliases: ['pagination', 'keyset pagination', 'cursor pagination', 'OFFSET', 'infinite scroll'],
    tags: ['performance', 'api design'],
    body: doc`
      ## OFFSET
      ~~~sql
      SELECT * FROM notes WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 20 OFFSET 2000;
      ~~~
      To skip 2,000 rows, Postgres still finds and discards them — page 100 does 100× the work of page 1. And if a note is added while someone is paging, everything shifts by one: a row repeats or goes missing.

      ## Keyset (cursor)
      Remember where you stopped and ask for what comes after:
      ~~~sql
      SELECT * FROM notes
      WHERE owner_id = 42
        AND (created_at, id) < (:last_created_at, :last_id)
      ORDER BY created_at DESC, id DESC
      LIMIT 20;
      ~~~
      With an index on §(owner_id, created_at DESC, id DESC)§ every page is equally fast. The §id§ tie-breaker keeps order stable when two rows share a timestamp.

      ## The API shape
      Return an opaque cursor with each page: §{"items": […], "next_cursor": "MjAyNi0wOS0yM1QxMDoxNVo…"}§ (base64 of the last row's sort key). The client sends it back for the next page. Perfect for infinite scroll (TanStack Query's §useInfiniteQuery§).

      ## When OFFSET is fine
      Small tables, admin screens, or when users genuinely need "jump to page 7". Everywhere a list can grow without bound, use keyset.
    `,
  }),

  entry('upsert-returning', 'concept', DATA, 'curious', 'Upserts and RETURNING', {
    summary: 'INSERT … ON CONFLICT updates the row if it exists; RETURNING hands back the row you just wrote. Together they remove whole classes of race conditions and round trips.',
    aliases: ['upsert', 'ON CONFLICT', 'RETURNING', 'insert or update'],
    tags: ['sql', 'correctness'],
    body: doc`
      ## Upsert
      ~~~sql
      INSERT INTO chunk_embeddings (chunk_id, model, embedding)
      VALUES (:chunk_id, :model, :embedding)
      ON CONFLICT (chunk_id, model)
      DO UPDATE SET embedding = EXCLUDED.embedding, updated_at = now();
      ~~~
      "Check if it exists, then insert or update" in application code has a race: two workers both see "not there" and both insert. The upsert is atomic. It needs a UNIQUE constraint (here on §(chunk_id, model)§) to know what "conflict" means. §DO NOTHING§ just skips duplicates.

      This makes background jobs **idempotent**: re-running "embed document 17" overwrites instead of duplicating.

      ## RETURNING
      ~~~sql
      INSERT INTO notes (owner_id, title) VALUES (42, 'KV cache') RETURNING id, created_at;
      UPDATE users SET credits = credits - 1 WHERE id = 42 AND credits > 0 RETURNING credits;
      DELETE FROM sessions WHERE expires_at < now() RETURNING user_id;
      ~~~
      One round trip gets you the generated id, the default timestamp, or the new value — no second SELECT, no window for another request to sneak in between.

      ## In SQLAlchemy
      §from sqlalchemy.dialects.postgresql import insert§ gives §insert(T).values(…).on_conflict_do_update(…)§, and §.returning(T.id)§ works on inserts, updates and deletes.
    `,
  }),

  entry('jsonb', 'concept', DATA, 'curious', 'JSONB', {
    summary: 'A binary JSON column type with operators and indexes. Flexible fields inside a relational table — metadata, settings, raw LLM responses — without giving up SQL.',
    aliases: ['JSONB', 'json column', 'document store'],
    tags: ['data types', 'schema design'],
    body: doc`
      ~~~sql
      CREATE TABLE llm_calls (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        model text NOT NULL,
        input_tokens int, output_tokens int,
        request jsonb NOT NULL,
        response jsonb NOT NULL
      );

      SELECT response->'content'->0->>'text' FROM llm_calls WHERE id = 7;   -- -> json, ->> text
      SELECT * FROM documents WHERE meta @> '{"source": "arxiv"}';          -- containment
      CREATE INDEX ON documents USING gin (meta jsonb_path_ops);            -- makes @> fast
      ~~~

      ## When it's the right tool
      - Data whose shape varies or that you don't query much: provider responses, per-document metadata, user settings.
      - Logging LLM requests and responses whole, for debugging and evals later.
      - Prototyping before the schema settles.

      ## When it isn't
      - Fields you filter, join or sort on all the time → real columns (typed, constrained, smaller, better statistics).
      - Relationships → foreign keys. A JSON array of ids can't be enforced or joined efficiently.

      A good pattern: real columns for what you query, a JSONB column for the rest. And §jsonb§, not §json§: §json§ stores the text verbatim and re-parses it every time.
    `,
  }),

  entry('full-text-search', 'concept', DATA, 'curious', 'Full-Text Search in Postgres', {
    summary: 'tsvector and tsquery turn text into searchable stemmed words with ranking — keyword search built into Postgres, and the keyword half of hybrid search for RAG.',
    aliases: ['full-text search', 'tsvector', 'tsquery', 'keyword search', 'lexical search', 'pg_trgm', 'stemming'],
    tags: ['search'],
    body: doc`
      ~~~sql
      ALTER TABLE chunks ADD COLUMN tsv tsvector
        GENERATED ALWAYS AS (to_tsvector('english', text)) STORED;
      CREATE INDEX ON chunks USING gin (tsv);

      SELECT id, ts_rank(tsv, q) AS rank, ts_headline('english', text, q) AS snippet
      FROM chunks, websearch_to_tsquery('english', 'attention heads -vision') AS q
      WHERE tsv @@ q
      ORDER BY rank DESC LIMIT 10;
      ~~~

      ## What it does
      §to_tsvector§ lower-cases, drops stop words ("the", "is") and **stems** ("heads", "heading" → "head"). §websearch_to_tsquery§ accepts what people type — quotes for phrases, §-§ to exclude, §or§. The GIN index makes §@@§ fast.

      ## Keyword vs vector search
      - Keywords excel at exact terms: names, error codes, "HNSW", "Q4_K_M", ids. Embeddings often blur these.
      - Embeddings excel at meaning: "how do I make the model forget earlier messages" finds a chunk about context windows with none of those words.
      Real RAG systems often run both and merge the results — hybrid search.

      ## Fuzzy matching
      The **pg_trgm** extension compares 3-letter chunks: §WHERE title % 'atention'§ still finds "attention". Good for typo-tolerant title search.

      Postgres ranking is simpler than dedicated engines' BM25; for a side project it's usually plenty.
    `,
  }),

  entry('pgvector', 'equation', DATA, 'curious', 'pgvector', {
    summary: 'A Postgres extension that adds a vector column type, distance operators and approximate-nearest-neighbour indexes. Embeddings live next to the rows they describe.',
    aliases: ['pgvector', 'vector column', 'HNSW', 'IVFFlat', 'halfvec', 'vector index'],
    tags: ['vectors', 'rag', 'search'],
    year: 2021,
    latex: doc`\text{storage} \approx N \times d \times b \ \text{bytes}`,
    variables: [
      ['N', 'Number of vectors (chunks)'],
      ['d', 'Dimensions per embedding'],
      ['b', 'Bytes per number: 4 for vector (float32), 2 for halfvec'],
    ],
    body: doc`
      ## Setup and query
      ~~~sql
      CREATE EXTENSION IF NOT EXISTS vector;

      CREATE TABLE chunks (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        document_id bigint NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
        text text NOT NULL,
        embedding vector(768) NOT NULL
      );
      CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);

      SELECT id, text, embedding <=> :query_vec AS distance
      FROM chunks
      WHERE document_id = ANY(:allowed_docs)
      ORDER BY embedding <=> :query_vec
      LIMIT 8;
      ~~~
      Operators: §<=>§ cosine distance, §<->§ Euclidean, §<#>§ negative inner product. Match the index's ops class to the operator you query with, or the index is ignored.

      ## HNSW vs IVFFlat
      - **HNSW**: a layered graph you hop through towards the nearest vectors. Better recall/speed trade-off, no training step, slower to build and bigger. The default choice.
      - **IVFFlat**: clusters vectors into lists and searches the nearest few. Faster to build, must be created after loading data.
      Both are **approximate** — they can miss a true neighbour. Raise §hnsw.ef_search§ (default 40) for better recall at some speed cost.

      ## Filters
      §WHERE owner_id = 42§ plus vector ordering can return too few rows, because the index finds the nearest 40 overall and *then* filters. pgvector 0.8 added **iterative index scans** (§SET hnsw.iterative_scan = relaxed_order§) to keep searching until enough rows pass.

      ## Why not a separate vector database?
      Keeping vectors in Postgres gives you joins, transactions, permissions and backups for free, and one fewer system. Up to millions of vectors it works well; dedicated engines earn their keep far beyond that.
    `,
    calc: {
      inputs: [
        input('N', 'Vectors (chunks)', '', 1e6, 100, 1e10, LOG),
        input('d', 'Dimensions', '', 768, 64, 4096, LOG),
      ],
      outputs: [
        out('Raw size as vector (float32)', 'B', 'N*d*4', { prefix: true }),
        out('Raw size as halfvec (float16)', 'B', 'N*d*2', { prefix: true }),
        out('Multiply-adds for one brute-force search', '', 'N*d', { key: 'ops' }),
        out('Brute-force search at 10 GFLOP/s', 's', 'ops*2/1e10', { prefix: true }),
      ],
      note: 'A 300-page book is roughly 500–1,000 chunks: a rounding error. Indexes (HNSW) add a similar amount of space again and turn the brute-force time into milliseconds.',
    },
  }),

  entry('sql-injection', 'concept', DATA, 'curious', 'SQL Injection', {
    summary: 'User input pasted into SQL text becomes SQL. Parameterised queries send data separately from code, so it can never be executed.',
    aliases: ['SQL injection', 'SQLi', 'parameterized query', 'parameterised query', 'bind parameters', 'prepared statement'],
    tags: ['security'],
    year: 1998,
    body: doc`
      ## The bug
      ~~~python
      q = request.args["q"]
      cur.execute(f"SELECT * FROM notes WHERE title LIKE '%{q}%'")        # ✗
      ~~~
      Search for §' OR '1'='1§ and every note comes back. Search for §'; DROP TABLE notes; --§ and… (the famous xkcd "Little Bobby Tables").

      ## The fix
      ~~~python
      cur.execute("SELECT * FROM notes WHERE title ILIKE %s", (f"%{q}%",))  # ✓ psycopg
      session.execute(text("SELECT * FROM notes WHERE title ILIKE :q"), {"q": f"%{q}%"})  # ✓
      session.scalars(select(Note).where(Note.title.ilike(f"%{q}%")))     # ✓ ORM
      ~~~
      The query text and the values travel separately; the database never parses the value as SQL. Note §%s§ here is psycopg's placeholder, *not* Python string formatting — never §%§-format or f-string values into SQL yourself.

      ## What parameters can't do
      Table names, column names and §ORDER BY§ direction can't be parameters. If users choose them, map through an allow-list:
      ~~~python
      SORTS = {"new": Note.created_at.desc(), "title": Note.title.asc()}
      stmt = select(Note).order_by(SORTS.get(sort, SORTS["new"]))
      ~~~

      ## The same bug, new costume
      Pasting untrusted text into a *prompt* is the LLM version — prompt injection. Except there, no parameterisation exists: models read instructions and data through the same channel.
    `,
  }),

  entry('schema-migrations', 'concept', DATA, 'curious', 'Schema Migrations (Alembic)', {
    summary: 'Versioned scripts that change the database schema step by step, committed with the code. Everyone’s database — and production — can be brought to the same shape.',
    aliases: ['migration', 'migrations', 'schema migration', 'Alembic', 'Flask-Migrate', 'alembic upgrade'],
    tags: ['tooling', 'deployment'],
    body: doc`
      ## Workflow
      ~~~bash
      # after changing models.py
      alembic revision --autogenerate -m "add embedding column to chunks"
      # READ the generated file, then
      alembic upgrade head
      ~~~
      (With Flask-Migrate: §flask db migrate -m "…"§ and §flask db upgrade§.)

      Each migration has §upgrade()§ and §downgrade()§, and points to its parent — a chain like git commits. The database records which revision it's at in §alembic_version§.

      ## Always read autogenerate's output
      It compares models to the database and guesses. It can't see renames (a rename looks like drop + add — **data lost**), misses some type changes, and doesn't know about extensions (add §op.execute("CREATE EXTENSION IF NOT EXISTS vector")§ yourself).

      ## Changing a live table safely
      - Adding a nullable column or one with a constant default: instant.
      - Adding **NOT NULL** to a big table: add nullable → backfill in batches → then set NOT NULL.
      - Renaming a column the running code uses: add new → write both → switch reads → drop old, across several deploys (expand/contract).
      - Indexes on big tables: §CREATE INDEX CONCURRENTLY§ (outside a transaction).

      ## Rules
      Migrations are append-only once shared — never edit one that's run elsewhere; write a new one. Run them as a deploy step, before the new code starts.
    `,
  }),

  entry('backups', 'concept', DATA, 'curious', 'Backups and Point-in-Time Recovery', {
    summary: 'A backup you haven’t restored is a hope. pg_dump for snapshots, WAL archiving for recovery to any second — and a practice restore so you know it works.',
    aliases: ['backup', 'backups', 'pg_dump', 'point-in-time recovery', 'PITR', 'RPO', 'RTO'],
    tags: ['reliability', 'operations'],
    body: doc`
      ## Two kinds
      - **Logical dump** — §pg_dump -Fc mydb > mydb.dump§, restore with §pg_restore§. A snapshot of one database; portable across versions. Good nightly, and before risky migrations.
      - **Physical + WAL** — a base copy of the data files plus a continuous archive of the write-ahead log. Replay the log to restore to **any moment**: "put it back to 14:31:59, just before someone ran DELETE without a WHERE". Managed Postgres hosts do this for you (check the retention window on your plan).

      ## Two numbers to decide
      - **RPO** (recovery point objective): how much data you can afford to lose — a day? a minute?
      - **RTO** (recovery time objective): how long you can be down while restoring.

      ## Rules learned the hard way
      - **Test restores.** GitLab's 2017 outage found five backup methods, none working. Schedule a restore into a scratch database and check row counts.
      - Keep copies somewhere else — another account, another region. A backup deletable with the same credentials as production isn't safe from the same mistake.
      - Uploaded files and object storage need backing up too; the database alone isn't the app.
      - Before any manual data fix in production: §BEGIN;§ … check counts … then §COMMIT;§ or §ROLLBACK;§.
    `,
  }),
];
