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

  var curPhase = (state.frame%state.effectArgs.period)/state.effectArgs.period;

  for(var row=0; row<height; row++) {
    for(var col=0; col<width; col++) {

      var a = Math.abs(pixels[row][col].phase-curPhase);
      if(a > 0.5) { 
        a = 1-a;
      }
      a = a * 2;

      ctx.globalAlpha = a;

      ctx.fillStyle = pixels[row][col].color;
      ctx.fillRect(col,row,1,1);
    }
  }
}