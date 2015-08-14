var Color = require('color');
var events = require('events');
var util = require('util');
var f1 = require('./f1');

var values = [1,
							15,
							10,
							100];

function ColorSquare(_color, _pad) {
	this.color = _color;
	this.pad = _pad;
	this.enabled = false;
	this.selected = false;

	var pressed = function() {
		this.selected = !this.selected;
		this.emit('changed', this.selected);
		this.updateLED();
	}

	f1.on(_pad+':pressed',pressed.bind(this));
	this.updateLED();
}

util.inherits(ColorSquare, events.EventEmitter);

ColorSquare.prototype.updateLED = function() {
	var brightness = values[this.selected + this.enabled*2];
	var fadeColor = this.color.value(brightness);
	f1.setRGB(this.pad,
						fadeColor.red(),
						fadeColor.green(),
						fadeColor.blue());
}

ColorSquare.prototype.setEnabled = function(_enabled) {
	this.enabled = _enabled;
	this.updateLED();
};

ColorSquare.prototype.setColor = function(_color) {
	this.color = _color;
	this.updateLED();
}

ColorSquare.prototype.setSelected = function(_selected) {
	this.selected = _selected;
	this.updateLED();
}

module.exports = ColorSquare;