import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

// Legal page — wordiness is protective here. Review before launch (TODO in
// SETUP-TODO.md) and keep the "Last updated" date accurate when text changes.
export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-loam">Last updated: July 11, 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-loam">
        <p>
          This policy describes how {siteConfig.name} (&quot;we,&quot;
          &quot;us&quot;) collects, uses, and shares information when you use
          this website.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Information we collect</h2>
        <p>
          <strong className="text-bedrock">Information you provide.</strong> When
          you request a quote by form, we collect the details you enter: name,
          phone number, email address (optional), the town you&apos;re in, the
          service you need, and any message you write. When you call the phone
          number on this site, standard call details (your number, call time,
          and duration) may be recorded by our call-forwarding provider.
        </p>
        <p>
          <strong className="text-bedrock">Information collected automatically.</strong>{" "}
          We store basic visit context in your browser (such as the page you
          landed on, the referring site, and campaign tags in the address) so
          we can understand how customers find us. If analytics are enabled,
          Google Analytics collects standard usage data (pages viewed, device
          type, approximate location) via cookies.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">How we use it</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To respond to your quote request and schedule service</li>
          <li>To route your request to the local service provider who performs the work</li>
          <li>To measure which pages and sources bring customer inquiries</li>
          <li>To prevent spam and abuse of our forms</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Who we share it with</h2>
        <p>
          We share quote-request details with the local service provider who
          fulfills the work in your area. We also use these service providers
          to operate the site, and they process data on our behalf:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-bedrock">Vercel</strong> — website hosting
          </li>
          <li>
            <strong className="text-bedrock">Google (Sheets / Apps Script)</strong> — secure
            storage of quote requests
          </li>
          <li>
            <strong className="text-bedrock">Google Analytics</strong> — site usage
            measurement (when enabled)
          </li>
          {/* TODO: when a call-tracking vendor (CallRail/WhatConverts/Twilio)
              or automation tool (Make.com) is switched on, add it to this list. */}
        </ul>
        <p>We do not sell your personal information.</p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Data retention &amp; your choices</h2>
        <p>
          Quote requests are kept as long as needed to provide service and
          maintain business records. To ask what we hold about you, or to
          request deletion,{" "}
          {siteConfig.email ? (
            <>
              email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-spruce underline">
                {siteConfig.email}
              </a>
            </>
          ) : (
            <>
              call or text{" "}
              <a href={`tel:${siteConfig.phone.e164}`} className="text-spruce underline">
                {siteConfig.phone.display}
              </a>
            </>
          )}{" "}
          and we&apos;ll respond within 30 days. You can clear the visit
          context we store by clearing your browser&apos;s site data, and
          control analytics cookies through your browser settings.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Children</h2>
        <p>
          This site is for homeowners and businesses and is not directed at
          children under 13. We do not knowingly collect their information.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Changes &amp; contact</h2>
        <p>
          We&apos;ll update this page when our practices change and revise the
          date above. Questions:{" "}
          {siteConfig.email ? (
            <a href={`mailto:${siteConfig.email}`} className="text-spruce underline">
              {siteConfig.email}
            </a>
          ) : (
            <a href={`tel:${siteConfig.phone.e164}`} className="text-spruce underline">
              {siteConfig.phone.display}
            </a>
          )}
          .
        </p>
      </div>
    </section>
  );
}
