import Link from "next/link";
const paymentMethods = [
  "Papara", "Banka Havalesi", "Kripto", "Visa", "Mastercard", "Bitcoin", "USDT", "Cepbank",
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: "Facebook", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: "Instagram", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: "YouTube", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#0f1119" d="M9.545 15.568V8.432L15.818 12z"/></svg> },
];

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
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
