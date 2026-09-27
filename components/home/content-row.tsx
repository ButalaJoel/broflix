import type { ReactNode } from "react";

type ContentRowProps = {
  title: string;
  children: ReactNode;
};

export function ContentRow({ title, children }: ContentRowProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">{children}</div>
    </section>
  );
}
