import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from './actions';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'Authentication Error'
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        token: null,
        userName: null
      });
    default:
      return state;
  }
}
