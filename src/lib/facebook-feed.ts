import rawSnapshot from "../../public/feed/index.json";

export type FeedSource = "saloon" | "paraguay";

export type FeedItem = {
  id: string;
  src: string;
  source: FeedSource;
  page: string;
  alt: string;
};

export type FacebookFeedSnapshot = {
  updatedAt: string;
  pages: string[];
  items: FeedItem[];
};

export const FACEBOOK_PAGES = [
  {
    id: "saloon" as const,
    href: "https://www.facebook.com/ParadiseCitySaloon",
    label: "Paradise City Saloon",
  },
  {
    id: "paraguay" as const,
    href: "https://www.facebook.com/paradisecity.paraguay",
    label: "Paradise-City Paraguay",
  },
];

export const bundledFeed = rawSnapshot as FacebookFeedSnapshot;
