#!/usr/bin/env bash
#
# perf-audit.sh — Statik export (out/) icin performans / yuk butcesi denetimi
# --------------------------------------------------------------------------
# CWV'nin kontrol edilebilir girdisi = sayfa basina indirilen bayt.
# Bu arac her sayfa icin gercekte tarayiciya giden yuku olcer (gzip'li),
# butce esiklerine gore isaretler ve skorlu rapor uretir.
#
# Olculenler (sayfa basina):
#   - HTML agirligi           (raw + gzip)
#   - First Load JS           (sayfanin yukledigi tum _next chunk'lari, raw + gzip)
#   - CSS agirligi            (raw + gzip)
#   - Toplam transfer         (HTML + JS + CSS, gzip)
# Genel:
#   - Font preload + font-display:swap hijyeni
#
# NOT: gzip degerleri "sunucu sikistirma yapiyorsa" indirilecek boyuttur.
#      Sunucunun gercekte gzip/brotli sundugunu canli sitede dogrulayin:
#        curl -sI -H 'Accept-Encoding: gzip' https://SITE/_next/.../chunk.js | grep -i content-encoding
#
# Kullanim:  bash scripts/perf-audit.sh [OUT_DIR]
# Cikis kodu: butce asimi (error) varsa 1, yoksa 0.

set -u
export LC_ALL=C.UTF-8

OUT_DIR="${1:-out}"
REPORT_DIR="scripts/reports"
SKIP_REGEX='(^|/)(404|_not-found)\.html$'

# ---- Butceler (gzip'li, KB) ----------------------------------------
# JS icin mutlak esik yerine "taban-goreli" yaklasim: once tum sayfalarin
# ortak cerceve tabani (min First Load JS) olculur; sadece tabandan belirgin
# sapan (regresyon/aykiri) sayfalar isaretlenir. Boylece iyi kod-bolunmus bir
# site cezalandirilmaz; sonradan agir bir bagimlilik ekleyen sayfa yakalanir.
JS_MARGIN=40                   # taban + bu KADAR KB ustu = aykiri (uyari)
JS_HARD=280                    # mutlak tavan (KB gz) = hata
CSS_WARN=30                    # CSS
HTML_WARN=60                   # HTML belgesi
PAGE_WARN=280; PAGE_ERR=400    # Toplam transfer

# ---- Renkler --------------------------------------------------------
if [ -t 1 ]; then
  R=$'\e[31m'; G=$'\e[32m'; Y=$'\e[33m'; B=$'\e[34m'; C=$'\e[36m'; D=$'\e[2m'; N=$'\e[0m'
else R=; G=; Y=; B=; C=; D=; N=; fi

[ -d "$OUT_DIR" ] || { echo "${R}HATA:${N} '$OUT_DIR' yok. Once 'npm run build'." >&2; exit 2; }
mkdir -p "$REPORT_DIR"
TS="$(date '+%Y-%m-%d %H:%M')"
MD="$REPORT_DIR/perf-report.md"
HTML="$REPORT_DIR/perf-report.html"

ERRORS=0; WARNS=0; PAGES=0
declare -a ROWS=() ISSUES=()
declare -a M_REL=() M_HTML=() M_JS=() M_CSS=() M_TOTAL=() M_JSRAW=()   # sayfa metrikleri
declare -A GZCACHE=()   # dosya -> gzip bayt (paylasilan chunk'lari tekrar sikistirma)

kb() { echo $(( ($1 + 512) / 1024 )); }   # bayt -> KB (yuvarla)

gzsize() { # dosya -> gzip bayt (cache'li)
  local f="$1"
  if [ -n "${GZCACHE[$f]:-}" ]; then echo "${GZCACHE[$f]}"; return; fi
  local g=0; [ -f "$f" ] && g=$(gzip -c "$f" | wc -c)
  GZCACHE[$f]=$g; echo "$g"
}

add_issue() { # sev sayfa mesaj
  ISSUES+=("$1|$2|$3")
  case "$1" in
    ERROR) ERRORS=$((ERRORS+1)); echo "  ${R}✗${N} $3";;
    WARN)  WARNS=$((WARNS+1));   echo "  ${Y}!${N} $3";;
  esac
}

echo "${B}== Performans / Yuk Butcesi ==${N}  ($OUT_DIR)"
echo "${D}Butceler (gzip): JS taban+${JS_MARGIN} aykiri / ${JS_HARD} tavan  CSS ${CSS_WARN}  HTML ${HTML_WARN}  Toplam ${PAGE_WARN}/${PAGE_ERR} KB${N}"
echo

# ---- Font hijyeni (genel, index ornegi) ----------------------------
SAMPLE="$OUT_DIR/index.html"
if [ -f "$SAMPLE" ]; then
  grep -qiE '<link[^>]*rel="preload"[^>]*as="font"' "$SAMPLE" \
    && echo "  ${G}✓${N} Font preload mevcut" \
    || add_issue WARN "(genel)" "Font preload yok (LCP'yi geciktirebilir)"
  css_ref="$(grep -oE '/_next/static/[^\"]+\.css' "$SAMPLE" | head -1)"
  if [ -n "$css_ref" ] && grep -qi 'swap' "$OUT_DIR$css_ref" 2>/dev/null; then
    echo "  ${G}✓${N} font-display: swap mevcut"
  else
    add_issue WARN "(genel)" "font-display: swap bulunamadi (FOIT riski)"
  fi
fi
echo

# ---- Sayfa dongusu --------------------------------------------------
while IFS= read -r f; do
  echo "$f" | grep -qE "$SKIP_REGEX" && continue
  PAGES=$((PAGES+1))
  rel="${f#$OUT_DIR/}"

  # HTML
  html_raw=$(stat -c%s "$f"); html_gz=$(gzsize "$f")

  # JS chunk'lari (benzersiz)
  js_raw=0; js_gz=0
  while IFS= read -r j; do
    [ -z "$j" ] && continue
    af="$OUT_DIR$j"; [ -f "$af" ] || continue
    js_raw=$((js_raw + $(stat -c%s "$af")))
    js_gz=$((js_gz + $(gzsize "$af")))
  done < <(grep -oE '/_next/static/[^"]+\.js' "$f" | sort -u)

  # CSS
  css_raw=0; css_gz=0
  while IFS= read -r c; do
    [ -z "$c" ] && continue
    af="$OUT_DIR$c"; [ -f "$af" ] || continue
    css_raw=$((css_raw + $(stat -c%s "$af")))
    css_gz=$((css_gz + $(gzsize "$af")))
  done < <(grep -oE '/_next/static/[^"]+\.css' "$f" | sort -u)

  total_gz=$((html_gz + js_gz + css_gz))
  # Metrikleri sakla; degerlendirme taban hesaplandiktan sonra (2. gecis)
  M_REL+=("$rel"); M_HTML+=("$html_gz"); M_JS+=("$js_gz")
  M_CSS+=("$css_gz"); M_TOTAL+=("$total_gz"); M_JSRAW+=("$js_raw")
done < <(find "$OUT_DIR" -name '*.html' | sort)

# ---- Taban (cerceve floor) = en dusuk First Load JS -----------------
FLOOR=0
for v in "${M_JS[@]}"; do [ "$FLOOR" -eq 0 ] && FLOOR=$v; [ "$v" -lt "$FLOOR" ] && FLOOR=$v; done
FLOORK=$(kb $FLOOR)
OUTLIERK=$((FLOORK + JS_MARGIN))
echo "  ${C}Cerceve tabani (min First Load JS): ${FLOORK}KB gz${N}  →  aykiri esigi >${OUTLIERK}KB, tavan >${JS_HARD}KB"
echo

# ---- 2. gecis: taban-goreli degerlendirme + satirlar ----------------
for idx in "${!M_REL[@]}"; do
  rel="${M_REL[$idx]}"
  jsK=$(kb ${M_JS[$idx]}); cssK=$(kb ${M_CSS[$idx]})
  htmlK=$(kb ${M_HTML[$idx]}); totK=$(kb ${M_TOTAL[$idx]})
  over=$((jsK - FLOORK))

  if   [ "$jsK" -gt "$JS_HARD" ];   then add_issue ERROR "$rel" "$rel — JS ${jsK}KB gz (mutlak tavan ${JS_HARD})"
  elif [ "$jsK" -gt "$OUTLIERK" ];  then add_issue WARN  "$rel" "$rel — JS ${jsK}KB gz, tabandan +${over}KB fazla (aykiri)"; fi
  [ "$cssK"  -gt "$CSS_WARN" ]  && add_issue WARN  "$rel" "$rel — CSS ${cssK}KB gz (oneri ≤${CSS_WARN})"
  [ "$htmlK" -gt "$HTML_WARN" ] && add_issue WARN  "$rel" "$rel — HTML ${htmlK}KB gz (oneri ≤${HTML_WARN})"
  if   [ "$totK" -gt "$PAGE_ERR" ];  then add_issue ERROR "$rel" "$rel — toplam ${totK}KB gz (butce ${PAGE_ERR})"
  elif [ "$totK" -gt "$PAGE_WARN" ]; then add_issue WARN  "$rel" "$rel — toplam ${totK}KB gz (oneri ≤${PAGE_WARN})"; fi

  ROWS+=("| $rel | $htmlK | $jsK | $cssK | **$totK** | $(kb ${M_JSRAW[$idx]}) |")
done
[ "$ERRORS" -eq 0 ] && [ "$WARNS" -eq 0 ] && echo "  ${G}✓${N} Tum sayfalar taban civarinda, aykiri/tavan asimi yok"

# ---- Skor -----------------------------------------------------------
SCORE=$((100 - ERRORS*5 - WARNS*2)); [ "$SCORE" -lt 0 ] && SCORE=0
if   [ "$SCORE" -ge 90 ]; then GRADE=A; GC=$G
elif [ "$SCORE" -ge 75 ]; then GRADE=B; GC=$G
elif [ "$SCORE" -ge 60 ]; then GRADE=C; GC=$Y
else GRADE=D; GC=$R; fi

echo
echo "${B}== Ozet ==${N}"
echo "  Sayfa: $PAGES   ${R}Hata: $ERRORS${N}   ${Y}Uyari: $WARNS${N}"
echo "  Skor: ${GC}$SCORE/100 ($GRADE)${N}"

# ---- Markdown rapor -------------------------------------------------
{
  echo "# Performans / Yuk Butcesi Raporu"
  echo
  echo "- **Tarih:** $TS"
  echo "- **Taranan sayfa:** $PAGES"
  echo "- **Skor:** **$SCORE/100 ($GRADE)** — Hata: $ERRORS, Uyari: $WARNS"
  echo "- **Cerceve tabani (min First Load JS):** ${FLOORK}KB gz — aykiri esigi >${OUTLIERK}KB, mutlak tavan >${JS_HARD}KB"
  echo "- **Diger butceler (gzip KB):** CSS ≤$CSS_WARN, HTML ≤$HTML_WARN, Toplam ≤$PAGE_WARN (hata >$PAGE_ERR)"
  echo
  echo "## Butce asimlari"
  echo
  if [ "${#ISSUES[@]}" -eq 0 ]; then echo "_Butce asimi yok._"; else
    echo "| Onem | Kapsam | Aciklama |"; echo "|------|--------|----------|"
    for i in "${ISSUES[@]}"; do
      sev="${i%%|*}"; rest="${i#*|}"; scope="${rest%%|*}"; msg="${rest#*|}"
      badge=$([ "$sev" = ERROR ] && echo "🔴 Hata" || echo "🟡 Uyari")
      echo "| $badge | \`$scope\` | $msg |"
    done
  fi
  echo
  echo "## Sayfa detayi (gzip KB)"
  echo
  echo "| Sayfa | HTML | JS | CSS | Toplam | JS raw |"
  echo "|-------|------|----|-----|--------|--------|"
  for r in "${ROWS[@]}"; do echo "$r"; done
  echo
  echo "---"
  echo "_gzip degerleri sunucu sikistirma yaparsa indirilecek boyuttur. Canlida dogrulayin:_"
  echo '_`curl -sI -H "Accept-Encoding: gzip" https://SITE/... | grep -i content-encoding`_'
} > "$MD"

# ---- HTML rapor -----------------------------------------------------
{
  cat <<HDR
<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Performans Raporu</title>
<style>
:root{color-scheme:light dark}
body{font:15px/1.5 system-ui,Segoe UI,Arial;margin:0;padding:2rem;max-width:1000px;margin:auto}
h1{margin:0 0 .25rem}.sub{opacity:.7;margin-bottom:1.5rem}
.score{font-size:2.5rem;font-weight:800}.g-A,.g-B{color:#16a34a}.g-C{color:#ca8a04}.g-D{color:#dc2626}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}
th,td{border:1px solid #8883;padding:.4rem .6rem;text-align:left}th{background:#8881}
.err{color:#dc2626;font-weight:600}.warn{color:#ca8a04}
</style></head><body>
<h1>Performans / Yuk Butcesi</h1>
<div class="sub">$TS &middot; $PAGES sayfa &middot; gzip KB</div>
<div class="score g-$GRADE">$SCORE/100 <small>($GRADE)</small></div>
<p><span class="err">Hata: $ERRORS</span> &nbsp; <span class="warn">Uyari: $WARNS</span></p>
<h2>Butce asimlari</h2>
HDR
  if [ "${#ISSUES[@]}" -eq 0 ]; then echo "<p>Butce asimi yok.</p>"; else
    echo "<table><tr><th>Onem</th><th>Kapsam</th><th>Aciklama</th></tr>"
    for i in "${ISSUES[@]}"; do
      sev="${i%%|*}"; rest="${i#*|}"; scope="${rest%%|*}"; msg="${rest#*|}"
      cls=$([ "$sev" = ERROR ] && echo err || echo warn)
      lbl=$([ "$sev" = ERROR ] && echo "🔴 Hata" || echo "🟡 Uyari")
      msg="${msg//&/&amp;}"; msg="${msg//</&lt;}"
      echo "<tr><td class=\"$cls\">$lbl</td><td><code>$scope</code></td><td>$msg</td></tr>"
    done
    echo "</table>"
  fi
  echo "<h2>Sayfa detayi (gzip KB)</h2>"
  echo "<table><tr><th>Sayfa</th><th>HTML</th><th>JS</th><th>CSS</th><th>Toplam</th></tr>"
  for r in "${ROWS[@]}"; do
    IFS='|' read -r _ p hh jj cc tt _ <<< "$r"
    tt="${tt//\*/}"
    echo "<tr><td>${p## }</td><td>${hh## }</td><td>${jj## }</td><td>${cc## }</td><td>${tt## }</td></tr>"
  done
  echo "</table></body></html>"
} > "$HTML"

echo
echo "  ${C}Rapor:${N} $MD"
echo "  ${C}Rapor:${N} $HTML"
[ "$ERRORS" -gt 0 ] && exit 1 || exit 0
