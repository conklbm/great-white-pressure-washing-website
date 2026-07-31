import Image from "next/image";
import Link from "next/link";

import { Cta } from "@/components/Cta";
import { SprayDivider } from "@/components/SprayDivider";
import { siteConfig } from "@/config/site";
import { towns } from "@/content/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Dylan — Owner of Great White Pressure Washing",
  description:
    "Great White Pressure Washing is owner-run by Dylan Douglas, a University of South Alabama business student washing houses across the Mobile Bay Area to pay his way through school.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
          Hi, I&apos;m Dylan Douglas.
        </h1>

        <Image
          src="/dylan-douglas.jpg"
          alt="Dylan Douglas, owner of Great White Pressure Washing"
          width={893}
          height={893}
          priority
          sizes="(min-width: 640px) 16rem, 12rem"
          className="mt-8 h-48 w-48 rounded-full object-cover shadow-lg ring-4 ring-limestone sm:h-64 sm:w-64"
        />

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-loam">
          <p>
            I&apos;m a business student at the University of South Alabama,
            studying in the Mitchell College of Business. I started Great
            White Pressure Washing for a simple reason: I&apos;d rather learn
            business by running one than only reading about it — and I want
            to pay my own way through school and graduate without student
            loan debt.
          </p>
          <p>
            That plan only works if every single customer is glad they
            called. So that&apos;s the standard. I quote the job myself, I do
            the work myself, and I don&apos;t consider it finished until you
            walk the property with me and like what you see. I&apos;d love
            the opportunity to show you what it feels like to be a happy,
            satisfied customer.
          </p>
        </div>

        <SprayDivider />

        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
          Why &ldquo;Great White&rdquo;
        </h2>
        <Image
          src="/logo-full.png"
          alt="Great White Pressure Washing logo — a cartoon great white shark holding a pressure washer wand"
          width={815}
          height={728}
          sizes="(min-width: 640px) 20rem, 15rem"
          className="mx-auto mt-6 w-60 sm:w-80"
        />
        <div className="mt-4 space-y-5 leading-relaxed text-loam">
          <p>
            Because that&apos;s how we go after grime. The Gulf Coast is
            about the hardest place in America to keep a house clean —
            months of humidity, five-plus feet of rain a year, algae on
            every shaded wall, black streaks on every roof, and salt air the
            closer you get to the beach. Being gentle with the grime
            doesn&apos;t work here. Being gentle with your <em>house</em> is
            another matter.
          </p>
          <p>
            So the method fits the surface: soft washing for siding, roofs,
            and painted wood — low pressure plus a cleaning solution that
            kills algae and mildew at the root — and real pressure only on
            concrete, which can take it. The grime gets attacked. Your
            siding doesn&apos;t.
          </p>
        </div>

        <SprayDivider />

        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
          What to expect when you reach out
        </h2>
        <ul className="mt-4 space-y-3 text-loam">
          {[
            "A fast reply — call or text works, and a photo of the job usually gets you a ballpark the same day.",
            "A free estimate and one written price you approve before anything starts.",
            "The owner on the job, not a crew you've never met.",
            "The right method for each surface — soft wash for siding and roofs, surface cleaner for concrete.",
            "A straight answer when a stain won't fully lift, before you pay for it.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-spruce">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <SprayDivider />

        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-bedrock">
          Where we work
        </h2>
        <p className="mt-3 text-loam">
          Based in {siteConfig.city}, covering both shores of Mobile Bay:
        </p>
        <ul className="mt-4 grid gap-2 text-loam sm:grid-cols-2">
          {towns.map((t) => (
            <li key={t.slug}>
              <Link href={`/${t.slug}`} className="text-spruce hover:underline">
                {t.name}, {siteConfig.state}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Cta location="about-cta" />
    </>
  );
}
