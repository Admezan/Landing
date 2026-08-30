import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";
import { landingPages } from "./landing-content";
import { toolPages } from "./araclar/tools-content";
import { SITE_URL } from "@/config";

const base = SITE_URL;

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    // Niyet sayfalari - ana sayfadan sonra en yuksek oncelikli katman
    ...landingPages.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Arac sayfalari - marka disi sorgulari hedefler, dogal baglanti potansiyeli yuksek
    { url: `${base}/araclar`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...toolPages.map((t) => ({
      url: `${base}/araclar/${t.slug}`,
      lastModified: new Date(t.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // Destek icerigi - niyet sayfalarini besleyen konu kumesi
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
