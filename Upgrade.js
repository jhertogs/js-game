
export class Upgrade{
    constructor(ctx, canvas){
        this.ctx = ctx
        this.canvas = canvas
        this.canvasLeft = canvas.offsetLeft
        this.canvasTop = canvas.offsetTop
        this.enoughPts = false
    }

    upgradePopUp(points){

        this.canvas.addEventListener('click', (e) => {

            let x = e.pageX - this.canvasLeft
            let y = e.pageY - this.canvasTop
            //this.ctx.rect(190, 40, 50, 30)
            //x y width height

            //y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width
            // y y height x x widht

            if (y > 40 && y < 40 + 30 && x > 190 && x < 190 + 50 && this.enoughPts == true) {
                alert('clicked an element');
            }
        })

        
        
        //console.log("upgrades", points);
        
        this.ctx.beginPath()
        this.ctx.font="16px Verdana";
        this.ctx.fillStyle = "#000000"
        this.ctx.fillText("Score: " + points,190,20);
        this.ctx.closePath();
        
        if(points > 5){
            this.enoughPts = true
            
            this.ctx.beginPath()
            this.ctx.rect(190, 40, 50, 30)
            this.ctx.fillStyle = "#00FFFF"
            this.ctx.fill()
            this.ctx.closePath()
            
        }
    }

}