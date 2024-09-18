class Player{
    constructor(x, y, playerSize, canvas, ctx, mouseY, mouseX){
        this.x = x;
        this.y = y;
        this.playerSize = playerSize;
        this.cnvs = canvas;
        this.ctx = ctx;
        this.mouseY = mouseY
        this.mouseX = mouseX
    }
    
        drawPlayer() {
        // Calculate angle to rotate the rectangle
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







