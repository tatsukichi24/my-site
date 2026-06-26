(function () {
  var heroes = Array.from(
    document.querySelectorAll('section[class^="jgs-service-"][class$="-hero"]')
  );
  if (!heroes.length) return;

  heroes.forEach(function (hero) {
    var head = hero.querySelector('[class*="__copy-head"]');
    var rest = hero.querySelector('[class*="__copy-rest"]');
    var visual = hero.querySelector('[class*="__visual"]');

    if (head) {
      head.classList.add("jgs-service-hero-fv__text", "jgs-service-hero-fv__text--head");
    }
    if (rest) {
      rest.classList.add("jgs-service-hero-fv__text", "jgs-service-hero-fv__text--rest");
    }
    if (visual) {
      visual.classList.add("jgs-service-hero-fv__visual");
    }
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    heroes.forEach(function (hero) {
      hero.classList.add("is-inview");
    });
    return;
  }

  document.body.classList.add("jgs-service-hero-fv-anim-ready");

  function activateHeroes() {
    heroes.forEach(function (hero) {
      hero.classList.add("is-inview");
    });
  }

  if (!("requestAnimationFrame" in window)) {
    activateHeroes();
    return;
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(activateHeroes);
  });
})();
