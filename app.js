// ============================================================
//  Grand InterContinental Seoul Parnas — interactions
// ============================================================
(function () {
  "use strict";

  /* ---------- Header: transparent -> solid on scroll ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add("is-solid");
    else header.classList.remove("is-solid");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- GNB full-screen overlay ---------- */
  const overlay = document.querySelector(".gnb-overlay");
  const openBtns = document.querySelectorAll(".menu-btn, .mbar-menu-trigger");
  const closeBtn = document.querySelector(".gnb-overlay__close");
  if (overlay) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        overlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", () => {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      document.querySelectorAll(".gnb-col.is-open").forEach(c => c.classList.remove("is-open"));
      document.querySelectorAll(".gnb-has-sub.is-open").forEach(s => s.classList.remove("is-open"));
    });
  }

  /* ---------- GNB accordion (mobile) ---------- */
  document.querySelectorAll(".gnb-col > h4").forEach(h4 => {
    h4.addEventListener("click", () => {
      const col = h4.parentElement;
      const isOpen = col.classList.contains("is-open");
      document.querySelectorAll(".gnb-col.is-open").forEach(c => {
        c.classList.remove("is-open");
        c.querySelectorAll(".gnb-has-sub.is-open").forEach(s => s.classList.remove("is-open"));
      });
      if (!isOpen) col.classList.add("is-open");
    });
  });

  /* ---------- GNB sub-list toggle (시술 하위 메뉴) ---------- */
  document.querySelectorAll(".gnb-sub-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const li = btn.closest(".gnb-has-sub");
      li.classList.toggle("is-open");
    });
  });

  /* ---------- Hero slider ---------- */
  const slides = [...document.querySelectorAll(".hero__slide")];
  const counterCur = document.querySelector(".hero__counter-cur");
  const counterTot = document.querySelector(".hero__counter-tot");
  let cur = 0;
  let timer = null;
  function go(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === cur));
    if (counterCur) counterCur.textContent = String(cur + 1).padStart(2, '0');
  }
  function play() {
    stop();
    timer = setInterval(() => go(cur + 1), 6000);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }
  if (slides.length) {
    if (counterTot) counterTot.textContent = String(slides.length).padStart(2, '0');
    go(0);
    play();
  }

  /* touch swipe on hero */
  const heroEl = document.querySelector(".hero");
  if (heroEl) {
    let tx = 0;
    heroEl.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
    heroEl.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) < 40) return;
      go(dx < 0 ? cur + 1 : cur - 1);
      play();
    }, { passive: true });
  }

  /* ---------- Booking widget tabs ---------- */
  const bkTabs = [...document.querySelectorAll(".booking__tab")];
  const bkBodies = [...document.querySelectorAll(".booking__body")];
  bkTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const t = tab.dataset.target;
      bkTabs.forEach((x) => x.classList.toggle("is-active", x === tab));
      bkBodies.forEach((b) => b.classList.toggle("is-active", b.dataset.body === t));
    });
  });

  /* ---------- Collection horizontal scroller ---------- */
  const track = document.querySelector(".collection__track");
  const prev = document.querySelector(".cnav-btn--prev");
  const next = document.querySelector(".cnav-btn--next");
  if (track && prev && next) {
    const step = () => {
      const card = track.querySelector(".col-card");
      return card ? card.getBoundingClientRect().width + 30 : 360;
    };
    const updateBtns = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", updateBtns, { passive: true });
    window.addEventListener("resize", updateBtns);
    updateBtns();
  }

  /* ---------- News filter ---------- */
  const filters = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".news-card")];
  filters.forEach((f) => {
    f.addEventListener("click", () => {
      const cat = f.dataset.cat;
      filters.forEach((x) => x.classList.toggle("is-active", x === f));
      cards.forEach((c) => {
        const show = cat === "all" || c.dataset.cat === cat;
        c.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- Services accordion ---------- */
  const accItems = [...document.querySelectorAll(".acc-item")];
  function setAcc(item, open) {
    const body = item.querySelector(".acc-body");
    item.classList.toggle("is-open", open);
    body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
  }
  accItems.forEach((item) => {
    const head = item.querySelector(".acc-head");
    head.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      accItems.forEach((other) => setAcc(other, false));
      if (willOpen) setAcc(item, true);
    });
  });
  // initialise open item
  accItems.forEach((item) => setAcc(item, item.classList.contains("is-open")));
  window.addEventListener("resize", () => {
    accItems.forEach((item) => {
      if (item.classList.contains("is-open")) setAcc(item, true);
    });
  });

  /* ---------- Feature slider (bounded, no loop) ---------- */
  const fvp = document.querySelector(".feature__viewport");
  if (fvp) {
    const ftrack = fvp.querySelector(".feature__track");
    const fSlides = [...fvp.querySelectorAll(".feature__slide")];
    const fDots = [...document.querySelectorAll(".feature__dots button")];
    const slideCount = fSlides.length;
    let fIndex = 0;

    function metrics() {
      const w = fSlides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(ftrack).columnGap) || 0;
      return { w, step: w + gap };
    }
    function baseFor(i) {
      const { w, step } = metrics();
      return fvp.clientWidth / 2 - (i * step + w / 2);
    }
    function setTranslate(x, anim) {
      ftrack.classList.toggle("no-anim", !anim);
      ftrack.style.transform = "translateX(" + x + "px)";
    }
    function goFeature(i, anim) {
      fIndex = Math.max(0, Math.min(slideCount - 1, i));
      setTranslate(baseFor(fIndex), anim !== false);
      fDots.forEach((d, k) => d.classList.toggle("is-active", k === fIndex));
    }
    fDots.forEach((d, k) => d.addEventListener("click", () => goFeature(k)));

    // pointer drag
    let down = false,
      decided = false,
      horiz = false;
    let startX = 0,
      startY = 0,
      lastX = 0,
      base = 0,
      moved = false;
    fvp.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true;
      decided = false;
      horiz = false;
      moved = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      base = baseFor(fIndex);
    });
    fvp.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX,
        dy = e.clientY - startY;
      if (!decided) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        decided = true;
        horiz = Math.abs(dx) > Math.abs(dy);
        if (horiz) {
          fvp.classList.add("is-dragging");
          fvp.setPointerCapture(e.pointerId);
        }
      }
      if (!horiz) return;
      moved = true;
      lastX = e.clientX;
      e.preventDefault();
      // clamp drag so it can't pull past first or last slide
      const { step } = metrics();
      const maxPull = step * 0.1;
      const clamped =
        fIndex === 0 ? Math.min(dx, maxPull) :
        fIndex === slideCount - 1 ? Math.max(dx, -maxPull) : dx;
      setTranslate(base + clamped, false);
    });
    function endDrag(e) {
      if (!down) return;
      down = false;
      if (horiz) {
        fvp.classList.remove("is-dragging");
        try { fvp.releasePointerCapture(e.pointerId); } catch (_) {}
        const dx = lastX - startX;
        const { step } = metrics();
        let shift = 0;
        if (Math.abs(dx) > step * 0.08) shift = dx < 0 ? 1 : -1;
        goFeature(fIndex + shift);
      }
    }
    fvp.addEventListener("pointerup", endDrag);
    fvp.addEventListener("pointercancel", endDrag);
    fvp.addEventListener("click", (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    fvp.addEventListener("dragstart", (e) => e.preventDefault());

    window.addEventListener("resize", () => goFeature(fIndex, false));
    window.requestAnimationFrame(() => goFeature(1, false));
  }

  /* ---------- Mobile bar: language sheet ---------- */
  const mbarLang = document.querySelector(".mbar-lang");
  const langSheet = document.getElementById("langSheet");
  if (mbarLang && langSheet) {
    const backdrop = langSheet.querySelector(".lang-sheet__backdrop");
    const closeLang = () => {
      langSheet.classList.remove("is-open");
      langSheet.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    mbarLang.addEventListener("click", () => {
      langSheet.classList.add("is-open");
      langSheet.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
    backdrop.addEventListener("click", closeLang);
    langSheet.querySelectorAll(".lang-sheet__opt").forEach(btn => {
      btn.addEventListener("click", () => {
        langSheet.querySelectorAll(".lang-sheet__opt").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        closeLang();
      });
    });
  }

  /* ---------- Top button ---------- */
  const topBtn = document.querySelector(".top-btn");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.classList.toggle("is-visible", window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  /* ---------- Mobile CTA: hide when footer is visible ---------- */
  const heroCta = document.querySelector(".hero__cta");
  const footer  = document.querySelector(".footer");
  if (heroCta && footer) {
    const footerIO = new IntersectionObserver(
      ([e]) => heroCta.classList.toggle("is-hidden", e.isIntersecting),
      { threshold: 0 }
    );
    footerIO.observe(footer);
  }
})();
