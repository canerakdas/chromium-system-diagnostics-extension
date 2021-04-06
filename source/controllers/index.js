/**
 * The controller that allows the extension to talk PWA and PWA to extension
 * https://developer.chrome.com/docs/extensions/reference/runtime/
 */
export default class Controller {
  /**
   * Create an instance of controller
   * @param {object} config
   */
  constructor(config) {
    this.config = config || {};
    this.router();
  }

  /**
   * TODO : This usage is wrong, controllers need only one addListener.
   */
  router() {
    // Usage: https://developer.chrome.com/docs/extensions/reference/runtime/
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
   * @return {promise} System information
   */
  post() {
    return this.config.model.add();
  }

  /**
   * Retrieve stored item by id
   * @param {int} id Identity of system information
   * @return {array} Slice of system information
   */
  getOne(id) {
    return this.config.model.getById(id);
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
    return this.config.model.getAll(
        fields || [],
        sort,
        order,
        offset || 0,
        limit);
  }

  /**
   * Update item by id
   * @param {int} id Identity of system information
   * @param {object} item New system information
   * @return {error}
   */
  put(id, item) {
    return this.config.model.update(id, item);
  }

  /**
   * Delete item by id
   * @param {int} id Identity of system information
   * @return {error}
   */
  delete(id) {
    return this.config.model.delete(id);
  }
}
