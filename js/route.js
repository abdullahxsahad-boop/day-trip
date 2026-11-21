/* ============================================
   YALA DAY TRIP — Travel Route Module
   ============================================ */

(function () {
  'use strict';

  var routeItems = document.querySelectorAll('.route__item');

  if (routeItems.length === 0) return;

  // Set first item as active by default
  if (routeItems[0]) {
    routeItems[0].classList.add('route__item--active');
  }

  routeItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      // Allow links inside the item to navigate normally
      if (e.target.closest('a')) {
        return;
      }

      // Remove active from all
      routeItems.forEach(function (r) {
        r.classList.remove('route__item--active');
      });
      // Add active to clicked
      item.classList.add('route__item--active');
    });

    // Keyboard support
    item.setAttribute('tabindex', '0');

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!e.target.closest('a')) {
          e.preventDefault();
          item.click();
        }
      }
    });
  });

  // Scroll-based activation using IntersectionObserver
  if ('IntersectionObserver' in window) {
    var routeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            routeItems.forEach(function (r) {
              r.classList.remove('route__item--active');
            });
            entry.target.classList.add('route__item--active');
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    routeItems.forEach(function (item) {
      routeObserver.observe(item);
    });
  }
})();
