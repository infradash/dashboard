import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import routes from './routes';

export default function Root() {
  const history = syncHistoryWithStore(hashHistory, store);
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
}
