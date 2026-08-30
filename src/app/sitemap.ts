import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";

const base = "https://xn--eritking-x79c.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "weekly" as const,
      priority: a.slug.startsWith("meritking-") ? 0.9 : 0.6,
    })),
  ];
}
