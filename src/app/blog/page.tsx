import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "./articles";
import { SITE_URL } from "@/config";

const BASE = SITE_URL;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
  ],
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
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          <span className="text-primary">Meritking</span> Blog
        </h1>
        <p className="text-gray-400 mb-10">
          Oyun dünyasını daha iyi anlamanız için hazırlanmış özgün rehberler ve açıklamalar.
        </p>
        <div className="grid gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary transition"
            >
              <div className="text-xs text-primary mb-2">
                {a.date} · {a.readingMinutes} dk okuma
              </div>
              <h2 className="text-xl font-bold mb-2">{a.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{a.description}</p>
              <span className="inline-block mt-4 text-primary text-sm font-semibold">
                Devamını oku →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
