import {
  INITIAL_PATH,
  ROOT_PATH,
} from './constants';

export function checkConnectionStatus(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const [nextState, replace] = props;
    const { pathname } = nextState.location;
    const { app: { isConnected } } = getState();
    if (!isConnected && pathname !== INITIAL_PATH) {
      replace({ pathname: INITIAL_PATH });
    } else if (isConnected && pathname === INITIAL_PATH) {
      replace({ pathname: ROOT_PATH });
    }
  };
}

export function dynamicRouteResolver(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const { app: { config } } = getState();
    const [nextState, replace] = props;
    const { pathname, query } = nextState.location;

    if (config.routing && config.routing.length) {
      const selectedRoute = config.routing.find(route => route.path === pathname);
      if (selectedRoute) {
        if (Object.keys(query).length === 0 && Object.keys(selectedRoute.props).length > 0) {
          replace({
            pathname: selectedRoute.path,
            query: selectedRoute.props,
          });
        }
      } else {
        replace({ pathname: '/404' });
      }
    }
  };
}
