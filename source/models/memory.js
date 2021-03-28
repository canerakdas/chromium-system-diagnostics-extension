import SystemInformation from '../adapter/chrome_system/index.js';

const config = {
  sampleLimit: 15,
  listener: chrome.system.memory.getInfo,
  name: 'chrome.memory',
};

/**
 * Create, Remove, Update, Delete memory information
 * https://developer.chrome.com/docs/extensions/reference/system_memory/
 */
class Memory extends SystemInformation {}

const memory = new Memory(config);

export {memory};
