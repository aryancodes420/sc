/* ============================================================
   The Dog Nook — shared behaviour
   Accordions, colour swatches, cookie banner, free-ship bar.
   Loaded once via {% render 'dog-nook-head' %}.
   All behaviour is progressive: sections work without JS,
   this just adds the interactions from the design.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Accordions (FAQ, PDP questions, collection "good to know") ---------- */
  function initAccordions(root) {
    (root || document).querySelectorAll('.tdn-accordion').forEach(function (acc) {
      if (acc.dataset.tdnBound) return;
      acc.dataset.tdnBound = '1';
      var q = acc.querySelector('.tdn-accordion__q');
      var sign = acc.querySelector('.tdn-accordion__sign');
      if (!q) return;
      q.setAttribute('aria-expanded', acc.classList.contains('is-open') ? 'true' : 'false');
      q.addEventListener('click', function () {
        var open = acc.classList.toggle('is-open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (sign) sign.textContent = open ? '−' : '+'; /* − / + */
      });
    });
  }

  /* ---------- Colour / variant swatches (PDP) ---------- */
  function initSwatches(root) {
    (root || document).querySelectorAll('[data-tdn-swatches]').forEach(function (group) {
      if (group.dataset.tdnBound) return;
      group.dataset.tdnBound = '1';
      var swatches = group.querySelectorAll('[data-tdn-swatch]');
      var scope = group.closest('[data-tdn-product]') || document;
      swatches.forEach(function (sw) {
        sw.addEventListener('click', function () {
          swatches.forEach(function (s) { s.classList.remove('is-selected'); s.setAttribute('aria-checked', 'false'); });
          sw.classList.add('is-selected');
          sw.setAttribute('aria-checked', 'true');
          var vid = sw.getAttribute('data-variant-id');
          scope.querySelectorAll('input[name="id"]').forEach(function (input) { if (vid) input.value = vid; });
          var label = scope.querySelector('[data-tdn-swatch-label]');
          if (label) label.textContent = sw.getAttribute('data-variant-name') || '';
          var priceStr = sw.getAttribute('data-variant-price');
          if (priceStr) scope.querySelectorAll('[data-tdn-price]').forEach(function (el) { el.textContent = priceStr; });
          var soldOut = sw.getAttribute('data-variant-available') === 'false';
          scope.querySelectorAll('[data-tdn-atc]').forEach(function (btn) {
            btn.disabled = soldOut;
            btn.textContent = soldOut ? (btn.getAttribute('data-soldout-label') || 'Sold out') : (btn.getAttribute('data-add-label') || 'Add to Cart');
          });
        });
      });
    });
  }

  /* ---------- Cookie consent banner ----------
     The visitor's choice is now propagated to Shopify's Customer Privacy API,
     which is the supported mechanism for gating non-essential (marketing /
     analytics) pixels on Shopify. Declining actually withholds consent instead
     of only hiding the banner. Essential cookies are unaffected. */
  var CONSENT_KEY = 'tdn_consent';

  function applyConsent(choice) {
    var granted = choice === 'all';
    var consent = {
      marketing: granted,
      analytics: granted,
      preferences: granted,
      sale_of_data: granted
    };
    function set() {
      try { window.Shopify.customerPrivacy.setTrackingConsent(consent, function () {}); } catch (e) {}
    }
    if (window.Shopify && window.Shopify.customerPrivacy && window.Shopify.customerPrivacy.setTrackingConsent) {
      set();
    } else if (window.Shopify && window.Shopify.loadFeatures) {
      window.Shopify.loadFeatures([{ name: 'consent-tracking-api', version: '0.1' }], function (err) {
        if (!err) set();
      });
    }
  }

  function initCookie() {
    var banner = document.querySelector('[data-tdn-cookie]');
    var stored;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    /* Re-apply a returning visitor's previous choice on every load. */
    if (stored) { applyConsent(stored); }
    if (!banner) return;
    if (!stored) {
      banner.hidden = false;
      /* Move focus into the consent dialog so keyboard / screen-reader users
         are taken to it and it's announced (a11y — the banner is role=dialog). */
      try { banner.focus(); } catch (e) {}
    }
    banner.querySelectorAll('[data-tdn-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.getAttribute('data-tdn-cookie-action');
        try { localStorage.setItem(CONSENT_KEY, choice); } catch (e) {}
        applyConsent(choice);
        banner.hidden = true;
      });
    });
  }

  /* ---------- Sticky ATC quantity sync (mobile PDP) ----------
     The mobile sticky Add-to-Cart is a separate <form> from the main buy form,
     so mirror the chosen quantity into it whenever #tdn-qty changes — otherwise
     the sticky bar always adds 1 regardless of what the shopper selected. */
  function initStickyQty(root) {
    var qty = (root || document).querySelector('#tdn-qty');
    if (!qty || qty.dataset.tdnQtyBound) return;
    qty.dataset.tdnQtyBound = '1';
    function sync() {
      var v = parseInt(qty.value, 10);
      if (!(v > 0)) v = 1;
      document.querySelectorAll('[data-tdn-sticky-qty]').forEach(function (el) { el.value = v; });
    }
    qty.addEventListener('change', sync);
    qty.addEventListener('input', sync);
    sync();
  }

  /* ---------- Scroll reveal (subtle, flash-free, opt-out on reduced-motion) ----------
     Only below-the-fold blocks are hidden + animated in; anything already in
     view stays visible, so there's never a flash of hidden content. */
  function initReveal(root) {
    var scope = root || document;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('tdn-js');
    var sel = '.tdn-section > .tdn-wrap > .tdn-h2, .tdn-product-card, .tdn-card, .tdn-trust__cell, .tdn-coll-card, .tdn-cindex, .tdn-bundle, .tdn-reviewcard, .tdn-review, [data-tdn-reveal]';
    var targets = scope.querySelectorAll(sel);
    if (!targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    var vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach(function (el) {
      if (el.dataset.tdnRevealBound) return;
      el.dataset.tdnRevealBound = '1';
      /* Already visible on load → leave it alone (no hide, no flash). */
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      el.classList.add('tdn-reveal');
      io.observe(el);
    });
  }

  function initAll(root) {
    initAccordions(root);
    initSwatches(root);
    initReveal(root);
    initStickyQty(root);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAll(document);
    initCookie();
  });

  /* Re-init inside the theme editor when a section is re-rendered */
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });

  window.TDN = { initAccordions: initAccordions, initSwatches: initSwatches };
})();
