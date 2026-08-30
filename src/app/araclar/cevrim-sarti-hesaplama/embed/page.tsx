import type { Metadata } from "next";
import EmbedFrame from "@/components/tools/EmbedFrame";
import CevrimHesaplayici from "@/components/tools/CevrimHesaplayici";

// Gomulu surum dizine girmemeli (kopya icerik), ama atif baglantisi izlenmeli
export const metadata: Metadata = {
  title: "Çevrim Şartı Hesaplama",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedFrame baslik="Çevrim Şartı Hesaplama" slug="cevrim-sarti-hesaplama">
      <CevrimHesaplayici />
    </EmbedFrame>
  );
}
