import { siteConfig } from "@/config/site";
import {
  isValidTwilioSignature,
  publicUrl,
  readTwilioParams,
  twiml,
  xmlEscape,
} from "@/lib/twilio";

/**
 * TWILIO CALL ADAPTER — "A Call Comes In" webhook.
 *
 * Twilio hits this when the tracking number rings. We answer with TwiML that
 * forwards the call to the renter's line (RENTER_FORWARD_NUMBER). When the
 * forwarded call ends, Twilio POSTs the outcome to the `action` URL
 * (/api/twilio/voice/status), which logs it via the shared lead kernel.
 *
 * This is the ONLY Twilio-specific call-routing code. Swapping to CallRail
 * later retires this route (CallRail forwards calls itself); the logging
 * kernel and the whole site stay untouched. See LEAD-TRACKING.md.
 *
 * Config split (repo is public):
 *  - tracking number shown on site → siteConfig.phone (public, in code)
 *  - renter's real line + Twilio auth token → env vars (never committed)
 */

export const runtime = "nodejs"; // crypto + form parsing

export async function POST(request: Request) {
  const params = await readTwilioParams(request);

  // Verify the request is really from Twilio (when the token is configured).
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (authToken) {
    const ok = isValidTwilioSignature({
      authToken,
      signature: request.headers.get("x-twilio-signature"),
      url: publicUrl(request, "/api/twilio/voice"),
      params,
    });
    if (!ok) return new Response("Invalid Twilio signature", { status: 403 });
  } else {
    console.warn("[twilio] TWILIO_AUTH_TOKEN not set — skipping signature check");
  }

  const forwardTo = process.env.RENTER_FORWARD_NUMBER;

  // Phase 1 / pre-renter: no line to forward to yet. Play a holding message
  // instead of dialing a dead number.
  if (!forwardTo) {
    return twiml(
      `<Say voice="Polly.Joanna">Thanks for calling ${xmlEscape(
        siteConfig.name
      )}. We're not able to take your call right now. Please leave a message after the tone, or try again shortly.</Say><Record maxLength="120" playBeep="true"/>`
    );
  }

  // callerId = our tracking number (we own it, so it's always a valid caller
  // ID, and it signals to the renter "this is a lead from the rented site").
  // The real caller's number is still captured in the status callback.
  const callerId = params["To"] || siteConfig.phone.e164;
  const statusUrl = publicUrl(request, "/api/twilio/voice/status");

  return twiml(
    `<Dial answerOnBridge="true" callerId="${xmlEscape(callerId)}" timeout="20" ` +
      `action="${xmlEscape(statusUrl)}" method="POST">${xmlEscape(forwardTo)}</Dial>`
  );
}
