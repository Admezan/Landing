import { notFound } from "next/navigation";
import ToolPageView, { toolMetadata } from "@/components/ToolPageView";
import CevrimHesaplayici from "@/components/tools/CevrimHesaplayici";
import { getToolPage } from "../tools-content";

const SLUG = "cevrim-sarti-hesaplama";

export const metadata = toolMetadata(SLUG);

export default function Page() {
  const page = getToolPage(SLUG);
  if (!page) notFound();
  return (
    <ToolPageView page={page}>
      <CevrimHesaplayici />
    </ToolPageView>
  );
}
