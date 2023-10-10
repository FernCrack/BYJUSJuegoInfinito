var player, back;
var points = 0;
var backImg;
var leftPlayerImg;
var rightPlayerImg;
var gameState= "START";
var baseImg, baseGroup;
var goodImg, goodThingsGroup;
var badImg, badThingsGroup;
var jumpSound;
var dieSound;
var coinSound;

//Función para cargar imágenes y animaciones
function preload() {
leftPlayerImg =loadAnimation("Imagenes/FoxHitbox.png");
rightPlayerImg =loadAnimation("Imagenes/FoxHitbox.png");
  backImg =loadImage("Imagenes/Clouds and sunbeam Back.png");
   baseImg =loadImage("Imagenes/base.png");
  goodImg = loadImage("Imagenes/RabbitLeather.png");
  badImg = loadImage("Imagenes/FireHitbox.png");
  jumpSound = loadSound("Sonidos/cartoon-jump-6462.mp3");
  dieSound = loadSound("Sonidos/funny-sound-effect-for-quotjack-in-the-boxquot-sound-ver1-110923.mp3");
  coinSound = loadSound("Sonidos/coin_c_02-102844.mp3");
}
//Función para declarar Sprites y grupos
function setup() {
  createCanvas(450,800);
  back=createSprite(225, 400, 20, 20)
  back.addImage(backImg);
  back.scale = 0.5;
  player = createSprite(225, 450, 20, 20);
  player.addAnimation("left", leftPlayerImg);
 player.scale =0.25;
 baseGroup = new Group();
goodThingsGroup = new Group();
badThingsGroup = new Group();
}
//Función para dibujar los Sprites y establecer reglas del juego
function draw() {
  background(220);
  drawSprites();
  

  

  //Puntuación 
 textSize(20);
  fill("black");
  text("Puntos: " + points,50,100);
  
  
  //Inicio del juego
  if(gameState==="START" && keyDown("up_arrow")){
      
    //Velocidad y cambio de estado 
     gameState="PLAY";
     }

  
  if(gameState==="PLAY"){
  
    //Fondo infinito
   
    //gravedad
       player.velocityY = player.velocityY + 0.8;
    //Mover personaje con las flechas 
    
  if(keyDown("right_arrow")){
    player.x = player.x+3;
  }
  
  if(keyDown("left_arrow")){
    player.x = player.x-3;
  }
  
  if(keyDown("up_arrow")){
    player.velocityY = -4;
    jumpSound.play();
  }
  
    //Crear bases y hacer que el personaje quede sobre ellas
      createBases();
    if(player.isTouching(baseGroup)){
      player.velocityY = 0;
    }
    //Aumentar puntos
    if(player.isTouching(goodThingsGroup, removeGoodThings)){
      coinSound.play();
      points = points + 10;
    }
    //Crear Cosas Malas 
      createBadThings();
    //Cambiar a estado GAMEOVER
     if(player.isTouching(badThingsGroup)){
       dieSound.play();
       gameState="GAMEOVER";
  }}
  
  //Estado GAMEOVER 
  
  if(gameState==="GAMEOVER"){
    back.velocityY =0;
    player.velocityY=3;
    fill("#E91E63");
    textSize(30); 
    text("GAME OVER", 50, 300);
    textSize(15);
    text("Presiona tecla X para reiniciar", 150, 370);
    
    if(keyDown("x")){
      points=0;
      player.x=225;
      player.y=450;
      gameState="START";
  }

}
}
//Función para crear bases 
function createBases(){
   if(frameCount % 100 === 0){
     var base = createSprite(random(50,450), 0, 70, 20); 
     
     base.velocityY = 2;
     base.addImage(baseImg);
     base.scale = 0.30;
     baseGroup.add(base);
     var good = createSprite(base.x, base.y -15, 20, 20);
     good.velocityY = 2;
     good.addImage(goodImg);
     good.scale = 0.25;
     goodThingsGroup.add(good);
   }
}

//Función para crear Cosas Malas 

function createBadThings(){
  var velo = 3;
  if(frameCount % 75 === 0){
    var bad = createSprite(random(50, 450), 0, 70, 20);
    bad.velocityY = velo;
    velo = velo + 0.3;
    bad.addImage(badImg);
    bad.scale = 0.23;
    badThingsGroup.add(bad);
     
}
}

//Función para eliminar CosasBuenas
function removeGoodThings(sprite,goodThingsGroup ){
  goodThingsGroup.remove();
  
}
  