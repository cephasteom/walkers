import * as Tone from 'tone'
import { canvasCtx, noise } from './setup-canvas'

class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.ctx = canvasCtx
        this.noise = noise
        this.width = 10;
        this.height = 10;
        this.velocityX = (Math.random() * 4 - 2)
        this.velocityY = (Math.random() * 4 - 2)
        this.opacity = 1
        this.colour = `rgba(255,255,255,${this.opacity})`
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
        const { noise } = this
        let degree = 0.0013
        this.velocityX += noise.simplex2(this.x * degree, this.y * degree);
        this.velocityY += noise.simplex2(this.y * degree, this.x * degree);
        return this
    }
    move() {
        const { width, height, velocityX, velocityY } = this
        this.x += velocityX;
        this.y += velocityY;
        // Nice! this is is worth pursuing
        // const direction = Math.random();
        // if (direction < 0.25) return this.y -= height; // up
        // if (direction < 0.5) return this.y += height; // down
        // if (direction < 0.75) return this.x -= width; // left
        // return this.x += width; // right
        return this
    }
    reColour() {
        this.opacity = 1
        this.colour = `rgba(255,255,255,${this.opacity/4})`
        return this
    }
    draw() {
        const { ctx, x, y, width, height, px, py } = this
        ctx.beginPath()
        // Nice! also worth pursuing
        // ctx.arc(x, y, width, 0, Math.PI * 2, true);
        ctx.moveTo(px,py);
        ctx.lineTo(x,y);
        ctx.strokeStyle = this.colour
        ctx.stroke()
        this.px = x
        this.py = y
        return this
    }
}

export default Walker;