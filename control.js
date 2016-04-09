const preset = require('./preset');

function gotInput(data) {
  if(data.preset) {
    preset.switchTo(data.preset);
  }
}

module.exports = {
  gotInput: gotInput
};