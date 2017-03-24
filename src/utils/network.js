import 'whatwg-fetch';
import { HOST_PATH } from '../config';

export function validateResponseCode(response) {
  return new Promise((resolve, reject) => {
    const { status, statusText } = response;
    if (status < 200 || status >= 300) {
      reject(statusText || status);
    } else {
      resolve(response);
    }
  });
}

export function replaceValues(str, values = {}) {
  return str.replace(/\{\{(\w+)\}\}/g, (p, match) => values[match] || p);
}

export function createUrl(endpoint, params) {
  let url = endpoint;
  const urlStartsWithHttpRegExp = /^https?:\/\//i;
  if (!urlStartsWithHttpRegExp.test(url)) {
    url = `${HOST_PATH}${url}`;
  }
  url = new URL(url);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
}

// export function serialize(data) {
//   return Object.keys(data).map(keyName => {
//     const tmp = `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`;
//     return tmp;
//   }).join('&');
// }

export function createRequestPromise( endpoint, method = 'GET', data = {}, params = {}, headers = {}) {
  const isPostRequest = method.toUpperCase() === 'POST';
  const url = createUrl(endpoint, params);
  const requestObject = {
    method,
    headers: new Headers(headers),
    body: isPostRequest ? JSON.stringify(data) : null,
  };

  return new Promise((resolve, reject) => {
    fetch(url, requestObject)
      .then(validateResponseCode)
      .then(response => response.text())
      .then(response => (response && JSON.parse(response)) || null)
      .then(resolve)
      .catch(reject);
  });
}
