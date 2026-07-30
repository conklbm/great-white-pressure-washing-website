import Link from "next/link";

import { PhoneLink } from "@/components/PhoneLink";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request Received",
  description: "We got your request and will call you back shortly.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-spruce font-display text-2xl font-bold text-white">
        ✓
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
        Got it — we&apos;ll call you back
      </h1>
      <p className="mt-4 text-lg text-loam">
        Your request is in. Want a faster answer or have a photo of what needs
        cleaning? Call now and we&apos;ll price it on the phone.
      </p>
      <PhoneLink
        location="thank-you"
        className="mt-8 rounded-md bg-signal px-7 py-4 font-display text-lg font-bold uppercase tracking-wide text-bedrock hover:bg-signal/85"
      >
        Call {siteConfig.phone.display}
      </PhoneLink>
      <Link href="/" className="mt-6 text-sm font-medium text-spruce underline">
        Back to home
      </Link>
    </section>
  );
}
