/*
 * Olcum cagri noktasi.
 *
 * Bilesenler saglayiciyi bilmez; yalnizca track() cagirir. Hangi saglayicinin
 * kullanildigi public/analytics.js icinde, derleme gerektirmeden degisir.
 */

export type OlcumOzellikleri = Record<string, string | number | boolean>;

declare global {
  interface Window {
    mkTrack?: (ad: string, ozellikler?: OlcumOzellikleri) => void;
    mkConsent?: (izin: boolean) => void;
  }
}

/** Olcum kapaliysa ya da script yuklenmediyse sessizce hicbir sey yapmaz. */
export function track(olay: string, ozellikler?: OlcumOzellikleri) {
  if (typeof window === "undefined") return;
  try {
    window.mkTrack?.(olay, ozellikler);
  } catch {
    // Olcum hatasi kullanici akisini kesmemeli.
  }
}

/** Cikis baglantisi tiklamasi - hangi sayfanin donusum urettigini gosterir. */
export function ctaTikla(eylem: "giris" | "kayit", konum: string) {
  track("cta_tikla", {
    eylem,
    konum,
    sayfa: typeof window === "undefined" ? "" : window.location.pathname,
  });
}
