"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Movie } from "@/types/movie";
import { formatRuntime } from "@/lib/utils";

type HeroProps = {
  movie: Movie;
};

export function Hero({ movie }: HeroProps) {
  const { title, description, releaseYear, rating, runtimeMinutes, genres, backdrop } = movie;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visibleVideoId, setVisibleVideoId] = useState<string | null>(null);
  const videoVisible = visibleVideoId === movie.id;

  useEffect(() => {
    const video = videoRef.current;
    if (!movie.previewVideoUrl || !video) {
      return;
    }

    if (video.readyState > 0) {
      video.currentTime = 0;
    }
    void video.play().catch(() => setVisibleVideoId(null));

    return () => {
      video.pause();
      if (video.readyState > 0) {
        video.currentTime = 0;
      }
    };
  }, [movie.id, movie.previewVideoUrl]);

  const handleVideoError = () => {
    setVisibleVideoId(null);
    videoRef.current?.pause();
  };

  return (
    <section className="bg-[#0a0a0a] px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-xl bg-[#0a0a0a]">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
        <div className="absolute inset-0">
          <Image
            src={backdrop.src}
            alt={backdrop.alt}
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover"
          />
          {movie.previewVideoUrl ? (
            <video
              key={movie.id}
              ref={videoRef}
              src={movie.previewVideoUrl}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-hidden="true"
              onPlay={() => setVisibleVideoId(movie.id)}
              onError={handleVideoError}
              className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${videoVisible ? "opacity-100" : "opacity-0"}`}
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/35 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent" />
        </div>

        <div className="relative z-30 flex min-h-[420px] items-end px-5 pb-10 pt-16 sm:min-h-[480px] sm:px-8 sm:pb-12 lg:min-h-[540px] lg:px-12">
          <div className="max-w-xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-300 sm:text-xs">
              Broflix Original
            </p>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200 sm:text-base">
              <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-zinc-100 sm:text-sm">
                {releaseYear}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-[#00FF00]">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-current">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118L10 18.98l-2.89 1.9c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L3.48 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
                </svg>
                {rating.toFixed(1)}
              </span>
              <span className="text-zinc-300">{formatRuntime(runtimeMinutes)}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-200 sm:text-sm">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-200/90 sm:text-base">
              {description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#00FF00] px-6 py-3 text-sm font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(0,255,0,0.22)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
                Play
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
                  <path d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
