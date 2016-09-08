'use strict';

const nconf  = require('nconf');
const beat   = require('./beat');
const state  = require('./state');
const requireDir = require('require-dir');

const color   = require('./color');
const effects = requireDir('./effects');

function randomizeEffectArgs() {
  let effect = state.control.effect;
  let effectConfig = effects[effect].config;

  for(let param in effectConfig.params) {
    let paramConfig = effectConfig.params[param];
    if(!paramConfig.randomize) {
      continue;
    }

    if(paramConfig.type == 'boolean') {
      state.control.effectArgs[param] = Math.random() < 0.5;
    }
    if(paramConfig.type == 'int') {
      let range = paramConfig.randomize.max - paramConfig.randomize.min + 1;
      state.control.effectArgs[param] = paramConfig.randomize.min + Math.floor(Math.random()*range);
    }
    if(paramConfig.type == 'frac') {
      let range = paramConfig.randomize.max - paramConfig.randomize.min;
      state.control.effectArgs[param] = Math.random()*range + paramConfig.randomize.min;
    }
  }
}

function randomizeColors() {

}

function randomizeAll() {
  state.control.beat.pingpong = Math.random() < 0.5;
  state.control.beat
}

module.exports = {
  randomizeEffectArgs: randomizeEffectArgs,
  randomizeColors:     randomizeColors,
  randoizeAll:         randomizeAll
};