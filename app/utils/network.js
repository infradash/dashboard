/* eslint no-confusing-arrow: ["error", {allowParens: true}]*/
import fetch from 'isomorphic-fetch';
import { API_PREFIX } from 'config';
import store from 'store';
import {
  dataRequest,
  dataRequestFailed,
  dataRequestSuccessful,
} from 'core/app';

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

export function validateResponseBody(response) {
  return new Promise((resolve, reject) => {
    if (response.error) {
      reject(response.error);
    } else {
      resolve(response);
    }
  });
}

export function getHeaders() {
  const { auth: { token } } = store.getState();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function buildEndpoint(url, values = {}) {
  return API_PREFIX + url.replace(/\{\{(\w+)\}\}/g, (p, match) => values[match]);
}

export function createRequestPromise(endpoint, method = 'GET', data = {}) {
  const isGetRequest = method.toUpperCase() === 'GET';
  const isPostRequest = method.toUpperCase() === 'POST';
  const requestObject = {
    method,
    headers: getHeaders(),
    body: isPostRequest ? JSON.stringify(data) : null,
  };

  return new Promise((resolve, reject) => {
    clearTimeout(timeoutId);
    store.dispatch(dataRequest());
    const request = fetch(endpoint, requestObject)
      .then(validateResponseCode)
      .then(response => (isGetRequest ? response.json() : response))
      .then(validateResponseBody)
      .then(response => {
        resolve(response);
        timeoutId = setTimeout(() => {
          store.dispatch(dataRequestSuccessful());
        }, 300);
      })
      .catch(error => {
        reject(error);
        timeoutId = setTimeout(() => {
          store.dispatch(dataRequestFailed(error.toString()));
        }, 300);
      });
    return request;
  });
}
