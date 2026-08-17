import { SITE_PAGES } from "@/lib/site-pages";

export function SitePages() {
  return (
    <section
      className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6"
      aria-labelledby="site-pages-heading"
    >
      <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em] text-gold">
        SITE PAGES
      </p>
      <h2 id="site-pages-heading" className="mt-3 text-[1.5rem] font-bold">
        About, privacy, terms, contact
      </h2>
      <p className="mt-3 max-w-[72ch] text-[0.95rem] text-mute">
        Each of these is its own page. Open one if you want the story of this
        board, how we handle data, the rules, or a way to reach us.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {SITE_PAGES.map((page) => (
          <a
            key={page.href}
            href={page.href}
            className="poster poster-white torn block p-5 no-underline transition-[box-shadow,transform] duration-200 ease-out hover:translate-y-[-2px] sm:p-6"
          >
            <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
              PAGE
            </p>
            <h3 className="mt-3 text-[1.25rem] font-bold">{page.title}</h3>
            <p className="mt-3 max-w-[72ch] text-[0.95rem]">{page.description}</p>
            <p className="mt-4 text-[0.875rem] font-semibold uppercase tracking-[0.08em]">
              Open {page.label}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
