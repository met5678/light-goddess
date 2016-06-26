'use strict';

const state = require('./state');
const nconf = require('nconf');
const beatAdjuster = require('./beat-adjuster');

const TAP_TIMEOUT = 8;

var bpm = nconf.get('BPM') || 120;
var beats = [];
var mspb = 500;
var beatNum = 0;

var startTime = Date.now();

var lastFrameRawProgress = 1;

function doBeat() {
  let curBeat     = fullbeat() || 0;
  let curProgress = curBeat % 1;
  let beatNum     = Math.floor(curBeat) % 16;

  let rawBeat = {
    progress: curProgress,
    num:      beatNum%16,
    isBeat:   curProgress < lastFrameRawProgress
  }

  state.frame.beat = beatAdjuster(rawBeat, state.control.beat);
  state.frame.beat.raw = rawBeat;

  lastFrameRawProgress = curProgress;
}

function fullbeat() {
  var passed = Date.now() - beats[beats.length-1];
  return beatNum + passed / mspb;
}

function tap() {
  var now = Date.now();
  if (now - beats[beats.length - 1] > TAP_TIMEOUT * mspb) {
    beats = [];
    beatNum = 0;
  }
  newBeat(now);
}

function newBeat(t) {
  beats.push(t);
  if (beats.length > 1){
    if (beats.length > 4){
      beats.shift()
    }
    mspb = (beats[beats.length-1] - beats[0]) / (beats.length-1);
    bpm = 60000 / mspb;
  }
  beatNum++;
}

setTimeout(tap, 500);

module.exports = {
  doBeat: doBeat,
  tap: tap
};