import { emptyLead, forwardLead } from "@/lib/leads";
import {
  isValidTwilioSignature,
  publicUrl,
  readTwilioParams,
  twiml,
} from "@/lib/twilio";

/**
 * TWILIO CALL ADAPTER — dial-result callback.
 *
 * Fired after the forwarded call ends. Maps Twilio's payload into the shared
 * `LeadRecord` and logs it via `forwardLead()` — the SAME kernel the website
 * form uses — so calls and form leads land in one Google Sheet ledger.
 */

export const runtime = "nodejs";

export async function POST(request: Request) {
  const params = await readTwilioParams(request);

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (authToken) {
    const ok = isValidTwilioSignature({
      authToken,
      signature: request.headers.get("x-twilio-signature"),
      url: publicUrl(request, "/api/twilio/voice/status"),
      params,
    });
    if (!ok) return new Response("Invalid Twilio signature", { status: 403 });
  }

  const caller = params["From"] ?? "";
  const status = params["DialCallStatus"] ?? params["CallStatus"] ?? "";
  const duration = params["DialCallDuration"] ?? "";

  const lead = emptyLead({
    type: "call",
    name: "Phone caller",
    phone: caller,
    message: `Inbound call — ${status || "unknown"}${duration ? `, ${duration}s` : ""}`,
    callStatus: status,
    callDuration: duration,
  });

  try {
    await forwardLead(lead);
  } catch (err) {
    // Never fail the call over a logging hiccup — the caller was already
    // bridged. Just record the miss.
    console.error("[twilio] Call log forward failed:", err);
  }

  // The call is over; hang up cleanly.
  return twiml("");
}
