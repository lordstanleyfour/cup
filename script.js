const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//load images
const images = {}; //object for storing images
images.player = new Image();
images.player.src = "character.png"; //sprite sheet location
const characterActions = ["up", "top right", "right", "down right", "down", "jump"]
const characters = []; //characters and their attributes are stored here

class Character { //js object which creates a character constructor to generate variables for characters
    constructor(){
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3;
        this.frameY = 3;
        this.x = 0;
        this.y = 0;
        this.speed = (Math.random() * 1.5) + 3.5;
        this.action = "right";
    }
    draw() {
    drawSprite(images.player, this.width*this.frameX, this.height*this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    //animate sprites
    if (this.frameX < 13) this.frameX++;
    else (this.frameX = 3);
    }
    update (){
        if (this.action === "right"){
            if (this.x < canvas.width + this.width) this.x += this.speed;
            else this.x = 0 - this.width;            
        }
    }
}
characters.push(new Character());//generate a new character  and push to the characters array

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    characters[0].draw();
    characters[0].update();
}

window.onload = setInterval(animate, 1000/30);

window.addEventListener("resize", function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth; //resizes canvas and sprites properly if window resized durig animation
})
console.log(characters[0].x);