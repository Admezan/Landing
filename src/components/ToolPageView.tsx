import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import { SITE_CONFIG, SITE_URL } from "@/config";
import { articles } from "@/app/blog/articles";
import EmbedKutusu from "@/components/tools/EmbedKutusu";
import { getToolPage, type ToolPage } from "@/app/araclar/tools-content";

export function toolMetadata(slug: string): Metadata {
  const t = getToolPage(slug);
  if (!t) return {};
  const url = `${SITE_URL}/araclar/${t.slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/araclar/${t.slug}` },
    openGraph: {
      type: "website",
      url,
      title: t.title,
      description: t.description,
      siteName: "Meritking",
      locale: "tr_TR",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export default function ToolPageView({
  page: t,
  children,
}: {
  page: ToolPage;
  children: ReactNode;
}) {
  const url = `${SITE_URL}/araclar/${t.slug}`;
  const related = t.related
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": url,
    url,
    name: t.h1,
    description: t.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "tr-TR",
    dateModified: t.updated,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Araçlar", item: `${SITE_URL}/araclar` },
      { "@type": "ListItem", position: 3, name: t.h1, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Header />
      <main className="flex-1 w-full">
        <nav aria-label="Kırıntı yolu" className="max-w-3xl mx-auto px-4 pt-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/araclar" className="hover:text-primary transition">Araçlar</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{t.h1}</span>
        </nav>

        <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">{t.h1}</h1>
          <p className="text-gray-400 leading-relaxed mb-2">{t.description}</p>
          <p className="text-xs text-primary mb-8">Son güncelleme: {t.updated}</p>

          {/* Arac sayfanin ustunde: kullanici once araci gorsun, aciklama altta kalsin */}
          {children}

          <article className="mt-14 space-y-5">
            {t.body.map((s, i) =>
              s.type === "h2" ? (
                <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-10">
                  {s.text}
                </h2>
              ) : (
                <p key={i} className="text-gray-300 leading-relaxed">
                  {s.text}
                </p>
              )
            )}
          </article>

          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {t.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-semibold text-white mb-1">{f.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <EmbedKutusu slug={t.slug} baslik={t.h1} />

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Konuyla İlgili Rehberler</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="block p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary transition"
                  >
                    <h3 className="text-sm font-semibold mb-1 leading-snug">{a.title}</h3>
                    <span className="text-primary text-xs font-semibold">Oku →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-primary/40 text-center">
            <h2 className="text-xl font-bold mb-2">
              <Link href="/" className="text-primary hover:underline">Meritking giriş</Link>{" "}
              adresine ulaşın
            </h2>
            <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
              Giriş bağlantısı adres değişikliklerinde otomatik güncellenir.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <CtaLink
                href={SITE_CONFIG.loginUrl}
                eylem="giris"
                konum="arac-sayfasi-cta"
                className="px-6 py-2.5 rounded-lg bg-primary text-black text-sm font-bold hover:bg-primary-hover transition"
              >
                Üye Girişi
              </CtaLink>
              <CtaLink
                href={SITE_CONFIG.registerUrl}
                eylem="kayit"
                konum="arac-sayfasi-cta"
                className="px-6 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
              >
                Üye Ol
              </CtaLink>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-card-bg border border-card-border text-center">
            <p className="text-gray-400 text-sm">
              18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
