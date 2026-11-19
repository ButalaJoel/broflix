# BROFLIX

Movies and series for the bros. A Netflix-style streaming front end built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS 4**, with no other runtime dependencies.

## Features

- **Home**: featured hero with autoplaying preview, trending movie/series rows, and "More Like This" that updates as you pick titles
- **Catalogue**: `/movies` and `/series` with genre filters and sorting (best match, top rated, newest, A–Z)
- **Details pages**: `/movies/[slug]` and `/series/[slug]`, statically generated with Open Graph metadata
- **Watch page**: `/watch/[id]` full-screen player with auto-hiding title bar and a graceful error state
- **Search**: header search box → `/search?q=` (title, description, genre, year)
- **My List**: save titles from any card, hero or details page. Stored in the browser and synced across tabs
- **Account**: demo sign-in / sign-up at `/login` (local only, ready to swap for real auth)
- Help, Contact, Privacy and Terms pages, plus a custom 404

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Optional: set `NEXT_PUBLIC_SITE_URL` in production so social-share images resolve to your domain.

## Project structure

```
app/                 routes (thin pages)
  (info)/[page]/     help, contact, privacy, terms
  movies/ series/    catalogue + [slug] details
  watch/[id]/        player
  search/ my-list/ login/
components/
  layout/            header, app shell
  home/              hero, rows, cards, footer
  movie/             catalogue browser, details, My List button
  watch/             video player
  account/           My List view, login form
  ui/                page intro, empty state
lib/catalog.ts       the ONLY place pages read titles from: swap for an API later
hooks/use-my-list.ts localStorage-backed list (useSyncExternalStore)
data/                mock movies & series
types/               shared models
```

## Catalogue

The launch catalogue is 10 films BroFlix may legally stream for free:

- **Public-domain classics** (Night of the Living Dead, Charade, His Girl Friday, Nosferatu, Detour, The Little Shop of Horrors, Plan 9 from Outer Space, Carnival of Souls). These play through the Internet Archive's embedded player (`embedUrl`).
- **Blender Foundation open movies** (Cosmos Laundromat, Elephants Dream), Creative Commons Attribution licensed. Keep their `credit` line visible.

Posters and backdrops are original SVG artwork in `public/images/`.

## Adding a title

Add an entry to `data/movies.ts` (or `data/series.ts`). For playback set either:

- `videoUrl`: a video file you host (e.g. in Cloudflare R2) and have the rights to, or
- `embedUrl`: an embeddable player from a licensed/legal host.

Set `credit` to the licence or attribution line.

## Roadmap

- Real authentication and a per-user My List on a backend
- Catalogue from a database or headless CMS (only `lib/catalog.ts` changes)
- HLS streaming for full-length titles
- Seasons and episodes for series

## Credits

The My List store pattern is adapted from [Reely](https://github.com/Vette1123/movies-streaming-platform) by Mohamed Gado (MIT).
