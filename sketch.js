var sprite , sprite_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  sprite_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
createCanvas(600,600);
var survivalTime=0;
sprite=createSprite(50,250,10,10);
sprite.addAnimation("moving",sprite_running);
sprite.scale=0.1

ground=createSprite(70,350,800,10);
ground.velocityX=-4;
ground.x=ground.width/2;
console.log(ground.x)

FoodGroup=createGroup();
obstacleGroup=createGroup();

score=0;

}

function draw() {

background(180);

if(ground.x<0){
ground.x=ground.width/2;
}

if(keyDown("space")) {
sprite.velocityY=-12;
}

sprite.velocityY=sprite.velocityY+0.8;

sprite.collide(ground);
  
spawnFood();
spawnobstacle();

drawSprites();

stroke("black");
fill("black");
textSize(20);
text("Score:"+score,300,100);

if(obstacleGroup.isTouching(sprite)) {
ground.velocityX=0;
sprite.velocityY=0;
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);
}

stroke("black");
fill("black");
textSize(20);
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50);
}

function spawnFood() {
if(frameCount%80===0) {
banana=createSprite(400,350,40,10);
banana.y=Math.round(random(120,200));
banana.velocityX=-3;
banana.lifetime=200;    
sprite.depth=banana.depth+1;
banana.addImage(bananaImage);
banana.scale=0.1
FoodGroup.add(banana);
}
}

function spawnobstacle() {
if(frameCount%300===0) {
obstacle=createSprite(800,325,10,40);
obstacle.velocityX=-6;
obstacle.addImage(obstacleImage);
obstacle.scale=0.15
obstacle.lifetime=300;
obstacleGroup.add(obstacle);
}
  
  
}

