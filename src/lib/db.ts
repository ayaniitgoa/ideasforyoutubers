import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createPublicClient } from "@/utils/supabase/public";
import type { Youtuber, YoutuberCategory } from "@/lib/youtubers";
import type { VideoIdea } from "@/lib/ideas";

type YoutuberRow = {
  id: string;
  slug: string;
  category: YoutuberCategory;
  url: string;
  image: string;
  channel: string;
  subscribers_label: string;
  views_label: string;
  videos_label: string;
  subscribers: number;
  views: number;
  videos: number;
};

type IdeaRow = {
  id: string;
  title: string;
  notes: string | null;
  created_at: string;
};

function mapYoutuber(row: YoutuberRow): Youtuber {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    url: row.url,
    image: row.image,
    channel: row.channel,
    subscribersLabel: row.subscribers_label,
    viewsLabel: row.views_label,
    videosLabel: row.videos_label,
    subscribers: Number(row.subscribers),
    views: Number(row.views),
    videos: Number(row.videos),
  };
}

function mapIdea(row: IdeaRow): VideoIdea {
  return {
    id: row.id,
    title: row.title,
    notes: row.notes ?? "",
    createdAt: row.created_at,
  };
}

const YOUTUBER_COLUMNS =
  "id, slug, category, url, image, channel, subscribers_label, views_label, videos_label, subscribers, views, videos";

async function fetchYoutubers(): Promise<Youtuber[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("youtubers")
    .select(YOUTUBER_COLUMNS)
    .order("subscribers", { ascending: false });

  if (error) {
    throw new Error(`Failed to load youtubers: ${error.message}`);
  }

  return (data ?? []).map((row) => mapYoutuber(row as YoutuberRow));
}

const loadYoutubers = unstable_cache(fetchYoutubers, ["youtubers-roster"], {
  revalidate: 3600,
  tags: ["youtubers"],
});

export const getYoutubers = cache(loadYoutubers);

export const getYoutuberBySlug = cache(async (slug: string): Promise<Youtuber | null> => {
  const channels = await getYoutubers();
  return channels.find((channel) => channel.slug === slug) ?? null;
});

export async function getIdeas(youtuberId: string): Promise<VideoIdea[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("ideas")
    .select("id, title, notes, created_at")
    .eq("youtuber_id", youtuberId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load ideas: ${error.message}`);
  }

  return (data ?? []).map((row) => mapIdea(row as IdeaRow));
}
