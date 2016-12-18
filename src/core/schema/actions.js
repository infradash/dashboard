import { httpRequest } from '../network';
import { DEFAULT_HEADERS } from '../../config';
import { replaceValues } from '../../utils/network';

export function createSchemaRequest(action, location = {}, header = {}) {
  return (dispatch) => {
    const { url, method, params } = action;
    const urlParams = location.query;
    const endpoint = replaceValues(url, urlParams);
    const headers = Object.assign({}, DEFAULT_HEADERS, header);
    return (data) => httpRequest(endpoint, method, data, params, headers)(dispatch);
  }
}
