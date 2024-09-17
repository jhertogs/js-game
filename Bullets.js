import { Canvas } from "./canvas";

export class Bullets{
    
    shoot() {
        let cnvs = new Canvas()
        let shootAngle = Math.atan2(mouseY - y, mouseX - x);
        let speed = 5; 

        projectiles.push({
            x: cnvs.x,
            y: cnvs.y,
            dx: Math.cos(shootAngle) * speed,
            dy: Math.sin(shootAngle) * speed,
            radius: cnvs.ballRadius / 2
        });
    }
    draw() {
        let cnvs = new Canvas()
        //drawprojectiles
        for (let i = 0; i < cnvs.projectiles.length; i++) {
            let p = cnvs.projectiles[i];

            p.x += p.dx;
            p.y += p.dy;
            
            cnvs.ctx.beginPath();
            cnvs.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            cnvs.ctx.fillStyle = "#FF0000";
            cnvs.ctx.fill();
            cnvs.ctx.closePath();

            if (p.x < 0 || p.x > cnvs.canvas.width || p.y < 0 || p.y > cnvs.canvas.height) {
                cnvs.projectiles.splice(i, 1);
                i--;
            }
        }
    }
}