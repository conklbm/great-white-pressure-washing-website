import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PhoneLink } from "@/components/PhoneLink";
import { absoluteUrl, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { towns } from "@/content/towns";

export const metadata: Metadata = {
  title: {
    absolute: `Pressure Washing Mobile AL | ${siteConfig.name}`,
  },
  description:
    "Great White Pressure Washing attacks grime across the Mobile Bay Area — houses, roofs, driveways, and commercial jobs on both shores of the bay. Free estimates.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `Pressure Washing Mobile AL | ${siteConfig.name}`,
    description:
      "House washing, roof cleaning, and pressure washing across the Mobile Bay Area — both shores of the bay. Free estimates.",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

const homeFaqs = [
  {
    q: "What does pressure washing cost around Mobile?",
    a: "Most jobs start around $200 and run to $1,000 or more, depending on the size of the property and how complicated the work is. A small driveway sits near the bottom; a big two-story house with the roof, gutters, and concrete all done in one visit sits at the top. Every job gets a free estimate and a written price you approve before we start.",
  },
  {
    q: "Can I text you instead of calling?",
    a: `Absolutely — text ${siteConfig.phone.display} with what you need cleaned (a photo helps a lot) and you'll get a fast answer. Calls work too, and the form on this site reaches us the same day.`,
  },
  {
    q: "Who actually shows up to do the work?",
    a: "Dylan — the owner. Great White is an owner-run company, so the person who quotes your job is the person who does it and stands behind it.",
  },
  {
    q: "How far do you travel?",
    a: "Both sides of Mobile Bay: Mobile, Tillmans Corner, Theodore, Semmes, and Saraland on the west side, and Daphne, Spanish Fort, Fairhope, and Foley on the Eastern Shore. Close but not on the list? Reach out anyway.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-spray">
              Mobile Bay Area · Alabama Gulf Coast
            </p>
            <h1 className="mt-3 font-brand text-5xl uppercase leading-[0.95] sm:text-6xl">
              We&apos;ll attack
              <br />
              the grime.
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/85">
              House washing, roof cleaning, and pressure washing on both
              shores of Mobile Bay — with a free estimate and one written
              price before any work starts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneLink
                location="hero"
                className="rounded-md bg-signal px-7 py-4 text-center font-display text-lg font-bold uppercase tracking-wide text-bedrock transition-colors hover:bg-signal/85"
              >
                Call or text {siteConfig.phone.display}
              </PhoneLink>
              <Link
                href="/contact"
                className="rounded-md border border-white/30 px-7 py-4 text-center font-display text-lg font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Get my free estimate
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              <li>✓ Free estimates</li>
              <li>✓ Owner on every job</li>
              <li>✓ Both sides of the bay</li>
            </ul>
          </div>

          {/* Real before/after from one of Dylan's jobs.
              A circular logo badge used to sit under this — dropping in a new
              one is an <Image> here plus the file in public/. */}
          <div className="justify-self-center md:w-full md:max-w-md">
            <figure className="overflow-hidden rounded-xl bg-white/10 shadow-2xl ring-1 ring-white/20">
              <Image
                src="/before-after-house-washing-brick.jpg"
                alt="Brick wall of a Mobile home before and after soft washing — green algae on the left, clean white brick on the right"
                width={900}
                height={813}
                priority
                sizes="(min-width: 768px) 28rem, 100vw"
                className="w-full object-cover"
              />
              <figcaption className="px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-white/85">
                Before &amp; After
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* MEET DYLAN — the original site's signature section, kept */}
      <section className="bg-limestone">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
          <Image
            src="/dylan-douglas.jpg"
            alt="Dylan Douglas, owner of Great White Pressure Washing"
            width={893}
            height={893}
            sizes="(min-width: 768px) 14rem, 11rem"
            className="h-44 w-44 justify-self-center rounded-full object-cover shadow-lg ring-4 ring-white md:h-56 md:w-56"
          />
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-bedrock">
              Hi, I&apos;m Dylan.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-loam">
              I&apos;m a business student at the University of South Alabama,
              and I started Great White to pay my own way through school — the
              goal is to graduate without a dollar of student loan debt. That
              means every job matters to me. When you hire Great White, you
              get the owner on your property, working like the job decides
              whether he makes tuition. Because it kind of does.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block font-display text-sm font-semibold uppercase tracking-wide text-spruce hover:underline"
            >
              My story →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-display text-3xl font-bold uppercase tracking-wide text-bedrock">
          What we attack
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-lg border border-bedrock/10 bg-limestone p-6 transition-colors hover:border-spruce"
            >
              <h3 className="font-display text-xl font-semibold text-bedrock group-hover:text-spruce">
                {s.name}
              </h3>
              <p className="mt-2 text-sm text-loam">{s.card}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-spruce">
                Details →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-bedrock text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            Why Great White
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-spray">
                The owner does the work
              </h3>
              <p className="mt-2 text-sm text-white/75">
                No rotating crews. The person who answers your text, quotes
                your job, and cleans your property is the same person — and
                his name is on the company.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-spray">
                The right pressure for the surface
              </h3>
              <p className="mt-2 text-sm text-white/75">
                Siding and shingles get gentle soft washing that kills growth
                at the root. Concrete gets real pressure. Nothing gets
                damaged for the sake of looking clean for a week.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-spray">
                One price, in writing, first
              </h3>
              <p className="mt-2 text-sm text-white/75">
                Free estimate, a written price you approve before we start,
                and a straight answer when a stain won&apos;t fully lift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section id="service-areas" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16" aria-labelledby="areas-heading">
        <h2 id="areas-heading" className="font-display text-3xl font-bold uppercase tracking-wide text-bedrock">
          Waters we patrol
        </h2>
        <p className="mt-3 max-w-2xl text-loam">
          Based in {siteConfig.city}, working both shores of the bay and down
          to the Gulf.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {towns.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group rounded-lg border border-bedrock/10 p-5 transition-colors hover:border-spruce"
            >
              <h3 className="font-display text-lg font-semibold text-bedrock group-hover:text-spruce">
                {t.name}, {siteConfig.state}
              </h3>
              <p className="mt-1 text-sm text-loam">{t.card}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Faq items={homeFaqs} />
      </div>

      <Cta location="home-final-cta" />
    </>
  );
}
