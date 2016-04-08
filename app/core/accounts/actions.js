import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';
import { checkHttpStatus, parseJSON, getHeaders } from 'utils';

export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';

export function requestAccounts() {
  return {
    type: REQUEST_ACCOUNTS
  };
}

export function receiveAccounts(json) {
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
