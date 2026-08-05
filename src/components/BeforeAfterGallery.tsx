"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryPair } from "@/content/galleries";

const GAP = 16; // must match the `gap-4` below — the step math depends on it

/**
 * Before/after gallery — one pair at a time, stepped with the arrows.
 *
 * Still a CSS scroll-snap track underneath rather than a carousel library, so
 * touch users keep native momentum swipe and the whole thing degrades to a
 * plain scroller if JS never runs. The scrollbar is hidden and each card is
 * exactly the track's width, so nothing half-shows — the arrows and the
 * counter are the affordance instead of a peeking neighbor.
 *
 * Deliberately NOT a drag-to-reveal slider: that needs both frames shot from
 * the identical spot, and these are real job photos taken from wherever Dylan
 * was standing.
 */
export function BeforeAfterGallery({
  pairs,
  priority = false,
  tone = "light",
  heading = "Real jobs, before & after",
}: {
  pairs: GalleryPair[];
  /** true when this is the page's first image (its LCP) */
  priority?: boolean;
  /** "dark" for placement on the navy/blue hero */
  tone?: "light" | "dark";
  /** null drops the heading — use in tight columns where it would crowd the controls */
  heading?: string | null;
}) {
  const dark = tone === "dark";
  const t = {
    heading: dark ? "text-white" : "text-bedrock",
    counter: dark ? "text-white/70" : "text-loam",
    button: dark
      ? "border-white/30 text-white hover:bg-white/10"
      : "border-bedrock/20 text-bedrock hover:bg-limestone",
    caption: dark ? "text-white/80" : "text-loam",
    frame: dark ? "bg-white/10" : "bg-limestone",
  };
  const scroller = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const step = el.clientWidth + GAP;
    setIndex(step > 0 ? Math.round(el.scrollLeft / step) : 0);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const goTo = (n: number) => {
    const el = scroller.current;
    if (!el) return;
    const target = Math.max(0, Math.min(pairs.length - 1, n));
    // Honor reduced-motion the way globals.css does everywhere else.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: target * (el.clientWidth + GAP),
      behavior: reduced ? "auto" : "smooth",
    });
    setIndex(target); // optimistic, so the counter never lags the tap
  };

  if (pairs.length === 0) return null;
  const many = pairs.length > 1;

  return (
    // min-w-0 is load-bearing: as a flex/grid child this would otherwise size
    // to the min-content of a 13-card track and blow the column out to ~1000px.
    <section aria-label="Before and after photos" className="not-prose min-w-0">
      {/* On narrow screens the controls get their own row — squeezed beside
          the heading it wraps to three cramped lines. With no heading the row
          is just the controls, right-aligned. */}
      <div
        className={`mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 ${
          heading ? "sm:justify-between" : "sm:justify-end"
        }`}
      >
        {heading && (
          <h2 className={`font-display text-2xl font-bold uppercase tracking-wide ${t.heading}`}>
            {heading}
          </h2>
        )}
        {many && (
          <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
            {/* Only one pair is visible, so the count is the only cue that
                there are others. */}
            <span
              aria-live="polite"
              className={`font-display text-sm font-semibold tabular-nums ${t.counter}`}
            >
              {index + 1} / {pairs.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous before and after"
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border text-lg transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${t.button}`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === pairs.length - 1}
              aria-label="Next before and after"
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border text-lg transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${t.button}`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <ul
        ref={scroller}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pairs.map((p, i) => (
          <li key={p.base} className="w-full shrink-0 snap-start">
            <figure>
              <div className="grid grid-cols-2 gap-2">
                {(["before", "after"] as const).map((side) => (
                  <div
                    key={side}
                    className={`relative aspect-[3/4] overflow-hidden rounded-lg ${t.frame}`}
                  >
                    <Image
                      src={`/gallery/${p.base}-${side}.jpg`}
                      alt={side === "before" ? p.beforeAlt : p.afterAlt}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 46vw"
                      priority={priority && i === 0}
                      className="object-cover"
                    />
                    <span
                      className={`absolute left-0 top-0 px-2.5 py-1 font-display text-xs font-bold uppercase tracking-widest text-white ${
                        side === "before" ? "bg-bedrock/85" : "bg-spruce/90"
                      }`}
                    >
                      {side}
                    </span>
                  </div>
                ))}
              </div>
              <figcaption className={`mt-3 text-sm leading-snug ${t.caption}`}>
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
