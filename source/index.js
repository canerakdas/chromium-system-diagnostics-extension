import SystemInformation from './system/';

const TIMEOUT = 30000;
const SAMPLE_LIMIT = 15;

// Cpu configurations
const cpu = new SystemInformation({
  'history': {
    'keywords': [
      'processors',
      'temperatures',
    ],
    'storage': 'cpu.history',
    'limit': SAMPLE_LIMIT,
  },
  'detail': {
    'keywords': [
      'archName',
      'features',
      'modelName',
      'numOfProcessors',
    ],
    'storage': 'cpu.detail',
  },
  'listener': chrome.system.cpu.getInfo,
  'storage': chrome.storage.local,
});

// Memory configurations
const memory = new SystemInformation({
  'history': {
    'keywords': [
      'availableCapacity',
      'capacity',
    ],
    'storage': 'memory.history',
    'limit': SAMPLE_LIMIT,
  },
  'listener': chrome.system.memory.getInfo,
  'storage': chrome.storage.local,
});

// Extension initialization
chrome.runtime.onInstalled.addListener(function() {
  try {
    cpu.update();
  } catch (error) {
    console.error(error);
  }
});

window.cpu = cpu;
window.memory = memory;

// Periodically run jobs and get the current system status
setInterval(() => {
  cpu.appendToHistory();
  memory.appendToHistory();
}, TIMEOUT);
