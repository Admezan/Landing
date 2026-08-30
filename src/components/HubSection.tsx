import Link from "next/link";
import { landingPages } from "@/app/landing-content";

/*
 * Hub bolumu: ana sayfadan niyet sayfalarina tek yonlu, anahtar kelimeli ic link.
 * Ana sayfa marka sorgusunu tutar, buradaki her kart farkli bir arama niyetini
 * kendi sayfasina yonlendirir - boylece sorgular tek sayfada yigilmaz.
 */
export default function HubSection() {
  return (
    <section id="sayfalar" className="py-16 md:py-24 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Meritking <span className="text-primary">Konu Sayfaları</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Aradığınız konu hangisiyse doğrudan o sayfaya gidin. Her sayfa tek bir konuyu
            baştan sona ele alır: adres değişimi, bonus şartları, mobil erişim, casino
            bölümü ve spor bahisleri.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {landingPages.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="block p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary transition group"
            >
              <h3 className="font-bold text-base mb-2 leading-snug group-hover:text-primary transition">
                {p.h1}
              </h3>
              <p className="text-xs text-gray-500 mb-3 italic">“{p.intent}”</p>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {p.description}
              </p>
              <span className="inline-block mt-4 text-primary text-sm font-semibold">
                Sayfaya git →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
