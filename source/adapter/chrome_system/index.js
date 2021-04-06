
/**
 * Class able to get system informations with chrome.system APIs
 * https://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/systeminfo
 */
export default class SystemInformation {
  /**
   * Create an instance of system information
   * @param {object} config
   */
  constructor(config) {
    this.config = config || {};
    this.config.cursor = 0;
    this.storage = [];
  }

  /**
   * It takes relevant system information and returns it as a promise.
   * @return {Promise} System information
   */
  add() {
    return new Promise((resolve, reject) => {
      try {
        this.config.listener((info) =>{
          /**
           * @namespace
           * @property {int} id Identity of system information
           * @property {time} time Unix epoch time
           */
          let item = {
            'id': this.config.cursor,
            'time': new Date().getTime(),
          };

          if (Array.isArray(info) === true) {
            item.detail = info;
          } else {
            item = {...item, ...info};
          }

          this.config.cursor = this.config.cursor + 1;

          if (this.storage.length >= this.config.sampleLimit) {
            this.storage.shift();
          }

          this.storage.push(item);
          resolve(item);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Retrieve stored item by id
   * @param {int} id Identity of system information
   * @return {error}
   */
  getById(id) {
    try {
      this.storage.filter((item) => {
        if (item.id === id) {
          return item;
        }
      });
    } catch (e) {
      return e;
    }
  }

  /**
   * Retrieve selected system informations by query
   * @param {array} fields Filtering system informations by fields
   * @param {string} sort Sorting items by key
   * @param {string} order Sorting items [asc,desc]
   * @param {int} offset Items offset
   * @param {int} limit Items limit
   * @return {object|error} Slice of system information or error
   */
  getAll(fields, sort, order, offset, limit) {
    try {
      let temp = [...this.storage];

      // Filtering by fields
      if (fields.length) {
        const filterFields = [];

        for (let i = 0; i < temp.length; i++) {
          const item = {};
          for (let j = 0; j < fields.length; j++) {
            const field = fields[j];
            item[field] = temp[i][field];
          }
          filterFields.push(item);
        }

        temp = filterFields;
      }

      if (sort) {
        if (order === 'asc') {
          temp.sort((a, b) => a[sort] - b[sort]);
        } else {
          temp.sort((a, b) => b[sort] - a[sort]);
        }
      }

      return temp.slice(offset, limit || this.config.sampleLimit);
    } catch (e) {
      return e;
    }
  }

  /**
   * Update item by id
   * @param {int} id Identity of system information
   * @param {object} item New system information
   * @return {error}
   */
  update(id, item) {
    try {
      for (let i = 0; i < this.storage.length; i++) {
        const t = this.storage[i];
        if (t.id === id) {
          t = item;
        }
      }
      return null;
    } catch (e) {
      return e;
    }
  }

  /**
   * Delete item by id
   * @param {int} id Identity of system information
   * @return {error}
   */
  delete(id) {
    try {
      for (let i = 0; i < this.storage.length; i++) {
        const item = this.storage[i];
        if (item.id === id) {
          item.splice(i, 1);
        }
      }
      return null;
    } catch (e) {
      return e;
    }
  }
}
