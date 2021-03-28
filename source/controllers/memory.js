import Controller from './index.js';
import {memory} from '../models/memory.js';

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
