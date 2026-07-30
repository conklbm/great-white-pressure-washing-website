import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

/**
 * Standard per-page metadata: unique title/description, self-referencing
 * canonical, OpenGraph + Twitter cards with absolute URLs.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string; // canonical path, e.g. "/services/house-soft-washing"
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    ...(opts.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
