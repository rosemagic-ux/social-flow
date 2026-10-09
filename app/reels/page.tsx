import type { Metadata } from "next";
import { ReelMockup } from "@/components/reel-mockup";

export const metadata: Metadata = {
  title: "Shared Reels",
  description:
    "A mockup of Instagram’s shared Reels anti-pattern: keep the friend’s stack instead of dumping you into For You.",
};

export default function ReelsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20">
        <section className="max-w-3xl pt-4 pb-14 sm:pt-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-plum uppercase">
            Instagram anti-pattern
          </p>
          <h1 className="font-heading mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
            Keep the conversation. Leave the For You feed.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-plum sm:text-lg">
            When a friend sends you a stack of Reels, Instagram opens the first
            one — then the next swipe is Suggested. This mockup treats the send
            as a playlist: scroll stays inside what they actually sent.
          </p>
        </section>

        <ReelMockup />

        <section className="mt-20 grid gap-10 border-t border-rose pt-12 sm:grid-cols-3">
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              The hijack
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              Sharing looks social. Playback is a growth loop. One tap moves you
              from a person to a session the algorithm owns.
            </p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              The fix
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              Bound the player to the message. Show who sent it, how many remain,
              and stop when the stack is done.
            </p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              Try both
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              Toggle Today to feel the trapdoor. Toggle Redesign and scroll the
              same five Reels Maya meant for you.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
