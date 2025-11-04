// Sticky header: hide on scroll down, show on scroll up (with smooth slide)
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastY = window.scrollY || 0;
  const delta = 5; // small threshold to avoid jitter
  const hideAfter = 80; // start hiding after some depth
  let bodyLocked = false;

  function hideHeader() {
    if (bodyLocked) return;
    header.classList.add('header--hidden');
  }

  function showHeader() {
    header.classList.remove('header--hidden');
  }

  function setHeaderOffset() {
    // Reflect current header height for mobile drawer/overlay positioning
    const h = header.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-offset', h + 'px');
  }

  function onScroll() {
    const y = window.scrollY || 0;
    const goingDown = y > lastY + delta;
    const goingUp = y < lastY - delta;

    // Add subtle style when not at top
    header.classList.toggle('header--scrolled', y > 0);

    if (goingDown && y > hideAfter) {
      hideHeader();
    } else if (goingUp) {
      showHeader();
    }

    // Always update lastY so direction detection is responsive
    lastY = y;
  }

  // Init
  setHeaderOffset();
  if ((window.scrollY || 0) <= hideAfter) {
    header.classList.remove('header--hidden');
  }
  header.classList.toggle('header--scrolled', (window.scrollY || 0) > 0);

  // Scroll/resize listeners
  window.addEventListener('resize', () => setHeaderOffset(), { passive: true });
  window.addEventListener('load', () => setHeaderOffset());
  window.addEventListener('scroll', onScroll, { passive: true });

  // Also react to wheel direction (desktop)
  document.addEventListener('wheel', (e) => {
    if (bodyLocked) return;
    const y = window.scrollY || 0;
    if (e.deltaY < -1) {
      showHeader();
    } else if (e.deltaY > 1 && y > hideAfter) {
      hideHeader();
    }
  }, { passive: true });

  // Keyboard navigation should reveal header
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home') {
      showHeader();
    }
  });

  // If mobile menu locks the body (class no-scroll), force header visible and re-measure
  const bodyObserver = new MutationObserver(() => {
    bodyLocked = document.body.classList.contains('no-scroll');
    if (bodyLocked) {
      showHeader();
      // Wait a frame to allow layout to settle, then measure
      requestAnimationFrame(setHeaderOffset);
    }
  });
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
