var database;
var gameState = 0;
var playerCount;
var game;               //OBJECT OF THE Game CLASS
var player;             //OBJECT OF THE Player CLASS
var form;               //OBJECT OF THE Form CLASS
var canvas;
var allPlayers;
var p = null;
var car1, car2, car3, car4, cars;
var carImage1, carImage2, carImage3, carImage4, groundImage, trackImage


function preload() {
  carImage1 = loadImage("images/car1.png");
  carImage2 = loadImage("images/car2.png");
  carImage3 = loadImage("images/car3.png");
  carImage4 = loadImage("images/car4.png");

  groundImage = loadImage("images/ground.png");
  trackImage = loadImage("images/track.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  //create database inside 'database' variable --> firebase.database()
  database = firebase.database();

  //a new game object is created for the Game clas
  game = new Game();

  //read the gameState
  game.readState();

  //call the wait state of the game
  game.wait();

  car1 = createSprite(100, 200);
  car1.addImage(carImage1);

  car2 = createSprite(300, 200);
  car2.addImage(carImage2);

  car3 = createSprite(500, 200);
  car3.addImage(carImage3);

  car4 = createSprite(700, 200);
  car4.addImage(carImage4);

  cars = [car1, car2, car3, car4];
}

function draw() {
  //when the playerCount is 4, the gameState is updated to 1 in the database
  if (playerCount === 4) {
    game.update(1);
  }

  //to empty the screen and call the play function when the gameState is 1
  if (gameState === 1) {
    clear();
    game.play();
  }

  if (gameState === 2) {
    game.end();
  }

  console.log(gameState);
}