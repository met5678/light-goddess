var easiness = require('easiness');
var _ = require('lodash');

var beatProgress = 0;
var phraseProgress = 0;
var bpm = 128;
var lastBeat = process.hrtime();

var defaults = {
	easing: 'linear',
	offset: 0,
	quant: 1
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

module.exports = BeatManager;