import * as Tone from 'tone'
import { output } from './setup-audio'
import { scale } from './utils'

class Synth {
    constructor(x, y, partials) {
        this.x = x
        this.y = y
        this.partials = partials
        this.harmonicity = 0.9
        this.modulationIndex = 10
        this.freq = scale(0, window.innerHeight, 500, 100, y)
        this.init()
    }
    init() {
        this.synth = new Tone.FMSynth({
            modulationIndex: this.modulationIndex,
            harmonicity: this.harmonicity,
            modulation: { type: `sine${this.partials}` },
            envelope: { attack: 1, release: 1 }
        }).connect(output)
        this.synth.volume.value = -10
        this.synth.triggerAttack(this.freq)
    }
    setPartials(n) {
        this.partials = n
        this.synth.modulation.type = `sine${this.partials}`
    }
    release() {
        this.synth.triggerRelease()
        setTimeout(() => this.synth.dispose(), 1001)
    }
}

export default Synth;