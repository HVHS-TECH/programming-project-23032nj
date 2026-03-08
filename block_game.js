/***********************************************/
// block_game.js
// Written by Nia term 1 2026
// Block Breaker Game
/***********************************************/

//defining constants
const GAMEWIDTH = 700;
const GAMEHEIGHT = 800;

const BALLDIAMETER = 30;

const PLATFORMXPOSITION = 400;
const PLATFORMWIDTH = 130;
const PLATFORMHEIGHT = 10;

const BLOCKWIDTH = 75;
const BLOCKHEIGHT = 30;

const WALLDEPTH = 8;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
console.log("running game");

cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
world.gravity.y = 0;

//defining variables
randNum = random(0, 800);
let score = 0;

/*******************************************************/
// walls code
/*******************************************************/

walls() 

/*******************************************************/
// ball code
/*******************************************************/
randNum = random(0, 800);
ball = new Sprite(randNum, windowHeight/2, BALLDIAMETER,'d');
ball.color = '#c587dd';
ball.bounciness = 1;
ball.vel.y = 3;
ball.friction = 0;
ball.drag = 0;

/*******************************************************/
// platform code
/*******************************************************/
platform = new Sprite(PLATFORMXPOSITION, GAMEHEIGHT - 100, PLATFORMWIDTH, PLATFORMHEIGHT, 'k');
platform.color = '#698fe7';

/*******************************************************/
// blocks code (better name than blocks needed)
/*******************************************************/

blockGroup = new Group();
for (var row = 0; row < 4; row++) {
 for (var i = 0; i < 7; i++) {
    var block = new Sprite(i*100 + 50, row*45 + 50, BLOCKWIDTH, BLOCKHEIGHT, 'k');
    block.color = '#ffb6c1';
    blockGroup.add(block);

 }
}



/*******************************************************/
// deleting blocks 
/*******************************************************/
blockGroup.collides(ball, func2Call);

function func2Call(block, ball) {
block.remove();
score = score + 1;
console.log(score);
} 
}

/*******************************************************/
// wall function
/*******************************************************/
function walls () {
wallLeft  = new Sprite(WALLDEPTH/2, height/2, WALLDEPTH, height, 'k');
wallLeft.color = '#eb7184';

wallRight  = new Sprite(GAMEWIDTH - WALLDEPTH/2, height/2, WALLDEPTH, height, 'k');
wallRight.color = '#eb7184';

wallTop = new Sprite(width/2, WALLDEPTH/2, width, WALLDEPTH, 'k');
wallTop.color = '#eb7184';

wallBottom = new Sprite(width/2, GAMEHEIGHT - WALLDEPTH/2, width, WALLDEPTH, 'k');
wallBottom.color = '#eb7184';
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
}

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

//Game ends when the ball hits the bottom
ball.collides (wallBottom, functionBallDelete) 

function functionBallDelete (wallBottom, Ball) {
ball.remove();
}

}
/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/