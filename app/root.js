import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import { authRouteResolver } from 'core/auth';
import {
  App,
  Accounts,
  LoginForm,
  Dashboard
} from 'views';

const Root = () => {
  const history = syncHistoryWithStore(hashHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" onEnter={authRouteResolver(store.getState)} component={App}>
          <IndexRedirect to="/accounts" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={LoginForm} />
          <Route path="/accounts" component={Accounts} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
