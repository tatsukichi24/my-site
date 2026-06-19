(function () {

  var page = document.querySelector(".jgs-recruit-top-page");

  if (!page) return;



  var mq = window.matchMedia("(max-width: 768px)");

  function initCarousel(carousel, listSelector, cardSelector) {

    if (!carousel) return;



    var list = carousel.querySelector(listSelector);

    if (!list) return;



    var cards = list.querySelectorAll(cardSelector);

    if (!cards.length) return;



    function setSlideAria() {

      var isCarousel = mq.matches;

      list.setAttribute("role", isCarousel ? "group" : "list");

      cards.forEach(function (card, index) {

        if (isCarousel) {

          card.setAttribute("role", "group");

          card.setAttribute("aria-roledescription", "slide");

          card.setAttribute("aria-label", String(index + 1) + " / " + cards.length);

        } else {

          card.removeAttribute("role");

          card.removeAttribute("aria-roledescription");

          card.removeAttribute("aria-label");

        }

      });

    }



    mq.addEventListener("change", setSlideAria);

    setSlideAria();

  }



  initCarousel(

    page.querySelector(".jgs-recruit-top__interview-carousel"),

    ".jgs-recruit-top__interview-cards",

    ".jgs-recruit-top__interview-card"

  );



  initCarousel(

    page.querySelector(".jgs-recruit-top__work-style-carousel"),

    ".jgs-recruit-top__work-style-cards",

    ".jgs-recruit-top__interview-card"

  );

  var fv = page.querySelector(".jgs-recruit-top__fv");
  var scrollTargets = [];

  var about = page.querySelector(".jgs-recruit-top__section--about");
  if (about) scrollTargets.push(about);

  var workerHeroInner = page.querySelector(".jgs-recruit-top__worker-hero__inner");
  if (workerHeroInner) scrollTargets.push(workerHeroInner);

  var system = page.querySelector(".jgs-recruit-top__section--system");
  if (system) {
    var systemCards = Array.from(system.querySelectorAll(".jgs-recruit-top__system__list > .jgs-recruit-top__system-card"));
    systemCards.forEach(function (card, index) {
      card.classList.add("jgs-recruit-top-anim-item");
      card.style.setProperty("--jgs-recruit-top-anim-index", String(index));
    });

    if (systemCards.length) scrollTargets.push(system);
  }

  var interview = page.querySelector(".jgs-recruit-top__interview");
  if (interview) {
    var interviewCards = Array.from(
      interview.querySelectorAll(".jgs-recruit-top__interview-cards > .jgs-recruit-top__interview-card")
    );
    interviewCards.forEach(function (card, index) {
      card.classList.add("jgs-recruit-top-anim-item--from-left");
      card.style.setProperty("--jgs-recruit-top-anim-index", String(index));
    });

    if (interviewCards.length) scrollTargets.push(interview);
  }

  var appealContent = page.querySelector(".jgs-recruit-top__appeal-content");
  if (appealContent) {
    var appealTexts = [
      appealContent.querySelector(".jgs-recruit-top__appeal-title"),
      appealContent.querySelector(".jgs-recruit-top__appeal-text"),
    ];
    appealTexts.forEach(function (el, index) {
      if (!el) return;
      el.classList.add("jgs-recruit-top-anim-item--from-bottom");
      el.style.setProperty("--jgs-recruit-top-anim-index", String(index));
    });

    if (appealTexts.some(function (el) { return el; })) scrollTargets.push(appealContent);
  }

  var workStyle = page.querySelector(".jgs-recruit-top__work-style");
  if (workStyle) {
    var workStyleLead = workStyle.querySelector(".jgs-recruit-top__work-style-lead");
    if (workStyleLead) {
      workStyleLead.classList.add("jgs-recruit-top-anim-item--from-bottom");
      workStyleLead.style.setProperty("--jgs-recruit-top-anim-index", "0");
    }

    var workStyleCards = Array.from(
      workStyle.querySelectorAll(".jgs-recruit-top__work-style-cards > .jgs-recruit-top__interview-card")
    );
    workStyleCards.forEach(function (card, index) {
      card.classList.add("jgs-recruit-top-anim-item");
      card.style.setProperty("--jgs-recruit-top-anim-index", String(index));
    });

    if (workStyleLead || workStyleCards.length) scrollTargets.push(workStyle);
  }

  var recruitJobs = page.querySelector(".jgs-top-recruit-jobs");
  if (recruitJobs) {
    var jobItems = Array.from(
      recruitJobs.querySelectorAll(".jgs-top-recruit-jobs__list > .jgs-top-recruit-jobs__item")
    );
    jobItems.forEach(function (item, index) {
      item.classList.add("jgs-recruit-top-anim-item");
      item.style.setProperty("--jgs-recruit-top-anim-index", String(index));
    });

    if (jobItems.length) scrollTargets.push(recruitJobs);
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!fv && !scrollTargets.length) return;

  if (prefersReducedMotion) {
    if (fv) fv.classList.add("is-inview");
    scrollTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    return;
  }

  page.classList.add("jgs-recruit-top-anim-ready");

  if (fv) {
    function activateFv() {
      fv.classList.add("is-inview");
    }

    if (!("requestAnimationFrame" in window)) {
      activateFv();
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(activateFv);
      });
    }
  }

  if (!scrollTargets.length || !("IntersectionObserver" in window)) {
    scrollTargets.forEach(function (target) {
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

  scrollTargets.forEach(function (target) {
    observer.observe(target);
  });
})();


