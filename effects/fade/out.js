module.exports = function(state,colors) {
	for(var a=0; a<colors.length; a++) {
		colors[a] = colors[a].clone().darken(Math.pow(state.position.progress,2));
	}

	return colors;
}
