import { SITE_URL } from "@/config";

const BASE = SITE_URL;

const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Meritking",
      url: `${BASE}/`,
      logo: `${BASE}/og-image.png`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["Turkish"],
        url: `${BASE}/#guvenilir`,
      },
      description: "Meritking güncel giriş adresi, spor bahisleri, canlı casino, poker ve slot oyunlari.",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: `${BASE}/`,
      name: "Meritking",
      inLanguage: "tr-TR",
      publisher: { "@id": `${BASE}/#organization` },
    },
  ],
};

export default function SiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
    />
  );
}
