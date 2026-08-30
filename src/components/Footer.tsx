import Link from "next/link";
const paymentMethods = [
  "Papara", "Banka Havalesi", "Kripto", "Visa", "Mastercard", "Bitcoin", "USDT", "Cepbank",
];

/*
 * Sosyal simgeler onceden href="#" ile yayindaydi: hicbir yere gitmeyen bag hem
 * kullaniciyi bosa tiklatir hem de arama motoruna bos sinyal verir. Gercek hesap
 * adresleri tanimlanana kadar liste bos; adres girildiginde bolum kendiliginden
 * acilir ve ayni adresler Organization semasina sameAs olarak da eklenmelidir.
 * Onceki simge kodu git gecmisinde 36c30d6 oncesi surumlerde duruyor.
 */
const socialLinks: { label: string; href: string; icon: React.ReactNode }[] = [];

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
            {/*
              Sosyal simgeler href="#" ile duruyordu: hicbir yere gitmeyen bag,
              hem kullaniciyi bosa tiklatir hem de arama motoruna bos sinyal verir.
              Gercek hesap adresleri tanimlanana kadar bolum gizli; adresler
              girildiginde socialLinks doldurulup Organization semasina sameAs
              olarak da eklenmelidir.
            */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition"
                  >
                    {s.icon}
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
