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

function renderFrame() {
  ctx.globalAlpha = 1;
  ctx.clearRect(0,0,width,height);

  effects[state.effect](ctx);

  ctx.fillStyle = '#000000';
  ctx.globalAlpha = 1-state.dim;
  ctx.fillRect(0,0,width,height);
}

module.exports = {
  renderFrame: renderFrame
};