import { Player } from "./Player.js"
import { Bullets } from "./Bullets.js"
import { Enemies } from "./Enemies.js"
import { Collision } from "./Collision.js"
import { Movement } from "./Movement.js"
import { Canvas } from "./canvas.js"

let canvas = new Canvas()
let player = new Player()
let drawEnemies = new Enemies()
let checkCollison = new Collision()
let move = new Movement()




function draw() {
    player.draw()
    drawEnemies.createActive()
    drawEnemies.createPassive()
    checkCollison.check()
    console.log(canvas.rightPressed);
    
}
function startgame(){
    setInterval(draw, 10)
}

document.getElementById("button").addEventListener("click", function() {
    startgame()
    this.disabled  = true
})