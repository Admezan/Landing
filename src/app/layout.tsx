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
  keywords: "meritking, meritking giriş, meritking güncel giriş, canlı bahis, casino, poker, spor bahisleri",
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
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
