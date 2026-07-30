import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { towns } from "@/content/towns";

/**
 * Generated from config/content — indexable, canonical URLs only.
 * (thank-you is noindex and /api is disallowed; neither belongs here.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["/", "/services", "/about", "/contact", "/blog", "/privacy", "/terms"].map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: now,
    })
  );

  const servicePages = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
  }));

  const townPages = towns.map((t) => ({
    url: absoluteUrl(`/${t.slug}`),
    lastModified: now,
  }));

  const blogPages = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.meta.slug}`),
    lastModified: new Date(`${p.meta.date}T00:00:00`),
  }));

  return [...staticPages, ...servicePages, ...townPages, ...blogPages];
}
