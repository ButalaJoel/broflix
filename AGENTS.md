<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BROFLIX project rules

## Current project status

This repository is intentionally in its foundation phase. The current Next.js app uses the App Router and is compatible with the installed version, 16.3.6.

Do not build the Home page yet.
Do not create movie cards, hero sections, navigation, or visual UI yet.
Do not add routes beyond the architecture skeleton required for future work.
Do not add backend infrastructure or dependencies before they are required.

## Architecture expectations

- Use the App Router structure already established by Next.js: `app/layout.tsx` as the root layout and `app/page.tsx` as the public page entry-point.
- Keep route pages thin and compositional. Pages should describe the route; they should not become large components with mixed responsibilities.
- Keep reusable presentation and interaction logic in `components/` as needed, grouped by domain (for example `layout`, `home`, `movie`, `ui`).
- Keep mock data in `data/` and shared domain models in `types/`.
- Put reusable utilities in `lib/` only when they are genuinely shared and not page-local.
- Keep future API communication, fetching logic, and backend contracts separated from UI code.
- Treat `hooks/`, `config/`, and `public/` as support layers for actual application needs, not as placeholder directories.
- Use TypeScript explicitly and keep naming readable, type-safe, and maintainable.

## Production-oriented but non-overengineered

BROFLIX is being built as a learning project with eventual commercial readiness, but this does not justify premature infrastructure.

- Favor clear, readable TypeScript over abstraction for abstraction's sake.
- Do not install infrastructure before it is needed.
- Do not add dependencies just because a streaming platform may eventually use them.
- Keep every technology choice tied to an actual need in the next implementation step.
- Prefer small, focused files and straightforward responsibilities over clever patterns.

## Future application direction

The intended product structure is:

- `/` for the landing/home entry point
- `/movies` and `/series` for catalogue views
- `/movies/[slug]` and `/watch/[id]` for detail/watch flows
- `/search`, `/my-list`, and `/login` for platform features

These routes are not to be implemented yet unless the task explicitly requires a minimal route scaffold for architecture work. The current task is foundation and discipline, not feature implementation.

## Important framework conventions

- In Next.js 16.3.6 App Router, route `page` and `layout` props such as `params` and `searchParams` are promise-based; access them with `await` when needed.
- Root layout and global styling remain in `app/layout.tsx` and `app/globals.css` unless a valid architecture reason requires a change.
- Follow the current installed documentation in `node_modules/next/dist/docs/` rather than older tutorials or deprecated patterns.
- Keep `AGENTS.md` aligned with the current project intent and architecture.

## Working rules for future Codex sessions

- Before significant changes, inspect the project and relevant Next.js docs in `node_modules/next/dist/docs/`.
- Do not modify unrelated files or overwrite existing project structure without a clear reason.
- Keep the app foundation minimal, production-aware, and easy for multiple developers to extend.
- When you add architectural layers, document why they exist and what responsibility they carry.
- When a request would create UI before the foundation is ready, stop and redirect to the architecture task instead.
