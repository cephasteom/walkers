// TODO: auto mode

import Walker from './js/Walker'
import Synth from './js/Synth'
import { diffArray, medianArray, scale } from './js/utils'
import { canvasCtx } from './js/setup-canvas'
import { Noise } from 'noisejs'
import './styles/index.scss'

const nWalkers = 100
let groups = [];
let isAnimating = false;
let instructionsIsVisible = true
let noise = new Noise(Math.random())
let animationFrame = null;
const clearBtn = document.getElementById('clear')
const instructions = document.getElementById('instructions')

const createGroup = (x, y) => {
    groups.push({
        walkers: new Array(nWalkers).fill(null).map(i => new Walker(x, y, noise)), 
        synth: new Synth(x, y, 0)
    })
}

const draw = () => {
    groups = groups
        .map(({walkers, synth}) => {
            if(walkers.every(walker => walker.isOut())) {
                synth.release()
                return null
            }
            walkers = walkers
                .map(walker => {
                    if(walker.isOut()) return null;
                    walker.velocity().move().reColour().draw()
                    return walker;
                })
                .filter(walker => !!walker)
            // data
            let xs = walkers.map(walker => walker.x)
            let ys = walkers.map(walker => walker.y)
            let xDiff = diffArray(xs)
            let yDiff = diffArray(ys)
            let xMedian = medianArray(xs)
            let yMedian = medianArray(ys)
            // Modulate synth
            synth.setHarmonicity(scale(0, window.innerWidth, 1, 0.5, yDiff))
            synth.setModulationIndex(scale(0, window.innerHeight, 0, 10, xDiff))
            synth.setPositionX(scale(0, window.innerWidth, -1, 1, xMedian))
            synth.setPositionY(scale(0, window.innerHeight, -1, 1, yMedian))
            synth.setAmp(scale(0, nWalkers, 0, 1, walkers.length))
            return { walkers, synth }
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
    groups.forEach(group => group.synth.release())
    groups = []
    canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    isAnimating = false
    noise = new Noise(Math.random())
})
