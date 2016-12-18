import { createRequestPromise } from '../../utils/network';

import {
  NETWORK_REQUEST,
  NETWORK_REQUEST_SUCCESSFUL,
  NETWORK_REQUEST_FAILED,
} from './constants';

let timeoutId;

export const networkRequest = () => ({
  type: NETWORK_REQUEST,
});

export const networkRequestSuccessful = () => ({
  type: NETWORK_REQUEST_SUCCESSFUL,
});

export const networkRequestFailed = (error) => ({
  type: NETWORK_REQUEST_FAILED,
  payload: {
    status: error,
  },
});

export function httpRequest(...args) {
  return (dispatch) => {
    clearTimeout(timeoutId);
    dispatch(networkRequest());
    return new Promise((resolve, reject) => {
      return createRequestPromise(...args)
        .then(response => {
          timeoutId = setTimeout(() => {
            dispatch(networkRequestSuccessful());
          }, 100);
          resolve(response);
        })
        .catch(error => {
          timeoutId = setTimeout(() => {
            dispatch(networkRequestFailed(error.toString()));
          }, 100);
          reject(error);
        });
    });
  };
}
