
(function(){
 const c=window.JAMI_CONFIG||{};
 document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
 document.querySelectorAll("[data-version]").forEach(e=>e.textContent=c.versionLabel||"Preview");
 document.querySelectorAll("[data-github]").forEach(e=>e.href=c.repoUrl||"#");
 document.querySelectorAll("[data-release]").forEach(e=>e.href=c.releasesUrl||"#");
 document.querySelectorAll("[data-download]").forEach(e=>{
   e.href=c.releaseReady?c.directInstallerUrl:"download.html";
   const label=e.querySelector("[data-download-label]");
   if(label) label.textContent=c.releaseReady?`Download JaMi Protect (${c.versionLabel})`:"Download JaMi Protect (Preview)";
 });
 const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".nav-links");
 toggle?.addEventListener("click",()=>nav.classList.toggle("open"));

 const simpleBtn=document.querySelector('[data-mode="simple"]');
 const gamerBtn=document.querySelector('[data-mode="gamer"]');
 const mock=document.querySelector(".product-mock");
 function setMode(mode){
   mock?.setAttribute("data-preview-mode",mode);
   [simpleBtn,gamerBtn].forEach(b=>b?.classList.toggle("active",b.dataset.mode===mode));
   document.querySelectorAll("[data-simple-only]").forEach(e=>e.hidden=mode!=="simple");
   document.querySelectorAll("[data-gamer-only]").forEach(e=>e.hidden=mode!=="gamer");
 }
 simpleBtn?.addEventListener("click",()=>setMode("simple"));
 gamerBtn?.addEventListener("click",()=>setMode("gamer"));
 setMode("simple");

 const progress=document.querySelector(".scroll-progress");
 const sticky=document.querySelector(".sticky-download");
 const update=()=>{
   const max=document.documentElement.scrollHeight-innerHeight;
   if(progress) progress.style.width=(max?scrollY/max*100:0)+"%";
   if(sticky) sticky.classList.toggle("show",scrollY>700);
 };
 addEventListener("scroll",update,{passive:true});update();

 const reveal=()=>{
   document.querySelectorAll(".reveal").forEach(el=>{
     if(el.getBoundingClientRect().top<innerHeight-70)el.classList.add("visible");
   });
 };
 addEventListener("scroll",reveal,{passive:true});reveal();
})();
