import store from './store';
import Schema from 'components/schema';
import { authRouteResolver } from 'core/auth';

import {
  App,
  LoginForm,
  NotFound,
} from 'views';

const routes = {
  path: '/',
  component: App,
  onEnter: authRouteResolver(store.getState),
  childRoutes: [
    {
      path: '/login',
      component: LoginForm,
    },
    {
      path: '/generated/:name',
      component: Schema,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};

export default routes;
