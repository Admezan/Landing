import SiteSchema from "@/components/SiteSchema";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GirisSection from "@/components/GirisSection";
import Services from "@/components/Services";
import BonusSection from "@/components/BonusSection";
import PaymentsSection from "@/components/PaymentsSection";
import FAQ from "@/components/FAQ";
import HubSection from "@/components/HubSection";
import ToolsSection from "@/components/ToolsSection";
import TopicsSection from "@/components/TopicsSection";
import GuidesSection from "@/components/GuidesSection";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  /*
   * Ana sayfa yalnizca marka sorgusunu ve kategori duzeyindeki genel sorgulari
   * hedefler. "meritking bonus", "meritking casino" gibi niyet sorgulari
   * bilerek burada YOK - onlar kendi sayfalarinda tanimli; ayni sorgu iki
   * sayfada tekrar ederse sayfalar birbiriyle yarisir.
   */
  keywords: [
    "meritking",
    "meritking giriş",
    "meritking giris",
    "meritking güncel giriş",
    "meritking giriş yap",
    "meritking bahis",
    "meritking resmi site",
    "meritking online casino",
    "meritking para çekme",
    "meritking canlı destek",
    "canlı bahis",
    "canlı casino",
    "spor bahisleri",
    "slot oyunları",
    "poker",
    "rulet",
    "blackjack",
    "bahis siteleri",
    "hoş geldin bonusu",
    "çevrim şartı",
    "bahis oranları",
  ],
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Meritking - güncel giriş adresi" }] },
};

export default function Home() {
  return (
    <>
      <SiteSchema />
      <Header />
      <main className="flex-1">
        <Hero />
        <GirisSection />
        <Services />
        <BonusSection />
        <PaymentsSection />
        <HubSection />
        <ToolsSection />
        <FAQ />
        <TopicsSection />
        <GuidesSection />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
