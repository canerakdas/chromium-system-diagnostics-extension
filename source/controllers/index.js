/**
 * The controller that allows the extension to talk PWA and PWA to extension
 * https://developer.chrome.com/docs/extensions/reference/runtime/
 */
export default class Controller {
  /**
   * Create an instance of controller
   * @param {Object} config
   */
  constructor(config) {
    this.config = config || {};
    this.mapping();
  }

  /**
   * Mapping methods
   */
  mapping() {
    chrome.runtime.onMessageExternal.addListener(
        async (request, sender, sendResponse) => {
          if (request.type === this.config.type) {
            let response;
            switch (request.method) {
              case 'GET':
                if (typeof request.id === 'number') {
                  response = this.getOne(request.id);
                } else {
                  response = this.getAll(
                      request.fields,
                      request.sort,
                      request.order,
                      request.offset,
                      request.limit);
                }
                break;
              case 'POST':
                response = await this.post();
                break;
              case 'PUT':
                response = this.put(request.id, request.item);
                break;
              case 'DELETE':
                response = this.delete(request.id);
                break;
              default:
                response = this.getAll(
                    request.fields,
                    request.sort,
                    request.order,
                    request.offset,
                    request.limit);
                break;
            }
            sendResponse(response);
          }
        },
    );
  }

  /**
   * Creating and storing new item
   * @return {Promise}
   */
  post() {
    return this.config.model.add();
  }

  /**
   * Retrieve stored item by id
   * @param {Int} id
   * @return {Array}
   */
  getOne(id) {
    return this.config.model.getById(id);
  }

  /**
   * Get all of stored items
   * @param {Array} fields []Array
   * @param {String} sort
   * @param {String} order
   * @param {Int} offset
   * @param {Int} limit
   * @return {Object}
   */
  getAll(fields, sort, order, offset, limit) {
    return this.config.model.getAll(
        fields || [],
        sort,
        order,
        offset || 0,
        limit);
  }

  /**
   * Update item by id
   * @param {Int} id
   * @param {Object} item
   * @return {Error}
   */
  put(id, item) {
    return this.config.model.update(id, item);
  }

  /**
   * Delete item by id
   * @param {Int} id
   * @return {Error}
   */
  delete(id) {
    return this.config.model.delete(id);
  }
}
