/* JaMi Protect V6.9.1 — exact-ID portrait cover resolver */
(function(){
  const portraitUrls=appid=>[
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900_2x.jpg`,
    `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`
  ];
  window.JaMiCoverFallback=function(img){
    const appid=img.dataset.steamAppid, local=img.dataset.localFallback;
    const urls=appid?portraitUrls(appid):[];
    const step=Number(img.dataset.coverStep||"0");
    if(step<urls.length){img.dataset.coverStep=String(step+1);img.src=urls[step];return;}
    img.onerror=null;
    if(local){img.src=local;img.classList.add("cover-fallback");img.dataset.coverSource="local";}
  };
  document.querySelectorAll("img[data-steam-appid]").forEach(img=>img.dataset.coverSource="steam-id");
})();
