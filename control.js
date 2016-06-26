const nconf  = require('nconf');
const beat   = require('./beat');
const state  = require('./state');
const randomize = require('./randomize');

function gotInput(data) {
  console.log("INPUT",data);
  if(data.action) {
    if(data.action == 'beat') {
      beat.tap();
      return;
    }
    if(data.action == 'randomize') {

    }
  }
  if(typeof(data.strobe) != 'undefined') {
    state.control.strobe = data.strobe;
  }
  if(data.randomize) {
    state.control.randomize = data.randomize;
  }
  if(data.quant) {
    state.control.beat.quant = data.quant;
  }
  if(data.effect) {
    state.control.effect = data.effect;
    randomize.randomizeEffectArgs();
  }
}

module.exports = {
  gotInput: gotInput
};