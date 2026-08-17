import type { Metadata } from "next";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";
import { SITE_PAGES } from "@/lib/site-pages";

type SiteHref = (typeof SITE_PAGES)[number]["href"];

export function sitePageMetadata(href: SiteHref): Metadata {
  const page = SITE_PAGES.find((item) => item.href === href);
  if (!page) {
    throw new Error(`Unknown site page: ${href}`);
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${page.href}`;
  const title = `${page.title} | ${SITE_NAME}`;

  return {
    title: {
      absolute: title,
    },
    description: page.description,
    alternates: {
      canonical: page.href,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description: page.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}: ${page.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}
