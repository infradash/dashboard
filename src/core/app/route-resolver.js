/*eslint no-cond-assign:[1, "except-parens"]*/

import {
  INITIAL_PATH,
  ROOT_PATH,
} from './constants';

import { hashHistory } from 'react-router';

function handleOauthCallback(replace) {
  const queryString = window.location.hash.slice(2);
  let m;
  const regex = /([^&=]+)=([^&]*)/g
  const query = {};
  while ((m = regex.exec(queryString))) {
    query[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  const url = hashHistory.createHref({pathname:'/', query});
  replace(url.slice(1));
}

export function checkConnectionStatus(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const [nextState, replace] = props;
    const { pathname } = nextState.location;
    if (pathname.includes('access_token') || pathname.includes('error')) {
      handleOauthCallback(replace);
    } else {
      const { app: { isConnected } } = getState();
      if (!isConnected && pathname !== INITIAL_PATH) {
        replace({ pathname: INITIAL_PATH });
      } else if (isConnected && pathname === INITIAL_PATH) {
        replace({ pathname: ROOT_PATH });
      }
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
        if (Object.keys(query).length === 0 && selectedRoute.template) {
          replace({
            pathname: selectedRoute.path,
            query: {
              template: selectedRoute.template
            },
          });
        }
      } else {
        replace({ pathname: '/404' });
      }
    }
  };
}
