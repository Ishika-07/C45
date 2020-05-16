const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var gameState = "play";

var engine, world;

var bgImg;
var fishImg,fish2Img;
var player,playerImg;
var bubbleImg;
var fish;
var bubbleGroup;
var score = 0;

var fish1Group,fish2Group;


function preload(){
bgImg=loadImage("image/oceanbg.jpg");
fishImg = loadImage("image/yellowfish.gif");
fish2Img = loadImage("image/fish4.png");
playerImg = loadImage("image/sprite_fish0.png");
bubbleImg  =loadImage("image/sprite_bubble0.png");
}
function setup(){
    var canvas = createCanvas(1200,500);
    engine = Engine.create();
    world = engine.world;

    player = createSprite(100,200);
    player.scale = 0.08;
    player.addImage(playerImg);
   
  fish1Group = createGroup();
  fish2Group = createGroup();
  bubbleGroup = createGroup();

   // ground = Bodies.rectangle(200,390,200,20,ground_options);
   // World.add(world,ground);

  //  console.log(ground);
}

function draw(){
    background(bgImg);
    Engine.update(engine);

    
    fill(0);
   textSize(32);
   text("Score:"+score,1000,50);

    
    console.log("gameState",gameState);
    if (gameState === "play"){
    player.y = mouseY;

    if (keyDown("space")){
    bubbles();
    }

    spawnFish();
    spawnFish2();
    shoot();

    if(fish2Group.collide(player)){
      score--;
    }

    if (fish1Group.collide(player)){
      gameState = "end";
    }
  }
  else if(gameState === "end"){

    fish1Group.velocityXEach = 0;
    fish2Group.velocityXEach  = 0;

    fish1Group.destroyEach();
    fish2Group.destroyEach();
  }
  
   drawSprites();
   
}
function spawnFish(){
    if(frameCount%60===0){
    fish = createSprite(1200,random(0,500),20,20);
    fish.addImage(fishImg);
    fish.scale =0.2;
    fish.velocityX = -5;
    fish.lifetime = 240;

    fish1Group.add(fish);
    }
}
function spawnFish2(){
    if(frameCount%40===0){
        var fish2 = createSprite(1200,random(0,500),20,20);
        fish2.addImage(fish2Img);
        fish2.scale =0.5;
        fish2.velocityX = -5;
        fish2.lifetime = 240;

        fish2Group.add(fish2);
    }
}
function bubbles(){
    var bubble = createSprite(100,200);
    bubble.scale = 0.02;
    bubble.addImage(bubbleImg);
    bubble.velocityX = 3;
    bubble.y= mouseY ;

    bubbleGroup.add(bubble);

}
function shoot(){
  if(bubbleGroup.isTouching(fish1Group)){
      fish1Group.destroyEach();
      bubbleGroup.destroyEach();
      score++;
  }

  if(bubbleGroup.isTouching(fish2Group)){
      fish2Group.destroyEach();
      bubbleGroup.destroyEach();
      score++;
  }
}