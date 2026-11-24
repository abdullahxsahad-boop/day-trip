/* ============================================
   YALA DAY TRIP — Navigation Module
   ============================================ */

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  const overlay = document.querySelector('.navbar__overlay');
  const navLinks = document.querySelectorAll('.navbar__link');
  const sections = document.querySelectorAll('header[id], section[id]');

  if (!navbar) return;

  // --- Mobile Menu Toggle ---
  function openMenu() {
    if (!toggle || !links) return;
    toggle.classList.add('navbar__toggle--open');
    links.classList.add('navbar__links--open');
    if (overlay) overlay.classList.add('navbar__overlay--visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!toggle || !links) return;
    toggle.classList.remove('navbar__toggle--open');
    links.classList.remove('navbar__links--open');
    if (overlay) overlay.classList.remove('navbar__overlay--visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.contains('navbar__links--open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Auto-close menu on desktop resize to prevent stuck overflow: hidden
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && links && links.classList.contains('navbar__links--open')) {
      closeMenu();
    }
  }, { passive: true });

  window.addEventListener('orientationchange', closeMenu, { passive: true });

  // Close menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // --- Sticky Navbar ---
  var lastScroll = 0;

  function handleScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.remove('navbar--transparent');
      navbar.classList.add('navbar--solid');
    } else {
      navbar.classList.add('navbar--transparent');
      navbar.classList.remove('navbar--solid');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Active Section Highlighting ---
  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('navbar__link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('navbar__link--active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();
