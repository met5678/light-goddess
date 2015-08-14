var Color = require('color');
var ColorSquare = require('./color-square');
var f1 = require('./f1');

function ColorRGBW(_column) {
	this.r = new ColorSquare(Color({r: 255, g: 0, b: 0}),'p'+(_column+1));
	this.g = new ColorSquare(Color({r: 0, g: 255, b: 0}),'p'+(_column+5));
	this.b = new ColorSquare(Color({r: 0, g: 0, b: 255}),'p'+(_column+9));
	this.w = new ColorSquare(Color({r: 255, g: 255, b:255}),'p'+(_column+13));
	this.enabled = 0;
	this.column = _column;
	this.color = Color({r:0, g:0, b:0});

	var colorChanged = function() {
		if(this.w.selected) {
			this.color = Color({r:255, g:255, b:255});
		}
		else {
			this.color = Color({
				r: this.r.selected * 255,
				g: this.g.selected * 255,
				b: this.b.selected * 255
			});
		}
	}

	var boundColorChanged = colorChanged.bind(this);

	this.r.on('changed', boundColorChanged);
	this.g.on('changed', boundColorChanged);
	this.b.on('changed', boundColorChanged);
	this.w.on('changed', boundColorChanged);

	var pressed = function() {
		this.enabled = 1-this.enabled;
		this.r.setEnabled(this.enabled);
		this.g.setEnabled(this.enabled);
		this.b.setEnabled(this.enabled);
		this.w.setEnabled(this.enabled);
		this.updateLED();
	}

	f1.on('l'+(_column+1)+':pressed', pressed.bind(this));
}

ColorRGBW.prototype.updateLED = function() {
	f1.setLED('l'+(this.column+1)+'_l', this.enabled);
	f1.setLED('l'+(this.column+1)+'_r', this.enabled);
};

var colors = [
	new ColorRGBW(0),
	new ColorRGBW(1),
	new ColorRGBW(2),
	new ColorRGBW(3)
];

function getColors() {
	var rawColors = [];
	for(var a=0; a<4; a++) {
		if(colors[a].enabled) {
			rawColors.push(colors[a].color);
		}
	}

	return rawColors;
}

module.exports = {
	getRawColors: getColors
};