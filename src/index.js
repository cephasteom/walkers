import Walker from './js/Walker'
import './styles/index.scss'


let walkers = new Array(100)
                    .fill(null)
                    .map(() => new Walker(window.innerWidth/2, window.innerHeight/2))

const draw = () => {
    walkers.forEach(walker => {
        if (!walker.isOut()) {
            walker.velocity()
            walker.move()
            walker.draw()
        }
    });
    window.requestAnimationFrame(draw)
}

document.getElementById('canvas').addEventListener('click', () => {

    window.requestAnimationFrame(draw)
})
