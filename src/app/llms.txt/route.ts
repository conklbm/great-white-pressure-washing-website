import { absoluteUrl, siteConfig } from "@/config/site";
import { posts } from "@/content/posts";
import { services } from "@/content/services";
import { towns } from "@/content/towns";

/**
 * /llms.txt — a curated markdown map of the site for LLMs / AI agents.
 * Generated from config + content so it never drifts (same philosophy as
 * sitemap.ts). See the global CLAUDE.md "Machine/agent readability" menu.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `${siteConfig.name} is a pressure washing and soft washing company serving ${siteConfig.city}, ` +
      `${siteConfig.stateFull} and the surrounding towns on both sides of Mobile Bay. ` +
      `Services include house/soft washing, driveway and concrete cleaning, roof cleaning, ` +
      `and commercial pressure washing. Every job gets a free, written quote before any work ` +
      `begins. Service-area business — no walk-in address.`
  );
  lines.push("");

  lines.push("## Services");
  for (const s of services) {
    lines.push(`- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.card}`);
  }
  lines.push("");

  lines.push("## Service areas");
  for (const t of towns) {
    lines.push(`- [${t.name}, ${siteConfig.state}](${absoluteUrl(`/${t.slug}`)}): ${t.card}`);
  }
  lines.push("");

  lines.push("## Guides");
  for (const p of posts) {
    lines.push(`- [${p.meta.title}](${absoluteUrl(`/blog/${p.meta.slug}`)}): ${p.meta.description}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About](${absoluteUrl("/about")}): How the company works and what to expect.`);
  lines.push(`- [Contact](${absoluteUrl("/contact")}): Request a free quote by phone or form.`);
  lines.push(`- [Blog](${absoluteUrl("/blog")}): Pressure washing cost guides, soft-wash safety, and cleaning-frequency advice.`);
  lines.push("");

  lines.push(
    `Contact: ${siteConfig.phone.display}${siteConfig.email ? ` · ${siteConfig.email}` : ""}`
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
