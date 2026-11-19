import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TitleDetails } from "@/components/movie/title-details";
import { getTitleBySlug, getTitlesByType } from "@/lib/catalog";

export function generateStaticParams() {
  return getTitlesByType("series").map((title) => ({ slug: title.slug }));
}

export async function generateMetadata({ params }: PageProps<"/series/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const title = getTitleBySlug("series", slug);
  if (!title) return { title: "Not found · Broflix" };

  return {
    title: `${title.title} · Broflix`,
    description: title.description,
    openGraph: { title: title.title, description: title.description, images: [title.backdrop.src] },
  };
}

export default async function TitlePage({ params }: PageProps<"/series/[slug]">) {
  const { slug } = await params;
  const title = getTitleBySlug("series", slug);

  if (!title) {
    notFound();
  }

  return <TitleDetails movie={title} />;
}
