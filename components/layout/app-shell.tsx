import type { ReactNode } from "react";
import { Footer } from "@/components/home/footer";
import { SiteHeader } from "@/components/layout/site-header";

export type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col bg-[#0a0a0a] text-white">{children}</div>
      <Footer />
    </>
  );
}
