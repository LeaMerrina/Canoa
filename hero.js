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

const params = [
    {
        image: 'sunset',
        start: '17:00:00',
        end: '20:59:59'
    },
    {
        image: 'night',
        start: '21:00:00',
        end: '23:59:59'
    },
    {
        image: 'night',
        start: '00:00:00',
        end: '07:59:59'
    } 
];

document.addEventListener("DOMContentLoaded", function () {

    function displayImage(img) {
        const picture = document.getElementById('picture');
        picture.innerHTML = `
          <picture>
            <source srcset="image/${img}-small.jpg" media="(max-width: 700px)">
            <img src="image/${img}-default.jpg" alt="${img}">
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
            displayImage(img);
            break;
        }
    };
    
    if(!img){
        img = 'jour'
    };



});