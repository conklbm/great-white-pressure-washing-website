import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getPost, posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${post.meta.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, Component } = post;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    url: absoluteUrl(`/blog/${meta.slug}`),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@id": `${siteConfig.url}/#business` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: meta.title, item: absoluteUrl(`/blog/${meta.slug}`) },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="mx-auto max-w-3xl px-4 py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-loam">
          <Link href="/" className="hover:text-spruce">Home</Link>
          {" / "}
          <Link href="/blog" className="hover:text-spruce">Blog</Link>
        </nav>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-bedrock sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-3 text-sm text-loam">
          <time dateTime={meta.date}>
            {new Date(`${meta.date}T00:00:00`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {" · "}
          {siteConfig.name}
        </p>
        <div className="mt-6">
          <Component />
        </div>
      </article>

      <Cta location={`blog-${meta.slug}-cta`} />
    </>
  );
}
