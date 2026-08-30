import Link from "next/link";
import { toolPages } from "@/app/araclar/tools-content";

/*
 * Ana sayfadan arac sayfalarina ic link.
 * Araclar marka disi sorgu hedefler; ana sayfadan link almalari hem tarama
 * derinligini azaltir hem de ziyaretcinin sitede kalma suresini artirir.
 */
export default function ToolsSection() {
  return (
    <section id="araclar" className="py-16 md:py-24 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Hesaplama <span className="text-primary">Araçları</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Çevrim şartı, kupon maliyeti ve oran matematiği kafa karıştırdığında elle hesap
            yapmayın. Üç araç da ücretsiz, kayıt istemez ve hesaplar tarayıcınızda yapılır.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolPages.map((t) => (
            <Link
              key={t.slug}
              href={`/araclar/${t.slug}`}
              className="flex flex-col p-6 rounded-2xl bg-card-bg border border-card-border hover:border-primary transition group"
            >
              <span className="inline-flex self-start px-2.5 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-[11px] font-semibold mb-4">
                {t.fark}
              </span>
              <h3 className="font-bold text-base mb-2 leading-snug group-hover:text-primary transition">
                {t.h1}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">{t.ozet}</p>
              <span className="inline-block mt-4 text-primary text-sm font-semibold">
                Aracı aç →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
