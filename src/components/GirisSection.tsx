import { SITE_CONFIG } from "@/config";

export default function GirisSection() {
  return (
    <section id="giris" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            <span className="text-primary">Meritking</span> Giris
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Meritking, Turkiye&apos;nin en guvenilir online bahis ve casino platformudur.
            Spor bahisleri, canli casino, slot oyunlari ve poker gibi genis bir yelpazede
            hizmet sunmaktadir. Guvenli alt yapisi ve hizli odeme yontemleri ile
            kullanicilarina kesintisiz bir deneyim saglar. Meritking giris adresi uzerinden
            kolayca hesabiniza erisebilir, hos geldin bonuslarindan faydalanabilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={SITE_CONFIG.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover transition glow-primary"
          >
            Meritking Giris Yap
          </a>
          <a
            href={SITE_CONFIG.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-accent-green text-white font-bold hover:bg-green-600 transition glow-green"
          >
            Hemen Kayit Ol
          </a>
        </div>
      </div>
    </section>
  );
}
