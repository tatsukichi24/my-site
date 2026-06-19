(function () {
  var people = Array.from(document.querySelectorAll("[data-interview-person][data-person-id]"));
  var navItems = Array.from(document.querySelectorAll(".jgs-childcare-interview__nav [data-target-person]"));
  var prevBtn = document.querySelector(".jgs-childcare-interview__arrow--prev");
  var nextBtn = document.querySelector(".jgs-childcare-interview__arrow--next");
  var list = document.querySelector(".jgs-childcare-interview__list");

  if (!people.length || !navItems.length) return;

  // 切替時にコンテンツ量で高さが変わり、下のサムネイルがぐらつくのを防ぐため、
  // 全記事の最大高さを計測してリスト要素の min-height に固定する。
  function lockListHeight() {
    if (!list) return;

    list.style.minHeight = "";
    var listWidth = list.clientWidth;
    var maxHeight = 0;

    people.forEach(function (person) {
      var prev = {
        hidden: person.hidden,
        position: person.style.position,
        visibility: person.style.visibility,
        display: person.style.display,
        width: person.style.width,
        pointerEvents: person.style.pointerEvents,
      };

      // フラッシュさせずにレイアウトだけ取得する
      person.hidden = false;
      person.style.position = "absolute";
      person.style.visibility = "hidden";
      person.style.display = "grid";
      person.style.width = listWidth + "px";
      person.style.pointerEvents = "none";

      if (person.offsetHeight > maxHeight) maxHeight = person.offsetHeight;

      person.hidden = prev.hidden;
      person.style.position = prev.position;
      person.style.visibility = prev.visibility;
      person.style.display = prev.display;
      person.style.width = prev.width;
      person.style.pointerEvents = prev.pointerEvents;
    });

    if (maxHeight > 0) list.style.minHeight = maxHeight + "px";
  }

  var resizeTimer = null;
  function scheduleLockListHeight() {
    if (resizeTimer !== null) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockListHeight, 150);
  }

  function getNavImageSources(src) {
    if (src.includes("_sub.")) {
      return {
        active: src.replace("_sub.", "."),
        inactive: src,
      };
    }

    var ext = src.slice(src.lastIndexOf("."));
    var base = src.slice(0, -ext.length);
    return {
      active: src,
      inactive: base + "_sub" + ext,
    };
  }

  navItems.forEach(function (button) {
    var img = button.querySelector("img");
    if (!img) return;

    var sources = getNavImageSources(img.getAttribute("src") || "");
    button.dataset.activeSrc = sources.active;
    button.dataset.inactiveSrc = sources.inactive;
  });

  var personMap = new Map();
  people.forEach(function (person) {
    personMap.set(person.getAttribute("data-person-id"), person);
  });

  function activeNavIndex() {
    var i = navItems.findIndex(function (button) {
      return button.classList.contains("is-active");
    });
    return i < 0 ? 0 : i;
  }

  function scrollActiveNavIntoView(activeBtn) {
    var nav = activeBtn ? activeBtn.parentElement : null;
    if (!nav) return;

    var navWidth = nav.clientWidth;
    var itemLeft = activeBtn.offsetLeft;
    var itemRight = itemLeft + activeBtn.offsetWidth;
    var visibleLeft = nav.scrollLeft;
    var visibleRight = visibleLeft + navWidth;
    var nextLeft = visibleLeft;

    if (itemLeft < visibleLeft) {
      nextLeft = itemLeft;
    } else if (itemRight > visibleRight) {
      nextLeft = itemRight - navWidth;
    }

    if (nextLeft === visibleLeft) return;

    if (nav.scrollTo) {
      nav.scrollTo({ left: nextLeft, behavior: "smooth" });
    } else {
      nav.scrollLeft = nextLeft;
    }
  }

  function activatePerson(targetId, scrollNav) {
    if (!personMap.has(targetId)) return;

    people.forEach(function (person) {
      var isActive = person.getAttribute("data-person-id") === targetId;
      person.hidden = !isActive;
      person.setAttribute("aria-hidden", String(!isActive));
      person.classList.toggle("is-active", isActive);
    });

    navItems.forEach(function (button) {
      var isActive = button.getAttribute("data-target-person") === targetId;
      var img = button.querySelector("img");
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));

      if (img) {
        img.src = isActive ? button.dataset.activeSrc : button.dataset.inactiveSrc;
      }
    });

    document.dispatchEvent(
      new CustomEvent("jgs-childcare-person-change", {
        detail: { person: personMap.get(targetId) },
      })
    );

    if (!scrollNav) return;

    var activeBtn = navItems.find(function (button) {
      return button.getAttribute("data-target-person") === targetId;
    });
    scrollActiveNavIntoView(activeBtn);
  }

  function shiftPerson(delta) {
    var i = activeNavIndex();
    var n = (i + delta + navItems.length) % navItems.length;
    activatePerson(navItems[n].getAttribute("data-target-person"), true);
  }

  var AUTOPLAY_MS = 5000;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var autoplayId = null;
  var isHovered = false;

  function stopAutoplay() {
    if (autoplayId !== null) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    if (prefersReducedMotion || navItems.length < 2 || isHovered) return;
    stopAutoplay();
    autoplayId = setInterval(function () {
      shiftPerson(1);
    }, AUTOPLAY_MS);
  }

  // 手動操作後はインターバルを張り直し、直後の二重送りを防ぐ
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  navItems.forEach(function (button) {
    button.addEventListener("click", function () {
      activatePerson(button.getAttribute("data-target-person"), true);
      restartAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      shiftPerson(-1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      shiftPerson(1);
      restartAutoplay();
    });
  }

  // ホバー一時停止はサムネイル＋矢印部分のみを対象にする（スライド本文は対象外）
  var navWrap = document.querySelector(".jgs-childcare-interview__nav-wrap");
  if (navWrap) {
    navWrap.addEventListener("mouseenter", function () {
      isHovered = true;
      stopAutoplay();
    });
    navWrap.addEventListener("mouseleave", function () {
      isHovered = false;
      startAutoplay();
    });
  }

  var initial = navItems.find(function (button) {
    return button.classList.contains("is-active");
  });
  activatePerson(initial ? initial.getAttribute("data-target-person") : navItems[0].getAttribute("data-target-person"), false);

  lockListHeight();
  // 画像読み込み後に高さが変わる可能性があるため再計測する
  if (document.readyState === "complete") {
    lockListHeight();
  } else {
    window.addEventListener("load", lockListHeight);
  }
  window.addEventListener("resize", scheduleLockListHeight);

  startAutoplay();
})();

(function () {
  var visualSp = document.querySelector(".jgs-childcare-before-after__visual-sp");
  if (!visualSp) return;

  var slides = Array.from(visualSp.querySelectorAll(".jgs-childcare-before-after__slide"));
  var navItems = Array.from(visualSp.querySelectorAll("[data-before-after-index]"));

  if (!slides.length || !navItems.length) return;

  function activateSlide(index) {
    slides.forEach(function (slide, i) {
      var isActive = i === index;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    navItems.forEach(function (button, i) {
      var isActive = i === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  }

  navItems.forEach(function (button) {
    button.addEventListener("click", function () {
      var index = Number(button.getAttribute("data-before-after-index"));
      if (!Number.isNaN(index)) activateSlide(index);
    });
  });

  activateSlide(0);
})();

(function () {
  var flow = document.querySelector(".jgs-childcare-flow");
  if (!flow) return;

  var caseId = flow.querySelector(".jgs-childcare-flow__case-id");
  var caseLabel = flow.querySelector(".jgs-childcare-flow__case-label");
  var portrait = flow.querySelector(".jgs-childcare-flow__portrait-img");
  var rightImage = flow.querySelector(".jgs-childcare-flow__right img");
  var values = Array.from(flow.querySelectorAll(".jgs-childcare-flow__value"));
  var cards = Array.from(flow.querySelectorAll(".jgs-childcare-flow__card"));
  var arrows = Array.from(flow.querySelectorAll(".jgs-childcare-flow__arrow"));

  if (!caseId || !caseLabel || !portrait || !rightImage || !cards.length) return;

  function getNavImageSources(src) {
    if (src.includes("_sub.")) {
      return {
        active: src.replace("_sub.", "."),
        inactive: src,
      };
    }

    var ext = src.slice(src.lastIndexOf("."));
    var base = src.slice(0, -ext.length);
    return {
      active: src,
      inactive: base + "_sub" + ext,
    };
  }

  var flowItems = [
    {
      caseId: "CASE 01",
      caseLabel: "メリハリ両立型の働き方",
      portraitSrc: "../../assets/recruit-image/work-flow_rie-takahata.png",
      portraitWidth: "353",
      portraitHeight: "492",
      portraitAlt: "高畑理恵さんの写真",
      workStyle: "パート",
      work: "販売営業",
      rightSrc: "../../assets/recruit-image/recruit_work-flow_rie-takahata_right.svg",
      rightWidth: "665",
      rightHeight: "641",
      rightAlt: "高畑理恵さんの1日の業務スケジュール",
    },
    {
      caseId: "CASE 02",
      caseLabel: "子育てと両立する働き方",
      portraitSrc: "../../assets/recruit-image/recruit_childcare_ayaka-hattori.png",
      portraitWidth: "269",
      portraitHeight: "270",
      portraitAlt: "服部彩香さんの写真",
      workStyle: "パート",
      work: "販売営業",
      rightSrc: "../../assets/recruit-image/recruit_childcare-system_02.png",
      rightWidth: "444",
      rightHeight: "509",
      rightAlt: "子育てと両立しながら働く様子",
    },
    {
      caseId: "CASE 03",
      caseLabel: "チームで支える働き方",
      portraitSrc: "../../assets/recruit-image/recruit_childcare_tomoharu-kishi.png",
      portraitWidth: "252",
      portraitHeight: "265",
      portraitAlt: "岸智治さんの写真",
      workStyle: "正社員",
      work: "店舗運営",
      rightSrc: "../../assets/recruit-image/recruit_childcare-system_03.png",
      rightWidth: "444",
      rightHeight: "479",
      rightAlt: "チームで働くスタッフの様子",
    },
  ];

  cards.forEach(function (button) {
    var img = button.querySelector("img");
    if (!img) return;

    var sources = getNavImageSources(img.getAttribute("src") || "");
    button.dataset.activeSrc = sources.active;
    button.dataset.inactiveSrc = sources.inactive;
  });

  var activeIndex = 0;

  function setImageAttrs(img, src, width, height, alt) {
    img.src = src;
    img.width = Number(width);
    img.height = Number(height);
    img.setAttribute("width", width);
    img.setAttribute("height", height);
    img.alt = alt;
  }

  function activateFlow(index) {
    var nextIndex = (index + flowItems.length) % flowItems.length;
    var item = flowItems[nextIndex];

    activeIndex = nextIndex;
    caseId.textContent = item.caseId;
    caseLabel.textContent = item.caseLabel;
    setImageAttrs(portrait, item.portraitSrc, item.portraitWidth, item.portraitHeight, item.portraitAlt);
    setImageAttrs(rightImage, item.rightSrc, item.rightWidth, item.rightHeight, item.rightAlt);

    if (values[0]) values[0].textContent = item.workStyle;
    if (values[1]) values[1].textContent = item.work;

    cards.forEach(function (button, i) {
      var isActive = i === nextIndex;
      var img = button.querySelector("img");
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));

      if (img) {
        img.src = isActive ? button.dataset.activeSrc : button.dataset.inactiveSrc;
      }
    });
  }

  cards.forEach(function (button, index) {
    button.setAttribute("aria-selected", String(index === 0));
    button.addEventListener("click", function () {
      activateFlow(index);
    });
  });

  if (arrows[0]) {
    arrows[0].addEventListener("click", function () {
      activateFlow(activeIndex - 1);
    });
  }

  if (arrows[1]) {
    arrows[1].addEventListener("click", function () {
      activateFlow(activeIndex + 1);
    });
  }

  activateFlow(0);
})();

(function () {
  var page = document.querySelector(".jgs-childcare-page");
  if (!page) return;

  var kv = page.querySelector(".jgs-childcare-kv");
  var scrollTargets = [];

  var strength = page.querySelector(".jgs-childcare-strength");
  if (strength) scrollTargets.push(strength);

  var system = page.querySelector(".jgs-childcare-system");
  if (system) {
    var systemCards = Array.from(
      system.querySelectorAll(".jgs-childcare-system__cards > .jgs-childcare-system__card")
    );
    systemCards.forEach(function (card, index) {
      card.classList.add("jgs-childcare-anim-item");
      card.style.setProperty("--jgs-childcare-anim-index", String(index));
    });

    if (systemCards.length) scrollTargets.push(system);
  }

  var beforeAfter = page.querySelector(".jgs-childcare-before-after");
  if (beforeAfter) {
    var introLower = beforeAfter.querySelector(".jgs-childcare-before-after__intro-lower");
    if (introLower) {
      introLower.classList.add("jgs-childcare-anim-item--from-bottom");
    }
    scrollTargets.push(beforeAfter);
  }

  var interview = page.querySelector(".jgs-childcare-interview");
  var interviewPeople = Array.from(page.querySelectorAll("[data-interview-person][data-person-id]"));

  function registerPersonBlocks(person) {
    var upper = person.querySelector(".jgs-childcare-person__upper");
    var lower = person.querySelector(".jgs-childcare-person__lower");

    if (upper) {
      upper.classList.add("jgs-childcare-anim-item--from-bottom");
      upper.style.setProperty("--jgs-childcare-anim-index", "0");
    }

    if (lower) {
      lower.classList.add("jgs-childcare-anim-item--from-bottom");
      lower.style.setProperty("--jgs-childcare-anim-index", "1");
    }
  }

  function playPersonBlocks(person) {
    if (!person || !interview || !interview.classList.contains("is-inview")) return;

    var blocks = person.querySelectorAll(
      ".jgs-childcare-person__upper, .jgs-childcare-person__lower"
    );
    blocks.forEach(function (el) {
      el.classList.remove("is-anim-played");
      void el.offsetWidth;
      el.classList.add("is-anim-played");
    });
  }

  if (interview && interviewPeople.length) {
    interviewPeople.forEach(registerPersonBlocks);
    scrollTargets.push(interview);
  }

  var flow = page.querySelector(".jgs-childcare-flow");
  if (flow) {
    var flowMedia = flow.querySelector(".jgs-childcare-flow__media");
    if (flowMedia) {
      var flowMediaItems = Array.from(
        flowMedia.querySelectorAll(".jgs-childcare-flow__left, .jgs-childcare-flow__right")
      );
      flowMediaItems.forEach(function (item, index) {
        item.classList.add("jgs-childcare-anim-item");
        item.style.setProperty("--jgs-childcare-anim-index", String(index));
      });
    }
    scrollTargets.push(flow);
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!kv && !scrollTargets.length) return;

  if (prefersReducedMotion) {
    if (kv) kv.classList.add("is-inview");
    scrollTargets.forEach(function (target) {
      target.classList.add("is-inview");
    });
    if (interview) {
      var activePerson = interview.querySelector(".jgs-childcare-person.is-active");
      playPersonBlocks(activePerson);
    }
    return;
  }

  page.classList.add("jgs-childcare-anim-ready");

  if (kv) {
    function activateKv() {
      kv.classList.add("is-inview");
    }

    if (!("requestAnimationFrame" in window)) {
      activateKv();
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(activateKv);
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

        if (entry.target === interview) {
          var activePerson = interview.querySelector(".jgs-childcare-person.is-active");
          playPersonBlocks(activePerson);
        }
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

  document.addEventListener("jgs-childcare-person-change", function (event) {
    playPersonBlocks(event.detail.person);
  });
})();
