export const siteConfig = {
  name: "Broflix",
  shortName: "Broflix",
  description: "Architecture foundation for a streaming platform.",
  routes: {
    home: "/",
    movies: "/movies",
    movieDetails: "/movies/[slug]",
    series: "/series",
    seriesDetails: "/series/[slug]",
    search: "/search",
    myList: "/my-list",
    watch: "/watch/[id]",
    login: "/login",
  },
} as const;
