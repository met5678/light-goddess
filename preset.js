const _     = require('lodash');
const nconf = require('nconf');
const state = require('./state');
const requireDir = require('require-dir');
const presets = requireDir('./presets');

function switchTo(preset) {
  if(presets[preset]) {
    _.assign(state.control, presets[preset]);
    state.changed = true;
  }
}

switchTo('seapunk');

module.exports = {
  switchTo: switchTo
};