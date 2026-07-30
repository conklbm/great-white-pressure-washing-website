import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * MDX element styling for blog posts — required by @next/mdx.
 * Internal links go through next/link.
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
    a: ({ href = "", children, ...rest }) =>
      href.startsWith("/") ? (
        <Link href={href} className="font-medium text-spruce underline" {...rest}>
          {children}
        </Link>
      ) : (
        <a href={href} className="font-medium text-spruce underline" {...rest}>
          {children}
        </a>
      ),
    blockquote: (props) => (
      <blockquote className="mt-4 border-l-4 border-signal pl-4 italic text-loam" {...props} />
    ),
    ...components,
  };
}
