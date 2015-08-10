var midi = require('midi');
var onExit = require('signal-exit');

var output = new midi.output();

console.log('Opening MIDI output port');
output.openVirtualPort('Light Goddess Out');

function cleanup() {
	console.log('Closing MIDI output port');
	output.closePort();
}

function sendMessage() {
	output.sendMessage([176,22,1]);
}

function noteOn(channel,note,velocity) {
	sendMessage(144+channel,note,velocity);
}

function noteOff(channel,note,velocity) {
	sendMessage(128+channel,note,velocity);
}

function polyTouch(channel,note,velocity) {
	sendMessage(160+channel,note,velocity);
}

function ctrlChange(channel,param,value) {
	sendMessage(192+channel,param,value);
}

onExit(cleanup);

module.exports = {
	sendMessage: sendMessage,
	noteOn: noteOn,
	noteOff: noteOff,
	polyTouch: polyTouch,
	ctrlChange: ctrlChange
};