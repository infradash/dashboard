import {
  CLOSE_ERROR_MESSAGE,
  CLOSE_MODAL_WINDOW,
  SHOW_MODAL_WINDOW,
  NETWORK_REQUEST,
  NETWORK_REQUEST_SUCCESSFUL,
  NETWORK_REQUEST_FAILED,
  APP_CONFIG_REQUEST_SUCCESSFUL,
  APP_CONFIG_REQUEST_FAILED,
  APP_DISCONNECT,
  SET_APP_CONFIG_PATH,
  SET_AUTHENTICATION_DATA,
  CACHE_HTTP_PARAMS,
} from './constants';

const initialState = {
  modalWindowParams: null,
  schemaHttpParamsCache: {},
  isLoading: false,
  isConnected: false,
  error: null,
  config: {},
  configPath: null,
  authHeader: null,
  isAuthenticated: false,
  isAuthEnabled: false,
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATION_DATA:
      return Object.assign({}, state, {
        isAuthenticated: true,
        authHeader: JSON.parse(action.payload.header),
        modalWindowParams: null,
      });
    case SET_APP_CONFIG_PATH:
      return Object.assign({}, state, {
        configPath: action.payload.path,
      });
    case APP_CONFIG_REQUEST_SUCCESSFUL: {
      const authProviders = action.payload.config.authentication || [];
      const isAuthEnabled = authProviders.some(provider => provider.enabled);
      return Object.assign({}, state, {
        isAuthEnabled,
        isConnected: true,
        config: action.payload.config,
      });
    }
    case APP_CONFIG_REQUEST_FAILED:
      return Object.assign({}, state, {
        config: {},
        isAuthEnabled: false,
        isConnected: false,
        isLoading: false,
      });
    case APP_DISCONNECT:
      return Object.assign({}, state, {
        config: {},
        schemaHttpParamsCache: {},
        authHeader: null,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        isAuthEnabled: false,
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
          visible: true,
          content: action.payload.content,
          onModalCloseCallback: action.payload.callback,
          showButtons: action.payload.showButtons,
        },
      });
    case NETWORK_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case NETWORK_REQUEST_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
      });
    case NETWORK_REQUEST_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.status,
      });
    case CACHE_HTTP_PARAMS:
      return Object.assign({}, state, {
        schemaHttpParamsCache: {
          [encodeURIComponent(action.payload.endpoint)]: {
            [action.payload.method]: JSON.stringify(action.payload.params),
          },
        },
      });
    default:
      return state;
  }
}
