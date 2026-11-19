import Image from "next/image";
import Link from "next/link";
import { ContentRow } from "@/components/home/content-row";
import { MovieCard } from "@/components/home/movie-card";
import { MyListButton } from "@/components/movie/my-list-button";
import { getRelatedTitles, getWatchHref } from "@/lib/catalog";
import { formatRuntime } from "@/lib/utils";
import type { Movie } from "@/types/movie";

type TitleDetailsProps = {
  movie: Movie;
};

export function TitleDetails({ movie }: TitleDetailsProps) {
  const related = getRelatedTitles(movie);
  const isSeries = movie.type === "series";
  const backHref = isSeries ? "/series" : "/movies";

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={movie.backdrop.src} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#0a0a0a] to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[280px_1fr] md:items-end lg:px-8 lg:pt-16">
          <div className="relative mx-auto aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/60 md:aspect-[2/3]">
            <Image src={movie.poster.src} alt={movie.poster.alt} fill sizes="(max-width: 768px) 90vw, 280px" className="object-cover" />
          </div>

          <div>
            <Link href={backHref} className="text-sm text-zinc-400 transition-colors hover:text-[#00FF00]">
              ← All {isSeries ? "series" : "movies"}
            </Link>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">{movie.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
              {typeof movie.matchPercentage === "number" ? (
                <span className="font-bold text-[#00FF00]">{movie.matchPercentage}% match</span>
              ) : null}
              <span>{movie.releaseYear}</span>
              {movie.maturityRating ? (
                <span className="rounded border border-white/25 px-1.5 py-0.5 text-xs">{movie.maturityRating}</span>
              ) : null}
              <span>{isSeries ? `${formatRuntime(movie.runtimeMinutes)} episodes` : formatRuntime(movie.runtimeMinutes)}</span>
              <span className="inline-flex items-center gap-1 text-[#00FF00]">★ {movie.rating.toFixed(1)}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-200 sm:text-sm">
              {movie.genres.map((genre) => (
                <span key={genre} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">{movie.description}</p>
            {movie.credit ? <p className="mt-3 text-xs text-zinc-500">{movie.credit}</p> : null}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={getWatchHref(movie)}
                className="inline-flex items-center gap-2 rounded-full bg-[#00FF00] px-6 py-3 text-sm font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(0,255,0,0.22)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
                {isSeries ? "Play Episode 1" : "Play"}
              </Link>
              <MyListButton movieId={movie.id} title={movie.title} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <ContentRow title="More Like This">
          {related.map((title) => (
            <MovieCard key={title.id} movie={title} />
          ))}
        </ContentRow>
      ) : null}
    </main>
  );
}
