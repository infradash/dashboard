import { hashHistory } from 'react-router';
import { createRequestPromise } from '../../utils/network';

import {
  INITIAL_PATH,
  ROOT_PATH,
  CLOSE_ERROR_MESSAGE,
  CLOSE_MODAL_WINDOW,
  SHOW_MODAL_WINDOW,
  DATA_REQUEST,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
  APP_CONFIG_REQUEST_FAILED,
  APP_CONFIG_REQUEST_SUCCESSFUL,
  SET_AUTHENTICATION_DATA,
  APP_DISCONNECT,
  CACHE_HTTP_PARAMS,
} from './constants';


export const closeErrorMessage = () => ({
  type: CLOSE_ERROR_MESSAGE,
});

export const closeModalWindow = () => ({
  type: CLOSE_MODAL_WINDOW,
});

export const showModalWindow = ({ content, callback }, showButtons = true) => ({
  type: SHOW_MODAL_WINDOW,
  payload: {
    content,
    callback,
    showButtons,
  },
});

export const dataRequest = () => ({
  type: DATA_REQUEST,
});

export const dataRequestSuccessful = () => ({
  type: DATA_REQUEST_SUCCESSFUL,
});

export const dataRequestFailed = (error) => ({
  type: DATA_REQUEST_FAILED,
  payload: {
    status: error,
  },
});

export const appConfigRequestFailed = (error) => ({
  type: APP_CONFIG_REQUEST_FAILED,
  payload: {
    status: error,
  },
});

export const appConfigRequestSuccesful = (response) => ({
  type: APP_CONFIG_REQUEST_SUCCESSFUL,
  payload: {
    config: response,
  },
});

export const setAuthenticationData = (header) => ({
  type: SET_AUTHENTICATION_DATA,
  payload: {
    header,
  },
});

export const cacheHttpParams = (endpoint, method, params) => ({
  type: CACHE_HTTP_PARAMS,
  payload: {
    endpoint,
    method,
    params,
  },
});


export function loadConfig(path, redirect = ROOT_PATH) {
  return (dispatch) => {
    const promise = createRequestPromise(path)
      .then(response => {
        dispatch(appConfigRequestSuccesful(response));
        hashHistory.push(redirect);
      })
      .catch(error => dispatch(appConfigRequestFailed(error)));
    return promise;
  };
}

export function disconnect() {
  return (dispatch) => {
    dispatch({
      type: APP_DISCONNECT,
    });
    hashHistory.push(INITIAL_PATH);
  };
}
