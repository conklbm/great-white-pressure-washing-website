"use client";

import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * The ONLY way a phone number is rendered on this site. Reads from config
 * (tracking number) and fires a GA4 `phone_click` event with the placement.
 */
export function PhoneLink({
  location,
  className,
  children,
}: {
  /** where on the page this link lives, e.g. "header", "sticky-bar" */
  location: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={`tel:${siteConfig.phone.e164}`}
      className={className}
      onClick={() => trackEvent("phone_click", { location })}
    >
      {children ?? siteConfig.phone.display}
    </a>
  );
}
