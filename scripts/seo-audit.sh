#!/usr/bin/env bash
#
# seo-audit.sh — Statik export (out/) icin shell tabanli SEO denetimi
# ------------------------------------------------------------------
# Ne yapar:
#   1) Sayfa denetimi   : title/description uzunlugu, canonical, tek H1,
#                         og etiketleri, JSON-LD, viewport, lang, img alt
#   2) Teknik SEO        : sitemap.xml <-> out/ paritesi, robots.txt,
#                         og:image dosyasi, kirik ic linkler
#   3) Yinelenenler      : ayni title / ayni description birden fazla sayfada
#   4) Rapor             : skorlu Markdown + HTML rapor (scripts/reports/)
#
# Kullanim:
#   bash scripts/seo-audit.sh [OUT_DIR]
#   OUT_DIR verilmezse "out" kullanilir.
#
# Cikis kodu: hata (error) bulunursa 1, aksi halde 0.

set -u

# Turkce karakterleri (ç ş ğ ı ö ü) bayt degil KARAKTER olarak say —
# aksi halde title/description uzunluklari sisip sahte uyari uretir.
export LC_ALL=C.UTF-8

# ---- Ayarlar --------------------------------------------------------
OUT_DIR="${1:-out}"
PUBLIC_DIR="public"
REPORT_DIR="scripts/reports"

# Onerilen aralik esikleri (Google SERP pratigi)
TITLE_MIN=30;  TITLE_MAX=60
DESC_MIN=70;   DESC_MAX=160

# noindex/yardimci sayfalar - denetim disi
SKIP_REGEX='(^|/)(404|_not-found)\.html$'

# ---- Renkler --------------------------------------------------------
if [ -t 1 ]; then
  R=$'\e[31m'; G=$'\e[32m'; Y=$'\e[33m'; B=$'\e[34m'; C=$'\e[36m'; D=$'\e[2m'; N=$'\e[0m'
else
  R=; G=; Y=; B=; C=; D=; N=
fi

# ---- On kosullar ----------------------------------------------------
if [ ! -d "$OUT_DIR" ]; then
  echo "${R}HATA:${N} '$OUT_DIR' klasoru yok. Once 'npm run build' calistirin." >&2
  exit 2
fi

mkdir -p "$REPORT_DIR"
TS="$(date '+%Y-%m-%d %H:%M')"
MD="$REPORT_DIR/seo-report.md"
HTML="$REPORT_DIR/seo-report.html"

# Site tabani (sitemap ilk <loc> host'undan)
SITE=""
if [ -f "$OUT_DIR/sitemap.xml" ]; then
  SITE="$(grep -oiE '<loc>https?://[^/<]+' "$OUT_DIR/sitemap.xml" | head -1 | sed 's/<loc>//I')"
fi

# ---- Sayaclar / birikim ---------------------------------------------
ERRORS=0; WARNS=0; PAGES=0
declare -a ROWS=()      # Markdown tablo satirlari
declare -a ISSUES=()    # "SEV|sayfa|mesaj"
TITLES_FILE="$(mktemp)"
DESCS_FILE="$(mktemp)"
trap 'rm -f "$TITLES_FILE" "$DESCS_FILE"' EXIT

add_issue() { # sev sayfa mesaj
  ISSUES+=("$1|$2|$3")
  case "$1" in
    ERROR) ERRORS=$((ERRORS+1)); echo "  ${R}✗${N} $3";;
    WARN)  WARNS=$((WARNS+1));   echo "  ${Y}!${N} $3";;
  esac
}

# HTML attr/etiket cikarma yardimcilari (tek satira indirgeyerek)
extract() { tr '\n' ' ' < "$1"; }

# ---- URL -> dosya eslemesi -----------------------------------------
# /            -> index.html
# /araclar     -> araclar.html
# /blog/x      -> blog/x.html
path_to_file() {
  local p="$1"
  p="${p#/}"                      # bastaki / at
  p="${p%/}"                      # sondaki / at
  if [ -z "$p" ]; then echo "$OUT_DIR/index.html"; else echo "$OUT_DIR/$p.html"; fi
}

echo "${B}== SEO Denetimi ==${N}  ($OUT_DIR, site: ${SITE:-bilinmiyor})"
echo

# ---- 1) SAYFA DENETIMI ----------------------------------------------
while IFS= read -r f; do
  echo "$f" | grep -qE "$SKIP_REGEX" && continue
  # noindex sayfalari ( or. iframe embed'leri) arama icin degil - denetim disi
  grep -qiE '<meta name="robots"[^>]*content="[^"]*noindex' "$f" && continue
  PAGES=$((PAGES+1))
  rel="${f#$OUT_DIR/}"
  html="$(extract "$f")"

  # -- title
  title="$(printf '%s' "$html" | grep -oiE '<title>[^<]*</title>' | head -1 | sed -E 's/<[^>]+>//g')"
  tlen=${#title}
  if [ -z "$title" ]; then
    add_issue ERROR "$rel" "$rel — <title> yok"
  else
    printf '%s\t%s\n' "$title" "$rel" >> "$TITLES_FILE"
    if [ "$tlen" -lt "$TITLE_MIN" ] || [ "$tlen" -gt "$TITLE_MAX" ]; then
      add_issue WARN "$rel" "$rel — title $tlen krkt (onerilen $TITLE_MIN-$TITLE_MAX)"
    fi
  fi

  # -- meta description
  desc="$(printf '%s' "$html" | grep -oiE '<meta name="description" content="[^"]*"' | head -1 | sed -E 's/.*content="([^"]*)".*/\1/')"
  dlen=${#desc}
  if [ -z "$desc" ]; then
    add_issue ERROR "$rel" "$rel — meta description yok"
  else
    printf '%s\t%s\n' "$desc" "$rel" >> "$DESCS_FILE"
    if [ "$dlen" -lt "$DESC_MIN" ] || [ "$dlen" -gt "$DESC_MAX" ]; then
      add_issue WARN "$rel" "$rel — description $dlen krkt (onerilen $DESC_MIN-$DESC_MAX)"
    fi
  fi

  # -- canonical
  canon="$(printf '%s' "$html" | grep -oiE '<link rel="canonical"[^>]*>' | head -1)"
  [ -z "$canon" ] && add_issue WARN "$rel" "$rel — canonical yok"

  # -- H1 sayisi
  h1c="$(printf '%s' "$html" | grep -oiE '<h1[ >]' | wc -l | tr -d ' ')"
  if [ "$h1c" -eq 0 ]; then
    add_issue ERROR "$rel" "$rel — H1 yok"
  elif [ "$h1c" -gt 1 ]; then
    add_issue WARN "$rel" "$rel — $h1c adet H1 (tek olmali)"
  fi

  # -- og etiketleri
  ogt="$(printf '%s' "$html" | grep -oiE '<meta property="og:title"' | head -1)"
  ogd="$(printf '%s' "$html" | grep -oiE '<meta property="og:description"' | head -1)"
  ogi="$(printf '%s' "$html" | grep -oiE '<meta property="og:image"' | head -1)"
  [ -z "$ogt$ogd$ogi" ] && add_issue WARN "$rel" "$rel — og etiketleri eksik"

  # -- JSON-LD
  ld="$(printf '%s' "$html" | grep -oiE 'application/ld\+json' | wc -l | tr -d ' ')"
  [ "$ld" -eq 0 ] && add_issue WARN "$rel" "$rel — JSON-LD yapisal veri yok"

  # -- viewport & lang
  printf '%s' "$html" | grep -qiE '<meta name="viewport"' || add_issue WARN "$rel" "$rel — viewport meta yok"
  printf '%s' "$html" | grep -qiE '<html[^>]*lang="[^"]+"' || add_issue WARN "$rel" "$rel — <html lang> yok"

  # -- alt'siz img
  noalt="$(printf '%s' "$html" | grep -oiE '<img [^>]*>' | grep -viE ' alt=' | wc -l | tr -d ' ')"
  [ "$noalt" -gt 0 ] && add_issue WARN "$rel" "$rel — $noalt img alt'siz"

  # -- Markdown tablo satiri
  ok_t=$([ -n "$title" ] && echo "$tlen" || echo "—")
  ok_d=$([ -n "$desc" ] && echo "$dlen" || echo "—")
  ROWS+=("| $rel | $ok_t | $ok_d | $h1c | $([ -n "$canon" ] && echo ✓ || echo ✗) | $ld | $noalt |")
done < <(find "$OUT_DIR" -name '*.html' | sort)

# ---- 2) YINELENEN title / description -------------------------------
echo
echo "${B}== Yinelenenler ==${N}"
DUP_T="$(sort "$TITLES_FILE" | awk -F'\t' '{c[$1]++} END{for(k in c) if(c[k]>1) print c[k]"x "k}')"
DUP_D="$(sort "$DESCS_FILE" | awk -F'\t' '{c[$1]++} END{for(k in c) if(c[k]>1) print c[k]"x "k}')"
if [ -n "$DUP_T" ]; then
  while IFS= read -r line; do add_issue ERROR "(genel)" "Yinelenen title: $line"; done <<< "$DUP_T"
else echo "  ${G}✓${N} Yinelenen title yok"; fi
if [ -n "$DUP_D" ]; then
  while IFS= read -r line; do add_issue WARN "(genel)" "Yinelenen description: $line"; done <<< "$DUP_D"
else echo "  ${G}✓${N} Yinelenen description yok"; fi

# ---- 3) TEKNIK SEO --------------------------------------------------
echo
echo "${B}== Teknik SEO ==${N}"

# robots.txt
if [ -f "$OUT_DIR/robots.txt" ]; then
  grep -qiE '^sitemap:' "$OUT_DIR/robots.txt" || add_issue WARN "robots.txt" "robots.txt — Sitemap satiri yok"
  echo "  ${G}✓${N} robots.txt mevcut"
else
  add_issue ERROR "robots.txt" "robots.txt yok"
fi

# sitemap.xml <-> out/ paritesi
SM_MISSING=0; PAGE_MISSING=0
if [ -f "$OUT_DIR/sitemap.xml" ]; then
  echo "  ${G}✓${N} sitemap.xml mevcut"
  # sitemap'teki her URL icin dosya var mi?
  while IFS= read -r loc; do
    path="${loc#http*://}"; path="/${path#*/}"      # host'u at, path'i al
    [ "$path" = "/${SITE#http*://}" ] && path="/"    # host==path ise koke indir
    file="$(path_to_file "$path")"
    if [ ! -f "$file" ]; then
      add_issue ERROR "sitemap" "sitemap URL karsiligi yok: $path -> $file"
      SM_MISSING=$((SM_MISSING+1))
    fi
  done < <(grep -oiE '<loc>[^<]+' "$OUT_DIR/sitemap.xml" | sed 's/<loc>//I')

  # out/ icindeki her indekslenebilir sayfa sitemap'te var mi?
  while IFS= read -r f; do
    echo "$f" | grep -qE "$SKIP_REGEX" && continue
    grep -qiE '<meta name="robots"[^>]*content="[^"]*noindex' "$f" && continue  # noindex = sitemap disi, dogal
    rel="${f#$OUT_DIR/}"
    slug="/${rel%.html}"; [ "$rel" = "index.html" ] && slug="/"
    slug="${slug%/index}"
    # sitemap loc ile eslesme (sonu slug ile biten)
    if ! grep -qiE "<loc>[^<]*${slug//\//\\/}(</loc>|/</loc>)" "$OUT_DIR/sitemap.xml"; then
      # koke ozel kontrol
      if [ "$slug" = "/" ]; then
        grep -qiE "<loc>https?://[^/]+/?</loc>" "$OUT_DIR/sitemap.xml" || { add_issue WARN "sitemap" "sitemap'te yok: $slug"; PAGE_MISSING=$((PAGE_MISSING+1)); }
      else
        add_issue WARN "sitemap" "sitemap'te yok: $slug ($rel)"
        PAGE_MISSING=$((PAGE_MISSING+1))
      fi
    fi
  done < <(find "$OUT_DIR" -name '*.html' | sort)
  [ "$SM_MISSING" -eq 0 ] && [ "$PAGE_MISSING" -eq 0 ] && echo "  ${G}✓${N} sitemap <-> sayfa paritesi tam"
else
  add_issue ERROR "sitemap" "sitemap.xml yok"
fi

# og:image dosyasi gercekten var mi (ilk sayfadan ornek)
OGIMG="$(grep -oiE '<meta property="og:image" content="[^"]*"' "$OUT_DIR/index.html" 2>/dev/null | head -1 | sed -E 's/.*content="([^"]*)".*/\1/')"
if [ -n "$OGIMG" ]; then
  imgpath="${OGIMG#http*://}"; imgpath="/${imgpath#*/}"
  if [ ! -f "$OUT_DIR$imgpath" ] && [ ! -f "$PUBLIC_DIR$imgpath" ]; then
    add_issue ERROR "og:image" "og:image dosyasi yok: $imgpath (out/ ve public/ altinda)"
  else
    echo "  ${G}✓${N} og:image dosyasi mevcut ($imgpath)"
  fi
fi

# Kirik ic linkler
echo "  ${D}ic linkler taraniyor...${N}"
BROKEN=0
BROKEN_SET="$(
  find "$OUT_DIR" -name '*.html' | while IFS= read -r f; do
    echo "$f" | grep -qE "$SKIP_REGEX" && continue
    grep -oiE 'href="/[a-z0-9/_-]*"' "$f" | sed -E 's/href="([^"]*)"/\1/'
  done | sort -u | while IFS= read -r link; do
    [ -z "$link" ] && continue
    file="$(path_to_file "$link")"
    # dizin index'i de olabilir
    if [ ! -f "$file" ] && [ ! -f "$OUT_DIR${link%/}/index.html" ]; then
      echo "$link"
    fi
  done
)"
if [ -n "$BROKEN_SET" ]; then
  while IFS= read -r link; do
    [ -z "$link" ] && continue
    add_issue ERROR "ic-link" "kirik ic link: $link"
    BROKEN=$((BROKEN+1))
  done <<< "$BROKEN_SET"
else
  echo "  ${G}✓${N} kirik ic link yok"
fi

# ---- 4) SKOR --------------------------------------------------------
# Basit skor: her error -5, her warn -1, 100 tavan
SCORE=$((100 - ERRORS*5 - WARNS*1))
[ "$SCORE" -lt 0 ] && SCORE=0
if   [ "$SCORE" -ge 90 ]; then GRADE="A"; GC=$G
elif [ "$SCORE" -ge 75 ]; then GRADE="B"; GC=$G
elif [ "$SCORE" -ge 60 ]; then GRADE="C"; GC=$Y
else GRADE="D"; GC=$R; fi

echo
echo "${B}== Ozet ==${N}"
echo "  Sayfa: $PAGES   ${R}Hata: $ERRORS${N}   ${Y}Uyari: $WARNS${N}"
echo "  Skor: ${GC}$SCORE/100 ($GRADE)${N}"

# ---- 5) MARKDOWN RAPOR ----------------------------------------------
{
  echo "# SEO Denetim Raporu"
  echo
  echo "- **Tarih:** $TS"
  echo "- **Site:** ${SITE:-—}"
  echo "- **Taranan sayfa:** $PAGES"
  echo "- **Skor:** **$SCORE/100 ($GRADE)** — Hata: $ERRORS, Uyari: $WARNS"
  echo
  echo "## Sorunlar"
  echo
  if [ "${#ISSUES[@]}" -eq 0 ]; then
    echo "_Sorun bulunamadi._"
  else
    echo "| Onem | Kapsam | Aciklama |"
    echo "|------|--------|----------|"
    for i in "${ISSUES[@]}"; do
      sev="${i%%|*}"; rest="${i#*|}"; scope="${rest%%|*}"; msg="${rest#*|}"
      badge=$([ "$sev" = ERROR ] && echo "🔴 Hata" || echo "🟡 Uyari")
      echo "| $badge | \`$scope\` | ${msg//|/\\|} |"
    done
  fi
  echo
  echo "## Sayfa detayi"
  echo
  echo "| Sayfa | Title uz. | Desc uz. | H1 | Canonical | JSON-LD | Alt'siz img |"
  echo "|-------|-----------|----------|----|-----------|---------|-------------|"
  for r in "${ROWS[@]}"; do echo "$r"; done
  echo
  echo "---"
  echo "_Uretici: \`scripts/seo-audit.sh\` — esikler: title $TITLE_MIN-$TITLE_MAX, desc $DESC_MIN-$DESC_MAX._"
} > "$MD"

# ---- 6) HTML RAPOR (basit, tema uyumlu) -----------------------------
{
  cat <<HDR
<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEO Raporu — $SITE</title>
<style>
:root{color-scheme:light dark}
body{font:15px/1.5 system-ui,Segoe UI,Arial;margin:0;padding:2rem;max-width:1000px;margin:auto}
h1{margin:0 0 .25rem} .sub{opacity:.7;margin-bottom:1.5rem}
.score{font-size:2.5rem;font-weight:800}
.g-A,.g-B{color:#16a34a}.g-C{color:#ca8a04}.g-D{color:#dc2626}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}
th,td{border:1px solid #8883;padding:.4rem .6rem;text-align:left}
th{background:#8881}
.err{color:#dc2626;font-weight:600}.warn{color:#ca8a04}
.pill{display:inline-block;padding:.1rem .5rem;border-radius:99px;font-size:12px}
</style></head><body>
<h1>SEO Denetim Raporu</h1>
<div class="sub">$TS &middot; ${SITE:-—} &middot; $PAGES sayfa</div>
<div class="score g-$GRADE">$SCORE/100 <small>($GRADE)</small></div>
<p><span class="err">Hata: $ERRORS</span> &nbsp; <span class="warn">Uyari: $WARNS</span></p>
<h2>Sorunlar</h2>
HDR
  if [ "${#ISSUES[@]}" -eq 0 ]; then
    echo "<p>Sorun bulunamadi.</p>"
  else
    echo "<table><tr><th>Onem</th><th>Kapsam</th><th>Aciklama</th></tr>"
    for i in "${ISSUES[@]}"; do
      sev="${i%%|*}"; rest="${i#*|}"; scope="${rest%%|*}"; msg="${rest#*|}"
      cls=$([ "$sev" = ERROR ] && echo err || echo warn)
      lbl=$([ "$sev" = ERROR ] && echo "🔴 Hata" || echo "🟡 Uyari")
      # html-escape minimal
      msg="${msg//&/&amp;}"; msg="${msg//</&lt;}"
      echo "<tr><td class=\"$cls\">$lbl</td><td><code>$scope</code></td><td>$msg</td></tr>"
    done
    echo "</table>"
  fi
  echo "<h2>Sayfa detayi</h2>"
  echo "<table><tr><th>Sayfa</th><th>Title uz.</th><th>Desc uz.</th><th>H1</th><th>Canonical</th><th>JSON-LD</th><th>Alt'siz</th></tr>"
  for r in "${ROWS[@]}"; do
    IFS='|' read -r _ p tt dd hh cc jj aa _ <<< "$r"
    echo "<tr><td>${p## }</td><td>${tt## }</td><td>${dd## }</td><td>${hh## }</td><td>${cc## }</td><td>${jj## }</td><td>${aa## }</td></tr>"
  done
  echo "</table><hr><p style='opacity:.6'>Uretici: scripts/seo-audit.sh</p></body></html>"
} > "$HTML"

echo
echo "  ${C}Rapor:${N} $MD"
echo "  ${C}Rapor:${N} $HTML"

[ "$ERRORS" -gt 0 ] && exit 1 || exit 0
