import Link from "next/link";

const bloklar = [
  {
    baslik: "\u00c7ekim talebi beklemede kal\u0131yor",
    metin:
      "Bekleme \u00e7o\u011fu zaman bir ar\u0131za de\u011fil, s\u00fcrecin normal a\u015famas\u0131d\u0131r. Uzamas\u0131 genellikle \u00fc\u00e7 nedenden birine ba\u011fl\u0131d\u0131r: kimlik do\u011frulamas\u0131 tamamlanmam\u0131\u015ft\u0131r, hesapta \u00e7evrimi bitmemi\u015f bir bonus vard\u0131r ya da se\u00e7ilen \u00e7ekim y\u00f6ntemi yat\u0131r\u0131m yap\u0131lan y\u00f6ntemden farkl\u0131d\u0131r. \u00dc\u00e7\u00fc de kullan\u0131c\u0131 taraf\u0131nda \u00e7\u00f6z\u00fclebilir; do\u011frulamay\u0131 \u00fcyelik a\u00e7ar a\u00e7maz tamamlamak beklemeyi b\u00fcy\u00fck \u00f6l\u00e7\u00fcde ortadan kald\u0131r\u0131r.",
    href: "/blog/para-cekme-talebi-neden-bekliyor",
    link: "Yedi olas\u0131 neden ve \u00e7\u00f6z\u00fcm\u00fc",
  },
  {
    baslik: "Giri\u015f yap\u0131lam\u0131yor",
    metin:
      "Giri\u015f sorunlar\u0131n\u0131n b\u00fcy\u00fck b\u00f6l\u00fcm\u00fc art\u0131k ge\u00e7erli olmayan bir adres kullanmaktan kaynaklan\u0131r. Taray\u0131c\u0131 \u00f6nbelle\u011fi eski s\u00fcr\u00fcm\u00fc tutuyorsa da benzer bir tablo \u00e7\u0131kar; gizli sekmede denemek bunu h\u0131zla ay\u0131rt ettirir. \u015eifreyle ilgili bir sorun varsa s\u0131f\u0131rlama ba\u011flant\u0131s\u0131 kay\u0131tl\u0131 e-posta adresine gider ve tek kullan\u0131ml\u0131kt\u0131r.",
    href: "/blog/sifremi-unuttum-nasil-sifirlarim",
    link: "\u015eifre s\u0131f\u0131rlama ad\u0131mlar\u0131",
  },
  {
    baslik: "Kimlik do\u011frulamas\u0131 reddediliyor",
    metin:
      "Reddin en yayg\u0131n nedeni belge kalitesidir: bulan\u0131k foto\u011fraf, kesilmi\u015f k\u00f6\u015feler veya parlama y\u00fcz\u00fcnden okunamayan alanlar. \u0130kinci s\u0131k neden adres belgesinin tarihinin eski olmas\u0131d\u0131r. \u00dc\u00e7\u00fcnc\u00fcs\u00fc belgedeki isim ile hesap ad\u0131n\u0131n farkl\u0131 yaz\u0131lmas\u0131d\u0131r. Belgeyi d\u00fcz zeminde, \u00fcstten ve g\u00fcn \u0131\u015f\u0131\u011f\u0131nda \u00e7ekmek bu \u00fc\u00e7 sorunun \u00e7o\u011funu ba\u015ftan \u00f6nler.",
    href: "/blog/hesap-dogrulama-kyc-neden-gerekli",
    link: "Do\u011frulama s\u00fcreci nas\u0131l i\u015fler",
  },
  {
    baslik: "Hesaba ara vermek istiyorum",
    metin:
      "Kal\u0131c\u0131 kapatma tek se\u00e7enek de\u011fildir. Ge\u00e7ici dondurma belirli bir s\u00fcre boyunca giri\u015fi kapat\u0131r ve s\u00fcre dolunca hesap kendili\u011finden a\u00e7\u0131l\u0131r; bakiye ve ge\u00e7mi\u015f korunur. Kendini d\u0131\u015flama daha uzun s\u00fcrelidir ve s\u00fcresi dolmadan geri al\u0131namaz. Kal\u0131c\u0131 kapatmadan \u00f6nce bakiyenin \u00e7ekilmi\u015f olmas\u0131 gerekir.",
    href: "/blog/hesap-kapatma-nasil-yapilir",
    link: "Dondurma ve kapatma fark\u0131",
  },
];

export default function TopicsSection() {
  return (
    <section id="konular" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Sık Karşılaşılan <span className="text-primary">Durumlar</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Kullanıcıların en çok takıldığı dört konu ve bunların neden yaşandığı. Her biri tek bir nedene değil birkaç olası duruma bağlıdır; hangisinin sizde geçerli olduğunu ayırt etmek çözümü hızlandırır.
          </p>
        </div>

        <div className="space-y-6">
          {bloklar.map((b) => (
            <div
              key={b.baslik}
              className="p-6 rounded-2xl bg-card-bg border border-card-border"
            >
              <h3 className="text-lg font-bold mb-3 text-primary">{b.baslik}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{b.metin}</p>
              <Link
                href={b.href}
                className="text-primary text-sm font-semibold hover:underline"
              >
                {b.link} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
