import {
  CLOSE_ERROR_MESSAGE,
  CLOSE_MODAL_WINDOW,
  SHOW_MODAL_WINDOW,
  DATA_REQUEST,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
  ROUTES_REQUEST_SUCCESSFUL,
  ROUTES_REQUEST_FAILED,
} from './actions';

const initialState = {
  modalWindowParams: {},
  isLoading: false,
  error: null,
  dynamicRoutes: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_ERROR_MESSAGE:
      return Object.assign({}, state, {
        error: null,
      });
    case CLOSE_MODAL_WINDOW:
      return Object.assign({}, state, {
        modalWindowParams: {},
      });
    case SHOW_MODAL_WINDOW:
      return Object.assign({}, state, {
        modalWindowParams: {
          message: action.payload.message,
          redirect: action.payload.redirect,
        },
      });
    case ROUTES_REQUEST_SUCCESSFUL:
      return Object.assign({}, state, {
        dynamicRoutes: action.payload.routes,
      });
    case ROUTES_REQUEST_FAILED:
      return Object.assign({}, state, {
        dynamicRoutes: [],
      });
    case DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case DATA_REQUEST_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
      });
    case DATA_REQUEST_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.status,
      });
    default:
      return state;
  }
}
