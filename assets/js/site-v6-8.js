
(function(){
 document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
 const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".nav-links");
 toggle?.addEventListener("click",()=>nav.classList.toggle("open"));
 const progress=document.querySelector(".scroll-progress");
 const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max?scrollY/max*100:0)+"%";};
 addEventListener("scroll",update,{passive:true});update();
 const reveal=()=>document.querySelectorAll(".reveal").forEach(el=>{if(el.getBoundingClientRect().top<innerHeight-70)el.classList.add("visible")});
 addEventListener("scroll",reveal,{passive:true});reveal();
 const simple=document.querySelector('[data-mode="simple"]'),gamer=document.querySelector('[data-mode="gamer"]');
 function setMode(mode){
  [simple,gamer].forEach(b=>b?.classList.toggle("active",b.dataset.mode===mode));
  document.querySelectorAll("[data-simple-only]").forEach(e=>e.hidden=mode!=="simple");
  document.querySelectorAll("[data-gamer-only]").forEach(e=>e.hidden=mode!=="gamer");
 }
 simple?.addEventListener("click",()=>setMode("simple"));gamer?.addEventListener("click",()=>setMode("gamer"));setMode("simple");
 const cards=[...document.querySelectorAll(".pressure-chip")];let i=0;
 setInterval(()=>{cards.forEach(c=>c.classList.remove("active"));if(cards.length){cards[i%cards.length].classList.add("active");i++;}},1300);
})();
