import { getYoutubers } from "@/lib/db";
import { getSiteUrl } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";

type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SitemapUrl = {
  loc: string;
  lastmod: string;
  changefreq: SitemapChangeFrequency;
  priority: number;
};

async function getChannelUrls(siteUrl: string, lastmod: string): Promise<SitemapUrl[]> {
  try {
    const channels = await getYoutubers();
    return channels.map((channel) => ({
      loc: `${siteUrl}/${channel.slug}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

export async function getSitemapUrls(): Promise<SitemapUrl[]> {
  const siteUrl = getSiteUrl();
  const lastmod = new Date().toISOString();

  return [
    {
      loc: siteUrl,
      lastmod,
      changefreq: "daily",
      priority: 1,
    },
    ...SITE_PAGES.map((page) => ({
      loc: `${siteUrl}${page.href}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.6,
    })),
    ...(await getChannelUrls(siteUrl, lastmod)),
  ];
}
