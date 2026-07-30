declare module "*.mdx" {
  import type { ComponentType } from "react";

  /** Frontmatter-style metadata each blog post exports. */
  export const meta: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
