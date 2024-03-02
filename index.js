
const Lifx = require('node-lifx-lan');
const config = require('./config');

const INTERVAL = 5000
const state = {};

const getLightConfig = async () => {
  const devices = await Lifx.discover();

  console.log(devices.map(d => ({
    label: d['deviceInfo'].label,
    mac: d['mac'],
    ip: d['ip']
  })));
}

const run = async () => {
  try {

    for (light of config.lights) {
      const device = await Lifx.createDevice(light);
      const lightState = await device.getLightState();

      console.log({ label: light.label, power: lightState.power })

      device.setColor({
        color: {
          hue: 1.0,
          saturation: 0.0,
          brightness: 0.8,
          kelvin: 3500
        },
        duration: 1000
      });
    }

   
    /* const lights = await client.listLights('all');
    // console.log(lights);
    const newState = {};
    
    lights.forEach(({ label, connected }) => {
      newState[label] = connected
    });

    for (const [key, value] of Object.entries(newState)) {
      if (newState[key] !== state[key]) {
        console.log(`${key} turned ${value}`)
        state[key] = value;
      }
    } */


    console.log(state)
  } catch (e) {
    console.error(e);
  }
}

setInterval(() => {
  // (async () => {
  // check if running, then skip
  run();
  // })();
}, INTERVAL)




