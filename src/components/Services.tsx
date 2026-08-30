const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    title: "Spor Bahisleri & Canlı Bahis",
    desc: "Futboldan tenise 20'yi aşkın branşta maç öncesi ve canlı bahis. Oranlar maçın akışına göre anlık güncellenir; kupon kurmadan önce seçim kurallarını inceleyebilirsiniz.",
    stats: ["20+ Spor", "4.000+ Seçenek", "100K+ Maç"],
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Meritking Casino",
    desc: "Slot, blackjack, rulet ve baccarat masaları tek çatı altında. Her oyunun kendi kural sayfası ve bahis aralığı vardır; oynamadan önce göz atmanız önerilir.",
    stats: ["2500+ Slot", "Canlı Casino", "50+ Sağlayıcı"],
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Meritking Online Poker",
    desc: "Texas Hold'em ve Omaha başta olmak üzere farklı poker türlerinde masa ve turnuva seçenekleri. Masa limitleri giriş öncesinde görünür, bütçenize uygun olanı seçebilirsiniz.",
    stats: ["7 Poker Ağı", "Turnuvalar", "Canlı Poker"],
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    title: "Meritking Stream - Canlı Maç İzle",
    desc: "Seçili karşılaşmaları canlı takip edin. Yayın sahadaki olaya göre birkaç saniye gecikebilir; son saniye bahislerinde bunu hesaba katmakta fayda var.",
    stats: ["HD Yayın", "Ücretsiz", "Canlı Skor"],
    color: "from-fuchsia-500 to-pink-400",
  },
];

export default function Services() {
  return (
    <section id="casino" className="py-16 md:py-24 bg-card-bg/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Neler <span className="text-primary">Sunuyoruz?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Meritking ile spor bahislerinden casino oyunlarına, pokerden canlı maç izlemeye kadar her şey tek bir platformda.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-card-bg border border-card-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition">
                {s.title}
              </h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.stats.map((stat) => (
                  <span
                    key={stat}
                    className="text-xs px-2.5 py-1 rounded-full bg-background text-gray-300 border border-card-border"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
