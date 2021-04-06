import SystemInformation from '../adapter/chrome_system/index.js';

/**
 * @namespace
 * @property {int} sampleLimit In memory stored item count
 * @property {function} listener Get the storage information from the system.
 * The argument passed to the callback is an array of StorageUnitInfo objects.
 */
const config = {
  sampleLimit: 1,
  listener: chrome.system.storage.getInfo,
};

/**
 * Create, Remove, Update, Delete storage informations
 * https://developer.chrome.com/docs/extensions/reference/system_storage/
 */
class Storage extends SystemInformation {}

const storage = new Storage(config);

export {storage};
