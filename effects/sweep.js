'use strict';

const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');

module.exports = function(ctx) {
  let frame      = state.frame;
  let progress   = frame.beat.progress;
  let thickness  = frame.effectArgs.gradWidth;
  let numLines   = frame.effectArgs.numLines;
  let reverse    = frame.effectArgs.reverse;
  let alternate  = frame.effectArgs.alternate;

  thickness /= numLines;

  let mult = 1 / numLines;

  for(let row=0; row<height; row++) {
		let grd = ctx.createLinearGradient(0,0,width,0);
  	
  	for(let line=0; line<numLines; line++) {
			let offset = line/numLines;

			let flip = reverse;
			if(alternate && row%2) {
				flip = !flip;
			}

			let pos = progress;
			if(flip) { 
				pos = 1-pos;
			}
			pos = (pos*mult) + offset;

			grd.addColorStop(pos - thickness, color.DARK);
			grd.addColorStop(pos,             frame.colors[line%4]);
			grd.addColorStop(pos + thickness, color.DARK);
  	}
		ctx.fillStyle = grd;
		ctx.fillRect(0,row,width,1);
  }

};

module.exports.config = {
  params: {
    gradWidth: {
      type: 'frac',
      randomize: {
        min: 0.02,
        max: 0.4
      }
    },
    reverse: {
    	type: 'boolean',
    	randomize: true
    },
    alternate: {
    	type: 'boolean',
    	randomize: true
    },
    numLines: {
    	type: 'int',
    	randomize: {
    		min: 1,
    		max: 3
    	}
    }
  }
};