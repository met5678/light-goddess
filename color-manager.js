var Color = require('color');
var _ = require('lodash');

var colorBank = require('./color-bank');
var colorInterpolate = require('./color-interpolate');
var fadeEffects = require('./fade-effects');

var dark = Color({r:0,g:0,b:0});
var white = Color({r:255,g:255,b:255});

var darkArray = [dark, dark, dark, dark];
var whiteArray = [white, white, white, white];

function getColors(state) {
	var rawColors = colorBank.getRawColors();
	var nColors = rawColors.length;

	if(nColors == 0) {
		return darkArray;
	}
	if(state.strobe) {
		return whiteArray;
	}

	var colors = _.clone(rawColors);
	colors = colorInterpolate(state,colors);

	fadeEffects[state.colorFade](state,colors);


	for(var a=0; colors.length<4; a++) {
		colors.push(colors[a]);
	}

	return colors;
}

module.exports = {
	getColors: getColors
};