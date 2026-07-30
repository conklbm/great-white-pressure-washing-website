/**
 * SINGLE SOURCE OF TRUTH for all business details, brand tokens, and
 * integration IDs. Every page and component reads from this file —
 * never hardcode NAP, phone numbers, or IDs anywhere else.
 *
 * Great White notes:
 * - This is Dylan's REAL business — `phone` is his real call/text line.
 *   If a tracking/AI-calling layer (Twilio) is added later, swap the
 *   number here only; nothing else changes (see LEAD-TRACKING.md).
 * - `leadWebhookUrl` is where normalized leads land (Google Sheet via
 *   Apps Script).
 * - Service-area business: NO street address anywhere until there's a
 *   real public location worth listing.
 */

export const siteConfig = {
  siteId: "great-white-pressure-washing",

  // Live domain. Canonical host is the apex (the current live site serves
  // the bare domain) — keep sitemap/canonical/OG URLs on the apex.
  name: "Great White Pressure Washing",
  url: "https://greatwhitepressurewashing.com",
  description:
    "Pressure washing and soft washing across the Mobile Bay Area — houses, roofs, driveways, decks, and commercial exteriors from Mobile to Gulf Shores. Free estimates.",

  city: "Mobile",
  state: "AL",
  stateFull: "Alabama",

  // Dylan's real call/text line.
  phone: {
    display: "(251) 454-6704",
    e164: "+12514546704",
    isPlaceholder: false,
  },

  // TODO: set once Dylan picks/creates a business inbox (see SETUP-TODO.md).
  // Empty = email is simply omitted from the site and schema.
  email: "",

  // Service-area business today. When a real public address/hours exist,
  // set them here and the LocalBusiness JSON-LD in layout.tsx picks them up.
  address: null as null | {
    street: string;
    city: string;
    state: string;
    zip: string;
  },
  hours: null as null | string, // e.g. "Mo-Sa 07:00-19:00" (schema.org format)

  // ---- Integrations (all TODO until launch) -------------------------------
  ga4Id: "", // TODO: GA4 property for this site (loads only when set)
  searchConsoleVerification: "", // TODO: content of google-site-verification meta tag
  leadWebhookUrl: "", // TODO: Apps Script Web App URL → Google Sheet

  /**
   * Public profiles, in footer link order. Every href is also emitted as
   * LocalBusiness `sameAs` — that's the signal tying this site to the Google
   * Business Profile, so keep the Google entry first and never drop it.
   */
  social: [
    { label: "Google", href: "https://maps.app.goo.gl/dRNk4c31rrZh5mxB6" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61584888988593" },
    { label: "Instagram", href: "https://www.instagram.com/_greatwhitepressurewashing_/" },
  ] as ReadonlyArray<{ label: string; href: string }>,

  // ---- Brand tokens (see globals.css for the CSS side) --------------------
  brand: {
    // EXTRACTED from Dylan's existing site + logo — not invented. His logo
    // is a cartoon great-white mascot gripping a pressure washer; its navy
    // wordmark block and the wand's yellow are the brand's own colors, and
    // the live site's hero gradient runs to royal #0057FF. Sampled values:
    //   logo background #CAE8FF · logo navy #202080 · lettering #F8F8F0
    //   site gradients  135deg #C9E5FF→#0057FF and #B8D0FF→#C9EFFF
    //
    // Token names are the portfolio-standard slots shared across sites;
    // the hex below is this site's identity. Role → name mapping:
    //   bedrock   = logo navy      (dark sections, headings, text on yellow)
    //   spruce    = royal blue     (links, accents, hover)
    //   loam      = blue-slate     (secondary/body text, borders)
    //   limestone = pale sky tint  (page + card backgrounds)
    //   spray     = logo sky blue  (accents/eyebrow text on dark)
    //   signal    = wand yellow    (call CTAs ONLY — always with navy text)
    colors: {
      bedrock: "#202080", // logo navy — headings, dark sections
      spruce: "#0057FF", // royal blue — links, accents (5.5:1 on white)
      loam: "#46536D", // blue-slate — secondary text, borders
      limestone: "#EAF4FF", // pale sky tint — page + card backgrounds
      spray: "#89BAE4", // logo sky blue — accents on dark backgrounds
      signal: "#FFC61E", // wand yellow — call CTAs ONLY (8.4:1 on bedrock)
      white: "#FFFFFF",
    },
    // Bangers is the brand's own voice (the face his hero wordmark uses) and
    // is reserved for the wordmark + homepage h1. Oswald carries every other
    // heading; Inter is the body face. All three match his live site.
    brandFont: "Bangers",
    displayFont: "Oswald",
    bodyFont: "Inter",
  },
} as const;

/** Absolute URL helper — keeps canonical/OG URLs consistent. */
export function absoluteUrl(path: string = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
