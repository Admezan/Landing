import type { ReactNode } from "react";
import { SITE_URL } from "@/config";

/*
 * Gomulu (iframe) surum icin sade cerceve.
 *
 * Header, Footer ve donusum bloklari yok; yalnizca arac ve altinda atif
 * baglantisi bulunur. Bu baglanti, araci sayfasina gomen sitelerden gelen
 * dogal atifin (backlink) kaynagidir - bu yuzden takip edilebilir birakilir.
 *
 * Sayfa noindex'tir: ayni arac hem normal hem gomulu adreste yayinlandigi
 * icin gomulu surumun dizine girmesi kopya icerik yaratir.
 */
export default function EmbedFrame({
  baslik,
  slug,
  children,
}: {
  baslik: string;
  slug: string;
  children: ReactNode;
}) {
  return (
    <div className="p-4 md:p-5">
      <h1 className="text-lg font-bold mb-4">{baslik}</h1>
      {children}
      <p className="mt-4 text-center text-xs text-gray-500">
        Bu hesaplayıcı{" "}
        <a
          href={`${SITE_URL}/araclar/${slug}`}
          target="_blank"
          rel="noopener"
          className="text-primary hover:underline font-semibold"
        >
          Meritking Araçları
        </a>{" "}
        tarafından sağlanmaktadır. 18+ · Sorumlu oynayın.
      </p>
    </div>
  );
}
