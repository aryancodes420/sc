/* Catwalk Club — Shopify theme scripts. Cart, checkout and variants are Shopify's; this
   file carries the wishlist, the gallery, the cart progress bar, per-variant size notes,
   and an illustrated fallback for any product without a photograph. */

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

function toast(msg){

  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
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


/* --------------------------------------------------- illustrated fallbacks --- */
/* Only used when a product has no photograph. Every launch product has six. */
const MOTIFS = ["bowtie","bandana","mane","cape","bat","pumpkin","santa"];
function hydrateArt(root){
  (root || document).querySelectorAll("[data-cat-art]:not([data-art-done])").forEach(el => {
    const key = el.getAttribute("data-cat-art") || "cat";
    let motif = (el.getAttribute("data-art-motif") || "").trim();
    if(!motif || MOTIFS.indexOf(motif) < 0) motif = MOTIFS[hash(key) % MOTIFS.length];
    el.innerHTML = catArt(motif, key); el.setAttribute("data-art-done", "true");
  });
}
/* ------------------------------------------------------------ cart progress --- */
function paintCartProgress(){
  document.querySelectorAll("[data-cart-progress]").forEach(el => {
    const total = parseFloat(el.getAttribute("data-total") || "0"), target = parseFloat(el.getAttribute("data-target") || "0");
    if(!(target > 0)) return;
    const bar = el.querySelector("i"), msg = el.querySelector("[data-msg]");
    if(bar) bar.style.width = Math.min(100, total / target * 100).toFixed(0) + "%";
    if(msg){ const left = Math.max(0, target - total); msg.textContent = left > 0 ? "Spend £" + left.toFixed(2) + " more for free UK delivery" : "✅ You've got free UK delivery"; }
  });
}
/* ------------------------------------------------------------------ gallery --- */
function wireGallery(root){
  const main = root.querySelector("[data-gallery-main]"), thumbs = root.querySelector("[data-gallery-thumbs]");
  if(!main || !thumbs) return;
  thumbs.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    const img = b.getAttribute("data-full");
    if(img) main.innerHTML = '<img src="' + img + '" alt="' + (b.getAttribute("data-alt") || "") + '" width="1000" height="1000">';
    thumbs.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
}
/* ------------------------------------------------------------- variant note --- */
/* Shows the size note for the selected variant, from the custom.size_notes metafield
   (one line per variant, in variant order). */
function wireVariantNotes(form){
  const notes = (form.getAttribute("data-size-notes") || "").split("\n").map(s => s.trim()).filter(Boolean);
  const out = form.querySelector("[data-size-note]"); if(!out || !notes.length) return;
  const paint = () => { const i = [...form.querySelectorAll(".szbtn")].findIndex(b => b.getAttribute("aria-pressed") === "true"); out.textContent = notes[i] || ""; };
  form.addEventListener("click", e => { if(e.target.closest(".szbtn")) setTimeout(paint, 0); });
  paint();
}
/* ------------------------------------------------------------------- boot --- */
function init(){
  hydrateArt(); paintWish(); paintCartProgress();
  document.querySelectorAll("[data-gallery]").forEach(wireGallery);
  document.querySelectorAll("[data-size-notes]").forEach(wireVariantNotes);
  document.addEventListener("click", e => {
    const w = e.target.closest("[data-wish]");
    if(w){ e.preventDefault(); toast(toggleWish(w.dataset.wish) ? "Saved to wishlist" : "Removed from wishlist"); }
  });
}
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("shopify:section:load", e => { hydrateArt(e.target); paintWish(); paintCartProgress(); e.target.querySelectorAll("[data-gallery]").forEach(wireGallery); e.target.querySelectorAll("[data-size-notes]").forEach(wireVariantNotes); });

/* ================================================================ tier 1 ==== */
/* delivery window: "arrives Tue 22 – Thu 24 Sept", N working days from tomorrow */
function addWorkingDays(from, n){ const d = new Date(from); let k = 0; while(k < n){ d.setDate(d.getDate() + 1); if(d.getDay() !== 0 && d.getDay() !== 6) k++; } return d; }
function paintDeliveryWindows(root){
  const f = d => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  (root || document).querySelectorAll("[data-delivery-window]").forEach(el => {
    const min = parseInt(el.dataset.min, 10) || 2, max = parseInt(el.dataset.max, 10) || 4, now = new Date();
    const win = f(addWorkingDays(now, min)) + " – " + f(addWorkingDays(now, max));
    el.textContent = el.closest(".objections") ? "Order today: arrives " + win + ". Free over £" + (el.dataset.free || "30") + "." : win;
  });
}
/* sticky add-to-cart: appears once the buy box has scrolled off the top */
function wireStickyATC(root){
  const bar = (root || document).querySelector("[data-sticky-atc]"), form = document.getElementById("product-form");
  if(!bar || !form || !("IntersectionObserver" in window)) return;
  bar.querySelector("[data-s-add]").addEventListener("click", () => { form.requestSubmit ? form.requestSubmit() : form.submit(); });
  const cur = form.querySelector('.szbtn[aria-pressed="true"]'), ss = bar.querySelector("[data-s-size]");
  if(cur && ss) ss.textContent = "Size " + cur.textContent.trim();
  new IntersectionObserver(es => {
    const past = es.some(e => !e.isIntersecting && e.boundingClientRect.top < 0);
    bar.hidden = !past; document.body.classList.toggle("has-sticky", past);
  }, { threshold: 0 }).observe(form);
}
/* first-order offer: tab + one-time pop-up; the form itself is Shopify's */
function wireOffer(){
  const tab = document.querySelector("[data-offer-tab]"), modal = document.querySelector("[data-offer-modal]"); if(!tab || !modal) return;
  const KEY = "catwalk.offer.v1"; let st = {}; try{ st = JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){}
  const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){} };
  const open = () => { modal.hidden = false; st.seen = true; save(); const i = modal.querySelector("input[type=email]"); if(i) setTimeout(() => i.focus(), 50); };
  const close = () => { modal.hidden = true; };
  tab.addEventListener("click", open);
  modal.querySelector("[data-offer-close]").addEventListener("click", close);
  modal.addEventListener("click", e => { if(e.target === modal) close(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") close(); });
  const posted = /customer_posted=true/.test(location.search);
  if(posted){ st.claimed = true; save(); open(); return; }
  if(st.claimed) return;
  const quiet = /\/products\/|\/cart/.test(location.pathname);
  if(!st.seen && !quiet) setTimeout(open, parseInt(modal.dataset.delay, 10) || 7000);
}
/* chat panel toggle */
function wireChat(){
  const fab = document.querySelector("[data-chat]"); if(!fab) return;
  const b = fab.querySelector(".chat-btn"), pnl = fab.querySelector(".chat-panel");
  b.addEventListener("click", () => { pnl.hidden = !pnl.hidden; b.setAttribute("aria-expanded", String(!pnl.hidden)); });
}
document.addEventListener("DOMContentLoaded", () => { paintDeliveryWindows(); wireStickyATC(); wireOffer(); wireChat(); });
document.addEventListener("shopify:section:load", e => { paintDeliveryWindows(e.target); wireStickyATC(e.target); });
