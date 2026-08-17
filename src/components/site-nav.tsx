import { SITE_PAGES } from "@/lib/site-pages";

export function SiteNav({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav aria-label="Site pages" className={className}>
      {SITE_PAGES.map((page) => (
        <a key={page.href} href={page.href} className={linkClassName}>
          {page.label}
        </a>
      ))}
    </nav>
  );
}
