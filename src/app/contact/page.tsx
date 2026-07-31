import { LeadForm } from "@/components/LeadForm";
import { PhoneLink } from "@/components/PhoneLink";
import { siteConfig } from "@/config/site";
import { towns } from "@/content/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Pressure Washing Estimate — Mobile Bay Area",
  description:
    "Call or text Great White Pressure Washing for a free estimate anywhere in the Mobile Bay Area — house, roof, driveway, and commercial cleaning on both shores of the bay.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
        Get your free estimate
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-loam">
        Fastest answer: call or text — a photo of the job usually gets you a
        ballpark the same day. Or send the form and Dylan will get back to
        you.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="rounded-lg border border-bedrock/10 bg-limestone p-6 sm:p-8">
          <LeadForm />
        </div>

        <div className="space-y-8">
          <div className="rounded-lg bg-bedrock p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Call or text
            </h2>
            <PhoneLink
              location="contact-page"
              className="mt-3 block font-display text-3xl font-bold text-white underline decoration-signal decoration-4 underline-offset-8"
            />
            <p className="mt-4 text-sm text-white/75">
              Free estimates anywhere around Mobile Bay — texted photos
              welcome.
            </p>
            {siteConfig.email ? (
              <p className="mt-4 text-sm text-white/75">
                Prefer email?{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-white underline">
                  {siteConfig.email}
                </a>
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-bedrock">
              Service area
            </h2>
            <p className="mt-2 text-sm text-loam">
              Both shores of Mobile Bay:
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {towns.map((t) => (
                <li
                  key={t.slug}
                  className="rounded-full border border-bedrock/15 px-3 py-1 text-sm text-loam"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
