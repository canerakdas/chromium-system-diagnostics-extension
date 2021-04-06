import Controller from './index.js';
import {storage} from '../models/storage.js';

/**
 * @namespace
 * @property {model} model Customized system information model (storage)
 * @property {string} type It will be used as a type when messaging with
 * the front-end.
 */
const config = {
  model: storage,
  type: 'chromium.storage',
};

/**
 * The Storage Controller that allows the share storage information
 */
class StorageController extends Controller {};

const storageController = new StorageController(config);

export {storageController};
