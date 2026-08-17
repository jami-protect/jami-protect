/* JaMi Protect V6.9.1 — game library search/filter */
(function(){
  const search=document.querySelector("[data-game-search]"),cards=[...document.querySelectorAll("[data-game-card]")],filters=[...document.querySelectorAll("[data-game-filter]")],count=document.querySelector("[data-game-count]"),empty=document.querySelector("[data-game-empty]");
  if(!cards.length)return;let active="all";
  const apply=()=>{const q=(search?.value||"").trim().toLowerCase();let visible=0;cards.forEach(card=>{const show=(!q||(card.dataset.search||card.textContent).toLowerCase().includes(q))&&(active==="all"||(card.dataset.tags||"").split(" ").includes(active));card.hidden=!show;if(show)visible++});if(count)count.textContent=String(visible);if(empty)empty.hidden=visible!==0};
  search?.addEventListener("input",apply);filters.forEach(btn=>btn.addEventListener("click",()=>{active=btn.dataset.gameFilter;filters.forEach(x=>{const a=x===btn;x.classList.toggle("active",a);x.setAttribute("aria-pressed",String(a))});apply()}));apply();
})();
