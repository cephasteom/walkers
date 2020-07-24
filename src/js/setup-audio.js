import ir from '../audio/minster1_000_ortf_48k.wav';
import Reverb from './Reverb';

const getAudioContext = () => {
    let AudioContext = window.AudioContext || window.webkitAudioContext || false; 
    return AudioContext ? new AudioContext() : alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
}

export const audioCtx = getAudioContext()

export const reverb = new Reverb(audioCtx, ir)