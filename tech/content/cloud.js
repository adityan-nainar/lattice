// Google Cloud: Cloud Run, Cloud Run Jobs, Cloud SQL, Cloud Storage, IAM and Cloud Build.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { SHIP } = AREA;

export const CLOUD_ENTRIES = [
  entry('google-cloud-basics', 'concept', SHIP, 'curious', 'Google Cloud Basics: Projects, Regions and gcloud', {
    summary: 'Everything in Google Cloud lives in a project, in a region, billed to an account, and is driven from the console or the gcloud command line. Know those four and the rest is detail.',
    aliases: ['Google Cloud', 'GCP', 'Google Cloud Platform', 'gcloud', 'gcloud CLI', 'cloud region', 'cloud console'],
    tags: ['cloud', 'deployment'],
    body: doc`
      ## The building blocks
      - **Project**: the container for resources, permissions and billing (each has a generated project id). Separate projects for production and experiments keep accidents contained.
      - **Region**: where resources physically run — §us-east1§, §asia-south1§ (Mumbai), §asia-south2§ (Delhi). Put the app, its database and its workers in the **same region**: cross-region calls add latency and egress cost.
      - **Billing account**: attach budgets and alerts on day one.
      - **APIs**: each service (Cloud Run, Cloud SQL, Cloud Build…) must be enabled per project.

      ## gcloud
      ~~~bash
      gcloud auth login                                   # you, in the browser
      gcloud config set project PROJECT_ID
      gcloud config set run/region asia-south1
      gcloud run services list
      gcloud run services logs read my-app --limit 50
      gcloud run jobs execute my-app-worker --tasks 4
      gcloud sql instances describe my-app-db
      ~~~
      Scripts like §deploy.sh§ are mostly gcloud commands in the right order.

      ## Latency, for an India-based team
      A us-east1 deployment is ~200 ms round trip from India; §asia-south1§ is ~20–40 ms. For a UI-heavy internal tool that's noticeable; for batch workers it barely matters. Moving regions later means moving the database too, so it's worth deciding early.

      ## The console vs code
      Click around the console to learn; put anything repeated into scripts (or Terraform) so the setup is reproducible.
    `,
  }),

  entry('iam-service-accounts', 'concept', SHIP, 'curious', 'IAM and Service Accounts', {
    summary: 'IAM decides who may do what to which cloud resource. Your code runs as a service account — a robot identity — and gets its database, storage and job-launching rights from roles granted to it.',
    aliases: ['IAM', 'service account', 'service accounts', 'IAM role', 'IAM roles', 'workload identity', 'Secret Manager'],
    tags: ['cloud', 'security'],
    body: doc`
      ## The model
      **Principal** (a person, a group, a service account) + **role** (a bundle of permissions) + **resource** (project, bucket, database…) = a binding.
      ~~~bash
      gcloud projects add-iam-policy-binding PROJECT_ID \
        --member="serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com" \
        --role="roles/cloudsql.client"
      ~~~

      ## What a typical app identity needs
      - §roles/cloudsql.client§ — connect to the database.
      - Storage object access on the bucket — read and write profiles and uploads.
      - §roles/run.developer§ plus permission to **act as** the service account — so the app can launch the worker job.
      No keys to download: code running on Cloud Run gets credentials automatically from the service it runs as ("Application Default Credentials").

      ## Better than the default
      By default Cloud Run uses the project's **default compute service account**, which often has broad Editor rights. A dedicated service account per workload (app, workers) with only the roles above is least privilege in practice — and limits what a leaked token or a compromised dependency can reach.

      ## Secrets
      Passing API keys as plain environment variables at deploy time works, but they're visible to anyone who can read the service's configuration. **Secret Manager** stores them encrypted, versioned and access-controlled; Cloud Run can mount a secret as an environment variable, and rotating a key becomes "add a version, redeploy" instead of editing several .env files.

      ## Local development
      §gcloud auth application-default login§ gives your laptop the same kind of credentials, as you — handy with the Cloud SQL proxy.
    `,
  }),

  entry('cloud-build-images', 'concept', SHIP, 'curious', 'Building and Storing Container Images in the Cloud', {
    summary: 'Cloud Build turns your source and Dockerfile into an image in Artifact Registry; every deploy points at an exact image digest. One image can serve several roles — a web app and its workers can share one.',
    aliases: ['Cloud Build', 'Artifact Registry', 'image digest', 'container registry', 'gcloud run deploy --source'],
    tags: ['cloud', 'deployment'],
    body: doc`
      ## From source to running
      ~~~bash
      gcloud run deploy my-app --source . --region asia-south1 ...
      # 1. uploads the source   2. Cloud Build runs the Dockerfile   3. image pushed to Artifact Registry
      # 4. a new Cloud Run revision starts from that image          5. traffic moves to it once healthy
      ~~~
      No Docker needed on your laptop — the build happens in Google's builders.

      ## One image, two entry points
      A pipeline app can build **one** image (for example from Microsoft's Playwright Python image, so Chromium is included) whose default command starts Uvicorn for the web app. The worker job runs the **same image** with a different command (§python -m app.worker§). The pipeline code the app and the workers run is therefore identical — no drift.

      ## Digests, not tags
      A tag like §:latest§ can point at different images over time; a **digest** (§@sha256:…§) is one exact image forever. Deploying the worker job from the app's current image digest guarantees both run the same code.

      ## Image hygiene
      - Order Dockerfile steps so dependencies install before the code is copied (fast rebuilds).
      - Big base images (browsers!) mean slower builds and cold starts; keep everything else lean.
      - Scan images for vulnerabilities (Artifact Registry can); rebuild regularly to pick up base-image fixes.
    `,
  }),

  entry('cloud-run', 'concept', SHIP, 'curious', 'Cloud Run', {
    summary: 'Run a container as an HTTPS service without managing servers: Google starts instances when requests come, scales them, and bills for what runs. Settings like min/max instances and CPU allocation decide cost and behaviour.',
    aliases: ['Cloud Run', 'Cloud Run service', 'serverless containers', 'Cloud Run revision', 'min instances', 'max instances', 'cold start'],
    tags: ['cloud', 'deployment'],
    year: 2019,
    body: doc`
      ## The contract
      Your container listens on §$PORT§ (8080), answers HTTP, and doesn't rely on local disk surviving. Cloud Run gives it an HTTPS URL, TLS, logs, and scaling.

      ## Settings that matter (an example internal app)
      | Setting | Value | Why |
      |---|---|---|
      | CPU / memory | 2 vCPU, 4 GiB | UI + API; bulk work moved to jobs |
      | Min / max instances | 1 / 1 | always warm (no cold starts); in-memory sessions and in-app batches need exactly one instance |
      | CPU allocation | always on ("instance-based billing", formerly "CPU always allocated") | background tasks keep running between requests |
      | Request timeout | 60 minutes | long uploads and exports |
      | Cloud SQL connection | attached | database via the built-in connector socket |

      ## Things to know
      - **Revisions**: each deploy creates an immutable revision; roll back by sending traffic to the previous one.
      - **Request-based billing** (the default) throttles CPU when no request is in flight — background threads or async tasks started by a request can stall afterwards. Work that must continue after the response needs instance-based billing, or belongs in a job.
      - **Concurrency**: one instance handles many simultaneous requests (default 80); an async app uses that well.
      - **Max 1 instance** is a design constraint, not just a cost setting: in-memory state (sessions, batch progress) only works with one. Removing that constraint means moving state to the database.
      - **Deploys replace the instance**: anything running inside it is interrupted — a good reason for a deploy script to refuse to deploy while an in-app batch is running, and for bulk work to live in jobs.
      - **Custom domains**: map a domain, or redirect it to the §run.app§ URL; OAuth redirect URIs must match whichever URL users land on.
      - **Logs** go to Cloud Logging automatically: print structured JSON to stdout.
    `,
  }),

  entry('cloud-run-jobs', 'concept', SHIP, 'curious', 'Cloud Run Jobs', {
    summary: 'Containers that run to completion instead of serving requests: N tasks in parallel, each told its index, with a timeout and retries. The natural home for bulk background workers.',
    aliases: ['Cloud Run Jobs', 'Cloud Run job', 'batch job', 'job execution', 'task index', 'CLOUD_RUN_TASK_INDEX'],
    tags: ['cloud', 'deployment', 'concurrency'],
    year: 2022,
    body: doc`
      ## Shape
      A **job** is a container plus settings; each **execution** runs **N tasks** (up to a parallelism limit). Every task gets environment variables §CLOUD_RUN_TASK_INDEX§ and §CLOUD_RUN_TASK_COUNT§, runs until it exits, and is billed only while running.

      ~~~bash
      gcloud run jobs execute my-app-worker --tasks 4 \
        --update-env-vars WORKER_STATE=Karnataka,WORKER_PRIORITY=P1,WORKER_CONCURRENCY=16
      ~~~
      The app can do the same through the Cloud Run Admin API — that's the "Start workers" button on the Analyze page.

      ## Example settings
      4 vCPU / 8 GiB per task, 1–8 tasks, 24-hour task timeout (jobs allow up to 7 days), **max retries 0** — a crashed task isn't restarted automatically; its claimed rows are re-queued by the other workers' stale-claim check instead.

      ## Why a job, not the web service
      - The app stays responsive; a deploy of the app doesn't touch running workers.
      - Scale by adding tasks, independently of the UI.
      - Pay per task-hour only while profiling.

      ## Coordinating tasks
      Tasks don't talk to each other. They coordinate through the **database**: claim rows with §FOR UPDATE SKIP LOCKED§, write heartbeats, read a shared stop flag. The task index is useful for logging or for splitting work deterministically when there's no queue.

      ## Watch out for
      Connection limits (tasks × per-task pool), the 10-second grace period after SIGTERM when a task times out, and making each task safe to kill at any moment.
    `,
  }),

  entry('cloud-sql', 'equation', SHIP, 'curious', 'Cloud SQL and the Auth Proxy', {
    summary: 'Managed PostgreSQL on Google Cloud: backups, patches and failover handled for you. You pick a machine tier (which sets the connection limit), and connect through the Cloud SQL connector or proxy rather than an open port.',
    aliases: ['Cloud SQL', 'Cloud SQL Auth Proxy', 'Cloud SQL proxy', 'Cloud SQL connector', 'managed Postgres', 'database tier'],
    tags: ['cloud', 'database'],
    latex: doc`\text{connections needed} \approx P_{\text{app}} + \sum_{\text{tasks}} (c + 4) + \text{headroom} \le \text{max\_connections}`,
    variables: [
      [doc`P_{\text{app}}`, 'The app’s pool: pool size + overflow (30 + 15)'],
      ['c', 'Each worker task’s parallelism (each task keeps c + 4 connections)'],
    ],
    body: doc`
      ## What you get
      PostgreSQL with automated backups, point-in-time recovery if enabled, maintenance windows, metrics, and optional high availability. Extensions like **pgvector** can be enabled on it.

      ## Tiers and connections
      A small custom tier (1 vCPU, 3.75 GB RAM) comes with a default limit of about **100 connections**. More workers need more connections, which means a bigger tier — and **changing the tier restarts the database** for a few minutes, so do it between runs.

      ## Connecting securely
      - **From Cloud Run**: attach the instance; the app connects over a Unix socket through the built-in connector — no public IP, no passwords in transit over the internet.
      - **From your laptop**: run the **Cloud SQL Auth Proxy** (§cloud-sql-proxy PROJECT:REGION:INSTANCE --port 5433§); it authenticates with your gcloud login and exposes the database on localhost. Local scripts connect this way.

      ## Operating it
      - Watch connections and CPU in the metrics; slow-query logs and §pg_stat_statements§ are available.
      - Verify backup retention in the console, and test a restore.
      - Sizing rule of thumb: keep total pool sizes comfortably under the limit — Cloud SQL reserves some connections for itself.
    `,
    calc: {
      inputs: [
        input('app', 'App pool (size + overflow)', '', 45, 1, 500, LOG),
        input('tasks', 'Worker tasks', '', 4, 0, 32, INT),
        input('par', 'Parallelism per task', '', 16, 1, 64, INT),
        input('limit', 'Database max connections', '', 100, 25, 5000, LOG),
      ],
      outputs: [
        out('Worker connections', '', 'tasks*(par + 4)', { key: 'wc' }),
        out('Total if everything is busy', '', 'app + wc', { key: 'tot' }),
        out('Share of the limit', '%', 'tot/limit*100', { digits: 3 }),
        out('Headroom', '', 'limit - tot'),
      ],
      note: 'Four tasks at 16 already need 80 connections; add the app’s full pool and a 100-connection tier is over. In practice pools rarely fill completely — but at the limit, new connections are refused.',
    },
  }),

  entry('cloud-storage-gcs', 'concept', SHIP, 'curious', 'Google Cloud Storage', {
    summary: 'Object storage on Google Cloud: buckets of files addressed by keys like profiles/123_acme.json. The place for generated documents and every uploaded file.',
    aliases: ['Google Cloud Storage', 'GCS', 'bucket', 'buckets', 'gs://', 'object key'],
    tags: ['cloud', 'storage'],
    body: doc`
      ~~~python
      from google.cloud import storage

      client = storage.Client()                                # credentials from the service account
      bucket = client.bucket("my-app-files")
      blob = bucket.blob(f"profiles/{company.id}_{slug}.json")
      blob.upload_from_string(json.dumps(profile, ensure_ascii=False), content_type="application/json")
      data = json.loads(bucket.blob(key).download_as_bytes())
      ~~~
      (The client is synchronous; in an async app call it via §asyncio.to_thread§.)

      ## Keys and prefixes
      There are no real folders: §profiles/§ is a **prefix** of object names, and listing by prefix behaves like browsing a folder. Design key layouts for how you'll list and clean up: by type, then date or id — §imports/{as_of}_{filename}§, §uploads/{date}_{upload_id}_{filename}§.

      ## What goes here vs Postgres
      - **Storage**: whole documents and files — raw uploads, generated JSON profiles, exports. Cheap, durable, versionable.
      - **Postgres**: the queryable facts, with pointers (§gcs_uri§) to the documents.
      Keeping raw files lets you re-process with a better parser, and makes the store a knowledge base later.

      ## Practicalities
      - Access via IAM on the bucket; don't make buckets public. For letting a browser download a private file, use a **signed URL** that expires.
      - Lifecycle rules can delete or archive old objects automatically.
      - Object versioning protects against accidental overwrites.
    `,
  }),
];
