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

let blockCreateRound = -4;
let spaceReturn = false;

let powerUpBlocks = [];

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

  // creating ball code
  ball = new Sprite(PLATFORM_POSITION_X, PLATFORM_POSITION_Y - BALL_DIAMETER, BALL_DIAMETER, 'd');
  ball.color = '#c587dd';
  ball.image = (imgBall);
  imgBall.resize(BALL_DIAMETER + 5, BALL_DIAMETER + 5);

  //creating platform code
  platform = new Sprite(PLATFORM_POSITION_X, PLATFORM_POSITION_Y, PLATFORM_WIDTH, PLATFORM_HEIGHT, 'k');
  platform.color = '#698fe7';

  //running creating walls function
  walls();

  //running creating power up blocks function 
  createPowerUpBlocks();

  //running creating blocks function
  blockCreate();

  //running block hit function
  blockHit();

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

/*******************************************************/
// createPowerUpBlocks()
/*******************************************************/

function createPowerUpBlocks() {
  powerUpBlocks = [];
  while (powerUpBlocks.length < 3) {
    let row = Math.round(random(0, 3));
    let column = Math.round(random(0, 6));

    let existingPowerBlock = getPowerUpBlock(row, column);
    if (existingPowerBlock == undefined) {

      let powerUpBlock = {}
      powerUpBlock.row = row;
      powerUpBlock.column = column;
      powerUpBlocks.push(powerUpBlock); 
    } else {
      console.log('There is already a power block at', row, column)
    }
  }
}

/*******************************************************/
// getPowerUpBlock()
/*******************************************************/

function getPowerUpBlock(rowToCheck, columnToCheck) {
  for (var i = 0; i < powerUpBlocks.length; i++) {
    if (powerUpBlocks[i].row == rowToCheck && powerUpBlocks[i].column == columnToCheck) {
      return powerUpBlocks[i];
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
    for (var column = 0; column < 7; column++) {
      var block = new Sprite(column * 80 + 83, row * 45 + 75, BLOCK_WIDTH, BLOCK_HEIGHT, 'k');
      let powerUpCheck = getPowerUpBlock(row, column);
      if (powerUpCheck != undefined) {
        block.color = '#bc8dfd';
      } else {
        block.color = blockRowColor;
      }    
      block.row = row;
      block.column = column;
      blockGroup.add(block);
    }
    blockRowColor = colorArray[row];
  }
  blockCreateRound = blockCreateRound - 1;
  console.log(powerUpBlocks[0]);
  console.log(powerUpBlocks[1]);
  console.log(powerUpBlocks[2]);
}

/*******************************************************/
// blockHit()
/*******************************************************/

function blockHit() {
  blockGroup.collides(ball, ballCollideBlock);

  function ballCollideBlock (block, ball) {
    block.remove();
    let powerUpBlock = getPowerUpBlock(block.row, block.column)
    if (powerUpBlock != undefined) {
        score = score + 5;
      } else {
        score = score + 1;
      }
  }
}

/*******************************************************/
// functionGameEnd()
/*******************************************************/

  function functionGameEnd(wallBottom, Ball) {
    ball.remove();
    platform.remove()
    //Not removing blockGroup so that powerUpBlocks don't recreate
    blockCreateRound = 0;
    console.log("Game over. You got " + score + " points.");
    console.log(blockGroup.length);
    gameEnd.style.display = "block";
  }

/*******************************************************/
// draw()
/*******************************************************/
function draw() {

  background('#bfd7fa');

  //displaying the score
  text('Score: ' + score, GAME_WIDTH - 150, 40);
  textSize(25);
  fill('#eb7184');

  //creating platform movement
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

  //creating platform limits
  if (platform.x >= GAME_WIDTH - PLATFORM_WIDTH / 2 - 5) {
    platform.x = GAME_WIDTH - PLATFORM_WIDTH / 2 - WALL_DEPTH;
  }

  if (platform.x < WALL_DEPTH + PLATFORM_WIDTH / 2) {
    platform.x = WALL_DEPTH + PLATFORM_WIDTH / 2;
  }

  //At the start of eachb round, when space is pressed ball starts moving
  if (kb.presses('space') && (spaceReturn == false)) {
    let ballVelocityX = random(-6, 6);
    ball.bounciness = 1;
    ball.vel.y = blockCreateRound -0.5;
    ball.vel.x = ballVelocityX;
    ball.friction = 0;
    ball.drag = 0;
    spaceReturn = true;
  }

  //When all the blocks have been hit
  if (blockGroup.length == 0) {
    //recreate the blocks
    createPowerUpBlocks();
    blockCreate();
    blockHit();

    //reset the ball and platform
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



  //Setting up endscreen text
  p_heading.textContent = "You lost!";
  p_score.textContent = "You got " + score + " points. Congratulations!!";
  p_replay.textContent = "To try again click 'retry' ";

  //End of draw loop
}

/***********************************************/
// End of block_game
/***********************************************/