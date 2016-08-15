import { hashHistory } from 'react-router';

import { createRequestPromise } from '../../utils/network';
import { API_PREFIX } from '../../config';
// import {
//   SIGN_IN_PATH,
//   POST_SIGN_IN_PATH,
// } from './constants';

export const SIGN_IN_PATH = '/login';
export const POST_SIGN_IN_PATH = '/';


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

export function logoutAndRedirect() {
  return (dispatch) => {
    dispatch(logout());
    hashHistory.push(SIGN_IN_PATH);
  };
}

export function loginUser(data, redirect = POST_SIGN_IN_PATH) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return createRequestPromise(`${API_PREFIX}/auth`, 'POST', data)
      .then(response => {
        dispatch(loginUserSuccess(response.token));
        hashHistory.push(redirect);
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}
