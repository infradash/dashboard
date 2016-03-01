import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} from '../constants/auth';
import jwtDecode from 'jwt-decode';
import { hashHistory } from 'react-router'
import {checkHttpStatus, parseJSON} from '../utils';

export function loginUserSuccess(token) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error,
      statusText: error
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    hashHistory.push('/login');
  }
}

export function loginUser(username, password, redirect='/') {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch('https://accounts.qor.io/v1/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      try {
        let decoded = jwtDecode(response.token);
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
    })
  }
}
