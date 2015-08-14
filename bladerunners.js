var midiOut = require('./midi-out');
var clock = require('./midi-in');

var colorCtrlStart = 16;
var dimCtrl = 32;
var crossfadeCtrl = 33;
var strobeCtrl = 34;
var channel = 1;

function renderFrame(state) {
	for(var a=0; a<4; a++) {
		var ctrl = colorCtrlStart + (a*4);
		var color = state.colors[a];

		if(color.saturation() == 0) {
			midiOut.ctrlChange(channel,ctrl,0);
			midiOut.ctrlChange(channel,ctrl+1,0);
			midiOut.ctrlChange(channel,ctrl+2,0);
			midiOut.ctrlChange(channel,ctrl+3,color.red() >> 1);	
		}
		else {
			midiOut.ctrlChange(channel,ctrl,color.red() >> 1);
			midiOut.ctrlChange(channel,ctrl+1,color.green() >> 1);
			midiOut.ctrlChange(channel,ctrl+2,color.blue() >> 1);
			midiOut.ctrlChange(channel,ctrl+3,0);	
		}
	}

	midiOut.ctrlChange(channel,dimCtrl,Math.floor(127*Math.max(state.brDimL,state.brDimR)));
	if(state.brDimL < state.brDimR) {
		var cFade = state.brDimL/state.brDimR;
		var cFadeVal = 63 - Math.floor((1-cFade)*64);
	}
	else {
		var cFade = state.brDimR/state.brDimL;		
		var cFadeVal = 64 + Math.floor((1-cFade)*63);
	}
	midiOut.ctrlChange(channel,crossfadeCtrl,cFadeVal);

	if(state.strobe) {
		midiOut.ctrlChange(channel,strobeCtrl,115);
	}
	else {
		midiOut.ctrlChange(channel,strobeCtrl,0);
	}
}

module.exports = {
	renderFrame: renderFrame
};