# SEO & Performans Araç Hattı

Statik export (`out/`) üzerinde çalışan, dış servis gerektirmeyen denetim araçları. Üç denetleyici: **SEO** (`seo-audit.sh`), **performans/yük bütçesi** (`perf-audit.sh`) ve **içerik açığı** (`content-gap.mjs`).

İlk ikisi shell tabanlıdır. Üçüncüsü Node ile yazıldı: Türkçe büyük/küçük harf katlaması (I/i/İ/ı), aksan ayrıştırma ve eklemeli dilde kelime eşleştirme Unicode farkındalığı ister; sh araçlarıyla doğru yapmak kırılgan olurdu.

## Çalıştırma

```bash
# SEO denetimi
npm run seo

# Performans / yük bütçesi denetimi
npm run perf

# İçerik açığı denetimi
npm run gap

# Üçü birden
npm run audit

# Önce build al, sonra üçünü de çalıştır
npm run audit:build

# Doğrudan (farklı bir dizin için)
bash scripts/seo-audit.sh out
bash scripts/perf-audit.sh out
node scripts/content-gap.mjs out
```

## Ne kontrol eder

**Sayfa denetimi** — her HTML için: `<title>` uzunluğu (30–60), meta description uzunluğu (70–160), canonical, tek `<h1>`, Open Graph etiketleri, JSON-LD yapısal veri, `viewport`, `<html lang>`, `alt`'sız `<img>`.

**Teknik SEO** — `sitemap.xml` ↔ `out/` paritesi (her URL'nin dosyası, her sayfanın sitemap kaydı), `robots.txt` + Sitemap satırı, `og:image` dosyasının gerçekten var olması, kırık iç linkler.

**Yinelenenler** — aynı title veya aynı description'ı paylaşan sayfalar.

**İçerik açığı** (`content-gap.mjs`) — her sayfanın `<meta name="keywords">` içinde hedeflediğini söylediği sorguların gövdede gerçekten geçip geçmediği. Üç sınıfa ayırır: **tam** (ifade birebir geçiyor, ek almış hâli dâhil), **dağılmış** (kelimelerin hepsi var ama ifade olarak yok), **eksik** (en az bir kelime hiç geçmiyor). Ayrıca sayfanın ana sorgusunun H1/H2/H3 içinde geçip geçmediğini işaretler. `noindex` sayfalar denetim dışıdır.

Bu denetim bir hata listesi değil, **iş listesidir**: `meta keywords` sıralamayı etkilemez, gövdedeki karşılığı etkiler. "Eksik" satırları yazılacak içeriği gösterir.

## Çıktı

- Terminalde renkli özet + skor (100 tavan; A/B/C/D notu).
- `scripts/reports/seo-report.{md,html}`, `scripts/reports/perf-report.{md,html}` ve `scripts/reports/content-gap.{md,html}` — sorun tablosu + sayfa detayı.
- Çıkış kodu: hata bulunursa `1` (CI'de kullanılabilir), aksi halde `0`. İçerik açığı denetimi bir kapı değil rapordur; her zaman `0` döner.

## Performans denetimi (perf-audit.sh)

CWV'nin kontrol edilebilir girdisi = sayfa başına indirilen bayt. Her sayfa için gerçekte tarayıcıya giden yükü (**gzip'li**) ölçer:

- **HTML / JS / CSS / toplam** ağırlık (gzip KB).
- **Font hijyeni** — preload + `font-display: swap`.

JS için mutlak eşik yerine **taban-göreli** yaklaşım: tüm sayfaların ortak çerçeve tabanı (min First Load JS) ölçülür; sadece tabandan belirgin sapan sayfalar işaretlenir. Böylece iyi kod-bölünmüş bir site cezalandırılmaz, sonradan ağır bir bağımlılık ekleyen sayfa **regresyon** olarak yakalanır. Ayrıca `280KB gz` mutlak tavan vardır.

> **Önemli:** gzip değerleri "sunucu sıkıştırma yaparsa" indirilecek boyuttur. Sunucunun (Nginx/host) gerçekten gzip/brotli sunduğunu canlıda doğrulayın — sıkıştırma kapalıysa kullanıcı ~3 katı byte indirir:
> ```bash
> curl -sI -H 'Accept-Encoding: gzip, br' https://SITE/_next/static/chunks/CHUNK.js | grep -i content-encoding
> ```

## Notlar

- Türkçe karakterler (ç ş ğ ı ö ü) **karakter** olarak sayılır (`LC_ALL=C.UTF-8`); bayt sayımı uzunlukları şişirir.
- Eşikler script başındaki `TITLE_MIN/MAX`, `DESC_MIN/MAX` ile değiştirilebilir.
- `404.html` ve `_not-found.html` denetim dışıdır.
