import Link from "next/link";
import { SITE_CONFIG } from "@/config";
import CtaLink from "@/components/CtaLink";

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              CANLI YAYIN AKTİF
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="text-primary">Meritking</span>
              <br />
              <span className="text-white">TÜRKİYE&apos;DEKİ BAHİSÇİLERİN</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
                KAZANDIRAN ADRESİ
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Spor bahisleri, canlı casino ve poker bir arada. Güvenilir altyapı,
              hızlı ödeme ve kesintisiz 7/24 destek ile kazanmaya hemen başlayın.
            </p>
            <div className="flex flex-wrap gap-4">
              <CtaLink
                href={SITE_CONFIG.registerUrl}
                eylem="kayit"
                konum="hero"
                className="px-8 py-3.5 rounded-xl bg-primary text-black font-bold text-base hover:bg-primary-hover transition glow-primary"
              >
                Hemen Üye Ol
              </CtaLink>
              <CtaLink
                href={SITE_CONFIG.loginUrl}
                eylem="giris"
                konum="hero"
                className="px-8 py-3.5 rounded-xl border border-gray-600 text-white font-semibold text-base hover:border-primary hover:text-primary transition"
              >
                Giriş Yap
              </CtaLink>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <div className="text-center">
                <div className="text-2xl font-black text-primary">20+</div>
                <div className="text-xs text-gray-500">Spor Dalı</div>
              </div>
              <div className="w-px h-10 bg-card-border" />
              <div className="text-center">
                <div className="text-2xl font-black text-primary">2500+</div>
                <div className="text-xs text-gray-500">Casino Oyunu</div>
              </div>
              <div className="w-px h-10 bg-card-border" />
              <div className="text-center">
                <div className="text-2xl font-black text-primary">100K+</div>
                <div className="text-xs text-gray-500">Maç</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-card-border backdrop-blur-sm" />
              <div className="absolute inset-4 rounded-2xl bg-card-bg flex flex-col items-center justify-center gap-4 p-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center">
                  <span className="text-4xl font-black text-black">M</span>
                </div>
                <span className="text-2xl font-bold text-white">Meritking</span>
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  {["Spor", "Casino", "Canlı", "Poker"].map((t) => (
                    <div key={t} className="bg-background rounded-xl p-3 text-center">
                      <span className="text-sm font-semibold text-gray-300">{t}</span>
                    </div>
                  ))}
                </div>
                {/*
                  Rozetler onceden href="#" idi: hicbir yere gitmeyen bag hem
                  kullaniciyi bosa tiklatir hem de arama motoruna bos sinyal
                  verir. Magaza baglantisi bulunmadigi icin ikisi de mobil
                  erisimi anlatan niyet sayfasina baglanir.
                */}
                <div className="flex gap-3 mt-2">
                  <Link href="/meritking-mobil-giris" aria-label="Android'de mobil giriş" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700/80 text-white text-xs font-semibold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.241a.5.5 0 00-.458-.1L12 3.72 6.935 2.141a.5.5 0 00-.612.36l-1.5 6A.5.5 0 005.1 9H7v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V9h1.9a.5.5 0 00.277-.916l-1.5-6a.5.5 0 00-.154-.243zM12 19a3 3 0 100 6 3 3 0 000-6z"/></svg>
                    Android
                  </Link>
                  <Link href="/meritking-mobil-giris" aria-label="iOS'ta mobil giriş" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/80 text-white text-xs font-semibold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"/></svg>
                    iOS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
