<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BROFLIX project rules

## Current project status

BROFLIX is a working front-end streaming app on Next.js 16.3.6 (App Router). The foundation phase is done; these routes are implemented:

| Route | Purpose |
| --- | --- |
| `/` | Home: featured hero, trending rows, "More Like This" |
| `/movies`, `/series` | Catalogue with genre filter and sort (`components/movie/catalog-browser.tsx`) |
| `/movies/[slug]`, `/series/[slug]` | Title details + related titles (statically generated) |
| `/watch/[id]` | Native `<video>` player (`components/watch/video-player.tsx`) |
| `/search?q=` | Server-rendered search over title, description, genre, year |
| `/my-list` | Saved titles (browser localStorage via `hooks/use-my-list.ts`) |
| `/login` | Demo sign-in (localStorage profile; no real auth yet) |
| `/help`, `/contact`, `/privacy`, `/terms` | Static info pages (`app/(info)/[page]`) |

Next steps when they are actually needed: real auth, a backend/API for the catalogue, real video assets (HLS), and server-side My List.

## Architecture expectations

- `app/layout.tsx` is the root layout; `components/layout/app-shell.tsx` renders header + footer on every page.
- Keep route pages thin and compositional; put UI in `components/` grouped by domain (`layout`, `home`, `movie`, `watch`, `search`, `account`, `ui`).
- **All catalogue reads go through `lib/catalog.ts`.** Pages never import `data/` directly (the home page's featured/trending lists are the one legacy exception). Swapping mock data for an API means changing only `lib/catalog.ts`.
- Mock data lives in `data/`, shared models in `types/`.
- Browser-only state (My List, demo profile) uses `useSyncExternalStore` over localStorage so it is hydration-safe and syncs across tabs.
- Use TypeScript explicitly and keep naming readable, type-safe, and maintainable.

## Production-oriented but non-overengineered

- Favor clear, readable TypeScript over abstraction for abstraction's sake.
- Do not add dependencies just because a streaming platform may eventually use them. (The app currently has zero runtime deps beyond Next/React.)
- Prefer small, focused files and straightforward responsibilities over clever patterns.

## Content rule

Only stream video BROFLIX has the rights to: public-domain or Creative Commons works (currently via the Internet Archive embed player / Wikimedia Commons), or licensed files on BROFLIX's own storage. Never wire in pirate "free streaming" embed sources or scraped links. Keep each title's `credit` line visible.

## Important framework conventions

- In Next.js 16.3.6 App Router, route `page` and `layout` props such as `params` and `searchParams` are promise-based; use the generated `PageProps<"/route">` type and `await` them.
- Client components that call `useSearchParams` need a `<Suspense>` boundary; prefer reading `searchParams` in a server page instead.
- Follow the installed documentation in `node_modules/next/dist/docs/` rather than older tutorials.
- Keep `AGENTS.md` aligned with the current project intent and architecture.

## Working rules for future sessions

- Before significant changes, inspect the project and relevant Next.js docs in `node_modules/next/dist/docs/`.
- Do not modify unrelated files or overwrite existing project structure without a clear reason.
- Run `npm run lint` and `npm run build` before committing.
