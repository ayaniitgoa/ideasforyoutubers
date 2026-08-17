export type YoutuberCategory = "Gaming" | "Entertainment";

export type Youtuber = {
  id: string;
  slug: string;
  category: YoutuberCategory;
  url: string;
  image: string;
  channel: string;
  subscribersLabel: string;
  viewsLabel: string;
  videosLabel: string;
  subscribers: number;
  views: number;
  videos: number;
};

export type YoutuberRecord = Omit<Youtuber, "slug">;

export type SortKey = "subscribers" | "views" | "videos" | "channel";

export type YoutuberFilters = {
  query: string;
  category: "All" | YoutuberCategory;
  minSubscribers: number;
  sort: SortKey;
};

export const defaultFilters: YoutuberFilters = {
  query: "",
  category: "All",
  minSubscribers: 0,
  sort: "subscribers",
};

export function filterYoutubers(
  channels: Youtuber[],
  filters: YoutuberFilters,
): Youtuber[] {
  const needle = filters.query.trim().toLowerCase();

  const next = channels.filter((channel) => {
    if (filters.category !== "All" && channel.category !== filters.category) {
      return false;
    }
    if (channel.subscribers < filters.minSubscribers) {
      return false;
    }
    if (needle && !channel.channel.toLowerCase().includes(needle)) {
      return false;
    }
    return true;
  });

  next.sort((a, b) => {
    if (filters.sort === "channel") {
      return a.channel.localeCompare(b.channel);
    }
    return b[filters.sort] - a[filters.sort];
  });

  return next;
}

export function getYoutuberById(
  channels: Youtuber[],
  id: string,
): Youtuber | undefined {
  return channels.find((channel) => channel.id === id);
}

export function getYoutuberBySlug(
  channels: Youtuber[],
  slug: string,
): Youtuber | undefined {
  return channels.find((channel) => channel.slug === slug);
}

export function slugifyChannelName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const RESERVED_PATHS = new Set([
  "about",
  "about-us",
  "contact",
  "contact-us",
  "privacy",
  "privacy-policy",
  "terms",
  "terms-and-conditions",
]);

function handleFromUrl(url: string): string {
  const match = url.match(/@([^/?#]+)/);
  return match ? slugifyChannelName(decodeURIComponent(match[1])) : "";
}

export function withChannelSlugs(records: YoutuberRecord[]): Youtuber[] {
  const used = new Map<string, number>();

  return records.map((record) => {
    const base =
      slugifyChannelName(record.channel) ||
      handleFromUrl(record.url) ||
      record.id;
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    let slug = seen === 0 ? base : `${base}-${seen + 1}`;
    if (RESERVED_PATHS.has(slug)) {
      slug = `${slug}-channel`;
    }
    return { ...record, slug };
  });
}
