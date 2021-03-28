import SystemInformation from '../adapter/chrome_system/index.js';

const config = {
  sampleLimit: 15,
  listener: chrome.system.cpu.getInfo,
};

/**
 * Create, Remove, Update, Delete Cpu informations
 * https://developer.chrome.com/docs/extensions/reference/system_cpu/
 */
class Cpu extends SystemInformation {}

const cpu = new Cpu(config);

export {cpu};
