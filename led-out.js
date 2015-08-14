var SerialPort = require('serialport').SerialPort;
var Canvas = require('canvas');
var Color = require('color');

var ledEffects = require('./led-effects')

var serialPort = new SerialPort("/dev/tty.usbmodem610421", {
  baudrate: 115200
});

var ledsPerStrip = 270;
var strips = 4;
var pixels = ledsPerStrip*strips;

var canvas = new Canvas(ledsPerStrip,4),
		ctx = canvas.getContext('2d');

var open = false;

var strobeFrames = 5;
var curStrobe = 0;

var buf = new Buffer(pixels*3);
var blackBuf = new Buffer(pixels*3);
blackBuf.fill(0x00);

var doLoop = function() {
	doFrame();
};

serialPort.on("open", function () {
  console.log('Serial Port Open');
  open = true;
});

function noop() {}

function renderFrame(state) {
	if(!open) { return; }

	if(state.strobe) {
		curStrobe = (curStrobe+1)%strobeFrames;
		if(curStrobe > 0) {
			serialPort.write(blackBuf, noop);
			return;
		}
		else {
			ctx.globalAlpha = 1;
			ctx.fillStyle = '#000000';
			ctx.fillRect(0,0,234,strips);
			ctx.fillStyle = '#FFFFFF';
			ctx.globalAlpha = state.ledDimR;
			ctx.fillRect(0,0,234,2);
			ctx.globalAlpha = state.ledDimL;
			ctx.fillRect(0,2,234,2);
		}
	}
	else {
		ctx.globalAlpha = 1;
		ctx.clearRect(0,0,234,strips);
		state.cHeight = strips;
		state.cWidth = 234;

		ledEffects[state.effect](state,ctx);

		ctx.fillStyle = '#000000';
		ctx.globalAlpha = 1-state.ledDimR;
		ctx.fillRect(0,0,state.cWidth,2);
		ctx.globalAlpha = 1-state.ledDimL;
		ctx.fillRect(0,2,state.cWidth,2);
	}

	var pixelData = ctx.getImageData(0,0,ledsPerStrip,4).data;

	for(var pixelIndex=0, bufIndex = 0; pixelIndex<pixelData.length; pixelIndex++) {
		if(pixelIndex%4 == 3)
			continue;

		buf[bufIndex] = pixelData[pixelIndex];
		bufIndex++;
	}
	serialPort.write(buf, noop);
}

module.exports = {
	renderFrame: renderFrame
}