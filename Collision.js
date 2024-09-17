import { Canvas } from "./canvas";

export class Collision {
    check(){
        let cnvs = new Canvas()

            for (let i = 0; i < cnvs.projectiles.length; i++) {
            let currentProj = cnvs.projectiles[i];
            
            for (let j = 0; j < cnvs.enemies.length; j++) {
                let currentEnem = cnvs.enemies[j];
                if (
                    currentProj.x + currentProj.radius > currentEnem.x &&
                    currentProj.x - currentProj.radius < currentEnem.x + currentEnem.width &&
                    currentProj.y + currentProj.radius > currentEnem.y &&
                    currentProj.y - currentProj.radius < currentEnem.y + currentEnem.height
                ) {
                    cnvs.enemies.splice(j, 1);
                    cnvs.projectiles.splice(i, 1); 
                    cnvs.ballRadius += 0.2;  // Increase the ball radius on hit
                    i--; 
                    break;
                }
            }

            // Check collision with active enemies
            for (let n = 0; n < cnvs.activeEnemies.length; n++) {
                let currentActiveEnem = cnvs.activeEnemies[n];
                if (
                    currentProj.x + currentProj.radius > currentActiveEnem.x &&
                    currentProj.x - currentProj.radius < currentActiveEnem.x + currentActiveEnem.width &&
                    currentProj.y + currentProj.radius > currentActiveEnem.y &&
                    currentProj.y - currentProj.radius < currentActiveEnem.y + currentActiveEnem.height
                ) {
                    cnvs.activeEnemies.splice(n, 1);
                    cnvs.projectiles.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        // Check if player collides with active enemies
        for (let k = 0; k < cnvs.activeEnemies.length; k++) {
            let currentActiveEnem = cnvs.activeEnemies[k];
            let distanceX = cnvs.x - cnvs.currentActiveEnem.x;
            let distanceY = cnvs.y - cnvs.currentActiveEnem.y;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < cnvs.ballRadius + Math.max(currentActiveEnem.width, currentActiveEnem.height) /2 ) {
                // Handle player collision with active enemy
                console.log("Player hit by enemy!");
                cnvs.activeEnemies.splice(k, 1);
                k--;
                break;
            }
        } 
    }
}