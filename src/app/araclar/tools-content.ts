/*
 * Hesaplama araclari.
 *
 * Bu sayfalarin amaci marka sorgusu degil, arac sorgusudur ("cevrim sarti
 * hesaplama", "sistem bahis hesaplama"). Arac sorgulari marka sorgularindan
 * daha az rekabetli ve dogal baglanti cekme ihtimali daha yuksek.
 */

export type ToolSection = { type: "p" | "h2"; text: string };

export type ToolPage = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  /** Arac dizininde kart aciklamasi */
  ozet: string;
  /** Rakip araclardan ayrisan tarafi - dizinde rozet olarak gosterilir */
  fark: string;
  updated: string;
  body: ToolSection[];
  faq: { q: string; a: string }[];
  related: string[];
};

export const toolPages: ToolPage[] = [
  {
    slug: "cevrim-sarti-hesaplama",
    h1: "Çevrim Şartı Hesaplama",
    title: "Çevrim Şartı Hesaplama - Katkı Oranlı Bonus Hesaplayıcı",
    description:
      "Bonus çevrim şartını oyun katkı oranını da hesaba katarak hesaplayın. Gerçekte gereken bahis hacmini ve çevrimin tamamlanabilir olup olmadığını görün.",
    ozet: "Bonusun çekilebilir hâle gelmesi için gerçekte ne kadar bahis yapmanız gerektiğini hesaplar.",
    fark: "Katkı oranını hesaba katar",
    updated: "2026-08-30",
    body: [
      { type: "p", text: "Çevrim şartı hesaplayıcılarının çoğu bonus tutarını çevrim katsayısıyla çarpıp sonucu verir. Bu hesap eksiktir, çünkü gerçekte yapmanız gereken bahis miktarını belirleyen ikinci bir çarpan daha vardır: oyunun çevrime katkı oranı. Bu araç o çarpanı da hesaba katar." },
      { type: "h2", text: "Katkı Oranı Neden Sonucu Değiştirir?" },
      { type: "p", text: "Yaptığınız her bahis çevrime aynı oranda sayılmaz. Slot oyunları çoğu kampanyada yüzde 100 katkı verir: 100 TL bahis, çevrimden 100 TL düşer. Canlı casino oyunları ise genellikle yüzde 10 civarında katkı verir; aynı 100 TL bahis çevrimden yalnızca 10 TL düşer. Yani 16.000 TL'lik bir çevrimi canlı casinoda tamamlamaya çalışmak, gerçekte 160.000 TL bahis yapmak demektir. Kampanya sayfasında yazan rakam ile sizin yapmanız gereken bahis arasındaki bu fark, bonusun kullanılabilir olup olmadığını belirleyen asıl etkendir." },
      { type: "h2", text: "Hesaplama Tabanı: Bonus mu, Yatırım + Bonus mu?" },
      { type: "p", text: "Kampanyalar iki farklı taban kullanır ve aradaki fark sonucu ikiye katlayabilir. Bazı kampanyalarda çevrim yalnızca bonus tutarı üzerinden hesaplanır; bazılarında yatırım ve bonus toplamı esas alınır. 1.000 TL yatırım ve 1.000 TL bonus için 8x çevrim, birinci durumda 8.000 TL, ikinci durumda 16.000 TL demektir. Kampanya metninde hangisinin geçerli olduğunu görmeden bonusu kabul etmeyin; araçta bu seçimi yaparak iki senaryoyu karşılaştırabilirsiniz." },
      { type: "h2", text: "Süre ve Tempo: Asıl Kısıt" },
      { type: "p", text: "Çevrim tutarı tek başına bir şey söylemez; onu tamamlamak için kaç gününüz olduğu ve günde ne kadar bahis yapabildiğiniz belirleyicidir. Süre dolduğunda tamamlanmamış bonus ve o bonusla kazanılan tutar silinir. Bu yüzden araç, girdiğiniz günlük tempoyu kampanya süresiyle çarpıp gereken hacimle karşılaştırır ve çevrimin sizin oynama biçiminizle tamamlanabilir olup olmadığını doğrudan söyler." },
      { type: "h2", text: "Sonucu Nasıl Okumalı?" },
      { type: "p", text: "Araç üç rakam üretir. Kâğıt üzerindeki çevrim, kampanyada yazan tutardır. Gerçekte gereken bahis, katkı oranıyla düzeltilmiş tutardır ve asıl dikkate almanız gereken sayı budur. Günlük gereken tempo ise bu hacmi kampanya süresine böler. Değerlendirme kutusu, kendi tempo bilginizle bu hacmin kapatılıp kapatılamayacağını söyler. Sonuç olumsuzsa bonusu almamak bakiyenizi serbest bırakır ve para çekme işleminizi hızlandırır." },
      { type: "p", text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın." },
    ],
    faq: [
      { q: "Çevrim şartı nasıl hesaplanır?", a: "Taban tutar (bonus veya yatırım + bonus) çevrim katsayısıyla çarpılır. Ardından bu sonuç, oynayacağınız oyunun katkı oranına bölünerek gerçek bahis hacmi bulunur." },
      { q: "Katkı oranı nedir?", a: "Bir oyunda yaptığınız bahsin çevrime hangi yüzdeyle sayıldığıdır. Slot genellikle %100, canlı casino %10 civarındadır." },
      { q: "8x çevrim ne demek?", a: "Taban tutarın sekiz katı kadar bahis yapmanız gerektiği anlamına gelir. Taban bonus mu yoksa yatırım + bonus mu, kampanya metninde yazar." },
      { q: "Çevrimi tamamlayamazsam ne olur?", a: "Süre dolduğunda bonus ve o bonusla kazanılan tutar silinir. Kendi yatırımınız etkilenmez." },
      { q: "Kaybettiğim bahisler çevrime sayılır mı?", a: "Evet. Çevrim hesabında bahsin tutup tutmadığı değil, yapılan bahis hacmi esas alınır." },
      { q: "Bu araç gerçek kampanya şartlarını mı gösteriyor?", a: "Hayır, girdiğiniz değerlerle hesap yapar. Katsayı, taban ve katkı oranını kendi kampanya metninizden okuyup girmeniz gerekir." },
    ],
    related: [
      "bonus-cevrim-sarti-nasil-hesaplanir",
      "deneme-bonusu-ve-hos-geldin-bonusu-farki",
      "vip-ve-sadakat-programi-nasil-isler",
    ],
  },
  {
    slug: "oran-olasilik-cevirici",
    h1: "Oran - Olasılık Çevirici ve Marj Hesaplama",
    title: "Oran Olasılık Çevirici - Bahis Marjı Hesaplama",
    description:
      "Bahis oranını olasılığa çevirin, bahis şirketinin marjını ayırın ve kendi tahmininizle değerli bahis olup olmadığını test edin.",
    ozet: "Oranın ima ettiği olasılığı, şirketin marjını ve bahsin değerli olup olmadığını gösterir.",
    fark: "Marjı ayırıp gerçek olasılığı verir",
    updated: "2026-08-30",
    body: [
      { type: "p", text: "Oran, çoğu kişinin sandığı gibi yalnızca bir kazanç çarpanı değildir; bir olasılık ifadesidir. Bu aracı kullanarak oranın hangi olasılığa karşılık geldiğini, bu olasılığın ne kadarının bahis şirketinin payı olduğunu ve kendi tahmininize göre bahsin değerli olup olmadığını görebilirsiniz." },
      { type: "h2", text: "Orandan Olasılığa" },
      { type: "p", text: "Ondalık oranı olasılığa çevirmek için 1 sayısını orana bölersiniz. 2.00 oran yüzde 50'ye, 1.50 oran yüzde 66,7'ye, 4.00 oran yüzde 25'e karşılık gelir. Araçta bu değer her seçenek için ham olasılık olarak gösterilir. Ancak bu ham değer, gerçek olasılığın kendisi değildir; içinde şirketin payı da vardır." },
      { type: "h2", text: "Marj Neden Önemli?" },
      { type: "p", text: "Bir maçın tüm sonuçlarının ham olasılıklarını toplarsanız sonuç her zaman yüzde 100'ün üzerine çıkar. Aradaki fark marjdır ve evin uzun vadeli avantajını oluşturur. Yüzde 4'ün altındaki marj oyuncu açısından iyi, yüzde 7'nin üzeri yüksek sayılır. Aynı maça farklı yerlerde bakabiliyorsanız, marjı düşük olanı seçmek uzun vadede fark yaratan tek somut tercihtir. Araç marjı ayırıp size normalize edilmiş, yani şirket payından arındırılmış olasılığı gösterir." },
      { type: "h2", text: "Değer Testi Nasıl Çalışır?" },
      { type: "p", text: "Değerli bahis, sizin tahmin ettiğiniz olasılığın oranın ima ettiğinden yüksek olduğu bahistir. Araca kendi tahmininizi yüzde olarak girdiğinizde, o tahmin için başa baş oranı hesaplanır: bu, uzun vadede ne kâr ne zarar edeceğiniz orandır. Sunulan oran başa baş oranın üzerindeyse bahis değerlidir. Bu, bahsin tutacağı anlamına gelmez; yalnızca fiyatın sizin lehinize olduğunu gösterir. Tek bir kuponun sonucu hiçbir zaman yöntemin doğruluğunu kanıtlamaz." },
      { type: "h2", text: "Beklenen Değer Ne Anlatır?" },
      { type: "p", text: "Araç, tahmininiz doğruysa her 100 TL bahiste uzun vadede beklenen farkı da gösterir. Pozitif bir değer, aynı koşullarda çok sayıda benzer bahis yapıldığında kâr beklendiği anlamına gelir. Negatifse tersi geçerlidir. Buradaki kritik varsayım, sizin olasılık tahmininizin isabetli olmasıdır; tahmin yanlışsa hesap da yanlış olur. Bu yüzden değer testi bir garanti aracı değil, fiyatı sorgulama alışkanlığı kazandıran bir araçtır." },
      { type: "p", text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın." },
    ],
    faq: [
      { q: "Oran nasıl olasılığa çevrilir?", a: "1 sayısını orana bölersiniz. 2.50 oran için 1/2.50 = yüzde 40." },
      { q: "Marj nedir?", a: "Oranların ima ettiği olasılıkların toplamının yüzde 100'ü aşan kısmıdır ve bahis şirketinin payını gösterir." },
      { q: "Normalize olasılık ne demek?", a: "Marj ayrıldıktan sonra kalan, sonucun şirket payından arındırılmış tahmini olasılığıdır." },
      { q: "Değerli bahis her zaman kazandırır mı?", a: "Hayır. Değer kavramı yalnızca uzun vadede anlam taşır; tek bahiste sonuç şansa bağlıdır." },
      { q: "Başa baş oran nedir?", a: "Sizin tahmin ettiğiniz olasılık için ne kâr ne zarar edeceğiniz orandır. Sunulan oran bunun üzerindeyse değer vardır." },
      { q: "Kaç seçenekli maçlarda kullanılır?", a: "İki sonuçlu (tenis, alt/üst) ve üç sonuçlu (maç sonucu) marketler için kullanılabilir." },
    ],
    related: [
      "bahis-orani-nasil-okunur",
      "bahis-terimleri-sozlugu",
      "alt-ust-bahsi-nedir",
    ],
  },
  {
    slug: "kupon-hesaplama",
    h1: "Kupon Hesaplama: Kombine ve Sistem",
    title: "Kupon Hesaplama - Kombine ve Sistem Bahis Hesaplayıcı",
    description:
      "Kombine ve sistem kuponlarının maliyetini, kombinasyon sayısını ve kaç maç tutarsa kâra geçeceğinizi hesaplayın.",
    ozet: "Kombine ve sistem kuponunda maliyet, kombinasyon sayısı ve başa baş noktasını hesaplar.",
    fark: "Başa baş noktasını gösterir",
    updated: "2026-08-30",
    body: [
      { type: "p", text: "Kupon hesaplayıcılarının çoğu toplam oranı ve tüm maçlar tuttuğunda elde edilecek tavan kazancı verir. Oysa sistem kuponu oynayan biri için asıl merak edilen soru başkadır: kaç maç tutarsa zarardan çıkarım? Bu araç o soruya cevap veren bir tablo üretir." },
      { type: "h2", text: "Kombine Kupon Nasıl Hesaplanır?" },
      { type: "p", text: "Kombine kuponda seçilen tüm maçların oranları birbiriyle çarpılır ve sonuç bahis tutarıyla çarpılarak olası kazanç bulunur. Kuralı basittir ama riski görünenden büyüktür: her ek maç, kuponun tutma olasılığını çarpan biçiminde düşürür. Her maçın tutma ihtimali yüzde 70 olan sekiz maçlık bir kuponda, tümünün birden tutma olasılığı yüzde 6'nın altına iner. Yüksek toplam oran, bu düşük olasılığın karşılığıdır." },
      { type: "h2", text: "Sistem Kuponu Nasıl İşler?" },
      { type: "p", text: "Sistem kuponunda seçtiğiniz maçlardan belirli sayıda kombinasyon üretilir ve her kombinasyon ayrı bir kupon gibi değerlendirilir. Dört maçlık bir kuponda 3/4 sistemi oynadığınızda dört ayrı üçlü kombinasyon oluşur; bu, maçlardan biri tutmasa bile kazanç elde edebilmeniz anlamına gelir. Karşılığında maliyet artar, çünkü her kombinasyon için ayrı bahis ödersiniz. Sistem, riski dağıtmanın bedeli olarak tavan kazancı düşürür." },
      { type: "h2", text: "Başa Baş Noktası Neden Önemli?" },
      { type: "p", text: "Sistem kuponunda kazanç elde etmek ile kâra geçmek aynı şey değildir. Birkaç kombinasyon tutup para kazanabilir ama kupon maliyetinin altında kalabilirsiniz. Araçtaki tablo her senaryo için kazanan kombinasyon sayısını ve getiri aralığını gösterir, ardından bunu kupon maliyetiyle karşılaştırıp kârda mı zararda mı olduğunuzu söyler. Bazı senaryolarda sonuç, tutan maçların yüksek mi düşük mü oranlı olduğuna göre değişir; bu satırlar duruma bağlı olarak işaretlenir." },
      { type: "h2", text: "Kupon Kurarken Pratik Sınır" },
      { type: "p", text: "Deneyimli kullanıcılar kupon başına maç sayısını sınırlı tutar ve bütçesinin küçük bir yüzdesini tek kupona ayırır. Araçta maç sayısını artırdıkça kombinasyon sayısının ve maliyetin nasıl hızla büyüdüğünü görebilirsiniz; bu artış, sistem kuponunun neden dikkatli boyutlandırılması gerektiğini somut olarak gösterir." },
      { type: "p", text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın." },
    ],
    faq: [
      { q: "Kombine kupon nasıl hesaplanır?", a: "Tüm maçların oranları çarpılır ve sonuç bahis tutarıyla çarpılır. Kuponun kazanması için tüm maçların tutması gerekir." },
      { q: "Sistem 3/4 ne demek?", a: "Dört maçtan üçlü kombinasyonlar üretilir; dört ayrı kombinasyon oluşur ve her biri ayrı kupon gibi değerlendirilir." },
      { q: "Sistem kuponu neden daha pahalı?", a: "Her kombinasyon için ayrı bahis ödersiniz. Dört kombinasyonlu bir sistemde maliyet, birim bahsin dört katıdır." },
      { q: "Kazanç elde etmek kâra geçmek midir?", a: "Hayır. Birkaç kombinasyon tutup para kazanabilir ama kupon maliyetinin altında kalabilirsiniz; tablo bu farkı gösterir." },
      { q: "Neden getiri bir aralık olarak veriliyor?", a: "Aynı sayıda maç tutsa bile hangi maçların tuttuğu sonucu değiştirir. Tablo en düşük ve en yüksek oranlı senaryoyu birlikte gösterir." },
      { q: "En fazla kaç maç ekleyebilirim?", a: "Araçta en fazla 10 maç desteklenir; bu sınır kombinasyon sayısının kontrolsüz büyümesini önler." },
    ],
    related: [
      "kombine-ve-sistem-bahis-farki",
      "bahis-kuponu-nasil-yapilir",
      "bahiste-bankroll-yonetimi",
    ],
  },
];

export function getToolPage(slug: string) {
  return toolPages.find((t) => t.slug === slug);
}
