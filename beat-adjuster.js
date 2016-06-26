'use strict';

const easiness = require('easiness');
const _        = require('lodash');

var defaults = {
	easing: 'linear',
	offset: 0,
	quant: 4
}

var lastFrameProgress = 1;

function getAdjustedBeat(curBeat, params) {
	let quant    = params.quant;
	let ease     = params.ease;
	let pingpong = params.pingpong;

	let progress = curBeat.progress;
	let num      = curBeat.num;

	let newBeat = {
		progress: progress,
		num: num
	};

	// First, quantization
	if(quant > 4) {
		newBeat.progress %= (4 / quant);
		newBeat.progress *= quant / 4;
		newBeat.num = ((quant/4) * num + Math.floor(quant/4 * progress))%16;
	}
	else if(quant < 4) {
		newBeat.progress = (num % (4/quant) + progress) * quant / 4;
		newBeat.num = num >> (quant == 2 ? 1 : 2);
	}

	newBeat.isBeat = newBeat.progress < lastFrameProgress;
	lastFrameProgress = newBeat.progress;

	if(ease) {
		newBeat.progress = easiness.easeOutSine(newBeat.progress);
	}

	if(pingpong && (newBeat.num % 2)) {
		newBeat.progress = 1 - newBeat.progress;
	}


	return newBeat;
}

var BeatManager = function() {
	var _beatProgress = 0;
	var _beatMultiple = 1;
	var _beatEase = 0;

	this.colorMidiChange = function(property,value) {
		switch(property) {
			case 9:
				_inColor1 = colors[value];
				break;
			case 10:
				_inColor2 = colors[value];
				break;
			case 11:
				_inColor3 = colors[value];
				break;
			case 12:
				_inColor4 = colors[value];
				break;
			case 13:
				_spread = value;
				break;
			case 14:
				_interpolate = value;
				break;
		}
	};

	this.getProgress = function(beatProgress,beatNumber) {
		var newProgress = beatProgress;
		if(_beatMultiple > 1) {
			newProgress = (beatProgress*_beatMultiple)%1;
		}
		else if(_beatMultiple < 1) {
			newProgress = (beatProgress+(beatNumber%(1/_beatMultiple)))*_beatMultiple;
		}

		switch(_beatEase) {
			case 0:
				return newProgress;
			case 1:
				return easiness.easeInSine(newProgress);
			case 2:
				return easiness.easeOutSine(newProgress);
			case 3:
				return easiness.easeInOutSine(newProgress);
		}
	};


};

module.exports = getAdjustedBeat;