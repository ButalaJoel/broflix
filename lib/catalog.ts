import { mockMovies } from "@/data/movies";
import { mockSeries } from "@/data/series";
import type { Movie, MovieGenre, MovieType } from "@/types/movie";

/**
 * Catalogue access layer.
 *
 * Every page reads titles through these functions instead of importing the mock
 * arrays directly. When BroFlix moves to a real API or database, only this file
 * needs to change — pages and components keep the same contract.
 */

const DEFAULT_VIDEO_URL = "/videos/test-preview.mp4";

const allTitles: Movie[] = [...mockMovies, ...mockSeries];

export function getAllTitles(): Movie[] {
  return allTitles;
}

export function getTitlesByType(type: MovieType): Movie[] {
  return allTitles.filter((title) => title.type === type);
}

export function getTitlesByGenre(genre: MovieGenre): Movie[] {
  return allTitles.filter((title) => title.genres.includes(genre));
}

export function getTitleBySlug(type: MovieType, slug: string): Movie | undefined {
  return allTitles.find((title) => title.type === type && title.slug === slug);
}

export function getTitleById(id: string): Movie | undefined {
  return allTitles.find((title) => title.id === id);
}

export function getRelatedTitles(movie: Movie, limit = 5): Movie[] {
  const explicit = (movie.relatedMovieIds ?? [])
    .map((id) => getTitleById(id))
    .filter((title): title is Movie => Boolean(title));

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  // Top up with titles that share a genre, so every page has a full row.
  const seen = new Set([movie.id, ...explicit.map((title) => title.id)]);
  const byGenre = allTitles.filter(
    (title) => !seen.has(title.id) && title.genres.some((genre) => movie.genres.includes(genre)),
  );

  return [...explicit, ...byGenre].slice(0, limit);
}

export function getGenres(titles: Movie[]): MovieGenre[] {
  return Array.from(new Set(titles.flatMap((title) => title.genres))).sort();
}

export function searchTitles(query: string): Movie[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [];
  }

  return allTitles.filter((title) =>
    [title.title, title.description, ...title.genres, String(title.releaseYear)].some((field) =>
      field.toLowerCase().includes(needle),
    ),
  );
}

export function getDetailsHref(movie: Movie): string {
  return movie.type === "series" ? `/series/${movie.slug}` : `/movies/${movie.slug}`;
}

export function getWatchHref(movie: Movie): string {
  return `/watch/${movie.id}`;
}

export function getVideoUrl(movie: Movie): string {
  return movie.videoUrl ?? movie.previewVideoUrl ?? DEFAULT_VIDEO_URL;
}
