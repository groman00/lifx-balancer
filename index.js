const Lifx = require('node-lifx-lan');
const config = require('./config');
const state = {}

const INTERVAL = 5000

const delay = () => new Promise((resolve) => {
  const interval = setInterval(() => {
    clearInterval(interval);
    resolve(); 
  }, INTERVAL);
});

const updateLight = async (light) => {
  const { label } = light;

  console.log(`Updating light ${label}`);
  
  try {
    const device = await Lifx.createDevice(light);
        
    await device.setColor({
      color: {
        hue: 1.0,
        saturation: 0.0,
        brightness: 0.5,
        kelvin: 2700
      },
      duration: 1000
    });

    if (!state[label]) {
      state[label] = true
      // Set light to color based on time of day
    }

  } catch (e) {
    state[label] = false;
    console.log(`${label} unavailable`);
  }

  return Promise.resolve();
}

const run = async () => {
  console.log('running');

  const lightPromises = [];

  for (light of config.lights) {
    lightPromises.push(
      updateLight(light)
    );
  }

  await Promise.all(lightPromises);

  console.log('all done', state);

  await delay();
  
  run()
}

run();
