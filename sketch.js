var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var ships, ship1, ship2;

var track , heroImg , villanImg, spaceImg ;


function preload(){
  backgroundImg = loadImage("images/background.png");

  heroImg = loadImage("images/hero.png");
  villanImg = loadImage("images/villan.png");
  

}

function setup(){
  canvas = createCanvas(displayWidth - 30, displayHeight-20);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start(); 

 

}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}
