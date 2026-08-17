"use client";

import { SiteMark } from "@/components/site-mark";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[100] border-b-4 border-ink bg-gold pt-[env(safe-area-inset-top)] text-ink">
      <div className="mx-auto flex min-h-14 max-w-[1280px] flex-col gap-2 px-4 py-3 sm:min-h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 no-underline sm:gap-3"
        >
          <SiteMark className="size-8 shrink-0 rounded-lg border-[3px] border-ink sm:size-9" />
          <span className="min-w-0 text-[0.75rem] font-medium uppercase leading-tight tracking-[0.06em] sm:text-[0.875rem] sm:tracking-[0.08em]">
            Ideas For Youtubers
          </span>
        </a>
        <SiteNav
          className="flex flex-wrap gap-x-4 gap-y-1"
          linkClassName="text-[0.7rem] font-medium uppercase tracking-[0.06em] text-ink no-underline sm:text-[0.75rem]"
        />
      </div>
    </header>
  );
}
