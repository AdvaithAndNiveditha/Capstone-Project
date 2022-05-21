
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var treeObj;
var girlImg;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7;
var backgroundImg;
var stone;
var elastic;
var ground;

function preload() {
  girlImg=loadImage("girl.png");
  backgroundImg=loadImage("background1.png");
  treeObj=loadImage("tree.png");
}

function setup() {
  createCanvas(1200,770);

  engine = Engine.create();
  world = engine.world;

  girl = createSprite(70,500,20,20);
  girl.addImage(girlImg);
  girl.scale=0.45;

  tree = createSprite(900,400,20,20);
  tree.addImage(treeObj);
  tree.scale=3;

  ground =new Ground(width/2,700,width,20);
  mango1=new Mango(800,350,25,25)
  mango2=new Mango(700,290,25,25)
  mango3=new Mango(900,250,25,25)
  mango4=new Mango(1000,250,25,25)
  mango5=new Mango(1150,300,25,25)
  mango6=new Mango(900,150,25,25)
  mango7=new Mango(800,250,25,25)
  stone=new Stone(150,365,20,20);
  elastic=new Elastic(stone.body,{x:150,y:365});
  
  Engine.run(engine);
}

function draw() 
{
  background("white");
  Engine.update(engine);
  drawSprites();
  ground.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  stone.display();
  elastic.display();

  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
  detectCollision(stone,mango6);
  detectCollision(stone,mango7);

  fill(0)
  textSize(20)
  text("Press the SpaceBar to get another chance to play-Nivi",50,50,400);
}

function mouseDragged(){
  Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  elastic.fly();
}

function detectCollision(mango,stone){
  mangoBodyPosition=mango.body.position;
  stoneBodyPosition=stone.body.position;
  var distance=dist(mangoBodyPosition.x,mangoBodyPosition.y,stoneBodyPosition.x,stoneBodyPosition.y);
  if(distance<=mango.r+stone.r){
    Matter.Body.setStatic(mango1.body,false);
  }
}

function keyPressed(){
  if(keyCode===32){
    Matter.Body.setPosition(stone.body,{x:150},{y:365})
    elastic.attach(stone.body);
  }
}