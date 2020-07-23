import { HelloWorld } from './js/HelloWorld'
import { setCanvasDimensions, getCanvasContext } from './js/setup'
import Walker from './js/Walker'
// import WebpackLogo from './images/webpack-logo.svg'
import './styles/index.scss'

// initialize canvas
setCanvasDimensions()
const ctx = getCanvasContext()
let walkers = [new Walker(1000, 500, ctx), new Walker(500, 500, ctx)]

const draw = () => {
    walkers.forEach(walker => {
        if (!walker.isOut()) {
            walker.velocity();
            walker.move();
            walker.draw();
        }
    });
    window.requestAnimationFrame(draw)
}

window.onload = () => window.requestAnimationFrame(draw)

// Creating images
// const logo = document.createElement('img')
// logo.src = WebpackLogo

// Create heading node
// const greeting = document.createElement('h1')
// greeting.textContent = HelloWorld()

// Append SVG and heading nodes to the DOM
// const app = document.querySelector('#root')
// app.append(logo, greeting)
