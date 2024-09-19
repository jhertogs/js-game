

export class Enemy {
    constructor(num, num2, enemies, activeEnemies, canvas, ctx){
        this.ctx = ctx
        this.canvas = canvas
        this.num = num
        this.num2 = num2
        this.enemies = enemies
        this.activeEnemies = activeEnemies
    }


    makeEnemies() {
        this.num += 1;
        if (this.num > 300) {
            let randx = Math.random() * canvas.width;
            let randy = Math.random() * canvas.height;
            //console.log(randx, randy);
            this.enemies.push({
                x: randx,
                y: randy,
                width: 10,
                height: 10,
                health: 2
            });
            this.num = 0;
        }
    }
    
    spawn() {
        this.makeEnemies();
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            this.ctx.beginPath();
            this.ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
            this.ctx.fillStyle = "#00ff00";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
    
    makeActiveEnemies(){
        this.num2 += 1
        if (this.num2 > 500){
            let randx = Math.random() * canvas.width;
            let randy = Math.random() * canvas.height;
            this.activeEnemies.push({
                x: randx,
                y: randy,
                width: 10,
                height: 10,
                speed: 2
            })
            this.num2 = 0
        }
    }
    
    createActiveEnemies(){
        this.makeActiveEnemies()
        for(let i=0; i < this.activeEnemies.length; i++){
    
            let activeEnemy = this.activeEnemies[i]
            this.ctx.beginPath()
            this.ctx.rect(activeEnemy.x, activeEnemy.y, activeEnemy.width, activeEnemy.height)
            this.ctx.fillStyle = "#000000";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
    
    moveActiveEnemies(x, y) {
        for (let i = 0; i < this.activeEnemies.length; i++) {
            let activeEnemy = this.activeEnemies[i];
            
            // Calculate direction towards the player
            let directionX = x - activeEnemy.x;
            let directionY = y - activeEnemy.y;
            let length = Math.sqrt(directionX * directionX + directionY * directionY);
            
            // Normalize direction
            directionX /= length;
            directionY /= length;
            
            // Move the enemy towards the player
            activeEnemy.x += directionX * activeEnemy.speed;
            activeEnemy.y += directionY * activeEnemy.speed;
        }
        this.createActiveEnemies();
    }

    spawnActiveEnemies(x, y){
        this.moveActiveEnemies(x, y)
    }

}