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

//defining variables
let score = 0;
let blockRandomColor = "pink";

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
console.log("running game");

cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
world.gravity.y = 0;


//defining variables
randNum = random(0, 800);

//running walls function
walls() 

/*******************************************************/
// ball code
/*******************************************************/
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
blockCreate ()

// deleting blocks 
blockGroup.collides(ball, func2Call);

function func2Call(block, ball) {
block.remove();
score = score + 1;
console.log(score);
} 

//Setup finished
}

/*******************************************************/
// functions code
/*******************************************************/

// creating walls function
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

// creating blocks function
function blockCreate () {
 blockGroup = new Group();
 for (var row = 0; row < 4; row++) {
  for (var i = 0; i < 7; i++) {
    var block = new Sprite(i*100 + 50, row*45 + 75, BLOCKWIDTH, BLOCKHEIGHT, 'k');
    block.color = blockRandomColor;
    blockGroup.add(block);
   }
 blockRandomColor = color(random(255), random(255), random(255))
 }
}


/*******************************************************/
// draw()
/*******************************************************/
function draw() {		
background ('#9cbef1');

//score display
text(score, GAMEWIDTH - 50 , 40 );

//moving the platform
if (kb.pressing('left')) {
platform.vel.x = '-10';
}
else if (kb.pressing ('right')) {
platform.vel.x = '10';
}

if (kb.released('left')) {
platform.vel.x = '0';
}

if (kb.released('right')) {
platform.vel.x = '0';
}

if (platform.x >= GAMEWIDTH - PLATFORMWIDTH/2 - 5) {
platform.x = GAMEWIDTH - PLATFORMWIDTH/2 - WALLDEPTH;
}

if (platform.x < WALLDEPTH + PLATFORMWIDTH/2) {
platform.x = WALLDEPTH + PLATFORMWIDTH/2;
}

//Game ends when the ball hits the bottom
ball.collides (wallBottom, functionGameEnd) 

function functionGameEnd (wallBottom, Ball) {
ball.remove();
console.log("Game over. You got points.");
}

//When all the blocks have been deleted
if (blockGroup.length = 0) {
blockCreate () 
}

//End of draw loop
}

/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/