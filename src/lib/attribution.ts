/**
 * First-touch source attribution (client-side).
 *
 * On first visit we persist UTM params, gclid, referrer, landing page, and
 * timestamp. Every lead submission attaches this data — it's how lead volume
 * is proven to a renter ("34 calls/leads last month, here's where they came
 * from") and how paid vs organic is separated later.
 */

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  referrer: string;
  landingPage: string;
  firstSeen: string; // ISO timestamp
};

const STORAGE_KEY = "pcgd_attribution_v1";

/** Capture first-touch attribution. Call once on mount; later calls no-op. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(STORAGE_KEY)) return; // first touch only

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      source: params.get("utm_source") ?? "",
      medium: params.get("utm_medium") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      term: params.get("utm_term") ?? "",
      content: params.get("utm_content") ?? "",
      gclid: params.get("gclid") ?? "",
      referrer: document.referrer ?? "",
      landingPage: window.location.pathname + window.location.search,
      firstSeen: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // storage blocked (private mode etc.) — attribution is best-effort
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
