// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import store from './store';
import routes from './routes';

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>
  );
}
