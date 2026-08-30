"use client";
import { useState } from "react";
import { SITE_URL } from "@/config";

/*
 * "Bu araci sitene ekle" kutusu.
 *
 * Gomme kodu, arac sayfasina isaret eden bir atif baglantisi da icerir.
 * Araci gomen her site bu baglantiyi da yayinlar; bu, satin alinmis link
 * degil, kullanildigi icin verilen dogal atiftir.
 */
export default function EmbedKutusu({ slug, baslik }: { slug: string; baslik: string }) {
  const [kopyalandi, setKopyalandi] = useState(false);

  const kod = `<iframe src="${SITE_URL}/araclar/${slug}/embed" width="100%" height="720" style="border:1px solid #2a2a35;border-radius:16px" title="${baslik}" loading="lazy"></iframe>
<p style="font-size:12px;text-align:center">Hesaplayıcı: <a href="${SITE_URL}/araclar/${slug}">${baslik} - Meritking Araçları</a></p>`;

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(kod);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2500);
    } catch {
      setKopyalandi(false);
    }
  }

  return (
    <div className="mt-12 p-6 rounded-2xl bg-card-bg border border-card-border">
      <h2 className="text-lg font-bold mb-2">Bu aracı kendi sitenize ekleyin</h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        Aşağıdaki kodu sayfanıza yapıştırmanız yeterli. Araç ücretsizdir, kayıt istemez ve
        hesaplar ziyaretçinin tarayıcısında yapılır. Tek koşul, kod içindeki kaynak
        bağlantısının kaldırılmamasıdır.
      </p>
      <pre className="overflow-x-auto p-4 rounded-xl bg-background border border-card-border text-xs text-gray-400 leading-relaxed">
        <code>{kod}</code>
      </pre>
      <button
        type="button"
        onClick={kopyala}
        className="mt-4 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition"
      >
        {kopyalandi ? "Kod kopyalandı ✓" : "Gömme kodunu kopyala"}
      </button>
    </div>
  );
}
