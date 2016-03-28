import {
  SIGN_IN_PATH,
  POST_SIGN_IN_PATH
} from 'config';

export function authRouteResolver(getState) {
  return (nextState, replace) => {
    const { auth } = getState();
    const { pathname } = nextState.location;
    if (!auth.isAuthenticated && `${pathname}` !== SIGN_IN_PATH) {
      replace({ pathname: SIGN_IN_PATH });
    } else if (auth.authenticated && `${pathname}` !== POST_SIGN_IN_PATH) {
      replace({ pathname: POST_SIGN_IN_PATH });
    }
  };
}
