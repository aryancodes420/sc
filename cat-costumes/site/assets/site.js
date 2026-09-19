/* Catwalk Club — storefront logic.
   Product photography is the supplier's own listing imagery (assets/img). The SVG
   illustration below is kept only as a fallback if an image fails to load. */

/* ------------------------------------------------------------------ art --- */
const PALETTES = [
  { bg:"#FFE3EA", fur:"#F6A9BC", ear:"#FFD2DD" },
  { bg:"#E4F5F0", fur:"#F4A261", ear:"#FFD2A8" },
  { bg:"#EDE7FF", fur:"#9C93B8", ear:"#D9D3EA" },
  { bg:"#FFF3D6", fur:"#6B6580", ear:"#9C93B8" }
];
function hash(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0; return Math.abs(h); }
function catArt(motif, key){
  const p = PALETTES[hash(key||motif) % PALETTES.length];
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder illustration">
    <rect width="300" height="300" fill="${p.bg}"/>
    <path d="M92 118 L86 66 L131 96 Z" fill="${p.fur}"/><path d="M208 118 L214 66 L169 96 Z" fill="${p.fur}"/>
    <ellipse cx="150" cy="163" rx="74" ry="66" fill="${p.fur}"/>
    <ellipse cx="124" cy="158" rx="9" ry="11" fill="#3D2B4F"/><ellipse cx="176" cy="158" rx="9" ry="11" fill="#3D2B4F"/>
    <path d="M144 180 h12 l-6 7 z" fill="#E8718E"/>
    <path d="M150 187 q-7 7 -15 3 M150 187 q7 7 15 3" stroke="#3D2B4F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* ---------------------------------------------------------------- images --- */
const IMG = "assets/img/";
function productImg(p, i, cls){
  const file = p.images && p.images[i];
  if(!file) return catArt(p.motif, p.id);
  return `<img class="${cls || ""}" src="${IMG}${file}" alt="${p.name}" width="800" height="800" loading="${i ? "lazy" : "eager"}"
    onerror="this.parentNode.innerHTML=catArt('${p.motif}','${p.id}')">`;
}

/* ----------------------------------------------------------------- misc --- */
const money = n => "£" + n.toFixed(2);

/* ----- launch offer: manual switch (SALE.active); the site never changes a price by itself ----- */
const saleActive = () => SALE.active === true;
const currentPrice = p => p.price;
const savePct = p => (saleActive() && p.list > p.price) ? Math.round((1 - p.price / p.list) * 100) : 0;
const saleEndsText = () => new Date(SALE.ends).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
function priceHTML(p){
  const pct = savePct(p);
  if(!pct) return money(currentPrice(p));
  return '<span class="now">' + money(p.price) + '</span><s>' + money(p.list) + '</s><em class="off">Save ' + pct + '%</em>';
}
const byId  = id => PRODUCTS.find(p => p.id === id);
const catOf = id => CATEGORIES.find(c => c.id === id);

function toast(msg){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----------------------------------------------------------------- cart --- */
const CART_KEY = "catwalk.cart.v2";
function getCart(){
  try{ const v = JSON.parse(localStorage.getItem(CART_KEY)); return Array.isArray(v) ? v : []; }
  catch(e){ return []; }
}
function setCart(c){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(c)); }catch(e){}
  paintCount();
}
/* A line is identified by product + size, so "Lion Mane L" and "Lion Mane M" stay separate. */
function addToCart(id, size, qty){
  const cart = getCart();
  size = size || null; qty = Math.max(1, parseInt(qty, 10) || 1);
  const hit = cart.find(l => l.id === id && (l.size || null) === size);
  if(hit) hit.qty += qty; else cart.push({ id, size, qty });
  setCart(cart);
}
const cartCount = () => getCart().reduce((n,l) => n + l.qty, 0);
const cartTotal = () => getCart().reduce((n,l) => { const p = byId(l.id); return p ? n + currentPrice(p) * l.qty : n; }, 0);
function paintCount(){
  const n = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = n; el.style.display = n ? "inline-block" : "none";
  });
}

/* -------------------------------------------------------------- wishlist --- */
const WISH_KEY = "catwalk.wish.v2";
function getWish(){
  try{ const v = JSON.parse(localStorage.getItem(WISH_KEY)); return Array.isArray(v) ? v : []; }
  catch(e){ return []; }
}
function toggleWish(id){
  const w = getWish(); const i = w.indexOf(id);
  if(i < 0) w.push(id); else w.splice(i, 1);
  try{ localStorage.setItem(WISH_KEY, JSON.stringify(w)); }catch(e){}
  paintWish();
  return i < 0;
}
function paintWish(){
  const w = getWish();
  document.querySelectorAll("[data-wish-count]").forEach(el => {
    el.textContent = w.length; el.style.display = w.length ? "inline-block" : "none";
  });
  document.querySelectorAll("[data-wish]").forEach(b => {
    const on = w.indexOf(b.dataset.wish) >= 0;
    b.setAttribute("aria-pressed", String(on));
    b.textContent = on ? "♥" : "♡";
    b.setAttribute("aria-label", on ? "Remove from wishlist" : "Save to wishlist");
  });
}

/* --------------------------------------------------------------- reviews --- */
/* Empty until real customers leave reviews. Never populate by hand — fake reviews are
   banned under the DMCC Act 2024. Wire to Judge.me or Loox once orders exist. */
const REVIEWS = {};
function reviewsHTML(productId){
  const list = REVIEWS[productId] || [];
  if(!list.length){
    return '<section class="reviews"><h2>Reviews</h2>' +
      '<div class="panel center"><p style="font-size:2rem;margin:0">☆</p>' +
      '<p><b>No reviews yet — be the first.</b></p>' +
      '<p class="muted small" style="max-width:46ch;margin-inline:auto">Reviews appear here once customers leave them.</p></div></section>';
  }
  const avg = (list.reduce((n,r) => n + r.stars, 0) / list.length).toFixed(1);
  return '<section class="reviews"><h2>Reviews</h2><p class="muted">' + avg + ' out of 5 · ' + list.length + ' review' + (list.length>1?"s":"") + '</p>' +
    list.map(r => '<div class="panel" style="margin-bottom:12px"><b>' + "★".repeat(r.stars) + '</b> <b>' + r.name + '</b><p style="margin:.4em 0 0">' + r.text + '</p></div>').join("") + '</section>';
}

/* -------------------------------------------------------------- rendering -- */
function productCard(p){
  const badge = p.badge ? `<span class="badge ${p.cat === "bundle" ? "save" : ""}">${p.badge}</span>` : "";
  return `<div class="pcard-wrap">
    <a class="pcard" href="product.html?id=${p.id}">
      ${badge}
      <div class="art">${productImg(p, 0)}</div>
      <div class="body">
        <h3>${p.name}</h3>
        <p class="blurb">${p.blurb}</p>
        <span class="price ${savePct(p) ? "sale" : ""}">${priceHTML(p)}</span>
      </div>
    </a>
    <button class="wish" type="button" data-wish="${p.id}" aria-pressed="false"
      onclick="event.preventDefault();toast(toggleWish('${p.id}')?'Saved to wishlist':'Removed from wishlist');">&#9825;</button>
  </div>`;
}
const renderGrid = (el, list) => { el.innerHTML = list.map(productCard).join(""); paintWish(); };

/* Six-image gallery: main image plus thumbnails. */
function mountGallery(host, p){
  const imgs = p.images || [];
  host.innerHTML =
    '<div class="main" data-main>' + productImg(p, 0) + '</div>' +
    '<div class="thumbs" data-thumbs>' +
      imgs.map((f, i) => `<button type="button" data-i="${i}" aria-pressed="${i===0}" aria-label="Photo ${i+1}">
        <img src="${IMG}${f}" alt="" width="200" height="200" loading="lazy"></button>`).join("") +
    '</div>';
  host.querySelector("[data-thumbs]").addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    host.querySelector("[data-main]").innerHTML = productImg(p, +b.dataset.i);
    host.querySelectorAll("[data-thumbs] button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
}

/* ----------------------------------------------------------------- chrome -- */
function initChrome(){
  paintCount();
  paintWish();
  initOffer();
  initChat();
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".links a").forEach(a => {
    if(a.getAttribute("href") === here) a.classList.add("active");
  });
  const y = document.querySelector("[data-year]");
  if(y) y.textContent = new Date().getFullYear();
  const tb = document.querySelector(".topbar");
  if(tb) tb.innerHTML = 'Free UK delivery over <b>£' + FREE_SHIPPING_AT + '</b> &nbsp;·&nbsp; ' + countdownHTML();
  mountTicker();
}

/* ----- LED sale ticker: one fixed deadline for every visitor; sits at zero until SALE.active is switched off ----- */
function mountTicker(){
  if(!saleActive() || document.querySelector(".led")) return;
  const el = document.createElement("div"); el.className = "led"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "off");
  const item = '<span class="led-item"><span class="led-label">' + SALE.ticker + '</span><span class="led-time" data-led></span><span class="led-sep">•</span></span>';
  el.innerHTML = '<div class="led-track">' + item.repeat(8) + '</div>';
  const hdr = document.querySelector("header.site"); hdr ? hdr.parentNode.insertBefore(el, hdr) : document.body.prepend(el);
  const pad = n => String(n).padStart(2, "0");
  const tick = () => {
    const ms = Math.max(0, new Date(SALE.ends) - new Date());
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
    const t = pad(d) + "D " + pad(h) + "H " + pad(m) + "M " + pad(sec) + "S";
    el.querySelectorAll("[data-led]").forEach(x => x.textContent = t);
    if(ms > 0) setTimeout(tick, 1000 - (Date.now() % 1000));
  };
  tick();
}
document.addEventListener("DOMContentLoaded", initChrome);

/* ================================================================ tier 1 ==== */
/* Blocks borrowed from the best-performing UK pet stores: objection cards, rating
   line, stock pill, express-checkout row, trust row, "this is for me if", sticky
   add-to-cart, breadcrumbs, cross-sell savings, structured data, first-order offer
   and a chat button. Nothing below invents a number: no review counts, no timers. */

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const abs = rel => new URL(rel, location.href).href;

/* ----- breadcrumbs ----- */
function breadcrumbs(items){
  return '<nav class="crumbs" aria-label="Breadcrumb"><ol>' +
    items.map((it, i) => i === items.length - 1
      ? '<li aria-current="page">' + esc(it.label) + '</li>'
      : '<li><a href="' + it.href + '">' + esc(it.label) + '</a></li>').join("") +
    '</ol></nav>';
}

/* ----- rating line under the title: honest until real reviews exist ----- */
function ratingLine(id){
  const list = REVIEWS[id] || [];
  if(!list.length) return '<a class="rating" href="#reviews"><span class="stars" aria-hidden="true">☆☆☆☆☆</span> No reviews yet — be the first</a>';
  const avg = list.reduce((n,r) => n + r.stars, 0) / list.length;
  return '<a class="rating" href="#reviews"><span class="stars has" aria-hidden="true">' + "★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg)) + '</span> ' +
    avg.toFixed(1) + ' · ' + list.length + ' review' + (list.length > 1 ? "s" : "") + '</a>';
}

/* ----- stock pill ----- */
function stockPill(p){
  const uk = p.id === "bandana" || (p.contains || []).indexOf("bandana") >= 0;
  return '<span class="stockpill"><i></i>In stock' + (uk ? ' · dispatched from UK stock' : ' · ready to ship') + '</span>';
}

/* ----- delivery window: N working days from tomorrow ----- */
function addWorkingDays(from, n){
  const d = new Date(from); let k = 0;
  while(k < n){ d.setDate(d.getDate() + 1); if(d.getDay() !== 0 && d.getDay() !== 6) k++; }
  return d;
}
function deliveryWindow(){
  const f = d => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const now = new Date();
  return f(addWorkingDays(now, DELIVERY.min)) + " – " + f(addWorkingDays(now, DELIVERY.max));
}

/* ----- the three questions every buyer has, answered before they ask ----- */
function objectionCards(p){
  const hasSizes = Array.isArray(p.sizes) && p.sizes.length > 0;
  const fitA = hasSizes ? "Sizes are neck measurements. Two fingers of slack, and if in doubt go up." : p.fit;
  const keep = {
    "bow-tie-collar": "It's a collar — most cats forget it's there.",
    "bandana": "It's a collar — most cats forget it's there.",
    "lion-mane": "Velcro under the chin, nothing over the face. Put it on, get the shot, take it off.",
    "bat-cape": "Sits on the shoulders, nothing over the face. Put it on, get the shot, take it off.",
    "spider-costume": "Fastens under the chest like a harness. Best for cats already used to one.",
    "pumpkin-set": "Chin strap on the hat, ruffle on the collar. A minute or two is all the photo needs.",
    "santa-set": "Velcro on both pieces, nothing over the face. A minute or two is all the photo needs."
  }[p.id] || "Nothing covers the face. Put it on, get the shot, take it off — and 30 days to return it, worn or not.";
  return '<div class="objections">' +
    '<a href="#fit"><b>Will it fit my cat?</b><span>' + esc(fitA) + '</span></a>' +
    '<a href="faq.html"><b>When will it arrive?</b><span>' + (p.noDeliveryDates ? 'Tracked UK delivery. Free over £' + FREE_SHIPPING_AT + '.' : 'Order today: arrives ' + deliveryWindow() + '. Free over £' + FREE_SHIPPING_AT + '.') + '</span></a>' +
    '<a href="faq.html"><b>Will my cat keep it on?</b><span>' + esc(keep) + '</span></a>' +
  '</div>';
}

/* ----- express checkout row (Shopify renders the real buttons via payment_button) ----- */
function expressRow(){
  return '<div class="express" id="paynow" role="group" aria-label="Express checkout">' +
    '<button type="button" class="ex shoppay" data-ex="Shop Pay"><b>shop</b> Pay</button>' +
    '<button type="button" class="ex paypal" data-ex="PayPal"><b>Pay</b><i>Pal</i></button>' +
    '<button type="button" class="ex apple" data-ex="Apple Pay"><span class="applepay">Pay</span></button>' +
    '<button type="button" class="ex gpay" data-ex="Google Pay"><b>G</b> Pay</button>' +
  '</div><p class="small muted center" style="margin:.5em 0 0">Express checkout goes live on Shopify once payments are enabled.</p>';
}
function paymentIcons(){
  return '<ul class="payicons" aria-label="Payment methods accepted">' +
    ["Visa","Mastercard","Amex","Apple Pay","Google Pay","Shop Pay","PayPal"].map(n => '<li>' + n + '</li>').join("") + '</ul>';
}

/* ----- four-icon trust row ----- */
function trustRow(p){
  const uk = p.id === "bandana";
  return '<div class="trust4">' +
    '<div><i>📦</i><b>Free UK delivery</b><span>on orders over £' + FREE_SHIPPING_AT + '</span></div>' +
    '<div><i>↩️</i><b>30-day returns</b><span>worn or not</span></div>' +
    '<div><i>🐱</i><b>Sized for cats</b><span>faces and eyes clear</span></div>' +
    '<div><i>' + (uk ? "🇬🇧" : "🔒") + '</i><b>' + (uk ? "UK stock" : "Secure checkout") + '</b><span>' + (uk ? "dispatched here" : "Shopify Payments") + '</span></div>' +
  '</div>';
}

/* ----- ticks + "this is for me if" ----- */
const tickList = p => '<ul class="ticks">' + (p.ticks || []).map(t => '<li>' + esc(t) + '</li>').join("") + '</ul>';
function forMeIf(p){
  if(!p.forMeIf || !p.forMeIf.length) return "";
  return '<section class="forme"><h2>This is for you if…</h2><ul>' + p.forMeIf.map(t => '<li>' + esc(t) + '</li>').join("") + '</ul></section>';
}

/* bundle saving against buying its pieces separately — true before and after the launch offer */
const bundleSaving = b => (b.contains || []).reduce((n, id) => n + currentPrice(byId(id)), 0) - currentPrice(b);

/* ----- cross-sell: the bundles this product sits in, with the saving spelled out ----- */
function crossSell(p){
  const live = PRODUCTS.filter(x => !x.hold);
  let cards = [];
  if(p.cat === "bundle"){
    cards = (p.contains || []).map(byId).filter(Boolean).map(c => ({ img: c.images[0], title: c.name, line: "Included in this bundle", price: money(currentPrice(c)), href: "product.html?id=" + c.id, save: "" }));
  } else {
    cards = live.filter(b => b.cat === "bundle" && (b.contains || []).indexOf(p.id) >= 0).map(b => {
      const partner = byId((b.contains || []).find(id => id !== p.id));
      return { img: partner ? partner.images[0] : b.images[0], title: b.name, line: "Add the " + (partner ? partner.name : "pair") + " as a bundle",
        price: money(currentPrice(b)), href: "product.html?id=" + b.id, save: "Save " + money(bundleSaving(b)) };
    });
  }
  if(!cards.length) return "";
  return '<section class="xsell"><h2>' + (p.cat === "bundle" ? "What's in it" : "Cheaper together") + '</h2><div class="xgrid">' +
    cards.map(c => '<a class="xcard" href="' + c.href + '"><img src="' + IMG + c.img + '" alt="" width="200" height="200" loading="lazy"><div>' +
      '<b>' + esc(c.title) + '</b><span class="muted small">' + esc(c.line) + '</span><span class="price">' + c.price + (c.save ? ' <em class="save">' + c.save + '</em>' : '') + '</span></div></a>').join("") +
  '</div></section>';
}

/* ----- structured data ----- */
function jsonLd(obj){
  const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(obj); document.head.appendChild(s);
}
const ORG = { "@type": "Organization", "name": "Catwalk Club", "url": abs("index.html"), "email": CONTACT.email, "logo": abs("assets/img/lion-mane-2.webp"),
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "email": CONTACT.email, "areaServed": "GB", "availableLanguage": "en" } };
function orgJsonLd(){ jsonLd(Object.assign({ "@context": "https://schema.org" }, ORG)); }
function productJsonLd(p){
  const offer = (size) => ({
    "@type": "Offer", "price": currentPrice(p).toFixed(2), "priceCurrency": "GBP", "availability": "https://schema.org/InStock",
    "priceValidUntil": saleActive() ? SALE.ends.slice(0, 10) : undefined,
    "url": abs("product.html?id=" + p.id) + (size ? "#" + size.label : ""), "itemCondition": "https://schema.org/NewCondition",
    "shippingDetails": { "@type": "OfferShippingDetails", "shippingRate": { "@type": "MonetaryAmount", "value": DELIVERY.cost.toFixed(2), "currency": "GBP" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "GB" },
      "deliveryTime": { "@type": "ShippingDeliveryTime", "transitTime": { "@type": "QuantitativeValue", "minValue": DELIVERY.min, "maxValue": DELIVERY.max, "unitCode": "DAY" } } },
    "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "GB", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 30, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/FreeReturn" }
  });
  const hasSizes = Array.isArray(p.sizes) && p.sizes.length > 0;
  jsonLd({ "@context": "https://schema.org", "@type": "Product", "name": p.name, "sku": p.id, "description": p.blurb,
    "image": (p.images || []).map(f => abs(IMG + f)), "brand": { "@type": "Brand", "name": "Catwalk Club" },
    "category": catOf(p.cat).label, "audience": { "@type": "PeopleAudience", "suggestedGender": "unisex" },
    "offers": hasSizes ? p.sizes.map(offer) : offer(null) });
  jsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": abs("index.html") },
    { "@type": "ListItem", "position": 2, "name": catOf(p.cat).label, "item": abs("shop.html?cat=" + p.cat) },
    { "@type": "ListItem", "position": 3, "name": p.name } ] });
}

/* ----- sticky add-to-cart: appears once the buy box scrolls out of view ----- */
function stickyATC(p, state){
  const bar = document.createElement("div"); bar.className = "sticky-atc"; bar.hidden = true;
  bar.innerHTML = '<img src="' + IMG + p.images[0] + '" alt="" width="48" height="48"><div class="s-meta"><b>' + esc(p.name) + '</b><span class="small muted" data-s-size></span></div>' +
    '<span class="price">' + money(currentPrice(p)) + '</span><button class="btn btn-sm" type="button" data-s-add>Add to cart</button>';
  document.body.appendChild(bar);
  bar.querySelector("[data-s-add]").onclick = () => document.getElementById("add").click();
  const buy = document.querySelector(".pdp-buy"); if(!buy || !("IntersectionObserver" in window)) return;
  let past = false;
  new IntersectionObserver(es => {
    es.forEach(e => { past = !e.isIntersecting && e.boundingClientRect.top < 0; });
    bar.hidden = !past; document.body.classList.toggle("has-sticky", past);
    const sz = bar.querySelector("[data-s-size]"); if(sz) sz.textContent = state().size ? "Size " + state().size : "";
  }, { threshold: 0 }).observe(buy);
}

/* ----- first-order offer: a tab, and a one-time pop-up. Code is a placeholder until
   the discount exists in Shopify (Discounts → Create → WELCOME10, 10% off, once per customer). ----- */
const OFFER = { code: "WELCOME10", pct: 10, key: "catwalk.offer.v1", delay: 7000 };
function initOffer(){
  if(document.querySelector(".offer-tab")) return;
  let st = {}; try{ st = JSON.parse(localStorage.getItem(OFFER.key)) || {}; }catch(e){}
  const save = () => { try{ localStorage.setItem(OFFER.key, JSON.stringify(st)); }catch(e){} };
  const tab = document.createElement("button"); tab.type = "button"; tab.className = "offer-tab";
  tab.innerHTML = '🎁 <b>' + OFFER.pct + '% off</b> your first order'; document.body.appendChild(tab);
  const modal = document.createElement("div"); modal.className = "modal"; modal.hidden = true;
  modal.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="offer-h">' +
    '<button class="modal-x" type="button" aria-label="Close">×</button>' +
    '<p class="kicker" style="margin:0 0 10px">First order</p><h2 id="offer-h">' + OFFER.pct + '% off, and first pick of the Halloween drop</h2>' +
    '<p class="muted">Pop your email in and we\'ll send a code for ' + OFFER.pct + '% off your first order. One email when new pieces land, and a heads-up before the October cut-off. Nothing else.</p>' +
    '<form data-offer-form><input type="email" required placeholder="you@example.com" aria-label="Email address"><button class="btn btn-mint" type="submit">Send my code</button></form>' +
    '<p class="small muted" style="margin:.8em 0 0">By signing up you agree to receive emails from Catwalk Club. Unsubscribe any time.</p>' +
    '<div class="offer-done" hidden><p style="font-size:1.05rem"><b>Your code:</b></p><p class="code" data-code>' + OFFER.code + '</p><p class="small muted">Use it at checkout. On Shopify the email tool sends this automatically.</p><a class="btn" href="shop.html">Shop all</a></div>' +
  '</div>';
  document.body.appendChild(modal);
  const open = () => { modal.hidden = false; st.seen = true; save(); modal.querySelector("input") && setTimeout(() => modal.querySelector("input").focus(), 50); };
  const close = () => { modal.hidden = true; };
  tab.onclick = open; modal.querySelector(".modal-x").onclick = close;
  modal.addEventListener("click", e => { if(e.target === modal) close(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") close(); });
  modal.querySelector("[data-offer-form]").onsubmit = e => {
    e.preventDefault(); st.claimed = true; save();
    modal.querySelector("[data-offer-form]").hidden = true; modal.querySelector(".offer-done").hidden = false;
    tab.innerHTML = '🎁 Your code: <b>' + OFFER.code + '</b>';
  };
  if(st.claimed) tab.innerHTML = '🎁 Your code: <b>' + OFFER.code + '</b>';
  if(!st.seen && !/product\.html|cart\.html/.test(location.pathname)) setTimeout(open, OFFER.delay);
}

/* ----- chat: WhatsApp when a number exists, otherwise the contact page. Shopify Inbox
   adds its own button once installed — hide this one then. ----- */
function initChat(){
  if(document.querySelector(".chat-fab")) return;
  const wa = CONTACT.whatsapp ? "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent("Hi! Can you help me choose a costume for my cat?") : "";
  const fab = document.createElement("div"); fab.className = "chat-fab";
  fab.innerHTML = '<button type="button" class="chat-btn" aria-expanded="false" aria-controls="chat-panel">💬 Help me choose</button>' +
    '<div class="chat-panel" id="chat-panel" hidden><b>Not sure which one?</b><p class="small muted" style="margin:.3em 0 .8em">Tell us your cat\'s neck size and what the occasion is. We reply ' + CONTACT.reply + '.</p>' +
    (wa ? '<a class="btn btn-mint btn-sm btn-block" href="' + wa + '" target="_blank" rel="noopener">WhatsApp us</a>' : '') +
    '<a class="btn btn-ghost btn-sm btn-block" href="contact.html" style="margin-top:8px">Send a message</a>' +
    '<a class="btn btn-ghost btn-sm btn-block" href="sizing.html" style="margin-top:8px">Size guide</a></div>';
  document.body.appendChild(fab);
  const b = fab.querySelector(".chat-btn"), pnl = fab.querySelector(".chat-panel");
  b.onclick = () => { pnl.hidden = !pnl.hidden; b.setAttribute("aria-expanded", String(!pnl.hidden)); };
}

/* ================================================================ tier 2 ==== */
/* ----- size from a neck measurement, using each product's own size table ----- */
function neckNums(str){ return (String(str).split("cm")[0].match(/\d+(?:\.\d+)?/g) || []).map(Number); }
function sizeFor(p, neck){
  if(!Array.isArray(p.sizes) || !p.sizes.length) return { label: "One size", ok: true, neck: p.fit };
  for(const s of p.sizes){
    const n = neckNums(s.neck); const max = n.length > 1 ? n[1] : n[0];
    if(!max || neck <= max) return { label: s.label, ok: true, neck: s.neck };
  }
  return { label: null, ok: false, neck: "Largest size is " + p.sizes[p.sizes.length - 1].neck };
}

/* ----- genuine Halloween countdown: shown until the date passes ----- */
function daysUntil(iso){ const t = new Date(iso + "T23:59:59"); return Math.ceil((t - new Date()) / 864e5); }
function countdownHTML(){
  const c = daysUntil(HALLOWEEN.cutoff), h = daysUntil(HALLOWEEN.day);
  if(c > 1)  return '🎃 Order by <b>14 October</b> for Halloween — ' + c + ' days left';
  if(c === 1) return '🎃 <b>Last day</b> to order for guaranteed Halloween delivery';
  if(h >= 0)  return '🎃 Halloween orders placed now may arrive after the 31st — collars and Christmas ship as normal';
  return '🎄 Christmas is in — <a href="shop.html?cat=christmas" style="color:#FFD166">shop the Santa set</a>';
}

/* ----- recently viewed (per browser) ----- */
const RECENT_KEY = "catwalk.recent.v1";
function getRecent(){ try{ const v = JSON.parse(localStorage.getItem(RECENT_KEY)); return Array.isArray(v) ? v : []; }catch(e){ return []; } }
function pushRecent(id){
  const r = getRecent().filter(x => x !== id); r.unshift(id);
  try{ localStorage.setItem(RECENT_KEY, JSON.stringify(r.slice(0, 8))); }catch(e){}
}
function mountRecent(host, excludeId){
  const list = getRecent().filter(id => id !== excludeId).map(byId).filter(p => p && !p.hold).slice(0, 4);
  if(!host) return; if(!list.length){ host.hidden = true; return; }
  host.hidden = false;
  host.innerHTML = '<div class="sec-head"><div><h2>Recently viewed</h2></div></div><div class="grid-p"></div>';
  renderGrid(host.querySelector(".grid-p"), list);
}

/* ----- quiz: occasion → what they'll tolerate → neck ----- */
function quizResults(occ, wear, neck){
  const live = PRODUCTS.filter(p => !p.hold && p.cat !== "bundle");
  let list = live.filter(p => (WEAR[p.id] || 3) <= wear);
  if(occ !== "any") list = list.filter(p => p.cat === occ || (occ === "gift" && (p.cat === "christmas" || p.badge === "Bestseller")));
  if(!list.length) list = live.filter(p => (WEAR[p.id] || 3) <= wear);
  return list.map(p => ({ p: p, size: neck ? sizeFor(p, neck) : null })).filter(r => !r.size || r.size.ok);
}
function resultCard(r){
  const p = r.p, s = r.size;
  return '<div class="pcard-wrap"><a class="pcard" href="product.html?id=' + p.id + '"><div class="art">' + productImg(p, 0) + '</div><div class="body"><h3>' + esc(p.name) + '</h3>' +
    (s ? '<p class="blurb"><b>' + (s.label === "One size" ? "One size — adjusts" : "Size " + s.label) + '</b>' + (s.neck && s.label !== "One size" ? ' · neck ' + esc(s.neck) : '') + '</p>' : '<p class="blurb">' + esc(p.blurb) + '</p>') +
    '<span class="price ' + (savePct(p) ? "sale" : "") + '">' + priceHTML(p) + '</span></div></a></div>';
}

/* ----- alias tag under the product title ----- */
const aliasTag = p => p.alias ? '<span class="alias">aka ' + esc(p.alias) + '</span>' : "";

/* ----- UGC wall: honest empty frames until real customer photos exist ----- */
function ugcWall(){
  const shots = DRAW.winners.slice(0, 6);
  const frames = [];
  for(let i = 0; i < 6; i++){
    const w = shots[i];
    frames.push(w ? '<figure class="ugc"><img src="assets/img/' + w.image + '" alt="' + esc(w.name) + '" width="400" height="400" loading="lazy"><figcaption>' + esc(w.name) + ' · ' + esc(w.month) + '</figcaption></figure>'
                  : '<figure class="ugc empty"><span>🐾</span><figcaption>Your cat here</figcaption></figure>');
  }
  return '<div class="ugc-grid">' + frames.join("") + '</div>';
}
