import { notFound } from "next/navigation";
import ToolPageView, { toolMetadata } from "@/components/ToolPageView";
import OranOlasilikCevirici from "@/components/tools/OranOlasilikCevirici";
import { getToolPage } from "../tools-content";

const SLUG = "oran-olasilik-cevirici";

export const metadata = toolMetadata(SLUG);

export default function Page() {
  const page = getToolPage(SLUG);
  if (!page) notFound();
  return (
    <ToolPageView page={page}>
      <OranOlasilikCevirici />
    </ToolPageView>
  );
}
