function SeeMore() {
    document.querySelector("header").classList.toggle("openNav");
};






document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("burger").onclick = function () {
    SeeMore();
  };

  let tt = document.querySelector("header").offsetHeight + "px";
  setTimeout(() => {
      document.documentElement.style.setProperty("--navHeight", tt);
  }, "1000");

  let header = document.getElementById("header");
  let lastScrollValue = 0; 

  
  document.addEventListener('scroll',() => {
		let top  = document.documentElement.scrollTop;
    if(lastScrollValue < top) {
    	header.classList.add("hidden");
    } else {
    	header.classList.remove("hidden");
    }
    lastScrollValue = top;
  });



});



