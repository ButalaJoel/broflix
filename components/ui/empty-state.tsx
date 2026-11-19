import Link from "next/link";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="mx-auto my-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
        <p className="text-lg font-semibold text-white">{title}</p>
        {description ? <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{description}</p> : null}
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="mt-6 inline-flex rounded-full bg-[#00FF00] px-5 py-2.5 text-sm font-bold text-[#0a0a0a] transition-transform hover:scale-[1.02]"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
