import { connect } from 'react-refetch';
import { API_URL } from 'config';
import store from 'store';
import {
  getHeaders,
  parseJSON,
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
    const headers = getHeaders(token);
    return new mapping.Request(API_URL + mapping.url, {
      method: mapping.method,
      headers: Object.assign(mapping.headers, headers),
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      body: mapping.body,
    });
  },
  handleResponse(response) {
    store.dispatch(dataRequestDone());
    return Promise.resolve(response)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(checkResponse)
      .catch(error => {
        store.dispatch(dataRequestFailed(error.toString()));
      });
  },
});
