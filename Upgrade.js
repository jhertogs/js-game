import { Player } from "./Player"

export class Upgrade{
    constructor(ctx, canvas, boxWidth, boxHeight, boxX, boxY, player, collision, pointsToUpgrade){
        this.boxX = boxX
        this.boxX2 = 0
        this.boxX3 = 0
        this.boxY = boxY
        this.boxHeight = boxHeight
        this.boxWidth = boxWidth
        this.ctx = ctx
        this.canvas = canvas
        this.canvasLeft = canvas.offsetLeft
        this.canvasTop = canvas.offsetTop
        this.enoughPts = false
        this.clickedUpgradeBtn = false
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.player = player
        this.collision = collision
        this.pointsToUpgrade = pointsToUpgrade

        this.upgrades = {
            1: () => {this.player.playerSize += 5},
            2: () => {console.log("2")},
            3: () => {console.log("3")},
            4: () => {console.log("4")},
            5: () => {console.log("5")},
            6: () => {console.log("6")},
            7: () => {console.log("7")},
            8: () => {console.log("8")},
            9: () => {console.log("9")},
            10: () => {console.log("10")},
        }
    }

    handleClick(e) {
        if (!this.enoughPts) return; 
        let x = e.pageX - this.canvasLeft;
        let y = e.pageY - this.canvasTop;

        // Check if click is inside the blue rectangle (upgrade button)
        if (
            y > this.boxY 
            && y < this.boxY + this.boxHeight 
            && x > this.boxX 
            && x < this.boxX + this.boxWidth 
            && this.clickedUpgradeBtn == false
        ) {
            //y: 40 x: 190
            this.collision.points -= this.pointsToUpgrade
            this.clickedUpgradeBtn = true
            let randnum = Math.floor((Math.random() * 10)) + 1
            this.upgrades[randnum]()
            alert('clicked the upgrade button!')
        }

        if (
            y > this.boxY
            && y < this.boxY + this.boxHeight
            && x > this.boxX2
            && x < this.boxX2 + this.boxWidth
            && this.clickedUpgradeBtn == false
        ){
            this.collision.points -= this.pointsToUpgrade
            this.clickedUpgradeBtn = true
            alert('Clicked the upgrade button!');
        }

        if (
            y > this.boxY
            && y < this.boxY + this.boxHeight
            && x > this.boxX3
            && x < this.boxX3 + this.boxWidth
            && this.clickedUpgradeBtn == false
        ){
            this.collision.points -= this.pointsToUpgrade
            this.clickedUpgradeBtn = true
            alert('Clicked the upgrade button!');
        }
    }


    upgradePopUp(){
        this.ctx.beginPath()
        this.ctx.font="16px Verdana";
        this.ctx.fillStyle = "#000000"
        this.ctx.fillText("Score: " + this.collision.points, 190,20);
        this.ctx.closePath();

        if(this.collision.points >= this.pointsToUpgrade){
                this.clickedUpgradeBtn = false
                this.enoughPts = true
            
                this.ctx.beginPath()
                this.ctx.rect(this.boxX, this.boxY, this.boxWidth, this.boxHeight)
                //w: 50 H: 30
                this.ctx.fillStyle = "#00FFFF"
                this.ctx.fill()
                this.ctx.closePath()

                //box 2

                this.boxX2 = (this.boxX + this.boxWidth) + 10

                this.ctx.beginPath()
                this.ctx.rect(this.boxX2, this.boxY, this.boxWidth, this.boxHeight)
                //w: 50 H: 30
                this.ctx.fillStyle = "#00FFFF"
                this.ctx.fill()
                this.ctx.closePath()

                //box 3

                this.boxX3 = (this.boxX2 + this.boxWidth) + 10
            
                this.ctx.beginPath()
                this.ctx.rect(this.boxX3, this.boxY, this.boxWidth, this.boxHeight)
                //w: 50 H: 30
                this.ctx.fillStyle = "#00FFFF"
                this.ctx.fill()
                this.ctx.closePath()
            }
                       
    }

}