import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

const base = SITE_URL;

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
