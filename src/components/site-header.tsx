"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SiteMark } from "@/components/site-mark";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b-4 border-ink bg-gold pt-[env(safe-area-inset-top)] text-ink">
      <div className="mx-auto flex min-h-14 max-w-[1280px] items-center justify-between gap-3 px-4 py-2 sm:min-h-16 sm:px-6">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 no-underline sm:gap-3"
        >
          <SiteMark className="size-8 shrink-0 rounded-lg border-[3px] border-ink sm:size-9" />
          <span className="min-w-0 truncate text-[0.75rem] font-medium uppercase leading-tight tracking-[0.06em] sm:text-[0.875rem] sm:tracking-[0.08em]">
            Ideas For Youtubers
          </span>
        </a>
        <SiteNav
          className="hidden min-w-0 items-center justify-end gap-x-4 lg:flex"
          linkClassName="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-ink no-underline"
        />
        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border-[3px] border-ink bg-white lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={20} strokeWidth={2.25} />
          ) : (
            <Menu size={20} strokeWidth={2.25} />
          )}
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {menuOpen ? (
        <div
          id="site-menu"
          className="border-t-4 border-ink bg-gold px-4 pb-3 sm:px-6 lg:hidden"
        >
          <SiteNav
            className="flex flex-col"
            linkClassName="flex min-h-12 items-center border-b-[3px] border-ink/20 text-[0.875rem] font-medium uppercase tracking-[0.08em] text-ink no-underline last:border-b-0"
          />
        </div>
      ) : null}
    </header>
  );
}
