import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-2 pt-10 sm:px-6 lg:px-8">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#00FF00]">{eyebrow}</p>
      ) : null}
      <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h1>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{description}</p> : null}
      {children}
    </div>
  );
}
