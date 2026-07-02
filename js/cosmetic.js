/* cosmetic.js — cosmetic 페이지 인터랙션 */

(function () {
  /* ── 상품 데이터 ── */
  var products = [
    {
      id: 1,
      name: "보닉스 레쥬티 리보 세럼",
      category: "세럼",
      price: 1100,
      rating: 4.8,
      popularity: 95,
      tags: ["항산화", "깊은주름"],
      img: "assets/img/7-cosmetic/3-b8570c74-0a94-4bbe-8b64-7f72f257fb8a.jpg",
    },
    {
      id: 2,
      name: "보닉스 레쥬 리보 세럼",
      category: "세럼",
      price: 440000,
      rating: 4.7,
      popularity: 88,
      tags: ["건성케어", "피부결케어"],
      img: "assets/img/7-cosmetic/2-839e3bbb-7096-467b-939b-f962bbcce710.jpg",
    },
    {
      id: 3,
      name: "보닉스 헤어 리보 세럼",
      category: "세럼",
      price: 440000,
      rating: 4.6,
      popularity: 72,
      tags: ["두피진정", "두피영양"],
      img: "assets/img/7-cosmetic/1-7a8c5d17-c730-4e6e-abba-a3f1cdc5ff4c.jpg",
    },
    {
      id: 4,
      name: "보닉스 휴그로 리코 크림",
      category: "크림",
      price: 220000,
      rating: 4.9,
      popularity: 91,
      tags: [],
      img: "assets/img/7-cosmetic/4-74d977e6-dfb5-4a73-a03b-85a16a324c5a.png",
    },
    {
      id: 5,
      name: "보닉스 큐어 V",
      category: "스텝",
      price: 220000,
      rating: 4.5,
      popularity: 65,
      tags: [],
      img: "assets/img/7-cosmetic/5-d05ccb6a-0bb2-4653-b974-8d88d536cd88.jpg",
    },
    {
      id: 6,
      name: "보닉스 큐어 C",
      category: "스텝",
      price: 220000,
      rating: 4.7,
      popularity: 78,
      tags: ["각질케어", "흔적삭제"],
      img: "assets/img/7-cosmetic/6-acc3bbee-e843-4008-9f5a-6f29acc93d1c.jpg",
    },
    {
      id: 7,
      name: "보닉스 휴그로 펩타이드 미스트",
      category: "미스트",
      price: 220000,
      rating: 4.4,
      popularity: 55,
      tags: [],
      img: "assets/img/7-cosmetic/7-2b792923-d975-41e6-83b2-232aff738cbb.png",
    },
    {
      id: 8,
      name: "더:스트 고농축 휴그로 W 원료형 화장품 (30ea)",
      category: "화장품",
      price: 220000,
      rating: 4.3,
      popularity: 48,
      tags: ["탄력개선", "주름완화"],
      img: "assets/img/7-cosmetic/8-5048bf5f-aa9a-49ca-8f53-69dccfa25ee9.png",
    },
    {
      id: 9,
      name: "보닉스 스킨 에센스",
      category: "에센스",
      price: 180000,
      rating: 4.6,
      popularity: 82,
      tags: ["보습", "탄력"],
      img: "assets/img/7-cosmetic/9-20289233-2407-4357-94e2-411778be9ad0.png",
    },
    {
      id: 10,
      name: "보닉스 셀 리페어 크림",
      category: "크림",
      price: 350000,
      rating: 4.8,
      popularity: 90,
      tags: ["재생", "진정"],
      img: "assets/img/7-cosmetic/10-77037a92-770f-4f6f-8b25-4ef6ff4cfd81.png",
    },
    {
      id: 11,
      name: "휴그로 바이탈 에센스",
      category: "에센스",
      price: 280000,
      rating: 4.5,
      popularity: 70,
      tags: ["활력", "광채"],
      img: "assets/img/7-cosmetic/11-5a671248-69a9-4590-ab65-3239b3d06130.png",
    },
  ];

  var _allImgs = products.map(function (p) {
    return p.img;
  });
  products.forEach(function (p, i) {
    var others = _allImgs.filter(function (url) {
      return url !== p.img;
    });
    var offset = (i * 2) % others.length;
    var rotated = others.slice(offset).concat(others.slice(0, offset));
    p.imgs = [p.img, rotated[0], rotated[2], rotated[4], rotated[6]];
  });

  var currentCategory = "all";
  var currentSort = "default";
  var currentSearch = "";
  var currentPage = 1;
  var PAGE_SIZE = 8;
  var totalPages = 1;

  function formatPrice(n) {
    return "₩" + n.toLocaleString("ko-KR");
  }

  function renderCard(p) {
    return [
      '<article class="prod-card" data-id="' + p.id + '" data-imgs="' + p.imgs.join("|") + '">',
      '  <div class="prod-card__img-wrap">',
      '    <img class="prod-card__img" src="' + p.img + '" alt="' + p.name + '" loading="lazy" />',
      "",
      '    <div class="prod-card__hover-bar">',
      '      <button class="cosm-hbtn" aria-label="장바구니"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></button>',
      '      <button class="cosm-hbtn" aria-label="위시리스트"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>',
      '      <button class="cosm-hbtn" aria-label="공유"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></button>',
      '      <button class="cosm-hbtn" aria-label="이전"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>',
      '      <button class="cosm-hbtn" aria-label="다음"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>',
      "    </div>",
      "  </div>",
      '  <div class="prod-card__body">',
      '    <h3 class="prod-card__name">' + p.name + "</h3>",
      '    <div class="prod-card__meta">',
      '      <span class="prod-card__price">' + formatPrice(p.price) + "</span>",
      "    </div>",
      "  </div>",
      "</article>",
    ].join("\n");
  }

  function render() {
    var filtered =
      currentCategory === "all"
        ? products.slice()
        : products.filter(function (p) {
            return p.category === currentCategory;
          });

    if (currentSearch) {
      filtered = filtered.filter(function (p) {
        return p.name.toLowerCase().indexOf(currentSearch) !== -1;
      });
    }

    switch (currentSort) {
      case "name":
        filtered.sort(function (a, b) {
          return a.name.localeCompare(b.name, "ko");
        });
        break;
      case "rating":
        filtered.sort(function (a, b) {
          return b.rating - a.rating;
        });
        break;
      case "popularity":
        filtered.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
        break;
      case "price-low":
        filtered.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "price-high":
        filtered.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
    }

    document.getElementById("productCount").textContent = filtered.length;

    totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * PAGE_SIZE;
    var pageItems = filtered.slice(start, start + PAGE_SIZE);

    document.getElementById("productGrid").innerHTML = pageItems.map(renderCard).join("");
    renderPagination();

    document.querySelectorAll(".prod-card[data-id]").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = parseInt(card.getAttribute("data-id"));
        var product = products.find(function (p) {
          return p.id === id;
        });
        if (product) {
          sessionStorage.setItem("cosm_product", JSON.stringify(product));
          sessionStorage.setItem("cosm_products", JSON.stringify(products)); /* ★ [신규] product.html 좌측 추천 상품 패널용 전체 상품 목록 전달 */
          window.location.href = "product.html";
        }
      });

      var imgs = (card.getAttribute("data-imgs") || "").split("|").filter(Boolean);
      var imgEl = card.querySelector(".prod-card__img");
      var imgIdx = 0;
      var errCount = 0;
      imgEl.addEventListener("error", function () {
        if (errCount < imgs.length - 1) {
          errCount++;
          imgIdx = (imgIdx + 1) % imgs.length;
          imgEl.src = imgs[imgIdx];
        }
      });

      card.querySelectorAll(".cosm-hbtn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          var label = btn.getAttribute("aria-label");

          if (label === "위시리스트") {
            btn.classList.toggle("is-liked");
          } else if (label === "장바구니") {
            if (!btn.classList.contains("is-added")) {
              btn.classList.add("is-added");
              setTimeout(function () {
                btn.classList.remove("is-added");
              }, 900);
            }
          } else if (label === "공유") {
            btn.classList.add("is-shared");
            setTimeout(function () {
              btn.classList.remove("is-shared");
            }, 900);
          } else if (label === "이전" && imgs.length > 1) {
            imgIdx = (imgIdx - 1 + imgs.length) % imgs.length;
            imgEl.src = imgs[imgIdx];
            btn.classList.add("is-nav-clicked");
            setTimeout(function () {
              btn.classList.remove("is-nav-clicked");
            }, 200);
          } else if (label === "다음" && imgs.length > 1) {
            imgIdx = (imgIdx + 1) % imgs.length;
            imgEl.src = imgs[imgIdx];
            btn.classList.add("is-nav-clicked");
            setTimeout(function () {
              btn.classList.remove("is-nav-clicked");
            }, 200);
          }
        });
      });
    });
  }

  /* ── 페이지네이션 ── */
  function renderPagination() {
    var numsEl = document.getElementById("cosmPagiNums");
    var html = "";
    for (var i = 1; i <= totalPages; i++) {
      html += '<button class="cosm-pagi-num' + (i === currentPage ? " is-active" : "") + '" data-page="' + i + '">' + i + "</button>";
    }
    numsEl.innerHTML = html;
    numsEl.querySelectorAll(".cosm-pagi-num").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentPage = parseInt(btn.dataset.page, 10);
        render();
        document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    document.getElementById("cosmPrevBtn").disabled = currentPage <= 1;
    document.getElementById("cosmNextBtn").disabled = currentPage >= totalPages;
  }

  document.getElementById("cosmPrevBtn").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      render();
      document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  document.getElementById("cosmNextBtn").addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      render();
      document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* ── 검색 ── */
  var searchBtn = document.getElementById("cosmSearchBtn");
  var searchWrap = document.getElementById("cosmSearchWrap");
  var searchInput = document.getElementById("cosmSearchInput");
  if (searchBtn && searchWrap && searchInput) {
    searchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      searchWrap.classList.toggle("is-open");
      if (searchWrap.classList.contains("is-open")) searchInput.focus();
    });
    searchInput.addEventListener("input", function () {
      currentSearch = searchInput.value.trim().toLowerCase();
      currentPage = 1;
      render();
    });
  }

  /* ── 선택박스 공통 로직 ── */
  function initSelect(btnId, dropdownId, labelId, onChange) {
    var btn = document.getElementById(btnId);
    var dropdown = document.getElementById(dropdownId);
    var label = document.getElementById(labelId);
    if (!btn || !dropdown) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.contains("is-open");
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add("is-open");
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });

    dropdown.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("click", function () {
        dropdown.querySelectorAll("li").forEach(function (x) {
          x.classList.remove("is-active");
          x.setAttribute("aria-selected", "false");
        });
        li.classList.add("is-active");
        li.setAttribute("aria-selected", "true");
        label.textContent = li.textContent;
        closeAllDropdowns();
        onChange(li.dataset.value);
      });
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".cosm-select-dropdown").forEach(function (d) {
      d.classList.remove("is-open");
    });
    document.querySelectorAll(".cosm-select-btn").forEach(function (b) {
      b.classList.remove("is-open");
      b.setAttribute("aria-expanded", "false");
    });
  }

  document.addEventListener("click", closeAllDropdowns);

  initSelect("catBtn", "catDropdown", "catLabel", function (val) {
    currentCategory = val;
    currentPage = 1;
    render();
  });

  initSelect("sortBtn", "sortDropdown", "sortLabel", function (val) {
    currentSort = val;
    render();
  });

  render();
})();

(function () {
  const trigger = document.getElementById("loginTrigger");
  const modal = document.getElementById("loginModal");
  const close = document.getElementById("loginClose");
  const backdrop = document.getElementById("loginBackdrop");
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var first = modal.querySelector("input:not([type=hidden]),button:not([disabled])");
    if (first)
      setTimeout(function () {
        first.focus();
      }, 50);
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (trigger) trigger.focus();
  }
  if (trigger)
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  const gnbLoginBtn = document.querySelector(".gnb-login-btn");
  if (gnbLoginBtn)
    gnbLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  close.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  const pwdInput = document.getElementById("loginPassword");
  const pwdToggle = document.getElementById("loginPwdToggle");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeOffSvg =
    '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  const eyeOnSvg = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  if (pwdToggle)
    pwdToggle.addEventListener("click", function () {
      const isHidden = pwdInput.type === "password";
      pwdInput.type = isHidden ? "text" : "password";
      eyeIcon.innerHTML = isHidden ? eyeOffSvg : eyeOnSvg;
    });
})();
