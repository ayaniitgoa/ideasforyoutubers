import type { Metadata } from "next";
import { SiteDocument } from "@/components/site-document";
import { sitePageMetadata } from "@/lib/page-metadata";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import { getContactEmail, getWebPageJsonLd } from "@/lib/site-pages";

export const metadata: Metadata = sitePageMetadata("/terms-and-conditions");

export default function TermsAndConditionsPage() {
  const email = getContactEmail();

  return (
    <SiteDocument
      eyebrow="TERMS"
      title="Terms and Conditions"
      lead="These terms govern use of Ideas For Youtubers. Last updated 17 August 2026. If you do not agree, do not post ideas or keep browsing."
      jsonLd={getWebPageJsonLd({
        type: "WebPage",
        href: "/terms-and-conditions",
        name: "Terms and Conditions",
        description:
          "Rules for using Ideas For Youtubers, posting YouTube video ideas, and how the site relates to YouTube and listed creators.",
      })}
    >
      <h2>The service</h2>
      <p>
        {SITE_NAME} lets you browse a roster of YouTube channels and submit
        video ideas (a title and optional notes) that display on that
        channel’s page. The point of the board is {SITE_TAGLINE} Ideas are
        suggestions from visitors. We do not promise any creator will see,
        like, or film them.
      </p>
      <h2>Not YouTube, not the creator</h2>
      <p>
        We are not affiliated with YouTube, Google, or the people and brands
        on the roster. Names, counts, images, and outbound links describe
        public channels so you can find them. Trademarks belong to their
        owners. Listing a channel does not mean that creator endorses this
        site or any idea on it.
      </p>
      <h2>Your responsibilities</h2>
      <p>When you use {SITE_NAME} you agree to:</p>
      <ul>
        <li>
          post ideas that fit the channel and could reasonably be filmed as a
          video, without pretending to be that creator or this site;
        </li>
        <li>
          avoid illegal content, spam, scams, malware links, and harassment;
        </li>
        <li>
          leave out other people’s private information, and your own if you
          do not want it on a public page;
        </li>
        <li>
          respect copyright: do not paste scripts, lyrics, or other work you
          do not have the right to share;
        </li>
        <li>
          skip sexual content involving minors, and anything that asks a
          creator to harm someone.
        </li>
      </ul>
      <p>
        We may remove ideas, block traffic, or refuse the form when we think
        these rules were broken. We do not have to notify you first.
      </p>
      <h2>License you give us</h2>
      <p>
        You keep whatever rights you have in an idea you write. By submitting
        it you grant {SITE_NAME} a worldwide, royalty-free license to store,
        display, and adapt that text on this website so other visitors can
        read it. That license lasts while the idea remains on the site and
        for backups we need to run it.
      </p>
      <h2>No guarantee</h2>
      <p>
        The roster, counts, and images can be stale or wrong. Hosting can
        fail. Ideas can be copied, ignored, or deleted. The site is provided
        “as is.” To the fullest extent the law allows, we are not liable for
        lost profits, lost data, or indirect damages from using or not being
        able to use {SITE_NAME}.
      </p>
      <h2>Intellectual property in the site itself</h2>
      <p>
        The {SITE_NAME} name, layout, and original copy on these legal pages
        and the homepage belong to us or our licensors. You may not scrape
        the roster to build a competing database in a way that overloads the
        service, and you may not present this site as an official YouTube
        product.
      </p>
      <h2>Takedown</h2>
      <p>
        If you are a creator, rightsholder, or someone named in an idea and
        you want text removed, email{" "}
        <a href={`mailto:${email}`}>{email}</a> from{" "}
        <a href="/contact">Contact us</a> with the channel page, the idea
        title, and why it should come down. We will look at the request. For
        privacy detail see the{" "}
        <a href="/privacy-policy">Privacy policy</a>.
      </p>
      <h2>Changes to these terms</h2>
      <p>
        We may update this page. The date at the top is the current version.
        Continued use after a change means you accept the new terms.
      </p>
      <h2>Contact</h2>
      <p>
        Legal notices about these terms go to{" "}
        <a href={`mailto:${email}`}>{email}</a>. For the product itself,
        start on the <a href="/">homepage roster</a> or read{" "}
        <a href="/about">About us</a>.
      </p>
    </SiteDocument>
  );
}
