import { Canvas } from "./canvas"

export class Movement {
    constructor(){
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("mousemove", this.mouseMoveHandler, false);
        document.addEventListener("mousedown", this.mouseDownHandler, false);
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
        let cnvs = new Canvas()
        const rect = cnvs.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    mouseDownHandler() {
        this.mousedown = true
      }
}
