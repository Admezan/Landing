"use client";
import { useMemo, useState } from "react";

/*
 * Kombine ve sistem kupon hesaplayici.
 *
 * Rakip araclar genellikle toplam oran ve maksimum kazanci verip birakiyor.
 * Buradaki fark, "kac mac tutarsa ne olur" tablosu: sistem kuponunda asil
 * merak edilen sey basabas noktasidir, tavan kazanc degil.
 */

function tl(n: number) {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

/** dizi icinden k elemanli tum kombinasyonlarin indeks listesi */
function kombinasyonlar(n: number, k: number): number[][] {
  const sonuc: number[][] = [];
  const gecerli: number[] = [];
  (function uret(bas: number) {
    if (gecerli.length === k) {
      sonuc.push([...gecerli]);
      return;
    }
    for (let i = bas; i < n; i++) {
      gecerli.push(i);
      uret(i + 1);
      gecerli.pop();
    }
  })(0);
  return sonuc;
}

const BASLANGIC = ["1.85", "2.10", "1.60", "2.45"];

export default function KuponHesaplayici() {
  const [oranlar, setOranlar] = useState<string[]>(BASLANGIC);
  const [sistem, setSistem] = useState(0); // 0 = kombine (tumu)
  const [birim, setBirim] = useState(50);

  const sayilar = oranlar.map((o) => parseFloat(o.replace(",", ".")));
  const gecerli = sayilar.every((o) => isFinite(o) && o > 1);
  const n = sayilar.length;
  const k = sistem === 0 ? n : sistem;

  const hesap = useMemo(() => {
    if (!gecerli || k < 1 || k > n) return null;
    const komboIndeksleri = kombinasyonlar(n, k);
    const komboOranlari = komboIndeksleri.map((idx) =>
      idx.reduce((carpim, i) => carpim * sayilar[i], 1)
    );
    const adet = komboOranlari.length;
    const maliyet = adet * birim;
    const maksKazanc = komboOranlari.reduce((a, o) => a + o * birim, 0);
    const enDusukKombo = Math.min(...komboOranlari);
    const enYuksekKombo = Math.max(...komboOranlari);

    // m mac tutarsa kazanan kombinasyon sayisi C(m, k); tutar araligi icin
    // en dusuk ve en yuksek oranli m mac senaryosu hesaplanir
    const sirali = [...sayilar].sort((a, b) => a - b);
    const senaryolar = [];
    for (let m = k; m <= n; m++) {
      const enKotuSet = sirali.slice(0, m);
      const enIyiSet = sirali.slice(n - m);
      const topla = (set: number[]) =>
        kombinasyonlar(m, k)
          .map((idx) => idx.reduce((c, i) => c * set[i], 1))
          .reduce((a, o) => a + o * birim, 0);
      const enKotu = topla(enKotuSet);
      const enIyi = topla(enIyiSet);
      senaryolar.push({
        tutan: m,
        komboAdet: kombinasyonlar(m, k).length,
        enKotu,
        enIyi,
        kardaMi: enKotu > maliyet,
      });
    }

    return { adet, maliyet, maksKazanc, enDusukKombo, enYuksekKombo, senaryolar };
  }, [sayilar, gecerli, n, k, birim]);

  function oranDegistir(i: number, deger: string) {
    setOranlar((o) => o.map((x, j) => (j === i ? deger : x)));
  }
  function macEkle() {
    if (oranlar.length >= 10) return;
    setOranlar((o) => [...o, "2.00"]);
  }
  function macCikar(i: number) {
    if (oranlar.length <= 2) return;
    setOranlar((o) => o.filter((_, j) => j !== i));
    if (sistem >= oranlar.length - 1) setSistem(0);
  }

  const alan = "w-full px-3 py-2 rounded-lg bg-background border border-card-border text-white text-sm focus:border-primary focus:outline-none";

  return (
    <div className="rounded-2xl bg-card-bg border border-card-border p-5 md:p-6">
      <div className="grid sm:grid-cols-2 gap-3">
        {oranlar.map((o, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1.5" htmlFor={`mac-${i}`}>
                {i + 1}. maç oranı
              </label>
              <input
                id={`mac-${i}`}
                type="text"
                inputMode="decimal"
                value={o}
                onChange={(e) => oranDegistir(i, e.target.value)}
                className={alan}
              />
            </div>
            <button
              type="button"
              onClick={() => macCikar(i)}
              disabled={oranlar.length <= 2}
              aria-label={`${i + 1}. maçı çıkar`}
              className="px-3 py-2 rounded-lg border border-card-border text-gray-500 hover:text-red-400 hover:border-red-400/50 transition disabled:opacity-30 disabled:hover:text-gray-500 disabled:hover:border-card-border"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={macEkle}
        disabled={oranlar.length >= 10}
        className="mt-3 px-4 py-2 rounded-lg border border-primary/50 text-primary text-xs font-semibold hover:bg-primary/10 transition disabled:opacity-30"
      >
        + Maç ekle {oranlar.length >= 10 && "(en fazla 10)"}
      </button>

      <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-card-border">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5" htmlFor="sistem">Kupon türü</label>
          <select
            id="sistem"
            value={sistem}
            onChange={(e) => setSistem(Number(e.target.value))}
            className={alan}
          >
            <option value={0}>Kombine ({n} maçın tamamı)</option>
            {Array.from({ length: n - 1 }, (_, i) => i + 1)
              .filter((x) => x >= 2)
              .map((x) => (
                <option key={x} value={x}>Sistem {x} / {n}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5" htmlFor="birim">
            Kombinasyon başına bahis (TL)
          </label>
          <input
            id="birim"
            type="number"
            min={1}
            value={birim}
            onChange={(e) => setBirim(Math.max(1, Number(e.target.value)))}
            className={alan}
          />
        </div>
      </div>

      {hesap ? (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            <div className="p-4 rounded-xl bg-background border border-card-border">
              <div className="text-xs text-gray-500 mb-1">Kombinasyon</div>
              <div className="text-xl font-black text-gray-300 tabular-nums">{hesap.adet}</div>
            </div>
            <div className="p-4 rounded-xl bg-background border border-card-border">
              <div className="text-xs text-gray-500 mb-1">Kupon maliyeti</div>
              <div className="text-xl font-black text-gray-300 tabular-nums">{tl(hesap.maliyet)} TL</div>
            </div>
            <div className="p-4 rounded-xl bg-background border border-primary/40">
              <div className="text-xs text-primary mb-1">Tümü tutarsa</div>
              <div className="text-xl font-black text-primary tabular-nums">{tl(hesap.maksKazanc)} TL</div>
              <div className="text-[11px] text-gray-500 mt-1">
                net {tl(hesap.maksKazanc - hesap.maliyet)} TL
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-white mb-1">Kaç maç tutarsa ne olur?</h3>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Sistem kuponunda asıl belirleyici olan başa baş noktasıdır. Tutar aralığı, hangi
              maçların tuttuğuna göre değişir; en düşük ve en yüksek oranlı senaryolar gösterilir.
            </p>
            <div className="overflow-x-auto rounded-xl border border-card-border">
              <table className="w-full text-sm min-w-[30rem]">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-card-border">
                    <th className="text-left font-medium px-4 py-2.5">Tutan maç</th>
                    <th className="text-left font-medium px-4 py-2.5">Kazanan kombinasyon</th>
                    <th className="text-right font-medium px-4 py-2.5">Getiri aralığı</th>
                    <th className="text-right font-medium px-4 py-2.5">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {hesap.senaryolar.map((s) => (
                    <tr key={s.tutan} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-2.5 text-gray-300 tabular-nums">{s.tutan} / {n}</td>
                      <td className="px-4 py-2.5 text-gray-400 tabular-nums">{s.komboAdet}</td>
                      <td className="px-4 py-2.5 text-right text-gray-300 tabular-nums">
                        {tl(s.enKotu)} – {tl(s.enIyi)} TL
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className={`text-xs font-semibold ${
                            s.kardaMi ? "text-accent-green" : s.enIyi > hesap.maliyet ? "text-yellow-400" : "text-red-400"
                          }`}
                        >
                          {s.kardaMi ? "kârda" : s.enIyi > hesap.maliyet ? "duruma bağlı" : "zararda"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Maliyet {tl(hesap.maliyet)} TL. &quot;Duruma bağlı&quot; satırlarda sonuç, tutan maçların
              yüksek mi düşük mü oranlı olduğuna göre kâr ya da zarar olabilir.
            </p>
          </div>
        </>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Tüm oranları 1&apos;den büyük ondalık sayı olarak girin (örnek: 1.85).
        </p>
      )}
    </div>
  );
}
