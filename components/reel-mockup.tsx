"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  PlusSquare,
  Search,
  Send,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneFrame, StatusBar } from "@/components/phone-frame";
import {
  friend,
  sentReels,
  suggestedReels,
  threadCopy,
  type Reel,
} from "@/lib/reels";
import { cn } from "@/lib/utils";

type Mode = "today" | "redesign";
type Screen = "thread" | "viewer";

const endCardReel: Reel = {
  id: "end",
  author: "",
  handle: "",
  title: "That’s everything Maya sent",
  caption: "",
  sound: "",
  likes: "",
  comments: "",
  kind: "sent",
  gradient: "from-[#422630] via-[#422630] to-[#2a161c]",
};

function queueFor(mode: Mode, startId: string) {
  if (mode === "redesign") {
    return [...sentReels, endCardReel];
  }
  const opened = sentReels.find((reel) => reel.id === startId);
  return opened ? [opened, ...suggestedReels] : [...suggestedReels];
}

export function ReelMockup({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("redesign");
  const [screen, setScreen] = useState<Screen>("thread");
  const [startId, setStartId] = useState(sentReels[0].id);
  const [activeId, setActiveId] = useState(sentReels[0].id);

  const queue = screen === "viewer" ? queueFor(mode, startId) : [];
  const active = queue.find((reel) => reel.id === activeId) ?? queue[0];
  const sentIndex = sentReels.findIndex((reel) => reel.id === activeId);

  function openReel(id: string) {
    setStartId(id);
    setActiveId(id);
    setScreen("viewer");
  }

  function closeViewer() {
    setScreen("thread");
  }

  function changeMode(next: Mode) {
    setMode(next);
    if (screen === "viewer") {
      const nextQueue = queueFor(next, startId);
      const stillThere = nextQueue.some((reel) => reel.id === activeId);
      setActiveId(stillThere ? activeId : nextQueue[0]?.id ?? startId);
    }
  }

  const note =
    screen === "thread"
      ? "Maya sent five Reels in a burst. Open any of them."
      : mode === "today" && active?.kind === "suggested"
        ? "One swipe later, this is For You. The rest of Maya’s stack is gone."
        : mode === "today"
          ? "This Reel is from Maya. The next swipe will not be."
          : active?.id === "end"
            ? "The stack ends on purpose. You choose whether to leave."
            : `Still Maya’s stack. ${sentIndex + 1} of ${sentReels.length}.`;

  return (
    <div
      className={
        compact
          ? "flex flex-col items-center gap-4"
          : "grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Tabs value={mode} onValueChange={(value) => changeMode(value as Mode)}>
          <TabsList className="bg-blush text-plum">
            <TabsTrigger
              value="today"
              className="px-3 data-active:bg-paper data-active:text-ink"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="redesign"
              className="px-3 data-active:bg-paper data-active:text-ink"
            >
              Redesign
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <PhoneFrame>
          {screen === "thread" ? (
            <ThreadScreen onOpen={openReel} />
          ) : (
            <ViewerScreen
              mode={mode}
              queue={queue}
              startId={startId}
              activeId={active?.id ?? startId}
              onActiveChange={setActiveId}
              onBack={closeViewer}
            />
          )}
        </PhoneFrame>
      </div>

      {compact ? null : (
      <aside className="max-w-md space-y-6 lg:pt-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-plum uppercase">
          {mode === "today" ? "The anti-pattern" : "The proposed behavior"}
        </p>
        <p className="font-heading text-3xl leading-tight text-ink sm:text-4xl">
          {note}
        </p>
        <ul className="space-y-3 text-sm leading-6 text-plum">
          {mode === "today" ? (
            <>
              <li>A shared Reel opens the public player, not the message.</li>
              <li>Scroll is bound to the For You session, not the sender.</li>
              <li>The other four Reels stay buried in the thread.</li>
            </>
          ) : (
            <>
              <li>The send is a playlist. Scroll stays inside what they sent.</li>
              <li>Position is visible: who sent it, and how many are left.</li>
              <li>The last frame is an ending, not a trapdoor into Suggested.</li>
            </>
          )}
        </ul>
        {screen === "viewer" ? (
          <Button variant="outline" onClick={closeViewer}>
            Back to the thread
          </Button>
        ) : (
          <p className="text-sm text-plum">
            Tap a Reel in the phone to open the player, then scroll.
          </p>
        )}
      </aside>
      )}
    </div>
  );
}

function ThreadScreen({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="flex h-full flex-col bg-white text-zinc-950">
      <StatusBar light />
      <header className="flex items-center gap-2 border-b border-zinc-100 px-2 pb-2">
        <ChevronLeft className="size-6" />
        <div className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d2b6b7,#644a5c)] text-[10px] font-semibold text-white">
          {friend.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">{friend.name}</p>
          <p className="text-[11px] text-zinc-400">{friend.handle}</p>
        </div>
        <MoreHorizontal className="mr-2 size-5" />
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <p className="text-center text-[11px] text-zinc-400">Today · 9:38 PM</p>
        <Incoming>{threadCopy.opener}</Incoming>
        <div className="flex flex-col items-start gap-2">
          {sentReels.map((reel, index) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => onOpen(reel.id)}
              className="w-[15.5rem] overflow-hidden rounded-2xl bg-zinc-100 text-left shadow-sm ring-1 ring-zinc-200/80"
            >
              <div
                className={cn(
                  "relative h-28 bg-linear-to-br",
                  reel.gradient
                )}
              >
                <span className="absolute top-2 left-2 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-medium text-white">
                  Reel · {index + 1} of {sentReels.length}
                </span>
                <span className="absolute right-2 bottom-2 text-[11px] font-medium text-white/90">
                  @{reel.handle}
                </span>
              </div>
              <div className="px-3 py-2">
                <p className="line-clamp-1 text-[12px] font-medium">
                  {reel.title}
                </p>
                <p className="text-[11px] text-zinc-500">@{reel.handle}</p>
              </div>
            </button>
          ))}
        </div>
        <Incoming>{threadCopy.closer}</Incoming>
      </div>

      <div className="border-t border-zinc-100 px-3 py-2">
        <div className="rounded-full bg-zinc-100 px-4 py-2 text-[13px] text-zinc-400">
          Message…
        </div>
      </div>
      <nav className="flex items-center justify-around border-t border-zinc-100 py-2 text-zinc-900">
        <Home className="size-5" />
        <Search className="size-5" />
        <PlusSquare className="size-5" />
        <Heart className="size-5" />
        <User className="size-5" />
      </nav>
    </div>
  );
}

function Incoming({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[16rem] rounded-2xl rounded-tl-md bg-zinc-100 px-3 py-2 text-[13px] leading-5">
      {children}
    </div>
  );
}

function ViewerScreen({
  mode,
  queue,
  startId,
  activeId,
  onActiveChange,
  onBack,
}: {
  mode: Mode;
  queue: Reel[];
  startId: string;
  activeId: string;
  onActiveChange: (id: string) => void;
  onBack: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const startIndex = Math.max(
    0,
    queue.findIndex((reel) => reel.id === startId)
  );

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const slide = node.children[startIndex] as HTMLElement | undefined;
    slide?.scrollIntoView({ block: "start" });
  }, [startIndex, mode, startId]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    const slides = [...node.children];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (visible?.target as HTMLElement | undefined)?.dataset.reelId;
        if (id) onActiveChange(id);
      },
      { root: node, threshold: 0.6 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [queue, onActiveChange]);

  return (
    <div className="relative h-full bg-black text-white">
      <div
        ref={scrollerRef}
        className="h-full snap-y snap-mandatory overflow-y-auto"
      >
        {queue.map((reel) => (
          <section
            key={reel.id}
            data-reel-id={reel.id}
            className="h-full snap-start"
          >
            {reel.id === "end" ? (
              <EndCard onBack={onBack} />
            ) : (
              <ReelSlide reel={reel} mode={mode} />
            )}
          </section>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <StatusBar />
        <div className="pointer-events-auto flex items-center gap-2 px-3">
          <button
            type="button"
            onClick={onBack}
            className="flex size-8 items-center justify-center rounded-full bg-black/35"
            aria-label="Close Reel"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            {mode === "redesign" ? (
              <p className="text-[12px] font-semibold">
                {activeId === "end"
                  ? "End of Maya’s stack"
                  : `Maya sent · ${sentReels.findIndex((reel) => reel.id === activeId) + 1} of ${sentReels.length}`}
              </p>
            ) : (
              <p className="text-[12px] font-semibold">Reels</p>
            )}
            <p className="text-[10px] text-white/70">
              {mode === "redesign"
                ? "From your thread"
                : activeId !== startId
                  ? "Suggested for you"
                  : "Opened from chat"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReelSlide({ reel, mode }: { reel: Reel; mode: Mode }) {
  const sentIndex = sentReels.findIndex((item) => item.id === reel.id);

  return (
    <div className={cn("relative flex h-full flex-col bg-linear-to-br", reel.gradient)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_42%)]" />
      <div className="relative mt-auto flex items-end gap-3 px-3 pb-6">
        <div className="min-w-0 flex-1 space-y-2">
          {mode === "redesign" && reel.kind === "sent" ? (
            <span className="inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 uppercase">
              {sentIndex + 1} of {sentReels.length}
            </span>
          ) : reel.kind === "suggested" ? (
            <span className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/80 uppercase">
              Suggested
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/80 uppercase">
              Reel
            </span>
          )}
          <p className="text-[15px] font-semibold">@{reel.handle}</p>
          <p className="text-[20px] leading-6 font-medium tracking-tight">
            {reel.title}
          </p>
          <p className="text-[13px] text-white/80">{reel.caption}</p>
          <p className="text-[11px] text-white/60">{reel.sound}</p>
        </div>
        <div className="flex flex-col items-center gap-4 pb-2 text-[11px]">
          <div className="flex flex-col items-center gap-1">
            <Heart className="size-7 fill-white" />
            {reel.likes}
          </div>
          <div className="flex flex-col items-center gap-1">
            <MessageCircle className="size-7" />
            {reel.comments}
          </div>
          <Send className="size-7" />
          <Bookmark className="size-7" />
        </div>
      </div>
    </div>
  );
}

function EndCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ink px-8 text-center">
      <p className="text-[11px] font-medium tracking-[0.2em] text-rose uppercase">
        End of stack
      </p>
      <p className="font-heading mt-3 text-[32px] leading-tight text-paper">
        That’s everything Maya sent
      </p>
      <p className="mt-3 text-[13px] leading-5 text-white/60">
        Five Reels. No Suggested. You can go back to the thread, or open For You on purpose.
      </p>
      <div className="mt-8 flex w-full flex-col gap-2">
        <Button
          onClick={onBack}
          className="h-10 bg-paper text-ink hover:bg-paper/90"
        >
          Back to Maya
        </Button>
        <Button
          variant="ghost"
          className="h-10 text-white/70 hover:bg-white/10 hover:text-white"
        >
          Browse For You
        </Button>
      </div>
    </div>
  );
}
