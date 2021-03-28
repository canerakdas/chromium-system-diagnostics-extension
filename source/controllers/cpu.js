import Controller from './index.js';
import {cpu} from '../models/cpu.js';

const config = {
  model: cpu,
  type: 'chromium.cpu',
};

/**
 * The Cpu Controller that allows the share CPU information
 */
class CpuController extends Controller {};

const cpuController = new CpuController(config);

export {cpuController};
