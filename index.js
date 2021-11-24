const scoreDisplay = document.querySelector('.score');//Score Display
const desks = document.querySelectorAll('.desk');//
const prof = document.querySelectorAll('.prof');
const prof2 = document.querySelectorAll('.prof2');
const prof3 = document.querySelectorAll('.prof3');
const prof4 = document.querySelectorAll('.prof4');

let lastDesk;
let endTime;
let scr = 0;

var mySong = document.getElementById("music");

function randTime(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
}

function randDesk(desks) {
  const i = Math.floor(Math.random() * desks.length);
  const desk = desks[i];
  if (desk === lastDesk) {
    return randDesk(desks);
  }
  lastDesk = desk;
  return desk;
}

function popOut() {
  const time = randTime(200, 1000);
  const desk = randDesk(desks);
  desk.classList.add('up');
  setTimeout(() => {
    desk.classList.remove('up');
    if (!endTime) popOut();
  }, time);
}
function gameStart() {
  scoreDisplay.textContent = 0;
  endTime = false;
  scr = 0;
  popOut();
  setTimeout(() => endTime = true, 60000)
}

function whack(e) {
  if(!e.isTrusted) return; 
  scr++;
  this.parentNode.classList.remove('up');
  scoreDisplay.textContent = scr;
}



prof.forEach(prof => prof.addEventListener('click', whack));
prof2.forEach(prof2 => prof2.addEventListener('click', whack));
prof3.forEach(prof3 => prof3.addEventListener('click', whack));
prof4.forEach(prof4 => prof4.addEventListener('click', whack));

//automatically plays the music on website load
//also sets volume automatically
window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

//Play and pause buttons
function plays(){
  if(mySong.paused){
    mySong.play();
    document.getElementById("button").innerHTML = "Pause Music";
  }
  else{
    mySong.pause();
    document.getElementById("button").innerHTML = "Play Music";
  }
}