export const SITE_NAME = "Ideas For Youtubers";
export const SITE_TAGLINE = "What should they make next? You decide.";

export const SITE_DESCRIPTION =
  "Ideas For Youtubers is a free board for YouTube video ideas, good YouTube ideas, and creative video ideas. Browse channels and add video ideas for YouTube — including ideas for beginners and trending YouTube video ideas 2025.";

export const SITE_KEYWORDS = [
  "Ideas For Youtubers",
  "good youtube ideas",
  "youtube ideas for beginners",
  "youtube video ideas",
  "video ideas",
  "video ideas for youtube",
  "good youtube video ideas",
  "trending youtube video ideas 2025",
  "creative video ideas",
] as const;

export const PRODUCTION_SITE_URL = "https://www.ideasforyoutubers.com";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) {
    return explicit;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return PRODUCTION_SITE_URL;
}
