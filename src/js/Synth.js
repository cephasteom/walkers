import * as Tone from 'tone'
import { output } from './setup-audio'
import { scale } from './utils'

class Synth {
    constructor(x, y, partials) {
        this.x = x
        this.y = y
        this.positionX = scale(0, window.innerWidth, -1, 1, this.x)
        this.positionY = scale(0, window.innerHeight, -1, 1, this.y)
        this.positionZ = 0
        this.amp = -10
        this.partials = partials
        this.harmonicity = 1
        this.modulationIndex = 1
        this.freq = scale(0, window.innerHeight, 1000, 100, y)
        this.init()
    }
    init() {
        this.panner = new Tone.Panner3D({
            panningModel: "HRTF",
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ,
        }).connect(output);
        this.synth = new Tone.FMSynth({
            modulationIndex: this.modulationIndex,
            harmonicity: this.harmonicity,
            modulation: { type: `sine${this.partials}` },
            envelope: { attack: 1, release: 1 }
        }).connect(this.panner)
        this.synth.volume.value = this.amp
        this.synth.triggerAttack(this.freq)
    }
    setPartials(n) {
        this.partials = n
        this.synth.oscillator.type = `sine${this.partials}`
    }
    setHarmonicity(val) {
        this.harmonicity = val
        this.synth.harmonicity.rampTo(this.harmonicity, (1/1000))
    }
    setModulationIndex(val) {
        this.modulationIndex = val
        this.synth.modulationIndex.rampTo(this.modulationIndex, 0.1)
    }
    setAmp(val) {
        this.amp = scale(0, 1, -50, -10, val)
        this.synth.volume.rampTo(this.amp, (1/1000))
    }
    setPositionX(val) { this.panner.positionX.rampTo(val, 1) }
    setPositionY(val) { this.panner.positionY.rampTo(val, 1) }
    release() {
        this.synth.triggerRelease()
        setTimeout(() => this.synth.dispose(), 1001)
    }
}

export default Synth;