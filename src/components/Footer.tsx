import Link from "next/link";
import { socialProfiles, type SocialPlatform } from "@/social";

const paymentMethods = [
  "Papara", "Banka Havalesi", "Kripto", "Visa", "Mastercard", "Bitcoin", "USDT", "Cepbank",
];

/*
 * Sosyal simgeler onceden href="#" ile yayindaydi: hicbir yere gitmeyen bag hem
 * kullaniciyi bosa tiklatir hem de arama motoruna bos sinyal verir. Adresler
 * artik src/social.ts icinde tek kaynaktan geliyor; liste bosken bolum hic
 * cizilmez, adres girildiginde hem burasi hem Organization semasindaki sameAs
 * kendiliginden dolar.
 */
const SOCIAL_ICONS: Record<SocialPlatform, React.ReactNode> = {
  telegram: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.8 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.8 13 2.2 11.5c-1-.3-1-1 .2-1.5L20.6 3c.8-.3 1.5.2 1.3 1.3Z"/></svg>
  ),
  x: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3Z"/></svg>
  ),
  instagram: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.9-11.1a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z"/></svg>
  ),
  youtube: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.5-.4-5.2a2.7 2.7 0 0 0-1.9-1.9C19 4.5 12 4.5 12 4.5s-7 0-8.7.4a2.7 2.7 0 0 0-1.9 1.9C1 8.5 1 12 1 12s0 3.5.4 5.2a2.7 2.7 0 0 0 1.9 1.9c1.7.4 8.7.4 8.7.4s7 0 8.7-.4a2.7 2.7 0 0 0 1.9-1.9C23 15.5 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3Z"/></svg>
  ),
  diger: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.8 10.2a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5m-2.1-4.4a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/></svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-card-border pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center font-black text-black text-base">
                M
              </div>
              <span className="text-lg font-bold">
                <span className="text-primary">Merit</span>
                <span className="text-white">king</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Türkiye&apos;nin en güvenilir online bahis ve casino platformu. Lisanslı ve güvenli.
            </p>
            {/* Adresler src/social.ts icinde; liste bosken bolum cizilmez. */}
            {socialProfiles.length > 0 && (
              <div className="flex gap-3 mt-5">
                {socialProfiles.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition"
                  >
                    {SOCIAL_ICONS[s.platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary">Hızlı Linkler</h4>
            <ul className="space-y-2">
              {[
                { label: "Meritking Giriş", href: "/" },
                { label: "Meritking Güncel Giriş Adresi", href: "/meritking-guncel-giris-adresi" },
                { label: "Meritking Bonus", href: "/meritking-bonus" },
                { label: "Meritking Para Yatırma", href: "/meritking-para-yatirma" },
                { label: "Meritking Casino", href: "/meritking-casino" },
                { label: "Meritking Spor Bahisleri", href: "/meritking-spor-bahisleri" },
                { label: "Meritking Mobil Giriş", href: "/meritking-mobil-giris" },
                { label: "Blog", href: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-primary transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary">Destek</h4>
            <ul className="space-y-2">
              {[
                { label: "Çevrim Şartı Hesaplama", href: "/araclar/cevrim-sarti-hesaplama" },
                { label: "Kupon Hesaplama", href: "/araclar/kupon-hesaplama" },
                { label: "Oran - Olasılık Çevirici", href: "/araclar/oran-olasilik-cevirici" },
                { label: "Meritking Güvenilir mi?", href: "/meritking-guvenilir-mi" },
                { label: "SSS", href: "/#guvenilir" },
                { label: "Üyelik Nasıl Açılır?", href: "/blog/meritking-uyelik-nasil-acilir" },
                { label: "Para Çekme Süreleri", href: "/blog/para-cekme-suresi-ve-limitleri" },
                { label: "Hesap Doğrulama (KYC)", href: "/blog/hesap-dogrulama-kyc-neden-gerekli" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-primary transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary">Ödeme Yöntemleri</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((p) => (
                <span
                  key={p}
                  className="text-xs px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-gray-400"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-card-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-bg border border-card-border">
              <div className="w-2 h-2 rounded-full bg-accent-green" />
              <span className="text-xs text-gray-400">Lisanslı</span>
            </div>
            <span className="text-xs text-gray-600">Lisans No: OGL/2024/1248/0716</span>
          </div>
          <p className="text-xs text-gray-600 text-center">
            &copy; 2026 Meritking. Tüm hakları saklıdır. 18+ Kumar bağımlılık yapabilir.
          </p>
        </div>
      </div>
    </footer>
  );
}
