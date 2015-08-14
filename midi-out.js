var midi = require('midi');
var onExit = require('signal-exit');

var output = new midi.output();

console.log('Opening MIDI output port');
output.openVirtualPort('Light Goddess Out');

function cleanup() {
	console.log('Closing MIDI output port');
	output.closePort();
}

function sendMessage(status,db1,db2) {
	output.sendMessage([status,db1,db2]);
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
	sendMessage(176+channel,param,value);
}

onExit(cleanup);

module.exports = {
	sendMessage: sendMessage,
	noteOn: noteOn,
	noteOff: noteOff,
	polyTouch: polyTouch,
	ctrlChange: ctrlChange
};