import Script from "next/script";

import { siteConfig } from "@/config/site";

/**
 * GA4 — renders nothing until siteConfig.ga4Id is set (config TODO), so the
 * placeholder never ships a broken request. Non-blocking via next/script.
 */
export function Analytics() {
  if (!siteConfig.ga4Id) return null;
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
