import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <EmptyState
        title="Lost in the stream"
        description="That page doesn't exist — it may have been moved or removed."
        actionLabel="Back to Home"
        actionHref="/"
      />
    </main>
  );
}
