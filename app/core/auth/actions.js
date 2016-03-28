//  import jwtDecode from 'jwt-decode';
import { hashHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

import { checkHttpStatus, parseJSON } from 'utils';
import { AUTH_URL } from 'config';

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from './action-types';

import {
  SIGN_IN_PATH,
  POST_SIGN_IN_PATH
} from './constants';

export * from './actions-github';
export * from './actions-google';

export function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error,
      statusText: error
    }
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function logout() {
  return {
    type: LOGOUT_USER
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
    return fetch(AUTH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      try {
        //  let decoded = jwtDecode(response.token);
        dispatch(loginUserSuccess(response.token));
        hashHistory.push(redirect);
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch((error) => {
      dispatch(loginUserFailure(error));
    });
  };
}
