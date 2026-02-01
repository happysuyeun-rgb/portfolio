/**
 * Custom Cursor - 부드럽게 따라다니는 반투명 원
 * 터치 기기에서는 비활성화
 */
(function () {
  if (window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const ease = 0.12; // 부드러운 추적 (낮을수록 더 유려함)

  const clickables = 'a, button, .card, .cta, .badge, .pillTag, .tile, .btn, .gnb-menu a, .logo, [role="button"]';

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateCursor() {
    cursorX = lerp(cursorX, mouseX, ease);
    cursorY = lerp(cursorY, mouseY, ease);
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(updateCursor);
  }

  let hasMoved = false;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!hasMoved) {
      hasMoved = true;
      cursorX = mouseX;
      cursorY = mouseY;
      cursor.classList.add('is-active');
    }
  });

  document.querySelectorAll(clickables).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
  });

  document.body.classList.add('has-custom-cursor');
  requestAnimationFrame(updateCursor);
})();
