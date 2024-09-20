
export class Upgrade{
    constructor(ctx, canvas){
        this.ctx = ctx
        this.canvas = canvas
    }

    upgradePopUp(points){
        
        console.log("upgrades", points);
        
        this.ctx.beginPath()
        this.ctx.font="16px Verdana";
        this.ctx.fillStyle = "#000000"
        this.ctx.fillText("Score: " + points,190,20);
        this.ctx.closePath();
        
        if(points > 50){
            
            
        }
    }

}