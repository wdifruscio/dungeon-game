const tilesheetColumns = 5;

let currentLevel = 0;

let map = levels[currentLevel]["map"];

let gameObjects = levels[currentLevel]["gameObjects"];

let EMPTY = 0;
let FLOOR = 1;
let WALL = 2;
let EXIT = 3;
let PLAYER = 4;
let TRAP = 5;
let ENEMY_RANDOM = 6;
let ENEMY_BOSS = 7;

let SIZE = 32;
let ROWS = map.length;
let COLUMNS = map[0].length;


function checkLevel() {
    buildMap(map);
    buildMap(gameObjects);
}


function buildMap(levelMap) {
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {

      function createEnemy() {
        let enemy = Object.create(enemyObject);
        function random(arr) {return Math.floor((Math.random() * arr.length))};
        let options = [0,32,64,96];
        let randomIndex = random(options);
        enemy.sourceX = options[randomIndex];
        enemy.sourceY = 64;
        //set stats
        setEnemyStats(enemy,enemy.sourceY, enemy.sourceX, randomIndex);  
        enemy.x = column * SIZE;
        enemy.y = row * SIZE;
        sprites.push(enemy);
        enemies.push(enemy);
      }

      function setEnemyStats(enemy, source, multiplier, randomIndex) {
      
        function getEnemyTilesheetPosition(tileRow, tileCol) {
          switch(tileRow) {
            case 64:
            let names = ['WOLF', 'BAT', 'MOUSE', 'TURTLE'];
            enemy.name = names[randomIndex];
            console.log(enemy.name);
            break;
          }
        }
        enemy.strength*= multiplier / 100;
        getEnemyTilesheetPosition(source,multiplier);
        console.log(enemy.strength);
      }

      let currentTile = levelMap[row][column];
      if (currentTile !== EMPTY) {
        let tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE;
        let tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;

        switch (currentTile) {
          case FLOOR:
            let floor = Object.create(spriteObject);
            floor.sourceX = tilesheetX;
            floor.sourceY = tilesheetY;
            floor.x = column * SIZE;
            floor.y = row * SIZE;
            sprites.push(floor);
            break;

          case WALL:
            let wall = Object.create(spriteObject);
            wall.sourceX = tilesheetX;
            wall.sourceY = tilesheetY;
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            walls.push(wall);
            break;

          case EXIT:
            let exit = Object.create(spriteObject);
            exit.sourceX = tilesheetX;
            exit.sourceY = tilesheetY;
            exit.x = column * SIZE;
            exit.y = row * SIZE;
            sprites.push(exit);
            exits.push(exit);
            break;

          case PLAYER:
            player = Object.create(playerObject);
            player.sourceX = 0;
            player.sourceY = 32;
            player.x = column * SIZE;
            player.y = row * SIZE;
            sprites.push(player);
            break;

          case TRAP:
            let trap = Object.create(spriteObject);
            trap.sourceX = tilesheetX;
            trap.sourceY = tilesheetY;
            trap.x = column * SIZE;
            trap.y = row * SIZE;
            sprites.push(trap);
            traps.push(trap);
            break;

          case ENEMY_RANDOM:
          createEnemy();
            break;

          case ENEMY_BOSS:
            let boss = Object.create(enemyObject);
            boss.sourceX = 0;
            boss.sourceY = 64;
            boss.x = column * SIZE;
            boss.y = row * SIZE;
            sprites.push(boss);
            enemies.push(boss);
            break;
        }
      }
    }
  }
}

//functions to create enemies.
