import { siteConfig } from "@/config/site";

/**
 * VENDOR-NEUTRAL LEAD KERNEL.
 *
 * One normalized record shape and one forwarder for EVERY lead source —
 * website form, Twilio call adapter, a future CallRail webhook, anything.
 * A new source just maps its payload into `LeadRecord` and calls
 * `forwardLead()`. Nothing about the destination (the Google Sheet) or the
 * rest of the site changes when you swap or add a call-tracking vendor.
 *
 * This is the piece that carries over across vendors. The per-vendor code
 * (e.g. Twilio's TwiML call routing) is a thin adapter around this.
 */

export type LeadType = "form" | "call";

export type LeadRecord = {
  /** which source produced this row — the unified ledger discriminator */
  type: LeadType;
  name: string;
  phone: string;
  email: string;
  service: string;
  town: string;
  message: string;
  // first-touch attribution (forms carry it; calls usually can't)
  source: string;
  medium: string;
  campaign: string;
  gclid: string;
  referrer: string;
  landingPage: string;
  // call-only fields (empty string for form leads)
  callDuration: string; // seconds
  callStatus: string; // e.g. "completed", "no-answer", "busy"
  timestamp: string;
  siteId: string;
};

/** Build a fully-formed record with sensible empty defaults. */
export function emptyLead(overrides: Partial<LeadRecord> = {}): LeadRecord {
  return {
    type: "form",
    name: "",
    phone: "",
    email: "",
    service: "",
    town: "",
    message: "",
    source: "",
    medium: "",
    campaign: "",
    gclid: "",
    referrer: "",
    landingPage: "",
    callDuration: "",
    callStatus: "",
    timestamp: new Date().toISOString(),
    siteId: siteConfig.siteId,
    ...overrides,
  };
}

/**
 * The lead destination. Prefer the env var (LEAD_WEBHOOK_URL) so the real
 * URL never lives in this public repo; fall back to config for local/dev.
 */
function webhookUrl(): string {
  return process.env.LEAD_WEBHOOK_URL || siteConfig.leadWebhookUrl || "";
}

/**
 * Forward a normalized lead to the configured webhook (Google Sheet → renter).
 * Returns `{ ok, skipped }`; throws only on a real delivery failure so callers
 * can decide how to respond. No-ops (skipped) when no webhook is configured.
 */
export async function forwardLead(
  record: LeadRecord
): Promise<{ ok: true; skipped?: boolean }> {
  const url = webhookUrl();
  if (!url) {
    // Not configured yet (pre-launch). Log so nothing is silently lost while
    // testing; SETUP-TODO.md tracks wiring the real URL.
    console.warn(`[lead] No webhook configured — ${record.type} not forwarded:`, record);
    return { ok: true, skipped: true };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return { ok: true };
}
