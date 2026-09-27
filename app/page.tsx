"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/home/footer";
import { ContentRow } from "@/components/home/content-row";
import { Hero } from "@/components/home/hero";
import { MovieCard } from "@/components/home/movie-card";
import { featuredMovies, trendingMovies } from "@/data/movies";
import { trendingSeries } from "@/data/series";
import type { Movie } from "@/types/movie";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(featuredMovies[0] ?? null);

  const moreLikeThis = useMemo(() => {
    if (!selectedMovie) {
      return [];
    }

    const relatedIds = new Set(selectedMovie.relatedMovieIds ?? []);
    return trendingMovies.filter((movie) => relatedIds.has(movie.id));
  }, [selectedMovie]);

  return (
    <>
      <main className="bg-[#0a0a0a] text-white">
        {selectedMovie ? <Hero movie={selectedMovie} /> : null}

        <ContentRow title="Trending Movies">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={setSelectedMovie}
              selected={selectedMovie?.id === movie.id}
            />
          ))}
        </ContentRow>

        <ContentRow title="Trending Series">
          {trendingSeries.map((series) => (
            <MovieCard
              key={series.id}
              movie={series}
              onSelect={setSelectedMovie}
              selected={selectedMovie?.id === series.id}
            />
          ))}
        </ContentRow>

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

      <Footer />
    </>
  );
}
