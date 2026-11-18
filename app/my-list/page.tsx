import type { Metadata } from "next";
import { MyListView } from "@/components/account/my-list-view";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "My List · Broflix",
};

export default function MyListPage() {
  return (
    <main>
      <PageIntro eyebrow="Saved" title="My List" description="Everything you've saved to watch later." />
      <MyListView />
    </main>
  );
}
