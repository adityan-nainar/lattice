// The main path: one route through the graph for learning the side-project stack properly,
// from how a computer runs code to a RAG app with local models. Everything else stays open for
// wandering; this is the thread to come back to.
//
// Rules (checked by npm run check): every step exists, appears once, links to at least one
// earlier step, and comes after anything on the path that it builds on.

export const ROUTE = {
  title: 'Main path',
  intro:
    'One route through everything, in an order where each step builds on the ones before — from how a computer runs code to shipping a React + Python + Postgres app on Google Cloud that collects web data and talks to hosted and local LLMs. Follow it to learn properly; wander off whenever something catches your eye, and come back with “Continue”.',
  stages: [
    {
      id: 'machine',
      title: 'Your machine',
      blurb: 'What a computer is doing when it runs code, and the tools you’ll use every day.',
      steps: ['how-computers-run-code', 'binary-numbers', 'operating-systems', 'files-and-paths', 'terminal', 'code-editors', 'installing-tools', 'wsl'],
    },
    {
      id: 'programming',
      title: 'Programming, in Python',
      blurb: 'The ideas every language shares, learned in the language of your backend and of AI.',
      steps: [
        'programming-basics', 'compilers-interpreters', 'python-basics', 'variables-types', 'control-flow', 'functions-basics',
        'strings-text', 'data-structures-basics', 'python-collections', 'mutability', 'errors-exceptions',
        'reading-docs', 'debugging', 'scope-closures', 'oop', 'modules-imports', 'libraries-frameworks', 'virtual-environments',
        'python-files-context', 'python-type-hints', 'python-decorators', 'python-generators', 'algorithms-basics', 'big-o',
        'sorting', 'binary-search', 'hash-maps', 'recursion', 'trees-graphs',
      ],
    },
    {
      id: 'git',
      title: 'Working like a developer',
      blurb: 'Version control, configuration and the habits that keep a project sane.',
      steps: ['git', 'git-branching', 'github-prs', 'env-vars', 'secrets', 'linters-formatters', 'data-formats', 'json'],
    },
    {
      id: 'data',
      title: 'Data and SQL',
      blurb: 'From the SQL you know to designing tables for an app that many people use at once.',
      steps: [
        'relational-model', 'data-modeling', 'keys-constraints', 'sql-select', 'sql-joins', 'sql-aggregates', 'sql-ctes-windows',
        'sql-modify', 'normalization', 'postgres', 'column-types', 'indexes', 'explain-analyze', 'transactions-acid',
        'upsert-returning', 'sql-injection', 'pagination',
      ],
    },
    {
      id: 'web',
      title: 'How the web works',
      blurb: 'What travels between a browser and a server, and what makes it secure.',
      steps: [
        'internet-basics', 'tcp-ip', 'ports-localhost', 'dns', 'client-server', 'urls', 'http', 'http-methods', 'status-codes',
        'encryption', 'tls-https', 'web-servers', 'websites-web-apps', 'apis', 'rest', 'cookies', 'cors', 'latency-bandwidth',
      ],
    },
    {
      id: 'browser',
      title: 'The browser: HTML, CSS, JavaScript',
      blurb: 'The three languages of the front end, and how the browser turns them into a page.',
      steps: [
        'html', 'html-forms', 'css', 'javascript', 'js-values-types', 'js-functions', 'js-arrays-objects', 'functional-style',
        'dom', 'dom-events', 'event-loop', 'concurrency', 'async-await', 'browser-rendering', 'open-a-url', 'devtools', 'npm',
        'typescript', 'xss',
      ],
    },
    {
      id: 'react',
      title: 'React',
      blurb: 'Building the interface of your app out of components, state and effects.',
      steps: [
        'react', 'jsx', 'components-props', 'react-state', 'react-rendering', 'lists-keys', 'use-effect', 'effect-runs-twice',
        'react-hooks', 'react-forms', 'fetching-data', 'sharing-state', 'client-routing', 'vite', 'styling', 'accessibility',
      ],
    },
    {
      id: 'flask',
      title: 'The Python backend: Flask and FastAPI',
      blurb: 'An API that validates input, talks to Postgres, knows who’s asking and what they may do — first in Flask, then async with FastAPI.',
      steps: [
        'flask', 'flask-routes', 'flask-request-response', 'input-validation', 'flask-errors', 'flask-app-factory', 'sqlalchemy',
        'n-plus-one', 'schema-migrations', 'password-hashing', 'authentication', 'jwt', 'csrf', 'owasp-top-ten',
        'calling-http-apis', 'idempotency', 'rate-limiting', 'flask-vs-fastapi',
        'asgi-uvicorn', 'fastapi', 'fastapi-dependencies', 'middleware', 'async-sqlalchemy', 'rbac', 'session-tokens',
        'audit-trails', 'leak-deterrents', 'transactional-email', 'invite-reset-links', 'least-privilege',
        'file-upload-processing', 'schema-at-startup',
      ],
    },
    {
      id: 'ship',
      title: 'Shipping it, on Google Cloud',
      blurb: 'Tests, containers and a server that stays up — then the Google Cloud pieces: Cloud Run, Jobs, Cloud SQL, Storage and IAM.',
      steps: [
        'testing', 'docker', 'docker-compose', 'project-layout', 'wsgi-gunicorn', 'connection-pooling', 'deployment', 'reverse-proxy', 'ci-cd',
        'logging-monitoring', 'backups', 'availability-nines', 'object-storage', 'background-jobs',
        'google-cloud-basics', 'iam-service-accounts', 'cloud-build-images', 'cloud-run', 'cloud-run-jobs', 'cloud-sql',
        'cloud-storage-gcs',
      ],
    },
    {
      id: 'web-data',
      title: 'Collecting web data',
      blurb: 'Crawling, parsing and rendering sites, cleaning spreadsheets, matching records to the right company, scoring — and workers that stop safely.',
      steps: [
        'data-pipelines', 'web-crawling', 'html-parsing', 'headless-browsers', 'blocked-cloud-ips', 'search-apis',
        'scraping-responsibly', 'spreadsheets-in-out', 'messy-input-files', 'india-addresses-geo', 'entity-resolution',
        'fuzzy-matching', 'provenance-evidence', 'heuristics-flags', 'rule-based-scoring', 'worker-pools', 'stop-rules',
        'snapshots-diffs',
      ],
    },
    {
      id: 'maths',
      title: 'Maths for AI',
      blurb: 'Just enough: functions and slopes, vectors and matrices, probability and spread.',
      steps: [
        'functions-graphs', 'exponents-logs', 'sigma-notation', 'vectors-dot-product', 'linear-algebra-basics',
        'matrix-multiplication', 'derivatives', 'partial-derivatives', 'chain-rule', 'probability-basics',
        'probability-distributions', 'mean-variance', 'confidence-intervals', 'entropy-information', 'floating-point',
      ],
    },
    {
      id: 'ml',
      title: 'Machine learning',
      blurb: 'How a model learns from examples, from a straight line to a neural network.',
      steps: [
        'machine-learning', 'features-labels', 'classification-regression', 'loss-functions', 'linear-regression', 'gradient-descent',
        'softmax', 'cross-entropy', 'evaluation-metrics', 'overfitting', 'activation-functions', 'neural-networks',
        'backpropagation', 'training-loop', 'training-vs-inference', 'numpy', 'pandas', 'jupyter', 'pytorch', 'gpus',
        'embeddings', 'cosine-similarity',
      ],
    },
    {
      id: 'llms',
      title: 'Transformers and LLMs',
      blurb: 'What’s inside the models you’ll call: tokens, attention, pretraining and post-training.',
      steps: [
        'tokenization', 'strawberry-question', 'attention', 'transformer', 'positional-encoding', 'kv-cache', 'next-token-prediction',
        'sampling-temperature', 'parameter-count', 'llms', 'fine-tuning', 'rlhf', 'reasoning-models', 'hallucination',
      ],
    },
    {
      id: 'building',
      title: 'Building with LLMs',
      blurb: 'Calling models from Flask, streaming to React, tools and agents — and keeping it cheap and safe.',
      steps: [
        'llm-api', 'gemini-api', 'token-cost', 'context-window', 'prompt-engineering', 'structured-output', 'llm-extraction',
        'conversation-memory',
        'sse-websockets', 'flask-streaming', 'streaming-chat-ui', 'llm-latency', 'prompt-caching',
        'tool-use', 'agents', 'mcp', 'prompt-injection', 'evals', 'llm-as-judge', 'llm-observability',
      ],
    },
    {
      id: 'rag',
      title: 'RAG, graphs and questions over data',
      blurb: 'Answering from your own documents and tables: pgvector search, RAG with citations, knowledge graphs, GraphRAG and text-to-SQL.',
      steps: [
        'vector-search', 'rag', 'chunking', 'pgvector', 'full-text-search', 'hybrid-search', 'semantic-search-product',
        'multimodal-input', 'rag-walkthrough', 'knowledge-graphs', 'graphrag', 'text-to-sql', 'prompt-rag-or-finetune',
      ],
    },
    {
      id: 'local',
      title: 'Local AI',
      blurb: 'Running open models on your own machine, and wiring them into the app.',
      steps: [
        'local-llms', 'open-weight-families', 'quantization', 'gguf', 'model-names', 'model-memory',
        'tokens-per-second', 'local-hardware', 'llama-cpp', 'ollama', 'local-embeddings', 'openai-compatible-apis',
        'flask-ollama-walkthrough', 'choosing-a-model',
      ],
    },
  ],
};

export default ROUTE;
