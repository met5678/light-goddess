/*
Arg 1: Line direction (0 right, 1 left)
Arg 2: Line thickness
*/

module.exports = function(state,ctx) {
	var size = Math.pow(state.effectArg,2);
	var frequency = Math.pow(state.effectAnalog,3);
	var id = ctx.createImageData(size,1); // only do this once per page
	var d  = id.data;                        // only do this once per page

	for(var y=0; y<state.cHeight; y++) {
		ctx.fillStyle = state.colors[y].hexString();
		for(var x=0; x<state.cWidth; x+=size) {
			if(Math.random() < frequency) {
				ctx.fillRect(x,y,size,1);
			}
		}
	}
};