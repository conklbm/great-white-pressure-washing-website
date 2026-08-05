"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryPair } from "@/content/galleries";

/**
 * Swipeable before/after gallery.
 *
 * Built on CSS scroll-snap rather than a carousel library: native momentum
 * swipe on touch, no dependency, and it still works if JS never runs — the
 * arrows are a desktop nicety layered on top, not the mechanism.
 *
 * Deliberately NOT a drag-to-reveal slider. That effect needs both shots
 * framed from the identical spot; these are real job photos taken from
 * wherever Dylan was standing, so a reveal would just look broken. Side by
 * side is honest about what the pair actually is.
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
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 16 : el.clientWidth * 0.9;
    // Honour reduced-motion the way globals.css does everywhere else —
    // an animated horizontal jump is exactly what those users opt out of.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
  };

  if (pairs.length === 0) return null;
  const many = pairs.length > 1;

  return (
    <section aria-label="Before and after photos" className="not-prose">
      <div className="mb-3 flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
          Real jobs, before &amp; after
        </h2>
        {many && (
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous photo"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bedrock/20 text-bedrock transition-colors hover:bg-limestone disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next photo"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bedrock/20 text-bedrock transition-colors hover:bg-limestone disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>

      <ul
        ref={scroller}
        // tabIndex makes the scroller keyboard-scrollable for anyone not using
        // the arrow buttons; -mx/px pairing lets cards bleed to the edge on
        // mobile so the next one peeks and the row reads as swipeable.
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0"
      >
        {pairs.map((p, i) => (
          <li
            key={p.base}
            className="w-[85%] shrink-0 snap-start sm:w-[420px] lg:w-[460px]"
          >
            <figure>
              <div className="grid grid-cols-2 gap-1.5">
                {(["before", "after"] as const).map((side) => (
                  <div
                    key={side}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-limestone"
                  >
                    <Image
                      src={`/gallery/${p.base}-${side}.jpg`}
                      alt={side === "before" ? p.beforeAlt : p.afterAlt}
                      fill
                      sizes="(min-width: 1024px) 230px, (min-width: 640px) 210px, 43vw"
                      priority={priority && i === 0}
                      className="object-cover"
                    />
                    <span
                      className={`absolute left-0 top-0 px-2 py-1 font-display text-[11px] font-bold uppercase tracking-widest text-white ${
                        side === "before" ? "bg-bedrock/85" : "bg-spruce/90"
                      }`}
                    >
                      {side}
                    </span>
                  </div>
                ))}
              </div>
              <figcaption className="mt-2.5 text-sm leading-snug text-loam">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {many && (
        <p className="mt-1 text-xs text-loam/70 sm:hidden">
          Swipe to see more →
        </p>
      )}
    </section>
  );
}
