/* ============================================
   YALA DAY TRIP — FAQ Accordion Module
   ============================================ */

(function () {
  'use strict';

  var faqItems = document.querySelectorAll('.faq__item');

  if (faqItems.length === 0) return;

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    if (!question || !answer) return;

    // Set initial ARIA attributes
    var answerId = 'faq-answer-' + Math.random().toString(36).substring(2, 9);
    answer.id = answerId;
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', answerId);

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');

      // Close all other items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('faq__item--open');
          var otherQuestion = otherItem.querySelector('.faq__question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('faq__item--open');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('faq__item--open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
