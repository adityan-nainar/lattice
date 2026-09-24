// Flask & Python Backend: the server half of the app.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { BACK } = AREA;

export const BACK_ENTRIES = [
  entry('virtual-environments', 'concept', BACK, 'curious', 'Virtual Environments, pip and uv', {
    summary: 'Each Python project gets its own isolated set of packages, so one project’s Flask version can’t break another’s. uv makes creating and syncing them fast.',
    aliases: ['virtual environment', 'virtualenv', 'venv', 'pip', 'uv sync', 'uv run', 'requirements.txt', 'pyproject.toml'],
    tags: ['tooling', 'python'],
    body: doc`
      ## The problem
      Install everything globally and project A needs SQLAlchemy 1.4 while project B needs 2.0. A **virtual environment** is a folder with its own Python and its own packages; activate it and §pip install§ goes there.

      ## Classic
      ~~~bash
      python -m venv .venv
      .venv\Scripts\activate          # Windows  (source .venv/bin/activate on Mac/Linux)
      pip install flask sqlalchemy psycopg[binary]
      pip freeze > requirements.txt
      ~~~

      ## uv (the modern default)
      ~~~bash
      uv init backend && cd backend
      uv add flask sqlalchemy "psycopg[binary]" anthropic
      uv run flask --app app run --debug
      ~~~
      §uv add§ records the dependency in §pyproject.toml§ and pins exact versions in §uv.lock§; §uv sync§ recreates the environment anywhere; §uv run§ uses it without activating. It's written in Rust and is 10–100× faster than pip.

      ## Rules
      - Add §.venv/§ to §.gitignore§; commit §pyproject.toml§ and the lockfile.
      - If §import flask§ fails but you "installed it", you installed into a different Python. Check §which python§ (or §where python§ on Windows) and whether the venv is active — VS Code's bottom-right interpreter picker is the usual culprit.
      - Same idea as §package.json§ + §node_modules§ on the JavaScript side.
    `,
  }),

  entry('python-decorators', 'concept', BACK, 'curious', 'Python Decorators', {
    summary: 'A decorator wraps a function in another function. @app.route registers a view; @login_required checks auth first. Just syntax for f = decorator(f).',
    aliases: ['decorator', 'decorators', 'functools.wraps', '@decorator'],
    tags: ['python', 'language'],
    body: doc`
      ## What §@§ means
      ~~~python
      @timed
      def summarize(text): ...

      # is exactly
      def summarize(text): ...
      summarize = timed(summarize)
      ~~~

      ## Writing one
      ~~~python
      import functools, time

      def timed(fn):
          @functools.wraps(fn)                  # keep the name and docstring
          def wrapper(*args, **kwargs):
              start = time.perf_counter()
              try:
                  return fn(*args, **kwargs)
              finally:
                  print(f"{fn.__name__} took {time.perf_counter() - start:.3f}s")
          return wrapper
      ~~~

      ## Where you meet them in Flask
      ~~~python
      @app.post("/api/notes")        # registers the function as the handler for this URL
      @login_required                # runs first: rejects anonymous users
      def create_note(): ...
      ~~~
      Order matters: decorators apply bottom-up, so §login_required§ wraps §create_note§, and the route registers the wrapped version. Put the route decorator on top.

      Without §functools.wraps§, every wrapped view is called §wrapper§ — and Flask complains that two endpoints share the name.

      They're also how §@beta_tool§ in the Anthropic SDK turns a plain function into a tool an LLM can call, reading its type hints and docstring.
    `,
  }),

  entry('python-type-hints', 'concept', BACK, 'curious', 'Type Hints', {
    summary: 'Optional annotations on Python variables and functions. Python ignores them at runtime; editors, mypy and libraries like Pydantic read them.',
    aliases: ['type hints', 'type hint', 'mypy', 'typing module', 'dataclass', 'dataclasses'],
    tags: ['python', 'language'],
    body: doc`
      ~~~python
      from dataclasses import dataclass

      @dataclass
      class Chunk:
          doc_id: int
          text: str
          embedding: list[float] | None = None

      def top_k(query: list[float], chunks: list[Chunk], k: int = 5) -> list[Chunk]:
          ...
      ~~~

      ## What they buy you
      - Your editor knows what §chunk.§ offers and flags §chunk.txt§.
      - **mypy** (or pyright) checks the whole project: "§top_k§ expects §int§, got §str§".
      - Libraries *use* them at runtime: **Pydantic** validates data against them, SQLAlchemy 2.0 builds columns from §Mapped[int]§, the Anthropic SDK builds tool schemas from them.

      ## What they don't do
      Python itself never checks them. §top_k(q, chunks, k="five")§ runs until something breaks. They're documentation that a tool can verify — the same bargain as TypeScript, minus the compiler.

      ## Worth knowing
      - §X | None§ for "may be None" (Python 3.10+; older code writes §Optional[X]§).
      - §list[str]§, §dict[str, int]§ are built in (3.9+).
      - §TypedDict§ describes a dict with known keys — handy for JSON.
    `,
  }),

  entry('python-generators', 'concept', BACK, 'curious', 'Generators and yield', {
    summary: 'A function with yield produces values one at a time, pausing in between. How Python streams: LLM tokens, big files, database rows, Server-Sent Events.',
    aliases: ['generator', 'generators', 'yield', 'iterator', 'lazy evaluation'],
    tags: ['python', 'language', 'streaming'],
    body: doc`
      ~~~python
      def read_chunks(path, size=1000):
          with open(path, encoding="utf-8") as f:
              while block := f.read(size):
                  yield block             # hand one piece back, pause here

      for block in read_chunks("book.txt"):
          embed(block)                    # never holds the whole book in memory
      ~~~

      ## How it runs
      Calling §read_chunks()§ runs *nothing* — it returns a generator object. Each time the §for§ loop asks for the next value, the function runs until the next §yield§ and freezes, locals intact. When it returns, the loop ends.

      ## Why it matters in a backend
      - **Streaming responses.** Flask sends each yielded string to the client as soon as it's produced — the basis of streaming LLM output.
      - **Memory.** Process a million rows without a million-item list.
      - **Pipelines.** §(clean(x) for x in rows)§ is a generator expression; chain several and data flows through one item at a time.

      ~~~python
      def sse(stream):
          for text in stream.text_stream:        # tokens arriving from the LLM
              yield f"data: {json.dumps({'delta': text})}\n\n"
          yield "data: [DONE]\n\n"
      ~~~
    `,
  }),

  entry('flask', 'concept', BACK, 'curious', 'Flask', {
    summary: 'A small Python web framework: map URLs to functions, read requests, return responses. Everything else — database, auth, validation — you pick and add.',
    aliases: ['Flask', 'microframework', 'flask run', 'Werkzeug'],
    tags: ['framework', 'foundations'],
    year: 2010,
    body: doc`
      ## A complete API
      ~~~python
      # app.py
      from flask import Flask, jsonify, request

      app = Flask(__name__)
      NOTES = {}

      @app.get("/api/notes")
      def list_notes():
          return jsonify(list(NOTES.values()))

      @app.post("/api/notes")
      def create_note():
          data = request.get_json()
          note = {"id": len(NOTES) + 1, "title": data["title"]}
          NOTES[note["id"]] = note
          return note, 201           # a dict is turned into JSON automatically
      ~~~
      ~~~bash
      flask --app app run --debug     # http://127.0.0.1:5000, reloads on save
      ~~~

      ## "Micro" means you choose
      Flask gives you routing, request/response objects, sessions, templates (Jinja) and a dev server. You add:
      - a database layer — SQLAlchemy (plus Flask-SQLAlchemy) or plain psycopg;
      - migrations — Alembic / Flask-Migrate;
      - auth — Flask-Login, or JWTs;
      - validation — Pydantic or marshmallow;
      - CORS — flask-cors, if you can't avoid cross-origin.

      ## For a React frontend
      Flask serves JSON under §/api§; React renders. In production Flask (or nginx) can also serve Vite's built §dist/§ folder so everything lives on one origin.

      ## Rules
      - §--debug§ only in development. The debugger lets anyone who can reach the page run Python on your server.
      - The built-in server is for development; production runs under Gunicorn.
      - Current release: 3.1 (3.1.3, February 2026). Built on Werkzeug (HTTP) and Jinja (templates), both by the same Pallets team.
    `,
  }),

  entry('flask-routes', 'concept', BACK, 'curious', 'Routes and Views', {
    summary: 'A route maps a URL pattern and method to a Python function (a view). Converters like <int:id> pull typed values out of the path.',
    aliases: ['Flask routes', 'Flask route', 'view function', '@app.route', 'url_for', 'URL converter'],
    tags: ['flask', 'api'],
    body: doc`
      ~~~python
      @app.get("/api/notes/<int:note_id>")
      def get_note(note_id: int):
          note = db.session.get(Note, note_id)
          if note is None or note.owner_id != current_user.id:
              abort(404)
          return note.to_dict()

      @app.route("/api/notes/<int:note_id>", methods=["PATCH", "DELETE"])
      def change_note(note_id: int): ...
      ~~~

      ## Converters
      §<note_id>§ is a string; §<int:note_id>§ only matches digits and hands you an §int§ (so §/api/notes/abc§ is a 404, not a crash). Also §float§, §path§ (allows slashes), §uuid§.

      ## What a view can return
      - a §dict§ or §list§ → JSON;
      - a string → HTML/text;
      - a tuple §(body, status)§ or §(body, status, headers)§;
      - a §Response§ object — for streaming, files, cookies.

      ## Mind the details
      - A route with a trailing slash (§/notes/§) redirects §/notes§ to it; without one, §/notes/§ is a 404. Pick one style.
      - Same URL, wrong method → **405**. Listing methods (or using §@app.get§ / §@app.post§) is how Flask knows.
      - §flask --app app routes§ prints every registered route — the fastest way to find why something 404s.
      - Return 404 rather than 403 for other users' records, so you don't reveal they exist.
    `,
  }),

  entry('flask-request-response', 'concept', BACK, 'curious', 'Request, Response and Context', {
    summary: 'Inside a view, request holds what the client sent — JSON, query string, headers, cookies. Flask makes it available through context-local globals.',
    aliases: ['request object', 'request.get_json', 'jsonify', 'request context', 'application context', 'flask.g', 'current_app'],
    tags: ['flask'],
    body: doc`
      ## Reading the request
      ~~~python
      from flask import request

      data  = request.get_json()               # parsed JSON body (400 if it's not JSON)
      q     = request.args.get("q", "")        # ?q=...
      page  = request.args.get("page", 1, type=int)
      token = request.headers.get("Authorization")
      file  = request.files.get("upload")      # multipart form uploads
      ~~~

      ## Building a response
      ~~~python
      from flask import jsonify, make_response

      return {"id": note.id}, 201                        # simplest
      resp = make_response(jsonify(ok=True))
      resp.set_cookie("theme", "dark", samesite="Lax")
      return resp
      ~~~

      ## "How is request a global?"
      It isn't really — §request§, §g§ and §current_app§ are *context locals*. Flask pushes a context for each request, and these names point at whatever belongs to the request being handled on this thread. That's how two simultaneous requests each see their own §request§.

      - §g§ — scratch space for one request (the current user, a DB connection).
      - §current_app§ — the app object, for config (§current_app.config["LLM_MODEL"]§) without importing §app§ (avoids circular imports).

      ## The error you'll see
      "Working outside of application context" — you touched §current_app§ or the database from a script or thread with no request. Wrap it in §with app.app_context():§. For streaming generators that need §request§, use §stream_with_context§.
    `,
  }),

  entry('flask-app-factory', 'concept', BACK, 'curious', 'App Factory and Blueprints', {
    summary: 'Create the Flask app inside a function and split routes into blueprints by feature. Makes tests, config and a growing codebase manageable.',
    aliases: ['app factory', 'application factory', 'create_app', 'blueprint', 'blueprints'],
    tags: ['flask', 'architecture'],
    body: doc`
      ## Why a factory
      A module-level §app = Flask(__name__)§ is created once, at import, with one config. Tests want an app with a throwaway database; production wants another. A factory makes one on demand:
      ~~~python
      # backend/app/__init__.py
      from flask import Flask
      from .db import db
      from .notes import bp as notes_bp
      from .chat import bp as chat_bp

      def create_app(config: dict | None = None):
          app = Flask(__name__)
          app.config.from_prefixed_env()          # FLASK_DATABASE_URL -> app.config["DATABASE_URL"]
          app.config.update(config or {})
          db.init_app(app)
          app.register_blueprint(notes_bp, url_prefix="/api/notes")
          app.register_blueprint(chat_bp, url_prefix="/api/chat")
          return app
      ~~~
      ~~~bash
      flask --app "app:create_app()" run --debug
      ~~~

      ## Blueprints
      A blueprint is a bundle of routes to register later:
      ~~~python
      # backend/app/notes.py
      from flask import Blueprint
      bp = Blueprint("notes", __name__)

      @bp.get("/")
      def list_notes(): ...
      ~~~
      Split by *feature* (notes, chat, auth), not by kind (all models here, all routes there). Each file then reads as one coherent thing.

      ## Extensions follow the same pattern
      §db = SQLAlchemy()§ at module level, §db.init_app(app)§ inside the factory. No circular imports, and each test gets its own app.
    `,
  }),

  entry('wsgi-gunicorn', 'equation', BACK, 'curious', 'WSGI and Gunicorn', {
    summary: 'WSGI is the contract between Python web apps and servers. Gunicorn runs several worker processes of your Flask app — and each sync worker handles one request at a time.',
    aliases: ['WSGI', 'Gunicorn', 'worker processes', 'gthread', 'gevent'],
    tags: ['deployment', 'performance'],
    latex: doc`\text{max throughput} \approx \frac{\text{workers} \times \text{threads}}{\text{average request time}}`,
    variables: [
      [doc`\text{workers}`, 'Gunicorn worker processes; a common start is 2 × CPU cores + 1'],
      [doc`\text{threads}`, 'Threads per worker (1 for the default sync worker)'],
    ],
    body: doc`
      ## Running Flask for real
      ~~~bash
      gunicorn "app:create_app()" --workers 5 --threads 4 --bind 0.0.0.0:8000 --timeout 120
      ~~~
      **WSGI** says: a web server calls your app as a function with the request, and gets back a response. Gunicorn is that server — it forks several copies of your app so a crash or slow request in one doesn't stop the rest. (Windows can't run Gunicorn; use Waitress, WSL, or Docker.)

      ## The LLM trap
      A sync worker handles one request at a time. A normal API call takes 50 ms, so 5 workers serve ~100 requests/s. A streamed LLM reply takes **20 s** — and holds its worker the whole time. Five people chatting at once and your whole site stops answering, even the login page.

      Fixes:
      - **threads** (§--threads 8§, the gthread worker): waiting on the network releases Python's GIL, so threads overlap I/O well;
      - **gevent** workers: thousands of cheap green threads;
      - or an **ASGI** app (FastAPI / Quart under Uvicorn) with §async§ LLM calls.
      Also raise §--timeout§ — the default 30 s kills long generations mid-sentence.

      ## Little's law in disguise
      Concurrent requests = arrival rate × time each takes. Slots you have = workers × threads. When arrivals × duration exceeds slots, requests queue.
    `,
    calc: {
      inputs: [
        input('cores', 'CPU cores', '', 2, 1, 64, INT),
        input('threads', 'Threads per worker', '', 1, 1, 64, { ...INT, ...LOG }),
        input('ms', 'Average request time', 'ms', 20000, 5, 120000, LOG),
      ],
      outputs: [
        out('Workers (2 × cores + 1)', '', '2*cores + 1', { key: 'workers' }),
        out('Requests in flight at once', '', 'workers*threads', { key: 'slots' }),
        out('Max throughput', 'requests/s', 'slots/(ms/1000)', { digits: 3 }),
        out('Max throughput', 'requests/min', 'slots/(ms/1000)*60', { digits: 3 }),
      ],
      note: 'Default is a 20-second streamed LLM reply on a 2-core box: 5 users and you are full. Set 50 ms for a normal API call, then try 8 threads.',
    },
  }),

  entry('calling-http-apis', 'concept', BACK, 'curious', 'Calling HTTP APIs from Python', {
    summary: 'requests or httpx to talk to other services from your server. Always set a timeout, retry transient failures with backoff, and keep keys in environment variables.',
    aliases: ['requests library', 'httpx', 'timeout', 'timeouts', 'retry with backoff', 'exponential backoff'],
    tags: ['python', 'api', 'reliability'],
    body: doc`
      ~~~python
      import os, httpx

      client = httpx.Client(
          base_url="https://api.example.com",
          headers={"Authorization": f"Bearer {os.environ['EXAMPLE_API_KEY']}"},
          timeout=httpx.Timeout(30.0, connect=5.0),
      )

      resp = client.get("/v1/things", params={"q": "attention"})
      resp.raise_for_status()               # 4xx/5xx -> exception instead of silent bad data
      things = resp.json()
      ~~~

      ## Four habits
      1. **Timeouts, always.** §requests.get(url)§ with no timeout can hang *forever*, pinning a Gunicorn worker.
      2. **Retry only what's transient** — connection errors, 429, 500–504 — with exponential backoff and jitter (wait 1 s, 2 s, 4 s ± random), and honour a §Retry-After§ header. Don't retry a 400: it'll fail the same way.
      3. **Reuse a client** (§httpx.Client§ / §requests.Session§) so connections and TLS handshakes are reused.
      4. **Keys from the environment**, never in code.

      ## Prefer the official SDK when there is one
      LLM providers' Python SDKs already do timeouts, retries with backoff on 429/5xx, streaming and typed responses. The Anthropic SDK retries twice by default. Hand-rolled HTTP for them is more code and more bugs.

      ## httpx or requests?
      Same API style. httpx also does §async§ (§httpx.AsyncClient§) and HTTP/2; requests is older and everywhere. Either is fine in Flask.
    `,
  }),

  entry('sqlalchemy', 'concept', BACK, 'curious', 'SQLAlchemy and ORMs', {
    summary: 'An ORM maps tables to Python classes and rows to objects, and writes the SQL for you. SQLAlchemy is Python’s standard one — and lets you drop to raw SQL anytime.',
    aliases: ['SQLAlchemy', 'ORM', 'object-relational mapper', 'Flask-SQLAlchemy', 'db.session', 'SQLAlchemy session'],
    tags: ['database', 'python'],
    body: doc`
      ## Models (SQLAlchemy 2.0 style)
      ~~~python
      from datetime import datetime
      from sqlalchemy import ForeignKey, String, func
      from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

      class Base(DeclarativeBase): pass

      class Note(Base):
          __tablename__ = "notes"
          id: Mapped[int] = mapped_column(primary_key=True)
          owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
          title: Mapped[str] = mapped_column(String(200))
          body: Mapped[str] = mapped_column(default="")
          created_at: Mapped[datetime] = mapped_column(server_default=func.now())
          owner: Mapped["User"] = relationship(back_populates="notes")
      ~~~

      ## Queries
      ~~~python
      from sqlalchemy import select

      stmt = (select(Note)
              .where(Note.owner_id == user.id, Note.title.ilike(f"%{q}%"))
              .order_by(Note.created_at.desc())
              .limit(20))
      notes = session.scalars(stmt).all()

      session.add(Note(owner_id=user.id, title="Attention"))
      session.commit()
      ~~~
      Values are always sent as bound parameters, so §q§ can't inject SQL.

      ## The session
      A **unit of work**: objects you add or change are tracked and written in one transaction on §commit()§. One session per request (Flask-SQLAlchemy's §db.session§ does this), always committed or rolled back.

      ## ORM or raw SQL?
      ORM for everyday CRUD, relationships and migrations; raw SQL (§session.execute(text("…"), params)§ or psycopg) for gnarly reports, window functions and pgvector queries. You know SQL — keep §echo=True§ on in development to watch what the ORM sends, and look out for the N+1 problem.
    `,
  }),

  entry('authentication', 'concept', BACK, 'curious', 'Authentication: Sessions or Tokens?', {
    summary: 'Proving who a user is, then remembering it across requests. Server sessions in an HttpOnly cookie suit a React app on the same site; tokens suit mobile apps and APIs.',
    aliases: ['authentication', 'authorization', 'auth', 'login', 'Flask-Login', 'session-based auth', 'token-based auth'],
    tags: ['security', 'auth'],
    body: doc`
      ## Two different questions
      - **Authentication** (authn): *who are you?* — password, Google sign-in, magic link.
      - **Authorization** (authz): *what may you do?* — is this note yours, are you an admin. The OWASP #1 bug lives here.

      ## Remembering the login
      **Server session + cookie.** After login, the server stores §{session_id → user_id}§ (in Postgres, Redis, or a signed cookie) and sets an HttpOnly cookie. Each request sends it; the server looks it up.
      - ✓ Logout and "revoke all sessions" are instant. ✓ JavaScript can't read the cookie.
      - Needs CSRF care (SameSite does most of it).

      **Bearer token (often a JWT).** Server signs a token; the client stores it and sends §Authorization: Bearer …§.
      - ✓ Works for mobile apps, other servers, multiple domains. ✓ Stateless verification.
      - Hard to revoke before expiry; if stored in §localStorage§, any XSS can steal it.

      ## A sensible default for React + Flask on one domain
      Flask-Login (or Flask's session) with a secure cookie, §SameSite=Lax§, §HttpOnly§, §Secure§. Endpoints check §current_user§; every query filters by owner.

      ## Or don't build it
      Passwords mean hashing, resets, email, lockouts, maybe 2FA. **Sign in with Google/GitHub** (OAuth) or a hosted provider (Clerk, Auth0, Supabase Auth, Firebase) takes that off your plate. For a side project that will have real users, that's often the right call.
    `,
  }),

  entry('oauth', 'concept', BACK, 'curious', 'OAuth and “Sign in with Google”', {
    summary: 'OAuth lets a user grant your app limited access without giving you their password. OpenID Connect adds “and here’s who they are” — the basis of social login.',
    aliases: ['OAuth', 'OAuth 2.0', 'OpenID Connect', 'OIDC', 'social login', 'Sign in with Google', 'SSO'],
    tags: ['security', 'auth'],
    year: 2012,
    body: doc`
      ## The dance (authorization code flow)
      1. User clicks "Sign in with Google". You redirect them to Google with your **client id**, the **scopes** you want (§openid email profile§) and a **redirect URI**.
      2. They log in *at Google* and approve. Google redirects back to §https://yourapp.com/auth/callback?code=…§.
      3. Your **server** swaps that code, plus your **client secret**, for tokens — directly with Google, never through the browser.
      4. The **ID token** (a JWT) says who they are: a stable §sub§ id, email, name. Find or create the user, start your own session.

      ## Rules that stop real attacks
      - Send a random **state** value and check it on return (stops login CSRF). Use **PKCE** too — libraries do it for you.
      - The client secret lives on the server only.
      - Register exact redirect URIs.
      - Key users by §sub§, not email — emails can change.

      ## Don't hand-roll it
      Authlib for Flask, or a hosted auth provider, gets these details right. OAuth has many ways to be subtly wrong.

      ## Two meanings of "OAuth"
      Sign-in (OIDC: "who is this?") and delegated access ("let this app read my Google Drive"). Same machinery; the second gives you an **access token** to call Google's APIs on the user's behalf — MCP servers use this for connecting LLMs to services.
    `,
  }),

  entry('jwt', 'concept', BACK, 'curious', 'JSON Web Tokens (JWT)', {
    summary: 'A signed, base64-encoded JSON payload: anyone can read it, only the issuer can make one. Good for stateless auth between services; awkward to revoke.',
    aliases: ['JWT', 'JWTs', 'JSON Web Token', 'access token', 'refresh token', 'bearer token'],
    tags: ['security', 'auth'],
    year: 2015,
    body: doc`
      ## Anatomy
      ~~~text
      eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsImV4cCI6MTc5MDAwMDAwMH0.4Xy…
      └──── header ─────┘ └──────────── payload ────────────┘ └ signature ┘
      ~~~
      Three base64url parts. Decoded, the payload is plain JSON: §{"sub": "42", "exp": 1790000000}§. The signature is an HMAC (or RSA/ECDSA) over the first two parts with the server's key — change one character of the payload and verification fails.

      ## Signed, not secret
      Paste any JWT into jwt.io and read it. **Never put secrets or private data in the payload.**

      ## Verifying (PyJWT)
      ~~~python
      import jwt
      claims = jwt.decode(token, SECRET, algorithms=["HS256"])  # checks signature and exp
      ~~~
      Always pass §algorithms§ explicitly — early libraries accepted §"alg": "none"§ and forged tokens sailed through.

      ## The revocation problem
      Verification needs no database lookup — the selling point. But a stolen token stays valid until §exp§. The usual compromise: short-lived **access tokens** (5–15 minutes) plus a long-lived **refresh token** that *is* checked against the database. At which point you've rebuilt sessions with extra steps — which is why a plain session cookie is often simpler for a single web app.

      Where JWTs shine: service-to-service calls, OAuth ID tokens, APIs used by mobile apps.
    `,
  }),

  entry('password-hashing', 'equation', BACK, 'curious', 'Password Hashing', {
    summary: 'Store a slow, salted hash of each password — never the password, never a fast hash. bcrypt or Argon2 make each guess cost milliseconds instead of nanoseconds.',
    aliases: ['password hashing', 'bcrypt', 'Argon2', 'PBKDF2', 'scrypt', 'salt', 'salting', 'password entropy', 'brute force'],
    tags: ['security', 'auth'],
    latex: doc`t_{\text{crack}} \approx \frac{N^{L}}{2\,R}`,
    variables: [
      ['N', 'Characters to choose from (26 lowercase, 62 letters+digits, ~95 printable)'],
      ['L', 'Password length'],
      ['R', 'Guesses per second the attacker can make'],
    ],
    body: doc`
      ## Why hash at all
      Databases leak — backups, SQL injection, a misconfigured bucket. If passwords are stored as-is, every user's email+password is compromised on every other site they reuse it on.

      ## Why *slow*
      SHA-256 is built to be fast: one gaming GPU tries ~10¹⁰ per second. bcrypt at cost 12 manages roughly 10³ per second on the same GPU. That factor of ten million is the entire defence.

      ## Why *salted*
      A random salt per user means identical passwords get different hashes, so one precomputed table ("rainbow table") can't crack everyone at once. bcrypt and Argon2 salt automatically.

      ## In Python
      ~~~python
      from argon2 import PasswordHasher          # pip install argon2-cffi
      ph = PasswordHasher()
      stored = ph.hash("correct horse battery staple")
      ph.verify(stored, attempt)                 # raises if wrong
      ~~~
      Or Werkzeug's §generate_password_hash§ / §check_password_hash§ (scrypt by default), which Flask already ships.

      ## PBKDF2
      Another slow, salted scheme, built from many rounds of HMAC-SHA256 and available in Python's standard library (§hashlib.pbkdf2_hmac§). Its strength is its iteration count: OWASP's current guidance for PBKDF2-HMAC-SHA256 is **600,000** iterations. Older setups often use 100,000 rounds or fewer — sound in design; the round count is a single constant to raise, re-hashing each password at the user's next successful login.

      ## Length beats cleverness
      Each extra character multiplies the search by $N$. A 12-letter lowercase passphrase ($26^{12} \approx 10^{17}$) beats an 8-character "P@ssw0rd!"-style password ($95^8 \approx 7\times10^{15}$) — and real attackers try dictionary words and leaked-password lists first, so both are weaker than the maths says.
    `,
    calc: {
      inputs: [
        input('N', 'Character set size', '', 62, 10, 95, INT),
        input('L', 'Password length', 'characters', 10, 4, 24, INT),
        input('fast', 'Fast hash (SHA-256) guesses per second', '/s', 1e10, 1e6, 1e12, LOG),
        input('cost', 'bcrypt cost factor', '', 12, 4, 16, INT),
        input('slow10', 'bcrypt guesses/s at cost 10', '/s', 5000, 100, 1e6, LOG),
      ],
      outputs: [
        out('Possible passwords', '', 'N^L', { key: 'space' }),
        out('Entropy', 'bits', 'L*log2(N)', { digits: 3 }),
        out('bcrypt guesses/s at this cost', '/s', 'slow10/2^(cost - 10)', { key: 'slow' }),
        out('Average time to crack, fast hash', 'years', 'space/2/fast/yr', { digits: 3 }),
        out('Average time to crack, bcrypt', 'years', 'space/2/slow/yr', { digits: 3 }),
        out('Server time per login at this cost', 'ms', '60*2^(cost - 10)', { digits: 3 }),
      ],
      note: 'Each +1 on the bcrypt cost doubles the work for you and the attacker. Guess rates are rough single-GPU figures; real attackers use many GPUs and wordlists.',
    },
  }),

  entry('input-validation', 'concept', BACK, 'curious', 'Validating Input with Pydantic', {
    summary: 'Check every request body against a schema before using it: right fields, right types, sane sizes. Pydantic turns type hints into a validator.',
    aliases: ['Pydantic', 'input validation', 'validation', 'schema validation', 'BaseModel', 'marshmallow'],
    tags: ['python', 'security', 'api'],
    body: doc`
      ~~~python
      from pydantic import BaseModel, Field, ValidationError

      class NoteIn(BaseModel):
          title: str = Field(min_length=1, max_length=200)
          body: str = Field(default="", max_length=50_000)
          tags: list[str] = Field(default_factory=list, max_length=20)

      @bp.post("/")
      def create_note():
          try:
              data = NoteIn.model_validate(request.get_json())
          except ValidationError as e:
              return {"error": "invalid", "detail": e.errors()}, 422
          note = Note(owner_id=current_user.id, **data.model_dump())
          ...
      ~~~

      ## Why every endpoint
      - §request.get_json()["title"]§ throws a 500 when the field is missing — and a 500 tells you nothing.
      - Unbounded strings: someone posts a 50 MB "title", or pastes a novel into your LLM endpoint and you pay for 2 million tokens. **Limit sizes**, especially on anything forwarded to a model.
      - Mass assignment: §Note(**request.json)§ lets a user set §owner_id§ or §is_admin§. A schema only lets through the fields you list.

      ## Output too
      A response model (§NoteOut§) keeps you from accidentally returning §password_hash§ with the user.

      ## Same library, LLM side
      Pydantic models double as JSON schemas for structured output: the Anthropic SDK's §messages.parse(..., output_format=NoteIn)§ returns a validated object. One schema checks both what users send and what models send.
    `,
  }),

  entry('flask-errors', 'concept', BACK, 'curious', 'Errors, Error Handlers and Debug Mode', {
    summary: 'Turn exceptions into clean JSON errors with the right status code, log the real cause server-side, and never run the debugger in production.',
    aliases: ['error handler', 'errorhandler', 'abort()', 'debug mode', 'stack trace', 'traceback'],
    tags: ['flask', 'debugging', 'security'],
    body: doc`
      ## Consistent JSON errors
      ~~~python
      from werkzeug.exceptions import HTTPException

      @app.errorhandler(HTTPException)
      def http_error(e):
          return {"error": e.name, "detail": e.description}, e.code

      @app.errorhandler(Exception)
      def unhandled(e):
          app.logger.exception("Unhandled error")      # full traceback in the logs
          return {"error": "Internal Server Error"}, 500  # nothing internal to the client
      ~~~
      Then §abort(404)§ anywhere gives the client §{"error": "Not Found", …}§, and the React side always knows the shape to expect.

      ## Reading a traceback
      Read from the **bottom**: the last line is the exception and message; the frames above it are the call chain, newest last. Find the lowest frame in *your* code — that's usually where to look.

      ## Debug mode
      §flask run --debug§ gives auto-reload and an interactive in-browser debugger on errors. That debugger executes arbitrary Python. On a public server it's a remote shell for anyone. In production: §FLASK_DEBUG§ unset, Gunicorn instead of §flask run§, errors to logs.

      ## Errors from upstream
      When an LLM call fails, decide per case: 429 or overloaded → tell the user to retry (or retry for them); 400 → a bug in your request, log it; timeout → a 504 with a friendly message. Don't pass provider error bodies straight to the browser — they can include request details.
    `,
  }),

  entry('background-jobs', 'concept', BACK, 'curious', 'Background Jobs and Task Queues', {
    summary: 'Work that takes longer than a request should — embedding a 300-page PDF, sending email, nightly reports — goes on a queue and runs in a separate worker process.',
    aliases: ['background job', 'background jobs', 'task queue', 'job queue', 'Celery', 'Dramatiq', 'cron job'],
    tags: ['architecture', 'reliability'],
    body: doc`
      ## The pattern
      1. The request handler records the job and returns immediately: §202 Accepted§, §{"job_id": 17}§.
      2. A **worker** process picks jobs off a queue and does the work.
      3. The frontend polls §GET /api/jobs/17§ (or listens via SSE) and shows progress.

      ## Why not just do it in the request?
      - Proxies and Gunicorn time out (often 30–60 s). Embedding a big document can take minutes.
      - A slow request holds a worker, starving everyone else.
      - If the process restarts mid-way, the work is lost. A queue can retry.

      ## Options, simplest first
      - **A Postgres table as the queue**: §jobs(id, kind, payload jsonb, status, attempts, run_at)§, and a worker that claims rows with §SELECT … FOR UPDATE SKIP LOCKED§. No new infrastructure — plenty for a side project.
      - **RQ** or **Dramatiq** with Redis: small and friendly.
      - **Celery**: the heavyweight — scheduling, chains, retries, many brokers.

      ## Make jobs safe to retry
      Workers crash; jobs run twice. Design them to be **idempotent**: "set document 17's status to embedded" rather than "increment embedded count"; upsert chunks keyed by §(doc_id, chunk_no)§ rather than blindly inserting.

      ## Scheduled work
      A cron job (or the host's scheduler) that enqueues "rebuild the daily digest" at 06:00 IST covers most periodic tasks.
    `,
  }),

  entry('redis', 'concept', BACK, 'curious', 'Redis', {
    summary: 'An in-memory key–value store with data structures and expiry. Used as a cache, a job queue, a rate limiter and a session store — fast because it lives in RAM.',
    aliases: ['Redis', 'Valkey', 'key-value store', 'in-memory store'],
    tags: ['database', 'performance'],
    year: 2009,
    body: doc`
      ## What it is
      A server holding keys → values in memory: strings, lists, hashes, sets, sorted sets, streams. Operations take microseconds; each is atomic.
      ~~~python
      import redis
      r = redis.Redis.from_url(os.environ["REDIS_URL"])

      r.set("summary:doc:17", text, ex=3600)       # cache for an hour
      r.incr("ratelimit:user:42:2026-09-23T10:15") # atomic counter
      r.lpush("jobs", json.dumps(job))             # a simple queue
      ~~~

      ## Common jobs in a Flask app
      - **Cache** expensive results — an LLM summary, a slow query — keyed by their inputs, with an expiry.
      - **Rate limiting** — counters per user per minute (Flask-Limiter can use it).
      - **Queue broker** for RQ or Celery.
      - **Sessions** shared across several app servers.
      - **Pub/sub** to push events to many workers.

      ## Do you need it?
      Often not at first. Postgres can be the cache, the queue and the session store for a side project; one fewer server to run. Add Redis when you measure a need.

      ## Caveats
      Memory is the limit — set §maxmemory§ and an eviction policy. Persistence exists but it's not your system of record: anything you can't afford to lose belongs in Postgres. (After a 2024 licence change, the Linux Foundation forked it as **Valkey**; both speak the same protocol.)
    `,
  }),

  entry('flask-streaming', 'example', BACK, 'curious', 'Streaming Responses from Flask', {
    summary: 'Return a generator wrapped in a Response with text/event-stream, and Flask sends each piece as it’s produced — how LLM tokens reach the browser live.',
    aliases: ['streaming response', 'stream_with_context', 'Flask streaming'],
    tags: ['llm', 'streaming', 'walkthrough'],
    body: doc`
      ~~~python
      import json
      import anthropic
      from flask import Blueprint, Response, request, stream_with_context

      bp = Blueprint("chat", __name__)
      client = anthropic.Anthropic()     # reads ANTHROPIC_API_KEY from the environment

      @bp.post("/")
      def chat():
          messages = request.get_json()["messages"][-20:]    # cap the history you forward

          def events():
              with client.messages.stream(
                  model="claude-opus-5",
                  max_tokens=4000,
                  system="You are a helpful study assistant. Be concise.",
                  messages=messages,
              ) as stream:
                  for text in stream.text_stream:
                      yield f"data: {json.dumps({'delta': text})}\n\n"
              yield "data: [DONE]\n\n"

          return Response(
              stream_with_context(events()),
              mimetype="text/event-stream",
              headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
          )
      ~~~
      The React half is in Streaming a Chat UI. For a local model, swap the loop body for Ollama's streaming API — same generator, same SSE lines.

      ## Things that silently break streaming
      - **Buffering proxies.** nginx buffers responses by default; §X-Accel-Buffering: no§ (or §proxy_buffering off§) turns it off. Some hosting platforms and compression middleware buffer too — if tokens arrive all at once at the end, something is buffering.
      - **Timeouts.** Gunicorn's 30 s default and nginx's 60 s §proxy_read_timeout§ can cut long answers.
      - **Workers.** Each open stream occupies a sync worker for its whole duration. Use threads or gevent.
      - **Errors mid-stream.** The 200 status has already been sent, so send an error *event* (§data: {"error": …}§) and let the client show it.
      - **Client disconnects.** When the user closes the tab, stop generating — you're paying per token. The generator gets §GeneratorExit§ on the next yield; the §with§ block then closes the upstream stream.
    `,
  }),

  entry('rate-limiting', 'equation', BACK, 'curious', 'Rate Limiting', {
    summary: 'Cap how many requests a user (or IP, or API key) can make per unit time. Essential in front of anything expensive — like an endpoint that calls an LLM.',
    aliases: ['rate limit', 'rate limiting', 'rate limiter', 'token bucket', 'Flask-Limiter', 'throttling'],
    tags: ['security', 'reliability', 'cost'],
    latex: doc`\text{allowed in time } T = \min(B,\ b_0) + r\,T`,
    variables: [
      ['B', 'Bucket capacity: the biggest burst allowed'],
      [doc`b_0`, 'Tokens in the bucket at the start'],
      ['r', 'Refill rate: the sustained requests per second allowed'],
      ['T', 'Length of the time window'],
    ],
    body: doc`
      ## The token bucket
      Each user has a bucket holding up to $B$ tokens, refilled at $r$ per second. Each request takes one token; empty bucket → **429 Too Many Requests** with a §Retry-After§ header. Bursts up to $B$ are fine; the long-run average can't exceed $r$.

      ## In Flask
      ~~~python
      from flask_limiter import Limiter
      from flask_limiter.util import get_remote_address

      limiter = Limiter(get_remote_address, app=app, storage_uri=os.environ["REDIS_URL"])

      @bp.post("/api/chat")
      @limiter.limit("20 per minute;200 per day", key_func=lambda: str(current_user.id))
      def chat(): ...
      ~~~
      With several Gunicorn workers the counts must live somewhere shared (Redis, or the database) — in-memory counters are per process.

      ## Why it matters for LLM apps
      A chat endpoint without limits is an open tap on your API bill. One script looping overnight at 1 request/s with 5,000-token prompts is 432 million tokens. Limit by user, set a monthly spend cap per user, and set a hard budget alert at the provider too.

      Also protect: login (slows password guessing), sign-up, password reset (spam), and anything that sends email.
    `,
    calc: {
      inputs: [
        input('B', 'Bucket capacity (burst)', 'requests', 20, 1, 1000, LOG),
        input('r', 'Refill rate', 'requests/min', 10, 0.1, 1000, LOG),
        input('T', 'Time window', 'min', 60, 1, 1440, LOG),
        input('tok', 'Tokens per LLM request', 'tokens', 3000, 100, 200000, LOG),
        input('price', 'Blended price', 'USD per million tokens', 5, 0.05, 100, LOG),
      ],
      outputs: [
        out('Max requests in the window', '', 'B + r*T', { key: 'n' }),
        out('Time to refill an empty bucket', 'min', 'B/r', { digits: 3 }),
        out('Worst-case tokens per user in the window', 'tokens', 'n*tok', { key: 'wt' }),
        out('Worst-case cost per user in the window', 'USD', 'wt/1e6*price', { digits: 3 }),
        out('Worst-case cost per user per 30 days', 'USD', '(B + r*60*24*30)*tok/1e6*price', { digits: 3 }),
      ],
      note: 'The last line is what one abusive account could cost you if the limit is the only guard. Tighten r until that number is one you can live with.',
    },
  }),

  entry('flask-vs-fastapi', 'question', BACK, 'curious', 'Flask or FastAPI?', {
    summary: 'Both are fine. Flask is simpler and synchronous by default; FastAPI is async, validates with Pydantic and writes API docs for you. For an LLM-heavy API, async helps.',
    aliases: ['Flask vs FastAPI', 'Quart', 'async Python web'],
    tags: ['decisions', 'framework'],
    body: doc`
      ## What differs
      | | Flask | FastAPI |
      |---|---|---|
      | Style | sync (WSGI); async views possible but each still holds a worker | async-first (ASGI) |
      | Validation | bring your own (Pydantic, marshmallow) | built in, from type hints |
      | API docs | add-on | automatic OpenAPI + Swagger UI |
      | Server-rendered pages, sessions, extensions | mature, huge ecosystem | lighter |
      | Learning curve | gentle | gentle, plus async |

      ## Where async matters
      An LLM app spends most of its time *waiting* — on the model, on embeddings, on the database. An async server can hold thousands of waiting requests in one process. Flask with sync workers holds one per worker; with threads or gevent, dozens to hundreds — plenty for most side projects.

      ## Verdict for your stack
      Flask is what the project uses — stay with it, and:
      - run Gunicorn with threads (or gevent) for streaming endpoints;
      - validate with Pydantic anyway;
      - push long jobs to a worker.
      If one day you need thousands of concurrent streams, **Quart** is Flask's API on async, and FastAPI is a well-trodden move. The concepts — routes, request/response, SQLAlchemy, auth — all transfer.
    `,
  }),

  entry('project-layout', 'example', BACK, 'curious', 'Laying Out a React + Flask Project', {
    summary: 'One repo, two folders — frontend (Vite) and backend (Flask) — a dev proxy so they share an origin, and one command to run each.',
    aliases: ['monorepo', 'project structure', 'folder structure'],
    tags: ['architecture', 'walkthrough'],
    body: doc`
      ~~~text
      my-project/
      ├─ frontend/                 Vite + React + TypeScript
      │  ├─ src/
      │  │  ├─ api.ts              one fetch wrapper for every call
      │  │  ├─ pages/  components/
      │  │  └─ main.tsx
      │  ├─ vite.config.ts         proxy /api -> http://localhost:5000
      │  └─ package.json
      ├─ backend/                  Flask
      │  ├─ app/
      │  │  ├─ __init__.py         create_app()
      │  │  ├─ db.py  models.py
      │  │  ├─ notes.py  chat.py  auth.py      one blueprint per feature
      │  │  └─ llm.py              the ONLY place that talks to a model
      │  ├─ migrations/            Alembic
      │  ├─ tests/
      │  └─ pyproject.toml
      ├─ docker-compose.yml        postgres (+ pgvector), maybe redis
      ├─ .env.example              every variable, no real values
      ├─ .gitignore                .env, .venv, node_modules, dist
      └─ README.md                 how to run it, in five lines
      ~~~

      ## Running it (three terminals)
      ~~~bash
      docker compose up -d db                                   # Postgres
      cd backend  && uv run flask --app "app:create_app()" run --debug
      cd frontend && npm run dev                                # open http://localhost:5173
      ~~~

      ## Decisions baked in
      - **Same origin in dev** via Vite's proxy: no CORS, cookies work.
      - **All model calls in one module** (§llm.py§): swapping a hosted model for a local one, adding caching, logging tokens and cost — each is a change in one place.
      - **Secrets only in §.env§**, never committed; §.env.example§ documents them.
      - **Production**: build the frontend to static files and let Flask or nginx serve §dist/§ next to §/api§ — still one origin.
    `,
  }),
];
