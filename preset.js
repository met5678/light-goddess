const _     = require('lodash');
const nconf = require('nconf');
const state = require('./state');
const requireDir = require('require-dir');
const presets = requireDir('./presets');

function switchTo(preset) {
  if(presets[preset]) {
    _.assign(state,presets[preset]);
    state.changed = true;
  }
}

switchTo('wind');

module.exports = {
  switchTo: switchTo
};