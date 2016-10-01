import store from './store';
import {
  checkConnectionStatus,
  dynamicRouteResolver,
} from './core/app';
import {
  App,
  Dashboard,
  NotFound,
  SchemaBuiler,
} from './views';

const routes = {
  path: '/',
  component: App,
  onEnter: checkConnectionStatus(store.getState),
  onChange: checkConnectionStatus(store.getState),
  childRoutes: [
    {
      path: '/start',
      component: Dashboard,
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '/:name',
      component: SchemaBuiler,
      onEnter: dynamicRouteResolver(store.getState),
      onChange: dynamicRouteResolver(store.getState),
    },
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/404'),
    },
  ],
};

export default routes;
