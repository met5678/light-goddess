const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');

module.exports = function(ctx) {
	var numLines = state.effectArgs.numLines;
	var lineWidth = state.effectArgs.lineWidth;
	var curColor = color.getColor();

	var grd = ctx.createLinearGradient(0,0,width,0);
  var phase = (state.frame%state.effectArgs.period)/state.effectArgs.period;

	for(var a=0; a<numLines; a++) {
		var progress = (phase+a)/numLines;
		if(progress > 1) {
			progress -= 1;
		}

		grd.addColorStop(progress-lineWidth,'black');
		grd.addColorStop(progress,curColor);
		grd.addColorStop(progress+lineWidth,'black')
	}

	ctx.fillStyle = grd;
	ctx.fillRect(0,0,width,height);

};