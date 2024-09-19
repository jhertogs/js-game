
export class Collision {

        collideCheck(projectiles, enemies, player, activeEnemies, x , y) {
        // Check for collisions between projectiles and enemies
        for (let i = 0; i < projectiles.length; i++) {
            let currentProj = projectiles[i];
            let projDamage = currentProj.damage
            
            for (let j = 0; j < enemies.length; j++) {
                let currentEnem = enemies[j];
                if (
                    currentProj.x + currentProj.radius > currentEnem.x &&
                    currentProj.x - currentProj.radius < currentEnem.x + currentEnem.width &&
                    currentProj.y + currentProj.radius > currentEnem.y &&
                    currentProj.y - currentProj.radius < currentEnem.y + currentEnem.height
                ) { 
                    //if proj and enemy collide make enemies move 1 "step" towards the direction of the projectile (so appears to move back)
                    enemies[j].x += currentProj.dx 
                    enemies[j].y += currentProj.dy

                    //if collision is detected subtract enemy and projectile health by 1
                    enemies[j].health = enemies[j].health - projDamage

                    currentProj.bulletHealth--
                    //if health is zero delete the enemy and increase playersize
                    if(enemies[j].health < 1){
                        enemies.splice(j, 1);
                        player.playerSize += 0.2;
                    }

                    if(currentProj.bulletHealth < 0){
                       projectiles.splice(i, 1); 
                    }

                    
                    //console.log( "Col: ", player.playerSize);
                    i--; 
                    break;
                }
            }

            // Check collision with active enemies
            for (let n = 0; n < activeEnemies.length; n++) {
                let currentActiveEnem = activeEnemies[n];
                if (
                    currentProj.x + currentProj.radius > currentActiveEnem.x &&
                    currentProj.x - currentProj.radius < currentActiveEnem.x + currentActiveEnem.width &&
                    currentProj.y + currentProj.radius > currentActiveEnem.y &&
                    currentProj.y - currentProj.radius < currentActiveEnem.y + currentActiveEnem.height
                ) {

                    activeEnemies[n].x += currentProj.dx
                    activeEnemies[n].y += currentProj.dy

                    activeEnemies[n].health = activeEnemies[n].health - projDamage
                    currentProj.bulletHealth--

                    if(activeEnemies[n].health < 0){
                        activeEnemies.splice(n, 1);
                    }
                    if (currentProj.bulletHealth < 0){
                        projectiles.splice(i, 1);
                    }
                    
                    i--;
                    break;
                }
            }
        }

        // Check if player collides with active enemies
        for (let k = 0; k < activeEnemies.length; k++) {
            let currentActiveEnem = activeEnemies[k];
            let distanceX = x - currentActiveEnem.x;
            let distanceY = y - currentActiveEnem.y;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < player.playerSize + Math.max(currentActiveEnem.width, currentActiveEnem.height) /2 ) {
                // Handle player collision with active enemy
                player.playerHealth -= 5
                
                activeEnemies.splice(k, 1);
                k--;
                break;
            }
        }
    }
}
