import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SprayDivider } from "@/components/SprayDivider";
import { PhoneLink } from "@/components/PhoneLink";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getService, services } from "@/content/services";
import { towns } from "@/content/towns";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    ...pageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
    }),
    title: { absolute: `${service.metaTitle} | ${siteConfig.name}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: towns.map((t) => ({
      "@type": "City",
      name: `${t.name}, ${siteConfig.state}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: absoluteUrl(`/services/${service.slug}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article>
        <header className="bg-limestone">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <nav aria-label="Breadcrumb" className="text-sm text-loam">
              <Link href="/" className="hover:text-spruce">Home</Link>
              {" / "}
              <Link href="/services" className="hover:text-spruce">Services</Link>
              {" / "}
              <span aria-current="page">{service.name}</span>
            </nav>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
              {service.h1}
            </h1>
            {service.urgent && (
              <p className="mt-3 inline-block rounded bg-signal/15 px-3 py-1 text-sm font-semibold text-bedrock">
                Free quotes — most jobs priced from a quick call or a photo
              </p>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {service.intro.map((p) => (
                <p key={p.slice(0, 40)} className="text-lg leading-relaxed text-loam">
                  {p}
                </p>
              ))}

              {service.photo && (
                <figure className="overflow-hidden rounded-xl border border-bedrock/10">
                  <Image
                    src={service.photo.src}
                    alt={service.photo.alt}
                    width={service.photo.width}
                    height={service.photo.height}
                    // This is the LCP element on service pages — never lazy-load it.
                    priority
                    sizes="(min-width: 1024px) 42rem, 100vw"
                    className="w-full object-cover"
                  />
                  <figcaption className="bg-limestone px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-loam">
                    Actual job · before &amp; after
                  </figcaption>
                </figure>
              )}

              <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
                {service.includedHeading}
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {service.included.map((item) => (
                  <li key={item} className="flex gap-2 text-loam">
                    <span aria-hidden="true" className="font-bold text-spruce">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
                How it works
              </h2>
              <ol className="space-y-4">
                {service.process.map((p, i) => (
                  <li key={p.step} className="flex gap-4">
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-bedrock font-display font-bold text-signal">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-bedrock">{p.step}</h3>
                      <p className="text-sm text-loam">{p.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="pt-4 font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
                {service.localNote.heading}
              </h2>
              {service.localNote.body.map((p) => (
                <p key={p.slice(0, 40)} className="leading-relaxed text-loam">
                  {p}
                </p>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-lg bg-bedrock p-6 text-white">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  Get a quick estimate
                </h2>
                <p className="mt-2 text-sm text-white/75">
                  Tell us what you want cleaned — a call, text, or photo prices most jobs same-day.
                </p>
                <PhoneLink
                  location={`service-${service.slug}-aside`}
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
              <nav aria-label="Where we offer this service" className="rounded-lg border border-bedrock/10 p-6">
                <h2 className="font-display text-lg font-semibold text-bedrock">
                  {service.name} near you
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {towns.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/${t.slug}`} className="text-spruce hover:underline">
                        {t.name}, {siteConfig.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>

          <SprayDivider />
          <Faq items={service.faqs} heading={`${service.name} questions`} />
        </div>
      </article>

      <Cta location={`service-${service.slug}-final`} />
    </>
  );
}
