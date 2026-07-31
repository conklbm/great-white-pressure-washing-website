import Script from "next/script";

import { siteConfig } from "@/config/site";

/**
 * GA4 — non-blocking via next/script.
 *
 * Skipped unless the ID is set AND this is a production build, so local dev
 * pageviews never land in the property. A brand-new property is a baseline
 * you'll measure months of real traffic against; seeding it with our own
 * dev-server hits quietly corrupts that.
 */
export function Analytics() {
  if (!siteConfig.ga4Id || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${siteConfig.ga4Id}');`}
      </Script>
    </>
  );
}
