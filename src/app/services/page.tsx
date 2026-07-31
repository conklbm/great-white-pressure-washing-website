import Link from "next/link";

import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/content/services";

export const metadata = pageMetadata({
  title: "Pressure Washing Services — Mobile Bay Area",
  description:
    "Eight ways we attack grime — soft washing, roofs, concrete, decks, brick, gutters, rust removal, and commercial work across Mobile and Baldwin County.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
          Pressure Washing Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-loam">
          One call covers it — siding, roof, driveway, or a whole commercial
          property. Every job uses the right method for the surface and a
          written price you approve first.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-lg border border-bedrock/10 bg-limestone p-7 transition-colors hover:border-spruce"
            >
              <h2 className="font-display text-2xl font-semibold text-bedrock group-hover:text-spruce">
                {s.name}
              </h2>
              <p className="mt-2 text-loam">{s.card}</p>
              <span className="mt-4 inline-block font-semibold text-spruce">
                {s.urgent ? "Free assessment — don't wait →" : "Learn more →"}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Cta location="services-index-cta" />
    </>
  );
}
