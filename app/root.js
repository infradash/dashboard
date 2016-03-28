import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import { authRouteResolver } from 'core/auth';
import {
  App,
  LoginForm,
  Dashboard
} from 'views';

const Root = () => {
  const history = syncHistoryWithStore(hashHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route
          path="/"
          onEnter={authRouteResolver(store.getState)}
          component={App}
        >
          <IndexRoute component={Dashboard} />
          <Route path="login" component={LoginForm} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
