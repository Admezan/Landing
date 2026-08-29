import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meritking - Turkiye'nin En Guvenilir Bahis Sitesi",
  description: "Meritking giris adresi, canli bahis, casino, poker ve canli mac izleme. Guvenilir ve hizli erisim icin tiklayin.",
  keywords: "meritking, meritking giris, canli bahis, casino, poker, spor bahisleri",
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
