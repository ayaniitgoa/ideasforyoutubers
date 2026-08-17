import type { Metadata } from "next";
import { SiteDocument } from "@/components/site-document";
import { sitePageMetadata } from "@/lib/page-metadata";
import { SITE_NAME } from "@/lib/seo";
import { getContactEmail, getWebPageJsonLd } from "@/lib/site-pages";

export const metadata: Metadata = sitePageMetadata("/contact");

export default function ContactPage() {
  const email = getContactEmail();
  return (
    <SiteDocument
      eyebrow="CONTACT"
      title="Contact Us"
      lead="For legal and site mail, write us. For YouTube video ideas, use a channel page — that is the public board."
      jsonLd={getWebPageJsonLd({
        type: "ContactPage",
        href: "/contact",
        name: "Contact Us",
        description:
          "Email Ideas For Youtubers for legal, privacy, or site questions. Add YouTube video ideas on a channel page.",
      })}
    >
      <h2>Email</h2>
      <p>
        The mailbox for {SITE_NAME} is{" "}
        <a href={`mailto:${email}`}>{email}</a>. We read privacy questions,
        takedown requests, and problems with the site. We generally reply to
        those when we can identify the page and the request.
      </p>
      <p>
        <a
          className="btn-primary mt-2 inline-flex h-12 items-center justify-center px-5 text-[0.875rem] uppercase tracking-[0.08em] no-underline"
          href={`mailto:${email}?subject=${encodeURIComponent(`Message for ${SITE_NAME}`)}`}
        >
          Email {SITE_NAME}
        </a>
      </p>
      <h2>Video ideas stay on the roster</h2>
      <p>
        Do not email a list of YouTube video ideas and expect us to paste
        them onto a creator’s page. Open the <a href="/">homepage</a>, find
        the channel, and use the title and notes form there. That is how
        other visitors will see the idea.
      </p>
      <h2>What to include for legal or privacy mail</h2>
      <ul>
        <li>the page URL (channel slug or this contact page);</li>
        <li>the idea title and roughly when it appeared, if you want it down;</li>
        <li>whether you are the creator, a rightsholder, or a visitor;</li>
        <li>a way we can write back.</li>
      </ul>
      <h2>Other pages</h2>
      <p>
        Who we are and how the board works: <a href="/about">About us</a>.
        How data is handled: <a href="/privacy-policy">Privacy policy</a>.
        Rules for posting:{" "}
        <a href="/terms-and-conditions">Terms and conditions</a>.
      </p>
    </SiteDocument>
  );
}
