/* The Dog Nook — PDP gallery.

   Kept in its own asset so the large dog-nook.js never needs redeploying
   (HANDOFF §3 deploy-size trap).

   Why this exists: the main PDP image is rendered with a `srcset`, so setting
   `src` alone does nothing — the browser keeps honouring the srcset candidate.
   The previous inline onclick set only `src`, so clicking a thumbnail appeared
   to do nothing at all. Both attributes have to be replaced together. */
(function () {
  'use strict';

  function initGallery(root) {
    (root || document).querySelectorAll('[data-tdn-gallery]').forEach(function (gal) {
      if (gal.dataset.tdnGalBound) return;
      gal.dataset.tdnGalBound = '1';

      var scope = gal.closest('[data-tdn-product]') || document;
      var main = scope.querySelector('#tdn-pdp-main');
      var counter = scope.querySelector('[data-tdn-counter]');
      var thumbs = gal.querySelectorAll('[data-tdn-thumb]');

      thumbs.forEach(function (t) {
        t.addEventListener('click', function () {
          if (main) {
            var ss = t.getAttribute('data-srcset');
            if (ss) { main.srcset = ss; } else { main.removeAttribute('srcset'); }
            main.src = t.getAttribute('data-full');
          }
          if (counter) counter.textContent = t.getAttribute('data-index') || '';
          thumbs.forEach(function (o) {
            o.classList.remove('is-active');
            o.setAttribute('aria-current', 'false');
          });
          t.classList.add('is-active');
          t.setAttribute('aria-current', 'true');
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () { initGallery(document); });
  document.addEventListener('shopify:section:load', function (e) { initGallery(e.target); });
  window.TDNGallery = { init: initGallery };
})();
