import React from 'react';

export function createRouteWithProps(route, Component) {
  const { props, path } = route;
  return {
    path,
    component() {
      return <Component {...props} />;
    },
  };
}
