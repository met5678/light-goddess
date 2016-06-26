const nconf = require('nconf');
const _     = require('lodash');

const h = nconf.get('height');
const w = nconf.get('width');
const mapping = nconf.get('mapping');
const order = nconf.get('order');

const highestChannel = (function() {
  if(mapping) { 
    return _.max(mapping)*3;
  }
  else {
    return h*w*3;
  }
})();

var channels = [];
for(var a=0; a<highestChannel; a++) {
  channels[a] = 0;
}

function getChannels(ctx) {
  if(!ctx) {
    return channels;
  }
  var imageData = ctx.getImageData(0,0,w,h).data;
  for(var row = 0; row<h; row++) {
    for(var col = 0; col<w; col++) {
      if(mapping) {
        var address = mapping[row*w + col];
      }
      else {
        var address = row*w + col + 1;
      }
      if(address > 0) {
        var realAddr = (address-1)*3;
        var pixelAddr = (row*w + col)*4;
        var mult = imageData[pixelAddr+3]/255;
        if(order == 'rgb') {
          channels[realAddr] = (mult*imageData[pixelAddr])|0;
          channels[realAddr+1] = (mult*imageData[pixelAddr+1])|0;
          channels[realAddr+2] = (mult*imageData[pixelAddr+2])|0;
        }
        else if(order == 'brg') {
          channels[realAddr+1] = (mult*imageData[pixelAddr])|0;
          channels[realAddr+2] = (mult*imageData[pixelAddr+1])|0;
          channels[realAddr] = (mult*imageData[pixelAddr+2])|0;
        }
      }
    }
  }
  return channels;
}

module.exports = {
  getChannels: getChannels
}