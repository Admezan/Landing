import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedContent from "@/components/RelatedContent";
import { articles } from "../articles";

const BASE = "https://xn--eritking-x79c.com";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return { title: "Yazı bulunamadı" };
  const url = `${BASE}/blog/${a.slug}`;
  return {
    title: `${a.title} - Meritking Blog`,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${a.title} - Meritking Blog`,
      description: a.description,
      siteName: "Meritking",
      locale: "tr_TR",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Meritking - güncel giriş adresi" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.title} - Meritking Blog`,
      description: a.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "tr-TR",
    mainEntityOfPage: `${BASE}/blog/${a.slug}`,
    publisher: { "@type": "Organization", name: "Meritking" },
  };

  const faqLd = a.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: a.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;


  const howToLd = a.steps && a.steps.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: a.title,
        description: a.description,
        inLanguage: "tr-TR",
        step: a.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: a.title, item: `${BASE}/blog/${a.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        <Link href="/blog" className="text-primary text-sm font-semibold">
          ← Tüm yazılar
        </Link>
        <article className="mt-6">
          <div className="text-xs text-primary mb-3">
            {a.date} · {a.readingMinutes} dk okuma
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
            {a.title}
          </h1>
          <div className="space-y-5">
            {a.body.map((s, i) =>
              s.type === "h2" ? (
                <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-8">
                  {s.text}
                </h2>
              ) : (
                <p key={i} className="text-gray-300 leading-relaxed">
                  {s.text}
                </p>
              )
            )}
          </div>

          {a.faq && a.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-5">
                Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-4">
                {a.faq.map((f, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-card-bg border border-card-border"
                  >
                    <h3 className="text-sm font-semibold text-white mb-1">{f.q}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        <RelatedContent current={a.slug} />

        <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-card-border text-center">
          <p className="text-gray-400 text-sm">
            18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
