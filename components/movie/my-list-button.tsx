"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useMyList } from "@/hooks/use-my-list";

type MyListButtonProps = {
  movieId: string;
  title: string;
  variant?: "pill" | "compact";
};

const styles = {
  pill: "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
  compact: "inline-flex min-h-7 items-center gap-1 rounded-md border px-2.5 text-[11px] font-medium",
};

export function MyListButton({ movieId, title, variant = "pill" }: MyListButtonProps) {
  const { isInList, toggle } = useMyList();
  const saved = isInList(movieId);

  // Cards are clickable themselves, so keep this click from also opening the card.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggle(movieId);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => event.stopPropagation();

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from My List` : `Add ${title} to My List`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        styles[variant],
        saved
          ? "border-[#00FF00]/60 bg-[#00FF00]/10 text-[#00FF00]"
          : "border-white/20 bg-black/35 text-white hover:border-white/40 hover:bg-white/10",
      ].join(" ")}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className={variant === "pill" ? "size-4" : "size-3"} fill="none">
        {saved ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        )}
      </svg>
      {saved ? "In My List" : "My List"}
    </button>
  );
}
