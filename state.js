var state = {
  control: {
    preset: 'cloudy',
    beat: {
      quant: 4,
      ease: false,
      pingpong: false
    },
    effect: 'pulsate',
    effectArgs: {
      gradWidth: .2,
      reverse: true,
      numLines: 3,
      alternate: false
    },
    color: {
      h: 240,
      s: 100,
      v: 100,
      spread: 120
    },
    dim: .7,
    randomize: false,
    strobe: false
  },
  frame: {}
};

module.exports = state;