const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');

var cols = [];

function initCols() {
  for(var col=0; col<width; col++) {
    cols[col] = {
      color: color.getColor(),
      phase: Math.random()
    }
  }
}

function getProgress(curPhase, dropPhase) {
  var a = dropPhase-curPhase;
  if(a < 0) {
    a += 1;
  }

  return a;
}


module.exports = function(ctx) {
  if(state.changed) {
    initCols();
  }

  var curPhase = (state.frame%state.effectArgs.period)/state.effectArgs.period;

  for(var col=0; col<width; col++) {
    var progress = getProgress(curPhase, cols[col].phase);
    ctx.fillStyle = cols[col].color;

    ctx.fillRect(col,(progress*height)|0,1,1);
  }
}