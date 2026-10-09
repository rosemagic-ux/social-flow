import type { Metadata } from "next";
import { ReelMockup } from "@/components/reel-mockup";

export const metadata: Metadata = {
  title: "Shared Reels embed",
  robots: { index: false, follow: false },
};

export default function EmbedReelsPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-6">
      <ReelMockup compact />
    </main>
  );
}
