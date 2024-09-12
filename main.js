const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30
console.log(canvas.width, canvas.height);

// widht = 500 height = 350

let shootx
let shooty
const ballRadius = 10

let rightPressed = false;
let leftPressed = false;
let upPressed = false
let downPressed = false
let mousedown = false

let mouseX = 0;
let mouseY = 0;

function drawBall() {
    // Calculate angle to rotate the rectangle
    const angle = Math.atan2(mouseY - y, mouseX - x);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Save the context's current state before applying rotation
    ctx.save();

    // Move the origin of the canvas to the center of the rectangle (center of the ball)
    ctx.translate(x, y);

    // Rotate the canvas to align the rectangle with the cursor
    ctx.rotate(angle - Math.PI / 2);

    // Draw the rectangle, now rotated
    ctx.beginPath();
    ctx.rect(-ballRadius / 2, -ballRadius / 2, 10, 30);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Restore the canvas to its original state (no rotation)
    ctx.restore();



    // Move the ball within canvas bounds
    if (x < canvas.width - 10){
      if (rightPressed) {
          x += 1
        }
    }
    if (x > 10){
      if (leftPressed) {
          x -= 1
        }
    }
    if ( y > 10){
      if (upPressed){
          y -= 1
      }
    }
    if (y < canvas.height - 10){
      if (downPressed){
          y += 1
      }
    } 

    if(mousedown){
      shoot()
    }
}

function shoot() {
  shootx +=1
  shooty +=1

  ctx.beginPath()
  ctx.arc(x + shootx, y + shooty, ballRadius / 2, 0, Math.PI * 2)
  ctx.fillStyle = "#0095DD";
  ctx.fill()

  ctx.closePath()
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false)
document.addEventListener("mousedown", mouseDownHandler, false)

function keyDownHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = true;
    } 
    if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
    if (e.key === "w" || e.key === "ArrowUp"){
        upPressed = true
    }
    if (e.key === "s" || e.key === "ArrowDown"){
        downPressed = true
    }
}
  
function keyUpHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = false;
    } 
    if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
    if (e.key === "w" || e.key === "ArrowUp"){
        upPressed = false
    }
    if (e.key === "s" || e.key === "ArrowDown"){
        downPressed = false
    }
}

function mouseMoveHandler(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}
function mouseDownHandler(){
  mousedown = true
}


function draw() {
    drawBall();
}
function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})
