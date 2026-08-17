import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export const SITE_PAGES = [
  {
    href: "/about",
    label: "About us",
    title: "About Us",
    description:
      "Learn how Ideas For Youtubers collects YouTube video ideas for real channels — a public board, not a generic prompt list.",
  },
  {
    href: "/privacy-policy",
    label: "Privacy policy",
    title: "Privacy Policy",
    description:
      "How Ideas For Youtubers handles public video ideas, cookies, hosting, and your contact messages.",
  },
  {
    href: "/terms-and-conditions",
    label: "Terms and conditions",
    title: "Terms and Conditions",
    description:
      "Rules for using the roster, posting YouTube video ideas, and how this site relates to YouTube and listed creators.",
  },
  {
    href: "/contact",
    label: "Contact us",
    title: "Contact Us",
    description:
      "Email Ideas For Youtubers for legal, privacy, or site questions. Add video ideas on a channel page.",
  },
] as const;

export function getContactEmail() {
  return (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "ayanadhya99@gmail.com"
  );
}

export function getOrganizationJsonLd(contactUrl?: string) {
  const siteUrl = getSiteUrl();
  const email = getContactEmail();
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    email,
    description: SITE_TAGLINE,
    slogan: SITE_TAGLINE,
    ...(contactUrl
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            email,
            contactType: "customer support",
            url: contactUrl,
            availableLanguage: "English",
          },
        }
      : {}),
  };
}

export function getWebPageJsonLd({
  type,
  href,
  name,
  description,
}: {
  type: "AboutPage" | "ContactPage" | "WebPage";
  href: string;
  name: string;
  description: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${href}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(type === "ContactPage" ? url : undefined),
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: siteUrl,
        },
        about: { "@id": `${siteUrl}/#organization` },
        ...(type === "ContactPage"
          ? { mainEntity: { "@id": `${siteUrl}/#organization` } }
          : {}),
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name,
              item: url,
            },
          ],
        },
      },
    ],
  };
}
