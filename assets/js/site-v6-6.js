
(function(){
  const c=window.JAMI_CONFIG||{};
  document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-github]").forEach(e=>e.href=c.repoUrl||"#");
  document.querySelectorAll("[data-release]").forEach(e=>e.href=c.releasesUrl||"#");
  document.querySelectorAll("[data-preview-cta]").forEach(e=>{
    e.href=c.releaseReady?c.directInstallerUrl:"download.html";
    const label=e.querySelector("[data-preview-label]");
    if(label) label.textContent=c.releaseReady?`Download JaMi Protect (${c.versionLabel})`:"View JaMi Protect Preview";
  });

  const navToggle=document.querySelector(".nav-toggle"), nav=document.querySelector(".nav-links");
  navToggle?.addEventListener("click",()=>nav.classList.toggle("open"));

  const progress=document.querySelector(".scroll-progress");
  const sticky=document.querySelector(".sticky-preview");
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress) progress.style.width=(max?scrollY/max*100:0)+"%";
    if(sticky) sticky.classList.toggle("show",scrollY>760);
  };
  addEventListener("scroll",updateScroll,{passive:true}); updateScroll();

  const reveal=()=>{
    document.querySelectorAll(".reveal").forEach(el=>{
      if(el.getBoundingClientRect().top<innerHeight-70) el.classList.add("visible");
    });
  };
  addEventListener("scroll",reveal,{passive:true}); reveal();

  // Simpel / Gamer preview
  const simple=document.querySelector('[data-mode="simple"]');
  const gamer=document.querySelector('[data-mode="gamer"]');
  function setMode(mode){
    [simple,gamer].forEach(b=>b?.classList.toggle("active",b.dataset.mode===mode));
    document.querySelectorAll("[data-simple-only]").forEach(e=>e.hidden=mode!=="simple");
    document.querySelectorAll("[data-gamer-only]").forEach(e=>e.hidden=mode!=="gamer");
  }
  simple?.addEventListener("click",()=>setMode("simple"));
  gamer?.addEventListener("click",()=>setMode("gamer"));
  setMode("simple");

  // Truthful live site counters. Unknown GameKnowledge values remain explicitly "SYNC READY".
  fetch("assets/data/research-stats.json?v=6.4")
    .then(r=>r.ok?r.json():Promise.reject())
    .then(stats=>{
      const set=(key,val)=>{
        document.querySelectorAll(`[data-stat="${key}"]`).forEach(e=>e.textContent=val);
      };
      set("public_game_pages", stats.public_game_pages ?? "—");
      set("public_cover_profiles", stats.public_cover_profiles ?? "—");
      set("display_modes", stats.display_modes ?? "—");
      set("research_refresh", stats.research_refresh ?? "AUTO");
      set("games_researched", stats.games_researched ?? "SYNC READY");
      set("validated_transcripts", stats.validated_transcripts ?? "SYNC READY");
    }).catch(()=>{});

  // Pressure demo animation
  const pressureCards=[...document.querySelectorAll(".pressure-chip")];
  let i=0;
  setInterval(()=>{
    pressureCards.forEach(c=>c.classList.remove("active"));
    if(pressureCards.length){
      pressureCards[i%pressureCards.length].classList.add("active");
      i++;
    }
  },1200);
})();

(function(){
 const stars=s=>Array.from({length:5},(_,i)=>`<span class="review-star ${i<Math.round(Number(s)||0)?"":"dim"}">★</span>`).join("");
 fetch("/jami-protect/assets/data/reviews.json?v=6.5").then(r=>r.json()).then(d=>{
  document.querySelectorAll("[data-review-average]").forEach(e=>e.textContent=d.summary.average.toFixed(1));
  document.querySelectorAll("[data-review-count]").forEach(e=>e.textContent=d.summary.review_count);
  document.querySelectorAll("[data-verified-count]").forEach(e=>e.textContent=d.summary.verified_count);
  document.querySelectorAll("[data-review-stars]").forEach(e=>e.innerHTML=stars(d.summary.average));
  const c=document.querySelector("[data-review-categories]"); if(c)c.innerHTML=Object.entries(d.category_scores).map(([n,s])=>`<div class="review-category-row"><span>${n}</span><div class="review-bar"><i style="width:${s/5*100}%"></i></div><b>${s}/5</b></div>`).join("");
  const f=document.querySelector("[data-review-feed]"); if(f)f.innerHTML=d.reviews.map(r=>`<article class="review-card"><div class="review-card-head"><div class="review-user"><div class="review-avatar">AT</div><div><b>${r.display_name}</b><span>${r.role}</span>${r.verified?`<span class="verified-badge">✓ ${r.verification_label}</span>`:""}</div></div><div class="review-card-score">${r.score.toFixed(1)} / 5</div></div><h3>${r.title}</h3><blockquote>${r.body}</blockquote><div class="review-tags"><span class="review-tag">Would test: ${r.would_test}</span><span class="review-tag">Would share: ${r.would_share_site}</span><span class="review-tag">${r.professional_feel}</span></div><div class="review-disclaimer">${r.score_method}. Source: ${r.source}.</div></article>`).join("");
 }).catch(()=>{});
})();
