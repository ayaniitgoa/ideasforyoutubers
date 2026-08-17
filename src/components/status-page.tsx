"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function StatusPage({
  code,
  title,
  body,
  variant,
  children,
}: {
  code: string;
  title: string;
  body: string;
  variant: "white" | "red";
  children?: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16">
          <div
            className={`poster torn max-w-xl p-5 sm:p-8 ${
              variant === "red" ? "poster-red" : "poster-white"
            }`}
          >
            <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
              {code}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,8vw,3.4rem)] leading-[0.92]">
              {title}
            </h1>
            <p className="mt-4 max-w-[72ch] text-[0.95rem] sm:text-base">{body}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {children}
              <Link
                href="/"
                className="btn-primary inline-flex h-12 items-center justify-center gap-2 px-5 text-[0.875rem] uppercase tracking-[0.08em] no-underline"
              >
                <ArrowLeft size={16} strokeWidth={2.25} />
                Back to roster
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
