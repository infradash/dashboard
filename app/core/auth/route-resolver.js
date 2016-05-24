import {
  SIGN_IN_PATH,
  POST_SIGN_IN_PATH,
} from './constants';

export function checkAuthRouteResolver(getState, nextState, replace) {
  const { auth: { isAuthenticated } } = getState();
  const { pathname } = nextState.location;
  if (!isAuthenticated && pathname !== SIGN_IN_PATH) {
    replace({ pathname: SIGN_IN_PATH });
  } else if (isAuthenticated && pathname === SIGN_IN_PATH) {
    replace({ pathname: POST_SIGN_IN_PATH });
  }
}
