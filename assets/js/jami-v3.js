
(function(){
  const c=window.JAMI_CONFIG||{};
  document.querySelectorAll("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-version-label]").forEach(e=>e.textContent=c.versionLabel||"Preview");
  document.querySelectorAll("[data-repo-url]").forEach(e=>e.href=c.repoUrl||"#");
  document.querySelectorAll("[data-releases-url]").forEach(e=>e.href=c.releasesUrl||"#");
  document.querySelectorAll("[data-direct-installer-url]").forEach(e=>e.href=c.directInstallerUrl||"#");

  const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".nav-links");
  toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});

  const progress=document.querySelector(".scroll-progress"),sticky=document.querySelector(".sticky-download");
  const scrollUI=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress)progress.style.width=(max>0?(scrollY/max)*100:0)+"%";
    if(sticky)sticky.classList.toggle("show",scrollY>650);
  };
  addEventListener("scroll",scrollUI,{passive:true});scrollUI();

  const reveal=()=>{
    document.querySelectorAll(".reveal").forEach(el=>{
      if(el.getBoundingClientRect().top<innerHeight-65)el.classList.add("visible");
    });
  };
  addEventListener("scroll",reveal,{passive:true});reveal();

  const slot=document.querySelector(".word-slot");
  if(slot){
    const words=["evidence","your hardware","the exact game","safe changes"];
    let n=0;
    setInterval(()=>{
      n=(n+1)%words.length;
      slot.classList.remove("swap");void slot.offsetWidth;
      slot.textContent=words[n];slot.classList.add("swap");
    },2400);
  }

  const stage=document.querySelector(".app-stage"),shell=document.querySelector(".app-shell");
  if(stage&&shell&&matchMedia("(pointer:fine)").matches){
    stage.addEventListener("mousemove",e=>{
      const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      shell.style.transform=`rotateY(${x*7-3.5}deg) rotateX(${-y*4+1}deg) translateY(${y*2}px)`;
    });
    stage.addEventListener("mouseleave",()=>shell.style.transform="rotateY(-4deg) rotateX(1deg)");
  }

  const lines=[...document.querySelectorAll(".console-line")];
  let ran=false;
  const consoleDemo=()=>{
    const box=document.querySelector(".demo-console");
    if(!box||ran||box.getBoundingClientRect().top>innerHeight-80)return;
    ran=true;lines.forEach((line,i)=>setTimeout(()=>line.classList.add("show"),i*480));
  };
  addEventListener("scroll",consoleDemo,{passive:true});consoleDemo();

  if(matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".feature-card").forEach(card=>{
      card.addEventListener("mousemove",e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(800px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }

  const canvas=document.getElementById("jami-particles");
  if(canvas){
    const ctx=canvas.getContext("2d");let w=0,h=0,dpr=1,pts=[];
    const resize=()=>{
      dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;
      canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count=Math.max(26,Math.min(60,Math.round(w/28)));
      pts=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14,r:Math.random()+.45}));
    };
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      for(const p of pts){
        p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(79,230,255,.24)";ctx.fill();
      }
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<120){ctx.strokeStyle=`rgba(255,157,0,${(1-d/120)*.045})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
      }
      requestAnimationFrame(draw);
    };
    resize();addEventListener("resize",resize);draw();
  }
})();
