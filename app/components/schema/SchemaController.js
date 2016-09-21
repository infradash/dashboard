/* eslint no-param-reassign: ["error", { "props": false }]*/

import {
  createRequestPromise,
  replaceValues,
} from '../../utils/network';

import { DEFAULT_HEADERS } from '../../config';

export class SchemaController {

  static loadSchemasFromUrl(query) {
    const schemas = [];
    schemas.push(query.schemaUrl);
    if (query.subview) {
      const subview = JSON.parse(query.subview);
      schemas.push(subview.schemaUrl);
    }
    const promises = schemas.map(url => createRequestPromise(url));
    return Promise.all(promises).then(values => {
      const schemaObj = values.reduce((obj, value, index) => {
        obj[schemas[index]] = value;
        return obj;
      }, {});
      return schemaObj;
    });
  }

  static actionCreator(action, location = {}, header = {}) {
    const { url, method, params } = action;
    const urlParams = location.query;
    const endpoint = replaceValues(url, urlParams);
    const headers = Object.assign({}, DEFAULT_HEADERS, header);
    return (data) => createRequestPromise(endpoint, method, data, params, headers);
  }
}
