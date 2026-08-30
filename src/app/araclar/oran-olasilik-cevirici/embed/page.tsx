import type { Metadata } from "next";
import EmbedFrame from "@/components/tools/EmbedFrame";
import OranOlasilikCevirici from "@/components/tools/OranOlasilikCevirici";

export const metadata: Metadata = {
  title: "Oran - Olasılık Çevirici",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedFrame baslik="Oran - Olasılık Çevirici" slug="oran-olasilik-cevirici">
      <OranOlasilikCevirici />
    </EmbedFrame>
  );
}
