module.exports = function(state,ctx) {
	ctx.fillStyle = state.colors[0].hexString();
	ctx.fillRect(0,0,state.cWidth,1);
	ctx.fillStyle = state.colors[1].hexString();
	ctx.fillRect(0,1,state.cWidth,1);
	ctx.fillStyle = state.colors[2].hexString();
	ctx.fillRect(0,2,state.cWidth,1);
	ctx.fillStyle = state.colors[3].hexString();
	ctx.fillRect(0,3,state.cWidth,1);
};