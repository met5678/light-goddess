var _ = require('lodash');

var midiIn = require('./midi-in');
var midiOut = require('./midi-out');
var colorManager = require('./color-manager');
var beatAdjuster = require('./beat-adjuster');
var bladerunners = require('./bladerunners');
var leds = require('./led-out');
var f1 = require('./f1');
var f1Settings = require('./f1-settings');

midiIn.on('position', doFrame);

function doFrame(position) {
	f1.setLED('shift',(1-position.progress));

	var frameState = {};

	_.extend(frameState,f1Settings.getSettings());
	if(frameState.randomize && position.progress == 0 && position.beat == 0) {
		f1Settings.randomize();
		_.extend(frameState,f1Settings.getSettings());
	}
	frameState.position = beatAdjuster(position, frameState.quant);
	frameState.colors = colorManager.getColors(frameState);
	
	bladerunners.renderFrame(frameState);
	leds.renderFrame(frameState);
}