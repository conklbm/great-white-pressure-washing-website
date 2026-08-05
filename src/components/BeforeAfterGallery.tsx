"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryPair } from "@/content/galleries";

const GAP = 16; // must match the `gap-4` below — the step maths depends on it

/**
 * Before/after gallery — one pair at a time, stepped with the arrows.
 *
 * Still a CSS scroll-snap track underneath rather than a carousel library, so
 * touch users keep native momentum swipe and the whole thing degrades to a
 * plain scroller if JS never runs. The scrollbar is hidden and each card is
 * exactly the track's width, so nothing half-shows — the arrows and the
 * counter are the affordance instead of a peeking neighbour.
 *
 * Deliberately NOT a drag-to-reveal slider: that needs both frames shot from
 * the identical spot, and these are real job photos taken from wherever Dylan
 * was standing.
 */
export function BeforeAfterGallery({
  pairs,
  priority = false,
}: {
  pairs: GalleryPair[];
  /** true when this is the page's first image (its LCP) */
  priority?: boolean;
}) {
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
    // Honour reduced-motion the way globals.css does everywhere else.
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
    <section aria-label="Before and after photos" className="not-prose">
      {/* On narrow screens the controls get their own row — squeezed beside
          the heading it wraps to three cramped lines. */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
          Real jobs, before &amp; after
        </h2>
        {many && (
          <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
            {/* Only one pair is visible, so the count is the only cue that
                there are others. */}
            <span
              aria-live="polite"
              className="font-display text-sm font-semibold tabular-nums text-loam"
            >
              {index + 1} / {pairs.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous before and after"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-bedrock/20 text-lg text-bedrock transition-colors hover:bg-limestone disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === pairs.length - 1}
              aria-label="Next before and after"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-bedrock/20 text-lg text-bedrock transition-colors hover:bg-limestone disabled:cursor-not-allowed disabled:opacity-35"
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
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-limestone"
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
              <figcaption className="mt-3 text-sm leading-snug text-loam">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
