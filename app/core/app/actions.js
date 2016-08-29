import { createRequestPromise } from '../../utils/network';
import { hashHistory } from 'react-router';

import {
  INITIAL_PATH,
  ROOT_PATH,
} from './constants';

export const APP_CONFIG_PATH = 'APP_CONFIG_PATH';
export const APP_DISCONNECT = 'APP_DISCONNECT';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_SUCCESSFUL = 'DATA_REQUEST_SUCCESSFUL';
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED';

export const APP_CONFIG_REQUEST_SUCCESSFUL = 'APP_CONFIG_REQUEST_SUCCESSFUL';
export const APP_CONFIG_REQUEST_FAILED = 'APP_CONFIG_REQUEST_FAILED';

export const CLOSE_ERROR_MESSAGE = 'CLOSE_ERROR_MESSAGE';
export const SHOW_MODAL_WINDOW = 'SHOW_MODAL_WINDOW';
export const CLOSE_MODAL_WINDOW = 'CLOSE_MODAL_WINDOW';

export const SET_AUTHENTICATION_DATA = 'SET_AUTHENTICATION_DATA';

export function closeErrorMessage() {
  return {
    type: CLOSE_ERROR_MESSAGE,
  };
}

export function closeModalWindow() {
  return {
    type: CLOSE_MODAL_WINDOW,
  };
}

export function showModalWindow({ message, redirect = null }, showButtons = true) {
  return {
    type: SHOW_MODAL_WINDOW,
    payload: {
      message,
      redirect,
      showButtons,
    },
  };
}

export function dataRequest() {
  return {
    type: DATA_REQUEST,
  };
}

export function dataRequestSuccessful() {
  return {
    type: DATA_REQUEST_SUCCESSFUL,
  };
}

export function dataRequestFailed(error) {
  return {
    type: DATA_REQUEST_FAILED,
    payload: {
      status: error,
    },
  };
}

export function appConfigRequestFailed() {
  return {
    type: APP_CONFIG_REQUEST_FAILED,
  };
}

export function appConfigRequestSuccesful(response) {
  return {
    type: APP_CONFIG_REQUEST_SUCCESSFUL,
    payload: {
      config: response,
    },
  };
}

export function setAuthenticationData(header) {
  return {
    type: SET_AUTHENTICATION_DATA,
    payload: {
      header,
    },
  };
}

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
