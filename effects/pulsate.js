'use strict';

const frame = require('../state').frame;
const color = require('../color');
const nconf = require('nconf');
const randseed = require('random-seed');

const height = nconf.get('height');
const width  = nconf.get('width');
const pixels = [];

module.exports = function(ctx, changed) {
  let seed = frame.effectArgs.seed;
  let gen = randseed.create(""+seed);
  console.log(seed);
  let progress = frame.beat.progress;

  for(var row=0; row<height; row++) {
    for(var col=0; col<width; col++) {
      let phase      = gen.random();
      let colorIndex = gen(4);

      let alpha = Math.abs(progress - phase);
      alpha = alpha > 0.5 ? 1 - alpha : alpha;
      alpha *= 5;
      alpha -= 1.5;
      alpha = alpha < 0 ? 0 : alpha;


      ctx.globalAlpha = alpha;

      ctx.fillStyle = frame.colors[colorIndex];

      ctx.fillRect(col,row,1,1);
    }
  }
}

module.exports.config = {
  params: {
    seed: {
      type: 'int',
      randomize: {
        min: 100,
        max: 1000
      }
    }
  }
}