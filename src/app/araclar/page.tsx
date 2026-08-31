import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/config";
import { toolPages } from "./tools-content";

const BASE = SITE_URL;

/* Dizin anahtar kelimeleri araclardan turetilir; yeni arac eklendiginde
   liste kendiliginden buyur. */
const dizinKeywords = Array.from(
  new Set([
    "bahis hesaplama araçları",
    "bahis hesaplayıcı",
    "ücretsiz bahis araçları",
    "online bahis hesaplama",
    ...toolPages.flatMap((t) => t.keywords.slice(0, 3)),
  ])
);

export const metadata: Metadata = {
  title: "Bahis Hesaplama Araçları - Çevrim, Oran ve Kupon Hesaplayıcı",
  description:
    "Çevrim şartı, oran-olasılık ve kombine/sistem kupon hesaplayıcıları. Ücretsiz, kayıt gerektirmeden çalışır; hesaplar tarayıcınızda yapılır.",
  keywords: dizinKeywords,
  alternates: { canonical: "/araclar" },
  openGraph: {
    type: "website",
    url: "/araclar",
    siteName: "Meritking",
    locale: "tr_TR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bahis hesaplama araçları" }],
    title: "Bahis Hesaplama Araçları - Çevrim, Oran ve Kupon Hesaplayıcı",
    description: "Çevrim şartı, oran-olasılık ve kupon hesaplayıcıları. Kayıt gerekmez.",
  },
  twitter: { card: "summary_large_image" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "Araçlar", item: `${BASE}/araclar` },
  ],
};

const listLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Bahis hesaplama araçları",
  numberOfItems: toolPages.length,
  itemListElement: toolPages.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE}/araclar/${t.slug}`,
    name: t.h1,
  })),
};

export default function AraclarIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full">
        <nav aria-label="Kırıntı yolu" className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Araçlar</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Bahis <span className="text-primary">Hesaplama Araçları</span>
        </h1>
        <p className="text-gray-400 max-w-3xl leading-relaxed mb-12">
          Çevrim şartından kupon maliyetine kadar hesaplaması kafa karıştıran konular için
          üç araç. Hepsi ücretsiz, kayıt istemez ve hesaplar tarayıcınızda yapılır; girdiğiniz
          hiçbir değer kaydedilmez.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolPages.map((t) => (
            <Link
              key={t.slug}
              href={`/araclar/${t.slug}`}
              className="flex flex-col p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary transition group"
            >
              <span className="inline-flex self-start px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold mb-4">
                {t.fark}
              </span>
              <h2 className="font-bold text-lg mb-2 leading-snug group-hover:text-primary transition">
                {t.h1}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{t.ozet}</p>
              <span className="inline-block mt-4 text-primary text-sm font-semibold">
                Aracı aç →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-card-border">
          <h2 className="text-lg font-bold mb-2">Hesaplar neye göre yapılıyor?</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Araçlar, girdiğiniz değerler üzerinden standart bahis matematiğini uygular; herhangi
            bir platformun güncel kampanya şartlarını okumaz. Çevrim katsayısı, hesaplama tabanı
            ve oyun katkı oranı gibi değerleri kendi kampanya metninizden okuyup girmeniz gerekir.
            Sonuçlar bilgilendirme amaçlıdır ve kazanç taahhüdü içermez.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
