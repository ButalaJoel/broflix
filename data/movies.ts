import type { Movie, MovieList } from "@/types/movie";

export const mockMovies: MovieList = [
  {
    id: "m-aurora-01",
    slug: "aurora-signal",
    title: "Aurora Signal",
    type: "film",
    genres: ["Sci-Fi", "Thriller"],
    description:
      "A deep-space courier uncovers a hidden signal that could rewrite humanity's future.",
    rating: 8.6,
    releaseYear: 2025,
    runtimeMinutes: 128,
    matchPercentage: 98,
    maturityRating: "16+",
    poster: {
      src: "/images/posters/poster-1.svg",
      alt: "Poster for Aurora Signal",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-1.svg",
      alt: "Backdrop for Aurora Signal",
    },
    relatedMovieIds: ["m-cinder-02", "m-hollow-03", "m-midnight-04"],
    featured: true,
  },
  {
    id: "m-cinder-02",
    slug: "cinder-run",
    title: "Cinder Run",
    type: "film",
    genres: ["Action", "Adventure"],
    description:
      "A smuggler and a reluctant engineer race across a fractured desert to stop a weaponized storm.",
    rating: 7.9,
    releaseYear: 2024,
    runtimeMinutes: 111,
    matchPercentage: 92,
    maturityRating: "13+",
    poster: {
      src: "/images/posters/poster-2.svg",
      alt: "Poster for Cinder Run",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-2.svg",
      alt: "Backdrop for Cinder Run",
    },
    previewVideoUrl: "/videos/test-preview.mp4",
    relatedMovieIds: ["m-aurora-01", "m-vanta-05", "m-midnight-04"],
  },
  {
    id: "m-hollow-03",
    slug: "hollow-tide",
    title: "Hollow Tide",
    type: "series",
    genres: ["Mystery", "Drama"],
    description:
      "A coastal town spirals into a conspiracy after a vanished diver reappears with impossible memories.",
    rating: 8.4,
    releaseYear: 2026,
    runtimeMinutes: 52,
    matchPercentage: 95,
    maturityRating: "16+",
    poster: {
      src: "/images/posters/poster-3.svg",
      alt: "Poster for Hollow Tide",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-3.svg",
      alt: "Backdrop for Hollow Tide",
    },
    relatedMovieIds: ["m-aurora-01", "m-midnight-04", "m-vanta-05"],
    featured: true,
  },
  {
    id: "m-midnight-04",
    slug: "midnight-bloom",
    title: "Midnight Bloom",
    type: "film",
    genres: ["Fantasy", "Drama"],
    description:
      "A florist discovers she can grow memories into living gardens that reveal the town's buried past.",
    rating: 8.1,
    releaseYear: 2023,
    runtimeMinutes: 104,
    matchPercentage: 90,
    maturityRating: "13+",
    poster: {
      src: "/images/posters/poster-4.svg",
      alt: "Poster for Midnight Bloom",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-4.svg",
      alt: "Backdrop for Midnight Bloom",
    },
    relatedMovieIds: ["m-aurora-01", "m-cinder-02", "m-hollow-03"],
  },
  {
    id: "m-vanta-05",
    slug: "vanta-echo",
    title: "Vanta Echo",
    type: "film",
    genres: ["Horror", "Thriller"],
    description:
      "When a radio station loses signal at midnight, a late-night host starts hearing the future on-air.",
    rating: 7.7,
    releaseYear: 2022,
    runtimeMinutes: 96,
    matchPercentage: 89,
    maturityRating: "18+",
    poster: {
      src: "/images/posters/poster-5.svg",
      alt: "Poster for Vanta Echo",
    },
    backdrop: {
      src: "/images/backdrops/backdrop-5.svg",
      alt: "Backdrop for Vanta Echo",
    },
    relatedMovieIds: ["m-cinder-02", "m-hollow-03", "m-midnight-04"],
  },
] satisfies Movie[];

export const featuredMovies = mockMovies.filter((movie) => movie.featured);
export const trendingMovies = mockMovies.slice(0, 5);
