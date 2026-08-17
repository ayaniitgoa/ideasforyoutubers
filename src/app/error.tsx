"use client";

import { RotateCcw } from "lucide-react";
import { StatusPage } from "@/components/status-page";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
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
  );
}
