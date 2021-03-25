/**
 * Collecting system informations with Chrome extension api's
 * https://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/systeminfo
 */
class SystemInformation {
  /**
   * Create instance of SystemInformation and setup configurations.
   * @param {*} history Periodically stored system information data.
   * @param {*} detail System information config, its will run only one time.
   * @param {*} listener System listener, supports:
   * ['system.cpu', 'system.memory', 'system.storage']
   * @param {*} storage Storage api, only supports `chrome.storage.local`
   * https://developer.chrome.com/docs/extensions/reference/storage/
   */
  constructor({history, detail, listener, storage}) {
    this.history = history;
    this.detail = detail;
    this.listener = listener;
    this.storage = storage;
  }

  /**
   * Collect system information and store historically.
   * @return {promise} promise of system history.
   */
  appendToHistory() {
    return new Promise((resolve, reject) => {
      try {
        this.storage.get([this.history.storage], (item)=>{
          this._status(this.history.keywords, true).then((history) => {
            if (Array.isArray(item[this.history.storage]) === true) {
              const information = [...item[this.history.storage]];

              if (information.length >= this.history.limit) {
                information.shift();
              }

              information.push(history);

              this.storage.set({[this.history.storage]: [...information]});

              resolve(information);
            } else {
              this.storage.set({[this.history.storage]: [history]});
              resolve(history);
            }
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the system information history
   * @param {function} callback callback function for storage
   */
  getHistory(callback) {
    this.storage.get([this.history.storage], callback);
  }

  /**
   * Update current system information detail
   * @return {promise} promise of system information.
   */
  update() {
    return new Promise((resolve, reject) => {
      try {
        this.storage.get([this.detail.storage], (item)=>{
          this._status(this.detail.keywords, false).then((detail) => {
            const information = item[this.detail.storage];

            if (typeof information === 'undefined') {
              this.storage.set({[this.detail.storage]: [detail]});
            } else if (JSON.stringify(information) !== JSON.stringify(detail)) {
              this.storage.set({[this.detail.storage]: [detail]});
            }
            resolve(information);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Get system information detail
   * @param {function} callback Storage callback function
   * for system information detail.
   */
  get(callback) {
    this.storage.get([this.detail.storage], callback);
  }
  /**
   * Get the system informations, current system status
   * @param {array} filter list of items for the need to store.
   * For the detailed information:
   * https://developer.chrome.com/docs/extensions/reference/
   * @param {boolean} time Add timestamp for the generated sample.
   * @return {promise} promise of filtered system information.
   */
  _status(filter, time) {
    return new Promise((resolve, reject) => {
      try {
        this.listener((info) => {
          const struct = {};

          for (let index = 0; index < filter.length; index++) {
            const element = filter[index];
            struct[element] = info[element];
          }

          // If time params is true add to time information
          if (time === true) {
            struct['time'] = new Date().getTime();
          }
          resolve(struct);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default SystemInformation;
