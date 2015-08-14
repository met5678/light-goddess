/*
Arg 1: Line direction (0 right, 1 left)
Arg 2: Line thickness
*/
var easiness = require('easiness');

module.exports = function(state,ctx) {
	var thickness = state.effectAnalog*50;
	var numLines = Math.abs(state.effectArg);
	var offset = (state.cWidth/numLines);
	var range = offset - thickness;
	var reverse = state.effectArg < 0;
	var bp = state.position.progress * 2;


	for(var a=0; a<numLines; a++) {
		ctx.fillStyle = state.colors[a].hexString();

		if(bp < 1) {
			var x = easiness.easeInOutQuad(bp);
		}
		else {
			var x = easiness.easeInOutQuad(2-bp)
		}
		x = x*range + a*offset;

		if(reverse) {
			ctx.fillRect(x,0,thickness,1);
			ctx.fillRect(x,2,thickness,1);
			ctx.fillRect(state.cWidth-thickness-x,1,thickness,1);
			ctx.fillRect(state.cWidth-thickness-x,3,thickness,1);
		}
		else {
			ctx.fillRect(x,0,thickness,state.cHeight);
		}
	}
};