"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Betrabet giris adresine nasil ulasabilirim?",
    a: "Betrabet giris adresine bu sayfa uzerinden kolayca ulasabilirsiniz. Adres degisikliklerinde guncel link bu sayfada paylasilmaktadir. Sosyal medya hesaplarimizi takip ederek de en yeni adresi ogrenebilirsiniz.",
  },
  {
    q: "Betrabet hos geldin bonusu nedir?",
    a: "Betrabet'e yeni uye olan kullanicilar icin cazip hos geldin bonuslari sunulmaktadir. Ilk para yatirma isleminizde %100'e varan bonus kazanabilirsiniz. Detayli bilgi icin promosyonlar sayfamizi ziyaret edin.",
  },
  {
    q: "Betrabet'te hangi bahis secenekleri var?",
    a: "Betrabet'te futbol, basketbol, tenis, voleybol dahil 20'den fazla spor dalinda pre-match ve canli bahis secenekleri bulunmaktadir. 4.000'den fazla bahis secenegi ile genis bir yelpaze sunulmaktadir.",
  },
  {
    q: "Betrabet casino oyunlari guvenilir mi?",
    a: "Betrabet casino oyunlari, dunyanin en bilinen oyun saglayicilari tarafindan sunulmaktadir. Tum oyunlar bagimsiz denetim kuruluslari tarafindan test edilmekte ve adil oyun sertifikalarina sahiptir.",
  },
  {
    q: "Canli casino nasil oynanir?",
    a: "Canli casino bolumunde gercek krupiyerler esliginde blackjack, rulet, baccarat ve daha fazla oyun oynayabilirsiniz. HD kalitesinde canli yayin ile gercek casino deneyimini evinizden yasayin.",
  },
  {
    q: "Cekim islemleri ne kadar surede tamamlanir?",
    a: "Betrabet'te cekim islemleri ortalama 15-30 dakika icinde tamamlanmaktadir. Banka havalesi, papara, kripto para ve diger odeme yontemleri ile hizli ve guvenli cekim yapabilirsiniz.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="guvenilir" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Betrabet <span className="text-primary">Merak Edilenler</span>
          </h2>
          <p className="text-gray-400">Sikca sorulan sorular ve cevaplari</p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-card-bg border border-card-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-card-border/30 transition"
              >
                <span className="font-semibold text-sm pr-4">{f.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-primary transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
