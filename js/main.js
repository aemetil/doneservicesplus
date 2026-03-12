/* =============================================
   DONESERVICESPLUS — main.js
   Navigation, cookies, interactions globales
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---- Navigation mobile ---- */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Fermer le menu en cliquant sur un lien
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Lien actif dans la navigation ---- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const allNavLinks = document.querySelectorAll(".nav a, .mobile-menu a");

  allNavLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---- Bannière cookies RGPD ---- */
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieBtn = document.getElementById("cookie-accept");

  if (cookieBanner) {
    if (localStorage.getItem("cookiesAccepted")) {
      cookieBanner.style.display = "none";
    }
  }

  if (cookieBtn) {
    cookieBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none";

      // Charger Google Analytics après consentement
      loadGoogleAnalytics();
    });
  }

  // Si cookies déjà acceptés, charger GA directement
  if (localStorage.getItem("cookiesAccepted")) {
    loadGoogleAnalytics();
  }

  /* ---- Scroll doux pour ancres ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 70;
        const top =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ---- Animation d'entrée au scroll ---- */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".card, .credit-block, .recrutement-block")
    .forEach(function (el) {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  /* ---- Numéro de téléphone cliquable ---- */
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.addEventListener("click", function () {
      window.location.href = "tel:+33652736960";
    });
  });
});

/* ---- Chargement Google Analytics ---- */
function loadGoogleAnalytics() {
  if (window.GA_LOADED) return;
  window.GA_LOADED = true;

  // Google Analytics ID GA4: G-2SMWPEEC9T
  const GA_ID = "G-2SMWPEEC9T";

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

/* ---- Tracking événements (appel depuis les pages) ---- */
function trackEvent(eventName, params) {
  if (window.gtag) {
    gtag("event", eventName, params || {});
  }
}
