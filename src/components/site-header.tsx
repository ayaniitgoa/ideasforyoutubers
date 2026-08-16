"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#method", label: "Method" },
  { href: "#scoring", label: "Scoring" },
  { href: "#packaging", label: "Packaging" },
  { href: "#access", label: "Access" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-line/30 bg-paper">
      <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-12 items-center px-6">
        <a
          href="#top"
          className="col-span-8 flex items-baseline gap-3 no-underline md:col-span-3"
        >
          <span className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-taupe">
            YI
          </span>
          <span className="text-[0.875rem] font-medium">Youtuber Ideas</span>
        </a>

        <nav className="hidden items-center justify-center gap-8 md:col-span-6 md:flex">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.875rem] text-mute no-underline transition-[color,box-shadow] duration-200 ease-out hover:text-ink ${
                index === 0
                  ? "font-medium text-ink shadow-[inset_0_-2px_0_0_var(--taupe)]"
                  : "font-normal"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="col-span-4 flex justify-end md:col-span-3">
          <a
            href="#access"
            className="btn-primary hidden h-9 items-center px-4 text-[0.875rem] font-semibold no-underline transition-[background-color,box-shadow,transform] duration-200 ease-out md:inline-flex"
          >
            Request access
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="z-[200] border-t border-line/30 bg-paper px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[1rem] font-medium no-underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
