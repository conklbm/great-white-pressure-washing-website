import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website and quote requests submitted through it.`,
  path: "/terms",
});

// Legal page — review before launch (TODO in SETUP-TODO.md).
export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-loam">Last updated: July 11, 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-loam">
        <p>
          By using this website, you agree to these terms. If you don&apos;t
          agree, please don&apos;t use the site.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">What this site does</h2>
        <p>
          This website provides information about pressure washing and exterior
          cleaning services in the Mobile, Alabama area and lets you request a
          quote by phone or form. Quote requests are fulfilled by the local
          service provider operating under the {siteConfig.name} brand in your
          area. Submitting a request does not create a service contract; work
          is agreed when you approve a written or spoken quote.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Estimates and content</h2>
        <p>
          Prices, price ranges, and timelines on this site are typical figures
          for guidance only — your quote may differ based on your property,
          surfaces, and site conditions. Blog articles are general information,
          not a guarantee of results for your specific situation; cleaning
          results vary with surface type, age, and how long staining has set in.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Acceptable use</h2>
        <p>
          Don&apos;t misuse the site: no automated scraping of forms, no
          submitting false requests, and no attempting to disrupt the
          site&apos;s operation.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Intellectual property</h2>
        <p>
          Site content, branding, and design are owned by the site operator
          and may not be copied for commercial use without permission.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Disclaimer &amp; liability</h2>
        <p>
          The site is provided &quot;as is&quot; without warranties of any
          kind. To the fullest extent permitted by law, the site operator is
          not liable for indirect, incidental, or consequential damages
          arising from use of the site. Nothing in these terms limits
          liability that cannot be limited under applicable law.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Alabama. Any
          disputes will be handled in the state or federal courts serving
          Mobile County, Alabama.
        </p>

        <h2 className="font-display text-2xl font-semibold text-bedrock">Changes &amp; contact</h2>
        <p>
          We may update these terms; the date above reflects the latest
          version. Questions:{" "}
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
