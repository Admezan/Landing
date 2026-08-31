/*
 * Icerik acigi denetleyicisi
 *
 * Soru: sayfanin hedefledigini soyledigi sorgunun govdede gercekten karsiligi
 * var mi? <meta name="keywords"> siralamayi etkilemez; etkileyen sey o sorgunun
 * metinde, basliklarda ve SSS'te gecip gecmedigidir. Bu script ikisini
 * karsilastirip aradaki acigi listeler.
 *
 * Neden bash degil de Node: Turkce kucuk/buyuk harf katlamasi (I/i/İ/ı) ve
 * aksan ayristirmasi Unicode farkindaligi ister; sh araclariyla dogru yapmak
 * kirilgan olurdu. Cikti sozlesmesi diger denetleyicilerle ayni:
 * terminalde ozet + scripts/reports/content-gap.{md,html}.
 *
 * Kullanim:  node scripts/content-gap.mjs [out]
 */

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = process.argv[2] || "out";
const REPORT_DIR = "scripts/reports";

if (!fs.existsSync(OUT_DIR)) {
  console.error(`HATA: '${OUT_DIR}' klasoru yok. Once 'npm run build' calistirin.`);
  process.exit(1);
}

/* ---- Metin katlama -------------------------------------------------
   "Çevrim Şartı" ve "cevrim sarti" ayni dizeye iner. Boylece kelime
   listesindeki Turkce karaktersiz yazim varyantlari sahte acik uretmez. */
const TR_HARF = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
function katla(s) {
  return s
    .normalize("NFC")
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (c) => TR_HARF[c])
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/*
 * Turkce eklemeli bir dildir: "bahis oranlari" hedefi metinde "bahis
 * oranlarini" olarak gecebilir. Birebir ifade aramak bu yuzden aciklari
 * olcusuz sisirir. Her kelimenin SONUNA ek gelmesine izin verilir, kelime
 * sirasi ve bitisiklik korunur.
 * Katlanmis metin yalnizca [a-z0-9 ] icerdigi icin kacis gerekmez.
 */
function ifadeKalibi(katlanmis) {
  const parcalar = katlanmis.split(" ").filter(Boolean);
  return new RegExp("(?:^| )" + parcalar.map((p) => p + "[a-z0-9]*").join(" ") + "(?: |$)");
}

/** Tek kelime, ek almis hali dahil metinde geciyor mu */
function kelimeVar(metin, kelime) {
  return new RegExp("(?:^| )" + kelime + "[a-z0-9]*(?: |$)").test(metin);
}

function govdeMetni(html) {
  const i = html.indexOf("<body");
  // Yalnizca <body> icini al: aksi halde <head>'deki keywords etiketi
  // kendi kendini dogrulardi.
  const govde = i === -1 ? html : html.slice(i);
  return govde
    .replace(/<script[\s\S]*?<\/script>/gi, " ") // JSON-LD dahil
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#x?[0-9a-f]+);/gi, " ");
}

function basliklar(html) {
  const parcalar = [];
  for (const m of html.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi)) {
    parcalar.push(m[1].replace(/<[^>]+>/g, " "));
  }
  return parcalar.join(" ");
}

function tara(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) tara(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

/* ---- Denetim -------------------------------------------------------- */
const sayfalar = [];

for (const dosya of tara(OUT_DIR)) {
  const html = fs.readFileSync(dosya, "utf8");
  const rel = path.relative(OUT_DIR, dosya).split(path.sep).join("/");

  // noindex sayfalar arama icin degil - denetim disi
  if (/<meta name="robots"[^>]*noindex/i.test(html)) continue;

  const km = html.match(/<meta name="keywords" content="([^"]*)"/);
  if (!km) continue;

  const hedefler = km[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!hedefler.length) continue;

  const govde = " " + katla(govdeMetni(html)) + " ";
  const baslik = " " + katla(basliklar(html)) + " ";

  const tam = [];
  const daginik = [];
  const eksik = [];

  for (const ham of hedefler) {
    const k = katla(ham);
    if (!k) continue;
    if (ifadeKalibi(k).test(govde)) {
      tam.push(ham);
    } else {
      const hepsiVar = k.split(" ").filter(Boolean).every((p) => kelimeVar(govde, p));
      (hepsiVar ? daginik : eksik).push(ham);
    }
  }

  sayfalar.push({
    rel,
    hedef: hedefler.length,
    tam,
    daginik,
    eksik,
    // Ana sorgu = listedeki ilk sorgu; basliklarda gecmesi en guclu sinyaldir.
    anaSorgu: hedefler[0],
    anaSorguBaslikta: ifadeKalibi(katla(hedefler[0])).test(baslik),
  });
}

const toplamHedef = sayfalar.reduce((a, s) => a + s.hedef, 0);
const toplamTam = sayfalar.reduce((a, s) => a + s.tam.length, 0);
const toplamDaginik = sayfalar.reduce((a, s) => a + s.daginik.length, 0);
const toplamEksik = sayfalar.reduce((a, s) => a + s.eksik.length, 0);
const kapsama = toplamHedef ? Math.round((toplamTam / toplamHedef) * 100) : 0;
const basliksiz = sayfalar.filter((s) => !s.anaSorguBaslikta);

// En cok acigi olan sayfa once - is sirasi buradan okunur
const sirali = [...sayfalar].sort(
  (a, b) => b.eksik.length - a.eksik.length || b.daginik.length - a.daginik.length
);

/* ---- Terminal ozeti -------------------------------------------------- */
const G = "\x1b[32m", Y = "\x1b[33m", R = "\x1b[31m", B = "\x1b[1m", N = "\x1b[0m";
const not = kapsama >= 85 ? "A" : kapsama >= 70 ? "B" : kapsama >= 55 ? "C" : "D";
const renk = kapsama >= 85 ? G : kapsama >= 70 ? Y : R;

console.log(`\n== Icerik Acigi Denetimi ==  (${OUT_DIR})\n`);
console.log(`  Sayfa: ${sayfalar.length}   Hedef sorgu: ${toplamHedef}`);
console.log(`  ${G}Govdede tam gecen : ${toplamTam}${N}`);
console.log(`  ${Y}Dagilmis (kelimeler var, ifade yok): ${toplamDaginik}${N}`);
console.log(`  ${R}Govdede hic gecmeyen: ${toplamEksik}${N}`);
console.log(`\n  ${B}${renk}Kapsama: ${kapsama}% (${not})${N}`);
console.log(`  Ana sorgusu basliklarda gecmeyen sayfa: ${basliksiz.length}\n`);

if (sirali[0]?.eksik.length) {
  console.log("  En cok acigi olan 5 sayfa:");
  for (const s of sirali.slice(0, 5)) {
    if (!s.eksik.length) break;
    console.log(`    ${s.rel}  —  ${s.eksik.length} eksik`);
  }
  console.log();
}

/* ---- Rapor dosyalari -------------------------------------------------- */
fs.mkdirSync(REPORT_DIR, { recursive: true });
const damga = new Date().toISOString().slice(0, 16).replace("T", " ");

const md = [
  "# Icerik Acigi Raporu",
  "",
  `- **Tarih:** ${damga}`,
  `- **Taranan sayfa:** ${sayfalar.length}`,
  `- **Hedef sorgu:** ${toplamHedef}`,
  `- **Kapsama:** **${kapsama}% (${not})** — tam ${toplamTam}, dagilmis ${toplamDaginik}, eksik ${toplamEksik}`,
  "",
  "Kapsama = hedef sorgunun sayfa govdesinde birebir ifade olarak gectigi oran.",
  "`<meta name=\"keywords\"` siralamayi etkilemez; bu rapor hedef ile gercek",
  "icerik arasindaki farki gosterir. **Eksik** satirlari icerik isidir:",
  "o sorgu sayfada hic gecmiyor.",
  "",
  "## Ana sorgusu basliklarda gecmeyen sayfalar",
  "",
  basliksiz.length
    ? basliksiz.map((s) => `- \`${s.rel}\` — ana sorgu: _${s.anaSorgu}_`).join("\n")
    : "_Yok — her sayfanin ana sorgusu H1/H2/H3 icinde geciyor._",
  "",
  "## Sayfa detayi",
  "",
  "| Sayfa | Hedef | Tam | Dagilmis | Eksik | Ana sorgu baslikta |",
  "|-------|------:|----:|---------:|------:|:------------------:|",
  ...sirali.map(
    (s) =>
      `| ${s.rel} | ${s.hedef} | ${s.tam.length} | ${s.daginik.length} | ${s.eksik.length} | ${s.anaSorguBaslikta ? "✓" : "—"} |`
  ),
  "",
  "## Govdede hic gecmeyen sorgular",
  "",
  ...(toplamEksik
    ? sirali
        .filter((s) => s.eksik.length)
        .flatMap((s) => [`### ${s.rel}`, "", ...s.eksik.map((k) => `- ${k}`), ""])
    : ["_Yok._", ""]),
].join("\n");

fs.writeFileSync(path.join(REPORT_DIR, "content-gap.md"), md, "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Icerik Acigi Raporu</title>
<style>
:root{color-scheme:light dark}
body{font:15px/1.5 system-ui,Segoe UI,Arial;margin:0;padding:2rem;max-width:1000px;margin:auto}
h1{margin:0 0 .25rem} .sub{opacity:.7;margin-bottom:1.5rem}
.score{font-size:2.5rem;font-weight:800}
.g-A,.g-B{color:#16a34a}.g-C{color:#ca8a04}.g-D{color:#dc2626}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}
th,td{border:1px solid #8883;padding:.4rem .6rem;text-align:left}
th{background:#8881}
.ok{color:#16a34a;font-weight:600}.warn{color:#ca8a04}.err{color:#dc2626;font-weight:600}
td.n{text-align:right;font-variant-numeric:tabular-nums}
ul{margin:.4rem 0 1.2rem}
</style></head><body>
<h1>Icerik Acigi Raporu</h1>
<div class="sub">${damga} &middot; ${sayfalar.length} sayfa &middot; ${toplamHedef} hedef sorgu</div>
<div class="score g-${not}">${kapsama}% <small>(${not})</small></div>
<p><span class="ok">Tam: ${toplamTam}</span> &nbsp; <span class="warn">Dagilmis: ${toplamDaginik}</span> &nbsp; <span class="err">Eksik: ${toplamEksik}</span></p>
<p>Kapsama, hedef sorgunun sayfa govdesinde birebir ifade olarak gectigi orandir.
<code>meta keywords</code> siralamayi etkilemez; bu rapor hedef ile gercek icerik arasindaki farki gosterir.</p>
<h2>Ana sorgusu basliklarda gecmeyen sayfalar (${basliksiz.length})</h2>
${
  basliksiz.length
    ? `<ul>${basliksiz.map((s) => `<li><code>${esc(s.rel)}</code> — ${esc(s.anaSorgu)}</li>`).join("")}</ul>`
    : "<p>Yok.</p>"
}
<h2>Sayfa detayi</h2>
<table><tr><th>Sayfa</th><th>Hedef</th><th>Tam</th><th>Dagilmis</th><th>Eksik</th><th>Ana sorgu baslikta</th></tr>
${sirali
  .map(
    (s) =>
      `<tr><td>${esc(s.rel)}</td><td class="n">${s.hedef}</td><td class="n ok">${s.tam.length}</td><td class="n warn">${s.daginik.length}</td><td class="n err">${s.eksik.length}</td><td>${s.anaSorguBaslikta ? "✓" : "—"}</td></tr>`
  )
  .join("\n")}
</table>
<h2>Govdede hic gecmeyen sorgular</h2>
${
  toplamEksik
    ? sirali
        .filter((s) => s.eksik.length)
        .map(
          (s) =>
            `<h3>${esc(s.rel)}</h3><ul>${s.eksik.map((k) => `<li>${esc(k)}</li>`).join("")}</ul>`
        )
        .join("\n")
    : "<p>Yok.</p>"
}
</body></html>`;

fs.writeFileSync(path.join(REPORT_DIR, "content-gap.html"), html, "utf8");

console.log(`  Rapor: ${REPORT_DIR}/content-gap.md`);
console.log(`  Rapor: ${REPORT_DIR}/content-gap.html\n`);
