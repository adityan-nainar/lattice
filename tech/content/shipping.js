// Tools & Shipping: from your laptop to a running app.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { SHIP } = AREA;

export const SHIP_ENTRIES = [
  entry('terminal', 'concept', SHIP, 'curious', 'Terminal and Shell', {
    summary: 'A text interface for running programs. Most dev tools — git, npm, uv, docker, ollama — are driven from it, so a handful of commands and habits go a long way.',
    aliases: ['terminal', 'shell', 'command line', 'CLI', 'bash', 'PowerShell', 'PATH variable', 'working directory'],
    tags: ['tooling', 'foundations'],
    body: doc`
      ## Shells you'll meet
      - **PowerShell** — Windows' default. §ls§, §cd§, §cat§ work as aliases; syntax differs from bash beyond that (§$env:NAME = "x"§ to set a variable).
      - **bash / zsh** — Linux, macOS, WSL, Git Bash, Docker containers, servers, and most tutorials.

      ## The core handful
      ~~~bash
      pwd                     # where am I?
      ls -la                  # what's here (incl. hidden files like .env)
      cd backend              # move; cd .. goes up
      mkdir -p app/static     # make folders
      cat file.txt            # print a file
      grep -rn "TODO" app/    # search text in files
      which python            # which program runs when I type "python"? (Get-Command python on PowerShell)
      echo $PATH              # where the shell looks for programs
      ~~~

      ## Concepts that explain most confusion
      - **Working directory**: commands run relative to where you are. "File not found" is often "you're in the wrong folder".
      - **PATH**: the list of folders searched for commands. "command not found" after installing something usually means its folder isn't on PATH — open a new terminal first.
      - **Exit codes**: 0 = success, anything else = failure. CI and scripts rely on them.
      - **Ctrl+C** stops the running program. **↑** recalls history; **Tab** completes names.
      - **Pipes**: §cmd1 | cmd2§ feeds output into input — §git log --oneline | head -20§.

      ## Habits
      Read the whole error message — the answer is usually in it. Copy commands from docs, but understand them before running anything with §sudo§, §rm -rf§ or §curl … | sh§.
    `,
  }),

  entry('wsl', 'concept', SHIP, 'curious', 'WSL: Linux on Windows', {
    summary: 'Windows Subsystem for Linux runs a real Linux inside Windows. Most server tooling (Gunicorn, many Python packages, shell scripts) assumes Linux, so it removes a whole class of Windows-only problems.',
    aliases: ['WSL', 'WSL2', 'Windows Subsystem for Linux', 'Ubuntu on Windows'],
    tags: ['tooling', 'windows'],
    year: 2016,
    body: doc`
      ## Why it matters on your laptop
      Production servers run Linux. Some things simply don't run on Windows (Gunicorn), others behave differently (file paths, line endings, file permissions, shell scripts). Developing inside WSL means your environment matches the server's, and every Linux tutorial works as written.

      ## Setup
      ~~~powershell
      wsl --install              # installs Ubuntu by default; restart when asked
      ~~~
      Then open "Ubuntu" from the Start menu: a Linux terminal with §apt§, §bash§ and your own home directory.

      ## Working in it
      - Keep project files **inside** the Linux filesystem (§~/projects/…§), not under §/mnt/c/…§ — cross-filesystem access is much slower.
      - VS Code's WSL extension opens a folder in WSL with the editor on Windows: §code .§ from the Ubuntu terminal.
      - §localhost§ ports are shared with Windows by default: Flask in WSL on :5000 opens in your Windows browser.
      - Docker Desktop uses WSL 2 as its engine; containers integrate with it.
      - GPU: NVIDIA CUDA works inside WSL 2 with current Windows drivers, so local models and PyTorch can use your GPU there.

      ## Or not
      Pure Windows works fine for React, Flask's dev server, Postgres in Docker and Ollama (native Windows app). Reach for WSL when a tool or tutorial assumes Linux — or from the start, if you'd rather not find out one tool at a time.
    `,
  }),

  entry('ports-localhost', 'concept', SHIP, 'curious', 'Processes, Ports and localhost', {
    summary: 'Every server is a process listening on a port. 127.0.0.1 means “only this machine”, 0.0.0.0 means “any network interface”. “Address already in use” means something else got there first.',
    aliases: ['port', 'ports', 'port number', 'localhost', '127.0.0.1', '0.0.0.0', 'address already in use'],
    tags: ['networking', 'debugging'],
    body: doc`
      ## Your dev setup is several processes
      | Process | Port |
      |---|---|
      | Vite (React dev server) | 5173 |
      | Flask | 5000 (on macOS, AirPlay also uses 5000 — use 5001) |
      | Postgres | 5432 |
      | Redis | 6379 |
      | Ollama | 11434 |

      ## Binding
      - §127.0.0.1§ (localhost): reachable only from this machine. The safe default for dev servers.
      - §0.0.0.0§: listen on every network interface — reachable from your phone on the same Wi-Fi, from other containers, and (on a server) from the internet. Needed inside Docker so the host can reach the app; dangerous with Flask's debugger on.

      ## "Address already in use"
      Another process — often a previous run of your own server that didn't exit — holds the port.
      ~~~bash
      # Linux / macOS / WSL
      lsof -i :5000
      kill <pid>
      ~~~
      ~~~powershell
      # Windows
      Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess
      Stop-Process -Id <pid>
      ~~~

      ## "Connection refused"
      Nothing is listening there: the server isn't running, crashed at startup (read its terminal), or is on a different port or interface. Inside Docker, §localhost§ means *the container itself*, not your laptop — use the service name (§db:5432§) or §host.docker.internal§.
    `,
  }),

  entry('git', 'concept', SHIP, 'curious', 'Git', {
    summary: 'Version control: a history of snapshots of your project, each with a message saying why. Lets you undo, compare, branch off experiments and collaborate without emailing zip files.',
    aliases: ['Git', 'git commit', 'commits', 'staging area', 'git add', 'git log', 'repository', 'repo', '.gitignore'],
    tags: ['tooling', 'foundations'],
    year: 2005,
    body: doc`
      ## The daily loop
      ~~~bash
      git status                      # what changed?
      git diff                        # how exactly?
      git add app/notes.py            # stage what goes in the next snapshot
      git commit -m "Validate note titles with Pydantic"
      git log --oneline -10           # recent history
      git push                        # send commits to GitHub
      ~~~

      ## The model
      A **commit** is a snapshot of the whole project plus a message, an author and a pointer to its parent. Each is named by a hash of its contents (§3f9a1c7§), so history can't be silently altered. The **staging area** lets you choose which changes go into the next commit — one logical change per commit makes history readable and reversible.

      ## .gitignore, first thing
      ~~~text
      .env
      .venv/
      node_modules/
      dist/
      __pycache__/
      *.gguf
      ~~~
      Secrets, dependencies, build output and huge model files never belong in the repo.

      ## Undo cheatsheet
      - Discard uncommitted changes to a file: §git restore file§.
      - Unstage: §git restore --staged file§.
      - Fix the last commit's message or add a forgotten file (before pushing): §git commit --amend§.
      - Undo a pushed commit safely: §git revert <hash>§ (a new commit that reverses it).
      - "I've lost work": §git reflog§ lists everywhere HEAD has been — almost nothing committed is ever truly lost.

      ## Good messages
      Say *why*, not just what: "Cap chat history at 20 turns to bound token cost" beats "update chat.py".
    `,
  }),

  entry('git-branching', 'concept', SHIP, 'curious', 'Branches, Merging and Rebasing', {
    summary: 'A branch is a movable label on a line of commits — a cheap parallel universe for a feature. Merge or rebase brings it back; conflicts are Git asking you to decide.',
    aliases: ['git branch', 'branches', 'branching', 'git merge', 'merge conflict', 'rebase', 'rebasing', 'main branch'],
    tags: ['tooling', 'collaboration'],
    body: doc`
      ## Feature branches
      ~~~bash
      git switch -c add-rag-search      # new branch from where you are
      # …commit work…
      git push -u origin add-rag-search # share it; open a pull request
      ~~~
      §main§ stays deployable; experiments live on branches and are merged when ready. Abandoned experiment? Delete the branch — main never saw it.

      ## Merge vs rebase
      Both combine work from two branches.
      - **Merge** adds a commit joining the two histories. Honest, keeps everything, can look tangled.
      - **Rebase** replays your commits on top of the latest main, as if you'd started from there. Linear, tidy — but it rewrites *your* commits' hashes.
      Rule: rebase your own unpushed or unshared work freely; never rebase commits others have based work on. Many teams "squash and merge" pull requests: one clean commit per feature on main.

      ## Conflicts
      When both sides changed the same lines, Git stops and marks the file:
      ~~~text
      <<<<<<< HEAD
      max_tokens=2000
      =======
      max_tokens=4000
      >>>>>>> add-rag-search
      ~~~
      Edit to what it *should* be (maybe neither), delete the markers, §git add§ the file, continue (§git merge --continue§ / §git rebase --continue§). Editors show these with buttons. Then run the tests — a conflict-free merge can still be logically broken.

      ## Keeping up
      Merge or rebase main into your branch often; small, frequent syncs mean small conflicts.
    `,
  }),

  entry('github-prs', 'concept', SHIP, 'curious', 'GitHub and Pull Requests', {
    summary: 'GitHub hosts your repo and wraps Git in collaboration: pull requests for proposing and reviewing changes, issues for tracking work, Actions for automation.',
    aliases: ['GitHub', 'pull request', 'pull requests', 'code review', 'GitHub issues', 'fork'],
    tags: ['collaboration', 'tooling'],
    year: 2008,
    body: doc`
      ## Pull requests
      Push a branch, open a PR: "please merge these commits into main". It shows the diff, runs CI checks, and gives a place for review comments on specific lines. Even working alone, PRs give you a checkpoint where tests run and you re-read your own diff before it lands.

      ## Being a good PR author
      - Small and focused: one feature or fix. 200 lines get reviewed; 2,000 get skimmed.
      - Description: what, why, how to test, screenshots for UI.
      - Draft PRs to share early.

      ## Being a good reviewer
      Look for correctness, security (auth checks, input validation, secrets), missing tests, and whether *you* could maintain it. Ask questions rather than issuing orders. Style nits belong to the formatter.

      ## Also on GitHub
      - **Issues** — bugs and tasks, linked to PRs ("Fixes #12" closes it on merge).
      - **Actions** — CI/CD.
      - **Dependabot** — PRs to update vulnerable dependencies.
      - **Secret scanning** — warns when a key is pushed (and some providers auto-revoke leaked keys).

      Working at a place with an existing repo: read its README, contribution guide and a few merged PRs before your first one — each team has its conventions.
    `,
  }),

  entry('env-vars', 'concept', SHIP, 'curious', 'Environment Variables and .env', {
    summary: 'Configuration that changes between machines — database URLs, API keys, debug flags — lives in the environment, not the code. A .env file sets them locally and never gets committed.',
    aliases: ['environment variable', 'environment variables', 'env var', 'env vars', '.env', '.env file', 'dotenv', 'twelve-factor'],
    tags: ['configuration', 'security'],
    body: doc`
      ## The rule (from the twelve-factor app)
      Anything that differs between your laptop, a teammate's, staging and production is **config**, and belongs in environment variables. The code is identical everywhere.

      ## Locally: a .env file
      ~~~bash
      # backend/.env   (in .gitignore!)
      DATABASE_URL=postgresql+psycopg://postgres:dev@localhost:5432/app
      ANTHROPIC_API_KEY=sk-ant-...
      OLLAMA_URL=http://localhost:11434
      LOCAL_MODEL=qwen3:8b
      FLASK_SECRET_KEY=change-me
      ~~~
      ~~~python
      from dotenv import load_dotenv      # python-dotenv; Flask's CLI also reads .env if it's installed
      load_dotenv()
      DATABASE_URL = os.environ["DATABASE_URL"]            # crash early if missing
      MODEL = os.environ.get("LOCAL_MODEL", "qwen3:8b")    # optional, with a default
      ~~~
      Commit a **.env.example** with every name and a fake value, so the next person (or you, in six months) knows what to set.

      ## In production
      Set them in the hosting platform's dashboard, or your server's systemd unit / Docker Compose file — pulled from a secrets manager if you have one. Never bake them into a Docker image.

      ## Frontend variables are public
      Vite exposes §VITE_*§ variables to browser code — which means to everyone. The API URL is fine there; keys are not. Anything secret stays on the Flask side.

      ## Fail loudly
      Read and check config at startup. An app that starts with §DATABASE_URL=None§ and fails on the first request is harder to debug than one that refuses to start.
    `,
  }),

  entry('secrets', 'concept', SHIP, 'curious', 'Keeping Secrets Safe', {
    summary: 'API keys and passwords leak through git history, frontend bundles, logs and screenshots. Keep them in env vars on the server, scope them tightly, and rotate the moment one escapes.',
    aliases: ['secret', 'secrets', 'leaked API key', 'key rotation', 'gitleaks', 'secrets manager'],
    tags: ['security'],
    body: doc`
      ## How keys actually leak
      - Committed to git — even if deleted in the next commit, it's in history forever. Bots scan public GitHub for keys within minutes.
      - Shipped in frontend code (a §VITE_§ variable, a hard-coded string in React).
      - Printed in logs or error messages; pasted into a chat, an issue or an AI assistant.
      - Left in a Jupyter notebook's output cells.

      ## If one leaks
      1. **Revoke/rotate it immediately** at the provider. Deleting the commit is not enough.
      2. Check usage logs and billing for abuse.
      3. Then clean up history if you like (and understand it's already been copied).

      ## Habits
      - §.env§ in §.gitignore§ before the first commit. A pre-commit hook like **gitleaks** blocks commits containing key-shaped strings.
      - Separate keys for development and production; spending limits on each; least privilege (read-only DB user for analytics, a key per service).
      - Never log full request headers or env dumps.
      - For an LLM feature: the browser calls *your* Flask endpoint; only Flask holds the provider key. Rate-limit that endpoint per user.

      ## Secrets vs config
      A database *hostname* is config; its *password* is a secret. Both come from the environment, but secrets deserve more care: fewer people, rotation, a secrets manager when you have one (the hosting platform's secret settings are a fine start).
    `,
  }),

  entry('docker', 'concept', SHIP, 'curious', 'Docker and Containers', {
    summary: 'Package an app with everything it needs — OS libraries, Python, packages — into an image that runs the same on any machine. Ends “works on my machine”.',
    aliases: ['Docker', 'container', 'containers', 'Docker image', 'Dockerfile', 'docker run', 'Docker Desktop', 'Docker volume'],
    tags: ['deployment', 'tooling'],
    year: 2013,
    body: doc`
      ## Image vs container
      - An **image** is a read-only template: a filesystem plus a start command. Built from a **Dockerfile**.
      - A **container** is a running instance of an image — an isolated process with its own filesystem and network, sharing the host's kernel (so much lighter than a virtual machine).

      ## A Dockerfile for the Flask backend
      ~~~dockerfile
      FROM python:3.13-slim
      WORKDIR /app
      COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
      COPY pyproject.toml uv.lock ./
      RUN uv sync --frozen --no-dev          # dependencies first: cached until they change
      COPY . .
      EXPOSE 8000
      CMD ["uv", "run", "gunicorn", "app:create_app()", "--bind", "0.0.0.0:8000", "--threads", "8"]
      ~~~
      ~~~bash
      docker build -t notes-api .
      docker run -p 8000:8000 --env-file .env notes-api
      ~~~

      ## Things that confuse everyone once
      - **Layers are cached** in order. Copy dependency files and install *before* copying code, or every code change reinstalls everything.
      - **Containers are disposable**: files written inside vanish when the container is removed. Databases need a **volume**.
      - **localhost inside a container** is the container. Reach other services by name (Compose) or §host.docker.internal§ for the host.
      - **Ports**: §-p 8000:8000§ maps host port to container port; the app must listen on §0.0.0.0§.
      - Secrets come in at runtime (§--env-file§, platform settings), never §COPY .env§ into the image.

      ## For your project
      Even if you deploy without it, Docker is the easiest way to run Postgres (with pgvector) and Redis locally — see Docker Compose.
    `,
  }),

  entry('docker-compose', 'concept', SHIP, 'curious', 'Docker Compose', {
    summary: 'One YAML file describing several containers — database, backend, maybe Redis — with their ports, volumes and settings. “docker compose up” starts the lot.',
    aliases: ['Docker Compose', 'docker-compose', 'compose.yaml', 'docker compose up'],
    tags: ['deployment', 'tooling'],
    body: doc`
      ~~~yaml
      # docker-compose.yml
      services:
        db:
          image: pgvector/pgvector:pg18
          environment:
            POSTGRES_PASSWORD: dev
            POSTGRES_DB: app
          ports: ["5432:5432"]
          volumes: ["pgdata:/var/lib/postgresql/data"]
          healthcheck:
            test: ["CMD-SHELL", "pg_isready -U postgres"]
            interval: 5s

        redis:
          image: redis:7
          ports: ["6379:6379"]

        api:
          build: ./backend
          env_file: ./backend/.env
          environment:
            DATABASE_URL: postgresql+psycopg://postgres:dev@db:5432/app   # "db" = the service name
            OLLAMA_URL: http://host.docker.internal:11434                 # Ollama running on the host
          ports: ["8000:8000"]
          depends_on:
            db: { condition: service_healthy }

      volumes:
        pgdata:
      ~~~

      ## Commands
      ~~~bash
      docker compose up -d db          # just the database, in the background
      docker compose up --build        # everything, rebuilding images
      docker compose logs -f api       # follow one service's logs
      docker compose exec db psql -U postgres app
      docker compose down              # stop (add -v to also DELETE the database volume)
      ~~~

      ## A common dev pattern
      Run only the infrastructure (Postgres, Redis) in Compose, and run Flask and Vite directly on your machine for fast reloads and easy debugging. Put the app in Compose too when you want to test the production-like build.

      Services find each other by name on Compose's network — §db:5432§, not §localhost:5432§.
    `,
  }),

  entry('testing', 'concept', SHIP, 'curious', 'Testing and pytest', {
    summary: 'Code that checks your code, run automatically. Unit tests for logic, integration tests for routes and the database, and fakes for the LLM so tests are fast, free and deterministic.',
    aliases: ['testing', 'pytest', 'unit test', 'unit tests', 'integration test', 'integration tests', 'test fixture', 'mocking', 'Vitest'],
    tags: ['quality', 'tooling'],
    body: doc`
      ## pytest in one screen
      ~~~python
      # tests/test_notes.py
      import pytest
      from app import create_app

      @pytest.fixture
      def client():
          app = create_app({"TESTING": True, "DATABASE_URL": TEST_DB_URL})
          with app.test_client() as c:
              yield c

      def test_create_note_requires_title(client, login):
          r = client.post("/api/notes/", json={"title": ""})
          assert r.status_code == 422

      def test_cannot_read_other_users_note(client, login, other_users_note):
          r = client.get(f"/api/notes/{other_users_note.id}")
          assert r.status_code == 404
      ~~~
      §uv run pytest§ finds §test_*.py§ files and runs every §test_*§ function. **Fixtures** set up what tests need (an app, a logged-in client, a database row) and clean up after.

      ## What to test first
      - Permission checks — the second test above catches the #1 web vulnerability.
      - Validation and error paths.
      - Pure logic: chunking, prompt building, cost calculation, parsing model output.
      - One happy path per endpoint.

      ## Testing code that calls an LLM
      - **Unit tests: fake the model.** Inject a client whose §create()§ returns a canned response. Now you can test "what happens when the model returns invalid JSON" or "when it calls the search tool" — fast, free, deterministic.
      - **Record/replay** real responses for integration tests.
      - **Quality** — is the answer *good*? — belongs to evals, not unit tests. Different tool, different cadence.

      ## Frontend
      Vitest (Vite's test runner) + Testing Library for components; Playwright for end-to-end browser tests of a few critical flows.

      Tests pay off when they run on every push — see CI.
    `,
  }),

  entry('ci-cd', 'concept', SHIP, 'curious', 'CI/CD and GitHub Actions', {
    summary: 'Continuous integration runs lint and tests on every push; continuous deployment ships main automatically when they pass. Robots that never forget a step.',
    aliases: ['CI/CD', 'continuous integration', 'continuous deployment', 'GitHub Actions', 'workflow file'],
    tags: ['automation', 'deployment'],
    body: doc`
      ~~~yaml
      # .github/workflows/ci.yml
      name: CI
      on: [push, pull_request]
      jobs:
        backend:
          runs-on: ubuntu-latest
          services:
            postgres:
              image: pgvector/pgvector:pg18
              env: { POSTGRES_PASSWORD: test }
              ports: ["5432:5432"]
          steps:
            - uses: actions/checkout@v5
            - uses: astral-sh/setup-uv@v6
            - run: uv sync
              working-directory: backend
            - run: uv run ruff check . && uv run pytest
              working-directory: backend
              env:
                DATABASE_URL: postgresql+psycopg://postgres:test@localhost:5432/postgres
        frontend:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v5
            - uses: actions/setup-node@v5
              with: { node-version: 24 }
            - run: npm ci && npm run lint && npm run build
              working-directory: frontend
      ~~~
      (Action versions move; check each action's README for the current major.)

      ## What it buys you
      - "Works on my machine" gets checked on a clean one, every time.
      - Pull requests show green or red before merge; branch protection can require green.
      - Deployment becomes a consequence of merging, not a ritual.

      ## CD
      Most hosting platforms deploy automatically when §main§ changes. Otherwise, a final job builds a Docker image, pushes it, and tells the server to pull it. Run database migrations as a deploy step before the new version starts.

      ## LLM-specific
      Don't call paid models in every CI run — use fakes. Run evals on a schedule or on demand (a manually triggered workflow), with the API key stored as a GitHub **secret**.
    `,
  }),

  entry('deployment', 'concept', SHIP, 'curious', 'Deploying a Web App', {
    summary: 'Getting code onto a server that’s always on, reachable at a domain, with a database, HTTPS and secrets. Platforms do most of it; a VPS teaches you all of it.',
    aliases: ['deployment', 'deploy', 'deploying', 'hosting', 'PaaS', 'VPS', 'staging environment'],
    tags: ['deployment', 'operations'],
    body: doc`
      ## What "deployed" needs
      1. A process running your backend (Gunicorn) — restarted if it crashes.
      2. The frontend's static files served somewhere.
      3. A database that persists and is backed up.
      4. Environment variables and secrets.
      5. A domain, DNS records and HTTPS.
      6. Logs you can read.

      ## Options, easiest first
      - **Platform-as-a-service** — Render, Railway, Fly.io, Heroku, Google Cloud Run: connect the GitHub repo, set env vars, get a URL with HTTPS. Many offer managed Postgres. Least to learn; costs more at scale; sleeping free tiers mean slow first requests.
      - **Managed database separately** — Neon or Supabase for Postgres (pgvector included), your app wherever.
      - **Static hosts** for the React build — Netlify, Vercel, Cloudflare Pages — if frontend and backend are split (then think about CORS and cookies across domains, or put both behind one domain).
      - **A VPS** (DigitalOcean, Hetzner, Lightsail, an Indian-region cloud VM): a Linux box you manage — Docker Compose, nginx, Let's Encrypt, backups, updates. Cheapest for always-on and the best education, but everything is your job.

      ## Before the link goes public
      Debug off, secrets set, HTTPS on, rate limits and spending caps on LLM endpoints, error logging, a backup you've restored once, and a way to roll back (redeploy the previous version).

      ## Local models in production
      Running an open model for real users needs a GPU server (or a provider hosting open models via an OpenAI-compatible API). Many projects run hosted models in production and local ones for development and batch jobs.
    `,
  }),

  entry('reverse-proxy', 'concept', SHIP, 'curious', 'Reverse Proxies and nginx', {
    summary: 'A server in front of your app that terminates HTTPS, serves static files, routes /api to Flask, and buffers, compresses and limits traffic. nginx and Caddy are the usual picks.',
    aliases: ['reverse proxy', 'nginx', 'Caddy', 'load balancer', 'proxy_pass'],
    tags: ['deployment', 'networking'],
    year: 2004,
    body: doc`
      ## One origin, two backends
      ~~~nginx
      server {
          server_name notes.example.com;

          root /srv/frontend/dist;                 # React build
          location / { try_files $uri /index.html; }   # client-side routes fall back to the SPA

          location /api/ {
              proxy_pass http://127.0.0.1:8000;    # Gunicorn
              proxy_set_header Host $host;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
              proxy_buffering off;                 # let streamed LLM tokens through
              proxy_read_timeout 300s;             # long generations
          }
      }
      ~~~
      With both halves on one domain there's no CORS, and cookies just work.

      ## Why not expose Gunicorn directly
      The proxy handles HTTPS certificates, slow clients (so they don't tie up app workers), static files efficiently, gzip, request size limits, and can spread load across several app processes or machines (**load balancing**).

      ## Behind a proxy, Flask sees the proxy
      Every request appears to come from 127.0.0.1 over plain HTTP — rate limiting by IP breaks and generated URLs say §http://§. Tell Flask to trust the forwarded headers: §app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)§ (Werkzeug).

      ## Caddy
      A simpler alternative that obtains and renews HTTPS certificates automatically with a three-line config. Hosting platforms run their own proxy for you.
    `,
  }),

  entry('logging-monitoring', 'concept', SHIP, 'curious', 'Logging, Monitoring and Alerts', {
    summary: 'Logs say what happened, metrics say how much and how fast, error tracking groups exceptions, alerts wake you when it matters. You can’t fix what you can’t see.',
    aliases: ['logging', 'logs', 'monitoring', 'observability', 'Sentry', 'error tracking', 'metrics', 'alerts', 'structured logging'],
    tags: ['operations', 'debugging'],
    body: doc`
      ## Logs
      ~~~python
      import logging
      log = logging.getLogger(__name__)
      log.info("chat request", extra={"user_id": uid, "model": MODEL, "input_tokens": n})
      log.exception("embedding job failed for document %s", doc_id)   # includes the traceback
      ~~~
      - Log to stdout; the platform or Docker collects it.
      - **Structured** (JSON) logs can be searched and filtered: all requests for user 42, all errors from §/api/chat§.
      - A **request id** on every line ties together everything one request did.
      - Never log secrets, passwords, full auth headers — and think before logging users' prompts.

      ## Error tracking
      **Sentry** (free tier; SDKs for Flask and React) captures every exception with stack trace, request, user and release, grouped and deduplicated. The easiest high-value thing to add before real users arrive.

      ## Metrics worth watching
      Request rate, error rate, latency (p50 and **p95** — averages hide the slow tail), database connections, queue length, and for LLM features: tokens and cost per day, and model error/timeout rates.

      ## Alerts
      Few and actionable: error rate spike, site down (an uptime checker pinging a §/health§ endpoint), daily LLM spend over budget. An alert nobody acts on trains everyone to ignore alerts.
    `,
  }),

  entry('availability-nines', 'equation', SHIP, 'curious', 'Availability and the Nines', {
    summary: '99.9% uptime still allows almost 9 hours of downtime a year. And a chain of services is only as available as their product — every dependency you add costs a little uptime.',
    aliases: ['availability', 'uptime', 'nines', 'SLA', 'SLO', 'downtime'],
    tags: ['reliability', 'numbers'],
    latex: doc`A_{\text{chain}} = \prod_i A_i, \qquad \text{downtime per year} = (1 - A) \times 8766\ \text{h}`,
    variables: [
      [doc`A_i`, 'Availability of each component the request depends on'],
    ],
    body: doc`
      ## What the nines mean
      | Availability | Downtime per year | per month |
      |---|---|---|
      | 99% | 3.65 days | 7.3 hours |
      | 99.9% | 8.8 hours | 44 minutes |
      | 99.99% | 53 minutes | 4.4 minutes |
      | 99.999% | 5.3 minutes | 26 seconds |

      ## Dependencies multiply
      A chat request needs your app (99.9%), Postgres (99.95%) and the LLM API (99.5%) all up: $0.999 \times 0.9995 \times 0.995 = 0.9935$ — about **57 hours** a year when something in the chain is down. Each extra hard dependency lowers the ceiling.

      ## Designing for it
      - **Degrade gracefully**: if the LLM provider is down, notes still load and search still works; the chat says "try again shortly". If embedding fails, queue it for later.
      - **Fallbacks**: a second model or provider (or a local model) for when the primary is overloaded.
      - **Timeouts and retries** so one slow dependency doesn't hang everything.
      - Keep critical paths short.

      ## For a side project
      99% is honestly fine. What matters more: knowing when it's down (an uptime check), and recovering quickly (redeploy, restore from backup).
    `,
    calc: {
      inputs: [
        input('a1', 'Your app', '%', 99.9, 90, 99.999),
        input('a2', 'Database', '%', 99.95, 90, 99.999),
        input('a3', 'LLM API', '%', 99.5, 90, 99.999),
        input('a4', 'Anything else (auth provider, storage…)', '%', 100, 90, 100),
      ],
      outputs: [
        out('Whole chain', '%', 'a1*a2*a3*a4/1e6', { key: 'A', digits: 5 }),
        out('Downtime per year', 'hours', '(1 - A/100)*8766', { digits: 3 }),
        out('Downtime per month', 'hours', '(1 - A/100)*730.5', { digits: 3 }),
      ],
      note: 'Set the LLM API to 100 — a fallback model that always answers — and see how much of the downtime was that one dependency.',
    },
  }),

  entry('debugging', 'concept', SHIP, 'curious', 'Debugging: A Method', {
    summary: 'Read the error, reproduce it, shrink it, form a hypothesis, test it — one change at a time. Most bugs yield to method faster than to staring.',
    aliases: ['debugging', 'debugger', 'breakpoint', 'breakpoints', 'git bisect', 'rubber duck debugging', 'minimal reproduction'],
    tags: ['craft', 'debugging'],
    body: doc`
      ## The loop
      1. **Read the actual error**, all of it. The last line of a Python traceback; the first red line in the browser console; the response body in the Network tab.
      2. **Reproduce it** reliably. A bug you can trigger on demand is half-solved.
      3. **Locate the layer**: browser → network → Flask → database → LLM. Is the request even sent? What status came back? What did the server log? Split the problem in half each time.
      4. **Shrink it** to the smallest input and code that still fails.
      5. **Hypothesise, then test** — one change at a time, and undo changes that didn't help.
      6. **Fix, and add a test** that would have caught it.

      ## Tools
      - §print§ / §console.log§ — unfashionable, effective.
      - **Breakpoints**: §breakpoint()§ in Python drops into the debugger (pdb) right there; VS Code's debugger for Flask and the browser's for React let you inspect variables mid-flight.
      - **git bisect**: "it worked last week" — binary search through commits to find the one that broke it, in log₂(n) steps.
      - **Rubber duck**: explain the problem out loud, line by line. Often the explanation finds it.

      ## LLM bugs
      Log the exact prompt that was sent (after templating) and the raw response. Most "the model is being dumb" bugs are "the prompt didn't contain what I thought": empty retrieval results, a truncated history, a template variable that rendered as §None§.

      ## When stuck
      Take a break; then question the assumption you're most sure of. And when asking for help — human or AI — include the error, what you expected, what you tried, and a minimal reproduction.
    `,
  }),

  entry('linters-formatters', 'concept', SHIP, 'curious', 'Linters and Formatters', {
    summary: 'Formatters make code look consistent automatically; linters catch likely bugs and bad patterns. Ruff for Python, ESLint and Prettier for the frontend — set up once, argue never.',
    aliases: ['linter', 'linting', 'formatter', 'Ruff', 'ESLint', 'Prettier', 'pre-commit'],
    tags: ['quality', 'tooling'],
    body: doc`
      ## Python: Ruff
      ~~~bash
      uv add --dev ruff
      uv run ruff format .        # formatting (Black-compatible)
      uv run ruff check --fix .   # linting: unused imports, undefined names, bug-prone patterns
      ~~~
      One fast tool replacing flake8, isort, Black and more.

      ## Frontend: ESLint + Prettier
      Vite's templates include ESLint, with the React Hooks rules that catch missing effect dependencies and hooks called conditionally — genuine bugs, not style. Prettier formats.

      ## Make them automatic
      - Editor: format on save.
      - **pre-commit** hooks run formatters, linters and a secret scanner before each commit.
      - CI runs the same checks so nothing slips through.

      ## Why it's worth it
      Code review stops being about spacing. Diffs contain only real changes. And linters catch whole categories of bugs — unused variables that should have been used, shadowed names, missing awaits — for free.

      Add **mypy** or **pyright** for type checking when the codebase grows; TypeScript's compiler does that job on the frontend.
    `,
  }),

  entry('ai-coding-assistants', 'concept', SHIP, 'curious', 'Coding with AI Assistants', {
    summary: 'Agents like Claude Code, Cursor and Copilot can write, run and fix code across a project. They speed you up most when you understand what they produce — which is why learning the fundamentals still pays.',
    aliases: ['AI coding assistant', 'AI coding assistants', 'Claude Code', 'Copilot', 'vibe coding', 'CLAUDE.md'],
    tags: ['craft', 'tooling', 'agents'],
    body: doc`
      ## What they're good at
      Scaffolding (a Flask blueprint, a React form, a migration), explaining unfamiliar code, writing tests, tracing a bug through several files, doing the boring 80% of a refactor, and reading error messages with you. Agentic tools run commands and tests themselves and iterate.

      ## Using them well
      - **Give context**: the goal, constraints, relevant files, how to run tests. A project file (§CLAUDE.md§, §AGENTS.md§) with commands and conventions saves re-explaining.
      - **Ask for a plan first** on bigger changes; correct the plan, not 500 lines of code.
      - **Small steps, run the tests** after each. Commit when green so you can roll back.
      - **Read every diff** you accept. You're the one who has to maintain it and answer for it.
      - **Ask "why"**: have it explain choices you don't understand — the fastest tutor you'll get.

      ## Where you still need to know things
      - Security: auth checks, validation, secrets, injection — assistants can miss these, and you must spot it.
      - Architecture: which way to structure data and APIs, what to keep simple.
      - Debugging when it's going in circles: recognising the real layer the bug lives in.
      - Judging when output is plausible but wrong — the same skill as reviewing any LLM output.

      ## At a workplace
      Check the policy on which tools may see the company's code and data before pasting anything in.
    `,
  }),

  entry('object-storage', 'concept', SHIP, 'curious', 'File Uploads and Object Storage', {
    summary: 'Uploaded PDFs and images go to object storage (S3 and compatibles) or disk — not into Postgres rows. Store the file there and its metadata in the database.',
    aliases: ['object storage', 'Amazon S3', 'file upload', 'file uploads', 'presigned URL', 'blob storage', 'Cloudflare R2'],
    tags: ['architecture', 'storage'],
    body: doc`
      ## The pattern
      - **Bytes** → object storage: Amazon S3, Cloudflare R2, Google Cloud Storage, Supabase Storage, or MinIO locally. Cheap, durable, effectively unlimited.
      - **Metadata** → Postgres: §documents(id, owner_id, storage_key, filename, size, content_type, sha256, status)§.
      - The database row points at the object by key.

      ## Uploading
      1. Simple: React POSTs a §multipart/form-data§ form to Flask (§request.files["file"]§), Flask streams it to storage.
      2. Scalable: Flask returns a **presigned URL** — a short-lived, signed upload link — and the browser uploads straight to storage without passing through your server.

      ## Validate uploads
      - Limit size (§MAX_CONTENT_LENGTH§ in Flask) — or someone uploads 10 GB.
      - Check the type by content (magic bytes), not the filename extension.
      - Never use the user's filename as a path (§../../etc/passwd§); generate your own key.
      - Serve user files from a separate domain or with §Content-Disposition: attachment§ so an uploaded HTML file can't run scripts on your site.

      ## During development
      A local §uploads/§ folder (git-ignored) is fine. Hide storage behind two functions — §save(key, bytes)§ and §load(key)§ — and switching to S3 later is a small change. Include the bucket in backups.
    `,
  }),
];
