import { SITE_CONFIG } from "@/config";
import CtaLink from "@/components/CtaLink";

export default function GirisSection() {
  return (
    <section id="giris" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            <span className="text-primary">Meritking</span> Giriş
          </h2>
          <p className="text-gray-400 leading-relaxed">
              Meritking; spor bahisleri, canlı casino, poker ve slot oyunlarını tek hesapta
              toplayan bir oyun platformudur. Üyelik açtıktan sonra kimlik doğrulamanızı
              tamamlarsanız ödeme işlemleriniz beklemeden sonuçlanır. Güncel giriş adresi
              değişikliklerde bu sayfada yayımlanır; hesabınıza kolayca erişebilir, hoş geldin
              kampanyalarından yararlanabilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <CtaLink
            href={SITE_CONFIG.loginUrl}
            eylem="giris"
            konum="giris-bolumu"
            className="px-8 py-3.5 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover transition glow-primary"
          >
            Meritking Giriş Yap
          </CtaLink>
          <CtaLink
            href={SITE_CONFIG.registerUrl}
            eylem="kayit"
            konum="giris-bolumu"
            className="px-8 py-3.5 rounded-xl bg-accent-green text-white font-bold hover:bg-green-600 transition glow-green"
          >
            Hemen Kayıt Ol
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
