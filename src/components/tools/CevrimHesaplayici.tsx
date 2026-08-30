"use client";
import { useState } from "react";

/*
 * Cevrim sarti hesaplayici.
 *
 * Rakip araclarin cogu "bonus x katsayi" yapip birakiyor. Oysa gercek bahis
 * hacmini belirleyen sey oyunun katki oranidir: %10 katkili bir masada ayni
 * cevrim on katina cikar. Bu arac katki oranini ve gunluk tempoyu da hesaba
 * katip sonucu yorumluyor.
 */

const OYUNLAR = [
  { ad: "Slot", katki: 100, not: "Cogu kampanyada tam katki" },
  { ad: "Spor bahsi (min. oran ustu)", katki: 50, not: "Alt oran siniri altindaki bahisler sayilmaz" },
  { ad: "Canlı casino", katki: 10, not: "Rulet, blackjack, baccarat" },
  { ad: "Masa oyunları", katki: 5, not: "Bazi kampanyalarda hic sayilmaz" },
];

function tl(n: number) {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export default function CevrimHesaplayici() {
  const [yatirim, setYatirim] = useState(1000);
  const [bonus, setBonus] = useState(1000);
  const [katsayi, setKatsayi] = useState(8);
  const [taban, setTaban] = useState<"bonus" | "toplam">("toplam");
  const [katki, setKatki] = useState(100);
  const [gun, setGun] = useState(7);
  const [gunlukTempo, setGunlukTempo] = useState(1500);

  const tabanTutar = taban === "bonus" ? bonus : yatirim + bonus;
  const cevrim = tabanTutar * katsayi;
  // Katki orani dustukce ayni cevrimi kapatmak icin gereken gercek bahis artar
  const gercekHacim = katki > 0 ? cevrim * (100 / katki) : Infinity;
  const gerekenGunluk = gun > 0 ? gercekHacim / gun : Infinity;
  const kapasite = gunlukTempo * gun;
  const yeterli = kapasite >= gercekHacim;
  const oran = gercekHacim > 0 && isFinite(gercekHacim) ? kapasite / gercekHacim : 0;

  const durum = !isFinite(gercekHacim)
    ? { renk: "kirmizi", baslik: "Bu oyunla çevrim tamamlanamaz", metin: "Seçtiğiniz oyun çevrime katkı vermiyor. Kampanya şartlarında katkı oranı %0 olarak belirtilen oyunlarda yapılan bahisler çevrimden düşmez." }
    : yeterli
    ? { renk: "yesil", baslik: "Çevrim tamamlanabilir görünüyor", metin: `Belirttiğiniz tempoyla ${gun} günde ${tl(kapasite)} TL bahis yapabiliyorsunuz; gereken ${tl(gercekHacim)} TL. Payınız var, ancak tempoyu koruyamadığınız günler olacağını hesaba katın.` }
    : oran > 0.6
    ? { renk: "sari", baslik: "Sınırda — tempoyu artırmanız gerekir", metin: `Mevcut tempoyla ${gun} günde ${tl(kapasite)} TL yapıyorsunuz, gereken ${tl(gercekHacim)} TL. Aradaki farkı kapatmak için günlük tempoyu yaklaşık ${tl(gerekenGunluk)} TL'ye çıkarmanız gerekir.` }
    : { renk: "kirmizi", baslik: "Bu bonus sizin için uygun değil", metin: `Gereken hacim ${tl(gercekHacim)} TL, sizin ${gun} günlük kapasiteniz ${tl(kapasite)} TL. Aradaki fark kapatılabilir değil; bonusu almamak bakiyenizi serbest bırakır ve para çekmenizi hızlandırır.` };

  const renkler: Record<string, string> = {
    yesil: "border-accent-green/50 bg-accent-green/5",
    sari: "border-yellow-500/50 bg-yellow-500/5",
    kirmizi: "border-red-500/50 bg-red-500/5",
  };
  const basliRenk: Record<string, string> = {
    yesil: "text-accent-green",
    sari: "text-yellow-400",
    kirmizi: "text-red-400",
  };

  const alan = "w-full px-3 py-2 rounded-lg bg-background border border-card-border text-white text-sm focus:border-primary focus:outline-none";
  const etiket = "block text-xs text-gray-400 mb-1.5";

  return (
    <div className="rounded-2xl bg-card-bg border border-card-border p-5 md:p-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={etiket} htmlFor="yatirim">Yatırım tutarı (TL)</label>
          <input id="yatirim" type="number" min={0} value={yatirim} className={alan}
            onChange={(e) => setYatirim(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label className={etiket} htmlFor="bonus">Bonus tutarı (TL)</label>
          <input id="bonus" type="number" min={0} value={bonus} className={alan}
            onChange={(e) => setBonus(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label className={etiket} htmlFor="katsayi">Çevrim katsayısı (örn. 8 = 8x)</label>
          <input id="katsayi" type="number" min={0} step={0.5} value={katsayi} className={alan}
            onChange={(e) => setKatsayi(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label className={etiket} htmlFor="taban">Çevrim neyin üzerinden?</label>
          <select id="taban" value={taban} className={alan}
            onChange={(e) => setTaban(e.target.value as "bonus" | "toplam")}>
            <option value="bonus">Sadece bonus</option>
            <option value="toplam">Yatırım + bonus</option>
          </select>
        </div>
        <div>
          <label className={etiket} htmlFor="oyun">Çevrimi hangi oyunla yapacaksınız?</label>
          <select id="oyun" value={katki} className={alan}
            onChange={(e) => setKatki(Number(e.target.value))}>
            {OYUNLAR.map((o) => (
              <option key={o.ad} value={o.katki}>{o.ad} — %{o.katki} katkı</option>
            ))}
          </select>
        </div>
        <div>
          <label className={etiket} htmlFor="gun">Kampanya süresi (gün)</label>
          <input id="gun" type="number" min={1} value={gun} className={alan}
            onChange={(e) => setGun(Math.max(1, Number(e.target.value)))} />
        </div>
        <div className="sm:col-span-2">
          <label className={etiket} htmlFor="tempo">Günde ne kadar bahis yapabilirsiniz? (TL)</label>
          <input id="tempo" type="number" min={0} value={gunlukTempo} className={alan}
            onChange={(e) => setGunlukTempo(Math.max(0, Number(e.target.value)))} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        <div className="p-4 rounded-xl bg-background border border-card-border">
          <div className="text-xs text-gray-500 mb-1">Kâğıt üzerindeki çevrim</div>
          <div className="text-xl font-black text-gray-300">{tl(cevrim)} TL</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {tl(tabanTutar)} × {katsayi}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-background border border-primary/40">
          <div className="text-xs text-primary mb-1">Gerçekte gereken bahis</div>
          <div className="text-xl font-black text-primary">
            {isFinite(gercekHacim) ? `${tl(gercekHacim)} TL` : "—"}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">%{katki} katkı oranıyla</div>
        </div>
        <div className="p-4 rounded-xl bg-background border border-card-border">
          <div className="text-xs text-gray-500 mb-1">Günlük gereken tempo</div>
          <div className="text-xl font-black text-gray-300">
            {isFinite(gerekenGunluk) ? `${tl(gerekenGunluk)} TL` : "—"}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">{gun} güne bölündüğünde</div>
        </div>
      </div>

      <div className={`mt-4 p-5 rounded-xl border ${renkler[durum.renk]}`}>
        <h3 className={`font-bold mb-2 ${basliRenk[durum.renk]}`}>{durum.baslik}</h3>
        <p className="text-sm text-gray-300 leading-relaxed">{durum.metin}</p>
      </div>

      {katki < 100 && isFinite(gercekHacim) && (
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          Dikkat: seçtiğiniz oyun çevrime %{katki} oranında katkı verdiği için gereken bahis,
          kampanyada yazan {tl(cevrim)} TL değil {tl(gercekHacim)} TL&apos;dir. Çoğu hesaplama aracı
          bu farkı göstermez.
        </p>
      )}
    </div>
  );
}
