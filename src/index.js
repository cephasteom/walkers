// TODO: instructions notice. Clicking / pressing enter runs tone.start()

import Walker from './js/Walker'
import Synth from './js/Synth'
import './styles/index.scss'
import { diffArray, medianArray, scale } from './js/utils'
import { canvasCtx } from './js/setup-canvas'

const nWalkers = 100
let groups = [];
let isAnimating = false;
let instructionsIsVisible = true
let animationFrame = null;

const createGroup = (x, y) => {
    let group = {
        walkers: new Array(nWalkers).fill(null).map(i => new Walker(x, y)), 
        synth: new Synth(x, y, 0)
    }
    groups.push(group)
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
            // Get data
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

document.getElementById('instructions').addEventListener('click', handleClickEvent)
document.getElementById('canvas').addEventListener('click', handleClickEvent)

document.getElementById('clear').addEventListener('click', e => {
    window.cancelAnimationFrame(animationFrame);
    groups.forEach(group => group.synth.release())
    groups = []
    canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    isAnimating = false
})
