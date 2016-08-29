import { createRequestPromise } from '../../utils/network';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export * from './actions-github';
export * from './actions-google';

export function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE,
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function loginUser(data) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return createRequestPromise('some-url', 'POST', data)
      .then(response => {
        dispatch(loginUserSuccess(response.token));
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}
