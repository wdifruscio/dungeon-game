const canvas = document.querySelector("canvas");
const drawingSurface = canvas.getContext("2d");


//object to hold game logic

const gameLogic = {};

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

//object arrays
let sprites = [];
let walls = [];
let exits = [];
let traps = [];
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
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
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

  //Display the game messages
  //   if(messages.length !== 0)
  //   {
  //     for(let i = 0; i < messages.length; i++)
  //     {
  //       let message = messages[i];
  //       if(message.visible)
  //       {
  //         drawingSurface.font = message.font;  
  //         drawingSurface.fillStyle = message.fillStyle;
  //         drawingSurface.textBaseline = message.textBaseline;
  //         drawingSurface.fillText(message.text, message.x, message.y);  
  //       }
  //     }
  //   }
}


window.onload = function () {
  gameLogic.init();
}
