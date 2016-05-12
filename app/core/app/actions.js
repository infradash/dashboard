export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE';
export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_SUCCESSFUL = 'DATA_REQUEST_SUCCESSFUL';
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED';

export function clearErrorMessage() {
  return {
    type: CLEAR_ERROR_MESSAGE,
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
