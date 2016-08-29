import {
  CLOSE_ERROR_MESSAGE,
  CLOSE_MODAL_WINDOW,
  SHOW_MODAL_WINDOW,
  DATA_REQUEST,
  DATA_REQUEST_SUCCESSFUL,
  DATA_REQUEST_FAILED,
  APP_CONFIG_REQUEST_SUCCESSFUL,
  APP_CONFIG_REQUEST_FAILED,
  APP_DISCONNECT,
} from './actions';

const initialState = {
  modalWindowParams: null,
  isLoading: false,
  isAuthRequired: false,
  isConnected: false,
  error: null,
  config: {},
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_CONFIG_REQUEST_SUCCESSFUL:
      return Object.assign({}, state, {
        config: action.payload.config,
        isAuthRequired: Object.keys(action.payload.config.authentication).length > 0,
        isConnected: true,
      });
    case APP_CONFIG_REQUEST_FAILED:
      return Object.assign({}, state, {
        config: {},
        isConnected: false,
      });
    case APP_DISCONNECT:
      return Object.assign({}, state, {
        config: {},
        isAuthRequired: false,
        isConnected: false,
        modalWindowParams: null,
      });
    case CLOSE_ERROR_MESSAGE:
      return Object.assign({}, state, {
        error: null,
      });
    case CLOSE_MODAL_WINDOW:
      return Object.assign({}, state, {
        modalWindowParams: null,
      });
    case SHOW_MODAL_WINDOW:
      return Object.assign({}, state, {
        modalWindowParams: {
          message: action.payload.message,
          redirect: action.payload.redirect,
          showButtons: action.payload.showButtons,
        },
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
