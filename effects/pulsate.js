const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');
const pixels = [];

function initPixels() {
  for(var row=0; row<height; row++) {
    pixels[row] = [];
    for(var col=0; col<width; col++) {
      pixels[row][col] = {
        color: color.getColor(),
        phase: Math.random()
      }
    }
  }
}

module.exports = function(ctx) {
  if(state.changed) {
    initPixels();
  }
  for(var row=0; row<height; row++) {
    for(var col=0; col<width; col++) {
      ctx.fillStyle = pixels[row][col].color;
      ctx.fillRect(col,row,1,1);
    }
  }
}