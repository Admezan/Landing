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
