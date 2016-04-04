import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';
import { checkHttpStatus, parseJSON, getHeaders } from 'utils';
import {
  REQUEST_ACCOUNTS,
  RECEIVE_ACCOUNTS
} from './action-types';


function requestAccounts() {
  return {
    type: REQUEST_ACCOUNTS
  };
}

function receiveAccounts(json) {
  return {
    type: RECEIVE_ACCOUNTS,
    accounts: json
  };
}

export function fetchAccounts() {
  return (dispatch, getState) => {
    dispatch(requestAccounts());
    const { auth: { token } } = getState();
    const headers = getHeaders(token);
    return fetch(`${API_URL}/account/`, { headers })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(json =>
        dispatch(receiveAccounts(json))
      );
  };
}
