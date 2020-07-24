import { setCanvasDimensions, getCanvasContext } from './js/setup-canvas'
import Walker from './js/Walker'
import { Noise } from 'noisejs'
import './styles/index.scss'

setCanvasDimensions()
const canvasCtx = getCanvasContext()

var noise = new Noise(Math.random())
let walkers = new Array(100)
                    .fill(null)
                    .map(() => new Walker(window.innerWidth/2, window.innerHeight/2, canvasCtx, noise))

const draw = () => {
    walkers.forEach(walker => {
        if (!walker.isOut()) {
            walker.velocity()
            walker.move()
            // walker.sound()
            walker.draw()
        }
    });
    window.requestAnimationFrame(draw)
}

window.onload = () => window.requestAnimationFrame(draw)