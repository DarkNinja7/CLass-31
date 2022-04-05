const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

//var declaration
var button;
var bunny;
var blink,eat,sad;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;

  //loaded animation for bunnies activites
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  //animation has been played and looping for eat and sad has been made false.
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  //used function framedelay to give time delay for the animation.
  blink.framDelay=20;
 eat.framDelay=20;
 sad.framDelay=20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  ///added animation to  the bunny sprite.
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  //changed intitial animation of bunny to blinking.
  bunny.changeAnimation('blinking');
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

 
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
  //fruit image  is displayed only when its not null.
if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}
  rope.show();
  Engine.update(engine);
  ground.show();

  //checking collision between fruit and bunny and changing the animation.
if(collide(fruit,bunny)==true){
  bunny.changeAnimation('eating');
}
//checking collision between fruit and ground and changing animation.
if(collide(fruit,ground.body)==true){
  bunny.changeAnimation('crying');
}

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

//creating user defined function for detecting collision.
function collide(body,sprite){
  //checking whether the body is not empty.
  if(body!=null){
    //calculating distance between body and sprite using user defined  function dist.
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    //checking the value of distance.
    if(d<=80){
      //if distance reduces to <80 it removes the fruit from the existing world.
     World.remove(engine.world,fruit);
     //the entire storage of fruit is made null.
     fruit=null;
     //it tells that the functionality has happened succesfully
     return true;
    }
    else{
      //when functionality gets declined.
      return false;
    }
  }
}

