"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { towns } from "@/content/towns";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

type Status = "idle" | "submitting" | "error";

/**
 * The lead capture form. Short by design: name, phone, service, one detail.
 * POSTs to /api/lead with first-touch attribution attached; the API
 * normalizes and forwards to the configured webhook (Google Sheet → renter).
 * Spam protection: honeypot field + server-side validation.
 */
export function LeadForm({ defaultService }: { defaultService?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          service: data.get("service"),
          town: data.get("town"),
          message: data.get("message"),
          company: data.get("company"), // honeypot — humans never see it
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(`Lead API responded ${res.status}`);
      trackEvent("form_submit", { form: "lead", service: String(data.get("service") ?? "") });
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-md border border-bedrock/20 bg-white px-3 py-3 text-base text-bedrock placeholder:text-loam/70 focus:border-spruce focus:outline-none focus:ring-2 focus:ring-spruce/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      {/* honeypot — hidden from humans, bots fill it */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Company (leave blank)
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="lead-name" className="mb-1 block text-sm font-medium text-bedrock">
          Name
        </label>
        <input id="lead-name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="lead-phone" className="mb-1 block text-sm font-medium text-bedrock">
          Phone
        </label>
        <input id="lead-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="lead-email" className="mb-1 block text-sm font-medium text-bedrock">
          Email <span className="font-normal text-loam">(optional)</span>
        </label>
        <input id="lead-email" name="email" type="email" autoComplete="email" className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-service" className="mb-1 block text-sm font-medium text-bedrock">
            What do you need?
          </label>
          <select id="lead-service" name="service" defaultValue={defaultService ?? ""} className={inputClass}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-town" className="mb-1 block text-sm font-medium text-bedrock">
            Your town
          </label>
          <select id="lead-town" name="town" defaultValue="" className={inputClass}>
            <option value="">Choose a town</option>
            {towns.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Other">Other / nearby</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1 block text-sm font-medium text-bedrock">
          What needs cleaning? <span className="font-normal text-loam">(optional)</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Green siding, black driveway, streaky roof…"
          className={inputClass}
        />
      </div>

      {/* The one path where a lead can be lost, so give them the number
          right here rather than making them go hunt for it. */}
      {status === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          Couldn&apos;t send your request. Call or text{" "}
          <a
            href={`tel:${siteConfig.phone.e164}`}
            className="font-semibold underline"
          >
            {siteConfig.phone.display}
          </a>{" "}
          and we&apos;ll take care of you.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-signal px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-bedrock transition-colors hover:bg-signal/85 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get my free quote"}
      </button>
    </form>
  );
}
