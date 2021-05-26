var boys,boyImg
var ground,groundImage,invisibleGround
//////var backImg
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,restartImg;

function preload(){
groundImage = loadImage("images/ground3.png")
boyImg = loadImage("images/boy.png")
obstacle1 = loadImage("images/cactus1.jpeg")
obstacle2 = loadImage("images/cactus2.jpeg")
obstacle3= loadImage("images/cactus3.jpeg")
obstacle4= loadImage("images/obstacle4.png")
restartImg=loadImage("images/restart.png")
///backImg= loadImage("images/Back.jpg")

}
function setup(){
createCanvas(windowWidth,windowHeight)
invisibleGround = createSprite(width/2,height-10,width,125);
invisibleGround.visible = false;

ground = createSprite(2*width,height/2,width,2);
ground.addImage("ground",groundImage);
ground.scale=0.8
ground.x = width/2
ground.velocityX = 0;


obstaclesGroup= new Group()



 restart=createSprite(windowWidth/2,windowHeight/2)
 restart.addImage("restart",restartImg)
 restart.scale=0.08

boys = createSprite(50,windowHeight-100,20,50);
boys.addImage("boy",boyImg);
boys.scale=0.05
boys.setCollider('circle',0,0,350)
 
restart.visible = false;

}
function draw(){
  background("white")
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  if(gameState===PLAY){
  
if(keyDown("SPACE")){

  score = score + Math.round(getFrameRate()/60);
  ground.velocityX=-(6 + 3*score/100)

}
if((touches.length > 0 || keyDown("UP_ARROW")) && boys.y  >= height-120) {
  
  boys.velocityY = -10;
   touches = [];
}
boys.velocityY = boys.velocityY + 0.8
if (ground.x < 0){
  ground.x = ground.width/2;

}
//score=score+1

/*if(keyDown("UP_ARROW")  && boys.y>= height-120){
  boys.velocityY= -10
  console.log("boys.velocityY")
}
boys.velocityY = boys.velocityY +2
  */

//boys.velocityY=boys.velocityY+2
boys.collide(invisibleGround);
spawnObstacles();
if(obstaclesGroup.isTouching(boys)){
  gameState=END
}


  }
  else if(gameState===END){
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boys.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    reset();

  }
 


boys.collide(invisibleGround)

  drawSprites()


}
function spawnObstacles() {
        if(frameCount % 60 === 0) {
          var obstacle = createSprite(600,height-100,20,20);
          obstacle.setCollider('circle',0,0,45)
          // obstacle.debug = true
  obstacle.velocityX=-(6 + 3*score/100)
        
       
          
          //generate random obstacles
          var rand = Math.round(random(1,4));
          switch(rand) {
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
       case 3: obstacle.addImage(obstacle3);
break;
case 4: obstacle.addImage(obstacle4);
break;
            default: break;
          }
          
          //assign scale and lifetime to the obstacle           
          obstacle.scale = 0.3;
          obstacle.lifetime = 300;
          obstacle.depth=boys.depth
          boys.depth+=1
        
          //add each obstacle to the group
          obstaclesGroup.add(obstacle);
        }
      }
      function reset(){
gameState=PLAY
score=0
ground.velocityX=0
restart.visible=false
      }
      