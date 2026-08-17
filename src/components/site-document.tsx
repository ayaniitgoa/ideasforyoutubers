import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_NAME } from "@/lib/seo";

export function SiteDocument({
  eyebrow,
  title,
  lead,
  jsonLd,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  jsonLd: unknown;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[0.75rem] tracking-[0.08em] text-mute"
          >
            <ol className="flex flex-wrap gap-2">
              <li>
                <a href="/" className="text-gold">
                  {SITE_NAME}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{title}</li>
            </ol>
          </nav>
          <div className="poster poster-white torn mt-6 max-w-[72ch] p-5 sm:p-8">
            <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,8vw,3.4rem)] leading-[0.92]">
              {title}
            </h1>
            <p className="mt-4 max-w-[72ch] text-[1.05rem]">{lead}</p>
            <div className="legal-copy mt-8">{children}</div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
