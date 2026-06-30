import { blogs } from "@/lib/data/blogs";

export async function GET() {
  const baseUrl = "https://www.prajyotporje.in";

  const feedItems = blogs
    .map((post) => {
      const parsedDate = Date.parse(post.date);
      const pubDate = Number.isNaN(parsedDate)
        ? new Date().toUTCString()
        : new Date(parsedDate).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Prajyot Porje</title>
    <link>${baseUrl}/blog</link>
    <description>Engineering logs, SaaS execution, and product engineering insights from Prajyot Porje.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
