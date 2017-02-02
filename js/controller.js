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

function playGame() {
  //Up
  if (moveUp) {
    player.sourceX = 32;
    player.vy = -1.2;
  }

  //Down
  if (moveDown) {
    player.sourceX = 0;
    player.vy = 1.2;
  }

  //Left
  if (moveLeft) {
    player.sourceX = 96;
    player.sourceX = 96;
    player.vx = -1.2;
  }

  //Right
  if (moveRight) {
    player.sourceX = 64;
    player.vx = 1.2;
  }

  //Set the player's velocity to zero if none of the keys are being pressed
  if (!moveUp && !moveDown) {
    player.vy = 0;
  }

  if (!moveLeft && !moveRight) {
    player.vx = 0;
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
      console.log("collision with exit.");
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

  //collisions with enemies
  for (let i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];

    findTarget(player, enemy);

    if (hitTestRectangle(player, enemy)) {
      let collisionSide = blockRectangle(player, enemy);
      switch(collisionSide) {
        case "left":
        player.x +=25;
        enemy.x -=10;
        break;

        case "right":
        player.x -=25;
        enemy.x +=10;
        break;

        case "top":
        player.y +=25;
        enemy.y -=10;
        break;

        case "bottom":
        player.y -=25;
        enemy.y +=10;
        break;
      }
      fightEnemy(enemy);
    }
  }
}

function findTarget(player, enemy) {
  targetX = player.x;
  targetY = player.y;

  enemyX = enemy.x;
  enemyY = enemy.y;

  if(enemyX < targetX) {
    enemy.x += Math.random();
  }
  if (enemyX > targetX ){
  enemy.x -= Math.random();
  }
  if(enemyY < targetY) {
    enemy.y += Math.random();
  }
  if (enemyY > targetY ){
  enemy.y -= Math.random();
  } 
}


function fightEnemy(enemy) {
  var playerDamage = Math.random() * Math.floor(player.strength + 1);
  var enemyDamage = Math.random() * Math.floor(enemy.strength + 1);

  battle(playerDamage,enemyDamage);

  function battle(playerDamage, enemyDamage) {
    enemy.health -= playerDamage.toFixed(2);
    player.health -= enemyDamage.toFixed(2);

    player.health = player.health.toFixed(2);

    if (enemy.health < 0 && player.health > 0) {
      removeObject(enemy, enemies);
      removeObject(enemy, sprites);
      messages.gameMessage = "YOU DEFEATED A " + enemy.name + ", SON.";
    }
    
    else if(player.health < 0) {
      messages.gameMessage = "YOU LOSE";
      gameState = OVER;
    }
  }
}