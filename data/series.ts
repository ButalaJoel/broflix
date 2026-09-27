import type { Movie, MovieList } from "@/types/movie";

export const mockSeries: MovieList = [
  {
    id: "s-ember-01",
    slug: "ember-signal",
    title: "Ember Signal",
    type: "series",
    genres: ["Action", "Drama"],
    description:
      "A team of specialists tracks a signal that turns every satellite map into a warning.",
    rating: 8.8,
    releaseYear: 2025,
    runtimeMinutes: 48,
    matchPercentage: 96,
    maturityRating: "16+",
    poster: {
      src: "/images/posters/poster-6.svg",
      alt: "Poster for Ember Signal",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-6.svg",
      alt: "Backdrop for Ember Signal",
    },
    relatedMovieIds: ["m-aurora-01", "m-hollow-03", "m-vanta-05"],
  },
  {
    id: "s-gray-02",
    slug: "gray-runner",
    title: "Gray Runner",
    type: "series",
    genres: ["Sci-Fi", "Thriller"],
    description:
      "An underground courier learns the city itself is moving to hide a buried truth.",
    rating: 8.4,
    releaseYear: 2024,
    runtimeMinutes: 52,
    matchPercentage: 93,
    maturityRating: "13+",
    poster: {
      src: "/images/posters/poster-7.svg",
      alt: "Poster for Gray Runner",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-7.svg",
      alt: "Backdrop for Gray Runner",
    },
    relatedMovieIds: ["m-cinder-02", "m-aurora-01"],
  },
  {
    id: "s-iron-03",
    slug: "iron-rose",
    title: "Iron Rose",
    type: "series",
    genres: ["Mystery", "Adventure"],
    description:
      "A weather station crew discover a generator that can replay the city's forgotten past.",
    rating: 8.2,
    releaseYear: 2023,
    runtimeMinutes: 46,
    matchPercentage: 91,
    maturityRating: "13+",
    poster: {
      src: "/images/posters/poster-8.svg",
      alt: "Poster for Iron Rose",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-8.svg",
      alt: "Backdrop for Iron Rose",
    },
    relatedMovieIds: ["m-midnight-04", "m-hollow-03"],
  },
  {
    id: "s-bright-04",
    slug: "bright-lattice",
    title: "Bright Lattice",
    type: "series",
    genres: ["Drama", "Fantasy"],
    description:
      "A displaced artist starts painting the future into reality and changes the skyline forever.",
    rating: 8.6,
    releaseYear: 2026,
    runtimeMinutes: 51,
    matchPercentage: 94,
    maturityRating: "13+",
    poster: {
      src: "/images/posters/poster-9.svg",
      alt: "Poster for Bright Lattice",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-9.svg",
      alt: "Backdrop for Bright Lattice",
    },
    relatedMovieIds: ["m-midnight-04", "m-aurora-01"],
  },
  {
    id: "s-sable-05",
    slug: "sable-echo",
    title: "Sable Echo",
    type: "series",
    genres: ["Thriller", "Mystery"],
    description:
      "A late-night archivist follows impossible transmissions that point to her own disappearance.",
    rating: 8.1,
    releaseYear: 2022,
    runtimeMinutes: 49,
    matchPercentage: 90,
    maturityRating: "16+",
    poster: {
      src: "/images/posters/poster-10.svg",
      alt: "Poster for Sable Echo",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-10.svg",
      alt: "Backdrop for Sable Echo",
    },
    relatedMovieIds: ["m-vanta-05", "m-hollow-03"],
  },
] satisfies Movie[];

export const trendingSeries = mockSeries.slice(0, 5);
