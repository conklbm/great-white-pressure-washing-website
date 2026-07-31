/**
 * Blog post registry. Posts are MDX files in content/blog/ that export a
 * `meta` object. Register new posts here — static imports keep the build
 * deterministic (no dynamic-import globbing).
 */
import type { ComponentType } from "react";

import RustStains, {
  meta as rustStainsMeta,
} from "../../content/blog/how-to-remove-rust-stains-concrete.mdx";
import SaltAir, {
  meta as saltAirMeta,
} from "../../content/blog/salt-air-home-exterior-mobile-bay.mdx";
import GrayFence, {
  meta as grayFenceMeta,
} from "../../content/blog/why-your-fence-turned-gray.mdx";

export type PostMeta = {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  slug: string;
};

export type Post = { meta: PostMeta; Component: ComponentType };

export const posts: Post[] = [
  { meta: rustStainsMeta, Component: RustStains },
  { meta: saltAirMeta, Component: SaltAir },
  { meta: grayFenceMeta, Component: GrayFence },
].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
