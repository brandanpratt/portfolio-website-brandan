import { SITE_URL, site } from "@/app/data/site";
import { getAllPosts } from "@/app/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${SITE_URL}/blog/${p.slug}</link>
  <guid>${SITE_URL}/blog/${p.slug}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description>${esc(p.description)}</description>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)} — Insights</title>
  <link>${SITE_URL}/blog</link>
  <description>Practical writing on AI, automation and software for growing businesses.</description>
  <language>en-us</language>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
