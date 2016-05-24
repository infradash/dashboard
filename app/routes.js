import store from './store';
import { dynamicRouteResolver } from './core/app';
import { checkAuthRouteResolver } from './core/auth';
import {
  App,
  LoginForm,
  NotFound,
  SchemaBuiler,
} from './views';

const routes = {
  path: '/',
  component: App,
  onEnter: checkAuthRouteResolver(store.getState),
  onChange: checkAuthRouteResolver(store.getState),
  childRoutes: [
    {
      path: '/login',
      component: LoginForm,
    },
    {
      path: '/:name',
      component: SchemaBuiler,
      onEnter: dynamicRouteResolver(store.getState),
      onChange: dynamicRouteResolver(store.getState),
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/404'),
    },
  ],
};

export default routes;
