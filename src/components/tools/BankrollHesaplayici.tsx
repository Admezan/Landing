"use client";
import { useState } from "react";
import { useParamsOnce, sayiOku, useKopyala } from "./useUrlState";

/*
 * Bankroll ve birim bahis hesaplayici.
 *
 * Rakip araclarda genellikle "bankrollun %2'si" gibi sabit bir yuzde verilir.
 * Buradaki fark iki tarafta: (1) Kelly kriteri ile orana ve kendi tahmininize
 * gore matematiksel bahis buyuklugu, (2) "kac ardisik kayba dayanir" hesabi -
 * bankroll yonetiminin asil sorusu budur, tavan kazanc degil.
 */

const PROFILLER = [
  { ad: "Muhafazakâr", yuzde: 1, not: "Bankrollun %1'i" },
  { ad: "Dengeli", yuzde: 2, not: "Bankrollun %2'si" },
  { ad: "Agresif", yuzde: 5, not: "Bankrollun %5'i" },
];

function tl(n: number) {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export default function BankrollHesaplayici() {
  const [bankroll, setBankroll] = useState(5000);
  const [profil, setProfil] = useState(2);
  const [oran, setOran] = useState("2.00");
  const [tahmin, setTahmin] = useState("55");
  const { kopyalandi, kopyala } = useKopyala();

  useParamsOnce((usp) => {
    setBankroll(Math.max(0, sayiOku(usp, "br", 5000)));
    setProfil(sayiOku(usp, "p", 2));
    const o = usp.get("o");
    if (o) setOran(o);
    const t = usp.get("t");
    if (t) setTahmin(t);
  });

  const birim = (bankroll * profil) / 100;
  // Sabit birimle kac ardisik kayip kaldirilir
  const dayanma = birim > 0 ? Math.floor(bankroll / birim) : 0;

  const o = parseFloat(oran.replace(",", "."));
  const p = parseFloat(tahmin.replace(",", ".")) / 100;
  const gecerli = isFinite(o) && o > 1 && isFinite(p) && p > 0 && p < 1;

  // Kelly: f = (b*p - q) / b, b = oran - 1
  const b = gecerli ? o - 1 : 0;
  const kellyOran = gecerli ? (b * p - (1 - p)) / b : 0;
  const kellyPozitif = kellyOran > 0;
  const yarimKelly = kellyPozitif ? kellyOran / 2 : 0;
  const kellyTutar = bankroll * kellyOran;
  const yarimKellyTutar = bankroll * yarimKelly;
  const beklenenDeger = gecerli ? p * o - 1 : 0;

  const alan = "w-full px-3 py-2 rounded-lg bg-background border border-card-border text-white text-sm focus:border-primary focus:outline-none";
  const etiket = "block text-xs text-gray-400 mb-1.5";

  return (
    <div className="rounded-2xl bg-card-bg border border-card-border p-5 md:p-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={etiket} htmlFor="bankroll">Toplam bahis bütçeniz (TL)</label>
          <input id="bankroll" type="number" min={0} value={bankroll} className={alan}
            onChange={(e) => setBankroll(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label className={etiket} htmlFor="profil">Risk profili</label>
          <select id="profil" value={profil} className={alan}
            onChange={(e) => setProfil(Number(e.target.value))}>
            {PROFILLER.map((pr) => (
              <option key={pr.ad} value={pr.yuzde}>{pr.ad} — {pr.not}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <div className="p-4 rounded-xl bg-background border border-primary/40">
          <div className="text-xs text-primary mb-1">Birim bahis</div>
          <div className="text-xl font-black text-primary tabular-nums">{tl(birim)} TL</div>
          <div className="text-[11px] text-gray-500 mt-1">Kupon başına ayrılacak tutar</div>
        </div>
        <div className="p-4 rounded-xl bg-background border border-card-border">
          <div className="text-xs text-gray-500 mb-1">Kaç ardışık kayba dayanır</div>
          <div className="text-xl font-black text-gray-300 tabular-nums">{dayanma} kupon</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {dayanma < 20
              ? "Düşük dayanıklılık — kötü bir seri bütçeyi bitirir"
              : dayanma < 50
                ? "Orta dayanıklılık"
                : "Yüksek dayanıklılık"}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-card-border">
        <h3 className="text-sm font-bold text-white mb-1">Kelly kriteri: orana göre bahis büyüklüğü</h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Sabit yüzde her bahse aynı tutarı ayırır. Kelly ise avantajınızın büyüklüğüne göre
          tutarı ayarlar: avantaj yoksa sıfır önerir. Uygulamada tam Kelly çok oynaktır,
          bu yüzden yarım Kelly tercih edilir.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={etiket} htmlFor="k-oran">Bahis oranı</label>
            <input id="k-oran" type="text" inputMode="decimal" value={oran} className={alan}
              onChange={(e) => setOran(e.target.value)} />
          </div>
          <div>
            <label className={etiket} htmlFor="k-tahmin">Sizin tahmininiz (%)</label>
            <input id="k-tahmin" type="text" inputMode="decimal" value={tahmin} className={alan}
              onChange={(e) => setTahmin(e.target.value)} />
          </div>
        </div>

        {gecerli ? (
          kellyPozitif ? (
            <div className="mt-4 p-5 rounded-xl border border-accent-green/50 bg-accent-green/5">
              <h4 className="font-bold text-accent-green mb-2">Avantaj var</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-gray-500">Tam Kelly</div>
                  <div className="text-lg font-black text-gray-300 tabular-nums">
                    {tl(kellyTutar)} TL
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      (%{(kellyOran * 100).toFixed(1)})
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-primary">Yarım Kelly — önerilen</div>
                  <div className="text-lg font-black text-primary tabular-nums">
                    {tl(yarimKellyTutar)} TL
                    <span className="text-xs font-normal text-gray-500 ml-2">
                      (%{(yarimKelly * 100).toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Tahmininiz doğruysa her 100 TL bahiste beklenen fark{" "}
                <strong>+{(beklenenDeger * 100).toFixed(1)} TL</strong>. Buradaki kritik varsayım
                tahmininizin isabetli olmasıdır; tahmin yanlışsa Kelly de yanlış tutar önerir.
                {yarimKellyTutar > birim * 3 &&
                  " Önerilen tutar birim bahsinizin belirgin üstünde: tek bahse bu kadar yüklenmek, tahmininizde yanılma riskini büyütür."}
              </p>
            </div>
          ) : (
            <div className="mt-4 p-5 rounded-xl border border-card-border bg-background">
              <h4 className="font-bold text-gray-300 mb-2">Avantaj yok — Kelly sıfır önerir</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Bu oranda başa baş için tahmininizin en az{" "}
                <strong className="text-gray-300">%{(100 / o).toFixed(1)}</strong> olması gerekir;
                siz %{(p * 100).toFixed(1)} diyorsunuz. Her 100 TL bahiste beklenen fark{" "}
                <strong className="text-gray-300">{(beklenenDeger * 100).toFixed(1)} TL</strong>.
                Kelly bu durumda bahis yapılmamasını önerir.
              </p>
            </div>
          )
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Oranı 1&apos;den büyük, tahmini 0 ile 100 arasında girin.
          </p>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-card-border flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() =>
            kopyala({ br: String(bankroll), p: String(profil), o: oran, t: tahmin })
          }
          className="px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
        >
          {kopyalandi ? "Bağlantı kopyalandı ✓" : "Bu hesabın bağlantısını kopyala"}
        </button>
        <span className="text-xs text-gray-500">Bağlantıyı açan kişi aynı hesabı görür.</span>
      </div>
    </div>
  );
}
