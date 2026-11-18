import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/movie/catalog-browser";
import { PageIntro } from "@/components/ui/page-intro";
import { getGenres, getTitlesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Series · Broflix",
  description: "Browse every series on Broflix.",
};

export default function SeriesPage() {
  const series = getTitlesByType("series");

  return (
    <main>
      <PageIntro eyebrow="Catalogue" title="Series" description="Binge-worthy shows, one more episode at a time." />
      <CatalogBrowser titles={series} genres={getGenres(series)} />
    </main>
  );
}
