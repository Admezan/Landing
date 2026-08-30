import type { Metadata } from "next";
import EmbedFrame from "@/components/tools/EmbedFrame";
import BankrollHesaplayici from "@/components/tools/BankrollHesaplayici";

export const metadata: Metadata = {
  title: "Bankroll ve Birim Bahis Hesaplama",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EmbedFrame baslik="Bankroll ve Birim Bahis Hesaplama" slug="bankroll-hesaplama">
      <BankrollHesaplayici />
    </EmbedFrame>
  );
}
