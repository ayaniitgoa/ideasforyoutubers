import type { Metadata } from "next";
import { SiteDocument } from "@/components/site-document";
import { sitePageMetadata } from "@/lib/page-metadata";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";
import { getWebPageJsonLd } from "@/lib/site-pages";

export const metadata: Metadata = sitePageMetadata("/about");

const page = {
  href: "/about",
  title: "About Us",
  description:
    "Ideas For Youtubers is a public board where visitors add YouTube video ideas for real channels. What should they make next? You decide.",
} as const;

export default function AboutPage() {
  return (
    <SiteDocument
      eyebrow="ABOUT US"
      title="About Us"
      lead="Ideas For Youtubers is a public wall of channels. Anyone can walk up, pick a creator, and stick a video idea on their page."
      jsonLd={getWebPageJsonLd({
        type: "AboutPage",
        href: page.href,
        name: page.title,
        description: page.description,
      })}
    >
      <h2>What this site is</h2>
      <p>
        {SITE_NAME} is a roster of YouTube channels and a place to leave video
        ideas for them. You search a name, filter by Gaming or Entertainment,
        open a channel, write a title, and add notes if you want. The line we
        work from is simple: {SITE_TAGLINE}
      </p>
      <p>
        This is not a random prompt generator. Good YouTube video ideas land
        better when they belong to a specific creator — their format, their
        audience, their size. That is why each idea sits on a channel page
        instead of a generic dump of “10 videos you could film.”
      </p>
      <h2>How it works</h2>
      <p>
        The homepage lists channels with subscriber, view, and video counts.
        You can search, set a subscriber floor, and sort. Open a channel to
        see the public idea list and the add form. Confirm the idea and it
        stays with that profile for the next visitor to read.
      </p>
      <p>
        There are no accounts, votes, or private drafts. If you can load the
        page, you can read the board and add a title. Treat that as part of
        the design, not a missing feature: the wall is public on purpose.
      </p>
      <h2>Who we are independent from</h2>
      <p>
        {SITE_NAME} is not YouTube, Google, or any listed creator. Channel
        names, subscriber figures, and profile images come from public
        YouTube data we keep on the roster so you can find people you already
        watch. Ideas posted here are suggestions from visitors. Creators do
        not have to film them, and we do not speak for those channels.
      </p>
      <h2>Why we built it</h2>
      <p>
        Coming up with ideas for YouTube videos is easier when you start from
        a channel you already open every week. Write one hook. Write why it
        fits. Repeat. A stack of small, matching titles is easier to film
        than one huge concept that never starts. This site is that loop:
        pick a creator, add the idea, confirm.
      </p>
      <p>
        If you want the rules, the data practices, or a mailbox, those live
        on their own pages:{" "}
        <a href="/terms-and-conditions">Terms and conditions</a>,{" "}
        <a href="/privacy-policy">Privacy policy</a>, and{" "}
        <a href="/contact">Contact us</a>. To leave a video idea, go back to
        the <a href="/">roster</a>.
      </p>
    </SiteDocument>
  );
}
