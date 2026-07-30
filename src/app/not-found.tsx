import Link from "next/link";

import { PhoneLink } from "@/components/PhoneLink";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-signal">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-bedrock">
        We washed this page away
      </h1>
      <p className="mt-4 text-lg text-loam">
        The page you&apos;re after isn&apos;t here — but a spotless exterior is.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <PhoneLink
          location="404"
          className="rounded-md bg-signal px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-bedrock hover:bg-signal/85"
        >
          Call {siteConfig.phone.display}
        </PhoneLink>
        <Link
          href="/"
          className="rounded-md border border-bedrock/20 px-6 py-3.5 font-display text-lg font-semibold uppercase tracking-wide text-bedrock hover:bg-limestone"
        >
          Back to home
        </Link>
      </div>
      <nav aria-label="Popular services" className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-loam">
          Looking for one of these?
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm">
          {services.slice(0, 4).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-spruce hover:underline">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
