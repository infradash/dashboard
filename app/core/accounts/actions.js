import fetch from 'isomorphic-fetch';
import { API_URL } from 'config';
import { checkHttpStatus, parseJSON, getHeaders } from 'utils';

export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';

function errorCallback(error) {
  return error;
}

export function receiveAccounts(json) {
  return {
    type: RECEIVE_ACCOUNTS,
    accounts: json,
  };
}

export function listAccounts() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    const headers = getHeaders(token);
    return fetch(`${API_URL}/account/`, { headers })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(json =>
        dispatch(receiveAccounts(json))
      )
      .catch(errorCallback);
  };
}
