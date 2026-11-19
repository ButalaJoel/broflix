export type MovieType = "film" | "series";

export type MovieGenre =
  | "Action"
  | "Adventure"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Mystery"
  | "Sci-Fi"
  | "Thriller"
  | "Documentary";

export type MediaImage = {
  src: string;
  alt: string;
};

export type Movie = {
  id: string;
  slug: string;
  title: string;
  type: MovieType;
  genres: MovieGenre[];
  description: string;
  rating: number;
  releaseYear: number;
  runtimeMinutes: number;
  matchPercentage?: number;
  maturityRating?: string;
  poster: MediaImage;
  backdrop: MediaImage;
  relatedMovieIds?: string[];
  titleLogo?: string;
  preview?: MediaImage;
  previewVideoUrl?: string;
  /** Full-length stream for the watch page. Falls back to the preview, then the default clip. */
  videoUrl?: string;
  /** Embeddable player URL (e.g. Internet Archive). Used instead of videoUrl when set. */
  embedUrl?: string;
  /** Licence / attribution line shown on the details and watch pages. */
  credit?: string;
  featured?: boolean;
};

export type MovieList = Movie[];
