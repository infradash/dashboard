import { createRequestPromise } from '../../utils/network';

import {
  NETWORK_REQUEST,
  NETWORK_REQUEST_SUCCESSFUL,
  NETWORK_REQUEST_FAILED,
} from './constants';

const networkRequestsStack = [];

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
    return new Promise((resolve, reject) => {
      networkRequestsStack.push(dispatch(networkRequest()));
      return createRequestPromise(...args)
        .then(response => {
          networkRequestsStack.pop();
          if (!networkRequestsStack.length) {
            dispatch(networkRequestSuccessful());
          }
          resolve(response);
        })
        .catch(error => {
          networkRequestsStack.pop();
          if (!networkRequestsStack.length) {
            dispatch(networkRequestFailed(error.toString()));
          }
          reject(error);
        });
    });
  };
}