"use client";

import { useMemo, useState } from "react";
import { ContentRow } from "@/components/home/content-row";
import { Hero } from "@/components/home/hero";
import { MovieCard } from "@/components/home/movie-card";
import { featuredMovies, trendingMovies } from "@/data/movies";
import { getRelatedTitles, getTitlesByGenre } from "@/lib/catalog";
import type { Movie, MovieGenre } from "@/types/movie";

const genreRows: { title: string; genre: MovieGenre }[] = [
  { title: "Horror Classics", genre: "Horror" },
  { title: "Comedy Night", genre: "Comedy" },
  { title: "Sci-Fi & Fantasy", genre: "Sci-Fi" },
];

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(featuredMovies[0] ?? null);

  const moreLikeThis = useMemo(() => {
    if (!selectedMovie) {
      return [];
    }

    return getRelatedTitles(selectedMovie);
  }, [selectedMovie]);

  return (
    <main className="bg-[#0a0a0a] text-white">
        {selectedMovie ? <Hero movie={selectedMovie} /> : null}

        <ContentRow title="Trending Now">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={setSelectedMovie}
              selected={selectedMovie?.id === movie.id}
            />
          ))}
        </ContentRow>

        {genreRows.map((row) => (
          <ContentRow key={row.genre} title={row.title}>
            {getTitlesByGenre(row.genre).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
                selected={selectedMovie?.id === movie.id}
              />
            ))}
          </ContentRow>
        ))}

        {moreLikeThis.length > 0 ? (
          <ContentRow title="More Like This">
            {moreLikeThis.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
                selected={selectedMovie?.id === movie.id}
              />
            ))}
          </ContentRow>
        ) : null}
    </main>
  );
}
