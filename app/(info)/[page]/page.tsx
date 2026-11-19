import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/page-intro";

const pages = {
  help: {
    title: "Help Center",
    sections: [
      ["Playing a title", "Press Play on any card, hero or details page. Use the player controls for volume, seeking and fullscreen."],
      ["My List", "Tap “My List” on a title to save it. Your list is stored in this browser until accounts launch."],
      ["Search", "Use the search icon in the header to find titles by name, genre or year."],
    ],
  },
  contact: {
    title: "Contact",
    sections: [
      ["Support", "Questions or problems? Email support@broflix.example and we'll get back to you."],
      ["Partnerships", "Studios and creators who want their work on Broflix can reach us at partners@broflix.example."],
    ],
  },
  privacy: {
    title: "Privacy",
    sections: [
      ["What we store", "Broflix currently stores your list and display name only in your own browser (localStorage). Nothing is sent to a server."],
      ["Clearing data", "Clear your list from the My List page, or clear site data in your browser settings."],
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      ["Content", "All titles on Broflix are shown with the rights holder's permission. Do not redistribute streams."],
      ["Accounts", "Accounts are in preview. Features may change before launch."],
    ],
  },
} as const;

type InfoSlug = keyof typeof pages;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}

function getPage(slug: string) {
  return slug in pages ? pages[slug as InfoSlug] : undefined;
}

export async function generateMetadata({ params }: PageProps<"/[page]">): Promise<Metadata> {
  const { page } = await params;
  return { title: `${getPage(page)?.title ?? "Not found"} · Broflix` };
}

export default async function InfoPage({ params }: PageProps<"/[page]">) {
  const { page } = await params;
  const content = getPage(page);
  if (!content) notFound();

  return (
    <main className="pb-16">
      <PageIntro eyebrow="Broflix" title={content.title} />
      <div className="mx-auto mt-6 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {content.sections.map(([heading, body]) => (
          <section key={heading} className="max-w-2xl rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white">{heading}</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">{body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
