import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import { SITE_CONFIG, SITE_URL } from "@/config";
import { articles } from "@/app/blog/articles";
import { getLandingPage, type LandingPage } from "@/app/landing-content";

/** Niyet sayfalari icin ortak metadata uretimi - her sayfa kendi canonical'ini alir */
export function landingMetadata(slug: string): Metadata {
  const p = getLandingPage(slug);
  if (!p) return {};
  const url = `${SITE_URL}/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      type: "article",
      url,
      title: p.title,
      description: p.description,
      siteName: "Meritking",
      locale: "tr_TR",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: p.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
    },
  };
}

export default function LandingPageView({ page: p }: { page: LandingPage }) {
  const url = `${SITE_URL}/${p.slug}`;
  const related = p.related
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: p.h1,
    description: p.description,
    inLanguage: "tr-TR",
    dateModified: p.updated,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: p.h1, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Header />
      <main className="flex-1 w-full">
        {/* Kirintili yol - hem kullanici hem tarayici icin ic link sinyali */}
        <nav aria-label="Kırıntı yolu" className="max-w-3xl mx-auto px-4 pt-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">{p.h1}</span>
        </nav>

        <article className="max-w-3xl mx-auto px-4 pt-6 pb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            {p.h1}
          </h1>
          <p className="text-xs text-primary mb-8">Son güncelleme: {p.updated}</p>

          <div className="space-y-5">
            {p.body.map((s, i) =>
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
          </div>

          {/* Donusum blogu */}
          <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-primary/40 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              <Link href="/" className="text-primary hover:underline">Meritking giriş</Link>{" "}
              adresine ulaşın
            </h2>
            <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
              Giriş bağlantısı adres değişikliklerinde otomatik güncellenir; her zaman o an
              geçerli olan adrese yönlendirir.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <CtaLink
                href={SITE_CONFIG.loginUrl}
                eylem="giris"
                konum="niyet-sayfasi-cta"
                className="px-6 py-2.5 rounded-lg bg-primary text-black text-sm font-bold hover:bg-primary-hover transition"
              >
                Üye Girişi
              </CtaLink>
              <CtaLink
                href={SITE_CONFIG.registerUrl}
                eylem="kayit"
                konum="niyet-sayfasi-cta"
                className="px-6 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
              >
                Üye Ol
              </CtaLink>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5">
              Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {p.faq.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-semibold text-white mb-1">{f.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Destek icerigine ic link - konu kumesini birbirine bagliyor */}
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

          <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-card-border text-center">
            <p className="text-gray-400 text-sm">
              18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
