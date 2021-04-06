import Controller from './index.js';
import {cpu} from '../models/cpu.js';

/**
 * @namespace
 * @property {model} model Customized system information model (cpu)
 * @property {string} type It will be used as a type when messaging with
 * the front-end.
 */
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
