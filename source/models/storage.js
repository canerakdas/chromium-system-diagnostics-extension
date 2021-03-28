import SystemInformation from '../adapter/chrome_system/index.js';

const config = {
  sampleLimit: 1,
  listener: chrome.system.storage.getInfo,
  name: 'chrome.storage',
};

/**
 * Create, Remove, Update, Delete storage informations
 * https://developer.chrome.com/docs/extensions/reference/system_storage/
 */
class Storage extends SystemInformation {}

const storage = new Storage(config);

export {storage};
