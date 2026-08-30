# SEO Araç Hattı

Statik export (`out/`) üzerinde çalışan, dış servis gerektirmeyen shell tabanlı SEO denetimi.

## Çalıştırma

```bash
# Mevcut out/ klasörünü denetle
npm run seo

# Önce build al, sonra denetle
npm run seo:build

# Doğrudan (farklı bir dizin için)
bash scripts/seo-audit.sh out
```

## Ne kontrol eder

**Sayfa denetimi** — her HTML için: `<title>` uzunluğu (30–60), meta description uzunluğu (70–160), canonical, tek `<h1>`, Open Graph etiketleri, JSON-LD yapısal veri, `viewport`, `<html lang>`, `alt`'sız `<img>`.

**Teknik SEO** — `sitemap.xml` ↔ `out/` paritesi (her URL'nin dosyası, her sayfanın sitemap kaydı), `robots.txt` + Sitemap satırı, `og:image` dosyasının gerçekten var olması, kırık iç linkler.

**Yinelenenler** — aynı title veya aynı description'ı paylaşan sayfalar.

## Çıktı

- Terminalde renkli özet + skor (her hata −5, her uyarı −1; 100 tavan; A/B/C/D notu).
- `scripts/reports/seo-report.md` ve `scripts/reports/seo-report.html` — sorun tablosu + sayfa detayı.
- Çıkış kodu: hata bulunursa `1` (CI'de kullanılabilir), aksi halde `0`.

## Notlar

- Türkçe karakterler (ç ş ğ ı ö ü) **karakter** olarak sayılır (`LC_ALL=C.UTF-8`); bayt sayımı uzunlukları şişirir.
- Eşikler script başındaki `TITLE_MIN/MAX`, `DESC_MIN/MAX` ile değiştirilebilir.
- `404.html` ve `_not-found.html` denetim dışıdır.
