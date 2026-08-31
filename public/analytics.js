/*
 * Olcumleme - CANLI YAPILANDIRMA
 *
 * config.js ile ayni mantik: bu dosya siteyi yeniden derlemeden
 * degistirilebilir. Saglayici ya da olcum kimligi degistiginde sunucuda
 * /var/www/landing/analytics.js dosyasini guncellemek yeterlidir.
 *
 * config.js'ten AYRI tutulur, cunku config.js adres rotasyonunda sik sik
 * degisir; olcum ayarlarinin o degisimde kaybolmasi istenmez.
 *
 * ANALYTICS_PROVIDER secenekleri:
 *   "plausible" - cerezsiz, kisisel veri toplamaz, cerez banneri GEREKMEZ (varsayilan)
 *   "umami"     - cerezsiz, kendi sunucunuzda barindirilir, banner GEREKMEZ
 *   "ga4"       - Google Analytics 4. Cerez kullanir; asagidaki not okunmali.
 *   "none"      - olcum kapali (varsayilan davranis: hicbir istek gitmez)
 *
 * GA4 NOTU: Consent Mode varsayilan olarak "denied" baslatilir, yani onay
 * alinana kadar GA4 cerez YAZMAZ (cerezsiz ping modu). Onay banneriniz
 * kullanicidan izin aldiginda window.mkConsent(true) cagirmalidir. Banner
 * arayuzu bu dosyanin kapsaminda degildir.
 */

var ANALYTICS_PROVIDER = "none";

// plausible: panelde kayitli alan adi. Bos birakilirsa tarayicidaki alan adi kullanilir.
var ANALYTICS_DOMAIN = "";

// plausible / umami: kendi sunucunuzda barindiriyorsaniz script koku.
// Plausible bulut icin "https://plausible.io" birakin.
var ANALYTICS_HOST = "https://plausible.io";

// plausible: "script.js" sade surum, "script.outbound-links.js" dis baglanti
// tiklamalarini da otomatik sayar (giris/kayit baglantilari icin faydali).
var ANALYTICS_PLAUSIBLE_SCRIPT = "script.outbound-links.js";

// umami: panelden alinan website id (UUID)
var ANALYTICS_WEBSITE_ID = "";

// ga4: olcum kimligi (G-XXXXXXXXXX)
var ANALYTICS_MEASUREMENT_ID = "";

(function () {
  "use strict";

  /* Saglayici scripti inmeden once tetiklenen olaylar kaybolmasin diye kuyruk.
     Kuyruk sinirli tutulur; saglayici hic yuklenmezse bellek sismez. */
  var kuyruk = [];
  var gonder = null;

  function ayar(deger, varsayilan) {
    return typeof deger === "string" && deger !== "" ? deger : varsayilan;
  }

  function bosalt() {
    if (!gonder) return;
    while (kuyruk.length) {
      // Saglayici henuz hazir degilse kuyrukta bekletip cik.
      if (gonder(kuyruk[0][0], kuyruk[0][1]) !== true) return;
      kuyruk.shift();
    }
  }

  /* Tum bilesenler olaylari bu fonksiyon uzerinden gonderir.
     Saglayici degisse de cagri noktalari ayni kalir. */
  window.mkTrack = function (ad, ozellikler) {
    if (!ad) return;
    if (kuyruk.length < 50) kuyruk.push([ad, ozellikler || {}]);
    bosalt();
  };

  // Onay banneri izin aldiginda cagrilir. Yalnizca GA4 icin anlamlidir.
  window.mkConsent = function () {};

  function scriptEkle(src, nitelikler, yuklendi) {
    var s = document.createElement("script");
    s.src = src;
    s.defer = true;
    for (var k in nitelikler) {
      if (Object.prototype.hasOwnProperty.call(nitelikler, k)) {
        s.setAttribute(k, nitelikler[k]);
      }
    }
    if (yuklendi) s.addEventListener("load", yuklendi);
    document.head.appendChild(s);
  }

  var saglayici = ayar(
    typeof ANALYTICS_PROVIDER !== "undefined" ? ANALYTICS_PROVIDER : "",
    "none"
  );
  var kok = ayar(
    typeof ANALYTICS_HOST !== "undefined" ? ANALYTICS_HOST : "",
    "https://plausible.io"
  ).replace(/\/+$/, "");

  if (saglayici === "plausible") {
    var alan = ayar(
      typeof ANALYTICS_DOMAIN !== "undefined" ? ANALYTICS_DOMAIN : "",
      location.hostname
    );
    var dosya = ayar(
      typeof ANALYTICS_PLAUSIBLE_SCRIPT !== "undefined" ? ANALYTICS_PLAUSIBLE_SCRIPT : "",
      "script.outbound-links.js"
    );
    // Plausible'in kendi saplamasi: script inmeden gelen olaylari da tutar.
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    scriptEkle(kok + "/js/" + dosya, { "data-domain": alan });
    gonder = function (ad, ozellikler) {
      window.plausible(ad, { props: ozellikler });
      return true;
    };
  } else if (saglayici === "umami") {
    var siteId = ayar(
      typeof ANALYTICS_WEBSITE_ID !== "undefined" ? ANALYTICS_WEBSITE_ID : "",
      ""
    );
    if (siteId) {
      scriptEkle(kok + "/script.js", { "data-website-id": siteId }, bosalt);
      gonder = function (ad, ozellikler) {
        // Umami'nin saplamasi yok; script inene kadar kuyrukta bekletilir.
        if (!window.umami || typeof window.umami.track !== "function") return false;
        window.umami.track(ad, ozellikler);
        return true;
      };
    }
  } else if (saglayici === "ga4") {
    var olcumId = ayar(
      typeof ANALYTICS_MEASUREMENT_ID !== "undefined" ? ANALYTICS_MEASUREMENT_ID : "",
      ""
    );
    if (olcumId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      // Onay alinana kadar cerez yazilmaz; GA4 cerezsiz ping modunda calisir.
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      window.gtag("js", new Date());
      window.gtag("config", olcumId, { anonymize_ip: true });
      scriptEkle("https://www.googletagmanager.com/gtag/js?id=" + olcumId, {});
      window.mkConsent = function (izin) {
        window.gtag("consent", "update", {
          analytics_storage: izin ? "granted" : "denied",
        });
      };
      gonder = function (ad, ozellikler) {
        window.gtag("event", ad, ozellikler);
        return true;
      };
    }
  }

  bosalt();
})();
