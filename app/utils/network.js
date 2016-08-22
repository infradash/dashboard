/* eslint no-confusing-arrow: ["error", {allowParens: true}]*/
import 'whatwg-fetch';

// import { API_PREFIX } from '../config';
import store from '../store';
import {
  dataRequest,
  dataRequestFailed,
  dataRequestSuccessful,
} from '../core/app';

let timeoutId;

export function validateResponseCode(response) {
  return new Promise((resolve, reject) => {
    const { status, statusText } = response;
    if (status < 200 || status >= 300) {
      reject(statusText);
    } else {
      resolve(response);
    }
  });
}
//
// export function validateResponseBody(response) {
//   return new Promise((resolve, reject) => {
//     if (response.error) {
//       reject(response.error);
//     } else {
//       resolve(response);
//     }
//   });
// }
// export function getHeaders() {
//   const { auth: { token } } = store.getState();
//   const headers = {
//     'Content-Type': 'application/json',
//   };
//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }
//   return headers;
// }

export function buildEndpointFromTemplate(url, values = {}) {
  return url.replace(/\{\{(\w+)\}\}/g, (p, match) => values[match] || p);
}

export function createUrl(endpoint, params) {
  let url = endpoint;
  const urlStartsWithHttpRegExp = /^https?:\/\//i;
  if (!urlStartsWithHttpRegExp.test(url)) {
    url = `${window.location.origin}/${url}`;
  }
  url = new URL(url);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
}

export function serialize(data) {
  return Object.keys(data).map(keyName => {
    const tmp = `${encodeURIComponent(keyName)}=${encodeURIComponent(data[keyName])}`;
    return tmp;
  }).join('&');
}

export function createRequestPromise(endpoint, method = 'GET', data = {}, params = {}) {
  const isPostRequest = method.toUpperCase() === 'POST';
  // const isCorsRequest = endpoint.indexOf(API_PREFIX) === -1;
  const url = createUrl(endpoint, params);
  // var formData = new FormData();
  // Object.keys(data).forEach(key => formData.append(key, data[key]));

  const requestObject = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: isPostRequest ? JSON.stringify(data) : null,
    // headers: new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // }),
    // body: isPostRequest ? serialize(data) : null,
  };

  return new Promise((resolve, reject) => {
    clearTimeout(timeoutId);
    store.dispatch(dataRequest());
    return fetch(url, requestObject)
      .then(validateResponseCode)
      .then(response => response.text())
      .then(response => response && JSON.parse(response) || null)
      .then(resolve)
      .catch(reject);
  }).then(response => {
    timeoutId = setTimeout(() => {
      store.dispatch(dataRequestSuccessful());
    }, 300);
    return response;
  }).catch(error => {
    timeoutId = setTimeout(() => {
      store.dispatch(dataRequestFailed(error.toString()));
    }, 300);
    throw new Error(error);
  });
}
