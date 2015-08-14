module.exports = function(state,colors) {
	var bp = state.position.progress;

	var brightness = Math.min(bp,1-bp)*2;

	for(var a=0; a<colors.length; a++) {
		colors[a] = colors[a].clone().darken(brightness);
	}

	return colors;
}
