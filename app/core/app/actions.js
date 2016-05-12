export const CLOSE_ERROR_MESSAGE = 'CLOSE_ERROR_MESSAGE';
export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_SUCCESSFUL = 'DATA_REQUEST_SUCCESSFUL';
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED';
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
