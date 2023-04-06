function SeeMore() {
    document.querySelector("header").classList.toggle("openNav");
};

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


document.addEventListener("DOMContentLoaded", function () {


  document.getElementById("burger").onclick = function () {
    SeeMore();
  };

  let tt = document.querySelector("header").offsetHeight + "px";
  setTimeout(() => {
      document.documentElement.style.setProperty("--navHeight", tt);
  }, "1000");

  let heightHero = document.getElementById('header').offsetHeight;

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
    if (window.scrollY > heightHero) {
      document.getElementById('header').classList.add('small')
    } else {
      document.getElementById('header').classList.remove('small')
    }   
    if (img === 'night' && window.scrollY > heightHero) {
      document.getElementById('header').classList.add('night')
    } else {
      document.getElementById('header').classList.remove('night')
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

  txtShop.forEach(element => {
    element.addEventListener('mouseover', (e) => {
      if (currentElement) {
        gsap.to(currentElement, 0.2, {opacity: 0, overwrite: true});
      }
      let myId = e.currentTarget.getAttribute('id');
      gsap.to(`.${myId}`, 0.2, {opacity: 1, overwrite: true});
      currentElement = `.${myId}`;
      
    })
  })

});

