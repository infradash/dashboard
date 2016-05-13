export function dynamicRouteResolve(getState) {
  return (prevState, nextState, replace) => {
    const { app: { dynamicRoutes } } = getState();
    const { pathname, query } = nextState.location;
    const selectedRoute = dynamicRoutes.find(route => route.path === pathname);
    if (Object.keys(query).length === 0 && Object.keys(selectedRoute.props).length > 0) {
      replace({
        pathname: selectedRoute.path,
        query: selectedRoute.props,
      });
    }
  };
}
