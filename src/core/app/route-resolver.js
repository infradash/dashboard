import {
  INITIAL_PATH,
  ROOT_PATH,
} from './constants';

import { hashHistory } from 'react-router';

function handleOauthCallback(replace) {
  const { search, hash } = window.location;
  const queryString = search ? search.slice(1) : hash.slice(2);
  let m;
  const regex = /([^&=]+)=([^&]*)/g
  const query = {};
  while (m = regex.exec(queryString)) {
    query[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  const url = hashHistory.createHref({pathname:'/', query});
  window.location.href = `${window.location.pathname}${url}`;
}

export function checkConnectionStatus(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const [nextState, replace] = props;
    const { pathname, query } = nextState.location;
    const windowPathname = window.location;
    if (pathname.includes('access_token') || (windowPathname.search.includes('code') && Object.keys(query).length ===0)) {
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
