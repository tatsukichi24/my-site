(function () {
  var page = document.querySelector(".jgs-service-buyback");
  if (!page) return;

  var observeTargets = [];

  function registerSection(section, items) {
    items.forEach(function (item) {
      if (!item) return;
      item.el.classList.add("jgs-service-buyback-anim-item");
      item.el.style.setProperty("--jgs-service-buyback-anim-index-pc", String(item.pc));
      item.el.style.setProperty("--jgs-service-buyback-anim-index-sp", String(item.sp));
    });

    if (items.some(function (item) { return item && item.el; })) {
      observeTargets.push(section);
    }
  }

  var intro = document.querySelector(".jgs-service-buyback-intro");
  if (intro) {
    registerSection(intro, [
      { el: intro.querySelector(".jgs-service-buyback-intro__photo"), pc: 0, sp: 2 },
      { el: intro.querySelector(".jgs-service-buyback-intro__title"), pc: 1, sp: 0 },
      { el: intro.querySelector(".jgs-service-buyback-intro__text"), pc: 2, sp: 1 },
    ]);
  }

  var appraisal = document.querySelector(".jgs-service-buyback-appraisal");
  if (appraisal) {
    var appraisalItems = [
      { el: appraisal.querySelector(".jgs-service-buyback-appraisal__title"), pc: 0, sp: 0 },
    ];
    Array.from(appraisal.querySelectorAll(".jgs-service-buyback-appraisal__text")).forEach(function (text, index) {
      appraisalItems.push({ el: text, pc: index + 1, sp: index + 1 });
    });
    appraisalItems.push({
      el: appraisal.querySelector(".jgs-service-buyback-appraisal__figure"),
      pc: appraisalItems.length,
      sp: appraisalItems.length,
    });
    registerSection(appraisal, appraisalItems);
  }

  var results = document.querySelector(".jgs-service-buyback-results");
  if (results) {
    var gridItems = Array.from(results.querySelectorAll(".jgs-service-buyback-results__grid > li"));
    gridItems.forEach(function (item, index) {
      item.classList.add("jgs-service-buyback-anim-item", "jgs-service-buyback-anim-item--stagger");
      item.style.setProperty("--jgs-service-buyback-anim-index-pc", String(index));
      item.style.setProperty("--jgs-service-buyback-anim-index-sp", String(index));
    });

    if (gridItems.length) observeTargets.push(results);
  }

  var repaired = document.querySelector(".jgs-service-buyback-repaired");
  if (repaired) {
    var repairedItems = Array.from(repaired.querySelectorAll(".jgs-service-buyback-repaired__list > .jgs-service-buyback-repaired__item"));
    repairedItems.forEach(function (item, index) {
      item.classList.add("jgs-service-buyback-anim-item", "jgs-service-buyback-anim-item--stagger");
      item.style.setProperty("--jgs-service-buyback-anim-index-pc", String(index));
      item.style.setProperty("--jgs-service-buyback-anim-index-sp", String(index));
    });

    if (repairedItems.length) observeTargets.push(repaired);
  }

  var reason = document.querySelector(".jgs-service-buyback-reason");
  if (reason) {
    var reasonItems = Array.from(reason.querySelectorAll(".jgs-service-buyback-reason__list > .jgs-service-buyback-reason__item"));
    reasonItems.forEach(function (item, index) {
      item.classList.add("jgs-service-buyback-anim-item", "jgs-service-buyback-anim-item--stagger");
      item.style.setProperty("--jgs-service-buyback-anim-index-pc", String(index));
      item.style.setProperty("--jgs-service-buyback-anim-index-sp", String(index));
    });

    if (reasonItems.length) observeTargets.push(reason);
  }

  if (!observeTargets.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-service-buyback-anim-ready");

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
