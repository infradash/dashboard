export function dynamicRouteResolver(getState) {
  return (...args) => {
    const props = args.length === 4 ? args.slice(1) : args;
    const [nextState, replace] = props;
    const { app: { dynamicRoutes } } = getState();
    const { pathname, query } = nextState.location;
    if (dynamicRoutes.length) {
      const selectedRoute = dynamicRoutes.find(route => route.path === pathname);
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
