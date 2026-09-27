import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";

export type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
