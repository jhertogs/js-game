import { Player } from "./Player.js"
import { Bullets } from "./Bullets.js"
import { Enemies } from "./Enemies.js"
import { Collision } from "./Collision.js"


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
          this.rightPressed = true;
        } 
        if (e.key === "a" || e.key === "ArrowLeft") {
          this.leftPressed = true;
        }
        if (e.key === "w" || e.key === "ArrowUp"){
            this.upPressed = true
        }
        if (e.key === "s" || e.key === "ArrowDown"){
            this.downPressed = true
        }
    }

    keyUpHandler(e) {
        if (e.key === "d" || e.key === "ArrowRight") {
          this.rightPressed = false;
        } 
        if (e.key === "a" || e.key === "ArrowLeft") {
          this.leftPressed = false;
        }
        if (e.key === "w" || e.key === "ArrowUp"){
            this.upPressed = false
        }
        if (e.key === "s" || e.key === "ArrowDown"){
            this.downPressed = false
        }
    }

    mouseMoveHandler(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    mouseDownHandler(){
        this.mousedown = true
      }
}
let canvas = new Canvas()

let player = new Player()

let bullets = new Bullets()


let drawEnemies = new Enemies()
let checkCollison = new Collision()
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
