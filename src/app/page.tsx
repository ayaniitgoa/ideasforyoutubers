import { ArrowRight, ArrowUpRight, LayoutGrid, Search, Square } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SwissPanel } from "@/components/swiss-panel";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Method />
        <Feature
          id="scoring"
          index="01"
          label="Demand"
          title="Score the topic before the script exists."
          body="Each idea is ranked by search interest, recency, and how many similar titles already occupy the results. The queue sorts itself. You decide what is worth a week of production."
          variant="bars"
          reverse={false}
        />
        <Feature
          id="inventory"
          index="02"
          label="Title map"
          title="See the angles that are already taken."
          body="A query is not one video. It is a field of titles. Youtuber Ideas lists what is live today so you can write toward a gap instead of repeating a pattern that already ranks."
          variant="inventory"
          reverse
        />
        <Feature
          id="packaging"
          index="03"
          label="Packaging"
          title="Hold title and thumbnail variants next to the brief."
          body="Packaging is cheaper to change than footage. Keep four title lines and two frame notes beside the research so the idea is locked before anyone books a shoot."
          variant="frames"
          reverse={false}
        />
        <Access />
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="border-b border-line/30">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-[var(--section-gap)] md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className="enter font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
            RESEARCH SOFTWARE
          </p>
          <h1 className="enter enter-1 mt-5 max-w-[18ch] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight">
            Rank the topic. Then film.
          </h1>
          <p className="enter enter-2 mt-6 max-w-[72ch] text-mute">
            Youtuber Ideas is a research desk for channel operators and agencies.
            Search demand, title saturation, and packaging notes sit in one grid
            so publishing follows a spec, not a hunch.
          </p>
          <div className="enter enter-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#access"
              className="btn-primary inline-flex h-12 items-center justify-center gap-2 px-5 text-[0.875rem] font-semibold no-underline transition-[background-color,box-shadow,transform] duration-200 ease-out"
            >
              Request access
              <ArrowRight size={16} strokeWidth={1.75} />
            </a>
            <a
              href="#method"
              className="btn-ghost inline-flex h-12 items-center justify-center px-5 text-[0.875rem] font-semibold no-underline transition-[background-color,border-color] duration-200 ease-out"
            >
              Read the method
            </a>
          </div>
        </div>
        <div className="enter enter-4 md:col-span-6">
          <SwissPanel variant="hero" />
        </div>
      </div>
    </section>
  );
}

function Method() {
  const steps = [
    {
      n: "01",
      icon: Search,
      title: "Collect queries",
      body: "Operators paste seeds from comments, sales calls, and existing videos. The desk expands them into a topic list.",
    },
    {
      n: "02",
      icon: LayoutGrid,
      title: "Score demand",
      body: "Interest, recency, and crowding become a single index. Weak topics drop. Strong ones stay in the weekly queue.",
    },
    {
      n: "03",
      icon: Square,
      title: "Map titles",
      body: "Existing results are inventoried by angle. You write toward an open slot rather than a crowded one.",
    },
    {
      n: "04",
      icon: ArrowUpRight,
      title: "Lock packaging",
      body: "Title and thumbnail notes sit with the brief. The idea is decided while it is still cheap to revise.",
    },
  ];

  return (
    <section id="method" className="scroll-mt-16 border-b border-line/30">
      <div className="mx-auto max-w-[1280px] px-6 py-[var(--section-gap)]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <header className="md:col-span-4">
            <p className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
              METHOD
            </p>
            <h2 className="mt-3 text-[1.5rem] font-bold tracking-tight">
              Four steps. One weekly queue.
            </h2>
          </header>
          <p className="max-w-[72ch] text-mute md:col-span-7 md:col-start-6">
            The work is structured like a production spec. Ideas move from a
            query list to a scored queue, then to a title inventory, then to a
            packaging lock. Nothing advances without a reason on the grid.
          </p>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-px bg-line/30 md:grid-cols-12">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className={`bg-paper p-8 ${
                index === 0
                  ? "md:col-span-7"
                  : index === 1
                    ? "md:col-span-5"
                    : index === 2
                      ? "md:col-span-5"
                      : "md:col-span-7"
              }`}
            >
              <step.icon size={20} strokeWidth={1.75} className="text-taupe" />
              <p className="mt-6 font-mono text-[0.75rem] tracking-[0.12em] text-line">
                {step.n}
              </p>
              <h3 className="mt-2 text-[1.25rem] font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[72ch] text-mute">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Feature({
  id,
  index,
  label,
  title,
  body,
  variant,
  reverse,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  variant: "bars" | "inventory" | "frames";
  reverse: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-line/30">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-[var(--section-gap)] md:grid-cols-12 md:gap-10">
        <div className={reverse ? "md:col-span-6 md:order-2" : "md:col-span-6"}>
          <p className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
            {index} / {label.toUpperCase()}
          </p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.15] tracking-tight">
            {title}
          </h2>
          <p className="mt-5 max-w-[72ch] text-mute">{body}</p>
        </div>
        <div className={reverse ? "md:col-span-6 md:order-1" : "md:col-span-6"}>
          <SwissPanel variant={variant} />
        </div>
      </div>
    </section>
  );
}

function Access() {
  return (
    <section id="access" className="scroll-mt-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-[var(--section-gap)] md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
            ACCESS
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight">
            Built for teams that plan on a calendar.
          </h2>
          <p className="mt-5 max-w-[72ch] text-mute">
            Request a desk for a channel or an agency roster. We review volume,
            posting cadence, and whether research is already someone&apos;s job.
            If it is a fit, you get a queue, not a trial banner.
          </p>
        </div>

        <form
          className="border border-line/40 bg-card p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:col-span-6 md:col-start-7"
          action="#access"
        >
          <div>
            <label htmlFor="work-email" className="block text-[0.875rem] font-medium">
              Work email
            </label>
            <input
              id="work-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 h-12 w-full border border-line bg-paper px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--paper),0_0_0_4px_var(--taupe)]"
              placeholder="ops@studio.example"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="channel-scale" className="block text-[0.875rem] font-medium">
              Monthly publish volume
            </label>
            <select
              id="channel-scale"
              name="volume"
              className="mt-2 h-12 w-full border border-line bg-paper px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--paper),0_0_0_4px_var(--taupe)]"
              defaultValue="8-20"
            >
              <option value="1-7">1–7 videos</option>
              <option value="8-20">8–20 videos</option>
              <option value="21+">21 or more</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn-primary mt-8 inline-flex h-12 w-full items-center justify-center gap-2 text-[0.875rem] font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-out"
          >
            Submit request
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>
          <p className="mt-4 font-mono text-[0.75rem] tracking-[0.06em] text-line">
            No automated sequence. A person replies.
          </p>
        </form>
      </div>
    </section>
  );
}
