import type { Metadata } from "next";
import { Bangers, Inter, Oswald } from "next/font/google";

import { Analytics } from "@/components/Analytics";
import { AttributionCapture } from "@/components/AttributionCapture";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StickyCallBar } from "@/components/StickyCallBar";
import { siteConfig } from "@/config/site";
import { towns } from "@/content/towns";

import "./globals.css";

/** Brand voice — his hero wordmark's face. Wordmark + homepage h1 only. */
const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Pressure Washing Mobile AL | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  ...(siteConfig.searchConsoleVerification
    ? { verification: { google: siteConfig.searchConsoleVerification } }
    : {}),
};

/**
 * LocalBusiness structured data — Phase 1 service-area business:
 * NO street address (by design, see the rank-and-rent strategy doc). Address
 * and hours render automatically once set in src/config/site.ts (Phase 2).
 */
function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone.e164,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    description: siteConfig.description,
    ...(Object.keys(siteConfig.social).length
      ? { sameAs: Object.values(siteConfig.social) }
      : {}),
    areaServed: towns.map((t) => ({
      "@type": "City",
      name: `${t.name}, ${siteConfig.state}`,
    })),
    ...(siteConfig.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.state,
            postalCode: siteConfig.address.zip,
            addressCountry: "US",
          },
        }
      : {}),
    ...(siteConfig.hours ? { openingHours: siteConfig.hours } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${oswald.variable} ${inter.variable}`}
    >
      <body>
        <JsonLd data={localBusinessJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-bedrock"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCallBar />
        <AttributionCapture />
        <Analytics />
        {/*
          DNI SLOT (Dynamic Number Insertion) — intentionally empty.
          When a call-tracking vendor (CallRail / WhatConverts / Twilio DIY)
          is switched on, its snippet goes here as a next/script tag with
          strategy="afterInteractive". The vendor swaps the displayed number
          by traffic source; nothing else on the site changes because every
          number renders from siteConfig.phone. See LEAD-TRACKING.md.
        */}
      </body>
    </html>
  );
}
