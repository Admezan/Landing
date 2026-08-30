"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Meritking üyeliği ne kadar sürede açılır?",
    a: "Kayıt formu ad, soyad, doğum tarihi, e-posta ve telefon bilgilerinizi ister; doldurması birkaç dakika sürer. Ad soyadınızı kimliğinizdeki gibi yazmanız önemlidir, çünkü ödeme işlemlerinde bu bilgi esas alınır.",
  },
  {
    q: "Hesabımı doğrulamam gerekiyor mu?",
    a: "İlk para çekme talebinde kimlik doğrulaması istenir. Kimlik belgesi, son üç aya ait adres belgesi ve ödeme yönteminizin size ait olduğunu gösteren belge yeterlidir. Doğrulamayı üyelik açar açmaz tamamlamak çekim aşamasında beklemenizi önler.",
  },
  {
    q: "Mobil cihazdan oynamak için uygulama indirmem gerekir mi?",
    a: "Hayır. Telefon ve tablet tarayıcınızdan güncel adrese girerek tüm bölümleri kullanabilirsiniz. Tarayıcı sürümü her zaman en güncel hâli gösterdiği için ayrıca kurulum yapmanıza gerek kalmaz.",
  },
  {
    q: "Yatırım yaptığım yöntemle mi para çekmeliyim?",
    a: "Evet, kural olarak çekim yatırım yaptığınız yöntemle yapılır. Bu, ödemenin hesap sahibine ulaşmasını güvence altına alan bir kaynak doğrulaması gereğidir ve talebin reddedilmesini önler.",
  },
  {
    q: "Bonus çevrim şartı ne anlama geliyor?",
    a: "Çevrim şartı, bonus tutarının çekilebilir hâle gelmesi için belirli bir katta bahis yapılması gerektiğini ifade eder. Şart tamamlanmadan çekim talebi oluşturursanız işlem beklemeye alınabilir, bu yüzden bonusu almadan önce koşulları okuyun.",
  },
  {
    q: "Harcamalarımı ve oyun geçmişimi nereden görebilirim?",
    a: "Hesap panelindeki işlem geçmişi bölümünden tüm yatırım, çekim ve kupon kayıtlarınıza tarih bazlı ulaşabilirsiniz. Bu dökümü düzenli kontrol etmek, bütçenizi gerçek verilerle takip etmenin en sağlıklı yoludur.",
  },
  {
    q: "Hesabıma harcama limiti koyabilir miyim?",
    a: "Evet. Hesap ayarlarından günlük, haftalık veya aylık yatırım limiti tanımlayabilir; dilerseniz hesabınızı belirli bir süre için dondurabilirsiniz. Limit koymak sorumlu oyunun en etkili aracıdır.",
  },
  {
    q: "Sorun yaşadığımda hangi kanaldan yazmalıyım?",
    a: "Giriş sorunu, kupon görüntüleme veya bonus kodu gibi anlık konular için canlı destek en hızlısıdır. Belge gönderimi, ödeme itirazı ve hesap kapatma gibi konular ise e-posta üzerinden yazılı kayıt bırakarak ilerletilmelidir.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="guvenilir" className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Meritking <span className="text-primary">Merak Edilenler</span>
          </h2>
          <p className="text-gray-400">Sıkça sorulan sorular ve cevapları</p>
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
              {/* Cevap her zaman DOM'da: akordeon kapaliyken CSS ile gizlenir,
                  boylece metin taranabilir kalir. */}
              <div className={`px-6 pb-4 ${openIndex === i ? "" : "hidden"}`}>
                <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
