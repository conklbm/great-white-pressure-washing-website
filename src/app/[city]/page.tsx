import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SprayDivider } from "@/components/SprayDivider";
import { PhoneLink } from "@/components/PhoneLink";
import { absoluteUrl, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { getTown, towns } from "@/content/towns";
import { pageMetadata } from "@/lib/seo";

// Route shell only — every town's content is hand-written in
// src/content/towns.ts (see the #1 rule in rank-and-rent-strategy.md).
export const dynamicParams = false;

export function generateStaticParams() {
  return towns.map((t) => ({ city: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const town = getTown(city);
  if (!town) return {};
  return {
    ...pageMetadata({
      title: town.metaTitle,
      description: town.metaDescription,
      path: `/${town.slug}`,
    }),
    title: { absolute: `${town.metaTitle} | ${siteConfig.name}` },
  };
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const town = getTown(city);
  if (!town) notFound();

  const primary = towns.find((t) => t.isPrimary);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: `${town.name}, ${siteConfig.state}`,
        item: absoluteUrl(`/${town.slug}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <article>
        <header className="bg-limestone">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <nav aria-label="Breadcrumb" className="text-sm text-loam">
              <Link href="/" className="hover:text-spruce">Home</Link>
              {" / "}
              <span aria-current="page">{town.name}, {siteConfig.state}</span>
            </nav>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
              {town.h1}
            </h1>
            <p className="mt-3 text-loam">
              {town.county} County · Serving {town.landmarks.slice(0, 3).join(", ")} and beyond
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {town.intro.map((p) => (
                <p key={p.slice(0, 40)} className="text-lg leading-relaxed text-loam">
                  {p}
                </p>
              ))}

              <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
                {town.local.heading}
              </h2>
              {town.local.body.map((p) => (
                <p key={p.slice(0, 40)} className="leading-relaxed text-loam">
                  {p}
                </p>
              ))}

              {!town.isPrimary && primary && (
                <p className="leading-relaxed text-loam">
                  {town.name} calls run from our {primary.name} home base —{" "}
                  <Link href={`/${primary.slug}`} className="font-medium text-spruce underline">
                    see our {primary.name} service page
                  </Link>{" "}
                  for the full picture of how we work.
                </p>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-lg bg-bedrock p-6 text-white">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  {town.name} service line
                </h2>
                <p className="mt-2 text-sm text-white/75">
                  Free estimates, written price before any work starts.
                </p>
                <PhoneLink
                  location={`town-${town.slug}-aside`}
                  className="mt-4 block rounded-md bg-signal px-5 py-3 text-center font-display text-base font-bold uppercase tracking-wide text-bedrock hover:bg-signal/85"
                >
                  Call or text {siteConfig.phone.display}
                </PhoneLink>
                <Link
                  href="/contact"
                  className="mt-2 block rounded-md border border-white/25 px-5 py-3 text-center font-display text-base font-semibold uppercase tracking-wide text-white hover:bg-white/10"
                >
                  Get my free estimate
                </Link>
              </div>
              <nav aria-label={`Services in ${town.name}`} className="rounded-lg border border-bedrock/10 p-6">
                <h2 className="font-display text-lg font-semibold text-bedrock">
                  Services in {town.name}
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-spruce hover:underline">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>

          <SprayDivider />
          <Faq items={town.faqs} heading={`${town.name} questions`} />
        </div>
      </article>

      <Cta
        heading={`Ready for a cleaner place in ${town.name}? Get a free estimate.`}
        location={`town-${town.slug}-final`}
      />
    </>
  );
}
