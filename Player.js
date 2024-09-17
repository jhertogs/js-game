import { Canvas } from "./canvas";

export class Player{
  draw(){
    let cnvs = new Canvas()

    const angle = Math.atan2(cnvs.mouseY - cnvs.y, cnvs.mouseX - cnvs.x);

    cnvs.ctx.clearRect(0, 0, cnvs.canvas.width, cnvs.canvas.height);

    // Draw the ball
    cnvs.ctx.beginPath();
    cnvs.ctx.arc(cnvs.x, cnvs.y, cnvs.ballRadius, 0, Math.PI * 2);
    cnvs.ctx.fillStyle = "#0095DD";
    cnvs.ctx.fill();
    cnvs.ctx.closePath();

    // Save the context's current state before applying rotation
    cnvs.ctx.save();

    // Move the origin of the canvas to the center of the rectangle (center of the ball)
    cnvs.ctx.translate(cnvs.x, cnvs.y);

    // Rotate the canvas to align the rectangle with the cursor
    cnvs.ctx.rotate(angle - Math.PI / 2);

    // Draw the rectangle, now rotated
    cnvs.ctx.beginPath();
    cnvs.ctx.rect(-cnvs.ballRadius / 2, -cnvs.ballRadius / 2, cnvs.ballRadius, cnvs.ballRadius * 3);
    cnvs.ctx.fillStyle = "#0095DD";
    cnvs.ctx.fill();
    cnvs.ctx.closePath();

    // Restore the canvas to its original state (no rotation)
    cnvs.ctx.restore();



    // Move the ball within canvas bounds
    if (cnvs.x < cnvs.canvas.width - cnvs.ballRadius){
      if (cnvs.rightPressed) {
          cnvs.x += 1
        }
    }
    if (cnvs.x > 10){
      if (cnvs.leftPressed) {
          cnvs.x -= 1
        }
    }
    if ( cnvs.y > 10){
      if (cnvs.upPressed){
          cnvs.y -= 1
      }
    }
    if (cnvs.y < cnvs.canvas.height - cnvs.ballRadius){
      if (cnvs.downPressed){
          cnvs.y += 1
      }
    } 

    if(cnvs.mousedown){
      bullets.shoot()
    }
  bullets.draw()
  cnvs.mousedown = false
  }
}
