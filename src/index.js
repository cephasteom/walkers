// TODO: instructions notice. Clicking / pressing enter runs tone.start()
// Maybe use this as an example https://tonejs.github.io/examples/rampTo (see sources tab)

import Walker from './js/Walker'
import Synth from './js/Synth'
import './styles/index.scss'
import { diffArray } from './js/utils'

let groups = [];
const nWalkers = 100
let isAnimating = false;

const createGroup = (x, y) => {
    let group = {
        walkers: new Array(nWalkers).fill(null).map(i => new Walker(x, y)), 
        synth: new Synth(x, y, 0)
    }
    groups.push(group)
}


const draw = () => {
    groups = groups.map(({walkers, synth}) => {
        walkers = walkers
            .map(walker => {
                if(walker.isOut()) return null;
                walker.velocity().move().draw()
                return walker;
            })
            .filter(walker => !!walker)
        synth.setPartials(nWalkers - walkers.length)
        // let xDiff = diffArray(walkers.map(walker => walker.x))
        // let yDiff = diffArray(walkers.map(walker => walker.y))
        if(walkers.every(walker => walker.isOut())) synth.release()
        return {walkers, synth}
    });
    window.requestAnimationFrame(draw)
}

document.getElementById('canvas').addEventListener('click', e => {

    createGroup(e.x, e.y)
    if(!isAnimating) {
        window.requestAnimationFrame(draw)
        isAnimating = true
    }
})
