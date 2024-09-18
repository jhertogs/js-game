import { Player } from "./Player.js"

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

let enemies = []
let num = 0;

let num2 = 0
let activeEnemies = []

let player  = new Player(
     x,
     y,
     ballRadius,
     canvas,
     ctx,
     mouseY,
     mouseX,
     mousedown,
     rightPressed,
     leftPressed,
     upPressed,
     downPressed
    )



function makeEnemies() {
    num += 1;
    if (num > 80) {
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

function makeActiveEnemies(){
    num2 += 1
    if (num2 > 30){
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
        let directionX = player.x - activeEnemy.x;
        let directionY = player.y - activeEnemy.y;
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

function collideCheck() {
    // Check for collisions between projectiles and enemies
    for (let i = 0; i < player.projectiles.length; i++) {
        let currentProj = player.projectiles[i];
        
        for (let j = 0; j < enemies.length; j++) {
            let currentEnem = enemies[j];
            if (
                currentProj.x + currentProj.radius > currentEnem.x &&
                currentProj.x - currentProj.radius < currentEnem.x + currentEnem.width &&
                currentProj.y + currentProj.radius > currentEnem.y &&
                currentProj.y - currentProj.radius < currentEnem.y + currentEnem.height
            ) {
                enemies.splice(j, 1);
                player.projectiles.splice(i, 1); 
                player.playerSize += 0.2;  // Increase the ball radius on hit
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
                player.projectiles.splice(i, 1);
                i--;
                console.log("ok");
                
                break;
            }
        }
    }

    // Check if player collides with active enemies
    for (let k = 0; k < activeEnemies.length; k++) {
        let currentActiveEnem = activeEnemies[k];
        let distanceX = player.x - currentActiveEnem.x;
        let distanceY = player.y - currentActiveEnem.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < ballRadius + Math.max(currentActiveEnem.width, currentActiveEnem.height) /2 ) {
            // Handle player collision with active enemy
            //console.log("Player hit by enemy!");
            activeEnemies.splice(k, 1);
            k--;
            break;
        }
    }
}

function draw() {
    //console.log(rightPressed)
    player.drawPlayer()
    
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