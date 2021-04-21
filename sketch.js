var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage;

var food, foodGroup, obstacle, obstacleGroup;

var score = 0,survivalTime = 0;

var gameState = 1, PLAY = 1, END = 0;

var gameOver, gameOverImg, restart, restartImg;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("GameOver.jpg");
  restartImg = loadImage("redo.png");
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  restart = createSprite(300,250);
  restart.addImage(restartImg);
  restart.scale = 0.2;
}


function draw() {
  background("white");
  monkey.collide(ground);

  if(gameState !== END) {
    if (ground.x > 0) {
      ground.x = ground.width / 2;
    }

    textSize(25);
    fill("black");
    text("Score: " + score, 330, 40);

  
    if (keyDown("space")) {
      monkey.velocityY = -12;
    }
    monkey.velocityY += 0.8;
  
  
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score += 1;
    }
  
    stroke("black");
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("Survival Time: " + survivalTime, 30, 40);

    gameOver.visible = false;
    restart.visible = false;
    
    banana();
    obstacles();
  }

  if(monkey.isTouching(obstacleGroup)) {
    gameState = END;
  }

  if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    obstacleGroup.destroyEach();
    foodGroup.destroyEach();

    monkey.visible = false;
    ground.visible = false;

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function banana() {
  if (frameCount % 200 === 0) {
    food = createSprite(600, 200, 10, 10);
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.y = Math.round(random(120, 200));
    food.velocityX = -4;
    food.lifetime = 150;
    foodGroup.add(food);
  }
}

function obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 600, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.y = Math.round(random(300, 300));
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();

  score = 0;
  survivalTime = 0;

  monkey.visible = true;
  ground.visible = true;
}