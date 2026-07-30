import { NextResponse } from "next/server";

// import { emptyLead, forwardLead } from "@/lib/leads";

/**
 * CALLRAIL CALL ADAPTER — STUB (not wired until you upgrade to CallRail).
 *
 * This is the entire upgrade path, in one file. When volume justifies
 * CallRail (see LEAD-TRACKING.md):
 *
 *  1. In CallRail, buy the tracking number and set its destination to the
 *     renter's line — CallRail forwards the call itself, so the Twilio voice
 *     routes (/api/twilio/*) are no longer used and can be deleted.
 *  2. CallRail → Settings → Integrations → Webhooks → add a Post-Call webhook
 *     pointing at:  https://<your-domain>/api/callrail/webhook
 *  3. Uncomment the import above and map CallRail's payload into the SHARED
 *     LeadRecord below, then call forwardLead(). Same Google Sheet ledger,
 *     same kernel — nothing else in the app changes.
 *
 * CallRail post-call payload includes fields like:
 *   customer_phone_number, duration, answered, source (utm/referrer),
 *   landing_page_url, gclid, first_call, start_time, tracking_number …
 * (confirm current field names against CallRail's webhook docs at build time).
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));

  // TODO(callrail): validate the CallRail signature, then:
  // const lead = emptyLead({
  //   type: "call",
  //   name: "Phone caller",
  //   phone: payload.customer_phone_number ?? "",
  //   message: `Inbound call — ${payload.answered ? "answered" : "missed"}`,
  //   callDuration: String(payload.duration ?? ""),
  //   callStatus: payload.answered ? "completed" : "no-answer",
  //   source: payload.source ?? "",
  //   gclid: payload.gclid ?? "",
  //   landingPage: payload.landing_page_url ?? "",
  // });
  // await forwardLead(lead);

  console.log("[callrail] webhook received (stub — not yet mapped):", payload);
  return NextResponse.json({ data: { ok: true }, error: null, status: 200 });
}
