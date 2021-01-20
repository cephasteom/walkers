// TODO: instructions notice. Clicking / pressing enter runs tone.start()
// Maybe use this as an example https://tonejs.github.io/examples/rampTo (see sources tab)

import Walker from './js/Walker'
import './styles/index.scss'


let walkerGroups = [];
let isAnimating = false;

const createWalker = (x, y) => {
    let group = new Array(1).fill(null).map(i => new Walker(x, y, i))
    walkerGroups.push(group)
}


const draw = () => {
    walkerGroups.forEach(group => {
        group.forEach(walker => {
            if (!walker.isOut()) {
                walker.velocity()
                walker.move()
                walker.walk()
            } else {
                walker.releaseSynth()
            }
        })
    });
    window.requestAnimationFrame(draw)
}

document.getElementById('canvas').addEventListener('click', e => {

    createWalker(e.x, e.y)
    if(!isAnimating) {
        window.requestAnimationFrame(draw)
        isAnimating = true
    }
})
