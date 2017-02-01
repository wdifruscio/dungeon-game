//arrowkeys
const UP = 38;
const DOWN = 40;
const RIGHT = 39;
const LEFT = 37;
const SPACE = 32;

//Directions
let moveUp = false;
let moveDown = false;
let moveRight = false;
let moveLeft = false;
let isAttacking = false;


window.addEventListener("keydown", function(event) {
  switch(event.keyCode)
  {
    case UP:
	    moveUp = true;
	    break;
	  
	  case DOWN:
	    moveDown = true;
	    break;
	    
	  case LEFT:
	    moveLeft = true;
	    break;  
	    
	  case RIGHT:
	    moveRight = true;
	    break; 
  }
}, false);

window.addEventListener("keyup", function(event) {
  switch(event.keyCode)
  {
    case UP:
	    moveUp = false;
	    break;
	  
	  case DOWN:
	    moveDown = false;
	    break;
	    
	  case LEFT:
	    moveLeft = false;
	    break;  
	    
	  case RIGHT:
	    moveRight = false;
	    break; 
  }
}, false);

window.addEventListener("keypress", function(event) {
  switch(event.keyCode) {
    case SPACE:
    isAttacking = true;
    break;
  }
}, false );


function playGame() {
  //Up
  if (moveUp) {
    player.sourceX = 32;
    player.vy = -0.3;
  }
  //Down
  if (moveDown) {
    player.sourceX = 0;
    player.vy = 0.3;
  }
  //Left
  if (moveLeft) {
    player.sourceX = 96;
    player.sourceX = 96;
    player.vx = -0.3;
  }
  //Right
  if (moveRight) {
    player.sourceX = 64;
    player.vx = 0.3;
  }
  //Set the player's velocity to zero if none of the keys are being pressed
  if (!moveUp && !moveDown) {
    player.vy = 0;
  }
  if (!moveLeft && !moveRight) {
    player.vx = 0;
  }
  if (isAttacking) {
    // player.sourceX = 1000;
    // isAttacking = false;
  }

  player.x += player.vx;
  player.y += player.vy;

  //Collisions with walls
  for (let i = 0; i < walls.length; i++) {
    blockRectangle(player, walls[i]);
  }
  //collisions with exits
  for (let i = 0; i < exits.length; i++) {
    if (hitTestRectangle(player, exits[i])) {
      alert("EVENT");
    }
  }

  //collisions with traps
  for (let i = 0; i < traps.length; i++) {
    var trap = traps[i];
    if (hitTestRectangle(player, traps[i])) {
      // alert('bye bye');
      console.log(traps);
      removeObject(trap, traps);
      removeObject(trap, sprites);
      console.log(traps);
    }
  }
}