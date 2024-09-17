
import { Movement } from "./Movement"

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

