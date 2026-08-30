import SiteSchema from "@/components/SiteSchema";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GirisSection from "@/components/GirisSection";
import Services from "@/components/Services";
import BonusSection from "@/components/BonusSection";
import PaymentsSection from "@/components/PaymentsSection";
import FAQ from "@/components/FAQ";
import HubSection from "@/components/HubSection";
import TopicsSection from "@/components/TopicsSection";
import GuidesSection from "@/components/GuidesSection";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
        <FAQ />
        <TopicsSection />
        <GuidesSection />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
