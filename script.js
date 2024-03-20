const nav = document.querySelector("nav");
const burger = document.getElementById("burger");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const date = new Date();
let hours = addZero(date.getHours());
let minutes = addZero(date.getMinutes());
let seconds = addZero(date.getSeconds());
let time = `${hours}:${minutes}:${seconds}`;

let img;

let mode = "";

const params = [
  {
    image: "sunset",
    start: "17:00:00",
    end: "20:59:59",
  },
  {
    image: "night",
    start: "21:00:00",
    mode: "blanc",
    end: "23:59:59",
  },
  {
    image: "night",
    start: "00:00:00",
    mode: "blanc",
    end: "07:59:59",
  },
];

function setHeaderBgOpacity(opacity) {

  const r = document.querySelector(":root");

  if (mode === "blanc") {
    r.style.setProperty("--nav-bg", `rgba(0, 0, 0, ${opacity ?? 0.5})`);
  } else {
    r.style.setProperty("--nav-bg", `rgba(255, 255, 255, ${opacity ?? 0.2})`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("openNav");
    if (document.querySelector("nav").classList.contains("openNav")) {
      setHeaderBgOpacity(1);
    } else {
      setHeaderBgOpacity();
    }
  });

  function displayMode(mode) {
    const r = document.querySelector(":root");
    if (mode === "blanc") {
      r.style.setProperty("--nav-bg", "rgba(0, 0, 0, 0.5)");
    } else {
      r.style.setProperty("--nav-bg", "rgba(255, 255, 255, 0.2)");
    }
    document.querySelector("body").classList.toggle(mode);
  }

  function displayImage(img) {
    const picture = document.getElementById("picture");
    picture.innerHTML = `
        <picture>
          <source srcset="assets/photos/${img}-small.jpg" media="(max-width: 700px)">
          <img src="assets/photos/${img}-default.jpg" alt="${img}">
        </picture>
      `;
  }

  function setMode(param) {
    img = param.image;
    mode = param.mode;
    displayMode(mode);
    displayImage(img);
  }

  for (let index = 0; index < params.length; index++) {
    const param = params[index];
    const startTime = new Date(`01/01/2023 ${param.start}`);
    const endTime = new Date(`01/01/2023 ${param.end}`);
    const currentTime = new Date(`01/01/2023 ${time}`);
    if (currentTime >= startTime && currentTime <= endTime) {
      setMode(params[0]);
      break;
    }
  }

  if (!img) {
    img = "day";
  }

  const itemsGrid = Array.from(document.getElementsByClassName("bloc-img"));

  itemsGrid.forEach((element) => {
    const r = gsap.utils.random(-10, 10);
    gsap.set(element, { rotation: r });
  });

  const txtShop = Array.from(document.getElementsByClassName("txt-shop"));
  let currentElement;
  let currentTarget;

  function checkMediaQuery() {
    if (window.innerWidth > 1180) {
      txtShop.forEach((element) => {
        element.addEventListener("mouseover", (e) => {
          if (currentElement) {
            gsap.to(currentElement, 0.2, { opacity: 0, overwrite: true });
            gsap.to(currentTarget, 0.2, { opacity: 0.5, overwrite: true });
          }
          let myId = e.currentTarget.getAttribute("id");
          currentTarget = e.currentTarget;
          gsap.to(`.${myId}`, 0.2, { opacity: 1, overwrite: true });
          gsap.to(currentTarget, 0.2, { opacity: 1, overwrite: true });
          currentElement = `.${myId}`;
        });
      });
    }
  }

  checkMediaQuery();

  window.addEventListener("resize", checkMediaQuery);

  if (window.matchMedia("(max-width: 540px)").matches) {
    document
      .getElementsByClassName("third-img")[0]
      .classList.add("global-padding");
  }
});
