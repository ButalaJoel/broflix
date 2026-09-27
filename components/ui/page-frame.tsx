import type { ReactNode } from "react";

export type PageFrameProps = {
  children?: ReactNode;
  title?: string;
};

export function PageFrame({ children, title }: PageFrameProps) {
  return (
    <section aria-label={title ?? "Page frame"}>
      {children}
    </section>
  );
}
