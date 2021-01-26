// import * as Tone from 'tone'
import { canvasCtx, noise } from './setup-canvas'
import { scale } from './utils'

class Marker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ctx = canvasCtx
        this.radius = 100;
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
    draw() {
        const { ctx, x, y } = this
        ctx.beginPath()
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.colour
        ctx.stroke()
        return this
    }
}

export default Marker;