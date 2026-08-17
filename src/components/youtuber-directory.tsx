"use client";

import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Youtuber, YoutuberFilters } from "@/lib/youtubers";
import { defaultFilters, filterYoutubers } from "@/lib/youtubers";

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 250;

const subscriberFloors = [
  { value: 0, label: "Any size" },
  { value: 20_000_000, label: "20M+" },
  { value: 30_000_000, label: "30M+" },
  { value: 40_000_000, label: "40M+" },
];

export function YoutuberDirectory({ channels }: { channels: Youtuber[] }) {
  const [query, setQuery] = useState(defaultFilters.query);
  const [filters, setFilters] = useState<YoutuberFilters>(defaultFilters);
  const [page, setPage] = useState(1);
  const listTop = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilters((current) =>
        current.query === query ? current : { ...current, query },
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.category, filters.minSubscribers, filters.sort]);

  const results = useMemo(
    () => filterYoutubers(channels, filters),
    [channels, filters],
  );
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const pages = pageWindow(currentPage, pageCount);

  const isFiltered =
    query.trim() !== "" ||
    filters.category !== "All" ||
    filters.minSubscribers !== 0 ||
    filters.sort !== "subscribers";

  function goToPage(next: number) {
    const clamped = Math.min(pageCount, Math.max(1, next));
    setPage(clamped);
    listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function update<Key extends keyof Omit<YoutuberFilters, "query">>(
    key: Key,
    value: YoutuberFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setQuery(defaultFilters.query);
    setFilters(defaultFilters);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <header className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.16em] text-gold sm:text-[0.75rem]">
            THE ROSTER
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,10vw,4rem)] leading-[0.92]">
            Ideas For Youtubers
          </h1>
        </div>
        <p className="max-w-[72ch] pt-1 font-display text-[clamp(1.5rem,7vw,2.5rem)] uppercase leading-[0.92] text-gold md:col-span-5 md:pt-12">
          You decide.
        </p>
      </header>

      <form
        className="poster poster-gold torn mt-8 grid grid-cols-1 gap-5 p-5 sm:mt-10 sm:p-6 md:grid-cols-12"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="md:col-span-5">
          <label htmlFor="channel-query" className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]">
            Channel
          </label>
          <input
            id="channel-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a name"
            className="mt-2 h-12 w-full rounded-lg border-[3px] border-ink bg-white px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="channel-category" className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]">
            Category
          </label>
          <select
            id="channel-category"
            value={filters.category}
            onChange={(event) =>
              update("category", event.target.value as YoutuberFilters["category"])
            }
            className="mt-2 h-12 w-full rounded-lg border-[3px] border-ink bg-white px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
          >
            <option value="All">All</option>
            <option value="Gaming">Gaming</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="min-subs" className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]">
            Subs
          </label>
          <select
            id="min-subs"
            value={filters.minSubscribers}
            onChange={(event) => update("minSubscribers", Number(event.target.value))}
            className="mt-2 h-12 w-full rounded-lg border-[3px] border-ink bg-white px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
          >
            {subscriberFloors.map((floor) => (
              <option key={floor.value} value={floor.value}>
                {floor.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="sort-key" className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]">
            Sort
          </label>
          <select
            id="sort-key"
            value={filters.sort}
            onChange={(event) => update("sort", event.target.value as YoutuberFilters["sort"])}
            className="mt-2 h-12 w-full rounded-lg border-[3px] border-ink bg-white px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
          >
            <option value="subscribers">Subscribers</option>
            <option value="views">Views</option>
            <option value="videos">Videos</option>
            <option value="channel">Name</option>
          </select>
        </div>
      </form>

      <p
        ref={listTop}
        className="mt-6 scroll-mt-24 font-mono text-[0.75rem] tracking-[0.12em] text-gold"
      >
        {results.length} MATCH{results.length === 1 ? "" : "ES"}
        {results.length > 0
          ? ` · PAGE ${String(currentPage).padStart(2, "0")} / ${String(pageCount).padStart(2, "0")}`
          : ""}
      </p>

      {results.length === 0 ? (
        <div className="poster poster-white torn mt-6 max-w-xl p-5 sm:p-8">
          <Search size={28} strokeWidth={2.25} />
          <h2 className="mt-4 text-[1.5rem] font-bold">No channel in this cut</h2>
          <p className="mt-3 max-w-[72ch] text-[0.95rem]">
            Nothing in the roster matches that name, category, and subscriber
            floor. Widen the search or return to the full desk.
          </p>
          <button
            type="button"
            className="btn-primary mt-6 inline-flex h-12 w-full items-center justify-center gap-2 px-5 text-[0.875rem] uppercase tracking-[0.08em] sm:w-auto"
            onClick={resetFilters}
          >
            <RotateCcw size={16} strokeWidth={2.25} />
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {pageItems.map((channel) => (
            <li
              key={channel.id}
              className={`poster p-3 sm:p-4 ${
                channel.category === "Gaming" ? "poster-gold" : "poster-white"
              }`}
            >
              <Link
                href={`/${channel.slug}`}
                className="grid min-h-14 grid-cols-[48px_1fr_auto] items-center gap-3 text-ink no-underline sm:grid-cols-[56px_1fr_auto] sm:gap-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={channel.image}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 shrink-0 rounded-lg border-[3px] border-ink object-cover sm:size-14"
                />
                <div className="min-w-0">
                  <p className="truncate text-[0.98rem] font-bold uppercase leading-tight sm:text-[1.05rem]">
                    {channel.channel}
                  </p>
                  <p className="mt-1 truncate font-mono text-[0.65rem] tracking-[0.1em] sm:text-[0.7rem] sm:tracking-[0.12em]">
                    {channel.category} · {channel.subscribersLabel} SUBS
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  strokeWidth={2.25}
                  className="shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {results.length > 0 && pageCount > 1 ? (
        <nav
          className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:flex sm:flex-wrap"
          aria-label="Roster pages"
        >
          <button
            type="button"
            className="btn-ghost inline-flex h-12 min-h-12 items-center justify-center gap-1 px-3 text-[0.875rem] uppercase tracking-[0.08em] disabled:opacity-40 sm:h-11 sm:px-4"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} strokeWidth={2.25} />
            Prev
          </button>
          <p className="px-2 text-center font-mono text-[0.7rem] tracking-[0.12em] text-gold sm:hidden">
            {String(currentPage).padStart(2, "0")} /{" "}
            {String(pageCount).padStart(2, "0")}
          </p>
          <div className="hidden sm:contents">
            {pages.map((entry, index) =>
              entry === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 font-mono text-gold"
                >
                  …
                </span>
              ) : (
                <button
                  key={entry}
                  type="button"
                  aria-current={entry === currentPage ? "page" : undefined}
                  className={`inline-flex size-11 items-center justify-center rounded-lg border-[3px] text-[0.875rem] font-semibold uppercase tracking-[0.08em] transition-[background-color,box-shadow,transform] duration-200 ease-out ${
                    entry === currentPage
                      ? "border-ink bg-gold text-ink shadow-[4px_4px_0_#0d0d0d]"
                      : "border-gold bg-transparent text-gold hover:bg-[rgb(255_215_0_/_0.12)]"
                  }`}
                  onClick={() => goToPage(entry)}
                >
                  {entry}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            className="btn-ghost inline-flex h-12 min-h-12 items-center justify-center gap-1 px-3 text-[0.875rem] uppercase tracking-[0.08em] disabled:opacity-40 sm:h-11 sm:px-4"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
            <ChevronRight size={16} strokeWidth={2.25} />
          </button>
        </nav>
      ) : null}

      {isFiltered && results.length > 0 ? (
        <button
          type="button"
          className="btn-ghost mt-8 inline-flex h-12 w-full items-center justify-center gap-2 px-5 text-[0.875rem] uppercase tracking-[0.08em] sm:w-auto"
          onClick={resetFilters}
        >
          <RotateCcw size={16} strokeWidth={2.25} />
          Clear filters
        </button>
      ) : null}
    </div>
  );
}

function pageWindow(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const entries: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) {
    entries.push("ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    entries.push(page);
  }

  if (end < total - 1) {
    entries.push("ellipsis");
  }

  entries.push(total);
  return entries;
}
