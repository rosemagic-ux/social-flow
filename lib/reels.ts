export type ReelKind = "sent" | "suggested";

export type Reel = {
  id: string;
  author: string;
  handle: string;
  title: string;
  caption: string;
  sound: string;
  likes: string;
  comments: string;
  kind: ReelKind;
  gradient: string;
};

export const friend = {
  name: "Maya Chen",
  handle: "maya.makes",
  initials: "MC",
  time: "9:41 PM",
};

export const sentReels: Reel[] = [
  {
    id: "glaze",
    author: "Kiln Notes",
    handle: "kilnnotes",
    title: "The glaze finally behaved",
    caption: "Fourteen hours for one pour. Worth it.",
    sound: "Original audio · kilnnotes",
    likes: "84.2K",
    comments: "1,104",
    kind: "sent",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
  },
  {
    id: "drawer-cat",
    author: "Drawer Cat",
    handle: "drawer.cat",
    title: "He has a system now",
    caption: "Third sock this week. We are not negotiating.",
    sound: "Soft jazz · drawer.cat",
    likes: "210K",
    comments: "4,882",
    kind: "sent",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
  },
  {
    id: "aglio",
    author: "Midnight Aglio",
    handle: "midnight.aglio",
    title: "Pasta for one, plated like six",
    caption: "Garlic, oil, and a very late train.",
    sound: "Kitchen radio · midnight.aglio",
    likes: "61.8K",
    comments: "902",
    kind: "sent",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
  },
  {
    id: "sax",
    author: "Late Keys",
    handle: "late.keys",
    title: "Saxophone at 1:14 a.m.",
    caption: "Someone on the corner playing like the city asked.",
    sound: "Street sax · late.keys",
    likes: "128K",
    comments: "2,441",
    kind: "sent",
    gradient: "from-[#644a5c] via-[#422630] to-[#2a161c]",
  },
  {
    id: "punchline",
    author: "Soft Punchline",
    handle: "soft.punchline",
    title: "This is the whole point",
    caption: "Maya: wait for the last line. Do not scroll off.",
    sound: "Voiceover · soft.punchline",
    likes: "402K",
    comments: "9,017",
    kind: "sent",
    gradient: "from-[#d2b6b7] via-[#f4e9e9] to-[#644a5c]",
  },
];

export const suggestedReels: Reel[] = [
  {
    id: "gym",
    author: "Gain Club",
    handle: "gain.club",
    title: "Day 47 of the program",
    caption: "Link in bio for the full split.",
    sound: "Trending audio · gain.club",
    likes: "1.2M",
    comments: "18.4K",
    kind: "suggested",
    gradient: "from-[#422630] via-[#644a5c] to-[#2a161c]",
  },
  {
    id: "dew",
    author: "Dewdrop",
    handle: "dewdrop",
    title: "The serum that fixed my barrier",
    caption: "Sponsored · 20% off this weekend only.",
    sound: "Shop now · dewdrop",
    likes: "64.1K",
    comments: "812",
    kind: "suggested",
    gradient: "from-[#f4e9e9] via-[#d2b6b7] to-[#422630]",
  },
  {
    id: "trend",
    author: "Trend Room",
    handle: "trendroom",
    title: "This audio is everywhere",
    caption: "Use the sound. Post before Friday.",
    sound: "Viral audio · trendroom",
    likes: "3.4M",
    comments: "41.2K",
    kind: "suggested",
    gradient: "from-[#d2b6b7] via-[#644a5c] to-[#422630]",
  },
  {
    id: "alpha",
    author: "Alpha Desk",
    handle: "alpha.desk",
    title: "If you are still watching, listen",
    caption: "Three rules nobody tells you at 22.",
    sound: "Motivational · alpha.desk",
    likes: "890K",
    comments: "22.1K",
    kind: "suggested",
    gradient: "from-[#f5f3ef] via-[#d2b6b7] to-[#644a5c]",
  },
];

export const threadCopy = {
  opener: "okay you HAVE to watch these",
  closer: "the last one is the whole point. do not skip.",
};
