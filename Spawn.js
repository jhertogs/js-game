
class Spawn {

    spawnEnem(enemies){
        for (let i = 0; i < enemies.length; i++) {

            let enemy = enemies[i];
            this.ctx.beginPath();
            this.ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
            this.ctx.fillStyle = "#00ff00";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
}