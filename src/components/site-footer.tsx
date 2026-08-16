const footerLinks = [
  { href: "#method", label: "Method" },
  { href: "#scoring", label: "Scoring" },
  { href: "#packaging", label: "Packaging" },
  { href: "#access", label: "Access" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line/30">
      <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-8 px-6 py-12 md:grid-cols-12">
        <div className="col-span-4 md:col-span-5">
          <p className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
            YOUTUBER IDEAS
          </p>
          <p className="mt-4 max-w-[72ch] text-[0.875rem] text-mute">
            Research software for YouTube operators. Topics are scored, titles are
            inventoried, and packaging is decided before production starts.
          </p>
        </div>
        <nav className="col-span-4 md:col-span-4 md:col-start-8" aria-label="Footer">
          <ul className="flex flex-col gap-2 md:items-end">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.875rem] text-mute no-underline transition-colors duration-200 ease-out hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="col-span-4 font-mono text-[0.75rem] tracking-[0.08em] text-line md:col-span-12">
          © {new Date().getFullYear()} Youtuber Ideas
        </p>
      </div>
    </footer>
  );
}
