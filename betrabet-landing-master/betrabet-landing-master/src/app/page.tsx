import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GirisSection from "@/components/GirisSection";
import Services from "@/components/Services";
import BonusSection from "@/components/BonusSection";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <GirisSection />
        <Services />
        <BonusSection />
        <FAQ />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
