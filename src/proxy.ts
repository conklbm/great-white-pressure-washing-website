import { NextResponse, type NextRequest } from "next/server";

import { siteConfig } from "@/config/site";

/**
 * Keep throwaway platform hosts out of the search index.
 *
 * WHY THIS EXISTS: Vercel auto-noindexes per-deployment URLs
 * (…-6y75vuwas.vercel.app) but NOT the production alias
 * (…-websit.vercel.app). Left alone that alias is crawled as a complete
 * second copy of the site.
 *
 * ── FAIL OPEN, ON PURPOSE ──────────────────────────────────────────────────
 * This only ever noindexes hosts on a KNOWN throwaway list. A real custom
 * domain is never noindexed — not even if `siteConfig.url` is wrong, stale,
 * empty, or the domain later changes.
 *
 * The obvious implementation is the opposite ("noindex anything that isn't
 * the canonical host"), and it's a trap: one typo in `siteConfig.url` and the
 * LIVE site goes invisible, silently, with no error anywhere. Deindexing a
 * real site costs weeks of recovery; missing a duplicate on some unexpected
 * host costs almost nothing. So the failure mode points the safe way.
 *
 * Consequence to know: a host that is neither the canonical domain nor a
 * known platform domain (say a custom staging subdomain) stays indexable.
 * Add its suffix below if you ever stand one up.
 *
 * Uses X-Robots-Tag rather than a robots.txt disallow because a disallow
 * stops crawling without reliably stopping indexing — and a blocked crawler
 * never sees a noindex directive anyway.
 */

/** Hosts that are always disposable — never a real site. */
const THROWAWAY_SUFFIXES = [
  ".vercel.app",
  ".netlify.app",
  ".pages.dev",
  ".onrender.com",
  ".fly.dev",
  ".up.railway.app",
];

const canonicalHost = new URL(siteConfig.url).host
  .toLowerCase()
  .replace(/^www\./, "");

function isThrowawayHost(host: string): boolean {
  if (!host) return false; // unknown → treat as real, stay indexable
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true; // raw IP
  return THROWAWAY_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const isCanonical = host.replace(/^www\./, "") === canonicalHost;

  const response = NextResponse.next();
  // Both conditions required: never the real domain, and positively known
  // to be disposable.
  if (!isCanonical && isThrowawayHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Everything except Next's own static output — pages, sitemap.xml,
  // robots.txt, and llms.txt all need the header when off-domain.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
