const Lifx = require('node-lifx-lan');

const getLightConfig = async () => {
  const devices = await Lifx.discover();

  console.log(devices.map(d => ({
    label: d['deviceInfo'].label,
    mac: d['mac'],
    ip: d['ip']
  })));
}