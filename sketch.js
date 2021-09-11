console
var ground,groundImage;
var fakeground
var cloud,cloudImage;
var cactus,c1,c2,c3,c4,c5,c6
var scorecard
var gamestate= "alive"
var cloudgroup
var cactusgroup
var deadTrex
var gameOver,gameOverImg,restart,restartImg
var cpSound,dieSound,jumpSound


function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")  
trex_duck=loadAnimation("clearduck1.png","clearduck2.png")
groundImage=loadImage("ground2.png")
cloudImage=loadImage("cloud.png")
c1=loadImage("obstacle1.png")
c2=loadImage("obstacle2.png")
c3=loadImage("obstacle3.png")
c4=loadImage("obstacle4.png")
c5=loadImage("obstacle5.png")
c6=loadImage("obstacle6.png")
deadTrex=loadAnimation("trex_collided.png")
gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
cpSound=loadSound("checkPoint.mp3")
dieSound=loadSound("die.mp3")
jumpSound=loadSound("jump.mp3")


}
// :[
function setup(){
  createCanvas(600,200)
  

 trex=createSprite(50,184,20,50)

 trex.setCollider("circle",0,0,40)
 
 trex.addAnimation("running",trex_running)
 trex.addAnimation("duck",trex_duck)
trex.addAnimation("dead",deadTrex)
 
trex.scale=0.5
edges=createEdgeSprites()
scorecard=0
cloudgroup= new Group ()
cactusgroup= new Group ()




fakeground=createSprite(200,185,400,5)
fakeground.visible=false;
ground=createSprite(200,180,400,5)
ground.addImage(groundImage)

gameOver=createSprite(300,100)
gameOver.addImage(gameOverImg)
gameOver.scale=0.5

restart=createSprite(300,140)
restart.addImage(restartImg)
restart.scale=0.5
}

function spawnclouds (){
  if(frameCount%100==0){
    cloud=createSprite(600,50,40,10) 
    cloudgroup.add(cloud)
    cloud.velocityX=-2
    cloud.y=Math.round(random(10,100))
    console.log(frameCount)
    cloud.addImage(cloudImage)
    cloud.scale=0.65
    cloud.lifetime=315
    trex.depth=cloud.depth+1
  }

}


function spawncactus (){
if(frameCount%60==0){
cactus=createSprite(600,160,10,40)
cactusgroup.add(cactus)
cactus.velocityX=-(6+scorecard*3/100)
cactus.scale=0.45
cactus.lifetime=315




var nothing=Math.round(random(1,6))
switch(nothing){
  case 1:cactus.addImage(c1)
  break;


  case 2:cactus.addImage(c2)
  break;

  case 3:cactus.addImage(c3)
  break;

  case 4:cactus.addImage(c4)
  break;

  case 5:cactus.addImage(c5)
  break;

  case 6:cactus.addImage(c6)
  break;

  default:break;
}
}


}


function draw(){
  background("#bfd3ff")
  textSize(20)
  fill("#000000")
  
  text("Score: " +scorecard, 430,20)
  
  
  if(gamestate=="alive"){
    
    gameOver.visible=false
    restart.visible=false
  
  ground.velocityX=-5

  scorecard=scorecard+Math.round (getFrameRate()/60)
 
  if((keyDown("space")||keyDown("up"))&&trex.collide(fakeground)){
    trex.velocityY=-10
    jumpSound.play()

  
  }
// when the score is divisble by 100 play the daDuh sound
if(scorecard%100==0&&scorecard>0){
  cpSound.play()
}





//make the trex duck
  if(keyWentDown(DOWN_ARROW)&&trex.collide(fakeground)){
    trex.changeAnimation("duck",trex_duck)
    
  }
  
  
  if(keyWentUp(DOWN_ARROW)){
    trex.changeAnimation("running",trex_running)
    
  }


trex.velocityY=trex.velocityY+0.6


if(ground.x<0){
  ground.x=200
}
  



spawnclouds()
spawncactus()



if(trex.isTouching(cactusgroup)){
  gamestate="dead"
  dieSound.play()
 
}


  } 
 

  else if (gamestate=="dead"){
       
       gameOver.visible=true
       restart.visible=true

  ground.velocityX=0

  cactusgroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  
cactusgroup.setLifetimeEach(-10)
cloudgroup.setLifetimeEach(-10)

trex.changeAnimation("dead",deadTrex)

trex.velocityY=0

if(mousePressedOver(restart)){
  reset()

}
  }
  



 
  

trex.collide(fakeground)

drawSprites()
}


function reset () {
  gamestate="alive"
  cactusgroup.destroyEach()
  cloudgroup.destroyEach()
  scorecard=0
  trex.changeAnimation("running")

}