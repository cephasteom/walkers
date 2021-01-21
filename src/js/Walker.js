import * as Tone from 'tone'
import { canvasCtx, noise } from './setup-canvas'
import { scale } from './utils'

class Walker {
    constructor(x, y, noise) {
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
        this.red = scale(0, window.innerWidth, 0, 255, this.x)
        this.blue = scale(0, window.innerWidth, 0, 255, this.y)
        this.colour = `rgba(${this.red},0,${this.blue},${this.opacity})`
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
        let degree = 0.0075
        this.velocityX += noise.simplex2(this.x * degree, this.y * degree);
        this.velocityY += noise.simplex2(this.y * degree, this.x * degree);
        return this
    }
    move() {
        const { velocityX, velocityY } = this
        this.x += velocityX;
        this.y += velocityY;
        return this
    }
    reColour() {
        this.opacity = 1
        this.red = scale(0, window.innerWidth, 0, 255, this.x)
        this.blue = scale(0, window.innerWidth, 0, 255, this.y)
        this.colour = `rgba(${this.red},0,${this.blue},${this.opacity/4})`
        return this
    }
    draw() {
        const { ctx, x, y, width, height, px, py } = this
        ctx.beginPath()
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