"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  poster: string;
  title: string;
  backHref: string;
};

/**
 * Full-screen watch experience on the native <video> element.
 * Native controls give seeking, volume, captions and fullscreen for free;
 * a dedicated player library can replace this when HLS/DRM streams arrive.
 */
export function VideoPlayer({ src, poster, title, backHref }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showChrome = () => {
    setChromeVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setChromeVisible(false);
    }, 2500);
  };

  useEffect(() => {
    void videoRef.current?.play().catch(() => {
      // Autoplay with sound is often blocked; the user can press play.
    });
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [src]);

  return (
    <div className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center bg-black" onPointerMove={showChrome}>
      {failed ? (
        <div className="px-6 text-center">
          <p className="text-lg font-semibold text-white">This title can&apos;t be played right now.</p>
          <p className="mt-2 text-sm text-zinc-400">The video file is missing or in an unsupported format.</p>
          <Link href={backHref} className="mt-6 inline-flex rounded-full bg-[#00FF00] px-5 py-2.5 text-sm font-bold text-[#0a0a0a]">
            Back to details
          </Link>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={`Now playing: ${title}`}
          onPause={() => setChromeVisible(true)}
          onPlay={showChrome}
          onError={() => setFailed(true)}
          className="max-h-[calc(100svh-4rem)] w-full bg-black"
        />
      )}

      <div
        className={[
          "pointer-events-none absolute inset-x-0 top-0 bg-linear-to-b from-black/80 to-transparent px-4 pb-10 pt-4 transition-opacity duration-300 sm:px-8",
          chromeVisible || failed ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <div className="pointer-events-auto flex items-center gap-4">
          <Link
            href={backHref}
            aria-label="Back to details"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:border-[#00FF00]/60 hover:text-[#00FF00]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#00FF00]">Now playing</p>
            <p className="text-lg font-bold text-white">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
