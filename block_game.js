/***********************************************/
// block_game.js
// Written by Nia term 1 2026
// Block Breaker Game
/***********************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
console.log("running game");

cnv = new Canvas(800, windowHeight - 50);
world.gravity.y = 0;

/*******************************************************/
// ball code
/*******************************************************/
ball = new Sprite(400, 650, 60,'d');
ball.color = '#c587dd';
ball.bounciness = 0.7;
ball.vel.y = 1;
ball.friction = 0;
ball.drag = 0;

/*******************************************************/
// platform code
/*******************************************************/
platform = new Sprite(400, 750, 150, 10, 'k');
platform.color = '#698fe7';

/*******************************************************/
// blocks code (better name than blocks needed)
/*******************************************************/

for (var row = 0; row < 4; row++) {
 for (var i = 0; i < 10; i++) {
    var sprinkleBlock = new Sprite(i*80 + 40, row*45, 75, 30, 'k');
    sprinkleBlock.color = color(255, 182, 193);
 }
}





}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {		
background ('#9cbef1');

//check if it's possible to put into a function/organise better
if (kb.pressing('left')) {
platform.vel.x = '-10'
}
else if (kb.pressing ('right')) {
platform.vel.x = '10'
};

if (kb.released('left')) {
platform.vel.x = '0'
}

if (kb.released('right')) {
platform.vel.x = '0'
}

//check if the judder is ok and if making it rebound off would be better
if (platform.x > 725) {
platform.x = 724
}

if (platform.x < 75) {
platform.x = 76
}


}


/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/