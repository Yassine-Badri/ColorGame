// FUNCTIONS

//Generate random colors, fill into array, paint squares.
//Pick one of them as goal color
function newGame() {
  btnNewGame.setAttribute("disabled", "disabled");
  statusDisplay.textContent = "";
  colors = [];
  
  //Generate colors, assign them to squares
  for (var n = 0; n < noOfSquares; n++) {
    colors[n] = randomizeColor();
    squares[n].style.backgroundColor = colors[n];
  }
  
  //Hide/reveal sqaures according to selected game mode
  //  Colt's solution in "Creating the Color Game Pt.6" around the 09:30 mark is more elegant.
  //  It jsut checks if the "colors" array contains an item at that position.
  for (var m = 0; m < squares.length; m++) {
    if (m > noOfSquares - 1) {
      squares[m].classList.add("hidden");
    }
    else {
      squares[m].classList.remove("hidden");
    }
  }    
  
  goalColor = colors[randomize0toN(noOfSquares - 1)]; //Found bug here: Because of parameterised setup like this, if the highest random number is returned, goalColor becomes "undefined", making the game unwinnable
  goalDisplay.textContent = goalColor;
  document.querySelector("h1").style.backgroundColor = "rgb(51, 122, 183)";
  btnNewGame.textContent = strNewColors;
  btnNewGame.removeAttribute("disabled");
}

//Paint all remaining squares the same as the goal color
function winGame() {
  for (var i = 0; i < squares.length; i++) {
    statusDisplay.textContent = strCorrect;
    //My original logic: paint only the remaining sqaures to the goal color
    //if (squares[i].style.backgroundColor !== "transparent" || squares[i].style.backgroundColor === goalColor) {
    if (squares[i].style.backgroundColor !== goalColor) {
      squares[i].style.backgroundColor = goalColor;
    }
  }
  document.querySelector("h1").style.backgroundColor = goalColor;
  btnNewGame.textContent = strPlayAgain;
}

//Generate random RGB color by randomizing each color component
function randomizeColor() {
  var R = randomize0toN(255);
  var G = randomize0toN(255);
  var B = randomize0toN(255);
  return "rgb(" + R + ", " + G + ", " + B + ")";
}

//Adapted randomizer from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
function randomize0toN(max) {
  return Math.floor(Math.random() * (max + 1)); // +1 because it's exclusive of the number it's multiplied with
}

// INIT
var noOfSquares = 6;
var colors = [];
var goalColor;

var strTryAgain = "Try Again!";
var strCorrect = "Correct!";
var strNewColors = "New colors";
var strPlayAgain = "Play again?";

var squares = document.querySelectorAll(".square");
var goalDisplay = document.getElementById("goalDisplay");
var statusDisplay = document.getElementById("status");
var btnNewGame = document.getElementById("newGame");
var btnEasyMode = document.getElementById("easymode");
var btnHardMode = document.getElementById("hardmode");
var overlay = document.getElementById("overlay");

newGame();

//Event listeners
btnNewGame.addEventListener("click", function(){ newGame(); });

btnEasyMode.addEventListener("click", function(){ 
  if (!btnEasyMode.classList.contains("selected")) {
    btnEasyMode.classList.add("selected");
    btnHardMode.classList.remove("selected");
    noOfSquares = 3;
    newGame();
  }
});

btnHardMode.addEventListener("click", function(){ 
  if (!btnHardMode.classList.contains("selected")) {
    btnHardMode.classList.add("selected");
    btnEasyMode.classList.remove("selected");
    noOfSquares = 6;
    newGame();
  }
});

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function(){
    var clickedColor = this.style.backgroundColor;
    if (clickedColor === goalColor) {
      winGame(); 
    } 
    else {
      statusDisplay.textContent = strTryAgain;
      this.style.backgroundColor = "transparent";
    }
  });
}  

document.getElementById("help").addEventListener("click", function() {
  overlay.style.visibility = "visible";
  overlay.style.opacity = 1;
} );

document.getElementById("btnClose").addEventListener("click", function() {
  setTimeout(function(){ overlay.style.visibility = "hidden"; }, 500);
  overlay.style.opacity = 0;
  
} );
