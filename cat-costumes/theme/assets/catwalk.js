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
    el.textContent = (el.closest(".objections") && !el.dataset.plain) ? "Order today: arrives " + win + ". Free over £" + (el.dataset.free || "30") + "." : win;
  });
}
/* sticky add-to-cart: appears once the buy box has scrolled off the top */
function wireStickyATC(root){
  const bar = (root || document).querySelector("[data-sticky-atc]"), form = document.getElementById("product-form");
  if(!bar || !form) return;
  bar.querySelector("[data-s-add]").addEventListener("click", () => { form.requestSubmit ? form.requestSubmit() : form.submit(); });
  const cur = form.querySelector('.szbtn[aria-pressed="true"]'), ss = bar.querySelector("[data-s-size]");
  if(cur && ss) ss.textContent = "Size " + cur.textContent.trim();
  let ticking = false;
  const paint = () => { ticking = false; const past = form.getBoundingClientRect().bottom < 0; if(bar.hidden === !past) return; bar.hidden = !past; document.body.classList.toggle("has-sticky", past); };
  addEventListener("scroll", () => { if(!ticking){ ticking = true; requestAnimationFrame(paint); } }, { passive: true }); paint();
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

/* ================================================================ tier 2 ==== */
/* genuine countdown in the announcement bar — real dates, gone when they pass */
function wireCountdown(){
  const el = document.querySelector("[data-countdown]"); if(!el || !el.dataset.cutoff) return;
  const days = iso => Math.ceil((new Date(iso + "T23:59:59") - new Date()) / 864e5);
  const c = days(el.dataset.cutoff), h = el.dataset.event ? days(el.dataset.event) : c;
  let msg = "";
  if(c > 1) msg = (el.dataset.before || "").replace("{days}", c);
  else if(c === 1) msg = el.dataset.last || "";
  else if(h >= 0) msg = el.dataset.afterCutoff || "";
  else msg = el.dataset.afterEvent || "";
  if(msg) el.innerHTML += " &nbsp;·&nbsp; " + msg;
}
/* recently viewed (per browser): product pages record; the section renders */
const RECENT_KEY = "catwalk.recent.v1";
function getRecent(){ try{ const v = JSON.parse(localStorage.getItem(RECENT_KEY)); return Array.isArray(v) ? v : []; }catch(e){ return []; } }
function recordRecent(){
  const el = document.querySelector("[data-recent-product]"); if(!el) return;
  try{ const p = JSON.parse(el.textContent); const r = getRecent().filter(x => x.handle !== p.handle); r.unshift(p); localStorage.setItem(RECENT_KEY, JSON.stringify(r.slice(0, 8))); }catch(e){}
}
function paintRecent(root){
  (root || document).querySelectorAll("[data-recently-viewed]").forEach(sec => {
    const list = getRecent().filter(p => p.handle !== sec.dataset.exclude).slice(0, 4);
    if(!list.length){ sec.hidden = true; return; }
    sec.hidden = false;
    sec.querySelector("[data-recent-grid]").innerHTML = list.map(p => '<div class="pcard-wrap"><a class="pcard" href="' + p.url + '"><div class="art">' +
      (p.image ? '<img src="' + p.image + '" alt="" width="600" height="600" loading="lazy">' : '<div data-cat-art="' + p.handle + '"></div>') +
      '</div><div class="body"><h3>' + p.title + '</h3><span class="price">' + p.price + '</span></div></a></div>').join("");
    hydrateArt(sec);
  });
}
/* sizing from a neck figure, using variant titles + custom.size_notes (same rule as the product page) */
function neckNums(str){ return (String(str || "").split("cm")[0].match(/\d+(?:\.\d+)?/g) || []).map(Number); }
function sizeFor(sizes, neck){
  if(!sizes || !sizes.length) return { label: "One size", ok: true };
  for(const s of sizes){ const n = neckNums(s.neck); const max = n.length > 1 ? n[1] : n[0]; if(!max || neck <= max) return { label: s.label, ok: true, neck: s.neck }; }
  return { label: null, ok: false };
}
const cardHTML = (p, line) => '<div class="pcard-wrap"><a class="pcard" href="' + p.url + '"><div class="art">' + (p.image ? '<img src="' + p.image + '" alt="" width="600" height="600" loading="lazy">' : '<div data-cat-art="' + p.handle + '"></div>') +
  '</div><div class="body"><h3>' + p.title + '</h3><p class="blurb">' + line + '</p><span class="price">' + p.price + '</span></div></a></div>';
/* the quiz — stepped: occasion → tolerance → neck (or breed) */
function wireQuiz(root){
  (root || document).querySelectorAll("[data-quiz]").forEach(q => {
    if(q.dataset.wired) return; q.dataset.wired = "1";
    let products = []; try{ products = JSON.parse(q.querySelector("[data-quiz-products]").textContent); }catch(e){}
    const st = { occ: null, wear: null, step: 1 };
    const show = n => { st.step = n; q.querySelectorAll(".qstep").forEach(el => el.hidden = +el.dataset.step !== n); q.querySelector("[data-res]").hidden = true; };
    q.addEventListener("change", e => {
      const r = e.target.closest("input[type=radio]"); if(r) st[r.closest("[data-q]").dataset.q] = r.value;
      if(e.target.matches("[data-breed]") && e.target.value) q.querySelector("[data-neck]").value = e.target.value;
    });
    q.addEventListener("click", e => {
      if(e.target.closest("[data-next]")){ if(st.step === 1 && !st.occ) return toast("Pick an occasion"); if(st.step === 2 && !st.wear) return toast("Pick what your cat will wear"); show(st.step + 1); }
      if(e.target.closest("[data-back]")) show(st.step - 1);
      if(e.target.closest("[data-again]")){ st.occ = st.wear = null; q.querySelectorAll("input[type=radio]").forEach(r => r.checked = false); show(1); }
      if(e.target.closest("[data-go]")){
        const neck = parseFloat(q.querySelector("[data-neck]").value) || 0, wear = parseInt(st.wear, 10);
        let list = products.filter(p => parseInt(p.wear, 10) <= wear);
        const byOcc = list.filter(p => (p.occasions || "").split(",").map(s => s.trim()).indexOf(st.occ) >= 0);
        if(byOcc.length) list = byOcc;
        const rs = list.map(p => ({ p, size: neck ? sizeFor(p.sizes, neck) : null })).filter(r => !r.size || r.size.ok);
        q.querySelectorAll(".qstep").forEach(el => el.hidden = true);
        const res = q.querySelector("[data-res]"); res.hidden = false;
        q.querySelector("[data-res-p]").textContent = rs.length ? (neck ? "Sized for a " + neck + "cm neck." : "Add a neck measurement and we'll size each one.") : "";
        q.querySelector("[data-res-grid]").innerHTML = rs.length ? rs.map(r => cardHTML(r.p, r.size ? "<b>" + (r.size.label === "One size" ? "One size — adjusts" : "Size " + r.size.label) + "</b>" + (r.size.neck && r.size.label !== "One size" ? " · " + r.size.neck : "") : "")).join("")
          : '<p class="muted">Nothing suits that combination yet — the collars fit almost every cat.</p>';
        hydrateArt(res); if(!q.classList.contains("quiz-home")) res.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
/* sizes by breed */
function wireBreeds(root){
  const host = (root || document).querySelector("[data-breeds]"); if(!host) return;
  let products = []; try{ products = JSON.parse(host.querySelector("[data-breed-products]").textContent); }catch(e){}
  host.querySelectorAll(".breed").forEach(art => {
    const mid = parseFloat(art.dataset.mid) || 0;
    art.querySelector("[data-recs]").innerHTML = products.map(p => { const s = sizeFor(p.sizes, mid);
      return '<a href="' + p.url + '">' + (p.image ? '<img src="' + p.image + '" alt="" width="40" height="40" loading="lazy">' : '') + '<span><b>' + p.title + '</b><br>' + (s.ok ? (s.label === "One size" ? "One size" : "Size " + s.label) : '<span class="no">Too big for the largest</span>') + '</span></a>'; }).join("");
  });
}
document.addEventListener("DOMContentLoaded", () => { wireCountdown(); recordRecent(); paintRecent(); wireQuiz(); wireBreeds(); });
document.addEventListener("shopify:section:load", e => { paintRecent(e.target); wireQuiz(e.target); wireBreeds(e.target); });

/* ================================================================ launch offer ==== */
/* LED ticker to one fixed deadline. Sits at zero when it passes — nothing is removed or changed
   automatically; switch it off under Theme settings → Launch offer and update the prices. */
function wireTicker(){
  const el = document.querySelector("[data-led-bar]"); if(!el) return;
  const end = new Date(el.dataset.deadline); if(isNaN(end)) return;
  const pad = n => String(n).padStart(2, "0");
  const tick = () => {
    const ms = Math.max(0, end - new Date());
    el.hidden = false;
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    const t = pad(d) + "D " + pad(h) + "H " + pad(m) + "M " + pad(s) + "S";
    el.querySelectorAll("[data-led]").forEach(x => x.textContent = t);
    if(ms > 0) setTimeout(tick, 1000 - (Date.now() % 1000));
  };
  tick();
}
document.addEventListener("DOMContentLoaded", wireTicker);
document.addEventListener("shopify:section:load", wireTicker);

/* mini size finder inside the "Will it fit?" card: picks the variant from a neck measurement */
function wireMiniFinder(root){
  const host = (root || document).querySelector(".objections[data-sizes]"); if(!host) return;
  const m = host.querySelector("[data-mini]"); if(!m) return;
  let sizes = []; try{ sizes = JSON.parse(host.dataset.sizes); }catch(e){}
  const out = host.querySelector("[data-mini-out]"), inp = m.querySelector("input");
  const run = () => {
    const n = parseFloat(inp.value); if(!(n > 0)){ out.textContent = ""; return; }
    const r = sizeFor(sizes, n);
    if(r.ok){ out.innerHTML = "✅ Order <b>size " + r.label + "</b>" + (r.neck ? " (" + r.neck + ")" : "") + " — selected below."; const b = [...document.querySelectorAll(".szbtn")].find(x => x.textContent.trim() === r.label); if(b) b.click(); }
    else out.innerHTML = "⚠️ This one won't fit a " + n + "cm neck — the largest is " + (sizes[sizes.length - 1] || {}).neck + ". Try an adjustable collar, or ask us.";
  };
  m.querySelector("button").addEventListener("click", run); inp.addEventListener("keydown", e => { if(e.key === "Enter") run(); });
}
document.addEventListener("DOMContentLoaded", () => wireMiniFinder());
document.addEventListener("shopify:section:load", e => wireMiniFinder(e.target));

/* review list: show all, star filter */
function wireReviewList(root){
  const host = (root || document).querySelector(".reviews"); if(!host || host.dataset.wired) return; host.dataset.wired = "1";
  const showAll = () => { host.querySelectorAll("[data-rev-hidden]").forEach(el => { el.hidden = false; el.removeAttribute("data-rev-hidden"); }); const m = host.querySelector("[data-rev-more]"); if(m) m.remove(); };
  host.addEventListener("click", e => {
    if(e.target.closest("[data-rev-more]")){ showAll(); return; }
    const f = e.target.closest("[data-rev-filter] .chip"); if(!f) return; showAll();
    host.querySelectorAll("[data-rev-filter] .chip").forEach(c => c.setAttribute("aria-pressed", String(c === f)));
    const want = f.dataset.f;
    host.querySelectorAll("[data-rev-list] [data-stars]").forEach(el => { el.hidden = want !== "all" && el.dataset.stars !== want; });
  });
}
document.addEventListener("DOMContentLoaded", () => wireReviewList());
document.addEventListener("shopify:section:load", e => wireReviewList(e.target));
