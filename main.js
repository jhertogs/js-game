const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30
console.log(canvas.width, canvas.height);

// widht = 500 height = 350

let dx = 0
let dy = 0
const ballRadius = 10

let rightPressed = false;
let leftPressed = false;
let upPressed = false
let downPressed = false


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    console.log(x, y);
    
    if (x < canvas.width && x > 0 && y < canvas.height && y > 0){
        if (rightPressed) {
          x += 1
        }
      if (leftPressed) {
          x -= 1
        }
      if (upPressed){
          y -= 1
      }
      if (downPressed){
          y += 1
      }
    }
    
    
    //if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    //    dx = -dx;
    //  }
    //  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    //    dy = -dy;
    //  }
      
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    // x += dx;
    // y += dy;

    
    

  }
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
  
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
  

function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})