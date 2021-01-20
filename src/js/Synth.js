import * as Tone from 'tone'
import { output } from './setup-audio'
import { scale } from './utils'

class Synth {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.freq = scale(0, window.innerHeight, 500, 100, y)
        this.init()
    }
    init() {
        this.synth = new Tone.MonoSynth({
            oscillator: { type: "sine" },
            envelope: { attack: 1, release: 1 }
        }).connect(output)
        this.synth.volume.value = -20
        this.synth.triggerAttack(this.freq)
    }
    release() {
        this.synth.triggerRelease()
        setTimeout(() => this.synth.dispose(), 1001)
    }
}

export default Synth;