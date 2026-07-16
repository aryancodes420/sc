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
    if (!stored) { banner.hidden = false; }
    banner.querySelectorAll('[data-tdn-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.getAttribute('data-tdn-cookie-action');
        try { localStorage.setItem(CONSENT_KEY, choice); } catch (e) {}
        applyConsent(choice);
        banner.hidden = true;
      });
    });
  }

  /* ---------- Free-shipping progress bar (reads Shopify cart) ---------- */
  function renderFreeShip(el, cartTotalCents) {
    var threshold = parseInt(el.getAttribute('data-threshold-cents'), 10) || 3500;
    var symbol = el.getAttribute('data-currency-symbol') || '£';
    var msgEl = el.querySelector('[data-tdn-freeship-msg]');
    var fill = el.querySelector('.tdn-freeship__fill');
    var pct = Math.min(100, (cartTotalCents / threshold) * 100);
    if (fill) fill.style.width = pct.toFixed(0) + '%';
    if (msgEl) {
      if (cartTotalCents >= threshold) {
        msgEl.textContent = '🎉 You’ve unlocked free UK delivery!';
      } else if (cartTotalCents > 0) {
        var remain = (threshold - cartTotalCents) / 100;
        msgEl.textContent = 'You’re ' + symbol + remain.toFixed(2) + ' away from free delivery';
      } else {
        msgEl.textContent = 'Free UK delivery over ' + symbol + (threshold / 100).toFixed(0);
      }
    }
  }

  function initFreeShip() {
    var bars = document.querySelectorAll('[data-tdn-freeship]');
    if (!bars.length) return;
    fetch('/cart.js', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        bars.forEach(function (el) { renderFreeShip(el, cart.total_price); });
      })
      .catch(function () {});
  }

  function initAll(root) {
    initAccordions(root);
    initSwatches(root);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAll(document);
    initCookie();
    initFreeShip();
  });

  /* Re-init inside the theme editor when a section is re-rendered */
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });

  window.TDN = { initAccordions: initAccordions, initSwatches: initSwatches };
})();
