(function () {
  var header = document.querySelector(".jgs-header");
  var btn = document.querySelector(".jgs-header__menu-btn");
  var nav = document.querySelector(".jgs-header__nav");
  if (!header || !btn || !nav) return;

  function updateRecruitMegaTop() {
    var bottom = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty("--jgs-recruit-mega-top", bottom + "px");
  }

  function normalizeRecruitMegaCards() {
    var cards = document.querySelectorAll(".jgs-header__recruit-mega-card");
    var imageNameByHref = [
      { key: "recruit/childcare/index.html", file: "recruit-childcare_card.webp" },
      { key: "recruit/recruitment/index.html", file: "recruit-info_card.webp" },
      { key: "recruit/part-time/index.html", file: "recruit-part-time_card.webp" },
      { key: "recruit/full-time/index.html", file: "recruit-full-time_card.webp" },
      { key: "recruit/index.html", file: "recruit-top_card.webp" }
    ];

    cards.forEach(function (card) {
      var titleEl = card.querySelector(".jgs-header__recruit-mega-card-title");
      var href = card.getAttribute("href") || "";
      var titleText = titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : "";

      var directVisual = card.querySelector(":scope > .jgs-header__recruit-mega-card-visual");
      if (directVisual) {
        var stack = document.createElement("div");
        stack.className = "jgs-header__recruit-mega-card-stack";
        stack.setAttribute("aria-hidden", "true");

        var mid = document.createElement("div");
        mid.className = "jgs-header__recruit-mega-card-stack-mid";

        var top = document.createElement("div");
        top.className = "jgs-header__recruit-mega-card-stack-top";

        directVisual.parentNode.replaceChild(stack, directVisual);
        stack.appendChild(mid);
        mid.appendChild(top);
        top.appendChild(directVisual);
      }

      var visual = card.querySelector(".jgs-header__recruit-mega-card-visual");
      if (!visual) return;

      var hasImage = !!visual.querySelector("img");
      if (hasImage) return;

      var matched = imageNameByHref.find(function (item) {
        return href.indexOf(item.key) !== -1;
      });
      if (!matched) return;

      var recruitPos = href.indexOf("recruit/");
      var pathPrefix = recruitPos >= 0 ? href.slice(0, recruitPos) : "";

      var img = document.createElement("img");
      img.src = pathPrefix + "assets/image/" + matched.file;
      img.alt = titleText;
      img.width = 100;
      img.height = 100;
      img.decoding = "async";
      visual.appendChild(img);
    });
  }

  function normalizeFooterRecruitLinks() {
    var links = document.querySelectorAll(".jgs-footer__nav-recruit a");
    links.forEach(function (link) {
      var label = link.textContent.replace(/\s+/g, " ").trim();
      var href = link.getAttribute("href") || "";
      if (label === "正社員") {
        if (href.indexOf("recruit/") !== -1) {
          link.setAttribute("href", href.replace(/recruit\/index\.html#full-time$/, "recruit/full-time/index.html"));
          return;
        }
        if (href === "./recruitment/index.html#fulltime") {
          link.setAttribute("href", "full-time/index.html");
          return;
        }
        if (href.indexOf("recruitment/index.html#fulltime") !== -1) {
          link.setAttribute("href", href.replace(/recruitment\/index\.html#fulltime$/, "full-time/index.html"));
          return;
        }
        if (href === "#fulltime") {
          link.setAttribute("href", "../full-time/index.html");
        }
        return;
      }

      if (label === "アルバイト") {
        if (href.indexOf("recruit/") !== -1) {
          link.setAttribute("href", href.replace(/recruit\/index\.html#part-time$/, "recruit/part-time/index.html"));
          return;
        }
        if (href === "./recruitment/index.html#parttime") {
          link.setAttribute("href", "part-time/index.html");
          return;
        }
        if (href.indexOf("recruitment/index.html#parttime") !== -1) {
          link.setAttribute("href", href.replace(/recruitment\/index\.html#parttime$/, "part-time/index.html"));
          return;
        }
        if (href === "#parttime") {
          link.setAttribute("href", "../part-time/index.html");
        }
      }
    });
  }

  normalizeRecruitMegaCards();
  normalizeFooterRecruitLinks();
  window.addEventListener("load", updateRecruitMegaTop);
  window.addEventListener("resize", updateRecruitMegaTop);

  var mobileNavMq = window.matchMedia("(max-width: 1024px)");
  var navList = nav.querySelector(".jgs-header__list");

  function buildSpSubList(sourceRoot) {
    if (!sourceRoot || sourceRoot.querySelector(".jgs-header__sp-sub")) return;

    var cards = sourceRoot.querySelectorAll(".jgs-header__recruit-mega-card");
    if (!cards.length) return;

    var sub = document.createElement("ul");
    sub.className = "jgs-header__sp-sub";

    cards.forEach(function (card) {
      var href = card.getAttribute("href");
      if (!href) return;

      var title = card.querySelector(".jgs-header__recruit-mega-card-title");
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.className = "jgs-header__sp-sublink";
      link.href = href;
      link.innerHTML = title ? title.innerHTML : "";
      li.appendChild(link);
      sub.appendChild(li);
    });

    sourceRoot.appendChild(sub);
  }

  function initMobileRecruitNav() {
    if (!navList || navList.querySelector(".jgs-header__item--has-recruit")) return;

    var recruitMega = document.querySelector(".jgs-header__recruit-mega");
    if (!recruitMega) return;

    var panel = document.createElement("div");
    panel.className = "jgs-header__recruit-sp-panel";
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", "採用情報");
    buildSpSubList(recruitMega);
    var sub = recruitMega.querySelector(".jgs-header__sp-sub");
    if (!sub) return;

    panel.appendChild(sub.cloneNode(true));

    var item = document.createElement("li");
    item.className = "jgs-header__item jgs-header__item--has-recruit jgs-header__item--accordion";

    var trigger = document.createElement("span");
    trigger.className = "jgs-header__link";
    trigger.textContent = "採用情報";
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-expanded", "false");

    item.appendChild(trigger);
    item.appendChild(panel);
    navList.appendChild(item);
  }

  function closeAllAccordions() {
    header.querySelectorAll(".jgs-header__item--sub-open").forEach(function (item) {
      item.classList.remove("jgs-header__item--sub-open");
      var trigger = item.querySelector(":scope > .jgs-header__link");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function toggleAccordionItem(item) {
    var trigger = item.querySelector(":scope > .jgs-header__link");
    var willOpen = !item.classList.contains("jgs-header__item--sub-open");

    header.querySelectorAll(".jgs-header__item--accordion.jgs-header__item--sub-open").forEach(function (openItem) {
      if (openItem === item) return;
      openItem.classList.remove("jgs-header__item--sub-open");
      var openTrigger = openItem.querySelector(":scope > .jgs-header__link");
      if (openTrigger) openTrigger.setAttribute("aria-expanded", "false");
    });

    item.classList.toggle("jgs-header__item--sub-open", willOpen);
    if (trigger) trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
  }

  function initMobileNavAccordion() {
    if (!navList) return;

    initMobileRecruitNav();

    header.querySelectorAll(".jgs-header__item--has-products, .jgs-header__item--has-services").forEach(function (item) {
      var trigger = item.querySelector(":scope > .jgs-header__link");
      var panel = item.querySelector(
        ":scope > .jgs-header__products-mega, :scope > .jgs-header__services-mega"
      );
      if (!trigger || !panel) return;

      item.classList.add("jgs-header__item--accordion");
      buildSpSubList(panel);

      if (trigger.tagName !== "A") {
        trigger.setAttribute("role", "button");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        trigger.setAttribute("aria-expanded", "false");
      }

      trigger.addEventListener("click", function (e) {
        if (!mobileNavMq.matches) return;
        e.preventDefault();
        toggleAccordionItem(item);
      });

      trigger.addEventListener("keydown", function (e) {
        if (!mobileNavMq.matches) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        toggleAccordionItem(item);
      });
    });

    header.querySelectorAll(".jgs-header__item--has-recruit").forEach(function (item) {
      var trigger = item.querySelector(":scope > .jgs-header__link");
      if (!trigger) return;

      trigger.addEventListener("click", function (e) {
        if (!mobileNavMq.matches) return;
        e.preventDefault();
        toggleAccordionItem(item);
      });

      trigger.addEventListener("keydown", function (e) {
        if (!mobileNavMq.matches) return;
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        toggleAccordionItem(item);
      });
    });

    navList.querySelectorAll(":scope > .jgs-header__item").forEach(function (item, index) {
      item.style.setProperty("--jgs-header-nav-index", String(index));
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      header.classList.add("jgs-header-anim-ready");
    }
  }

  initMobileNavAccordion();

  function setOpen(open) {
    header.classList.toggle("jgs-header--nav-open", open);
    header.classList.toggle("jgs-header--nav-animate", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) closeAllAccordions();
  }

  btn.addEventListener("click", function () {
    setOpen(!header.classList.contains("jgs-header--nav-open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest(".jgs-header__sp-sublink")) {
      setOpen(false);
      return;
    }

    if (e.target.closest(".jgs-header__item:not(.jgs-header__item--accordion) a.jgs-header__link")) {
      setOpen(false);
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  window.matchMedia("(min-width: 1025px)").addEventListener("change", function (e) {
    if (e.matches) {
      setOpen(false);
      closeAllAccordions();
    }
  });
})();

(function () {
  var actions = document.querySelector(".jgs-recruit-top__fv-actions");
  var footer = document.querySelector(".jgs-footer");
  if (!actions || !footer) return;

  var mq = window.matchMedia("(max-width: 768px)");

  function setFooterVisible(isVisible) {
    actions.classList.toggle("is-footer-visible", mq.matches && isVisible);
  }

  function updateByFooterPosition() {
    if (!mq.matches) {
      setFooterVisible(false);
      return;
    }

    var footerTop = footer.getBoundingClientRect().top;
    setFooterVisible(footerTop < window.innerHeight);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        setFooterVisible(entry.isIntersecting);
      });
    });
    observer.observe(footer);
  } else {
    window.addEventListener("scroll", updateByFooterPosition, { passive: true });
    window.addEventListener("resize", updateByFooterPosition);
  }

  mq.addEventListener("change", updateByFooterPosition);
  window.addEventListener("load", updateByFooterPosition);
  updateByFooterPosition();
})();

(function () {
  if (!document.body.classList.contains("jgs-recruit-top-page")) return;

  var header = document.querySelector(".jgs-header");
  if (!header) return;

  var mq = window.matchMedia("(max-width: 768px)");
  var scrollThreshold = 8;

  function updateRecruitTopHeaderScroll() {
    if (!mq.matches) {
      header.classList.remove("jgs-header--scrolled");
      return;
    }
    header.classList.toggle("jgs-header--scrolled", window.scrollY > scrollThreshold);
  }

  window.addEventListener("scroll", updateRecruitTopHeaderScroll, { passive: true });
  mq.addEventListener("change", updateRecruitTopHeaderScroll);
  window.addEventListener("load", updateRecruitTopHeaderScroll);
  updateRecruitTopHeaderScroll();
})();

(function () {
  var topSections = Array.prototype.slice.call(
    document.querySelectorAll(".jgs-top-fv, .jgs-top-mission, .jgs-top-products, .jgs-top-service, .jgs-top-recruit, .jgs-top-news")
  );
  if (!topSections.length) return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    topSections.forEach(function (section) {
      section.classList.add("is-inview");
    });
    return;
  }

  document.body.classList.add("jgs-top-anim-ready");

  if (!("IntersectionObserver" in window)) {
    topSections.forEach(function (section) {
      section.classList.add("is-inview");
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
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  topSections.forEach(function (section) {
    observer.observe(section);
  });
})();
