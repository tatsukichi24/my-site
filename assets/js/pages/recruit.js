(function () {
  var main = document.querySelector(".jgs-recruit");
  if (!main) return;

  var card = main.querySelector(".jgs-recruit__card");
  if (!card) return;

  var animItems = [];

  card.querySelectorAll(".jgs-recruit__lead > p").forEach(function (p) {
    animItems.push(p);
  });

  var headingEn = card.querySelector(".jgs-recruit__heading-en");
  var headingJp = card.querySelector(".jgs-recruit__heading-jp");
  if (headingEn) animItems.push(headingEn);
  if (headingJp) animItems.push(headingJp);

  card.querySelectorAll(".jgs-recruit__term").forEach(function (term) {
    animItems.push(term);
    var desc = term.nextElementSibling;
    if (desc && desc.classList.contains("jgs-recruit__desc")) {
      animItems.push(desc);
    }
  });

  if (!animItems.length) return;

  animItems.forEach(function (el, index) {
    el.classList.add("jgs-recruit-anim-item");
    el.style.setProperty("--jgs-recruit-anim-index", String(index));
  });

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    card.classList.add("is-inview");
    return;
  }

  main.classList.add("jgs-recruit-anim-ready");

  if (!("IntersectionObserver" in window)) {
    card.classList.add("is-inview");
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

  observer.observe(card);
})();
