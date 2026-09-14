/* Catwalk Club — Shopify theme scripts.
   Cart, checkout and inventory are Shopify's; this file carries the parts of the
   storefront Shopify does not provide: the size finder, the cm/inch toggle, the
   wishlist, and illustrated fallback artwork for products with no photograph yet. */

/* Four measurements in cm and inches. Competitors publish neck/chest/waist/back in both
   units; anything less pushes the sizing guesswork back onto the customer. */
const SIZE_CHART = [
  { size: "XS", neck: [18,22], chest: [28,33], waist: [26,31], back: 20, who: "Kittens, small adults (2–3kg)",  min: 28, max: 33 },
  { size: "S",  neck: [22,26], chest: [33,38], waist: [31,36], back: 25, who: "Average adult (3–4kg)",          min: 33, max: 38 },
  { size: "M",  neck: [26,30], chest: [38,43], waist: [36,41], back: 30, who: "Large adult (4–5.5kg)",          min: 38, max: 43 },
  { size: "L",  neck: [30,34], chest: [43,50], waist: [41,48], back: 35, who: "Maine Coon, Ragdoll (5.5–7kg)",  min: 43, max: 50 }
];

/* Breed shortcuts — a faster path than finding a tape measure. Ranges are typical
   adult chest girth; they are a starting point, not a substitute for measuring. */
const BREED_PRESETS = [
  { name: "Kitten (4–6 months)", chest: 30 },
  { name: "Average moggy",       chest: 36 },
  { name: "British Shorthair",   chest: 41 },
  { name: "Ragdoll",             chest: 45 },
  { name: "Maine Coon",          chest: 47 },
  { name: "Sphynx",              chest: 34 },
  { name: "Siamese / Bengal",    chest: 35 }
];


const PALETTES = [
  { bg:"#FFE3EA", fur:"#F6A9BC", ear:"#FFD2DD" },
  { bg:"#E4F5F0", fur:"#F4A261", ear:"#FFD2A8" },
  { bg:"#EDE7FF", fur:"#9C93B8", ear:"#D9D3EA" },
  { bg:"#FFF3D6", fur:"#6B6580", ear:"#9C93B8" },
  { bg:"#E2F1FF", fur:"#F0DCC0", ear:"#FFE9D2" },
  { bg:"#FDE7F6", fur:"#C9A87C", ear:"#EBD6B8" }
];
function hash(s){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))|0; return Math.abs(h); }

function catArt(motif, key, view){
  const p = PALETTES[hash(key||motif) % PALETTES.length];
  if(view === "measure") return measureArt(p);
  if(view === "safety")  return safetyArt(p);
  const face = `
    <ellipse cx="124" cy="158" rx="9" ry="11" fill="#3D2B4F"/>
    <ellipse cx="176" cy="158" rx="9" ry="11" fill="#3D2B4F"/>
    <ellipse cx="121" cy="154" rx="3" ry="3.5" fill="#fff"/>
    <ellipse cx="173" cy="154" rx="3" ry="3.5" fill="#fff"/>
    <path d="M144 180 h12 l-6 7 z" fill="#E8718E"/>
    <path d="M150 187 q-7 7 -15 3 M150 187 q7 7 15 3" stroke="#3D2B4F" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g stroke="#3D2B4F" stroke-width="3" stroke-linecap="round" opacity=".55">
      <path d="M95 172 h-26 M96 182 h-24 M205 172 h26 M204 182 h24"/>
    </g>`;
  const head = `
    <path d="M92 118 L86 66 L131 96 Z" fill="${p.fur}"/>
    <path d="M99 113 L96 79 L124 98 Z" fill="${p.ear}"/>
    <path d="M208 118 L214 66 L169 96 Z" fill="${p.fur}"/>
    <path d="M201 113 L204 79 L176 98 Z" fill="${p.ear}"/>
    <ellipse cx="150" cy="163" rx="74" ry="66" fill="${p.fur}"/>
    ${face}`;

  let behind="", body="", front="";

  switch(motif){
    case "pumpkin":
      front = `<g><ellipse cx="150" cy="80" rx="52" ry="40" fill="#FF8A3D"/>
        <path d="M124 46 q26 -14 52 0" stroke="#FF8A3D" stroke-width="0" fill="none"/>
        <g stroke="#E06A20" stroke-width="4" fill="none"><path d="M133 46 q-9 34 0 68 M150 42 v76 M167 46 q9 34 0 68"/></g>
        <rect x="143" y="26" width="14" height="20" rx="6" fill="#4E9A5B"/>
        <path d="M157 32 q18 -8 14 8" stroke="#4E9A5B" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
      break;
    case "bat":
      behind = `<g fill="#5B4C8A">
        <path d="M96 150 q-70 -44 -88 6 q30 -6 36 14 q10 -20 30 -6 q6 -14 22 -14 z"/>
        <path d="M204 150 q70 -44 88 6 q-30 -6 -36 14 q-10 -20 -30 -6 q-6 -14 -22 -14 z"/></g>`;
      body = `<path d="M150 225 q-62 0 -70 62 h140 q-8 -62 -70 -62 z" fill="#3D3357"/>`;
      break;
    case "santa":
      front = `<g><path d="M104 92 q34 -70 96 -52 q-14 34 -48 46 z" fill="#E5384E"/>
        <rect x="96" y="84" width="112" height="22" rx="11" fill="#fff"/>
        <circle cx="206" cy="40" r="15" fill="#fff"/></g>`;
      body = `<path d="M150 222 q-64 0 -72 66 h144 q-8 -66 -72 -66 z" fill="#E5384E"/>
        <rect x="78" y="246" width="144" height="16" fill="#fff" opacity=".9"/>`;
      break;
    case "antlers":
      front = `<g stroke="#9A6B43" stroke-width="11" fill="none" stroke-linecap="round">
        <path d="M116 92 q-14 -34 -6 -54 M110 64 q-20 -6 -26 -22 M110 50 q16 -12 16 -26"/>
        <path d="M184 92 q14 -34 6 -54 M190 64 q20 -6 26 -22 M190 50 q-16 -12 -16 -26"/></g>`;
      break;
    case "party":
      front = `<g><path d="M150 14 L186 92 H114 Z" fill="#7CC6FF"/>
        <path d="M132 56 h40 M123 76 h54" stroke="#FF6B8A" stroke-width="9" stroke-linecap="round"/>
        <circle cx="150" cy="14" r="13" fill="#FFD166"/></g>`;
      break;
    case "jumper":
      body = `<path d="M150 220 q-66 0 -74 68 h148 q-8 -68 -74 -68 z" fill="#7CC6FF"/>
        <g stroke="#5AA9E0" stroke-width="4" opacity=".8"><path d="M96 250 h108 M92 266 h116 M90 280 h120"/></g>
        <rect x="76" y="272" width="148" height="16" rx="8" fill="#5AA9E0"/>`;
      break;
    case "bandana":
      front = `<path d="M96 206 L204 206 L150 268 Z" fill="#FF6B8A"/>
        <g fill="#fff" opacity=".85"><circle cx="132" cy="222" r="6"/><circle cx="168" cy="222" r="6"/><circle cx="150" cy="242" r="6"/></g>
        <rect x="92" y="198" width="116" height="16" rx="8" fill="#E84E70"/>`;
      break;
    case "bowtie":
      front = `<rect x="88" y="206" width="124" height="17" rx="8" fill="#5B4C8A"/>
        <g fill="#FF6B8A"><path d="M150 214 L112 194 v40 z"/><path d="M150 214 L188 194 v40 z"/>
        <rect x="141" y="202" width="18" height="24" rx="7" fill="#E84E70"/></g>`;
      break;
    case "hoodie":
      behind = `<path d="M150 58 q102 0 102 116 q0 30 -18 44 h-168 q-18 -14 -18 -44 q0 -116 102 -116 z" fill="#B79CED"/>`;
      body = `<path d="M150 222 q-66 0 -74 66 h148 q-8 -66 -74 -66 z" fill="#B79CED"/>
        <path d="M150 232 v40" stroke="#8F72D6" stroke-width="5"/>`;
      break;
    case "flower":
      front = `<g fill="#FFD166">${
        Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;
          return `<ellipse cx="${(150+Math.cos(a)*72).toFixed(1)}" cy="${(216+Math.sin(a)*30).toFixed(1)}" rx="17" ry="14" fill="${i%2?"#FF6B8A":"#FFD166"}"/>`;
        }).join("")}</g>
        <rect x="92" y="208" width="116" height="16" rx="8" fill="#4ECDB4"/>`;
      break;
    case "mane":
      behind = `<g fill="#E8944A">${
        Array.from({length:16},(_,i)=>{const a=i*22.5*Math.PI/180;
          return `<ellipse cx="${(150+Math.cos(a)*88).toFixed(1)}" cy="${(163+Math.sin(a)*82).toFixed(1)}" rx="30" ry="24" transform="rotate(${i*22.5} ${(150+Math.cos(a)*88).toFixed(1)} ${(163+Math.sin(a)*82).toFixed(1)})"/>`;
        }).join("")}<circle cx="150" cy="163" r="86" fill="#F4A261"/></g>`;
      break;
    case "dino":
      behind = `<path d="M150 54 q98 0 98 112 q0 32 -18 46 h-160 q-18 -14 -18 -46 q0 -112 98 -112 z" fill="#5BC47E"/>
        <g fill="#FFD166"><path d="M66 150 l-24 -20 l6 32 z"/><path d="M62 186 l-26 -12 l12 30 z"/>
        <path d="M234 150 l24 -20 l-6 32 z"/><path d="M238 186 l26 -12 l-12 30 z"/></g>`;
      body = `<path d="M150 222 q-66 0 -74 66 h148 q-8 -66 -74 -66 z" fill="#5BC47E"/>`;
      break;
    case "shark":
      behind = `<path d="M150 16 L196 104 H104 Z" fill="#7E93B5"/>
        <path d="M150 40 L178 96 H122 Z" fill="#9DB0CC"/>`;
      body = `<path d="M150 220 q-70 0 -78 68 h156 q-8 -68 -78 -68 z" fill="#7E93B5"/>
        <path d="M96 262 q54 -16 108 0 q-54 22 -108 0 z" fill="#E9EEF6"/>
        <g fill="#fff"><path d="M108 258 l8 12 l8 -12 z"/><path d="M132 262 l8 12 l8 -12 z"/><path d="M158 262 l8 12 l8 -12 z"/><path d="M182 258 l8 12 l8 -12 z"/></g>`;
      break;
    case "cape":
      behind = `<path d="M110 200 q-66 26 -74 92 h228 q-8 -66 -74 -92 z" fill="#E5384E"/>
        <path d="M110 200 q40 40 80 0 q-40 22 -80 0 z" fill="#B82A3C"/>`;
      front = `<rect x="98" y="196" width="104" height="18" rx="9" fill="#FFD166"/>
        <circle cx="150" cy="205" r="13" fill="#FFD166" stroke="#E5A93D" stroke-width="3"/>`;
      break;
  }

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of a cat wearing the ${motif} costume">
    <rect width="300" height="300" fill="${p.bg}"/>
    <circle cx="42" cy="46" r="13" fill="#fff" opacity=".5"/>
    <circle cx="262" cy="70" r="9" fill="#fff" opacity=".5"/>
    <circle cx="252" cy="250" r="16" fill="#fff" opacity=".4"/>
    ${behind}${body}${head}${front}
  </svg>`;
}

/* Diagrams, not fake photographs. Competitors publish 10+ product photos; we cannot
   invent those, but we can publish views that carry information a photo doesn't. */
function measureArt(p){
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram showing where to measure a cat: neck, chest and back length">
    <rect width="300" height="300" fill="#FFFDF8"/>
    <g fill="${p.fur}" opacity=".45">
      <path d="M70 128 L64 82 L104 108 Z"/><path d="M146 128 L152 82 L112 108 Z"/>
      <ellipse cx="108" cy="150" rx="46" ry="42"/>
      <path d="M118 186 q86 -6 96 52 q4 34 -18 40 h-96 q-16 -20 -10 -50 z"/>
    </g>
    <g stroke="#FF6B8A" stroke-width="3" stroke-dasharray="7 5" fill="none">
      <ellipse cx="108" cy="188" rx="40" ry="12"/>
      <ellipse cx="166" cy="212" rx="34" ry="46"/>
    </g>
    <path d="M120 176 L224 258" stroke="#4ECDB4" stroke-width="3" stroke-dasharray="7 5"/>
    <g font-family="Nunito,sans-serif" font-size="14" font-weight="700">
      <text x="14" y="176" fill="#E84E70">1 · Neck</text>
      <text x="196" y="170" fill="#E84E70">2 · Chest</text>
      <text x="150" y="288" fill="#2FA98F">3 · Back</text>
    </g>
    <text x="196" y="188" font-family="Nunito,sans-serif" font-size="11" fill="#7A6A88">widest point</text>
  </svg>`;
}
function safetyArt(p){
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of a breakaway buckle separating under pressure">
    <rect width="300" height="300" fill="#FFFDF8"/>
    <rect x="16" y="130" width="104" height="40" rx="12" fill="#5B4C8A"/>
    <rect x="180" y="130" width="104" height="40" rx="12" fill="#5B4C8A"/>
    <path d="M120 138 h26 v24 h-26 z" fill="#B79CED"/>
    <path d="M180 138 h-26 v24 h26 z" fill="#B79CED"/>
    <g stroke="#FF6B8A" stroke-width="5" stroke-linecap="round">
      <path d="M138 104 v-22 M162 104 v-22"/>
      <path d="M128 92 l-16 -14 M172 92 l16 -14"/>
    </g>
    <text x="150" y="210" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="19" fill="#3D2B4F">Breakaway buckle</text>
    <text x="150" y="236" text-anchor="middle" font-family="Nunito,sans-serif" font-size="13" fill="#7A6A88">Separates under pressure so a snagged</text>
    <text x="150" y="254" text-anchor="middle" font-family="Nunito,sans-serif" font-size="13" fill="#7A6A88">collar cannot trap your cat.</text>
  </svg>`;
}

/* ------------------------------------------------------------------ units --- */
const UNIT_KEY = "catwalk.unit";
function getUnit(){ try{ return localStorage.getItem(UNIT_KEY) === "in" ? "in" : "cm"; }catch(e){ return "cm"; } }
function setUnit(u){ try{ localStorage.setItem(UNIT_KEY, u); }catch(e){} }
const toIn = cm => Math.round((cm / 2.54) * 4) / 4;      /* nearest quarter inch */
function fmtRange(v, unit){
  const n = x => unit === "in" ? String(toIn(x)) : String(x);
  const suffix = unit === "in" ? '"' : "cm";
  return (Array.isArray(v) ? n(v[0]) + "\u2013" + n(v[1]) : n(v)) + suffix;
}
function sizeTableHTML(unit){
  return '<thead><tr><th>Size</th><th>Neck</th><th>Chest girth</th><th>Waist</th><th>Back length</th><th>Typical cat</th></tr></thead><tbody>' +
    SIZE_CHART.map(r =>
      '<tr><td class="sz">' + r.size + '</td><td>' + fmtRange(r.neck, unit) +
      '</td><td><b>' + fmtRange(r.chest, unit) + '</b></td><td>' + fmtRange(r.waist, unit) +
      '</td><td>' + fmtRange(r.back, unit) + '</td><td class="muted">' + r.who + '</td></tr>'
    ).join("") + '</tbody>';
}
/* Renders a size table plus a cm/inch toggle, and keeps them in sync. */
function mountSizeTable(host){
  const paint = () => {
    const u = getUnit();
    host.innerHTML =
      '<div class="unitrow"><span class="small muted">Measurements in</span>' +
      '<div class="unittoggle"><button type="button" data-u="cm" aria-pressed="' + (u==="cm") + '">cm</button>' +
      '<button type="button" data-u="in" aria-pressed="' + (u==="in") + '">inches</button></div></div>' +
      '<div class="tablewrap"><table>' + sizeTableHTML(u) + '</table></div>';
    host.querySelectorAll(".unittoggle button").forEach(b => {
      b.onclick = () => { setUnit(b.dataset.u); paint(); };
    });
  };
  paint();
}

/* -------------------------------------------------------------- wishlist --- */
const WISH_KEY = "catwalk.wish.v1";
function getWish(){
  try{ const v = JSON.parse(localStorage.getItem(WISH_KEY)); return Array.isArray(v) ? v : []; }
  catch(e){ return []; }
}
function toggleWish(id){
  const w = getWish();
  const i = w.indexOf(id);
  if(i < 0) w.push(id); else w.splice(i, 1);
  try{ localStorage.setItem(WISH_KEY, JSON.stringify(w)); }catch(e){}
  paintWish();
  return i < 0;
}
function paintWish(){
  const w = getWish();
  document.querySelectorAll("[data-wish-count]").forEach(el => {
    el.textContent = w.length;
    el.style.display = w.length ? "inline-block" : "none";
  });
  document.querySelectorAll("[data-wish]").forEach(b => {
    const on = w.indexOf(b.dataset.wish) >= 0;
    b.setAttribute("aria-pressed", String(on));
    b.textContent = on ? "♥" : "♡";
    b.setAttribute("aria-label", on ? "Remove from wishlist" : "Save to wishlist");
  });
}

function toast(msg){

  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----------------------------------------------------------- size finder --- */
function recommendSize(chestCm){
  if(!(chestCm > 0)) return null;
  for(const r of SIZE_CHART){
    if(chestCm >= r.min && chestCm <= r.max) return { size: r.size, exact: true };
  }
  if(chestCm < SIZE_CHART[0].min) return { size: "XS", exact: false, small: true };
  return { size: "L", exact: false, big: true };
}

function wireFinder(root){
  const input = root.querySelector("input");
  const out   = root.querySelector(".out");
  const go = () => {
    const v = parseFloat(input.value);
    const r = recommendSize(v);
    if(!r){ out.textContent = "Pop a chest measurement in and we'll size it."; return; }
    if(r.small) out.innerHTML = `<b>XS</b> — and measure again to be sure; that's smaller than most adult cats.`;
    else if(r.big) out.innerHTML = `<b>L</b> is our largest. Over 50cm, a bandana or collar will fit better than a garment.`;
    else{
      const row = SIZE_CHART.find(s => s.size === r.size);
      const near = v >= row.max - 1.5;
      out.innerHTML = near
        ? `<b>${r.size}</b> — but you're at the top of the range, so size up if between sizes.`
        : `<b>${r.size}</b> — ${row.who.toLowerCase()}.`;
    }
  };
  input.addEventListener("input", go);
  root.querySelector(".btn").addEventListener("click", go);

  /* Breed shortcuts: most people do not have a tape measure to hand. */
  const presets = root.querySelector(".presets");
  if(presets){
    presets.innerHTML = '<span class="small muted">No tape measure? Start from a typical:</span> ' +
      BREED_PRESETS.map(b => '<button class="chip chip-sm" type="button" data-c="' + b.chest + '">' +
        b.name + '</button>').join("");
    presets.addEventListener("click", e => {
      const b = e.target.closest("button"); if(!b) return;
      input.value = b.dataset.c;
      go();
      const o = root.querySelector(".out");
      o.innerHTML += ' <span class="small muted">(typical for that breed — measure to be sure)</span>';
    });
  }
}


/* --------------------------------------------------- illustrated fallbacks --- */
/* Products without a photograph render a generated illustration instead of a grey
   placeholder box. Delete this once every product has real photography — the theme
   works fine without it. Motif comes from a `motif` tag (e.g. `motif:pumpkin`) or a
   `custom.motif` metafield; otherwise one is picked deterministically from the handle. */
const MOTIFS = ["pumpkin","bat","santa","antlers","party","jumper","bandana",
                "bowtie","hoodie","flower","mane","dino","shark","cape"];

function hydrateArt(root){
  (root || document).querySelectorAll("[data-cat-art]:not([data-art-done])").forEach(el => {
    const key   = el.getAttribute("data-cat-art") || "cat";
    const view  = el.getAttribute("data-art-view") || undefined;
    let motif   = (el.getAttribute("data-art-motif") || "").trim();
    if(!motif || MOTIFS.indexOf(motif) < 0) motif = MOTIFS[hash(key) % MOTIFS.length];
    el.innerHTML = catArt(motif, key, view);
    el.setAttribute("data-art-done", "true");
  });
}

/* ------------------------------------------------------------ cart progress --- */
/* Reads the live totals Liquid renders into data attributes, so the bar stays
   correct after Shopify recalculates the cart. */
function paintCartProgress(){
  document.querySelectorAll("[data-cart-progress]").forEach(el => {
    const total = parseFloat(el.getAttribute("data-total") || "0");        /* pounds */
    const target = parseFloat(el.getAttribute("data-target") || "0");
    if(!(target > 0)) return;
    const pct = Math.min(100, (total / target) * 100);
    const bar = el.querySelector("i");
    const msg = el.querySelector("[data-msg]");
    if(bar) bar.style.width = pct.toFixed(0) + "%";
    if(msg){
      const left = Math.max(0, target - total);
      msg.textContent = left > 0
        ? "Spend £" + left.toFixed(2) + " more for free UK delivery"
        : "✅ You've got free UK delivery";
    }
  });
}

/* ------------------------------------------------------------------ gallery --- */
function wireGallery(root){
  const main = root.querySelector("[data-gallery-main]");
  const thumbs = root.querySelector("[data-gallery-thumbs]");
  if(!main || !thumbs) return;
  thumbs.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    const img = b.getAttribute("data-full");
    const view = b.getAttribute("data-view");
    if(img){
      main.innerHTML = '<img src="' + img + '" alt="' + (b.getAttribute("data-alt") || "") + '" width="1000" height="1000">';
    } else {
      main.innerHTML = "";
      main.setAttribute("data-cat-art", main.getAttribute("data-key") || "cat");
      main.setAttribute("data-art-motif", main.getAttribute("data-motif") || "");
      if(view && view !== "worn") main.setAttribute("data-art-view", view);
      else main.removeAttribute("data-art-view");
      main.removeAttribute("data-art-done");
      hydrateArt(main.parentNode);
    }
    thumbs.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  });
}

/* ------------------------------------------------------------------- boot --- */
function init(){
  hydrateArt();
  paintWish();
  paintCartProgress();
  document.querySelectorAll("[data-size-table]").forEach(mountSizeTable);
  document.querySelectorAll("[data-size-finder]").forEach(wireFinder);
  document.querySelectorAll("[data-gallery]").forEach(wireGallery);

  document.addEventListener("click", e => {
    const w = e.target.closest("[data-wish]");
    if(w){
      e.preventDefault();
      toast(toggleWish(w.dataset.wish) ? "Saved to wishlist" : "Removed from wishlist");
    }
  });
}
document.addEventListener("DOMContentLoaded", init);

/* Shopify's theme editor re-renders sections without a page load. */
document.addEventListener("shopify:section:load", e => {
  hydrateArt(e.target); paintWish(); paintCartProgress();
  e.target.querySelectorAll("[data-size-table]").forEach(mountSizeTable);
  e.target.querySelectorAll("[data-size-finder]").forEach(wireFinder);
  e.target.querySelectorAll("[data-gallery]").forEach(wireGallery);
});
