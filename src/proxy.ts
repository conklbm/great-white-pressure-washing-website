import { NextResponse, type NextRequest } from "next/server";

import { siteConfig } from "@/config/site";

/**
 * Keep every host EXCEPT the real domain out of the search index.
 *
 * Vercel auto-noindexes the per-deployment URLs (…-6y75vuwas.vercel.app) but
 * NOT the production alias (…-websit.vercel.app). Left alone that alias gets
 * crawled as a complete second copy of the site — the duplicate-host problem
 * that splits ranking signals and burns crawl budget.
 *
 * Host-based rather than env-var-based on purpose:
 *   - it starts allowing indexing the moment the real domain is attached,
 *     so there's no switch to remember (forgetting one leaves the LIVE site
 *     noindexed, which is far worse than the problem being solved);
 *   - and it keeps the vercel.app copy suppressed permanently after launch,
 *     which is what you want anyway.
 *
 * X-Robots-Tag rather than a robots.txt disallow: a disallow stops crawling
 * but does NOT reliably stop indexing — Google can still list a blocked URL
 * it finds linked. The header is the directive that actually removes it.
 */
const canonicalHost = new URL(siteConfig.url).host.replace(/^www\./, "");

export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "")
    .toLowerCase()
    .split(":")[0]
    .replace(/^www\./, "");

  const response = NextResponse.next();
  if (host !== canonicalHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Everything except Next's own static output — pages, sitemap.xml,
  // robots.txt, and llms.txt all need the header when off-domain.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
