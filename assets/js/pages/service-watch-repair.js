(function () {
  var page = document.querySelector(".jgs-service-watch-repair");
  if (!page) return;

  var observeTargets = [];

  var items = document.querySelector(".jgs-service-watch-repair-items");
  if (items) {
    var cells = Array.from(
      items.querySelectorAll(".jgs-service-watch-repair-items__row--3 > .jgs-service-watch-repair-items__cell")
    );
    cells.forEach(function (cell, index) {
      cell.classList.add("jgs-service-watch-repair-anim-item");
      cell.style.setProperty("--jgs-service-watch-repair-anim-index", String(index));
    });

    if (cells.length) observeTargets.push(items);
  }

  var flow = document.querySelector(".jgs-service-watch-repair-flow");
  if (flow) {
    var flowItems = Array.from(flow.querySelectorAll(".jgs-service-watch-repair-flow__list > .jgs-service-watch-repair-flow__item"));
    flowItems.forEach(function (item, index) {
      item.classList.add("jgs-service-watch-repair-anim-item");
      item.style.setProperty("--jgs-service-watch-repair-anim-index", String(index));
    });

    if (flowItems.length) observeTargets.push(flow);
  }

  var voice = document.querySelector(".jgs-service-watch-repair-voice");
  if (voice) {
    var voiceItems = Array.from(voice.querySelectorAll(".jgs-service-watch-repair-voice__list > .jgs-service-watch-repair-voice__item"));
    voiceItems.forEach(function (item, index) {
      item.classList.add("jgs-service-watch-repair-anim-item");
      item.style.setProperty("--jgs-service-watch-repair-anim-index", String(index));
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

  page.classList.add("jgs-service-watch-repair-anim-ready");

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
