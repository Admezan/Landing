import Link from "next/link";
import { articles } from "@/app/blog/articles";
import { landingPages } from "@/app/landing-content";
import { SITE_CONFIG } from "@/config";

// İçerik siteleri arası karşılıklı link (footprint düşük tutmak için tek, doğal bağlantı)
const PARTNER = { href: "https://reklam-mrking.com/blog", label: "Meritking rehber yazıları" };

export default function RelatedContent({ current }: { current: string }) {
  const related = articles.filter((a) => a.slug !== current).slice(0, 3);
  // Destek icerigi -> niyet sayfasi geri baglantisi; makaleyi ilgili konu sayfasina baglar
  const hubs = landingPages.filter((p) => p.related.includes(current));

  return (
    <div className="mt-14 space-y-10">
      {/* Meritking giriş — iç anchor sinyali ana sayfaya */}
      <div className="p-6 rounded-2xl bg-card-bg border border-primary/40 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          <Link href="/" className="text-primary hover:underline">
            Meritking giriş
          </Link>{" "}
          adresine mi ulaşmak istiyorsunuz?
        </h2>
        <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
          Meritking güncel giriş adresi, üyelik ve bonus fırsatları için ana sayfamızı ziyaret
          edin. Giriş bağlantısı adres değişikliklerinde otomatik güncellenir.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-primary text-black text-sm font-bold hover:bg-primary-hover transition"
          >
            Meritking Güncel Giriş
          </Link>
          <a
            href={SITE_CONFIG.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
          >
            Üye Girişi
          </a>
        </div>
      </div>

      {/* Konu sayfaları — makaleden ilgili niyet sayfasına geri bağlantı */}
      {hubs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Bu Konunun Ana Sayfası</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {hubs.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="block p-4 rounded-xl bg-card-bg border border-primary/40 hover:border-primary transition"
              >
                <h3 className="text-sm font-semibold mb-1 leading-snug text-primary">{p.h1}</h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* İlgili yazılar — blog içi linkleme */}
      <div>
        <h2 className="text-xl font-bold mb-4">İlgili Yazılar</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block p-4 rounded-xl bg-card-bg border border-card-border hover:border-primary transition"
            >
              <h3 className="text-sm font-semibold mb-1 leading-snug">{a.title}</h3>
              <span className="text-primary text-xs font-semibold">Oku →</span>
            </Link>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Daha fazlası:{" "}
          <a href={PARTNER.href} className="text-primary hover:underline">
            {PARTNER.label}
          </a>
        </p>
      </div>
    </div>
  );
}
