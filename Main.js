import { Player } from "./Player.js"
import { Enemy } from "./Enemies.js"
import { Collision } from "./Collision.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let x = canvas.width / 2
let y = canvas.height - 30

let playerSize = 10
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
//let points = 0

let player  = new Player(
     x,
     y,
     playerSize,
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

let spawnEnemies = new Enemy(
     num,
     num2,
     enemies,
     activeEnemies,
     canvas,
     ctx
    )

let collision = new Collision()
function draw() {
    player.drawPlayer()
    spawnEnemies.spawn()
    spawnEnemies.spawnActiveEnemies(player.x, player.y)
    collision.collideCheck(player.projectiles, spawnEnemies.enemies, player, spawnEnemies.activeEnemies, player.x, player.y) 
}//i pass player instance as param to change playersize property of Player class in collision class
function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})