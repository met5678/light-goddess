/*
Arg 1: Line direction (0 right, 1 left)
Arg 2: Line thickness
*/

module.exports = function(state,ctx) {

	var thickness = state.effectAnalog*50;
	var numLines = Math.abs(state.effectArg);
	var reverse = state.effectArg < 0;
	var range = state.cWidth / numLines;
	var bp = reverse ? 1 - state.position.progress : state.position.progress;

	for(var a=0; a<numLines; a++) {
		ctx.fillStyle = state.colors[a].hexString();
		var x = (a+bp)*range - thickness/2;
		ctx.fillRect(
			x,
			0,
			thickness,
			state.cHeight);
	}

};