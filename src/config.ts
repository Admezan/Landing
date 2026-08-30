// Sitenin kendi yayin adresi (IDN punycode). Canonical, sitemap, robots ve
// yapisal veri bu tek kaynaktan beslenir; adres degisirse yalniz burasi guncellenir.
export const SITE_URL = "https://xn--eritking-x79c.com";

declare global {
  interface Window {
    SITE_CONFIG?: { domain: string; login: string; register: string };
  }
  var DOMAIN: string;
  var LOGIN: string;
  var REGISTER: string;
}

function getConfig() {
  if (typeof window !== "undefined" && typeof LOGIN !== "undefined") {
    return { loginUrl: LOGIN, registerUrl: REGISTER, currentDomain: DOMAIN };
  }
  return {
    currentDomain: "https://mrking5029.com",
    loginUrl: "https://mrking5029.com/",
    registerUrl: "https://mrking5029.com/",
  };
}

export const SITE_CONFIG = {
  get loginUrl() { return getConfig().loginUrl; },
  get registerUrl() { return getConfig().registerUrl; },
  get currentDomain() { return getConfig().currentDomain; },
};
