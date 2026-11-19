import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/watch/video-player";
import { getAllTitles, getDetailsHref, getTitleById, getVideoUrl } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllTitles().map((title) => ({ id: title.id }));
}

export async function generateMetadata({ params }: PageProps<"/watch/[id]">): Promise<Metadata> {
  const { id } = await params;
  const title = getTitleById(id);
  return { title: title ? `Watching ${title.title} · Broflix` : "Not found · Broflix" };
}

export default async function WatchPage({ params }: PageProps<"/watch/[id]">) {
  const { id } = await params;
  const title = getTitleById(id);

  if (!title) {
    notFound();
  }

  return (
    <main>
      <VideoPlayer
        src={getVideoUrl(title)}
        poster={title.backdrop.src}
        title={title.title}
        backHref={getDetailsHref(title)}
      />
    </main>
  );
}
