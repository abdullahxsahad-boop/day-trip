/* ============================================
   YALA DAY TRIP — Main Module
   Scroll reveals, back-to-top, initialization
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Reveal (Intersection Observer) ---
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  // --- Back to Top ---
  var backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 500) {
          backToTop.classList.add('back-to-top--visible');
        } else {
          backToTop.classList.remove('back-to-top--visible');
        }
      },
      { passive: true }
    );

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Lazy load images with native support check ---
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading, nothing to do
  } else {
    // Fallback: use IntersectionObserver for lazy loading
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          lazyObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      lazyObserver.observe(img);
    });
  }

  // --- Prevent focus outline on mouse click, show on keyboard ---
  document.body.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });

  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });

  // --- Console greeting ---
  console.log(
    '%c🌿 YALA DAY TRIP %c Discover Yala, One Journey at a Time',
    'background: #1B4332; color: #95D5B2; padding: 8px 12px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #2D6A4F; color: #FEFAE0; padding: 8px 12px; border-radius: 0 4px 4px 0;'
  );
})();
