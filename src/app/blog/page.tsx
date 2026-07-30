import Link from "next/link";

import { Cta } from "@/components/Cta";
import { pageMetadata } from "@/lib/seo";
import { posts } from "@/content/posts";

export const metadata = pageMetadata({
  title: "Exterior Cleaning Guides for the Mobile Bay Area",
  description:
    "Rust stains, salt air, graying fences, and everything else Gulf Coast weather does to your home — straight answers from Great White Pressure Washing.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-bedrock">
          Cleaning Answers
        </h1>
        <p className="mt-4 text-lg text-loam">
          What Gulf Coast weather does to your home&apos;s exterior — and what
          actually fixes it.
        </p>
        <div className="mt-10 space-y-6">
          {posts.map(({ meta }) => (
            <article key={meta.slug} className="rounded-lg border border-bedrock/10 p-6 transition-colors hover:border-spruce">
              <h2 className="font-display text-2xl font-semibold text-bedrock">
                <Link href={`/blog/${meta.slug}`} className="hover:text-spruce">
                  {meta.title}
                </Link>
              </h2>
              <p className="mt-2 text-loam">{meta.description}</p>
              <p className="mt-3 text-sm text-loam/80">
                <time dateTime={meta.date}>
                  {new Date(`${meta.date}T00:00:00`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>
            </article>
          ))}
        </div>
      </section>
      <Cta location="blog-index-cta" />
    </>
  );
}
