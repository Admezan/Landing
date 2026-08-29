import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Betrabet - Turkiye'nin En Guvenilir Bahis Sitesi",
  description: "Betrabet giris adresi, canli bahis, casino, poker ve canli mac izleme. Guvenilir ve hizli erisim icin tiklayin.",
  keywords: "betrabet, betrabet giris, canli bahis, casino, poker, spor bahisleri",
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
          src="https://cdn.jsdelivr.net/gh/rio-mat/betrabet-config@master/config.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
