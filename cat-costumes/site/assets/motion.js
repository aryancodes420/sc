/* Catwalk Club — motion layer. Everything here is decoration: the site works without it.
   Transforms and opacity only, IntersectionObserver-driven, off under prefers-reduced-motion. */
(function(){
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || window.__noMotion;
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  /* ---------- 1 · scroll reveals with stagger ---------- */
  const REVEAL = "main > section, main > .strip, .pcard-wrap, .catc, .phone, .obj, .xcard, .panel, .breed, .rev, .sec-head, .savebox, .news, .drawblock, .forme, .objections, .pdp-head, .pdp-buy, .gallery, .qstep, .cat, .fgrid > div";
  function reveal(root){
    if(reduce) return;
    const io = reveal.io || (reveal.io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }));
    $$(REVEAL, root).forEach(el => {
      if(el.classList.contains("rv")) return;
      el.classList.add("rv");
      const sib = el.parentElement ? [...el.parentElement.children].filter(x => x.classList.contains("rv")) : [];
      el.style.setProperty("--d", (Math.min(sib.indexOf(el), 7) * 70) + "ms");
      if(el.getBoundingClientRect().top < innerHeight * 0.9) el.classList.add("in"); else io.observe(el);
    });
  }
  /* content rendered by scripts arrives after load: watch for it */
  const mo = new MutationObserver(ms => { let hit = false; ms.forEach(m => { if(m.addedNodes.length) hit = true; }); if(hit) reveal(); });

  /* ---------- 2 · header compacts, reading progress bar ---------- */
  function header(){
    const h = $("header.site"); if(!h) return;
    const bar = document.createElement("div"); bar.className = "progress-bar"; document.body.appendChild(bar);
    let ticking = false;
    const paint = () => { ticking = false; const y = scrollY; h.classList.toggle("compact", y > 60);
      const max = document.documentElement.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")"; };
    addEventListener("scroll", () => { if(!ticking){ ticking = true; requestAnimationFrame(paint); } }, { passive: true }); paint();
  }

  /* ---------- 3 · hero: tilt to the mouse, parallax on scroll, floating bits ---------- */
  function hero(){
    const art = $(".heroart"); if(!art || reduce) return;
    const bits = ["🎃", "🦇", "🎀", "✨", "🐾", "🎄"];
    const layer = document.createElement("div"); layer.className = "floaters"; layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = bits.map((b, i) => '<span style="--i:' + i + ';left:' + (8 + i * 16) + '%;animation-delay:' + (i * -1.7) + 's">' + b + '</span>').join("");
    $(".hero").appendChild(layer);
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    if(fine){
      art.addEventListener("mousemove", e => { const r = art.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        art.style.transform = "perspective(900px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg) translateZ(0)";
        art.style.setProperty("--mx", (x * 14) + "px"); art.style.setProperty("--my", (y * 14) + "px"); });
      art.addEventListener("mouseleave", () => { art.style.transform = ""; art.style.setProperty("--mx", "0px"); art.style.setProperty("--my", "0px"); });
    }
    addEventListener("scroll", () => { const y = Math.min(scrollY, 600); art.style.setProperty("--py", (y * 0.12) + "px"); }, { passive: true });
  }

  /* ---------- 4 · 3D tilt on phones and category rings ---------- */
  function tilt(){
    if(reduce || !matchMedia("(hover:hover)").matches) return;
    document.addEventListener("mousemove", e => {
      const el = e.target.closest(".phone, .catc .ring"); if(!el) return;
      const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = "perspective(700px) rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 12) + "deg) translateY(-4px)";
    });
    document.addEventListener("mouseout", e => { const el = e.target.closest(".phone, .catc .ring"); if(el && !el.contains(e.relatedTarget)) el.style.transform = ""; });
  }

  /* ---------- 5 · fly to cart + count bump ---------- */
  function flyToCart(from){
    const cart = $(".cartlink"); if(!cart) return;
    const img = from && from.closest(".pcard-wrap, .pdp-stack, .sticky-atc, main") ? $("img", from.closest(".pcard-wrap, .pdp-stack, .sticky-atc, main")) : null;
    if(img && !reduce){
      const r = img.getBoundingClientRect(), c = cart.getBoundingClientRect();
      const ghost = img.cloneNode(); ghost.className = "fly"; Object.assign(ghost.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
      document.body.appendChild(ghost);
      ghost.animate([{ transform: "translate(0,0) scale(1)", opacity: 1, borderRadius: "12px" }, { transform: "translate(" + (c.left + c.width / 2 - r.left - r.width / 2) + "px," + (c.top + c.height / 2 - r.top - r.height / 2) + "px) scale(.08)", opacity: .4, borderRadius: "50%" }],
        { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)" }).onfinish = () => ghost.remove();
    }
    cart.classList.remove("bump"); void cart.offsetWidth; cart.classList.add("bump");
  }
  document.addEventListener("cart:add", e => flyToCart(e.detail && e.detail.from));
  document.addEventListener("click", e => { const b = e.target.closest("#add, [data-s-add], .qadd:not(.notify):not(a)"); if(b) setTimeout(() => flyToCart(b), 0); });

  /* ---------- 6 · buttons: ripple; hearts: pop ---------- */
  document.addEventListener("pointerdown", e => {
    const b = e.target.closest(".btn, .chip, .qadd, .sizes button, .qopt"); if(!b || reduce) return;
    const r = b.getBoundingClientRect(), s = document.createElement("span"); s.className = "ripple";
    s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px"; b.appendChild(s); setTimeout(() => s.remove(), 600);
  });
  document.addEventListener("click", e => { const w = e.target.closest(".wish"); if(w){ w.classList.remove("pop"); void w.offsetWidth; w.classList.add("pop"); } });

  /* ---------- 7 · accordions open and close smoothly ---------- */
  document.addEventListener("click", e => {
    const s = e.target.closest("details > summary"); if(!s || reduce) return;
    const d = s.parentElement, inner = d.querySelector(":scope > .inner, :scope > div"); if(!inner) return;
    e.preventDefault();
    if(d.open){
      const h = inner.offsetHeight; inner.style.overflow = "hidden";
      inner.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 220, easing: "ease" }).onfinish = () => { d.open = false; inner.style.overflow = ""; };
    } else {
      d.open = true; const h = inner.offsetHeight; inner.style.overflow = "hidden";
      inner.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], { duration: 260, easing: "ease" }).onfinish = () => { inner.style.overflow = ""; };
    }
  });

  /* ---------- 8 · gallery: swipe on touch, magnify on hover ---------- */
  function gallery(){
    const g = $(".gallery"); if(!g) return;
    const thumbs = () => $$("[data-thumbs] button, [data-gallery-thumbs] button", g);
    const step = dir => { const t = thumbs(); const i = t.findIndex(b => b.getAttribute("aria-pressed") === "true"); const n = t[(i + dir + t.length) % t.length]; if(n) n.click(); };
    let x0 = null;
    g.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    g.addEventListener("touchend", e => { if(x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
    if(matchMedia("(hover:hover) and (pointer:fine)").matches && !reduce){
      const main = $(".main", g);
      main.addEventListener("mousemove", e => { const img = $("img", main); if(!img) return; const r = main.getBoundingClientRect();
        img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%"; img.style.transform = "scale(1.7)"; });
      main.addEventListener("mouseleave", () => { const img = $("img", main); if(img) img.style.transform = ""; });
    }
    document.addEventListener("keydown", e => { if(e.key === "ArrowRight") step(1); if(e.key === "ArrowLeft") step(-1); });
  }

  /* ---------- 9 · quick-add feedback: button becomes a tick for a moment ---------- */
  document.addEventListener("click", e => {
    const b = e.target.closest(".qadd:not(.notify):not(a), #add, [data-s-add]"); if(!b) return;
    const was = b.innerHTML; b.classList.add("done"); b.innerHTML = "✓ Added"; setTimeout(() => { b.classList.remove("done"); b.innerHTML = was; }, 1400);
  });

  /* ---------- smooth scroll for in-page links only (CSS scroll-behavior would also slow programmatic scrolls) ---------- */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]'); if(!a || a.getAttribute("href").length < 2) return;
    const t = document.querySelector(a.getAttribute("href")); if(!t) return;
    e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); history.replaceState(null, "", a.getAttribute("href"));
  });

  /* ---------- boot ---------- */
  function boot(){
    header(); hero(); tilt(); gallery();
    reveal(); mo.observe(document.body, { childList: true, subtree: true });
    document.body.classList.add("motion-ready");
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
