import { httpRequest } from '../network';
import { DEFAULT_HEADERS } from '../../config';
import { replaceValues } from '../../utils/network';

export function createSchemaRequest(action, model, authHeader = {}) {
  return (dispatch) => {
    const { url, method } = action;
    const headers = Object.assign({}, DEFAULT_HEADERS, authHeader);
    const endpoint = replaceValues(url, model);
    return (data) => httpRequest(endpoint, method, data, undefined, headers)(dispatch);
  }
}