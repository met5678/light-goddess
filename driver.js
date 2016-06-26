const nconf = require('nconf');
const events = require('events');
const fps = nconf.get('fps');

const state = require('./state');

const ee = new events.EventEmitter();

var frameNum = 0;
var curBeat = 0;
var wasChangedBefore = false;

function doFrame() {
  state.frame.num = frameNum;
  ee.emit('frame');
  frameNum++;
}

setInterval(doFrame, 1000/fps);

module.exports = ee;