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
const cartTotal = () => getCart().reduce((n,l) => { const p = byId(l.id); return p ? n + p.price * l.qty : n; }, 0);
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
  const badge = p.badge ? `<span class="badge ${p.was ? "save" : ""}">${p.badge}</span>` : "";
  return `<div class="pcard-wrap">
    <a class="pcard" href="product.html?id=${p.id}">
      ${badge}
      <div class="art">${productImg(p, 0)}</div>
      <div class="body">
        <h3>${p.name}</h3>
        <p class="blurb">${p.blurb}</p>
        <span class="price">${money(p.price)}${p.was ? `<s>${money(p.was)}</s>` : ""}</span>
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
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".links a").forEach(a => {
    if(a.getAttribute("href") === here) a.classList.add("active");
  });
  const y = document.querySelector("[data-year]");
  if(y) y.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", initChrome);
