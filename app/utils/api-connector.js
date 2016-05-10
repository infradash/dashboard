import { connect } from 'react-refetch';
import { API_URL } from 'config';
import store from 'store';
import {
  getAuthHeaders,
  checkResponse,
  checkHttpStatus,
} from 'utils/network';
import {
  dataRequest,
  dataRequestDone,
  dataRequestFailed,
} from 'core/app';

export default connect.defaults({
  buildRequest(mapping) {
    store.dispatch(dataRequest());
    const { auth: { token } } = store.getState();
    const headers = getAuthHeaders(token);
    return new mapping.Request(API_URL + mapping.url, {
      method: mapping.method,
      headers: Object.assign(mapping.headers, headers),
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      body: mapping.body,
    });
  },
  handleResponse(data) {
    setTimeout(() => {
      store.dispatch(dataRequestDone());
    }, 500);
    return Promise.resolve(data)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(checkResponse)
      .catch(error => {
        setTimeout(() => {
          store.dispatch(dataRequestFailed(error.toString()));
        }, 500);
      });
  },
});
