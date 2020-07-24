class Revern {
	constructor(audioContext, pathToIr) {
        this.ctx = audioContext;
        this.pathToIr = pathToIr
		this.reverb = this.ctx.createConvolver();
		this.reverb.connect( this.ctx.destination );
		this._loadIR();
	}
	_loadIR() {
		var irRRequest = new XMLHttpRequest();
		irRRequest.open("GET", this.pathToIr, true);
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