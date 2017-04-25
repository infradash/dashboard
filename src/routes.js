import store from './store';
import {
  checkConnectionStatus,
  dynamicRouteResolver,
} from './core/app';
import {
  App,
  StartPage,
  NotFound,
  ViewRender,
} from './views';

const routes = {
  path: '/',
  component: App,
  onEnter: checkConnectionStatus(store.getState),
  onChange: checkConnectionStatus(store.getState),
  childRoutes: [
    {
      path: '/start',
      component: StartPage,
    },
    {
      path: '/404',
      component: NotFound,
    },
    {
      path: '/:name',
      component: ViewRender,
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
