const reviews = [
  {
    name: "Kerem A.",
    city: "İzmir",
    stars: 5,
    text: "Kimlik doğrulamamı üyeliğin ilk günü tamamladım, ilk çekimde hiç beklemedim. Belgeleri baştan yüklemek gerçekten fark yaratıyor.",
  },
  {
    name: "Selin B.",
    city: "Eskişehir",
    stars: 4,
    text: "Hesap panelindeki işlem geçmişi bölümü işime yarıyor. Ne kadar yatırdığımı tarih tarih görebilmek bütçeyi takip etmeyi kolaylaştırdı.",
  },
  {
    name: "Onur T.",
    city: "Adana",
    stars: 5,
    text: "Haftalık limit tanımlama özelliğini kullanıyorum. Sınıra gelince sistem uyarıyor, bu da oyunu kontrollü tutmama yardımcı oluyor.",
  },
  {
    name: "Deniz K.",
    city: "Trabzon",
    stars: 4,
    text: "Canlı destekle yazışırken kullanıcı adımı ve işlem numarasını ilk mesajda verdim, konu tek görüşmede çözüldü. Doğru kanalı seçmek önemliymiş.",
  },
  {
    name: "Burak M.",
    city: "Gaziantep",
    stars: 5,
    text: "Blog bölümündeki kombine ve sistem bahis karşılaştırması işime yaradı. Artık kuponu neden o şekilde kurduğumu biliyorum.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-primary" : "text-gray-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-card-bg/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Kullanıcı <span className="text-primary">Yorumları</span>
          </h2>
          <p className="text-gray-400">Meritking kullanıcılarının deneyimleri</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-card-bg border border-card-border rounded-2xl p-6"
            >
              <Stars count={r.stars} />
              <p className="text-sm text-gray-300 mt-4 mb-5 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center text-black text-sm font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
