(function () {
  var page = document.querySelector(".jgs-products-page");
  if (!page) return;

  var observeTargets = Array.from(
    page.querySelectorAll(
      ".jgs-products-hero, .jgs-products-section, .jgs-products-category, .jgs-top-contact-cta"
    )
  );
  if (!observeTargets.length) return;

  function getAnimItems(container) {
    if (container.classList.contains("jgs-products-hero")) {
      var heroTitle = container.querySelector(".jgs-products-hero__title");
      return heroTitle ? [heroTitle] : [];
    }

    if (container.classList.contains("jgs-products-section")) {
      var sectionInner = container.querySelector(".jgs-products-section__inner");
      return sectionInner ? Array.from(sectionInner.children) : [];
    }

    if (container.classList.contains("jgs-products-category")) {
      var categoryInner = container.querySelector(".jgs-products-category__inner");
      if (!categoryInner) return [];

      var items = [];
      var label = categoryInner.querySelector(".jgs-products-category__label-en");
      var title = categoryInner.querySelector(".jgs-products-category__title");
      if (label) items.push(label);
      if (title) items.push(title);
      items.push.apply(items, Array.from(categoryInner.querySelectorAll(".jgs-products-category__grid > li")));
      return items;
    }

    if (container.classList.contains("jgs-top-contact-cta")) {
      var ctaInner = container.querySelector(".jgs-top-contact-cta__inner");
      return ctaInner ? [ctaInner] : [];
    }

    return [];
  }

  observeTargets.forEach(function (container) {
    var items = getAnimItems(container);
    items.forEach(function (item, index) {
      item.classList.add("jgs-products-anim-item");
      item.style.setProperty("--jgs-products-anim-index", String(index));
    });
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-products-anim-ready");

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
