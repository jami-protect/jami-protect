/* JaMi Protect V6.9.1 — accessible progressive-enhancement runtime */
(function(){
  document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
  const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".nav-links");
  if(toggle&&nav){
    const setNav=open=>{nav.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?(toggle.dataset.closeLabel||"Close menu"):(toggle.dataset.openLabel||"Open menu"));};
    toggle.addEventListener("click",()=>setNav(!nav.classList.contains("open")));
    nav.addEventListener("click",e=>{if(e.target.closest("a"))setNav(false)});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")setNav(false)});
  }
  const progress=document.querySelector(".scroll-progress");
  if(progress){const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+"%"};addEventListener("scroll",update,{passive:true});addEventListener("resize",update,{passive:true});update();}
  const reveals=[...document.querySelectorAll(".reveal")];
  if(reveals.length){
    if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
      document.documentElement.classList.add("js-reveal");
      const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible");io.unobserve(x.target)}}),{rootMargin:"0px 0px -50px 0px",threshold:.05});
      reveals.forEach(x=>io.observe(x));
    }else reveals.forEach(x=>x.classList.add("visible"));
  }
  const modes=[...document.querySelectorAll("[data-mode]")];
  function setMode(mode){modes.forEach(b=>{const a=b.dataset.mode===mode;b.classList.toggle("active",a);b.setAttribute("aria-pressed",String(a))});document.querySelectorAll("[data-simple-only]").forEach(e=>e.hidden=mode!=="simple");document.querySelectorAll("[data-gamer-only]").forEach(e=>e.hidden=mode!=="gamer")}
  if(modes.length){modes.forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));setMode(modes.find(b=>b.classList.contains("active"))?.dataset.mode||"simple")}
  const cards=[...document.querySelectorAll(".pressure-chip")];
  if(cards.length>1&&!matchMedia("(prefers-reduced-motion: reduce)").matches){let i=Math.max(0,cards.findIndex(c=>c.classList.contains("active")));setInterval(()=>{if(document.hidden)return;cards.forEach(c=>c.classList.remove("active"));i=(i+1)%cards.length;cards[i].classList.add("active")},3000)}
})();


/* V6.9.1 language menu behavior */
document.querySelectorAll('[data-language-menu] a').forEach(a=>a.addEventListener('click',()=>a.closest('details')?.removeAttribute('open')));
document.addEventListener('click',e=>document.querySelectorAll('details[data-language-menu][open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')}));
