import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/movie/catalog-browser";
import { PageIntro } from "@/components/ui/page-intro";
import { getGenres, getTitlesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Movies · Broflix",
  description: "Browse every movie on Broflix.",
};

export default function MoviesPage() {
  const movies = getTitlesByType("film");

  return (
    <main>
      <PageIntro eyebrow="Catalogue" title="Movies" description="Big nights in. Filter by genre or sort by what's hot." />
      <CatalogBrowser titles={movies} genres={getGenres(movies)} />
    </main>
  );
}
