var Color = require('color');
var _ = require('lodash');

function interpolate(state,colors) {
	var progress = state.position.progress;
	var beat = state.position.beat;
	if(state.colorInt == 'SO') {
		return colors;
	}
	else if(state.colorInt == 'CT') {
		if(state.colorAlt) {
			var rot = (beat % colors.length)
			for(var a=0; a<rot; a++) {
				colors.push(colors.shift());
			}
			return colors;
		}
		else {
			var color = colors[beat % colors.length];
			return [ color ];
		}
	}
	else if(state.colorInt == 'FD') {
		if(state.colorAlt) {
			var rot = (beat % colors.length);

			var startColors = [];
			for(var a=0; a<colors.length; a++) {
				startColors[a] = colors[(a+rot) % colors.length].clone();
			}

			for(var a=0; a<colors.length; a++) {
				startColors[a].mix(colors[(a+rot+1) % colors.length],1-progress);
			}

			return startColors;
		}
		else {
			var color = colors[beat % colors.length].clone();
			color.mix(colors[(beat+1) % colors.length], 1-progress);
			return [ color ];
		}
	}
}

module.exports = interpolate;