
const Lifx = require('node-lifx-lan');
const config = require('./config');

const INTERVAL = 5000

const getLightConfig = async () => {
  const devices = await Lifx.discover();

  console.log(devices.map(d => ({
    label: d['deviceInfo'].label,
    mac: d['mac'],
    ip: d['ip']
  })));
}

const delay = () => new Promise((resolve) => {
  const interval = setInterval(() => {
    clearInterval(interval);
    resolve(); 
  }, INTERVAL);
});

const updateLight = async (light) => {
  console.log(`Updating light ${light.label}`);

  try {
    const device = await Lifx.createDevice(light);
    const lightState = await device.getLightState();

    console.log({ label: light.label, power: lightState.power })

    return device.setColor({
      color: {
        hue: 1.0,
        saturation: 0.0,
        brightness: 0.8,
        kelvin: 3500
      },
      duration: 1000
    });

  } catch (e) {
    console.log(`${light.label} unavailable`);
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

  console.log('all done');

  await delay();
  
  run()
}

run();
