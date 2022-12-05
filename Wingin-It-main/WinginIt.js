
//Setting display
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.style.display = "block";
var fillColor = "yellow";
var finalColor = 0;
console.log("version 2");

//Sprites for the things, declare them here, then put them in the objects
var buzzSprite = new Image(10, 10);
buzzSprite.src = "buzz.png";

var flowerSprite = new Image(25, 20);
flowerSprite.src = "flower.png";
flowerSprite.name = "Flower";
// flowerSprite points = 50;

var footballSprite = new Image(20, 15);
footballSprite.src = "football.png";
footballSprite.name = "Football";
// footballSprite points = 50;

var tSprite = new Image(25, 20);
tSprite.src = "t.png";
tSprite.name = "T"
// tSprite.points = 50;

var ratcapSprite = new Image(25, 20);
ratcapSprite.src = "rat.png";
ratcapSprite.name = "Ratcap"
// ratcapSprite.points = 50;

var ugaSprite = new Image(35, 30);
ugaSprite.src = "uga.png";
ugaSprite.name = "UGA";
// ugaSprite.points = -10000;

var honeySprite = new Image(25, 20);
honeySprite.src = "honey.png";
honeySprite.name = "Honey";
// honeySprite.rarity = "Rare";
// honeySprite.points = -80;

var wreckSprite = new Image(35, 30);
wreckSprite.src = "wreck.png";
wreckSprite.name = "Wreck";
// wreckSprite.points = 500;

var georgeSprite = new Image(50, 45);
georgeSprite.src = "george.png";
georgeSprite.name = "George";
// georgeSprite.points = 500;

//item holds current sprite
var item = null;
var itemPoints = 0;

//tracking game over condition and strikes
//game over if UGA is caught, three items hit the floor, or total points below 0
var gameOver = false;
var strikes = 0;

//Array of rare items
rareItems = [
   ugaSprite, wreckSprite, georgeSprite
]
//Array of common items
commonItems = [
    flowerSprite, footballSprite, tSprite, ratcapSprite, honeySprite
]

//Randomly select rarity
function chooseRarity() {
    let rarity = Math.round(Math.random() * 5);
    if (rarity == 0) {
        chooseItem(rareItems);
    } else {
        chooseItem(commonItems);
    }
}

//Choose item from given array of items
function chooseItem(itemList) {
    let index = (Math.floor(Math.random() * itemList.length));
    item = itemList[index];
}

//Set item points depending on the collision item
function determinePoints() {
    if (item.name === "UGA") {
        itemPoints = -10000;
    } else if (item.name === "George" || item.name === "Wreck") {
        itemPoints = 500;
    } else if (item.name === "Honey") {
        itemPoints = -80;
    } else {
        itemPoints = 50;
    }
}

//Score Handling
ctx.fillStyle = fillColor;
ctx.textAlign = "left";
ctx.font = "30px Bradley Hand";
var score = 0;

//Movement Handling
var rightPressed = false;
var leftPressed = false;
var mouseDown = false;
var mouseXPos = 0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("pointermove", mousePosUpdate, false);
document.addEventListener("pointerdown", clickDown, false);
document.addEventListener("pointerup", clickUp, false);

//Objects
var fallingObjects = [];
var fallCounter = 0;

function clickDown(e) {
	mouseDown = true;
}
function clickUp(e) {
	mouseDown = false;
}
function mousePosUpdate(e) {
	console.log(e.clientX);
	mouseXPos = e.clientX;
}

//Character movement
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Objects for ease of access
var buzz = {
    sprite: buzzSprite,
    x: canvas.width / 4,
    y: canvas.height-255,
    height: 250,
    width: 230,
    speed: 10,
    points: 0
};

//Function to increase speed variable by 5%
var speedVar = 1;
var updatedCount = 1;
function updateSpeedVar() {
    console.log("Updating speed: " + speedVar)
    speedVar = speedVar + (.02 * speedVar);
    updatedCount++;
}

//Update speed every 3000 ms
setTimeout(updateSpeedVar, 3000)

//Choose random object
function randomSprite() {
    chooseRarity();
    determinePoints();
    this.sprite = item;
    console.log(item.name)
    this.x = Math.floor(Math.random() * (canvas.width - item.width * 4));
    this.y = 0;
    this.height = item.height * 4;
    this.width = item.width * 4;
    if (score == 0) {
        this.speed = 2;
    } else {
        updateSpeedVar();
        this.speed = speedVar;
    }
    this.points = itemPoints;
};



//Draws the scene
function draw() {
    //Clears Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      var background = new Image(canvas.width, canvas.height);
      background.src = 'background.png'; 
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      if (++fallCounter >= 100 * Math.pow(.98, updatedCount)) {
         fallCounter = 0;
         fallingObjects.push(new randomSprite());
      }
      fallingObjects.forEach(element => 
         {
             element.y += element.speed;
             ctx.drawImage(element.sprite, element.x, element.y, element.width, element.height);
             //Collide with player
             if (element.y + element.height >= canvas.height - buzz.height && ((element.x <= buzz.x + buzz.width && element.x >= buzz.x) || (element.x + element.width <= buzz.x + buzz.width && element.x + element.width >= buzz.x))) {
                 score += element.points;
                 strikes = 0;
                 console.log(element.sprite.name + ": " + element.points);
                 if (element.name === "UGA") {
                     strikes = 3;
                 }
                 if (score < 0) {
                     strikes = 3;
                 }
                 fallingObjects = fallingObjects.filter(function(ele){
                     return ele !== element;
                 });
             } 
             if (strikes == 3) {
                 gameOver = true;
             }
             //Collide with floor
             else if (element.y >= canvas.height - element.height) {
                 fallingObjects = fallingObjects.filter(function(ele){
                     return ele !== element;
                 });
                 if (element.sprite.name !== "UGA" && element.sprite.name !== "Honey") {
                     strikes++;
                 }
             }
             if (strikes == 3) {
                 gameOver = true;
             }
             });

      ctx.drawImage(buzz.sprite, buzz.x, buzz.y, buzz.width, buzz.height);

      //Score goes last, so it's drawn on top of the canvas

      ctx.fillText("Score: " + score, 10, 30);

      ctx.fillText("Strikes: " + strikes, 10, canvas.height - 30);

      //High Score Testing
      ctx.textAlign = "right";
      ctx.fillText("High Score: " + GetHighScore(), canvas.width - 10, 30);
      ctx.textAlign = "left";

      //More movement handling
      if(rightPressed || (mouseDown && mouseXPos > buzz.x)) {
         buzz.x += 5 + speedVar;
	 console.log("right");
         if (buzz.x + buzz.width > canvas.width){
             buzz.x = canvas.width - buzz.width;
         }
      }
      else if(leftPressed || (mouseDown && mouseXPos < buzz.x)) {
         buzz.x -= 5 + speedVar;
	 console.log("left");
         if (buzz.x < 0){
             buzz.x = 0;
         }
      }
    if (gameOver) {
        if (score > GetHighScore()) {
            document.cookie = "HighScore=" + score;
        }
        window.location.href="EndScreen.html?highScore=" + GetHighScore();
    }
}

//Manage high score cookie
function GetHighScore() {
    if (document.cookie.split("; ").find((row) => row.startsWith("HighScore="))?.split('=')[1] == undefined) {
        return "0";
    }
    return document.cookie.split("; ").find((row) => row.startsWith("HighScore="))?.split('=')[1];
}

//Redraws the scene every 10 milliseconds
setInterval(draw, 10);
