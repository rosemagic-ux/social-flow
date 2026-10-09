"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Bookmark,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  PlusSquare,
  Search,
  Send,
  User,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneFrame, StatusBar } from "@/components/phone-frame";
import {
  extraPosts,
  friendPosts,
  homeTabs,
  postsFor,
  stories,
  unseenStories,
  type FeedPost,
  type HomeTab,
} from "@/lib/feed";
import { cn } from "@/lib/utils";

type Mode = "today" | "redesign";

const END_ID = "caught-up";

export function FeedMockup({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("redesign");
  const [homeTab, setHomeTab] = useState<HomeTab>("following");
  const [activeId, setActiveId] = useState(friendPosts[0].id);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const tabPosts = postsFor(homeTab);
  const feed = mode === "redesign" ? tabPosts : [...friendPosts, ...extraPosts];
  const activePost = feed.find((post) => post.id === activeId);
  const tabIndex = tabPosts.findIndex((post) => post.id === activeId);

  function changeMode(next: Mode) {
    setMode(next);
    setHomeTab("following");
    setActiveId(friendPosts[0].id);
    setStoryIndex(null);
    scrollerRef.current?.scrollTo({ top: 0 });
  }

  function changeHomeTab(next: HomeTab) {
    setHomeTab(next);
    const nextPosts = postsFor(next);
    setActiveId(nextPosts[0]?.id ?? END_ID);
    setStoryIndex(null);
    scrollerRef.current?.scrollTo({ top: 0 });
  }

  const note =
    storyIndex !== null
      ? "Stories already end. Three frames, then you’re out."
      : activeId === END_ID
        ? "You’re all caught up. That’s enough for tonight."
        : mode === "today" && activePost && activePost.kind !== "friend"
          ? "Your friends ran out. The feed did not."
          : mode === "today"
            ? "This is the good part — people you actually follow."
            : homeTab === "reposted"
              ? `${activePost?.repostedBy?.name ?? "A friend"} passed this along. ${tabIndex + 1} of ${tabPosts.length}.`
              : homeTab === "browse"
                ? `You asked for this tab. ${tabIndex + 1} of ${tabPosts.length} looks.`
                : `Same photos. A number, so you know where you are. ${tabIndex + 1} of ${tabPosts.length}.`;

  return (
    <div
      className={
        compact
          ? "flex flex-col items-center gap-4"
          : "grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12"
      }
    >
      <div className="flex flex-col items-center gap-4">
        <Tabs
          value={mode}
          onValueChange={(value) => changeMode(value as Mode)}
        >
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
          {storyIndex !== null ? (
            <StoryViewer
              index={storyIndex}
              onIndex={setStoryIndex}
              onClose={() => setStoryIndex(null)}
            />
          ) : (
            <FeedScreen
              mode={mode}
              homeTab={homeTab}
              feed={feed}
              scrollerRef={scrollerRef}
              onActiveChange={setActiveId}
              onHomeTabChange={changeHomeTab}
              onOpenStories={() => setStoryIndex(0)}
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
              <li>Following is real. The problem is what happens after it.</li>
              <li>Suggested, ads, and Reels splice in so the session never ends.</li>
              <li>There is no “caught up.” Done is treated as a failure.</li>
            </>
          ) : (
            <>
              <li>Following is originals. Reposted is friends passing something on.</li>
              <li>Browse is opt-in looking — not Suggested spliced under your friends.</li>
              <li>Each tab has a count, and each tab can be finished.</li>
            </>
          )}
        </ul>
        <p className="text-sm text-plum">
          {mode === "redesign"
            ? "Use the tabs in the phone to choose a surface. Each one stops."
            : "Scroll the phone. Today keeps going after your friends run out."}
        </p>
      </aside>
      )}
    </div>
  );
}

function FeedScreen({
  mode,
  homeTab,
  feed,
  scrollerRef,
  onActiveChange,
  onHomeTabChange,
  onOpenStories,
}: {
  mode: Mode;
  homeTab: HomeTab;
  feed: FeedPost[];
  scrollerRef: RefObject<HTMLDivElement | null>;
  onActiveChange: (id: string) => void;
  onHomeTabChange: (tab: HomeTab) => void;
  onOpenStories: () => void;
}) {
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const nodes = [...root.querySelectorAll<HTMLElement>("[data-feed-id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-feed-id");
        if (id) onActiveChange(id);
      },
      { root, threshold: 0.45 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [feed, onActiveChange, scrollerRef]);

  return (
    <div className="flex h-full flex-col bg-white text-zinc-950">
      <StatusBar light />
      <header className="flex items-center justify-between px-3 pb-1.5">
        <p className="font-heading text-[22px] leading-none tracking-tight">
          {mode === "redesign" ? "Home" : "instagram"}
        </p>
        <div className="flex items-center gap-3">
          {mode === "redesign" ? (
            <span className="rounded-full bg-blush px-2 py-0.5 text-[10px] font-medium text-plum">
              {feed.length} today
            </span>
          ) : (
            <>
              <Heart className="size-5" />
              <Send className="size-5" />
            </>
          )}
        </div>
      </header>

      {mode === "redesign" ? (
        <div className="flex border-b border-zinc-100 px-1">
          {homeTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onHomeTabChange(tab.id)}
              className={cn(
                "relative flex-1 py-2 text-[12px] font-medium",
                homeTab === tab.id ? "text-zinc-950" : "text-zinc-400"
              )}
            >
              {tab.label}
              {homeTab === tab.id ? (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-zinc-950" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}

      <div ref={scrollerRef} className="min-h-0 flex-1 overflow-y-auto">
        {mode === "today" || homeTab === "following" ? (
          <StoriesRow onOpen={onOpenStories} />
        ) : null}

        {feed.map((post) => (
          <article key={post.id} data-feed-id={post.id}>
            <PostCard post={post} mode={mode} />
          </article>
        ))}

        {mode === "redesign" ? (
          <CaughtUpCard />
        ) : (
          <div className="px-4 py-8 text-center">
            <div className="mx-auto size-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-500" />
            <p className="mt-3 text-[11px] text-zinc-400">Loading more</p>
          </div>
        )}
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

function StoriesRow({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto border-b border-zinc-100 px-3 py-3">
      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          onClick={story.unseen ? onOpen : undefined}
          className="flex w-14 shrink-0 flex-col items-center gap-1"
        >
          <span
            className={cn(
              "flex size-12 items-center justify-center rounded-full p-[2px]",
              story.unseen
                ? "bg-[linear-gradient(135deg,#d2b6b7,#644a5c,#422630)]"
                : "bg-zinc-200"
            )}
          >
            <span
              className={cn(
                "flex size-full items-center justify-center rounded-full bg-linear-to-br text-[10px] font-semibold text-white ring-2 ring-white",
                story.gradient
              )}
            >
              {story.initials}
            </span>
          </span>
          <span className="w-full truncate text-center text-[10px] text-zinc-500">
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function PostCard({ post, mode }: { post: FeedPost; mode: Mode }) {
  const tabPosts = postsFor(
    post.kind === "reposted"
      ? "reposted"
      : post.kind === "browse"
        ? "browse"
        : "following"
  );
  const tabIndex = tabPosts.findIndex((item) => item.id === post.id);
  const showCount =
    mode === "redesign" &&
    (post.kind === "friend" || post.kind === "reposted" || post.kind === "browse");

  return (
    <div className="pb-3">
      {post.repostedBy ? (
        <p className="flex items-center gap-1.5 px-3 pt-2 text-[11px] text-zinc-500">
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded-full bg-linear-to-br text-[7px] font-semibold text-white",
              post.repostedBy.initials === "JO"
                ? "from-[#644a5c] to-[#422630]"
                : post.repostedBy.initials === "PS"
                  ? "from-[#d2b6b7] to-[#644a5c]"
                  : post.repostedBy.initials === "AT"
                    ? "from-[#f4e9e9] to-[#d2b6b7]"
                    : "from-[#d2b6b7] to-[#422630]"
            )}
          >
            {post.repostedBy.initials}
          </span>
          <span className="font-medium text-zinc-700">{post.repostedBy.name}</span>
          reposted
        </p>
      ) : null}
      <div className="flex items-center gap-2 px-3 py-2">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full bg-linear-to-br text-[9px] font-semibold text-white",
            post.gradient
          )}
        >
          {post.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold">{post.author}</p>
          <p className="text-[10px] text-zinc-400">
            {post.location ? `${post.location} · ` : ""}
            {post.time}
          </p>
        </div>
        {post.kind === "suggested" || post.kind === "ad" ? (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-medium tracking-wide text-zinc-500 uppercase">
            {post.kind === "ad" ? "Sponsored" : "Suggested"}
          </span>
        ) : showCount ? (
          <span className="text-[10px] text-zinc-400">
            {tabIndex + 1}/{tabPosts.length}
          </span>
        ) : null}
        <MoreHorizontal className="size-4 text-zinc-400" />
      </div>

      <div className={cn("relative aspect-[4/5] bg-linear-to-br", post.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_40%)]" />
        {post.kind === "suggested" || post.kind === "ad" ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white">
            Because you scrolled
          </span>
        ) : post.kind === "browse" ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white">
            From Browse
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between px-3 pt-2">
        <div className="flex items-center gap-3">
          <Heart className="size-6" />
          <MessageCircle className="size-6" />
          <Send className="size-6" />
        </div>
        <Bookmark className="size-6" />
      </div>
      <div className="space-y-1 px-3 pt-1">
        <p className="text-[12px] font-semibold">{post.likes} likes</p>
        <p className="text-[12px] leading-5">
          <span className="font-semibold">{post.handle}</span> {post.caption}
        </p>
        <p className="text-[11px] text-zinc-400">
          View all {post.comments} comments
        </p>
      </div>
    </div>
  );
}

function CaughtUpCard() {
  return (
    <article
      data-feed-id={END_ID}
      className="border-t border-zinc-100 px-6 py-10 text-center"
    >
      <p className="font-heading text-[28px] leading-tight text-ink">
        You’re all caught up
      </p>
      <p className="mt-3 text-[11px] text-zinc-400">That’s enough for tonight</p>
    </article>
  );
}

function StoryViewer({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (index: number | null) => void;
  onClose: () => void;
}) {
  const story = unseenStories[index];
  if (!story) return null;

  function advance() {
    if (index >= unseenStories.length - 1) {
      onClose();
      return;
    }
    onIndex(index + 1);
  }

  return (
    <button
      type="button"
      onClick={advance}
      className={cn(
        "relative flex h-full w-full flex-col bg-linear-to-br text-left text-white",
        story.gradient
      )}
    >
      <StatusBar />
      <div className="flex gap-1 px-3">
        {unseenStories.map((item, itemIndex) => (
          <span
            key={item.id}
            className={cn(
              "h-0.5 flex-1 rounded-full",
              itemIndex <= index ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 pt-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold">
          {story.initials}
        </span>
        <p className="text-[13px] font-semibold">{story.name}</p>
        <p className="text-[11px] text-white/70">2h</p>
        <span className="ml-auto text-[11px] text-white/70">
          {index + 1} / {unseenStories.length}
        </span>
      </div>
      <div className="mt-auto px-6 pb-10">
        <p className="font-heading text-[34px] leading-tight">
          {story.name === "Maya"
            ? "Glaze is cooling. Don’t peek."
            : story.name === "Jules"
              ? "Turned around for the fog."
              : "Bought the last bunch."}
        </p>
        <p className="mt-4 text-[12px] text-white/70">Tap to continue</p>
      </div>
    </button>
  );
}
