import type { AnchorHTMLAttributes, ReactNode } from "react";

import { siteConfig } from "@/config/site";

/**
 * Every link that leaves the site opens in a new tab. Centralised here rather
 * than set per-link so the rule covers anything added later — footer profiles,
 * blog links, a future review CTA — without a find-and-replace.
 *
 * `mailto:` and `tel:` are deliberately NOT external: they hand off to a mail
 * or phone app instead of navigating, and `target="_blank"` on them strands an
 * empty tab.
 *
 * NOTE: this keys off the href prefix, which is fine while every outbound link
 * is a literal https:// URL. If an internal redirect route is ever added (a
 * `/go/<slug>` that 30x's to a partner), it leaves the site just as surely and
 * this check would miss it — decide by destination at that point, not prefix.
 */
export function isExternalHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    const bare = (h: string) => h.toLowerCase().replace(/^www\./, "");
    return bare(new URL(href).host) !== bare(new URL(siteConfig.url).host);
  } catch {
    return false; // unparseable → treat as internal, don't guess
  }
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * `rel="noopener noreferrer"` is right for ordinary outbound links. If an
 * affiliate or paid link is ever added, use `rel="sponsored noopener"` and
 * leave `noreferrer` OFF — it strips the Referer some networks attribute by.
 */
export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
