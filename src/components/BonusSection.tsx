import { SITE_CONFIG } from "@/config";

export default function BonusSection() {
  return (
    <section id="bonus" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-card-bg to-secondary/20 border border-card-border p-8 md:p-14">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
                OZEL TEKLIF
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                %100 Hos Geldin <span className="text-primary">Bonusu</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Betrabet&apos;e ilk kez uye olun ve ilk para yatirma isleminizde %100 bonus kazanin.
                Spor bahisleri ve casino oyunlarinda kullanabileceginiz bonuslar sizi bekliyor.
              </p>
              <a
                href={SITE_CONFIG.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 rounded-xl bg-primary text-black font-bold hover:bg-primary-hover transition glow-primary"
              >
                Bonusu Al
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Spor Bonusu", value: "%100", sub: "Ilk Yatirim" },
                { label: "Casino Bonusu", value: "%50", sub: "Her Yatirim" },
                { label: "Kayip Bonusu", value: "%15", sub: "Haftalik" },
                { label: "Arkadasini Getir", value: "100 TL", sub: "Her Davet" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="bg-card-bg/80 border border-card-border rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-black text-primary">{b.value}</div>
                  <div className="text-sm font-semibold mt-1">{b.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
