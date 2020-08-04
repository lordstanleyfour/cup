const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//load images
const images = {}; //object for storing images
images.player = new Image();
images.player.src = "character.png"; //sprite sheet location
//const characterActions = ["up", "top right", "right", "down right", "down", "jump"];
const characterActions = ["up", "right", "jump", "down right", "up right"];
const numberOfCharacters = 10;
const characters = []; //characters and their attributes are stored here

class Character { //js object which creates a character constructor to generate variables for characters
    constructor(){
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3; //this.frameX designates the starting frame of the animation as per the draw method, possible that the starting frame is not the true starting frame as designated by minFrame.
        this.x = (Math.random() * canvas.width);
        this.y = (Math.random() * canvas.height);
        this.speed = (Math.random() * 3.5) + 3.5;
        this.action = characterActions[Math.floor(Math.random() * characterActions.length)];
        if (this.action === "up"){
          this.frameY = 0;
          this.minFrame = 4;
          this.maxFrame = 15;
        } else if (this.action === "right") {
          this.frameY = 3;
          this.minFrame = 3;
          this.maxFrame = 13;
        } else if (this.action === "jump") {
          this.frameY = 7;
          this.minFrame = 0;
          this.maxFrame = 9;
        } else if (this.action === "down right") {
          this.frameY = 4;
          this.minFrame = 4;
          this.maxFrame = 15;
        } else if (this.action === "up right") {
          this.frameY = 1;
          this.minFrame = 3;
          this.maxFrame = 14;
    }
    draw () {
    drawSprite(images.player, this.width*this.frameX, this.height*this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    //animate sprites
    if (this.frameX < this.maxFrame) this.frameX++; 
    else (this.frameX = this.minFrame);
    }
    update (){
        if (this.action === "right"){
          if (this.x > canvas.width + this.width){ //reset check
            this.x = 0 - this.width;
            this.y = Math.random() * (canvas.height - this.height);//randomise restart y pos ensuring sprite always spawns visible in y axis
          } else {this.x += this.speed;} //move character
        } else if (this.action === "up"){
          if (this.y < (0 - this.height)) {
            this.y = canvas.height + this.height;
            this.x = Math.random() * (canvas.width - this.width);
          } else {this.y -= this.speed;}
        } else if (this.action === "down right"){
          if (this.y > (canvas.height + this.height) && this.x > (canvas.width + this.width)) {
            this.y = 0 - this.height;
            this.x = Math.random() * (canvas.width - this.width);
          } else {
            this.x += this.speed;
            this.y += this.speed;
          }
        } else if (this.action === "up right"){
          if (this.y < (0 - this.height) && this.x > (canvas.width + this.width)) {
            this.y = canvas.height + this.height;
            this.x = Math.random() * (canvas.width - this.width);
          } else {
            this.x += this.speed;
            this.y -= this.speed;
          }
        }
    }
  }
}
    
for (i = 0; i < numberOfCharacters; i++){
  characters.push(new Character()); //generate a new character  and push to the characters array ready for animation
}


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i=0; i < characters.length; i++) { //cycle through the characters array and draw/animate each
    characters[i].draw();
    characters[i].update();
    }
}

window.onload = setInterval(animate, 1000/30);

window.addEventListener("resize", function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth; //resizes canvas and sprites properly if window resized durig animation
})
console.log(characters[0].x);