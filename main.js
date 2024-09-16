class main{
    constructor(){
    }
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30
let ballRadius = 10
let rightPressed = false;
let leftPressed = false;
let upPressed = false
let downPressed = false
let mousedown = false

let mouseX = 0;
let mouseY = 0;

class Player{
    draw(){
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
      ctx.rect(-ballRadius / 2, -ballRadius / 2, ballRadius, ballRadius * 3);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();

      // Restore the canvas to its original state (no rotation)
      ctx.restore();



      // Move the ball within canvas bounds
      if (x < canvas.width - ballRadius){
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
      if (y < canvas.height - ballRadius){
        if (downPressed){
            y += 1
        }
      } 

      if(mousedown){
        shoot()
      }
    drawProjectiles()
    mousedown = false
    }
}
let player = new Player


let projectiles = [];

function shoot() {
    // Calculate the direction to shoot
    let shootAngle = Math.atan2(mouseY - y, mouseX - x);
    let speed = 5; // Adjust the speed as necessary

    // Initialize the projectile with position and velocity
    projectiles.push({
        x: x,
        y: y,
        dx: Math.cos(shootAngle) * speed,
        dy: Math.sin(shootAngle) * speed,
        radius: ballRadius / 2
    });
}

function drawProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        let p = projectiles[i];

        // Update projectile position
        p.x += p.dx;
        p.y += p.dy;

        // Draw the projectile
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();

        // Remove projectiles that go off-screen
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            projectiles.splice(i, 1);
            i--; // Adjust index after removing element
        }
    }
}

let enemies = []

let num = 0;

function makeEnemies() {
    num += 1;
    if (num > 30) {
        let randx = Math.random() * canvas.width;
        let randy = Math.random() * canvas.height;
        //console.log(randx, randy);
        enemies.push({
            x: randx,
            y: randy,
            width: 10,
            height: 10
        });
        num = 0;
    }
}

function spawnEnemies() {
    makeEnemies();
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        ctx.beginPath();
        ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = "#00ff00";
        ctx.fill();
        ctx.closePath();
    }
}


let num2 = 0
let activeEnemies = []

function makeActiveEnemies(){
    num2 += 1
    if (num2 > 500){
        let randx = Math.random() * canvas.width;
        let randy = Math.random() * canvas.height;
        activeEnemies.push({
            x: randx,
            y: randy,
            width: 10,
            height: 10,
            speed: 2
        })
        num2 = 0
    }
}

function spawnActiveEnemies(){
    makeActiveEnemies()
    for(let i=0; i < activeEnemies.length; i++){

        let activeEnemy = activeEnemies[i]
        ctx.beginPath()
        ctx.rect(activeEnemy.x, activeEnemy.y, activeEnemy.width, activeEnemy.height)
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
    
}

function moveActiveEnemies() {
    for (let i = 0; i < activeEnemies.length; i++) {
        let activeEnemy = activeEnemies[i];
        
        // Calculate direction towards the player
        let directionX = x - activeEnemy.x;
        let directionY = y - activeEnemy.y;
        let length = Math.sqrt(directionX * directionX + directionY * directionY);
        
        // Normalize direction
        directionX /= length;
        directionY /= length;
        
        // Move the enemy towards the player
        activeEnemy.x += directionX * activeEnemy.speed;
        activeEnemy.y += directionY * activeEnemy.speed;
    }
    spawnActiveEnemies();
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

function collideCheck() {
    // Check for collisions between projectiles and enemies
    for (let i = 0; i < projectiles.length; i++) {
        let currentProj = projectiles[i];
        
        for (let j = 0; j < enemies.length; j++) {
            let currentEnem = enemies[j];
            if (
                currentProj.x + currentProj.radius > currentEnem.x &&
                currentProj.x - currentProj.radius < currentEnem.x + currentEnem.width &&
                currentProj.y + currentProj.radius > currentEnem.y &&
                currentProj.y - currentProj.radius < currentEnem.y + currentEnem.height
            ) {
                enemies.splice(j, 1);
                projectiles.splice(i, 1); 
                ballRadius += 0.2;  // Increase the ball radius on hit
                i--; 
                break;
            }
        }

        // Check collision with active enemies
        for (let n = 0; n < activeEnemies.length; n++) {
            let currentActiveEnem = activeEnemies[n];
            if (
                currentProj.x + currentProj.radius > currentActiveEnem.x &&
                currentProj.x - currentProj.radius < currentActiveEnem.x + currentActiveEnem.width &&
                currentProj.y + currentProj.radius > currentActiveEnem.y &&
                currentProj.y - currentProj.radius < currentActiveEnem.y + currentActiveEnem.height
            ) {
                activeEnemies.splice(n, 1);
                projectiles.splice(i, 1);
                i--;
                break;
            }
        }
    }

    // Check if player collides with active enemies
    for (let k = 0; k < activeEnemies.length; k++) {
        let currentActiveEnem = activeEnemies[k];
        let distanceX = x - currentActiveEnem.x;
        let distanceY = y - currentActiveEnem.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < ballRadius + Math.max(currentActiveEnem.width, currentActiveEnem.height) /2 ) {
            // Handle player collision with active enemy
            console.log("Player hit by enemy!");
            activeEnemies.splice(k, 1);
            k--;
            break;
        }
    }
}

function draw() {
    player.draw()
    moveActiveEnemies()
    spawnEnemies()
    collideCheck()
}
function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})
