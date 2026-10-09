export type PostKind = "friend" | "reposted" | "browse" | "suggested" | "ad";

export type HomeTab = "following" | "reposted" | "browse";

export type RepostedBy = {
  name: string;
  handle: string;
  initials: string;
};

export type FeedPost = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  time: string;
  location?: string;
  caption: string;
  likes: string;
  comments: string;
  kind: PostKind;
  gradient: string;
  repostedBy?: RepostedBy;
};

export type Story = {
  id: string;
  name: string;
  initials: string;
  unseen: boolean;
  gradient: string;
};

export const friendPosts: FeedPost[] = [
  {
    id: "maya-mug",
    author: "Maya Chen",
    handle: "maya.makes",
    initials: "MC",
    time: "2h",
    location: "Kiln Notes studio",
    caption: "The second firing held. I cried a little.",
    likes: "248",
    comments: "31",
    kind: "friend",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
  },
  {
    id: "jules-ride",
    author: "Jules Okonkwo",
    handle: "jules.ok",
    initials: "JO",
    time: "4h",
    location: "Parkway",
    caption: "Fog on the parkway. No music.",
    likes: "186",
    comments: "12",
    kind: "friend",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
  },
  {
    id: "priya-dahlias",
    author: "Priya Shah",
    handle: "priya.markets",
    initials: "PS",
    time: "6h",
    caption: "Last dahlias at the stall. I bought too many on purpose.",
    likes: "412",
    comments: "44",
    kind: "friend",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
  },
  {
    id: "sam-dog",
    author: "Sam Reed",
    handle: "sam.and.dog",
    initials: "SR",
    time: "8h",
    caption: "He chose the long way home.",
    likes: "903",
    comments: "67",
    kind: "friend",
    gradient: "from-[#644a5c] via-[#422630] to-[#2a161c]",
  },
  {
    id: "aiko-window",
    author: "Aiko Tanaka",
    handle: "aiko.light",
    initials: "AT",
    time: "11h",
    location: "East window",
    caption: "4:12 p.m. That’s the whole post.",
    likes: "1,024",
    comments: "88",
    kind: "friend",
    gradient: "from-[#d2b6b7] via-[#f4e9e9] to-[#644a5c]",
  },
  {
    id: "omar-table",
    author: "Omar Haddad",
    handle: "omar.table",
    initials: "OH",
    time: "14h",
    caption: "Nobody photographed the food until we were done.",
    likes: "357",
    comments: "29",
    kind: "friend",
    gradient: "from-[#422630] via-[#644a5c] to-[#2a161c]",
  },
];

export const repostedPosts: FeedPost[] = [
  {
    id: "repost-throw",
    author: "Student Kiln",
    handle: "student.kiln",
    initials: "SK",
    time: "3h",
    location: "Night class",
    caption: "First time the rim didn’t wobble.",
    likes: "1,104",
    comments: "96",
    kind: "reposted",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
    repostedBy: {
      name: "Maya Chen",
      handle: "maya.makes",
      initials: "MC",
    },
  },
  {
    id: "repost-river",
    author: "Night Shift Maps",
    handle: "night.shift.maps",
    initials: "NS",
    time: "5h",
    caption: "The river path after rain. Lights stay on for another hour.",
    likes: "642",
    comments: "41",
    kind: "reposted",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
    repostedBy: {
      name: "Jules Okonkwo",
      handle: "jules.ok",
      initials: "JO",
    },
  },
  {
    id: "repost-farm",
    author: "Coastal Farm",
    handle: "coastal.farm",
    initials: "CF",
    time: "9h",
    caption: "Ranunculus before the market rush.",
    likes: "2,880",
    comments: "210",
    kind: "reposted",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
    repostedBy: {
      name: "Priya Shah",
      handle: "priya.markets",
      initials: "PS",
    },
  },
  {
    id: "repost-print",
    author: "Paper Studio",
    handle: "paper.studio",
    initials: "PS",
    time: "12h",
    caption: "A print that looks like 4:12 light, if you stand here.",
    likes: "774",
    comments: "53",
    kind: "reposted",
    gradient: "from-[#644a5c] via-[#422630] to-[#2a161c]",
    repostedBy: {
      name: "Aiko Tanaka",
      handle: "aiko.light",
      initials: "AT",
    },
  },
];

export const browsePosts: FeedPost[] = [
  {
    id: "browse-clay",
    author: "North Clay",
    handle: "north.clay",
    initials: "NC",
    time: "Browse",
    caption: "A bowl that still has the throw lines.",
    likes: "3,201",
    comments: "188",
    kind: "browse",
    gradient: "from-[#d2b6b7] via-[#f4e9e9] to-[#644a5c]",
  },
  {
    id: "browse-fruit",
    author: "Late Market",
    handle: "late.market",
    initials: "LM",
    time: "Browse",
    caption: "Oranges stacked like they were waiting for someone patient.",
    likes: "5,440",
    comments: "301",
    kind: "browse",
    gradient: "from-[#422630] via-[#644a5c] to-[#2a161c]",
  },
  {
    id: "browse-harbor",
    author: "Harbor Light",
    handle: "harbor.light",
    initials: "HL",
    time: "Browse",
    caption: "Boats before the first engine.",
    likes: "8,112",
    comments: "420",
    kind: "browse",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
  },
  {
    id: "browse-bread",
    author: "Soft Kitchen",
    handle: "soft.kitchen",
    initials: "SK",
    time: "Browse",
    caption: "The loaf cracked on its own. We took that as a yes.",
    likes: "2,009",
    comments: "144",
    kind: "browse",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
  },
  {
    id: "browse-trail",
    author: "Atlas Walk",
    handle: "atlas.walk",
    initials: "AW",
    time: "Browse",
    caption: "Switchback, then the weather changed its mind.",
    likes: "1,667",
    comments: "92",
    kind: "browse",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
  },
  {
    id: "browse-room",
    author: "Room Tone",
    handle: "room.tone",
    initials: "RT",
    time: "Browse",
    caption: "A corner, a chair, and enough quiet to stay.",
    likes: "4,580",
    comments: "267",
    kind: "browse",
    gradient: "from-[#644a5c] via-[#422630] to-[#2a161c]",
  },
];

export const extraPosts: FeedPost[] = [
  {
    id: "gain",
    author: "Gain Club",
    handle: "gain.club",
    initials: "GC",
    time: "Sponsored",
    caption: "Day 47. Link in bio for the full split.",
    likes: "1.2M",
    comments: "18.4K",
    kind: "ad",
    gradient: "from-[#d2b6b7] via-[#f4e9e9] to-[#644a5c]",
  },
  {
    id: "dew",
    author: "Dewdrop",
    handle: "dewdrop",
    initials: "DD",
    time: "Suggested",
    caption: "The serum that fixed my barrier. 20% off this weekend.",
    likes: "64.1K",
    comments: "812",
    kind: "ad",
    gradient: "from-[#422630] via-[#644a5c] to-[#2a161c]",
  },
  {
    id: "trend",
    author: "Trend Room",
    handle: "trendroom",
    initials: "TR",
    time: "Suggested",
    caption: "This audio is everywhere. Post before Friday.",
    likes: "3.4M",
    comments: "41.2K",
    kind: "suggested",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
  },
  {
    id: "alpha",
    author: "Alpha Desk",
    handle: "alpha.desk",
    initials: "AD",
    time: "Suggested",
    caption: "If you are still scrolling, this is why.",
    likes: "890K",
    comments: "22.1K",
    kind: "suggested",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
  },
  {
    id: "villa",
    author: "Stay Somewhere",
    handle: "stay.somewhere",
    initials: "SS",
    time: "Sponsored",
    caption: "A villa you will never book, shot like you might.",
    likes: "210K",
    comments: "1,102",
    kind: "ad",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
  },
  {
    id: "recap",
    author: "Recap Machine",
    handle: "recap.machine",
    initials: "RM",
    time: "Suggested",
    caption: "Your year in someone else’s template.",
    likes: "540K",
    comments: "6,221",
    kind: "suggested",
    gradient: "from-[#644a5c] via-[#422630] to-[#2a161c]",
  },
  {
    id: "shop",
    author: "The Drop",
    handle: "the.drop",
    initials: "TD",
    time: "Sponsored",
    caption: "Three things in your cart from a person you do not know.",
    likes: "98.4K",
    comments: "2,008",
    kind: "ad",
    gradient: "from-[#d2b6b7] via-[#f4e9e9] to-[#644a5c]",
  },
  {
    id: "popular",
    author: "Popular Now",
    handle: "popular.now",
    initials: "PN",
    time: "Suggested",
    caption: "You’re seeing this because it is popular.",
    likes: "4.1M",
    comments: "88.2K",
    kind: "suggested",
    gradient: "from-[#422630] via-[#644a5c] to-[#2a161c]",
  },
];

export const stories: Story[] = [
  {
    id: "you",
    name: "Your story",
    initials: "R",
    unseen: false,
    gradient: "from-[#f5f3ef] to-[#d2b6b7]",
  },
  {
    id: "maya",
    name: "Maya",
    initials: "MC",
    unseen: true,
    gradient: "from-[#d2b6b7] to-[#422630]",
  },
  {
    id: "jules",
    name: "Jules",
    initials: "JO",
    unseen: true,
    gradient: "from-[#644a5c] to-[#422630]",
  },
  {
    id: "priya",
    name: "Priya",
    initials: "PS",
    unseen: true,
    gradient: "from-[#f4e9e9] to-[#644a5c]",
  },
  {
    id: "sam",
    name: "Sam",
    initials: "SR",
    unseen: false,
    gradient: "from-[#d2b6b7] to-[#644a5c]",
  },
  {
    id: "aiko",
    name: "Aiko",
    initials: "AT",
    unseen: false,
    gradient: "from-[#f5f3ef] to-[#644a5c]",
  },
  {
    id: "omar",
    name: "Omar",
    initials: "OH",
    unseen: false,
    gradient: "from-[#644a5c] to-[#2a161c]",
  },
];

export const unseenStories = stories.filter(
  (story) => story.unseen && story.id !== "you"
);

export const homeTabs: { id: HomeTab; label: string }[] = [
  { id: "following", label: "Following" },
  { id: "reposted", label: "Reposted" },
  { id: "browse", label: "Browse" },
];

export function postsFor(tab: HomeTab): FeedPost[] {
  if (tab === "reposted") return repostedPosts;
  if (tab === "browse") return browsePosts;
  return friendPosts;
}
