import type { Metadata } from "next";
import { FeedMockup } from "@/components/feed-mockup";

export const metadata: Metadata = {
  title: "Caught up embed",
  robots: { index: false, follow: false },
};

export default function EmbedFeedPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-6">
      <FeedMockup compact />
    </main>
  );
}
