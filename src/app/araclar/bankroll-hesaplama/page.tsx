import { notFound } from "next/navigation";
import ToolPageView, { toolMetadata } from "@/components/ToolPageView";
import BankrollHesaplayici from "@/components/tools/BankrollHesaplayici";
import { getToolPage } from "../tools-content";

const SLUG = "bankroll-hesaplama";

export const metadata = toolMetadata(SLUG);

export default function Page() {
  const page = getToolPage(SLUG);
  if (!page) notFound();
  return (
    <ToolPageView page={page}>
      <BankrollHesaplayici />
    </ToolPageView>
  );
}
