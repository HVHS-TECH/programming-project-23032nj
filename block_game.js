/***********************************************/
// block_game.js
// Written by Nia term 1 2026
// Block Breaker Game
/***********************************************/

//defining constants
const GAME_WIDTH = 650;
const GAME_HEIGHT = 700;
const BALL_DIAMETER = 30;
const PLATFORM_POSITION_X = GAME_WIDTH / 2;
const PLATFORM_POSITION_Y = GAME_HEIGHT - 70;
const PLATFORM_WIDTH = 130;
const PLATFORM_HEIGHT = 5;
const BLOCK_WIDTH = 65;
const BLOCK_HEIGHT = 30;
const WALL_DEPTH = 8;

//defining variables
let score = 0;
let blockRowColor = "#f3c1e0";
let colorArray = ['#febdb1', '#d6fda9', '#a8deff', "#F3C1E0"];
let spaceReturn = false;

let specialBlocks = [];

/*******************************************************/
// preload()
/*******************************************************/

function preload() {
  imgBall = loadImage('assets/images/ballimg.png');
}

/*******************************************************/
// setup()
/*******************************************************/

function setup() {
  console.log("running game");
  cnv = new Canvas(GAME_WIDTH, GAME_HEIGHT);
  world.gravity.y = 0;

  // ball code
  ball = new Sprite(PLATFORM_POSITION_X, PLATFORM_POSITION_Y - BALL_DIAMETER, BALL_DIAMETER, 'd');
  ball.color = '#c587dd';
  ball.image = (imgBall);
  imgBall.resize(BALL_DIAMETER + 5, BALL_DIAMETER + 5);

  //platform code
  platform = new Sprite(PLATFORM_POSITION_X, PLATFORM_POSITION_Y, PLATFORM_WIDTH, PLATFORM_HEIGHT, 'k');
  platform.color = '#698fe7';

  //running walls function
  walls();

  createSpecialBlocks();

  //blocks code
  blockCreate();

  // deleting blocks 
  blockDelete();

  //setup() finished
}

/*******************************************************/
// walls()
/*******************************************************/

function walls() {
  wallLeft = new Sprite(WALL_DEPTH / 2, height / 2, WALL_DEPTH, height, 'k');
  wallLeft.color = '#eb7184';

  wallRight = new Sprite(GAME_WIDTH - WALL_DEPTH / 2, height / 2, WALL_DEPTH, height, 'k');
  wallRight.color = '#eb7184';

  wallTop = new Sprite(width / 2, WALL_DEPTH / 2, width, WALL_DEPTH, 'k');
  wallTop.color = '#eb7184';

  wallBottom = new Sprite(width / 2, GAME_HEIGHT - WALL_DEPTH / 2, width, WALL_DEPTH, 'k');
  wallBottom.color = '#eb7184';
}


function createSpecialBlocks() {
  specialBlocks = [];
  for (var i = 0; i < 3; i++) {
    let specialBlock = {};
    specialBlock.row = Math.round(random(0, 3));
    specialBlock.column = Math.round(random(0, 6));
    specialBlocks.push(specialBlock);
  }
}

function getSpecialBlock(rowToCheck, columnToCheck) {
  for (var i = 0; i < specialBlocks.length; i++) {
    if (specialBlocks[i].row == rowToCheck && specialBlocks[i].column == columnToCheck) {
      return specialBlocks[i];
    }
  }
  return undefined;
}

/*******************************************************/
// blockCreate()
/*******************************************************/



function blockCreate() {
  blockGroup = new Group();
  for (var row = 0; row < 4; row++) {
    for (var i = 0; i < 7; i++) {
      var block = new Sprite(i * 80 + 83, row * 45 + 75, BLOCK_WIDTH, BLOCK_HEIGHT, 'k');
      let sb = getSpecialBlock(row, i);
      if (sb != undefined) {
        block.color = '#eb7184';
      } else {
        block.color = blockRowColor;
      }    
      block.row = row;
      block.column = i;
      blockGroup.add(block);
    }
    blockRowColor = colorArray[row];
  }
}

/*******************************************************/
// blockDelete()
/*******************************************************/

function blockDelete() {
  blockGroup.collides(ball, ballCollideBlock);

  function ballCollideBlock (block, ball) {
    block.remove();
    let specialBlock = getSpecialBlock(block.row, block.column)
    if (specialBlock != undefined) {
        score = score + 5;
      } else {
        score = score + 1;
      }
    console.log("Score: " + score);
    console.log("length: " + blockGroup.length);
    console.log(block.row);
  }
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
  background('#bfd7fa');

  //score display
  text('Score: ' + score, GAME_WIDTH - 150, 40);
  textSize(25);
  fill('#eb7184');

  //moving the platform
  if (kb.pressing('left')) {
    platform.vel.x = '-8';
  }
  else if (kb.pressing('right')) {
    platform.vel.x = '8';
  }

  if (kb.released('left')) {
    platform.vel.x = '0';
  }

  if (kb.released('right')) {
    platform.vel.x = '0';
  }

  if (platform.x >= GAME_WIDTH - PLATFORM_WIDTH / 2 - 5) {
    platform.x = GAME_WIDTH - PLATFORM_WIDTH / 2 - WALL_DEPTH;
  }

  if (platform.x < WALL_DEPTH + PLATFORM_WIDTH / 2) {
    platform.x = WALL_DEPTH + PLATFORM_WIDTH / 2;
  }

  //Once space is pressed ball starts moving
  if (kb.presses('space') && (spaceReturn == false)) {
    let ballVelocityX = random(-6, 6);

    ball.bounciness = 1;
    ball.vel.y = -6;
    ball.vel.x = ballVelocityX;
    ball.friction = 0;
    ball.drag = 0;
    spaceReturn = true;
  }

  //When all the blocks have been deleted
  if (blockGroup.length == 0) {
    createSpecialBlocks();
    blockCreate();
    blockDelete();
    console.log("block create run");
    platform.position.x = PLATFORM_POSITION_X;
    platform.position.y = PLATFORM_POSITION_Y;
    ball.position.x = PLATFORM_POSITION_X;
    ball.position.y = PLATFORM_POSITION_Y - BALL_DIAMETER;
    ball.vel.x = 0;
    ball.vel.y = 0;
    spaceReturn = false;
  }

  //Game ends when the ball hits the bottom
  ball.collides(wallBottom, functionGameEnd)

  function functionGameEnd(wallBottom, Ball) {
    ball.remove();
    platform.remove()
    console.log("Game over. You got " + score + " points.");
    gameEnd.style.display = "block";
  }

  //Endscreen code
  p_heading.textContent = "You lost!";
  p_score.textContent = "You got " + score + " points. Congratulations!!";
  p_replay.textContent = "To try again click 'retry' ";

  //End of draw loop
}

/***********************************************/
// Called by Nia OR End of block_game
/***********************************************/