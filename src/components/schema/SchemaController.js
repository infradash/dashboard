/* eslint no-param-reassign: ["error", { "props": false }]*/

import {
  createRequestPromise,
  replaceValues,
} from '../../utils/network';

import { DEFAULT_HEADERS } from '../../config';

export class SchemaController {

  static loadSchemaFromUrl(query) {
    const { schemaUrl } = query;
    return createRequestPromise(schemaUrl);
  }

  static actionCreator(action, location = {}, header = {}) {
    const { url, method, params } = action;
    const urlParams = location.query;
    const endpoint = replaceValues(url, urlParams);
    const headers = Object.assign({}, DEFAULT_HEADERS, header);
    return (data) => createRequestPromise(endpoint, method, data, params, headers);
  }
}
