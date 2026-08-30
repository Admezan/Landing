import { notFound } from "next/navigation";
import ToolPageView, { toolMetadata } from "@/components/ToolPageView";
import KuponHesaplayici from "@/components/tools/KuponHesaplayici";
import { getToolPage } from "../tools-content";

const SLUG = "kupon-hesaplama";

export const metadata = toolMetadata(SLUG);

export default function Page() {
  const page = getToolPage(SLUG);
  if (!page) notFound();
  return (
    <ToolPageView page={page}>
      <KuponHesaplayici />
    </ToolPageView>
  );
}
