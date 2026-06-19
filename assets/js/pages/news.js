(function () {
  var main = document.querySelector(".jgs-news");
  if (!main) return;

  var links = Array.from(main.querySelectorAll(".jgs-news__link"));
  if (!links.length) return;

  var textSelectors = [
    ".jgs-news__date",
    ".jgs-news__tag",
    ".jgs-news__item-title",
    ".jgs-news__excerpt",
  ];

  links.forEach(function (link) {
    var index = 0;

    textSelectors.forEach(function (selector) {
      var el = link.querySelector(selector);
      if (!el) return;
      el.classList.add("jgs-news-anim-item");
      el.style.setProperty("--jgs-news-anim-index", String(index));
      index += 1;
    });
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    links.forEach(function (link) {
      link.classList.add("is-inview");
    });
    return;
  }

  main.classList.add("jgs-news-anim-ready");

  if (!("IntersectionObserver" in window)) {
    links.forEach(function (link) {
      link.classList.add("is-inview");
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

  links.forEach(function (link) {
    observer.observe(link);
  });
})();
