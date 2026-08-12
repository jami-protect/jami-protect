
(function(){
 let rating=0;
 const stars=[...document.querySelectorAll("[data-pick-star]")];
 stars.forEach((b,i)=>b.addEventListener("click",()=>{rating=i+1;document.querySelector("#rating").value=String(rating);stars.forEach((x,j)=>x.classList.toggle("active",j<rating));}));
 const form=document.querySelector("#review-form"),status=document.querySelector("[data-submit-status]");
 form?.addEventListener("submit",e=>{
  e.preventDefault();
  if(!rating){status.textContent="Please choose a rating.";return;}
  const fd=new FormData(form);
  const lines=[
   "JaMi Protect Community Feedback",
   `Language: ${form.dataset.locale||"en"}`,
   `Display name: ${fd.get("display_name")||"Anonymous"}`,
   `Email: ${fd.get("email")||"Not provided"}`,
   `Rating: ${fd.get("rating")} / 5`,
   `Title: ${fd.get("title")}`,
   "",
   String(fd.get("review")||""),
   "",
   `Would test/install: ${fd.get("would_test")}`
  ];
  location.href=`mailto:timmiejtwitch@gmail.com?subject=${encodeURIComponent("JaMi Protect - Community Review")}&body=${encodeURIComponent(lines.join("\n"))}`;
  status.textContent="Your mail app should open.";
 });
})();
