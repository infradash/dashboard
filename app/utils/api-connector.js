import { connect } from 'react-refetch';
import { API_URL } from 'config';
import { getHeaders } from 'utils';
import { dataRequest, dataRequestDone } from 'core/general';
import store from 'store';
const { auth: { token } } = store.getState();
const headers = getHeaders(token);

export default connect.defaults({
  buildRequest(mapping) {
    store.dispatch(dataRequest());
    // console.log(mapping.method);
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
    if (response.headers.get('content-length') === '0' || response.status === 204) {
      return null;
    }
    const json = response.json();
    if (response.status >= 200 && response.status < 300) {
      return json;
    }
    return json.then(cause => Promise.reject(cause));
  },
});
