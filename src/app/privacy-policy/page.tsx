import type { Metadata } from "next";
import { SiteDocument } from "@/components/site-document";
import { sitePageMetadata } from "@/lib/page-metadata";
import { SITE_NAME } from "@/lib/seo";
import { getContactEmail, getWebPageJsonLd } from "@/lib/site-pages";

export const metadata: Metadata = sitePageMetadata("/privacy-policy");

export default function PrivacyPolicyPage() {
  const email = getContactEmail();

  return (
    <SiteDocument
      eyebrow="PRIVACY"
      title="Privacy Policy"
      lead="This policy describes what Ideas For Youtubers collects, what stays public, and how to reach us about it. It was last updated on 17 August 2026."
      jsonLd={getWebPageJsonLd({
        type: "WebPage",
        href: "/privacy-policy",
        name: "Privacy Policy",
        description:
          "How Ideas For Youtubers handles public video ideas, cookies, hosting, and contact messages.",
      })}
    >
      <h2>Who we are</h2>
      <p>
        {SITE_NAME} (“we”, “us”) runs this website so people can browse
        YouTube channels and post video ideas. For questions about this
        policy, use the <a href="/contact">Contact us</a> page or email{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <h2>What you should assume is public</h2>
      <p>
        You do not create an account. When you add an idea, you send a title
        and optional notes. Those fields are stored with the channel you
        picked and shown to anyone who opens that page. Do not put passwords,
        addresses, phone numbers, school names, or other personal details in
        an idea. Treat the board like a poster on a street: once it is up,
        other people can read it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          Video ideas: title, notes, the channel they belong to, and the time
          they were saved.
        </li>
        <li>
          Technical logs from hosting and the database (for example IP
          address, browser type, and request time) used to run and protect
          the site.
        </li>
        <li>
          Messages you send us by email, including your address and whatever
          you write.
        </li>
      </ul>
      <p>
        We do not ask for a login, payment card, or date of birth. Roster
        entries (channel name, public YouTube URL, counts, and profile image
        URLs) describe public channels, not you.
      </p>
      <h2>Cookies and similar storage</h2>
      <p>
        The site may set cookies or similar data that our host and database
        provider need to serve pages, keep a session, or prevent abuse. Your
        browser may also store small amounts of data for the idea form on a
        channel page while you use it. We also load Google Analytics (measurement
        ID G-0NF2QJS25G), which sets cookies such as `_ga` so we can see page
        views and how people move around the site. Google’s own terms apply to
        that traffic data.
      </p>
      <h2>How we use information</h2>
      <p>We use the information above to:</p>
      <ul>
        <li>show the roster and public idea lists;</li>
        <li>save ideas that visitors confirm;</li>
        <li>keep the site up, debug errors, and stop spam or attacks;</li>
        <li>answer email you send us;</li>
        <li>measure traffic with Google Analytics.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use idea text to
        build advertising profiles.
      </p>
      <h2>Who processes data for us</h2>
      <p>
        Pages are hosted by our website provider (currently Cloudflare). Channel
        records and ideas are stored with our database provider (currently
        Supabase). Channel artwork and “Visit on YouTube” links go to YouTube
        / Google when you follow them. Google Analytics loads from Google
        Tag Manager (`googletagmanager.com` / `google-analytics.com`). Those
        companies process data on their own terms when your browser talks to
        them.
      </p>
      <h2>How long we keep it</h2>
      <p>
        Public ideas stay on the channel page until we remove them (for
        example after a valid complaint, spam, or a legal request). Server
        logs follow our host’s and database provider’s retention. Emails we
        receive are kept as long as needed to handle the request.
      </p>
      <h2>Your choices</h2>
      <p>
        You can use the site without sending an idea. If you want an idea
        taken down, contact us with the channel name, the title, and
        approximately when you posted it. We may not be able to identify you
        if the idea has no email attached, which is why you should not put
        personal data in the form.
      </p>
      <p>
        Depending on where you live, you may have rights to access, correct,
        or delete personal data we hold about you, or to object to certain
        processing. Email {email} and we will work through what we actually
        have. Because ideas are anonymous, we may need extra detail to find a
        row.
      </p>
      <h2>Children</h2>
      <p>
        This site is not directed at children under 13, and we do not want
        personal information from them. YouTube’s own rules also limit who
        may send ideas that reference real minors. If you believe a child
        submitted personal data, email us and we will delete it when we can
        locate it.
      </p>
      <h2>Changes</h2>
      <p>
        If we change how this site collects or uses data, we will update this
        page and the date at the top. Keep using the site after that date
        only if you accept the revised policy.
      </p>
    </SiteDocument>
  );
}
