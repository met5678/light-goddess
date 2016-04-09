const Color = require('color');
const state = require('./state');

var baseColor = Color('#000000');

function setBaseColor() {
  if(state.changed) {
    baseColor = Color().hsv(state.color.h, state.color.s, state.color.v);
  }
}

function getColor() {
  if(state.color.spread) {
    var dir = Math.random() < 0.5;
    if(dir == 0) { dir = -1 }
    var amt = (Math.random()*state.color.spread)|0;
    var newColor = baseColor.clone();
    newColor.rotate(amt*dir);
    return newColor.hexString();
  }
  else {
    return baseColor.hexString();
  }
}

module.exports = {
  setBaseColor: setBaseColor,
  getColor: getColor
};