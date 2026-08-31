import { SITE_URL } from "@/config";
import { landingPages } from "@/app/landing-content";
import { socialProfiles } from "@/social";

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
        url: `${BASE}/meritking-guvenilir-mi`,
      },
      description: "Meritking güncel giriş adresi, spor bahisleri, canlı casino, poker ve slot oyunlari.",
      /*
       * sameAs, markayi bir varlik olarak dogrulayan hesap zinciridir.
       * Adresler src/social.ts'ten gelir; liste bosken alan hic yazilmaz -
       * bos bir sameAs dizisi sinyal uretmedigi gibi semayi de kirletir.
       */
      ...(socialProfiles.length > 0
        ? { sameAs: socialProfiles.map((s) => s.href) }
        : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: `${BASE}/`,
      name: "Meritking",
      inLanguage: "tr-TR",
      publisher: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      url: `${BASE}/`,
      name: "Meritking Giriş - Güncel Adres, Canlı Bahis ve Casino",
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
    },
    // Niyet sayfalarini gezinme ogesi olarak bildirir; site linkleri icin sinyal
    ...landingPages.map((p) => ({
      "@type": "SiteNavigationElement",
      "@id": `${BASE}/${p.slug}#nav`,
      name: p.h1,
      description: p.description,
      url: `${BASE}/${p.slug}`,
    })),
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
