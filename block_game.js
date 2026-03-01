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
cnv = new Canvas(1600, 800);
world.gravity.y = 10;

ball = new Sprite(600, 100, 60,);
ball.color = '#698fe7';
ball.bounciness = 0.7;


platform = new Sprite(400, 750, 150, 10, 'k');
platform.color = '#698fe7';







}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {		
background ('#9cbef1');
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
}

/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/