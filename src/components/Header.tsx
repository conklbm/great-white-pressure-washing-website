"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { PhoneLink } from "./PhoneLink";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/#service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Dylan's actual mascot, cropped out of his logo lockup with the flat
 * background removed. Used at small sizes in the header/footer, paired with
 * the live-text wordmark below (the lockup's own baked-in "PRESSURE WASHING"
 * is navy, so it vanishes on dark backgrounds — hence live text instead).
 */
export function LogoMark({
  className = "",
  priority = false,
  sizes = "72px",
}: {
  className?: string;
  priority?: boolean;
  /** Match the rendered width, or Next serves too small a source and it blurs. */
  sizes?: string;
}) {
  return (
    <Image
      src="/logo-mascot.png"
      alt=""
      aria-hidden="true"
      width={815}
      height={560}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

/** Stacked wordmark in the brand's own display face. */
export function Wordmark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className={`font-brand whitespace-nowrap text-xl uppercase leading-none sm:text-2xl ${light ? "text-white" : "text-bedrock"}`}
      >
        Great White
      </span>
      <span
        className={`font-display whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.24em] ${light ? "text-spray" : "text-spruce"}`}
      >
        Pressure Washing
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-bedrock/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} — home`}>
          <LogoMark priority className="h-9 w-auto sm:h-11" />
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-loam transition-colors hover:text-spruce"
            >
              {item.label}
            </Link>
          ))}
          <PhoneLink
            location="header"
            className="rounded-md bg-signal px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-bedrock transition-colors hover:bg-signal/85"
          >
            Call {siteConfig.phone.display}
          </PhoneLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <PhoneLink
            location="header-mobile"
            className="rounded-md bg-signal px-3 py-2.5 font-display text-sm font-bold uppercase text-bedrock"
          >
            Call now
          </PhoneLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-bedrock/15 text-bedrock"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-bedrock/10 bg-white md:hidden">
          <ul className="px-4 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-bedrock"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
