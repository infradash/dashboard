import React from 'react';

export function createRouteWithProps(route, Component) {
  const { props, path, name } = route;
  return {
    path,
    name,
    component() {
      return <Component {...props} />;
    },
  };
}
