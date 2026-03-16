/***********************************************/
// block_game.js
// Written by Nia term 1 2026
// Block Breaker Game
/***********************************************/

//defining constants
const GAMEWIDTH = 650;
const GAMEHEIGHT = 700;
const BALLDIAMETER = 30;
const PLATFORMXPOSITION = GAMEWIDTH/2;
const PLATFORMYPOSITION = GAMEHEIGHT - 70;
const PLATFORMWIDTH = 130;
const PLATFORMHEIGHT = 5;
const BLOCKWIDTH = 65;
const BLOCKHEIGHT = 30;
const WALLDEPTH = 8;

//defining variables
let score = 0;
let blockRowColor = "#f3c1e0";
let colorArray = ['#febdb1', '#d6fda9', '#a8deff'];

/*******************************************************/
// preload()
/*******************************************************/

function preload() {
imgBall = loadImage('../assets/images/ballimg.png');
}	

/*******************************************************/
// setup()
/*******************************************************/

function setup() {
console.log("running game");
cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
world.gravity.y = 0;

//defining variables within setup
randNum = random(10, GAMEWIDTH - 10);

//running walls function
walls() 

// ball code
ball = new Sprite(GAMEWIDTH/2, PLATFORMYPOSITION - BALLDIAMETER, BALLDIAMETER,'d');
ball.color = '#c587dd';
ball.image = (imgBall);
imgBall.resize(BALLDIAMETER, BALLDIAMETER);

//platform code
platform = new Sprite(PLATFORMXPOSITION, PLATFORMYPOSITION, PLATFORMWIDTH, PLATFORMHEIGHT, 'k');
platform.color = '#698fe7';

//blocks code
blockCreate ()

// deleting blocks 
blockGroup.collides(ball, func2Call);

function func2Call(block, ball) {
block.remove();
score = score + 1;
console.log(score);
} 

//setup() finished
}

/*******************************************************/
// walls()
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
// blockCreate()
/*******************************************************/

function blockCreate () {
 blockGroup = new Group();
 for (var row = 0; row < 4; row++) {
   for (var i = 0; i < 7; i++) {
     var block = new Sprite(i*80 + 80, row*45 + 75, BLOCKWIDTH, BLOCKHEIGHT, 'k');
     block.color = blockRowColor;
     blockGroup.add(block);
    }
   blockRowColor = colorArray[row];
 }
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {		
background ('#bfd7fa');

//score display
text(score, GAMEWIDTH - 50 , 40 );
textSize(30);
fill('#eb7184');

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

//Once space is pressed
if (kb.presses('space')) {
ball.bounciness = 1;
ball.vel.y = -5;
ball.friction = 0;
ball.drag = 0;
}

//Game ends when the ball hits the bottom
ball.collides (wallBottom, functionGameEnd) 

function functionGameEnd (wallBottom, Ball) {
 ball.remove();
 console.log("Game over. You got " + score + " points.");
 containerEnd.style.display = "block";
}

//When all the blocks have been deleted
if (blockGroup.length = 0) {
 blockCreate () 
}

//Endscreen code
p_heading.textContent = "You lost!";
p_score.textContent = "You got " + score + " points. Congratulations";
p_replay.textContent = "To try again click 'retry' ";


//End of draw loop
}

/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/