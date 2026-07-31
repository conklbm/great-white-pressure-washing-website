import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { ExternalLink, isExternalHref } from "@/components/ExternalLink";

/**
 * MDX element styling for blog posts — required by @next/mdx.
 * Internal links go through next/link; anything leaving the site is routed
 * through ExternalLink so it opens in a new tab. Handled here so every post,
 * including ones written later, gets it without the author remembering.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-10 font-display text-2xl font-bold uppercase tracking-wide text-bedrock"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 font-display text-xl font-semibold text-bedrock" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-loam" {...props} />,
    ul: (props) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-loam" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-loam" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-semibold text-bedrock" {...props} />,
    a: ({ href = "", children, ...rest }) => {
      const className = "font-medium text-spruce underline";
      if (isExternalHref(href)) {
        return (
          <ExternalLink href={href} className={className} {...rest}>
            {children}
          </ExternalLink>
        );
      }
      // Internal paths get client-side nav; mailto:/tel:/# stay plain anchors.
      return href.startsWith("/") ? (
        <Link href={href} className={className} {...rest}>
          {children}
        </Link>
      ) : (
        <a href={href} className={className} {...rest}>
          {children}
        </a>
      );
    },
    blockquote: (props) => (
      <blockquote className="mt-4 border-l-4 border-signal pl-4 italic text-loam" {...props} />
    ),
    ...components,
  };
}
