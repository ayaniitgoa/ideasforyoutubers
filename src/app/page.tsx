import type { Metadata } from "next";
import { SiteFaq } from "@/components/site-faq";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SitePages } from "@/components/site-pages";
import { YoutuberDirectory } from "@/components/youtuber-directory";
import { getYoutubers } from "@/lib/db";
import { getFaqJsonLd } from "@/lib/faq";
import {
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/seo";
import { getOrganizationJsonLd, SITE_PAGES } from "@/lib/site-pages";

export const revalidate = 3600;

const siteUrl = getSiteUrl();
const homeTitle = `${SITE_NAME} | YouTube Video Ideas, Good YouTube Ideas & Creative Video Ideas`;

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ideas For Youtubers",
    "good youtube ideas",
    "youtube ideas for beginners",
    "youtube video ideas",
    "video ideas",
    "video ideas for youtube",
    "good youtube video ideas",
    "trending youtube video ideas 2025",
    "creative video ideas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: homeTitle,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: crowdsource YouTube video ideas for real channels`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default async function HomePage() {
  const channels = await getYoutubers();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        applicationCategory: "EntertainmentApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Browse YouTube channels",
          "Add YouTube video ideas",
          "Filter by category and subscribers",
        ],
        slogan: SITE_TAGLINE,
      },
      getOrganizationJsonLd(),
      ...SITE_PAGES.map((page) => ({
        "@type": "WebPage",
        name: page.title,
        url: `${siteUrl}${page.href}`,
        description: page.description,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <YoutuberDirectory channels={channels} />
        <SiteFaq />
        <SitePages />
      </main>
      <SiteFooter />
    </>
  );
}
