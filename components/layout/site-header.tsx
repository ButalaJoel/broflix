"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const navigationItems = [
  { label: "Home", href: siteConfig.routes.home },
  { label: "Movies", href: siteConfig.routes.movies },
  { label: "Series", href: siteConfig.routes.series },
  { label: "My List", href: siteConfig.routes.myList },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/95 text-zinc-100 shadow-lg shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={siteConfig.routes.home}
          aria-label={`${siteConfig.name} home`}
          className="flex shrink-0 items-center"
        >
          <Image
  src="/broflix-logo.svg"
  alt="Broflix"
  width={789}
  height={139}
  priority
  className="h-3.5 w-auto object-contain"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const active = isRouteActive(item.href);

              return (
                <li key={item.label} className="flex">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                      active
                        ? "bg-[#00FF00] text-[#0a0a0a] shadow-[0_0_0_1px_rgba(0,255,0,0.2)]"
                        : "text-zinc-300 hover:bg-[#00FF00]/10 hover:text-[#00FF00]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div
            className={[
              "flex items-center overflow-hidden rounded-full border transition-all duration-200",
              isSearchOpen
                ? "border-[#00FF00]/70 bg-zinc-900 shadow-[0_0_0_1px_rgba(0,255,0,0.18)] shadow-[#00FF00]/10"
                : "border-transparent bg-transparent",
            ].join(" ")}
          >
            <button
              type="button"
              aria-label="Search Broflix"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen((open) => !open)}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-zinc-300 transition-colors duration-200 hover:bg-zinc-800/80 hover:text-[#00FF00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-5"
              >
                <circle
                  cx="10.8"
                  cy="10.8"
                  r="6.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m16 16 4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="hidden text-sm font-medium sm:inline">Search</span>
            </button>

            <input
              type="search"
              aria-label="Search input"
              placeholder="Search..."
              readOnly
              className={[
                "h-10 bg-transparent text-sm text-zinc-50 placeholder:text-zinc-500 transition-all duration-200 ease-out focus:outline-none",
                isSearchOpen ? "mr-3 w-28 opacity-100 sm:w-36" : "mr-0 w-0 opacity-0",
              ].join(" ")}
            />
          </div>

          <Link
            href={siteConfig.routes.login}
            aria-label="Account"
            className="hidden items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-800/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:inline-flex"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
            >
              <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M5 20c.8-3.1 3.3-4.8 7-4.8s6.2 1.7 7 4.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
            <span>Account</span>
          </Link>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-200 transition-colors duration-200 hover:border-[#00FF00]/60 hover:text-[#00FF00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={[
                  "absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMobileMenuOpen ? "opacity-0" : "top-1.5 opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-white/10 bg-[#0a0a0a] md:hidden" id="mobile-navigation">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-4 py-3">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const active = isRouteActive(item.href);

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={[
                        "flex items-center justify-center rounded-full px-4 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                        active
                          ? "bg-[#00FF00] text-[#0a0a0a]"
                          : "border border-white/10 bg-zinc-900/80 text-zinc-200 hover:border-[#00FF00]/60 hover:bg-[#00FF00]/10 hover:text-[#00FF00]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}