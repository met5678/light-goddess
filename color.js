'use strict';

const _     = require('lodash');
const Color = require('color');
const state = require('./state');

function getSingleColor(color) {
  var baseColor = Color().hsv(color.h, color.s, Math.round(color.v * state.control.dim));

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

function doColors(override) {
  if(override || state.frame.beat.isBeat) {
    let curColor = state.control.color;
    if(!_.isArray(curColor)) {
      curColor = [ curColor ];
    }
    state.frame.colors = [
      getSingleColor(curColor[0]),
      getSingleColor(curColor[1 % curColor.length]),
      getSingleColor(curColor[2 % curColor.length]),
      getSingleColor(curColor[3 % curColor.length])
    ];
  }
}

doColors(true);

module.exports = {
  doColors: doColors,
  DARK: 'rgba(0,0,0,0)',
  WHITE: '#FFFFFF'
};