// React & the Frontend: the browser half of the app.

import { AREA, doc, entry, input, INT, LOG, out } from './helpers.js';

const { FRONT } = AREA;

export const FRONT_ENTRIES = [
  entry('react', 'concept', FRONT, 'curious', 'React', {
    summary: 'A JavaScript library for building UIs from components. You describe what the screen should look like for the current data; React keeps the DOM in sync.',
    aliases: ['React', 'React.js', 'ReactJS', 'declarative UI'],
    tags: ['library', 'foundations'],
    year: 2013,
    body: doc`
      ## The one idea
      **UI = f(state).** Instead of writing "when the user clicks, find the counter element and change its text", you write a function that returns what the screen looks like for a given state. When state changes, React calls your function again and updates only the parts of the DOM that differ.

      ~~~jsx
      function Counter() {
        const [count, setCount] = useState(0);
        return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
      }
      ~~~

      ## The pieces, and where to go next
      - **Components** — functions that return JSX; the building blocks.
      - **Props** — inputs passed down from a parent.
      - **State** — data a component remembers between renders (§useState§).
      - **Effects** — syncing with things outside React: timers, subscriptions, the network (§useEffect§).
      - **Hooks** — the §use…§ functions that give components these abilities.

      ## Where it sits in your stack
      React runs in the browser. It builds the interface and calls your Flask API for data. It doesn't do routing, data fetching or styling by itself — you add libraries (React Router, TanStack Query, Tailwind) or use a framework like Next.js that bundles choices.

      ## Versions
      React 19 (December 2024) added Actions, §use§ and refs as plain props; the React Compiler reached 1.0 in October 2025; 19.3 shipped in September 2026. Most tutorials from 2020 onward still apply — function components and hooks haven't changed shape. Anything with §class MyComponent extends React.Component§ is the old style.
    `,
  }),

  entry('jsx', 'concept', FRONT, 'curious', 'JSX', {
    summary: 'HTML-like syntax inside JavaScript that compiles to function calls. Curly braces drop back into JavaScript for values, conditions and lists.',
    aliases: ['JSX', 'TSX'],
    tags: ['syntax'],
    body: doc`
      ~~~jsx
      function NoteCard({ note, onOpen }) {
        return (
          <article className="card" onClick={() => onOpen(note.id)}>
            <h2>{note.title}</h2>
            {note.pinned && <span className="badge">Pinned</span>}
            {note.tags.length > 0 ? (
              <ul>{note.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            ) : (
              <p className="muted">No tags</p>
            )}
          </article>
        );
      }
      ~~~

      ## Rules that trip people up
      - §className§, not §class§; §htmlFor§, not §for§ (they're JavaScript property names).
      - Every tag must close: §<img />§, §<input />§.
      - A component returns **one** root. Wrap siblings in a fragment: §<>…</>§.
      - Inside §{}§ you need an *expression*, not a statement: §&&§ and the ternary instead of §if§; §.map()§ instead of §for§.
      - §{0 && <X />}§ renders a literal **0**. Use §{count > 0 && <X />}§.
      - Styles are objects: §style={{ marginTop: 8 }}§.

      ## What it compiles to
      §<h2>{title}</h2>§ becomes §jsx("h2", { children: title })§ — just a function call that returns a plain object describing the element. That's why you can store JSX in variables, pass it as props and return it from functions.
    `,
  }),

  entry('components-props', 'concept', FRONT, 'curious', 'Components and Props', {
    summary: 'A component is a function from props to JSX. Props flow one way, parent to child; children talk back by calling functions they were given.',
    aliases: ['component', 'components', 'React component', 'props', 'children prop', 'one-way data flow'],
    tags: ['foundations'],
    body: doc`
      ## A component
      ~~~jsx
      function Avatar({ user, size = 32 }) {
        return <img src={user.avatarUrl} alt={user.name} width={size} height={size} />;
      }

      // used as
      <Avatar user={currentUser} size={48} />
      ~~~
      Capitalised name, takes one object of props (destructured here), returns JSX.

      ## Data down, events up
      Props are read-only. A child that needs to change something calls a function prop:
      ~~~jsx
      function NoteList({ notes, onDelete }) {
        return notes.map((n) => (
          <NoteRow key={n.id} note={n} onDelete={() => onDelete(n.id)} />
        ));
      }
      ~~~
      The parent owns the data and decides what "delete" means. This one-way flow makes bugs traceable: to find why something shows the wrong value, walk *up* the tree.

      ## Composition via children
      ~~~jsx
      function Card({ title, children }) {
        return <section className="card"><h2>{title}</h2>{children}</section>;
      }
      <Card title="Sources"><SourceList /></Card>
      ~~~

      ## How big should a component be?
      Split when a piece has its own state, is reused, or the file stops fitting in your head. Don't split preemptively — a 150-line component that reads top to bottom beats ten 15-line ones you have to hop between.
    `,
  }),

  entry('react-state', 'concept', FRONT, 'curious', 'State and useState', {
    summary: 'State is data a component remembers between renders. Setting it schedules a re-render with the new value — it doesn’t change the variable you already have.',
    aliases: ['useState', 'React state', 'component state', 'setState', 'immutable update'],
    tags: ['foundations', 'hooks'],
    body: doc`
      ~~~jsx
      const [query, setQuery] = useState("");
      const [notes, setNotes] = useState([]);
      ~~~

      ## Snapshots, not variables
      Each render gets its own §query§. Calling §setQuery("x")§ doesn't change §query§ in the code that's running; it asks React to render again, and *that* render sees §"x"§:
      ~~~jsx
      setCount(count + 1);
      setCount(count + 1); // still uses the old count: +1 total, not +2
      setCount((c) => c + 1); // updater form: +1 each time, uses the latest
      ~~~

      ## Never mutate
      ~~~jsx
      notes.push(newNote); setNotes(notes);          // ✗ same array, React sees no change
      setNotes([...notes, newNote]);                  // ✓ new array
      setNotes(notes.map((n) => n.id === id ? { ...n, title } : n)); // ✓ edit one
      setNotes(notes.filter((n) => n.id !== id));     // ✓ remove one
      ~~~
      React compares by reference (§Object.is§). Same reference → "nothing changed" → no re-render.

      ## What should be state?
      Only what can't be computed. If you have §notes§ and §query§, the filtered list is *derived* — compute it during render, don't store it:
      ~~~jsx
      const visible = notes.filter((n) => n.title.includes(query));
      ~~~
      Duplicated state drifts out of sync; derived values can't.

      ## Where should it live?
      As low as possible, but high enough that everyone who needs it is below it. Two siblings need it? Lift it to their parent.
    `,
  }),

  entry('react-rendering', 'concept', FRONT, 'curious', 'Rendering and Reconciliation', {
    summary: 'A render is React calling your component to get new JSX. It then diffs old against new and touches only the DOM that changed. Renders are cheap; DOM changes aren’t.',
    aliases: ['re-render', 're-rendering', 'reconciliation', 'virtual DOM', 'React render'],
    tags: ['internals', 'performance'],
    body: doc`
      ## What triggers a render
      1. The component's state changed.
      2. Its parent rendered (so it gets called again, even if props look the same).
      3. A context it reads changed.

      ## Render ≠ DOM update
      "Rendering" just means calling your function. React then **reconciles**: compares the new element tree with the previous one and computes the minimal set of DOM operations. If your component returns the same output, the DOM isn't touched at all. That old tree of plain objects is what people call the virtual DOM.

      ## The diffing shortcuts
      Comparing two arbitrary trees is O(n³). React makes it O(n) with two assumptions:
      - Different element types (§<div>§ → §<section>§, §<A>§ → §<B>§) mean a different subtree: throw away and rebuild, *including state*.
      - In lists, **keys** say which item is which.

      ## When renders get expensive
      Usually they don't — thousands of cheap renders per second are fine. When a big list or heavy chart re-renders on every keystroke:
      - move state down so fewer components render;
      - §useMemo§ for expensive calculations, §memo§ for components with stable props;
      - with the **React Compiler** (stable since late 2025), much of that memoisation happens automatically.

      Measure first: React DevTools' Profiler shows what rendered and why.
    `,
  }),

  entry('lists-keys', 'concept', FRONT, 'curious', 'Lists and Keys', {
    summary: 'When rendering a list, give each item a stable key — usually its database id — so React can tell items apart as the list changes.',
    aliases: ['key prop', 'keys in React', 'rendering lists'],
    tags: ['foundations', 'debugging'],
    body: doc`
      ~~~jsx
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
      ~~~

      ## Why keys
      Insert a note at the top of a list of 100. Without keys React compares by position: item 0 changed, item 1 changed… it rewrites all 100 rows. With keys it sees one new key and inserts one row.

      Worse than slowness: **state follows the key**. If each row has an open/closed toggle or a text input, and you key by array index, deleting row 3 shifts every row after it up by one — and their state stays with the *index*. Row 4's half-typed text now appears in what used to be row 5.

      ## Good keys
      - Database ids — the best.
      - Anything unique and stable across renders.

      ## Bad keys
      - §key={index}§ — only OK for static lists that never reorder.
      - §key={Math.random()}§ — a new key every render, so every row is destroyed and rebuilt every time, losing focus and state.

      ## A trick
      Changing a component's key resets it completely. §<NoteEditor key={noteId} />§ gives you a fresh editor, with fresh state, whenever you switch notes.
    `,
  }),

  entry('use-effect', 'concept', FRONT, 'curious', 'useEffect and Side Effects', {
    summary: 'Effects sync a component with something outside React — a timer, a subscription, the network — after render. Most bugs come from using them where you don’t need to.',
    aliases: ['useEffect', 'side effect', 'side effects', 'dependency array', 'effect cleanup'],
    tags: ['hooks'],
    body: doc`
      ~~~jsx
      useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);    // cleanup: runs before the next effect and on unmount
      }, []);                              // dependencies: [] = only after the first render
      ~~~

      ## The dependency array
      - No array → runs after *every* render.
      - §[]§ → after mount only.
      - §[noteId]§ → after mount and whenever §noteId§ changes.
      List every value from the component the effect uses. The ESLint rule §react-hooks/exhaustive-deps§ checks this — trust it.

      ## You might not need an effect
      - Computing something from props or state? Just compute it during render.
      - Responding to a click? Do it in the event handler.
      - Resetting state when a prop changes? Use a §key§.
      Effects that set state based on other state cause extra renders and loops.

      ## Fetching in an effect — do it right
      ~~~jsx
      useEffect(() => {
        let ignore = false;
        fetch(§/api/notes/\${noteId}§)
          .then((r) => r.json())
          .then((data) => { if (!ignore) setNote(data); });
        return () => { ignore = true; };   // stale response for an old noteId is dropped
      }, [noteId]);
      ~~~
      Without §ignore§, clicking quickly between notes can show an old note's data when its slower response lands last — a race condition. Libraries like TanStack Query handle this for you.
    `,
  }),

  entry('react-hooks', 'concept', FRONT, 'curious', 'Hooks and Their Rules', {
    summary: 'Hooks are the use… functions that give components state, effects, refs and memoisation. Call them at the top level, in the same order, every render.',
    aliases: ['React hooks', 'hooks', 'custom hook', 'custom hooks', 'useRef', 'useMemo', 'useCallback', 'rules of hooks'],
    tags: ['hooks'],
    year: 2019,
    body: doc`
      ## The everyday set
      | Hook | For |
      |---|---|
      | §useState§ | a value that triggers re-render when set |
      | §useEffect§ | syncing with the outside world |
      | §useRef§ | a mutable box that *doesn't* trigger re-renders — DOM nodes, timers, the previous value |
      | §useMemo§ | cache an expensive computed value |
      | §useCallback§ | cache a function so its identity stays stable |
      | §useContext§ | read a value provided higher up |

      ## The rules
      1. Only call hooks at the **top level** of a component or custom hook — not inside §if§, loops or callbacks.
      2. Only call them from React functions.
      React identifies each hook by its **call order**. A hook inside an §if§ shifts every hook after it, and state ends up in the wrong place.

      ## Custom hooks
      Any function starting with §use§ that calls other hooks. The way to reuse logic:
      ~~~jsx
      function useDebounced(value, ms = 300) {
        const [debounced, setDebounced] = useState(value);
        useEffect(() => {
          const t = setTimeout(() => setDebounced(value), ms);
          return () => clearTimeout(t);
        }, [value, ms]);
        return debounced;
      }

      const q = useDebounced(searchText);  // search the API only when typing pauses
      ~~~
      Each component that calls a custom hook gets its *own* state — hooks share logic, not data.
    `,
  }),

  entry('react-forms', 'concept', FRONT, 'curious', 'Forms and Controlled Inputs', {
    summary: 'A controlled input takes its value from state and reports every change; React is the single source of truth. Uncontrolled inputs let the DOM hold the value until submit.',
    aliases: ['controlled input', 'controlled component', 'uncontrolled input', 'form handling', 'onSubmit'],
    tags: ['ui'],
    body: doc`
      ## Controlled
      ~~~jsx
      function NewNote({ onCreate }) {
        const [title, setTitle] = useState("");
        const [busy, setBusy] = useState(false);

        async function handleSubmit(e) {
          e.preventDefault();                 // stop the browser's full-page form post
          if (!title.trim()) return;
          setBusy(true);
          try {
            await onCreate(title);
            setTitle("");
          } finally {
            setBusy(false);
          }
        }

        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button disabled={busy || !title.trim()}>{busy ? "Saving…" : "Save"}</button>
          </form>
        );
      }
      ~~~
      Every keystroke → §onChange§ → state → re-render with the new §value§. You can validate, transform or disable as the user types.

      ## Uncontrolled
      Leave out §value§, read the fields on submit with §new FormData(e.target)§. Less code, fine for simple forms. React 19's form **Actions** (§<form action={fn}>§ with §useActionState§) build on this.

      ## Details that make forms feel good
      - Disable the button while submitting — or users double-click and create two notes.
      - Show server validation errors next to the field they belong to.
      - Always a §<label>§ per input. Enter to submit comes free with a real §<form>§.
      - Validate on the server anyway. The client's checks are for convenience, not security.

      For big forms, React Hook Form with a Zod schema saves a lot of boilerplate.
    `,
  }),

  entry('fetching-data', 'concept', FRONT, 'curious', 'Fetching Data in React', {
    summary: 'Calling your API from components: fetch, handle loading and errors, avoid races, cache results. TanStack Query does the hard parts; knowing what it does matters.',
    aliases: ['fetch API', 'fetch()', 'data fetching', 'TanStack Query', 'React Query', 'loading state'],
    tags: ['data', 'api'],
    body: doc`
      ## The raw version
      ~~~js
      async function api(path, options = {}) {
        const res = await fetch(§/api\${path}§, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",            // send cookies
          ...options,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || §HTTP \${res.status}§);
        }
        return res.status === 204 ? null : res.json();
      }
      ~~~
      §fetch§ only rejects on network failure — a 404 or 500 *resolves*. Always check §res.ok§.

      ## Every fetch has three states
      Loading, error, success. Plus: stale data while refetching, a request for an old id finishing after a new one, retrying, and refreshing after a mutation.

      ## TanStack Query
      ~~~jsx
      const { data: notes, isPending, error } = useQuery({
        queryKey: ["notes", query],
        queryFn: () => api(§/notes?q=\${encodeURIComponent(query)}§),
      });

      const create = useMutation({
        mutationFn: (title) => api("/notes", { method: "POST", body: JSON.stringify({ title }) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
      });
      ~~~
      It caches by key, dedupes identical requests, drops stale responses, retries, refetches when the window regains focus, and refreshes lists after mutations. For an app that mostly shows server data, it replaces most hand-written state.

      ## Waterfalls
      Component A fetches, renders B, which fetches, renders C, which fetches: three sequential round trips. Fetch in parallel higher up, or design an endpoint that returns what the page needs in one go.
    `,
  }),

  entry('sharing-state', 'concept', FRONT, 'curious', 'Sharing State: Lifting Up and Context', {
    summary: 'When components need the same data, move state to their closest common parent. When passing it through many layers gets silly, Context delivers it directly.',
    aliases: ['lifting state up', 'React Context', 'useContext', 'prop drilling', 'Zustand', 'global state'],
    tags: ['architecture'],
    body: doc`
      ## Lift it up
      A search box and a results list both need §query§. Neither should own it: their parent does, passing §query§ down to both and §setQuery§ to the box.

      ## Prop drilling, and when it's fine
      Passing §user§ through five components that don't use it, just to reach the one that does, is "prop drilling". Two or three levels? Fine — explicit is good. Deep and everywhere? Use context.

      ## Context
      ~~~jsx
      const AuthContext = createContext(null);

      function AuthProvider({ children }) {
        const [user, setUser] = useState(null);
        return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
      }

      function useAuth() {
        return useContext(AuthContext);
      }

      // anywhere below:
      const { user } = useAuth();
      ~~~
      Good for things many components read and that change rarely: the current user, theme, locale. (Before React 19 you wrote §<AuthContext.Provider>§.)

      ## What *not* to put in context
      Fast-changing values — every consumer re-renders on every change. And server data: that belongs in a data-fetching cache like TanStack Query.

      ## Bigger stores
      Zustand (tiny) or Redux Toolkit (structured) when lots of client-side state is shared and updated from many places — a drawing app, an offline editor. Most CRUD apps never need one.
    `,
  }),

  entry('client-routing', 'concept', FRONT, 'curious', 'Client-Side Routing', {
    summary: 'In a single-page app, the URL changes without a full page load: a router maps paths to components. Links stay shareable and the back button still works.',
    aliases: ['React Router', 'client-side routing', 'routing', 'router', 'single-page app', 'SPA'],
    tags: ['architecture'],
    body: doc`
      ## Single-page app
      The server sends one HTML page and one JavaScript bundle. After that, "navigating" is JavaScript swapping components and updating the address bar with the History API — no reload, state kept, instant.

      ## React Router
      ~~~jsx
      const router = createBrowserRouter([
        { path: "/", element: <Home /> },
        { path: "/notes/:noteId", element: <NotePage /> },
        { path: "*", element: <NotFound /> },
      ]);

      function NotePage() {
        const { noteId } = useParams();
        // fetch and show the note…
      }

      <Link to={§/notes/\${note.id}§}>{note.title}</Link>
      ~~~
      Use §<Link>§, not §<a href>§, for internal links — a plain anchor reloads the whole app.

      ## The server has to cooperate
      Refresh on §/notes/42§ and the browser asks the *server* for §/notes/42§. Flask has no such route → 404. Fix: serve §index.html§ for every non-API, non-file path (a catch-all route), and keep API routes under §/api/§ so they never collide.

      ## Put state in the URL
      Anything a user might want to bookmark or share — the open note, the search query, the current tab — belongs in the path or query string, not only in component state.
    `,
  }),

  entry('typescript', 'concept', FRONT, 'curious', 'TypeScript', {
    summary: 'JavaScript with type annotations checked before running. Catches typos, wrong shapes and missing nulls in the editor instead of in production.',
    aliases: ['TypeScript', 'type annotations', 'type checking'],
    tags: ['language'],
    year: 2012,
    body: doc`
      ~~~ts
      type Note = {
        id: number;
        title: string;
        tags: string[];
        pinned?: boolean;          // optional
        parentId: number | null;   // union: may be null
      };

      async function getNote(id: number): Promise<Note> {
        const res = await fetch(§/api/notes/\${id}§);
        return res.json();         // trusts the server! see below
      }

      function NoteCard({ note }: { note: Note }) {
        return <h2>{note.titel}</h2>;   // ✗ error in the editor: 'titel' doesn't exist
      }
      ~~~

      ## Why bother on a side project
      - Autocomplete that actually knows your data.
      - Renaming a field shows every place that breaks.
      - "Cannot read properties of undefined" mostly disappears: TypeScript makes you handle §null§.

      ## Coming from Python type hints
      Same idea as §def f(x: int) -> str§ checked by mypy — except in TypeScript the checker is always on, and the ecosystem expects it.

      ## The boundary problem
      Types vanish at runtime. §res.json()§ returns whatever the server sent; TypeScript just *believes* your annotation. Validate API responses at the boundary (Zod), or generate types from the backend's schema (OpenAPI) so the two can't drift.

      Start a Vite project with the §react-ts§ template and you're set up. §any§ switches checking off — use it sparingly, like §# type: ignore§.
    `,
  }),

  entry('vite', 'concept', FRONT, 'curious', 'Vite and the Build Step', {
    summary: 'Vite runs a fast dev server with instant updates, and bundles your JSX, TypeScript and CSS into small static files for production.',
    aliases: ['Vite', 'bundler', 'build step', 'hot module replacement', 'HMR', 'npm run build', 'Create React App'],
    tags: ['tooling'],
    year: 2020,
    body: doc`
      ## Why a build step at all
      Browsers don't understand JSX or TypeScript, and loading 800 separate module files would be slow. A build tool transforms and bundles them.

      ## Start a project
      ~~~bash
      npm create vite@latest frontend -- --template react-ts
      cd frontend
      npm install
      npm run dev        # http://localhost:5173
      ~~~
      (Create React App, the old default, was deprecated in 2025. Vite is the standard for a React SPA.)

      ## Dev: talk to Flask without CORS
      ~~~js
      // vite.config.ts
      export default defineConfig({
        plugins: [react()],
        server: {
          proxy: { "/api": "http://localhost:5000" },
        },
      });
      ~~~
      The browser only ever talks to :5173; Vite forwards §/api/*§ to Flask. Same origin, no CORS, cookies just work.

      ## Build
      §npm run build§ writes §dist/§: an §index.html§ and a few hashed files like §assets/index-3f9a1c.js§. Those are plain static files — Flask, nginx or any static host can serve them. Nothing Node-related runs in production.

      ## Environment variables
      Only variables prefixed §VITE_§ are exposed to your code (§import.meta.env.VITE_API_URL§) — and they're baked into the public bundle. **Never put secrets there.** An LLM key in a §VITE_§ variable is published to every visitor.
    `,
  }),

  entry('npm', 'concept', FRONT, 'curious', 'npm and package.json', {
    summary: 'npm installs JavaScript packages listed in package.json into node_modules, pins exact versions in a lockfile, and runs your project’s scripts.',
    aliases: ['npm', 'package.json', 'node_modules', 'package-lock.json', 'npx', 'semver', 'semantic versioning'],
    tags: ['tooling'],
    year: 2010,
    body: doc`
      ## package.json
      ~~~json
      {
        "scripts": { "dev": "vite", "build": "tsc -b && vite build", "lint": "eslint ." },
        "dependencies": { "react": "^19.2.0", "react-dom": "^19.2.0" },
        "devDependencies": { "vite": "^8.0.0", "typescript": "^5.9.0" }
      }
      ~~~
      - **dependencies** ship with the app; **devDependencies** are for building and testing.
      - §npm run dev§ runs a script. §npx some-tool§ runs a package's command without installing it globally.

      ## Semantic versioning
      §MAJOR.MINOR.PATCH§ — breaking changes, new features, fixes. §^19.2.0§ means "any 19.x.y at or above 19.2.0". The **lockfile** (§package-lock.json§) records the exact versions actually installed, so everyone — and your CI — gets the same tree. Commit it. Don't commit §node_modules§.

      ## Node.js
      npm comes with Node.js, which runs JavaScript outside the browser. For a Vite + Flask project you need Node only for development and building; the production site is static files. Use an LTS release (Node 24 in 2026).

      ## Dependency hygiene
      A fresh React app pulls in hundreds of transitive packages, each a small trust decision (see left-pad and the xz backdoor). Prefer well-known packages, check what a new one pulls in, and run §npm audit§ now and then.
    `,
  }),

  entry('styling', 'concept', FRONT, 'curious', 'Styling React: CSS Modules and Tailwind', {
    summary: 'Ways to keep styles from colliding in a component app: scoped CSS Modules, utility classes with Tailwind, or a component library on top.',
    aliases: ['Tailwind', 'Tailwind CSS', 'CSS Modules', 'utility classes', 'shadcn/ui', 'component library'],
    tags: ['styling'],
    body: doc`
      ## The problem
      One global stylesheet plus 80 components means §.title§ in one file breaks §.title§ in another.

      ## CSS Modules (built into Vite)
      ~~~jsx
      import styles from "./NoteCard.module.css";   // .card { … } .title { … }
      <article className={styles.card}><h2 className={styles.title}>…</h2></article>
      ~~~
      Class names are renamed per file, so nothing leaks. Plain CSS, just scoped.

      ## Tailwind
      ~~~jsx
      <article className="rounded-lg border p-4 shadow-sm hover:shadow-md">
        <h2 className="text-lg font-semibold">{note.title}</h2>
      </article>
      ~~~
      Small single-purpose classes composed in the markup. Looks noisy at first; in practice you never name things, never switch files, and a design system (spacing scale, colours) is built in. Very popular with React — and LLMs write it fluently.

      ## Component libraries
      Buttons, dialogs, menus and date pickers that are accessible and keyboard-friendly are genuinely hard to build. **shadcn/ui** (copy-in components on Tailwind and Radix), MUI or Mantine give you those. For a side project that needs to look decent fast, pick one early.

      Whatever you choose: use CSS variables for colours so dark mode is one switch.
    `,
  }),

  entry('spa-vs-ssr', 'question', FRONT, 'curious', 'SPA or server rendering (Next.js)?', {
    summary: 'A single-page app renders in the browser; server rendering sends finished HTML. For a logged-in tool with a Flask API, a Vite SPA is usually simplest.',
    aliases: ['server-side rendering', 'SSR', 'Next.js', 'static site generation', 'React Server Components', 'hydration'],
    tags: ['architecture', 'decisions'],
    body: doc`
      ## The options
      - **SPA (Vite + React)** — server sends an empty shell plus JavaScript; the browser renders everything and calls your API. Simple mental model, static hosting, clean separation from Flask.
      - **SSR (Next.js, React Router framework mode)** — the server runs React per request and sends HTML, then **hydrates** it in the browser to make it interactive. Faster first paint, good for SEO.
      - **React Server Components** — components that run only on the server (can query the database directly) mixed with client components. Powerful, and a different architecture: the "backend" is partly inside the React framework.

      ## For your stack
      With a Flask + Postgres backend, Next.js would mean *two* servers (Node for rendering, Python for the API) and the question of which one owns what. A Vite SPA keeps one clear line: React draws, Flask decides.

      Pick SSR when:
      - search engines must index the pages (a public blog, a marketplace);
      - first-load speed on slow phones is critical;
      - you'd rather write the backend in TypeScript anyway.

      Stay SPA when it's an app behind a login, a dashboard, a chat with an LLM, an internal tool — which is most side projects.
    `,
  }),

  entry('streaming-chat-ui', 'example', FRONT, 'curious', 'Streaming a Chat UI', {
    summary: 'Reading an LLM’s streamed reply in React: POST the message, read the response body chunk by chunk, append each token to state.',
    aliases: ['chat UI', 'streaming UI', 'ReadableStream'],
    tags: ['llm', 'streaming', 'walkthrough'],
    body: doc`
      Pairs with the Flask side in Streaming Responses from Flask, which sends Server-Sent Events.

      ~~~jsx
      function Chat() {
        const [messages, setMessages] = useState([]);
        const [input, setInput] = useState("");
        const [streaming, setStreaming] = useState(false);

        async function send(e) {
          e.preventDefault();
          const history = [...messages, { role: "user", content: input }];
          setMessages([...history, { role: "assistant", content: "" }]);
          setInput("");
          setStreaming(true);

          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
          });
          const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
          let buffer = "";
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += value;
            const events = buffer.split("\n\n");
            buffer = events.pop();                    // keep any half-received event
            for (const ev of events) {
              const data = ev.replace(/^data: /, "");
              if (data === "[DONE]") continue;
              const { delta } = JSON.parse(data);
              setMessages((m) => {
                const last = m[m.length - 1];
                return [...m.slice(0, -1), { ...last, content: last.content + delta }];
              });
            }
          }
          setStreaming(false);
        }
        // …render messages and a form that calls send
      }
      ~~~

      ## The details that matter
      - **Chunks ≠ events.** A network chunk can hold half an event or three. Buffer and split on the blank line.
      - **Updater form** of §setMessages§ — many updates land before React re-renders.
      - The server is **stateless**: the whole history goes up with each message.
      - Add an **AbortController** so a Stop button can cancel mid-stream, and auto-scroll only if the user is already at the bottom.
      - Render the reply's Markdown through a sanitiser — model output is untrusted input (XSS, prompt injection).
    `,
  }),

  entry('accessibility', 'concept', FRONT, 'curious', 'Accessibility', {
    summary: 'Making the app usable with a keyboard, a screen reader, zoomed text or poor eyesight. Mostly it’s using the right HTML element and a visible focus outline.',
    aliases: ['accessibility', 'a11y', 'ARIA', 'screen reader', 'keyboard navigation'],
    tags: ['ui', 'quality'],
    body: doc`
      ## The 80% that's cheap
      - Buttons are §<button>§, links are §<a href>§. A clickable §<div>§ can't be reached by Tab or activated by Enter.
      - Every input has a §<label>§. Every meaningful image has §alt§ text (decorative ones get §alt=""§).
      - Never remove the focus outline without replacing it.
      - Text contrast at least 4.5:1. Don't carry meaning by colour alone ("errors in red").
      - Headings in order — screen-reader users skim by heading, like everyone else skims visually.

      ## ARIA
      Attributes like §aria-label§, §aria-expanded§ and §role§ describe custom widgets to assistive tech. First rule of ARIA: don't use ARIA if a native element does the job. A native §<dialog>§ or a component library (Radix, React Aria) gets focus traps and keyboard handling right.

      ## For an LLM chat
      Streaming text is noisy for screen readers. Announce the finished reply with an §aria-live="polite"§ region rather than every token.

      ## Test it
      Unplug the mouse and use Tab, Shift+Tab, Enter, Esc. Run Lighthouse in DevTools. Five minutes finds most problems.
    `,
  }),

  entry('effect-runs-twice', 'question', FRONT, 'curious', 'Why does my effect run twice?', {
    summary: 'In development, StrictMode mounts every component, unmounts it and mounts it again, to flush out effects without proper cleanup. Production runs them once.',
    aliases: ['StrictMode', 'strict mode', 'double render'],
    tags: ['debugging', 'hooks'],
    body: doc`
      ## What you see
      A §console.log§ in §useEffect§ prints twice. Your API gets two identical requests on page load. You didn't do anything wrong.

      ## Why
      §<StrictMode>§ (on by default in a Vite template's §main.tsx§) deliberately runs **mount → unmount → mount** in development. It's a test: a correct effect with correct cleanup behaves the same after the extra cycle. One that subscribes without unsubscribing, or starts a timer without clearing it, now visibly misbehaves — in development, where you can see it, rather than months later when a user navigates back and forth.

      ## What to do
      - Write the cleanup: unsubscribe, clear timers, abort fetches (an §AbortController§ or an §ignore§ flag).
      - Don't turn off StrictMode to hide it.
      - Duplicate GETs in dev are harmless. For things that must not happen twice (a POST that creates a record on mount?), that's a sign it shouldn't be in an effect — trigger it from a user event instead.
      - Data-fetching libraries dedupe the double request for you.

      Production builds don't double-invoke anything.
    `,
  }),

  entry('devtools', 'concept', FRONT, 'curious', 'Browser DevTools', {
    summary: 'The debugger built into every browser: inspect the DOM and styles, watch every network request, read console errors, set breakpoints, profile slowness.',
    aliases: ['DevTools', 'developer tools', 'Network tab', 'browser console', 'React DevTools'],
    tags: ['debugging', 'tooling'],
    body: doc`
      Press **F12** (or Ctrl+Shift+I). The tabs you'll live in:

      - **Elements** — the live DOM. Hover to highlight, edit CSS on the fly, see which rule won and why.
      - **Console** — errors and your §console.log§s. Red text here is the first thing to read when a page is blank.
      - **Network** — every request: URL, status, timing, headers, request and response bodies. When "the API isn't working", this answers *what was sent* and *what came back*. Tick "Preserve log" to keep requests across reloads; right-click → "Copy as cURL" to replay one in a terminal.
      - **Sources** — set breakpoints in your code (Vite serves source maps, so you see your real files). The §debugger;§ statement pauses there too.
      - **Application** — cookies, localStorage. Check your session cookie's HttpOnly/SameSite flags here.
      - **Performance / Lighthouse** — record what the page spends time on; audit load speed and accessibility.

      Add the **React DevTools** extension for a Components tab (props, state and hooks of any component) and a Profiler (what re-rendered and why).

      The single most useful habit: when something's wrong, open the Network tab *before* guessing.
    `,
  }),
];
