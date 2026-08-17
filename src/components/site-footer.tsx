"use client";

import { SiteMark } from "@/components/site-mark";
import { SiteNav } from "@/components/site-nav";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-gold pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3">
          <SiteMark className="size-8 shrink-0 rounded-lg border-[3px] border-gold" />
          <p className="font-display text-[1.15rem] uppercase leading-none tracking-tight text-gold">
            Ideas For Youtubers
          </p>
        </div>
        <p className="mt-3 max-w-[72ch] text-[0.875rem] text-mute">
          What should they make next? You decide.
        </p>
        <SiteNav
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
          linkClassName="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-gold"
        />
        <p className="mt-4 font-mono text-[0.75rem] tracking-[0.08em] text-mute">
          © {new Date().getFullYear()} Ideas For Youtubers
        </p>
      </div>
    </footer>
  );
}
