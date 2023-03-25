function SeeMore() {
    document.querySelector("header").classList.toggle("openNav");
};


document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("burger").onclick = function () {
    SeeMore();
  };

  setTimeout(() => {
      let tt = document.querySelector("header").offsetHeight + "px";
      document.documentElement.style.setProperty("--navHeight", tt);
  }, "1000");

  



});



