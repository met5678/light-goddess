const nconf = require('nconf');
const events = require('events');
const fps = nconf.get('fps');

const state = require('./state');

const ee = new events.EventEmitter();

var frame = 0;
var curBeat = 0;
var wasChangedBefore = false;

function doFrame() {
  state.frame = frame;
  if(state.changed) {
    if(wasChangedBefore) {
      state.changed = false; 
    }
    else {
      wasChangedBefore = true;
    }
  }

  ee.emit('frame');
  frame++;
}

setInterval(doFrame, 1000/fps);

module.exports = ee;