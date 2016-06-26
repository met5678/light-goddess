'use strict';

const Canvas = require('canvas');
const nconf = require('nconf');
const requireDir = require('require-dir');

const color   = require('./color');
const effects = requireDir('./effects');
const state   = require('./state');

const width = nconf.get('width');
const height = nconf.get('height');

const canvas = new Canvas(width, height);

const ctx = canvas.getContext('2d');
state.ctx = ctx;

let lastEffect = "";

function renderFrame() {
  ctx.globalAlpha = 1;
  ctx.clearRect(0,0,width,height);

  state.frame.effectArgs = state.control.effectArgs;

  if(state.control.strobe) {
    if(state.frame.num % 4 == 0) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0,0,width,height);
    }
  }
  else {
    effects[state.control.effect](ctx, lastEffect !== state.control.effect);
  }

  lastEffect = state.control.effect;
}

module.exports = {
  renderFrame: renderFrame
};