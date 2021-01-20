// TODO: instructions notice. Clicking / pressing enter runs tone.start()
// Maybe use this as an example https://tonejs.github.io/examples/rampTo (see sources tab)

import Walker from './js/Walker'
import Synth from './js/Synth'
import './styles/index.scss'


let groups = [];
let isAnimating = false;

const createGroup = (x, y) => {
    let group = {
        walkers: new Array(100).fill(null).map(i => new Walker(x, y)), 
        synth: new Synth(x, y)
    }
    groups.push(group)
}


const draw = () => {
    groups.forEach(({walkers, synth}) => {
        walkers.forEach(walker => {
            if (!walker.isOut()) {
                walker.velocity()
                walker.move()
                walker.draw()
            }
        })
        if(walkers.every(walker => walker.isOut())) synth.release()
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
