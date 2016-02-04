import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../views/App';
import Dashboard from '../views/Dashboard';
import LoginForm from '../views/LoginForm';
import {requireAuthentication, redirectIfLoggedIn} from '../components/AuthenticatedComponent';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={requireAuthentication(Dashboard)}/>
        <Route path="login" component={redirectIfLoggedIn(LoginForm)}/>
    </Route>
);
