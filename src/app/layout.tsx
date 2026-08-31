import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  // Turkce s, g, i, I harfleri latin-ext alt kumesinde; olmadan yedek fontla cizilir
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Meritking Giriş - Güncel Adres, Canlı Bahis ve Casino",
  description: "Meritking giriş adresi, canlı bahis, casino, poker ve canlı maç izleme. Güvenilir ve hızlı erişim için tıklayın.",
  /*
   * Burada bilerek keywords YOK.
   * Layout'a konan liste tum sayfalara miras kalir; boylece 404 ve iframe
   * icin uretilen embed sayfalari da marka sorgularini tasir ve her sayfa
   * ayni sorgu kumesiyle gorunur. Her sayfa kendi hedefini kendi tanimlar;
   * marka sorgulari ana sayfada (app/page.tsx) toplanir.
   */
  openGraph: {
    type: "website",
    siteName: "Meritking",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meritking - güncel giriş adresi",
      },
    ],
    title: "Meritking Giriş - Güncel Adres, Canlı Bahis ve Casino",
    description: "Meritking giriş adresi: canlı bahis, casino, poker ve canlı maç izleme. Güvenilir ve hızlı erişim.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <Script
          src="/config.js"
          strategy="beforeInteractive"
        />
        {/* Olcum - saglayici ve kimlik public/analytics.js icinden ayarlanir.
            Sayfa cizimini geciktirmemesi icin etkilesim sonrasina birakilir. */}
        <Script
          src="/analytics.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
