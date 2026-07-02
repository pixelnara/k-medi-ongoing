/**
 * lang-nav.js (KO standalone)
 * 언어 선택 시 대응하는 언어 버전 페이지로 이동합니다.
 *
 * 폴더 구조:
 *   k-medi-web-ko/pagename.html  ← 국문
 *   k-medi-web-en/pagename.html  ← 영문
 */
(function () {
  const LANG_ROOT = {
    EN: "../k-medi-web-en/",
  };

  /** 현재 파일명 반환 */
  function getCurrentFilename() {
    const raw = location.pathname.split("/").pop();
    return raw && raw.endsWith(".html") ? raw : "index.html";
  }

  /** 언어 코드에 맞는 URL 반환 */
  function getLangUrl(langCode) {
    const root = LANG_ROOT[langCode];
    if (!root) return null;
    return root + getCurrentFilename();
  }

  /** 현재 페이지의 언어 코드 반환 */
  function getCurrentLang() {
    const lang = document.documentElement.lang || "ko";
    if (lang.startsWith("ko")) return "KR";
    if (lang.startsWith("zh")) return "CN";
    if (lang.startsWith("ja")) return "JP";
    if (lang.startsWith("vi")) return "VN";
    return "EN";
  }

  /** 모든 언어 선택 UI의 active 상태를 현재 언어로 동기화 */
  function syncActiveLang() {
    const cur = getCurrentLang();
    document.querySelectorAll(".lang-option").forEach((el) => {
      el.classList.toggle("is-active", el.textContent.trim() === cur);
    });
    document.querySelectorAll(".gnb-lang-tab").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.lang === cur);
    });
    document.querySelectorAll(".lang-sheet__opt").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.lang === cur);
    });
  }

  /** 언어 선택 이벤트 — 해당 언어 페이지로 이동 */
  function handleLangChange(langCode) {
    if (langCode === getCurrentLang()) return;
    const url = getLangUrl(langCode);
    if (url) location.href = url;
  }

  // ── Desktop dropdown (.lang-option) ──────────────────────────────
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const code = opt.textContent.trim();
      if (code) handleLangChange(code);
    });
  });

  // ── GNB overlay tabs (.gnb-lang-tab) ─────────────────────────────
  document.querySelectorAll(".gnb-lang-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.lang;
      if (code) handleLangChange(code);
    });
  });

  // ── Mobile bottom sheet (.lang-sheet__opt) ────────────────────────
  document.querySelectorAll(".lang-sheet__opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.lang;
      if (code) handleLangChange(code);
    });
  });

  // ── 초기 active 상태 동기화 ──────────────────────────────────────
  syncActiveLang();
})();
