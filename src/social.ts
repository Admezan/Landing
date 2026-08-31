/*
 * Markanin dogrulanmis sosyal hesaplari - TEK KAYNAK.
 *
 * Buradaki adresler iki yeri birden besler:
 *   1) Footer'daki sosyal simge bolumu (liste bossa bolum hic cizilmez)
 *   2) Organization semasindaki sameAs alani
 *
 * Ikisi ayri ayri elle guncellenmez; adres buraya girildiginde her ikisi de
 * kendiliginden dolar.
 *
 * sameAs, arama motorunun markayi bir VARLIK olarak taniyabilmesi icin
 * kullandigi dogrulama zinciridir: siteden hesaba, hesaptan siteye giden
 * karsilikli baglanti. Bu yuzden buraya yalnizca gercekten sahip olunan ve
 * profilinde bu siteye geri baglanti veren hesaplar yazilir. Sahip olunmayan
 * ya da geri baglanti vermeyen bir adres sinyal uretmez, tersine guveni asindirir.
 *
 * Ornek:
 *   { platform: "telegram",  label: "Telegram",  href: "https://t.me/..." },
 *   { platform: "x",         label: "X",         href: "https://x.com/..." },
 */

export type SocialPlatform = "telegram" | "x" | "instagram" | "youtube" | "diger";

export type SocialProfile = {
  /** Simge secimi icin - Footer bu degere gore ikon cizer */
  platform: SocialPlatform;
  /** Erisilebilirlik etiketi ve baglanti basligi */
  label: string;
  href: string;
};

export const socialProfiles: SocialProfile[] = [];
