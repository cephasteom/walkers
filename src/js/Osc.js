class Osc {
    constructor(audioContext, waveform, freq=440, amp=0) { // option to set amp at start
        this.osc = audioContext.createOscillator();
        this.volume = audioContext.createGain();
        this.osc.type = waveform;
        this.osc.connect(this.volume);
    };
};

export default Osc;