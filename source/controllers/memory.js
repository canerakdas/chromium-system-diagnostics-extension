import Controller from './index.js';
import {memory} from '../models/memory.js';

/**
 * @namespace
 * @property {model} model Customized system information model (memory)
 * @property {string} type It will be used as a type when messaging with
 * the front-end.
 */
const config = {
  model: memory,
  type: 'chromium.memory',
};

/**
 * The Memory Controller that allows the share memory information
 */
class MemoryController extends Controller {};

const memoryController = new MemoryController(config);

export {memoryController};
