"use client";

import { ArrowLeft, ExternalLink, Plus, StickyNote, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Youtuber } from "@/lib/youtubers";
import { addIdea, loadIdeas, type VideoIdea } from "@/lib/ideas";

export function ChannelDesk({
  channel,
  initialIdeas,
}: {
  channel: Youtuber;
  initialIdeas: VideoIdea[];
}) {
  const [ideas, setIdeas] = useState<VideoIdea[]>(initialIdeas);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadIdeas(channel.id)
      .then((next) => {
        if (!cancelled) {
          setIdeas(next);
        }
      })
      .catch(() => {
        // Keep server-rendered ideas if a live refresh fails.
      });
    return () => {
      cancelled = true;
    };
  }, [channel.id]);

  useEffect(() => {
    if (!confirming) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setConfirming(false);
      }
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [confirming]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTitle = title.trim();
    if (!nextTitle) {
      setError("Add a title before adding the idea.");
      return;
    }
    setError("");
    setConfirming(true);
  }

  async function confirmIdea() {
    setSaving(true);
    try {
      const next = await addIdea(channel.id, {
        title: title.trim(),
        notes: notes.trim(),
      });
      setIdeas(next);
      setTitle("");
      setNotes("");
      setError("");
      setConfirming(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the idea.");
      setConfirming(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-6 sm:px-6">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-[0.875rem] font-medium uppercase tracking-[0.08em] text-gold no-underline transition-colors duration-200 ease-out hover:text-red"
      >
        <ArrowLeft size={16} strokeWidth={2.25} />
        Back to roster
      </Link>

      <section className="mt-5 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
        <div className="min-w-0 md:col-span-5">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.16em] text-gold sm:text-[0.75rem]">
            {channel.category}
          </p>
          <div className="mt-4 flex items-start gap-3 sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={channel.image}
              alt=""
              width={72}
              height={72}
              className="size-14 shrink-0 rounded-lg border-[4px] border-gold object-cover sm:size-[72px]"
            />
            <div className="min-w-0">
              <h1 className="break-words font-display text-[clamp(1.75rem,9vw,3.4rem)] leading-[0.92]">
                {channel.channel}
              </h1>
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] tracking-[0.1em] text-mute sm:text-[0.75rem] sm:tracking-[0.12em]">
                <span>{channel.subscribersLabel} SUBS</span>
                <span>{channel.viewsLabel} VIEWS</span>
                <span>{channel.videosLabel} VIDEOS</span>
              </p>
            </div>
          </div>
          <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 px-4 text-[0.875rem] font-medium uppercase tracking-[0.08em] no-underline sm:mt-4 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:shadow-none"
          >
            <ExternalLink size={16} strokeWidth={2.25} />
            Visit on YouTube
          </a>
          <p className="mt-6 max-w-[72ch] text-[0.95rem] text-mute sm:text-base">
            What should they make next? You decide.
          </p>
        </div>

        <form
          className="poster poster-gold torn p-5 sm:p-8 md:col-span-6 md:col-start-7"
          onSubmit={handleSubmit}
        >
          <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
            NEW IDEA
          </p>
          <h2 className="mt-2 text-[1.5rem] font-bold">Add a video idea</h2>

          <div className="mt-6">
            <label
              htmlFor="idea-title"
              className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]"
            >
              Title
            </label>
            <input
              id="idea-title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              className="mt-2 h-12 w-full rounded-lg border-[3px] border-ink bg-white px-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
              placeholder="Working title"
            />
            {error ? <p className="mt-2 text-[0.875rem] text-error">{error}</p> : null}
          </div>

          <div className="mt-5">
            <label
              htmlFor="idea-notes"
              className="block text-[0.875rem] font-medium uppercase tracking-[0.08em]"
            >
              Notes
            </label>
            <textarea
              id="idea-notes"
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-lg border-[3px] border-ink bg-white px-3 py-3 text-ink outline-none transition-[box-shadow] duration-200 ease-out focus:shadow-[0_0_0_2px_var(--gold),0_0_0_4px_var(--orange)]"
              placeholder="Angle, hook, or packaging note"
            />
          </div>

          <button
            type="submit"
            className="btn-primary mt-6 inline-flex h-12 w-full items-center justify-center gap-2 text-[0.875rem] uppercase tracking-[0.08em] transition-[background-color,box-shadow,transform] duration-200 ease-out"
          >
            <Plus size={16} strokeWidth={2.25} />
            Idea
          </button>
        </form>
      </section>

      <section className="mt-10">
        {ideas.length === 0 ? (
          <div className="poster poster-white p-5 sm:p-8">
            <StickyNote size={28} strokeWidth={2.25} />
            <h2 className="mt-4 text-[1.5rem] font-bold">No ideas yet</h2>
            <p className="mt-3 max-w-[72ch] text-[0.95rem]">
              Add a title and notes, then confirm it.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4">
            {ideas.map((idea) => (
              <li key={idea.id} className="poster poster-white p-5">
                <h2 className="text-[1.25rem] font-bold leading-tight normal-case tracking-normal">
                  {idea.title}
                </h2>
                {idea.notes ? (
                  <p className="mt-2 max-w-[72ch] text-[0.95rem]">{idea.notes}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {confirming ? (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-ink/80 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 sm:items-center sm:px-6 sm:pb-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setConfirming(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-idea-title"
            className="poster poster-white z-[300] mb-0 max-h-[min(88dvh,100%)] w-full max-w-lg overflow-y-auto p-5 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
                CONFIRM IDEA
              </p>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg border-[3px] border-ink transition-colors duration-200 ease-out hover:bg-ink hover:text-white"
                onClick={() => setConfirming(false)}
              >
                <X size={16} strokeWidth={2.25} />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <h2 id="confirm-idea-title" className="mt-3 text-[1.5rem] font-bold">
              Add this idea?
            </h2>
            <p className="mt-4 text-[1.15rem] font-bold uppercase leading-tight">
              {title.trim()}
            </p>
            {notes.trim() ? (
              <p className="mt-3 max-w-[72ch] text-[0.95rem]">{notes.trim()}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="btn-primary inline-flex h-12 flex-1 items-center justify-center px-5 text-[0.875rem] uppercase tracking-[0.08em] disabled:opacity-50"
                onClick={confirmIdea}
                disabled={saving}
              >
                {saving ? "Saving" : "Confirm"}
              </button>
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-lg border-[3px] border-ink px-5 text-[0.875rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ease-out hover:bg-ink hover:text-white"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
