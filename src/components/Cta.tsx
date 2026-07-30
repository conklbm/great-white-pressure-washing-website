import Link from "next/link";

import { siteConfig } from "@/config/site";
import { PhoneLink } from "./PhoneLink";

/** Full-width call-to-action band — one clear action, repeated at page end. */
export function Cta({
  heading = "Ready to attack the grime? Get a free estimate.",
  sub = "Call or text with what you want cleaned — you get one honest, written price before any work starts.",
  location = "cta-band",
}: {
  heading?: string;
  sub?: string;
  location?: string;
}) {
  return (
    <section className="bg-bedrock">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-14 text-center">
        <h2 className="max-w-3xl font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl text-white/75">{sub}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <PhoneLink
            location={location}
            className="rounded-md bg-signal px-7 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-bedrock transition-colors hover:bg-signal/85"
          >
            Call or text {siteConfig.phone.display}
          </PhoneLink>
          <Link
            href="/contact"
            className="rounded-md border border-white/25 px-7 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Get my free estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
