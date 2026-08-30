"use client";
import { useState } from "react";
import { useParamsOnce, useKopyala } from "./useUrlState";

/*
 * Oran -> olasilik cevirici ve marj hesabi.
 *
 * Cogu cevirici yalnizca 1/oran islemini yapar. Bu arac ayrica marji ayirir:
 * oranlarin ima ettigi olasiliklarin toplami %100'u asar, asan kisim bahis
 * sirketinin payidir. Marjsiz olasilik, sonucun gercek fiyatini gosterir.
 */

type Secim = { ad: string; oran: string };

function yuzde(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export default function OranOlasilikCevirici() {
  const [secimler, setSecimler] = useState<Secim[]>([
    { ad: "Ev sahibi", oran: "2.10" },
    { ad: "Beraberlik", oran: "3.40" },
    { ad: "Deplasman", oran: "3.60" },
  ]);
  const [kendiTahmin, setKendiTahmin] = useState("50");
  const { kopyalandi, kopyala } = useKopyala();

  // Paylasilan baglantiyla gelindiyse oranlari ve tahmini geri kur
  useParamsOnce((usp) => {
    const o = usp.get("o");
    if (o) {
      const liste = o.split(",").filter(Boolean).slice(0, 3);
      if (liste.length >= 2) {
        const adlar = liste.length === 2
          ? ["1. seçenek", "2. seçenek"]
          : ["Ev sahibi", "Beraberlik", "Deplasman"];
        setSecimler(liste.map((oran, i) => ({ ad: adlar[i], oran })));
      }
    }
    const t = usp.get("t");
    if (t) setKendiTahmin(t);
  });

  const oranlar = secimler.map((s) => parseFloat(s.oran.replace(",", ".")));
  const gecerli = oranlar.every((o) => isFinite(o) && o > 1);
  const imalar = gecerli ? oranlar.map((o) => 100 / o) : [];
  const toplam = imalar.reduce((a, b) => a + b, 0);
  const marj = gecerli ? toplam - 100 : 0;
  // Marji oransal dagitip gercek olasiliga yaklas
  const marjsiz = gecerli ? imalar.map((i) => (i / toplam) * 100) : [];

  const tahmin = parseFloat(kendiTahmin.replace(",", "."));
  const ilkOran = oranlar[0];
  const tahminGecerli = isFinite(tahmin) && tahmin > 0 && tahmin < 100 && gecerli;
  const basaBasOran = tahminGecerli ? 100 / tahmin : 0;
  const degerVar = tahminGecerli && ilkOran > basaBasOran;
  const beklenenDeger = tahminGecerli ? (tahmin / 100) * ilkOran - 1 : 0;

  function guncelle(i: number, oran: string) {
    setSecimler((s) => s.map((x, j) => (j === i ? { ...x, oran } : x)));
  }

  function secimSayisi(n: number) {
    const varsayilan: Secim[] = [
      { ad: "1. seçenek", oran: "1.85" },
      { ad: "2. seçenek", oran: "1.95" },
      { ad: "3. seçenek", oran: "3.40" },
    ];
    setSecimler(n === 2 ? varsayilan.slice(0, 2) : [
      { ad: "Ev sahibi", oran: "2.10" },
      { ad: "Beraberlik", oran: "3.40" },
      { ad: "Deplasman", oran: "3.60" },
    ]);
  }

  const alan = "w-full px-3 py-2 rounded-lg bg-background border border-card-border text-white text-sm focus:border-primary focus:outline-none";

  return (
    <div className="rounded-2xl bg-card-bg border border-card-border p-5 md:p-6">
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => secimSayisi(2)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
            secimler.length === 2
              ? "border-primary text-primary bg-primary/10"
              : "border-card-border text-gray-400 hover:border-primary/50"
          }`}
        >
          2 sonuçlu (tenis, alt/üst)
        </button>
        <button
          type="button"
          onClick={() => secimSayisi(3)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
            secimler.length === 3
              ? "border-primary text-primary bg-primary/10"
              : "border-card-border text-gray-400 hover:border-primary/50"
          }`}
        >
          3 sonuçlu (maç sonucu)
        </button>
      </div>

      <div className="space-y-3">
        {secimler.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_7rem_auto] gap-3 items-center">
            <label className="text-sm text-gray-300" htmlFor={`oran-${i}`}>{s.ad}</label>
            <input
              id={`oran-${i}`}
              type="text"
              inputMode="decimal"
              value={s.oran}
              onChange={(e) => guncelle(i, e.target.value)}
              className={`${alan} col-start-2 sm:col-start-2`}
            />
            <div className="col-span-2 sm:col-span-1 text-sm tabular-nums text-right sm:min-w-[9rem]">
              {gecerli ? (
                <>
                  <span className="text-primary font-semibold">%{yuzde(marjsiz[i])}</span>
                  <span className="text-gray-500 text-xs ml-2">(ham %{yuzde(imalar[i])})</span>
                </>
              ) : (
                <span className="text-gray-600 text-xs">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {gecerli ? (
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-background border border-card-border">
            <div className="text-xs text-gray-500 mb-1">Ham olasılık toplamı</div>
            <div className="text-xl font-black text-gray-300 tabular-nums">%{yuzde(toplam)}</div>
            <div className="text-[11px] text-gray-500 mt-1">
              100&apos;ün üstündeki kısım şirketin payı
            </div>
          </div>
          <div className="p-4 rounded-xl bg-background border border-primary/40">
            <div className="text-xs text-primary mb-1">Bahis şirketi marjı</div>
            <div className="text-xl font-black text-primary tabular-nums">%{yuzde(marj)}</div>
            <div className="text-[11px] text-gray-500 mt-1">
              {marj < 4 ? "Düşük marj — oyuncu lehine" : marj < 7 ? "Ortalama marj" : "Yüksek marj"}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Oranları 1&apos;den büyük ondalık sayı olarak girin (örnek: 2.10).
        </p>
      )}

      <div className="mt-6 pt-6 border-t border-card-border">
        <h3 className="text-sm font-bold text-white mb-1">Değer testi</h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          İlk seçeneğin gerçekleşme ihtimalini siz kaç olarak görüyorsunuz? Tahmininiz oranın
          ima ettiğinden yüksekse o bahis değerlidir.
        </p>
        <div className="grid sm:grid-cols-[10rem_1fr] gap-4 items-start">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5" htmlFor="tahmin">
              Sizin tahmininiz (%)
            </label>
            <input
              id="tahmin"
              type="text"
              inputMode="decimal"
              value={kendiTahmin}
              onChange={(e) => setKendiTahmin(e.target.value)}
              className={alan}
            />
          </div>
          <div className="text-sm">
            {tahminGecerli ? (
              <div
                className={`p-4 rounded-xl border ${
                  degerVar ? "border-accent-green/50 bg-accent-green/5" : "border-card-border bg-background"
                }`}
              >
                <p className={`font-semibold mb-1 ${degerVar ? "text-accent-green" : "text-gray-300"}`}>
                  {degerVar ? "Değerli bahis" : "Değer yok"}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  %{yuzde(tahmin)} tahmininiz için başa baş oran{" "}
                  <strong className="text-gray-300 tabular-nums">{basaBasOran.toFixed(2)}</strong>.
                  Sunulan oran <strong className="text-gray-300 tabular-nums">{ilkOran.toFixed(2)}</strong>.{" "}
                  {degerVar
                    ? `Her 100 TL bahiste uzun vadede beklenen fark +${(beklenenDeger * 100).toFixed(1)} TL. Bu, bahsin tutacağı anlamına gelmez; yalnızca fiyatın lehinize olduğunu gösterir.`
                    : `Bu oranda bahis yapmak uzun vadede 100 TL başına ${(beklenenDeger * 100).toFixed(1)} TL beklenen kayıp anlamına gelir.`}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-xs">0 ile 100 arasında bir yüzde girin.</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-card-border flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              kopyala({ o: secimler.map((s) => s.oran).join(","), t: kendiTahmin })
            }
            className="px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
          >
            {kopyalandi ? "Bağlantı kopyalandı ✓" : "Bu hesabın bağlantısını kopyala"}
          </button>
          <span className="text-xs text-gray-500">
            Bağlantıyı açan kişi aynı oranları ve sonucu görür.
          </span>
        </div>
      </div>
    </div>
  );
}
