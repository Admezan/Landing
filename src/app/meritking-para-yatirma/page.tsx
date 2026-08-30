import { notFound } from "next/navigation";
import LandingPageView, { landingMetadata } from "@/components/LandingPageView";
import { getLandingPage } from "../landing-content";

const SLUG = "meritking-para-yatirma";

export const metadata = landingMetadata(SLUG);

export default function Page() {
  const page = getLandingPage(SLUG);
  if (!page) notFound();
  return <LandingPageView page={page} />;
}
