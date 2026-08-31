import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";
import { landingPages } from "./landing-content";
import { toolPages } from "./araclar/tools-content";
import { SITE_URL } from "@/config";

const base = SITE_URL;

export const dynamic = "force-static";

/*
 * lastmod gercek icerik tarihinden turetilir.
 *
 * Onceden dizin sayfalari new Date() aliyordu: icerik degismese de her derleme
 * "guncellendi" diyordu. Tarayicilar dogrulanmayan tazelik sinyalini zamanla
 * dikkate almaz; bu yuzden tarih, o sayfanin listeledigi en yeni icerige baglandi.
 */
function enYeniTarih(tarihler: string[]): Date {
  // Tarihler ISO (YYYY-MM-DD) oldugu icin metin karsilastirmasi kronolojiktir.
  return new Date(tarihler.reduce((a, b) => (a > b ? a : b)));
}

const sonMakale = enYeniTarih(articles.map((a) => a.date));
const sonArac = enYeniTarih(toolPages.map((t) => t.updated));
const sonNiyet = enYeniTarih(landingPages.map((p) => p.updated));
const sonGuncelleme = new Date(
  Math.max(sonMakale.getTime(), sonArac.getTime(), sonNiyet.getTime())
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: sonGuncelleme, changeFrequency: "daily", priority: 1 },
    // Niyet sayfalari - ana sayfadan sonra en yuksek oncelikli katman
    ...landingPages.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Arac sayfalari - marka disi sorgulari hedefler, dogal baglanti potansiyeli yuksek
    { url: `${base}/araclar`, lastModified: sonArac, changeFrequency: "monthly", priority: 0.8 },
    ...toolPages.map((t) => ({
      url: `${base}/araclar/${t.slug}`,
      lastModified: new Date(t.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/blog`, lastModified: sonMakale, changeFrequency: "weekly", priority: 0.7 },
    // Destek icerigi - niyet sayfalarini besleyen konu kumesi
    ...articles.map((a) => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
