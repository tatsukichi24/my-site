(function () {
  var page = document.querySelector(".jgs-service-reform");
  if (!page) return;

  var observeTargets = [];

  var intro = document.querySelector(".jgs-service-reform-intro");
  if (intro) {
    var introItems = [intro.querySelector(".jgs-service-reform-intro__media")];
    Array.from(intro.querySelectorAll(".jgs-service-reform-intro__text")).forEach(function (text) {
      introItems.push(text);
    });

    introItems.forEach(function (el, index) {
      if (!el) return;
      el.classList.add("jgs-service-reform-anim-item");
      el.style.setProperty("--jgs-service-reform-anim-index", String(index));
    });

    if (introItems.some(function (el) { return el; })) observeTargets.push(intro);
  }

  var repaired = document.querySelector(".jgs-service-reform-repaired");
  if (repaired) {
    var repairedItems = Array.from(repaired.querySelectorAll(".jgs-service-reform-repaired__list > .jgs-service-reform-repaired__item"));
    repairedItems.forEach(function (item, index) {
      item.classList.add("jgs-service-reform-anim-item");
      item.style.setProperty("--jgs-service-reform-anim-index", String(index));
    });

    if (repairedItems.length) observeTargets.push(repaired);
  }

  var flow = document.querySelector(".jgs-service-reform-flow");
  if (flow) {
    var flowItems = Array.from(flow.querySelectorAll(".jgs-service-reform-flow__list > .jgs-service-reform-flow__item"));
    flowItems.forEach(function (item, index) {
      item.classList.add("jgs-service-reform-anim-item");
      item.style.setProperty("--jgs-service-reform-anim-index", String(index));
    });

    if (flowItems.length) observeTargets.push(flow);
  }

  var ba = document.querySelector(".jgs-service-reform-ba");
  if (ba) {
    var baGrid = ba.querySelector(".jgs-service-reform-ba__grid");
    if (baGrid) {
      baGrid.classList.add("jgs-service-reform-anim-item", "jgs-service-reform-anim-item--from-bottom");
      observeTargets.push(ba);
    }
  }

  var voice = document.querySelector(".jgs-service-reform-voice");
  if (voice) {
    var voiceItems = Array.from(voice.querySelectorAll(".jgs-service-reform-voice__list > .jgs-service-reform-voice__item"));
    voiceItems.forEach(function (item, index) {
      item.classList.add("jgs-service-reform-anim-item");
      item.style.setProperty("--jgs-service-reform-anim-index", String(index));
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

  page.classList.add("jgs-service-reform-anim-ready");

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
