// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 532;
document.body.appendChild(canvas);
var goblin1kill=false;
var goblin2kill=false;
var goblin3kill=false;
var sound1 = new Audio("Sounds/firstblood.wav");
var sound2 = new Audio("Sounds/Double_Kill.wav");
var sound3 = new Audio("Sounds/triple_kill.wav");
var sound4 = new Audio("Sounds/UltraKill.wav");
var sound5 = new Audio("Sounds/Rampage.wav");
var sound6 = new Audio("Sounds/MegaKill.wav");
var sound7 = new Audio("Sounds/Killing_Spree.wav");
var sound8 = new Audio("Sounds/Unstoppable.wav");
var sound10 = new Audio("Sounds/GodLike.wav");
var sound9 = new Audio("Sounds/Dominating.wav");
var theme = new Audio("Sounds/theme.mp3");
var kierunek = "p";
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";
var pasekReady = false;
var pasekImage = new Image();
pasekImage.onload = function () {
	pasekReady = true;
};
pasekImage.src = "images/pasek.png";
// Audio w tle i złapanie goblina
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//Życie hero
var lifeReady = false;
var lifeImage = new Image();
lifeImage.onload = function () {
	lifeReady = true;
};
lifeImage.src = "images/life.png";

// Monster image
var monsterReady1 = false;
var monsterImage1 = new Image();
monsterImage1.onload = function () {
	monsterReady1 = true;
};
monsterImage1.src = "images/monster.png";

//Monster drugi

var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
	monsterReady2 = true;
};
monsterImage2.src = "images/monster2.png";

//Monster trzeci

var monsterReady3 = false;
var monsterImage3 = new Image();
monsterImage3.onload = function () {
	monsterReady3 = true;
};
monsterImage3.src = "images/monster3.png";

// Game objects
var hero = {
	speed: 100 // movement in pixels per second
};
var monster1 = {};
var mon={};
var monster2 = {};
var mon2={};
var monster3 = {};
var mon3={};
var monstersCaught = 0;
var monstersCaughtInRound = 0;
var round = 1;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	// Throw the monster somewhere on the screen randomly
	// Monster 1
	monster1.x = 32 + (Math.random() * (445 - 64));
	monster1.y = 32 + (Math.random() * (415 - 64));
	mon.x=monster1.x;
	mon.y=monster1.y;
	// Monster 2
	monster2.x = 32 + (Math.random() * (445 - 64));
	monster2.y = 32 + (Math.random() * (415 - 64));
	mon2.x=monster2.x;
	mon2.y=monster2.y;
	// Monster 3
	monster3.x = 32 + (Math.random() * (445 - 64));
	monster3.y = 32 + (Math.random() * (415 - 64));
	mon3.x=monster3.x;
	mon3.y=monster3.y;
	// Resetting the time left in a round
};
var goblinsCaught = 3;
//Złapanie goblina
var goblinCaught = function() {
	++monstersCaught;
	if(monstersCaught==1)
	{
		sound1.play();
	}
	if(monstersCaught==2)
	{
		sound1.stop;
		sound2.play();
	}
	if(monstersCaught==3)
	{
		sound2.stop;
		sound3.play();
	}
	if(monstersCaught==4)
	{
		sound3.stop;
		sound4.play();
	}
	if(monstersCaught==5)
	{
		sound4.stop;
		sound5.play();
	}
	if(monstersCaught==7)
	{
		sound5.stop;
		sound6.play();
	}
	if(monstersCaught==9)
	{
		sound6.stop;
		sound7.play();
	}
	if(monstersCaught==10)
	{
		sound7.stop;
		sound8.play();
	}
	if(monstersCaught==12)
	{
		sound8.stop;
		sound9.play();
	}
	if(monstersCaught>=15)
	{
		sound9.stop;
		sound10.play();
	}
		keysDown[999]=true;
		setTimeout(function(){ delete keysDown[999]; }, 200);
		--goblinsCaught;
		
};
var doszedl=false;
var doszedl2=false;
var doszedl3=true;
var l,l2;
var l3=6;
// Update game objects
var update = function (modifier) {
	if(38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown || 32 in keysDown)
	{
		
			if (38 in keysDown) { // Player holding up
				if(hero.y <=35)
				{
					heroImage.src = "images/heroup.png";
				}else
				{
					heroImage.src = "images/heroup.png";
					hero.y -= hero.speed * modifier;
					
				}
			}
			if (40 in keysDown) { // Player holding down
				if(hero.y >=415)
				{
					heroImage.src = "images/hero0.png";
				}else
					{
						heroImage.src = "images/hero0.png";
					hero.y += hero.speed * modifier;
					
					}
			}
			if (37 in keysDown) { // Player holding left
			if(hero.x <= 35)
			{
				heroImage.src = "images/heroright.png";
			}else
			{	
				kierunek="r";
				heroImage.src = "images/heroright.png";
				hero.x -= hero.speed * modifier;
					
			}
			}
			if (39 in keysDown) { // Player holding right
			if(hero.x>= 445)
			{
				heroImage.src = "images/heroleft.png";
			}else
				{
					kierunek="l";
				heroImage.src = "images/heroleft.png";
				hero.x += hero.speed * modifier;
					
				}
			}
			if(32 in keysDown){
				if(kierunek=="l")
				{
					heroImage.src = "images/heroleftatk.png";
				}
				if(kierunek=="r")
				{
					heroImage.src = "images/herorightatk.png";
				}
				
			}
		
			
	}else
	{heroImage.src = "images/hero00.png";}
	// Monsters running away kekek
	if(doszedl)
	{
		if(l>=1&&l<5)
		{
			if(monster1.x>=mon.x-20&&monster1.x>=35)
		{
			monsterImage1.src = "images/monsterleft.png";
			monster1.x -= 20 * modifier;
		}else{
		doszedl=false;
		l = Math.floor((Math.random() * 10) + 1);
		}
		}else{
			if(monster1.y>=mon.y-20&&monster1.y>=35)
		{
			monsterImage1.src = "images/monsterup.png";
			monster1.y -= 20 * modifier;
		}else{
		doszedl=false;
		l = Math.floor((Math.random() * 10) + 1);
		}
		}
	}else
	{
		
		if(l>=1&&l<5)
		{
			if(monster1.x<= mon.x+20&&monster1.x<=445)
			{
				monsterImage1.src = "images/monsterright.png";
				monster1.x += 20 * modifier;
			}else{
				doszedl=true;
				l = Math.floor((Math.random() * 10) + 1);
			}
		}else{
			if(monster1.y<= mon.y+20&&monster1.y<=415)
			{
				monsterImage1.src = "images/monsterdown.png";
				monster1.y += 20 * modifier;
			}else{
				doszedl=true;
				l = Math.floor((Math.random() * 10) + 1);
			}
		}
		
	}
	
	if(doszedl2)
	{
		if(l2>=1&&l2<5)
		{
			if(monster2.x>=mon2.x-20&&monster2.x>=35)
		{
			monsterImage2.src = "images/monsterleft2.png";
			monster2.x -= 20 * modifier;
		}else{
		doszedl2=false;
		l2 = Math.floor((Math.random() * 10) + 1);
		}
		}else{
			if(monster2.y>=mon2.y-20&&monster2.y>=35)
		{
			monsterImage2.src = "images/monsterup2.png";
			monster2.y -= 20 * modifier;
		}else{
		doszedl2=false;
		l2 = Math.floor((Math.random() * 10) + 1);
		}
		}
	}else
	{
		
		if(l2>=1&&l2<5)
		{
			if(monster2.x<= mon2.x+20&&monster2.x<=445)
			{
				monsterImage2.src = "images/monsterright2.png";
				monster2.x += 20 * modifier;
			}else{
				doszedl2=true;
				l2 = Math.floor((Math.random() * 10) + 1);
			}
		}else{
			if(monster2.y<= mon2.y+20&&monster2.y<=415)
			{
				monsterImage2.src = "images/monsterdown2.png";
				monster2.y += 20 * modifier;
			}else{
				doszedl2=true;
				l2 = Math.floor((Math.random() * 10) + 1);
			}
		}
		
	}
		if(doszedl3)
	{
		if(l3>=1&&l3<5)
		{
			if(monster3.x>=mon3.x-20&&monster3.x>=35)
		{
			monsterImage3.src = "images/monsterleft3.png";
			monster3.x -= 20 * modifier;
		}else{
		doszedl3=false;
		l3 = Math.floor((Math.random() * 10) + 1);
		}
		}else{
			if(monster3.y>=mon3.y-20&&monster3.y>=35)
		{
			monsterImage3.src = "images/monsterup3.png";
			monster3.y -= 20 * modifier;
		}else{
		doszedl3=false;
		l3 = Math.floor((Math.random() * 10) + 1);
		}
		}
	}else
	{
		
		if(l3>=1&&l3<5)
		{
			if(monster3.x<= mon3.x+20&&monster3.x<=445)
			{
				monsterImage3.src = "images/monsterright3.png";
				monster3.x += 20 * modifier;
			}else{
				doszedl3=true;
				l3 = Math.floor((Math.random() * 10) + 1);
			}
		}else{
			if(monster3.y<= mon3.y+20&&monster3.y<=415)
			{
				monsterImage3.src = "images/monsterdown3.png";
				monster3.y += 20 * modifier;
			}else{
				doszedl3=true;
				l3 = Math.floor((Math.random() * 10) + 1);
			}
		}
		
	}
	// Are they touching?
	if (
		hero.x <= (monster1.x + 32)
		&& monster1.x <= (hero.x + 50)
		&& hero.y <= (monster1.y + 32)
		&& monster1.y <= (hero.y + 50)
	) {
		// If they're touching move them away from the map TODO: adding and deleting numerous of monsters
		goblinCaught();
		monster1.y = -100;
		monster1.x = -100;
		goblin1kill=true;
	}
	if (
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 50)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 50)
	) {
		goblinCaught();
		monster2.y = -100;
		monster2.x = -100;
		goblin2kill=true;
	}
	if (
		hero.x <= (monster3.x + 32)
		&& monster3.x <= (hero.x + 50)
		&& hero.y <= (monster3.y + 32)
		&& monster3.y <= (hero.y + 50)
	) {
		goblinCaught();
		monster3.y = -100;
		monster3.x = -100;
		goblin3kill=true;
	}
	goblinsCaught
	// if all monsters are caught round is completed
	if(goblinsCaught==1)
	{
		if(goblin1kill==true)
		{
			monster1.x = 32 + (Math.random() * (canvas.width - 64));
			monster1.y = 32 + (Math.random() * (canvas.height - 64));
			goblinsCaught=3;
			goblin1kill=false;
		}
		if(goblin2kill==true)
		{
			monster2.x = 32 + (Math.random() * (canvas.width - 64));
			monster2.y = 32 + (Math.random() * (canvas.height - 64));
			goblinsCaught=3;
			goblin2kill=false;
		}
		if(goblin3kill==true)
		{
			monster3.x = 32 + (Math.random() * (canvas.width - 64));
			monster3.y = 32 + (Math.random() * (canvas.height - 64));
			goblinsCaught=3;
			goblin3kill=false;
		}
		
	}
};
var utratazycia = function(){
	ilo--;
}
var ilo=3;
var currentFrame=0;
// Draw everything
var render = function () {
	//drawing map 
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (pasekReady) {
		ctx.drawImage(pasekImage, 0, 480);
	}
	if (lifeReady) {
	if(ilo==3){
		ctx.drawImage(lifeImage, 9, 490);
		ctx.drawImage(lifeImage, 54, 490);
		ctx.drawImage(lifeImage, 98, 490);
	}
	if(ilo==2){
		ctx.drawImage(lifeImage, 9, 490);
		ctx.drawImage(lifeImage, 54, 490);
	}
	if(ilo==1){
		ctx.drawImage(lifeImage, 9, 490);
	}
	}
	
	// drawing hero onto map
	if (heroReady) {
		if (38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown ) {
            if(currentFrame>=0&&currentFrame<2)
			{
				ctx.drawImage(heroImage, 32, 0 , 32, 32, hero.x, hero.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=2&&currentFrame<4)
			{
				ctx.drawImage(heroImage, 64, 0 , 32, 32, hero.x, hero.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=4&&currentFrame<6)
			{
				ctx.drawImage(heroImage, 0, 0 , 32, 32, hero.x, hero.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>6)
			{
				currentFrame=0;
			}
			
		}
		else{
			ctx.drawImage(heroImage, 0, 0 , 31, 31, hero.x, hero.y, 31, 31);
		}
				
		
	}
	// drawing monsters onto map
	if (monsterReady1) {
		if(currentFrame>=0&&currentFrame<2)
			{
				ctx.drawImage(monsterImage1, 0, 0 , 23, 32, monster1.x, monster1.y, 23, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=2&&currentFrame<4)
			{
				ctx.drawImage(monsterImage1, 24, 0 , 23, 32, monster1.x, monster1.y, 23, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=4&&currentFrame<6)
			{
				ctx.drawImage(monsterImage1, 47, 0 , 23, 32, monster1.x, monster1.y, 23, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>6)
			{
				currentFrame=0;
			}
	}
	if (monsterReady2) {
		if(currentFrame>=0&&currentFrame<2)
			{
				ctx.drawImage(monsterImage2, 0, 0 , 32, 32, monster2.x, monster2.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=2&&currentFrame<4)
			{
				ctx.drawImage(monsterImage2, 32, 0 , 32, 32, monster2.x, monster2.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=4&&currentFrame<6)
			{
				ctx.drawImage(monsterImage2, 62, 0 , 32, 32, monster2.x, monster2.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>6)
			{
				currentFrame=0;
			}
	}
	if (monsterReady3) {
		if(currentFrame>=0&&currentFrame<2)
			{
				ctx.drawImage(monsterImage3, 0, 0 , 32, 32, monster3.x, monster3.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=2&&currentFrame<4)
			{
				ctx.drawImage(monsterImage3, 32, 0 , 32, 32, monster3.x, monster3.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>=4&&currentFrame<6)
			{
				ctx.drawImage(monsterImage3, 64, 0 , 32, 32, monster3.x, monster3.y, 32, 32);
				currentFrame+=0.1;
			}
			if(currentFrame>6)
			{
				currentFrame=0;
			}
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	theme.play();
	
	update(delta / 1000);
	render();
	
	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

