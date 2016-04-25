const _     = require('lodash');
const Color = require('color');
const state = require('./state');

function getSingleColor(color) {
  var baseColor = Color().hsv(color.h, color.s, color.v);

  if(color.spread) {
    var dir = Math.random() < 0.5;
    if(dir == 0) { dir = -1 }
    var amt = (Math.random()*color.spread)|0;
    var newColor = baseColor.clone();
    newColor.rotate(amt*dir);
    return newColor.hexString();
  }
  else {
    return baseColor.hexString();
  }
}

function getColor() {
  if(_.isArray(state.color)) {
    return getSingleColor(_.sample(state.color));
  }
  else {
    return getSingleColor(state.color);
  }
}

module.exports = {
  getColor: getColor
};