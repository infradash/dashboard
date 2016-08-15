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

export function showModalWindow({ message, redirect = null }) {
  return {
    type: SHOW_MODAL_WINDOW,
    payload: {
      message,
      redirect,
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


export function loadConfig(path, redirect = ROOT_PATH) {
  return (dispatch) => {
    return createRequestPromise(path)
      .then(response => {
        dispatch(appConfigRequestSuccesful(response));
        hashHistory.push(redirect);
      })
      .catch(error => dispatch(appConfigRequestFailed(error)));
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
