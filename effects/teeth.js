'use strict';

const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');

module.exports = function(ctx) {
  let frame      = state.frame;
  let progress   = frame.beat.progress;
  let gradWidth  = frame.effectArgs.gradWidth;
  let alternate  = frame.effectArgs.alternate;
  let reverse    = frame.effectArgs.reverse;

  for(var row=0; row<height; row++) {
    let grd = ctx.createLinearGradient(0,0,width,0);
    let curColor   = frame.colors[row%4];

    let flip = reverse;
    if(alternate && row%2) {
      flip = !flip;
    }

    if(flip) {
      grd.addColorStop(1 - progress,             color.DARK)
      grd.addColorStop(1 - progress + gradWidth, curColor);
    }
    else {
      grd.addColorStop(progress - gradWidth, curColor);
      grd.addColorStop(progress,             color.DARK)
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
        min: 0.1,
        max: 1
      }
    },
    reverse: {
      type: 'boolean',
      randomize: true
    },
    alternate: {
      type: 'boolean',
      randomize: true
    }
  }
};