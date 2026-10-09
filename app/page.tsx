import type { Metadata } from "next";
import { FeedMockup } from "@/components/feed-mockup";

export const metadata: Metadata = {
  title: "Caught up",
  description:
    "A mockup of Instagram’s home feed without infinite scroll: keep friends, stories, and comments, then let the day end.",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20">
        <section className="max-w-3xl pt-4 pb-14 sm:pt-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-plum uppercase">
            Instagram anti-pattern
          </p>
          <h1 className="font-heading mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
            Keep the photos. End the scroll.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-plum sm:text-lg">
            Stories already end. A DM has a last message. The feed pretends there
            is always more. Home splits into tabs you choose: Following,
            Reposted, and Browse. Each one can be finished.
          </p>
        </section>

        <FeedMockup />

        <section className="mt-20 grid gap-10 border-t border-rose pt-12 sm:grid-cols-3">
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              The good parts
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              People you chose. A picture that belongs to a morning. A friend
              passing something on. A story that expires.
            </p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              The bad part
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              After the last friend, Instagram splices Suggested into the same
              scroll. You never chose Browse — it arrived because you kept going.
            </p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              The ending
            </h2>
            <p className="mt-2 text-sm leading-6 text-plum">
              Following, Reposted, and Browse are separate piles. Finish one.
              Open another on purpose. Or put the phone down.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
