(function () {
  var lead = document.querySelector(".jgs-shop-list-intro__lead");
  var intro = document.querySelector(".jgs-shop-list-intro");
  var grid = document.querySelector(".jgs-shop-list-grid");
  var page = document.querySelector(".jgs-shop-list");

  if (!page) return;

  var observeTargets = [];

  if (lead && intro) {
    var charIndex = 0;

    function wrapTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        if (!text) return;

        var fragment = document.createDocumentFragment();

        Array.from(text).forEach(function (char) {
          if (char === "\n" || char === "\r") return;

          var span = document.createElement("span");
          span.className = "jgs-shop-list-intro__lead-char";
          span.style.setProperty("--char-index", String(charIndex));
          span.textContent = char === " " ? "\u00a0" : char;
          charIndex += 1;
          fragment.appendChild(span);
        });

        node.parentNode.replaceChild(fragment, node);
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      Array.from(node.childNodes).forEach(wrapTextNodes);
    }

    lead.setAttribute("aria-label", lead.textContent.replace(/\s+/g, " ").trim());
    wrapTextNodes(lead);

    var bodyText = document.querySelector(".jgs-shop-list-intro__text > p");
    if (bodyText && charIndex > 0) {
      var leadAnimEnd = 0.1 + (charIndex - 1) * 0.07 + 0.75;
      bodyText.style.setProperty("--body-delay", leadAnimEnd + 0.15 + "s");
    }

    observeTargets.push(intro);
  }

  if (grid) {
    var cards = Array.from(grid.querySelectorAll(".jgs-shop-list-grid__inner > .jgs-shop-card"));
    cards.forEach(function (card, index) {
      card.style.setProperty("--shop-list-anim-index", String(index));
    });
    observeTargets.push(grid);
  }

  if (!observeTargets.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    observeTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-shop-list-anim-ready");

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
