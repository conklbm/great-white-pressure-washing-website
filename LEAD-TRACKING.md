# LEAD-TRACKING — upgrade playbook

How to flip on call tracking (or AI phone answering) later. On THIS site the
"renter" is permanent — Dylan owns the business and his real line,
(251) 454-6704, is shown on the site — so none of this is needed at launch.
It becomes relevant when you want call logging, volume proof, or an AI agent
answering and qualifying calls in front of Dylan's line (the planned future
experiment). The architecture is kept because **switching tools only ever
touches three things**:

1. The tracking number in `siteConfig.phone` (`src/config/site.ts`) — the number shown on the site
2. The DNI script slot in `src/app/layout.tsx` (clearly commented, currently a no-op)
3. The lead destination + forwarding target — **env vars** (`LEAD_WEBHOOK_URL`,
   `RENTER_FORWARD_NUMBER`), set in Vercel, never committed

Everything else routes through the **vendor-neutral kernel** in `src/lib/leads.ts`
(`LeadRecord` + `forwardLead`). Forms and calls both become a `LeadRecord` and land in
the same Google Sheet. A new vendor is a thin adapter that maps its payload into that
record — the kernel and the rest of the site never change. If a change seems to need
more than the three things above, stop — something's being hardwired that shouldn't be.

## Stage 0 — launch (free/cheap)

Form leads already land in the Google Sheet with full source attribution
(utm/gclid/referrer/landing page), so you can prove *form* volume from day one.
Calls: point the tracking number at a forwarding line (voicemail now, renter later).

## Stage 1 — Twilio — BUILT (default) — cheapest real tracking (~$1/mo + usage)

The Twilio call adapter is already in the app:
- `src/app/api/twilio/voice/route.ts` — answers the call, `<Dial>`s the renter
  (`RENTER_FORWARD_NUMBER`), plays a holding message + voicemail when that's unset
- `src/app/api/twilio/voice/status/route.ts` — logs each call (caller, duration,
  status) into the **same Google Sheet** as form leads, via `forwardLead`

**To turn it on:**
1. Create a Twilio account, buy a 251 number (~$1/mo).
2. In Vercel → Settings → Environment Variables, set:
   - `RENTER_FORWARD_NUMBER` = the line to forward to, E.164 (e.g. `+12515551234`)
   - `TWILIO_AUTH_TOKEN` = from the Twilio Console (verifies inbound webhooks)
   - `LEAD_WEBHOOK_URL` = your Google Sheet webhook (if not already set)
3. In the Twilio number's config:
   - **A Call Comes In** → Webhook → `https://<your-domain>/api/twilio/voice` (HTTP POST)
   - (the dial-result callback is wired automatically via the TwiML `action`)
4. Put the Twilio number into `siteConfig.phone` (`display` + `e164`), set
   `isPlaceholder: false`, commit, push. Auto-deploys.

No Twilio SDK, no DNI, no monthly dashboard — you read volume from the Sheet.
Perfect while proving volume to yourself or a first renter.

## Stage 2 — CallRail (~$45/mo) — adds DNI + renter-facing reports

A **stubbed adapter is already in place**: `src/app/api/callrail/webhook/route.ts`
documents the exact wiring. Upgrading:
1. Buy the tracking number in CallRail; set its destination to the renter's line.
   CallRail forwards calls itself, so the `/api/twilio/*` routes are no longer used
   (delete them).
2. CallRail → Settings → Integrations → Webhooks → Post-Call webhook →
   `https://<your-domain>/api/callrail/webhook`
3. Uncomment the stub, map CallRail's payload into `LeadRecord`, call `forwardLead`.
   Same Sheet, same kernel — nothing else changes.
4. Add CallRail's DNI snippet to the DNI slot in `layout.tsx` — now the displayed
   number swaps by traffic source, so organic vs GBP vs paid becomes visible.

Note: CallRail sunset its Lead Center VoIP calling in Jan 2026 — its numbers forward
but don't answer. Irrelevant here: we forward to the renter's line anyway.

## Stage 3 — WhatConverts ($30+/mo) — best combined call + form reporting

- Tracks calls AND form fills in one dashboard with source attribution
- The strongest "here's exactly what you got for your rent" artifact
- Same pattern: a thin adapter into `forwardLead`, or use its own dashboard
- Worth it once a renter is paying real money and asks harder questions

## Which to pick

| Situation | Tool |
| --- | --- |
| Pre-renter / first renter, proving volume | **Twilio (built)** |
| Renter needs monthly reports + paid-traffic DNI | CallRail |
| Renter pays per-lead / disputes volume | WhatConverts |

Not in scope by design: pay-per-call marketplaces / multi-buyer lead broker
tooling. This is a single-renter rank-and-rent asset.
