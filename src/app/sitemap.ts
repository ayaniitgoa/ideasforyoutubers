import type { MetadataRoute } from "next";
import { getSitemapUrls } from "@/lib/sitemap";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = await getSitemapUrls();

  return urls.map((entry) => ({
    url: entry.loc,
    lastModified: entry.lastmod,
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
