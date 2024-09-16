import { Player } from "./Player.js"

export class Canvas{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.x = this.canvas.width / 2
        this.y = this.canvas.height - 30
        this.ballRadius = 10
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false
        this.downPressed = false
        this.mousedown = false
        this.mouseX = 0;
        this.mouseY = 0;
        this.num = 0;
        this.projectiles = [];
        this.enemies = []
        this.num2 = 0
        this.activeEnemies = []

        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", this.mouseMoveHandler, false)
        document.addEventListener("mousedown", this.mouseDownHandler, false)

        
    }
    keyDownHandler(e) {
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

    keyUpHandler(e) {
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

    mouseMoveHandler(e) {
        const rect = this.canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }

    mouseDownHandler(){
        mousedown = true
      }
}



//const canvas = document.getElementById("canvas")
//const ctx = canvas.getContext("2d")
//
//let x = canvas.width / 2
//let y = canvas.height - 30
//let ballRadius = 10
//let rightPressed = false;
//let leftPressed = false;
//let upPressed = false
//let downPressed = false
//let mousedown = false
//
//let mouseX = 0;
//let mouseY = 0;
//let num = 0;
//
//let projectiles = [];
//let enemies = []
//
//let num2 = 0
//let activeEnemies = []





class Bullets{
    shoot() {

        let shootAngle = Math.atan2(mouseY - y, mouseX - x);
        let speed = 5; 

        projectiles.push({
            x: x,
            y: y,
            dx: Math.cos(shootAngle) * speed,
            dy: Math.sin(shootAngle) * speed,
            radius: ballRadius / 2
        });
    }
    draw() {
        //drawprojectiles
        for (let i = 0; i < projectiles.length; i++) {
            let p = projectiles[i];

            p.x += p.dx;
            p.y += p.dy;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();

            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                projectiles.splice(i, 1);
                i--;
            }
        }
    }
}
let bullets = new Bullets()

class Enemies{
    createPassive(){
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
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            ctx.beginPath();
            ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
            ctx.fillStyle = "#00ff00";
            ctx.fill();
            ctx.closePath();
        }
    }

    createActive(){

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

        for(let i=0; i < activeEnemies.length; i++){

            let activeEnemy = activeEnemies[i]
            ctx.beginPath()
            ctx.rect(activeEnemy.x, activeEnemy.y, activeEnemy.width, activeEnemy.height)
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
        }
    }

}
let drawEnemies = new Enemies




//document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false)
//document.addEventListener("mousedown", mouseDownHandler, false)
//
//function keyDownHandler(e) {
//    if (e.key === "d" || e.key === "ArrowRight") {
//      rightPressed = true;
//    } 
//    if (e.key === "a" || e.key === "ArrowLeft") {
//      leftPressed = true;
//    }
//    if (e.key === "w" || e.key === "ArrowUp"){
//        upPressed = true
//    }
//    if (e.key === "s" || e.key === "ArrowDown"){
//        downPressed = true
//    }
//}
//  
//function keyUpHandler(e) {
//    if (e.key === "d" || e.key === "ArrowRight") {
//      rightPressed = false;
//    } 
//    if (e.key === "a" || e.key === "ArrowLeft") {
//      leftPressed = false;
//    }
//    if (e.key === "w" || e.key === "ArrowUp"){
//        upPressed = false
//    }
//    if (e.key === "s" || e.key === "ArrowDown"){
//        downPressed = false
//    }
//}
//
//function mouseMoveHandler(e) {
//    const rect = canvas.getBoundingClientRect();
//    mouseX = e.clientX - rect.left;
//    mouseY = e.clientY - rect.top;
//}
//function mouseDownHandler(){
//  mousedown = true
//}

class Collision {
    check(){
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
}

let checkCollison = new Collision()


function draw() {
    player.draw()
    drawEnemies.createActive()
    drawEnemies.createPassive()
    checkCollison.check()
}
function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})
