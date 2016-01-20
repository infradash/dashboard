import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Home from '../components/Home';
import Main from '../components/Main';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="home" component={Home}/>
        </Route>
    </Router>
);

