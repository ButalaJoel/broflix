import type { MovieList } from "@/types/movie";

/**
 * Launch catalogue: films BroFlix is legally allowed to stream for free.
 *
 * - Public-domain classics stream from the Internet Archive's embeddable player.
 * - Blender Foundation open movies are Creative Commons Attribution licensed;
 *   the `credit` line must stay visible on their pages.
 *
 * When licensed titles arrive, add them here with a `videoUrl` pointing at your own
 * storage (e.g. Cloudflare R2) instead of an `embedUrl`.
 */

const PUBLIC_DOMAIN = "Public domain · Streamed from the Internet Archive";
const BLENDER = "© Blender Foundation · Creative Commons Attribution licence";

const archive = (identifier: string) => `https://archive.org/embed/${identifier}`;

/**
 * Posters are public-domain (or CC BY, for the Blender films) images from Wikimedia
 * Commons. Backdrops are BroFlix's own SVG artwork.
 */
const POSTERS: Record<string, string> = {
  "night-of-the-living-dead":
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Night_Of_The_Living_Dead_%281968%29_-_Poster.jpg",
  "charade":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Charade_%281963_poster%29.jpg/960px-Charade_%281963_poster%29.jpg",
  "his-girl-friday":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/His_Girl_Friday_%281940_poster%29_crop.jpg/960px-His_Girl_Friday_%281940_poster%29_crop.jpg",
  "nosferatu":
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Max_Schreck_as_Count_Orlok_in_Nosferatu_%E2%80%93_Eine_Symphonie_des_Grauens_%281922%29.jpg",
  "detour":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Detour_%28poster%29.jpg/960px-Detour_%28poster%29.jpg",
  "the-little-shop-of-horrors":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/The_Little_Shop_of_Horrors_%281960%29_-_Half-Sheet_poster.webp/960px-The_Little_Shop_of_Horrors_%281960%29_-_Half-Sheet_poster.webp",
  "plan-9-from-outer-space":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Plan_9_Alternative_poster.jpg/960px-Plan_9_Alternative_poster.jpg",
  "carnival-of-souls":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Carnival_of_Souls_%281962_pressbook_cover%29.jpg/960px-Carnival_of_Souls_%281962_pressbook_cover%29.jpg",
  "cosmos-laundromat":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/CosmosLaundromatPoster.jpg/960px-CosmosLaundromatPoster.jpg",
  "elephants-dream":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/ElephantsDreamPoster.jpg/960px-ElephantsDreamPoster.jpg",
};

const art = (slug: string, title: string) => ({
  poster: { src: POSTERS[slug] ?? `/images/posters/${slug}.svg`, alt: `Poster for ${title}` },
  backdrop: { src: `/images/backdrops/${slug}.svg`, alt: `Backdrop for ${title}` },
});

export const mockMovies: MovieList = [
  {
    id: "night-of-the-living-dead",
    slug: "night-of-the-living-dead",
    title: "Night of the Living Dead",
    type: "film",
    genres: ["Horror", "Thriller"],
    description:
      "Strangers barricade themselves inside a remote Pennsylvania farmhouse as the dead rise and close in. George A. Romero's low-budget debut invented the modern zombie film.",
    rating: 7.8,
    releaseYear: 1968,
    runtimeMinutes: 96,
    matchPercentage: 97,
    maturityRating: "16+",
    ...art("night-of-the-living-dead", "Night of the Living Dead"),
    embedUrl: archive("Night.Of.The.Living.Dead_1080p"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["carnival-of-souls", "nosferatu", "plan-9-from-outer-space"],
    featured: true,
  },
  {
    id: "charade",
    slug: "charade",
    title: "Charade",
    type: "film",
    genres: ["Thriller", "Comedy", "Mystery"],
    description:
      "In Paris, a newly widowed woman discovers her late husband stole a fortune, and several dangerous men want it back. Cary Grant and Audrey Hepburn star in a witty, twisty caper.",
    rating: 7.8,
    releaseYear: 1963,
    runtimeMinutes: 113,
    matchPercentage: 95,
    maturityRating: "13+",
    ...art("charade", "Charade"),
    embedUrl: archive("charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["his-girl-friday", "detour"],
    featured: true,
  },
  {
    id: "his-girl-friday",
    slug: "his-girl-friday",
    title: "His Girl Friday",
    type: "film",
    genres: ["Comedy", "Drama"],
    description:
      "A scheming newspaper editor will do anything to stop his star reporter, who is also his ex-wife, from quitting and remarrying. Rapid-fire screwball comedy from Howard Hawks.",
    rating: 7.8,
    releaseYear: 1940,
    runtimeMinutes: 92,
    matchPercentage: 91,
    maturityRating: "7+",
    ...art("his-girl-friday", "His Girl Friday"),
    embedUrl: archive("HisGirlFriday-1940"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["charade", "the-little-shop-of-horrors"],
  },
  {
    id: "nosferatu",
    slug: "nosferatu",
    title: "Nosferatu",
    type: "film",
    genres: ["Horror", "Fantasy"],
    description:
      "An estate agent travels to the castle of the mysterious Count Orlok, unaware he is bringing plague and death home with him. F. W. Murnau's silent masterpiece of shadow and dread.",
    rating: 7.8,
    releaseYear: 1922,
    runtimeMinutes: 93,
    matchPercentage: 88,
    maturityRating: "13+",
    ...art("nosferatu", "Nosferatu"),
    embedUrl: archive("Nosferatu_most_complete_version_93_mins."),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["night-of-the-living-dead", "carnival-of-souls"],
  },
  {
    id: "detour",
    slug: "detour",
    title: "Detour",
    type: "film",
    genres: ["Thriller", "Drama"],
    description:
      "A broke pianist hitchhiking to Los Angeles gets caught up in a stranger's death and a ruthless passenger who knows too much. A lean, fatalistic film noir shot in six days.",
    rating: 7.2,
    releaseYear: 1945,
    runtimeMinutes: 67,
    matchPercentage: 86,
    maturityRating: "13+",
    ...art("detour", "Detour"),
    embedUrl: archive("Detour"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["charade", "carnival-of-souls"],
  },
  {
    id: "the-little-shop-of-horrors",
    slug: "the-little-shop-of-horrors",
    title: "The Little Shop of Horrors",
    type: "film",
    genres: ["Comedy", "Horror"],
    description:
      "A clumsy florist's assistant grows a strange plant that makes the shop famous, but it has a taste for human blood. Roger Corman's cult black comedy, with an early Jack Nicholson cameo.",
    rating: 6.2,
    releaseYear: 1960,
    runtimeMinutes: 72,
    matchPercentage: 84,
    maturityRating: "13+",
    ...art("the-little-shop-of-horrors", "The Little Shop of Horrors"),
    embedUrl: archive("The.Little.Shop.of.Horrors.60"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["plan-9-from-outer-space", "his-girl-friday"],
  },
  {
    id: "plan-9-from-outer-space",
    slug: "plan-9-from-outer-space",
    title: "Plan 9 from Outer Space",
    type: "film",
    genres: ["Sci-Fi", "Horror", "Comedy"],
    description:
      "Aliens raise the dead to stop humanity from building a doomsday weapon. Ed Wood's infamous B-movie, often called the worst film ever made and loved for exactly that.",
    rating: 4.0,
    releaseYear: 1959,
    runtimeMinutes: 79,
    matchPercentage: 79,
    maturityRating: "7+",
    ...art("plan-9-from-outer-space", "Plan 9 from Outer Space"),
    embedUrl: archive("plan-9-from-outer-space"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["the-little-shop-of-horrors", "night-of-the-living-dead"],
  },
  {
    id: "carnival-of-souls",
    slug: "carnival-of-souls",
    title: "Carnival of Souls",
    type: "film",
    genres: ["Horror", "Mystery"],
    description:
      "After surviving a car crash, a church organist moves to a new town where a pale stranger haunts her and an abandoned carnival pavilion pulls her closer. Eerie, dreamlike indie horror.",
    rating: 7.0,
    releaseYear: 1962,
    runtimeMinutes: 78,
    matchPercentage: 89,
    maturityRating: "13+",
    ...art("carnival-of-souls", "Carnival of Souls"),
    embedUrl: archive("CarnivalOfSoulsVideoQualityUpgrade"),
    credit: PUBLIC_DOMAIN,
    relatedMovieIds: ["night-of-the-living-dead", "nosferatu", "detour"],
  },
  {
    id: "cosmos-laundromat",
    slug: "cosmos-laundromat",
    title: "Cosmos Laundromat",
    type: "film",
    genres: ["Fantasy", "Comedy", "Sci-Fi"],
    description:
      "On a desolate island, a despondent sheep named Franck meets a mysterious salesman who offers him the gift of a lifetime, and then many more lifetimes. An award-winning Blender open movie short.",
    rating: 7.5,
    releaseYear: 2015,
    runtimeMinutes: 12,
    matchPercentage: 93,
    maturityRating: "13+",
    ...art("cosmos-laundromat", "Cosmos Laundromat"),
    embedUrl: archive("CosmosLaundromatFirstCycle"),
    credit: BLENDER,
    relatedMovieIds: ["elephants-dream", "plan-9-from-outer-space"],
    featured: true,
  },
  {
    id: "elephants-dream",
    slug: "elephants-dream",
    title: "Elephants Dream",
    type: "film",
    genres: ["Sci-Fi", "Fantasy"],
    description:
      "Two strange characters explore a vast, ever-shifting machine, and disagree about what is real. The world's first open movie, made almost entirely with free software.",
    rating: 6.5,
    releaseYear: 2006,
    runtimeMinutes: 11,
    matchPercentage: 82,
    maturityRating: "7+",
    ...art("elephants-dream", "Elephants Dream"),
    videoUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Elephants_Dream_(2006).webm",
    credit: BLENDER,
    relatedMovieIds: ["cosmos-laundromat", "plan-9-from-outer-space"],
  },
];

export const featuredMovies = mockMovies.filter((movie) => movie.featured);
export const trendingMovies = [...mockMovies].sort(
  (a, b) => (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0),
).slice(0, 5);
