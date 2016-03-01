import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../views/App';
import Dashboard from '../views/Dashboard';
import LoginForm from '../views/LoginForm';
import store from '../stores/index';
import {requireAuthentication, redirectIfLoggedIn} from '../components/AuthenticatedComponent';

const history = syncHistoryWithStore(hashHistory, store);

export default(
    <Router history={history}>
        <Route path='/' component={App}>
            <IndexRoute component={requireAuthentication(Dashboard)}/>
            <Route path="login" component={redirectIfLoggedIn(LoginForm)}/>
        </Route>
    </Router>
);
