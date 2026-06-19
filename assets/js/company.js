(function () {
  var navItems = Array.from(document.querySelectorAll("[data-company-nav]"));
  var sections = Array.from(document.querySelectorAll("[data-company-section]"));

  if (!navItems.length || !sections.length) return;

  var navMap = new Map();
  navItems.forEach(function (item) {
    navMap.set(item.getAttribute("data-company-nav"), item);
  });
  var defaultId =
    (navItems.find(function (item) {
      return item.classList.contains("is-current");
    }) || navItems[0]).getAttribute("data-company-nav");

  function setCurrent(id) {
    navItems.forEach(function (item) {
      item.classList.toggle("is-current", item.getAttribute("data-company-nav") === id);
    });
  }

  function getActivateLine() {
    var headerOffset =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--jgs-header-offset")
      ) || 96;
    return window.scrollY + headerOffset + 40;
  }

  function updateCurrentByViewport() {
    if (window.scrollY <= 1) {
      setCurrent(defaultId);
      return;
    }

    var activateLine = getActivateLine();
    var activeId = defaultId;

    sections.forEach(function (section) {
      var id = section.getAttribute("data-company-section");
      if (!id || !navMap.has(id)) return;

      var top = section.getBoundingClientRect().top + window.scrollY;
      if (activateLine >= top) {
        activeId = id;
      }
    });

    setCurrent(activeId);
  }

  var ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateCurrentByViewport();
      ticking = false;
    });
  }

  updateCurrentByViewport();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  navItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      var href = item.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });
})();

(function () {
  var companyRoot = document.querySelector(".jgs-company");
  if (!companyRoot) return;

  var animBlockSelector =
    ".jgs-company-intro__label-en, " +
    '[class$="__eyebrow"], [class$="__title"], ' +
    ".jgs-company-message-card__lead, " +
    ".jgs-company-message-card__body > p, " +
    ".jgs-company-message-card__sign-text, " +
    ".jgs-company-philosophy-card__body > p, " +
    ".jgs-company-outline-card__row, " +
    ".jgs-company-history-card__date, " +
    ".jgs-company-history-card__text";

  var observeTargets = Array.from(companyRoot.querySelectorAll(".jgs-company-intro, [data-company-section]"));
  if (!observeTargets.length) return;

  function registerAnimItems(container) {
    var items = Array.from(container.querySelectorAll(animBlockSelector));
    items.forEach(function (item, index) {
      item.classList.add("jgs-company-anim-item");
      item.style.setProperty("--jgs-company-anim-index", String(index));
    });
  }

  function registerFlowSteps(container) {
    var steps = Array.from(
      container.querySelectorAll(".jgs-recruitment-flow__steps > .jgs-recruitment-flow__step")
    );
    steps.forEach(function (step, index) {
      step.classList.add("jgs-company-anim-item");
      step.style.setProperty("--jgs-company-anim-index", String(index));
    });
  }

  function registerIdealFigure(container) {
    var figure = container.querySelector(".jgs-recruitment-ideal__figure");
    if (!figure) return;
    figure.classList.add("jgs-company-anim-item");
  }

  function registerFaqItems(container) {
    var items = Array.from(
      container.querySelectorAll(".jgs-recruitment-faq__list > .jgs-recruitment-faq__item")
    );
    items.forEach(function (item, index) {
      item.classList.add("jgs-company-anim-item");
      item.style.setProperty("--jgs-company-anim-index", String(index));
    });
  }

  function registerRecruitJobItems(container) {
    var items = Array.from(
      container.querySelectorAll(".jgs-top-recruit-jobs__list > .jgs-top-recruit-jobs__item")
    );
    items.forEach(function (item, index) {
      item.classList.add("jgs-company-anim-item");
      item.style.setProperty("--jgs-company-anim-index", String(index));
    });
  }

  observeTargets.forEach(function (target) {
    registerAnimItems(target);
    registerFlowSteps(target);
    registerIdealFigure(target);
    registerFaqItems(target);
    registerRecruitJobItems(target);
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  companyRoot.classList.add("jgs-company-anim-ready");

  if (!("IntersectionObserver" in window)) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  observeTargets.forEach(function (target) {
    observer.observe(target);
  });
})();
