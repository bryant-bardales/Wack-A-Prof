const scoreDisplay = document.querySelector('.score');//Score Display
const desks = document.querySelectorAll('.desk');//Desk image
const prof = document.querySelectorAll('.prof');//Prof 1 image
const prof2 = document.querySelectorAll('.prof2');//Prof 2 image
const prof3 = document.querySelectorAll('.prof3');//Prof 3 image
const prof4 = document.querySelectorAll('.prof4');//Prof 4 image

let lastDesk; //
let endTime; //
let scr = 0;//Inital score set to 0

var mySong = document.getElementById("music");//Song that plays when the game is being played.

//Function to get a random amount of time in milliseconds
function randTime(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
}

//Returns a random desk DOM element
function randDesk(desks) {
  const i = Math.floor(Math.random() * desks.length);
  const desk = desks[i];
  if (desk === lastDesk) {
    return randDesk(desks);
  }
  lastDesk = desk;
  return desk;
}

//Function that allows the image to "pop up"
function popOut() {
  const time = randTime(200, 1000);
  const desk = randDesk(desks);
  desk.classList.add('up');
  setTimeout(() => {
    desk.classList.remove('up');
    if (!endTime) popOut();
  }, time);
}

//Function that initializes the game when start is pressed. 
function gameStart() {
  scoreDisplay.textContent = 0; //Score display is at zero
  endTime = false;
  scr = 0;//Score is 0
  popOut();//Images starts to "pop up"
  setTimeout(() => endTime = true, 60000)
}

function gameEnd(){
  window.alert("You won the game!")
}

//Function makes the image go down when clicked on. 
function whack(e) {
  if(!e.isTrusted) return; 
  scr++;
  this.parentNode.classList.remove('up');
  scoreDisplay.textContent = scr;
}

function gameWin(){
 if (scr === 30)
 {
   clearInterval(scr);
   gameEnd();
 }

}

//Allows for the user to click on the image that "pops up" and as a result the image will go down. 
prof.forEach(prof => prof.addEventListener('click', whack));
prof2.forEach(prof2 => prof2.addEventListener('click', whack));
prof3.forEach(prof3 => prof3.addEventListener('click', whack));
prof4.forEach(prof4 => prof4.addEventListener('click', whack));

//Automatically plays the music on website load
//Also sets volume automatically
window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

//Play and pause function for the music. 
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