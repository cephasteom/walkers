// TODO: auto mode

import Walker from './js/Walker'
import { canvasCtx } from './js/setup-canvas'
import { Noise } from 'noisejs'
import './styles/index.scss'

const nWalkers = 1000
let groups = [];
let isAnimating = false;
let instructionsIsVisible = true
let noise = new Noise(Math.random())
let animationFrame = null;
const clearBtn = document.getElementById('clear')
const instructions = document.getElementById('instructions')
const closeBtn = document.getElementById('close')

const createGroup = (x, y) => {
    groups.push({
        walkers: new Array(nWalkers).fill(null).map(i => new Walker(x, y, noise))
    })
}

const draw = () => {
    groups = groups
        .map(({walkers}) => {
            if(walkers.every(walker => walker.isOut())) {
                return null
            }
            walkers = walkers
                .map(walker => {
                    if(walker.isOut()) return null;
                    walker.velocity().move().reColour().draw()
                    return walker;
                })
                .filter(walker => !!walker)
            return { walkers }
        })
        .filter(group => !!group);
    animationFrame = window.requestAnimationFrame(draw)
}

const handleClickEvent = (e) => {
    if(instructionsIsVisible) {
        document.getElementById('instructions').remove();
        instructionsIsVisible = false
    }
    createGroup(e.x, e.y)
    if(!isAnimating) {
        animationFrame = window.requestAnimationFrame(draw)
        isAnimating = true
    }
}

instructions.addEventListener('click', handleClickEvent)
document.getElementById('canvas').addEventListener('click', handleClickEvent)

clearBtn.addEventListener('click', e => {
    window.cancelAnimationFrame(animationFrame);
    groups = []
    canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    isAnimating = false
    noise = new Noise(Math.random())
})

const params = new URLSearchParams(window.location.search);
if(!params.get('hideClose')) {
    closeBtn.classList.remove('hidden')
}
