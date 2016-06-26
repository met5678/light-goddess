'use strict';

const state = require('../state');
const color = require('../color');
const nconf = require('nconf');
const easiness = require('easiness');

const height = nconf.get('height');
const width  = nconf.get('width');

module.exports = function(ctx) {
  let frame      = state.frame;
  let progress   = frame.beat.progress;
  let numLines   = frame.effectArgs.numLines;
  let thickness  = frame.effectArgs.gradWidth;
  let reverse    = frame.effectArgs.reverse;
  let alternate  = frame.effectArgs.alternate;

  thickness /= numLines;

	let bp = frame.beat.progress * 2;
	let mult = 1/numLines;
	for(var row=0; row<height; row++) {
		let grd = ctx.createLinearGradient(0,0,width,0);
	
		for(var a=0; a<numLines; a++) {
			let offset = a/numLines;


			if(bp < 1) {
				var pos = bp;//easiness.easeInOutSine(bp);
			}
			else {
				var pos = 2-bp;//easiness.easeInOutSine(2-bp)
			}

			let flip = reverse && a%2;
			if(alternate && row%2) {
				flip = !flip;
			}

			if(flip) { 
				pos = 1-pos;
			}
			pos = (pos*mult) + offset;

			grd.addColorStop(pos - thickness, color.DARK);
			grd.addColorStop(pos,             frame.colors[a%4]);
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
    numLines: {
    	type: 'int',
    	randomize: {
    		min: 1,
    		max: 3
    	}
    },
    alternate: {
    	type: 'boolean',
    	randomize: true
    }
  }
};