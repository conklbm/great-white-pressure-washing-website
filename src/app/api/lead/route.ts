import { NextResponse } from "next/server";

import type { Attribution } from "@/lib/attribution";
import { emptyLead, forwardLead } from "@/lib/leads";

/**
 * Website form intake — a thin adapter over the vendor-neutral lead kernel
 * (src/lib/leads.ts). Validates, normalizes to a `LeadRecord`, and forwards
 * to the configured webhook (Google Sheet → renter). Re-pointing to a new
 * renter is a webhook-side change; this code never changes.
 *
 * Spam defense: honeypot field + required-field validation. If clean leads
 * become a problem once a renter is paying, add Cloudflare Turnstile here
 * (verify the token server-side before forwarding).
 */

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  town?: string;
  message?: string;
  company?: string; // honeypot
  attribution?: Attribution | null;
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { data: null, error: "Invalid request body", status: 400 },
      { status: 400 }
    );
  }

  // Honeypot filled → bot. Return success so the bot learns nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ data: { ok: true }, error: null, status: 200 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const phone = (body.phone ?? "").toString().trim().slice(0, 40);
  if (!name || !phone) {
    return NextResponse.json(
      { data: null, error: "Name and phone are required", status: 400 },
      { status: 400 }
    );
  }
  // must contain at least 7 digits to be a dialable number
  if ((phone.match(/\d/g) ?? []).length < 7) {
    return NextResponse.json(
      { data: null, error: "Enter a valid phone number", status: 400 },
      { status: 400 }
    );
  }

  const a = body.attribution ?? null;
  const lead = emptyLead({
    type: "form",
    name,
    phone,
    email: (body.email ?? "").toString().trim().slice(0, 200),
    service: (body.service ?? "").toString().trim().slice(0, 100),
    town: (body.town ?? "").toString().trim().slice(0, 100),
    message: (body.message ?? "").toString().trim().slice(0, 2000),
    source: a?.source ?? "",
    medium: a?.medium ?? "",
    campaign: a?.campaign ?? "",
    gclid: a?.gclid ?? "",
    referrer: a?.referrer ?? "",
    landingPage: a?.landingPage ?? "",
  });

  try {
    await forwardLead(lead);
  } catch (err) {
    console.error("[lead] Webhook forward failed:", err);
    return NextResponse.json(
      { data: null, error: "Could not deliver lead", status: 502 },
      { status: 502 }
    );
  }

  return NextResponse.json({ data: { ok: true }, error: null, status: 200 });
}
