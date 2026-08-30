import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/config";
import { landingPages } from "../landing-content";
import { articles, type Article } from "./articles";

const BASE = SITE_URL;

/*
 * Konu kumeleri ayri bir kategori verisinden degil, niyet sayfalarinin related
 * listelerinden turetilir. Boylece blog gruplamasi ile ic link agi hep ayni
 * kaynaktan besleniyor; iki yerde ayri ayri guncelleme gerekmiyor.
 * Bir makale birden fazla kumede geciyorsa ilk kumeye atanir.
 */
type Grup = { id: string; baslik: string; href: string | null; uyeler: Article[] };

function konuKumeleri(): Grup[] {
  const atanan = new Set<string>();
  const gruplar: Grup[] = [];

  for (const p of landingPages) {
    const uyeler: Article[] = [];
    for (const slug of p.related) {
      if (atanan.has(slug)) continue;
      const makale = articles.find((a) => a.slug === slug);
      if (!makale) continue;
      atanan.add(slug);
      uyeler.push(makale);
    }
    if (uyeler.length > 0) {
      gruplar.push({ id: p.slug, baslik: p.h1, href: `/${p.slug}`, uyeler });
    }
  }

  const kalan = articles.filter((a) => !atanan.has(a.slug));
  if (kalan.length > 0) {
    gruplar.push({ id: "diger", baslik: "Diğer Rehberler", href: null, uyeler: kalan });
  }

  return gruplar;
}

const gruplar = konuKumeleri();

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
  ],
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE}/blog`,
  url: `${BASE}/blog`,
  name: "Meritking Blog",
  description: "Meritking giriş, bonus, ödeme ve oyun rehberleri.",
  inLanguage: "tr-TR",
  isPartOf: { "@id": `${BASE}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: articles.length,
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/blog/${a.slug}`,
      name: a.title,
    })),
  },
};

export const metadata: Metadata = {
  title: "Blog - Meritking Giriş, Bonus ve Rehber Yazıları",
  description: "Meritking giriş, güncel adres, bonus, ödeme ve casino rehberleri. Canlı casino, spor bahisleri ve slot üzerine özgün Meritking blog yazıları.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Meritking",
    locale: "tr_TR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Meritking - güncel giriş adresi" }],
    title: "Blog - Meritking Giriş, Bonus ve Rehber Yazıları",
    description: "Meritking giriş, güncel adres, bonus ve casino rehberleri. Özgün Meritking blog yazıları.",
  },
  twitter: { card: "summary_large_image" },
};

export default function BlogIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-primary">Meritking</span> Blog
        </h1>
        <p className="text-gray-400 mb-4 max-w-3xl leading-relaxed">
          Oyun dünyasını daha iyi anlamanız için hazırlanmış {articles.length} özgün rehber.
          Yazılar konu başlıklarına göre gruplandı; aradığınız konunun başlığına tıklayarak
          o konunun ana sayfasına da geçebilirsiniz.
        </p>

        {/* Konu ici hizli gezinme - sayfa ici capa baglantilari */}
        <nav aria-label="Konu başlıkları" className="flex flex-wrap gap-2 mb-14">
          {gruplar.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-gray-400 hover:border-primary hover:text-primary transition"
            >
              {g.baslik}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {gruplar.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6 pb-3 border-b border-card-border">
                <h2 className="text-2xl font-bold">{g.baslik}</h2>
                {g.href && (
                  <Link
                    href={g.href}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Konu sayfasına git →
                  </Link>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {g.uyeler.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="block p-5 rounded-2xl bg-card-bg border border-card-border hover:border-primary transition"
                  >
                    <div className="text-xs text-primary mb-2">
                      {a.date} · {a.readingMinutes} dk okuma
                    </div>
                    <h3 className="text-base font-bold mb-2 leading-snug">{a.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{a.description}</p>
                    <span className="inline-block mt-3 text-primary text-sm font-semibold">
                      Devamını oku →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
