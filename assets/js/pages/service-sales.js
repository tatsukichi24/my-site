(function () {
  var page = document.querySelector(".jgs-service-sales");
  if (!page) return;

  var observeTargets = [];

  var lead = document.querySelector(".jgs-service-sales-lead");
  if (lead) {
    var grid = lead.querySelector(".jgs-service-sales-lead__grid");
    if (grid) {
      var leadItems = [];
      var visual = grid.querySelector(".jgs-service-sales-lead__visual");
      if (visual) leadItems.push(visual);
      leadItems.push.apply(leadItems, Array.from(grid.querySelectorAll(".jgs-service-sales-lead__text")));

      leadItems.forEach(function (item, index) {
        item.classList.add("jgs-service-sales-anim-item");
        item.style.setProperty("--jgs-service-sales-anim-index", String(index));
        item.style.setProperty("--jgs-service-sales-anim-step", "0.14s");
      });

      if (leadItems.length) observeTargets.push(lead);
    }
  }

  var cards = document.querySelector(".jgs-service-sales-cards");
  if (cards) {
    var cardItems = Array.from(cards.querySelectorAll(".jgs-service-sales-cards__item"));
    cardItems.forEach(function (item, index) {
      item.classList.add("jgs-service-sales-anim-item");
      item.style.setProperty("--jgs-service-sales-anim-index", String(index));
      item.style.setProperty("--jgs-service-sales-anim-step", "0.22s");
    });

    if (cardItems.length) observeTargets.push(cards);
  }

  var makuake = document.querySelector(".jgs-service-sales-makuake-showcase");
  if (makuake) {
    var makuakeLeadItems = [];
    var leadBody = makuake.querySelector(".jgs-service-sales-makuake-showcase__lead-body");
    if (leadBody) {
      var title = leadBody.querySelector(".jgs-service-sales-makuake-showcase__lead-title");
      if (title) makuakeLeadItems.push(title);
      makuakeLeadItems.push.apply(
        makuakeLeadItems,
        Array.from(leadBody.querySelectorAll(".jgs-service-sales-makuake-showcase__lead-text"))
      );
    }

    var makuakeGridItems = [];
    var grid = makuake.querySelector(".jgs-service-sales-makuake-showcase__grid");
    if (grid) {
      makuakeGridItems = Array.from(grid.querySelectorAll("li"));
    }

    var makuakeItems = makuakeLeadItems.concat(makuakeGridItems);
    makuakeItems.forEach(function (item, index) {
      item.classList.add("jgs-service-sales-anim-item");
      item.style.setProperty("--jgs-service-sales-anim-index", String(index));
      // リードはテキスト中心、グリッドは画像中心なので、カードと同様に刻みを変える
      item.style.setProperty(
        "--jgs-service-sales-anim-step",
        index < makuakeLeadItems.length ? "0.14s" : "0.22s"
      );
    });

    if (makuakeItems.length) observeTargets.push(makuake);

    var cta = makuake.querySelector(".jgs-service-sales-makuake-showcase__cta");
    if (cta) {
      var ctaItems = [];
      var ctaTitle = cta.querySelector(".jgs-service-sales-makuake-showcase__cta-title");
      var ctaText = cta.querySelector(".jgs-service-sales-makuake-showcase__cta-text");
      if (ctaTitle) ctaItems.push(ctaTitle);
      if (ctaText) ctaItems.push(ctaText);

      ctaItems.forEach(function (item, index) {
        item.classList.add("jgs-service-sales-anim-item");
        item.style.setProperty("--jgs-service-sales-anim-index", String(index));
        item.style.setProperty("--jgs-service-sales-anim-step", "0.14s");
      });

      if (ctaItems.length) observeTargets.push(cta);
    }
  }

  if (!observeTargets.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-service-sales-anim-ready");

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
