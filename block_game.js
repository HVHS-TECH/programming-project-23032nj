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
let blockCreateRound = -4;
let spaceReturn = false;
let powerUpBlocks = [];

/*******************************************************/
//preload()
//Loading the image before the game starts
/*******************************************************/

function preload() {
  imgBall = loadImage('assets/images/ballimg.png');
}

/*******************************************************/
//setup()
//setting up the different elements (ball, platform, etc) and running the other functions 
/*******************************************************/

function setup() {

  console.log("running game");
  cnv = new Canvas(GAME_WIDTH, GAME_HEIGHT);
  world.gravity.y = 0;

  //creating ball code
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

  
} //setup() finished

/*******************************************************/
//walls()
//creating the wall sprites
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
//createPowerUpBlocks()
//creates power up blocks and pushes them to the array with a row and column position
/*******************************************************/

function createPowerUpBlocks() {
  //clear powerUpBlocks Array
  powerUpBlocks = [];
  //Push 3 different power up blocks to the array all in different positions
  while (powerUpBlocks.length < 3) {
    let row = Math.round(random(0, 3));
    let column = Math.round(random(0, 6));
 
    //using the gerPowerUpBlock function to check if existing powerUpBlock is in the right position
    let existingPowerBlock = getPowerUpBlock(row, column);
    //if it is in a correct position, push it to powerUpBlocks array 
    if (existingPowerBlock == undefined) {
      let powerUpBlock = {}
      powerUpBlock.row = row;
      powerUpBlock.column = column;
      powerUpBlocks.push(powerUpBlock); 
    }
  }
}

/*******************************************************/
//getPowerUpBlock()
//checks if the information given matches up with a power up blocks information (checking if what we have is a power up block)
/*******************************************************/

function getPowerUpBlock(rowToCheck, columnToCheck) {
  //checking if it's a power up block using position
  for (var i = 0; i < powerUpBlocks.length; i++) {
    if (powerUpBlocks[i].row == rowToCheck && powerUpBlocks[i].column == columnToCheck) {
      //if it is a power up block
      return powerUpBlocks[i];
    }
  }
  //if it isn't a power up block
  return undefined;
}

/*******************************************************/
//blockCreate()
//creating the normal blocks, assigning them positions and colours
/*******************************************************/

function blockCreate() {
  //define variables
  let blockRowColor = "#f3c1e0";
  let colorArray = ['#febdb1', '#d6fda9', '#a8deff', "#F3C1E0"];

  blockGroup = new Group();
  //we want a 7 by 4 grid of blocks
  for (var row = 0; row < 4; row++) {
    for (var column = 0; column < 7; column++) {
      //creating the blocks in the grid
      var block = new Sprite(column * 80 + 83, row * 45 + 75, BLOCK_WIDTH, BLOCK_HEIGHT, 'k');
      //check for power up blocks and colour them differently to the normal blocks
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
}

/*******************************************************/
//blockHit()
//when a block is hit adding to the score depending on if it's a normal or power up block and removing the block that was hit
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
//functionGameEnd()
//when the ball collides with the bottom wall, removing elements, resetting the game, and showing the end screen
/*******************************************************/

  function functionGameEnd(wallBottom, Ball) {
    ball.remove();
    platform.remove()
    blockCreateRound = 0;
    console.log("Game over. You got " + score + " points.");
    console.log(blockGroup.length);
    //revealing the endscreen
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

  //At the start of each round, when space is pressed ball starts moving
  if (kb.presses('space') && (spaceReturn == false)) {
    let ballVelocityX = random(-6, 6);
    ball.bounciness = 1;
    ball.vel.y = blockCreateRound -0.5;
    ball.vel.x = ballVelocityX;
    ball.friction = 0;
    ball.drag = 0;
    //We only want to be able to press space to move the ball once at the start
    spaceReturn = true;
  }

  //When all of the blocks have been hit
  if (blockGroup.length == 0) {
    //create a new grid of blocks and enable them to be hit and deleted
    createPowerUpBlocks();
    blockCreate();
    blockHit();

    //reset the ball and platform positions
    platform.position.x = PLATFORM_POSITION_X;
    platform.position.y = PLATFORM_POSITION_Y;
    ball.position.x = PLATFORM_POSITION_X;
    ball.position.y = PLATFORM_POSITION_Y - BALL_DIAMETER;
    ball.vel.x = 0;
    ball.vel.y = 0;
    // Make it so we can press space to start the ball movement again
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