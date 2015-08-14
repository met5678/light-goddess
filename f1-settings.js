var _ = require('lodash');
var f1 = require('./f1');

var controlConfig = {
	'quant': {
		'type':'step',
		'param':'quant',
		'values':[1,2,4,8,16]
	},
	'capture': {
		'type':'step',
		'param':'colorInt',
		'values':['SO','CT','FD']
	},
	'sync': {
		'type':'step',
		'param':'colorFade',
		'values':['SO','OU','PL','FL']
	},
	'type': {
		'type':'step',
		'param':'effect',
		'values':['SO','LS','BO','SP']
	},
	'size': {
		'type':'step',
		'param':'effectArg',
		'values':[-4,-3,-2,-1,1,2,3,4]
	},
	'reverse': {
		'type':'toggle',
		'param':'colorAlt'
	},
	'browse': {
		'type':'toggle',
		'param':'randomize'
	},
	'shift': {
		'type':'hold',
		'param':'strobe'
	},
	's1': {
		'type':'slider',
		'param':'brDimL',
	},
	's2': {
		'type':'slider',
		'param':'ledDimL',
	},
	's3': {
		'type':'slider',
		'param':'ledDimR',
	},
	's4': {
		'type':'slider',
		'param':'brDimR',
	},
	'k4': {
		'type':'slider',
		'param':'effectAnalog'
	}
};

var userState = {
	'quant':4,
	'colorInt':'SO',
	'colorFade':'SO',
	'colorAlt':0,
	'effect':'SO',
	'effectArg':1,
	'effectAnalog':.5,
	'randomize':0,
	'brDimL':1,
	'brDimR':1,
	'ledDimL':1,
	'ledDimR':1,
	'strobe':0
}

var stepKey = null;

function doStepper(key,config) {
	if(stepKey) {
		unbindStepper(stepKey);
	}
	stepKey = key;
	f1.setLED(key,1);
	f1.setLCDString(userState[config.param].toString());
}

function step(data) {
	if(!stepKey) { return; }
	direction = data.direction;
	var config = controlConfig[stepKey];
	var index = _.indexOf(config.values,userState[config.param]);
	index += direction;
	if(index < 0) {
		index = config.values.length-1;
	}
	else if(index >= config.values.length) {
		index = 0;
	}
	userState[config.param] = config.values[index];
	f1.setLCDString(userState[config.param].toString());
}

function unbindStepper(key) {
	if(stepKey == key) { stepKey = null; }
	f1.setLED(key,0);
}

f1.on('stepper:step',step);

_.forEach(controlConfig,function(config,key) {
	if(config.type == 'step') {
		f1.on(key+':pressed', function() { doStepper(key,config) });
		//f1.on(key+':released', function() { unbindStepper(key) });
	}
	else if(config.type == 'slider') {
		f1.on(key+':changed', function(val) { userState[config.param] = val.value; });
	}
	else if(config.type == 'toggle') {
		f1.on(key+':pressed', function() { userState[config.param] = 1-userState[config.param]; f1.setLED(key,userState[config.param]); });
	}
	else if(config.type == 'hold') {
		f1.on(key+':pressed', function() { userState[config.param] = 1 });
		f1.on(key+':released', function() { userState[config.param] = 0 });
	}
});

function getSettings() {
	return userState;
}

function randomize() {
	_.forEach(controlConfig, function(config,key) {
		if(config.type == 'step') {
			userState[config.param] = config.values[Math.random()*config.values.length | 0]
		}
		else if(config.param == 'colorAlt') {
			userState.colorAlt = Math.round(Math.random());
		}
		else if(config.param == 'effectAnalog') {
			userState.effectAnalog = Math.random();
		}
	})
}

module.exports = {
	getSettings: getSettings,
	randomize: randomize
};