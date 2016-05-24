import store from './store';
import Schema from './components/schema';
import { dynamicRouteResolver } from './core/app';
import { checkAuthRouteResolver } from './core/auth';
import {
  App,
  LoginForm,
  NotFound,
} from './views';

const routes = {
  path: '/',
  component: App,
  onEnter: (nextState, replace) => {
    checkAuthRouteResolver(store.getState, nextState, replace);
  },
  onChange: (prevState, nextState, replace) => {
    checkAuthRouteResolver(store.getState, nextState, replace);
  },
  childRoutes: [
    {
      path: '/login',
      component: LoginForm,
    },
    {
      path: '/:name',
      component: Schema,
      onEnter: (nextState, replace) => {
        dynamicRouteResolver(store.getState, nextState, replace);
      },
      onChange: (prevState, nextState, replace) => {
        dynamicRouteResolver(store.getState, nextState, replace);
      },
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
