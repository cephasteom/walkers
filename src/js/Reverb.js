class Reverb {
	constructor(audioContext) {
        this.ctx = audioContext;
        this.reverb = this.ctx.createConvolver();
        this.input = this.ctx.createGain()
        this.input.connect( this.reverb );
        this.input.gain.setValueAtTime(0.3, this.ctx.currentTime);
		this._loadIR();
	}
	_loadIR() {
		var irRRequest = new XMLHttpRequest();
		irRRequest.open("GET", 'audio/minster1_000_ortf_48k.wav', true);
		irRRequest.responseType = "arraybuffer";
		irRRequest.onload = function() {
			this.ctx.decodeAudioData( irRRequest.response, 
				function(buffer) { 
					this.reverb.buffer = buffer; 
				} 
			);
		}
		irRRequest.send();
	}
}

export default Reverb;