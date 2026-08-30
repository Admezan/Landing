"use client";
import { useEffect, useState } from "react";

/*
 * Arac durumunu paylasilabilir hale getirir.
 *
 * Amac dogal atif: kullanici hesabi yapip baglantiyi paylastiginda karsi taraf
 * ayni sonucu gorur. Durumu tasimayan bir araca kimse link vermez.
 *
 * Ilk render sunucudakiyle ayni kalsin diye adres yalnizca useEffect icinde
 * okunur; boylece hydration uyusmazligi olusmaz.
 */

/** Baglanti ile gelen degerleri bir kez okur. Sunucuda hicbir sey yapmaz. */
export function useParamsOnce(uygula: (usp: URLSearchParams) => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const usp = new URLSearchParams(window.location.search);
    if ([...usp.keys()].length === 0) return;
    uygula(usp);
    // Yalnizca ilk yuklemede calisir; uygula referansi bilerek disarida birakildi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function sayiOku(usp: URLSearchParams, anahtar: string, varsayilan: number): number {
  const ham = usp.get(anahtar);
  if (ham === null) return varsayilan;
  const n = Number(ham);
  return isFinite(n) ? n : varsayilan;
}

/**
 * "Bağlantıyı kopyala" düğmesinin durumunu yönetir.
 * Adres cubugunu da gunceller, boylece kullanici elle de kopyalayabilir.
 */
export function useKopyala() {
  const [kopyalandi, setKopyalandi] = useState(false);

  async function kopyala(params: Record<string, string>) {
    if (typeof window === "undefined") return;
    const usp = new URLSearchParams(params);
    const url = `${window.location.origin}${window.location.pathname}?${usp.toString()}`;
    window.history.replaceState(null, "", `${window.location.pathname}?${usp.toString()}`);
    try {
      await navigator.clipboard.writeText(url);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2500);
    } catch {
      // Pano izni yoksa adres cubugu yine guncellendi; kullanici oradan kopyalayabilir
      setKopyalandi(false);
    }
  }

  return { kopyalandi, kopyala };
}
