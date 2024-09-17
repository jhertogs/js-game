import { Canvas } from "./canvas";

export class Enemies{
    createPassive(){
        let cnvs = new Canvas()
            cnvs.num += 1;
        if (cnvs.num > 30) {
            let randx = Math.random() * canvas.width;
            let randy = Math.random() * canvas.height;
            //console.log(randx, randy);
            cnvs.enemies.push({
                x: randx,
                y: randy,
                width: 10,
                height: 10
            });
            cnvs.num = 0;
        }
        for (let i = 0; i < cnvs.enemies.length; i++) {
            let enemy = cnvs.enemies[i];
            cnvs.ctx.beginPath();
            cnvs.ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
            cnvs.ctx.fillStyle = "#00ff00";
            cnvs.ctx.fill();
            cnvs.ctx.closePath();
        }
    }

    createActive(){
        let cnvs = new Canvas()

        for (let i = 0; i < cnvs.activeEnemies.length; i++) {
        let activeEnemy = cnvs.activeEnemies[i];
        
        // Calculate direction towards the player
        let directionX = cnvs.x - activeEnemy.x;
        let directionY = cnvs.y - activeEnemy.y;
        let length = Math.sqrt(directionX * directionX + directionY * directionY);
        
        // Normalize direction
        directionX /= length;
        directionY /= length;
        
        // Move the enemy towards the player
        activeEnemy.x += directionX * activeEnemy.speed;
        activeEnemy.y += directionY * activeEnemy.speed;
    }

        cnvs.num2 += 1
        if (cnvs.num2 > 500){
            let randx = Math.random() * cnvs.canvas.width;
            let randy = Math.random() * cnvs.canvas.height;
            cnvs.activeEnemies.push({
                x: randx,
                y: randy,
                width: 10,
                height: 10,
                speed: 2
            })
            cnvs.num2 = 0
        }

        for(let i=0; i < cnvs.activeEnemies.length; i++){

            let activeEnemy = cnvs.activeEnemies[i]
            cnvs.ctx.beginPath()
            cnvs.ctx.rect(activeEnemy.x, activeEnemy.y, activeEnemy.width, activeEnemy.height)
            cnvs.ctx.fillStyle = "#000000";
            cnvs.ctx.fill();
            cnvs.ctx.closePath();
        }
    }

}