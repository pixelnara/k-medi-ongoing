/* procedure-detail.js — 시술 상세 페이지 인터랙션
   처리: 시술 부위 탭 전환
   아코디언(시술 과정)은 app.js의 공통 acc 로직이 처리함 */
(function () {
  'use strict';

  /* ─── Treatment Areas 탭 전환 ─── */
  var areaTabs      = document.querySelectorAll('.pd-areas__tabs .chip');
  var areaPanels    = document.querySelectorAll('.pd-area-panel');
  var areaCurrentName = document.getElementById('areaCurrentName');

  areaTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var idx = tab.dataset.area;
      areaTabs.forEach(function (t) { t.classList.remove('is-active'); });
      areaPanels.forEach(function (p) { p.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var panel = document.querySelector('.pd-area-panel[data-area="' + idx + '"]');
      if (panel) panel.classList.add('is-active');
      if (areaCurrentName) areaCurrentName.textContent = tab.textContent.trim();
    });
  });

})();
