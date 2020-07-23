class Walker {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx
        this.width = 10;
        this.height = 10;
        this.velocityX = 0;
        this.velocityY = 0;
        this.getCanvasDimensions()
        this.draw();
    }
    getCanvasDimensions() {
        let canvas = document.getElementById('canvas').getBoundingClientRect()
        this.canvasHeight = canvas.height
        this.canvasWidth = canvas.width

    }
    isOut() {
        const { x, y, canvasHeight, canvasWidth } = this
        return (x < 0 || x > canvasWidth || y < 0 || y > canvasHeight);
    }
    velocity () {
        let degree = 1
        this.velocityX += (Math.random() * degree) - (degree/2);
        this.velocityY += (Math.random() * degree) - (degree/2);
    }

    move() {
        const { width, height, velocityX, velocityY } = this
        this.x += this.velocityX;
        this.y += this.velocityY;
        // const direction = Math.random();
        // if (direction < 0.25) return this.y -= height; // up
        // if (direction < 0.5) return this.y += height; // down
        // if (direction < 0.75) return this.x -= width; // left
        // return this.x += width; // right
    }    
    draw() {
        const { ctx, x, y, width, height } = this
        // // ctx.fillStyle = 'rgba(0, 0, 0, 0.3) ';
        ctx.beginPath()
        ctx.arc(x, y, width, 0, Math.PI * 2, true);
        ctx.stroke()
    }
}

export default Walker;