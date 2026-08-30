/*
 * Niyet bazli hedef sayfalar.
 *
 * Ana sayfa marka sorgusunu ("meritking", "meritking giris") hedefler.
 * Buradaki her sayfa BASKA bir arama niyetini karsilar; ayni sorguya iki
 * sayfa cikarmamak icin baslik ve govde odaklari bilerek ayristirilmistir.
 */

export type LandingSection = { type: "p" | "h2"; text: string };

export type LandingPage = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  /** Sayfanin karsiladigi arama niyeti - hub bolumunde kart aciklamasi olarak kullanilir */
  intent: string;
  updated: string;
  body: LandingSection[];
  faq: { q: string; a: string }[];
  /** Destek iceriklerine ic link - blog makale slug'lari */
  related: string[];
};

const corePages: LandingPage[] = [
  {
    slug: "meritking-guncel-giris-adresi",
    h1: "Meritking Güncel Giriş Adresi",
    title: "Meritking Güncel Giriş Adresi - Yeni Adres Nasıl Bulunur?",
    description:
      "Meritking güncel giriş adresi neden değişir, yeni adrese nasıl ulaşılır ve sahte adreslerden nasıl korunursunuz? Adres değişiminin tüm mantığı.",
    intent: "Adres değişti, yeni adrese ulaşmak istiyorum",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Bahis ve casino platformlarının giriş adresleri belirli aralıklarla değişir. Bu, sitenin kapandığı ya da hesabınızın etkilendiği anlamına gelmez; yalnızca erişim yolunun yenilendiğini gösterir. Hesabınız, bakiyeniz, açık kuponlarınız ve geçmiş işlemleriniz adres değişse de aynı kalır. Bu sayfa adres değişiminin neden yaşandığını, yeni adrese nasıl güvenle ulaşacağınızı ve sahte adreslerden nasıl korunacağınızı anlatır.",
      },
      { type: "h2", text: "Giriş Adresi Neden Değişir?" },
      {
        type: "p",
        text: "Adres değişiminin temel nedeni erişim engellemeleridir. Bir alan adı engellendiğinde platform, kullanıcıların kesintisiz erişebilmesi için yeni bir alan adı devreye alır. Bu süreç planlı yürütülür: eski adres bir süre yönlendirme yapar, yeni adres yayına alınır. Kullanıcı tarafında yapılması gereken tek şey, güncel adresi doğru kaynaktan öğrenmektir.",
      },
      { type: "h2", text: "Yeni Adrese Ulaşmanın Güvenli Yolları" },
      {
        type: "p",
        text: "En sağlıklı yöntem, adresi tek bir sabit kaynaktan takip etmektir. Bu sayfanın üstündeki giriş bağlantısı adres değiştiğinde otomatik olarak güncellenir; yani bağlantıyı her tıkladığınızda o an geçerli olan adrese gidersiniz. İkinci güvenli yöntem, platformun size daha önce gönderdiği e-posta veya SMS bildirimlerini kontrol etmektir. Üçüncü yöntem ise canlı destek hattına yazıp güncel adresi doğrudan sormaktır.",
      },
      { type: "h2", text: "Sahte Adresleri Nasıl Ayırt Edersiniz?" },
      {
        type: "p",
        text: "Adres değişim dönemleri, kullanıcı bilgisi toplamayı amaçlayan taklit siteler için fırsat oluşturur. Gerçek adresi taklitten ayırmanın birkaç pratik yolu vardır. Adres çubuğunda kilit simgesinin bulunması ve alan adının harf harf beklediğiniz yazımla eşleşmesi ilk kontroldür; taklit siteler genellikle tek harf farkla yazılır. İkinci kontrol, giriş sonrası sizden alışılmadık bilgi istenip istenmediğidir: hiçbir platform giriş ekranında kart şifrenizi, kimlik fotoğrafınızı ya da SMS onay kodunuzu topluca istemez.",
      },
      {
        type: "p",
        text: "Şüphelendiğiniz bir sayfaya bilgi girdiyseniz yapılacak ilk iş şifrenizi değiştirmek, ardından destek hattına durumu bildirmektir. Aynı şifreyi başka platformlarda da kullanıyorsanız onları da güncelleyin.",
      },
      { type: "h2", text: "Adres Değiştiğinde Hesabınıza Ne Olur?" },
      {
        type: "p",
        text: "Hiçbir şey olmaz. Kullanıcı adınız ve şifreniz aynı kalır, bakiyeniz korunur, devam eden kuponlarınız normal şekilde sonuçlanır ve bekleyen para çekme talepleriniz işlemden düşmez. Adres yalnızca siteye ulaştığınız kapıdır; hesabınız o kapının arkasındaki sistemde tutulur. Tek yapmanız gereken yeni adrese aynı bilgilerle giriş yapmaktır.",
      },
      { type: "h2", text: "Giriş Yapamıyorsanız Sırayla Deneyin" },
      {
        type: "p",
        text: "Sayfa açılmıyorsa önce tarayıcı önbelleğinizi temizleyin; eski adres tarayıcınızda kayıtlı kalmış olabilir. Ardından farklı bir ağ deneyin, örneğin mobil veriye geçin. Sayfa açılıyor ancak şifreniz kabul edilmiyorsa büyük ihtimalle şifre hatası vardır; şifre sıfırlama akışını kullanmak en hızlı çözümdür. Hesabınızın kilitlendiğine dair bir uyarı görüyorsanız bu genellikle arka arkaya hatalı giriş denemesinden kaynaklanır ve destek hattı üzerinden kısa sürede çözülür.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Meritking güncel giriş adresi ne sıklıkla değişir?",
        a: "Sabit bir takvimi yoktur; erişim engeli geldiğinde yenilenir. Bu sayfadaki giriş bağlantısı her değişimde güncellendiği için sizin takvim takip etmenize gerek kalmaz.",
      },
      {
        q: "Adres değişince yeniden üye olmam gerekir mi?",
        a: "Hayır. Mevcut kullanıcı adı ve şifrenizle yeni adresten giriş yaparsınız. İkinci bir hesap açmak kural ihlalidir ve hesapların kapanmasına yol açabilir.",
      },
      {
        q: "Eski adreste bakiyem kalır mı?",
        a: "Bakiye adrese değil hesabınıza bağlıdır. Yeni adresten giriş yaptığınızda bakiyenizi aynı şekilde görürsünüz.",
      },
      {
        q: "Yeni adresin sahte olmadığını nasıl anlarım?",
        a: "Alan adını harf harf kontrol edin, adres çubuğundaki kilit simgesini doğrulayın ve giriş ekranında sizden kart şifresi veya kimlik fotoğrafı istenmediğinden emin olun. Şüpheniz varsa canlı desteğe sorun.",
      },
      {
        q: "VPN kullanmam gerekir mi?",
        a: "Güncel adres yayında olduğu sürece gerekmez. Doğru adrese normal bağlantınızla erişebilirsiniz.",
      },
      {
        q: "Açık kuponlarım adres değişiminden etkilenir mi?",
        a: "Etkilenmez. Kuponlarınız maç sonuçlarına göre normal şekilde sonuçlanır ve kazanç bakiyenize işlenir.",
      },
    ],
    related: [
      "sifremi-unuttum-nasil-sifirlarim",
      "musteri-hizmetleri-nasil-kullanilir",
      "meritking-uyelik-nasil-acilir",
    ],
  },
  {
    slug: "meritking-bonus",
    h1: "Meritking Bonus ve Kampanyalar",
    title: "Meritking Bonus - Çevrim Şartı ve Kampanya Rehberi",
    description:
      "Meritking bonus türleri, çevrim şartı hesabı, hoş geldin ve kayıp bonusunun işleyişi. Bonusu almadan önce bilmeniz gereken kurallar.",
    intent: "Hangi bonuslar var, şartları ne?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Bonus, oyun bakiyenizi artıran ama beraberinde kurallar getiren bir araçtır. Bonusu değerli kılan tutarı değil, çevrim şartının makul olup olmadığıdır. Bu sayfada bonus türlerini, çevrim şartının nasıl hesaplandığını ve bonus alırken en sık yapılan hataları anlatıyoruz; amacımız hangi kampanyanın sizin oynama biçiminize uyduğuna kendi başınıza karar verebilmeniz.",
      },
      { type: "h2", text: "Çevrim Şartı Nasıl Hesaplanır?" },
      {
        type: "p",
        text: "Çevrim şartı, bonusun çekilebilir hâle gelmesi için ne kadar bahis yapmanız gerektiğini belirtir. Örneğin 1.000 TL bonus ve 10x çevrim şartı, toplam 10.000 TL tutarında bahis yapmanız gerektiği anlamına gelir. Bazı kampanyalarda çevrim yalnızca bonus tutarı üzerinden, bazılarında ise yatırım artı bonus toplamı üzerinden hesaplanır. Bu ayrım tutarı ikiye katlayabileceği için kampanya metninde hangisinin geçerli olduğunu mutlaka kontrol edin.",
      },
      { type: "h2", text: "Her Oyun Çevrime Aynı Oranda Sayılmaz" },
      {
        type: "p",
        text: "Çevrim hesabında en sık gözden kaçan detay katkı oranıdır. Slot oyunları genellikle yatırılan tutarın tamamını çevrime sayarken, canlı casino oyunları çok daha düşük bir oranda katkı verir; bazı masa oyunları ise hiç saymaz. Spor bahislerinde ise minimum oran şartı bulunur, yani belirli bir oranın altındaki bahisler çevrime dâhil edilmez. Çevrimi tamamlamayı planlıyorsanız hangi oyunun ne oranda katkı verdiğini baştan bilmek, boşa bahis yapmanızı önler.",
      },
      { type: "h2", text: "Yaygın Bonus Türleri" },
      {
        type: "p",
        text: "Hoş geldin bonusu ilk yatırımda verilir ve genellikle en yüksek tutarlı kampanyadır, ancak çevrim şartı da buna paralel yüksektir. Kayıp bonusu belirli bir dönemdeki net kaybınızın bir yüzdesini geri verir; çevrim şartı düşük olduğu için pratikte kullanımı kolaydır. Yatırım bonusu her yatırımda belirli oranda ek bakiye tanımlar. Free spin ise slot oyunlarında ücretsiz dönüş hakkıdır ve kazancı çoğu zaman bonus bakiyesi olarak yazılır, doğrudan çekilemez.",
      },
      { type: "h2", text: "Bonus Alırken Yapılan Üç Hata" },
      {
        type: "p",
        text: "Birincisi, çevrim şartını okumadan bonusu kabul etmektir; sonradan iptal etmek genellikle kazancın da silinmesi anlamına gelir. İkincisi, çevrim tamamlanmadan para çekme talebi oluşturmaktır; bu durumda talep beklemeye alınır veya bonus düşülür. Üçüncüsü ise aynı anda birden fazla kampanyaya girmektir; kampanyalar çoğunlukla birleştirilemez ve sistem sonradan gelen bonusu geçersiz sayabilir.",
      },
      { type: "h2", text: "Bonusu Reddetmek Bazen Daha Mantıklıdır" },
      {
        type: "p",
        text: "Yalnızca ara ara ve küçük tutarlarla oynuyorsanız, yüksek çevrim şartlı bir bonus bakiyenizi kilitler ve para çekmenizi geciktirir. Bu durumda bonusu almamak daha rahat bir deneyim sunar. Bonus, düzenli oynayan ve çevrimi doğal akışında tamamlayabilecek kullanıcılar için avantajlıdır. Kampanya sayfasındaki kabul kutucuğunu işaretlemeden önce kendinize şu soruyu sorun: bu çevrimi zaten yapacağım bahislerle tamamlayabilir miyim?",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Bonusu aldıktan sonra iptal edebilir miyim?",
        a: "Çoğu kampanyada iptal mümkündür ancak bonusla elde edilen kazanç da silinir. İptal etmeden önce destek hattına şartları teyit ettirmek en güvenli yoldur.",
      },
      {
        q: "Çevrim şartını tamamlamadan para çekersem ne olur?",
        a: "Talep beklemeye alınır; bazı durumlarda bonus ve bonusla elde edilen kazanç bakiyenizden düşülerek yalnızca kendi yatırımınız ödenir.",
      },
      {
        q: "Free spin kazancı doğrudan çekilebilir mi?",
        a: "Genellikle hayır. Free spin kazancı bonus bakiyesine yazılır ve kendi çevrim şartına tabidir.",
      },
      {
        q: "Aynı anda iki bonus kullanabilir miyim?",
        a: "Kural olarak hayır. Kampanyalar birleştirilemez; ikinci bonus çoğu zaman sistem tarafından geçersiz sayılır.",
      },
      {
        q: "Kayıp bonusu ne zaman hesaba geçer?",
        a: "Kampanyanın kapsadığı dönem kapandıktan sonra, genellikle haftalık olarak hesaplanıp tanımlanır.",
      },
      {
        q: "Bonus çevrimi ne kadar sürede tamamlanmalı?",
        a: "Her kampanyanın bir süre sınırı vardır. Süre dolduğunda tamamlanmamış bonus ve kazancı silinir, bu yüzden çevrimi süreye yayarak planlayın.",
      },
    ],
    related: [
      "bonus-cevrim-sarti-nasil-hesaplanir",
      "deneme-bonusu-ve-hos-geldin-bonusu-farki",
      "free-spin-nedir-nasil-kullanilir",
      "vip-ve-sadakat-programi-nasil-isler",
      "bahiste-bankroll-yonetimi",
      "para-cekme-suresi-ve-limitleri",
      "para-cekme-talebi-neden-bekliyor",
    ],
  },
  {
    slug: "meritking-mobil-giris",
    h1: "Meritking Mobil Giriş",
    title: "Meritking Mobil Giriş - Telefondan Erişim Rehberi",
    description:
      "Meritking mobil giriş nasıl yapılır, uygulama gerekir mi, tarayıcıdan erişim ve mobil bağlantı sorunlarının çözümü.",
    intent: "Telefondan girmek istiyorum, uygulama var mı?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Kullanıcıların büyük çoğunluğu platforma telefondan bağlanır. Mobil erişimde en sık sorulan soru uygulama indirmenin gerekip gerekmediğidir. Kısa cevap: gerekmez. Site mobil tarayıcı için tasarlanmıştır ve masaüstündeki tüm bölümler telefonda da çalışır. Bu sayfa mobil girişin nasıl yapılacağını, tarayıcı ile uygulama arasındaki farkı ve telefonda yaşanan tipik bağlantı sorunlarının çözümünü anlatır.",
      },
      { type: "h2", text: "Tarayıcıdan Giriş Yapmak" },
      {
        type: "p",
        text: "Telefonunuzun tarayıcısından güncel adrese girip kullanıcı adı ve şifrenizle oturum açmanız yeterlidir. Ekran boyutuna göre menü sadeleşir, kupon alanı alt kısma taşınır ve canlı bahis listesi tek sütunda görüntülenir. İşlevsel bir kayıp yaşanmaz; yatırım, çekim, kupon oluşturma ve canlı destek bölümlerinin tamamı mobilde kullanılabilir.",
      },
      { type: "h2", text: "Uygulama mı Tarayıcı mı?" },
      {
        type: "p",
        text: "Tarayıcı sürümünün pratik bir avantajı vardır: her zaman en güncel hâli gösterir. Uygulama kullandığınızda adres değişimi veya arayüz güncellemesi geldiğinde uygulamayı da güncellemeniz gerekir, aksi hâlde bağlantı hatası alırsınız. Ayrıca uygulama telefon hafızasında yer kaplar ve cihazınızda görünür bir iz bırakır. Yalnızca tarayıcı kullanmak hem daha az bakım gerektirir hem de erişim kesintisi riskini azaltır.",
      },
      { type: "h2", text: "Ana Ekrana Kısayol Eklemek" },
      {
        type: "p",
        text: "Uygulama hissini uygulama indirmeden almanın yolu, siteyi ana ekrana kısayol olarak eklemektir. Android'de tarayıcı menüsünden ana ekrana ekle, iPhone'da paylaş menüsünden ana ekrana ekle seçeneği bunu yapar. Böylece simgeye dokunarak doğrudan siteye girersiniz. Adres değiştiğinde kısayolun eski adrese işaret edeceğini unutmayın; adres yenilendiğinde kısayolu da yeniden oluşturmanız gerekir.",
      },
      { type: "h2", text: "Mobilde Sayfa Açılmıyorsa" },
      {
        type: "p",
        text: "İlk kontrol bağlantı türüdür: Wi-Fi üzerinden açılmayan bir sayfa mobil veri ile açılabiliyorsa sorun modeminizin DNS ayarındadır. İkinci kontrol tarayıcı önbelleğidir; eski adres kayıtlı kaldığında sayfa boş gelir, önbelleği temizlemek çözer. Üçüncüsü tarayıcı sürümüdür, çok eski sürümler bazı güvenlik sertifikalarını tanımaz ve bağlantıyı reddeder. Bu üç adım mobil erişim sorunlarının büyük kısmını çözer.",
      },
      { type: "h2", text: "Mobilde Güvenlik" },
      {
        type: "p",
        text: "Telefonunuzda oturumu açık bırakıyorsanız cihaz kilidinizin aktif olduğundan emin olun. Ortak Wi-Fi ağlarında oturum açmaktan kaçının; bu ağlarda trafiğiniz üçüncü kişilerce izlenebilir. Tarayıcınızın şifre kaydetme özelliğini kullanıyorsanız, cihazınızı bir başkasına verdiğinizde oturumun da devredildiğini hatırlayın. Bahis hesabınız için kullandığınız şifreyi başka hiçbir uygulamada kullanmayın.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Meritking mobil giriş için uygulama indirmek zorunda mıyım?",
        a: "Hayır. Telefon tarayıcınızdan güncel adrese girerek tüm bölümleri kullanabilirsiniz; tarayıcı sürümü her zaman en güncel hâlidir.",
      },
      {
        q: "Mobilde para çekebilir miyim?",
        a: "Evet. Yatırım ve çekim işlemlerinin tamamı mobil arayüzden yapılabilir, masaüstünden farkı yoktur.",
      },
      {
        q: "Ana ekrana eklediğim kısayol çalışmıyor, neden?",
        a: "Kısayol eklendiği andaki adrese işaret eder. Adres değiştiyse kısayolu silip güncel adresle yeniden oluşturmanız gerekir.",
      },
      {
        q: "iPhone ve Android arasında fark var mı?",
        a: "Tarayıcı üzerinden kullanımda işlevsel bir fark yoktur. Yalnızca ana ekrana ekleme adımlarının menü konumu değişir.",
      },
      {
        q: "Mobil veride açılıyor ama Wi-Fi'da açılmıyor, ne yapmalıyım?",
        a: "Bu tipik bir DNS kaynaklı durumdur. Modeminizin DNS ayarını değiştirmek veya mobil veriyle devam etmek çözüm sağlar.",
      },
      {
        q: "Oturumum sürekli kapanıyor, sebebi ne olabilir?",
        a: "Tarayıcının çerezleri otomatik temizlemesi en yaygın nedendir. Tarayıcı ayarlarından site çerezlerine izin vermek sorunu giderir.",
      },
    ],
    related: [
      "iki-adimli-dogrulama-nasil-acilir",
      "sifremi-unuttum-nasil-sifirlarim",
      "hesap-dogrulama-kyc-neden-gerekli",
      "canli-mac-izleme-nasil-calisir",
    ],
  },
  {
    slug: "meritking-casino",
    h1: "Meritking Casino ve Canlı Casino",
    title: "Meritking Casino - Canlı Casino ve Slot Oyunları Rehberi",
    description:
      "Meritking casino bölümü: canlı casino ile slot arasındaki fark, RTP ve volatilite kavramları, oyun seçerken dikkat edilmesi gerekenler.",
    intent: "Casino bölümünde ne var, nasıl oynanır?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Casino bölümü iki farklı deneyimi bir arada sunar: yazılım tabanlı slot ve masa oyunları ile gerçek krupiyeyle oynanan canlı casino. İkisi arasındaki fark yalnızca görsel değildir; oyun hızı, bahis aralığı ve bonus çevrimine katkı oranı da değişir. Bu sayfada bölümün nasıl çalıştığını ve oyun seçerken hangi kavramlara bakmanız gerektiğini anlatıyoruz.",
      },
      { type: "h2", text: "Canlı Casino Nasıl İşler?" },
      {
        type: "p",
        text: "Canlı casinoda oyun bir stüdyodan yayınlanır ve kartları gerçek bir krupiye dağıtır. Bahsinizi ekrandaki masaya yerleştirir, sonucu canlı görüntüde izlersiniz. Rulet, blackjack, baccarat ve poker varyantları en yaygın masalardır. Her masanın minimum ve maksimum bahis limiti farklıdır; bütçenize uygun limitli masayı seçmek, oyunun ritmini kontrol edebilmeniz açısından önemlidir. Canlı casino oyunları genellikle bonus çevrimine düşük oranda katkı verir, bu yüzden bonus çevirmeye çalışıyorsanız kampanya kurallarını önce kontrol edin.",
      },
      { type: "h2", text: "Slot Oyunlarında RTP ve Volatilite" },
      {
        type: "p",
        text: "RTP, bir slot oyununun uzun vadede oyunculara geri döndürdüğü teorik yüzdedir. Yüzde 96 RTP, milyonlarca dönüş boyunca yatırılan her 100 birimin ortalama 96 birim olarak dağıtıldığını gösterir; tek oturumda ne kazanacağınızı söylemez. Volatilite ise kazancın nasıl dağıldığını anlatır. Düşük volatiliteli oyunlar sık ama küçük ödeme yapar, yüksek volatiliteli oyunlar uzun süre ödemez sonra büyük ödeyebilir. Kısa oturumlar için düşük volatilite daha öngörülebilir bir deneyim verir.",
      },
      { type: "h2", text: "Oyun Seçerken Bakılacaklar" },
      {
        type: "p",
        text: "Oyunun bilgi ekranında RTP değeri, volatilite seviyesi ve maksimum kazanç çarpanı yazar. Bu üç veriyi oynamadan önce görmek, oyunun size uygun olup olmadığını anlamanın en hızlı yoludur. Bir diğer önemli ayar dönüş başına bahis tutarıdır: bütçenizi dönüş sayısına bölerek belirlemek, oturumun birkaç dakikada bitmesini önler. Otomatik dönüş özelliğini kullanacaksanız kayıp limiti tanımlamayı ihmal etmeyin.",
      },
      { type: "h2", text: "Casino Oynarken Bütçe Disiplini" },
      {
        type: "p",
        text: "Casino oyunlarında matematiksel avantaj her zaman evdedir; bu, oyunun tasarımı gereğidir ve stratejiyle tersine çevrilemez. Bu yüzden casino bütçesi, kaybedilebilir bir eğlence bütçesi olarak düşünülmelidir. Oturum öncesi bir üst limit belirleyin, limite ulaştığınızda oyunu kapatın ve kaybı geri almak için bahis büyütmeyin. Kayıp kovalamak, casino oyunlarında bakiyeyi en hızlı tüketen davranıştır.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Canlı casino ile slot arasındaki fark nedir?",
        a: "Canlı casino gerçek krupiyeyle stüdyodan yayınlanır ve masa limitleri geçerlidir. Slot ise yazılım tabanlıdır, dönüş başına bahisle oynanır ve bonus çevrimine genellikle daha yüksek oranda katkı verir.",
      },
      {
        q: "RTP yüksek olan oyun daha çok kazandırır mı?",
        a: "RTP uzun vadeli teorik bir orandır, tek oturumun sonucunu belirlemez. Yüksek RTP avantaj sağlar ancak kazanç garantisi vermez.",
      },
      {
        q: "Canlı casino bonus çevrimine sayılır mı?",
        a: "Çoğu kampanyada düşük bir oranda sayılır, bazılarında hiç sayılmaz. Bonus almadan önce kampanyanın katkı oranı tablosunu kontrol edin.",
      },
      {
        q: "Demo modda oynayabilir miyim?",
        a: "Slot oyunlarının büyük kısmı demo modda denenebilir. Canlı casino masalarında demo bulunmaz çünkü gerçek masa akışı söz konusudur.",
      },
      {
        q: "Mobilden canlı casino oynanır mı?",
        a: "Evet. Canlı masalar mobil tarayıcıda da açılır; yalnızca stabil bir internet bağlantısı gerekir çünkü görüntü canlı yayınlanır.",
      },
      {
        q: "Oyun ortasında bağlantım koparsa ne olur?",
        a: "Canlı masalarda yerleştirilmiş bahis geçerli sayılır ve sonuç hesabınıza işlenir. Slotta ise dönüş tamamlanır ve kazanç bakiyenize eklenir.",
      },
    ],
    related: [
      "slot-rtp-ve-volatilite",
      "slot-turnuvasi-nedir",
      "poker-turleri-ve-temel-kurallar",
      "rulet-cesitleri-ve-kurallari",
      "blackjack-temel-strateji",
      "baccarat-nasil-oynanir",
      "bahiste-bankroll-yonetimi",
    ],
  },
  {
    slug: "meritking-spor-bahisleri",
    h1: "Meritking Spor Bahisleri",
    title: "Meritking Spor Bahisleri - Oranlar, Marketler ve Canlı Bahis",
    description:
      "Meritking spor bahisleri bölümü: oran mantığı, bahis marketleri, canlı bahis akışı ve kupon oluştururken dikkat edilmesi gerekenler.",
    intent: "Spor bahsi oynamak istiyorum, nasıl çalışıyor?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Spor bahisleri bölümü futbol, basketbol, tenis, voleybol ve daha birçok branşta maç öncesi ve canlı bahis seçenekleri sunar. Bahis oynamanın teknik tarafı basittir: bir market seçer, oranı kabul eder ve tutarı girersiniz. Asıl belirleyici olan, oranın ne anlama geldiğini ve seçtiğiniz marketin nasıl sonuçlandığını bilmektir. Bu sayfa bu iki konuyu netleştirir.",
      },
      { type: "h2", text: "Oran Ne Anlama Gelir?" },
      {
        type: "p",
        text: "Oran, bir sonucun gerçekleşme olasılığının sayısal karşılığıdır. 2.00 oran kabaca yüzde 50 olasılığa işaret eder; 1.50 oran yaklaşık yüzde 67, 4.00 oran ise yaklaşık yüzde 25 olasılık anlamına gelir. Bu hesaplamada bahis şirketinin marjı da vardır, yani gerçek olasılık oranın gösterdiğinden bir miktar düşüktür. Oranı olasılığa çevirmeyi alışkanlık hâline getirmek, bir bahsin gerçekten değerli olup olmadığını değerlendirmenin temel yoludur.",
      },
      { type: "h2", text: "Sık Kullanılan Marketler" },
      {
        type: "p",
        text: "Maç sonucu en bilinen markettir ve ev sahibi, beraberlik veya deplasman seçeneklerini içerir. Alt üst bahsi, toplam gol sayısının belirlenen eşiğin altında mı üstünde mi kalacağını sorar ve hangi takımın kazandığından bağımsızdır. Handikap, güçlü takıma sanal bir dezavantaj yükleyerek dengesiz eşleşmelerde oranı anlamlı hâle getirir. Karşılıklı gol, iki takımın da gol atıp atmayacağına odaklanır. Her marketin kendi mantığı vardır; bilmediğiniz bir markete oran yüksek diye girmek en sık yapılan hatadır.",
      },
      { type: "h2", text: "Canlı Bahiste Zamanlama" },
      {
        type: "p",
        text: "Canlı bahiste oranlar maçın akışına göre saniyeler içinde değişir. Bu, maçı izleyen ve akışı okuyabilen kullanıcı için avantaj yaratır ancak aynı hızda karar vermeyi de zorunlu kılar. Canlı bahiste en yaygın hata, kaybedilen bir kuponu telafi etmek için düşünmeden yeni bahis girmektir. Maç başlamadan hangi marketleri izleyeceğinizi belirlemek ve yalnızca beklediğiniz durum oluştuğunda bahis girmek, canlı bahsi kontrollü kılan en pratik yöntemdir.",
      },
      { type: "h2", text: "Kupon Kurarken Riski Yönetmek" },
      {
        type: "p",
        text: "Kombine kuponlar yüksek oran vaat eder ancak her ek maç kuponun tutma olasılığını çarpan biçiminde düşürür. Sekiz maçlık bir kuponda her maçın tutma olasılığı yüzde 70 olsa bile kuponun tümünün tutma olasılığı yüzde 6'nın altına iner. Bu yüzden deneyimli kullanıcılar kupon başına maç sayısını sınırlı tutar ve bütçesinin küçük bir yüzdesini tek kupona ayırır. Sistem bahis, kombinenin bir kısmının tutmasıyla da kazanç sağladığı için riski yaymanın bir yoludur.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Maç öncesi ve canlı bahis oranları neden farklı?",
        a: "Maç öncesi oran istatistiksel beklentiye dayanır. Canlı oran ise skor, kırmızı kart ve oyun akışı gibi anlık verilere göre yeniden hesaplanır.",
      },
      {
        q: "Kuponu maç devam ederken bozabilir miyim?",
        a: "Bazı maç ve marketlerde erken kazanç seçeneği sunulur; bu durumda kuponu hesaplanan tutar üzerinden kapatabilirsiniz. Her kuponda bu seçenek bulunmaz.",
      },
      {
        q: "Maç ertelenirse bahsim ne olur?",
        a: "Erteleme durumunda ilgili maç genellikle 1.00 oranla iade edilir ve kombine kupon kalan maçlar üzerinden sonuçlanır.",
      },
      {
        q: "Handikap bahsinde beraberlik olursa ne olur?",
        a: "Handikap uygulandıktan sonra skor eşitlenirse bahis iade edilir. Sıfır handikaplı bahislerde bu durum sıkça görülür.",
      },
      {
        q: "En düşük ne kadarla bahis oynanabilir?",
        a: "Minimum kupon tutarı platformun belirlediği alt limite bağlıdır ve genellikle çok düşüktür. Kupon ekranında geçerli alt limit gösterilir.",
      },
      {
        q: "Canlı bahiste oran değişirse kuponum etkilenir mi?",
        a: "Kupon onaylanırken oran değiştiyse sistem size yeni oranı onaylatır. Onaylamadığınız sürece bahis girilmez.",
      },
    ],
    related: [
      "bahis-orani-nasil-okunur",
      "bahis-terimleri-sozlugu",
      "erken-kazanc-cash-out-nedir",
      "e-spor-bahisleri-nasil-oynanir",
      "tenis-bahisleri-marketleri",
      "basketbol-bahis-marketleri",
      "mac-ertelenirse-kupon-ne-olur",
      "oran-degisimi-ve-kupon-onayi",
      "canli-bahis-nasil-oynanir",
      "kombine-ve-sistem-bahis-farki",
      "handikap-bahsi-nedir",
      "alt-ust-bahsi-nedir",
      "bahis-kuponu-nasil-yapilir",
    ],
  },
];

const morePages: LandingPage[] = [
  {
    slug: "meritking-para-yatirma",
    h1: "Meritking Para Yatırma Yöntemleri",
    title: "Meritking Para Yatırma - Yöntemler, Limitler ve Süreler",
    description:
      "Meritking para yatırma yöntemleri: Papara, banka havalesi, kripto ve kart. Yöntem bazlı limitler, işlem süreleri ve yatırımın geç yansıma nedenleri.",
    intent: "Nasıl para yatırırım, hangi yöntem hızlı?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Para yatırma, hesabınızı kullanmaya başladığınız ilk adımdır ve seçtiğiniz yöntem yalnızca yatırımı değil, ilerideki para çekme işleminizi de belirler. Çoğu platformda çekim, yatırım yaptığınız yöntemle yapılır; bu yüzden ilk yatırımda seçtiğiniz kanal uzun süre sizinle kalır. Bu sayfa yöntemleri hız, limit ve pratik kullanım açısından karşılaştırır.",
      },
      { type: "h2", text: "Yöntem Seçerken Belirleyici Olan Üç Şey" },
      {
        type: "p",
        text: "Birincisi işlem süresidir: bazı yöntemlerde bakiye saniyeler içinde yansır, bazılarında saatler sürer. İkincisi limitlerdir; her yöntemin alt ve üst sınırı farklıdır ve küçük tutarlarla oynayan biri için yüksek alt limitli bir yöntem kullanışsızdır. Üçüncüsü ise hesap sahipliğidir: kullandığınız ödeme aracının size ait olması zorunludur, başkasının hesabından yapılan yatırım çekim aşamasında sorun çıkarır.",
      },
      { type: "h2", text: "Hızlı Yansıyan Yöntemler" },
      {
        type: "p",
        text: "Papara ve benzeri dijital cüzdanlar genellikle anında yansır ve alt limitleri düşüktür; bu yüzden küçük tutarlarla düzenli işlem yapanlar için en pratik seçenektir. Kripto para transferlerinde hız ağın yoğunluğuna bağlıdır: onay sayısı tamamlandığında bakiye yansır, bu çoğunlukla birkaç dakikadır ancak ağ yoğunsa uzayabilir. Kart ödemelerinde işlem anında sonuçlanır fakat bankanız aracı kuruma bağlı olarak işlemi reddedebilir.",
      },
      { type: "h2", text: "Banka Havalesi ve EFT" },
      {
        type: "p",
        text: "Havale, mesai saatleri içinde genellikle kısa sürede tamamlanır; mesai dışında ve hafta sonunda ise bir sonraki iş gününe sarkabilir. Havalede en kritik nokta açıklama alanıdır: size verilen referans kodunu eksiksiz yazmazsanız yatırım hesabınızla eşleştirilemez ve manuel inceleme gerekir, bu da işlemi saatlerce geciktirir. Tutarı da kuruşuna kadar bildirdiğiniz şekilde göndermek eşleştirmeyi hızlandırır.",
      },
      { type: "h2", text: "Yatırım Yansımadıysa Ne Yapmalı?" },
      {
        type: "p",
        text: "Önce bankanızdan veya cüzdan uygulamanızdan işlemin gerçekten tamamlandığını doğrulayın; bekleyen durumdaki bir transfer henüz gönderilmemiş sayılır. İşlem tamamlanmışsa dekont veya işlem numarasını hazırlayıp canlı desteğe iletin. Destek ekibinin ihtiyaç duyduğu şey tutar, saat ve referans numarasıdır; bu üçünü birlikte verdiğinizde eşleştirme çoğunlukla kısa sürede yapılır. Aynı işlemi tekrar göndermeyin, mükerrer yatırım geri iade süreci gerektirir.",
      },
      { type: "h2", text: "Yatırımdan Önce Bonus Kararını Verin" },
      {
        type: "p",
        text: "Bonus, yatırım anında seçilir. Yatırımı yaptıktan sonra kampanyaya dâhil olmak çoğu durumda mümkün değildir. Bu yüzden yatırım ekranına gelmeden önce kampanyayı isteyip istemediğinize karar verin. Çevrim şartını tamamlayamayacağınızı düşünüyorsanız bonusu almamak bakiyenizi serbest bırakır ve para çekme işleminizi hızlandırır.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "En hızlı para yatırma yöntemi hangisi?",
        a: "Dijital cüzdanlar genellikle anında yansır. Kripto transferi ağ yoğunluğuna göre birkaç dakika sürer, banka havalesi ise mesai saatlerine bağlıdır.",
      },
      {
        q: "Başkasının hesabından para yatırabilir miyim?",
        a: "Hayır. Ödeme aracının hesap sahibiyle aynı kişiye ait olması zorunludur; aksi hâlde çekim talepleriniz reddedilir.",
      },
      {
        q: "Havalede açıklama kodunu yazmayı unuttum, ne olur?",
        a: "Yatırım otomatik eşleşmez ve manuel incelemeye düşer. Dekontu canlı desteğe ileterek işlemin hesabınıza tanımlanmasını isteyebilirsiniz.",
      },
      {
        q: "Minimum yatırım tutarı ne kadar?",
        a: "Yönteme göre değişir. Dijital cüzdanlarda alt limit düşükken, havale ve kriptoda daha yüksek olabilir; güncel limitler yatırım ekranında gösterilir.",
      },
      {
        q: "Yatırım yaparken komisyon kesilir mi?",
        a: "Platform tarafında genellikle kesinti olmaz. Ancak bankanız veya kripto ağı kendi işlem ücretini uygulayabilir.",
      },
      {
        q: "Yatırdığım yöntemle mi çekmek zorundayım?",
        a: "Kural olarak evet. Bu, ödemenin hesap sahibine ulaşmasını güvence altına alan bir kaynak doğrulaması gereğidir.",
      },
    ],
    related: [
      "papara-ile-yatirim-ve-cekim",
      "kripto-ile-para-yatirma",
      "banka-havalesi-ile-yatirim-ve-cekim",
      "cepbank-ve-atm-ile-yatirim",
      "para-cekme-suresi-ve-limitleri",
      "para-cekme-talebi-neden-bekliyor",
    ],
  },
  {
    slug: "meritking-guvenilir-mi",
    h1: "Meritking Güvenilir mi?",
    title: "Meritking Güvenilir mi? Neye Bakarak Karar Verilir",
    description:
      "Bir bahis platformunun güvenilirliği neye bakarak değerlendirilir? Lisans, ödeme geçmişi, şeffaflık ve şikayet yönetimi üzerinden kontrol listesi.",
    intent: "Güvenilir mi, param yatar mı?",
    updated: "2026-08-30",
    body: [
      {
        type: "p",
        text: "Güvenilirlik sorusunun tek cümlelik bir cevabı yoktur; ölçülebilir göstergelere bakılarak değerlendirilir. Bu sayfada bir platformu değerlendirirken hangi kriterlere bakmanız gerektiğini, hangi işaretlerin uyarı niteliği taşıdığını ve kendi hesabınızın güvenliğini nasıl artıracağınızı anlatıyoruz. Amaç sizi bir sonuca ikna etmek değil, kendi kontrolünüzü yapabilmeniz.",
      },
      { type: "h2", text: "Birinci Ölçüt: Ödeme Geçmişi" },
      {
        type: "p",
        text: "Bir platformun güvenilirliğinin en somut göstergesi, çekim taleplerini bildirdiği sürede ödeyip ödemediğidir. Lisans belgesi ya da site tasarımı bunun yerine geçmez. Değerlendirme yaparken kullanıcıların çekim deneyimlerine, özellikle yüksek tutarlı çekimlerin sonuçlanıp sonuçlanmadığına bakın. Gecikmelerin gerekçeli açıklanması, sessizce beklemede tutulmasından çok daha iyi bir işarettir.",
      },
      { type: "h2", text: "İkinci Ölçüt: Kuralların Şeffaflığı" },
      {
        type: "p",
        text: "Bonus çevrim şartı, çekim limitleri ve hesap doğrulama koşulları sitede açıkça yazıyor mu? Bu kuralların erişilebilir olması, sonradan sürpriz yaşamamanın ön şartıdır. Kampanya sayfasında yalnızca tutar öne çıkarılıp şartların gizlendiği yapılar, sorun çıktığında kullanıcının elini zayıflatır. İyi bir platform kendi kısıtlarını da yazar.",
      },
      { type: "h2", text: "Üçüncü Ölçüt: Destek Erişimi" },
      {
        type: "p",
        text: "Sorun yaşandığında ulaşılabilirlik, güvenilirliğin pratik karşılığıdır. Canlı desteğin gerçekten yanıt verip vermediği, yazılı taleplerin kayıt altına alınıp alınmadığı ve verilen cevabın kalıplaşmış bir metin mi yoksa dosyanıza özel bir açıklama mı olduğu belirleyicidir. Belge gönderimi ve ödeme itirazı gibi konularda yazılı kanal kullanmak, elinizde kayıt bırakması açısından her zaman daha güvenlidir.",
      },
      { type: "h2", text: "Uyarı İşaretleri" },
      {
        type: "p",
        text: "Çekim talebi sonrası sürekli yeni belge istenmesi, her seferinde farklı bir gerekçe sunulması ve destek kanalının aniden yanıt vermemesi ciddi uyarı işaretleridir. Bir diğer uyarı, kazanç sonrası hesabın açıklama yapılmadan kısıtlanmasıdır. Kampanya kurallarının işlem yapıldıktan sonra geriye dönük değiştirilmesi de kabul edilebilir bir uygulama değildir. Bu durumlarda yazışmaların ekran görüntüsünü saklamak, itiraz sürecinde işinize yarar.",
      },
      { type: "h2", text: "Kendi Tarafınızdaki Güvenlik" },
      {
        type: "p",
        text: "Güvenliğin yarısı kullanıcı tarafındadır. Hesabınıza özel, başka hiçbir yerde kullanmadığınız bir şifre belirleyin ve mümkünse iki adımlı doğrulamayı açın. Kimlik doğrulamanızı çekim yapmadan önce tamamlayın; bu, en sık yaşanan gecikme nedenini baştan ortadan kaldırır. Ortak bilgisayar ve halka açık Wi-Fi ağlarında oturum açmaktan kaçının. Son olarak yatırım limiti tanımlayın: bu hem bütçe hem güvenlik aracıdır.",
      },
      {
        type: "p",
        text: "18+ · Oyun bir eğlence biçimidir, kazanç garantisi değildir. Lütfen sorumlu oynayın.",
      },
    ],
    faq: [
      {
        q: "Bir bahis sitesinin güvenilir olduğu nasıl anlaşılır?",
        a: "En somut ölçüt çekim taleplerinin bildirilen sürede ödenmesidir. Bunun yanında kuralların şeffaf yazılması ve destek kanalının gerçekten çalışması belirleyicidir.",
      },
      {
        q: "Çekimim sürekli erteleniyor, ne yapmalıyım?",
        a: "Talebin hangi aşamada olduğunu yazılı olarak sorun ve gerekçe isteyin. Yazışmaları saklayın; belge eksiği varsa tamamlayın, gerekçesiz gecikme sürüyorsa bu bir uyarı işaretidir.",
      },
      {
        q: "Kimlik belgemi göndermek güvenli mi?",
        a: "Kimlik doğrulaması sektör standardıdır ve para aklamayı önleme yükümlülüğünden doğar. Belgeleri yalnızca platformun resmî destek kanalından gönderin, üçüncü kişilere iletmeyin.",
      },
      {
        q: "Hesabım kısıtlandı, sebebi ne olabilir?",
        a: "Çoklu hesap, başkasına ait ödeme aracı kullanımı veya doğrulanmamış bilgi en yaygın nedenlerdir. Destek ekibinden yazılı gerekçe isteyin.",
      },
      {
        q: "İki adımlı doğrulama gerçekten gerekli mi?",
        a: "Evet. Şifreniz başka bir yerden sızsa bile hesabınıza girilmesini engelleyen en etkili tek önlemdir.",
      },
      {
        q: "Şikayetimi nereye iletmeliyim?",
        a: "Önce platformun yazılı destek kanalına, kayıt bırakacak şekilde iletin. İşlem numarası, tarih ve tutar bilgisini eklemek çözüm süresini kısaltır.",
      },
    ],
    related: [
      "iki-adimli-dogrulama-nasil-acilir",
      "hesap-bilgilerini-guncelleme",
      "sorumlu-oyun-limit-nasil-konur",
      "kumar-bagimliligi-belirtileri-ve-destek",
      "hesap-dogrulama-kyc-neden-gerekli",
      "para-cekme-talebi-neden-bekliyor",
      "hesap-kapatma-nasil-yapilir",
    ],
  },
];

/** Tum niyet sayfalari - sitemap, hub bolumu ve ic link hesaplari bunu kullanir */
export const landingPages: LandingPage[] = [...corePages, ...morePages];

export function getLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
