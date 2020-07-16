class Walker {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 2;
        this.ctx = ctx
        this.draw();
    }
    isOut() {
        const { x, y, width, height } = this
        return (x < 0 || x > window.width || y < 0 || y > window.height);
    }
    draw() {
        const { ctx, x, y, width, height } = this
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(x, y, width, height);
    }

    move() {
        const { width, height } = this
        const direction = Math.random();
        console.log(direction)
        if (direction < 0.25) {
            // Go up
            this.y -= height;
        } else if (direction < 0.5) {
            // Go down
            this.y += height;
        } else if (direction < 0.75) {
            // Go left
            this.x -= width;
        } else if (direction < 1) {
            // Go right
            this.x += width;
        }
    }    
}

export default Walker;