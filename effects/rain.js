const state = require('../state');
const color = require('../color');
const nconf = require('nconf');

const height = nconf.get('height');
const width  = nconf.get('width');

var cols = [];

function initCols(ctx) {
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

  return 1-a;
}


module.exports = function(ctx) {
  if(state.changed) {
    initCols(ctx);
  }

  var curPhase = (state.frame%state.effectArgs.period)/state.effectArgs.period;

  for(var col=0; col<width; col++) {
    var progress = getProgress(curPhase, cols[col].phase);

    var grd = ctx.createLinearGradient(0,0,0,height);
    grd.addColorStop(progress-state.effectArgs.dropLength,'black');
    grd.addColorStop(progress,cols[col].color);
    grd.addColorStop(progress+0.05,'black');

    ctx.fillStyle = grd;

    ctx.fillRect(col,0,1,height);
  }
}