"use client";

import { useMemo, useState } from "react";
import { MovieCard } from "@/components/home/movie-card";
import type { Movie, MovieGenre } from "@/types/movie";

type SortKey = "popular" | "rating" | "newest" | "title";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Best match" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "A–Z" },
];

const sorters: Record<SortKey, (a: Movie, b: Movie) => number> = {
  popular: (a, b) => (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0),
  rating: (a, b) => b.rating - a.rating,
  newest: (a, b) => b.releaseYear - a.releaseYear,
  title: (a, b) => a.title.localeCompare(b.title),
};

type CatalogBrowserProps = {
  titles: Movie[];
  genres: MovieGenre[];
};

export function CatalogBrowser({ titles, genres }: CatalogBrowserProps) {
  const [genre, setGenre] = useState<MovieGenre | "All">("All");
  const [sort, setSort] = useState<SortKey>("popular");

  const visible = useMemo(() => {
    const filtered = genre === "All" ? titles : titles.filter((title) => title.genres.includes(genre));
    return [...filtered].sort(sorters[sort]);
  }, [titles, genre, sort]);

  const chipClass = (active: boolean) =>
    [
      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00]",
      active ? "bg-[#00FF00] text-[#0a0a0a]" : "border border-white/10 bg-white/5 text-zinc-300 hover:border-[#00FF00]/50 hover:text-[#00FF00]",
    ].join(" ");

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by genre">
          {(["All", ...genres] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={genre === option}
              onClick={() => setGenre(option)}
              className={chipClass(genre === option)}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="flex shrink-0 items-center gap-2 text-sm text-zinc-400">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm text-white focus:border-[#00FF00]/60 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-4 text-sm text-zinc-500">
        {visible.length} {visible.length === 1 ? "title" : "titles"}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {visible.map((title) => (
          <MovieCard key={title.id} movie={title} />
        ))}
      </div>
    </section>
  );
}
