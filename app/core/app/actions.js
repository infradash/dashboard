import { createRequestPromise } from 'utils/network';

export const CLOSE_ERROR_MESSAGE = 'CLOSE_ERROR_MESSAGE';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_REQUEST_SUCCESSFUL = 'DATA_REQUEST_SUCCESSFUL';
export const DATA_REQUEST_FAILED = 'DATA_REQUEST_FAILED';

export const ROUTES_REQUEST = 'ROUTES_REQUEST';
export const ROUTES_REQUEST_SUCCESSFUL = 'ROUTES_REQUEST_SUCCESSFUL';
export const ROUTES_REQUEST_FAILED = 'ROUTES_REQUEST_FAILED';

export const SHOW_MODAL_WINDOW = 'SHOW_MODAL_WINDOW';
export const CLOSE_MODAL_WINDOW = 'CLOSE_MODAL_WINDOW';

export function routesRequest() {
  return {
    type: ROUTES_REQUEST,
  };
}

export function routesRequestSuccessful(routes) {
  return {
    type: ROUTES_REQUEST_SUCCESSFUL,
    payload: {
      routes,
    },
  };
}

export function routesRequestFailed() {
  return {
    type: ROUTES_REQUEST_FAILED,
  };
}

export function getRoutes(endpoint) {
  return (dispatch) => {
    dispatch(routesRequest());
    return createRequestPromise(endpoint)
      .then(response => dispatch(routesRequestSuccessful(response)))
      .catch(error => dispatch(routesRequestFailed(error)));
  };
}


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
