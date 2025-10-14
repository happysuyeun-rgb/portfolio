document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.gnb__toggle');
  const drop = document.querySelector('#gnb-dropdown');

  if (!btn || !drop) return;

  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    drop.classList.remove('show');
    drop.setAttribute('aria-hidden','true');
  };
  const open = () => {
    btn.setAttribute('aria-expanded', 'true');
    drop.classList.add('show');
    drop.setAttribute('aria-hidden','false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    drop.classList.contains('show') ? close() : open();
  });

  // 드롭다운 내부 링크 클릭 시 닫기
  drop.addEventListener('click', (e) => {
    if (e.target.matches('a')) close();
  });

  // 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (drop.classList.contains('show') && !drop.contains(e.target) && !btn.contains(e.target)) {
      close();
    }
  });

  // 데스크톱으로 리사이즈되면 강제 닫기(중복 표시 방지)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) close();
  });
});
