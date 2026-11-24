/* ============================================
   YALA DAY TRIP — Gallery / Lightbox Module
   ============================================ */

(function () {
  'use strict';

  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox__image');
  var lightboxClose = document.querySelector('.lightbox__close');
  var lightboxPrev = document.querySelector('.lightbox__nav--prev');
  var lightboxNext = document.querySelector('.lightbox__nav--next');
  var lightboxCounter = document.querySelector('.lightbox__counter');
  var lightboxCaption = document.querySelector('.lightbox__caption');
  var galleryItems = document.querySelectorAll('.gallery__item');

  if (!lightbox || galleryItems.length === 0) return;

  var images = [];
  var currentIndex = 0;

  // Collect all gallery images with caption support
  galleryItems.forEach(function (item, index) {
    var img = item.querySelector('img');
    var captionEl = item.querySelector('.gallery__item-caption');
    if (img) {
      images.push({
        src: img.src,
        alt: img.alt || '',
        caption: captionEl ? captionEl.textContent.trim() : (img.alt || '')
      });

      item.addEventListener('click', function () {
        openLightbox(index);
      });

      // Keyboard support for gallery items
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', 'ดูรูปภาพ: ' + (img.alt || 'รูปที่ ' + (index + 1)));

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    }
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    // Return focus to the gallery item
    if (galleryItems[currentIndex]) {
      galleryItems[currentIndex].focus();
    }
  }

  function updateLightbox() {
    if (!images[currentIndex]) return;

    if (lightboxImg) {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = images[currentIndex].caption || '';
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  // Event listeners
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }

  // Close on background click (excluding controls and image)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation & modal focus trapping
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('lightbox--open')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'Tab':
        // Trap focus inside lightbox modal
        var focusables = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);
        if (focusables.length === 0) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
        break;
    }
  });

  // Touch swipe support for mobile
  var touchStartX = 0;
  var touchEndX = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }, { passive: true });
})();
