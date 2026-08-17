"use client";

import { Anton, JetBrains_Mono, Oswald } from "next/font/google";
import { RotateCcw } from "lucide-react";
import { StatusPage } from "@/components/status-page";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${anton.variable} ${jetbrainsMono.variable} h-full overflow-x-clip`}
    >
      <body className="flex min-h-[100dvh] flex-col overflow-x-clip bg-[#1a1a1a] font-sans text-[#fffef8]">
        <StatusPage
          code="500"
          title="The paste didn't stick"
          body="Something broke while loading. Try again, or go back to the roster."
          variant="red"
        >
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-[3px] border-ink bg-white px-5 text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 ease-out hover:bg-ink hover:text-white"
            onClick={() => reset()}
          >
            <RotateCcw size={16} strokeWidth={2.25} />
            Try again
          </button>
        </StatusPage>
      </body>
    </html>
  );
}
