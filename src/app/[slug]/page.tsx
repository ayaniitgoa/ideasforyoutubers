import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChannelDesk } from "@/components/channel-desk";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getIdeas, getYoutuberBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

type ChannelPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ChannelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const channel = await getYoutuberBySlug(slug);
  if (!channel) {
    return { title: "Channel not found" };
  }
  return {
    title: `${channel.channel} — YouTube video ideas`,
    description: `Add YouTube video ideas, good YouTube ideas, and creative video ideas for ${channel.channel}.`,
    alternates: {
      canonical: `/${channel.slug}`,
    },
    openGraph: {
      title: `${channel.channel} — video ideas for YouTube`,
      description: `Suggest youtube video ideas for ${channel.channel}. What should they make next? You decide.`,
      type: "website",
    },
  };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { slug } = await params;
  const channel = await getYoutuberBySlug(slug);
  if (!channel) {
    notFound();
  }

  const initialIdeas = await getIdeas(channel.id);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ChannelDesk channel={channel} initialIdeas={initialIdeas} />
      </main>
      <SiteFooter />
    </>
  );
}
