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
ball = new Sprite(randNum, windowHeight/2, 30,'d');
ball.color = '#c587dd';
ball.bounciness = 1;
ball.vel.y = 3;
ball.friction = 0;
ball.drag = 0;

/*******************************************************/
// platform code
/*******************************************************/
platform = new Sprite(400, 750, 130, 10, 'k');
platform.color = '#698fe7';

/*******************************************************/
// blocks code (better name than blocks needed)
/*******************************************************/

blockGroup = new Group();
for (var row = 0; row < 4; row++) {
 for (var i = 0; i < 8; i++) {
    var sprinkleBlock = new Sprite(i*100 + 50, row*45 + 50, 75, 30, 'k');
    sprinkleBlock.color = color(255, 182, 193);
    blockGroup.add(sprinkleBlock);

 }
}

/*******************************************************/
// deleting blocks 
/*******************************************************/
blockGroup.collides(ball, func2Call);

function func2Call(sprinkleBlock, ball) {
sprinkleBlock.remove();
score = score + 1;
console.log(score);
} 
}

/*******************************************************/
// wall function
/*******************************************************/
function walls () {
wallLeft  = new Sprite(4, height/2, 8, height, 'k');
wallLeft.color = '#8bf7bb';

wallRight  = new Sprite(796, height/2, 8, height, 'k');
wallRight.color = '#8bf7bb';

wallTop = new Sprite(width/2, 4, width, 8, 'k');
wallTop.color = '#8bf7bb';

wallBottom = new Sprite(width/2, windowHeight - 55, width, 8, 'k');
wallBottom.color = '#8bf7bb';
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