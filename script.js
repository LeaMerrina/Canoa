const nav = document.querySelector("nav");
const burger = document.getElementById("burger");


function addZero(i) {
  if (i < 10) {
      i = "0" + i
  }
  return i;
};

const date = new Date();
let hours = addZero(date.getHours());
let minutes = addZero(date.getMinutes());
let seconds = addZero(date.getSeconds())
let time = `${hours}:${minutes}:${seconds}`;

let img;

let mode = '';

const params = [
  {
      image: 'sunset',
      start: '17:00:00',
      end: '20:59:59'
  },
  {
      image: 'night',
      start: '21:00:00',
      mode: 'blanc',
      end: '23:59:59'
  },
  {
      image: 'night',
      start: '00:00:00',
      mode: 'blanc',
      end: '07:59:59'
  } 
];

function setHeaderBackground(color) {
  document.getElementById("header").style.backgroundColor = color;
};

function isAtTop() {
  return window.pageYOffset === 0;
};


document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("openNav");
    if (document.querySelector("nav").classList.contains("openNav")) {
      setHeaderBackground("rgba(255, 255, 255, 0.7)");
    } else {
      setHeaderBackground("transparent");
    }
  });

  const navLinks = document.querySelectorAll(".openNav .center-nav a");
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      document.querySelector("nav").classList.remove("openNav");
      setNavBackground("transparent");
    });
  };

  let tt = document.querySelector("header").offsetHeight + "px";
  setTimeout(() => {
      document.documentElement.style.setProperty("--navHeight", tt);
  }, "1000");
  
  

  let heightHero = document.querySelector("header").offsetHeight;

  function displayMode(mode){
    document.querySelector('body').classList.toggle(mode);
};

  function displayImage(img) {
      const picture = document.getElementById('picture');
      picture.innerHTML = `
        <picture>
          <source srcset="assets/photos/${img}-small.jpg" media="(max-width: 700px)">
          <img src="assets/photos/${img}-default.jpg" alt="${img}">
        </picture>
      `;
  };

  for (let index = 0; index < params.length; index++) {
      const element = params[index];
      const startTime = new Date(`01/01/2023 ${element.start}`);
      const endTime = new Date(`01/01/2023 ${element.end}`);
      const currentTime = new Date(`01/01/2023 ${time}`);
      if(currentTime >= startTime && currentTime <= endTime){
          img = element.image;
          mode = element.mode;
          displayMode(mode);
          displayImage(img);
          break;
      }
  };


  if(!img){
      img = 'day'
  };

  let lastScrollValue = 0; 
  const header = document.getElementById("header");

  
  document.addEventListener('scroll',() => {
		let top  = document.documentElement.scrollTop;
    if(lastScrollValue < top) {
    	header.classList.add("hidden");
    } else {
    	header.classList.remove("hidden");
    }
    lastScrollValue = top;
    if (window.scrollY > heightHero) {
      document.getElementById('header').classList.add('small');
    } else {
      document.getElementById('header').classList.remove('small');
    }   
    if (isAtTop()) {
      setHeaderBackground("transparent");
    } else {
      setHeaderBackground("rgba(255, 255, 255, 0.7)");
    }
  });




  const itemsGrid = Array.from(document.getElementsByClassName('bloc-img'));

  itemsGrid.forEach(element => { 
    const r = gsap.utils.random(-10, 10)
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

  const txtShop = Array.from(document.getElementsByClassName('txt-shop'));
  let currentElement;
  let currentTarget;

  if (window.matchMedia("(min-width: 1180px)").matches) {
    txtShop.forEach(element => {
      element.addEventListener('mouseover', (e) => {
        if (currentElement) {
          gsap.to(currentElement, 0.2, {opacity: 0, overwrite: true});
          gsap.to(currentTarget, 0.2, {opacity: 0.5, overwrite: true})
  
        }
        let myId = e.currentTarget.getAttribute('id');
        currentTarget = e.currentTarget;
        gsap.to(`.${myId}`, 0.2, {opacity: 1, overwrite: true});
        gsap.to(currentTarget, 0.2, {opacity: 1, overwrite: true});
        currentElement = `.${myId}`;
      })
  
    });
  };


  if (window.matchMedia("(max-width: 540px)").matches) {
    document.getElementsByClassName('third-img')[0].classList.add('global-padding');

  };
});

