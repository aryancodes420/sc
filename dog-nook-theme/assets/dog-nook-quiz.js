/* The Dog Nook — calm-kit quiz behaviour.
   Progressive: if JS fails the section still renders step 1 and every answer is
   a real link target, so nothing is lost. */
(function () {
  'use strict';

  function initQuiz(root) {
    (root || document).querySelectorAll('[data-tdn-quiz]').forEach(function (q) {
      if (q.dataset.tdnBound) return;
      q.dataset.tdnBound = '1';

      var steps = q.querySelectorAll('[data-tdn-step]');
      var bar = q.querySelector('[data-tdn-quiz-bar]');
      var state = { step: 1, rec: null, size: '' };
      var TOTAL = 4;

      function show(n) {
        state.step = n;
        steps.forEach(function (s) {
          s.classList.toggle('is-active', s.getAttribute('data-tdn-step') === String(n));
        });
        if (bar) bar.style.width = Math.round((n / TOTAL) * 100) + '%';
        /* Keep the question in view without yanking the whole page on step 1. */
        if (n > 1) {
          var top = q.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }

      function paintResult() {
        if (!state.rec) return;
        var r = state.rec;
        var set = function (sel, val, attr) {
          var el = q.querySelector(sel);
          if (!el) return;
          if (attr) { el.setAttribute(attr, val); } else { el.textContent = val; }
        };
        set('[data-tdn-rec-title]', r.title);
        set('[data-tdn-rec-price]', r.price);
        var why = r.why || '';
        if (state.size) {
          why += why ? ' ' : '';
          why += 'Sized for ' + state.size + '.';
        }
        set('[data-tdn-rec-why]', why);
        set('[data-tdn-rec-link]', r.url || '#', 'href');
        var img = q.querySelector('[data-tdn-rec-img]');
        if (img) {
          if (r.img) { img.src = r.img; img.alt = r.title; img.hidden = false; }
          else { img.hidden = true; }
        }
      }

      q.querySelectorAll('[data-tdn-answer]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.rec = {
            url: btn.getAttribute('data-rec-url'),
            title: btn.getAttribute('data-rec-title'),
            price: btn.getAttribute('data-rec-price'),
            img: btn.getAttribute('data-rec-img'),
            why: btn.getAttribute('data-rec-why')
          };
          show(2);
        });
      });

      q.querySelectorAll('[data-tdn-size]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          state.size = btn.getAttribute('data-tdn-size') || '';
          show(3);
        });
      });

      var skip = q.querySelector('[data-tdn-skip]');
      if (skip) skip.addEventListener('click', function () { paintResult(); show(4); });

      /* Show the result immediately on submit — the form posts in the
         background, so the visitor never waits on a page reload to see it. */
      var form = q.querySelector('[data-tdn-quiz-form]');
      if (form) {
        form.addEventListener('submit', function (e) {
          var email = form.querySelector('input[type=email]');
          if (!email || !email.value) return;
          e.preventDefault();
          try {
            fetch(form.action, { method: 'POST', body: new FormData(form), mode: 'no-cors' });
          } catch (err) { /* non-fatal: result still shows */ }
          paintResult();
          show(4);
        });
      }

      q.querySelectorAll('[data-tdn-back]').forEach(function (b) {
        b.addEventListener('click', function () { show(Math.max(1, state.step - 1)); });
      });

      var restart = q.querySelector('[data-tdn-restart]');
      if (restart) restart.addEventListener('click', function () {
        state.rec = null; state.size = ''; show(1);
      });

      show(1);
    });
  }

  document.addEventListener('DOMContentLoaded', function () { initQuiz(document); });
  document.addEventListener('shopify:section:load', function (e) { initQuiz(e.target); });
  window.TDNQuiz = { init: initQuiz };
})();
