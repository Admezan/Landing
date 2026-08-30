import type { Metadata } from "next";
import EmbedFrame from "@/components/tools/EmbedFrame";
import KuponHesaplayici from "@/components/tools/KuponHesaplayici";

export const metadata: Metadata = {
  title: "Kupon Hesaplama",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedFrame baslik="Kupon Hesaplama: Kombine ve Sistem" slug="kupon-hesaplama">
      <KuponHesaplayici />
    </EmbedFrame>
  );
}
