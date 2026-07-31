import Link from "next/link";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { towns } from "@/content/towns";
import { LogoMark, Wordmark } from "./Header";
import { PhoneLink } from "./PhoneLink";

export function Footer() {
  return (
    <footer className="bg-bedrock pb-24 text-white/80 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} — home`}>
              <LogoMark className="h-12 w-auto" />
              <Wordmark light />
            </Link>
            <p className="mt-4 text-sm">
              House washing, roof cleaning, and pressure washing across the
              Mobile Bay Area — both shores of the bay.
            </p>
            <PhoneLink
              location="footer"
              className="mt-4 inline-block font-display text-xl font-semibold text-white underline decoration-signal decoration-2 underline-offset-4"
            />
            {siteConfig.email ? (
              <p className="mt-1 text-sm">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </p>
            ) : null}
            <div className="mt-4 flex gap-4 text-sm">
              {siteConfig.social.map(({ label, href }) => (
                <a key={label} href={href} rel="noopener" className="hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service areas">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Service Areas
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {towns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="hover:text-white">
                    {t.name}, {siteConfig.state}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Get a Free Quote</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Serving{" "}
            {siteConfig.city} and surrounding communities in Mobile and Baldwin
            counties, {siteConfig.stateFull}.
          </p>
        </div>
      </div>
    </footer>
  );
}
