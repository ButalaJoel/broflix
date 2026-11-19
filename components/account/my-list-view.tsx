"use client";

import { MovieCard } from "@/components/home/movie-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useMyList } from "@/hooks/use-my-list";
import { getTitleById } from "@/lib/catalog";
import type { Movie } from "@/types/movie";

export function MyListView() {
  const { ids, clear } = useMyList();
  const titles = ids.map((id) => getTitleById(id)).filter((title): title is Movie => Boolean(title));

  if (titles.length === 0) {
    return (
      <EmptyState
        title="Your list is empty"
        description="Hit “My List” on any movie or series and it will wait for you here."
        actionLabel="Find something to watch"
        actionHref="/movies"
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {titles.length} saved {titles.length === 1 ? "title" : "titles"}
        </p>
        <button type="button" onClick={clear} className="text-sm text-zinc-400 transition-colors hover:text-red-400">
          Clear list
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {titles.map((title) => (
          <MovieCard key={title.id} movie={title} />
        ))}
      </div>
    </section>
  );
}
