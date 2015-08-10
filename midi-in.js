var midi = require('midi');
var onExit = require('signal-exit');
var events = require('events');

var ee = new events.EventEmitter();

var BEATS_PER_PHRASE = 16;
var PULSES_PER_BEAT = 24;

var curPulse = 0;
var curBeat = 0;

var input = new midi.input();
input.ignoreTypes(true,false,true);
input.on('message', processMidiMessage);

console.log('Opening MIDI input port');
input.openVirtualPort('Light Goddess In');

function processMidiMessage(deltaTime, message) {
	if(message[0] === 248) {
		onPulse();
		return;
	}

	switch(message[0]) {
		case 242:
			parsePosition(message[1],message[2]);
			break;
		case 176:
			// Emit message
			break;
		case 252:
			ee.emit('stop');
			break;
		case 251:
			ee.emit('continue');
			break;
		case 250:
			ee.emit('start');
			break;
		default:
			console.log(message);
	}	
}

var parsePosition = function(lsb,msb) {
	curBeat = (lsb >> 2) % 16;
	curPulse = (lsb % 4) * 6;
	if(curPulse == 0) {
		ee.emit('beat',curBeat);
	}
};

var incrementBeat = function() {
	curBeat++;
	if(curBeat >= BEATS_PER_PHRASE) {
		curBeat = 0;
		ee.emit('phrase');
	}

	//logPosition();
	ee.emit('beat',curBeat);
};

var logPosition = function() {
	console.log("Beat " + curBeat, "Pulse " + curPulse);
};

var onPulse = function() {
	curPulse++;
	if(curPulse >= PULSES_PER_BEAT) {
		curPulse = 0;
		incrementBeat();
	}
	ee.emit('position', {
		beat: curBeat,
		progress: curPulse / PULSES_PER_BEAT
	});
};

function cleanup() {
	console.log('Closing MIDI input port');
	input.closePort();
}

onExit(cleanup);

module.exports = ee;
