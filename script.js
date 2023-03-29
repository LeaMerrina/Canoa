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

  const itemsGrid = Array.from(document.getElementsByClassName('bloc-img'));

  itemsGrid.forEach(element => { 
    const r = gsap.utils.random(-30, 30)
    gsap.set(element, {rotation: r})
  });

  let root = document.documentElement;
  let _h = root.scrollHeight - (window.innerHeight/2);

  root.addEventListener("mousemove", e => {
    let xPercent = e.clientX / window.innerWidth * 100;
    let yPercent = e.clientY / window.innerHeight * 100;
    root.style.setProperty('--mouse-x', xPercent);
    root.style.setProperty('--mouse-y', yPercent);
  });

  window.addEventListener("scroll", (event) => {
      let scroll = Math.min(window.scrollY/_h, 1);
      root.style.setProperty('--scroll-y', scroll);
  });


});



