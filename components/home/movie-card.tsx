"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import type { Movie } from "@/types/movie";
import { formatRuntime } from "@/lib/utils";

type MovieCardProps = {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
  selected?: boolean;
};

export function MovieCard({ movie, onSelect, selected = false }: MovieCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleCardClick = () => {
    onSelect?.(movie);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  const stopCardSelection = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const stopCardKeyboardSelection = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const stopPreview = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (video.readyState > 0) {
        video.currentTime = 0;
      }
    }
    setPreviewActive(false);
    setVideoPlaying(false);
  };

  useEffect(() => {
    if (!previewActive) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    void video.play().catch(() => {
      video.pause();
      video.currentTime = 0;
      setPreviewActive(false);
      setVideoPlaying(false);
    });
  }, [previewActive]);

  const startPreview = (event: PointerEvent<HTMLElement>) => {
    if (
      movie.previewVideoUrl &&
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setPreviewActive(true);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      stopPreview();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Select ${movie.title}`}
      aria-pressed={selected}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onPointerEnter={startPreview}
      onPointerLeave={handlePointerLeave}
      className={[
        "group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#111111] text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        selected ? "border-[#00FF00]/60 shadow-[0_0_0_1px_rgba(0,255,0,0.22)]" : "hover:z-20 hover:scale-[1.02] hover:border-white/20 hover:shadow-lg hover:shadow-black/30",
      ].join(" ")}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={movie.poster.src}
          alt={movie.poster.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {movie.previewVideoUrl ? (
          <video
            ref={videoRef}
            src={previewActive ? movie.previewVideoUrl : undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onError={stopPreview}
            className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-t from-black/35 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-2 bottom-2 z-30 translate-y-1 bg-linear-to-t from-black/75 via-black/45 to-transparent p-2 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="mb-1 flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-white">{movie.title}</p>
            {typeof movie.matchPercentage === "number" ? (
              <span className="shrink-0 text-xs font-bold text-[#00FF00]">{movie.matchPercentage}%</span>
            ) : null}
          </div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-zinc-200">
            {movie.releaseYear ? <span>{movie.releaseYear}</span> : null}
            {movie.maturityRating ? <span>{movie.maturityRating}</span> : null}
            {movie.runtimeMinutes ? <span>{formatRuntime(movie.runtimeMinutes)}</span> : null}
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={stopCardSelection}
              onKeyDown={stopCardKeyboardSelection}
              className="inline-flex min-h-7 items-center rounded-md bg-[#00FF00] px-2.5 text-[11px] font-bold text-[#0a0a0a]"
            >
              Play
            </button>
            <button
              type="button"
              onClick={stopCardSelection}
              onKeyDown={stopCardKeyboardSelection}
              className="inline-flex min-h-7 items-center rounded-md border border-white/20 bg-black/35 px-2.5 text-[11px] font-medium text-white"
            >
              My List
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-semibold text-white sm:text-base">{movie.title}</p>
          {typeof movie.matchPercentage === "number" ? (
            <span className="shrink-0 text-xs font-bold text-[#00FF00]">{movie.matchPercentage}%</span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-300 sm:text-xs">
          {movie.matchPercentage ? <span className="font-semibold text-[#00FF00]">Match</span> : null}
          {movie.releaseYear ? <span>{movie.releaseYear}</span> : null}
          {movie.maturityRating ? <span>{movie.maturityRating}</span> : null}
          {movie.runtimeMinutes ? <span>{formatRuntime(movie.runtimeMinutes)}</span> : null}
        </div>

        <div className="flex flex-wrap gap-1 text-[10px] text-zinc-400 sm:text-[11px]">
          {movie.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="rounded-full border border-white/10 px-2 py-0.5">
              {genre}
            </span>
          ))}
        </div>
      </div>

    </article>
  );
}
