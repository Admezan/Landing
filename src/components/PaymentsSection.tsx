import Link from "next/link";

const yontemler = [
  { ad: "Papara", not: "Elektronik cüzdan. Hafta sonu dahil çalışır, onay sonrası en hızlı sonuçlanan seçenektir." },
  { ad: "Banka Havalesi", not: "Üst limitleri en geniş yöntem. Bankaların çalışma saatlerine bağlıdır, hafta sonu ilk iş gününe sarkar." },
  { ad: "Kripto", not: "Banka saatlerinden bağımsızdır. Süre ağ yoğunluğuna göre değişir; adres girişi geri alınamaz." },
  { ad: "Kart", not: "Yatırımda hızlıdır. Kartın hesap sahibi adına kayıtlı olması zorunludur." },
];

const rehberler = [
  { baslik: "Para çekme süresi ve limitleri", href: "/blog/para-cekme-suresi-ve-limitleri" },
  { baslik: "Çekim talebi neden bekliyor?", href: "/blog/para-cekme-talebi-neden-bekliyor" },
  { baslik: "Hesap doğrulama (KYC) neden gerekli?", href: "/blog/hesap-dogrulama-kyc-neden-gerekli" },
];

export default function PaymentsSection() {
  return (
    <section id="odeme" className="py-16 md:py-24 bg-card-bg/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ödeme ve <span className="text-primary">Hesap İşlemleri</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Çekim süresini belirleyen tek şey yöntem değildir. Doğrulamanın tamamlanmış olması,
            açık bonus bulunmaması ve yatırımla aynı yöntemin seçilmesi süreci doğrudan etkiler.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {yontemler.map((y) => (
            <div key={y.ad} className="p-5 rounded-xl bg-card-bg border border-card-border">
              <h3 className="font-bold mb-2 text-primary">{y.ad}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{y.not}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-card-bg border border-card-border">
          <h3 className="font-bold mb-4">Ayrıntılı rehberler</h3>
          <ul className="space-y-2">
            {rehberler.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-sm text-gray-400 hover:text-primary transition">
                  {r.baslik} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
