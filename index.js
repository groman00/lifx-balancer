const Lifx = require('node-lifx-lan');
const config = require('./config');
const { 
  sunrise, 
  sunset, 
  sleep, 
  night,
  lateNight, 
  dinner,
} = require('./colors');

const INTERVAL = 10000;

const state = {}

const delay = () => new Promise((resolve) => {
  const interval = setInterval(() => {
    clearInterval(interval);
    resolve();
  }, INTERVAL);
});

const log = (str) => {
  // console.log(str)
} 

const toColorByTime = () => {
  const date = new Date();
  const hourMinute = parseInt(`${date.getHours()}${date.getMinutes()}`);
  const map = {
    620: sunrise,
    1754: sunset,
    1830: dinner,
    2155: night,
    2230: lateNight,
    2330: sleep,
  };
  
  for (key of Object.keys(map).reverse()) {
    if (hourMinute >= parseInt(key)) {
      color = map[key];
      break;
    }
  }
  // log('returning color', color);
  return color;
};

const updateLight = async (light) => {
  const { label } = light;

  log(`Updating light ${label}`);

  try {
    const device = await Lifx.createDevice(light);

    // This pings the device.
    await device.deviceGetPower();

    if (!state[label]) {
      await device.setColor({
        color: toColorByTime(),
        duration: 1000,
      });
      state[label] = true;
    }

  } catch (e) {
    state[label] = false;
    log(e);
    log(`${label} unavailable`);
  }

  return Promise.resolve();
}

const run = async () => {
  log('running');

  const lightPromises = [];

  for (light of config.lights) {
    lightPromises.push(
      updateLight(light)
    );
  }

  await Promise.all(lightPromises);

  log('all done', state);

  await delay();

  run()
}

(async () => {
  await Lifx.init();
  run();
})();
