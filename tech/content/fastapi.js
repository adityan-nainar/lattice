// FastAPI, async data access and the security pieces of a multi-user internal tool —
// the backend of a typical internal data tool.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { BACK } = AREA;

export const FASTAPI_ENTRIES = [
  entry('fastapi', 'concept', BACK, 'curious', 'FastAPI', {
    summary: 'A Python web framework built on type hints and async: declare a function with typed parameters and a Pydantic model, and you get validation, JSON, and interactive API docs for free.',
    aliases: ['FastAPI', 'APIRouter', 'OpenAPI docs', 'Swagger UI', 'path operation'],
    tags: ['framework', 'python', 'api'],
    year: 2018,
    body: doc`
      ## A router
      ~~~python
      from fastapi import APIRouter, Depends, HTTPException, Query
      from pydantic import BaseModel

      router = APIRouter(prefix="/companies", tags=["companies"])

      class CompanyOut(BaseModel):
          id: int
          legal_name: str
          city: str | None
          tier: str | None

      @router.get("/{company_id}", response_model=CompanyOut)
      async def get_company(company_id: int, db: AsyncSession = Depends(get_db)):
          company = await db.get(Company, company_id)
          if company is None:
              raise HTTPException(status_code=404, detail="Company not found")
          return company

      @router.get("", response_model=list[CompanyOut])
      async def list_companies(tier: str | None = None, page: int = Query(1, ge=1),
                               per_page: int = Query(50, le=200), db: AsyncSession = Depends(get_db)):
          ...
      ~~~
      ~~~python
      # main.py
      app = FastAPI()
      app.include_router(router, prefix="/api/v1")
      app.mount("/", StaticFiles(directory="frontend-dist", html=True), name="ui")   # the built React app
      ~~~
      Run it with §uvicorn app.main:app --reload§. Open §/docs§ for generated, clickable API documentation.

      ## What the type hints do
      - Path and query parameters are **parsed and validated** (§page§ must be an int ≥ 1, or the client gets a 422 with details).
      - Request bodies are Pydantic models; response models filter what goes out (no leaking a §password_hash§).
      - The same hints produce the **OpenAPI** schema — which can generate a typed TypeScript client for React.

      ## Coming from Flask
      Same ideas — routes, request, response, blueprints (→ routers), error handlers (→ exception handlers), before-request hooks (→ middleware and dependencies). The differences: validation built in, dependency injection, and **async** by default, so one process can wait on hundreds of crawls or model calls at once.

      ## Versioned API
      Prefixing everything with §/api/v1§ leaves room for a §/api/v2§ without breaking the running UI or scripts.
    `,
  }),

  entry('asgi-uvicorn', 'concept', BACK, 'curious', 'ASGI and Uvicorn', {
    summary: 'ASGI is the async successor to WSGI: the contract between an async Python app (FastAPI) and its server. Uvicorn is the usual server — one process juggling many concurrent requests on an event loop.',
    aliases: ['ASGI', 'Uvicorn', 'Starlette', 'uvicorn workers'],
    tags: ['deployment', 'python', 'concurrency'],
    body: doc`
      ## WSGI vs ASGI
      - **WSGI** (Flask, Django classic): each request occupies a worker (process or thread) from start to finish.
      - **ASGI** (FastAPI, Starlette, Quart): requests are coroutines on an event loop; while one awaits the database or a model API, the loop serves others. Also supports WebSockets and long-lived streams natively.

      ## Running it
      ~~~bash
      uvicorn app.main:app --host 0.0.0.0 --port 8080                 # in a container
      uvicorn app.main:app --reload                                   # development
      gunicorn app.main:app -k uvicorn.workers.UvicornWorker -w 4     # several processes, each an event loop
      ~~~
      On Cloud Run one Uvicorn process per container is typical; Cloud Run scales containers rather than processes.

      ## The one rule
      Never block the event loop. A synchronous call — §requests.get§, §time.sleep§, a sync database driver, heavy CPU work — inside an §async def§ stalls *every* request in that process. Use async libraries (httpx, asyncpg), or push blocking work to a thread (§await asyncio.to_thread(fn)§) or a separate worker.

      ## Lifespan
      ASGI apps get startup and shutdown hooks (FastAPI's §lifespan§): open the database pool, create missing tables, resume interrupted jobs — the things an app does when a new revision starts.
    `,
  }),

  entry('fastapi-dependencies', 'concept', BACK, 'curious', 'Dependency Injection in FastAPI', {
    summary: 'Declare what a route needs — a database session, the current user, a permission check — as Depends(...) parameters, and FastAPI supplies them per request. Reuse without globals; swap them out in tests.',
    aliases: ['dependency injection', 'Depends', 'Depends()', 'FastAPI dependencies'],
    tags: ['framework', 'python', 'architecture'],
    body: doc`
      ~~~python
      async def get_db() -> AsyncIterator[AsyncSession]:
          async with SessionLocal() as session:
              yield session                          # closed after the response, even on errors

      async def current_user(x_auth_token: str = Header(...)) -> User:
          user = sessions.get(x_auth_token)
          if not user:
              raise HTTPException(401, "Please sign in")
          return user

      def require_admin(user: User = Depends(current_user)) -> User:
          if user.role != "admin":
              raise HTTPException(403, "Admins only")
          return user

      @router.post("/jobs/start")
      async def start_job(body: StartJob, user: User = Depends(require_admin),
                              db: AsyncSession = Depends(get_db)):
          ...
      ~~~

      ## Why it's nice
      - **Composable**: §require_admin§ builds on §current_user§; routes just declare what they need.
      - **Scoped per request**: a §yield§ dependency sets up and tears down (a session, a transaction).
      - **Testable**: §app.dependency_overrides[get_db] = fake_db§ swaps in a test database or a fake user.
      - **Documented**: header and query dependencies show up in the OpenAPI docs.

      ## Dependencies vs middleware
      Dependencies run for the routes that declare them and can return values to the route. Middleware wraps *every* request — the place for cross-cutting rules like "read-only accounts may only GET" and for writing audit rows. Enforcing roles in one middleware means no route can forget.
    `,
  }),

  entry('middleware', 'concept', BACK, 'curious', 'Middleware', {
    summary: 'Code that wraps every request and response: authentication, permission rules, audit logging, timing, CORS, compression. One place for rules no route should be able to forget.',
    aliases: ['middleware', 'request middleware', 'before_request', 'request pipeline'],
    tags: ['framework', 'architecture', 'security'],
    body: doc`
      ~~~python
      READ_ONLY_ROLES = {"readonly", "viewer"}

      @app.middleware("http")
      async def auth_and_audit(request: Request, call_next):
          started = time.perf_counter()
          path = request.url.path
          user = None
          if path.startswith("/api/") and not path.startswith("/api/v1/auth/login"):
              user = sessions.get(request.headers.get("x-auth-token", ""))
              if user is None:
                  return JSONResponse({"detail": "Please sign in"}, status_code=401)
              if user.role in READ_ONLY_ROLES and request.method != "GET" and not path.startswith("/api/v1/auth"):
                  await audit(user, request, 403, blocked=True)
                  return JSONResponse({"detail": "Your account is read-only"}, status_code=403)
              if user.role == "viewer" and is_download(path):
                  await audit(user, request, 403, blocked=True)
                  return JSONResponse({"detail": "Downloads are not available for your account"}, status_code=403)
          response = await call_next(request)
          if user:
              await audit(user, request, response.status_code, ms=(time.perf_counter() - started) * 1000)
          return response
      ~~~

      ## Order matters
      Middleware stacks like layers of an onion: the first added sees the request first and the response last. CORS usually outermost, then auth, then logging.

      ## Good jobs for middleware
      Authentication, role rules by method and path, audit rows, request IDs, timing, security headers, compression.

      ## Bad jobs for middleware
      Anything specific to one route's data ("may this user see note 42?") — that belongs in the route or a dependency, next to the query that fetches note 42.

      In Flask the equivalents are §before_request§ / §after_request§ hooks and WSGI middleware.
    `,
  }),

  entry('async-sqlalchemy', 'concept', BACK, 'curious', 'Async SQLAlchemy and asyncpg', {
    summary: 'SQLAlchemy 2 with an async engine and the asyncpg driver: the same models and select() queries, awaited — so an async app never blocks on the database.',
    aliases: ['async SQLAlchemy', 'AsyncSession', 'asyncpg', 'create_async_engine', 'async_sessionmaker'],
    tags: ['database', 'python', 'concurrency'],
    body: doc`
      ~~~python
      from sqlalchemy import select
      from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

      engine = create_async_engine(os.environ["DATABASE_URL"],          # postgresql+asyncpg://…
                                   pool_size=30, max_overflow=15, pool_pre_ping=True)
      SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

      async def pending_companies(db: AsyncSession, state: str, limit: int = 100):
          stmt = (select(Company)
                  .where(Company.pipeline_status == "pending", Company.registration_state == state)
                  .limit(limit))
          return (await db.scalars(stmt)).all()
      ~~~

      ## Differences from sync code that bite
      - **Lazy loading doesn't work** implicitly: touching §company.products§ outside an awaited query raises an error. Load relationships up front (§selectinload§) — which also prevents N+1.
      - §expire_on_commit=False§ keeps objects usable after commit without a surprise reload.
      - One **AsyncSession per task**. Sessions aren't safe to share between concurrent coroutines; §asyncio.gather§ over one session is a bug.
      - Every awaited query holds a pooled connection while it runs; workers × concurrency must fit the pool, and all pools must fit the database's connection limit.

      ## asyncpg
      A fast PostgreSQL driver written for asyncio. SQLAlchemy uses it underneath; you can also call it directly for bulk work (§copy_records_to_table§ for fast inserts).

      ## Schema at start-up
      §await conn.run_sync(Base.metadata.create_all)§ creates missing tables on start — convenient, but it never alters existing columns or drops anything. Some apps add missing columns with their own loader; a migration tool (Alembic) is the more controlled alternative as the schema grows.
    `,
  }),

  entry('file-upload-processing', 'concept', BACK, 'curious', 'Processing Uploaded Files', {
    summary: 'Upload, keep the original, hash it, process it in the background, and show a status row — Processing, Done with counts, or Failed with the reason — plus a log and a list of rows that didn’t fit.',
    aliases: ['upload processing', 'file import', 'imports screen', 'UploadFile', 'processing status'],
    tags: ['architecture', 'data'],
    body: doc`
      ## The flow
      ~~~python
      @router.post("/imports", status_code=202)
      async def upload(kind: str = Form(...), file: UploadFile = File(...),
                       user: User = Depends(require_admin), db: AsyncSession = Depends(get_db)):
          data = await file.read()
          if len(data) > 25 * 1024 * 1024:
              raise HTTPException(413, "File too large")
          digest = hashlib.sha256(data).hexdigest()
          if await db.scalar(select(Import.id).where(Import.sha256 == digest)):
              raise HTTPException(409, "This exact file was already uploaded")
          uri = await storage.save(f"imports/{date.today()}_{digest[:8]}_{file.filename}", data)
          job = Import(kind=kind, filename=file.filename, sha256=digest, gcs_uri=uri,
                       status="processing", created_by=user.email)
          db.add(job); await db.commit()
          background.enqueue(process_import, job.id)            # returns now; work continues
          return {"id": job.id, "status": "processing"}
      ~~~

      ## What makes it trustworthy
      - **Keep the original file** (object storage, hashed). Parsers change; re-process from the source.
      - **Status you can see**: a row that goes Processing → Done (with counts: rows read, matched, added, updated, flagged) or Failed (with the reason).
      - **A log** of what the processor decided, and an **unmatched/rejected list** users can download, fix and re-upload.
      - **Preview before commit** for risky files: show which column feeds which field.
      - **Apply as a separate step** when the change is big (an installed-base extract): upload → review the diff → apply.

      ## Limits and safety
      Size limits, allowed types (.xlsx, .csv), checking content not just extension, never trusting the user's filename as a path, and admin-only access for files that change data.
    `,
  }),

  entry('rbac', 'concept', BACK, 'curious', 'Roles and Permissions (RBAC)', {
    summary: 'Give each user a role — admin, read-only, view-only — and decide what each role may do, enforced on the server for every request. Hiding buttons is courtesy; the server check is security.',
    aliases: ['RBAC', 'role-based access control', 'roles and permissions', 'user roles', 'read-only role', 'view-only role', 'admin role', 'access control'],
    tags: ['security', 'auth'],
    body: doc`
      ## A common three-role setup
      | Role | Can | Cannot |
      |---|---|---|
      | Admin | everything, including users and the audit trail | — |
      | Read only | browse, search, open, download CSVs | anything that changes data |
      | View only | browse and search, 25 rows a page | any export or download; pages watermarked and every action recorded |

      ## Enforce on the server
      The UI hides controls a role can't use, but the rule that counts is in one middleware: a non-GET from a read-only account → 403; any download path from a view-only account → 403. A user with DevTools can send any request they like; only the server decides.

      ## Rules around the rules
      - At least one active admin must always exist; an admin can't demote or deactivate themselves.
      - A role change applies to open sessions **immediately** (look the role up per request, or update the session store).
      - Admins are created individually, never in bulk.
      - Separate **authorisation by action** (may this role POST?) from **authorisation by object** (may this user see this record?). Internal tools often only need the first; multi-tenant apps always need both.

      ## Beyond roles
      Permissions per action ("export", "upload", "manage users") assigned to roles scale better than checking role names everywhere. Attribute-based rules ("territory = own territory") come next when teams need data partitioned.
    `,
  }),

  entry('session-tokens', 'concept', BACK, 'curious', 'Session Tokens and Where Sessions Live', {
    summary: 'After login the server hands out a random token; each request carries it (a cookie or a header like x-auth-token) and the server looks up who it belongs to. Where that lookup table lives decides what a restart or a second instance does.',
    aliases: ['session token', 'session tokens', 'session store', 'session expiry', 'x-auth-token', 'in-memory sessions'],
    tags: ['security', 'auth'],
    body: doc`
      ## Issuing one
      ~~~python
      token = secrets.token_urlsafe(32)          # 256 bits of randomness; unguessable
      sessions[token] = Session(user_id=user.id, role=user.role, expires=now() + timedelta(hours=24))
      return {"token": token}
      ~~~
      The client sends it on every call (§x-auth-token: …§ or §Authorization: Bearer …§). The server checks expiry and looks up the user.

      ## Where sessions live — the trade-offs
      | Store | Restart | Several instances | Revoke |
      |---|---|---|---|
      | Process memory | everyone signed out | broken (each instance has its own) | instant |
      | Database / Redis | survives | works | instant |
      | Signed token (JWT) | survives | works | hard until expiry |
      Sessions kept in memory are fine while the app is pinned to one instance — and are the reason a deploy signs everyone out. Moving them to the database fixes that, and is also what allows more than one instance.

      ## Header vs cookie
      A token in JavaScript-readable storage sent as a header is exposed to XSS; an HttpOnly cookie isn't, but needs CSRF protection. Either works when paired with its defence.

      ## Expiry without losing work
      When a session expires mid-task, ask for the password in a small dialog and retry the failed request, instead of dumping the user on the login page.
    `,
  }),

  entry('audit-trails', 'concept', BACK, 'curious', 'Audit Trails', {
    summary: 'A permanent record of who did what, when, from where: sign-ins, pages opened, data requested, exports, blocked attempts. The basis for accountability, investigations and spotting unusual behaviour.',
    aliases: ['audit trail', 'audit trails', 'audit log', 'audit logs', 'activity log', 'anomaly flags'],
    tags: ['security', 'operations'],
    body: doc`
      ## What to record
      ~~~sql
      CREATE TABLE audit_logs (
        ts timestamptz NOT NULL DEFAULT now(),
        user_email text, role text,
        kind text NOT NULL,            -- signin, signin_failed, page, request, export, blocked
        method text, path text, query text, status int,
        company_id bigint, ip inet, user_agent text, duration_ms int
      );
      CREATE INDEX ON audit_logs (user_email, ts DESC);
      ~~~
      Leave out noisy polling calls; keep everything that touches data.

      ## Turning logs into signals
      Summaries per user per period — requests, pages, distinct records opened, exports, blocked attempts, distinct IP addresses — with **flags** for patterns like opening companies unusually fast, very many list requests an hour, repeated blocked attempts, or several IP addresses. Review flagged users weekly.

      ## Audit logs vs application logs
      Application logs help engineers debug and are rotated away; audit logs answer "who accessed this?" months later and are part of the product. Keep them in the database (or an append-only store), make them read-only to everyone but a small admin group, and decide a retention period.

      ## Privacy
      An audit trail is itself personal data about your users. Tell them it exists, collect what the purpose needs, and restrict who can read it.
    `,
  }),

  entry('leak-deterrents', 'concept', BACK, 'curious', 'Deterring Data Leaks in the Browser', {
    summary: 'Watermarks with the viewer’s name, blocked copy/print, short pages and no downloads make bulk copying slow and every copy attributable — but a browser can never stop a phone camera. Deterrence plus audit, not prevention.',
    aliases: ['data leak', 'data leaks', 'watermark', 'watermarking', 'DLP', 'copy protection'],
    tags: ['security'],
    body: doc`
      ## What a strict view-only mode can do
      - A **watermark** across every page with the user's email and the time.
      - **Copy, print, right-click and drag** disabled; attempts are recorded.
      - The page **blanks when the window loses focus** (common screenshot tools steal focus).
      - **25 rows per page**; no export or download endpoints at all for the role.
      - **Every page and request audited**, with flags for unusual volume.

      ## What it can't do
      Stop an operating-system screenshot, a screen recorder, a phone camera, or someone reading and typing. Anything shown on a screen can leave the building.

      ## So the design goal is different
      - **Make bulk extraction slow** (small pages, no downloads) so it shows up as abnormal volume.
      - **Make every copy attributable** (the watermark ties an image to a person and a time).
      - **Make people aware** they're watermarked and audited — much of the effect is deterrence.
      - **Enforce the real limits on the server** (roles, page caps, rate limits). Client-side tricks are bypassable by anyone who opens DevTools.

      ## Proportion
      These controls cost usability. Use them where the data is genuinely valuable (a curated prospect list is), and keep ordinary roles friction-free.
    `,
  }),

  entry('invite-reset-links', 'concept', BACK, 'curious', 'Invite and Password-Reset Links', {
    summary: 'Never email passwords. Email a single-use link with a random token that expires — 48 hours for an invite, 2 hours for a reset — and store only a hash of the token.',
    aliases: ['password reset', 'password reset link', 'invite link', 'invite links', 'one-time link', 'magic link'],
    tags: ['security', 'auth'],
    body: doc`
      ## The flow
      1. Admin adds a user (or a CSV of employees) and ticks "email them a link".
      2. Server makes a token: §secrets.token_urlsafe(32)§. Stores **sha256(token)**, the user, the purpose, and an expiry.
      3. Email: §https://app.example/set-password?token=…§.
      4. The user opens it, chooses a password; the server hashes the password, marks the token used, and signs them in.

      ## The rules
      - **Single use**: a used token is dead.
      - **Short-lived**: an invite for a day or two, a reset for an hour or two.
      - **Newest wins**: sending a new link cancels older ones.
      - **Hash the token at rest**, like a password — a database leak shouldn't hand out working links.
      - **Don't reveal whether an email exists** on "forgot password" ("If that address has an account, we've sent a link").
      - Links travel in URLs: keep them out of logs and analytics, and use HTTPS.

      ## When email isn't available
      A fallback of generated passwords in a "credentials file" works, but handle it like cash: hand it out in person, delete it, and make users change the password on first sign-in.
    `,
  }),

  entry('transactional-email', 'concept', BACK, 'curious', 'Sending Email from an App', {
    summary: 'Invites, resets and alerts go through a transactional email service or SMTP. Getting delivered — not landing in spam — depends on your domain’s SPF, DKIM and DMARC records.',
    aliases: ['transactional email', 'SMTP', 'SPF', 'DKIM', 'DMARC', 'email deliverability'],
    tags: ['operations'],
    body: doc`
      ## Options
      - A **transactional email API** (SendGrid, Postmark, Amazon SES, Resend, Mailgun…): an HTTPS call per email, with logs and bounce handling.
      - **SMTP** through your organisation's mail server (Google Workspace, Microsoft 365, Zoho Mail) — fine for low volume internal tools.

      ## Deliverability, in three DNS records
      - **SPF**: which servers may send mail for your domain.
      - **DKIM**: a signature on each message proving it came from your domain unaltered.
      - **DMARC**: what receivers should do with mail that fails the first two, and where to send reports.
      Without them, invites from §noreply@yourdomain§ go to spam — or nowhere.

      ## Practicalities
      - Send from a subdomain dedicated to app mail.
      - Plain, short emails with one clear link work best for invites and resets.
      - Queue sends in the background; retry transient failures; log the provider's message id.
      - In development, use a catcher (Mailpit) so nobody gets test emails.
    `,
  }),

  entry('least-privilege', 'concept', BACK, 'curious', 'Least Privilege', {
    summary: 'Give every user, service account, API key and database login only the access its job needs. When something is compromised or buggy, the damage stops at that boundary.',
    aliases: ['least privilege', 'principle of least privilege', 'read-only database user', 'read-only scopes', 'blast radius'],
    tags: ['security'],
    body: doc`
      ## Where it shows up in a typical internal tool
      - **User roles**: view-only and read-only accounts can't change data or (for viewers) download it.
      - **Integrations**: request only read scopes from a CRM, so it *can't* be written to, whatever the code does.
      - **Platforms that forbid automation**: no automation at all.
      - **Cloud identity**: the app's service account holds Cloud SQL client and storage access, plus the right to launch the worker job — not project owner.
      - **Question-to-SQL** (planned): model-written queries run on a **read-only database user**, so a bad query can't modify anything.

      ## Habits
      - Separate credentials per service and environment; separate keys for dev and production.
      - Prefer narrow, dedicated service accounts over the default compute account.
      - Database: an app user that can read/write its tables but not drop them; a read-only user for reports and AI features.
      - Review who has admin quarterly; remove leavers the same day.

      ## Why it matters more with AI
      An LLM agent can be tricked (prompt injection) into using whatever access it has. Scoping its tools and credentials is the defence that doesn't depend on the model behaving.
    `,
  }),

  entry('schema-at-startup', 'question', BACK, 'curious', 'Create tables at start-up, or use migrations?', {
    summary: 'Letting the app create missing tables and columns on boot ships schema changes with the code and needs no extra step. Migrations add history, reviewable changes and safe edits to existing columns. Start simple; switch before it hurts.',
    aliases: ['create_all', 'auto-migration', 'schema evolution'],
    tags: ['decisions', 'database'],
    body: doc`
      ## The start-up approach
      On start the app creates missing tables and adds columns that exist on the models but not in the database. A deploy is the schema change — nothing to forget.

      ## What that can't do
      - **Rename** a column (it adds the new one; data stays in the old).
      - **Change a type**, add a NOT NULL to a filled column, split a table, backfill data.
      - **Remove** anything.
      - Show a reviewer exactly what will change in production.
      - Coordinate two app versions running at once during a deploy.

      ## Migrations (Alembic)
      A numbered, reviewed script per change, with upgrade and downgrade, run as a deploy step. Handles all of the above, keeps a history, and makes staging and production provably identical.

      ## A reasonable path
      Keep auto-create while the schema is young and additive. Introduce Alembic at the first change auto-create can't express — generate an initial migration from the current database, then make every later change a migration. Either way, back up before risky changes (automated database backups and documents kept in object storage are the usual safety nets).
    `,
  }),
];
