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
    currentDomain: "https://betrabet366.com",
    loginUrl: "https://betrabet366.com/login",
    registerUrl: "https://betrabet366.com/register",
  };
}

export const SITE_CONFIG = {
  get loginUrl() { return getConfig().loginUrl; },
  get registerUrl() { return getConfig().registerUrl; },
  get currentDomain() { return getConfig().currentDomain; },
};
