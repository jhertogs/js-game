
export class Upgrade{
    constructor(ctx, canvas, boxWidth, boxHeight){
        this.boxHeight = boxHeight
        this.boxWidth = boxWidth
        this.ctx = ctx
        this.canvas = canvas
        this.canvasLeft = canvas.offsetLeft
        this.canvasTop = canvas.offsetTop
        this.enoughPts = false
        this.clickedUpgradeBtn = false
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

    }

    handleClick(e) {
        if (!this.enoughPts) return; 
        let x = e.pageX - this.canvasLeft;
        let y = e.pageY - this.canvasTop;

        // Check if click is inside the blue rectangle (upgrade button)
        if (y > 40 && y < 40 + this.boxHeight && x > 190 && x < 190 + this.boxWidth && this.clickedUpgradeBtn == false) {
            this.clickedUpgradeBtn = true
            alert('Clicked the upgrade button!');
            // Perform your upgrade action here
        }
    }


    upgradePopUp(points){

        //console.log("upgrades", points);
        
        this.ctx.beginPath()
        this.ctx.font="16px Verdana";
        this.ctx.fillStyle = "#000000"
        this.ctx.fillText("Score: " + points,190,20);
        this.ctx.closePath();
        
        if(points > 5 && this.clickedUpgradeBtn == false){
            this.enoughPts = true
            
            this.ctx.beginPath()
            this.ctx.rect(190, 40, this.boxWidth, this.boxHeight)
            //w: 50 H: 30
            this.ctx.fillStyle = "#00FFFF"
            this.ctx.fill()
            this.ctx.closePath()
            
        }
    }

}