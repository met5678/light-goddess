var Color = require('color');

var dark = Color({r:0,g:0,b:0});

module.exports = function(state,colors) {
	var bp = state.position.progress;

	if(bp < .1) {
		return colors;
	}
	else {
		for(var a=0; a<colors.length; a++) {
			colors[a] = dark;
		}
		return colors;
	}
}
