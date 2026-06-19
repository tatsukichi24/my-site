(function () {
  var page = document.querySelector(".jgs-service-repair");
  if (!page) return;

  var observeTargets = [];

  var items = document.querySelector(".jgs-service-repair-items");
  if (items) {
    var cells = Array.from(items.querySelectorAll(".jgs-service-repair-items__cell"));
    cells.forEach(function (cell, index) {
      cell.classList.add("jgs-service-repair-anim-item");
      cell.style.setProperty("--jgs-service-repair-anim-index", String(index));
    });

    if (cells.length) observeTargets.push(items);
  }

  var price = document.querySelector(".jgs-service-repair-price");
  if (price) {
    var hasPriceAnim = false;
    var priceFigure = price.querySelector(".jgs-service-repair-price__figure--pc");
    if (priceFigure) {
      priceFigure.classList.add("jgs-service-repair-anim-item");
      priceFigure.style.setProperty("--jgs-service-repair-anim-index", "0");
      hasPriceAnim = true;
    }

    Array.from(price.querySelectorAll(".jgs-service-repair-price__sp-panel")).forEach(function (panel, index) {
      panel.classList.add("jgs-service-repair-anim-item");
      panel.style.setProperty("--jgs-service-repair-anim-index", String(index));
      hasPriceAnim = true;
    });

    if (hasPriceAnim) observeTargets.push(price);
  }

  var flow = document.querySelector(".jgs-service-repair-flow");
  if (flow) {
    var flowItems = Array.from(flow.querySelectorAll(".jgs-service-repair-flow__list > .jgs-service-repair-flow__item"));
    flowItems.forEach(function (item, index) {
      item.classList.add("jgs-service-repair-anim-item");
      item.style.setProperty("--jgs-service-repair-anim-index", String(index));
    });

    if (flowItems.length) observeTargets.push(flow);
  }

  var voice = document.querySelector(".jgs-service-repair-voice");
  if (voice) {
    var voiceItems = Array.from(voice.querySelectorAll(".jgs-service-repair-voice__list > .jgs-service-repair-voice__item"));
    voiceItems.forEach(function (item, index) {
      item.classList.add("jgs-service-repair-anim-item");
      item.style.setProperty("--jgs-service-repair-anim-index", String(index));
    });

    if (voiceItems.length) observeTargets.push(voice);
  }

  if (!observeTargets.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-service-repair-anim-ready");

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
