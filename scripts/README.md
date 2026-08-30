# SEO & Performans Araç Hattı

Statik export (`out/`) üzerinde çalışan, dış servis gerektirmeyen shell tabanlı denetim araçları. İki denetleyici: **SEO** (`seo-audit.sh`) ve **performans/yük bütçesi** (`perf-audit.sh`).

## Çalıştırma

```bash
# SEO denetimi
npm run seo

# Performans / yük bütçesi denetimi
npm run perf

# İkisi birden
npm run audit

# Önce build al, sonra ikisini de çalıştır
npm run audit:build

# Doğrudan (farklı bir dizin için)
bash scripts/seo-audit.sh out
bash scripts/perf-audit.sh out
```

## Ne kontrol eder

**Sayfa denetimi** — her HTML için: `<title>` uzunluğu (30–60), meta description uzunluğu (70–160), canonical, tek `<h1>`, Open Graph etiketleri, JSON-LD yapısal veri, `viewport`, `<html lang>`, `alt`'sız `<img>`.

**Teknik SEO** — `sitemap.xml` ↔ `out/` paritesi (her URL'nin dosyası, her sayfanın sitemap kaydı), `robots.txt` + Sitemap satırı, `og:image` dosyasının gerçekten var olması, kırık iç linkler.

**Yinelenenler** — aynı title veya aynı description'ı paylaşan sayfalar.

## Çıktı

- Terminalde renkli özet + skor (100 tavan; A/B/C/D notu).
- `scripts/reports/seo-report.{md,html}` ve `scripts/reports/perf-report.{md,html}` — sorun tablosu + sayfa detayı.
- Çıkış kodu: hata bulunursa `1` (CI'de kullanılabilir), aksi halde `0`.

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
