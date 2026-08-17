export const FAQ_ITEMS = [
  {
    question: "What are some good YouTube video ideas?",
    answer:
      "Some good YouTube video ideas are specific to a channel: a challenge, a ranking, a recap, a collab, or a smaller version of a format that creator already uses. On Ideas For Youtubers, open a channel from the roster and add a title plus notes so the idea sits on that profile instead of a generic prompt list.",
  },
  {
    question: "What are good YouTube video ideas?",
    answer:
      "Good YouTube video ideas name one hook, one audience, and one creator. Filter the roster by Gaming or Entertainment, pick a channel, and write a working title. Notes help: packaging, the first ten seconds, or why they should film it now.",
  },
  {
    question: "What are some YouTube video ideas?",
    answer:
      "Some YouTube video ideas include before-and-afters, lists, myth-busts, rebuilds, year recaps, and series follow-ups. Browse Ideas For Youtubers, choose a real channel, and pin the idea on their page so other visitors can read it.",
  },
  {
    question: "How to come up with ideas for YouTube videos?",
    answer:
      "Start with a channel you already watch. Search them here, read the category and size, then write one title in their voice. Repeat. A stack of small, matching ideas is easier to film than one huge concept you never start. Ideas For Youtubers is built for that loop: pick a creator, add the idea, confirm.",
  },
] as const;

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
