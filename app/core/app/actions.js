export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_DONE = 'DATA_REQUEST_DONE';
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED';

export function clearErrorMessage() {
  return {
    type: CLEAR_ERROR_MESSAGE,
  };
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  };
}

export function dataRequest() {
  return {
    type: DATA_REQUEST,
  };
}

export function dataRequestDone() {
  return {
    type: DATA_REQUEST_DONE,
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
