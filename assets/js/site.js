
(function(){
  const config = window.JAMI_CONFIG || {};
  document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-version-label]").forEach(e=>e.textContent=config.versionLabel||"Preview");
  document.querySelectorAll("[data-repo-url]").forEach(e=>e.href=config.repoUrl||"#");
  document.querySelectorAll("[data-releases-url]").forEach(e=>e.href=config.releasesUrl||"#");
  document.querySelectorAll("[data-direct-installer-url]").forEach(e=>e.href=config.directInstallerUrl||"#");

  const navToggle=document.querySelector(".nav-toggle"), nav=document.querySelector(".nav-links");
  navToggle?.addEventListener("click",()=>{const o=nav.classList.toggle("open");navToggle.setAttribute("aria-expanded",String(o));});

  const progress=document.querySelector(".scroll-progress");
  const sticky=document.querySelector(".sticky-download");
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress) progress.style.width=(max>0?(scrollY/max)*100:0)+"%";
    if(sticky) sticky.classList.toggle("show",scrollY>700);
  };
  addEventListener("scroll",updateScroll,{passive:true}); updateScroll();

  const reveal=()=>{
    document.querySelectorAll(".reveal").forEach(el=>{
      if(el.getBoundingClientRect().top<innerHeight-70) el.classList.add("visible");
    });
  };
  addEventListener("scroll",reveal,{passive:true}); reveal();

  // Rotating hero phrase
  const word=document.querySelector(".word-slot");
  if(word){
    const words=["evidence","your hardware","the exact game","safe changes"];
    let i=0;
    setInterval(()=>{
      i=(i+1)%words.length;
      word.classList.remove("swap"); void word.offsetWidth;
      word.textContent=words[i]; word.classList.add("swap");
    },2300);
  }

  // App parallax
  const stage=document.querySelector(".app-stage"), shell=document.querySelector(".app-shell");
  if(stage && shell && matchMedia("(pointer:fine)").matches){
    stage.addEventListener("mousemove",e=>{
      const r=stage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      shell.style.transform=`rotateY(${x*8-4}deg) rotateX(${-y*5+1}deg) translateY(${y*3}px)`;
    });
    stage.addEventListener("mouseleave",()=>shell.style.transform="rotateY(-5deg) rotateX(1.5deg)");
  }

  // Console demo playback
  const consoleLines=[...document.querySelectorAll(".console-line")];
  let consoleStarted=false;
  const runConsole=()=>{
    const box=document.querySelector(".demo-console");
    if(!box || consoleStarted || box.getBoundingClientRect().top>innerHeight-100) return;
    consoleStarted=true;
    consoleLines.forEach((line,i)=>setTimeout(()=>line.classList.add("show"),i*520));
  };
  addEventListener("scroll",runConsole,{passive:true}); runConsole();

  // Tiny tilt on feature cards
  if(matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".feature-card").forEach(card=>{
      card.addEventListener("mousemove",e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(700px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }

  // Lightweight animated particle network
  const canvas=document.getElementById("jami-particles");
  if(canvas){
    const ctx=canvas.getContext("2d"); let w,h,dpr,pts=[];
    const resize=()=>{
      dpr=Math.min(devicePixelRatio||1,2); w=innerWidth; h=innerHeight;
      canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=w+"px"; canvas.style.height=h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count=Math.max(28,Math.min(70,Math.round(w/24)));
      pts=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.2+.45}));
    };
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      for(const p of pts){
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(82,229,255,.28)";ctx.fill();
      }
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);
        if(d<125){ctx.strokeStyle=`rgba(255,212,0,${(1-d/125)*.055})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
      }
      requestAnimationFrame(draw);
    };
    resize();addEventListener("resize",resize);draw();
  }
})();
