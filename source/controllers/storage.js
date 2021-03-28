import Controller from './index.js';
import {storage} from '../models/storage.js';

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
