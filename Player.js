export class Player{
    constructor(x, y, playerSize, canvas, ctx, mouseY, mouseX, mousedown, rightPressed, leftPressed, upPressed, downPressed){
        this.x = x;
        this.y = y;
        this.playerSize = playerSize;
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouseY = mouseY;
        this.mouseX = mouseX;
        this.upPressed = upPressed;
        this.downPressed = downPressed;
        this.leftPressed = leftPressed;
        this.rightPressed = rightPressed;
        this.mousedown = mousedown;
        this. projectiles = []


        //bind(this) is becuase in js this refers to the element that triggerd the event not the function itself, bind(this) binds it to itself insead.
        this.keyDownHandler = this.keyDownHandler.bind(this)
        document.addEventListener("keydown", this.keyDownHandler, false)

        this.keyUpHandler = this.keyUpHandler.bind(this)
        document.addEventListener("keyup", this.keyUpHandler, false)

        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        document.addEventListener("mousedown", this.mouseDownHandler, false)

        this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
        document.addEventListener("mousemove", this.mouseMoveHandler, false)

    }
    
        drawPlayer() {
            //console.log(this.x, this.y);
            
        // Calculate angle to rotate the rectangle
        const angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the ball
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.playerSize, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();

        // Save the context's current state before applying rotation
        this.ctx.save();

        // Move the origin of the canvas to the center of the rectangle (center of the ball)
        this.ctx.translate(this.x, this.y);

        // Rotate the canvas to align the rectangle with the cursor
        this.ctx.rotate(angle - Math.PI / 2);

        // Draw the rectangle, now rotated
        this.ctx.beginPath();
        this.ctx.rect(-this.playerSize / 2, -this.playerSize / 2, this.playerSize, this.playerSize * 3);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();

        // Restore the canvas to its original state (no rotation)
        this.ctx.restore();



        // Move the ball within canvas bounds
        if (this.x < this.canvas.width - this.playerSize){
          if (this.rightPressed) {
              this.x += 1
            }
        }
        if (this.x > 10){
          if (this.leftPressed) {
              this.x -= 1
            }
        }
        if ( this.y > 10){
          if (this.upPressed){
              this.y -= 1
          }
        }
        if (this.y < this.canvas.height - this.playerSize){
          if (this.downPressed){
              this.y += 1
          }
        } 

        

        if(this.mousedown){
                // Calculate the direction to shoot
                let shootAngle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
                let speed = 5;
                // Initialize the projectile with position and velocity
                this.projectiles.push({
                    x: this.x,
                    y: this.y,
                    dx: Math.cos(shootAngle) * speed,
                    dy: Math.sin(shootAngle) * speed,
                    radius: this.playerSize / 2
                });
        }
        for (let i = 0; i < this.projectiles.length; i++) {
            let p = this.projectiles[i];
    
            // Update projectile position
            p.x += p.dx;
            p.y += p.dy;
    
            // Draw the projectile
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = "#FF0000";
            this.ctx.fill();
            this.ctx.closePath();
    
            // Remove projectiles that go off-screen
            if (p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height) {
                this.projectiles.splice(i, 1);
                i--; // Adjust index after removing element
            }
        }
      this.mousedown = false
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
        const rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    mouseDownHandler(){
        this.mousedown = true
      }
}







