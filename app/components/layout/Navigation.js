import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { NAVIGATION_WIDTH } from '../../config';
import layoutStyles from '../../styles/layout.css';

export function Navigation(props) {
  const {
    open,
    docked,
    routes,
    location,
    isDesktop,
    onChangeList,
    onRequestChange,
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
      containerClassName={layoutStyles.marginTop}
      onRequestChange={onRequestChange}
    >
      <Menu
        desktop={isDesktop}
        value={location}
      >
        {menuItems.map((item, key) => (
          <MenuItem
            key={key}
            value={item.path}
            onTouchTap={onChangeList}
            children={
              <Link
                className={layoutStyles.menuLink}
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
  isDesktop: PropTypes.bool,
  onChangeList: PropTypes.func,
  onRequestChange: PropTypes.func,
};
