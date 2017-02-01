const canvas = document.querySelector("canvas");
const drawingSurface = canvas.getContext("2d");


//object to hold game logic

let gameLogic = {};

gameLogic.init = function () {
  update();
}

//gamestates
const LOADING = 0;
const BUILD_MAP = 1;
const PLAYING = 2;
const OVER = 3;

//set game state
let gameState = LOADING;

//game messages
const messages = {};
messages.healthTitle = "HEALTH: ";
messages.gameMessage = 'Use the arrows to navigate.';
messages.weaponTitle = 'WEAPON: ';

//object arrays
let sprites = [];
let walls = [];
let exits = [];
let traps = [];
let enemies = [];
let player = null;



//assets

function update() {

  //switched to set interval for code ease and readability.
  let framesPerSecond = 30;
  setInterval(update, 1000 / framesPerSecond);

  //Change what the game is doing based on the game state
  switch (gameState) {
    case LOADING:
      console.log("loading...");
      loadImages();
      break;

    case BUILD_MAP:
      checkLevel(currentLevel);
      gameState = PLAYING;
      break;

    case PLAYING:
      playGame();
      break;

    case OVER:
      endGame();
      break;
  }
  render();
}

function render() {
  colorRect(0,0, canvas.width,canvas.height, "black");
  drawMessage(messages.gameMessage,canvas.width /2,475, 'white', "20px");
  drawMessage(messages.healthTitle,50, 450, "white", "12px");
  drawHealth(player.health, 90,450);
  drawMessage(messages.weaponTitle,50,480, "white", "12px");
  drawStats(player.weapon, 100,480);
  
  if (sprites.length !== 0) {
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite.visible) {
        drawingSurface.drawImage
          (
          image,
          sprite.sourceX, sprite.sourceY,
          sprite.sourceWidth, sprite.sourceHeight,
          Math.floor(sprite.x), Math.floor(sprite.y),
          sprite.width, sprite.height
          );
      }
    }
  }
}


function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    drawingSurface.fillStyle = fillColor;
    drawingSurface.fillRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor);
}

function drawMessage(message, x,y, color, fontsize) {
  drawingSurface.font = fontsize + " Arial";
  drawingSurface.textAlign = "center";
  drawingSurface.fillStyle = color;
  drawingSurface.fillText(message,x,y);  
}

function drawHealth(health,x,y) {
  if (health !== null) {
    if (health > 30) {
      color = "white";
    }
    else {
      color = "red";
    }
  drawingSurface.font = "12px Arial";
  drawingSurface.textAlign = "center";
  drawingSurface.fillStyle = color;
  drawingSurface.fillText(health,x,y);  
  }
  else {
    return
  }
}

function drawStats(stat,x,y) {
  if (stat !== null) {
      drawingSurface.font = "12px Arial";
      drawingSurface.textAlign = "center";
      drawingSurface.fillStyle = "white";
      drawingSurface.fillText(stat,x,y);  
  } else {
    return
  }  
}

window.onload = function () {
  gameLogic.init();
}
