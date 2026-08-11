
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
