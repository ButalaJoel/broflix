import type { Metadata } from "next";
import { MovieCard } from "@/components/home/movie-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { searchTitles } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search · Broflix",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const results = searchTitles(query);

  return (
    <main>
      <PageIntro eyebrow="Search" title={query ? `Results for “${query}”` : "Find something to watch"}>
        <form action="/search" role="search" className="mt-6 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search titles, genres, years..."
            aria-label="Search Broflix"
            autoFocus={!query}
            className="h-12 flex-1 rounded-full border border-white/10 bg-zinc-900 px-5 text-white placeholder:text-zinc-500 focus:border-[#00FF00]/60 focus:outline-none"
          />
          <button type="submit" className="h-12 rounded-full bg-[#00FF00] px-6 text-sm font-bold text-[#0a0a0a]">
            Search
          </button>
        </form>
      </PageIntro>

      {query && results.length === 0 ? (
        <EmptyState
          title="No matches"
          description={`Nothing on Broflix matches “${query}”. Try a genre like Sci-Fi or Thriller.`}
          actionLabel="Browse movies"
          actionHref="/movies"
        />
      ) : null}

      {results.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm text-zinc-500">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((title) => (
              <MovieCard key={title.id} movie={title} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
