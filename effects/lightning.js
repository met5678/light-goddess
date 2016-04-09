const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');
const pixels = [];

const pulsate = require('./pulsate');

module.exports = function(ctx) {
  pulsate(ctx);

  for(var col=0; col<width; col++) {
    if(Math.random() < state.effectArgs.lightningFreq) {
      ctx.fillStyle = 'white';
      ctx.fillRect(col,0,1,height);
    }
  }
}