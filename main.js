'use strict';

const _     = require('lodash');
const ipc   = require('ipc-goddess');
const nconf = require('nconf');
nconf.argv().env().defaults(require('./config/config.js'));

const beat    = require('./beat');
const canvas  = require('./canvas');
const driver  = require('./driver');
const mapping = require('./mapping');
const state   = require('./state');
const control = require('./control');
const color   = require('./color');

const ipcConfig = {
	id: 'light-goddess',
	outputs: ['channels']
};

const controlInput = nconf.get('IN_CONTROL');
if(controlInput) {
  ipcConfig.inputs = {
    'control': controlInput
  }
  ipc.on('control',control.gotInput);
}

ipc.initSocket(ipcConfig);

driver.on('frame', doFrame);

function doFrame() {
	beat.doBeat();
	color.doColors();
	canvas.renderFrame();

	var channels = mapping.getChannels(state.ctx);
	ipc.emit('channels', channels);
}