const base = {
  hue: 1.0,
  saturation: 0.0,
};

module.exports.sunrise = {
  ...base,
  brightness: 0.85,
  kelvin: 7500,
};

module.exports.sunset = {
  ...base,
  brightness: 0.60,
  kelvin: 2700,
};

module.exports.dinner = {
  ...base,
  brightness: 0.75,
  kelvin: 2700,
};

module.exports.night = {
  ...base,
  brightness: 0.40,
  kelvin: 2700,
};

module.exports.lateNight = {
  ...base,
  brightness: 0.40,
  kelvin: 2000,
};

module.exports.sleep = {
  ...base,
  brightness: 0.10,
  kelvin: 1500,
};