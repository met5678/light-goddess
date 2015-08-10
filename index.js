var traktorF1 = require('node-traktor-f1');
var midiIn = require('./midi-in');
var midiOut = require('./midi-out');


f1 = new traktorF1.TraktorF1();

f1.setLED('browse',1);



midiIn.on('position', function(position) {
	f1.setLED('sync',(1-position.progress));
});

midiIn.on('beat', function(beatNumber) {

});