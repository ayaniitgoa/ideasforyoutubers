"use client";

export function SiteMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.svg"
      alt=""
      width={32}
      height={32}
      className={className}
    />
  );
}
