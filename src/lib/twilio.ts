import crypto from "node:crypto";

/**
 * Tiny Twilio helpers — no SDK dependency (TwiML is just XML; signature
 * validation is ~15 lines of crypto). Keeps the call adapter lean and the
 * vendor swap clean.
 */

/** Escape a dynamic value for safe inclusion in XML text/attributes. */
export function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Wrap inner TwiML in a <Response> and return it as an XML HTTP response. */
export function twiml(inner: string): Response {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response>${inner}</Response>`;
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

/** Reconstruct the public URL Twilio called (for signature validation). */
export function publicUrl(request: Request, path: string): string {
  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}${path}`;
}

/**
 * Verify the X-Twilio-Signature header so only genuine Twilio requests are
 * honored. Algorithm: HMAC-SHA1(authToken, url + sorted(key+value…)), base64.
 */
export function isValidTwilioSignature(opts: {
  authToken: string;
  signature: string | null;
  url: string;
  params: Record<string, string>;
}): boolean {
  if (!opts.signature) return false;
  const data = Object.keys(opts.params)
    .sort()
    .reduce((acc, key) => acc + key + opts.params[key], opts.url);
  const expected = crypto
    .createHmac("sha1", opts.authToken)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(opts.signature),
      Buffer.from(expected)
    );
  } catch {
    return false; // length mismatch etc.
  }
}

/** Read an x-www-form-urlencoded Twilio POST body into a plain object. */
export async function readTwilioParams(
  request: Request
): Promise<Record<string, string>> {
  const form = await request.formData();
  const params: Record<string, string> = {};
  form.forEach((value, key) => {
    params[key] = typeof value === "string" ? value : "";
  });
  return params;
}
