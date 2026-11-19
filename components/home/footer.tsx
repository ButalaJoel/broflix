import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Series", href: "/series" },
  { label: "My List", href: "/my-list" },
];

const supportLinks = [
  { label: "Help", href: "/help" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "TikTok", href: "https://www.tiktok.com" },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[#0a0a0a] text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-2xl font-black tracking-tight text-[#00FF00]">BROFLIX</p>
            <p className="mt-3 text-sm text-zinc-400">For the Bros.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-100">Browse</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#00FF00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-100">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-[#00FF00]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-100">Follow</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#00FF00]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-zinc-500">
          © {new Date().getFullYear()} Broflix
        </div>
      </div>
    </footer>
  );
}
