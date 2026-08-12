/* JaMi Protect production build: V6.8 MULTILINGUAL */

window.JaMiCoverFallback = function(img){
  const appid = img.dataset.steamAppid;
  const local = img.dataset.localFallback;
  if(!appid){ img.onerror=null; img.src=local; return; }

  let step = Number(img.dataset.coverStep || "0") + 1;
  img.dataset.coverStep = String(step);

  const urls = [
    `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900_2x.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`,
    `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`
  ];
  if(step <= urls.length){
    img.src = urls[step-1];
  }else{
    img.onerror=null;
    img.src=local;
    img.classList.add("cover-fallback");
  }
};
