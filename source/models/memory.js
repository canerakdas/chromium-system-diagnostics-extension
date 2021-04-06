import SystemInformation from '../adapter/chrome_system/index.js';

/**
 * @namespace
 * @property {int} sampleLimit In memory stored item count
 * @property {function} listener Get physical memory information.
 */
const config = {
  sampleLimit: 15,
  listener: chrome.system.memory.getInfo,
};

/**
 * Create, Remove, Update, Delete memory information
 * https://developer.chrome.com/docs/extensions/reference/system_memory/
 */
class Memory extends SystemInformation {}

const memory = new Memory(config);

export {memory};
