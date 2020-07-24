import Osc from './Osc';

class FMSynth {
	constructor(audioContext) {
		this._ctx = audioContext;
        this._freq = 200; 
        this._vol = 0.5;
		this._carrRatio = 5; this._modRatio = 4; this._modAmp = 4;
		this._a = 0.1; this._d = 0.1; this._s = 1; this._r = 1; this._sLevel = 0.5;
		this._aMod = 0.1; this._dMod = 0.1; this._sMod = 1; this._rMod = 1; this._sLevelMod = 0.5;
		this._carrier = new Osc(this._ctx, 'sine', 440, 0);
		this._modulator = new Osc(this._ctx, 'sine', 440, 0);
		this._modulator.volume.connect(this._carrier.osc.frequency);
		this._carrier.volume.connect(this._ctx.destination); // Can change using connectTo() e.g. reverb
	}

	_setFreq(freq) {
		this._freq = freq; // set global carrier _freq
		this._setHarmonicity(); // set global mod _freq
		this._carrier.osc.frequency.setValueAtTime( // set carrier osc _freq
			this._freq, 
			this._ctx.currentTime
		);
		this._modulator.osc.frequency.setValueAtTime( // set mod osc _freq
			this._harmonicity, 
			this._ctx.currentTime
		);
    }
    
	_setHarmonicity() {
		this._harmonicity = (this._freq * this._modRatio) / this._carrRatio;
	}

	_triggerEnv(osc, amp, a, d, s, r, sLevel, scale=1) {
		var now = this._ctx.currentTime;
		var end = now + ((a + d + s + r + 0.1)*scale);
		osc.volume.gain.cancelScheduledValues(now); // cancels anything that might be scheduled in the future
		osc.volume.gain.linearRampToValueAtTime(0, now); // cancels anything that might be scheduled in the future
		osc.osc.start();
		osc.volume.gain.linearRampToValueAtTime(1 * amp, now + (a*scale)); // attack
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + ((a + d)*scale)); // decay
		osc.volume.gain.linearRampToValueAtTime(sLevel * amp, now + ((a + d + s)*scale)); // sustain
		osc.volume.gain.linearRampToValueAtTime(0, now + ((a + d + s + r)*scale)); // release
		osc.osc.stop(end); // clean up synth afterwards
		osc.osc.onended = () => osc.volume.disconnect();

	}
	_getMidiCps(note) {
		var positionFromConcertA = note - 69;
		return 440 * Math.pow(2, positionFromConcertA/12);
	}
	_scaleNumbers(inMax, inMin, outMax, outMin, number) {
		var percent = (number - inMin) / (inMax - inMin);
		return percent * (outMax - outMin) + outMin;
	}
	// returns a multiplier for the env length, the higher the note the shorter the env
	_getKeyscale(note) {
		let keyscale = note > 48 ? this._scaleNumbers(48, 100, 1, 0.1, note) : 1;
		return keyscale;
	}

	play(note=60, volume=127) {
		var freq = this._getMidiCps(note);
		var keyscale = this._getKeyscale(note);
		this._setFreq(freq);
		var amp = this._scaleNumbers(127, 0, 1, 0, volume) * this._vol;
		this._triggerEnv(this._carrier, amp, this._a, this._d, this._s, this._r, this._sLevel, keyscale);
		this._triggerEnv(this._modulator, this._modAmp * this._harmonicity * amp, this._aMod, this._dMod, this._sMod, this._rMod, this._sLevel, keyscale);
	}

	setCarrEnv(a, d, s, r, sLevel) {
		this._a = a;
		this._d = d;
		this._s = s;
		this._r = r;
		this._sLevel = sLevel;
    }
    
	setModEnv(a, d, s, r, sLevel) {
		this._aMod = a;
		this._dMod = d;
		this._sMod = s;
		this._rMod = r;
		this._sLevelMod = sLevel;
    }
    
	setModAmp(amp) {
		this._modAmp = amp;
    }
    
	setRatio(carrRatio, modRatio) {
		this._carrRatio = carrRatio;
		this._modRatio = modRatio;
    }
    
	connectTo(outputNode, replace=true) {
		replace ? this._carrier.volume.disconnect() : null; // disconnect from all other sources first?
		this._carrier.volume.connect(outputNode);
    }

	setVol(val) {
		this._vol = val;
	}
}