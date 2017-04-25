import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { NAVIGATION_WIDTH } from '../../config';

export function Navigation(props) {
  const {
    open,
    docked,
    routes,
    location,
  } = props;

  const menuItems = routes.map(route => ({
    path: route.path,
    props: route.props,
    name: route.name ? route.name : route.path.substr(1),
  }));

  return (
    <Drawer
      open={open}
      docked={docked}
      width={NAVIGATION_WIDTH}
      containerClassName="marginTop"
    >
      <Menu
        desktop
        value={location}
      >
        {menuItems.map((item, key) => (
          <MenuItem
            key={key}
            value={item.path}
            children={
              <Link
                className="menuLink"
                to={{
                  pathname: item.path,
                  query: item.props,
                }}
              >
                {item.name}
              </Link>
            }
          />
        ))}
      </Menu>
    </Drawer>
  );
}

Navigation.propTypes = {
  routes: PropTypes.array,
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  location: PropTypes.string,
};
