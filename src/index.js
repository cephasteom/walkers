import Walker from './js/Walker'
import './styles/index.scss'


let walkers = [];

const createWalker = (x, y) => {
    let walker = new Array(100)
                        .fill(null)
                        .map(() => new Walker(x, y))
    walkers.push(walker)
}

let isAnimating = false;

const draw = () => {
    walkers.forEach(walker => {
        walker.forEach(strand => {
            if (!strand.isOut()) {
                strand.velocity()
                strand.move()
                strand.draw()
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
