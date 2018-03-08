var numSquares = 6;
var colors = [];
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var allBtns = document.querySelectorAll("button");
var whoSelected=modeButtons[1];
var steelblueColor = "steelblue";

init();

function init(){
	setupModeBtn();
	setupSquares();
	btnHover();
	reset();
}
function setupModeBtn(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			// modeButtons[0].classList.remove("selected")
			// modeButtons[1].classList.remove("selected")
			// this.classList.add("selected");
			if (this === modeButtons[0]) {
				whoSelected=modeButtons[0];
				modeButtons[0].style.backgroundColor = steelblueColor;
				modeButtons[0].style.color = "white";
				modeButtons[1].style.backgroundColor = "white";
				modeButtons[1].style.color = steelblueColor;
				resetButton.style.color = "steelblue";
			}else{
				whoSelected=modeButtons[1];
				modeButtons[0].style.backgroundColor = "white";
				modeButtons[0].style.color = steelblueColor;
				modeButtons[1].style.backgroundColor = steelblueColor;
				modeButtons[1].style.color = "white";
				resetButton.style.color = "steelblue";
			};
			
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}
function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!"
				messageDisplay.style.color = clickedColor;
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			}else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
				messageDisplay.style.color = "red";
			}
		});
	}
}
function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	for (var i = 0; i < modeButtons.length; i++) {
		if (whoSelected === modeButtons[i]) {
			modeButtons[i].style.backgroundColor = "steelblue";
		}else{
			modeButtons[i].style.color = "steelblue";
		}
	}
	steelblueColor = "steelblue";
}

resetButton.addEventListener("click",function(){
	//generate all new colors
	this.style.backgroundColor = "steelblue";
	reset();
	
});

function changeColor(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
	for (var i = 0; i < allBtns.length; i++) {
		if (whoSelected === allBtns[i]) {
			allBtns[i].style.backgroundColor = color;
		}else{
			allBtns[i].style.color = color;
		}

		steelblueColor = color;
	}
}
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	};
	//return that array
	return arr;
}
function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	//make rgb
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
function btnHover(){
	for (var i = 0; i < allBtns.length; i++) {
		allBtns[i].addEventListener("mouseover", function(){
			this.style.backgroundColor = steelblueColor;
			this.style.color = "white";
		});
		allBtns[i].addEventListener("mouseout", function(){
			isHover = true;
			if (whoSelected !== this) {
				this.style.backgroundColor = "white";
				this.style.color = steelblueColor;
			}
			
		});
	}
}