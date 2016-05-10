import store from './store';

import { authRouteResolver } from 'core/auth';
import { SchemaHistory } from 'components/schema';
import { createRouteWithProps } from 'utils/react';

import {
  App,
  LoginForm,
  Dashboard,
} from 'views';

import { data } from 'data/routes.json';
const dynamicRoutes = data.map(route => createRouteWithProps(route, SchemaHistory));

const routes = {
  path: '/',
  component: App,
  onEnter: authRouteResolver(store.getState),
  indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
  childRoutes: [
    {
      path: '/login',
      component: LoginForm,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
    ...dynamicRoutes,
  ],
};

export default routes;
