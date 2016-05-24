import {
  SIGN_IN_PATH,
  POST_SIGN_IN_PATH,
} from './constants';

export function checkAuthRouteResolver(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const [nextState, replace] = props;
    const { pathname } = nextState.location;
    const { auth: { isAuthenticated } } = getState();
    if (!isAuthenticated && pathname !== SIGN_IN_PATH) {
      replace({ pathname: SIGN_IN_PATH });
    } else if (isAuthenticated && pathname === SIGN_IN_PATH) {
      replace({ pathname: POST_SIGN_IN_PATH });
    }
  };
}
